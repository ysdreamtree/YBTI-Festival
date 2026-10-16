import {CONFIG} from './config.js';
import {saveEvent,getSetting,setSetting} from './db.js';
export const ACTIONS=['quiz_complete','result_view','like','unlike','related_open','recommendation_create','profile_update','qr_generate'];
export async function deviceId(){let r=await getSetting('deviceId');if(!r){r={value:'UNASSIGNED-'+crypto.randomUUID()};await setSetting('deviceId',r.value);}return r.value;}
export function makeEvent({action,type=null,sessionId,source='tablet',payload={}},device){if(!ACTIONS.includes(action)||!sessionId)throw new Error('잘못된 이벤트');return {id:crypto.randomUUID(),schemaVersion:1,eventId:CONFIG.eventId,deviceId:device,sessionId,source,action,type,payload,createdAt:new Date().toISOString(),syncedAt:null};}
export async function record(input){const e=makeEvent(input,await deviceId());await saveEvent(e);return e;}
