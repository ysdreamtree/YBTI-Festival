import {CONFIG} from './config.js';
import {validateBackup} from './backup.js';
export function parseCSV(text){
 text=String(text).replace(/^\uFEFF/,'');if(text.length>20000000)throw Error('CSV는 20MB 이하로 올려주세요.');
 const rows=[];let row=[],cell='',quoted=false,closed=false;
 for(let i=0;i<text.length;i++){const ch=text[i];if(quoted){if(ch==='"'){if(text[i+1]==='"'){cell+='"';i++;}else{quoted=false;closed=true;}}else cell+=ch;continue;}
 if(ch==='"'){if(cell||closed)throw Error('CSV 따옴표 형식 오류');quoted=true;}else if(ch===','||ch==='\n'||ch==='\r'){row.push(cell);cell='';closed=false;if(ch!==','){if(ch==='\r'&&text[i+1]==='\n')i++;if(row.some(v=>v!==''))rows.push(row);row=[];if(rows.length>100001)throw Error('CSV 행이 너무 많습니다.');}}else{if(closed)throw Error('CSV 따옴표 뒤 형식 오류');cell+=ch;}}
 if(quoted)throw Error('CSV 따옴표가 닫히지 않았습니다.');if(cell||row.length||closed){row.push(cell);if(row.some(v=>v!==''))rows.push(row);}return rows;
}
export function csvBackup(text){const rows=parseCSV(text),headers=rows.shift()||[],columns=['id','eventId','deviceId','sessionId','source','action','type','createdAt','syncedAt','payload'];if(headers.length!==columns.length||new Set(headers).size!==columns.length||columns.some(c=>!headers.includes(c)))throw Error('이 앱에서 내보낸 이벤트 CSV를 선택해 주세요.');const events=rows.map((row,index)=>{if(row.length!==headers.length)throw Error(`CSV ${index+2}행 열 수 오류`);const e=Object.fromEntries(headers.map((h,i)=>[h,row[i].replace(/^'(?=[=+@\-\t\r])/,'')]));try{e.payload=JSON.parse(e.payload);}catch{throw Error(`CSV ${index+2}행 기록 내용 오류`);}return {...e,schemaVersion:1,type:e.type||null,syncedAt:e.syncedAt||null};});const backup={schemaVersion:1,eventId:CONFIG.eventId,events};validateBackup(backup);return backup;}
