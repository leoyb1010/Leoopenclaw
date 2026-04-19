/**
 * sw.js - Service Worker（重写版）
 * 改进：
 * 1. 版本化缓存命名
 * 2. 按资源类型区分缓存策略
 * 3. 不缓存第三方 CDN
 * 4. 提供离线页
 * 5. 激活时清理旧缓存
 */

var CACHE_VERSION = 'v2';
var APP_CACHE = 'zhimai-app-' + CACHE_VERSION;
var STATIC_CACHE = 'zhimai-static-' + CACHE_VERSION;

// 预缓存的核心资源（仅本站资源）
var APP_SHELL = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json'
];

// 安装：预缓存核心资源
self.addEventListener('install', function (event) {
  console.log('[SW] Installing, cache:', APP_CACHE);
  event.waitUntil(
    caches.open(APP_CACHE)
      .then(function (cache) {
        return cache.addAll(APP_SHELL).catch(function (err) {
          console.warn('[SW] Pre-cache failed:', err);
        });
      })
      .then(function () {
        return self.skipWaiting();
      })
  );
});

// 激活：清理旧缓存
self.addEventListener('activate', function (event) {
  console.log('[SW] Activating');
  event.waitUntil(
    caches.keys()
      .then(function (names) {
        var toDelete = names.filter(function (name) {
          return name.indexOf('zhimai-') === 0 && name !== APP_CACHE && name !== STATIC_CACHE;
        });
        return Promise.all(toDelete.map(function (name) {
          console.log('[SW] Deleting old cache:', name);
          return caches.delete(name);
        }));
      })
      .then(function () {
        return self.clients.claim();
      })
  );
});

// 请求拦截：按类型区分策略
self.addEventListener('fetch', function (event) {
  var request = event.request;

  // 只处理 GET 请求
  if (request.method !== 'GET') return;

  var url = new URL(request.url);

  // 跳过第三方 CDN（Tailwind、Google Fonts 等）
  // 这些资源本身有强缓存，不应由 SW 管理
  var isThirdParty = url.origin !== self.location.origin;
  if (isThirdParty) return;

  // HTML 页面：Network First，失败回退到缓存或离线页
  if (request.headers.get('accept') && request.headers.get('accept').indexOf('text/html') !== -1) {
    event.respondWith(
      fetch(request)
        .then(function (response) {
          var clone = response.clone();
          caches.open(APP_CACHE).then(function (cache) {
            cache.put(request, clone);
          });
          return response;
        })
        .catch(function () {
          return caches.match(request)
            .then(function (cached) {
              return cached || caches.match('/offline.html');
            });
        })
    );
    return;
  }

  // 本站静态资源（CSS/JS/图片）：Cache First，网络回退
  if (url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|webp|ico|woff2?)$/i)) {
    event.respondWith(
      caches.match(request)
        .then(function (cached) {
          if (cached) return cached;
          return fetch(request).then(function (response) {
            if (response.ok) {
              var clone = response.clone();
              caches.open(STATIC_CACHE).then(function (cache) {
                cache.put(request, clone);
              });
            }
            return response;
          });
        })
    );
    return;
  }

  // 其他请求：网络优先
  event.respondWith(
    fetch(request).catch(function () {
      return caches.match(request);
    })
  );
});

// 支持跳过等待消息
self.addEventListener('message', function (event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
