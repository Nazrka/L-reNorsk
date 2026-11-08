// ===== Грамматика 1–3: существительные, местоимения, прилагательные =====

G({ id: "art", sec: "noun", lv: "A1", title: "en / ei / et — три «ярлыка» слов", lead: "Как сказать «какой-то» перед существительным",
  html: `<p>В норвежском у каждого существительного есть «ярлык» — <b>род</b>. Ярлыка три, и он ставится перед словом (как русское «один / какой-то»):</p>
<table class="gt"><tr><td><b class="no">en</b></td><td><span class="no">en bil</span> — машина</td><td><span class="no">en gutt</span> — мальчик</td></tr>
<tr><td><b class="no">ei</b></td><td><span class="no">ei bok</span> — книга</td><td><span class="no">ei jente</span> — девочка</td></tr>
<tr><td><b class="no">et</b></td><td><span class="no">et hus</span> — дом</td><td><span class="no">et barn</span> — ребёнок</td></tr></table>
<p><b>Как не сойти с ума:</b></p>
<ul><li>Учи слово <b>сразу с артиклем</b>: не «bil», а «en bil» — как имя и фамилию.</li>
<li><b>en</b> — самый частый. Не знаешь — ставь en, ошибёшься реже всего.</li>
<li><b>ei</b> можно заменить на <b>en</b>: «en bok» тоже правильно (bokmål). Тебя поймут!</li>
<li>Только <b>et</b> заменить нельзя — его надо знать.</li></ul>`,
  tip: "Подсказка по окончаниям: слова на <b>-het, -else, -ing</b> почти всегда <b>en</b> (en mulighet, en følelse, en utvikling); на <b>-eri, -um</b> — <b>et</b> (et bakeri, et museum).",
  pr: [
    C("___ bil", "en", "et", "bil — слово с «en»: en bil"), C("___ hus", "et", "en|ei", "et hus"), C("___ barn", "et", "en|ei", "et barn — ребёнок"),
    C("___ gutt", "en", "et", "en gutt"), C("___ jente", "ei", "et", "ei jente (можно и en jente)"), C("___ eple", "et", "en", "et eple — яблоко"),
    C("___ dag", "en", "et", "en dag"), C("___ vindu", "et", "en", "et vindu — окно"), C("___ uke", "ei", "et", "ei uke — неделя")
  ] });

G({ id: "def", sec: "noun", lv: "A1", title: "«Тот самый»: bilen, boka, huset", lead: "Определённый артикль — это хвостик на конце слова",
  html: `<p>В русском есть «этот / тот самый». В норвежском такого слова нет — вместо него к <b>концу</b> существительного приклеивают «хвостик». Хвостик зависит от ярлыка:</p>
<table class="gt"><tr><th>Какая-то</th><th>Та самая</th></tr>
<tr><td class="no">en bil</td><td class="no">bil<b>en</b></td></tr>
<tr><td class="no">ei bok</td><td class="no">bok<b>a</b></td></tr>
<tr><td class="no">et hus</td><td class="no">hus<b>et</b></td></tr></table>
<p>Вот зачем нужен род: <b>en → -en</b>, <b>ei → -a</b>, <b>et → -et</b>.</p>
<p>Если слово уже кончается на <b>-e</b>, добавляем только согласную: <span class="no">en dame → damen</span>, <span class="no">et eple → eplet</span>.</p>`,
  tip: "Сначала «какая-то», потом «та самая»: <i>Jeg ser en bil. Bilen er rød.</i> = Я вижу (какую-то) машину. Машина (эта) — красная.",
  ex: [["Jeg har en katt. Katten er hvit.", "У меня есть кошка. Кошка белая."], ["Huset er stort.", "Дом большой."], ["Hvor er boka mi?", "Где моя книга?"]],
  pr: [
    C("en bil → (та самая)", "bilen", "bilet|bila", "en-слово + -en"), C("et hus → (то самое)", "huset", "husen|husa", "et-слово + -et"),
    C("en gutt → (тот самый)", "gutten", "guttet|gutta"), C("et eple → (то самое)", "eplet", "eplen|eplee", "слово уже на -e: добавляем только -t"),
    C("et barn → (тот самый ребёнок)", "barnet", "barnen|barna"), C("en lærer → (тот самый)", "læreren", "læreret|lærere"),
    C("Jeg har en katt. ___ er svart.", "Katten", "Katt|Kattet"), C("Какой хвостик у слов с et?", "-et", "-en|-er", "et hus → huset")
  ] });

