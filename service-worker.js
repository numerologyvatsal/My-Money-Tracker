const CACHE='my-money-v5';
const ASSETS=['./','./index.html','./styles.css','./app.js','./pdf-lib.min.js','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png'];

self.addEventListener('install',event=>{
  event.waitUntil(
    caches.open(CACHE)
      .then(cache=>Promise.all(ASSETS.map(url=>fetch(url,{cache:'reload'}).then(response=>cache.put(url,response)))))
      .then(()=>self.skipWaiting())
  );
});

self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key))))
      .then(()=>self.clients.claim())
      .then(()=>self.clients.matchAll({type:'window',includeUncontrolled:true}))
      .then(clients=>Promise.all(clients.map(client=>client.navigate(client.url))))
  );
});

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const fallback=event.request.mode==='navigate'?'./index.html':event.request;
  event.respondWith(
    fetch(event.request,{cache:'no-store'})
      .then(response=>{
        const copy=response.clone();
        caches.open(CACHE).then(cache=>cache.put(event.request,copy));
        return response;
      })
      .catch(()=>caches.match(fallback))
  );
});
