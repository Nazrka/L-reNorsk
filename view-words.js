// ===== 📚 Слова: выбор уровня → единый список слов, ♡ в блокнот =====
const W = { lv: null, q: "", f: "all", n: 60, cards: false, ci: 0, back: false };
const wordsOf = lv => allWords().filter(w => w.level === lv);
const isKnown = no => S.known.includes(no);
const lvTitle = lv => lv === "talk" ? "Разговорник" : "Уровень " + lv;

function wordRow(w, i, showLv) {
  const h = inNote(w.no), k = isKnown(w.no);
  return `<div class="wrow" data-i="${i}"><div class="wmain"><div><span class="wno">${esc(w.no)}</span>${gBadge(w.no)}</div><div class="wru">${esc(w.ru)}${showLv ? ` <span class="lvpill ${w.level}">${w.level === "talk" ? "фразы" : w.level}</span>` : ""}</div>${w.ex ? `<div class="ex">${esc(w.ex)} — ${esc(w.exRu)}</div>` : ""}</div>
    <div class="wact"><button class="ib" data-a="s" aria-label="Озвучить">🔊</button><button class="ib heart ${h ? "on" : ""}" data-a="h" aria-label="В блокнот">${h ? "♥" : "♡"}</button><button class="ib ok ${k ? "on" : ""}" data-a="k" aria-label="Знаю">✓</button></div></div>`;
}
// один обработчик на весь список (быстро даже на сотнях слов)
function bindRows(box, getList, onChange) {
  box.onclick = ev => {
    const b = ev.target.closest("button[data-a]"); if (!b) return;
    const row = b.closest(".wrow"), w = getList()[+row.dataset.i]; if (!w) return;
    if (b.dataset.a === "s") return say(w.no);
    if (b.dataset.a === "h") { const on = noteToggle(w.no, w.ru); b.classList.toggle("on", on); b.textContent = on ? "♥" : "♡"; toast(on ? "Добавлено в блокнот ♥" : "Убрано из блокнота"); }
    if (b.dataset.a === "k") { if (isKnown(w.no)) S.known = S.known.filter(x => x !== w.no); else S.known.push(w.no); save(); achCheck(); b.classList.toggle("on"); }
    if (onChange) onChange();
  };
}

function viewWords() { W.lv ? (W.cards ? viewCards() : viewLevel()) : viewLevels(); }

function viewLevels() {
  const all = allWords();
  app.innerHTML = `<h1>Слова</h1><p class="sub">${all.length} слов · знаю: ${S.known.length} · в блокноте ♥: ${S.mistakes.length}</p>
    <input type="text" id="wq" class="search" placeholder="Найти слово или перевод" value="${esc(W.q)}">
    <div id="wsr"></div>
    <div class="lvgrid" id="lvg">${LEVELS.map(l => { const ws = wordsOf(l), kn = ws.filter(w => isKnown(w.no)).length;
      return `<button class="lvtile l-${l}" data-l="${l}"><span class="lvn">${l}</span><span class="lvt">${LV_INFO[l][0]}</span><small>${ws.length} слов · знаю ${kn}</small><div class="bar"><i style="width:${ws.length ? kn / ws.length * 100 : 0}%"></i></div></button>`; }).join("")}</div>
    <div class="chips"><button class="btn ghost" id="tk">💬 Разговорник · ${wordsOf("talk").length} фраз</button>${likedWords().length ? `<button class="btn" id="tl">♥ Тренировать лайкнутые · ${likedWords().length}</button>` : ""}</div>`;
  app.querySelectorAll("[data-l]").forEach(b => b.onclick = () => { W.lv = b.dataset.l; W.q = ""; W.f = "all"; W.n = 60; W.cards = false; viewLevel(); window.scrollTo(0, 0); });
  $("#tk").onclick = () => { W.lv = "talk"; W.q = ""; W.f = "all"; W.n = 60; viewLevel(); window.scrollTo(0, 0); };
  if ($("#tl")) $("#tl").onclick = () => viewTrainSetup("*");
  $("#wq").oninput = e => { W.q = e.target.value; drawSearch(); };
  drawSearch();
}
function drawSearch() {
  const box = $("#wsr"), q = W.q.trim().toLowerCase();
  $("#lvg").hidden = $("#tk").parentElement.hidden = !!q;
  if (!q) { box.innerHTML = ""; return; }
  const r = allWords().filter(w => w.no.toLowerCase().includes(q) || w.ru.toLowerCase().includes(q)).slice(0, 80);
  box.innerHTML = r.length ? `<div class="wlist">${r.map((w, i) => wordRow(w, i, true)).join("")}</div>` : '<p class="sub">Ничего не найдено.</p>';
  bindRows(box, () => r);
}

