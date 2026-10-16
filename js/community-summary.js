import {aggregateEvents} from './statistics.js';
export function communitySummary(server,events,types,hidden=[]){
 const local=aggregateEvents(events,types,hidden);
 if(!server)return {...local,scope:'local'};
 const baseline=aggregateEvents(server.localBaseline||events.filter(e=>e.syncedAt&&e.syncedAt<=server.updatedAt),types,hidden),remote=server.summary;
 const delta=(r,a,b)=>Math.max(0,(Number(r)||0)+(Number(a)||0)-(Number(b)||0));
 const counts=(r,a,b)=>Object.fromEntries([...new Set([...Object.keys(r||{}),...Object.keys(a||{}),...Object.keys(b||{})])].map(k=>[k,delta(r?.[k],a?.[k],b?.[k])]));
 const completed=delta(remote.completed,local.completed,baseline.completed);
 const names=new Set([...(remote.libraryStats||[]),...local.libraryStats,...baseline.libraryStats].map(r=>r.name));
 const libraryStats=[...names].map(name=>{const r=(remote.libraryStats||[]).find(x=>x.name===name),a=local.libraryStats.find(x=>x.name===name),b=baseline.libraryStats.find(x=>x.name===name);const count=delta(r?.count,a?.count,b?.count),typeCounts=counts(r?.typeCounts,a?.typeCounts,b?.typeCounts);return {name,count,typeCounts,ratio:completed?Math.round(count/completed*100):0,topType:Object.entries(typeCounts).filter(([,n])=>n>0).sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0]))[0]?.[0]||null};});
 return {...remote,completed,typeCounts:counts(remote.typeCounts,local.typeCounts,baseline.typeCounts),libraryStats,scope:navigator.onLine?'central':'cached-central',updatedAt:server.updatedAt};
}
