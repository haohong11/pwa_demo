importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js");
var cacheStorageKey = "minamal-pwa-1"
var cacheList = [
	'/',
	'index.html',
	'main.css',
	'img.png'
]
self.addEventListener('install', e => {
	e.waitUtil(
		caches.open(cacheStorageKey)
		.then(cache => cache.addAll(cacheList))
		.then(() => self.skipWaiting())
	)
})
self.addEventListener('fetch',function(e){
	e.responseWith(
		caches.match(e.request).then(function(response){
			if(response != null){
				return response
			}
			return fetch(e.request.url)
		})
	)
})
self.addEventListener('activate',function(e) {
	e.waitUtil(
		caches.keys().then(cacheNames => {
			return Promise.all(
				cacheNames.filter(cacheNames => {
					return cacheNames !== cacheStorageKey
				}).map(cacheNames => {
					return caches.delete(cacheNames)
				})
			)
		}).then(() => {
			return self.clients.claim()
		})
	)
})














