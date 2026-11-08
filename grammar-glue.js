// ===== Грамматика 7–8: частицы и союзы простыми словами, продвинутое =====
// Подход: у каждого слова есть «русская подсказка» — подставь русское слово и выбери норвежское.

G({ id: "cheat", sec: "glue", lv: "A2", title: "Шпаргалка: å, at, om, hvis, for — что выбрать?", lead: "Смотри на русское слово — и бери норвежское",
  html: `<p>Эти слова путают все. Секрет: <b>не переводи слово, а подставь русское</b>.</p>
<table class="gt"><tr><th>В русском</th><th>В норвежском</th><th>Пример</th></tr>
<tr><td>«чтобы» (цель)</td><td class="no"><b>for å</b></td><td class="no">Jeg sparer for å kjøpe gitar.</td></tr>
<tr><td>«-ть» (liker, prøver…)</td><td class="no"><b>å</b></td><td class="no">Jeg liker å lese.</td></tr>
<tr><td>«что» (я знаю, что…)</td><td class="no"><b>at</b></td><td class="no">Jeg vet at du er her.</td></tr>
<tr><td>«ли» (не знаю, придёт ли)</td><td class="no"><b>om</b></td><td class="no">Jeg vet ikke om han kommer.</td></tr>
<tr><td>«если»</td><td class="no"><b>hvis</b></td><td class="no">Hvis det regner, blir jeg.</td></tr>
<tr><td>«когда» (раз в прошлом)</td><td class="no"><b>da</b></td><td class="no">Da jeg var liten…</td></tr>
<tr><td>«когда» (всегда/будущее)</td><td class="no"><b>når</b></td><td class="no">Når jeg er trøtt…</td></tr>
<tr><td>«потому что»</td><td class="no"><b>fordi</b></td><td class="no">…fordi jeg er syk.</td></tr>
<tr><td>«поэтому»</td><td class="no"><b>derfor / så</b></td><td class="no">Derfor er jeg hjemme.</td></tr></table>
<p>Разберём самые каверзные подробнее: <b>at, om, for, før, når/da</b> — ниже, в соседних темах.</p>`,
  pr: [
    C("Jeg vet ___ du er snill. (что)", "at", "om|å"), C("Jeg vet ikke ___ du er snill. (ли)", "om", "at|hvis"), C("___ du er snill, hjelper jeg deg. (если)", "Hvis", "Om|At"),
    C("Jeg sparer penger ___ kjøpe en gitar. (чтобы)", "for å", "å|at"), C("Hun prøver ___ forstå. (-ть)", "å", "at|for å"), C("Jeg er trøtt ___ jeg sov lite. (потому что)", "fordi", "derfor|hvis"),
    C("Jeg sov lite. ___ er jeg trøtt. (поэтому)", "Derfor", "Fordi|At"), C("___ jeg var liten, hadde jeg en hund. (когда, один раз)", "Da", "Når|Hvis")
  ] });

G({ id: "ogmen", sec: "glue", lv: "A1", title: "og, men, eller, så — «клей» для предложений", lead: "Склеивают два предложения, порядок слов не ломают",
  html: `<p>Эти слова — как скотч: приклеили два предложения, а порядок слов в каждом остался <b>обычный</b>.</p>
<table class="gt"><tr><td class="no"><b>og</b></td><td>и</td><td class="no">Jeg har en bror <b>og</b> en søster.</td></tr>
<tr><td class="no"><b>men</b></td><td>но</td><td class="no">Jeg er trøtt, <b>men</b> jeg må jobbe.</td></tr>
<tr><td class="no"><b>eller</b></td><td>или</td><td class="no">Vil du ha kaffe <b>eller</b> te?</td></tr>
<tr><td class="no"><b>så</b></td><td>поэтому</td><td class="no">Det regner, <b>så</b> jeg blir hjemme.</td></tr></table>`,
  pr: [
    C("Jeg liker kaffe, ___ jeg liker ikke te. (но)", "men", "og|eller"), C("Vil du ha kaffe ___ te? (или)", "eller", "og|men"), C("Jeg har en bror ___ en søster. (и)", "og", "men|så"),
    C("Det regner, ___ jeg blir hjemme. (поэтому)", "så", "men|eller")
  ] });

