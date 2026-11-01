// ===== ДАННЫЕ NORSK =====
// Чтобы добавить историю — допиши объект в STORIES. Слова — в WORDS[уровень]. Глагол — строку в VERBS.

const STORIES = [
  { id: "skole", title: "Min skolehverdager", ru: "Мои школьные будни", level: "A2",
    no: "Jeg går på videregående skole i Sjøvegan. Hver morgen står jeg opp tidlig, spiser en rask frokost og gjør meg klar. Jeg går på skolen sammen med min lillesøster Mira, og vi er i samme klasse. På skolen lærer vi mange forskjellige fag, og etter leksjonene liker jeg å sitte med laptopen, skrive kode eller slappe av med musikk.",
    tr: "Я учусь в старшей школе в Шевегане. Каждое утро я рано встаю, быстро завтракаю и собираюсь. Я иду в школу вместе с моей младшей сестрой Мирой, и мы в одном классе. В школе мы изучаем много разных предметов, а после уроков я люблю посидеть за ноутбуком, написать код или расслабиться под музыку.",
    vocab: [["videregående skole","старшая школа"],["stå opp","вставать"],["tidlig","рано"],["rask","быстрый"],["frokost","завтрак"],["gjøre seg klar","собираться"],["lillesøster","младшая сестра"],["fag","предмет"],["leksjon","урок"],["slappe av","расслабляться"]] },
  { id: "bergen", title: "Min tur til Bergen", ru: "Моя поездка в Берген", level: "A2",
    no: "I oktober tok jeg fly fra Tromsø til Bergen. Det var en spennende tur og en flott opplevelse å reise alene. I Bergen møtte jeg en god venn og mange andre hyggelige folk. Vi gikk mye rundt i byen, så på de gamle trehusene, kjente på atmosfæren og drakk god kaffe på en kafé.",
    tr: "В октябре я летел на самолете из Тромсё в Берген. Это была захватывающая поездка и крутой опыт путешествия в одиночку. В Бергене я встретил хорошего друга и много других приятных людей. Мы много гуляли по городу, смотрели на старые деревянные дома, впитывали атмосферу и пили вкусный кофе в кафе.",
    vocab: [["ta fly","лететь самолётом"],["spennende","захватывающий"],["opplevelse","впечатление, опыт"],["reise alene","путешествовать одному"],["hyggelig","приятный"],["trehus","деревянный дом"],["atmosfære","атмосфера"]] },
  { id: "hjemme", title: "Hjemme og familieliv", ru: "Дома и семейная жизнь", level: "A2",
    no: "Ettersom dagen er over, kommer jeg hjem hvor det er varmt og koselig. Min mamma Alina lager alltid noe godt å spise, og vi prater om hvordan dagen vår har gått. Noen ganger hjelper jeg til hjemme, andre ganger setter jeg meg med gitaren eller ser på noe kult på laptopen før jeg legger meg.",
    tr: "Когда день подходит к концу, я возвращаюсь домой, где тепло и уютно. Моя мама Алина всегда готовит что-нибудь вкусное поесть, и мы болтаем о том, как прошёл наш день. Иногда я помогаю по дому, а иногда сажусь за гитару или смотрю что-нибудь интересное на ноутбуке перед сном.",
    vocab: [["ettersom","так как; по мере того как"],["varm","тёплый"],["koselig","уютный"],["lage mat","готовить"],["prate","болтать"],["hjelpe til","помогать"],["gitar","гитара"],["legge seg","ложиться спать"]] },
  { id: "vaer", title: "Været og naturen i nord", ru: "Погода и природа на севере", level: "B1",
    no: "Her i nord kan været skifte veldig fort. Ene øyeblikket er det sol og fint, og neste øyeblikk regner det eller blåser sterkt. Men jeg liker denne naturen. Det er rolig her, luften er frisk, og fjellene rundt gir en spesiell, kulstemning – spesielt når høsten kommer med sine mørke kvelder.",
    tr: "Здесь, на севере, погода может меняться очень быстро. В один момент солнце и красота, а в следующий — идет дождь или дует сильный ветер. Но мне нравится эта природа. Здесь тихо, воздух свежий, а окружающие горы создают особенную, крутую атмосферу — особенно когда приходит осень с её тёмными вечерами.",
    vocab: [["vær","погода"],["skifte","меняться"],["øyeblikk","момент"],["regne","идти (о дожде)"],["blåse","дуть"],["frisk","свежий"],["fjell","гора"],["høst","осень"],["kveld","вечер"]] },
  { id: "teknologi", title: "Teknologi og koding", ru: "Технологии и кодинг", level: "B1",
    no: "Jeg liker å skape ting selv. Derfor bruker jeg mye tid på programmering, utvikling av egne apper og koding i Roblox Studio. Det er kult å se hvordan en idé, noen linjer kode og riktig logikk forvandles til et ekte, fungerende program som du kan bruke hver dag.",
    tr: "Я люблю создавать вещи своими руками. Поэтому я трачу много времени на программирование, разработку собственных приложений и кодинг в Roblox Studio. Это круто — видеть, как идея, несколько строк кода и правильная логика превращаются в реальную, работающую программу, которую ты можешь использовать каждый день.",
    vocab: [["skape","создавать"],["derfor","поэтому"],["programmering","программирование"],["utvikling","разработка"],["linje","строка, линия"],["forvandles","превращаться"],["ekte","настоящий"],["fungerende","работающий"]] }
];

