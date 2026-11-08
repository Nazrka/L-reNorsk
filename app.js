// ===== NORSK: ядро (состояние, озвучка, упражнения, «Путь», «Блокнот») =====
const $ = s => document.querySelector(s);
const app = $("#app");
const LEVELS = ["A1", "A2", "B1", "B2", "C1"];
const LV_INFO = { A1: ["Старт", "Выживание: базовые слова"], A2: ["База", "Повседневное общение"], B1: ["Средний", "Уверенная речь"], B2: ["Выше среднего", "Сложные темы"], C1: ["Продвинутый", "Свободное владение"] };
const store = {
  get: () => { try { return JSON.parse(localStorage.getItem("norsk") || "{}"); } catch (e) { return {}; } },
  set: d => { try { localStorage.setItem("norsk", JSON.stringify(d)); } catch (e) {} }
};
let S = Object.assign({ done: 0, mistakes: [] }, store.get());
S.known = S.known || []; S.free = S.free || ""; S.ach = S.ach || {}; S.userStories = S.userStories || []; S.gdone = S.gdone || {}; S.theme = S.theme || ""; S.openAll = !!S.openAll;
S.stats = Object.assign({ xp: 0, streak: 0, best: 0, last: "", today: 0, todayKey: "", goal: 20, perfect: 0, learned: 0, games: 0 }, S.stats || {});
const save = () => store.set(S);
const shuffle = a => a.map(x => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map(p => p[1]);
const norm = s => s.toLowerCase().replace(/[.,!?;:]/g, "").replace(/\s+/g, " ").trim();
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// ---------- Темы ----------
const THEMES = [["dark", "Тёмная", "🌙"], ["navy", "Тёмно-синяя", "🌊"], ["light", "Светлая", "☀️"]];
const THEME_BG = { dark: "#0a1116", navy: "#0b1630", light: "#f2f7f9" };
const applyTheme = () => {
  const t = THEMES.some(x => x[0] === S.theme) ? S.theme : "dark";
  document.documentElement.dataset.theme = t;
  const m = document.querySelector("meta[name=theme-color]"); if (m) m.content = THEME_BG[t];
};
const setTheme = t => { S.theme = t; save(); applyTheme(); };
applyTheme();

// ---------- Озвучка ----------
let AUDIO = {}, VOICE = null;
try { fetch("audio/manifest.json").then(r => r.ok ? r.json() : {}).then(j => { AUDIO = j; }).catch(() => {}); } catch (e) {}
const pickVoice = () => { try { const rank = v => (/natural|neural|premium|enhanced|google/i.test(v.name) ? 2 : 0) + (v.localService ? 0 : 1); VOICE = speechSynthesis.getVoices().filter(v => /^(nb|no)/i.test(v.lang)).sort((a, b) => rank(b) - rank(a))[0] || null; } catch (e) {} };
try { speechSynthesis.onvoiceschanged = pickVoice; pickVoice(); } catch (e) {}
const tts = t => { try { const u = new SpeechSynthesisUtterance(t); u.lang = "nb-NO"; if (VOICE) u.voice = VOICE; u.rate = .85; speechSynthesis.cancel(); speechSynthesis.speak(u); } catch (e) {} };
const say = t => { const k = t.replace(/^(en|ei|et|å) /, ""), f = AUDIO[k]; if (f) { try { new Audio("audio/" + f).play().catch(() => tts(k)); return; } catch (e) {} } tts(k); };

// ---------- Слова и блокнот ----------
let _AW = null;
const allWords = () => _AW || (_AW = [...LEVELS, "talk"].flatMap(l => (WORDS[l] || []).map(w => ({ no: w[0], ru: w[1], topic: w[2], ex: w[3], exRu: w[4], level: l }))));
const genderOf = no => { const a = no.split(" ")[0]; return ["en", "ei", "et"].includes(a) && no.includes(" ") ? a : ""; };
const gBadge = no => { const g = genderOf(no); return g ? `<span class="g g-${g}">${{ en: "en · м.", ei: "ei · ж.", et: "et · ср." }[g]}</span>` : ""; };
let _LV = null;
const levelOf = no => {
  if (!_LV) { _LV = new Map(); allWords().forEach(w => { const k = w.no.toLowerCase().replace(/^(en|ei|et|å) /, ""); if (!_LV.has(k)) _LV.set(k, w.level === "talk" ? "my" : w.level); }); }
  return _LV.get(no.toLowerCase().replace(/^(en|ei|et|å) /, "")) || "my";
};
const addMistake = (no, ru) => { const x = S.mistakes.find(m => m.no === no); if (x) { x.box = 0; x.due = Date.now(); } else S.mistakes.push({ no, ru, box: 0, due: Date.now(), level: levelOf(no) }); save(); };
const inNote = no => S.mistakes.some(m => m.no === no);
// ♡: добавить в блокнот / убрать. Возвращает true, если слово теперь в блокноте
function noteToggle(no, ru) {
  const i = S.mistakes.findIndex(m => m.no === no);
  if (i >= 0) { S.mistakes.splice(i, 1); save(); return false; }
  S.mistakes.push({ no, ru: ru || "—", box: 0, due: Date.now(), level: levelOf(no) }); save(); return true;
}
function toast(m) { document.querySelectorAll(".toast").forEach(t => t.remove()); const t = document.createElement("div"); t.className = "toast"; t.textContent = m; document.body.appendChild(t); setTimeout(() => t.remove(), 1700); }

// ---------- Навигация ----------
let tab = "path";
const RESET = { words: () => { W.lv = null; W.q = ""; W.cards = false; }, grammar: () => { gOpen = ""; gTab = "rules"; }, stories: () => { stCur = ""; } };
function go(t) {
  closePop();
  tab = t;
  document.querySelectorAll("#tabs button[data-tab]").forEach(b => b.classList.toggle("on", b.dataset.tab === t));
  ({ path: viewPath, words: viewWords, stories: viewStories, grammar: viewGrammar, notebook: viewNotebook, games: viewGames, settings: viewSettings })[t]();
  window.scrollTo(0, 0);
}
document.querySelectorAll("#tabs button[data-tab]").forEach(b => b.onclick = () => { const t = b.dataset.tab; if (t === tab && RESET[t]) RESET[t](); go(t); });

// ---------- Движок упражнений ----------
function runQuiz(items, onEnd, onExit) {
  let i = 0, ok = 0;
  const step = () => {
    if (i >= items.length) return onEnd(ok, items.length);
    const e = items[i];
    app.innerHTML = `<div class="qtop"><button class="ib" id="qx" aria-label="Выйти">✕</button><div class="bar"><div style="width:${i / items.length * 100}%"></div></div><span class="qn">${i + 1}/${items.length}</span></div>
      <p class="sub">${e.hint || ""}</p><div class="q">${e.q}${e.say ? ' <button class="ib" id="snd">🔊</button>' : ""}</div><div id="body"></div><div id="fb"></div><div id="nx"></div>`;
    $("#qx").onclick = () => { if (confirm("Выйти из упражнения? Результат не сохранится.")) (onExit || (() => go(tab)))(); };
    if (e.say) { $("#snd").onclick = () => say(e.say); say(e.say); }
    let done = false;
    const body = $("#body");
    const finish = (good, ans) => {
      if (done) return; done = true;
      body.querySelectorAll("button,input").forEach(b => b.disabled = true);
      if (good) ok++;
      if (e.rev) { good ? srsUp(e.no) : srsDown(e.no); } else if (!good && e.no) addMistake(e.no, e.ru);
      activity(good);
      $("#fb").innerHTML = `<div class="fb ${good ? "ok" : "no"}">${good ? "Верно!" : "Правильно: " + ans}</div>${e.exp ? `<div class="expl">${e.exp}</div>` : ""}`;
      $("#nx").innerHTML = `<button class="btn big" id="go">${i + 1 >= items.length ? "Завершить" : "Дальше"}</button>`;
      $("#go").onclick = () => { i++; step(); };
      $("#go").focus();
    };
    body.addEventListener("click", ev => { if (ev.target.id === "idk") finish(false, e.a); });
    if (e.type === "choice") {
      const opts = e.fixed ? e.opts : shuffle(e.opts);
      body.innerHTML = opts.map(o => `<button class="opt">${o}</button>`).join("") + `<button class="btn ghost" id="idk">Не знаю</button>`;
      body.querySelectorAll(".opt").forEach(b => b.onclick = () => {
        const good = b.textContent === e.a;
        body.querySelectorAll(".opt").forEach(x => { x.disabled = true; if (x.textContent === e.a) x.classList.add("right"); });
        if (!good) b.classList.add("wrong");
        finish(good, e.a);
      });
    } else if (e.type === "type") {
      body.innerHTML = `<input type="text" id="inp" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Напиши ответ"><div style="margin-top:10px;display:flex;gap:8px"><button class="btn" id="chk">Проверить</button><button class="btn ghost" id="idk">Не знаю</button></div>`;
      const chk = () => { if (done) return; const v = $("#inp").value; finish(norm(v) === norm(e.a) || (e.alts || []).some(a => norm(a) === norm(v)), e.a); };
      $("#chk").onclick = chk; $("#inp").onkeydown = ev => { if (ev.key === "Enter") chk(); }; $("#inp").focus();
    } else if (e.type === "build") {
      const pool = shuffle(e.a.split(" ").map(t => ({ t, u: false }))), picked = [];
      body.innerHTML = `<div class="slot" id="slot"></div><div class="chips" id="pool"></div><div style="display:flex;gap:8px"><button class="btn" id="chk">Проверить</button><button class="btn ghost" id="idk">Не знаю</button></div>`;
      const draw = () => {
        $("#slot").innerHTML = picked.map((w, k) => `<button class="chip" data-k="${k}">${esc(w.t)}</button>`).join("");
        $("#pool").innerHTML = pool.map((w, k) => `<button class="chip ${w.u ? "used" : ""}" data-k="${k}">${esc(w.t)}</button>`).join("");
        $("#slot").querySelectorAll("button").forEach(b => b.onclick = () => { if (done) return; picked[+b.dataset.k].u = false; picked.splice(+b.dataset.k, 1); draw(); });
        $("#pool").querySelectorAll("button").forEach(b => b.onclick = () => { if (done) return; const w = pool[+b.dataset.k]; if (!w.u) { w.u = true; picked.push(w); draw(); } });
      };
      draw();
      $("#chk").onclick = () => finish(picked.map(w => w.t).join(" ") === e.a, e.a);
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
  app.innerHTML = `<div class="endwrap"><div class="big">${ok === n ? "🎉" : ok / n >= .7 ? "👍" : "💪"}</div><h1>${ok === n ? "Отлично!" : ok / n >= .7 ? "Хорошо!" : "Ещё немного!"}</h1><p class="sub">Правильных ответов: ${ok} из ${n}</p>
    ${ok < n ? '<p class="sub">Слова с ошибками сохранены в 📝 Блокноте.</p>' : ""}<button class="btn big" id="b">${label || "Продолжить"}</button></div>`;
  $("#b").onclick = back;
}

// Генераторы заданий
function wordExercises(ws, pool) {
  const out = [];
  ws.forEach(w => {
    const wrong = shuffle(pool.filter(x => x.no !== w.no && x.ru !== w.ru)).slice(0, 3).map(x => x.ru);
    out.push({ type: "choice", hint: "Выбери перевод", q: w.no, a: w.ru, opts: [w.ru, ...wrong], no: w.no, ru: w.ru });
    out.push({ type: "type", hint: "Напиши по-норвежски", q: w.ru, a: w.no, no: w.no, ru: w.ru });
  });
  return shuffle(out);
}
const sentenceExercises = list => list.map(s => ({ type: "build", hint: "Собери предложение", q: s[1], a: s[0], no: s[0], ru: s[1] }));
function verbExercises(n, pool) { return verbEx(n, [1, 2, 3, 4, 5], pool); }