G({ id: "at", sec: "glue", lv: "A2", title: "at — «что» (мостик к мысли)", lead: "Не английское «at»! По-русски это «что»",
  html: `<p>Представь, что ты говоришь «Я знаю… <b>что</b> ты здесь». Слово «что» — это и есть <b class="no">at</b>. Оно строит <b>мостик</b> между «я знаю / думаю / говорю» и самой мыслью.</p>
<p class="no" style="font-size:1.1rem">Jeg vet <b>at</b> du er her.<br>Hun sier <b>at</b> hun er trøtt.<br>Jeg tror <b>at</b> det blir sol.</p>
<p><b>Три важных вещи:</b></p>
<ul><li>«at» — не «в»! Английское «at» тут не при чём.</li>
<li>После «at» идёт <b>целое предложение</b> (с подлежащим): <span class="no">at <b>han</b> kommer</span>. А после «å» — только глагол: <span class="no">å komme</span>.</li>
<li>В речи «at» часто пропускают: <span class="no">Jeg tror det blir sol.</span></li></ul>
<p>Жизненный пример: друг пишет «Er du hjemme?» (Ты дома?), ты отвечаешь: <span class="no">Jeg tror at jeg er hjemme klokka fem.</span> («Думаю, что буду дома в пять.»)</p>`,
  tip: "Тест: можно вставить русское «что»? Значит <b>at</b>. «Я рад, что ты пришёл» → <i>Jeg er glad for at du kom.</i>",
  ex: [["Jeg håper at du har det bra.", "Надеюсь, что у тебя всё хорошо."], ["Det er bra at du kommer.", "Хорошо, что ты придёшь."], ["Han vet at jeg er her.", "Он знает, что я здесь."]],
  pr: [
    C("Jeg vet ___ du er her.", "at", "å|om"), C("Hun sier ___ hun er trøtt.", "at", "om|for"), C("Jeg liker ___ lese.", "å", "at|om"), C("Jeg tror ___ det regner.", "at", "å|hvis"),
    C("Det er bra ___ du kommer.", "at", "å|om"), C("Jeg håper ___ bo i Norge. (-ть)", "å", "at|om")
  ] });

G({ id: "om", sec: "glue", lv: "A2", title: "om — три жизненных значения", lead: "«ли», «о», «через / по» — одно слово, три роли",
  html: `<p>Слово <b class="no">om</b> выглядит страшно, но у него всего <b>три лица</b>. Смотри, какое русское слово подходит:</p>
<table class="gt"><tr><th>Подставь…</th><th>Пример</th></tr>
<tr><td><b>«ли»</b><br>(вопрос внутри предложения)</td><td class="no">Jeg vet ikke <b>om</b> han kommer.<br><small>Не знаю, придёт ли он.</small></td></tr>
<tr><td><b>«о / об»</b><br>(говорить, мечтать, книга)</td><td class="no">Vi snakker <b>om</b> været.<br><small>Мы говорим о погоде.</small></td></tr>
<tr><td><b>«через»</b> (время вперёд)<br><b>«по… / в…»</b> (утром, зимой)</td><td class="no">Bussen kommer <b>om</b> ti minutter.<br>Om kvelden leser jeg.<br><small>Через десять минут. Вечером читаю.</small></td></tr></table>
<p>Жизненные сценки:</p>
<ul><li>Мама спрашивает: «Ты придёшь на ужин?» Ты отвечаешь другу: <span class="no">Mamma spør <b>om</b> jeg kommer.</span> — «Мама спрашивает, приду ли я».</li>
<li>Друг ждёт автобус: <span class="no">Bussen går <b>om</b> fem minutter.</span> — «Автобус через пять минут».</li></ul>`,
  tip: "<b>om ≠ «если»!</b> «Если» — это hvis. Проверка: в предложении можно сказать «ли»? Тогда om. («Не знаю, <u>ли</u> он придёт» ✓ → om; «<u>Если</u> он придёт» → hvis.)",
  ex: [["Hun spurte om jeg ville komme.", "Она спросила, приду ли я."], ["Han drømmer om en ny sykkel.", "Он мечтает о новом велосипеде."], ["Om vinteren er det kaldt.", "Зимой холодно."]],
  pr: [
    C("Jeg vet ikke ___ han kommer. (ли)", "om", "at|hvis"), C("Vi snakker ___ været. (о)", "om", "på|til"), C("Bussen går ___ fem minutter. (через)", "om", "i|på"),
    C("___ vinteren er det kaldt. (зимой)", "Om", "På|Til"), C("Hun spurte ___ jeg ville komme. (ли)", "om", "at|for"), C("Han drømmer ___ en ny sykkel. (о)", "om", "for|på")
  ] });

