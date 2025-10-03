const CACHE_NAME = 'daily-money-tree-v2';
const urlsToCache = [
    '/daily_money/',
    '/daily_money/index.html',
    '/daily_money/app.css',
    '/daily_money/app.js',
    '/daily_money/manifest.json'
];

// インストール時のキャッシュ
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(urlsToCache))
    );
});

// リクエスト時のキャッシュ利用
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => response || fetch(event.request))
    );
});

// 古いキャッシュの削除
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