G({ id: "plur", sec: "noun", lv: "A1", title: "Множественное число", lead: "Один → много: обычно просто +er",
  html: `<p>Хорошая новость: падежей нет, апострофов нет. Чтобы сказать «много», слову просто меняют конец.</p>
<table class="gt"><tr><th>Что делаем</th><th>Пример</th></tr>
<tr><td>Большинство слов: <b>+er</b></td><td class="no">en bil → bil<b>er</b><br>ei jente → jent<b>er</b></td></tr>
<tr><td>Слово кончается на -e: <b>+r</b></td><td class="no">en gate → gate<b>r</b><br>et eple → eple<b>r</b></td></tr>
<tr><td>Короткие слова с <b>et</b>: <b>ничего</b></td><td class="no">et hus → <b>hus</b><br>et barn → <b>barn</b></td></tr></table>
<p><b>Особые слова</b> (учим наизусть, их мало):</p>
<p class="no">en mann → menn · ei bok → bøker · en fot → føtter · en bror → brødre · ei hånd → hender · ei mor → mødre</p>
<p>Артикль во множественном числе <b>не нужен</b>: <span class="no">biler</span> = «машины», <span class="no">mange biler</span> = «много машин».</p>`,
  tip: "Лайфхак: у слов с <b>et</b> (hus, barn, dyr, ord) во множественном всё как в единственном. «Два hus» — и всё!",
  ex: [["Jeg har to søstre.", "У меня две сестры."], ["Barna leker ute.", "Дети играют на улице."], ["Det er mange bøker her.", "Здесь много книг."]],
  pr: [
    C("en bil → (много)", "biler", "bilen|biles"), C("et hus → (много)", "hus", "huser|huse", "короткие et-слова не меняются"),
    C("en gate → (много)", "gater", "gateer|gates", "слово на -e: +r"), C("ei bok → (много)", "bøker", "boker|boks", "особая форма"),
    C("en mann → (много)", "menn", "manner|mans"), C("et barn → (много)", "barn", "barner|barne"),
    C("et eple → (много)", "epler", "eple|eplene"), C("en bror → (много)", "brødre", "broder|brors"), C("ei jente → (много)", "jenter", "jente|jentene")
  ] });

G({ id: "defpl", sec: "noun", lv: "A2", title: "«Те самые»: bilene, husene", lead: "Определённое множественное — хвостик -ene",
  html: `<p>Хотим сказать «<b>те самые</b> машины»? Берём множественное число и приклеиваем <b>-ene</b>:</p>
<table class="gt"><tr><td class="no">biler → bil<b>ene</b></td><td class="no">bøker → bøk<b>ene</b></td></tr>
<tr><td class="no">jenter → jent<b>ene</b></td><td class="no">epler → epl<b>ene</b></td></tr>
<tr><td class="no">hus → hus<b>ene</b> (или hus<b>a</b>)</td><td class="no">barn → barn<b>a</b> (или barn<b>ene</b>)</td></tr></table>
<p>Запомни порядок: <span class="no">en bil → biler → bilene</span> — «одна → много → те самые».</p>`,
  ex: [["Bilene er røde.", "Машины (эти) красные."], ["Barna sover.", "Дети спят."], ["Jeg liker bøkene dine.", "Мне нравятся твои книги."]],
  pr: [
    C("biler → (те самые)", "bilene", "bilen|bilar"), C("jenter → (те самые)", "jentene", "jenta|jentar"), C("bøker → (те самые)", "bøkene", "bøka|bøkar"),
    C("hus → (те самые)", "husene", "huset|husen"), C("barn → (те самые)", "barna", "barnet|barner"), C("Какой хвостик у «тех самых» слов?", "-ene", "-en|-er")
  ] });