G({ id: "for", sec: "glue", lv: "A2", title: "for — «швейцарский нож» из шести лезвий", lead: "За, для, чтобы, слишком, потому что, назад",
  html: `<p><b class="no">for</b> — как швейцарский нож: один инструмент, много лезвий. Чтобы выбрать нужное, <b>смотри на соседей</b>:</p>
<table class="gt"><tr><th>Рядом…</th><th>Значит</th><th>Пример</th></tr>
<tr><td>takk, betale</td><td><b>за</b></td><td class="no">Takk <b>for</b> hjelpen!<br>Jeg betalte 50 kr <b>for</b> boka.</td></tr>
<tr><td>å + глагол</td><td><b>чтобы</b></td><td class="no">Jeg lærer norsk <b>for å</b> bo her.</td></tr>
<tr><td>прилагательное</td><td><b>слишком</b></td><td class="no">Det er <b>for</b> kaldt.</td></tr>
<tr><td>… siden</td><td><b>назад</b></td><td class="no">for to år <b>siden</b></td></tr>
<tr><td>deg, meg, oss</td><td><b>для</b></td><td class="no">Det er bra <b>for</b> deg.</td></tr>
<tr><td>целое предложение</td><td><b>потому что / ведь</b></td><td class="no">Jeg går hjem, <b>for</b> jeg er trøtt.</td></tr></table>
<p><b>Жизненно:</b> на кассе ты говоришь «Takk for hjelpen» (спасибо <u>за</u> помощь), в отзыве «Det er for dyrt» (<u>слишком</u> дорого), а в разговоре «Jeg kom hit for tre år siden» (я приехал <u>три года назад</u>).</p>`,
  tip: "Отличие <b>for</b> и <b>fordi</b> (оба «потому что»): после «for» ikke стоит <i>после</i> глагола («for jeg har ikke tid»), после «fordi» — <i>перед</i> («fordi jeg ikke har tid»). Новичку проще всегда говорить fordi.",
  ex: [["Takk for maten!", "Спасибо за еду!"], ["Kaffen er for varm.", "Кофе слишком горячий."], ["Hun flyttet hit for to år siden.", "Она переехала сюда два года назад."]],
  pr: [
    C("Takk ___ hjelpen! (за)", "for", "om|til"), C("Det er ___ kaldt ute. (слишком)", "for", "om|så"), C("Jeg lærer norsk ___ å jobbe i Norge. (чтобы)", "for", "om|til"),
    C("Hun kom hit for to år ___. (назад)", "siden", "før|om"), C("Jeg går hjem, ___ jeg er trøtt. (потому что)", "for", "at|om"), C("Jeg betalte 50 kroner ___ boka. (за)", "for", "til|om"),
    C("Dette er bra ___ deg. (для)", "for", "om|hos")
  ] });

