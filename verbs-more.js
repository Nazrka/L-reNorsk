// ===== Формы для новых глаголов (из слов уровней A2–C1) =====
// Сильные/особые глаголы записаны вручную (IRR), правильные — по классам: e (-et), t (-te), d (-de), ere (-erte).
// Сочетания (stå opp, legge seg, ta på seg) строятся от основного глагола. Загружается ПОСЛЕ extras.js.
(function () {
  const IRR = `stå:står,sto,stått,stå
legge:legger,la,lagt,legg
ta:tar,tok,tatt,ta
gi:gir,ga,gitt,gi
få:får,fikk,fått,få
bli:blir,ble,blitt,bli
slå:slår,slo,slått,slå
dra:drar,dro,dratt,dra
holde:holder,holdt,holdt,hold
sette:setter,satte,satt,sett
ligge:ligger,lå,ligget,ligg
finne:finner,fant,funnet,finn
trekke:trekker,trakk,trukket,trekk
gjøre:gjør,gjorde,gjort,gjør
si:sier,sa,sagt,si
spørre:spør,spurte,spurt,spør
stryke:stryker,strøk,strøket,stryk
gripe:griper,grep,grepet,grip
falle:faller,falt,falt,fall
rekke:rekker,rakk,rukket,rekk
stikke:stikker,stakk,stukket,stikk
slippe:slipper,slapp,sluppet,slipp
bryte:bryter,brøt,brutt,bryt
lide:lider,led,lidd,lid
følge:følger,fulgte,fulgt,følg
tilbringe:tilbringer,tilbrakte,tilbrakt,tilbring
nyse:nyser,nøs,nyst,nys
henge:henger,hang,hengt,heng
ødelegge:ødelegger,ødela,ødelagt,ødelegg
ansette:ansetter,ansatte,ansatt,ansett
utsette:utsetter,utsatte,utsatt,utsett
tilgi:tilgir,tilgav,tilgitt,tilgi
foreslå:foreslår,foreslo,foreslått,foreslå
beskrive:beskriver,beskrev,beskrevet,beskriv
oversette:oversetter,oversatte,oversatt,oversett
oppdra:oppdrar,oppdro,oppdratt,oppdra
innse:innser,innså,innsett,innse
tillate:tillater,tillot,tillatt,tillat
forlate:forlater,forlot,forlatt,forlat
forsvinne:forsvinner,forsvant,forsvunnet,forsvinn
oppstå:oppstår,oppsto,oppstått,oppstå
inneholde:inneholder,inneholdt,inneholdt,innehold
foretrekke:foretrekker,foretrakk,foretrukket,foretrekk
avslå:avslår,avslo,avslått,avslå
påstå:påstår,påsto,påstått,påstå
vedlikeholde:vedlikeholder,vedlikeholdt,vedlikeholdt,vedlikehold
oppholde:oppholder,oppholdt,oppholdt,opphold
delta:deltar,deltok,deltatt,delta
ankomme:ankommer,ankom,ankommet,ankom
avbryte:avbryter,avbrøt,avbrutt,avbryt
beholde:beholder,beholdt,beholdt,behold
forholde:forholder,forholdt,forholdt,forhold
forutsette:forutsetter,forutsatte,forutsatt,forutsett
innebære:innebærer,innebar,innebåret,innebær
medføre:medfører,medførte,medført,medfør
godta:godtar,godtok,godtatt,godta
forekomme:forekommer,forekom,forekommet,forekom
gjennomgå:gjennomgår,gjennomgikk,gjennomgått,gjennomgå
redegjøre:redegjør,redegjorde,redegjort,redegjør
gjengi:gjengir,gjengav,gjengitt,gjengi
bosette:bosetter,bosatte,bosatt,bosett
opprettholde:opprettholder,opprettholdt,opprettholdt,oppretthold
unngå:unngår,unngikk,unngått,unngå
oppnå:oppnår,oppnådde,oppnådd,oppnå
tilby:tilbyr,tilbød,tilbudt,tilby
bidra:bidrar,bidro,bidratt,bidra
fastslå:fastslår,fastslo,fastslått,fastslå
iverksette:iverksetter,iverksatte,iverksatt,iverksett
underbygge:underbygger,underbygde,underbygd,underbygg
tilrettelegge:tilrettelegger,tilrettela,tilrettelagt,tilrettelegg
verdsette:verdsetter,verdsatte,verdsatt,verdsett
avta:avtar,avtok,avtatt,avta
tilsi:tilsier,tilsa,tilsagt,tilsi
pålegge:pålegger,påla,pålagt,pålegg
bestride:bestrider,bestred,bestridt,bestrid
etterspørre:etterspør,etterspurte,etterspurt,etterspør
anslå:anslår,anslo,anslått,anslå
skattlegge:skattlegger,skattla,skattlagt,skattlegg
kartlegge:kartlegger,kartla,kartlagt,kartlegg
gjenvinne:gjenvinner,gjenvant,gjenvunnet,gjenvinn
misligholde:misligholder,misligholdt,misligholdt,mislighold
frita:fritar,fritok,fritatt,frita
frifinne:frifinner,frifant,frifunnet,frifinn
overskride:overskrider,overskred,overskredet,overskrid
bestå:består,bestod,bestått,bestå
utgjøre:utgjør,utgjorde,utgjort,utgjør
vedta:vedtar,vedtok,vedtatt,vedta
ivareta:ivaretar,ivaretok,ivaretatt,ivareta
tydeliggjøre:tydeliggjør,tydeliggjorde,tydeliggjort,tydeliggjør
sannsynliggjøre:sannsynliggjør,sannsynliggjorde,sannsynliggjort,sannsynliggjør
synliggjøre:synliggjør,synliggjorde,synliggjort,synliggjør
bevisstgjøre:bevisstgjør,bevisstgjorde,bevisstgjort,bevisstgjør
muliggjøre:muliggjør,muliggjorde,muliggjort,muliggjør
godtgjøre:godtgjør,godtgjorde,godtgjort,godtgjør
omgjøre:omgjør,omgjorde,omgjort,omgjør
anskueliggjøre:anskueliggjør,anskueliggjorde,anskueliggjort,anskueliggjør
etterkomme:etterkommer,etterkom,etterkommet,etterkom
tilsidesette:tilsidesetter,tilsidesatte,tilsidesatt,tilsidesett
forbeholde:forbeholder,forbeholdt,forbeholdt,forbehold
avstedkomme:avstedkommer,avstedkom,avstedkommet,avstedkom
sammenfalle:sammenfaller,sammenfalt,sammenfalt,sammenfall
tilgodese:tilgodeser,tilgodeså,tilgodesett,tilgodes
unnlate:unnlater,unnlot,unnlatt,unnlat
vektlegge:vektlegger,vektla,vektlagt,vektlegg
imøtegå:imøtegår,imøtegikk,imøtegått,imøtegå
tilkjennegi:tilkjennegir,tilkjennega,tilkjennegitt,tilkjennegi
iaktta:iakttar,iakttok,iakttatt,iaktta
forbigå:forbigår,forbigikk,forbigått,forbigå
foregripe:foregriper,foregrep,foregrepet,foregrip
etterlate:etterlater,etterlot,etterlatt,etterlat
ettergå:ettergår,ettergikk,ettergått,ettergå
imøtekomme:imøtekommer,imøtekom,imøtekommet,imøtekom
løsrive:løsriver,løsrev,løsrevet,løsriv
sammenholde:sammenholder,sammenholdt,sammenholdt,sammenhold
avvike:avviker,avvek,avveket,avvik
vedgå:vedgår,vedgikk,vedgått,vedgå
grunngi:grunngir,grunngav,grunngitt,grunngi
framskrive:framskriver,framskrev,framskrevet,framskriv
fravike:fraviker,fravek,fraveket,fravik
tillegge:tillegger,tilla,tillagt,tillegg
frembringe:frembringer,frembrakte,frembrakt,frembring
hensynta:hensyntar,hensyntok,hensyntatt,hensynta
pådra:pådrar,pådro,pådratt,pådra
avskjære:avskjærer,avskar,avskåret,avskjær
foreta:foretar,foretok,foretatt,foreta
fastholde:fastholder,fastholdt,fastholdt,fasthold
tilskrive:tilskriver,tilskrev,tilskrevet,tilskriv
overdrive:overdriver,overdrev,overdrevet,overdriv
overvinne:overvinner,overvant,overvunnet,overvinn
anta:antar,antok,antatt,anta
trå:trår,trådte,trådt,trå
skru:skrur,skrudde,skrudd,skru
grue:gruer,grudde,grudd,gru
bety:betyr,betydde,betydd,bety
kle:kler,kledde,kledd,kle
spre:sprer,spredde,spredd,spre
innfri:innfrir,innfridde,innfridd,innfri
forebygge:forebygger,forebygde,forebygd,forebygg
avhenge:avhenger,avhang,avhengt,avheng
snu:snur,snudde,snudd,snu
gre:grer,gredde,gredd,gre
hete:heter,het,hett,het
brenne:brenner,brant,brent,brenn
gjenta:gjentar,gjentok,gjentatt,gjenta
forby:forbyr,forbød,forbudt,forby
avsette:avsetter,avsatte,avsatt,avsett`;
  const CLS = {
    e: `dusje handle pugge rette pendle bremse krysse behandle hoste overnatte utforske smelte bekymre skuffe trøste slappe samarbeide avslutte lagre slette strikke hekle blande løfte sovne varsle oppmuntre forvente forhandle lade vanne hakke skrelle brette lufte tulle rydde varme pakke sjekke koble laste logge vente skjerpe huske regne tørke skifte oppdage passe flytte love utvikle takke oppfatte benytte mellomlande forsikre kontakte avskaffe bearbeide utvide begrense forplikte antyde forlenge innhente utarbeide anklage forurense samle tilpasse støtte beskytte påvirke bekrefte erstatte hevde fremheve etterstrebe motvirke håndheve bevilge kvalitetssikre innvilge omregne samordne anskaffe framskaffe overvåke saksbehandle forvalte videreutvikle opparbeide beregne avlaste avregne avverge begrunne etterforske avhende reforhandle påklage sikte benekte betrakte kringkaste granske tilstrebe gjenspeile understreke forkaste avdekke befeste forankre sammenfatte utlede utjevne innskrenke foranledige rokke innordne omfatte utpensle forfekte avlede henlede nedtone avspeile gjennomsyre prege anføre anfekte påskynde fordre videreformidle forplante tilspisse omfavne framheve overskygge hjemle stadfeste utdype fremme hindre svekke styrke forverre avgrense kjennetegne fordype bekjempe ofre angre sammenligne glede forhindre innlemme tilslutte henspeile vaske nekte forandre forbedre innrømme villede minske skaffe utforme utelukke motregne forringe oppildne bade dekke gifte kaste klippe krangle puste miste lukte pusse bevege vekke feste`,
    t: `utføre avbestille undersøke stole nøle sammenstille påvise omstille fordele fylle stelle røre tine helle skylle låse melde spare forberede bestemme venne skille lese klare bruke sende søke låne overtale ombestemme stille mene skjønne avklare øke påpeke avvise oppfylle uttrykke dømme bevare føre avlyse erkjenne tilhøre tilsvare forsvare godkjenne anbefale samsvare omfordele forbruke saksøke belyse tilbakevise sidestille tilsløre unnskylde mistenke tåle anerkjenne avsløre tvile henvise fremkalle utløse påberope forvrenge vedvare høre føle møte lete betale oppføre innføre fullføre videreføre tilbakeføre gjennomføre overbevise dele hilse måle peke smake skynde skape`,
    d: `bøye oppleve prøve øve etterleve oppheve etterprøve utøve undergrave leie fordreie oppveie avveie kreve støvsuge feie`
  };
  const IDIOMS = new Set(["ha is i magen", "gå som katten rundt grøten", "slå to fluer i ett smekk", "slå to fluer i én smekk", "gå på en smell", "komme på banen", "gå i seg selv", "være på høy tid", "trå støtt", "falle i smak", "ta seg sammen"]);

  const table = new Map(VERBS.map(v => [v[0], v]));
  const forms = {}; IRR.split("\n").forEach(l => { const i = l.indexOf(":"); forms[l.slice(0, i)] = l.slice(i + 1).split(","); });
  const cls = {}; Object.entries(CLS).forEach(([c, s]) => s.split(/\s+/).forEach(w => { if (w && !w.endsWith("_")) cls[w] = c; }));
  const imp = (stem, inf) => {
    if (/(.)\1$/.test(stem)) return /mm$/.test(stem) ? stem.slice(0, -1) : stem;               // glemme → glem, pakke → pakk
    if (/[^aeiouyæøå][lnrm]$/.test(stem) && !/(gn|vn)$/.test(stem)) return inf;                  // handle, åpne, lagre
    return stem;
  };
  function gen(inf) {
    if (forms[inf]) return forms[inf];
    if (table.has(inf)) return table.get(inf).slice(1, 5);
    let c = cls[inf]; if (!c && /ere$/.test(inf)) c = "r";
    if (!c || !inf.endsWith("e") && c !== "d") return null;
    const stem = inf.endsWith("e") ? inf.slice(0, -1) : inf, pres = inf + "r";
    if (c === "r") return [pres, stem + "te", stem + "t", stem];
    if (c === "e") return [pres, stem + "et", stem + "et", imp(stem, inf)];
    if (c === "t") { const s2 = /(.)\1$/.test(stem) && !/tt$/.test(stem) ? stem.slice(0, -1) : stem; return [pres, s2 + "te", s2 + "t", imp(stem, inf)]; }
    if (c === "d") return [pres, stem + "de", stem + "d", imp(stem, inf)];
    return null;
  }
  function build(inf) {
    const t = inf.split(" ");
    if (t.length === 1) return gen(inf);
    if (t.length > 4) return null;
    const b = gen(t[0]); if (!b) return null;
    const rest = " " + t.slice(1).join(" ");
    return [b[0] + rest, b[1] + rest, b[2] + rest, b[3] + rest.replace(/\bseg\b/, "deg")];
  }
  let added = 0, skipped = [];
  ["A1", "A2", "B1", "B2", "C1"].forEach(lv => (WORDS[lv] || []).forEach(w => {
    if (!w[0].startsWith("å ")) return;
    const inf = w[0].slice(2);
    if (table.has(inf) || IDIOMS.has(inf)) return;
    const f = build(inf);
    if (!f) { skipped.push(inf); return; }
    const v = [inf, f[0], f[1], f[2], f[3], w[1]];
    VERBS.push(v); table.set(inf, v); added++;
    (VLEVEL[lv] = VLEVEL[lv] || []).push(inf);
  }));
  globalThis.VERBS_ADDED = added; globalThis.VERBS_SKIPPED = skipped;
})();
