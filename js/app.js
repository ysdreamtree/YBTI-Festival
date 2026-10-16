import {deviceId} from './events.js';
import {allEvents} from './db.js';
import {startSync} from './sync.js';
async function refresh(){const events=await allEvents();document.querySelector('#device').textContent=await deviceId();document.querySelector('#pending').textContent=events.filter(e=>!e.syncedAt).length;}
refresh().catch(e=>document.querySelector('#status').textContent=e.message);
startSync(s=>{document.querySelector('#status').textContent=JSON.stringify(s);refresh();});
if('serviceWorker' in navigator)navigator.serviceWorker.register('./service-worker.js').catch(e=>document.querySelector('#status').textContent=e.message);
