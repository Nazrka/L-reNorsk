// ===== Грамматика: Substantiv, Adjektiv, Verb, Modalverb — углублённо =====
// Поле after: "id" ставит тему сразу после указанной; first: true — первой в разделе.

// ---------- Substantiv ----------
G({ id: "forms", sec: "noun", first: true, lv: "A1", title: "4 формы существительного: bil, bilen, biler, bilene", lead: "Одно слово — четыре формы",
  html: `<p>У каждого существительного есть <b>4 формы</b>: один или много × «какой-то» или «тот самый».</p>
<table class="gt"><tr><th></th><th>Какой-то</th><th>Тот самый</th></tr>
<tr><td>Один</td><td class="no">en bil</td><td class="no">bilen</td></tr>
<tr><td>Много</td><td class="no">biler</td><td class="no">bilene</td></tr></table>
<table class="gt"><tr><th>Слово</th><th>один</th><th>тот самый</th><th>много</th><th>те самые</th></tr>
<tr><td class="no">en bil</td><td class="no">bil</td><td class="no">bilen</td><td class="no">biler</td><td class="no">bilene</td></tr>
<tr><td class="no">ei bok</td><td class="no">bok</td><td class="no">boka</td><td class="no">bøker</td><td class="no">bøkene</td></tr>
<tr><td class="no">et hus</td><td class="no">hus</td><td class="no">huset</td><td class="no">hus</td><td class="no">husene</td></tr></table>
<p>В словарях это пишут сокращённо: <span class="no">bil, -en, -er, -ene</span>. Выучил четыре формы — знаешь слово по-настоящему.</p>`,
  tip: "Не учи слова поштучно, учи четвёрками: <b>en bil – bilen – biler – bilene</b>.",
  pr: [
    C("ei bok: много, какие-то", "bøker", "bøkene|boka"), C("et hus: то самое", "huset", "hus|husene"), C("en gutt: много, те самые", "guttene", "gutter|gutten"),
    C("et barn: много, какие-то", "barn", "barna|barnet"), C("en lærer: много, те самые", "lærerne", "lærere|læreren"), C("ei jente: та самая", "jenta", "jente|jenter"), C("en bil: много, какие-то", "biler", "bilene|bilen")
  ] });

G({ id: "gendhint", sec: "noun", after: "art", lv: "A2", title: "Как угадать род по окончанию", lead: "Подсказки: -else, -het, -ing → en; -eri, -um, -ment → et",
  html: `<p>Род чаще всего надо просто учить. Но у некоторых окончаний он почти всегда один и тот же:</p>
<table class="gt"><tr><th>Окончание</th><th>Род</th><th>Примеры</th></tr>
<tr><td class="no">-else, -het, -ing, -sjon</td><td class="no"><b>en</b></td><td class="no">en følelse, en mulighet, en utdanning, en situasjon</td></tr>
<tr><td class="no">-ist, -ør, профессии на -er</td><td class="no"><b>en</b></td><td class="no">en turist, en frisør, en lærer</td></tr>
<tr><td class="no">-eri, -um, -ment, -em</td><td class="no"><b>et</b></td><td class="no">et bakeri, et museum, et dokument, et problem, et system</td></tr></table>
<p>Для остальных слов — просто смотри в словаре и запоминай с артиклем.</p>`,
  pr: [
    C("___ følelse", "en", "et", "-else → en"), C("___ mulighet", "en", "et", "-het → en"), C("___ utdanning", "en", "et", "-ing → en"), C("___ situasjon", "en", "et", "-sjon → en"),
    C("___ turist", "en", "et", "-ist → en"), C("___ museum", "et", "en", "-um → et"), C("___ bakeri", "et", "en", "-eri → et"), C("___ dokument", "et", "en", "-ment → et"),
    C("___ problem", "et", "en", "-em → et"), C("___ frisør", "en", "et", "-ør → en")
  ] });