G({ id: "før", sec: "glue", lv: "A2", title: "før — «до» и «раньше»", lead: "Ось времени: før = раньше, etter = позже",
  html: `<p>Нарисуй линию времени. Всё, что <b>левее</b> события — это <b class="no">før</b> («до»). Всё правее — <b class="no">etter</b> («после»).</p>
<p class="no" style="font-size:1.1rem">dusj → <b>før</b> → frokost → <b>etter</b> → skole</p>
<p><b>Три роли:</b></p>
<ul><li><b>до + слово</b>: <span class="no">Jeg dusjer <b>før</b> frokost.</span> (До завтрака.)</li>
<li><b>прежде чем + предложение</b>: <span class="no">Vask hendene <b>før</b> du spiser.</span> (Помой руки, прежде чем есть.)</li>
<li><b>раньше / уже когда-то</b> (одно, без хвоста): <span class="no">Har du vært her <b>før</b>?</span> (Ты здесь раньше бывал?)</li></ul>
<p>Жизненно: мама говорит «Ta av skoene før du går inn» (Сними обувь, прежде чем зайти).</p>
<p class="tr">Не путай: <b class="no">før</b> («до») и <b class="no">først</b> («сначала, сперва»).</p>`,
  ex: [["Jeg har aldri sett det før.", "Я никогда раньше этого не видел."], ["Vi går på kino etter middagen.", "Мы идём в кино после ужина."], ["Ring meg før du kommer.", "Позвони мне перед приходом."]],
  pr: [
    C("Vask hendene ___ du spiser. (прежде чем)", "før", "etter|når"), C("Jeg går på skolen ___ lunsj. (до обеда)", "før", "etter|om"), C("Har du vært i Norge ___? (раньше)", "før", "etter|for"),
    C("Vi går på kino ___ middagen. (после)", "etter", "før|til"), C("«før» значит…", "до, раньше", "после, потом|потому что, ведь"),
    C("Сначала душ, потом завтрак", "Jeg dusjer før jeg spiser frokost.", "Jeg dusjer etter jeg spiser frokost.|Jeg dusjer for jeg spiser frokost.")
  ] });

G({ id: "nar", sec: "glue", lv: "A2", title: "når, da, hvis — «когда» и «если»", lead: "Три слова: когда-раз, когда-всегда, если",
  html: `<p>Вопрос к себе: <b>это было один раз в прошлом</b>?</p>
<table class="gt"><tr><td><b>Один раз давно</b></td><td class="no"><b>da</b></td><td class="no">Da jeg var liten, bodde jeg i en liten by.</td></tr>
<tr><td><b>Повторяется или ещё будет</b></td><td class="no"><b>når</b></td><td class="no">Når jeg er trøtt, drikker jeg kaffe.<br>Ring meg når du kommer.</td></tr>
<tr><td><b>Условие (может, и не будет)</b></td><td class="no"><b>hvis</b></td><td class="no">Hvis det regner, blir jeg hjemme.</td></tr></table>
<p>Жизненно: «<span class="no">Når</span> jeg kommer hjem, spiser jeg» (каждый день), «<span class="no">Da</span> jeg kom hjem i går, sov alle» (один раз, вчера), «<span class="no">Hvis</span> du kommer, lager jeg mat» (а вдруг не придёшь).</p>
<p>Второе предложение после запятой идёт с глагола: <span class="no">Når det regner, <b>blir</b> jeg hjemme.</span></p>`,
  ex: [["Da jeg var i Bergen, så jeg Bryggen.", "Когда я был в Бергене, я видел Брюгген."], ["Når kommer bussen?", "Когда придёт автобус?"]],
  pr: [
    C("___ jeg var barn, bodde vi i en liten by. (один раз в прошлом)", "Da", "Når|Hvis"), C("___ du kommer, ring meg. (когда придёшь)", "Når", "Da|Om"), C("___ det er sol, går vi på tur. (если)", "Hvis", "Da|Om"),
    C("Jeg vet ikke ___ han kommer. (ли)", "om", "hvis|da"), C("___ jeg var i Bergen i fjor, så jeg Bryggen.", "Da", "Når|Hvis")
  ] });

