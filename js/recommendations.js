import {renderLibraryMap} from './libraries.js';
import {isComic} from './comics.js';
import {allEvents,getSetting} from './db.js';
import {aggregateEvents,bookKey} from './statistics.js';
import {currentSession,logEvent} from './session.js';
import {publicSnapshot} from './central.js';
let snapshot={recommendations:[],typeCounts:{},participants:[]},mapStats;

const $=id=>document.getElementById(id);
export async function refreshCommunity(){
 const hidden=(await getSetting('hiddenRecommendations'))?.value||[];
 const server=await publicSnapshot();
 snapshot=aggregateEvents(await allEvents(),window.YBTI_LEGACY.types,hidden);
 if(server){const tombstones=new Set([...hidden,...server.hiddenIds]);snapshot.recommendations=[...new Map([...snapshot.recommendations,...server.recommendations].map(r=>[r.id,r])).values()].filter(r=>!tombstones.has(r.id));}
 window.YBTI_LEGACY.setParticipants(snapshot.participants);
 mapStats=server?{...server.summary,scope:'central'}:{...snapshot,scope:'local'};window.renderOrganizationMap();
 return snapshot;
}
export function installRecommendations(){
 const baseRender=window.renderOrganizationMap;window.renderOrganizationMap=()=>{baseRender();renderLibraryMap(mapStats||snapshot);};
 window.getStoredStats=()=>({...snapshot.typeCounts});
 window.openStatsModal=()=>{document.getElementById('statsModal').style.display='flex';window.renderAdminStatsList();};
 window.renderYbtiParticipantPicks=()=>renderRecommendations($('ybti-employee-picks-list'),snapshot.recommendations.filter(r=>r.ybti===window.YBTI_LEGACY.type));
 window.openParticipantBookModal=()=>{renderRecommendations($('employee-book-list'),snapshot.recommendations);$('employee-book-summary').textContent=`이 기기·가져온 백업 기준 ${snapshot.recommendations.length}건 추천`; $('employeeBookModal').style.display='flex';document.body.style.overflow='hidden';};
 window.handleRegisterSubmit=async event=>{
  event.preventDefault();const session=currentSession();
  if(!session.completed){alert('검사 또는 종이 결과 선택을 먼저 완료해 주세요.');return;}
  const payload={bookname:$('regBookname').value.trim(),authors:$('regAuthors').value.trim(),comment:$('regComment').value.trim(),ageGroup:$('regAgeGroup').value,libraries:[...document.querySelectorAll('#regLibraries input:checked:not(:disabled)')].map(x=>x.value)};
  if(payload.bookname.length>100||payload.authors.length>80||payload.comment.length>120){alert('추천책 제목과 입력 길이를 확인해 주세요.');return;}
  const previous=(await allEvents()).filter(e=>e.sessionId===session.id&&e.action==='recommendation_create');
  if(payload.bookname&&previous.length>=3){alert('한 체험에서는 추천책을 3권까지 등록할 수 있어요.');return;}
  if(payload.bookname&&previous.some(e=>bookKey(e.payload)===bookKey(payload))){alert('이 책은 이미 추천했어요.');return;}
  const submit=$('btn-submit-reg');submit.disabled=true;
  try{await logEvent('profile_update',window.YBTI_LEGACY.type,{libraries:payload.libraries,ageGroup:payload.ageGroup});if(payload.bookname){await logEvent('recommendation_create',window.YBTI_LEGACY.type,payload);session.recommendations++;}await refreshCommunity();window.closeRegisterModal();$('regBookname').value='';$('regAuthors').value='';$('regComment').value='';alert('선택 정보를 저장했습니다. 독서성향 참여자 수는 중복으로 늘어나지 않습니다. 추천책을 입력했다면 이 기기에 공개됩니다.');}
  catch{alert('추천책을 저장하지 못했습니다. 입력 내용을 보존했습니다.');}
  finally{submit.disabled=false;}
 };
 window.addEventListener('ybti:data-changed',()=>refreshCommunity().catch(()=>{}));
}
function renderRecommendations(wrap,rows){
 if(!wrap)return;wrap.replaceChildren();
 if(!rows.length){const p=document.createElement('p');p.textContent='아직 공개된 추천책이 없습니다. 첫 추천을 남겨보세요.';wrap.append(p);return;}
 for(const r of rows.filter(r=>!isComic(r)).slice(-30).reverse()){
  const card=document.createElement('article');card.className='festival-recommendation';const h=document.createElement('h4');h.textContent=r.bookname;const p=document.createElement('p');p.textContent=[r.authors,r.ybti].filter(Boolean).join(' · ');const reason=document.createElement('p');reason.textContent=r.comment||'추천 이유 미입력';card.append(h,p,reason);
  const b=document.createElement('button');b.type='button';b.textContent='📖 책 정보';b.className='btn-explore-chain-sm';b.onclick=()=>{$('employeeBookModal').style.display='none';window.openCuratedBookDetail(null,encodeURIComponent(JSON.stringify(r)));};card.append(b);wrap.append(card);
 }
}