G({ id: "compound", sec: "noun", after: "defpl", lv: "A2", title: "Составные слова: род по последней части", lead: "bil + nøkkel = bilnøkkel — и это en, как «nøkkel»",
  html: `<p>Норвежцы склеивают слова в одно длинное. Правило простое: <b>род и все формы — по последнему слову</b>.</p>
<table class="gt"><tr><td class="no">bil + <b>en nøkkel</b></td><td class="no">en bilnøkkel</td></tr>
<tr><td class="no">syk + <b>et hus</b></td><td class="no">et sykehus</td></tr>
<tr><td class="no">tann + <b>en lege</b></td><td class="no">en tannlege</td></tr>
<tr><td class="no">dør + <b>et håndtak</b></td><td class="no">et dørhåndtak</td></tr></table>
<p>Иногда между частями ставят «-s-» или «-e-»: <span class="no">arbeid<b>s</b>dag, barn<b>e</b>hage</span>. Просто запоминай такие слова целиком.</p>`,
  ex: [["Jeg har mistet bilnøkkelen.", "Я потерял ключ от машины."], ["Hun jobber på sykehuset.", "Она работает в больнице."]],
  pr: [
    C("___ sykehus (syk + et hus)", "et", "en"), C("___ barnehage (barn + en hage)", "en", "et"), C("___ bilnøkkel (bil + en nøkkel)", "en", "et"), C("___ dørhåndtak (dør + et håndtak)", "et", "en"),
    C("___ tannlege (tann + en lege)", "en", "et"), C("___ kaffekopp (kaffe + en kopp)", "en", "et"), C("___ skolebygg (skole + et bygg)", "et", "en"), C("Род составного слова берут у…", "последней части", "первой части|любой части")
  ] });

G({ id: "genitiv", sec: "noun", after: "compound", lv: "A2", title: "Принадлежность: Olas bil, bilens farge", lead: "Добавляем -s — без апострофа",
  html: `<p>Чтобы сказать «чей-то», к владельцу просто добавляют <b class="no">-s</b>:</p>
<table class="gt"><tr><td class="no">Ola<b>s</b> bil</td><td>машина Олы</td></tr><tr><td class="no">Norge<b>s</b> hovedstad</td><td>столица Норвегии</td></tr>
<tr><td class="no">bilen<b>s</b> farge</td><td>цвет машины</td></tr><tr><td class="no">barna<b>s</b> leker</td><td>игрушки детей</td></tr></table>
<p>Апострофа <b>нет</b> (в отличие от английского). Только если имя уже кончается на -s: <span class="no">Hans' bil</span>.</p>
<p>В речи часто говорят иначе: <span class="no">bilen til Ola</span> или <span class="no">Ola sin bil</span> — так тоже правильно.</p>`,
  ex: [["Det er Marias jakke.", "Это куртка Марии."], ["Husets farge er hvit.", "Цвет дома — белый."]],
  pr: [
    C("«Машина Олы»", "Olas bil", "Ola's bil|Ola bil"), C("«Столица Норвегии»", "Norges hovedstad", "Norge hovedstad|Norges' hovedstad"), C("«Цвет машины»", "bilens farge", "bilen farge|bilens' farge"),
    C("«Игрушки детей»", "barnas leker", "barna leker|barn's leker"), C("Разговорно: «машина Олы»", "Ola sin bil", "Ola si bil|Ola hans bil"), C("«Книга Мии»", "Mias bok", "Mia's bok|Mia bok")
  ] });

// ---------- Adjektiv ----------
G({ id: "adjt", sec: "adj", after: "adj", lv: "A2", title: "Окончание -t: blå → blått, ny → nytt", lead: "Когда к прилагательному для et-слова -t не нужно или меняется",
  html: `<p>Обычно для слов с <b>et</b> добавляют -t: <span class="no">stor → et stort hus</span>. Но бывают особые случаи:</p>
<table class="gt"><tr><th>Случай</th><th>Что делаем</th><th>Пример</th></tr>
<tr><td>кончается на гласную</td><td>удваиваем <b>-tt</b></td><td class="no">blå → blått, grå → grått, ny → nytt</td></tr>
<tr><td>кончается на <b>-nn, -kk</b></td><td>одна согласная + t</td><td class="no">grønn → grønt, tykk → tykt</td></tr>
<tr><td>уже кончается на <b>-t</b></td><td>не меняем</td><td class="no">svart → et svart hus, kort → et kort brev</td></tr>
<tr><td>кончается на <b>-ig, -sk</b></td><td>не меняем</td><td class="no">viktig → et viktig spørsmål, norsk → et norsk hus</td></tr></table>`,
  pr: [
    C("et ___ hus (синий: blå)", "blått", "blå|blåt"), C("et ___ eple (зелёное: grønn)", "grønt", "grønnt|grønn"), C("et ___ hus (новый: ny)", "nytt", "ny|nyt"),
    C("et ___ spørsmål (важный: viktig)", "viktig", "viktigt|viktige"), C("et ___ språk (норвежский: norsk)", "norsk", "norskt|norske"), C("et ___ bord (серое: grå)", "grått", "grå|gråt"),
    C("et ___ hus (чёрный: svart)", "svart", "svartt|svarte"), C("et ___ hus (красивое: fin)", "fint", "fin|fine")
  ] });

