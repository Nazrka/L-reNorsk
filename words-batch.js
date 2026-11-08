// ===== Помощник для добавления слов пачками =====
// addWords("B1", `норвежское|перевод|пример|перевод примера`)  — по одной строке на слово.
// Дубли (по всем уровням, без учёта en/ei/et/å) пропускаются автоматически.
function addWords(lv, text) {
  const key = s => s.toLowerCase().replace(/^(en|ei|et|å) /, "");
  const seen = new Set(Object.values(WORDS).flat().map(w => key(w[0])));
  const L = WORDS[lv] = WORDS[lv] || [];
  text.trim().split("\n").forEach(line => {
    const p = line.split("|").map(s => s.trim());
    if (p.length < 2 || !p[0] || seen.has(key(p[0]))) return;
    seen.add(key(p[0]));
    L.push([p[0], p[1], "слова", p[2] || "", p[3] || ""]);
  });
}
