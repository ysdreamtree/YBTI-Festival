import {getLiveBookStatus,liveBookAPI,liveDocs,restoreLiveBooks,storeLiveBooks,mergeLiveBook,queueLiveCover} from './live-books.js';
import {isComic} from './comics.js';
import {bookKey} from './statistics.js';
import {currentSession,logEvent} from './session.js';
export let dataset;
const $=id=>document.getElementById(id);
const button=(text,fn)=>{const b=document.createElement('button');b.type='button';b.textContent=text;b.className='btn-explore-chain-sm';b.onclick=fn;return b;};
let detailToken=0;
let path=[],lastAge='',chainKind='mania';const liveQueries=new Set();const randomLists=new Map(),previousFirst=new Map();
export function seriesKey(book={}){
 const explicit=book.seriesName||book.series_title||book.series;
 const title=String(explicit||book.bookname||'').split(/[:：]/)[0].replace(/\([^)]*\)/g,'').replace(/(?:제\s*)?\d+\s*(?:권|부|편|집|탄)?\s*$/,'').replace(/\s+/g,'').toLowerCase();
 return title+'|'+String(book.authors||'').replace(/\s+/g,'').toLowerCase();
}
export function uniqueSeries(ids,books){const seen=new Set();return ids.filter(id=>{const key=seriesKey(books[id]);if(seen.has(key))return false;seen.add(key);return true;});}
export function shuffleBooks(ids,random=Math.random){const result=[...ids];for(let i=result.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[result[i],result[j]]=[result[j],result[i]];}return result;}

