// Service worker: приложение работает без интернета. Поменял файлы — увеличь VERSION.
const VERSION = "norsk-v12";
const CORE = ["./", "index.html", "styles.css", "data.js", "data-nazarka.js", "words-a1.js", "words-a2.js", "words-verbs.js", "words-more.js", "words-a1b.js", "words-a2b.js", "words-a2c.js", "words-b1a.js", "words-b1b.js", "words-me.js", "words-batch.js", "words-b1c.js", "words-b2a.js", "words-c1a.js", "words-more2.js", "words-a2d.js", "words-b-big.js", "stories-me.js", "stories-user.js", "grammar.js", "grammar-noun.js", "grammar-verb.js", "grammar-glue.js", "grammar-parts.js", "app.js", "extras.js", "verbs-more.js", "dialogs-more.js", "dialogs-extra.js", "view-words.js", "view-stories.js", "view-grammar.js", "view-path.js", "view-notebook.js", "main.js", "manifest.webmanifest", "icon.svg", "icon-192.png", "icon-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.match(e.request).then(hit => {
    const net = fetch(e.request).then(r => { if (r.ok) { const copy = r.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); } return r; }).catch(() => hit);
    return hit || net;
  }));
});
