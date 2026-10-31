/* Second Half service worker: notifications only, no caching (so new deploys show up right away) */
self.addEventListener("install",()=>self.skipWaiting());
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("notificationclick",e=>{e.notification.close();e.waitUntil((async()=>{
  const cs=await self.clients.matchAll({type:"window",includeUncontrolled:true});
  for(const c of cs){if("focus" in c)return c.focus()}
  return self.clients.openWindow("./#live")})())});
