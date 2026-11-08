// ===== Грамматика 4–6: глаголы, порядок слов, предлоги =====

G({ id: "vpres", sec: "verb", lv: "A1", title: "Настоящее время: глагол не меняется", lead: "Одна форма для всех: jeg bor, du bor, han bor",
  html: `<p>Хорошая новость: <b>никаких спряжений по лицам</b>. Русское «я ем, ты ешь, он ест» превращается в одно слово:</p>
<p class="no" style="font-size:1.1rem">jeg spiser · du spiser · han spiser · vi spiser · de spiser</p>
<p>Как получить форму? Берём инфинитив (<span class="no">å spise</span>), убираем «å» и ставим <b>-r</b>:</p>
<table class="gt"><tr><td class="no">å spise → spise<b>r</b></td><td class="no">å komme → komme<b>r</b></td></tr>
<tr><td class="no">å bo → bo<b>r</b></td><td class="no">å gå → gå<b>r</b></td></tr></table>
<p>Два «бунтаря»: <span class="no">å være → <b>er</b></span> (быть) и <span class="no">å ha → <b>har</b></span> (иметь).</p>`,
  ex: [["Jeg spiser fisk.", "Я ем рыбу."], ["Vi bor i Norge.", "Мы живём в Норвегии."], ["De er glade.", "Они рады."]],
  verbs: [1],
  pr: [
    C("Jeg ___ fisk. (å spise)", "spiser", "spise|spis"), C("Vi ___ i Norge. (å bo)", "bor", "bo|bodde"), C("Hun ___ til skolen. (å gå)", "går", "gå|gikk"),
    C("De ___ glade. (å være)", "er", "være|var"), C("Du ___ en bil. (å ha)", "har", "ha|hadde"), C("Han ___ kaffe. (å drikke)", "drikker", "drikke|drakk")
  ] });

G({ id: "inf", sec: "verb", lv: "A1", title: "Инфинитив и «å»", lead: "å — это русское «-ть»",
  html: `<p>Слово <b class="no">å</b> — это русское окончание «-ть»: <span class="no">å spise</span> = есть, <span class="no">å lese</span> = читать.</p>
<p>Когда его ставить? Простое правило из двух частей:</p>
<ul><li>После <b class="no">kan, vil, skal, må, bør</b> — «å» <b>не нужно</b>: <span class="no">Jeg kan svømme.</span></li>
<li>После остальных глаголов (liker, begynner, prøver, håper, trenger) — «å» <b>нужно</b>: <span class="no">Jeg liker <b>å</b> svømme.</span></li></ul>
<p>Не путай «å» (-ть) и <span class="no">at</span> (что): после «å» только глагол, после «at» — целое предложение.</p>`,
  ex: [["Jeg liker å lese.", "Я люблю читать."], ["Hun kan snakke norsk.", "Она умеет говорить по-норвежски."], ["Han prøver å lære gitar.", "Он пытается научиться играть на гитаре."]],
  pr: [
    C("Что верно?", "Jeg kan svømme.", "Jeg kan å svømme.|Jeg kan at svømme."), C("Что верно?", "Jeg liker å danse.", "Jeg liker danse.|Jeg liker at danse."),
    C("Что верно?", "Hun vil bo i Norge.", "Hun vil å bo i Norge.|Hun vil at bo i Norge."), C("Что верно?", "Han prøver å lære norsk.", "Han prøver lære norsk.|Han prøver at lære norsk."),
    C("Что верно?", "Vi må gå nå.", "Vi må å gå nå.|Vi må at gå nå.")
  ] });

