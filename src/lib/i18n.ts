export type Language = 'en' | 'sw';

export interface UiStrings {
  nav: {
    home: string;
    about: string;
    services: string;
    work: string;
    insights: string;
    contact: string;
    letsTalk: string;
    openMenu: string;
    closeMenu: string;
    languageLabel: string;
  };
  footer: {
    servicesTitle: string;
    exploreTitle: string;
    contactTitle: string;
    focusBody: string;
    whatsappCta: string;
    bioSuffix: string;
    privacy: string;
    terms: string;
    staffLogin: string;
    backToTop: string;
    rightsReserved: string;
    exploreLinks: {
      about: string;
      services: string;
      work: string;
      insights: string;
      faq: string;
      contact: string;
    };
  };
  home: {
    heroLine1: string;
    heroLine2: string;
    heroSubtitle: string;
    grabCoffeeCta: string;
    exploreWorkCta: string;
    talkToTeamCta: string;
    recentWorkHeading: string;
    prevWorkAria: string;
    nextWorkAria: string;
    introHeading: string;
    introP1: string;
    introP2: string;
    learnMoreCta: string;
    introStrips: { label: string; sub: string; slug: string }[];
    pillarsHeading: string;
    sixPillarsHeading: string;
    howPracticeConnects: string;
    prevPillarsAria: string;
    nextPillarsAria: string;
    readMoreCta: string;
    exploreLabel: string;
    requestBrief: string;
    campaignsHeading: string;
    viewFullPortfolio: string;
    readCaseStudy: string;
    noProjectsUnder: string;
    showAllCategories: string;
    sixCoreServicesHeading: string;
    allServicesFilter: string;
    viewProcessAndWork: string;
    inquireLabel: string;
    acrossMarketsHeading: string;
    marketsSubtitle: string;
    regionalCoord: string;
    idealHeading: string;
    idealIntro: string;
    clientPerspectivesHeading: string;
    howWeDeliverHeading: string;
    howWeDeliverSubtitle: string;
    plugInLabel: string;
    aboutAgencyCta: string;
    teamHeading: string;
    exploreTeamCta: string;
    latestInsightsHeading: string;
    allInsightsCta: string;
    prevInsightsAria: string;
    nextInsightsAria: string;
    readArticle: string;
    finalCtaHeading: string;
    finalCtaBody: string;
    startProjectCta: string;
    workflowStages: { step: string; title: string; detail: string }[];
  };
  partners: {
    heading: string;
    subtitle: string;
    verifiedClientsLabel: string;
    prevAria: string;
    nextAria: string;
  };
  faq: {
    heroTitle: string;
    heroSubtitle: string;
    questionsHeading: string;
    stillHaveQuestions: string;
    stillHaveQuestionsBody: string;
    askOurTeam: string;
    exploreServices: string;
  };
  about: {
    heroTitle: string;
    heroSubtitle: string;
    whoWeAre: string;
    whoWeAreP1: string;
    whoWeAreP2: string;
    exploreSixServices: string;
    exploreWorkCta: string;
    ourVision: string;
    visionBody: string;
    ourMission: string;
    missionBody: string;
    coreValues: string;
    coreValuesIntro: string;
    ourMarkets: string;
    discussMarketCta: string;
    ourTeam: string;
    ourTeamIntro: string;
    meetTeamCta: string;
    whyChooseUs: string;
    whyChooseUsIntro: string;
    whyReasons: { title: string; detail: string }[];
    partnerHeading: string;
    partnerBody: string;
    startProject: string;
  };
  servicesPage: {
    heroTitle: string;
    heroSubtitle: string;
    allServices: string;
    requestProposal: string;
    exploreFullPage: string;
    fullServiceAndWork: string;
    discussService: string;
    unifiedHeading: string;
    unifiedBody: string;
    viewAllServices: string;
    readyHeading: string;
    readyBody: string;
    startBrief: string;
  };
  serviceDetail: {
    notFoundTitle: string;
    notFoundBody: string;
    viewServices: string;
    requestProposal: string;
    explorePreviousWork: string;
    strategicImpact: string;
    bestSuitedFor: string;
    metricsTracked: string;
    deliverablesSuffix: string;
    processHeading: string;
    kickOffBrief: string;
    selectedWorkPrefix: string;
    viewFullPortfolio: string;
    readFullCaseStudy: string;
    otherServicesHeading: string;
    readyPrefix: string;
    readySuffix: string;
    readyBody: string;
    startBriefPrefix: string;
  };
  work: {
    heroTitle: string;
    heroSubtitle: string;
    featuredHeading: string;
    categoryHeadingSuffix: string;
    noProjects: string;
    viewAllWork: string;
    moreHeading: string;
    exploreByCoreHeading: string;
    exploreByCoreBody: string;
    readFullCaseStudy: string;
    ctaHeading: string;
    ctaBody: string;
    startBrief: string;
  };
  caseStudy: {
    backToWork: string;
    notFoundTitle: string;
    notFoundBody: string;
    clientLabel: string;
    sectorLabel: string;
    timelineLabel: string;
    servicesUsedLabel: string;
    overviewHeading: string;
    objectivesHeading: string;
    challengeHeading: string;
    strategyHeading: string;
    phasesHeading: string;
    deliverablesHeading: string;
    specsHeading: string;
    outcomesHeading: string;
    featuredCreatorsHeading: string;
    commissionHeading: string;
    commissionBodyPrefix: string;
    startSimilarProject: string;
    galleryHeading: string;
    relatedHeading: string;
    allPortfolioProjects: string;
    readCaseStudy: string;
  };
  insights: {
    heroTitle: string;
    heroSubtitle: string;
    heroDetail: string;
    heroHighlights: { title: string; detail: string }[];
    searchPlaceholder: string;
    readFullArticle: string;
    noMatch: string;
    resetFilters: string;
    latestDispatches: string;
    noAdditional: string;
    showAll: string;
  };
  article: {
    notFoundTitle: string;
    notFoundBody: string;
    backToInsights: string;
    byLabel: string;
    inThisDispatch: string;
    exploreServicesHeading: string;
    exploreServicesBody: string;
    startBrief: string;
    relatedInsights: string;
    readFullArticle: string;
  };
  contact: {
    heroTitle: string;
    heroSubtitle: string;
    verifiedContactHeading: string;
    hqLabel: string;
    emailLabel: string;
    phoneLabel: string;
    whatsappBtn: string;
    officialChannels: string;
    startBriefHeading: string;
    startBriefBody: string;
    regionalCoverageHeading: string;
    regionalCoverageBody: string;
    visitOfficeHeading: string;
    visitOfficeSub: string;
  };
  ecosystem: {
    heroTitle: string;
    heroSubtitle: string;
    viewPagePrefix: string;
    startBrief: string;
    fiveMarketsHeading: string;
    multiCountryNote: string;
    buildHeading: string;
    buildBody: string;
    startProject: string;
  };
  team: {
    heroTitle: string;
    heroSubtitle: string;
    collaborateHeading: string;
    fourPillarsHeading: string;
    exploreServices: string;
    viewPrefix: string;
    workWithUsHeading: string;
    workWithUsBody: string;
    startProject: string;
  };
  form: {
    modalTitle: string;
    closeDialog: string;
    fullName: string;
    fullNamePlaceholder: string;
    businessEmail: string;
    companyName: string;
    phone: string;
    industry: string;
    selectIndustry: string;
    budget: string;
    selectBudget: string;
    timeline: string;
    selectTimeline: string;
    requiredServices: string;
    selectServiceAreasPlaceholder: string;
    areasSelectedSuffix: string;
    areaSelectedSuffix: string;
    servicesSelectedSuffix: string;
    serviceSelectedSuffix: string;
    selectOptionsPlaceholder: string;
    optionsCountSuffix: string;
    doneButton: string;
    clearAllButton: string;
    serviceValidationEmpty: string;
    serviceValidationPickOption: string;
    descriptionLabel: string;
    descriptionPlaceholder: string;
    consentPrefix: string;
    privacyPolicy: string;
    consentSuffix: string;
    urgentPrefix: string;
    orCall: string;
    secureSubmission: string;
    submitting: string;
    submitButton: string;
    recordedTitle: string;
    recordedBody: string;
    emailTeam: string;
  };
  research: {
    heading: string;
    subtitle: string;
    placeholder: string;
    researching: string;
    researchBtn: string;
    tryLabel: string;
    sourcesLabel: string;
    topics: string[];
  };
  legal: {
    privacyTitle: string;
    termsTitle: string;
    organisationLabel: string;
    effectiveDateLabel: string;
    switchToPrivacy: string;
    switchToTerms: string;
    contactLegalLabel: string;
  };
  notFound: {
    badge: string;
    heading: string;
    body: string;
    returnHome: string;
    viewWork: string;
    contactTeam: string;
  };
  seo: {
    homeTitle: string;
    homeDescription: string;
    homeKeywords: string;
    aboutTitle: string;
    aboutDescription: string;
    ecosystemTitle: string;
    ecosystemDescription: string;
    servicesTitle: string;
    servicesDescription: string;
    workTitle: string;
    workDescription: string;
    insightsTitle: string;
    insightsDescription: string;
    faqTitle: string;
    faqDescription: string;
    teamTitle: string;
    teamDescription: string;
    contactTitle: string;
    contactDescription: string;
    privacyTitle: string;
    privacyDescription: string;
    termsTitle: string;
    termsDescription: string;
    adminTitle: string;
    adminDescription: string;
    notFoundTitle: string;
    notFoundDescription: string;
  };
}