// Слова: [норвежский, русский, тема]
const WORDS = {
  A1: [["hei","привет","разговорник"],["takk","спасибо","разговорник"],["unnskyld","извините","разговорник"],["ja","да","разговорник"],["nei","нет","разговорник"],["mamma","мама","семья"],["pappa","папа","семья"],["søster","сестра","семья"],["bror","брат","семья"],["skole","школа","школа"],["bok","книга","школа"],["vann","вода","еда"],["brød","хлеб","еда"],["kaffe","кофе","еда"],["hus","дом","дом"],["dag","день","время"],["natt","ночь","время"],["stor","большой","прилагательные"],["liten","маленький","прилагательные"],["god","хороший","прилагательные"]],
  A2: [["frokost","завтрак","еда"],["middag","обед/ужин","еда"],["venn","друг","люди"],["by","город","место"],["tur","поездка","путешествие"],["fly","самолёт","путешествие"],["vær","погода","природа"],["regn","дождь","природа"],["sol","солнце","природа"],["klasse","класс","школа"],["fag","предмет","школа"],["musikk","музыка","хобби"]],
  B1: [["opplevelse","опыт, впечатление","абстрактное"],["utvikling","развитие","абстрактное"],["mulighet","возможность","абстрактное"],["forskjell","разница","абстрактное"],["følelse","чувство","абстрактное"],["samfunn","общество","общество"],["arbeid","работа","общество"],["ansvar","ответственность","абстрактное"]],
  B2: [["tilværelse","существование","абстрактное"],["hensyn","учёт, соображение","абстрактное"],["utfordring","вызов","абстрактное"],["påvirke","влиять","глаголы"],["omstendighet","обстоятельство","абстрактное"]],
  C1: [["tilbøyelighet","склонность","абстрактное"],["avgjørende","решающий","прилагательные"],["tilsynelatende","по-видимому","наречия"],["omfattende","обширный","прилагательные"]]
};

// Глаголы: [инфинитив, презенс, претерит, причастие (для perfekt), императив, русский]
const VERBS = [
  ["være","er","var","vært","vær","быть"],["ha","har","hadde","hatt","ha","иметь"],["gå","går","gikk","gått","gå","идти"],
  ["spise","spiser","spiste","spist","spis","есть"],["drikke","drikker","drakk","drukket","drikk","пить"],["lage","lager","laget","laget","lag","делать, готовить"],
  ["bo","bor","bodde","bodd","bo","жить"],["reise","reiser","reiste","reist","reis","путешествовать"],["se","ser","så","sett","se","смотреть"],
  ["komme","kommer","kom","kommet","kom","приходить"],["like","liker","likte","likt","lik","нравиться"],["skrive","skriver","skrev","skrevet","skriv","писать"],
  ["lære","lærer","lærte","lært","lær","учить"],["hjelpe","hjelper","hjalp","hjulpet","hjelp","помогать"],["møte","møter","møtte","møtt","møt","встречать"],
  ["stå","står","sto","stått","stå","стоять"],["sove","sover","sov","sovet","sov","спать"],["bruke","bruker","brukte","brukt","bruk","использовать"]
];
const TENSES = [["Infinitiv","Инфинитив"],["Presens","Настоящее"],["Preteritum","Прошедшее простое"],["Perfektum","Перфект"],["Pluskvamperfekt","Плюсквамперфект"],["Futurum","Будущее"],["Imperativ","Повелительное"]];
const verbForms = v => [ "å "+v[0], v[1], v[2], "har "+v[3], "hadde "+v[3], "skal "+v[0], v[4] ];

