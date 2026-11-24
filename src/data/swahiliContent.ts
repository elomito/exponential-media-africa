import type {
  DivisionMeta,
  InsightArticle,
  PortfolioCategory,
  PortfolioProject,
  ServiceItem,
} from '../types/cms';
import type { ServiceDetailRecord } from './serviceDetails';

export const SW_CATEGORIES: Record<'All' | PortfolioCategory, string> = {
  All: 'Yote',
  'Influencer Campaigns': 'Kampeni za Washawishi',
  'Brand Activations': 'Uhamasishaji wa Chapa',
  Events: 'Matukio',
  'Digital Marketing': 'Masoko ya Kidijitali',
  'Commercial Production': 'Uzalishaji wa Kibiashara',
  Branding: 'Utambulisho wa Chapa',
  Photography: 'Upigaji Picha',
  Videography: 'Utengenezaji wa Video',
};

export const SW_ARTICLE_CATEGORIES: Record<string, string> = {
  All: 'Yote',
  'Industry Articles': 'Makala za Sekta',
  'Marketing Insights': 'Uchambuzi wa Masoko',
  'Creative Trends': 'Mielekeo ya Ubunifu',
  'Company Updates': 'Habari za Shirika',
  'Educational Content': 'Maudhui ya Elimu',
};

export const SW_SERVICES: Record<
  string,
  Pick<ServiceItem, 'title' | 'problemSolved' | 'description'>
> = {
  'Social Media Management': {
    title: 'Usimamizi wa Mitandao ya Kijamii',
    problemSolved:
      'Hubadilisha machapisho yasiyo na mpangilio kuwa ushiriki endelevu wa hadhira na ukuaji wa chapa.',
    description:
      'Ubunifu wa maudhui, ratiba na uchapishaji, usimamizi wa jamii, ufuatiliaji wa sifa ya chapa, usimamizi wa Meta (Instagram na Facebook) na TikTok, pamoja na ripoti za utendaji.',
  },
  'Content Creation & Marketing': {
    title: 'Uundaji wa Maudhui na Masoko',
    problemSolved:
      'Huandaa hadithi zinazowalenga wateja ili kuimarisha uaminifu na utambuzi wa chapa.',
    description:
      'Uandishi wa matangazo, usanifu wa taswira, upigaji picha na video za kibiashara, michoro ya mwendo, uandishi wa makala, na mikakati ya usambazaji.',
  },
  'Influencer Marketing': {
    title: 'Masoko Kupitia Washawishi',
    problemSolved:
      'Huunganisha chapa na washawishi wanaoaminika na hadhira zao halisi.',
    description:
      'Uchujaji na uteuzi wa washawishi, mipango ya kampeni, usimamizi wa mikataba na maudhui, ufuatiliaji wa matokeo, na ripoti za kampeni.',
  },
  'Media Buying': {
    title: 'Ununuzi wa Nafasi za Matangazo',
    problemSolved:
      'Hufikisha ujumbe wa kampeni kwa wanunuzi sahihi kwa tija bora ya bajeti ya matangazo.',
    description:
      'Mipango ya matangazo ya kulipia, ulengaji sahihi wa hadhira, ugawaji wa bajeti, uboreshaji endelevu wa matangazo, na ripoti wazi za uwekezaji.',
  },
  'Brand Activation': {
    title: 'Uhamasishaji wa Chapa',
    problemSolved:
      'Hugeuza uelewa wa chapa kuwa ushiriki wa moja kwa moja na majaribio halisi ya bidhaa.',
    description:
      'Kampeni za matukio ya moja kwa moja, uzinduzi wa matawi, maonyesho katika maduka makubwa, ugawaji wa sampuli, na matangazo ya ana kwa ana.',
  },
  'Visual Design': {
    title: 'Usanifu wa Taswira',
    problemSolved:
      'Huunganisha taswira ya chapa kupitia usanifu bora wa kidijitali na uchapishaji.',
    description:
      'Usanifu wa nembo na miongozo kamili ya chapa, mabango, brosha, vifungashio, michoro ya mitandao ya kijamii, na vifaa vya ofisi.',
  },
};

export const SW_SERVICE_SLUGS: Record<string, string> = {
  'social-media-management': 'Usimamizi wa Mitandao ya Kijamii',
  'content-creation-and-marketing': 'Uundaji wa Maudhui na Masoko',
  'influencer-marketing': 'Masoko Kupitia Washawishi',
  'media-buying': 'Ununuzi wa Nafasi za Matangazo',
  'brand-activation': 'Uhamasishaji wa Chapa',
  'visual-design': 'Usanifu wa Taswira',
};

export const SW_DIVISIONS: Record<
  string,
  Pick<DivisionMeta, 'name' | 'shortName' | 'tagline' | 'description' | 'ecosystemRole' | 'services'>
