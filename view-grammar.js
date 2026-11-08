// ===== ⚙️ Грамматика: темы с самой базы, читать можно любые =====
let gTab = "rules", gOpen = "", gLv = "all", gQ = "", vQ = "", vLv = "all", vN = 60;

function ruleBody(t, noBtn) {
  return `<div class="rb">${t.html}
    ${t.ex ? `<div class="exl">${t.ex.map(e => `<div class="exr"><button class="ib sm" data-say="${esc(e[0])}" aria-label="Озвучить">🔊</button><div><b class="no">${esc(e[0])}</b><small>${esc(e[1])}</small></div></div>`).join("")}</div>` : ""}
    ${t.tip ? `<div class="tipbox">💡 ${t.tip}</div>` : ""}
    ${noBtn ? "" : `<div class="rb-foot"><button class="btn sm" data-pr="${t.id}">✍️ Потренироваться</button></div>`}</div>`;
}
function fillRule(d) {
  if (d.dataset.filled) return;
  const t = topicById(d.dataset.id); if (!t) return;
  d.dataset.filled = "1"; d.insertAdjacentHTML("beforeend", ruleBody(t));
  d.querySelectorAll("[data-say]").forEach(b => b.onclick = () => say(b.dataset.say));
  const pb = d.querySelector("[data-pr]"); if (pb) pb.onclick = () => practiceTopic(t);
}
// перейти к теме из другого места (урок, тренировка)
function openRule(id) { gTab = "rules"; gOpen = id; gLv = "all"; gQ = ""; go("grammar"); }

function topicItems(t) {
  let it = shuffle((t.pr || []).slice()).slice(0, 7);
  if (t.rule) it = it.concat(ruleEx(t.rule, 3));
  if (t.verbs) it = it.concat(verbEx(3, t.verbs));
  return shuffle(it).slice(0, 9);
}
function practiceTopic(t) {
  const items = topicItems(t);
  if (items.length < 2) return toast("Для этой темы пока нет упражнений");
  const back = () => { gTab = "rules"; viewGrammar(); };
  runQuiz(items, (ok, n) => { if (ok / n >= .7) { S.gdone[t.id] = 1; save(); } endScreen(ok, n, back, "К теме «" + t.title.split(" — ")[0].split(":")[0] + "»"); }, back);
  gOpen = t.id;
}