export const EN_STRINGS: UiStrings = {
  nav: {
    home: 'Home',
    about: 'About Us',
    services: 'Services',
    work: 'Our Work',
    insights: 'Insights',
    contact: 'Contact',
    letsTalk: "Let's Talk",
    openMenu: 'Open navigation menu',
    closeMenu: 'Close navigation menu',
    languageLabel: 'Language',
  },
  footer: {
    servicesTitle: 'Services',
    exploreTitle: 'Explore',
    contactTitle: 'Contact Us',
    focusBody:
      'Dedicated exclusively to Social Media Management, Content Creation & Marketing, Influencer Marketing, Media Buying, Brand Activation, and Visual Design.',
    whatsappCta: 'Chat on WhatsApp',
    bioSuffix:
      'Helping brands stand out in the digital age across Kenya, Uganda, Rwanda, the Democratic Republic of Congo, and Zambia.',
    privacy: 'Privacy Policy',
    terms: 'Terms & Conditions',
    staffLogin: 'Staff Login',
    backToTop: 'Back to top',
    rightsReserved: 'All rights reserved.',
    exploreLinks: {
      about: 'About Us',
      services: 'Services Overview',
      work: 'Our Work',
      insights: 'Insights',
      faq: 'FAQ',
      contact: 'Contact Us',
    },
  },
  home: {
    heroLine1: 'Helping brands',
    heroLine2: 'stand out.',
    heroSubtitle:
      "Imaginative Solutions for Exponential Growth. Let's sit down, grab a coffee, and build strategy that moves your brand forward.",
    grabCoffeeCta: 'Grab a coffee.',
    exploreWorkCta: 'Explore Our Work',
    talkToTeamCta: 'Talk to our team',
    recentWorkHeading: 'Recent work',
    prevWorkAria: 'Scroll recent work backward',
    nextWorkAria: 'Scroll recent work forward',
    introHeading: 'COHESIVE BRAND GROWTH UNDER ONE TEAM.',
    introP1:
      'From our Kilimani, Nairobi headquarters, one coordinated team unites creative direction, digital reach, and live brand experiences across five African markets.',
    introP2:
      'One team, clear accountability, and measurable momentum from identity to live activation.',
    learnMoreCta: 'Learn more',
    introStrips: [
      {
        label: 'Visual Design',
        sub: 'Identity Systems, Packaging & Print Collateral',
        slug: 'visual-design',
      },
      {
        label: 'Content',
        sub: 'Commercial Photography, Video & Copywriting',
        slug: 'content-creation-and-marketing',
      },
      {
        label: 'Social & Creators',
        sub: 'Community Management, Creators & Paid Media',
        slug: 'social-media-management',
      },
      {
        label: 'Activation',
        sub: 'Mall Roadshows, Sampling & Store Launches',
        slug: 'brand-activation',
      },
    ],
    pillarsHeading: 'Four connected pillars built as one.',
    sixPillarsHeading: 'Six connected services built as one.',
    howPracticeConnects: 'View all services',
    prevPillarsAria: 'Scroll services backward',
    nextPillarsAria: 'Scroll services forward',
    readMoreCta: 'Read more',
    exploreLabel: 'Explore',
    requestBrief: 'Request Brief',
    campaignsHeading: 'Selected campaigns and brands.',
    viewFullPortfolio: 'View full portfolio',
    readCaseStudy: 'Read Case Study',
    noProjectsUnder: 'No case studies are published under this category yet.',
    showAllCategories: 'Show All Categories',
    sixCoreServicesHeading: 'Six Core Services.',
    allServicesFilter: 'All Services',
    viewProcessAndWork: 'View process & previous work',
    inquireLabel: 'Inquire',
    acrossMarketsHeading: 'Across Five African Markets.',
    marketsSubtitle: 'Kenya, Uganda, Rwanda, DRC & Zambia',
    regionalCoord: 'Regional coordination from Nairobi HQ',
    idealHeading: 'Our I.D.E.A.L. Values.',
    idealIntro:
      'Anchored in Innovative, Dependable, Ethical, Accountable, and Leadership standards.',
    clientPerspectivesHeading: 'Client Perspectives.',
    howWeDeliverHeading: 'How We Deliver.',
    howWeDeliverSubtitle: 'From bright idea to brand plug-in—one seamless execution flow.',
    plugInLabel: 'Plugged in & live',
    aboutAgencyCta: 'About Our Agency',
    teamHeading: 'Our Leadership & Team.',
    exploreTeamCta: 'Explore Our Team',
    latestInsightsHeading: 'Latest Agency Insights.',
    allInsightsCta: 'All insights',
    prevInsightsAria: 'Scroll latest insights backward',
    nextInsightsAria: 'Scroll latest insights forward',
    readArticle: 'Read Article',
    finalCtaHeading: "LET'S BUILD SOMETHING BOLD.",
    finalCtaBody:
      'Imaginative Solutions for Exponential Growth. Connect with our Nairobi team to scope your next campaign.',
    startProjectCta: 'START A PROJECT',
    workflowStages: [
      {
        step: '01',
        title: 'Brief & Strategy',
        detail:
          'Aligning brand objectives, audience segments, and market context across Kenya and regional African territories.',
      },
      {
        step: '02',
        title: 'Design & Content',
        detail:
          'Developing cohesive visual design, promotional artwork, copywriting, commercial photography, and campaign video.',
      },
      {
        step: '03',
        title: 'Rollout & Creators',
        detail:
          'Executing Meta and TikTok management, vetted influencer collaborations, targeted paid media buying, and mall activations.',
      },
      {
        step: '04',
        title: 'Performance Reporting',
        detail:
          'Tracking reach, engagement, ad spend efficiency, and on-ground consumer response to refine ongoing growth.',
      },
    ],
  },
  partners: {
    heading: 'Trusted by leading brands.',
    subtitle:
      'Organisations featured across our campaign portfolio spanning Kenya, Uganda, Rwanda, DRC, Zambia, and regional initiatives.',
    verifiedClientsLabel: 'verified clients',
    prevAria: 'Shift client track backward',
    nextAria: 'Shift client track forward',
  },
  faq: {
    heroTitle: 'Frequently Asked Questions.',
    heroSubtitle:
      'Clear answers about how Exponential Marketing Agency delivers Social Media Management, Content Creation & Marketing, Influencer Marketing, Media Buying, Brand Activation, and Visual Design.',
    questionsHeading: 'Common Questions & Answers.',
    stillHaveQuestions: 'Still Have Questions About Your Brief?',
    stillHaveQuestionsBody:
      'Speak directly with our Nairobi strategy desk or launch our guided project inquiry form.',
    askOurTeam: 'Start a Project Inquiry',
    exploreServices: 'Explore Services',
  },
  about: {
    heroTitle: 'Bold ideas for brand growth.',
    heroSubtitle:
      'Headquartered in Kilimani, Nairobi, we unite creative strategy, digital reach, and live brand experiences across five African markets.',
    whoWeAre: 'Who We Are',
    whoWeAreP1:
      'Exponential Marketing Agency brings six specialized disciplines together under one coordinated team—so creative, digital, and live activations move in lockstep.',
    whoWeAreP2:
      'From our Casamia, Kilimani headquarters, we help ambitious brands stand out with clarity, speed, and measurable commercial impact.',
    exploreSixServices: 'Explore our six services',
    exploreWorkCta: 'Explore our work',
    ourVision: 'Our Vision',
    visionBody:
      'To become the leading marketing agency across Africa through knowledge, creativity, and technology.',
    ourMission: 'Our Mission',
    missionBody:
      'To help brands stand out in the digital age through unified creative, digital, and experiential execution.',
    coreValues: 'Our I.D.E.A.L. Core Values',
    coreValuesIntro:
      'Every Exponential Marketing Agency engagement is anchored in I.D.E.A.L.—Innovative, Dependable, Ethical, Accountable, and Leadership.',
    ourMarkets: 'Our Markets',
    discussMarketCta: 'Discuss a regional campaign',
    ourTeam: 'Our Team',
    ourTeamIntro:
      'Leadership, operations, finance, and creative specialists working together from Nairobi.',
    meetTeamCta: 'View full team',
    whyChooseUs: 'Why Choose Us',
    whyChooseUsIntro:
      'Cohesive strategy, reliable turnaround, and commercial accountability under one roof.',
    whyReasons: [
      {
        title: 'Six Services Under One Roof',
        detail:
          'Social Media, Content, Influencer Marketing, Media Buying, Brand Activation, and Visual Design executed by one team.',
      },
      {
        title: 'Five African Markets',
        detail:
          'Nairobi HQ with active delivery across Kenya, Uganda, Rwanda, DRC, and Zambia.',
      },
      {
        title: 'Creator & Retail Reach',
        detail:
          'Commercial production paired with vetted creators, mall roadshows, and consumer sampling.',
      },
      {
        title: 'Commercial Accountability',
        detail:
          'Disciplined media planning and clear reporting tied directly to growth.',
      },
    ],
    partnerHeading: 'Ready to partner with us?',
    partnerBody: 'Schedule a discovery conversation with our Nairobi leadership and strategy team.',
    startProject: 'Start a Project',
  },
  servicesPage: {
    heroTitle: 'One connected team. Six specialized services.',
    heroSubtitle:
      'Social Media Management, Content Creation & Marketing, Influencer Marketing, Media Buying, Brand Activation, and Visual Design executed together under one agency roof.',
    allServices: 'All Services',
    requestProposal: 'Request Proposal',
    exploreFullPage: 'Explore Full Service Page',
    fullServiceAndWork: 'Full service & work',
    discussService: 'Discuss this service',
    unifiedHeading: 'Unified Multi-Market Execution.',
    unifiedBody:
      'Available across Kenya, Uganda, Rwanda, the Democratic Republic of Congo, and Zambia from our Kilimani headquarters.',
    viewAllServices: 'View All Services',
    readyHeading: 'Ready to Commission a Brief?',
    readyBody:
      'Combine two or more of our six services or initiate an ongoing monthly retainer tailored to your growth stage.',
    startBrief: 'Start a Project Brief',
  },
  serviceDetail: {
    notFoundTitle: 'Service Not Found',
    notFoundBody:
      'Explore our six core agency services: Social Media Management, Content Creation & Marketing, Influencer Marketing, Media Buying, Brand Activation, and Visual Design.',
    viewServices: 'View Services',
    requestProposal: 'Request a Proposal',
    explorePreviousWork: 'Explore Previous Work',
    strategicImpact: 'Strategic Commercial Impact.',
    bestSuitedFor: 'Best Suited For',
    metricsTracked: 'Key Performance Metrics We Track',
    deliverablesSuffix: 'Deliverables.',
    processHeading: 'Our 5-Stage Process.',
    kickOffBrief: 'Kick Off Brief',
    selectedWorkPrefix: 'Selected Work:',
    viewFullPortfolio: 'View full agency portfolio',
    readFullCaseStudy: 'Read Full Case Study',
    otherServicesHeading: 'Our Other Services.',
    readyPrefix: 'Ready to brief us on',
    readySuffix: '?',
    readyBody:
      'Share your goals and timeline with our Nairobi team to receive a structured scope and campaign proposal.',
    startBriefPrefix: 'Start a Brief',
  },
  work: {
    heroTitle: 'Work made to move people.',
    heroSubtitle:
      'Our recent deliveries across brand campaigns, visual identity, content, and activations.',
    featuredHeading: 'Recent work.',
    categoryHeadingSuffix: 'Work.',
    noProjects: 'No projects published under this category yet.',
    viewAllWork: 'View All Work',
    moreHeading: 'More Brand Activations & Design.',
    exploreByCoreHeading: 'Explore By Core Service.',
    exploreByCoreBody:
      'Browse campaign processes and related work across our six dedicated services.',
    readFullCaseStudy: 'Read Case Study',
    ctaHeading: 'Have a project in mind?',
    ctaBody:
      'Connect with our Nairobi strategy desk across East, Central, and Southern Africa.',
    startBrief: 'Start a Project Brief',
  },
  caseStudy: {
    backToWork: 'Back to Our Work',
    notFoundTitle: 'Case Study Not Found',
    notFoundBody: 'The requested portfolio entry could not be located or is currently unpublished.',
    clientLabel: 'Client',
    sectorLabel: 'Industry Sector',
    timelineLabel: 'Engagement Timeline',
    servicesUsedLabel: 'Services Deployed',
    overviewHeading: 'Project Overview.',
    objectivesHeading: 'Strategic Objectives.',
    challengeHeading: 'The Challenge.',
    strategyHeading: 'Our Strategy.',
    phasesHeading: 'Execution Phases.',
    deliverablesHeading: 'Deliverables.',
    specsHeading: 'Mandate Specifications',
    outcomesHeading: 'Documented Outcomes',
    featuredCreatorsHeading: 'Featured Campaign Creators',
    commissionHeading: 'Commission a similar project',
    commissionBodyPrefix: 'Start a brief with Exponential Marketing Agency pre-tagged for',
    startSimilarProject: 'Start Similar Project',
    galleryHeading: 'Campaign Gallery.',
    relatedHeading: 'Related Case Studies.',
    allPortfolioProjects: 'All portfolio projects',
    readCaseStudy: 'Read Case Study',
  },
  insights: {
    heroTitle: 'Insights built to grow brands.',
    heroSubtitle:
      'Field notes, campaign playbooks, and creative analysis across Kenya, Uganda, Rwanda, DRC, and Zambia.',
    heroDetail:
      'Practical strategy dispatches from our Nairobi headquarters covering Social Media Management, Content Creation & Marketing, Influencer Marketing, Media Buying, Brand Activation, and Visual Design—written for marketing teams turning brand attention into measurable regional growth.',
    heroHighlights: [
      {
        title: 'Social & Creator Engagement',
        detail:
          'Community growth frameworks, Meta & TikTok playbooks, and vetted influencer collaborations tailored to East African audiences.',
      },
      {
        title: 'Content & Visual Storytelling',
        detail:
          'Commercial video strategy, photography direction, and cohesive visual identity systems engineered for immediate brand recall.',
      },
      {
        title: 'Media Buying & Growth Analytics',
        detail:
          'Data-informed paid media optimization, mall and retail activations, and clear reporting tied to commercial ROI.',
      },
    ],
    searchPlaceholder: 'Search articles, topics, authors...',
    readFullArticle: 'Read Full Article',
    noMatch: 'No articles matched your current filter or search term.',
    resetFilters: 'Reset Filters',
    latestDispatches: 'Latest Agency Dispatches.',
    noAdditional: 'No additional dispatches matched your current search criteria.',
    showAll: 'Show All Insights',
  },
  article: {
    notFoundTitle: 'Article Not Found',
    notFoundBody: 'This publication may have been archived or unpublished.',
    backToInsights: 'Back to Insights',
    byLabel: 'By',
    inThisDispatch: 'In This Dispatch',
    exploreServicesHeading: 'Explore Our Six Services.',
    exploreServicesBody:
      'Apply these insights directly to your next campaign with Exponential Marketing Agency across Kenya, Uganda, Rwanda, DRC, and Zambia.',
    startBrief: 'Start a Project Brief',
    relatedInsights: 'Related Insights.',
    readFullArticle: 'Read Full Article',
  },
  contact: {
    heroTitle: 'Connect with our Nairobi team.',
    heroSubtitle:
      'Submit a Smart Project Inquiry brief below or connect directly with Exponential Marketing Agency by phone, email, or WhatsApp.',
    verifiedContactHeading: 'Verified Nairobi Contact',
    hqLabel: 'Nairobi Headquarters',
    emailLabel: 'Email',
    phoneLabel: 'Telephone',
    whatsappBtn: 'Message Us on WhatsApp',
    officialChannels: 'Official Channels',
    startBriefHeading: 'Start Your Project Brief.',
    startBriefBody:
      'Select from our six core capabilities, share your goals, and receive a tracked inquiry reference code immediately.',
    regionalCoverageHeading: 'Regional Brief Coverage.',
    regionalCoverageBody:
      'From our Nairobi headquarters, we coordinate campaigns across East, Central, and Southern Africa.',
    visitOfficeHeading: 'Visit Our Nairobi Office.',
    visitOfficeSub: 'Inspect location details and get directions to A3-10 Casamia, Ngong Road.',
  },
  ecosystem: {
    heroTitle: 'Four connected practice pillars built to grow brands together.',
    heroSubtitle:
      'Engage a focused capability or commission an integrated campaign uniting Social Media Management, Content Creation & Marketing, Influencer Marketing, Media Buying, Brand Activation, and Visual Design.',
    viewPagePrefix: 'View',
    startBrief: 'Start a Brief',
    fiveMarketsHeading: 'Five Active Markets.',
    multiCountryNote: 'Multi-country campaign coordination from Nairobi',
    buildHeading: 'Build an Integrated Campaign.',
    buildBody:
      'Connect with our Kilimani strategy team to scope an end-to-end mandate across East, Central, and Southern Africa.',
    startProject: 'Start a Project',
  },
  team: {
    heroTitle: 'Our Team.',
    heroSubtitle:
      'Executive leadership, human resources, finance, and campaign specialists collaborating from A3-10 Casamia, Ngong Road, Kilimani.',
    collaborateHeading: 'COLLABORATE WITH OUR TEAM',
    fourPillarsHeading: 'Four Pillars as One Team.',
    exploreServices: 'Explore Services',
    viewPrefix: 'View',
    workWithUsHeading: 'Work With Our Team.',
    workWithUsBody:
      'Share your objectives across Social Media, Content, Influencer Marketing, Media Buying, Brand Activation, or Visual Design.',
    startProject: 'Start a Project',
  },
  form: {
    modalTitle: 'Tell us what we are building together.',
    closeDialog: 'Close inquiry dialog',
    fullName: 'Full Name *',
    fullNamePlaceholder: 'Your full name',
    businessEmail: 'Business Email *',
    companyName: 'Company / Organisation *',
    phone: 'Telephone Number *',
    industry: 'Industry *',
    selectIndustry: 'Select industry',
    budget: 'Estimated Budget *',
    selectBudget: 'Select budget',
    timeline: 'Project Timeline *',
    selectTimeline: 'Select timeline',
    requiredServices: 'Required Services (Select all that apply) *',
    selectServiceAreasPlaceholder: 'Select service areas (Visual Brand, Content, Social Media, Activation)...',
    areasSelectedSuffix: 'areas selected',
    areaSelectedSuffix: 'area selected',
    servicesSelectedSuffix: 'services selected',
    serviceSelectedSuffix: 'service selected',
    selectOptionsPlaceholder: 'Choose specific services...',
    optionsCountSuffix: 'options',
    doneButton: 'Done',
    clearAllButton: 'Clear all',
    serviceValidationEmpty: 'Please select at least one service area and specific service.',
    serviceValidationPickOption: 'Please select at least one specific service from the category dropdown(s) below.',
    descriptionLabel: 'Project Description & Objectives *',
    descriptionPlaceholder: 'Outline your goals, target audience, deliverables, or event dates...',
    consentPrefix:
      'I confirm that the details provided are accurate and consent to Exponential Marketing Agency processing this inquiry confidentially under the',
    privacyPolicy: 'Privacy Policy',
    consentSuffix: '(Kenya Data Protection Act, 2019).',
    urgentPrefix: 'Your project details are submitted to our inquiry system. For urgent follow-up, email',
    orCall: 'or call',
    secureSubmission: 'Secure submission · Required fields are marked above.',
    submitting: 'Submitting…',
    submitButton: 'Submit Project Inquiry',
    recordedTitle: 'Inquiry recorded',
    recordedBody:
      'Your project inquiry has been saved. Email notification is not configured through this form; for urgent follow-up, contact us directly.',
    emailTeam: 'Email the team',
  },
  research: {
    heading: 'East African Market Research.',
    subtitle:
      'Query live market context across Social Media Management, Content Creation & Marketing, Influencer Marketing, Media Buying, Brand Activation, and Visual Design with verifiable web source citations.',
    placeholder: 'e.g., Influencer marketing regulation and creator rates in Kenya...',
    researching: 'Researching...',
    researchBtn: 'Research Topic',
    tryLabel: 'Try:',
    sourcesLabel: 'Verified Google Search Sources',
    topics: [
      'Digital marketing and social commerce trends in Kenya 2026',
      'Influencer marketing ROI and creator partnerships in East Africa',
      'Experiential brand activation strategies in Nairobi retail',
    ],
  },
  legal: {
    privacyTitle: 'Privacy Policy',
    termsTitle: 'Terms & Conditions',
    organisationLabel: 'Organisation',
    effectiveDateLabel: 'Effective / Last Reviewed: November 2026',
    switchToPrivacy: 'Read Privacy Policy',
    switchToTerms: 'Read Terms & Conditions',
    contactLegalLabel: 'Questions for Our Data & Legal Desk?',
  },
  notFound: {
    badge: '404 · Page Not Found',
    heading: 'That page does not exist or may have moved.',
    body: 'Explore our six core services, campaign portfolio, and Nairobi contact details using the links below.',
    returnHome: 'Return to Home',
    viewWork: 'View Our Work',
    contactTeam: 'Contact Our Team',
  },
  seo: {
    homeTitle: 'Exponential Marketing Agency — Brand Growth & Creative',
    homeDescription:
      'Nairobi marketing agency uniting Social Media, Content, Influencer Marketing, Media Buying, Brand Activation, and Visual Design across East Africa.',
    homeKeywords:
      'Exponential Marketing Agency, Nairobi marketing agency, Social Media Management Kenya, Influencer Marketing Kenya, Brand Activation, Visual Design, Media Buying',
    aboutTitle: 'About Us — Exponential Marketing Agency Nairobi',
    aboutDescription:
      'Discover Exponential Marketing Agency in Kilimani, Nairobi: our leadership, I.D.E.A.L. values, and integrated delivery across five African markets.',
    ecosystemTitle: 'Our Ecosystem — Exponential Marketing Agency',
    ecosystemDescription:
      'Explore four connected pillars uniting Design, Content, Social Media, Creators, Paid Media, and Brand Activation across five African markets.',
    servicesTitle: 'Services Overview — Exponential Marketing Agency',
    servicesDescription:
      'Six integrated agency services: Social Media Management, Content Creation, Influencer Marketing, Media Buying, Brand Activation, and Visual Design.',
    workTitle: 'Our Work & Case Studies — Exponential Marketing Agency',
    workDescription:
      'Browse verified brand activations, influencer campaigns, visual identities, and social growth case studies across Kenya and East Africa.',
    insightsTitle: 'Agency Insights & Dispatches — Exponential Marketing',
    insightsDescription:
      'Read playbooks and field notes on East African social media, creator marketing, media buying, visual branding, and experiential retail.',
    faqTitle: 'Frequently Asked Questions — Exponential Marketing Agency',
    faqDescription:
      'Clear answers on retainers, multi-market delivery, creator vetting, media buying budgets, and campaign timelines with Exponential Marketing Agency.',
    teamTitle: 'Leadership & Team — Exponential Marketing Agency',
    teamDescription:
      'Meet our executive leadership, operations, finance, and creative campaign specialists based at Casamia, Ngong Road in Kilimani, Nairobi.',
    contactTitle: 'Contact Us — Exponential Marketing Agency Nairobi',
    contactDescription:
      'Start a project brief or reach our Kilimani, Nairobi desk by email, phone, or WhatsApp for campaigns across Kenya, Uganda, Rwanda, DRC, and Zambia.',
    privacyTitle: 'Privacy Policy — Exponential Marketing Agency',
    privacyDescription:
      'Learn how Exponential Marketing Agency collects, secures, and processes client inquiry data under the Kenya Data Protection Act, 2019.',
    termsTitle: 'Terms & Conditions — Exponential Marketing Agency',
    termsDescription:
      'Review the terms of service, project briefing conditions, intellectual property standards, and governance for Exponential Marketing Agency.',
    adminTitle: 'Staff CMS Workspace — Exponential Marketing Agency',
    adminDescription:
      'Restricted staff workspace for managing Exponential Marketing Agency portfolio showcases, client inquiries, editorial articles, and site settings.',
    notFoundTitle: 'Page Not Found — Exponential Marketing Agency',
    notFoundDescription:
      'The page you requested could not be found. Explore Exponential Marketing Agency services, campaign portfolio, insights, or contact our team.',
  },
};