G({ id: "modal", sec: "modal", lv: "A1", title: "kan, vil, skal, må, bør — «помощники»", lead: "Могу, хочу, собираюсь, должен, стоит",
  html: `<p>Пять маленьких глаголов-помощников. Они стоят перед другим глаголом, а тот остаётся в инфинитиве <b>без «å»</b>.</p>
<table class="gt"><tr><td class="no"><b>kan</b></td><td>могу, умею</td><td class="no">Jeg kan svømme.</td></tr>
<tr><td class="no"><b>vil</b></td><td>хочу</td><td class="no">Jeg vil ha kaffe.</td></tr>
<tr><td class="no"><b>skal</b></td><td>собираюсь (план)</td><td class="no">Jeg skal reise i morgen.</td></tr>
<tr><td class="no"><b>må</b></td><td>должен, надо</td><td class="no">Jeg må jobbe.</td></tr>
<tr><td class="no"><b>bør</b></td><td>стоило бы</td><td class="no">Du bør sove.</td></tr></table>
<p>«ikke» ставится сразу после помощника: <span class="no">Jeg kan <b>ikke</b> komme.</span></p>`,
  tip: "<b>skal</b> — не английское «will». Это «собираюсь / по плану»: <i>Jeg skal på kino i kveld.</i> (Иду в кино вечером — уже решено.)",
  rule: "modal",
  pr: [
    C("Jeg ___ svømme. (умею)", "kan", "vil|må"), C("Jeg ___ ha en kaffe. (хочу)", "vil", "kan|bør"), C("Jeg ___ jobbe i dag. (должен)", "må", "vil|kan"),
    C("I morgen ___ jeg reise. (собираюсь)", "skal", "kan|bør"), C("Что верно?", "Jeg kan ikke komme.", "Jeg kan ikke å komme.|Jeg ikke kan komme.")
  ] });

G({ id: "imp", sec: "verb", lv: "A1", title: "Повелительное: Spis! Kom!", lead: "Приказ или просьба — корень без «-e»",
  html: `<p>Как отдать команду? Берём инфинитив и <b>отрезаем «å» и последнюю «-e»</b>:</p>
<table class="gt"><tr><td class="no">å spise → <b>Spis!</b></td><td>Ешь!</td></tr><tr><td class="no">å komme → <b>Kom!</b></td><td>Приходи!</td></tr>
<tr><td class="no">å vente → <b>Vent!</b></td><td>Подожди!</td></tr><tr><td class="no">å gå → <b>Gå!</b></td><td>Иди!</td></tr></table>
<p>Вежливо: <span class="no">Vær så snill å vente.</span> (Пожалуйста, подождите.) или вопросом: <span class="no">Kan du hjelpe meg?</span></p>`,
  ex: [["Kom hit!", "Иди сюда!"], ["Les boka.", "Читай книгу."], ["Vær så snill å vente.", "Пожалуйста, подождите."]],
  pr: [
    C("å komme → (команда)", "Kom!", "Komme!|Kommer!"), C("å spise → (команда)", "Spis!", "Spiser!|Spise!"), C("å vente → (команда)", "Vent!", "Venter!|Vente!"),
    C("«Пожалуйста, подожди» вежливо", "Vær så snill å vente.", "Vær så snill vente.|Vær å snill vente.")
  ] });

G({ id: "past", sec: "verb", lv: "A2", title: "Прошедшее: spiste или har spist?", lead: "Три формы прошлого — как выбрать",
  html: `<p>В норвежском три «прошлых». Выбирай по ситуации:</p>
<table class="gt"><tr><th>Ситуация</th><th>Форма</th><th>Пример</th></tr>
<tr><td>Рассказываю, что было (вчера, в 2020)</td><td><b>preteritum</b><br><span class="no">spiste</span></td><td class="no">I går spiste jeg fisk.</td></tr>
<tr><td>«Уже сделал» / «когда-нибудь был»</td><td><b>perfektum</b><br><span class="no">har spist</span></td><td class="no">Jeg har spist.</td></tr>
<tr><td>Было ещё раньше другого прошлого</td><td><b>pluskvamperfekt</b><br><span class="no">hadde spist</span></td><td class="no">Jeg hadde spist før han kom.</td></tr></table>
<p>Перфект = <b>har</b> + причастие (spist). Если в предложении есть точное время в прошлом (i går, i fjor) — берём <b>preteritum</b>.</p>`,
  tip: "Не знаешь что выбрать? Есть слово «вчера / в прошлом году» → <b>spiste</b>. Есть «уже / никогда / когда-нибудь» → <b>har spist</b>.",
  rule: "past", verbs: [2, 3],
  pr: [
    C("I går ___ jeg fisk. (есть)", "spiste", "har spist|spiser"), C("Jeg ___ allerede spist. (уже)", "har", "hadde|er"), C("Da jeg kom, ___ han gått. (уже ушёл)", "hadde", "har|er"),
    C("Hun ___ i Oslo i fjor. (жила: bo)", "bodde", "har bodd|bor"), C("Har du noen gang ___ i Norge? (был: være)", "vært", "var|er")
  ] });

