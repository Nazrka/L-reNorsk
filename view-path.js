// ===== 🗺️ Путь: слова → правила → повторение → предложения → глаголы =====
// Каждый урок: сначала экран теории, потом упражнения. Прогресс хранится по id урока (S.doneIds).

// ---------- Список уроков ----------
let _L = null;
const ruleOrder = () => GSEC.flatMap(([sec]) => GTOPICS.filter(t => t.sec === sec).sort((a, b) => gKey(a) - gKey(b)));
function lessons() {
  if (_L) return _L;
  const L = [], rules = ruleOrder();
  LEVELS.forEach(lv => {
    const ws = WORDS[lv] || []; if (!ws.length) return;
    const base = []; let n = 0;
    for (let i = 0; i < ws.length; i += 4) {
      n++;
      base.push({ id: `${lv}:w${n}`, lv, title: "Слова " + n, kind: "words", ws: ws.slice(i, i + 4).map(w => ({ no: w[0], ru: w[1], ex: w[3] || "", exRu: w[4] || "" })) });
      if (n % 5 === 0) base.push({ id: `${lv}:s${n / 5}`, lv, title: "Предложения", kind: "sent" });
      if (n % 8 === 0) base.push({ id: `${lv}:rv${n / 8}`, lv, title: "Повторение", kind: "review", ws: base.filter(x => x.kind === "words").slice(-8).flatMap(x => x.ws) });
    }
    base.push({ id: `${lv}:v`, lv, title: "Времена глаголов", kind: "verbs" });
    // правила грамматики этого уровня равномерно вставляем в путь
    const rl = rules.filter(t => t.lv === lv), N = base.length, out = base.slice();
    rl.map((t, k) => ({ t, pos: lv === "A1" ? 2 + Math.round(k * (N - 4) / rl.length) : 1 + Math.round(k * N / rl.length) }))
      .reverse().forEach(r => out.splice(Math.min(r.pos, out.length), 0, { id: `${lv}:r:${r.t.id}`, lv, title: "Правило: " + r.t.title.split(":")[0].split(" — ")[0], kind: "rule", topic: r.t.id }));
    L.push(...out);
  });
  return _L = L;
}
// старый прогресс (по номеру урока) переносим в новый (по id)
function migrateProgress() {
  if (S.doneIds) return;
  S.doneIds = {};
  const legacy = lessons().filter(l => ["words", "sent", "verbs"].includes(l.kind));
  for (let i = 0; i < Math.min(S.done || 0, legacy.length); i++) S.doneIds[legacy[i].id] = 1;
  save();
}
const isDone = l => !!(S.doneIds && S.doneIds[l.id]);
const curIndex = () => { const i = lessons().findIndex(l => !isDone(l)); return i < 0 ? lessons().length : i; };
const KIND_ICON = { sent: "💬", verbs: "⚙️", rule: "📘", review: "🔁" };