function filterWords() {
  const q = W.q.trim().toLowerCase();
  return wordsOf(W.lv).filter(w => {
    if (q && !(w.no.toLowerCase().includes(q) || w.ru.toLowerCase().includes(q))) return false;
    if (W.f === "new") return !isKnown(w.no);
    if (W.f === "note") return inNote(w.no);
    if (W.f === "known") return isKnown(w.no);
    return true;
  });
}
function viewLevel() {
  const ws = wordsOf(W.lv), kn = ws.filter(w => isKnown(w.no)).length, nt = ws.filter(w => inNote(w.no)).length;
  const F = [["all", `Все · ${ws.length}`], ["new", `Не знаю · ${ws.length - kn}`], ["note", `♥ В блокноте · ${nt}`], ["known", `Знаю · ${kn}`]];
  app.innerHTML = `<button class="btn ghost sm" id="bk">← Уровни</button>
    <h1 style="margin-top:14px">${lvTitle(W.lv)}</h1><p class="sub">${ws.length} слов · нажми ♡, чтобы отправить слово в блокнот, ✓ — если уже знаешь</p>
    <input type="text" id="wq" class="search" placeholder="Поиск в этом списке" value="${esc(W.q)}">
    <div class="chips">${F.map(f => `<button class="chip ${W.f === f[0] ? "on" : ""}" data-f="${f[0]}">${f[1]}</button>`).join("")}</div>
    <div class="chips"><button class="btn sm" id="trn">🎯 Тренировка</button><button class="btn ghost sm" id="cd">🃏 Карточки</button>${nt ? '<button class="btn ghost sm" id="nb">📝 Тренировать ♥ в блокноте</button>' : ""}</div>
    <div class="wlist" id="wl"></div><button class="btn ghost big" id="more" hidden></button>`;
  $("#bk").onclick = () => { W.lv = null; W.q = ""; viewLevels(); };
  $("#trn").onclick = () => viewTrainSetup(W.lv);
  $("#cd").onclick = () => { W.cards = true; W.ci = 0; W.back = false; viewCards(); };
  if ($("#nb")) $("#nb").onclick = () => go("notebook");
  app.querySelectorAll("[data-f]").forEach(b => b.onclick = () => { W.f = b.dataset.f; W.n = 60; viewLevel(); });
  $("#wq").oninput = e => { W.q = e.target.value; W.n = 60; drawLevel(); };
  $("#more").onclick = () => { W.n += 100; drawLevel(); };
  drawLevel();
}
let wCur = [];
function drawLevel() {
  wCur = filterWords();
  const vis = wCur.slice(0, W.n), box = $("#wl");
  box.innerHTML = vis.length ? vis.map((w, i) => wordRow(w, i)).join("") : '<p class="sub">Здесь пока ничего нет.</p>';
  const more = $("#more"); more.hidden = wCur.length <= W.n; more.textContent = `Показать ещё (${wCur.length - W.n})`;
  bindRows(box, () => wCur);
}

// Режим карточек (по текущему уровню, без уже известных слов)
function viewCards() {
  const ws = wordsOf(W.lv).filter(w => !isKnown(w.no));
  if (!ws.length) { app.innerHTML = `<button class="btn ghost sm" id="bk">← К списку</button><p class="sub" style="margin-top:16px">Все слова этого уровня отмечены как известные. 🎉</p>`; $("#bk").onclick = () => { W.cards = false; viewLevel(); }; return; }
  if (W.ci >= ws.length) W.ci = 0;
  const w = ws[W.ci];
  app.innerHTML = `<button class="btn ghost sm" id="bk">← К списку</button><h1 style="margin-top:14px">${lvTitle(W.lv)}: карточки</h1>
    <div class="card flip" id="fl"><div>${W.back ? esc(w.ru) : esc(w.no) + gBadge(w.no)}${W.back && w.ex ? `<div class="ex">${esc(w.ex)}<br>${esc(w.exRu)}</div>` : ""}<small>${W.ci + 1} / ${ws.length} · нажми, чтобы перевернуть</small></div></div>
    <div class="chips"><button class="ib" id="sd" aria-label="Озвучить">🔊</button><button class="ib heart ${inNote(w.no) ? "on" : ""}" id="hb" aria-label="В блокнот">${inNote(w.no) ? "♥" : "♡"}</button></div>
    <div class="chips"><button class="btn ghost" id="no" style="flex:1">Не знаю</button><button class="btn" id="yes" style="flex:1">Знаю</button></div>`;
  const next = () => { W.ci = (W.ci + 1) % ws.length; W.back = false; viewCards(); };
  $("#bk").onclick = () => { W.cards = false; viewLevel(); };
  $("#fl").onclick = () => { W.back = !W.back; viewCards(); };
  $("#sd").onclick = () => say(w.no);
  $("#hb").onclick = () => { const on = noteToggle(w.no, w.ru); $("#hb").classList.toggle("on", on); $("#hb").textContent = on ? "♥" : "♡"; };
  $("#yes").onclick = () => { if (!isKnown(w.no)) S.known.push(w.no); save(); achCheck(); if (W.ci >= ws.length - 1) W.ci = 0; W.back = false; viewCards(); };
  $("#no").onclick = () => { if (!inNote(w.no)) noteToggle(w.no, w.ru); S.known = S.known.filter(x => x !== w.no); save(); toast("В блокноте ♥"); next(); };
}

