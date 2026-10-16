import {CONFIG} from './config.js';
import {logEvent} from './session.js';
export function resultUrl(type,current,base=CONFIG.publicBaseUrl,page=CONFIG.resultPageUrl){
 if(!/^[DT][GS][IO][WP]$/.test(type))throw Error('유형을 확인하세요.');
 const root=new URL(base||current);const url=page?new URL(page):new URL('result.html',root);url.search='';url.hash='';url.searchParams.set('type',type);return url;
}
export function shareAvailable(url){return url.protocol==='https:' && !['localhost','127.0.0.1','0.0.0.0','::1'].includes(url.hostname);}
export function installShare(){window.shareResult=async()=>{const url=resultUrl(window.YBTI_LEGACY.type,location.href);if(!shareAvailable(url)){alert('휴대폰 공유는 HTTPS 배포 주소가 연결된 뒤 사용할 수 있습니다.');return;}try{if(navigator.share)await navigator.share({title:'나의 YBTI 독서유형',url:url.href});else{await navigator.clipboard.writeText(url.href);alert('결과 링크를 복사했습니다.');}}catch(e){if(e.name!=='AbortError')prompt('결과 링크를 복사하세요.',url.href);}};
 window.saveBookmarkImage=async()=>{window.switchResultTab(1);try{await document.fonts.ready;const canvas=await window.html2canvas(document.getElementById('bookmark-card'),{scale:2,useCORS:false,backgroundColor:'#FAF8F5'});const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/png'));if(!blob)throw Error('이미지를 만들지 못했습니다.');const file=new File([blob],`YBTI_${window.YBTI_LEGACY.type}.png`,{type:'image/png'});if(navigator.canShare?.({files:[file]})){try{await navigator.share({files:[file],title:'나의 푸용이 포토카드'});return;}catch(e){if(e.name==='AbortError')return;}}const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=file.name;a.click();setTimeout(()=>URL.revokeObjectURL(url),10000);}catch{alert('이미지 저장에 실패했습니다. 기기에서 화면 캡처를 이용해 주세요.');}};
}
let lastType=null;
export async function renderQR(type){
 let panel=document.getElementById('festival-qr');if(!panel){panel=document.createElement('section');panel.id='festival-qr';panel.className='festival-qr';document.querySelector('#result-view').append(panel);}panel.replaceChildren();
 const h=document.createElement('h3');h.textContent='내 푸용이를 휴대폰으로 가져가기';panel.append(h);
 const url=resultUrl(type,location.href);
 if(!shareAvailable(url)){const p=document.createElement('p');p.textContent='휴대폰 QR 공유는 온라인 배포 주소가 연결되면 표시됩니다.';panel.append(p);return;}
 const qr=window.qrcode(0,'M');qr.addData(url.href);qr.make();const div=document.createElement('div');div.innerHTML=qr.createSvgTag({cellSize:5,margin:16,scalable:true});const svg=div.querySelector('svg');svg.setAttribute('role','img');svg.setAttribute('aria-label','유형별 결과 링크 QR 코드');svg.style.width='220px';svg.style.height='220px';panel.append(div);
 const link=document.createElement('a');link.href=url.href;link.textContent='휴대폰 결과 페이지';panel.append(link);const p=document.createElement('p');p.textContent='독서유형만 전달됩니다. 좋아요·선택 도서·입력 내용은 전달되지 않습니다.';panel.append(p);
 if(type!==lastType){lastType=type;await logEvent('qr_generate',type);}
}