G({ id: "strong", sec: "verb", lv: "A2", title: "Слабые и сильные глаголы", lead: "Правильные и «бунтари»",
  html: `<p><b>Слабые</b> глаголы послушные: их формы строятся по шаблону — <span class="no">spise → spiste → spist</span>, <span class="no">bo → bodde → bodd</span>.</p>
<p><b>Сильные</b> меняют гласную в корне — как русское «пить → пил», но чаще. Их учим тройками:</p>
<p class="no">drikke – drakk – drukket<br>skrive – skrev – skrevet<br>ta – tok – tatt<br>gå – gikk – gått<br>se – så – sett<br>komme – kom – kommet<br>finne – fant – funnet<br>gi – ga – gitt<br>være – var – vært</p>
<p>Три формы = инфинитив, прошедшее простое (preteritum), причастие (для har/hadde).</p>`,
  verbs: [2, 3],
  pr: [
    C("å drikke → (вчера)", "drakk", "drikket|drukket"), C("å gå → (вчера)", "gikk", "gådde|gått"), C("å se → har ___", "sett", "så|set"),
    C("å skrive → (вчера)", "skrev", "skrivde|skrevet"), C("å ta → har ___", "tatt", "tok|taket"), C("å komme → (вчера)", "kom", "kommet|kommde")
  ] });

G({ id: "fut", sec: "verb", lv: "A2", title: "Будущее: skal, vil, kommer til å", lead: "Отдельной формы нет — берём помощника",
  html: `<p>Отдельного будущего времени нет. Вместо этого:</p>
<ul><li><b>Настоящее + слово времени</b>: <span class="no">Jeg reiser i morgen.</span></li>
<li><b>skal</b> — план: <span class="no">Jeg skal reise i morgen.</span></li>
<li><b>vil</b> — хочу / обещаю: <span class="no">Jeg vil lære norsk.</span></li>
<li><b>kommer til å</b> — прогноз, «будет, потому что всё к этому идёт»: <span class="no">Det kommer til å regne.</span></li></ul>`,
  rule: "fut",
  pr: [
    C("Прогноз: Det ___ til å regne.", "kommer", "skal|vil"), C("План: I morgen ___ jeg reise.", "skal", "kommer|bor"), C("Что верно?", "Jeg reiser i morgen.", "Jeg reise i morgen.|Jeg å reiser i morgen.")
  ] });

G({ id: "refl", sec: "verb", lv: "B1", title: "Возвратные глаголы: seg", lead: "«Себя» — и оно меняется по лицам",
  html: `<p>Некоторые глаголы просят «себя» — как русское «мыться, радоваться». В норвежском это слово <b>seg</b>, но для «я, ты, мы» оно меняется:</p>
<table class="gt"><tr><td class="no">jeg → <b>meg</b></td><td class="no">vi → <b>oss</b></td></tr><tr><td class="no">du → <b>deg</b></td><td class="no">dere → <b>dere</b></td></tr>
<tr><td class="no">han/hun/de → <b>seg</b></td><td></td></tr></table>
<p class="no">å glede seg (радоваться) · å legge seg (ложиться) · å sette seg (садиться) · å føle seg (чувствовать себя)</p>`,
  ex: [["Jeg gleder meg til ferien.", "Я радуюсь предстоящему отпуску."], ["Han legger seg klokka ti.", "Он ложится спать в десять."], ["Vi føler oss bra.", "Мы чувствуем себя хорошо."]],
  pr: [
    C("Jeg gleder ___ til helgen.", "meg", "seg|deg"), C("Han legger ___ klokka ti.", "seg", "ham|meg"), C("Vi gleder ___ til sommeren.", "oss", "seg|dere"),
    C("Hun føler ___ trøtt.", "seg", "henne|deg"), C("Du setter ___ ned.", "deg", "seg|meg")
  ] });