let pathLv = "";
function viewPath() {
  migrateProgress();
  const L = lessons(), ci = curIndex(), finished = ci >= L.length, cl = L[Math.min(ci, L.length - 1)];
  if (!pathLv) pathLv = cl.lv;
  let h = `<div class="top"><div><h1>Путь</h1><p class="sub">В каждом уроке сначала объяснение, потом упражнения. Уроки открываются по порядку.</p></div><button class="ib" id="st" aria-label="Настройки">⚙️</button></div>${statsCard()}`;
  h += `<div class="hero"><small>${finished ? "Все уроки пройдены" : "Следующий урок"}</small><b>${finished ? "Ты прошёл весь путь! 🎉" : `${cl.lv} · ${cl.title}`}</b>${finished ? "" : '<button class="btn" id="cont">Продолжить →</button>'}</div>`;
  LEVELS.forEach(lv => {
    const idx = L.map((l, i) => l.lv === lv ? i : -1).filter(i => i >= 0);
    if (!idx.length) return;
    const dn = idx.filter(i => isDone(L[i])).length, open = pathLv === lv;
    h += `<button class="plv ${open ? "on" : ""}" data-lv="${lv}"><span><span class="pn">${lv}</span> <small>${LV_INFO[lv][0]}</small></span><small>${dn} / ${idx.length} ${open ? "▾" : "▸"}</small></button>`;
    if (open) h += `<div class="stones">${idx.map((i, k) => {
      const l = L[i], st = isDone(l) ? "done" : i === ci ? "cur" : S.openAll ? "" : "lock";
      return `<button class="stone k-${l.kind} ${st}" data-i="${i}" ${st === "lock" ? "disabled" : ""} title="${esc(l.title)}">${st === "done" ? "✓" : KIND_ICON[l.kind] || k + 1}</button>`;
    }).join("")}</div><div class="legend"><span>1 слова</span><span>📘 правило</span><span>🔁 повторение</span><span>💬 предложения</span><span>⚙️ глаголы</span></div>`;
  });
  h += `<div class="chips"><button class="chip ${S.openAll ? "on" : ""}" id="oa">${S.openAll ? "✓ " : ""}Открыть все уроки</button></div>`;
  app.innerHTML = h;
  $("#st").onclick = () => go("settings");
  if ($("#cont")) $("#cont").onclick = () => openLesson(ci);
  $("#oa").onclick = () => { S.openAll = !S.openAll; save(); viewPath(); };
  app.querySelectorAll(".plv").forEach(b => b.onclick = () => { pathLv = pathLv === b.dataset.lv ? "" : b.dataset.lv; viewPath(); });
  app.querySelectorAll(".stone:not(.lock)").forEach(b => b.onclick = () => openLesson(+b.dataset.i));
}

// ---------- Упражнения для урока со словами ----------
const bare = no => no.replace(/^(en|ei|et|å) /, "");
function clozeFor(w) {
  if (!w.ex) return null;
  const lemma = bare(w.no).toLowerCase(); if (/\s/.test(lemma)) return null;
  const m = [...w.ex.matchAll(/[A-Za-zÆØÅæøåÀ-ÖØ-öø-ÿ]+/g)].find(x => { const t = x[0].toLowerCase(); return t === lemma || (lemma.length >= 4 && t.startsWith(lemma.slice(0, lemma.length - 2)) && Math.abs(t.length - lemma.length) <= 3); });
  if (!m) return null;
  return { type: "type", hint: "Вставь пропущенное слово", q: `${esc(w.ex.slice(0, m.index) + "___" + w.ex.slice(m.index + m[0].length))}<br><small class="dim">${esc(w.exRu)}</small>`, a: m[0], alts: [lemma, w.no], no: w.no, ru: w.ru };
}
function lessonWordItems(ws, pool, opts = {}) {
  const others = (w, n) => shuffle(pool.filter(x => x.no !== w.no && x.ru !== w.ru)).slice(0, n);
  const s1 = shuffle(ws).map(w => ({ type: "choice", hint: "Выбери перевод", q: w.no, a: w.ru, opts: [w.ru, ...others(w, 3).map(x => x.ru)], no: w.no, ru: w.ru }));
  const s2 = shuffle(ws).map(w => ({ type: "choice", hint: "Выбери слово по-норвежски", q: w.ru, a: w.no, opts: [w.no, ...others(w, 3).map(x => x.no)], no: w.no, ru: w.ru }));
  const s3 = shuffle(ws.filter(w => genderOf(w.no))).map(w => ({ type: "choice", hint: "Какой артикль?", q: bare(w.no), a: genderOf(w.no), opts: ["en", "ei", "et"], fixed: true, no: w.no, ru: w.ru, exp: `${w.no} — ${w.ru}` }));
  const s4 = shuffle(ws).map(w => ({ type: "type", hint: "Напиши по-норвежски", q: w.ru, a: w.no, alts: [bare(w.no)], no: w.no, ru: w.ru }));
  const s5 = shuffle(ws).map(clozeFor).filter(Boolean);
  return opts.short ? [...s1, ...s2.slice(0, 4), ...s4.slice(0, 4), ...s5.slice(0, 4)] : [...s1, ...s2, ...s3, ...s4, ...s5];
}