G({ id: "fordi", sec: "glue", lv: "A2", title: "fordi, derfor — «потому что» и «поэтому»", lead: "Причина и следствие: две стрелки",
  html: `<p>Две стрелки: <b>причина → следствие</b>.</p>
<table class="gt"><tr><td class="no"><b>fordi</b></td><td>потому что (причина)</td><td class="no">Jeg er hjemme <b>fordi</b> jeg er syk.</td></tr>
<tr><td class="no"><b>derfor</b></td><td>поэтому (следствие)</td><td class="no">Jeg er syk. <b>Derfor</b> er jeg hjemme.</td></tr>
<tr><td class="no"><b>så</b></td><td>поэтому (проще, в речи)</td><td class="no">Jeg er syk, <b>så</b> jeg er hjemme.</td></tr></table>
<p>Не забудь: после <b>derfor</b> глагол стоит <b>сразу</b> (V2!): <span class="no">Derfor <b>er</b> jeg…</span> А после <b>fordi</b> — порядок придаточного: <span class="no">fordi jeg <b>ikke</b> har tid</span>.</p>`,
  pr: [
    C("Jeg er trøtt, ___ jeg sov dårlig. (потому что)", "fordi", "derfor|så"), C("Jeg sov dårlig. ___ er jeg trøtt. (поэтому)", "Derfor", "Fordi|Siden"),
    C("Что верно?", "Jeg blir hjemme fordi jeg ikke har tid.", "Jeg blir hjemme derfor jeg ikke har tid.|Jeg blir hjemme fordi har jeg ikke tid."), C("Что верно?", "Det regner. Derfor tar jeg jakke.", "Det regner. Derfor jeg tar jakke.|Det regner. Fordi tar jeg jakke.")
  ] });

G({ id: "som", sec: "glue", lv: "A2", title: "som — «который» и «как»", lead: "Склеивает и сравнивает",
  html: `<p><b class="no">som</b> — универсальный «который» и «как»:</p>
<table class="gt"><tr><td><b>который / кто</b></td><td class="no">Jeg har en venn <b>som</b> bor i Oslo.<br>Mannen <b>som</b> sitter der, er læreren min.</td></tr>
<tr><td><b>в роли, как</b></td><td class="no">Han jobber <b>som</b> lærer.</td></tr>
<tr><td><b>такой же как</b></td><td class="no">Hun er like høy <b>som</b> meg.</td></tr></table>
<p><b>som</b> не меняется ни по родам, ни по числам. Для «чем» (сравнение) нужно другое слово — <b class="no">enn</b>: <span class="no">høyere <b>enn</b> meg.</span></p>`,
  pr: [
    C("Jeg har en bror ___ bor i Bergen. (который)", "som", "at|hvem"), C("Han jobber ___ lærer. (как/в роли)", "som", "for|til"), C("Hun er like høy ___ meg. (как)", "som", "enn|at"),
    C("Det er en bok ___ handler om Norge. (которая)", "som", "at|hva"), C("Hun er høyere ___ meg. (чем)", "enn", "som|at")
  ] });

G({ id: "saa", sec: "glue", lv: "A2", title: "så — «потом», «поэтому», «так»", lead: "Одно слово — три роли",
  html: `<table class="gt"><tr><td><b>потом, затем</b></td><td class="no">Først spiser jeg, <b>så</b> går jeg.</td></tr>
<tr><td><b>поэтому</b></td><td class="no">Jeg er syk, <b>så</b> jeg blir hjemme.</td></tr>
<tr><td><b>так, настолько</b></td><td class="no">Det er <b>så</b> kaldt!</td></tr></table>
<p>В роли «потом» после «så» сразу стоит глагол (V2): <span class="no">så <b>går</b> jeg</span>, а не <span class="no">✗ så jeg går</span>.</p>`,
  pr: [
    C("Først spiser jeg, ___ går jeg på skolen. (потом)", "så", "for|som"), C("Det er ___ kaldt! (так)", "så", "for|som"), C("Что верно? (потом)", "Først spiser jeg, så går jeg.", "Først spiser jeg, så jeg går.|Først jeg spiser, så går jeg.")
  ] });

