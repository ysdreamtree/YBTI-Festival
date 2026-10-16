import {CONFIG} from './config.js';
import {getSetting,setSetting} from './db.js';
const pending=new Map();
const errorMessages={api_key_not_configured:'서버 인증키 설정이 필요합니다.',book_api_daily_limit:'오늘 설정한 API 호출 한도에 도달했습니다.',book_api_limit_or_unavailable:'정보나루 호출 제한 또는 서비스 오류입니다.',book_api_authorization_required:'Apps Script에서 API 호출 권한 승인이 필요합니다.',book_api_connection_failed:'서버가 정보나루에 연결하지 못했습니다.',book_api_invalid_response:'정보나루가 정상 도서 데이터를 반환하지 않았습니다.',access_or_setup_required:'서버의 API 설정 또는 실행 권한을 확인해 주세요.'};
let apiState={status:'idle',message:'온라인에서는 정보나루 추가 조회를 시도합니다.'};
export function getLiveBookStatus(){return apiState;}
function report(status,operation,message){apiState={status,operation,message};if(typeof window!=='undefined')window.dispatchEvent(new CustomEvent('ybti:book-api',{detail:apiState}));}

export async function liveBookAPI(operation,params,options={}){
 if(!CONFIG.syncEnabled||!CONFIG.apiUrl||!navigator.onLine){report('offline',operation,'저장된 도서로 이용 중입니다. 온라인 연결 후 추가 조회할 수 있어요.');return null;}
 const key='book-api:'+JSON.stringify([operation,params]);const saved=(await getSetting(key))?.value;if(!options.force&&saved&&Date.now()-saved.at<21600000){report('cached',operation,'최근 API 조회 결과를 불러왔습니다.');return saved.data;}
 if(pending.has(key))return pending.get(key);
 const task=(async()=>{report('loading',operation,'정보나루에서 책 정보를 확인하고 있어요…');try{const url=new URL(CONFIG.apiUrl);url.searchParams.set('operation','book');url.searchParams.set('apiOperation',operation);for(const [k,v] of Object.entries(params))url.searchParams.set(k,v);const r=await fetch(url,{cache:'no-store',signal:AbortSignal.timeout(25000)});const response=await r.json();if(!r.ok||!response.ok||!response.data?.response){report('error',operation,(errorMessages[response.error]||'온라인 도서 조회가 실패했습니다.')+' 저장된 도서는 계속 이용할 수 있어요.');return null;}await setSetting(key,{at:Date.now(),data:response.data});report('ok',operation,'정보나루 API 조회 완료');return response.data;}catch{report('error',operation,'온라인 도서 조회에 연결하지 못했습니다. 저장된 도서로 계속 이용할 수 있어요.');return null;}finally{pending.delete(key);}})();pending.set(key,task);return task;
}
export function liveDocs(data){return (data?.response?.docs||[]).map(row=>row.doc||row.book||row);}
export function mergeSavedBooks(dataset,savedBooks){
 const bundled=Boolean(dataset['cover-bundles']?.files?.length);
 for(const [isbn,saved] of Object.entries(savedBooks)){
  const current=dataset.books[isbn]||{};
  const usable=image=>typeof image==='string'&&image!== './assets/images/book-placeholder.svg'&&(!bundled||!image.startsWith('./assets/images/covers/'));
  const bookImageURL=usable(current.bookImageURL)?current.bookImageURL:usable(saved.bookImageURL)?saved.bookImageURL:'./assets/images/book-placeholder.svg';
  dataset.books[isbn]={...current,...saved,bookImageURL};
 }
}
export async function restoreLiveBooks(dataset){const saved=(await getSetting('live-book-dataset'))?.value;if(!saved)return;mergeSavedBooks(dataset,saved.books||{});for(const [isbn,modes] of Object.entries(saved.related||{}))dataset['related-books'][isbn]={...dataset['related-books'][isbn],...modes};Object.assign(dataset['book-details'],saved.details||{});for(const [age,groups] of Object.entries(saved.popular||{})){dataset['popular-books'][age]??={};for(const [k,ids] of Object.entries(groups))dataset['popular-books'][age][k]=[...new Set([...(dataset['popular-books'][age][k]||[]),...ids])];}for(const [age,groups] of Object.entries(saved.counts||{})){dataset['popular-counts'][age]??={};for(const [k,counts] of Object.entries(groups))dataset['popular-counts'][age][k]={...dataset['popular-counts'][age][k],...counts};}}
export async function storeLiveBooks(dataset){const previous=(await getSetting('live-book-dataset'))?.value||{books:{},related:{},details:{}};await setSetting('live-book-dataset',{books:{...previous.books,...Object.fromEntries(Object.entries(dataset.books).filter(([,b])=>b.liveCollected))},related:dataset['related-books'],details:dataset['book-details'],popular:dataset['popular-books'],counts:dataset['popular-counts']});}
export function mergeLiveBook(dataset,book){const isbn=String(book.isbn13||'').trim();if(!/^97[89]\d{10}$/.test(isbn))return null;const old=dataset.books[isbn]||{};const image=String(book.bookImageURL||'').replace(/^http:/,'https:');dataset.books[isbn]={...old,...book,isbn13:isbn,bookImageURL:old.bookImageURL&&old.bookImageURL!=='./assets/images/book-placeholder.svg'?old.bookImageURL:image||'./assets/images/book-placeholder.svg',liveCollected:true};return isbn;}

const coverQueue=[],coverQueued=new Set();let coverWorkers=0;
export function queueLiveCover(dataset,isbn){if(!navigator.onLine||!CONFIG.syncEnabled||!CONFIG.apiUrl||!/^https?:/.test(dataset.books[isbn]?.bookImageURL||'')||coverQueued.has(isbn))return;coverQueued.add(isbn);coverQueue.push({dataset,isbn});drainCovers();}
function drainCovers(){while(coverWorkers<2&&coverQueue.length){coverWorkers++;const {dataset,isbn}=coverQueue.shift();(async()=>{try{const url=new URL(CONFIG.apiUrl);url.searchParams.set('operation','cover');url.searchParams.set('isbn13',isbn);const r=await fetch(url,{signal:AbortSignal.timeout(25000)}),data=await r.json();if(!r.ok||!data.ok||!/^data:image\/(?:jpeg|png|webp);base64,/.test(data.image||''))return;dataset.books[isbn].bookImageURL=data.image;await storeLiveBooks(dataset);document.querySelectorAll('img[data-isbn="'+isbn+'"]').forEach(img=>img.src=data.image);if(window.YBTI_LEGACY?.target?.isbn13===isbn){window.YBTI_LEGACY.target.bookImageURL=data.image;const img=document.getElementById('card-top-book-img');if(img)img.src=data.image;}}catch{}finally{coverWorkers--;drainCovers();}})();}}
