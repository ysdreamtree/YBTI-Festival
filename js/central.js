import {CONFIG} from './config.js';
import {getSetting,setSetting} from './db.js';
let lastAttempt=0,inflight;
export async function publicSnapshot(){
 const saved=(await getSetting('centralPublicSnapshot'))?.value||null;
 if(!CONFIG.syncEnabled||!CONFIG.apiUrl||!navigator.onLine||Date.now()-lastAttempt<15000)return saved;
 if(inflight)return inflight;lastAttempt=Date.now();
 inflight=(async()=>{try{const response=await fetch(CONFIG.apiUrl,{cache:'no-store',signal:AbortSignal.timeout(20000)});if(!response.ok)throw Error('공개 집계 응답 오류');const data=await response.json();if(data.ok!==true||!data.summary||!Array.isArray(data.recommendations)||!Array.isArray(data.hiddenIds))throw Error('공개 집계 형식 오류');await setSetting('centralPublicSnapshot',data);return data;}catch{return saved;}finally{inflight=null;}})();return inflight;
}
