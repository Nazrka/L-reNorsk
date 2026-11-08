// ===== Ещё мини-диалоги: кафе, магазин, улица, друзья =====
// Формат шага: [реплика собеседника, перевод, верный ответ, перевод, неверный 1, перевод, неверный 2, перевод]
// Добавить свой: ещё один вызов D(иконка, название, уровень, категория, [шаги]). Категории: cafe, shop, street, friends, other
const D = (icon, title, lv, cat, steps) => DIALOGS.push({ icon, title, lv, cat, steps: steps.map(s => [s[0], s[1], [s[2], s[3]], [s[4], s[5]], [s[6], s[7]]]) });

// ☕ Кафе
D("🥞", "Завтрак в кафе", "A1", "cafe", [
  ["Hei, hva kan jeg gi deg?", "Привет, что вам предложить?", "Jeg vil gjerne ha en kaffe og en vaffel.", "Я бы хотел кофе и вафлю.", "Jeg heter Nazar.", "Меня зовут Назар.", "Jeg bor i en stor by.", "Я живу в большом городе."],
  ["Vil du ha melk i kaffen?", "Хотите молоко в кофе?", "Ja takk, litt melk.", "Да, пожалуйста, немного молока.", "Nei, jeg liker ikke sommer.", "Нет, я не люблю лето.", "Det er tirsdag i dag.", "Сегодня вторник."],
  ["Skal du spise her eller ta med?", "Вы будете есть здесь или заберёте с собой?", "Jeg spiser her, takk.", "Я поем здесь, спасибо.", "Jeg har en rød bil.", "У меня красная машина.", "Jeg er tjue år.", "Мне двадцать лет."],
  ["Det blir sytti kroner.", "С вас семьдесят крон.", "Her er kortet mitt.", "Вот моя карта.", "Jeg skal til Oslo i morgen.", "Завтра я еду в Осло.", "Hvor er bussen?", "Где автобус?"]
]);
D("🥤", "Кофе с собой и аллергия", "A2", "cafe", [
  ["Hei! Hva skal det være?", "Привет! Что будете?", "En stor latte til å ta med, takk.", "Большой латте с собой, пожалуйста.", "Jeg heter Maria.", "Меня зовут Мария.", "Jeg har vondt i hodet.", "У меня болит голова."],
  ["Er det noe du ikke tåler?", "Вы что-то не переносите?", "Ja, jeg er allergisk mot nøtter.", "Да, у меня аллергия на орехи.", "Ja, jeg har en katt.", "Да, у меня есть кошка.", "Nei, jeg liker å løpe.", "Нет, я люблю бегать."],
  ["Da anbefaler jeg gulrotkaken. Den har ingen nøtter.", "Тогда рекомендую морковный пирог. В нём нет орехов.", "Det høres bra ut. Jeg tar en bit.", "Звучит хорошо. Возьму кусочек.", "Jeg skriver en bok.", "Я пишу книгу.", "Jeg ser ikke noe tog.", "Я не вижу поезда."]
]);
D("🧾", "Раздельный счёт", "A2", "cafe", [
  ["Var alt bra med maten?", "Всё ли было хорошо с едой?", "Ja, takk. Alt var kjempegodt!", "Да, спасибо. Всё было очень вкусно!", "Nei, jeg går på skole.", "Нет, я хожу в школу.", "Jeg har ikke bil.", "У меня нет машины."],
  ["Ønsker dere regningen?", "Хотите счёт?", "Ja, kan vi betale hver for oss?", "Да, можно заплатить раздельно?", "Nei, jeg vil sove.", "Нет, я хочу спать.", "Jeg skal kjøpe en ny jakke.", "Я собираюсь купить новую куртку."],
  ["Selvfølgelig. Hva har du hatt?", "Конечно. Что вы заказывали?", "Jeg hadde en pizza og en brus.", "У меня была пицца и газировка.", "Jeg har en hund og en katt.", "У меня собака и кошка.", "Det var i går.", "Это было вчера."]
]);