G({ id: "pron", sec: "pron", lv: "A1", title: "Я, ты, он: jeg / meg, du / deg", lead: "У местоимений две формы: «я» и «меня»",
  html: `<p>Как и в русском («я» / «меня»), у личных местоимений две формы. Первая — тот, кто <b>делает</b>. Вторая — тот, с кем <b>что-то делают</b> (и после предлогов).</p>
<table class="gt"><tr><th>Делаю</th><th>Со мной</th></tr>
<tr><td class="no">jeg</td><td class="no">meg</td></tr><tr><td class="no">du</td><td class="no">deg</td></tr>
<tr><td class="no">han / hun</td><td class="no">ham / henne</td></tr><tr><td class="no">vi</td><td class="no">oss</td></tr>
<tr><td class="no">dere</td><td class="no">dere</td></tr><tr><td class="no">de</td><td class="no">dem</td></tr></table>
<p>После предлогов (til, med, for, fra…) всегда вторая форма: <span class="no">til meg, med deg, for oss</span>.</p>`,
  ex: [["Jeg ser deg.", "Я вижу тебя."], ["Kan du hjelpe meg?", "Можешь мне помочь?"], ["Hun bor med dem.", "Она живёт с ними."], ["Det er en gave til deg.", "Это подарок тебе."]],
  rule: "pron",
  pr: [
    C("___ ser deg. (я)", "Jeg", "Meg|Min"), C("Du ser ___. (меня)", "meg", "jeg|min"), C("Hun hjelper ___. (нас)", "oss", "vi|vår"),
    C("Kan du hjelpe ___? (его)", "ham", "han|hans"), C("Det er en gave til ___. (тебя)", "deg", "du|din"), C("___ bor i Norge. (мы)", "Vi", "Oss|Våre"), C("Jeg går med ___. (с ними)", "dem", "de|deres")
  ] });

G({ id: "den", sec: "pron", lv: "A1", title: "Он, она, оно про вещи: den и det", lead: "Про предметы не «он/она», а den или det",
  html: `<p>Про людей: <b class="no">han</b> (он) и <b class="no">hun</b> (она). А про <b>вещи</b> нужны другие слова — и тут снова работает ярлык:</p>
<ul><li>слова с <b>en / ei</b> → <b class="no">den</b>: <span class="no">Hvor er bilen? <b>Den</b> er her.</span></li>
<li>слова с <b>et</b> → <b class="no">det</b>: <span class="no">Hvor er huset? <b>Det</b> er her.</span></li></ul>
<p>Ещё <b class="no">det</b> — «пустое» слово, когда речь о погоде, времени и «это»: <span class="no">Det regner.</span> (Идёт дождь.) <span class="no">Det er kaldt.</span> (Холодно.) <span class="no">Det er min bror.</span> (Это мой брат.)</p>`,
  ex: [["Jeg har en bil. Den er rød.", "У меня есть машина. Она красная."], ["Jeg har et eple. Det er godt.", "У меня есть яблоко. Оно вкусное."], ["Det regner i dag.", "Сегодня идёт дождь."]],
  pr: [
    C("Hvor er boka? ___ er her.", "Den", "Det|Han"), C("Hvor er huset? ___ er stort.", "Det", "Den|Hun"), C("___ regner i dag.", "Det", "Den|Han"),
    C("Jeg har en bil. ___ er rød.", "Den", "Det|De"), C("Jeg har et eple. ___ er godt.", "Det", "Den|De"), C("___ er min bror. (Это)", "Det", "Den|Han")
  ] });