> = {
  creative: {
    name: 'Usanifu wa Taswira na Utambulisho wa Chapa',
    shortName: 'Usanifu wa Taswira',
    tagline: 'Usanifu Thabiti. Athari ya Kudumu.',
    description:
      'Utambulisho wa kipekee na nyenzo za mawasiliano—kuanzia usanifu wa nembo na miongozo ya chapa hadi mabango, brosha, machapisho ya matangazo, na vifungashio.',
    ecosystemRole:
      'Hujenga utambuzi imara wa chapa na mshikamano wa taswira katika majukwaa ya kidijitali na uchapishaji.',
    services: [
      'Usanifu wa Taswira',
      'Mifumo ya nembo na utambulisho wa chapa',
      'Usanifu wa kidijitali na uchapishaji',
      'Mabango na vifaa vya maonyesho',
      'Brosha na wasifu wa kampuni',
      'Vifungashio na bidhaa zenye chapa',
    ],
  },
  estudios: {
    name: 'Uundaji wa Maudhui na Masoko',
    shortName: 'Maudhui na Masoko',
    tagline: 'Hadithi Zinazojenga Chapa na Kuchochea Hatua.',
    description:
      'Ubunifu wa dhana kuanzia mwanzo, uandishi, upigaji picha na video za kibiashara, michoro ya mwendo, na usimulizi wa kidijitali kwa kampeni zenye tija.',
    ecosystemRole:
      'Hugeuza ujumbe wa chapa kuwa picha, video, na uandishi wa hali ya juu unaoendana na kila jukwaa.',
    services: [
      'Uundaji wa Maudhui na Masoko',
      'Upigaji picha za kibiashara',
      'Utengenezaji na uhariri wa video',
      'Uandishi wa matangazo na hati',
      'Michoro ya mwendo na uhuishaji',
      'Mkakati wa maudhui ya majukwaa mengi',
    ],
  },
  marketing: {
    name: 'Mitandao ya Kijamii, Washawishi na Matangazo',
    shortName: 'Mitandao na Washawishi',
    tagline: 'Uwepo wa Kudumu. Ufikiaji Sahihi.',
    description:
      'Usimamizi wa kimkakati wa Meta na TikTok, ushirikiano na washawishi waliohakikiwa, na ununuzi wa nafasi za matangazo unaolenga kuongeza tija ya uwekezaji.',
    ecosystemRole:
      'Huunganisha hadhira kupitia machapisho ya kila siku, sauti za washawishi wanaoaminika, na matangazo yaliyolengwa.',
    services: [
      'Usimamizi wa Mitandao ya Kijamii',
      'Masoko Kupitia Washawishi',
      'Ununuzi wa Nafasi za Matangazo',
      'Usimamizi wa jamii na sifa ya chapa',
      'Ulengaji wa hadhira na uboreshaji',
      'Ripoti za utendaji wa kampeni',
    ],
  },
  emtc: {
    name: 'Uhamasishaji wa Chapa',
    shortName: 'Uhamasishaji wa Chapa',
    tagline: 'Kuleta Chapa Karibu na Wateja.',
    description:
      'Ushiriki wa moja kwa moja wa walaji ikiwemo uzinduzi wa matawi, matangazo ndani ya maduka makubwa, ugawaji wa sampuli, na warsha za washawishi.',
    ecosystemRole:
      'Hugeuza mvuto wa kidijitali kuwa ushiriki wa ana kwa ana na majaribio ya moja kwa moja ya bidhaa.',
    services: [
      'Uhamasishaji wa Chapa',
      'Matangazo ya ufunguzi wa matawi',
      'Ziara za ugawaji wa sampuli',
      'Kampeni za maduka makubwa',
      'Matukio ya uzoefu wa chapa',
      'Mabalozi wa chapa na usimamizi',
    ],
  },
};

export const SW_CORE_VALUES: Record<string, { title: string; summary: string; detail: string }> = {
  innovative: {
    title: 'Ubunifu',
    summary: 'Suluhu bunifu zinazojibu kila hitaji la mawasiliano na matangazo.',
    detail:
      'Tunaweka ubunifu mbele katika kila mradi—tukibuni mawasiliano na matangazo yanayokidhi mahitaji mahususi ya kila mteja.',
  },
  dependable: {
    title: 'Utegemewa',
    summary: 'Ari yetu ya "Tunaweza" hujenga imani na ushirikiano wa muda mrefu.',
    detail:
      'Ari yetu ya kazi yenye ufanisi inatufanya tuwe wabia wa kuaminika huku tukikuza ushirikiano thabiti na wateja.',
  },
  ethical: {
    title: 'Maadili',
    summary: 'Mahusiano ya kudumu yanayojengwa juu ya heshima, uwazi na uadilifu.',
    detail:
      'Tunaheshimiana na kutambua kuwa mafanikio yetu yanategemea uwazi, uadilifu, na uaminifu kwa wateja na washawishi.',
  },
  accountable: {
    title: 'Uwajibikaji',
    summary: 'Uraia mwema wa shirika katika kila jamii tunamofanya kazi.',
    detail:
      'Tunajitahidi kuwa majirani wema na wawajibikaji katika masoko ya Afrika Mashariki, Kati na Kusini tukisimamia ubora wa kazi zetu.',
  },
  leadership: {
    title: 'Uongozi',
    summary: 'Ukuaji endelevu ili kubaki imara, bora na wenye ushawishi kibiashara.',
    detail:
      'Tunaendelea kukua kama viongozi katika mikakati, ubunifu, na teknolojia ili kazi yetu ibaki na tija katika soko linalobadilika kwa kasi.',
  },
};