// 🛍️ Магазин
D("👕", "Одежда: примерка", "A2", "shop", [
  ["Kan jeg hjelpe deg?", "Вам помочь?", "Ja, jeg leter etter en varm genser.", "Да, я ищу тёплый свитер.", "Nei, jeg ser på TV.", "Нет, я смотрю телевизор.", "Jeg har en hund.", "У меня есть собака."],
  ["Hvilken størrelse bruker du?", "Какой размер вы носите?", "Jeg bruker medium, tror jeg.", "Я ношу средний, кажется.", "Jeg bor i nærheten.", "Я живу рядом.", "Jeg liker brunost.", "Я люблю брюност."],
  ["Prøverommet er der borte.", "Примерочная вон там.", "Takk. Har dere denne i svart også?", "Спасибо. Есть такой же чёрный?", "Jeg spiser lunsj.", "Я обедаю.", "Det er fredag.", "Сегодня пятница."],
  ["Dessverre er den svarte utsolgt.", "К сожалению, чёрный распродан.", "Det går bra. Jeg tar den blå.", "Ничего. Возьму синий.", "Da går jeg til Oslo.", "Тогда я пойду в Осло.", "Jeg heter Anna.", "Меня зовут Анна."]
]);
D("🎧", "Возврат товара", "B1", "shop", [
  ["Hei, jeg vil gjerne levere tilbake disse hodetelefonene. — Hva er problemet?", "Я хотел бы вернуть эти наушники. — В чём проблема?", "De virker ikke. Lyden er veldig dårlig.", "Они не работают. Звук очень плохой.", "De er veldig fine, og jeg elsker dem.", "Они очень хорошие, и я их обожаю.", "Jeg har aldri sett dem.", "Я никогда их не видел."],
  ["Har du kvitteringen?", "У вас есть чек?", "Ja, her er den. Jeg kjøpte dem for to dager siden.", "Да, вот он. Я купил их два дня назад.", "Nei, jeg skal reise i morgen.", "Нет, завтра я уезжаю.", "Jeg liker ikke kaffe.", "Я не люблю кофе."],
  ["Vil du ha pengene tilbake eller bytte til et nytt par?", "Хотите вернуть деньги или обменять на новую пару?", "Jeg vil gjerne bytte til et nytt par.", "Я бы хотел обменять на новую пару.", "Jeg vil ha en pizza.", "Я хочу пиццу.", "Jeg bor på Setermoen.", "Я живу в Сетермуене."]
]);
D("🔌", "Электроника: зарядка", "A2", "shop", [
  ["Hei! Er det noe jeg kan hjelpe med?", "Привет! Могу чем-то помочь?", "Ja, jeg trenger en lader til telefonen min.", "Да, мне нужна зарядка для телефона.", "Nei, jeg har en lang jakke.", "Нет, у меня длинная куртка.", "Jeg liker å svømme.", "Я люблю плавать."],
  ["Hva slags telefon har du?", "Какой у вас телефон?", "Jeg har en Samsung. Den er ganske ny.", "У меня Samsung. Он довольно новый.", "Jeg har tre brødre.", "У меня три брата.", "Telefonen er i morgen.", "Телефон — завтра."],
  ["Denne passer. Den koster tohundre kroner.", "Эта подойдёт. Она стоит двести крон.", "Greit, jeg tar den. Kan jeg betale med kort?", "Хорошо, беру. Можно картой?", "Jeg bor i Bergen.", "Я живу в Бергене.", "Det regner i dag.", "Сегодня дождь."]
]);

