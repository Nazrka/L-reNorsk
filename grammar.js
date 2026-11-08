// ===== Грамматика: каркас =====
// Темы лежат в grammar-noun.js, grammar-verb.js, grammar-glue.js.
// Чтобы добавить тему — допиши G({...}) в любой из них. Порядок на экране = порядок секций ниже.
const GTOPICS = [];
const GSEC = [
  ["noun", "1 · Substantiv — существительные и артикли", "Substantiv"],
  ["pron", "2 · Местоимения", "Местоимения"],
  ["adj", "3 · Adjektiv — прилагательные", "Adjektiv"],
  ["verb", "4 · Verb — глаголы", "Verb"],
  ["modal", "5 · Modalverb — модальные глаголы", "Modalverb"],
  ["order", "6 · Порядок слов", "Порядок слов"],
  ["prep", "7 · Предлоги", "Предлоги"],
  ["glue", "8 · Частицы и союзы простыми словами", "Союзы"],
  ["adv", "9 · Продвинутое (B1–C1)", "B1–C1"]
];
const G = t => { GTOPICS.push(t); };
// Упражнения: C(вопрос, верный, "неверный1|неверный2", пояснение), B(норв., рус.), T(вопрос, ответ)
const C = (q, a, wrong, exp) => ({ type: "choice", hint: "Выбери правильный вариант", q, a, opts: [a, ...wrong.split("|")], exp });
const B = (no, ru) => ({ type: "build", hint: "Собери предложение", q: ru, a: no, no, ru });
const T = (q, a, exp) => ({ type: "type", hint: "Напиши по-норвежски", q, a, exp });
// какое правило из BUILD к какой теме относится
const RULE_TOPIC = { v2: "v2", q: "q", past: "past", neg: "neg", modal: "modal", fut: "fut", prep: "prep", noun: "art", pron: "pron", sub: "sub" };
const topicById = id => GTOPICS.find(t => t.id === id);
