"use strict";

// CODELAB: Update cache names any time any of the cached files change.
const CACHE_NAME = "static-cache-v1";

// CODELAB: Add list of files to cache here.
const FILES_TO_CACHE = ["/index.html"];

self.addEventListener("install", (evt) => {
  console.log("[ServiceWorker] Install");
  // CODELAB: Precache static resources here.
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[ServiceWorker] Pre-caching offline page");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (evt) => {
  console.log("[ServiceWorker] Activate");
  // CODELAB: Remove previous cached data from disk.
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[ServiceWorker] Removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (evt) => {
  //   console.log("[ServiceWorker] Fetch", evt.request.url);
  // CODELAB: Add fetch event handler here.
  if (evt.request.mode !== "navigate") {
    // Not a page navigation, bail.
    return;
  }
  evt.respondWith(
    fetch(evt.request).catch(() => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match("index.html");
      });
    })
  );
});

// ---https://dzone.com/articles/how-to-build-a-progressive-web-app-pwa-with-javasc
// const CACHE_STATIC_NAME = "static";

// const URLS_TO_PRECACHE = [
//   "/",
//   "index.html",
//   "src/js/app.js",
//   "src/js/feed.js",
//   "src/lib/material.min.js",
//   "src/css/app.css",
//   "src/css/feed.css",

//   "src/images/main-image.jpg",

//   "https://fonts.googleapis.com/css?family=Roboto:400,700",

//   "https://fonts.googleapis.com/icon?family=Material+Icons"
// ];

// self.addEventListener("install", event => {
//   console.log("[Service Worker] Installing Service Worker ...", event);

//   event.waitUntil(
//     caches
//       .open(CACHE_STATIC_NAME)

//       .then(cache => {
//         console.log("[Service Worker] Precaching App Shell");

//         cache.addAll(URLS_TO_PRECACHE);
//       })

//       .then(() => {
//         console.log("[ServiceWorker] Skip waiting on install");

//         return self.skipWaiting();
//       })
//   );
// });

// self.addEventListener("fetch", event => {
//   console.log("[Service Worker] Fetching something ....", event);
//   event.respondWith(
//     caches.match(event.request).then(response => {
//       if (response) {
//         console.log(response);
//         return response;
//       }

//       return fetch(event.request);
//     })
//   );
// });
