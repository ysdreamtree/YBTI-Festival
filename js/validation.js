export const VALID_ACTIONS=['quiz_complete','result_view','like','unlike','related_open','recommendation_create','profile_update','qr_generate'];
export function validEvent(e,eventId){
 if(!e||e.schemaVersion!==1||e.eventId!==eventId||!/^[-a-zA-Z0-9]{20,80}$/.test(e.id||'')||!/^[-a-zA-Z0-9]{20,80}$/.test(e.sessionId||'')||!['tablet','mobile','paper'].includes(e.source)||!VALID_ACTIONS.includes(e.action)||!(/^[DT][GS][IO][WP]$/.test(e.type||'')||e.type===null)||typeof e.deviceId!=='string'||e.deviceId.length>100||!Number.isFinite(Date.parse(e.createdAt))||!e.payload||typeof e.payload!=='object'||Array.isArray(e.payload)||JSON.stringify(e).length>8000)return false;
 if(e.action==='profile_update')return Array.isArray(e.payload.libraries)&&e.payload.libraries.length<=16&&e.payload.libraries.every(x=>typeof x==='string'&&x.length>0&&x.length<=80)&&typeof e.payload.ageGroup==='string'&&e.payload.ageGroup.length<=20;
 if(e.action==='recommendation_create')return typeof e.payload.bookname==='string'&&e.payload.bookname.trim().length>0&&e.payload.bookname.length<=100&&typeof e.payload.authors==='string'&&e.payload.authors.length<=80&&typeof e.payload.comment==='string'&&e.payload.comment.length<=120;
 return true;
}