export const SW_STRINGS: UiStrings = {
  nav: {
    home: 'Nyumbani',
    about: 'Kuhusu Sisi',
    services: 'Huduma',
    work: 'Kazi Zetu',
    insights: 'Makala',
    contact: 'Wasiliana',
    letsTalk: 'Ongea Nasi',
    openMenu: 'Fungua menyu ya urambazaji',
    closeMenu: 'Funga menyu ya urambazaji',
    languageLabel: 'Lugha',
  },
  footer: {
    servicesTitle: 'Huduma Zetu',
    exploreTitle: 'Kurasa Zetu',
    contactTitle: 'Wasiliana Nasi',
    focusBody:
      'Tunajikita pekee katika Usimamizi wa Mitandao ya Kijamii, Uundaji wa Maudhui na Masoko, Masoko Kupitia Washawishi, Ununuzi wa Nafasi za Matangazo, Uhamasishaji wa Chapa, na Usanifu wa Taswira.',
    whatsappCta: 'Zungumza nasi WhatsApp',
    bioSuffix:
      'Tunasaidia chapa kujitokeza katika enzi ya kidijitali kote Kenya, Uganda, Rwanda, Jamhuri ya Kidemokrasia ya Kongo, na Zambia.',
    privacy: 'Sera ya Faragha',
    terms: 'Vigezo na Masharti',
    staffLogin: 'Ingia (Timu)',
    backToTop: 'Rudi Juu',
    rightsReserved: 'Haki zote zimehifadhiwa.',
    exploreLinks: {
      about: 'Kuhusu Sisi',
      services: 'Muhtasari wa Huduma',
      work: 'Kazi Zetu',
      insights: 'Makala na Uchambuzi',
      faq: 'Maswali (FAQ)',
      contact: 'Wasiliana Nasi',
    },
  },
  home: {
    heroLine1: 'Tunasaidia chapa',
    heroLine2: 'kujitokeza.',
    heroSubtitle:
      'Suluhu Bunifu kwa Ukuaji Mkubwa. Tukutane kwa kahawa tujenge mkakati unaokuza chapa yako.',
    grabCoffeeCta: 'Tukutane kwa kahawa.',
    exploreWorkCta: 'Tazama Kazi Zetu',
    talkToTeamCta: 'Ongea na timu yetu',
    recentWorkHeading: 'Kazi za hivi karibuni',
    prevWorkAria: 'Sogeza kazi za hivi karibuni nyuma',
    nextWorkAria: 'Sogeza kazi za hivi karibuni mbele',
    introHeading: 'UKUAJI WA PAMOJA WA CHAPA CHINI YA TIMU MOJA.',
    introP1:
      'Kutoka makao makuu yetu Kilimani, Nairobi, timu moja iliyoungana inaunganisha ubunifu, ufikiaji wa kidijitali, na matukio ya chapa katika masoko matano ya Afrika.',
    introP2:
      'Timu moja, uwajibikaji ulio wazi, na matokeo yanayopimika kuanzia utambulisho hadi uhamasishaji.',
    learnMoreCta: 'Jifunze zaidi',
    introStrips: [
      {
        label: 'Usanifu wa Taswira',
        sub: 'Mifumo ya Chapa, Vifungashio na Uchapishaji',
        slug: 'visual-design',
      },
      {
        label: 'Maudhui',
        sub: 'Upigaji Picha, Video za Kibiashara na Uandishi',
        slug: 'content-creation-and-marketing',
      },
      {
        label: 'Mitandao na Washawishi',
        sub: 'Usimamizi wa Jamii, Washawishi na Matangazo',
        slug: 'social-media-management',
      },
      {
        label: 'Uhamasishaji wa Chapa',
        sub: 'Matukio Madukani, Sampuli na Uzinduzi',
        slug: 'brand-activation',
      },
    ],
    pillarsHeading: 'Nguzo nne zinazofanya kazi kwa pamoja.',
    sixPillarsHeading: 'Huduma sita zinazofanya kazi kwa pamoja.',
    howPracticeConnects: 'Tazama huduma zote',
    prevPillarsAria: 'Sogeza huduma nyuma',
    nextPillarsAria: 'Sogeza huduma mbele',
    readMoreCta: 'Soma zaidi',
    exploreLabel: 'Tazama',
    requestBrief: 'Omba Pendekezo',
    campaignsHeading: 'Kampeni teule na chapa zinazoongoza.',
    viewFullPortfolio: 'Tazama jalada lote',
    readCaseStudy: 'Soma Maelezo ya Mradi',
    noProjectsUnder: 'Hakuna miradi iliyochapishwa katika kundi hili kwa sasa.',
    showAllCategories: 'Onyesha Makundi Yote',
    sixCoreServicesHeading: 'Huduma Sita Kuu.',
    allServicesFilter: 'Huduma Zote',
    viewProcessAndWork: 'Tazama mchakato na kazi za awali',
    inquireLabel: 'Uliza',
    acrossMarketsHeading: 'Katika Masoko Matano ya Afrika.',
    marketsSubtitle: 'Kenya, Uganda, Rwanda, DRC na Zambia',
    regionalCoord: 'Uratibu wa kikanda kutoka makao makuu Nairobi',
    idealHeading: 'Maadili Yetu ya I.D.E.A.L.',
    idealIntro:
      'Imeegemezwa katika viwango vya Ubunifu, Utegemewa, Maadili, Uwajibikaji, na Uongozi.',
    clientPerspectivesHeading: 'Mitazamo ya Wateja.',
    howWeDeliverHeading: 'Jinsi Tunavyotekeleza.',
    howWeDeliverSubtitle: 'Kuanzia wazo bunifu hadi utekelezaji kamili—mtiririko mmoja thabiti.',
    plugInLabel: 'Imewashwa kwa ukuaji',
    aboutAgencyCta: 'Kuhusu Shirika Letu',
    teamHeading: 'Uongozi na Timu Yetu.',
    exploreTeamCta: 'Tazama Timu Yetu',
    latestInsightsHeading: 'Makala Mapya ya Shirika.',
    allInsightsCta: 'Makala yote',
    prevInsightsAria: 'Sogeza makala mapya nyuma',
    nextInsightsAria: 'Sogeza makala mapya mbele',
    readArticle: 'Soma Makala Haya',
    finalCtaHeading: 'TUJENGE JAMBO KUBWA PAMOJA.',
    finalCtaBody:
      'Suluhu Bunifu kwa Ukuaji Mkubwa. Wasiliana na timu yetu Nairobi kupanga kampeni yako ijayo.',
    startProjectCta: 'ANZA MRADI',
    workflowStages: [
      {
        step: '01',
        title: 'Maelezo na Mkakati',
        detail:
          'Kuoanisha malengo ya chapa, hadhira lengwa, na muktadha wa soko nchini Kenya na ukanda wa Afrika.',
      },
      {
        step: '02',
        title: 'Usanifu na Maudhui',
        detail:
          'Kubuni taswira thabiti za chapa, matangazo, uandishi, picha za kibiashara, na video za kampeni.',
      },
      {
        step: '03',
        title: 'Utekelezaji na Washawishi',
        detail:
          'Kusimamia Meta na TikTok, ushirikiano na washawishi, matangazo ya kulipia, na matukio ya madukani.',
      },
      {
        step: '04',
        title: 'Ripoti za Matokeo',
        detail:
          'Kufuatilia ufikiaji, ushiriki, matumizi ya bajeti, na mwitikio wa wateja ili kuboresha ukuaji.',
      },
    ],
  },
  partners: {
    heading: 'Tunaaminiwa na chapa zinazoongoza.',
    subtitle:
      'Mashirika yaliyopo katika jalada letu la kampeni kote Kenya, Uganda, Rwanda, DRC, Zambia na ukanda mzima.',
    verifiedClientsLabel: 'wateja waliothibitishwa',
    prevAria: 'Sogeza orodha nyuma',
    nextAria: 'Sogeza orodha mbele',
  },
  faq: {
    heroTitle: 'Maswali Yanayoulizwa Mara kwa Mara.',
    heroSubtitle:
      'Majibu wazi kuhusu jinsi Exponential Marketing Agency inavyotekeleza Usimamizi wa Mitandao ya Kijamii, Maudhui, Washawishi, Ununuzi wa Nafasi za Matangazo, Uhamasishaji wa Chapa, na Usanifu wa Taswira.',
    questionsHeading: 'Maswali na Majibu ya Kawaida.',
    stillHaveQuestions: 'Bado Una Swali Kuhusu Mradi Wako?',
    stillHaveQuestionsBody:
      'Zungumza moja kwa moja na dawati letu la mikakati Nairobi au tuma maelezo kupitia fomu ya mradi.',
    askOurTeam: 'Tuma Ombi la Mradi',
    exploreServices: 'Tazama Huduma',
  },
  about: {
    heroTitle: 'Mawazo bunifu kwa ukuaji bora.',
    heroSubtitle:
      'Kutoka Kilimani, Nairobi, tunaunganisha mkakati wa ubunifu, ufikiaji wa kidijitali, na matukio ya chapa kote Afrika.',
    whoWeAre: 'Sisi Ni Nani',
    whoWeAreP1:
      'Exponential Marketing Agency inaleta taaluma sita mahususi chini ya timu moja iliyoungana—ili ubunifu, kidijitali, na matukio yafanye kazi kwa pamoja.',
    whoWeAreP2:
      'Kutoka makao makuu yetu Casamia, Kilimani, tunasaidia chapa kujitokeza kwa uwazi, kasi, na matokeo ya kibiashara yanayopimika.',
    exploreSixServices: 'Tazama huduma zetu sita',
    exploreWorkCta: 'Tazama kazi zetu',
    ourVision: 'Dira Yetu',
    visionBody:
      'Kuwa wakala mkuu wa masoko barani Afrika kupitia maarifa, ubunifu, na teknolojia.',
    ourMission: 'Dhamira Yetu',
    missionBody:
      'Kusaidia chapa kujitokeza katika enzi ya kidijitali kupitia utekelezaji shirikishi wa ubunifu, kidijitali, na matukio.',
    coreValues: 'Maadili Yetu ya I.D.E.A.L.',
    coreValuesIntro:
      'Kila ushirikiano na Exponential Marketing Agency unazingatia nguzo za I.D.E.A.L.—Ubunifu, Utegemewa, Maadili, Uwajibikaji, na Uongozi.',
    ourMarkets: 'Masoko Yetu',
    discussMarketCta: 'Jadili kampeni ya kikanda',
    ourTeam: 'Timu Yetu',
    ourTeamIntro:
      'Uongozi mkuu, utawala, fedha, na wataalamu wa ubunifu wanaofanya kazi pamoja kutoka Nairobi.',
    meetTeamCta: 'Tazama timu kamili',
    whyChooseUs: 'Kwa Nini Utuchague',
    whyChooseUsIntro:
      'Mkakati thabiti, utekelezaji wa uhakika, na uwajibikaji wa kibiashara chini ya paa moja.',
    whyReasons: [
      {
        title: 'Huduma Sita Chini ya Paa Moja',
        detail:
          'Mitandao ya Kijamii, Maudhui, Washawishi, Matangazo ya Kulipia, Uhamasishaji wa Chapa, na Usanifu wa Taswira chini ya timu moja.',
      },
      {
        title: 'Masoko Matano ya Afrika',
        detail:
          'Makao makuu Nairobi yenye utekelezaji nchini Kenya, Uganda, Rwanda, DRC, na Zambia.',
      },
      {
        title: 'Ufikiaji wa Washawishi na Maduka',
        detail:
          'Uzalishaji wa kibiashara pamoja na washawishi waliohakikiwa na matukio ya ugawaji sampuli.',
      },
      {
        title: 'Uwajibikaji wa Kibiashara',
        detail:
          'Mipango bora ya matangazo na ripoti zilizo wazi zinazolenga ukuaji wa moja kwa moja.',
      },
    ],
    partnerHeading: 'Uko tayari kushirikiana nasi?',
    partnerBody: 'Panga mazungumzo ya awali na timu yetu ya uongozi na mikakati Nairobi.',
    startProject: 'Anza Mradi',
  },
  servicesPage: {
    heroTitle: 'Timu moja iliyoungana. Huduma sita mahususi.',
    heroSubtitle:
      'Usimamizi wa Mitandao ya Kijamii, Uundaji wa Maudhui na Masoko, Masoko Kupitia Washawishi, Ununuzi wa Nafasi za Matangazo, Uhamasishaji wa Chapa, na Usanifu wa Taswira chini ya paa moja.',
    allServices: 'Huduma Zote',
    requestProposal: 'Omba Pendekezo',
    exploreFullPage: 'Tazama Huduma Kamili',
    fullServiceAndWork: 'Maelezo na kazi zilizofanywa',
    discussService: 'Jadili huduma hii',
    unifiedHeading: 'Utekelezaji wa Kikanda kwa Pamoja.',
    unifiedBody:
      'Huduma zote zinapatikana kote Kenya, Uganda, Rwanda, Jamhuri ya Kidemokrasia ya Kongo, na Zambia kutoka makao makuu yetu Nairobi.',
    viewAllServices: 'Tazama Huduma Zote',
    readyHeading: 'Uko Tayari Kuanza Mradi?',
    readyBody:
      'Unganisha huduma mbili au zaidi kati ya huduma zetu sita au anza mkataba wa kila mwezi unaoendana na malengo yako.',
    startBrief: 'Tuma Maelezo ya Mradi',
  },
  serviceDetail: {
    notFoundTitle: 'Huduma Haikupatikana',
    notFoundBody:
      'Tazama huduma zetu sita kuu: Usimamizi wa Mitandao ya Kijamii, Maudhui, Masoko Kupitia Washawishi, Ununuzi wa Nafasi za Matangazo, Uhamasishaji wa Chapa, na Usanifu wa Taswira.',
    viewServices: 'Tazama Huduma',
    requestProposal: 'Omba Pendekezo',
    explorePreviousWork: 'Tazama Kazi za Awali',
    strategicImpact: 'Athari ya Kimkakati Kibiashara.',
    bestSuitedFor: 'Inafaa Zaidi Kwa',
    metricsTracked: 'Vipimo Vikuu Tunavyofuatilia',
    deliverablesSuffix: '— Kazi Zinazotolewa.',
    processHeading: 'Mchakato Wetu wa Hatua 5.',
    kickOffBrief: 'Anza Sasa',
    selectedWorkPrefix: 'Kazi Teule:',
    viewFullPortfolio: 'Tazama jalada lote la shirika',
    readFullCaseStudy: 'Soma Maelezo Kamili',
    otherServicesHeading: 'Huduma Zetu Nyingine.',
    readyPrefix: 'Uko tayari kutupa maelezo ya',
    readySuffix: '?',
    readyBody:
      'Shiriki malengo na muda wako na timu yetu ya Nairobi ili kupokea pendekezo kamili la kampeni.',
    startBriefPrefix: 'Tuma Maelezo ya Mradi',
  },
  work: {
    heroTitle: 'Kazi zinazovutia na kuhamasisha watu.',
    heroSubtitle:
      'Kazi zetu za hivi karibuni katika kampeni za chapa, utambulisho wa taswira, maudhui, na matukio.',
    featuredHeading: 'Kazi za hivi karibuni.',
    categoryHeadingSuffix: '— Miradi.',
    noProjects: 'Hakuna miradi iliyochapishwa katika kundi hili kwa sasa.',
    viewAllWork: 'Tazama Kazi Zote',
    moreHeading: 'Matukio Zaidi na Usanifu.',
    exploreByCoreHeading: 'Tazama Kwa Huduma Kuu.',
    exploreByCoreBody:
      'Tazama michakato ya kazi na miradi iliyokamilishwa katika huduma zetu sita.',
    readFullCaseStudy: 'Soma Mradi',
    ctaHeading: 'Una mradi akilini?',
    ctaBody:
      'Wasiliana na timu yetu ya Nairobi kote Afrika Mashariki, Kati na Kusini.',
    startBrief: 'Tuma Maelezo ya Mradi',
  },
  caseStudy: {
    backToWork: 'Rudi Kwenye Kazi Zetu',
    notFoundTitle: 'Mradi Haukupatikana',
    notFoundBody: 'Kumbukumbu ya mradi huu haikupatikana au haijachapishwa.',
    clientLabel: 'Mteja',
    sectorLabel: 'Sekta ya Biashara',
    timelineLabel: 'Muda wa Mradi',
    servicesUsedLabel: 'Huduma Zilizotumika',
    overviewHeading: 'Muhtasari wa Mradi.',
    objectivesHeading: 'Malengo ya Kimkakati.',
    challengeHeading: 'Changamoto.',
    strategyHeading: 'Mkakati Wetu.',
    phasesHeading: 'Awamu za Utekelezaji.',
    deliverablesHeading: 'Kazi Zilizotolewa.',
    specsHeading: 'Maelezo ya Utekelezaji',
    outcomesHeading: 'Matokeo Yaliyorekodiwa',
    featuredCreatorsHeading: 'Washawishi Walioshiriki',
    commissionHeading: 'Agiza mradi unaofanana na huu',
    commissionBodyPrefix: 'Anza ombi la mradi na Exponential Marketing Agency kwa huduma ya',
    startSimilarProject: 'Anza Mradi Kama Huu',
    galleryHeading: 'Picha za Kampeni.',
    relatedHeading: 'Miradi Mingine Inayofanana.',
    allPortfolioProjects: 'Miradi yote ya jalada',
    readCaseStudy: 'Soma Maelezo ya Mradi',
  },
  insights: {
    heroTitle: 'Mitazamo bunifu ya kukuza chapa.',
    heroSubtitle:
      'Maelezo ya kitaalamu, mikakati ya kampeni, na uchambuzi wa ubunifu kote Kenya, Uganda, Rwanda, DRC, na Zambia.',
    heroDetail:
      'Makala ya kimkakati kutoka makao makuu yetu Nairobi kuhusu Usimamizi wa Mitandao ya Kijamii, Uundaji wa Maudhui na Masoko, Masoko Kupitia Washawishi, Ununuzi wa Nafasi za Matangazo, Uhamasishaji wa Chapa, na Usanifu wa Taswira—kwa timu zinazogeuzia umakini wa soko kuwa ukuaji halisi wa kibiashara.',
    heroHighlights: [
      {
        title: 'Mitandao ya Kijamii na Washawishi',
        detail:
          'Mbinu za kukuza jamii, mikakati ya Meta na TikTok, na ushirikiano na washawishi waliohakikiwa kwa hadhira ya Afrika Mashariki.',
      },
      {
        title: 'Maudhui na Usanifu wa Taswira',
        detail:
          'Mikakati ya video za kibiashara, upigaji picha, na mifumo thabiti ya utambulisho wa chapa inayojenga kumbukumbu ya haraka.',
      },
      {
        title: 'Matangazo ya Kulipia na Matokeo',
        detail:
          'Uboreshaji wa bajeti za matangazo, matukio ya madukani, na ripoti zilizo wazi zinazolenga matokeo halisi ya mauzo.',
      },
    ],
    searchPlaceholder: 'Tafuta makala, mada, waandishi...',
    readFullArticle: 'Soma Makala Haya Yote',
    noMatch: 'Hakuna makala yaliyopatikana yanayolingana na utafutaji wako.',
    resetFilters: 'Ondoa Vichujio',
    latestDispatches: 'Makala Mapya ya Shirika.',
    noAdditional: 'Hakuna makala mengine yaliyopatikana kwa sasa.',
    showAll: 'Onyesha Makala Yote',
  },
  article: {
    notFoundTitle: 'Makala Hayakupatikana',
    notFoundBody: 'Chapisho hili huenda limeondolewa au halijachapishwa.',
    backToInsights: 'Rudi Kwenye Makala',
    byLabel: 'Yameandikwa na',
    inThisDispatch: 'Katika Makala Haya',
    exploreServicesHeading: 'Tazama Huduma Zetu Sita.',
    exploreServicesBody:
      'Tumia maarifa haya kwenye kampeni yako ijayo na Exponential Marketing Agency kote Kenya, Uganda, Rwanda, DRC, na Zambia.',
    startBrief: 'Tuma Maelezo ya Mradi',
    relatedInsights: 'Makala Mengine.',
    readFullArticle: 'Soma Makala Haya Yote',
  },
  contact: {
    heroTitle: 'Zungumza na timu yetu Nairobi.',
    heroSubtitle:
      'Tuma maelezo ya mradi kupitia fomu hapa chini au wasiliana nasi moja kwa moja kwa simu, barua pepe, au WhatsApp.',
    verifiedContactHeading: 'Mawasiliano Rasmi Nairobi',
    hqLabel: 'Makao Makuu Nairobi',
    emailLabel: 'Barua Pepe',
    phoneLabel: 'Simu',
    whatsappBtn: 'Tutumie Ujumbe WhatsApp',
    officialChannels: 'Mitandao Rasmi',
    startBriefHeading: 'Anza Maelezo ya Mradi.',
    startBriefBody:
      'Chagua huduma unazohitaji, eleza malengo yako, na upokee namba ya kumbukumbu mara moja.',
    regionalCoverageHeading: 'Ufikiaji wa Kikanda.',
    regionalCoverageBody:
      'Kutoka Nairobi, tunaratibu kampeni kote Afrika Mashariki, Kati na Kusini.',
    visitOfficeHeading: 'Tembelea Ofisi Yetu Nairobi.',
    visitOfficeSub: 'Angalia maelekezo ya kufika A3-10 Casamia, Barabara ya Ngong.',
  },
  ecosystem: {
    heroTitle: 'Nguzo nne zilizounganishwa kukuza chapa kwa pamoja.',
    heroSubtitle:
      'Chagua huduma mahususi au kampeni jumuishi inayounganisha Mitandao ya Kijamii, Maudhui, Masoko Kupitia Washawishi, Ununuzi wa Nafasi za Matangazo, Uhamasishaji wa Chapa, na Usanifu wa Taswira.',
    viewPagePrefix: 'Tazama',
    startBrief: 'Tuma Maelezo ya Mradi',
    fiveMarketsHeading: 'Masoko Matano Hai.',
    multiCountryNote: 'Uratibu wa kampeni za nchi nyingi kutoka Nairobi',
    buildHeading: 'Jenga Kampeni Iliyounganishwa.',
    buildBody:
      'Wasiliana na timu yetu ya mikakati Kilimani kupanga mradi wako Afrika Mashariki, Kati na Kusini.',
    startProject: 'Anza Mradi',
  },
  team: {
    heroTitle: 'Timu Yetu.',
    heroSubtitle:
      'Uongozi mkuu, rasilimali watu, fedha, na wataalamu wa kampeni wakishirikiana kutoka A3-10 Casamia, Barabara ya Ngong, Kilimani.',
    collaborateHeading: 'SHIRIKIANI NA TIMU YETU',
    fourPillarsHeading: 'Nguzo Nne Kama Timu Moja.',
    exploreServices: 'Tazama Huduma',
    viewPrefix: 'Tazama',
    workWithUsHeading: 'Fanya Kazi na Timu Yetu.',
    workWithUsBody:
      'Shiriki malengo yako katika Mitandao ya Kijamii, Maudhui, Masoko Kupitia Washawishi, Matangazo, Uhamasishaji wa Chapa, au Usanifu wa Taswira.',
    startProject: 'Anza Mradi',
  },
  form: {
    modalTitle: 'Tuambie tunachojenga pamoja.',
    closeDialog: 'Funga fomu ya mradi',
    fullName: 'Jina Kamili *',
    fullNamePlaceholder: 'Jina lako kamili',
    businessEmail: 'Barua Pepe ya Kazi *',
    companyName: 'Kampuni / Shirika *',
    phone: 'Namba ya Simu *',
    industry: 'Sekta ya Biashara *',
    selectIndustry: 'Chagua sekta',
    budget: 'Kadirio la Bajeti *',
    selectBudget: 'Chagua bajeti',
    timeline: 'Muda wa Mradi *',
    selectTimeline: 'Chagua muda',
    requiredServices: 'Huduma Zinazohitajika (Chagua zote zinazofaa) *',
    selectServiceAreasPlaceholder: 'Chagua maeneo ya huduma (Taswira, Maudhui, Mitandao, Uhamasishaji)...',
    areasSelectedSuffix: 'maeneo yamechaguliwa',
    areaSelectedSuffix: 'eneo limechaguliwa',
    servicesSelectedSuffix: 'huduma zimechaguliwa',
    serviceSelectedSuffix: 'huduma imechaguliwa',
    selectOptionsPlaceholder: 'Chagua huduma mahususi...',
    optionsCountSuffix: 'chaguo',
    doneButton: 'Imekamilika',
    clearAllButton: 'Futa zote',
    serviceValidationEmpty: 'Tafadhali chagua angalau eneo moja la huduma na huduma mahususi.',
    serviceValidationPickOption: 'Tafadhali chagua angalau huduma moja mahususi kutoka kwenye orodha ulizofungua hapo chini.',
    descriptionLabel: 'Maelezo na Malengo ya Mradi *',
    descriptionPlaceholder: 'Eleza malengo yako, hadhira lengwa, au tarehe muhimu za kampeni...',
    consentPrefix:
      'Ninathibitisha kuwa taarifa nilizotoa ni sahihi na ninakubali Exponential Marketing Agency kuzishughulikia kwa usiri chini ya',
    privacyPolicy: 'Sera ya Faragha',
    consentSuffix: '(Sheria ya Ulinzi wa Data ya Kenya, 2019).',
    urgentPrefix: 'Maelezo ya mradi wako hutumwa moja kwa moja kwenye mfumo wetu. Kwa dharura, tuma barua pepe kwa',
    orCall: 'au piga simu',
    secureSubmission: 'Utumaji salama · Sehemu zilizo na alama ya nyota (*) zinahitajika.',
    submitting: 'Inatuma…',
    submitButton: 'Tuma Ombi la Mradi',
    recordedTitle: 'Ombi limepokelewa',
    recordedBody:
      'Maelezo ya mradi wako yamehifadhiwa. Kwa ufuatiliaji wa haraka, wasiliana nasi moja kwa moja.',
    emailTeam: 'Tuma barua pepe',
  },
  research: {
    heading: 'Utafiti wa Soko la Afrika Mashariki.',
    subtitle:
      'Chunguza muktadha wa soko kuhusu Mitandao ya Kijamii, Maudhui, Masoko Kupitia Washawishi, Ununuzi wa Nafasi za Matangazo, Uhamasishaji wa Chapa, na Usanifu wa Taswira kwa vyanzo vilivyothibitishwa.',
    placeholder: 'mfano: Mitindo ya masoko kupitia washawishi na viwango vya matangazo Kenya...',
    researching: 'Inatafuta...',
    researchBtn: 'Fanya Utafiti',
    tryLabel: 'Jaribu:',
    sourcesLabel: 'Vyanzo Vilivyothibitishwa',
    topics: [
      'Mitindo ya masoko ya kidijitali na biashara mtandaoni Kenya 2026',
      'Matokeo ya masoko kupitia washawishi na ushirikiano Afrika Mashariki',
      'Mikakati ya uhamasishaji wa chapa katika maduka makubwa Nairobi',
    ],
  },
  legal: {
    privacyTitle: 'Sera ya Faragha',
    termsTitle: 'Vigezo na Masharti',
    organisationLabel: 'Shirika',
    effectiveDateLabel: 'Tarehe ya Kuanza / Mapitio: Novemba 2026',
    switchToPrivacy: 'Soma Sera ya Faragha',
    switchToTerms: 'Soma Vigezo na Masharti',
    contactLegalLabel: 'Je, Una Swali Kuhusu Faragha au Masharti?',
  },
  notFound: {
    badge: '404 · Ukurasa Haukupatikana',
    heading: 'Ukurasa huu haupo au umehamishwa.',
    body: 'Tazama huduma zetu sita kuu, kazi zilizokamilishwa, na mawasiliano yetu ya Nairobi hapa chini.',
    returnHome: 'Rudi Nyumbani',
    viewWork: 'Tazama Kazi Zetu',
    contactTeam: 'Wasiliana Nasi',
  },
  seo: {
    homeTitle: 'Exponential Marketing Agency — Ukuaji wa Chapa Afrika',
    homeDescription:
      'Wakala wa masoko Nairobi unaounganisha Mitandao ya Kijamii, Maudhui, Washawishi, Matangazo, Uhamasishaji wa Chapa, na Usanifu wa Taswira.',
    homeKeywords:
      'Exponential Marketing Agency, Wakala wa masoko Nairobi, Mitandao ya Kijamii Kenya, Masoko ya Washawishi, Uhamasishaji wa Chapa, Usanifu wa Taswira',
    aboutTitle: 'Kuhusu Sisi — Exponential Marketing Agency Nairobi',
    aboutDescription:
      'Ijue Exponential Marketing Agency kutoka Kilimani, Nairobi: uongozi wetu, maadili ya I.D.E.A.L., na utekelezaji katika masoko matano ya Afrika.',
    ecosystemTitle: 'Mfumo Wetu wa Huduma — Exponential Marketing Agency',
    ecosystemDescription:
      'Gundua nguzo nne zinazounganisha Usanifu, Maudhui, Mitandao ya Kijamii, Washawishi, Matangazo ya Kulipia, na Matukio Afrika Mashariki.',
    servicesTitle: 'Huduma Zetu Sita — Exponential Marketing Agency',
    servicesDescription:
      'Huduma sita zilizounganishwa: Mitandao ya Kijamii, Maudhui, Washawishi, Ununuzi wa Nafasi za Matangazo, Uhamasishaji wa Chapa, na Taswira.',
    workTitle: 'Kazi Zetu na Miradi — Exponential Marketing Agency',
    workDescription:
      'Tazama miradi halisi ya uhamasishaji wa chapa, kampeni za washawishi, mifumo ya taswira, na ukuaji wa mitandao kote Kenya na Afrika Mashariki.',
    insightsTitle: 'Makala na Uchambuzi — Exponential Marketing Agency',
    insightsDescription:
      'Soma mikakati na uchambuzi wa mitandao ya kijamii, masoko kupitia washawishi, matangazo ya kulipia, na matukio ya chapa Afrika Mashariki.',
    faqTitle: 'Maswali ya Mara kwa Mara — Exponential Marketing Agency',
    faqDescription:
      'Majibu wazi kuhusu mikataba, kampeni za kikanda, uteuzi wa washawishi, bajeti za matangazo, na muda wa utekelezaji wa miradi yetu.',
    teamTitle: 'Uongozi na Timu Yetu — Exponential Marketing Agency',
    teamDescription:
      'Kutana na uongozi mkuu, utawala, fedha, na wataalamu wetu wa kampeni wanaofanya kazi kutoka Casamia, Barabara ya Ngong, Kilimani, Nairobi.',
    contactTitle: 'Wasiliana Nasi — Exponential Marketing Agency Nairobi',
    contactDescription:
      'Tuma maelezo ya mradi wako au wasiliana na ofisi yetu Nairobi kwa simu, barua pepe, au WhatsApp kwa kampeni Kenya, Uganda, Rwanda, DRC na Zambia.',
    privacyTitle: 'Sera ya Faragha — Exponential Marketing Agency',
    privacyDescription:
      'Soma jinsi Exponential Marketing Agency inavyokusanya, kulinda, na kushughulikia taarifa za miradi chini ya Sheria ya Ulinzi wa Data Kenya, 2019.',
    termsTitle: 'Vigezo na Masharti — Exponential Marketing Agency',
    termsDescription:
      'Kagua vigezo vya huduma, masharti ya maelezo ya miradi, haki miliki za ubunifu, na utawala wa kibiashara kwa Exponential Marketing Agency.',
    adminTitle: 'Jukwaa la Usimamizi — Exponential Marketing Agency',
    adminDescription:
      'Jukwaa la ndani la wafanyakazi wa Exponential Marketing Agency kusimamia miradi, maombi ya wateja, makala, na mipangilio ya tovuti.',
    notFoundTitle: 'Ukurasa Haukupatikana — Exponential Marketing Agency',
    notFoundDescription:
      'Ukurasa uliotafuta haupatikani. Tazama huduma sita za Exponential Marketing Agency, jalada la kazi, makala, au wasiliana na timu yetu.',
  },
};

export function getUiStrings(lang: Language): UiStrings {
  return lang === 'sw' ? SW_STRINGS : EN_STRINGS;
}

export function normalizeLanguage(val?: string | null): Language {
  return val === 'sw' ? 'sw' : 'en';
}