export const SW_TERRITORY_MARKETS: Record<
  string,
  { country: string; role: string; notes: string }
> = {
  Kenya: {
    country: 'Kenya',
    role: 'Makao Makuu na Shughuli Kuu',
    notes: 'Nairobi, Nakuru, Narok na kampeni za kitaifa za rejareja, washawishi na matukio.',
  },
  Uganda: {
    country: 'Uganda',
    role: 'Soko la Afrika Mashariki',
    notes: 'Uratibu wa masoko ya kidijitali, washawishi na uhamasishaji wa chapa kikanda.',
  },
  Rwanda: {
    country: 'Rwanda',
    role: 'Soko la Afrika Mashariki',
    notes: 'Utekelezaji wa ubunifu wa chapa na kampeni za kidijitali mipakani.',
  },
  'Democratic Republic of Congo': {
    country: 'Jamhuri ya Kidemokrasia ya Kongo',
    role: 'Soko la Afrika ya Kati',
    notes: 'Mipango ya kampeni za kikanda na usaidizi wa upanuzi wa soko.',
  },
  Zambia: {
    country: 'Zambia',
    role: 'Soko la Kusini mwa Afrika',
    notes: 'Uratibu wa masoko na uzinduzi wa chapa katika nchi mbalimbali.',
  },
};

export const SW_IMPACT_LABELS: Record<
  string,
  { label: string; unitOrContext: string; prefix?: string; suffix: string }
> = {
  brandsServed: {
    label: 'Wateja Walioorodheshwa',
    unitOrContext: 'Mashirika ya wateja katika wasifu rasmi wa kampuni',
    suffix: '',
  },
  geographicReach: {
    label: 'Ufikiaji wa Kikanda',
    unitOrContext: 'Kenya, Uganda, Rwanda, DRC na Zambia',
    prefix: 'Nchi ',
    suffix: '',
  },
  projectsCompleted: {
    label: 'Huduma Kuu',
    unitOrContext: 'Mitandao, Maudhui, Washawishi, Matangazo, Uhamasishaji na Taswira',
    prefix: 'Huduma ',
    suffix: '',
  },
  campaignsExecuted: {
    label: 'Miradi Iliyochapishwa',
    unitOrContext: 'Kampeni na mifumo ya utambulisho katika wasifu wetu',
    prefix: 'Miradi ',
    suffix: '',
  },
};

export const SW_TEAM_SLOTS: Record<
  string,
  { name: string; role: string; division: string; bio: string }
> = {
  'exec-duncan-aboka': {
    name: 'Duncan Aboka',
    role: 'Mkurugenzi Mtendaji',
    division: 'Uongozi Mkuu',
    bio: 'Anaongoza mwelekeo wa kimkakati, ushirikiano na wateja, na usimamizi wa kikanda kutoka makao makuu Kilimani, Nairobi.',
  },
  'dept-hr': {
    name: 'Rasilimali Watu (HR)',
    role: 'Watu na Utamaduni',
    division: 'Idara ya Rasilimali Watu',
    bio: 'Inasimamia ajira za wataalamu, maendeleo ya timu za ubunifu, na utamaduni wa shirika katika huduma zetu sita.',
  },
  'dept-finance': {
    name: 'Fedha (Finance)',
    role: 'Fedha na Utawala',
    division: 'Idara ya Fedha',
    bio: 'Inasimamia bajeti za miradi, utawala wa malipo ya wateja, na uwajibikaji wa kifedha kikanda.',
  },
  'dept-creative-delivery': {
    name: 'Kiongozi wa Ubunifu na Kampeni',
    role: 'Usanifu, Maudhui na Matukio',
    division: 'Shughuli za Kampeni',
    bio: 'Anaratibu usanifu wa taswira, uzalishaji wa maudhui, mitandao ya kijamii, washawishi, matangazo na matukio ya moja kwa moja.',
  },
};

export const SW_PROJECTS: Record<
  string,
  Partial<Pick<PortfolioProject, 'title' | 'summary' | 'challenge' | 'solution' | 'deliverables'>>
