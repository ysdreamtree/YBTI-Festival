import {csvBackup} from '../js/csv-import.js';
import {allEvents,setSetting,getSetting} from '../js/db.js';
import {deviceId} from '../js/events.js';
import {offlineStatus} from '../js/offline.js';
import {exportBackup,importBackup} from '../js/backup.js';
import {syncNow} from '../js/sync.js';
import {aggregateEvents} from '../js/statistics.js';
const $=id=>document.getElementById(id),status=$('status');let types={};
function run(fn){return async()=>{try{const value=await fn();status.textContent=typeof value==='string'?value:JSON.stringify(value)||'완료';await refresh();}catch(e){status.textContent=e.message;}};}
function list(id,rows){$(id).replaceChildren(...rows.map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));}
async function refresh(){
 const hidden=(await getSetting('hiddenRecommendations'))?.value||[],s=aggregateEvents(await allEvents(),types,hidden);$('current-device').textContent='현재 기기: '+await deviceId();
 $('summary').textContent=`현장 검사 완료 ${s.completed}건 · 모바일 결과 조회 ${s.mobileViews}건 · 현재 좋아요 ${s.likes}건 · 공개 추천 ${s.recommendations.length}건 · QR 생성 ${s.qr}건 · 미전송 ${s.pending}건`;
 $('distribution').replaceChildren(...Object.entries(s.typeCounts).map(([code,count])=>{const p=document.createElement('p');p.textContent=`${code} ${types[code]?.alias||''} · ${count}건`;return p;}));
 $('library-stats').replaceChildren(...s.libraryStats.map(r=>{const p=document.createElement('p');p.textContent=`${r.name} · ${r.count}명 (${r.ratio}%) · 대표 ${r.topType}`;return p;}));
 list('popular',s.popular.slice(0,10).map(b=>`${b.bookname} · ${b.count}건 좋아요`));list('paths',s.paths.slice(0,10).map(p=>`${p.fromTitle||p.path} → ${p.toTitle||''} · ${p.count}회`));
 $('device-list').replaceChildren(...s.devices.map(d=>{const p=document.createElement('p');p.textContent=`${d.deviceId} · 기록 ${d.records} · 전송 대기 ${d.pending} · 최종 기록 ${d.lastSeen}`;return p;}));
 $('recommendations').replaceChildren(...s.allRecommendations.slice().reverse().map(r=>{const box=document.createElement('article');const text=document.createElement('p');text.textContent=`${r.bookname} · ${r.authors||'저자 미입력'} · ${r.ybti}: ${r.comment||'추천 이유 미입력'}`;const b=document.createElement('button');b.textContent=hidden.includes(r.id)?'공개 복원':'이 기기에서 숨김';b.onclick=run(async()=>{const updated=(await getSetting('hiddenRecommendations'))?.value||[];await setSetting('hiddenRecommendations',updated.includes(r.id)?updated.filter(id=>id!==r.id):[...updated,r.id]);return '추천 상태를 변경했습니다.';});box.append(text,b);return box;}));
}
$('offline').onclick=run(async()=>{const s=await offlineStatus();return s.reason+(s.total?` (${s.total-s.missing}/${s.total})`:'');});
$('save').onclick=run(async()=>{await setSetting('deviceId',$('device').value);return '기기 ID를 설정했습니다. 기존 이벤트의 기기 ID는 유지됩니다.';});$('sync').onclick=run(async()=>{const s=await syncNow();return s.status==='unconfigured'?'중앙 서버 연결 전입니다. JSON 백업을 이용하세요.':s;});for(const f of ['json','csv'])$(f).onclick=run(()=>exportBackup(f));$('import').onchange=run(async()=>{const file=$('import').files[0];if(!file)return '파일 미선택';if(file.size>20000000)throw new Error('20MB 이하 파일을 선택하세요.');const text=await file.text();const data=/\.csv$/i.test(file.name)?csvBackup(text):JSON.parse(text);const added=await importBackup(data);let report='새 이벤트 '+added+'건을 가져왔습니다.';try{const result=await syncNow();report+=result.status==='ok'?' 시트 전송 '+result.count+'건 완료.':' 온라인 연결 후 시트에 전송됩니다.';}catch{report+=' 시트 전송 대기 중이며 기기에 보관합니다.';}return report;});
types=await fetch('../data/types.json').then(r=>r.json());const current=await deviceId();if(['TAB-01','TAB-02','TAB-03'].includes(current))$('device').value=current;await refresh();setInterval(()=>refresh().catch(e=>status.textContent=e.message),10000);
