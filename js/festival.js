import {loadLibraries} from './libraries.js';
import {startSync} from './sync.js';
import {offlineStatus} from './offline.js';
import {loadBooks,refreshLikeButtons} from './books.js';
import {installRecommendations,refreshCommunity} from './recommendations.js';
import {installShare,renderQR} from './share.js';
import {setEntry,resetSession,completeResult} from './session.js';
const notice=document.createElement('p');notice.id='festival-status';notice.setAttribute('role','status');document.body.append(notice);
function fail(message){notice.textContent=message;}
window.addEventListener('ybti:result',e=>{completeResult(e.detail.type).then(()=>refreshCommunity()).then(()=>renderQR(e.detail.type)).catch(()=>fail('기록 저장에 실패했습니다. 운영자에게 알려주세요.'));});
window.addEventListener('ybti:reset',()=>{resetSession();document.getElementById('regForm').reset();refreshLikeButtons();document.getElementById('festival-qr')?.replaceChildren();});
try{
 await loadBooks({backgroundCovers:true});await loadLibraries();installRecommendations();installShare();document.querySelectorAll('[data-app-ready]').forEach(b=>b.disabled=false);
 const types=window.YBTI_LEGACY.types;
 const grid=document.getElementById('known-result-type-grid');grid.replaceChildren();
 for(const [code,type] of Object.entries(types)){const button=document.createElement('button');button.type='button';button.innerHTML=window.getOfficialYongYongSVG(code,64);const label=document.createElement('div');label.textContent=code+' '+type.alias;button.append(label);button.onclick=()=>{setEntry('known_result');document.getElementById('intro-overlay').style.display='none';document.body.classList.remove('quest-modal-open');window.showFinalResult(code);};grid.append(button);}
 const type=new URLSearchParams(location.search).get('type');if(types[type]){if(/(?:^|\/)result\.html$/i.test(location.pathname)){document.body.classList.add('festival-mobile-result');const heading=document.createElement('p');heading.className='festival-mobile-heading';heading.textContent='내 푸용이와 추천책 · 포토카드를 저장해 보세요';document.getElementById('result-view').prepend(heading);}document.getElementById('intro-overlay').style.display='none';document.body.classList.remove('quest-modal-open');window.showFinalResult(type);document.getElementById('mobile-result-loading')?.remove();window.scrollTo({top:0,behavior:'instant'});}
 refreshCommunity().catch(()=>{});
 startSync(s=>{if(s.status==='error')fail('동기화 대기 중입니다. 기록은 기기에 보관됩니다.');refreshCommunity().catch(()=>{});});
 if('serviceWorker' in navigator){await navigator.serviceWorker.register('./service-worker.js');notice.textContent='오프라인 자산 설치 중 · 통계는 이 기기와 가져온 백업 기준입니다.';const report=()=>offlineStatus().then(s=>notice.textContent=s.reason).catch(()=>notice.textContent='오프라인 설치 상태를 확인하지 못했습니다.');report();setInterval(report,10000);}
 else notice.textContent='이 브라우저는 오프라인 설치를 지원하지 않습니다.';
}catch(e){fail('초기 준비에 실패했습니다. 온라인 상태에서 다시 열어주세요.');console.error('YBTI 준비 실패',e.message);}