G({ id: "poss", sec: "pron", lv: "A1", title: "Мой, твой: min, mi, mitt, mine", lead: "«Мой» подстраивается под предмет, а не под хозяина",
  html: `<p>Главное отличие от русского: слово «мой» меняется <b>по ярлыку предмета</b>, а не по тому, кто владелец.</p>
<table class="gt"><tr><th></th><th>мой</th><th>твой</th></tr>
<tr><td class="no">en</td><td class="no">min bil</td><td class="no">din bil</td></tr>
<tr><td class="no">ei</td><td class="no">mi bok</td><td class="no">di bok</td></tr>
<tr><td class="no">et</td><td class="no">mitt hus</td><td class="no">ditt hus</td></tr>
<tr><td>много</td><td class="no">mine biler</td><td class="no">dine biler</td></tr></table>
<p><b>Не меняются</b>: <span class="no">hans</span> (его), <span class="no">hennes</span> (её), <span class="no">deres</span> (их/ваш). Наш: <span class="no">vår / vårt / våre</span>.</p>
<p>В речи очень часто ставят «мой» <b>после</b> слова с «хвостиком»: <span class="no">bilen min, huset mitt</span>. Так говорят чаще всего!</p>`,
  ex: [["Det er min bil.", "Это моя машина."], ["Mitt hus er lite.", "Мой дом маленький."], ["Hvor er bilen din?", "Где твоя машина?"], ["Hennes bror heter Ola.", "Её брата зовут Ола."]],
  pr: [
    C("___ hus (мой)", "mitt", "min|mine", "hus — et-слово → mitt"), C("___ bil (твоя)", "din", "ditt|dine"), C("___ biler (мои)", "mine", "min|mitt"),
    C("___ barn (наш)", "vårt", "vår|våre"), C("Maria har en bror. ___ bror heter Ola. (её)", "Hennes", "Hans|Min"), C("Ola har en bil. ___ bil er rød. (его)", "Hans", "Hennes|Din")
  ] });

G({ id: "sin", sec: "pron", lv: "A2", title: "sin, si, sitt, sine — «свой»", lead: "Когда «его» значит «его собственный»",
  html: `<p>В русском «свой» тоже есть: «Он взял <b>свою</b> куртку». В норвежском это <b class="no">sin / si / sitt / sine</b> (меняется как min/mi/mitt/mine).</p>
<p>Правило: если владелец — <b>подлежащее этого же предложения</b>, ставим <b>sin</b>. Если куртка чужая — <b>hans / hennes</b>.</p>
<ul><li><span class="no">Han tar <b>sin</b> jakke.</span> — свою (его собственную).</li>
<li><span class="no">Han tar <b>hans</b> jakke.</span> — чью-то другую (чужую).</li></ul>
<p>Работает только для 3-го лица (он, она, они). Для «я, ты, мы» остаётся min, din, vår.</p>`,
  ex: [["Hun elsker sin mann.", "Она любит своего мужа."], ["De besøker sine foreldre.", "Они навещают своих родителей."]],
  pr: [
    C("Ola tar ___ jakke. (свою)", "sin", "hans|sine"), C("Mia leser ___ bok. (свою; bok — ei)", "si", "sin|hennes"), C("De elsker ___ barn. (своего: et)", "sitt", "sin|deres"),
    C("Hun elsker ___ mann. (своего)", "sin", "hennes|si"), C("Ola og Mia besøker ___ foreldre. (своих)", "sine", "deres|sin")
  ] });

G({ id: "adj", sec: "adj", lv: "A1", title: "Прилагательные: stor, stort, store", lead: "Три формы: обычная, +t для et, +e для «много»",
  html: `<p>Прилагательное подстраивается под слово — как «большой / большая / большое / большие», только проще: форм всего <b>три</b>.</p>
<table class="gt"><tr><th>Когда</th><th>Форма</th><th>Пример</th></tr>
<tr><td>en / ei</td><td class="no">stor</td><td class="no">en stor bil, ei stor bok</td></tr>
<tr><td>et</td><td class="no">stor<b>t</b></td><td class="no">et stort hus</td></tr>
<tr><td>много</td><td class="no">stor<b>e</b></td><td class="no">store hus, store biler</td></tr></table>
<p>То же после «er»: <span class="no">Bilen er stor. Huset er stort. Bilene er store.</span></p>
<p><b>Исключения:</b> слово уже на <b>-t</b> не меняется (<span class="no">et fint hus</span>); на <b>-sk</b> тоже (<span class="no">et norsk hus</span>). Особое слово: <span class="no">liten (маленький)</span> → <span class="no">en liten bil, et lite hus, små hus</span>.</p>`,
  ex: [["Et stort hus.", "Большой дом."], ["Bilene er røde.", "Машины красные."], ["Hun har en liten hund.", "У неё маленькая собака."]],
  pr: [
    C("en ___ bil (большая)", "stor", "stort|store"), C("et ___ hus (большой)", "stort", "stor|store"), C("Mange ___ hus (больших)", "store", "stort|stor"),
    C("Huset er ___. (красный: rød)", "rødt", "rød|røde"), C("Bilene er ___. (красные)", "røde", "rød|rødt"), C("en ___ gutt (маленький)", "liten", "lite|små"),
    C("et ___ barn (маленький)", "lite", "liten|små"), C("to ___ barn (маленьких)", "små", "lite|liten"), C("et ___ eple (красивое: fin)", "fint", "fin|fine")
  ] });