// 🧭 Улица
D("📱", "Потерял телефон", "A2", "street", [
  ["Hei, du ser bekymret ut. Hva har skjedd?", "Привет, ты выглядишь обеспокоенным. Что случилось?", "Jeg har mistet telefonen min.", "Я потерял свой телефон.", "Jeg har kjøpt en ny bil.", "Я купил новую машину.", "Jeg skal spise middag.", "Я собираюсь ужинать."],
  ["Hvor så du den sist?", "Где ты видел его в последний раз?", "På bussen, tror jeg.", "В автобусе, кажется.", "Den er veldig gammel.", "Он очень старый.", "I morgen klokka åtte.", "Завтра в восемь."],
  ["Du kan ringe til busselskapet. Skal jeg låne deg min telefon?", "Можешь позвонить в автобусную компанию. Одолжить тебе мой телефон?", "Ja, tusen takk! Det er veldig snilt.", "Да, большое спасибо! Это очень мило.", "Nei, jeg liker ikke mandager.", "Нет, я не люблю понедельники.", "Jeg har tre søstre.", "У меня три сестры."]
]);
D("📸", "Сфотографируйте нас", "A2", "street", [
  ["Unnskyld, kan du ta et bilde av oss?", "Извините, не могли бы вы нас сфотографировать?", "Ja, selvfølgelig! Smil!", "Да, конечно! Улыбнитесь!", "Nei, jeg heter ikke bilde.", "Нет, меня зовут не «фото».", "Jeg liker ikke brød.", "Я не люблю хлеб."],
  ["Tusen takk! Vet du hvor vi finner en god restaurant?", "Большое спасибо! Вы знаете, где найти хороший ресторан?", "Ja, det er en like rundt hjørnet.", "Да, он сразу за углом.", "Jeg har ikke tid til å sove.", "У меня нет времени спать.", "Jeg har en katt og en hund.", "У меня кошка и собака."],
  ["Er den dyr?", "Он дорогой?", "Nei, ikke så dyr, og maten er veldig god.", "Нет, не очень дорогой, а еда очень вкусная.", "Ja, jeg har en lang jakke.", "Да, у меня длинная куртка.", "Jeg går på skolen.", "Я хожу в школу."]
]);
D("🚂", "На вокзале", "A2", "street", [
  ["Hvilket tog skal du ta?", "На какой поезд вы садитесь?", "Jeg skal ta toget til Trondheim.", "Я поеду на поезде в Тронхейм.", "Jeg skal ha en kaffe.", "Мне надо кофе.", "Jeg liker musikk.", "Я люблю музыку."],
  ["Toget går fra spor tre klokka ti over to.", "Поезд отправляется с третьего пути в десять минут третьего.", "Takk! Er toget forsinket i dag?", "Спасибо! Поезд сегодня опаздывает?", "Jeg er sytten år.", "Мне семнадцать лет.", "Det er pizza til middag.", "На ужин пицца."],
  ["Nei, det er i rute.", "Нет, по расписанию.", "Fint! Da rekker jeg det.", "Отлично! Тогда я успею.", "Jeg har aldri smakt det.", "Я никогда не пробовал это.", "Jeg heter Jonas.", "Меня зовут Йонас."]
]);
D("🚕", "Такси", "A1", "street", [
  ["Hei! Hvor skal du?", "Привет! Куда едем?", "Til flyplassen, takk.", "В аэропорт, пожалуйста.", "Jeg liker is.", "Я люблю мороженое.", "Jeg er student.", "Я студент."],
  ["Har du mye bagasje?", "У вас много багажа?", "Nei, bare én liten koffert.", "Нет, только один маленький чемодан.", "Ja, jeg har en bror.", "Да, у меня есть брат.", "Det er varmt i dag.", "Сегодня жарко."],
  ["Det tar omtrent tjue minutter.", "Это займёт около двадцати минут.", "Perfekt. Hvor mye koster det?", "Отлично. Сколько это стоит?", "Jeg bor i Norge.", "Я живу в Норвегии.", "God natt!", "Спокойной ночи!"]
]);