G({ id: "part", sec: "verb", lv: "B1", title: "Глаголы с «хвостиками»: stå opp, ta på", lead: "Маленькое слово меняет смысл — как русские приставки",
  html: `<p>В русском «встать, надеть, включить» — приставки. В норвежском роль приставки играет <b>маленькое слово после глагола</b>. Учи их как единое слово:</p>
<table class="gt"><tr><td class="no">stå opp</td><td>вставать</td></tr><tr><td class="no">ta på (seg)</td><td>надевать</td></tr><tr><td class="no">ta av (seg)</td><td>снимать</td></tr>
<tr><td class="no">slå på / slå av</td><td>включить / выключить</td></tr><tr><td class="no">gi opp</td><td>сдаваться</td></tr><tr><td class="no">finne ut</td><td>выяснить</td></tr>
<tr><td class="no">vente på</td><td>ждать (кого-то)</td></tr><tr><td class="no">snakke om</td><td>говорить о</td></tr><tr><td class="no">tenke på</td><td>думать о</td></tr></table>`,
  ex: [["Jeg står opp klokka sju.", "Я встаю в семь."], ["Kan du slå på lyset?", "Можешь включить свет?"], ["Jeg venter på bussen.", "Я жду автобус."]],
  pr: [
    C("«вставать»", "stå opp", "stå ned|stå på"), C("«включить свет»", "slå på lyset", "slå av lyset|slå opp lyset"), C("«выключить свет»", "slå av lyset", "slå på lyset|slå ned lyset"),
    C("«Я жду автобус»", "Jeg venter på bussen.", "Jeg venter bussen.|Jeg venter for bussen."), C("«Мы говорим о погоде»", "Vi snakker om været.", "Vi snakker på været.|Vi snakker til været.")
  ] });

G({ id: "pass", sec: "verb", lv: "B2", title: "Пассив: -s и bli", lead: "«Дом построен», «здесь говорят по-норвежски»",
  html: `<p>Пассив — когда важно <b>что</b> сделано, а кто сделал — неважно. Два способа:</p>
<ul><li><b>-s на конце</b> (обычно, в настоящем): <span class="no">Norsk snakkes her.</span> · <span class="no">Det snakkes norsk her.</span></li>
<li><b>bli + причастие</b> (было / будет): <span class="no">Huset <b>ble bygget</b> i 1990.</span> · <span class="no">Bilen <b>blir solgt</b>.</span></li></ul>
<p>Кто сделал — через <b class="no">av</b>: <span class="no">Boka ble skrevet <b>av</b> ham.</span></p>`,
  pr: [
    C("«Дом был построен в 1990»", "Huset ble bygget i 1990.", "Huset bygget i 1990.|Huset ble bygge i 1990."), C("«Здесь говорят по-норвежски»", "Det snakkes norsk her.", "Det snakker norsk her.|Det snakkes her norsk på."),
    C("«Книга была написана им»", "Boka ble skrevet av ham.", "Boka skrev av ham.|Boka ble skrive av ham.")
  ] });

G({ id: "v2", sec: "order", lv: "A1", title: "Глагол — всегда на втором месте (V2)", lead: "Главное правило норвежского порядка слов",
  html: `<p>Представь автобус с рядом мест. <b>Глагол всегда сидит на втором месте</b> — что бы ни стояло на первом (я, сегодня, в Осло).</p>
<table class="gt"><tr><th>1 место</th><th>2 место (глагол)</th><th>дальше</th></tr>
<tr><td class="no">Jeg</td><td class="no"><b>spiser</b></td><td class="no">fisk.</td></tr>
<tr><td class="no">I dag</td><td class="no"><b>spiser</b></td><td class="no">jeg fisk.</td></tr>
<tr><td class="no">I Norge</td><td class="no"><b>bor</b></td><td class="no">jeg nå.</td></tr></table>
<p>Когда на первое место ставим что-то другое, «я» просто пересаживается <b>после глагола</b>. Нельзя: <span class="no">✗ I dag jeg spiser</span>. Можно: <span class="no">✓ I dag spiser jeg</span>.</p>`,
  tip: "В русском слова можно переставлять как угодно. В норвежском — нет: глагол прибит ко второму месту.",
  rule: "v2",
  pr: [
    C("Что правильно?", "I dag spiser jeg fisk.", "I dag jeg spiser fisk.|Jeg i dag spiser fisk."), C("Что правильно?", "I Norge bor jeg nå.", "I Norge jeg bor nå.|Jeg i Norge bor nå."),
    C("Что правильно?", "Nå skal vi gå.", "Nå vi skal gå.|Vi nå skal gå."), C("Что правильно?", "I morgen reiser han til Oslo.", "I morgen han reiser til Oslo.|Han i morgen reiser til Oslo.")
  ] });

