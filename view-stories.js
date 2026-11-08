// ===== 📖 Истории: перевод слова по клику прямо в тексте =====
let stLv = "all", stCur = "";
const stripArt = s => s.toLowerCase().replace(/^(en|ei|et|å) /, "");
const decodeEsc = s => String(s).replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
// у старых своих историй текст был сохранён уже экранированным
const sx = (s, k) => s.mine && !s.raw ? decodeEsc(s[k]) : s[k];

// ---------- Словарь для клика ----------
const FUNC = `jeg=я;du=ты;han=он;hun=она;vi=мы;dere=вы;de=они; те;meg=меня, мне;deg=тебя, тебе;ham=его, ему;henne=её, ей;oss=нас, нам;dem=их, им;det=это; оно;den=он/она/оно (о вещи); тот;dette=это;denne=этот;disse=эти;min=мой;mi=моя;mitt=моё;mine=мои;din=твой;di=твоя;ditt=твоё;dine=твои;hans=его;hennes=её;vår=наш;vårt=наше;våre=наши;deres=их; ваш;sin=свой;si=своя;sitt=своё;sine=свои;selv=сам;seg=себя;
og=и;men=но;eller=или;så=так; потом; поэтому;for=для; за; потому что; слишком;fordi=потому что;at=что (союз);om=о; ли; через;hvis=если;når=когда;da=тогда; когда (один раз в прошлом);mens=пока;som=который; как;enn=чем;før=до; раньше;etter=после;siden=с тех пор; так как;derfor=поэтому;ettersom=так как;
i=в;på=на;til=к; в; для;fra=из; от;med=с;uten=без;hos=у (человека);av=из; от;under=под;over=над;mellom=между;ved=у; возле;rundt=вокруг;gjennom=через;mot=к; против;
ikke=не;ingen=никакой;ingenting=ничего;noen=какие-то; кто-то;noe=что-то;alle=все;alt=всё;mye=много;mange=много;litt=немного;lite=мало;hver=каждый;hele=весь;helt=совсем;
her=здесь;der=там;hit=сюда;dit=туда;hjemme=дома;hjem=домой;ute=на улице;inne=внутри;ofte=часто;alltid=всегда;aldri=никогда;ganske=довольно;veldig=очень;også=тоже;bare=только;allerede=уже;ennå=ещё;fortsatt=всё ещё;kanskje=может быть;nå=сейчас;snart=скоро;igjen=снова;sammen=вместе;alene=один;først=сначала;
hva=что;hvor=где; куда;hvem=кто;hvorfor=почему;hvordan=как;hvilken=какой;hvilket=какое;hvilke=какие;
kan=может, умеет;vil=хочет;skal=собирается; должен;må=должен;bør=стоит;kunne=мог;ville=хотел;skulle=должен был;måtte=пришлось;
en=один; какой-то;ei=одна; какая-то;et=один; какой-то;ett=один;to=два;tre=три;fire=четыре;fem=пять;seks=шесть;sju=семь;syv=семь;åtte=восемь;ni=девять;ti=десять;ja=да;nei=нет;takk=спасибо;hei=привет;opp=вверх;ned=вниз;ut=наружу;inn=внутрь;samme=тот же;flott=отличный;folk=люди;gammel=старый;gamle=старый;mor=мама; мать;far=папа; отец;te=чай;nord=север;sør=юг;kul=крутой;kult=круто;snill=добрый;hyggelig=приятный;sterk=сильный;fotball=футбол;norsk=норвежский;forrige=прошлый;utsikt=вид;spesiell=особый;spesielt=особенно;egen=собственный;egne=собственные;natur=природа;luft=воздух;kode=код;koding=программирование;logikk=логика;slappe=расслабляться;å=частица инфинитива («-ть»)`;
let _DICT = null;
function getDict() {
  if (_DICT) return _DICT;
  const d = new Map(), put = (k, v, pri) => { if (!k || /\s/.test(k)) return; const o = d.get(k); if (!o || pri < o.pri) d.set(k, Object.assign({ pri }, v)); };
  FUNC.split(/;\s*(?=[a-zæøå]+=)/).forEach(p => { const i = p.indexOf("="); if (i > 0) put(p.slice(0, i).trim().toLowerCase(), { ru: p.slice(i + 1).trim(), base: "" }, 0); });
  const vf = [[0, "инфинитив"], [1, "наст. время"], [2, "прош. время"], [3, "причастие"], [4, "повелит."]];
  VERBS.forEach(v => vf.forEach(([k, lab]) => { const key = v[k].toLowerCase(), o = d.get(key);
    if (o && o.pri === 1 && o.base === "å " + v[0]) { if (!o.note.includes(lab)) o.note += " / " + lab; return; }
    put(key, { ru: v[5], base: "å " + v[0], note: lab + " от å " + v[0] }, 1); }));
  allWords().forEach(w => put(stripArt(w.no), { ru: w.ru, base: w.no }, 2));
  (typeof REF !== "undefined" && REF.cards || []).forEach(c => put(stripArt(c[0]), { ru: c[1], base: c[0] }, 3));
  return _DICT = d;
}
function variants(t) {
  const out = [t];
  ["ene", "ane", "ere", "est", "er", "ar", "en", "et", "a", "e", "s", "t", "de", "te"].forEach(s => {
    if (t.length > s.length + 1 && t.endsWith(s)) { const st = t.slice(0, -s.length); out.push(st, st + "e"); if (st.length > 2 && st.at(-1) === st.at(-2)) out.push(st.slice(0, -1)); }
  });
  return out;
}
// story — чтобы сначала использовать разбор слов именно этой истории
function lookup(raw, story) {
  const t = raw.toLowerCase(), d = getDict(), vs = story ? story.vocab.filter(v => !/\s/.test(v[0])) : [];
  for (const k of variants(t)) {
    const u = S.mistakes.find(m => stripArt(m.no) === k && m.ru && m.ru !== "—"); if (u) return { ru: u.ru, base: u.no, note: "из твоего блокнота", fuzzy: k !== t };
    const sv = vs.find(v => stripArt(v[0]) === k); if (sv) return { ru: sv[1], base: sv[0], note: "", fuzzy: k !== t };
    const h = d.get(k); if (h) return { ru: h.ru, base: h.base, note: h.note || "", fuzzy: k !== t };
  }
  return null;
}
function phraseFor(t, story) {
  if (!story) return null;
  const vs = variants(t.toLowerCase());
  return story.vocab.find(v => /\s/.test(v[0]) && v[0].toLowerCase().split(" ").some(p => vs.includes(p))) || null;
}

