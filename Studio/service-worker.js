const CACHE_NAME = 'webapp-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/indexava.html',
    '/style.css',
    '/script.js',
];

// 1. Instalando o Service Worker e armazenando arquivos no Cache
self.addEventListener('install', event => {
    console.log('Service Worker instalado!');
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Arquivos adicionados ao cache');
            return cache.addAll(urlsToCache);
        })
    );
});

// 2. Interceptando requisições (Cache primeiro, depois rede)
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

// 3. Recebendo Push Notifications
self.addEventListener('push', event => {
    const data = event.data ? event.data.json() : {title: 'Notificação', message: 'Mensagem de teste'};
    self.registration.showNotification(data.title, {
        body: data.message,
        icon: '/icon.png'
    });
});

