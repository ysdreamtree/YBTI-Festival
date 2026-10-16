export async function offlineStatus(){
 if(!('serviceWorker' in navigator)||!('caches' in window))return {ready:false,reason:'이 브라우저는 오프라인 설치를 지원하지 않습니다.'};
 const manifest=await fetch(new URL('../precache-list.json',import.meta.url)).then(r=>r.json());
 if(!(await caches.keys()).includes(manifest.cacheName))return {ready:false,reason:'아직 오프라인 자산을 설치 중입니다.'};
 const cache=await caches.open(manifest.cacheName);const scope=new URL('../',import.meta.url);
 const misses=(await Promise.all(manifest.assets.map(async path=>await cache.match(new URL(path,scope).href)?null:path))).filter(Boolean);
 return {ready:misses.length===0,total:manifest.assets.length,missing:misses.length,reason:misses.length?'오프라인 자산 설치 중입니다.':'오프라인 자산 캐시 확인 완료. 비행기 모드에서 재실행을 확인하세요.'};
}
