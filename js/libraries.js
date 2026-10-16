export let libraries=[];
let selected='all';
export async function loadLibraries(){
 libraries=await fetch('./data/libraries.json').then(r=>r.json());
 const box=document.getElementById('regLibraries');if(!box)return;
 for(const place of libraries){
  const label=document.createElement('label'),input=document.createElement('input');input.type='checkbox';input.value=place.name;if(place.venue){input.checked=true;input.disabled=true;}label.append(input,document.createTextNode(place.venue?'책축제 현장 · 자동 기록':place.name));box.append(label);
 }
 window.addEventListener('ybti:reset',()=>{const venue=box.querySelector('input:disabled');if(venue)venue.checked=true;});
}
export function renderLibraryMap(stats){
 const wrap=document.getElementById('festival-library-map');if(!wrap||!libraries.length)return;
 wrap.replaceChildren();const h=document.createElement('h3');h.textContent='🗺️ 도서관별 푸용이 독서지도';wrap.append(h);
 const note=document.createElement('p');note.className='festival-map-note';note.textContent=`${stats.scope==='central'?'중앙 집계':'이 기기·가져온 백업 기준'} · 현장 체험 ${stats.completed||0}명 · 도서관은 자주 가는 곳을 선택한 참여자 기준입니다. 복수 선택으로 비율 합계가 100%를 넘을 수 있어요. 푸용이는 대표 독서유형, 숫자는 참여자 수입니다. 지도는 위치 안내도입니다.`;wrap.append(note);
 const canvas=document.createElement('div');canvas.className='festival-library-canvas';const img=document.createElement('img');img.src='./assets/images/library-map.png';img.alt='용산구 도서관 위치 안내도';canvas.append(img);
 const distribution=counts=>Object.entries(counts||{}).filter(([,n])=>n>0).sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0]));
 const rowFor=place=>place.venue?{count:stats.completed||0,ratio:100,typeCounts:stats.typeCounts||{}}:(stats.libraryStats||[]).find(r=>r.name===place.name)||{count:0,ratio:0,typeCounts:{}};
 for(const [i,place] of libraries.entries()){
  const row=rowFor(place),pin=document.createElement('button');pin.type='button';pin.className='festival-library-pin'+(place.venue?' festival-venue-pin':'');pin.style.left=place.x+'%';pin.style.top=place.y+'%';const topCode=distribution(row.typeCounts)[0]?.[0]||'TGIW';const face=document.createElement('span');face.className='festival-pin-face';face.innerHTML=window.getOfficialYongYongSVG(topCode,42);const count=document.createElement('span');count.className='festival-pin-count';count.textContent=String(row.count);pin.append(face,count);pin.dataset.participantCount=String(row.count);pin.classList.toggle('festival-pin-empty',row.count===0);pin.title=place.name+' · '+row.count+'명'+(row.count?' · 대표 '+topCode:' · 참여 기록 없음');pin.setAttribute('aria-label',pin.title);pin.setAttribute('aria-pressed',String(place.id===selected));pin.onclick=()=>{selected=place.id;renderLibraryMap(stats);};canvas.append(pin);
 }wrap.append(canvas);
 const place=selected==='all'?{id:'all',name:'통합보기 · 용산 독서취향',venue:true,address:'책축제 현장 전체 참여자의 독서성향',url:'https://www.yslibrary.or.kr/intro/index.do'}:libraries.find(p=>p.id===selected)||libraries[0],row=rowFor(place),ranking=distribution(row.typeCounts),detail=document.createElement('article');detail.className='festival-library-detail';
 const name=document.createElement('h4');name.textContent=place.name;const address=document.createElement('p');address.textContent=place.address;
 const total=document.createElement('p');total.textContent=place.venue?`전체 현장 체험 ${row.count}명 (자동 기록)`:`이 도서관을 선택한 체험자 ${row.count}명 · 전체 현장 체험자의 ${row.ratio}%`;
 const top=document.createElement('p');top.textContent=ranking.length?'대표 독서성향 '+ranking[0][0]+' '+(window.YBTI_LEGACY.types[ranking[0][0]]?.alias||''):'대표 독서성향 · 아직 선택 기록 없음';detail.append(name,address,total,top);
 for(const [code,count] of ranking){const p=document.createElement('p');p.className='festival-map-ratio';const ratio=Math.round(count/Math.max(1,row.count)*100);p.textContent=`${code} ${window.YBTI_LEGACY.types[code]?.alias||''} · ${count}명 (${ratio}%)`;const bar=document.createElement('meter');bar.min=0;bar.max=Math.max(row.count,1);bar.value=count;bar.setAttribute('aria-label',p.textContent);detail.append(p,bar);}
 const link=document.createElement('a');link.href=place.url;link.target='_blank';link.rel='noopener noreferrer';link.textContent='공식 장소 안내 · 주소 확인';detail.append(link);wrap.append(detail);
 const choices=document.createElement('div');choices.className='festival-library-list';const allButton=document.createElement('button');allButton.type='button';allButton.textContent='통합보기 · 전체 '+(stats.completed||0)+'명';allButton.setAttribute('aria-pressed',String(selected==='all'));allButton.onclick=()=>{selected='all';renderLibraryMap(stats);};choices.append(allButton);for(const p of libraries){const r=rowFor(p),button=document.createElement('button');button.type='button';button.textContent=(p.venue?'책축제 현장 · 용산 장교숙소':p.name)+' · '+r.count+'명'+(!p.venue?' ('+r.ratio+'%)':'');button.setAttribute('aria-pressed',String(p.id===selected));button.onclick=()=>{selected=p.id;renderLibraryMap(stats);};choices.append(button);}wrap.append(choices);
 const list=document.getElementById('org-library-stats-list');if(list){list.replaceChildren();for(const r of stats.libraryStats||[]){const p=document.createElement('p');p.textContent=`${r.name} · ${r.count}명 (${r.ratio}%) · 대표 ${r.topType||'-'} ${window.YBTI_LEGACY.types[r.topType]?.alias||''}`;list.append(p);}if(!list.childNodes.length)list.textContent='아직 도서관 선택 기록이 없습니다.';}
}
