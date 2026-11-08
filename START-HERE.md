# Norsk на GitHub Pages (бесплатно)

## 1. Выложить сайт
1. Зайди на github.com, нажми **New repository**, назови, например, `norsk`, поставь **Public**, создай.
2. Нажми **uploading an existing file** и перетащи ВСЕ файлы из папки проекта (index.html, styles.css, app.js, main.js, extras.js, view-words.js, view-stories.js, grammar*.js, data*.js, words-*.js, dialogs-*.js, stories-*.js, sw.js, manifest.webmanifest, icon*, папку tools). Нажми **Commit changes**.
3. **Settings → Pages → Build and deployment → Source: Deploy from a branch → main / (root) → Save**.
4. Через минуту сайт будет по адресу `https://ТВОЁ-ИМЯ.github.io/norsk/`. Каждое новое сохранение файлов в репозитории обновляет сайт само.

## 2. Озвучка бесплатно, без компьютера (GitHub Actions)
1. В репозитории: **Add file → Create new file**, имя файла: `.github/workflows/audio.yml` (если папка `.github` не загрузилась с остальными). Вставь туда содержимое файла `audio.yml` из этого проекта и нажми Commit.
2. Вкладка **Actions → Generate audio → Run workflow**. Подожди 5–15 минут.
3. В репозитории появится папка `audio/` с mp3 и `manifest.json`, сайт сам начнёт играть нормальный голос.
4. Добавил новые слова — workflow запустится сам и озвучит только новое.

Если Actions не сработает (иногда сервис голосов блокирует серверы GitHub), запусти на своём компьютере: `pip install edge-tts`, потом `python tools/gen_audio.py`, и загрузи папку `audio` в репозиторий.

## 3. Новые слова
Пришли CSV мне в чат, я сверю дубли и верну готовый `words-*.js`. Ты заменяешь файл в репозитории (**Add file → Upload files**). Сайт обновится сам.

## 4. Что где лежит (после редизайна)
- `app.js` — ядро: упражнения, «Путь» (теория → тест), «Блокнот».
- `view-words.js` — вкладка «Слова» (уровни A1–C1, ♡ в блокнот, карточки).
- `view-stories.js` — «Истории» с переводом по клику и словарём.
- `grammar.js` + `grammar-noun.js` / `grammar-verb.js` / `grammar-glue.js` — темы грамматики. Новая тема = ещё один `G({...})`.
- `view-grammar.js` — экран грамматики и кнопка «Потренироваться».
- `extras.js`, `dialogs-more.js`, `dialogs-extra.js` — игры и диалоги. Новый диалог = ещё один вызов `D(...)` в `dialogs-extra.js`.
- Менял файлы — увеличь `VERSION` в `sw.js`, чтобы телефон подтянул обновление.
- `view-path.js` — «Путь» (уроки: слова, правила, повторение, предложения, глаголы) и экран «Настройки» (темы).
- `view-notebook.js` — «Блокнот» с разделами A1–C1 и «Мои».
- `verbs-more.js` — формы новых глаголов (сильные записаны вручную, правильные строятся по классам).
- `words-a2d.js`, `words-b-big.js` — слова, импортированные из CSV. Новые CSV: `python tools/import_csv.py файл.csv words-новый.js`, затем добавь `<script>` в index.html перед `view-words.js` и имя файла в `sw.js`.