// ---------- Открыть урок: теория → упражнения ----------
function openLesson(i) {
  const l = lessons()[i], pool = allWords().filter(w => w.level === l.lv).map(w => ({ no: w.no, ru: w.ru }));
  const wpool = pool.length > 12 ? pool : allWords().map(w => ({ no: w.no, ru: w.ru }));
  let items, intro, speak = [], hearts = [];
  const meta = (txt) => `<div class="lessonmeta"><span class="pill">${l.lv}</span><span class="pill">${txt}</span></div>`;
  const wcard = (w, k) => `<div class="tcard"><div class="tt"><div><span class="tno">${esc(w.no)}</span>${gBadge(w.no)}</div><span><button class="ib sm" data-s="${k}" aria-label="Озвучить">🔊</button> <button class="ib sm heart ${inNote(w.no) ? "on" : ""}" data-h="${k}" aria-label="В блокнот">${inNote(w.no) ? "♥" : "♡"}</button></span></div><div class="tru">${esc(w.ru)}</div>${w.ex ? `<div class="ex">${esc(w.ex)}<br>${esc(w.exRu)}</div>` : ""}</div>`;
  if (l.kind === "words") {
    items = lessonWordItems(l.ws, wpool); hearts = l.ws; speak = l.ws.map(w => w.no);
    intro = `<h1>Новые слова</h1>${meta("4 слова · " + items.length + " заданий")}<p class="sub">Сначала познакомься со словами. 🔊 — послушать, ♡ — сохранить в блокнот. Потом мы потренируем их разными способами: выбор перевода, выбор слова, артикль, письмо и пропуск в предложении.</p>` + l.ws.map(wcard).join("");
  } else if (l.kind === "review") {
    const rw = shuffle(l.ws).slice(0, 8);
    items = lessonWordItems(rw, wpool, { short: true }); hearts = rw; speak = rw.map(w => w.no);
    intro = `<h1>Повторение</h1>${meta("8 слов из последних уроков")}<p class="sub">Вспомни слова из недавних уроков. Просмотри их — и проверь себя. Если слово не помнишь, нажми ♡: оно попадёт в блокнот.</p>` + rw.map(wcard).join("");
  } else if (l.kind === "rule") {
    const t = topicById(l.topic);
    items = topicItems(t);
    intro = `<h1>${t.title}</h1>${meta("правило · " + items.length + " заданий")}<p class="sub">${t.lead}</p><div class="card"><div class="rb inl">${ruleBody(t, true)}</div></div>`;
  } else if (l.kind === "sent") {
    const b = BUILD.filter(x => x.lv === l.lv), src = b.length >= 3 ? b : SENTENCES.map(s => ({ no: s[0], ru: s[1], rule: "v2" }));
    const pick = shuffle(src).slice(0, 6);
    items = sentenceExercises(pick.map(x => [x.no, x.ru])); speak = pick.map(x => x.no);
    const rules = [...new Set(pick.map(x => x.rule).filter(Boolean))].map(r => topicById(RULE_TOPIC[r])).filter(Boolean);
    intro = `<h1>Строим предложения</h1>${meta("6 предложений")}<p class="sub">Вот предложения, которые ты сейчас соберёшь из слов. Прочитай и послушай их. Главное правило: глагол стоит на втором месте.</p><div class="card">${pick.map((x, k) => `<div class="sent"><button class="ib sm" data-s="${k}" aria-label="Озвучить">🔊</button><div><b>${esc(x.no)}</b><small>${esc(x.ru)}</small></div></div>`).join("")}</div>` +
      rules.map(t => `<div class="tipbox"><b>${t.title}</b><br>${t.lead}. <a href="#" data-rule="${t.id}">Читать правило</a></div>`).join("");
  } else {
    const vp = verbsOf(l.lv), pv = shuffle(vp.length >= 3 ? vp : VERBS).slice(0, 3);
    items = shuffle(pv.flatMap(v => shuffle([1, 2, 3, 4, 5]).slice(0, 3).map(t => verbTask(v, t))));
    intro = `<h1>Времена глаголов</h1>${meta("3 глагола · 9 заданий")}<p class="sub">Три глагола и все их формы. Изучи таблицы — потом проверим.</p>` +
      pv.map(v => { const f = verbForms(v); return `<div class="card"><h3>å ${v[0]} <span class="dim">— ${v[5]}</span></h3><table>${TENSE_HELP.map((t, k) => `<tr><td class="dim">${t[0]}</td><td><b>${f[k]}</b></td></tr>`).join("")}</table></div>`; }).join("") +
      `<div class="tipbox">Не знаешь, какое прошедшее выбрать? Рассказываешь, что было → <b>spiste</b>. «Уже сделал» → <b>har spist</b>. <a href="#" data-rule="past">Читать правило</a></div>`;
  }
  if (!items.length) { toast("Для этого урока пока нет заданий"); return; }
  l.sentList = speak;
  app.innerHTML = `<button class="btn ghost sm" id="bk">← К пути</button><div style="margin-top:14px">${intro}</div><button class="btn big" id="go">Понятно, к упражнениям →</button>`;
  $("#bk").onclick = viewPath;
  app.querySelectorAll("[data-s]").forEach(b => b.onclick = () => say(speak[b.dataset.s]));
  app.querySelectorAll("[data-h]").forEach(b => b.onclick = () => { const w = hearts[b.dataset.h], on = noteToggle(w.no, w.ru); b.classList.toggle("on", on); b.textContent = on ? "♥" : "♡"; toast(on ? "Добавлено в блокнот" : "Убрано из блокнота"); });
  app.querySelectorAll("[data-rule]").forEach(a => a.onclick = ev => { ev.preventDefault(); openRule(a.dataset.rule); });
  app.querySelectorAll("[data-say]").forEach(b => b.onclick = () => say(b.dataset.say));
  $("#go").onclick = () => runQuiz(items, (ok, n) => {
    if (ok / n >= .7 && !isDone(l)) { S.doneIds[l.id] = 1; S.done = Object.keys(S.doneIds).length; addXp(30); save(); }
    endScreen(ok, n, viewPath, "К пути");
  }, viewPath);
}

