// ===== NORSK: логика приложения =====
const $ = s => document.querySelector(s);
const app = $("#app");
const LEVELS = ["A1", "A2", "B1", "B2", "C1"];
const store = {
  get: () => { try { return JSON.parse(localStorage.getItem("norsk") || "{}"); } catch (e) { return {}; } },
  set: d => { try { localStorage.setItem("norsk", JSON.stringify(d)); } catch (e) {} }
};
let S = Object.assign({ done: 0, mistakes: [] }, store.get());
S.known = S.known || []; S.free = S.free || ""; S.ach = S.ach || {}; S.userStories = S.userStories || [];
S.stats = Object.assign({ xp: 0, streak: 0, best: 0, last: "", today: 0, todayKey: "", goal: 20, perfect: 0, learned: 0, games: 0 }, S.stats || {});
const save = () => store.set(S);
const shuffle = a => a.map(x => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map(p => p[1]);
const norm = s => s.toLowerCase().replace(/[.,!?;:]/g, "").replace(/\s+/g, " ").trim();
let AUDIO = {}, VOICE = null;
try { fetch("audio/manifest.json").then(r => r.ok ? r.json() : {}).then(j => { AUDIO = j; }).catch(() => {}); } catch (e) {}
const pickVoice = () => { try { const rank = v => (/natural|neural|premium|enhanced|google/i.test(v.name) ? 2 : 0) + (v.localService ? 0 : 1); VOICE = speechSynthesis.getVoices().filter(v => /^(nb|no)/i.test(v.lang)).sort((a, b) => rank(b) - rank(a))[0] || null; } catch (e) {} };
try { speechSynthesis.onvoiceschanged = pickVoice; pickVoice(); } catch (e) {}
const tts = t => { try { const u = new SpeechSynthesisUtterance(t); u.lang = "nb-NO"; if (VOICE) u.voice = VOICE; u.rate = .85; speechSynthesis.cancel(); speechSynthesis.speak(u); } catch (e) {} };
const say = t => { const k = t.replace(/^(en|ei|et|å) /, ""), f = AUDIO[k]; if (f) { try { new Audio("audio/" + f).play().catch(() => tts(k)); return; } catch (e) {} } tts(k); };
const allWords = () => [...LEVELS, "talk"].flatMap(l => (WORDS[l] || []).map(w => ({ no: w[0], ru: w[1], topic: w[2], ex: w[3], exRu: w[4], level: l })));
const genderOf = no => { const a = no.split(" ")[0]; return ["en", "ei", "et"].includes(a) && no.includes(" ") ? a : ""; };
const gBadge = no => { const g = genderOf(no); return g ? `<span class="g g-${g}">${{ en: "en · м.", ei: "ei · ж.", et: "et · ср." }[g]}</span>` : ""; };
const addMistake = (no, ru) => { const x = S.mistakes.find(m => m.no === no); if (x) { x.box = 0; x.due = Date.now(); } else S.mistakes.push({ no, ru, box: 0, due: Date.now() }); save(); };

// ---------- Навигация ----------
let tab = "path";
function go(t) {
  tab = t;
  document.querySelectorAll("#tabs button").forEach(b => b.classList.toggle("on", b.dataset.tab === t));
  ({ path: viewPath, words: viewWords, stories: viewStories, grammar: viewGrammar, notebook: viewNotebook, games: viewGames })[t]();
  window.scrollTo(0, 0);
}
document.querySelectorAll("#tabs button").forEach(b => b.onclick = () => go(b.dataset.tab));

// ---------- Движок упражнений ----------
function runQuiz(items, onEnd) {
  let i = 0, ok = 0;
  const step = () => {
    if (i >= items.length) return onEnd(ok, items.length);
    const e = items[i];
    app.innerHTML = `<div class="bar"><div style="width:${i / items.length * 100}%"></div></div>
      <p class="sub">${e.hint || ""}</p><div class="q">${e.q}${e.say ? ' <button class="btn ghost" id="snd">🔊</button>' : ""}</div><div id="body"></div><div id="fb"></div><div id="nx"></div>`;
    if (e.say) { $("#snd").onclick = () => say(e.say); say(e.say); }
    let done = false;
    const finish = (good, ans) => {
      if (done) return; done = true; document.querySelectorAll("#idk,#chk").forEach(b => b.remove());
      if (good) ok++; if (e.rev) { good ? srsUp(e.no) : srsDown(e.no); } else if (!good) addMistake(e.no, e.ru); activity(good);
      $("#fb").innerHTML = `<div class="fb ${good ? "ok" : "no"}">${good ? "Верно!" : "Правильно: " + ans}</div>`;
      $("#nx").innerHTML = `<button class="btn" id="go">Дальше</button>`;
      $("#go").onclick = () => { i++; step(); };
      $("#go").focus();
    };
    const body = $("#body");
    body.addEventListener("click", ev => { if (ev.target.id === "idk") { body.querySelectorAll("button,input").forEach(x => x.disabled = true); finish(false, e.a); } });
    if (e.type === "choice") {
      body.innerHTML = e.opts.map(o => `<button class="opt">${o}</button>`).join("") + `<button class="btn ghost" id="idk">Не знаю</button>`;
      body.querySelectorAll(".opt").forEach(b => b.onclick = () => { body.querySelectorAll(".opt").forEach(x => x.disabled = true); finish(b.textContent === e.a, e.a); });
    } else if (e.type === "type") {
      body.innerHTML = `<input type="text" id="inp" autocomplete="off" autocapitalize="off" placeholder="Напиши ответ"><div style="margin-top:10px;display:flex;gap:8px"><button class="btn" id="chk">Проверить</button><button class="btn ghost" id="idk">Не знаю</button></div>`;
      const chk = () => { $("#inp").disabled = true; $("#chk").remove(); finish(norm($("#inp").value) === norm(e.a), e.a); };
      $("#chk").onclick = chk; $("#inp").onkeydown = ev => { if (ev.key === "Enter" && $("#chk")) chk(); }; $("#inp").focus();
    } else if (e.type === "build") {
      const words = e.a.split(" "); let picked = [];
      body.innerHTML = `<div class="slot" id="slot"></div><div class="chips" id="pool"></div><div style="display:flex;gap:8px"><button class="btn" id="chk">Проверить</button><button class="btn ghost" id="idk">Не знаю</button></div>`;
      const draw = () => {
        $("#slot").innerHTML = picked.map((w, k) => `<button class="chip" data-k="${k}">${w.t}</button>`).join("");
        $("#pool").innerHTML = pool.map((w, k) => `<button class="chip ${w.u ? "used" : ""}" data-k="${k}">${w.t}</button>`).join("");
        $("#slot").querySelectorAll("button").forEach(b => b.onclick = () => { picked[b.dataset.k].u = false; picked.splice(b.dataset.k, 1); draw(); });
        $("#pool").querySelectorAll("button").forEach(b => b.onclick = () => { const w = pool[b.dataset.k]; if (!w.u) { w.u = true; picked.push(w); draw(); } });
      };
      const pool = shuffle(words.map(t => ({ t, u: false })));
      draw();
      $("#chk").onclick = () => { $("#chk").remove(); finish(picked.map(w => w.t).join(" ") === e.a, e.a); };
    }
  };
  step();
}

function confetti() {
  const col = ["#4fe3b0", "#9a8cff", "#7cc4ff", "#ff9fd6", "#ffd166"];
  for (let i = 0; i < 36; i++) { const s = document.createElement("span"); s.className = "cf"; s.style.cssText = `left:${Math.random() * 100}vw;background:${col[i % 5]};animation-delay:${Math.random() * .6}s;animation-duration:${1.8 + Math.random()}s`; document.body.appendChild(s); setTimeout(() => s.remove(), 3200); }
}
function endScreen(ok, n, back, label) {
  if (ok === n) { confetti(); S.stats.perfect++; addXp(20); } achCheck();
  app.innerHTML = `<h1>${ok === n ? "Отлично! 🎉" : "Готово"}</h1><p class="sub">Правильных ответов: ${ok} из ${n}</p>
    ${ok < n ? '<p class="sub">Слова с ошибками сохранены в 📝 Блокноте.</p>' : ""}<button class="btn" id="b">${label || "Продолжить"}</button>`;
  $("#b").onclick = back;
}

// Генераторы заданий
function wordExercises(ws, pool) {
  const out = [];
  ws.forEach(w => {
    const wrong = shuffle(pool.filter(x => x.no !== w.no)).slice(0, 3).map(x => x.ru);
    out.push({ type: "choice", hint: "Выбери перевод", q: w.no, a: w.ru, opts: shuffle([w.ru, ...wrong]), no: w.no, ru: w.ru });
    out.push({ type: "type", hint: "Напиши по-норвежски", q: w.ru, a: w.no, no: w.no, ru: w.ru });
  });
  return shuffle(out);
}
const sentenceExercises = list => list.map(s => ({ type: "build", hint: "Собери предложение", q: s[1], a: s[0], no: s[0], ru: s[1] }));
function verbExercises(n, pool) { return verbEx(n, [1, 2, 3, 4, 5], pool); }

// ---------- 🗺️ Путь ----------
function lessons() {
  const L = [];
  LEVELS.forEach(lv => {
    const ws = WORDS[lv] || []; let n = 0;
    for (let i = 0; i < ws.length; i += 4) {
      L.push({ lv, title: "Слова " + (++n), kind: "words", ws: ws.slice(i, i + 4).map(w => ({ no: w[0], ru: w[1] })) });
      if (n % 5 === 0) L.push({ lv, title: "Предложения", kind: "sent" });
    }
    if (ws.length) L.push({ lv, title: "Времена глаголов", kind: "verbs" });
  });
  return L;
}
function viewPath() {
  const L = lessons(); let html = `<h1>Путь</h1><p class="sub">Проходи уроки по порядку — следующие открываются сами.</p>${statsCard()}`, cur = "";
  L.forEach((l, i) => {
    if (l.lv !== cur) { html += `${cur ? "</div>" : ""}<div class="unit">Уровень ${l.lv}</div><div class="trail">`; cur = l.lv; }
    const st = i < S.done ? "done" : i === S.done ? "" : "lock";
    html += `<button class="node ${st}" data-i="${i}" ${st === "lock" ? "disabled" : ""}><i>${st === "done" ? "✓" : st === "lock" ? "🔒" : i + 1}</i>${l.title}</button>`;
  });
  app.innerHTML = html + "</div>";
  app.querySelectorAll(".node:not(.lock)").forEach(b => b.onclick = () => startLesson(+b.dataset.i));
}
function startLesson(i) {
  const l = lessons()[i], pool = allWords().map(w => ({ no: w.no, ru: w.ru }));
  const items = l.kind === "words" ? wordExercises(l.ws, pool) : l.kind === "sent" ? sentenceExercises(shuffle((BUILD.filter(b => b.lv === l.lv).map(b => [b.no, b.ru]).length >= 3 ? BUILD.filter(b => b.lv === l.lv).map(b => [b.no, b.ru]) : SENTENCES)).slice(0, 5)) : verbExercises(6);
  runQuiz(items, (ok, n) => {
    if (ok / n >= .7 && i === S.done) { S.done++; addXp(30); save(); }
    endScreen(ok, n, () => go("path"));
  });
}

// ---------- 📚 Слова ----------
let wLevel = "A1", wTopic = "all", wIdx = 0, wBack = false, wQ = "", wHide = false;
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
function toast(m) { const t = document.createElement("div"); t.className = "toast"; t.textContent = m; document.body.appendChild(t); setTimeout(() => t.remove(), 1600); }
function viewWords() {
  const topics = [...new Set(allWords().filter(w => w.level === wLevel).map(w => w.topic))];
  app.innerHTML = `<h1>Слова</h1><p class="sub">${allWords().length} слов · знаю: ${S.known.length}</p>
    <input type="text" id="wq" class="search" placeholder="Поиск по слову или переводу" value="${esc(wQ)}">
    <div class="chips">${[...LEVELS, "talk"].map(l => `<button class="chip ${l === wLevel ? "on" : ""}" data-l="${l}">${l === "talk" ? "Разговорник" : l}</button>`).join("")}<button class="chip ${wHide ? "on" : ""}" id="hd">Скрыть известные</button></div>
    ${topics.length > 1 ? `<div class="chips"><button class="chip ${wTopic === "all" ? "on" : ""}" data-t="all">Все</button>${topics.map(t => `<button class="chip ${t === wTopic ? "on" : ""}" data-t="${t}">${t}</button>`).join("")}</div>` : ""}
    <div id="wres"></div>`;
  app.querySelectorAll("[data-l]").forEach(b => b.onclick = () => { wLevel = b.dataset.l; wTopic = "all"; wIdx = 0; wBack = false; wQ = ""; viewWords(); });
  app.querySelectorAll("[data-t]").forEach(b => b.onclick = () => { wTopic = b.dataset.t; wIdx = 0; wBack = false; viewWords(); });
  $("#hd").onclick = () => { wHide = !wHide; wIdx = 0; viewWords(); };
  $("#wq").oninput = e => { wQ = e.target.value; drawWords(); };
  drawWords();
}
function drawWords() {
  const box = $("#wres"), q = wQ.trim().toLowerCase();
  if (q) {
    const r = allWords().filter(w => w.no.toLowerCase().includes(q) || w.ru.toLowerCase().includes(q)).slice(0, 60);
    box.innerHTML = r.length ? r.map((w, i) => `<div class="card"><div class="res"><span><b>${w.no}</b>${gBadge(w.no)}<br><small style="color:var(--dim)">${w.ru} · ${w.level === "talk" ? "разговорник" : w.level}</small></span><span><button class="btn ghost" data-s="${i}">🔊</button> <button class="btn ghost" data-n="${i}">📝</button></span></div>${w.ex ? `<div class="ex">${w.ex}<br>${w.exRu}</div>` : ""}</div>`).join("") : '<p class="sub">Ничего не найдено.</p>';
    box.querySelectorAll("[data-s]").forEach(b => b.onclick = () => say(r[b.dataset.s].no));
    box.querySelectorAll("[data-n]").forEach(b => b.onclick = () => { addMistake(r[b.dataset.n].no, r[b.dataset.n].ru); toast("Добавлено в блокнот"); });
    return;
  }
  const ws = allWords().filter(w => w.level === wLevel && (wTopic === "all" || w.topic === wTopic) && !(wHide && S.known.includes(w.no)));
  if (wIdx >= ws.length) wIdx = 0;
  const w = ws[wIdx];
  if (!w) { box.innerHTML = '<p class="sub">Здесь пока нет слов (или все уже известны).</p>'; return; }
  box.innerHTML = `<div class="card flip" id="fl"><div>${wBack ? w.ru : w.no + gBadge(w.no)}${wBack && w.ex ? `<div class="ex">${w.ex}<br>${w.exRu}</div>` : ""}<small>${wIdx + 1} / ${ws.length} · нажми, чтобы перевернуть</small></div></div>
    <div class="chips"><button class="btn ghost" id="sd">🔊</button><button class="btn ghost" id="nb">📝 В блокнот</button></div>
    <div class="chips"><button class="btn ghost" id="no" style="flex:1">Не знаю</button><button class="btn" id="yes" style="flex:1">Знаю</button></div>`;
  const next = () => { wIdx = (wIdx + 1) % Math.max(1, ws.length); wBack = false; drawWords(); };
  $("#fl").onclick = () => { wBack = !wBack; drawWords(); };
  $("#sd").onclick = () => say(w.no);
  $("#nb").onclick = () => { addMistake(w.no, w.ru); toast("Добавлено в блокнот"); };
  $("#yes").onclick = () => { if (!S.known.includes(w.no)) S.known.push(w.no); save(); if (wHide) { drawWords(); } else next(); };
  $("#no").onclick = () => { addMistake(w.no, w.ru); S.known = S.known.filter(x => x !== w.no); save(); toast("В блокноте"); next(); };
}

// ---------- 📖 Истории ----------
let stLv = "all";
function viewStories() {
  app.innerHTML = `<h1>Истории</h1><p class="sub">${STORIES.length} историй</p><div class="chips">${["all", ...LEVELS].map(l => `<button class="chip ${l === stLv ? "on" : ""}" data-f="${l}">${l === "all" ? "Все" : l}</button>`).join("")}</div>` +
    STORIES.filter(s => stLv === "all" || s.level === stLv).map(s => `<button class="node" data-id="${s.id}" style="margin-bottom:10px"><i>${s.level}</i><span>${s.title}<br><small style="color:var(--dim)">${s.ru}</small></span></button>`).join("");
  app.querySelectorAll("[data-id]").forEach(b => b.onclick = () => openStory(b.dataset.id));
  app.querySelectorAll("[data-f]").forEach(b => b.onclick = () => { stLv = b.dataset.f; viewStories(); });
  storyExtras();
}
function openStory(id) {
  const s = STORIES.find(x => x.id === id);
  app.innerHTML = `<button class="btn ghost" id="bk">← Назад</button><h1 style="margin-top:14px">${s.title}</h1><p class="sub">${s.ru}</p>
    <div class="card"><p>${s.no}</p><div class="chips"><button class="btn ghost" id="sd">🔊 Слушать</button><button class="btn ghost" id="tg">Показать перевод</button></div><p class="tr" id="tr" hidden>${s.tr}</p></div>
    ${s.vocab.length ? `<h2>Разбор слов</h2><div class="card vocab">${s.vocab.map(v => `<b>${v[0]}</b><span>${v[1]}</span>`).join("")}</div>` : ""}`;
  $("#bk").onclick = viewStories; $("#sd").onclick = () => say(s.no);
  storyTools(s);
  $("#tg").onclick = () => { $("#tr").hidden = !$("#tr").hidden; };
}

// ---------- ⚙️ Грамматика ----------
let gTab = "rules", vQ = "";
function levelTest(lv) {
  const pool = allWords().map(w => ({ no: w.no, ru: w.ru })), ws = shuffle(allWords().filter(w => w.level === lv)).slice(0, 6);
  let b = BUILD.filter(x => x.lv === lv); if (b.length < 3) b = BUILD;
  return shuffle([...wordExercises(ws.slice(0, 3), pool).filter(e => e.type === "choice"), ...sentenceExercises(shuffle(b).slice(0, 4).map(x => [x.no, x.ru])), ...verbEx(3, [1, 2, 3], verbsOf(lv))]);
}
function viewGrammar() {
  const tabs = [["rules", "Правила"], ["verbs", "Глаголы"], ["a1", "A1: что знать"], ["tests", "Тесты"]];
  let h = `<h1>Грамматика</h1><div class="chips">${tabs.map(t => `<button class="chip ${gTab === t[0] ? "on" : ""}" data-g="${t[0]}">${t[1]}</button>`).join("")}</div>`;
  if (gTab === "rules") h += GRAMMAR.map(g => `<div class="card"><h2 style="margin-top:0">${g.title}</h2>${g.html}</div>`).join("");
  if (gTab === "a1") h += `<p class="sub">Минимум для уровня A1. Освоишь всё это — переходи к A2.</p>` + A1_MIN.map(x => `<div class="card"><b>${x[0]}</b><div class="ex">${x[1]}</div></div>`).join("") + `<button class="btn" data-t="A1">Пройти тест A1</button>`;
  if (gTab === "tests") h += `<p class="sub">Каждый тест: слова, конструктор и формы глаголов. Ошибки идут в блокнот.</p><div class="chips">${LEVELS.map(l => `<button class="btn ghost" data-t="${l}">Тест ${l}</button>`).join("")}</div><button class="btn" data-vt="1">Тест на времена глаголов</button>`;
  if (gTab === "verbs") h += tenseCard() + `<input type="text" id="vq" class="search" placeholder="Поиск глагола (любая форма или перевод)" value="${vQ}"><div id="vres"></div>`;
  app.innerHTML = h;
  app.querySelector("h1").insertAdjacentHTML("afterend", `<button class="btn" id="trn" style="margin:6px 0 14px">🏋️ Тренироваться</button>`); $("#trn").onclick = viewTrain;
  app.querySelectorAll("[data-g]").forEach(b => b.onclick = () => { gTab = b.dataset.g; viewGrammar(); });
  app.querySelectorAll("[data-t]").forEach(b => b.onclick = () => runQuiz(levelTest(b.dataset.t), (ok, n) => endScreen(ok, n, viewGrammar, "К грамматике")));
  app.querySelectorAll("[data-vt]").forEach(b => b.onclick = () => runQuiz(verbExercises(8), (ok, n) => endScreen(ok, n, viewGrammar, "К грамматике")));
  if (gTab === "verbs") { $("#vq").oninput = e => { vQ = e.target.value; drawVerbs(); }; drawVerbs(); }
}
function drawVerbs() {
  const q = vQ.trim().toLowerCase(), list = VERBS.filter(v => !q || v.some(f => f.toLowerCase().includes(q)));
  const head = `<tr><th>Глагол</th>${TENSES.map(t => `<th>${t[1]}</th>`).join("")}</tr>`;
  $("#vres").innerHTML = list.length ? `<p class="sub">${list.length} из ${VERBS.length}</p><div style="overflow-x:auto"><table style="min-width:640px">${head}${list.map(v => `<tr><td><b>${v[0]}</b><br><small>${v[5]}</small></td>${verbForms(v).map(f => `<td>${f}</td>`).join("")}</tr>`).join("")}</table></div>` : '<p class="sub">Глагол не найден.</p>';
}

// ---------- 📝 Блокнот ----------
function viewNotebook() {
  const m = S.mistakes, due = m.filter(x => (x.due || 0) <= Date.now());
  app.innerHTML = `<h1>Блокнот</h1><p class="sub">Слова, которые ты не знаешь или в которых ошибся. Можно писать заметки и добавлять свои слова.</p>
    <div class="card"><b>Добавить своё слово</b><div class="chips"><input type="text" id="nn" placeholder="По-норвежски"><input type="text" id="nr" placeholder="Перевод"></div><button class="btn" id="na">Добавить</button></div>
    ${m.length ? `<div class="chips"><button class="btn" id="rp">${due.length ? "Повторить сегодня (" + due.length + ")" : "Повторить всё (" + m.length + ")"}</button><button class="btn ghost" id="cl">Очистить всё</button></div>` : '<div class="card">Пока пусто. Нажимай «Не знаю» на карточках или проходи уроки: слова с ошибками попадут сюда сами.</div>'}
    ${m.map((x, i) => `<div class="card"><div class="res"><span><b>${esc(x.no)}</b>${gBadge(x.no)}<br><small style="color:var(--dim)">${esc(x.ru)} · ${dueTxt(x)}</small></span><span><button class="btn ghost" data-s="${i}">🔊</button> <button class="btn ghost" data-r="${i}" title="Выучил">✓</button></span></div><input type="text" class="search" data-note="${i}" placeholder="Моя заметка" value="${esc(x.note || "")}"></div>`).join("")}
    <h2>Свободные заметки</h2><textarea id="fr" placeholder="Пиши что угодно: правила, фразы, вопросы...">${esc(S.free)}</textarea>`;
  $("#na").onclick = () => { const no = $("#nn").value.trim(); if (!no) return; addMistake(no, $("#nr").value.trim() || "—"); viewNotebook(); };
  $("#fr").oninput = e => { S.free = e.target.value; save(); };
  app.querySelectorAll("[data-note]").forEach(inp => inp.onchange = () => { S.mistakes[inp.dataset.note].note = inp.value; save(); });
  app.querySelectorAll("[data-s]").forEach(b => b.onclick = () => say(m[b.dataset.s].no));
  app.querySelectorAll("[data-r]").forEach(b => b.onclick = () => { S.mistakes.splice(+b.dataset.r, 1); save(); viewNotebook(); });
  if (!m.length) return;
  $("#cl").onclick = () => { if (confirm("Удалить все слова из блокнота?")) { S.mistakes = []; save(); viewNotebook(); } };
  $("#rp").onclick = () => {
    const items = shuffle((due.length ? due : m).map(x => ({ type: "type", hint: x.ru.includes(":") ? "Повтори форму" : "Напиши по-норвежски", q: x.ru, a: x.no, no: x.no, ru: x.ru, rev: true })));
    runQuiz(items, (ok, n) => endScreen(ok, n, viewNotebook, "В блокнот"));
  };
}

loadUserStories();
go("path");
