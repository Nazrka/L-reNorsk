// ===== 📝 Блокнот: слова по уровням A1–C1 и «Мои» =====
let nbLv = "all", nbAddLv = "";
const NB_TABS = [...LEVELS, "my"];
const nbName = l => l === "my" ? "Мои" : l;
const nbLevel = x => x.level || levelOf(x.no);

function viewNotebook() {
  const m = S.mistakes, now = Date.now();
  const cnt = {}; m.forEach(x => { const l = nbLevel(x); cnt[l] = (cnt[l] || 0) + 1; });
  const shown = m.map((x, i) => [x, i]).filter(([x]) => nbLv === "all" || nbLevel(x) === nbLv);
  const due = shown.filter(([x]) => (x.due || 0) <= now);
  if (!nbAddLv) nbAddLv = nbLv === "all" ? "my" : nbLv;
  const card = ([x, i]) => `<div class="card"><div class="res row"><span><b>${esc(x.no)}</b>${gBadge(x.no)}<br><small class="dim">${esc(x.ru)} · ${dueTxt(x)}</small></span><span style="display:flex;gap:6px"><button class="ib" data-s="${i}" aria-label="Озвучить">🔊</button><button class="ib ok" data-r="${i}" title="Выучил" aria-label="Выучил">✓</button></span></div><input type="text" class="search" data-note="${i}" placeholder="Моя заметка" value="${esc(x.note || "")}"></div>`;
  let list = "";
  if (!shown.length) list = `<div class="card">${m.length ? "В этом разделе пока пусто." : "Пока пусто. Нажимай ♡ на словах, «Не знаю» на карточках или проходи уроки: слова с ошибками попадут сюда сами, каждое в свой уровень."}</div>`;
  else if (nbLv === "all") list = NB_TABS.map(l => { const g = shown.filter(s => nbLevel(s[0]) === l); return g.length ? `<div class="nbh"><span class="lvpill ${l}">${nbName(l)}</span><span class="cnt">${g.length} слов</span></div>${g.map(card).join("")}` : ""; }).join("");
  else list = shown.map(card).join("");
  app.innerHTML = `<h1>Блокнот</h1><p class="sub">Слова, которые ты пометил ♡ или в которых ошибся, разложены по уровням. Тренируй их отдельно, пиши заметки и добавляй свои слова.</p>
    <div class="chips"><button class="chip ${nbLv === "all" ? "on" : ""}" data-f="all">Все · ${m.length}</button>${NB_TABS.map(l => `<button class="chip ${nbLv === l ? "on" : ""}" data-f="${l}">${nbName(l)}${cnt[l] ? " · " + cnt[l] : ""}</button>`).join("")}</div>
    <div class="card"><b>Добавить своё слово</b><div class="chips"><input type="text" id="nn" placeholder="По-норвежски"><input type="text" id="nr" placeholder="Перевод"></div>
      <div class="small dim">В какой раздел:</div><div class="lvsel">${NB_TABS.map(l => `<button class="chip ${nbAddLv === l ? "on" : ""}" data-al="${l}">${nbName(l)}</button>`).join("")}</div><button class="btn" id="na">Добавить</button></div>
    ${shown.length ? `<div class="chips"><button class="btn" id="rp">${due.length ? "Повторить сегодня (" + due.length + ")" : "Повторить всё (" + shown.length + ")"}</button><button class="btn ghost" id="cl">Очистить ${nbLv === "all" ? "всё" : "раздел " + nbName(nbLv)}</button></div>` : ""}
    ${list}
    <h2>Свободные заметки</h2><textarea id="fr" placeholder="Пиши что угодно: правила, фразы, вопросы...">${esc(S.free)}</textarea>`;
  app.querySelectorAll("[data-f]").forEach(b => b.onclick = () => { nbLv = b.dataset.f; nbAddLv = nbLv === "all" ? "my" : nbLv; viewNotebook(); });
  app.querySelectorAll("[data-al]").forEach(b => b.onclick = () => { nbAddLv = b.dataset.al; app.querySelectorAll("[data-al]").forEach(x => x.classList.toggle("on", x === b)); });
  $("#na").onclick = () => {
    const no = $("#nn").value.trim(); if (!no) return;
    const x = S.mistakes.find(q => q.no === no);
    if (x) { x.ru = $("#nr").value.trim() || x.ru; x.level = nbAddLv; x.box = 0; x.due = Date.now(); } else S.mistakes.push({ no, ru: $("#nr").value.trim() || "—", box: 0, due: Date.now(), level: nbAddLv });
    save(); viewNotebook();
  };
  $("#fr").oninput = e => { S.free = e.target.value; save(); };
  app.querySelectorAll("[data-note]").forEach(inp => inp.onchange = () => { S.mistakes[inp.dataset.note].note = inp.value; save(); });
  app.querySelectorAll("[data-s]").forEach(b => b.onclick = () => say(m[b.dataset.s].no));
  app.querySelectorAll("[data-r]").forEach(b => b.onclick = () => { S.mistakes.splice(+b.dataset.r, 1); save(); viewNotebook(); });
  if (!shown.length) return;
  $("#cl").onclick = () => {
    if (!confirm(nbLv === "all" ? "Удалить все слова из блокнота?" : "Удалить все слова раздела " + nbName(nbLv) + "?")) return;
    S.mistakes = nbLv === "all" ? [] : S.mistakes.filter(x => nbLevel(x) !== nbLv); save(); viewNotebook();
  };
  $("#rp").onclick = () => {
    const src = (due.length ? due : shown).map(([x]) => x);
    const items = shuffle(src).map(x => ({ type: "type", hint: x.ru.includes(":") ? "Повтори форму" : "Напиши по-норвежски", q: x.ru, a: x.no, alts: [x.no.replace(/^(en|ei|et|å) /, "")], no: x.no, ru: x.ru, rev: true }));
    runQuiz(items, (ok, n) => endScreen(ok, n, viewNotebook, "В блокнот"), viewNotebook);
  };
}
