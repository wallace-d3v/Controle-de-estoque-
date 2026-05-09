const CACHE_NAME = "controle-estoque-v1";
const ARQUIVOS_ESTATICOS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./pages/configuracoes.html",
  "./css/reset.css",
  "./css/variaveis.css",
  "./css/global.css",
  "./css/layout.css",
  "./css/componentes.css",
  "./css/responsivo.css",
  "./styles/configuracoes.css",
  "./js/utils.js",
  "./js/validacoes.js",
  "./js/categorias.js",
  "./js/storage.js",
  "./js/produtos.js",
  "./js/mensagem.js",
  "./js/whatsapp.js",
  "./js/app.js",
  "./scripts/configuracoes.js",
  "./data/produtos-iniciais.js",
  "./assets/icons/icon.svg",
  "./assets/icons/icon-maskable.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(ARQUIVOS_ESTATICOS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(event.request.url);

  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== "basic") {
          return networkResponse;
        }

        const responseClone = networkResponse.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });

        return networkResponse;
      });
    })
  );
});