> = {
  'pepsi-kenya-market-entry-influencer-campaign': {
    title: 'Pepsi — Uzinduzi wa Soko la Kenya na Ushirikiano wa QSR',
    summary:
      'Tuliongoza masoko kupitia washawishi kuanzia mkakati hadi utekelezaji kutangaza kuingia kwa Pepsi nchini Kenya kwa ushirikiano na Pizza Inn na Chicken Inn.',
  },
  'ocean-basket-westgate-influencer-engagement': {
    title: 'Ocean Basket Westgate — Ushirikiano wa Muda Mrefu na Washawishi',
    summary:
      'Kampeni endelevu ya washawishi iliyoongeza ufahamu wa chapa na kuonyesha uzoefu wa vyakula katika mgahawa wa Ocean Basket Westgate Mall.',
  },
  'galitos-launch-sauce-sampling-activations': {
    title: "Galito's — Uzinduzi wa Narok, Waiyaki Way na Ugawaji wa Mchuzi",
    summary:
      "Uzinduzi wa matawi na uhamasishaji wa chapa pamoja na kampeni za ugawaji wa sampuli huko Narok, Waiyaki Way, na BBS Mall.",
  },
  'cinnamon-energies-complete-brand-identity': {
    title: 'Cinnamon Energies — Utambulisho Kamili wa Chapa na Vifaa vya Uchapishaji',
    summary:
      'Mwongozo kamili wa chapa ikijumuisha ujenzi wa nembo, mifumo ya rangi, barua rasmi, sare za wafanyakazi, mabango na vifungashio.',
  },
  'kcb-corporate-event-management': {
    title: 'KCB — Usimamizi wa Matukio na Uandaaji wa Chapa',
    summary:
      'Usimamizi wa matukio ukijumuisha meza za usajili zenye chapa ya KCB, mabango, mabalozi wa huduma kwa wageni na uratibu wa ukumbi.',
  },
  'content-creation-tecno-big5-qsr-production': {
    title: "TECNO, Big 5 Construct Kenya, Pizza Inn na Galito's — Uzalishaji wa Maudhui",
    summary:
      'Upigaji picha na video za kibiashara kuanzia wazo hadi uhariri wa mwisho kwa kampeni za kidijitali na matangazo.',
  },
  'grill-shack-lifestyle-food-influencer-campaigns': {
    title: 'The Grill Shack — Kampeni za Washawishi wa Vyakula na Mtindo wa Maisha',
    summary:
      'Ushirikiano mahususi na washawishi wa vyakula kuweka The Grill Shack kama chaguo kuu la nyama choma na baga Nairobi.',
  },
  'marhaba-stop-and-shop-shell-select-retail-campaigns': {
    title: 'Shell Select, Stop & Shop & Marhaba — Kampeni za Ofa za Rejareja',
    summary:
      'Kampeni za washawishi zilizoangazia bidhaa za bei nafuu na ofa maalum za madukani kwa wateja wa kila siku.',
  },
  'chicken-inn-retail-events-mall-activations': {
    title: 'Chicken Inn — BBS Mall, Lucky Summer, Valentine na Champs',
    summary:
      'Matukio ya uhamasishaji wa chapa katika vituo vya biashara, uzinduzi wa matawi na mashindano ya wateja.',
  },
  'pizza-inn-galitos-gtc-mall-nakuru-launches': {
    title: "Pizza Inn & Galito's — Uzinduzi wa GTC Mall na Basic 58 Nakuru",
    summary:
      'Uhamasishaji wa ufunguzi katika GTC Mall Nairobi pamoja na sherehe za ufunguzi wa tawi jipya Nakuru.',
  },
  'the-hub-karen-8th-anniversary-food-festival': {
    title: 'The Hub Karen — Sherehe za Maadhimisho',
    summary:
      'Mabalozi wa chapa, mapokezi ya zulia jekundu, na ushiriki wa wageni wakati wa sherehe za maadhimisho ya The Hub Karen.',
  },
  'wowzi-tiktok-influencer-training-workshop': {
    title: 'Wowzi — Warsha ya Mafunzo ya Washawishi wa TikTok',
    summary:
      'Warsha ya mafunzo ya moja kwa moja iliyowaandaa waundaji wa maudhui kuimarisha mikakati ya video fupi.',
  },
  'digital-paperboy-and-schoolbooks-identity-systems': {
    title: 'Digital Paperboy & Schoolbooks — Mifumo ya Utambulisho wa Chapa',
    summary:
      'Miongozo ya utambulisho wa chapa ikiwemo kanuni za nembo, aina za herufi, na mifumo ya rangi kwa majukwaa ya Digital Paperboy na Schoolbooks.',
  },
  'toyworld-kenya-styroplast-social-media-management': {
    title: 'ToyWorld Kenya, Styroplast Group — Usimamizi wa Mitandao ya Kijamii',
    summary:
      'Mipango ya machapisho ya Meta na usimamizi wa kila siku uliojenga taswira thabiti ya bidhaa na ofa za msimu.',
  },
  'print-design-and-promotional-collateral-showcase': {
    title: 'Usanifu wa Uchapishaji na Vifaa vya Matangazo',
    summary:
      'Brosha, wasifu wa kampuni, na mabango ya maonyesho yaliyoundwa kwa Computer Pride, Panari Resort Nyahururu, Flashbase, Friends of Creation na Uptown Radio.',
  },
};