G({ id: "adjsync", sec: "adj", after: "adjdef", lv: "B1", title: "gammel → gamle, vakker → vakre: выпадающее «e»", lead: "У слов на -el, -er, -en перед окончанием пропадает e",
  html: `<p>У прилагательных на <b>-el, -er, -en</b> перед окончанием <b>-e</b> (много / определённая форма) гласная «e» <b>выпадает</b>:</p>
<table class="gt"><tr><th></th><th>en / ei</th><th>et</th><th>много</th></tr>
<tr><td class="no">gammel</td><td class="no">gammel</td><td class="no">gammelt</td><td class="no">gam<b>l</b>e</td></tr>
<tr><td class="no">vakker</td><td class="no">vakker</td><td class="no">vakkert</td><td class="no">vak<b>r</b>e</td></tr>
<tr><td class="no">åpen</td><td class="no">åpen</td><td class="no">åpent</td><td class="no">åp<b>n</b>e</td></tr>
<tr><td class="no">enkel</td><td class="no">enkel</td><td class="no">enkelt</td><td class="no">enk<b>l</b>e</td></tr></table>
<p>Звучит так же, как пишется: «гамле», «вакре» — произносить легче.</p>`,
  ex: [["Det er et gammelt hus med store vinduer.", "Это старый дом с большими окнами."], ["Vi har mange gamle bøker.", "У нас много старых книг."]],
  pr: [
    C("mange ___ hus (старых)", "gamle", "gammel|gammelt"), C("et ___ hus (старое)", "gammelt", "gamle|gammel"), C("to ___ jenter (красивых: vakker)", "vakre", "vakker|vakkert"),
    C("et ___ vindu (открытое: åpen)", "åpent", "åpen|åpne"), C("en ___ oppgave (простая: enkel)", "enkel", "enkle|enkelt"), C("mange ___ svar (надёжных: sikker)", "sikre", "sikker|sikkert"), C("det ___ huset (старое, определённое)", "gamle", "gammel|gammelt")
  ] });

G({ id: "advadj", sec: "adj", after: "comp", lv: "A2", title: "Прилагательное как наречие: høyt, vakkert, tydelig", lead: "Отдельной формы наречия нет — берут форму на -t",
  html: `<p>В русском «красивый» → «красиво». В норвежском отдельного слова часто нет: берут форму <b>среднего рода (с -t)</b>.</p>
<table class="gt"><tr><td class="no">høy → <b>høyt</b></td><td class="no">Han snakker høyt.</td></tr>
<tr><td class="no">vakker → <b>vakkert</b></td><td class="no">Hun synger vakkert.</td></tr>
<tr><td class="no">rask → <b>raskt</b></td><td class="no">Det går raskt.</td></tr>
<tr><td class="no">god → <b>godt</b></td><td class="no">Han snakker godt norsk.</td></tr>
<tr><td class="no">tydelig → <b>tydelig</b></td><td class="no">Hun forklarer tydelig.</td></tr></table>
<p>Слова на <b>-ig</b> и <b>-sk</b> не меняются (как и в правиле про -t). А «хорошо» в простом ответе — <span class="no">bra</span>: <span class="no">Det går bra.</span></p>`,
  pr: [
    C("Hun synger ___. (красиво: vakker)", "vakkert", "vakker|vakre"), C("Han snakker ___. (громко: høy)", "høyt", "høy|høye"), C("Hun forklarer ___. (понятно: tydelig)", "tydelig", "tydeligt|tydelige"),
    C("Det går ___. (быстро: rask)", "raskt", "rask|raske"), C("Han snakker ___ norsk. (хорошо)", "godt", "god|gode"), C("Bussen kjører ___. (медленно: langsom)", "langsomt", "langsom|langsomme")
  ] });

