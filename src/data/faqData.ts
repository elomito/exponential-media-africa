export type FaqCategoryId = 'all' | 'agency' | 'services' | 'operations' | 'regional';

export interface FaqItem {
  id: string;
  category: Exclude<FaqCategoryId, 'all'>;
  questionEn: string;
  answerEn: string;
  questionSw: string;
  answerSw: string;
}

export const FAQ_CATEGORIES: { id: FaqCategoryId; labelEn: string; labelSw: string }[] = [
  { id: 'all', labelEn: 'All Questions', labelSw: 'Maswali Yote' },
  { id: 'agency', labelEn: 'Agency & Briefs', labelSw: 'Shirika na Miradi' },
  { id: 'services', labelEn: 'Six Core Services', labelSw: 'Huduma Sita Kuu' },
  { id: 'operations', labelEn: 'Timelines & Pricing', labelSw: 'Muda na Bajeti' },
  { id: 'regional', labelEn: 'Regional Markets', labelSw: 'Masoko ya Kikanda' },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-exclusive-focus',
    category: 'services',
    questionEn: 'What services does Exponential Marketing Agency exclusively provide?',
    answerEn:
      'Exponential Marketing Agency focuses exclusively on six interconnected marketing capabilities: Social Media Management, Content Creation & Marketing, Influencer Marketing, Media Buying, Brand Activation, and Visual Design. Keeping our focus on these six disciplines ensures specialist depth and seamless campaign execution under one team.',
    questionSw: 'Exponential Marketing Agency inatoa huduma zipi mahususi?',
    answerSw:
      'Exponential Marketing Agency inajikita pekee katika huduma sita zinazofanya kazi kwa pamoja: Usimamizi wa Mitandao ya Kijamii, Uundaji wa Maudhui na Masoko, Masoko Kupitia Washawishi, Ununuzi wa Nafasi za Matangazo, Uhamasishaji wa Chapa, na Usanifu wa Taswira. Mwelekeo huu unahakikisha utaalamu wa hali ya juu chini ya timu moja.',
  },
  {
    id: 'faq-single-service-vs-integrated',
    category: 'services',
    questionEn: 'Can we commission a single service such as Visual Design or Influencer Marketing on its own?',
    answerEn:
      'Yes. Clients routinely engage us for a focused single-discipline brief—such as a complete corporate identity system for Visual Design, a product-launch creator push, or a store opening activation—or bundle multiple disciplines into a unified quarterly or annual retainer.',
    questionSw: 'Je, tunaweza kuagiza huduma moja pekee kama Usanifu wa Taswira au Masoko Kupitia Washawishi?',
    answerSw:
      'Ndiyo. Wateja wanaweza kuanza na huduma moja mahususi—kama kubuni mfumo kamili wa utambulisho wa chapa, kampeni ya washawishi kwa uzinduzi wa bidhaa, au tukio la ufunguzi wa duka—au kuunganisha huduma mbili au zaidi katika mkataba mmoja wa robo mwaka au mwaka mzima.',
  },
  {
    id: 'faq-hq-location',
    category: 'agency',
    questionEn: 'Where is Exponential Marketing Agency headquartered and how do we reach your team?',
    answerEn:
      'Our headquarters is located at A3-10 Casamia along Ngong Road in Kilimani, Nairobi, Kenya. You can submit a brief on our Contact page, email info@exponentialmedia.africa, or call +254 728 231 221 / +254 728 232 723 Monday to Friday during East Africa Time business hours.',
    questionSw: 'Makao makuu ya Exponential Marketing Agency yako wapi na tunawafikia vipi?',
    answerSw:
      'Makao makuu yetu yapo A3-10 Casamia, Barabara ya Ngong, Kilimani, Nairobi, Kenya. Unaweza kutuma maelezo ya mradi kupitia ukurasa wetu wa Wasiliana Nasi, barua pepe info@exponentialmedia.africa, au kupiga simu +254 728 231 221 / +254 728 232 723 Jumatatu hadi Ijumaa saa za kazi za Afrika Mashariki.',
  },
  {
    id: 'faq-onboarding-speed',
    category: 'operations',
    questionEn: 'How quickly can an approved campaign or monthly retainer kick off?',
    answerEn:
      'Once scope, commercials, and brand assets are approved, strategy onboarding begins within 48 hours. Social media calendars, creative shoots, and influencer shortlists typically go live within 10 to 14 business days, while rapid store-opening activations can mobilize inside two weeks.',
    questionSw: 'Kampeni au mkataba wa kila mwezi huanza kwa muda gani baada ya idhini?',
    answerSw:
      'Mara tu wigo wa kazi, bajeti na nyenzo za chapa vinapoidhinishwa, maandalizi ya kimkakati huanza ndani ya saa 48. Kalenda za mitandao, upigaji picha na video, pamoja na orodha ya washawishi hukamilika ndani ya siku 10 hadi 14 za kazi, huku uhamasishaji wa chapa madukani ukianza ndani ya wiki mbili.',
  },
  {
    id: 'faq-budget-structure',
    category: 'operations',
    questionEn: 'How are retainers and project budgets structured?',
    answerEn:
      'Scopes are priced transparently based on deliverables, campaign duration, production volume, creator fees, and paid media budgets. During brief intake you can select flexible tiers starting from KES 150,000 or request a tailored multi-market proposal.',
    questionSw: 'Bajeti za miradi na mikataba ya mwezi hupangwaje?',
    answerSw:
      'Gharama hupangwa kwa uwazi kulingana na kazi zinazohitajika, muda wa kampeni, uzalishaji wa picha au video, malipo ya washawishi, na bajeti ya matangazo ya kulipia. Wakati wa kujaza fomu ya mradi unaweza kuchagua kiwango cha bajeti au kuomba makadirio mahususi ya nchi nyingi.',
  },
  {
    id: 'faq-creators-vetting',
    category: 'services',
    questionEn: 'How do you vet influencers and manage campaign usage rights?',
    answerEn:
      'Every creator is screened for authentic engagement quality, audience geography, past brand alignment, and content craft before contracting. Our legal and campaign team manages formal agreements, deliverable checklists, and paid whitelisting rights so winning videos can scale through Media Buying.',
    questionSw: 'Je, mnachuja vipi washawishi na kusimamia haki za matumizi ya maudhui?',
    answerSw:
      'Kila mshawishi hukaguliwa kwa ubora wa wafuasi wake halisi, eneo la kijiografia la hadhira, historia ya maudhui, na uwezo wake wa ubunifu kabla ya kusaini mkataba. Timu yetu husimamia mikataba rasmi, ubora wa kazi, na vibali vya kurusha video zenye mafanikio kupitia Ununuzi wa Nafasi za Matangazo.',
  },
  {
    id: 'faq-african-markets',
    category: 'regional',
    questionEn: 'Which countries do you actively cover beyond Kenya?',
    answerEn:
      'From Nairobi, Exponential Marketing Agency plans and coordinates multi-market brand campaigns across five core African markets: Kenya, Uganda, Rwanda, the Democratic Republic of Congo, and Zambia.',
    questionSw: 'Ni nchi zipi nyingine mnafanya kazi nje ya Kenya?',
    answerSw:
      'Kutoka Nairobi, Exponential Marketing Agency hupanga na kuratibu kampeni za chapa katika masoko matano makuu barani Afrika: Kenya, Uganda, Rwanda, Jamhuri ya Kidemokrasia ya Kongo (DRC), na Zambia.',
  },
  {
    id: 'faq-reporting',
    category: 'operations',
    questionEn: 'What metrics and reporting do clients receive during active campaigns?',
    answerEn:
      'Clients receive clear monthly and post-campaign reports covering audience reach, engagement rate, video completion, click-through volume, ad spend efficiency (ROAS/CPL), creator performance, and live activation sampling counts.',
    questionSw: 'Wateja hupata ripoti zipi za matokeo wakati kampeni zikiendelea?',
    answerSw:
      'Wateja hupokea ripoti zilizo wazi za kila mwezi na za mwisho wa kampeni zinazojumuisha idadi ya waliofikiwa, kiwango cha ushiriki, utazamaji wa video, ufanisi wa bajeti ya matangazo (ROAS/CPL), matokeo ya washawishi, na takwimu za ugawaji sampuli katika matukio ya moja kwa moja.',
  },
];