export async function loadBooks(options={}){
 const names=['books','related-books','book-details','popular-books','popular-counts','curated-isbns','dataset-version','cover-bundles'];
 const values=await Promise.all(names.map(n=>fetch(`./data/${n}.json`).then(r=>{if(!r.ok)throw Error('도서 데이터 파일을 확인하세요.');return r.json();})));
 dataset=Object.fromEntries(names.map((n,i)=>[n,values[i]]));
 const coverFiles=dataset['cover-bundles']?.files||[];
  if(options.backgroundCovers&&coverFiles.length)for(const b of Object.values(dataset.books))if(b.bookImageURL?.startsWith('./assets/images/covers/'))b.bookImageURL='./assets/images/book-placeholder.svg';
 const coversReady=Promise.all(coverFiles.map(file=>fetch('./data/'+file).then(r=>{if(!r.ok)throw Error('표지 데이터를 확인하세요.');return r.json();}).then(bundle=>{for(const [isbn,image] of Object.entries(bundle)){if(!dataset.books[isbn])continue;dataset.books[isbn].bookImageURL=image;if(options.backgroundCovers){for(const img of document.querySelectorAll('img[data-isbn]'))if(img.dataset.isbn===isbn)img.src=image;const target=window.YBTI_LEGACY?.target;if(target?.isbn13===isbn){target.bookImageURL=image;const top=document.getElementById('card-top-book-img');if(top)top.src=image;}}}return bundle;})));
 if(options.backgroundCovers)coversReady.catch(()=>{});else await coversReady;
 if(options.restore!==false)await restoreLiveBooks(dataset);
 window.fetchData4LibraryJson=async url=>{const u=new URL(url,location.href),isbn=u.searchParams.get('isbn13');if(u.pathname.endsWith('/srchDtlList'))return dataset['book-details'][isbn]||{response:{}};if(u.pathname.endsWith('/recommandList'))return {response:{docs:(dataset['related-books'][isbn]?.[u.searchParams.get('type')]||[]).map(id=>({book:dataset.books[id]}))}};return {response:{docs:[]}};};
 window.resolveCuratedBookIsbn=async book=>resolveBook(book);
 window.openCuratedBookDetail=async (_b,encoded)=>window.openBookDetailModal(resolveBook(JSON.parse(decodeURIComponent(encoded))));
 window.startCuratedBookChain=async (_b,encoded)=>startChain(resolveBook(JSON.parse(decodeURIComponent(encoded))));
 window.triggerBookChain=encoded=>startChain(resolveBook(JSON.parse(decodeURIComponent(encoded))));
 window.startChainFromTopBook=()=>startChain(window.YBTI_LEGACY.target);
 window.loadRecommendChainAPI=()=>renderChain();
 window.switchRecommendType=kind=>{chainKind=kind==='reader'?'reader':'mania';$('type-btn-mania').classList.toggle('active',chainKind==='mania');$('type-btn-reader').classList.toggle('active',chainKind==='reader');renderChain();};
 window.loadYBTIAPI=age=>renderPopular(age);
 window.openBookDetailModal=showDetail;
 window.addEventListener('ybti:reset',()=>{path=[];randomLists.clear();});
 const note=$('festival-dataset-date');if(note)$('result-view').prepend(note);
 window.refreshRandomRecommendation=()=>renderPopular(lastAge,true);

}
export function resolveBook(book){const id=book.isbn13||dataset['curated-isbns'][book.bookname+'|'+book.authors];return {...book,...(dataset.books[id]||{}),isbn13:id||''};}
export function likeButton(book){
 const key=bookKey(book),b=button('',async()=>{b.disabled=true;const s=currentSession(),liked=s.likes.has(key);try{await logEvent(liked?'unlike':'like',window.YBTI_LEGACY.type,{book:{isbn13:book.isbn13||'',bookname:book.bookname,authors:book.authors||''}});if(liked)s.likes.delete(key);else s.likes.add(key);window.dispatchEvent(new Event('ybti:data-changed'));refreshLikeButtons();}catch{alert('저장에 실패했습니다. 운영자에게 알려주세요.');}finally{b.disabled=false;}});
 b.dataset.likeKey=key;setLikeText(b);return b;
}
function setLikeText(b){const liked=currentSession().likes.has(b.dataset.likeKey);b.textContent=liked?'♥ 좋아요 취소':'♡ 좋아요';b.setAttribute('aria-pressed',String(liked));}
export function refreshLikeButtons(){document.querySelectorAll('[data-like-key]').forEach(setLikeText);}
function card(book,onNext){
 const box=document.createElement('article');box.className='festival-book-card';const img=document.createElement('img');img.src=book.bookImageURL||'./assets/images/book-placeholder.svg';img.alt=book.bookname+' 표지';img.dataset.isbn=book.isbn13||'';img.loading='lazy';img.onerror=()=>{img.onerror=null;img.src='./assets/images/book-placeholder.svg';};box.append(img);
 const h=document.createElement('h4');h.textContent=book.bookname;h.title=book.bookname;box.append(h);const author=document.createElement('p');author.textContent=book.authors||'저자 정보 없음';box.append(author);
 const count=book.loanCount??book.loan_count;if(count!==undefined&&count!==null){const p=document.createElement('small');p.className='festival-loan-count';p.textContent=`🔥 ${Number(count).toLocaleString()}회 대출`;box.append(p);}
 const actions=document.createElement('div');actions.className='festival-card-actions';actions.append(button('📖 책 정보',()=>showDetail(book)),likeButton(book),button('📌 추천하기',()=>window.pickAsMyRecommendBook(book.bookname,book.authors||'')));
 if(onNext)actions.append(button('🔮 꼬리물기',onNext));box.append(actions);return box;
}
export function addCuratedLikes(){
 const profile=window.YBTI_LEGACY.profiles[window.YBTI_LEGACY.type];if(!profile)return;
 document.querySelectorAll('#ybti-curated-picks-list > div').forEach((card,i)=>{
  if(!profile.picks[i])return;const book=resolveBook(profile.picks[i]);
  if(!card.querySelector('.festival-curated-cover')){
   const cover=document.createElement('img');cover.className='festival-curated-cover';cover.src=book.bookImageURL||'./assets/images/book-placeholder.svg';cover.dataset.isbn=book.isbn13||'';cover.alt=profile.picks[i].bookname+' 표지';cover.loading='lazy';cover.onerror=()=>{cover.onerror=null;cover.src='./assets/images/book-placeholder.svg';};card.firstElementChild.prepend(cover);
   const facts=document.createElement('p');facts.className='festival-curated-facts';facts.textContent=[book.isbn13?'ISBN '+book.isbn13:''].filter(Boolean).join(' · ');card.firstElementChild.append(facts);
  }
  if(!card.querySelector('[data-like-key]'))card.lastElementChild.append(likeButton(book));
 });
}
function renderPopular(age='',reroll=false){
 lastAge=age;
 const profile=window.YBTI_LEGACY.profiles[window.YBTI_LEGACY.type];$('ybti-book-type-label').textContent=`[${window.YBTI_LEGACY.type}] ${profile.categoryName}`;
 $('ybti-book-loading').style.display='none';$('ybti-book-error').style.display='none';$('comic-filter-badge').style.display='inline-block';$('comic-filter-badge').textContent='학습만화·만화 제외';
 const groups=profile.kdcs.map(k=>dataset['popular-books'][age]?.[k]||[]),ids=[];
 for(let i=0;i<Math.max(0,...groups.map(g=>g.length));i++)for(const g of groups)if(g[i]&&!ids.includes(g[i])&&!isComic(dataset.books[g[i]]))ids.push(g[i]);
 const groupKey=window.YBTI_LEGACY.type+'|'+age,key=currentSession().id+'|'+groupKey;
 if(reroll||!randomLists.has(key)){const shuffled=uniqueSeries(shuffleBooks(ids),dataset.books);if(shuffled.length>1&&shuffled[0]===previousFirst.get(groupKey))shuffled.push(shuffled.shift());randomLists.set(key,shuffled);previousFirst.set(groupKey,shuffled[0]);}ids.splice(0,ids.length,...randomLists.get(key));
 const counts={};for(const k of profile.kdcs)for(const [id,count] of Object.entries(dataset['popular-counts'][age]?.[k]||{}))if(counts[id]===undefined)counts[id]=count;
 const list=$('ybti-books-list');list.replaceChildren();
 for(const id of ids.slice(0,12)){const stored=dataset.books[id],book=stored?{...stored,loanCount:counts[id]??null}:null;if(book)list.append(card(book,()=>startChain(book)));}
 if(!ids.length){$('ybti-book-error').style.display='block';$('ybti-book-error').textContent='이 조건의 대출 데이터가 없습니다. 위의 유형별 추천책을 살펴보세요.';window.applyYbtiFallbackBook();}
 else{const first=dataset.books[ids[0]];window.setTopBookCard({...first,loanCount:counts[ids[0]]??null},false);$('card-top-book-loan').textContent=counts[ids[0]]!=null?`🔥 ${Number(counts[ids[0]]).toLocaleString()}회 대출`:'대출횟수 자료 없음';$('card-top-book-label').textContent='📚 내 유형에 맞는 오늘의 추천책';let actions=$('festival-top-book-actions');if(!actions){actions=document.createElement('div');actions.id='festival-top-book-actions';actions.className='festival-top-book-actions';$('card-top-book-loan').after(actions);}const featured={...first,loanCount:counts[ids[0]]??null};actions.replaceChildren(button('🔄 다른 추천책 보기',()=>renderPopular(lastAge,true)),likeButton(featured),button('📌 내 추천도서로 선택',()=>window.pickAsMyRecommendBook(featured.bookname,featured.authors||'')));}
 let online=$('festival-online-books');if(!online){online=document.createElement('div');online.id='festival-online-books';const status=document.createElement('p');status.id='festival-online-books-status';status.setAttribute('role','status');online.append(status,button('🌐 온라인 도서 더 불러오기',()=>{liveQueries.delete(window.YBTI_LEGACY.type+'|'+lastAge);renderPopular(lastAge);}));$('ybti-books-list').before(online);window.addEventListener('ybti:book-api',e=>{status.textContent=e.detail.message;});window.addEventListener('online',()=>{liveQueries.clear();renderPopular(lastAge);});}const status=$('festival-online-books-status');status.textContent=navigator.onLine?getLiveBookStatus().message:'오프라인 · 저장된 도서로 이용 중입니다.';
 addCuratedLikes();
 const note=$('festival-dataset-date');if(note)note.textContent=`※ 대출횟수는 전국 정보나루 참여 도서관 통계 (${dataset['dataset-version'].loanPeriod?.start||'기간 미확인'}~${dataset['dataset-version'].loanPeriod?.end||''})의 선택 연령·분류 기준입니다.`;
 if(navigator.onLine&&!liveQueries.has(groupKey)){liveQueries.add(groupKey);updatePopularOnline(profile,age).then(changed=>{if(!changed)liveQueries.delete(groupKey);if(changed&&lastAge===age&&window.YBTI_LEGACY.type===groupKey.split('|')[0]){randomLists.delete(key);renderPopular(age);}}).catch(()=>{});}
}
function startChain(book){if(!book?.isbn13){alert('이 도서는 정확한 ISBN을 아직 확인하지 못했습니다. 다른 추천도서를 선택해 주세요.');return;}path=[book];window.YBTI_LEGACY.setChainBook(book);window.switchResultTab(6);chainKind='mania';$('type-btn-mania').classList.toggle('active',true);$('type-btn-reader').classList.toggle('active',false);renderChain();}
async function renderChain(){
 const book=path.at(-1)||window.YBTI_LEGACY.target;if(!book)return;const kind=chainKind;
 $('chain-book-loading').style.display='none';$('chain-book-empty').style.display='none';$('chain-books-list').replaceChildren();
 $('chain-source-img').src=book.bookImageURL||'./assets/images/book-placeholder.svg';$('chain-source-title').textContent=book.bookname;$('chain-source-author').textContent=book.authors||'';$('chain-source-loan').textContent=`꼬리물기 ${Math.max(0,path.length-1)}/2단계`;
 let crumb=$('festival-chain-trail');if(!crumb){crumb=document.createElement('p');crumb.id='festival-chain-trail';$('chain-books-list').before(crumb);}crumb.textContent=path.map(b=>b.bookname).join(' → ');
 if(path.length>1)crumb.append(button('처음 선택한 책',()=>{path=path.slice(0,1);renderChain();}));
 if(path.length>=3){$('chain-book-empty').style.display='block';$('chain-book-empty').textContent='두 단계 탐색을 마쳤어요. 마음에 든 책에 좋아요를 남겨보세요.';$('chain-books-list').append(card(book));return;}
 if(navigator.onLine||!(dataset['related-books'][book.isbn13]?.[kind]||[]).length){$('chain-book-loading').style.display='block';const live=await liveBookAPI('recommandList',{isbn13:book.isbn13,type:kind});$('chain-book-loading').style.display='none';if((path.at(-1)||window.YBTI_LEGACY.target)?.isbn13!==book.isbn13||chainKind!==kind)return;if(live){dataset['related-books'][book.isbn13]??={};dataset['related-books'][book.isbn13][kind]=liveDocs(live).map(b=>mergeLiveBook(dataset,b)).filter(Boolean);for(const id of dataset['related-books'][book.isbn13][kind])if(!isComic(dataset.books[id]))queueLiveCover(dataset,id);await storeLiveBooks(dataset);}}
 const ids=uniqueSeries((dataset['related-books'][book.isbn13]?.[kind]||[]).filter(id=>!isComic(dataset.books[id])),dataset.books);
 if(!ids.length){$('chain-book-empty').style.display='block';const pending=!Object.hasOwn(dataset['related-books'],book.isbn13)||dataset['dataset-version'].pendingQueries?.some(q=>q.operation==='recommandList'&&q.parameters.isbn13===book.isbn13&&q.parameters.type===kind);$('chain-book-empty').textContent=pending?'이 책의 연관자료는 추가 수집 예정입니다. 다른 추천도서에서 시작해 주세요.':'수집된 연관도서가 없습니다. 다른 추천도서에서 시작해 주세요.';return;}
 for(const id of ids){const next=dataset.books[id];if(next)$('chain-books-list').append(card(next,async()=>{try{await logEvent('related_open',window.YBTI_LEGACY.type,{from:book.isbn13,to:id,fromTitle:book.bookname,toTitle:next.bookname,depth:path.length,kind});path.push(next);renderChain();window.dispatchEvent(new Event('ybti:data-changed'));}catch{alert('탐색 기록 저장에 실패했습니다.');}}));}
}
async function showDetail(input,force=false){
 const token=++detailToken;
 const book=resolveBook(input);$('bookDetailModal').style.display='flex';document.body.style.overflow='hidden';window.setBookDetailBasic({...book,loanCount:book.loanCount??book.loan_count});$('book-detail-loading').style.display='none';$('book-detail-content').style.display='block';
 let status=$('festival-detail-api');if(!status){status=document.createElement('p');status.id='festival-detail-api';status.setAttribute('role','status');$('book-detail-description').before(status);}status.textContent=navigator.onLine?'저장된 도서를 표시하고 온라인 상세정보를 확인합니다…':'오프라인 · 저장된 도서 정보';let raw=dataset['book-details'][book.isbn13];if(book.isbn13&&navigator.onLine){const live=await liveBookAPI('srchDtlList',{isbn13:book.isbn13},{force});if(token!==detailToken)return;if(live){raw=live;dataset['book-details'][book.isbn13]=raw;await storeLiveBooks(dataset);}status.textContent=getLiveBookStatus().message;}const description=window.getFirstValueByKeys(raw,['description','bookDtl','bookDescription','bookIntro'])||book.description||book.reason||'책 소개 상세자료는 추가 수집 예정입니다. 제목·저자·출판사·ISBN을 먼저 확인해 주세요.';$('book-detail-description').textContent=description;let source=$('festival-detail-source');if(!source){source=document.createElement('p');source.id='festival-detail-source';source.style.cssText='font-size:.7rem;color:#64748b;margin:8px 0';$('book-detail-description').after(source);}source.replaceChildren();if(book.descriptionSource){const a=document.createElement('a');a.href=book.descriptionSource;a.target='_blank';a.rel='noopener noreferrer';a.textContent='책 소개 참고 자료';source.append(document.createTextNode('공개 서지 소개를 바탕으로 요약 · '),a);}
 const scopedCount=book.loanCount??book.loan_count??null;const count=scopedCount??(raw?window.extractLoanCountFromDetail(raw):null);$('book-detail-loan').textContent=count!=null?`🔥 ${Number(count).toLocaleString()}회 대출${scopedCount==null?' · 전국 전체기간 상세 집계':''}`:'수집된 대출횟수 없음';
 window.renderBookDetailTrend(raw?window.extractMonthlyLoanTrend(raw):[]);
 let actions=$('festival-detail-actions');if(!actions){actions=document.createElement('div');actions.id='festival-detail-actions';$('book-detail-description').after(actions);}actions.replaceChildren(button('🌐 온라인 정보 다시 불러오기',()=>showDetail(input,true)),likeButton(book),button('📌 추천하기',()=>{window.closeBookDetailModal();window.pickAsMyRecommendBook(input.bookname,input.authors||'');}));
 if(!navigator.onLine){for(const id of ['book-detail-library-btn','book-detail-naver-btn','book-detail-kyobo-btn','book-detail-aladin-btn'])$(id).title='이 검색은 인터넷 연결이 필요합니다.';}
}

async function updatePopularOnline(profile,age){

 let changed=false;
 const ranges={'8':[8,13],'14':[14,19],'20':[20,29],'30':[30,39],'40':[40,49],'50':[50,100]};
 await Promise.all(profile.kdcs.map(async k=>{const params={...{startDt:dataset['dataset-version'].loanPeriod.start,endDt:dataset['dataset-version'].loanPeriod.end},kdc:k,pageNo:3};if(ranges[age])[params.from_age,params.to_age]=ranges[age];const live=await liveBookAPI('loanItemSrch',params);if(!live)return;changed=true;const ids=[];for(const b of liveDocs(live)){const id=mergeLiveBook(dataset,b);if(id){if(!isComic(dataset.books[id]))queueLiveCover(dataset,id);ids.push(id);dataset['popular-counts'][age]??={};dataset['popular-counts'][age][k]??={};dataset['popular-counts'][age][k][id]=Number(b.loan_count)||0;}}dataset['popular-books'][age]??={};dataset['popular-books'][age][k]=[...new Set([...(dataset['popular-books'][age][k]||[]),...ids])];}));
 await storeLiveBooks(dataset);

return changed;
}
