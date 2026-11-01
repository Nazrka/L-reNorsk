# Norsk на GitHub Pages (бесплатно)

## 1. Выложить сайт
1. Зайди на github.com, нажми **New repository**, назови, например, `norsk`, поставь **Public**, создай.
2. Нажми **uploading an existing file** и перетащи ВСЕ файлы из папки проекта (index.html, styles.css, app.js, data*.js, words-*.js, extras.js, dialogs-more.js, stories-user.js, sw.js, manifest.webmanifest, icon*, папку tools). Нажми **Commit changes**.
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
