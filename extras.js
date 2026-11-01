// ===== extras.js: серия дней, цель, повторение, диалоги, игры, достижения, свои истории =====
const DAY = 864e5, SRS = [1, 3, 7, 14];
const todayKey = () => new Date().toLocaleDateString("sv");
const ydayKey = () => new Date(Date.now() - DAY).toLocaleDateString("sv");
const addXp = n => { S.stats.xp += n; save(); };
const userLevel = () => Math.floor(S.stats.xp / 200) + 1;
const curStreak = () => (S.stats.last === todayKey() || S.stats.last === ydayKey()) ? S.stats.streak : 0;
function touchDay() { const st = S.stats; if (st.todayKey !== todayKey()) { st.todayKey = todayKey(); st.today = 0; } }
function activity(good) {
  const st = S.stats; touchDay();
  if (st.last !== todayKey()) { st.streak = st.last === ydayKey() ? st.streak + 1 : 1; st.last = todayKey(); st.best = Math.max(st.best || 0, st.streak); }
  if (good) { st.today++; st.xp += 10; }
  save(); achCheck();
}
function statsCard() {
  touchDay(); const st = S.stats, pct = Math.min(100, st.today / st.goal * 100), due = S.mistakes.filter(x => (x.due || 0) <= Date.now()).length;
  return `<div class="card"><div class="res"><b>🔥 ${curStreak()} дн. подряд</b><b>⭐ ур. ${userLevel()} · ${st.xp} XP</b></div><div class="ex">Сегодня: ${Math.min(st.today, st.goal)} / ${st.goal} правильных ответов</div><div class="bar" style="margin:8px 0 0"><div style="width:${pct}%"></div></div>${due ? `<div class="ex" style="margin-top:8px">📝 К повторению: ${due} · <a href="#" onclick="go('notebook');return false" style="color:var(--aurora)">открыть блокнот</a></div>` : ""}</div>`;
}
// --- интервальное повторение ---
function srsUp(no) { const x = S.mistakes.find(m => m.no === no); if (!x) return; x.box = (x.box || 0) + 1; if (x.box > SRS.length) { S.mistakes = S.mistakes.filter(m => m !== x); S.stats.learned++; toast("Выучено! 🎉"); } else x.due = Date.now() + SRS[x.box - 1] * DAY; save(); }
function srsDown(no) { const x = S.mistakes.find(m => m.no === no); if (!x) return; x.box = 0; x.due = Date.now() + DAY; save(); }
const dueTxt = x => (x.due || 0) <= Date.now() ? "пора повторить" : "через " + Math.ceil((x.due - Date.now()) / DAY) + " дн.";
// --- достижения ---
const ACH = [
  ["first", "Первый шаг", "Пройди первый урок", () => S.done >= 1], ["l10", "Ученик", "Пройди 10 уроков", () => S.done >= 10],
  ["k50", "50 слов", "Отметь 50 слов как известные", () => S.known.length >= 50], ["k100", "100 слов", "Знаешь 100 слов", () => S.known.length >= 100],
  ["k500", "500 слов", "Знаешь 500 слов", () => S.known.length >= 500], ["s3", "3 дня подряд", "Серия 3 дня", () => (S.stats.best || 0) >= 3],
  ["s7", "Неделя", "Серия 7 дней", () => (S.stats.best || 0) >= 7], ["s30", "Месяц", "Серия 30 дней", () => (S.stats.best || 0) >= 30],
  ["perfect", "Без ошибок", "Пройди урок или тест без ошибок", () => S.stats.perfect >= 1], ["learn10", "Память", "Выучи 10 слов из блокнота", () => S.stats.learned >= 10],
  ["xp500", "500 XP", "Набери 500 XP", () => S.stats.xp >= 500], ["xp2000", "2000 XP", "Набери 2000 XP", () => S.stats.xp >= 2000], ["game5", "Игрок", "Выиграй 5 мини-игр", () => S.stats.games >= 5]
];
function achCheck() { ACH.forEach(a => { if (!S.ach[a[0]] && a[3]()) { S.ach[a[0]] = 1; toast("🏆 " + a[1]); } }); save(); }
function viewAch() {
  app.innerHTML = `<button class="btn ghost" id="bk">← Назад</button><h1 style="margin-top:14px">Достижения</h1><div class="card"><b>Уровень ${userLevel()}</b><div class="ex">${S.stats.xp} XP · до следующего уровня ${200 - S.stats.xp % 200}</div><div class="bar" style="margin:8px 0 0"><div style="width:${S.stats.xp % 200 / 2}%"></div></div></div>` +
    ACH.map(a => `<div class="card" style="${S.ach[a[0]] ? "" : "opacity:.5"}"><b>${S.ach[a[0]] ? "🏆" : "🔒"} ${a[1]}</b><div class="ex">${a[2]}</div></div>`).join("");
  $("#bk").onclick = viewGames;
}
// --- диалоги: [реплика, перевод, верный ответ, неверный 1, неверный 2] ---
const DIALOGS = [
  { icon: "☕", title: "В кафе", lv: "A1", steps: [
    ["Hei! Hva vil du ha?", "Привет! Что вы хотите?", ["Jeg vil ha en kaffe, takk.", "Мне кофе, пожалуйста."], ["Jeg heter Anna.", "Меня зовут Анна."], ["Jeg bor i Oslo.", "Я живу в Осло."]],
    ["Vil du ha noe å spise også?", "Хотите что-нибудь поесть?", ["Ja, en brødskive, takk.", "Да, бутерброд, пожалуйста."], ["Jeg kommer fra Ukraina.", "Я из Украины."], ["Nå er det kveld.", "Сейчас вечер."]],
    ["Det blir femti kroner.", "С вас пятьдесят крон.", ["Kan jeg betale med kort?", "Можно оплатить картой?"], ["Jeg har en bror.", "У меня есть брат."], ["God natt!", "Спокойной ночи!"]] ] },
  { icon: "👋", title: "Знакомство", lv: "A1", steps: [
    ["Hei! Hva heter du?", "Привет! Как тебя зовут?", ["Hei! Jeg heter Nazar.", "Привет! Меня зовут Назар."], ["Takk for maten.", "Спасибо за еду."], ["Jeg spiser brød.", "Я ем хлеб."]],
    ["Hvor kommer du fra?", "Откуда ты?", ["Jeg kommer fra Ukraina.", "Я родом из Украины."], ["Jeg liker kaffe.", "Я люблю кофе."], ["Det er mandag.", "Сегодня понедельник."]],
    ["Og hvor bor du nå?", "А где ты живёшь сейчас?", ["Jeg bor i Setermoen.", "Я живу в Сетермуене."], ["Jeg heter Nazar.", "Меня зовут Назар."], ["Jeg er sytten år.", "Мне семнадцать лет."]] ] },
  { icon: "🛍️", title: "В магазине", lv: "A2", steps: [
    ["Kan jeg hjelpe deg?", "Вам помочь?", ["Ja, jeg leter etter en jakke.", "Да, я ищу куртку."], ["Nei, jeg sover.", "Нет, я сплю."], ["Jeg heter jakke.", "Меня зовут куртка."]],
    ["Hvilken størrelse bruker du?", "Какой размер вы носите?", ["Jeg bruker medium.", "Я ношу средний."], ["Jeg liker fisk.", "Я люблю рыбу."], ["Jeg bor på rommet.", "Я живу в комнате."]],
    ["Skal du ta den?", "Берёте её?", ["Ja, jeg tar den.", "Да, я беру её."], ["Nei, det regner ikke.", "Нет, дождя нет."], ["Jeg har en gitar.", "У меня есть гитара."]] ] },
  { icon: "🏫", title: "В школе", lv: "A2", steps: [
    ["God morgen! Har du gjort leksene?", "Доброе утро! Ты сделал домашнее задание?", ["Ja, jeg gjorde dem i går.", "Да, я сделал его вчера."], ["Nei, jeg har en katt.", "Нет, у меня есть кот."], ["God natt, takk.", "Спокойной ночи, спасибо."]],
    ["Har du noen spørsmål?", "У тебя есть вопросы?", ["Ja, jeg forstår ikke dette ordet.", "Да, я не понимаю это слово."], ["Nei, jeg liker kaffe.", "Нет, я люблю кофе."], ["Jeg heter Mira.", "Меня зовут Мира."]],
    ["Kan du lese teksten høyt?", "Можешь прочитать текст вслух?", ["Ja, jeg kan prøve.", "Да, я попробую."], ["Nei, jeg er en lærer.", "Нет, я учитель."], ["Jeg spiser frokost nå.", "Я сейчас завтракаю."]] ] }
];
function viewDialogs() {
  app.innerHTML = `<button class="btn ghost" id="bk">← Назад</button><h1 style="margin-top:14px">Диалоги</h1><p class="sub">Выбирай правильные реплики. Верные фразы дают XP, ошибки идут в блокнот.</p>` +
    DIALOGS.map((d, i) => `<button class="node" data-d="${i}" style="margin-bottom:10px"><i>${d.icon}</i><span>${d.title}<br><small style="color:var(--dim)">${d.lv}</small></span></button>`).join("");
  $("#bk").onclick = viewGames; app.querySelectorAll("[data-d]").forEach(b => b.onclick = () => runDialog(DIALOGS[b.dataset.d]));
}
function runDialog(d) {
  let i = 0, tr = false; const log = [];
  const draw = () => {
    const st = d.steps[i];
    let h = `<button class="btn ghost" id="bk">← Выйти</button> <button class="btn ghost" id="trb">🌐 ${tr ? "Скрыть перевод" : "Показать перевод"}</button><h1 style="margin-top:14px">${d.icon} ${d.title}</h1><p class="sub">Нажми на реплику, чтобы увидеть её перевод.</p><div class="${tr ? "" : "hide-tr"}"><div class="chat">${log.map(m => `<div class="bub ${m.me ? "me" : ""}">${m.no}<small>${m.ru}</small></div>`).join("")}`;
    if (st) h += `<div class="bub">${st[0]}<small>${st[1]}</small></div></div>` + shuffle([st[2], st[3], st[4]]).map(o => `<button class="opt" data-ok="${o === st[2] ? 1 : 0}"><span>${o[0]}</span><small>${o[1]}</small></button>`).join("") + `</div>`;
    else h += `</div><div class="fb ok">Диалог пройден! +30 XP</div><button class="btn" id="fin">Готово</button></div>`;
    app.innerHTML = h; $("#bk").onclick = viewDialogs; $("#trb").onclick = () => { tr = !tr; draw(); };
    app.querySelectorAll(".bub").forEach(b => b.onclick = () => b.classList.toggle("open"));
    if ($("#fin")) { $("#fin").onclick = viewDialogs; return; }
    app.querySelectorAll(".opt").forEach(b => b.onclick = () => {
      if (b.dataset.ok === "1") {
        const o = st[2]; log.push({ no: st[0], ru: st[1] }, { me: 1, no: o[0], ru: o[1] }); i++; activity(true);
        if (i >= d.steps.length) { addXp(30); S.stats.games++; confetti(); achCheck(); } draw();
      } else { b.classList.add("bad"); b.disabled = true; addMistake(st[2][0], st[2][1]); activity(false); toast("Попробуй ещё · фраза в блокноте"); }
    });
  };
  draw();
}
// --- мини-игры ---
function gameMatch() {
  const ws = shuffle(allWords()).slice(0, 6), cards = shuffle(ws.flatMap((w, k) => [{ k, t: w.no, s: 0 }, { k, t: w.ru, s: 1 }]));
  let sel = null, got = 0, sec = 0;
  app.innerHTML = `<button class="btn ghost" id="bk">← Назад</button><h1 style="margin-top:14px">Найди пару</h1><p class="sub">Время: <b id="mt">0</b> c</p><div class="grid">${cards.map((c, n) => `<button class="opt" data-n="${n}">${c.t}</button>`).join("")}</div>`;
  const tick = setInterval(() => { if (!$("#mt")) return clearInterval(tick); $("#mt").textContent = ++sec; }, 1000);
  $("#bk").onclick = () => { clearInterval(tick); viewGames(); };
  const btns = [...app.querySelectorAll(".grid .opt")];
  btns.forEach((b, n) => b.onclick = () => {
    const c = cards[n];
    if (sel && sel.n === n) { b.classList.remove("sel"); sel = null; return; }
    if (!sel) { sel = { n, c }; b.classList.add("sel"); return; }
    if (sel.c.s === c.s) { btns[sel.n].classList.remove("sel"); sel = { n, c }; b.classList.add("sel"); return; }
    const a = btns[sel.n];
    if (sel.c.k === c.k) { [a, b].forEach(x => { x.classList.remove("sel"); x.classList.add("gone"); }); got++; activity(true);
      if (got === 6) { clearInterval(tick); addXp(30); S.stats.games++; confetti(); achCheck(); toast(`Готово за ${sec} c!`); setTimeout(viewGames, 1800); } }
    else { [a, b].forEach(x => { x.classList.remove("sel"); x.classList.add("bad"); setTimeout(() => x.classList.remove("bad"), 450); }); addMistake(ws[sel.c.k].no, ws[sel.c.k].ru); activity(false); }
    sel = null;
  });
}
function gameGender() {
  const ns = shuffle(allWords().filter(w => genderOf(w.no))).slice(0, 10); let i = 0, ok = 0;
  const q = () => {
    if (i >= ns.length) { addXp(ok * 5); if (ok >= 8) S.stats.games++; save(); return endScreen(ok, ns.length, viewGames, "К играм"); }
    const w = ns[i], g = genderOf(w.no);
    app.innerHTML = `<div class="bar"><div style="width:${i / ns.length * 100}%"></div></div><p class="sub">Какой артикль?</p><div class="q">${w.no.replace(/^(en|ei|et) /, "")}<br><small style="color:var(--dim);font-size:1rem">${w.ru}</small></div><div class="chips">${["en", "ei", "et"].map(x => `<button class="chip g-${x}" data-g="${x}" style="flex:1;font-size:1.3rem;padding:16px">${x}</button>`).join("")}</div><div id="fb"></div>`;
    app.querySelectorAll("[data-g]").forEach(b => b.onclick = () => {
      app.querySelectorAll("[data-g]").forEach(x => x.disabled = true);
      const good = b.dataset.g === g; if (good) ok++; else addMistake(w.no, w.ru); activity(good);
      $("#fb").innerHTML = `<div class="fb ${good ? "ok" : "no"}">${good ? "Верно!" : "Правильно: " + w.no}</div>`;
      setTimeout(() => { i++; q(); }, good ? 600 : 1400);
    });
  };
  q();
}
function viewGames() {
  app.innerHTML = `<h1>Игры</h1><p class="sub">Тренируйся играя. Ошибки попадают в блокнот.</p>` +
    [["dlg", "💬", "Диалоги", "Реплики в кафе, магазине, школе"], ["mt", "🧩", "Найди пару", "Слово и перевод на время"], ["gd", "🎨", "Угадай род", "en, ei или et?"], ["sp", "⚡", "Скоростной раунд", "60 секунд, комбо даёт время"], ["or", "🟩", "Ordle", "Угадай слово за 6 попыток"], ["ac", "🏆", "Достижения", `Уровень ${userLevel()} · ${Object.keys(S.ach).length}/${ACH.length}`]]
      .map(g => `<button class="node" data-gm="${g[0]}" style="margin-bottom:10px"><i>${g[1]}</i><span>${g[2]}<br><small style="color:var(--dim)">${g[3]}</small></span></button>`).join("");
  const m = { dlg: viewDialogs, mt: gameMatch, gd: gameGender, sp: gameSpeed, or: gameOrdle, ac: viewAch };
  app.querySelectorAll("[data-gm]").forEach(b => b.onclick = m[b.dataset.gm]);
}
function gameSpeed() {
  const pool = allWords().filter(w => w.ru.length < 28); let score = 0, combo = 0, left = 60, w;
  app.innerHTML = `<button class="btn ghost" id="bk">← Назад</button><h1 style="margin-top:14px">Скоростной раунд</h1><p class="sub">⏱ <b id="sl">60</b> c · очки: <b id="ss">0</b> · комбо: <b id="sc">0</b></p><div id="sq"></div>`;
  const end = () => { addXp(score * 2); if (score >= 15) { S.stats.games++; confetti(); } save(); achCheck(); app.innerHTML = `<h1>Время!</h1><p class="sub">Очки: ${score} · +${score * 2} XP</p><button class="btn" id="b">К играм</button>`; $("#b").onclick = viewGames; };
  const tick = setInterval(() => { if (!$("#sl")) return clearInterval(tick); $("#sl").textContent = --left; if (left <= 0) { clearInterval(tick); end(); } }, 1000);
  $("#bk").onclick = () => { clearInterval(tick); viewGames(); };
  const next = () => {
    if (!$("#sq")) return;
    w = pool[Math.floor(Math.random() * pool.length)];
    const wrong = shuffle(pool.filter(x => x.ru !== w.ru)).slice(0, 3).map(x => x.ru);
    $("#sq").innerHTML = `<div class="q">${w.no}</div>` + shuffle([w.ru, ...wrong]).map(o => `<button class="opt">${o}</button>`).join("");
    $("#sq").querySelectorAll(".opt").forEach(b => b.onclick = () => {
      if (b.textContent === w.ru) { score++; combo++; if (combo % 5 === 0) { left += 3; toast("Комбо ×" + combo + " · +3 c"); } activity(true); }
      else { combo = 0; addMistake(w.no, w.ru); activity(false); }
      $("#ss").textContent = score; $("#sc").textContent = combo; next();
    });
  };
  next();
}
function gameOrdle() {
  const all = allWords().map(w => ({ w, k: w.no.replace(/^(en|ei|et|å) /, "").toLowerCase() })).filter(x => /^[a-zæøå]+$/.test(x.k));
  const len = all.filter(x => x.k.length === 5).length >= 10 ? 5 : 4;
  const pick = shuffle(all.filter(x => x.k.length === len))[0], goal = pick.k, rows = []; let over = false, won = false;
  const paint = () => {
    app.innerHTML = `<button class="btn ghost" id="bk">← Назад</button><h1 style="margin-top:14px">Ordle</h1><p class="sub">Угадай норвежское слово из ${len} букв. Подсказка: «${pick.w.ru}». Попыток: ${6 - rows.length}</p>
      <div class="ord">${rows.map(r => `<div class="orow">${r.map(c => `<span class="oc ${c[1]}">${c[0]}</span>`).join("")}</div>`).join("")}</div>
      ${over ? `<div class="fb ${won ? "ok" : "no"}">${won ? "Верно!" : "Слово было: " + pick.w.no}</div><button class="btn" id="nw">Ещё раз</button>` : `<div class="chips"><input type="text" id="og" maxlength="${len}" autocomplete="off" autocapitalize="off" placeholder="${len} букв"><button class="btn" id="okb">OK</button></div>`}`;
    $("#bk").onclick = viewGames;
    if (over) { $("#nw").onclick = gameOrdle; return; }
    const submit = () => {
      const g = $("#og").value.trim().toLowerCase(); if (g.length !== len) return toast(`Нужно ${len} букв`);
      const res = g.split("").map(c => [c, "x"]), left = goal.split("");
      res.forEach((c, i) => { if (c[0] === goal[i]) { c[1] = "g"; left[i] = null; } });
      res.forEach(c => { if (c[1] === "x") { const j = left.indexOf(c[0]); if (j >= 0) { c[1] = "y"; left[j] = null; } } });
      rows.push(res);
      if (g === goal) { over = won = true; addXp(25); S.stats.games++; confetti(); achCheck(); }
      else if (rows.length >= 6) { over = true; addMistake(pick.w.no, pick.w.ru); }
      paint();
    };
    $("#okb").onclick = submit; $("#og").onkeydown = ev => { if (ev.key === "Enter") submit(); };
  };
  paint();
}
// --- свои истории ---
function loadUserStories() { (S.userStories || []).forEach(s => { if (!STORIES.some(x => x.id === s.id)) STORIES.push(s); }); }
function storyExtras() {
  app.querySelector("h1").insertAdjacentHTML("afterend", `<button class="btn ghost" id="addst" style="margin:6px 0 12px">＋ Своя история</button>`);
  $("#addst").onclick = storyForm;
}
function storyForm() {
  let lv = "A1";
  app.innerHTML = `<button class="btn ghost" id="bk">← Назад</button><h1 style="margin-top:14px">Новая история</h1>
    <input type="text" id="st" class="search" placeholder="Название по-норвежски"><input type="text" id="sr" class="search" placeholder="Название по-русски">
    <div class="chips">${LEVELS.map(l => `<button class="chip ${l === lv ? "on" : ""}" data-lv="${l}">${l}</button>`).join("")}</div>
    <textarea id="sn" placeholder="Текст по-норвежски"></textarea><textarea id="stt" placeholder="Перевод (по желанию)" style="margin-top:8px"></textarea><div style="margin-top:10px"><button class="btn" id="sv">Сохранить</button></div>`;
  $("#bk").onclick = viewStories;
  app.querySelectorAll("[data-lv]").forEach(b => b.onclick = () => { lv = b.dataset.lv; app.querySelectorAll("[data-lv]").forEach(x => x.classList.toggle("on", x === b)); });
  $("#sv").onclick = () => {
    const no = $("#sn").value.trim(); if (!no) return toast("Вставь текст истории");
    const s = { id: "u_" + Date.now(), level: lv, title: esc($("#st").value.trim() || "Моя история"), ru: esc($("#sr").value.trim() || "Своя история"), no: esc(no), tr: esc($("#stt").value.trim() || "Перевода нет."), vocab: [], mine: true };
    S.userStories.push(s); STORIES.push(s); save(); viewStories();
  };
}
function storyTools(s) {
  const known = new Set(allWords().map(w => w.no.replace(/^(en|ei|et|å) /, "").toLowerCase()));
  const cand = [...new Set(s.no.toLowerCase().match(/[a-zæøå]{4,}/g) || [])].filter(w => !known.has(w)).slice(0, 40).map(w => [w, "—"]);
  const list = [...s.vocab, ...cand];
  app.insertAdjacentHTML("beforeend", `<h2>Слова в блокнот</h2><div class="card"><div class="ex">Нажми на слово, чтобы сохранить его в блокнот.</div><div class="chips">${list.map((w, i) => `<button class="chip" data-w="${i}" title="${esc(w[1])}">${w[0]}</button>`).join("")}</div>${s.vocab.length ? '<button class="btn ghost" id="allv">Добавить весь разбор</button>' : ""}${s.mine ? ' <button class="btn ghost" id="del">Удалить историю</button>' : ""}</div>`);
  app.querySelectorAll("[data-w]").forEach(b => b.onclick = () => { const w = list[b.dataset.w]; addMistake(w[0], w[1]); b.classList.add("used"); toast("В блокноте"); });
  if ($("#allv")) $("#allv").onclick = () => { s.vocab.forEach(w => addMistake(w[0], w[1])); toast("Разбор добавлен в блокнот"); };
  if ($("#del")) $("#del").onclick = () => { if (!confirm("Удалить историю?")) return; S.userStories = S.userStories.filter(x => x.id !== s.id); STORIES.splice(STORIES.indexOf(s), 1); save(); viewStories(); };
}