// ---------- Verb ----------
G({ id: "vgroups", sec: "verb", after: "strong", lv: "A2", title: "Четыре группы глаголов: -et, -te, -de и сильные", lead: "Как образуется прошедшее у «правильных» глаголов",
  html: `<p>Правильные (слабые) глаголы делятся на три группы — по окончанию прошедшего времени:</p>
<table class="gt"><tr><th>Группа</th><th>Инфинитив → prt. → partisipp</th><th>Кому подходит</th></tr>
<tr><td><b>-et</b></td><td class="no">å snakke → snakk<b>et</b> → snakk<b>et</b><br>å jobbe → jobb<b>et</b> → jobb<b>et</b></td><td>самая большая группа</td></tr>
<tr><td><b>-te</b></td><td class="no">å kjøpe → kjøp<b>te</b> → kjøp<b>t</b><br>å spise → spis<b>te</b> → spis<b>t</b></td><td>основа на глухую согласную: k, p, s, t…</td></tr>
<tr><td><b>-de</b></td><td class="no">å bo → bod<b>de</b> → bod<b>d</b><br>å leve → lev<b>de</b> → lev<b>d</b></td><td>короткие и «мягкие» основы</td></tr>
<tr><td><b>сильные</b></td><td class="no">å drikke → drakk → drukket</td><td>меняют гласную, учим наизусть</td></tr></table>
<p>Тройка всегда: <b>инфинитив → прошедшее → причастие</b>. Если запомнил её — глагол твой.</p>`,
  verbs: [2, 3],
  pr: [
    C("å snakke → (вчера)", "snakket", "snakkte|snakkde"), C("å kjøpe → (вчера)", "kjøpte", "kjøpet|kjøpde"), C("å bo → (вчера)", "bodde", "boet|bote"), C("å lese → har ___", "lest", "leset|leste"),
    C("å jobbe → (вчера)", "jobbet", "jobbte|jobbde"), C("å spise → har ___", "spist", "spiset|spiste"), C("å leve → (вчера)", "levde", "levet|levte"), C("å drikke → har ___", "drukket", "drikket|drakk")
  ] });

G({ id: "workhorse", sec: "verb", after: "vgroups", lv: "A2", title: "bli, få, ta, gi, gjøre — «рабочие лошадки»", lead: "Пять глаголов с кучей значений",
  html: `<table class="gt"><tr><th>Глагол</th><th>Что значит</th><th>Пример</th></tr>
<tr><td class="no"><b>bli</b></td><td>стать; остаться</td><td class="no">Jeg blir lærer.<br>Jeg blir hjemme.<br>Det blir kaldt.</td></tr>
<tr><td class="no"><b>få</b></td><td>получить; можно / удаётся</td><td class="no">Jeg fikk en gave.<br>Får jeg gå?</td></tr>
<tr><td class="no"><b>ta</b></td><td>взять; ехать (на транспорте); занимать (время)</td><td class="no">Jeg tar bussen.<br>Det tar to timer.</td></tr>
<tr><td class="no"><b>gi</b></td><td>дать</td><td class="no">Hun ga meg boka.</td></tr>
<tr><td class="no"><b>gjøre</b></td><td>делать</td><td class="no">Hva gjør du?</td></tr></table>
<p>Эти глаголы очень частые — выучи их формы: <span class="no">bli – ble – blitt, få – fikk – fått, ta – tok – tatt, gi – ga – gitt, gjøre – gjorde – gjort</span>.</p>`,
  verbs: [1, 2, 3],
  pr: [
    C("«Я остаюсь дома»", "Jeg blir hjemme.", "Jeg gir hjemme.|Jeg tar hjemme."), C("«Я еду на автобусе»", "Jeg tar bussen.", "Jeg gir bussen.|Jeg gjør bussen."), C("«Это занимает два часа»", "Det tar to timer.", "Det gir to timer.|Det gjør to timer."),
    C("«Я получил подарок»", "Jeg fikk en gave.", "Jeg ga en gave.|Jeg tok en gave."), C("«Она дала мне книгу»", "Hun ga meg boka.", "Hun tok meg boka.|Hun fikk meg boka."), C("«Что ты делаешь?»", "Hva gjør du?", "Hva tar du?|Hva blir du?"),
    C("«Становится холодно»", "Det blir kaldt.", "Det gjør kaldt.|Det tar kaldt.")
  ] });

