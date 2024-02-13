import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import { Workbox } from 'workbox-window';

// Custom list of files to precache
const precacheManifest = [
  { url: '/', revision: '1' }, // Index HTML
  { url: '/index.html', revision: '1' }, // Additional HTML files
  { url: '/dist/main.bundle.js', revision: '1' }, // Main JavaScript bundle
  { url: '/src/css/style.css', revision: '1' }, // CSS files
  { url: '/favicon.ico', revision: '1' }, // Favicon
  { url: '/src/images', revision: '1' },
  { url: '/src/js/database.js', revision: '1' },
  { url: '/src/js/editor.js', revision: '1' },
  { url: '/src/js/header.js', revision: '1' },
  { url: '/src/js/index.js', revision: '1' },
  { url: '/src/js/install.js', revision: '1' },
];

// Precache and route all assets
precacheAndRoute(precacheManifest);

// Cache pages with a CacheFirst strategy
registerRoute(
  ({ request }) => request.mode === 'navigate',
  new CacheFirst({
    cacheName: 'pages',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200],
      }),
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      }),
    ],
  })
);

// Cache assets with a StaleWhileRevalidate strategy
registerRoute(
  ({ request }) => request.destination === 'script' ||
                  request.destination === 'style' ||
                  request.destination === 'image',
  new StaleWhileRevalidate({
    cacheName: 'assets',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
      }),
    ],
  })
);

// Initialize Workbox after the service worker is registered
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const wb = new Workbox('/src-sw.js');
    wb.register();
  });
}