// 👥 Друзья
D("🎬", "Позвать в кино", "A1", "friends", [
  ["Hei! Har du lyst til å gå på kino i kveld?", "Привет! Хочешь сегодня вечером в кино?", "Ja, gjerne! Hvilken film skal vi se?", "Да, с удовольствием! Какой фильм посмотрим?", "Nei, jeg bor i Bergen.", "Нет, я живу в Бергене.", "Jeg har en blå sko.", "У меня синий ботинок."],
  ["Vi kan se den nye komedien. Den starter klokka sju.", "Можем посмотреть новую комедию. Она начинается в семь.", "Perfekt. Hvor møtes vi?", "Отлично. Где встречаемся?", "Jeg liker ikke bøker.", "Я не люблю книги.", "Jeg har en katt.", "У меня есть кошка."],
  ["Vi møtes utenfor kinoen klokka halv sju.", "Встретимся у кинотеатра в половине седьмого.", "Greit! Vi sees da.", "Хорошо! Тогда увидимся.", "Jeg har en søster som heter Ida.", "У меня есть сестра по имени Ида.", "Det er mandag i går.", "Вчера был понедельник."]
]);
D("🏔️", "Планы на выходные", "A2", "friends", [
  ["Hva skal du gjøre i helgen?", "Что ты будешь делать на выходных?", "Jeg skal på tur i fjellet med noen venner.", "Я иду в поход в горы с друзьями.", "Jeg gjorde ingenting i fjor.", "Я ничего не делал в прошлом году.", "Jeg liker brunost.", "Я люблю брюност."],
  ["Høres gøy ut! Hva slags vær blir det?", "Звучит весело! Какая будет погода?", "Det skal bli sol, men ganske kaldt.", "Будет солнечно, но довольно холодно.", "Det er en stor by.", "Это большой город.", "Jeg har lest en bok.", "Я прочитал книгу."],
  ["Vil du at jeg skal bli med?", "Хочешь, чтобы я пошёл с тобой?", "Ja, det hadde vært supert!", "Да, это было бы здорово!", "Jeg vet ikke hva klokka er.", "Я не знаю, который час.", "Nei, jeg er en lærer.", "Нет, я учитель."]
]);
D("🎮", "Онлайн-игра", "A2", "friends", [
  ["Skal vi spille litt i kveld?", "Сыграем сегодня вечером?", "Ja, hvilket spill vil du spille?", "Да, в какую игру хочешь?", "Jeg har spist fisk.", "Я ел рыбу.", "Det er ei bok.", "Это книга."],
  ["Vi kan spille Minecraft. Har du tid etter middagen?", "Можем сыграть в Minecraft. Есть время после ужина?", "Ja, jeg er ferdig klokka åtte.", "Да, я освобожусь в восемь.", "Nei, jeg har aldri sett deg.", "Нет, я никогда тебя не видел.", "Jeg har en venn i Bergen.", "У меня есть друг в Бергене."],
  ["Fint. Jeg sender deg en invitasjon.", "Хорошо. Я пришлю тебе приглашение.", "Takk! Jeg logger på nå.", "Спасибо! Я захожу сейчас.", "Jeg bruker størrelse medium.", "Я ношу размер средний.", "Det blir femti kroner.", "С вас пятьдесят крон."]
]);
D("🙅", "Отказаться от приглашения", "B1", "friends", [
  ["Hei! Har du lyst til å bli med på fest i kveld?", "Привет! Хочешь пойти сегодня на вечеринку?", "Takk for invitasjonen, men jeg har dessverre ikke tid.", "Спасибо за приглашение, но, к сожалению, у меня нет времени.", "Ja, jeg vil gjerne ha en kopp kaffe.", "Да, я бы хотел чашку кофе.", "Jeg har mange katter.", "У меня много кошек."],
  ["Å nei, hvorfor ikke? Skal du jobbe?", "О нет, почему? Тебе надо работать?", "Nei, jeg må lese til en prøve i morgen.", "Нет, мне надо готовиться к контрольной завтра.", "Ja, jeg har en rød hatt.", "Да, у меня красная шапка.", "Jeg er fra Ukraina.", "Я из Украины."],
  ["Skjønner. Da tar vi det en annen gang.", "Понимаю. Тогда в другой раз.", "Ja, gjerne! Si fra neste gang.", "Да, с удовольствием! Позови меня в следующий раз.", "Jeg heter Nazar.", "Меня зовут Назар.", "Det var en dyr billett.", "Это был дорогой билет."]
]);
D("🏃", "Тренировка с другом", "A2", "friends", [
  ["Hei! Skal vi gå på trening i morgen?", "Привет! Пойдём завтра на тренировку?", "Ja, hva slags trening tenker du på?", "Да, о какой тренировке ты думаешь?", "Jeg skal kjøpe en genser.", "Я собираюсь купить свитер.", "Jeg er en hund.", "Я собака."],
  ["Kanskje løping ute i parken?", "Может, пробежка в парке?", "Det høres bra ut! Hvilken tid passer det?", "Звучит хорошо! Какое время подходит?", "Jeg bor på rommet.", "Я живу в комнате.", "Jeg liker ikke parken, den er gul.", "Мне не нравится парк, он жёлтый."],
  ["Klokka ti. Husk å ta med vann.", "В десять. Не забудь взять воду.", "Selvfølgelig. Jeg tar med to flasker.", "Конечно. Я возьму две бутылки.", "Jeg har spist suppe.", "Я ел суп.", "Nei, jeg er en lærer.", "Нет, я учитель."]
]);
