// Service Worker — macht die App offline-fähig und installierbar.
// Eigene Dateien: network-first, damit Updates ankommen, Cache als Rückfall.
// CDN: cache-first, die URLs sind versioniert und ändern sich nie. React
// liegt seit 1.5 im Ordner vendor und ist damit eine eigene Datei, das CDN
// wird dafür nicht mehr gebraucht.

const CACHE = 'zeitwerk-v2';

const SHELL = [
  './',
  './index.html',
  './support.js',
  './vendor/react.production.min.js',
  './vendor/react-dom.production.min.js',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-180.png',
  './icons/icon-maskable-512.png'
];

// Bleibt für Schriften und alles, was doch einmal von außen kommt. React
// steht oben im SHELL und wird hier nicht mehr gebraucht.
const VENDOR = [];

const isVendor = (url) =>
  url.hostname === 'unpkg.com' ||
  url.hostname === 'fonts.googleapis.com' ||
  url.hostname === 'fonts.gstatic.com';

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then(async (c) => {
      await c.addAll(SHELL);
      // Einzeln, damit ein blockiertes CDN die Installation nicht scheitern lässt.
      await Promise.all(VENDOR.map(u => c.add(new Request(u, { mode: 'cors' })).catch(() => {})));
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (isVendor(url)) {
    e.respondWith(
      caches.match(req).then(hit => hit || fetch(req).then(res => {
        if (res.ok || res.type === 'opaque') {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return res;
      }))
    );
    return;
  }

  if (url.origin !== location.origin) return;

  e.respondWith(
    fetch(req)
      .then(res => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
  );
});