G({ id: "think", sec: "verb", after: "workhorse", lv: "A2", title: "Три «думать»: tenke, tro, synes", lead: "Мысль, догадка или мнение",
  html: `<p>Русское «думать» в норвежском распадается на три глагола:</p>
<table class="gt"><tr><td class="no"><b>tenke</b></td><td>думать (процесс мысли)</td><td class="no">Jeg tenker på deg.</td></tr>
<tr><td class="no"><b>tro</b></td><td>полагать, верить (догадка о фактах)</td><td class="no">Jeg tror det blir regn.<br>Jeg tror på deg.</td></tr>
<tr><td class="no"><b>synes</b></td><td>считать (личное мнение, вкус)</td><td class="no">Jeg synes suppen er god.</td></tr></table>
<p><b>Тест:</b> можно проверить факт (дождь или нет) → <b>tro</b>. Это вкус или оценка (вкусно, красиво, хорошо) → <b>synes</b>. Мысленно «о чём-то» → <b>tenke på</b>.</p>`,
  pr: [
    C("«Я думаю о тебе»", "Jeg tenker på deg.", "Jeg synes på deg.|Jeg tror på deg."), C("«Думаю, завтра будет дождь» (догадка)", "Jeg tror det blir regn i morgen.", "Jeg synes det blir regn i morgen.|Jeg tenker det blir regn i morgen."),
    C("«Мне нравится этот суп» (вкус)", "Jeg synes suppen er god.", "Jeg tror suppen er god.|Jeg tenker suppen er god."), C("«Я верю в тебя»", "Jeg tror på deg.", "Jeg synes på deg.|Jeg tenker på deg."),
    C("«Я думаю о работе»", "Jeg tenker på jobben.", "Jeg tror på jobben.|Jeg synes på jobben."), C("«Я считаю, что это дорого»", "Jeg synes det er dyrt.", "Jeg tenker på det er dyrt.|Jeg tror på det er dyrt.")
  ] });

G({ id: "sverb", sec: "verb", after: "refl", lv: "B1", title: "Глаголы на -s: møtes, sees, trives, finnes", lead: "Взаимное действие и особые глаголы",
  html: `<p>Некоторые глаголы имеют <b>-s на конце</b>. Они обозначают:</p>
<ul><li><b>взаимное действие</b> (друг с другом): <span class="no">møtes</span> — встречаться, <span class="no">sees</span> — видеться, <span class="no">snakkes</span> — поговорить</li>
<li><b>особые значения</b>: <span class="no">trives</span> — чувствовать себя хорошо, <span class="no">finnes</span> — существовать, <span class="no">synes</span> — считать</li></ul>
<table class="gt"><tr><td class="no">Vi møtes klokka fem.</td><td>Мы встретимся в пять.</td></tr><tr><td class="no">Vi sees!</td><td>Увидимся!</td></tr>
<tr><td class="no">Jeg trives her.</td><td>Мне здесь хорошо.</td></tr><tr><td class="no">Finnes det en kafé her?</td><td>Есть ли здесь кафе?</td></tr></table>`,
  pr: [
    C("«Мы встретимся в пять»", "Vi møtes klokka fem.", "Vi møter klokka fem.|Vi møte klokka fem."), C("«Увидимся!»", "Vi sees!", "Vi ser!|Vi sett!"), C("«Мне здесь хорошо»", "Jeg trives her.", "Jeg trive her.|Jeg trives på her."),
    C("«Есть ли здесь кафе?»", "Finnes det en kafé her?", "Finner det en kafé her?|Finne det en kafé her?"), C("«Мне кажется, это хорошо»", "Jeg synes det er bra.", "Jeg synse det er bra.|Jeg synser det er bra.")
  ] });