// ===== 🎯 Тренировка слов: выбор перевода в обе стороны =====
const TR = { dir: "no", src: "all", n: 10 };
// лайкнутые = слова в блокноте (♥), у которых есть перевод
const likedWords = () => S.mistakes.filter(m => m.ru && m.ru !== "—").map(m => ({ no: m.no, ru: m.ru, level: m.level || levelOf(m.no) }));
function trainWords(scope) {
  const liked = TR.src === "liked";
  if (scope === "*") return likedWords();
  const ws = wordsOf(scope);
  return liked ? ws.filter(w => inNote(w.no)) : ws;
}
function trainItems(words, scope) {
  let pool = scope === "*" ? allWords() : wordsOf(scope);
  if (pool.length < 8) pool = allWords();
  const pick = (w, key) => { const seen = new Set([w[key]]), out = []; for (const x of shuffle(pool)) { if (!seen.has(x[key]) && x.no !== w.no) { seen.add(x[key]); out.push(x[key]); if (out.length === 3) break; } } return out; };
  return shuffle(words).slice(0, TR.n).map(w => {
    const d = TR.dir === "mix" ? (Math.random() < .5 ? "no" : "ru") : TR.dir;
    return d === "no"
      ? { type: "choice", hint: "Выбери перевод", q: esc(w.no), a: w.ru, opts: [w.ru, ...pick(w, "ru")], no: w.no, ru: w.ru }
      : { type: "choice", hint: "Выбери слово по-норвежски", q: esc(w.ru), a: w.no, opts: [w.no, ...pick(w, "no")], no: w.no, ru: w.ru };
  });
}
function viewTrainSetup(scope) {
  const back = () => scope === "*" ? viewLevels() : viewLevel();
  if (scope === "*") TR.src = "liked";
  const all = scope === "*" ? likedWords() : wordsOf(scope), liked = scope === "*" ? all : all.filter(w => inNote(w.no));
  const avail = TR.src === "liked" ? liked : all, n = Math.min(TR.n, avail.length);
  const chip = (grp, v, label, on) => `<button class="chip ${on ? "on" : ""}" data-${grp}="${v}">${label}</button>`;
  app.innerHTML = `<button class="btn ghost sm" id="bk">← Назад</button><h1 style="margin-top:14px">Тренировка${scope === "*" ? " · ♥ лайкнутые" : " · " + (scope === "talk" ? "разговорник" : scope)}</h1>
    <p class="sub">Выбери, как тренироваться. В каждом задании 4 варианта ответа.</p>
    <h2>Направление</h2><div class="chips">${chip("d", "no", "Норвежский → русский", TR.dir === "no")}${chip("d", "ru", "Русский → норвежский", TR.dir === "ru")}${chip("d", "mix", "Вперемешку", TR.dir === "mix")}</div>
    ${scope === "*" ? "" : `<h2>Какие слова</h2><div class="chips">${chip("s", "all", `Все слова · ${all.length}`, TR.src === "all")}${chip("s", "liked", `♥ Только лайкнутые · ${liked.length}`, TR.src === "liked")}</div>`}
    <h2>Сколько слов</h2><div class="chips">${[10, 20, 30].map(k => chip("n", k, k, TR.n === k)).join("")}</div>
    <button class="btn big" id="start" ${avail.length ? "" : "disabled"}>${avail.length ? `Начать · ${n} заданий` : "Нет слов для тренировки"}</button>
    ${!avail.length ? '<p class="sub" style="margin-top:12px">Нажми ♡ на словах в списке, и они появятся здесь.</p>' : ""}`;
  $("#bk").onclick = back;
  app.querySelectorAll("[data-d]").forEach(b => b.onclick = () => { TR.dir = b.dataset.d; viewTrainSetup(scope); });
  app.querySelectorAll("[data-s]").forEach(b => b.onclick = () => { TR.src = b.dataset.s; viewTrainSetup(scope); });
  app.querySelectorAll("[data-n]").forEach(b => b.onclick = () => { TR.n = +b.dataset.n; viewTrainSetup(scope); });
  $("#start").onclick = () => {
    const items = trainItems(avail, scope);
    runQuiz(items, (ok, k) => endScreen(ok, k, back, "К словам"), back);
  };
}