export const SW_ARTICLES: Record<
  string,
  Pick<InsightArticle, 'title' | 'excerpt' | 'body' | 'readTime' | 'authorRole'>
> = {
  'why-african-brands-need-integrated-marketing-execution': {
    title: 'Kwa Nini Chapa Zinazokua Afrika Zinahitaji Utekelezaji Mmoja wa Masoko',
    readTime: 'Dakika 7 kusoma',
    authorRole: 'Exponential Marketing Agency, Nairobi',
    excerpt:
      'Wakati usanifu wa taswira, uundaji wa maudhui, washawishi, matangazo ya kulipia, na matukio vinapotenganishwa, kasi ya kampeni hupungua kabla ya kumfikia mnunuzi.',
    body: `## Gharama ya Utekelezaji Uliotawanyika

Katika masoko ya Kenya, Uganda, Rwanda, Jamhuri ya Kidemokrasia ya Kongo, na Zambia, chapa nyingi hugawanya kazi zao kwa watoa huduma wanne au watano wasiowasiliana. Mbuni mmoja hushughulikia nembo, studio nyingine hupiga video, wakala mwingine hununua matangazo ya Meta, na timu tofauti huendesha uhamasishaji wa chapa madukani.

Kwenye karatasi hatua hii huonekana rahisi, lakini kibiashara hupunguza uwiano wa ujumbe na kasi ya utekelezaji. Mteja anapoona tangazo mtandaoni Nairobi, Kampala au Kigali, mara nyingi halilingani na mwonekano wa bidhaa dukani au ujumbe wa mabalozi wa chapa.

## Pale Kasi ya Kampeni Inapovunjika

- Utambulisho wa chapa hubadilika kati ya mabango ya uchapishaji na mitandao ya kijamii kwa kukosa mwelekeo mmoja wa ubunifu.
- Upigaji wa video na picha hufanyika bila kuzingatia takwimu za matangazo ya kulipia, na kusababisha gharama kubwa za ufikiaji.
- Kampeni za washawishi huanza kabla au baada ya matukio ya dukani, na kupoteza fursa ya mauzo ya papo hapo.
- Ripoti za utendaji hubaki kwenye idadi ya watazamaji pekee bila kuunganishwa na wateja wanaotembelea maduka.

## Kuunganisha Huduma Sita Chini ya Paa Moja

Katika Exponential Marketing Agency, kila mradi unaunganisha taaluma sita mahususi: Usimamizi wa Mitandao ya Kijamii, Uundaji wa Maudhui na Masoko, Masoko Kupitia Washawishi, Ununuzi wa Nafasi za Matangazo, Uhamasishaji wa Chapa, na Usanifu wa Taswira.

Mkakati unapoanzia Kilimani, Nairobi, mwongozo mmoja wa kibiashara huelekeza kila timu—kuanzia usanifu wa vifungashio na mabango, utengenezaji wa video fupi za TikTok na Reels, ushirikiano na washawishi, matangazo yaliyolengwa ya kulipia, hadi ugawaji wa sampuli katika vituo vya biashara.

## Faida za Kibiashara kwa Upanuzi wa Kikanda

- Kasi moja ya uzalishaji: Maudhui hutoka kwenye wazo hadi idhini na uchapishaji bila ucheleweshaji wa wabia wengi.
- Takwimu za mwitikio wa hadhira: Maoni ya wateja mtandaoni na mwitikio wa madukani huboresha matangazo ya wiki inayofuata.
- Mshikamano wa chapa kikanda: Iwe ni uzinduzi wa tawi Nakuru au upanuzi Uganda, Rwanda, DRC na Zambia, kumbukumbu ya chapa hukua kwa kila hatua.`,
  },
  'bridging-influencer-storytelling-and-on-ground-activations': {
    title: 'Kuunganisha Sauti za Washawishi na Uhamasishaji wa Chapa Nchini Kenya',
    readTime: 'Dakika 6 kusoma',
    authorRole: 'Kitengo cha Washawishi na Matukio',
    excerpt:
      'Jinsi chapa za vyakula na rejareja zinavyounganisha washawishi waliohakikiwa na ugawaji wa sampuli dukani ili kubadilisha mvuto kuwa majaribio halisi.',
    body: `## Kwa Nini Mvuto wa Mtandaoni Pekee Hautoshi

Ufikiaji wa kidijitali kwenye TikTok na Instagram nchini Kenya ni mkubwa, lakini unaleta matokeo bora zaidi ya mauzo pale unapounganishwa moja kwa moja na uzoefu wa ana kwa ana. Walaji hugundua bidhaa au ofa mpya kwenye simu zao na kuzithibitisha wanapofika madukani, katika vituo vya biashara na vyuoni.

## Hatua Tatu za Kuunganisha Washawishi na Maduka

- Awamu ya 1 — Uteuzi na Maelekezo kwa Washawishi: Kuchagua washawishi wa kweli wanaoendana na eneo na wateja lengwa wa tawi husika.
- Awamu ya 2 — Utekelezaji wa Moja kwa Moja: Kutuma mabalozi wa chapa, meza za sampuli, na washawishi ukumbini kwa pamoja wakati wa kilele cha ununuzi.
- Awamu ya 3 — Ukuzaji wa Matangazo Baada ya Tukio: Kuhariri video za mwitikio wa wateja na kuzisambaza kupitia Ununuzi wa Nafasi za Matangazo ili kuvutia wateja zaidi.

## Mafunzo Kutoka Kampeni za Vyakula na Rejareja

Katika kampeni zilizohusisha Pepsi, Chicken Inn, Galito's, Pizza Inn, Ocean Basket Westgate, Shell Select na Stop & Shop, muunganiko wa sauti za washawishi wanaoaminika na maandalizi thabiti uwanjani hubadilisha ofa za kawaida kuwa matukio ya kijamii yanayojaza matawi.`,
  },
  'building-consistent-visual-identity-and-social-systems': {
    title: 'Mifumo ya Taswira na Maudhui Yanayojenga Uaminifu wa Haraka wa Chapa',
    readTime: 'Dakika 7 kusoma',
    authorRole: 'Kitengo cha Usanifu na Maudhui',
    excerpt:
      'Kwa nini mpangilio thabiti wa herufi, picha bora za kibiashara, na mitandao yenye nidhamu hutofautisha chapa zinazokumbukwa na kelele za mtandaoni.',
    body: `## Uaminifu wa Sekunde ya Kwanza

Katika sekta zenye ushindani mkubwa—kuanzia migahawa na benki hadi majengo na bidhaa za rejareja—wanunuzi hulinganisha ubora wa mabango, wasifu wa kampuni, kurasa za Instagram na vifungashio kabla ya kufanya uamuzi wa kununua.

## Nguzo za Mfumo Imara wa Chapa Afrika

- Miongozo Thabiti ya Chapa: Kuweka sheria sahihi za nembo, herufi, rangi za kidijitali na uchapishaji ili kila tangazo litambulike mara moja.
- Upigaji Picha na Video Halisi za Kibiashara: Kutumia picha halisi zinazoakisi mazingira, vyakula, bidhaa na wateja wa Afrika Mashariki.
- Violezo vya Mitandao ya Kijamii: Kubadilisha sheria za chapa kuwa machapisho ya Instagram, TikTok na matangazo ya Meta yenye mvuto wa kipekee.
- Uwiano wa Uchapishaji na Skrini: Kuhakikisha brosha, vifungashio, sare na matangazo ya kidijitali yanazungumza lugha moja ya taswira.

## Jinsi Mkakati wa Maudhui Unavyogeuza Usanifu Kuwa Ukuaji

Katika Exponential Marketing Agency, wabunifu wetu wa taswira na watengenezaji wa maudhui hufanya kazi pamoja tangu hatua ya wazo hadi toleo la mwisho ili thamani ya chapa iongezeke kila wiki.`,
  },
  'data-informed-media-buying-and-social-growth-east-africa': {
    title: 'Kugeuza Mitandao ya Kijamii Kuwa Faida Halisi Kupitia Matangazo Yanayoongozwa na Takwimu',
    readTime: 'Dakika 7 kusoma',
    authorRole: 'Kitengo cha Mitandao na Matangazo',
    excerpt:
      'Jinsi ulengaji sahihi wa hadhira, majaribio ya ubunifu, na usimamizi wa kila siku wa mitandao unavyoongeza ufanisi wa bajeti katika soko la Afrika Mashariki.',
    body: `## Zaidi ya Kubofya 'Boost Post' Pekee

Mojawapo ya makosa makubwa katika bajeti za matangazo ni kuchukulia kubofya "Boost Post" kama mkakati kamili. Bila mpangilio wa malengo ya mauzo na majaribio ya maudhui, bajeti huishia kwa watazamaji wasio na nia ya kununua.

## Ujenzi wa Mfumo Wenye Faida ya Matangazo

- Malengo Wazi ya Kampeni: Kutenganisha matangazo ya ufahamu wa chapa na kampeni za maswali ya moja kwa moja kupitia WhatsApp na fomu za mauzo.
- Uboreshaji wa Kila Wiki: Kujaribu vichwa tofauti vya habari na video fupi kutoka timu zetu za Uundaji wa Maudhui na Washawishi.
- Usimamizi Hai wa Maoni na Ujumbe: Majibu ya haraka kwa maswali ya bei na mahali pa duka hubadilisha watazamaji kuwa wateja.
- Ulengaji wa Kijiografia Kikanda: Kusanidi matangazo kwa usahihi wa miji na vituo vya biashara kote Kenya, Uganda, Rwanda, DRC na Zambia.

## Ripoti Wazi za Kibiashara

Kila tathmini ya mwezi huunganisha gharama za matangazo na ubora wa maswali, matembezi dukani, na matokeo halisi ya kampeni.`,
  },
};

