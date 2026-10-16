import {allEvents,getSetting} from '../js/db.js';
import {aggregateEvents} from '../js/statistics.js';
import {publicSnapshot} from '../js/central.js';
const types=await fetch('../data/types.json').then(r=>r.json()),$=id=>document.getElementById(id);
function items(id,rows){$(id).replaceChildren(...rows.map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));}
async function refresh(){
 const hidden=(await getSetting('hiddenRecommendations'))?.value||[],local=aggregateEvents(await allEvents(),types,hidden),server=await publicSnapshot(),s=server?{...server.summary,lastUpdated:server.updatedAt,pending:local.pending}:local;
 $('scope').textContent=server?'온라인 중앙 집계 기준 · 미전송 기기 기록은 반영 전':'이 기기와 가져온 백업 기준 · 중앙 통합 연결 전';
 $('updated').textContent='마지막 기록: '+(s.lastUpdated?new Date(s.lastUpdated).toLocaleString('ko-KR'):'아직 없음');$('total').textContent=`현장 체험 ${s.completed}건`;
 $('distribution').replaceChildren(...Object.entries(s.typeCounts).sort((a,b)=>b[1]-a[1]).map(([code,count])=>{const row=document.createElement('div');row.className='board-type';const p=document.createElement('p');p.textContent=`${code} ${types[code].alias} · ${count}건`;const bar=document.createElement('meter');bar.min=0;bar.max=Math.max(s.completed,1);bar.value=count;bar.setAttribute('aria-label',p.textContent);row.append(p,bar);return row;}));
 items('library-stats',(s.libraryStats||[]).map(r=>`${r.name} · ${r.count}명 (${r.ratio}%) · 대표 ${r.topType}`));
 items('popular',s.popular.slice(0,5).map(b=>`${b.bookname} · ${b.count}건 좋아요`));items('paths',s.paths.slice(0,5).map(p=>`${p.fromTitle} → ${p.toTitle} · ${p.count}회`));$('status').textContent=s.pending?`연결 전까지 다른 기기의 기록은 반영되지 않습니다.`:'';
}
await refresh();setInterval(()=>refresh().catch(()=>$('status').textContent='통계를 읽지 못했습니다.'),10000);