G({ id: "q", sec: "order", lv: "A1", title: "Вопросы", lead: "Нет слова-вопроса — глагол первый; есть — глагол второй",
  html: `<p>Два типа вопросов:</p>
<ul><li><b>«Да/нет»</b> — глагол встаёт <b>первым</b>: <span class="no"><b>Bor</b> du her?</span></li>
<li><b>С вопросительным словом</b> — слово первое, а глагол всё равно <b>второй</b> (привет, V2!): <span class="no">Hvor <b>bor</b> du?</span></li></ul>
<table class="gt"><tr><td class="no">hva</td><td>что</td><td class="no">hvor</td><td>где / куда</td></tr><tr><td class="no">hvem</td><td>кто</td><td class="no">hvorfor</td><td>почему</td></tr>
<tr><td class="no">når</td><td>когда</td><td class="no">hvordan</td><td>как</td></tr></table>`,
  ex: [["Hva heter du?", "Как тебя зовут?"], ["Hvorfor lærer du norsk?", "Почему ты учишь норвежский?"], ["Hvordan har du det?", "Как у тебя дела?"]],
  rule: "q",
  pr: [
    C("___ heter du? (что)", "Hva", "Hvor|Hvem"), C("___ bor du? (где)", "Hvor", "Hva|Hvem"), C("___ er det? (кто)", "Hvem", "Hva|Hvor"), C("___ kommer bussen? (когда)", "Når", "Hvem|Hvorfor"),
    C("Что верно?", "Bor du i Oslo?", "Hvor du bor i Oslo?|Bor i Oslo du?"), C("Что верно?", "Hvor bor du?", "Hvor du bor?|Bor hvor du?")
  ] });

G({ id: "neg", sec: "order", lv: "A1", title: "ikke — «не»", lead: "ikke ставится сразу после глагола",
  html: `<p>Слово <b class="no">ikke</b> — «тень» глагола: оно стоит <b>сразу за ним</b>.</p>
<table class="gt"><tr><td class="no">Jeg liker <b>ikke</b> kaffe.</td><td>Я не люблю кофе.</td></tr>
<tr><td class="no">Hun kan <b>ikke</b> svømme.</td><td>Она не умеет плавать.</td></tr>
<tr><td class="no">Vi har <b>ikke</b> bil.</td><td>У нас нет машины.</td></tr></table>
<p>Для «<b>никакой</b>» есть <b class="no">ingen</b>: <span class="no">Jeg har <b>ingen</b> bil.</span> (У меня нет никакой машины.) Тогда «ikke» не нужно.</p>`,
  rule: "neg",
  pr: [
    C("Что верно?", "Jeg har ikke tid.", "Jeg ikke har tid.|Jeg har tid ikke."), C("Что верно?", "Hun kan ikke svømme.", "Hun ikke kan svømme.|Hun kan svømme ikke."),
    C("«У меня нет никакой машины»", "Jeg har ingen bil.", "Jeg har ikke ingen bil.|Jeg ingen har bil."), C("Что верно?", "Vi spiser ikke fisk.", "Vi ikke spiser fisk.|Vi spiser fisk ikke.")
  ] });

