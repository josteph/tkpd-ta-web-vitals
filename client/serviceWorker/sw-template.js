/* eslint-disable no-restricted-globals */
const VERSION = new Date().getTime();

if ('function' === typeof importScripts) {
  /* global workbox */
  if (workbox) {
    workbox.core.clientsClaim();

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

    /* cleanup for outdated caches */
    workbox.precaching.cleanupOutdatedCaches();

    /* offline support for GA */
    workbox.googleAnalytics.initialize();

    /* custom cache rules */
    workbox.routing.registerNavigationRoute('/index.html', {
      blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/, new RegExp("\\/api\\/?")],
    });

    // Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
    workbox.routing.registerRoute(
      /^https:\/\/fonts\.googleapis\.com/,
      new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
      }),
    );

    // Cache the underlying font files with a cache-first strategy for 1 year.
    workbox.routing.registerRoute(
      /^https:\/\/fonts\.gstatic\.com/,
      new workbox.strategies.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new workbox.cacheableResponse.Plugin({
            statuses: [0, 200],
          }),
          new workbox.expiration.Plugin({
            maxAgeSeconds: 60 * 60 * 24 * 365,
            maxEntries: 30,
          }),
        ],
      }),
    );

    workbox.routing.registerRoute(
      /\.(?:png|gif|jpeg|jpg|webp|svg)$/,
      new workbox.strategies.CacheFirst({
        cacheName: `local-image-cache-${VERSION}`,
        plugins: [new workbox.cacheableResponse.Plugin({ statuses: [200] })],
      }),
      'GET',
    );

    workbox.routing.registerRoute(
      /\.(?:css)$/,
      new workbox.strategies.StaleWhileRevalidate({
        cacheName: `css-cache-${VERSION}`,
        plugins: [
          new workbox.cacheableResponse.Plugin({
            statuses: [200],
            headers: { 'Content-Type': 'text/css' },
          }),
        ],
      }),
      'GET',
    );

    workbox.routing.registerRoute(
      /\.(?:js)$/,
      new workbox.strategies.StaleWhileRevalidate({
        cacheName: `js-cache-${VERSION}`,
        plugins: [
          new workbox.cacheableResponse.Plugin({
            statuses: [200],
            headers: { 'Content-Type': 'application/javascript' },
          }),
        ],
      }),
      'GET',
    );

    self.addEventListener('install', () => {
      // Event listener for workbox installed
      console.log('SW installed!');
      console.log('Current version:', VERSION);
    });

    self.addEventListener('activate', () => {
      /*
       * new version of SW is activated and is starting to handle request,
       * we can safely delete old cache now
       */
      console.log('SW activated!');
      caches.keys().then(keys => {
        console.log('current cache keys...', keys);
        let deletedOldCache = false;

        keys.forEach(key => {
          if (key.indexOf(VERSION) < 0) {
            console.log('deleted cache key:', key);
            caches.delete(key);
            deletedOldCache = true;
          }
        });

        /* invalidate current active service worker, might affect the experience */
        if (deletedOldCache) {
          self.skipWaiting();
        }
      });
    });
  } else {
    console.log('Workbox could not be loaded. Offline support is currently unavailable.');
  }
}