export const SW_SERVICE_DETAIL_EXTRAS: Record<
  string,
  Partial<
    Pick<
      ServiceDetailRecord,
      'tagline' | 'heroSummary' | 'extendedOverview' | 'idealFor' | 'metricsTracked'
    >
  > & {
    processTitles?: string[];
  }
> = {
  'social-media-management': {
    tagline: 'Uwepo wa Kudumu. Sauti Thabiti ya Chapa.',
    heroSummary:
      'Mkakati kamili wa mitandao, kalenda za maudhui za kila siku, usimamizi wa jamii, na ukuaji kwenye Meta (Instagram na Facebook), TikTok na LinkedIn.',
    extendedOverview: [
      'Kurasa zako za kijamii mara nyingi ndizo mahali pa kwanza mteja anakutana na chapa yako. Machapisho yasiyopangwa au maswali yasiyojibiwa hupunguza imani ya soko haraka.',
      'Exponential Marketing Agency husimamia kila hatua kutoka makao makuu Kilimani, Nairobi—tukiunganisha kalenda za kila mwezi na ofa za madukani, uzinduzi wa bidhaa, na mazungumzo ya kijamii Afrika Mashariki.',
    ],
    idealFor: [
      'Maduka ya rejareja na biashara za mtandaoni zinazoendesha ofa za kila wiki',
      'Migahawa, hoteli na maeneo ya burudani yanayojenga wateja wa kudumu',
      'Kampuni, benki na taasisi za elimu zinazohitaji taswira imara kila siku',
    ],
    metricsTracked: [
      'Ufikiaji wa Kawaida na wa Jumla',
      'Kiwango cha Ushiriki (Saves & Shares)',
      'Kasi ya Ongezeko la Wafuasi',
      'Maswali ya Moja kwa Moja (DM & Links)',
    ],
  },
  'content-creation-and-marketing': {
    tagline: 'Hadithi Zinazojenga Chapa na Kuchochea Hatua.',
    heroSummary:
      'Ubunifu wa dhana, uandishi, upigaji picha na video za kibiashara, michoro ya mwendo, na usambazaji uliopangwa kwa kampeni za kidijitali.',
    extendedOverview: [
      'Matangazo yenye nguvu hutegemea usimulizi halisi wa picha na video unaolenga soko unalolihudumia. Timu yetu inasimamia mchakato mzima kuanzia wazo hadi uhariri wa mwisho.',
      'Tunazalisha maktaba ya picha na video za ubora wa juu tayari kutumika kwenye Meta, TikTok, YouTube, tovuti na uchapishaji.',
    ],
    idealFor: [
      'Uzinduzi wa bidhaa mpya na kampeni za vyakula na vinywaji',
      'Kampuni zinazotaka picha halisi za shughuli na timu zao',
      'Chapa zinazohitaji video fupi za Reels na TikTok kwa mwendelezo',
    ],
    metricsTracked: [
      'Kiwango cha Utazamaji wa Sekunde 3 za Kwanza',
      'Ukamilishaji wa Video',
      'Ufanisi wa Maudhui Kwenye Matangazo',
      'Matumizi ya Vipengele Katika Majukwaa Mengi',
    ],
  },
  'influencer-marketing': {
    tagline: 'Sauti Zinazoaminika. Athari Inayopimika.',
    heroSummary:
      'Utafutaji na uhakiki wa washawishi, mikakati ya kampeni, usimamizi wa mikataba, na ripoti za ufanisi kote Afrika Mashariki.',
    extendedOverview: [
      'Watengenezaji wa maudhui hujenga uaminifu ambao matangazo ya kawaida hayawezi kuiga kirahisi. Tunachagua washawishi kulingana na takwimu halisi za hadhira na uwezo wao wa ubunifu.',
      'Kuanzia kampeni za Pepsi Kenya na Ocean Basket hadi washawishi wa vyakula na rejareja, tunahakikisha maudhui yao yanaleta mazungumzo na mauzo.',
    ],
    idealFor: [
      'Chapa za vinywaji, migahawa na mitindo ya maisha zinazolenga kizazi kipya',
      'Maduka ya rejareja yanayotangaza punguzo la bei na ofa mpya',
      'Kampuni za teknolojia na huduma za kifedha zinazojenga uelewa wa soko',
    ],
    metricsTracked: [
      'Ufikiaji na Utazamaji Halisi wa Washawishi',
      'Kiwango cha Maoni na Kushiriki',
      'Miamala na Nambari za Ofa',
      'Ufanisi wa Video Kwenye Matangazo ya Kulipia',
    ],
  },
  'media-buying': {
    tagline: 'Kila Shilingi Inalenga Mnunuzi Sahihi.',
    heroSummary:
      'Mipango ya matangazo ya kulipia kwenye Meta, TikTok na Google Ads yenye ufuatiliaji wa bajeti na uboreshaji wa kila wiki.',
    extendedOverview: [
      'Matangazo bora hayategemei kubahatisha. Tunaweka miundo thabiti ya kampeni inayotenganisha ujenzi wa chapa na ulengaji wa wanunuzi walio tayari kuwasiliana nawe.',
      'Tunashirikiana moja kwa moja na kitengo chetu cha maudhui na washawishi ili matangazo yenye matokeo mazuri yapate kipaumbele cha bajeti haraka.',
    ],
    idealFor: [
      'Biashara zinazotaka maombi mengi zaidi ya WhatsApp, fomu na mauzo',
      'Maduka makubwa na matawi mapya yanayolenga wateja katika eneo maalum',
      'Kampeni za kikanda zinazolenga Kenya, Uganda, Rwanda, DRC na Zambia',
    ],
    metricsTracked: [
      'Gharama kwa Kila Ufikiaji na Swali (CPL)',
      'Kiwango cha Kubofya Matangazo (CTR)',
      'Faida ya Uwekezaji (ROAS)',
      'Ubora wa Mwitikio wa Kikanda',
    ],
  },
  'brand-activation': {
    tagline: 'Majaribio ya Moja kwa Moja Yanayokumbukwa Daima.',
    heroSummary:
      'Uhamasishaji wa chapa katika maduka makubwa, uzinduzi wa matawi, ziara za ugawaji wa sampuli, na uratibu wa matukio ya kibiashara.',
    extendedOverview: [
      'Uhusiano wa kudumu na mlaji hujengwa pale anapoona, kuonja, na kushirikiana na chapa yako ana kwa ana. Timu yetu ya uwanjani inaratibu vifaa, mabalozi waliofunzwa na burudani.',
      "Kuanzia uzinduzi wa Chicken Inn na Galito's hadi matukio ya KCB na The Hub Karen, tunahakikisha kila tukio linapangwa kwa nidhamu ya hali ya juu.",
    ],
    idealFor: [
      'Ufunguzi wa matawi mapya ya migahawa na maduka ya rejareja',
      'Ugawaji wa sampuli za bidhaa mpya madukani na vyuoni',
      'Mikutano ya kampuni, maonyesho na siku za maadhimisho',
    ],
    metricsTracked: [
      'Idadi ya Sampuli Zilizogawiwa',
      'Wageni Walioshiriki Katika Kituo',
      'Ofa Zilizotumiwa Dukani',
      'Maudhui ya Moja kwa Moja Mitandaoni',
    ],
  },
  'visual-design': {
    tagline: 'Utambulisho Thabiti Katika Kila Jukwaa.',
    heroSummary:
      'Usanifu wa nembo, miongozo ya chapa, mabango ya maonyesho, brosha, vifungashio, na taswira za kampeni za kidijitali.',
    extendedOverview: [
      'Chapa inayoheshimika huonekana imara kabla hata neno halijasomwa. Tunatengeneza mifumo ya taswira inayoweza kukua kwa urahisi kuanzia kadi za biashara hadi mabango makubwa.',
      'Kila usanifu hutolewa kwa usahihi wa rangi za skrini (RGB/HEX) na uchapishaji (CMYK) ili kufanikisha ubora wa Cinnamon Energies, Digital Paperboy na wengineo.',
    ],
    idealFor: [
      'Kampuni mpya na zinazoboresha mwonekano wao wa kibiashara',
      'Waandaaji wa maonyesho na mikutano wanaohitaji wasifu na mabango',
      'Timu zinazohitaji mfumo wa machapisho ya kila siku yenye uwiano',
    ],
    metricsTracked: [
      'Uthabiti wa Chapa Katika Majukwaa Yote',
      'Ubora wa Faili za Uchapishaji (CMYK)',
      'Kasi ya Uzalishaji wa Machapisho Mapya',
      'Utambuzi wa Chapa kwa Wateja',
    ],
  },
};
