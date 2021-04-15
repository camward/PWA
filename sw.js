const staticCacheName = "s-app-v1";

const assetUrls = ["index.html", "/js/app.js", "/css/styles.css"];

self.addEventListener("install", async (event) => {
  const cache = await caches.open(staticCacheName);
  await cache.addAll(assetUrls);
});

self.addEventListener("activate", async (event) => {
  console.log("SW - activate");
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  event.respondWith(cacheFirst(request));
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  return cached ?? (await fetch(request));
}