G({ id: "sub", sec: "order", lv: "B1", title: "Порядок слов в придаточных", lead: "Там ikke и alltid стоят ПЕРЕД глаголом",
  html: `<p>Придаточное — предложение внутри предложения, после слов <b class="no">at, fordi, når, hvis, om, mens…</b> В нём игра в «глагол на втором месте» заканчивается: сначала подлежащее, потом ikke / alltid / aldri, и только потом глагол.</p>
<table class="gt"><tr><th>Главное</th><td class="no">Han kommer <b>ikke</b>.</td></tr><tr><th>Придаточное</th><td class="no">Jeg vet at han <b>ikke</b> kommer.</td></tr></table>
<p class="tr">Запоминалка: в главном «ikke» бежит <b>за</b> глаголом, в придаточном — <b>перед</b> ним.</p>
<p>Если придаточное идёт первым, то после запятой в главном глагол встаёт сразу: <span class="no">Når det regner, <b>blir</b> jeg hjemme.</span></p>`,
  rule: "sub",
  pr: [
    C("Что верно?", "Jeg vet at han ikke kommer.", "Jeg vet at han kommer ikke.|Jeg vet at ikke han kommer."), C("Что верно?", "Hun sier at hun alltid spiser frokost.", "Hun sier at hun spiser alltid frokost.|Hun sier at alltid hun spiser frokost."),
    C("Что верно?", "Jeg blir hjemme fordi jeg ikke har tid.", "Jeg blir hjemme fordi jeg har ikke tid.|Jeg blir hjemme fordi ikke jeg har tid."), C("Что верно?", "Når det regner, blir jeg hjemme.", "Når det regner, jeg blir hjemme.|Når det regner jeg hjemme blir."),
    C("Что верно?", "Vi vet at de aldri kommer sent.", "Vi vet at de kommer aldri sent.|Vi vet at aldri de kommer sent.")
  ] });

G({ id: "prep", sec: "prep", lv: "A1", title: "Предлоги: i, på, til, fra, med, hos", lead: "Где, куда, откуда, с кем",
  html: `<table class="gt"><tr><td class="no"><b>i</b></td><td>в (страны, города, внутри)</td><td class="no">i Norge, i Oslo, i huset</td></tr>
<tr><td class="no"><b>på</b></td><td>на; места-«занятия»</td><td class="no">på bordet, på skolen, på jobb, på kafé</td></tr>
<tr><td class="no"><b>til</b></td><td>куда; кому</td><td class="no">til Bergen, en gave til deg</td></tr>
<tr><td class="no"><b>fra</b></td><td>откуда</td><td class="no">fra Ukraina</td></tr>
<tr><td class="no"><b>med</b></td><td>с</td><td class="no">kaffe med melk</td></tr>
<tr><td class="no"><b>hos</b></td><td>у (человека)</td><td class="no">hos legen, hos meg</td></tr></table>
<p><b>Страны и города — «i»</b>, а школа, работа, магазин, кафе, острова — <b>«på»</b>. Это просто учим.</p>`,
  rule: "prep",
  pr: [
    C("Jeg bor ___ Norge.", "i", "på|til"), C("Hun er ___ skolen.", "på", "til|hos"), C("Vi reiser ___ Bergen. (в)", "til", "i|fra"), C("Han kommer ___ Ukraina.", "fra", "til|på"),
    C("Jeg er ___ jobb.", "på", "i|hos"), C("Jeg er ___ legen. (у врача)", "hos", "på|med"), C("Jeg drikker kaffe ___ melk.", "med", "på|til")
  ] });

G({ id: "ptime", sec: "prep", lv: "A2", title: "Предлоги времени", lead: "på mandag, i oktober, om kvelden, for to år siden",
  html: `<table class="gt"><tr><td class="no"><b>på</b> mandag</td><td>в понедельник</td></tr>
<tr><td class="no"><b>i</b> oktober, <b>i</b> 2020</td><td>в октябре, в 2020</td></tr>
<tr><td class="no"><b>i</b> dag, <b>i</b> kveld, <b>i</b> helgen</td><td>сегодня, сегодня вечером, на выходных</td></tr>
<tr><td class="no"><b>om</b> kvelden, <b>om</b> sommeren</td><td>по вечерам, летом (вообще)</td></tr>
<tr><td class="no"><b>om</b> to timer</td><td>через два часа</td></tr>
<tr><td class="no">bodd her <b>i</b> to år</td><td>живу здесь два года</td></tr>
<tr><td class="no"><b>for</b> to år <b>siden</b></td><td>два года назад</td></tr>
<tr><td class="no">klokka tre · fra mandag <b>til</b> fredag</td><td>в три · с понедельника по пятницу</td></tr></table>`,
  pr: [
    C("Jeg har bodd her ___ to år. (на протяжении)", "i", "for|om"), C("Han kom hit for to år ___.", "siden", "før|om"), C("Bussen går ___ ti minutter. (через)", "om", "i|på"),
    C("Vi møtes ___ mandag.", "på", "i|om"), C("Jeg reiser ___ oktober.", "i", "på|om"), C("___ morgenen drikker jeg kaffe. (по утрам)", "Om", "Til|Fra")
  ] });
