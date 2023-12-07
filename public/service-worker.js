//--- Install service worker. ---//
const installEvent = () => {
  self.addEventListener("install", () => {
    console.log("service worker installed");
  });
};

installEvent();

//--- Activate service worker. ---//
const activateEvent = () => {
  self.addEventListener("activate", () => {
    console.log("service worker activated");
  });
};

activateEvent();

//--- Caching assets of current page. ---//
const cacheName = "v1";

const cacheClone = async (e) => {
  // Page cache.
  const res = await fetch(e.request);
  // Clone cache
  const resClone = res.clone();

  const cache = await caches.open(cacheName);
  await cache.put(e.request, resClone);
  return res;
};

const fetchEvent = () => {
  self.addEventListener("fetch", (e) => {
    e.respondWith(
      cacheClone(e)
        .catch(() => caches.match(e.request))
        .then((res) => res)
    );
  });
};

//--- Send message to client ---//
const sendMessageToClient = (message) => {
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage(message);
    });
  });
};

fetchEvent();