// Предложения для конструктора: [норвежский, русский]
const SENTENCES = [
  ["Jeg går på videregående skole","Я учусь в старшей школе"],["Hver morgen står jeg opp tidlig","Каждое утро я рано встаю"],
  ["Vi er i samme klasse","Мы в одном классе"],["I oktober tok jeg fly til Bergen","В октябре я полетел в Берген"],
  ["Vi drakk god kaffe på en kafé","Мы пили вкусный кофе в кафе"],["Det er varmt og koselig hjemme","Дома тепло и уютно"],
  ["Her i nord kan været skifte fort","Здесь на севере погода быстро меняется"],["Jeg liker å skape ting selv","Я люблю создавать вещи сам"]
];

const GRAMMAR = [
  { title: "Глагол на втором месте (V2)", html: "<p>Глагол — <b>всегда второй «стул»</b> в повествовательном предложении. Первым может быть что угодно.</p><p><i>Jeg spiser fisk.</i> → <i>I dag spiser jeg fisk.</i> (не «I dag jeg spiser»).</p>" },
  { title: "Вопросы", html: "<p>Без вопросительного слова глагол идёт первым: <i>Bor du her?</i> С вопросительным словом — вторым: <i>Hvor bor du?</i></p><p>Слова: hva (что), hvor (где), hvem (кто), hvorfor (почему), når (когда), hvordan (как).</p>" },
  { title: "Отрицание ikke", html: "<p>В главном предложении <b>ikke</b> после глагола: <i>Jeg liker ikke kaffe.</i> В придаточном — перед ним: <i>…at han ikke kommer.</i></p>" },
  { title: "Глагол не спрягается по лицам", html: "<p>jeg bor, du bor, han bor, vi bor, dere bor, de bor — форма одна.</p>" },
  { title: "Инфинитив и «å»", html: "<p>Инфинитив с <b>å</b>: <i>Jeg liker å lese.</i> После модальных (kan, vil, skal, må, bør) «å» не нужно: <i>Jeg kan gå.</i></p>" },
  { title: "Прошедшее время", html: "<p><b>Preteritum</b> — завершённое действие в прошлом: <i>Jeg spiste i går.</i></p><p><b>Perfektum</b> = har + причастие: <i>Jeg har spist.</i> <b>Pluskvamperfekt</b> = hadde + причастие: <i>Jeg hadde spist før han kom.</i></p>" },
  { title: "Слабые и сильные глаголы", html: "<p>Слабые: <i>spise – spiste – spist</i>, <i>bo – bodde – bodd</i>. Сильные меняют корень: <i>drikke – drakk – drukket</i>, <i>skrive – skrev – skrevet</i>. Сильные учим наизусть.</p>" },
  { title: "Будущее", html: "<p>Отдельной формы нет: <b>skal / vil</b> + инфинитив (<i>Jeg skal reise i morgen</i>) или настоящее время с наречием (<i>Jeg reiser i morgen</i>).</p>" },
  { title: "Повелительное наклонение", html: "<p>Корень без «-e»: <i>spise → spis!</i>, <i>komme → kom!</i>, <i>gå → gå!</i> Вежливо: <i>Vær så snill å vente.</i></p>" },
  { title: "Род и артикли: en / ei / et", html: "<p>en bil, ei bok (или en bok), et hus. Определённый артикль — суффикс: <i>bilen, boka, huset</i>. Множественное: <i>biler, bøker, hus</i>.</p><p>Учи существительное сразу с артиклем.</p>" },
  { title: "Прилагательные", html: "<p>Согласуются с родом и числом: <i>en stor bil, et stort hus, store hus</i>. С определённой формой: <i>den store bilen, det store huset</i>.</p>" },
  { title: "Притяжательные", html: "<p>Стоят после существительного или перед ним: <i>min bok, mitt hus, mine bøker</i>. Для подлежащего — <b>sin/si/sitt</b>: <i>Han tar sin jakke.</i></p>" },
  { title: "Местоимения", html: "<p>jeg/meg, du/deg, han/ham, hun/henne, vi/oss, dere/dere, de/dem. <i>Jeg ser henne.</i> <i>Hun ser meg.</i></p>" },
  { title: "Предлоги места и времени", html: "<p><i>i</i> (в), <i>på</i> (на, в), <i>til</i> (к, в), <i>fra</i> (из), <i>med</i> (с). Города: <i>i Bergen, til Bergen, fra Bergen</i>. Время: <i>på mandag, om kvelden, i oktober</i>.</p>" },
  { title: "Придаточные: at, fordi, når, hvis", html: "<p>В придаточном порядок прямой и «ikke» перед глаголом: <i>Jeg vet at han ikke kommer.</i> <i>Jeg blir hjemme fordi det regner.</i></p>" },
  { title: "Инверсия после наречий", html: "<p>Если первым стоит наречие или обстоятельство, подлежащее уходит после глагола: <i>Derfor bruker jeg mye tid.</i> <i>Nå skal vi gå.</i></p>" }
];