// ---------- Modalverb ----------
G({ id: "modalpast", sec: "modal", after: "modal", lv: "A2", title: "Модальные в прошедшем: kunne, ville, skulle, måtte", lead: "Мог, хотел, собирался, пришлось",
  html: `<table class="gt"><tr><th>Сейчас</th><th>Прошедшее</th><th>Перфект</th><th>Значит</th></tr>
<tr><td class="no">kan</td><td class="no">kunne</td><td class="no">har kunnet</td><td>мог, умел</td></tr>
<tr><td class="no">vil</td><td class="no">ville</td><td class="no">har villet</td><td>хотел</td></tr>
<tr><td class="no">skal</td><td class="no">skulle</td><td class="no">har skullet</td><td>собирался, должен был</td></tr>
<tr><td class="no">må</td><td class="no">måtte</td><td class="no">har måttet</td><td>пришлось</td></tr>
<tr><td class="no">bør</td><td class="no">burde</td><td class="no">—</td><td>следовало бы</td></tr></table>
<p>После них по-прежнему инфинитив <b>без «å»</b>: <span class="no">Jeg måtte jobbe.</span></p>`,
  ex: [["I går måtte jeg jobbe.", "Вчера мне пришлось работать."], ["Jeg ville komme, men jeg kunne ikke.", "Я хотел прийти, но не мог."], ["Vi skulle reise i går, men bussen var forsinket.", "Мы собирались ехать вчера, но автобус опоздал."]],
  pr: [
    C("I går ___ jeg jobbe. (пришлось)", "måtte", "må|har måtte"), C("Jeg ___ komme, men jeg hadde ikke tid. (хотел)", "ville", "vil|villet"), C("Som barn ___ jeg ikke svømme. (не умел)", "kunne", "kan|kunnet"),
    C("Vi ___ reise i går, men bussen var forsinket. (собирались)", "skulle", "skal|skullet"), C("Du ___ ha sagt det. (следовало бы)", "burde", "bør|burdet"), C("Jeg har ikke ___ komme. (смог)", "kunnet", "kunne|kan"), C("Jeg har alltid ___ bo i Norge. (хотел)", "villet", "ville|vil")
  ] });

G({ id: "permission", sec: "modal", after: "modalpast", lv: "A2", title: "Можно, нельзя, не надо: får, må ikke, trenger ikke", lead: "«Нельзя» и «не нужно» — это разные вещи",
  html: `<p>Главная ловушка: русское «не надо» может значить «нельзя» или «не нужно». В норвежском это <b>разные</b> слова:</p>
<table class="gt"><tr><th>По-русски</th><th>По-норвежски</th><th>Пример</th></tr>
<tr><td><b>нельзя</b></td><td class="no"><b>må ikke / får ikke</b></td><td class="no">Du må ikke røyke her.</td></tr>
<tr><td><b>не нужно, не обязательно</b></td><td class="no"><b>trenger ikke å / behøver ikke å</b></td><td class="no">Du trenger ikke å komme.</td></tr>
<tr><td><b>можно мне?</b> (разрешение)</td><td class="no"><b>Får jeg …?</b></td><td class="no">Får jeg ringe?</td></tr>
<tr><td><b>могу, умею</b></td><td class="no"><b>kan</b></td><td class="no">Jeg kan lage mat.</td></tr></table>
<p>Обрати внимание: после <b>trenger / behøver</b> стоит «å», а после <b>må / får</b> — нет.</p>`,
  tip: "Жизненно: в магазине «Får jeg betale med kort?» (Можно мне заплатить картой?). Другу: «Du trenger ikke å vente» (Тебе не нужно ждать).",
  pr: [
    C("«Здесь нельзя курить»", "Du må ikke røyke her.", "Du trenger ikke å røyke her.|Du bør ikke å røyke her."), C("«Тебе не нужно приходить»", "Du trenger ikke å komme.", "Du må ikke komme.|Du kan ikke å komme."),
    C("«Можно мне позвонить?»", "Får jeg ringe?", "Skal jeg ringe?|Vil jeg ringe?"), C("«Я умею готовить»", "Jeg kan lage mat.", "Jeg får lage mat.|Jeg må lage mat."),
    C("«Вам не обязательно платить»", "Dere trenger ikke å betale.", "Dere må ikke betale.|Dere kan ikke å betale."), C("«Нельзя опаздывать»", "Du må ikke komme for sent.", "Du trenger ikke å komme for sent.|Du får å komme for sent.")
  ] });