// --- Тренировка (кнопка в «Грамматике») ---
const RULE_NAMES = { v2: "Глагол на 2-м месте", q: "Порядок слов в вопросах", past: "Прошедшее время", neg: "Где ставить «ikke»", modal: "Модальные глаголы", fut: "Будущее время", prep: "Предлоги", noun: "Существительные и артикли", pron: "Местоимения", sub: "Придаточные" };
const TENSE_HELP = [
  ["Инфинитив", "начальная форма, как в словаре: отвечает на вопрос «что делать?»", "å spise = есть"],
  ["Настоящее", "то, что происходит сейчас или происходит обычно", "jeg spiser = я ем"],
  ["Прошедшее простое", "то, что было в прошлом и уже закончилось (вчера, в прошлом году)", "jeg spiste = я ел"],
  ["Перфект", "«уже сделал»: действие закончено, а результат важен сейчас. Строится так: har + причастие", "jeg har spist = я поел"],
  ["Плюсквамперфект", "«давно прошедшее»: действие было раньше другого прошлого действия. Строится так: hadde + причастие", "jeg hadde spist = я уже поел (до того, как…)"],
  ["Будущее", "то, что ещё только будет. Строится так: skal или vil + инфинитив без «å»", "jeg skal spise = я буду есть"],
  ["Повелительное", "приказ, просьба или совет, когда обращаешься к человеку", "Spis! = Ешь!"]
];
function tenseCard(inner) {
  const body = `<div class="ex">У каждого глагола 7 форм. Вот что они значат на примере глагола «å spise» (есть):</div>` + TENSE_HELP.map((t, i) => `<p style="margin-top:10px"><b>${t[0]}</b> <small style="color:var(--dim)">(${TENSES[i][0]})</small><br>${t[1]}.<br><i>${t[2]}</i></p>`).join("") + `<p class="tr">Не знаешь, какое прошедшее выбрать? Рассказываешь, что было → прошедшее простое (spiste). Говоришь «уже сделал» → перфект (har spist).</p>`;
  return inner ? body : `<div class="card"><h2 style="margin-top:0">Что значат формы глагола</h2>${body}</div>`;
}
const VLEVEL = {
  A1: ["være", "ha", "gå", "spise", "drikke", "lage", "bo", "like", "se", "komme", "skrive", "lære", "hjelpe", "møte", "stå", "sove", "bruke", "ta", "gi", "få", "bli", "gjøre", "si", "snakke", "kjøpe", "lese", "høre", "vite", "finne", "sitte", "spille", "åpne", "vente", "jobbe", "hete", "kjøre", "reise"],
  A2: ["tenke", "forstå", "huske", "glemme", "spørre", "svare", "fortelle", "forklare", "løpe", "svømme", "danse", "synge", "le", "smile", "ringe", "sende", "betale", "koste", "arbeide", "studere", "prøve", "begynne", "slutte", "stoppe", "lukke", "trenge", "bestille", "hente", "vise", "bygge", "vaske", "koke", "bake", "falle", "dra", "våkne", "regne", "vinne", "treffe", "besøke", "velge", "planlegge", "sjekke", "lete", "søke", "elske", "føle", "kjenne", "selge", "tro", "håpe", "ønske", "ligge", "legge", "sette", "bære", "steke"]
};
const verbsOf = lv => VERBS.filter(v => (VLEVEL.A1.includes(v[0]) ? "A1" : VLEVEL.A2.includes(v[0]) ? "A2" : "B1") === lv);
function verbTask(v, t) {
  const f = verbForms(v), h = TENSE_HELP[t];
  return { type: "type", hint: `${h[1]}. Пример: ${h[2]}`, q: `«${v[5]}» (å ${v[0]}) → ${h[0]}`, a: f[t], no: f[t], ru: `${v[0]} (${v[5]}): ${h[0]}` };
}
function verbEx(n, tenses, pool) {
  pool = pool && pool.length ? pool : VERBS;
  return Array.from({ length: n }, () => verbTask(pool[Math.floor(Math.random() * pool.length)], tenses[Math.floor(Math.random() * tenses.length)]));
}
const VERB_MODES = [["Все формы", [1, 2, 3, 4, 5, 6]], ["Настоящее", [1]], ["Прошедшее простое", [2]], ["Перфект", [3]], ["Плюсквамперфект", [4]], ["Будущее", [5]], ["Повелительное", [6]]];
function genderEx(n, lv) {
  return shuffle(allWords().filter(w => genderOf(w.no) && (!lv || w.level === lv))).slice(0, n).map(w => ({ type: "choice", hint: "Какой артикль?", q: w.no.replace(/^(en|ei|et) /, ""), a: genderOf(w.no), opts: ["en", "ei", "et"], no: w.no, ru: w.ru }));
}
const ruleEx = (r, n, lv) => sentenceExercises(shuffle(BUILD.filter(b => (!r || b.rule === r) && (!lv || b.lv === lv))).slice(0, n).map(b => [b.no, b.ru]));
const wordEx = (lv, n) => { const pool = allWords(); return wordExercises(shuffle(pool.filter(w => w.level === lv)).slice(0, n), pool); };
let trainLv = "A1";
function viewTrain() {
  const lv = trainLv, run = items => items.length ? runQuiz(items, (ok, n) => endScreen(ok, n, viewTrain, "К тренировке")) : toast("Для этого уровня пока нет заданий");
  const B = BUILD.filter(b => b.lv === lv), cnt = {}; B.forEach(b => cnt[b.rule] = (cnt[b.rule] || 0) + 1);
  const vs = verbsOf(lv), ws = allWords().filter(w => w.level === lv);
  app.innerHTML = `<button class="btn ghost" id="bk">← К грамматике</button><h1 style="margin-top:14px">Тренировка</h1><p class="sub">Выбери уровень, потом что тренировать. Ошибки попадут в блокнот.</p>
    <div class="chips">${LEVELS.map(l => `<button class="chip ${l === lv ? "on" : ""}" data-lv="${l}">${l}</button>`).join("")}</div>
    <h2>Правила ${lv}</h2>${B.length ? `<button class="btn" id="ra">Все правила ${lv} · ${B.length} предложений</button><div class="chips">${Object.keys(cnt).map(r => `<button class="chip" data-r="${r}">${RULE_NAMES[r] || r} · ${cnt[r]}</button>`).join("")}</div>` : '<p class="sub">Заданий по правилам для этого уровня пока нет.</p>'}
    <h2>Глаголы ${lv}</h2>${vs.length ? `<button class="btn" id="va">Все формы · ${vs.length} глаголов</button><div class="chips">${VERB_MODES.slice(1).map((m, i) => `<button class="chip" data-v="${i + 1}">${m[0]}</button>`).join("")}</div><details class="card"><summary>Что значат формы глагола?</summary>${tenseCard(true)}</details>` : '<p class="sub">Глаголов этого уровня пока нет.</p>'}
    <h2>Слова ${lv}: что надо знать</h2>${ws.length ? `<button class="btn" id="wa">Слова ${lv} · ${ws.length} в базе</button><div class="chips"><button class="chip" id="gn">Угадай артикль</button></div>` : '<p class="sub">Слов этого уровня пока мало.</p>'}
    <h2>Проверка</h2><div class="chips"><button class="chip" id="ts">Тест ${lv}</button><button class="chip" id="mx">Микс ${lv}</button></div>`;
  $("#bk").onclick = viewGrammar;
  app.querySelectorAll("[data-lv]").forEach(b => b.onclick = () => { trainLv = b.dataset.lv; viewTrain(); });
  app.querySelectorAll("[data-r]").forEach(b => b.onclick = () => run(ruleEx(b.dataset.r, 8, lv)));
  app.querySelectorAll("[data-v]").forEach(b => b.onclick = () => run(verbEx(10, VERB_MODES[b.dataset.v][1], vs)));
  if ($("#ra")) $("#ra").onclick = () => run(ruleEx(null, 10, lv));
  if ($("#va")) $("#va").onclick = () => run(verbEx(10, VERB_MODES[0][1], vs));
  if ($("#wa")) $("#wa").onclick = () => run(wordEx(lv, 10));
  if ($("#gn")) $("#gn").onclick = () => run(genderEx(10, lv));
  $("#ts").onclick = () => run(levelTest(lv));
  $("#mx").onclick = () => run(shuffle([...ruleEx(null, 4, lv), ...verbEx(4, [1, 2, 3], vs), ...genderEx(3, lv), ...wordEx(lv, 4).filter(x => x.type === "choice")]));
}