function viewGrammar() {
  const tabs = [["rules", "Правила"], ["verbs", "Глаголы"], ["a1", "A1: что знать"], ["tests", "Тесты"]];
  let h = `<div class="top"><div><h1>Грамматика</h1></div><button class="btn sm" id="trn">🏋️ Тренироваться</button></div>
    <div class="chips">${tabs.map(t => `<button class="chip ${gTab === t[0] ? "on" : ""}" data-g="${t[0]}">${t[1]}</button>`).join("")}</div>`;
  if (gTab === "rules") {
    h += `<p class="sub">Темы идут от самой базы: артикли → множественное число → глаголы → союзы. Читать можно любую тему, уровень не ограничивает.</p>
      <input type="text" id="gq" class="search" placeholder="Найти тему (например: om, артикль, вопросы)" value="${esc(gQ)}">
      <div class="chips">${["all", ...LEVELS].map(l => `<button class="chip ${gLv === l ? "on" : ""}" data-gl="${l}">${l === "all" ? "Все уровни" : l}</button>`).join("")}</div><div class="chips" id="gjump"></div><div id="glist"></div>`;
  }
  if (gTab === "a1") h += `<p class="sub">Минимум для уровня A1. Освоишь всё это — переходи к A2.</p>` + A1_MIN.map(x => `<div class="card"><b>${x[0]}</b><div class="ex">${x[1]}</div></div>`).join("") + `<button class="btn" data-t="A1">Пройти тест A1</button>`;
  if (gTab === "tests") h += `<p class="sub">Каждый тест: слова, конструктор и формы глаголов. Ошибки идут в блокнот.</p><div class="chips">${LEVELS.map(l => `<button class="btn ghost" data-t="${l}">Тест ${l}</button>`).join("")}</div><button class="btn" data-vt="1">Тест на времена глаголов</button>`;
  if (gTab === "verbs") h += tenseCard() + `<div class="chips">${["all", ...LEVELS].map(l => `<button class="chip ${vLv === l ? "on" : ""}" data-vl="${l}">${l === "all" ? "Все глаголы" : l}</button>`).join("")}</div><input type="text" id="vq" class="search" placeholder="Поиск глагола (любая форма или перевод)" value="${esc(vQ)}"><div id="vres"></div>`;
  app.innerHTML = h;
  $("#trn").onclick = viewTrain;
  app.querySelectorAll("[data-g]").forEach(b => b.onclick = () => { gTab = b.dataset.g; viewGrammar(); });
  app.querySelectorAll("[data-t]").forEach(b => b.onclick = () => runQuiz(levelTest(b.dataset.t), (ok, n) => endScreen(ok, n, viewGrammar, "К грамматике"), viewGrammar));
  app.querySelectorAll("[data-vt]").forEach(b => b.onclick = () => runQuiz(verbExercises(8), (ok, n) => endScreen(ok, n, viewGrammar, "К грамматике"), viewGrammar));
  if (gTab === "verbs") {
    app.querySelectorAll("[data-vl]").forEach(b => b.onclick = () => { vLv = b.dataset.vl; vN = 60; viewGrammar(); });
    $("#vq").oninput = e => { vQ = e.target.value; vN = 60; drawVerbs(); }; drawVerbs();
  }
  if (gTab === "rules") {
    app.querySelectorAll("[data-gl]").forEach(b => b.onclick = () => { gLv = b.dataset.gl; drawRules(); app.querySelectorAll("[data-gl]").forEach(x => x.classList.toggle("on", x === b)); });
    $("#gq").oninput = e => { gQ = e.target.value; drawRules(); };
    drawRules();
    if (gOpen) setTimeout(() => { const d = document.getElementById("g-" + gOpen); if (d) { d.open = true; fillRule(d); d.scrollIntoView({ block: "start" }); } }, 30);
  }
}
const gKey = t => t.first ? -1 : t.after ? GTOPICS.findIndex(x => x.id === t.after) + 0.5 : GTOPICS.indexOf(t);
function drawRules() {
  const q = gQ.trim().toLowerCase(); let h = "", n = 0, jump = "";
  GSEC.forEach(([sec, name, short]) => {
    const list = GTOPICS.filter(t => t.sec === sec && (gLv === "all" || t.lv === gLv) && (!q || (t.title + " " + t.lead).toLowerCase().includes(q))).sort((a, b) => gKey(a) - gKey(b));
    if (!list.length) return;
    n += list.length; jump += `<button class="chip" data-j="gs-${sec}">${short}</button>`;
    h += `<div class="gsec" id="gs-${sec}">${name}</div>` + list.map(t => `<details class="rule" id="g-${t.id}" data-id="${t.id}" ${gOpen === t.id ? "open" : ""}><summary><span class="lvpill ${t.lv}">${t.lv}</span><span class="st"><b>${t.title}</b><small>${t.lead}</small></span>${S.gdone[t.id] ? '<span class="gdone" title="Пройдено">✓</span>' : ""}</summary></details>`).join("");
  });
  $("#gjump").innerHTML = jump;
  $("#gjump").querySelectorAll("[data-j]").forEach(b => b.onclick = () => document.getElementById(b.dataset.j).scrollIntoView({ behavior: "smooth", block: "start" }));
  const box = $("#glist"); box.innerHTML = h || '<p class="sub">Тем не найдено.</p>';
  box.querySelectorAll("details.rule").forEach(d => { if (d.open) fillRule(d); d.addEventListener("toggle", () => { if (d.open) { fillRule(d); gOpen = d.dataset.id; } else if (gOpen === d.dataset.id) gOpen = ""; }); });
}
function drawVerbs() {
  const q = vQ.trim().toLowerCase(), pool = vLv === "all" ? VERBS : verbsOf(vLv), list = pool.filter(v => !q || v.some(f => f.toLowerCase().includes(q)));
  const head = `<tr><th>Глагол</th>${TENSES.map(t => `<th>${t[1]}</th>`).join("")}</tr>`, vis = list.slice(0, vN);
  $("#vres").innerHTML = list.length ? `<p class="sub">Показано ${vis.length} из ${list.length}</p><div style="overflow-x:auto"><table style="min-width:640px">${head}${vis.map(v => `<tr><td><b>${v[0]}</b><br><small>${v[5]}</small></td>${verbForms(v).map(f => `<td>${f}</td>`).join("")}</tr>`).join("")}</table></div>${list.length > vN ? `<button class="btn ghost big" id="vmore">Показать ещё (${list.length - vN})</button>` : ""}` : '<p class="sub">Глагол не найден.</p>';
  const mb = $("#vmore"); if (mb) mb.onclick = () => { vN += 100; drawVerbs(); };
}
function levelTest(lv) {
  const pool = allWords().map(w => ({ no: w.no, ru: w.ru })), ws = shuffle(allWords().filter(w => w.level === lv)).slice(0, 6);
  let b = BUILD.filter(x => x.lv === lv); if (b.length < 3) b = BUILD;
  return shuffle([...wordExercises(ws.slice(0, 3), pool).filter(e => e.type === "choice"), ...sentenceExercises(shuffle(b).slice(0, 4).map(x => [x.no, x.ru])), ...verbEx(3, [1, 2, 3], verbsOf(lv))]);
}
