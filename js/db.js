const NAME='ybti-festival-2026';
let opening;
export function openDB(){
  return opening ||= new Promise((resolve,reject)=>{
    const r=indexedDB.open(NAME,1);
    r.onupgradeneeded=()=>{const db=r.result;db.createObjectStore('events',{keyPath:'id'});db.createObjectStore('settings',{keyPath:'key'});db.createObjectStore('recommendations',{keyPath:'id'});};
    r.onsuccess=()=>{r.result.onversionchange=()=>{r.result.close();opening=null;};resolve(r.result);};
    r.onerror=()=>{opening=null;reject(r.error);};
    r.onblocked=()=>{opening=null;reject(new Error('다른 창을 닫고 다시 실행하세요.'));};
  });
}
export async function transact(store,mode,action){const db=await openDB();return new Promise((resolve,reject)=>{const tx=db.transaction(store,mode);let r;try{r=action(tx.objectStore(store));}catch(e){tx.abort();reject(e);return;}tx.oncomplete=()=>resolve(r?.result);tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error||new Error('저장 취소'));});}
export const allEvents=()=>transact('events','readonly',s=>s.getAll());
export const saveEvent=e=>transact('events','readwrite',s=>s.add(e));
export async function acknowledge(ids){const db=await openDB();return new Promise((resolve,reject)=>{const tx=db.transaction('events','readwrite');const s=tx.objectStore('events');for(const id of ids){const r=s.get(id);r.onsuccess=()=>{if(r.result)s.put({...r.result,syncedAt:new Date().toISOString()});};}tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error);});}
export const getSetting=key=>transact('settings','readonly',s=>s.get(key));
export const setSetting=(key,value)=>transact('settings','readwrite',s=>s.put({key,value}));