// ---------- Всплывающая подсказка ----------
let popEl = null;
function closePop() { if (popEl) { popEl.remove(); popEl = null; } document.querySelectorAll(".w.sel").forEach(w => w.classList.remove("sel")); }
function showPop(el, html) {
  closePop();
  const p = popEl = document.createElement("div"); p.className = "pop"; p.innerHTML = html; document.body.appendChild(p);
  const r = el.getBoundingClientRect(), pw = p.offsetWidth, ph = p.offsetHeight, sx_ = scrollX, sy = scrollY;
  let left = r.left + r.width / 2 - pw / 2 + sx_; left = Math.max(8 + sx_, Math.min(left, sx_ + innerWidth - pw - 8));
  const up = r.top > ph + 20;
  p.style.left = left + "px"; p.style.top = (up ? r.top + sy - ph - 12 : r.bottom + sy + 12) + "px";
  p.classList.add(up ? "up" : "down");
  p.style.setProperty("--ax", Math.max(12, Math.min(pw - 24, r.left + r.width / 2 + sx_ - left - 5)) + "px");
  return p;
}
document.addEventListener("click", e => { if (popEl && !e.target.closest(".pop,.w")) closePop(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closePop(); });
addEventListener("resize", closePop);

const WORD_RE = /[A-Za-zÆØÅæøåÀ-ÖØ-öø-ÿ]+(?:[-'’][A-Za-zÆØÅæøåÀ-ÖØ-öø-ÿ]+)*/g;
function wrapWords(text) {
  let out = "", last = 0, m; WORD_RE.lastIndex = 0;
  while ((m = WORD_RE.exec(text))) { out += esc(text.slice(last, m.index)) + `<span class="w" data-w="${esc(m[0])}">${esc(m[0])}</span>`; last = m.index + m[0].length; }
  return out + esc(text.slice(last));
}
function markNotebook(box) {
  const set = new Set(S.mistakes.map(m => stripArt(m.no)));
  box.querySelectorAll(".w").forEach(w => { const t = w.dataset.w.toLowerCase(); w.classList.toggle("nb", variants(t).some(v => set.has(v))); });
}
function wordPopup(span, story, box) {
  const tok = span.dataset.w, r = lookup(tok, story), ph = phraseFor(tok, story);
  span.classList.add("sel");
  const key = r && r.base ? r.base : tok;
  let h = r
    ? `<div class="pw">${esc(tok)}${r.fuzzy && r.base ? " → " + esc(r.base) : ""}</div><div class="pt">${esc(r.ru)}</div>${r.note ? `<div class="pn">${esc(r.note)}</div>` : ""}`
    : `<div class="pw">${esc(tok)}</div><div class="pt">Нет в словаре</div><div class="pn">Впиши свой перевод — слово сохранится в блокнот</div><div class="pa"><input type="text" id="pin" placeholder="Перевод"><button class="ib sm" id="psv" aria-label="Сохранить">＋</button></div>`;
  if (ph) h += `<div class="pn">Часть выражения: <b>${esc(ph[0])}</b> — ${esc(ph[1])}</div>`;
  if (r) h += `<div class="pa"><button class="ib sm" id="psd" aria-label="Озвучить">🔊</button><button class="ib sm heart ${inNote(key) ? "on" : ""}" id="phb" aria-label="В блокнот">${inNote(key) ? "♥" : "♡"}</button></div>`;
  const p = showPop(span, h);
  const sd = p.querySelector("#psd"); if (sd) sd.onclick = () => say(tok);
  const hb = p.querySelector("#phb"); if (hb) hb.onclick = () => { const on = noteToggle(key, r.ru); hb.classList.toggle("on", on); hb.textContent = on ? "♥" : "♡"; markNotebook(box); toast(on ? "Добавлено в блокнот ♥" : "Убрано из блокнота"); };
  const sv = p.querySelector("#psv");
  if (sv) { const save_ = () => { const v = p.querySelector("#pin").value.trim(); if (!v) return; addMistake(tok.toLowerCase(), v); markNotebook(box); closePop(); toast("Сохранено в блокнот"); }; sv.onclick = save_; p.querySelector("#pin").onkeydown = e => { if (e.key === "Enter") save_(); }; }
  say(tok);
}

// ---------- Список историй ----------
function viewStories() {
  stCur = "";
  const list = STORIES.filter(s => stLv === "all" || s.level === stLv);
  app.innerHTML = `<div class="top"><div><h1>Истории</h1><p class="sub">${STORIES.length} историй · нажми на любое слово в тексте — появится перевод</p></div></div>
    <div class="chips">${["all", ...LEVELS].map(l => `<button class="chip ${l === stLv ? "on" : ""}" data-f="${l}">${l === "all" ? "Все" : l}</button>`).join("")}<button class="chip" id="addst">＋ Своя история</button></div>` +
    (list.length ? list.map(s => `<button class="stitem" data-id="${esc(s.id)}"><span class="lb">${s.level}</span><span><b>${esc(sx(s, "title"))}</b><small>${esc(sx(s, "ru"))}</small></span></button>`).join("") : '<p class="sub">Историй этого уровня пока нет.</p>');
  app.querySelectorAll("[data-id]").forEach(b => b.onclick = () => openStory(b.dataset.id));
  app.querySelectorAll("[data-f]").forEach(b => b.onclick = () => { stLv = b.dataset.f; viewStories(); });
  $("#addst").onclick = storyForm;
}
function openStory(id) {
  const s = STORIES.find(x => x.id === id); if (!s) return viewStories();
  stCur = id;
  app.innerHTML = `<button class="btn ghost sm" id="bk">← Назад</button><h1 style="margin-top:14px">${esc(sx(s, "title"))}</h1><p class="sub">${esc(sx(s, "ru"))}</p>
    <div class="card"><div class="story" id="story">${wrapWords(sx(s, "no"))}</div>
    <div class="chips"><button class="btn ghost sm" id="sd">🔊 Слушать всё</button><button class="btn ghost sm" id="tg">Показать перевод текста</button></div>
    <p class="tr" id="tr" hidden>${esc(sx(s, "tr"))}</p></div>
    <p class="sub small">💡 Слова с жёлтым подчёркиванием уже в твоём блокноте.</p>
    ${s.vocab.length ? `<h2>Разбор слов</h2><div class="card" id="vc">${s.vocab.map((v, i) => `<div class="vrow"><span><b>${esc(v[0])}</b><span>${esc(v[1])}</span></span><span style="display:flex;gap:6px"><button class="ib sm" data-vs="${i}" aria-label="Озвучить">🔊</button><button class="ib sm heart ${inNote(v[0]) ? "on" : ""}" data-vh="${i}" aria-label="В блокнот">${inNote(v[0]) ? "♥" : "♡"}</button></span></div>`).join("")}</div>
      <button class="btn ghost" id="allv">Добавить весь разбор в блокнот</button>` : ""}
    ${s.mine ? '<div style="margin-top:14px"><button class="btn ghost" id="del">Удалить историю</button></div>' : ""}`;
  const box = $("#story");
  markNotebook(box);
  $("#bk").onclick = viewStories;
  $("#sd").onclick = () => say(sx(s, "no"));
  $("#tg").onclick = () => { const t = $("#tr"); t.hidden = !t.hidden; $("#tg").textContent = t.hidden ? "Показать перевод текста" : "Скрыть перевод текста"; };
  box.onclick = e => { const w = e.target.closest(".w"); if (!w) return; if (w.classList.contains("sel")) return closePop(); wordPopup(w, s, box); };
  app.querySelectorAll("[data-vs]").forEach(b => b.onclick = () => say(s.vocab[b.dataset.vs][0]));
  app.querySelectorAll("[data-vh]").forEach(b => b.onclick = () => { const v = s.vocab[b.dataset.vh], on = noteToggle(v[0], v[1]); b.classList.toggle("on", on); b.textContent = on ? "♥" : "♡"; markNotebook(box); });
  if ($("#allv")) $("#allv").onclick = () => { s.vocab.forEach(v => { if (!inNote(v[0])) noteToggle(v[0], v[1]); }); toast("Разбор добавлен в блокнот"); openStory(id); };
  if ($("#del")) $("#del").onclick = () => { if (!confirm("Удалить историю?")) return; S.userStories = S.userStories.filter(x => x.id !== s.id); STORIES.splice(STORIES.indexOf(s), 1); save(); viewStories(); };
}

// ---------- Свои истории ----------
function loadUserStories() { (S.userStories || []).forEach(s => { if (!STORIES.some(x => x.id === s.id)) STORIES.push(s); }); }
function storyForm() {
  let lv = "A1";
  app.innerHTML = `<button class="btn ghost sm" id="bk">← Назад</button><h1 style="margin-top:14px">Новая история</h1>
    <input type="text" id="st" class="search" placeholder="Название по-норвежски"><input type="text" id="sr" class="search" placeholder="Название по-русски">
    <div class="chips">${LEVELS.map(l => `<button class="chip ${l === lv ? "on" : ""}" data-lv="${l}">${l}</button>`).join("")}</div>
    <textarea id="sn" placeholder="Текст по-норвежски"></textarea><textarea id="stt" placeholder="Перевод (по желанию)" style="margin-top:8px"></textarea><div style="margin-top:10px"><button class="btn" id="sv">Сохранить</button></div>`;
  $("#bk").onclick = viewStories;
  app.querySelectorAll("[data-lv]").forEach(b => b.onclick = () => { lv = b.dataset.lv; app.querySelectorAll("[data-lv]").forEach(x => x.classList.toggle("on", x === b)); });
  $("#sv").onclick = () => {
    const no = $("#sn").value.trim(); if (!no) return toast("Вставь текст истории");
    const s = { id: "u_" + Date.now(), level: lv, title: $("#st").value.trim() || "Моя история", ru: $("#sr").value.trim() || "Своя история", no, tr: $("#stt").value.trim() || "Перевода нет.", vocab: [], mine: true, raw: true };
    S.userStories.push(s); STORIES.push(s); save(); viewStories();
  };
}