G({ id: "modalorder", sec: "modal", after: "permission", lv: "A2", title: "Модальные: порядок слов", lead: "Модальный на 2-м месте, второй глагол — в конце",
  html: `<p>С модальным глаголом в предложении <b>два глагола</b>. Правило:</p>
<ul><li>модальный стоит на <b>втором месте</b> (V2);</li><li>смысловой глагол уходит <b>в конец</b>, в инфинитиве;</li><li><b>ikke</b> и другие слова стоят сразу после модального.</li></ul>
<table class="gt"><tr><td class="no">Jeg <b>må</b> jobbe i morgen.</td><td>Мне надо работать завтра.</td></tr>
<tr><td class="no">I morgen <b>må</b> jeg jobbe.</td><td>Завтра мне надо работать.</td></tr>
<tr><td class="no">Jeg <b>vil</b> <b>ikke</b> gå.</td><td>Я не хочу идти.</td></tr>
<tr><td class="no"><b>Kan</b> du hjelpe meg?</td><td>Ты можешь мне помочь?</td></tr>
<tr><td class="no">Hun har <b>ikke</b> kunnet komme.</td><td>Она не смогла прийти.</td></tr></table>`,
  rule: "modal",
  pr: [
    C("Что верно?", "I morgen må jeg jobbe.", "I morgen jeg må jobbe.|I morgen må jobbe jeg."), C("Что верно?", "Kan du hjelpe meg?", "Kan hjelpe du meg?|Hjelpe kan du meg?"), C("Что верно?", "Jeg vil ikke gå.", "Jeg ikke vil gå.|Jeg vil gå ikke."),
    C("Что верно?", "Vi skal ikke reise i dag.", "Vi skal reise ikke i dag.|Vi ikke skal reise i dag."), C("Что верно?", "Hun har ikke kunnet komme.", "Hun har kunnet ikke komme.|Hun ikke har kunnet komme."), C("Что верно?", "Hvorfor må du gå?", "Hvorfor du må gå?|Hvorfor må gå du?")
  ] });

G({ id: "skalvil", sec: "modal", after: "modalorder", lv: "A2", title: "skal или vil? — план или желание", lead: "Решённое и запланированное — skal, хочу — vil",
  html: `<table class="gt"><tr><th></th><th>Значит</th><th>Пример</th></tr>
<tr><td class="no"><b>skal</b></td><td>план, договорённость; приказ; «давай…?»</td><td class="no">I morgen skal vi fly til Oslo.<br>Du skal gjøre leksene.<br>Skal vi gå på kino?</td></tr>
<tr><td class="no"><b>vil</b></td><td>желание, нежелание</td><td class="no">Jeg vil ha kaffe.<br>Jeg vil ikke.<br>Vil du ha kaffe?</td></tr></table>
<p>Запомни: <span class="no">Skal vi …?</span> = «Давай …?», а <span class="no">Vil du …?</span> = «Хочешь …?». В магазине и кафе «Jeg skal ha en kaffe» — вежливо «Я возьму кофе» (решение уже принято).</p>`,
  rule: "fut",
  pr: [
    C("«Пойдём в кино?» (предложение)", "Skal vi gå på kino?", "Vil vi gå på kino?|Kan vi gå på kino?"), C("«Завтра мы летим в Осло» (билеты куплены)", "I morgen skal vi fly til Oslo.", "I morgen vil vi fly til Oslo.|I morgen bør vi fly til Oslo."),
    C("«Ты должен сделать уроки» (приказ)", "Du skal gjøre leksene dine.", "Du vil gjøre leksene dine.|Du kan gjøre leksene dine."), C("«Хочешь кофе?»", "Vil du ha kaffe?", "Skal du ha kaffe?|Må du ha kaffe?")
  ] });
