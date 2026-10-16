export function bookKey(book){return book.isbn13 || `${String(book.bookname||'').trim().toLowerCase()}|${String(book.authors||'').trim().toLowerCase()}`;}
export function aggregateEvents(input,types={},hiddenIds=[]){
 const events=[...new Map(input.map(e=>[e.id,e])).values()].sort((a,b)=>String(a.createdAt).localeCompare(String(b.createdAt))||(Number(a.payload?.sequence)||0)-(Number(b.payload?.sequence)||0)||a.id.localeCompare(b.id));
 const completed=new Map(),views=new Set(),likes=new Map(),recommendations=new Map(),profiles=new Map(),devices=new Map(),paths=new Map();let qr=0;
 for(const e of events){
  const d=devices.get(e.deviceId)||{deviceId:e.deviceId,records:0,pending:0,lastSeen:null};d.records++;if(!e.syncedAt)d.pending++;d.lastSeen=e.createdAt;devices.set(e.deviceId,d);
  if(e.action==='quiz_complete' && e.source!=='mobile' && (!Object.keys(types).length||types[e.type]) && !completed.has(e.sessionId))completed.set(e.sessionId,e);
  if(e.action==='result_view'&&e.source==='mobile')views.add(e.sessionId);
  if(['like','unlike'].includes(e.action)&&e.payload?.book){const key=e.sessionId+'|'+bookKey(e.payload.book);if(e.action==='like')likes.set(key,e);else likes.delete(key);}
  if(e.action==='recommendation_create'&&e.payload?.bookname)recommendations.set(e.id,{id:e.id,sessionId:e.sessionId,source:e.source,ybti:e.type,createdAt:e.createdAt,...e.payload});
  if(e.action==='related_open' && e.payload?.from && e.payload?.to){const key=e.payload.from+' → '+e.payload.to;const p=paths.get(key)||{path:key,fromTitle:e.payload.fromTitle,toTitle:e.payload.toTitle,count:0};p.count++;paths.set(key,p);}
  if(e.action==='profile_update')profiles.set(e.sessionId,e.payload);
  if(e.action==='qr_generate')qr++;
 }
 const typeCounts=Object.fromEntries(Object.keys(types).map(t=>[t,0]));for(const e of completed.values())typeCounts[e.type]=(typeCounts[e.type]||0)+1;
 const popular=new Map();for(const e of likes.values()){const key=bookKey(e.payload.book),b=popular.get(key)||{...e.payload.book,count:0};b.count++;popular.set(key,b);}
 const visible=[...recommendations.values()].filter(r=>!hiddenIds.includes(r.id));
 const participants=[...completed.values()].map(e=>{const r=visible.filter(r=>r.sessionId===e.sessionId).at(-1);const p=profiles.get(e.sessionId)||r||{},libraries=[...new Set(Array.isArray(p.libraries)?p.libraries:p.library?[p.library]:[])];return {entryId:e.id,ybti:e.type,ageGroup:p.ageGroup||'',libraries,library:libraries.join(' · '),bookname:r?.bookname||'',authors:r?.authors||'',comment:r?.comment||''};});
 const libraryGroups=new Map();for(const p of participants)for(const name of p.libraries){const row=libraryGroups.get(name)||{name,count:0,typeCounts:{}};row.count++;row.typeCounts[p.ybti]=(row.typeCounts[p.ybti]||0)+1;libraryGroups.set(name,row);}
 const libraryStats=[...libraryGroups.values()].map(row=>({...row,ratio:completed.size?Math.round(row.count/completed.size*100):0,topType:Object.entries(row.typeCounts).sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0]))[0]?.[0]||null})).sort((a,b)=>b.count-a.count||a.name.localeCompare(b.name));
 return {libraryStats,completed:completed.size,mobileViews:views.size,typeCounts,likes:likes.size,popular:[...popular.values()].sort((a,b)=>b.count-a.count),recommendations:visible,allRecommendations:[...recommendations.values()],participants,devices:[...devices.values()],paths:[...paths.values()].sort((a,b)=>b.count-a.count),qr,totalEvents:events.length,pending:events.filter(e=>!e.syncedAt).length,lastUpdated:events.at(-1)?.createdAt||null};
}