G({ id: "mens", sec: "glue", lv: "B1", title: "mens, siden, selv om — пока, с, хотя", lead: "Союзы посложнее: коротко и по делу",
  html: `<table class="gt"><tr><td class="no"><b>mens</b></td><td>пока, в то время как</td><td class="no">Jeg leser, <b>mens</b> du lager mat.</td></tr>
<tr><td class="no"><b>siden</b></td><td>с тех пор как; так как</td><td class="no">Jeg har bodd her <b>siden</b> 2020.</td></tr>
<tr><td class="no"><b>selv om</b></td><td>хотя; даже если</td><td class="no"><b>Selv om</b> det regner, går jeg ut.</td></tr>
<tr><td class="no"><b>ettersom</b></td><td>так как (книжнее)</td><td class="no"><b>Ettersom</b> det er sent, drar jeg.</td></tr>
<tr><td class="no"><b>slik at</b></td><td>так что; чтобы</td><td class="no">Jeg snakker sakte, <b>slik at</b> alle forstår.</td></tr></table>`,
  pr: [
    C("Hun leser ___ han lager mat. (пока)", "mens", "siden|selv om"), C("___ det regner, går vi på tur. (хотя)", "Selv om", "Mens|Fordi"), C("Jeg har bodd her ___ 2020. (с)", "siden", "mens|ettersom"),
    C("Jeg snakker sakte, ___ alle forstår. (чтобы)", "slik at", "mens|selv om"), C("___ det er sent, drar jeg hjem. (так как)", "Ettersom", "Selv om|Mens")
  ] });

G({ id: "doble", sec: "adv", lv: "B1", title: "Парные союзы: både … og, enten … eller", lead: "«И то и другое», «или то или это», «ни то ни другое»",
  html: `<table class="gt"><tr><td class="no"><b>både</b> … <b>og</b></td><td>и … и</td><td class="no">Jeg liker <b>både</b> kaffe <b>og</b> te.</td></tr>
<tr><td class="no"><b>enten</b> … <b>eller</b></td><td>либо … либо</td><td class="no">Vi kan <b>enten</b> gå <b>eller</b> ta bussen.</td></tr>
<tr><td class="no"><b>verken</b> … <b>eller</b></td><td>ни … ни</td><td class="no">Jeg har <b>verken</b> bil <b>eller</b> sykkel.</td></tr>
<tr><td class="no"><b>ikke bare</b> … <b>men også</b></td><td>не только … но и</td><td class="no">Han er <b>ikke bare</b> snill, <b>men også</b> morsom.</td></tr></table>`,
  pr: [
    C("Jeg liker ___ kaffe og te. (и … и)", "både", "enten|verken"), C("Vi kan ___ gå eller ta bussen. (либо)", "enten", "både|verken"), C("Jeg har ___ bil eller sykkel. (ни … ни)", "verken", "både|enten"),
    C("Han er ikke bare snill, ___ også morsom.", "men", "og|eller")
  ] });

