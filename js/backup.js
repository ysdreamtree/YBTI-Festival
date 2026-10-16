import {allEvents,openDB,getSetting} from './db.js';
import {CONFIG} from './config.js';
import {validEvent} from './validation.js';
export function csvCell(value){let s=String(value??'');if(/^[=+@\-\t\r]/.test(s))s="'"+s;return '"'+s.replaceAll('"','""')+'"';}
export async function exportBackup(format='json'){
 const events=await allEvents(),hidden=(await getSetting('hiddenRecommendations'))?.value||[],device=(await getSetting('deviceId'))?.value||null;
 const columns=['id','eventId','deviceId','sessionId','source','action','type','createdAt','syncedAt','payload'];
 const body=format==='csv'?'\ufeff'+[columns.map(csvCell).join(','),...events.map(e=>columns.map(k=>csvCell(k==='payload'?JSON.stringify(e.payload):e[k])).join(','))].join('\r\n'):JSON.stringify({schemaVersion:1,eventId:CONFIG.eventId,exportedAt:new Date().toISOString(),deviceId:device,hiddenRecommendations:hidden,events},null,2);
 const url=URL.createObjectURL(new Blob([body],{type:format==='csv'?'text/csv;charset=utf-8':'application/json'}));const a=document.createElement('a');a.href=url;a.download=`ybti-${device||'device'}-${Date.now()}.${format}`;a.click();setTimeout(()=>URL.revokeObjectURL(url),10000);
}
export function validateBackup(data){
 if(data.schemaVersion!==1||data.eventId!==CONFIG.eventId||!Array.isArray(data.events)||data.events.length>100000||data.events.some(e=>!validEvent(e,CONFIG.eventId))||data.hiddenRecommendations!==undefined&&(!Array.isArray(data.hiddenRecommendations)||data.hiddenRecommendations.some(id=>typeof id!=='string'))||new Set(data.events.map(e=>e.id)).size!==data.events.length)throw new Error('백업 형식 또는 이벤트 내용이 올바르지 않습니다.');
 return data.events;
}
export async function importBackup(data){
 const events=validateBackup(data),db=await openDB();
 return new Promise((resolve,reject)=>{
  const tx=db.transaction(['events','settings'],'readwrite'),store=tx.objectStore('events');let added=0;
  for(const event of events){const request=store.get(event.id);request.onsuccess=()=>{if(!request.result){store.add({...event,syncedAt:null});added++;}};}
  const settings=tx.objectStore('settings'),hidden=settings.get('hiddenRecommendations');hidden.onsuccess=()=>settings.put({key:'hiddenRecommendations',value:[...new Set([...(hidden.result?.value||[]),...(data.hiddenRecommendations||[])])]});
  tx.oncomplete=()=>resolve(added);tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error||new Error('복구를 취소했습니다.'));
 });
}