G({ id: "adjdef", sec: "adj", lv: "A2", title: "den store bilen — «двойной» артикль", lead: "Для «той самой большой машины» артикль нужен два раза",
  html: `<p>Когда хотим сказать «<b>та самая</b> большая машина», норвежцы любят перестраховаться — показывают определённость <b>два раза</b>: и в начале, и в конце.</p>
<p class="no" style="font-size:1.1rem"><b>den</b> stor<b>e</b> bil<b>en</b><br><b>det</b> stor<b>e</b> hus<b>et</b><br><b>de</b> stor<b>e</b> bil<b>ene</b></p>
<ul><li>Первое слово: <b>den</b> (en/ei), <b>det</b> (et), <b>de</b> (много).</li>
<li>Прилагательное всегда с <b>-e</b>.</li>
<li>Существительное — с «хвостиком».</li></ul>
<p>Особый случай: <span class="no">liten → den lille bilen, det lille huset, de små husene</span>.</p>`,
  ex: [["Den røde bilen er min.", "Красная машина (та) — моя."], ["Det gamle huset er pent.", "Старый дом красивый."], ["De små barna sover.", "Маленькие дети спят."]],
  pr: [
    C("___ store bilen", "den", "det|de"), C("___ store huset", "det", "den|de"), C("___ store husene", "de", "den|det"),
    C("den ___ bilen (красная)", "røde", "rød|rødt"), C("det ___ huset (маленькое)", "lille", "liten|lite"), C("de ___ barna (маленькие)", "små", "lille|liten")
  ] });

G({ id: "comp", sec: "adj", lv: "A2", title: "Сравнение: større, størst", lead: "Больше, самый большой, лучше, лучший",
  html: `<p>Сравниваем просто: <b>+ere</b> (больше) и <b>+est</b> (самый).</p>
<table class="gt"><tr><th></th><th>больше</th><th>самый</th></tr>
<tr><td class="no">rask (быстрый)</td><td class="no">rask<b>ere</b></td><td class="no">rask<b>est</b></td></tr>
<tr><td class="no">billig (дешёвый)</td><td class="no">billig<b>ere</b></td><td class="no">billig<b>st</b></td></tr>
<tr><td class="no">stor</td><td class="no">større</td><td class="no">størst</td></tr></table>
<p><b>Особые (учим наизусть):</b></p>
<p class="no">god → bedre → best · mye → mer → mest · mange → flere → flest · liten → mindre → minst · gammel → eldre → eldst</p>
<p>«Чем» = <b class="no">enn</b>: <span class="no">Bilen er raskere <b>enn</b> sykkelen.</span> «Такой же как» = <b class="no">like … som</b>: <span class="no">Han er like høy som meg.</span></p>`,
  ex: [["Oslo er større enn Bergen.", "Осло больше Бергена."], ["Dette er best!", "Это лучше всего!"], ["Jeg har flere venner enn deg.", "У меня больше друзей, чем у тебя."]],
  pr: [
    C("Bilen er ___ enn sykkelen. (быстрее: rask)", "raskere", "raskest|raske"), C("Han er ___ i klassen. (самый высокий: høy)", "høyest", "høyere|høye"),
    C("Dette er ___. (лучше: god)", "bedre", "godere|best"), C("Jeg har ___ venner enn deg. (больше: mange)", "flere", "mer|flest"),
    C("Oslo er ___ enn Bergen. (больше: stor)", "større", "størst|stor"), C("Jeg har ___ penger. (больше: mye)", "mer", "flere|mest"), C("Hun er like høy ___ meg.", "som", "enn|at")
  ] });
