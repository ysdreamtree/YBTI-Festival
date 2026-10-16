import {record} from './events.js';
let state={id:crypto.randomUUID(),completed:false,entry:'quiz',likes:new Set(),recommendations:0,sequence:0};let queue=Promise.resolve();
export function currentSession(){return state;}
export function setEntry(entry){state.entry=entry;}
export function resetSession(){state={id:crypto.randomUUID(),completed:false,entry:'quiz',likes:new Set(),recommendations:0,sequence:0};}
export function logEvent(action,type,payload={}){
 const sessionId=state.id,entry=state.entry,sequence=++state.sequence,source=new URLSearchParams(location.search).has('type')?'mobile':'tablet';
 const task=queue.then(()=>record({action,type,sessionId,source,payload:{...payload,entry,sequence}}));queue=task.catch(()=>{});return task;
}
export async function completeResult(type){const completing=state;if(completing.completed)return;completing.completed=true;try{await logEvent(new URLSearchParams(location.search).has('type')?'result_view':'quiz_complete',type);}catch(e){completing.completed=false;throw e;}}
export function flushEvents(){return queue;}