// ---------- ⚙️ Настройки ----------
function viewSettings() {
  const cur = THEMES.some(x => x[0] === S.theme) ? S.theme : "dark";
  app.innerHTML = `<button class="btn ghost sm" id="bk">← Назад</button><h1 style="margin-top:14px">Настройки</h1><p class="sub">Оформление и сохранённые данные.</p>
    <h2>Тема оформления</h2><div class="themes">${THEMES.map(t => `<button class="theme th-${t[0]} ${cur === t[0] ? "on" : ""}" data-th="${t[0]}"><span class="sw"></span><b>${t[2]} ${t[1]}</b></button>`).join("")}</div>
    <h2>Данные</h2><div class="card"><p class="small dim">Прогресс хранится в этом браузере. Чтобы перенести его на другой телефон или компьютер, скопируй данные и вставь там.</p>
    <div class="chips"><button class="btn sm" id="ex">Скопировать данные</button><button class="btn ghost sm" id="im">Вставить данные</button><button class="btn ghost sm" id="rs">Сбросить всё</button></div></div>`;
  $("#bk").onclick = () => go("path");
  app.querySelectorAll("[data-th]").forEach(b => b.onclick = () => { setTheme(b.dataset.th); viewSettings(); });
  $("#ex").onclick = () => { const s = JSON.stringify(S); (navigator.clipboard ? navigator.clipboard.writeText(s).then(() => toast("Данные скопированы")) : Promise.reject()).catch(() => prompt("Скопируй это:", s)); };
  $("#im").onclick = () => { const s = prompt("Вставь сохранённые данные:"); if (!s) return; try { const d = JSON.parse(s); if (typeof d !== "object") throw 0; S = Object.assign(S, d); save(); applyTheme(); toast("Данные загружены"); viewSettings(); } catch (e) { toast("Не получилось: неверные данные"); } };
  $("#rs").onclick = () => { if (confirm("Удалить весь прогресс, блокнот и настройки?")) { try { localStorage.removeItem("norsk"); } catch (e) {} location.reload(); } };
}