G({ id: "cond", sec: "adv", lv: "B2", title: "Если бы…: hvis jeg hadde, ville jeg", lead: "Нереальное условие — прошедшее + ville",
  html: `<p>Два типа условий:</p>
<ul><li><b>Реальное</b> (может случиться): <span class="no">Hvis det regner, <b>blir</b> jeg hjemme.</span></li>
<li><b>Нереальное</b> («если бы»): <b class="no">hvis + прошедшее</b>, затем <b class="no">ville + инфинитив</b>: <span class="no">Hvis jeg <b>hadde</b> mer tid, <b>ville</b> jeg lese mer.</span></li></ul>
<p>Русское «бы» превращается в <b class="no">ville</b>. Жизненно: «Если бы у меня были деньги, я бы поехал в Норвегию» → <span class="no">Hvis jeg hadde penger, ville jeg reise til Norge.</span></p>`,
  pr: [
    C("«Если бы у меня было время, я бы читал»", "Hvis jeg hadde tid, ville jeg lese.", "Hvis jeg har tid, ville jeg lese.|Hvis jeg hadde tid, jeg ville lese."), C("Hvis jeg ___ rik, ville jeg reise mye.", "var", "er|vil"),
    C("Hvis det regner, ___ jeg hjemme. (реальное)", "blir", "ville bli|ble"), C("Hvis hun ___ mer penger, ville hun kjøpe en bil.", "hadde", "har|ha")
  ] });

G({ id: "c1conn", sec: "adv", lv: "C1", title: "Связки для письма: likevel, dessuten, derimot", lead: "Как звучать «по-книжному»",
  html: `<table class="gt"><tr><td class="no"><b>likevel</b></td><td>всё же, тем не менее</td><td class="no">Det var dyrt, men jeg kjøpte det <b>likevel</b>.</td></tr>
<tr><td class="no"><b>dessuten</b></td><td>кроме того</td><td class="no"><b>Dessuten</b> er maten god.</td></tr>
<tr><td class="no"><b>derimot</b></td><td>напротив, зато</td><td class="no">Ola liker sommer. Mia liker <b>derimot</b> vinter.</td></tr>
<tr><td class="no"><b>imidlertid</b></td><td>однако</td><td class="no">Planen er god. Den er <b>imidlertid</b> dyr.</td></tr>
<tr><td class="no"><b>dermed</b></td><td>таким образом</td><td class="no">Han studerte mye og besto <b>dermed</b> prøven.</td></tr></table>
<p>Если такое слово стоит первым, глагол следует сразу за ним (V2): <span class="no">Dessuten <b>er</b> maten god.</span></p>`,
  pr: [
    C("Det var dyrt, men jeg kjøpte det ___. (всё же)", "likevel", "dessuten|derfor"), C("___ er maten god. (кроме того)", "Dessuten", "Likevel|Derimot"), C("Ola liker sommer; Mia liker ___ vinter. (а вот)", "derimot", "dessuten|dermed"),
    C("Han sov dårlig. ___ var han trøtt. (поэтому)", "Derfor", "Likevel|Derimot")
  ] });

G({ id: "c1inv", sec: "adv", lv: "C1", title: "Условие без hvis: «Hadde jeg visst…»", lead: "Глагол в начало — и «если» не нужно",
  html: `<p>В литературной речи «если бы» можно выразить, просто <b>поставив глагол в начало</b>:</p>
<p class="no" style="font-size:1.1rem"><b>Hadde</b> jeg visst det, hadde jeg kommet.<br><b>Skulle</b> du trenge hjelp, ring meg.</p>
<p>Первое: «Знай я это — пришёл бы». Второе: «Если вдруг понадобится помощь — позвони».</p>
<p>Работает с <b class="no">hadde, var, skulle, ville</b> и другими.</p>`,
  pr: [
    C("«Знай я это, я бы пришёл»", "Hadde jeg visst det, hadde jeg kommet.", "Jeg hadde visst det, hadde jeg kommet.|Hadde jeg visste det, hadde jeg kom."),
    C("Hadde jeg hatt tid, ___ jeg ha kommet.", "ville", "vil|ble"),
    C("«Если вдруг понадобится помощь, позвони»", "Skulle du trenge hjelp, ring meg.", "Hvis skulle du trenge hjelp, ring meg.|Skulle trenge du hjelp, ring meg.")
  ] });
