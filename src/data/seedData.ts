import type {
  ClientLogo,
  DivisionMeta,
  InsightArticle,
  PortfolioCategory,
  PortfolioProject,
  ServiceItem,
  SiteSettings,
  TeamMember,
  TestimonialItem,
} from '../types/cms';
import { VERIFIED_CONTACT } from './verifiedContact';
export { VERIFIED_CONTACT } from './verifiedContact';
export type { VerifiedContact } from './verifiedContact';

export const OFFICIAL_BRAND_ASSETS = {
  markUrl: '/assets/profile/brand/exp-mark.png',
  darkLockupUrl: '/assets/profile/brand/exp-logo-dark.png',
};

export const TERRITORY_MARKETS = [
  {
    country: 'Kenya',
    role: 'Headquarters & Core Operations',
    notes: 'Nairobi, Nakuru, Narok and nationwide retail, influencer & experiential activations.',
  },
  {
    country: 'Uganda',
    role: 'East African Market',
    notes: 'Regional digital marketing, creator, and brand activation coordination.',
  },
  {
    country: 'Rwanda',
    role: 'East African Market',
    notes: 'Cross-border creative, digital, and campaign execution.',
  },
  {
    country: 'Democratic Republic of Congo',
    role: 'Central African Market',
    notes: 'Regional campaign planning and market expansion support.',
  },
  {
    country: 'Zambia',
    role: 'Southern African Market',
    notes: 'Regional marketing coordination and multi-market brand rollouts.',
  },
];

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  'Influencer Campaigns',
  'Brand Activations',
  'Events',
  'Digital Marketing',
  'Commercial Production',
  'Branding',
];

// Core Values in official I.D.E.A.L. sequence (Company Profile PDF, Page 3)
export const CORE_VALUES = [
  {
    id: 'innovative',
    letter: 'I',
    index: '01',
    title: 'Innovative',
    summary: 'Creative, responsive communication and advertising solutions for every brief.',
    detail:
      'We are innovative and creative in the way we respond to every brief—working consistently to deliver communication and advertising solutions tailored to each client challenge.',
  },
  {
    id: 'dependable',
    letter: 'D',
    index: '02',
    title: 'Dependable',
    summary: 'Our "Can Do" spirit nurtures reliability and long-term collaborations.',
    detail:
      'Our "Can Do" spirit makes us dependable and reliable to our clients while encouraging teamwork and collaborations that build enduring partnerships.',
  },
  {
    id: 'ethical',
    letter: 'E',
    index: '03',
    title: 'Ethical',
    summary: 'Lasting relationships grounded in mutual respect and integrity.',
    detail:
      'We respect one another and recognize that our success depends on ethical, transparent, and trustworthy relationships with clients, creators, and stakeholders.',
  },
  {
    id: 'accountable',
    letter: 'A',
    index: '04',
    title: 'Accountable',
    summary: 'Responsible corporate citizenship across every community where we operate.',
    detail:
      'We strive to be good neighbors and citizens in the communities where we operate across East, Central, and Southern Africa—standing accountable for our work and actions.',
  },
  {
    id: 'leadership',
    letter: 'L',
    index: '05',
    title: 'Leadership',
    summary: 'Continuous growth to remain effective, relevant, and commercially sharp.',
    detail:
      'We endeavor to keep growing as leaders in strategy, creative execution, and technology so our work remains effective and relevant in a fast-moving digital landscape.',
  },
];

// Integrated Delivery Practices reflecting documented Company Profile services
export const DIVISIONS: DivisionMeta[] = [
  {
    id: 'creative',
    name: 'Visual Design & Brand Identity',
    shortName: 'Visual Design',
    tagline: 'Bold Design. Lasting Impact.',
    description:
      'Compelling visual identities and communication collateral—from logo development and complete brand guidelines to posters, roll-up banners, brochures, promotional posts, and packaging.',
    accentHex: '#ED2126',
    imageUrl: '/assets/profile/work/cinnamon-energies-identity.jpg',
    imageAlt: 'Cinnamon Energies brand identity suite designed by Exponential Media Africa',
    ecosystemRole:
      'Establishes memorable brand recognition and visual consistency across digital and print.',
    services: [
      'Logo & brand identity systems',
      'Digital & print graphic design',
      'Promotional posters & banners',
      'Brochures & company profiles',
      'Packaging & merchandise design',
      'Social media post systems',
    ],
  },
  {
    id: 'estudios',
    name: 'Content Creation & Production',
    shortName: 'Content & Production',
    tagline: 'Stories That Build Brands & Drive Action.',
    description:
      'End-to-end concept development, copywriting, commercial photography, videography, motion graphics, and editorial production crafted for high-performing advertising campaigns.',
    accentHex: '#ED2126',
    imageUrl: '/assets/profile/work/content-studio-chair.jpg',
    imageAlt: 'Exponential Media Africa commercial content production lighting and set',
    ecosystemRole:
      'Turns brand messaging into crisp commercial photography, video, and copy tailored to each platform.',
    services: [
      'Commercial photography',
      'Commercial videography',
      'Copywriting & script development',
      'Motion graphics & editing',
      'Blog articles & editorial copy',
      'Multi-format content strategy',
    ],
  },
  {
    id: 'marketing',
    name: 'Digital, Influencer & Media Buy',
    shortName: 'Digital & Influencer',
    tagline: 'Always Present. Targeted Reach.',
    description:
      'Strategic social media management across Meta and TikTok, vetted influencer marketing partnerships, and data-informed media buying designed to maximize return on ad spend.',
    accentHex: '#ED2126',
    imageUrl: '/assets/profile/work/pepsi-kenya-entry.jpg',
    imageAlt: 'Pepsi Kenya market-entry influencer marketing collaboration campaign',
    ecosystemRole:
      'Connects audiences with consistent daily publishing, trusted creator voices, and targeted paid placements.',
    services: [
      'Social media management (Meta & TikTok)',
      'Influencer sourcing, vetting & contracts',
      'Paid media planning & buying',
      'Audience targeting & optimization',
      'Community & reputation management',
      'Campaign performance reporting',
    ],
  },
  {
    id: 'emtc',
    name: 'Brand Activation & Events',
    shortName: 'Brand Activation',
    tagline: 'Bringing Brands to Life.',
    description:
      'High-impact consumer engagement including store launch roadshows, in-store promotions, product sampling tours, mall activations, creator workshops, and branded event execution.',
    accentHex: '#ED2126',
    imageUrl: '/assets/profile/work/galitos-waiyaki-way.jpg',
    imageAlt: "Galito's Waiyaki Way experiential brand activation executed by Exponential team",
    ecosystemRole:
      'Translates digital visibility into live consumer participation and memorable product trial.',
    services: [
      'Experiential marketing campaigns',
      'Store launch roadshows',
      'Product sampling tours',
      'In-store mall promotions',
      'Event management & ambassador hosting',
      'Live workshops & demonstrations',
    ],
  },
];

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  companyName: VERIFIED_CONTACT.companyName,
  tagline: VERIFIED_CONTACT.tagline,
  email: VERIFIED_CONTACT.email,
  primaryPhone: VERIFIED_CONTACT.primaryPhone,
  secondaryPhone: VERIFIED_CONTACT.secondaryPhone,
  headquartersAddress: VERIFIED_CONTACT.headquartersAddress,
  campusAddress: '',
  socialLinks: {
    instagram: '',
    linkedin: '',
    youtube: '',
    x: '',
  },
  impactMetrics: {
    brandsServed: {
      id: 'brandsServed',
      label: 'Documented Clients',
      value: '27',
      unitOrContext: 'Client organisations showcased in the official company profile',
      isPlaceholder: false,
    },
    geographicReach: {
      id: 'geographicReach',
      label: 'Geographic Coverage',
      value: '5 Countries',
      unitOrContext: 'Kenya, Uganda, Rwanda, DRC & Zambia',
      isPlaceholder: false,
    },
    projectsCompleted: {
      id: 'projectsCompleted',
      label: 'Core Capabilities',
      value: '6 Services',
      unitOrContext: 'Social, Content, Influencer, Media Buy, Activation & Design',
      isPlaceholder: false,
    },
    campaignsExecuted: {
      id: 'campaignsExecuted',
      label: 'Portfolio Showcases',
      value: '15 Showcases',
      unitOrContext: 'Documented campaigns & brand identity projects in profile',
      isPlaceholder: false,
    },
    yearsExperience: {
      id: 'yearsExperience',
      label: 'Nairobi Headquarters',
      value: 'Kilimani',
      unitOrContext: 'A3-10 Casamia, Ngong Road, Nairobi',
      isPlaceholder: true,
    },
  },
};

export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 'srv-marketing-1',
    division: 'marketing',
    title: 'Social Media Management',
    problemSolved: 'Replaces inconsistent posting with always-on audience engagement and growth.',
    description:
      'Content ideation, scheduling and publishing, community management, reputation monitoring, Meta (Instagram & Facebook) and TikTok management, performance reporting, and optimization.',
    order: 1,
    status: 'published',
    isDeleted: false,
  },
  {
    id: 'srv-estudios-1',
    division: 'estudios',
    title: 'Content Creation & Marketing',
    problemSolved: 'Delivers audience-focused storytelling that strengthens trust and brand recall.',
    description:
      'Copywriting, graphic design, commercial photography, videography, motion graphics, script development, blog articles, and distribution strategy tailored to campaign objectives.',
    order: 2,
    status: 'published',
    isDeleted: false,
  },
  {
    id: 'srv-marketing-3',
    division: 'marketing',
    title: 'Influencer Marketing',
    problemSolved: 'Connects brands with vetted creators whose audiences trust their recommendations.',
    description:
      'Influencer sourcing and vetting, campaign planning, partnership management, content coordination, contract negotiation, performance tracking, and campaign reporting.',
    order: 3,
    status: 'published',
    isDeleted: false,
  },
  {
    id: 'srv-marketing-4',
    division: 'marketing',
    title: 'Media Buy',
    problemSolved: 'Places campaign messages before target buyers at the right time for better ad ROI.',
    description:
      'Strategic media planning, audience targeting, budget allocation, paid ad placement, continuous campaign optimization, and transparent performance reporting.',
    order: 4,
    status: 'published',
    isDeleted: false,
  },
  {
    id: 'srv-emtc-1',
    division: 'emtc',
    title: 'Brand Activation & Events',
    problemSolved: 'Turns passive awareness into live consumer participation and product trial.',
    description:
      'Experiential marketing campaigns, pop-up events, product sampling tours, in-store promotions, branch opening roadshows, live demonstrations, and interactive brand activations.',
    order: 5,
    status: 'published',
    isDeleted: false,
  },
  {
    id: 'srv-creative-1',
    division: 'creative',
    title: 'Visual Design & Brand Identity',
    problemSolved: 'Unifies brand perception with clear, distinctive digital and print design.',
    description:
      'Logo design and complete brand identity systems, graphic design for digital and print, promotional posters, roll-up banners, brochures, packaging, social media creatives, and corporate branding.',
    order: 6,
    status: 'published',
    isDeleted: false,
  },
];

export { PROJECT_SUPPLEMENTAL_MEDIA } from './projectSupplementalMedia';

export const DEFAULT_PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'proj-pepsi-kenya-entry',
    slug: 'pepsi-kenya-market-entry-influencer-campaign',
    title: 'Pepsi Kenyan Market Entry & QSR Collaboration',
    category: 'Influencer Campaigns',
    division: 'marketing',
    clientName: 'Pepsi (with Pizza Inn & Chicken Inn)',
    summary:
      'Led influencer marketing from strategy to execution announcing Pepsi’s Kenyan market entry and strategic collaboration with Pizza Inn and Chicken Inn.',
    challenge:
      'Establishing rapid cultural relevance and memorable visibility across Kenya as Pepsi announced its market entry alongside flagship QSR partners Pizza Inn and Chicken Inn.',
    solution:
      'Managed influencer sourcing and vetting, campaign planning, partnership management, content coordination, contract negotiation, performance tracking, and campaign reporting.',
    deliverables: [
      'Influencer Sourcing & Vetting',
      'Campaign Strategy & Planning',
      'Creator Partnership Management',
      'Contract Negotiation',
      'Performance Tracking & Reporting',
    ],
    imageUrl: '/assets/profile/work/pepsi-kenya-entry.jpg',
    isPlaceholder: false,
    featured: true,
    status: 'published',
    isDeleted: false,
  },
  {
    id: 'proj-ocean-basket',
    slug: 'ocean-basket-westgate-influencer-engagement',
    title: 'Ocean Basket Westgate — Long-Term Creator Engagement',
    category: 'Influencer Campaigns',
    division: 'marketing',
    clientName: 'Ocean Basket (Westgate Mall)',
    summary:
      'Long-term influencer marketing engagement focused on increasing brand awareness and showcasing Ocean Basket Westgate Mall’s signature dining experience and menu.',
    challenge:
      'Building consistent dining awareness and audience engagement for Ocean Basket’s Westgate Mall restaurant through authentic creator storytelling.',
    solution:
      'Curated long-term partnerships with Kenyan creators Royal Vee, Cera Imani, Nimrat Channa, and Nadia Albana to showcase the dining atmosphere and menu.',
    deliverables: [
      'Long-Term Creator Roster',
      'Dining Experience Coordination',
      'Signature Menu Content',
      'Performance Reporting',
    ],
    imageUrl: '/assets/profile/work/ocean-basket-westgate.jpg',
    isPlaceholder: false,
    featured: true,
    status: 'published',
    isDeleted: false,
  },
  {
    id: 'proj-galitos-activations',
    slug: 'galitos-launch-sauce-sampling-activations',
    title: "Galito's — Narok, Waiyaki Way & Sauce Sampling Activations",
    category: 'Brand Activations',
    division: 'emtc',
    clientName: "Galito's Kenya",
    summary:
      'Multi-location retail launches and interactive product sampling activations across Narok, Waiyaki Way, and BBS Mall.',
    challenge:
      'Sparking immediate consumer excitement, store awareness, and flavor trial across new branch openings and busy urban malls.',
    solution:
      'Deployed branded arches, trained activation ambassadors, neighborhood flyer outreach, and in-mall sauce sampling stations tailored to local shoppers.',
    deliverables: [
      'Store Opening Roadshows',
      'Sauce Product Sampling',
      'Branded Ambassador Staffing',
      'In-Store Promotions',
    ],
    imageUrl: '/assets/profile/work/galitos-waiyaki-way.jpg',
    isPlaceholder: false,
    featured: true,
    status: 'published',
    isDeleted: false,
  },
  {
    id: 'proj-cinnamon-identity',
    slug: 'cinnamon-energies-complete-brand-identity',
    title: 'Cinnamon Energies — Brand Identity & Collateral System',
    category: 'Branding',
    division: 'creative',
    clientName: 'Cinnamon Energies',
    summary:
      'Client brand identity architecture crafted by Exponential Media Africa, featuring geometric emblem design, typography specification, color system, stationery, and branded apparel.',
    challenge:
      'Developing a cohesive visual identity adaptable across corporate letterheads, business cards, branded polo shirts, and caps.',
    solution:
      'Created a geometric emblem paired with #EF4136 / emerald color specifications, typographic hierarchy, stationery templates, and merchandise mockups.',
    deliverables: [
      'Logo & Visual Identity System',
      'Color & Typography Specification',
      'Corporate Stationery & Business Cards',
      'Branded Polo Shirts & Caps',
    ],
    imageUrl: '/assets/profile/work/cinnamon-energies-identity.jpg',
    isPlaceholder: false,
    featured: true,
    status: 'published',
    isDeleted: false,
  },
  {
    id: 'proj-kcb-events',
    slug: 'kcb-corporate-event-management',
    title: 'KCB — Branded Corporate Event Execution',
    category: 'Events',
    division: 'emtc',
    clientName: 'KCB',
    summary:
      'On-ground event management supporting KCB branded registration desks, signage, hospitality staffing, and guest coordination.',
    challenge:
      'Delivering organized guest reception and clean corporate brand visibility across outdoor hospitality environments.',
    solution:
      'Managed custom branded counters, pull-up banners, coordinated event ambassadors, and on-site hospitality logistics.',
    deliverables: [
      'Event Setup & Signage',
      'Registration Desk Logistics',
      'Uniformed Brand Ambassadors',
      'On-Site Guest Coordination',
    ],
    imageUrl: '/assets/profile/work/kcb-event-1.jpg',
    isPlaceholder: false,
    featured: true,
    status: 'published',
    isDeleted: false,
  },
  {
    id: 'proj-content-creation-tecno-big5',
    slug: 'content-creation-tecno-big5-qsr-production',
    title: 'TECNO, Big 5 Construct Kenya, Pizza Inn & Galito’s — Content Creation',
    category: 'Commercial Production',
    division: 'estudios',
    clientName: "TECNO (Transsion Holdings), Big 5 Construct Kenya, Pizza Inn & Galito's",
    summary:
      'High-quality photography and videography production from concept development to final edit for digital marketing and advertising campaigns.',
    challenge:
      'Producing visual assets engineered to strengthen brand storytelling, boost audience engagement, and elevate digital campaign performance.',
    solution:
      'Managed concept development, art direction, commercial photography and videography shoots, editing, and multi-channel campaign delivery.',
    deliverables: [
      'Concept Development',
      'Commercial Photography',
      'Commercial Videography',
      'Editing & Post-Production',
    ],
    imageUrl: '/assets/profile/work/content-studio-chair.jpg',
    isPlaceholder: false,
    featured: false,
    status: 'published',
    isDeleted: false,
  },
  {
    id: 'proj-grill-shack',
    slug: 'grill-shack-lifestyle-food-influencer-campaigns',
    title: 'The Grill Shack — Lifestyle & Food Creator Campaigns',
    category: 'Influencer Campaigns',
    division: 'marketing',
    clientName: 'The Grill Shack',
    summary:
      'Targeted food and lifestyle creator collaborations positioning The Grill Shack as a premier destination for steaks, ribs, and burgers.',
    challenge:
      'Expanding audience reach among Nairobi diners and reinforcing positioning around signature steaks, ribs, and burgers.',
    solution:
      'Collaborated with lifestyle and food creators Sue Owino, Rita Kimwemwe, Leilah Watts, and Naomi Kuria to produce authentic visual dining content.',
    deliverables: [
      'Creator Curation & Briefing',
      'Content Production Coordination',
      'Campaign Management',
    ],
    imageUrl: '/assets/profile/work/grill-shack-dining.jpg',
    isPlaceholder: false,
    featured: false,
    status: 'published',
    isDeleted: false,
  },
  {
    id: 'proj-retail-select-marhaba',
    slug: 'marhaba-stop-and-shop-shell-select-retail-campaigns',
    title: 'Shell Select, Stop & Shop & Marhaba — Promotional Campaigns',
    category: 'Influencer Campaigns',
    division: 'marketing',
    clientName: 'Shell Select, Stop & Shop & Marhaba',
    summary:
      'Creator-led retail campaigns highlighting discounted essentials and in-store promotional offers across convenience and retail outlets.',
    challenge:
      'Increasing awareness of seasonal in-store offers and encouraging shoppers to visit participating retail locations.',
    solution:
      'Partnered with creators Krisbabyy, Joy Mwendwa, Flossy Trukid, and Malu to spotlight promotional offers with everyday audiences.',
    deliverables: [
      'Retail Promo Creator Campaigns',
      'Discount & Offer Messaging',
      'Campaign Reporting',
    ],
    imageUrl: '/assets/profile/work/retail-select-marhaba.jpg',
    isPlaceholder: false,
    featured: false,
    status: 'published',
    isDeleted: false,
  },
  {
    id: 'proj-chicken-inn-activations',
    slug: 'chicken-inn-retail-events-mall-activations',
    title: "Chicken Inn — BBS Mall, Lucky Summer, Valentine's & Champs",
    category: 'Brand Activations',
    division: 'emtc',
    clientName: 'Chicken Inn',
    summary:
      'On-ground consumer activations spanning BBS Mall, Lucky Summer store launch, seasonal Valentine’s outreach, and Champs Semi-Finals.',
    challenge:
      'Turning major calendar moments, new store openings, and tournament activations into interactive consumer experiences.',
    solution:
      'Executed on-ground experiential zones, interactive shopper competitions, branded engagements, and ambassador hosting.',
    deliverables: [
      'BBS Mall & Lucky Summer Activations',
      "Valentine's Day Retail Engagement",
      'Champs Semi-Finals Activation',
      'Shopper Giveaways & Hosting',
    ],
    imageUrl: '/assets/profile/work/chicken-inn-bbs-mall-1.jpg',
    isPlaceholder: false,
    featured: false,
    status: 'published',
    isDeleted: false,
  },
  {
    id: 'proj-pizza-galitos-nakuru',
    slug: 'pizza-inn-galitos-gtc-mall-nakuru-launches',
    title: "Pizza Inn & Galito's — GTC Mall & Basic 58 Nakuru Launches",
    category: 'Brand Activations',
    division: 'emtc',
    clientName: "Pizza Inn & Galito's",
    summary:
      'GTC Mall launch activation in Nairobi alongside the Basic 58 grand opening activation in Nakuru.',
    challenge:
      'Generating opening visibility and community excitement for flagship urban and regional store locations.',
    solution:
      'Deployed co-branded promotional teams, energetic street visibility, and consumer engagement activities across Nairobi and Nakuru.',
    deliverables: [
      'GTC Mall Opening Activation',
      'Basic 58 Nakuru Grand Launch',
      'Field Ambassador Operations',
    ],
    imageUrl: '/assets/profile/work/pizza-galitos-gtc-mall.jpg',
    isPlaceholder: false,
    featured: false,
    status: 'published',
    isDeleted: false,
  },
  {
    id: 'proj-hub-karen-anniversary',
    slug: 'the-hub-karen-8th-anniversary-food-festival',
    title: 'The Hub Karen — Anniversary Celebration',
    category: 'Events',
    division: 'emtc',
    clientName: 'The Hub Karen',
    summary:
      'Event brand ambassador hosting, red-carpet welcome coordination, and guest engagement during The Hub Karen Anniversary Celebration.',
    challenge:
      'Delivering a warm arrival experience and welcoming hospitality touchpoints across mall anniversary festivities.',
    solution:
      'Staffed uniformed anniversary hosts and coordinated interactive guest arrival touchpoints at The Hub Karen.',
    deliverables: [
      'Event Staffing & Hosting',
      'Red-Carpet Arrival Engagement',
      'On-Site Activation Support',
    ],
    imageUrl: '/assets/profile/work/hub-karen-anniversary.jpg',
    isPlaceholder: false,
    featured: false,
    status: 'published',
    isDeleted: false,
  },
  {
    id: 'proj-wowzi-tiktok-training',
    slug: 'wowzi-tiktok-influencer-training-workshop',
    title: 'Wowzi — TikTok Influencer Training Workshop',
    category: 'Events',
    division: 'emtc',
    clientName: 'Wowzi',
    summary:
      'In-person TikTok influencer training workshop equipping participating creators with practical short-form video strategy skills.',
    challenge:
      'Preparing platform creators to interpret commercial brand briefs and deliver consistent short-form video content.',
    solution:
      'Organized and facilitated live TikTok training sessions covering content ideation, scripting, and execution standards.',
    deliverables: [
      'Workshop Facilitation & Training',
      'Creator Brief Execution Coaching',
      'Event Coordination',
    ],
    imageUrl: '/assets/profile/work/wowzi-tiktok-training.jpg',
    isPlaceholder: false,
    featured: false,
    status: 'published',
    isDeleted: false,
  },
  {
    id: 'proj-digital-paperboy-schoolbooks',
    slug: 'digital-paperboy-and-schoolbooks-identity-systems',
    title: 'Digital Paperboy & Schoolbooks — Client Brand Identities',
    category: 'Branding',
    division: 'creative',
    clientName: 'Digital Paperboy & Schoolbooks',
    summary:
      'Client brand identity guides crafted by Exponential Media Africa—including logo geometry, typography rules, and color systems for Digital Paperboy and Schoolbooks.',
    challenge:
      'Providing distinct, scalable brand systems tailored specifically to two independent client platforms across web, mobile, and print.',
    solution:
      'Delivered complete client brand books including Digital Paperboy’s Mountella typeface & blue/slate palette and Schoolbooks’ custom wordmark grid, Prussian Blue & Wiki Green color tokens.',
    deliverables: [
      'Logo Construction & Grid System',
      'Typography & HEX/CMYK Palette',
      'Brand Identity Guidelines',
      'Stationery & UI Applications',
    ],
    imageUrl: '/assets/profile/work/digital-paperboy-identity.jpg',
    isPlaceholder: false,
    featured: false,
    status: 'published',
    isDeleted: false,
  },
  {
    id: 'proj-social-management-toyworld-styroplast',
    slug: 'toyworld-kenya-styroplast-social-media-management',
    title: 'ToyWorld Kenya, Styroplast Group & Social Media Design',
    category: 'Digital Marketing',
    division: 'marketing',
    clientName: 'ToyWorld Kenya & Styroplast Group',
    summary:
      'Platform-native social feeds, promotional posts, and daily content management designed to maintain clear, product-accurate social presence.',
    challenge:
      'Maintaining visually cohesive social feeds across Meta platforms that educate buyers and promote seasonal offers consistently.',
    solution:
      'Designed structured Instagram and Facebook grid visuals combining clean product presentation, promotional offers, and regular community scheduling.',
    deliverables: [
      'Social Media Grid Systems',
      'Promotional Post Creatives',
      'Content Scheduling & Publishing',
      'Community Management',
    ],
    imageUrl: '/assets/profile/work/toyworld-social-showcase.jpg',
    isPlaceholder: false,
    featured: false,
    status: 'published',
    isDeleted: false,
  },
  {
    id: 'proj-print-collateral-showcase',
    slug: 'print-design-and-promotional-collateral-showcase',
    title: 'Print Design & Promotional Collateral Showcase',
    category: 'Branding',
    division: 'creative',
    clientName: 'Computer Pride, Panari Resort Nyahururu, Flashbase, Friends of Creation & Uptown Radio',
    summary:
      'Corporate brochures, company profiles, and exhibition roll-up banners produced for Computer Pride, Panari Resort Nyahururu, Flashbase Security, Friends of Creation, and Uptown Radio.',
    challenge:
      'Creating crisp, print-ready corporate collateral, brochures, and pull-up display banners for trade events and business development meetings.',
    solution:
      'Designed structured multi-page profiles, exhibition roll-up banners, and promotional graphics tailored to each client’s brand guidelines.',
    deliverables: [
      'Company Profiles & Brochures',
      'Exhibition Roll-Up Banners',
      'Digital Promotional Posts',
      'Print-Ready Artwork',
    ],
    imageUrl: '/assets/profile/work/print-design-showcase.jpg',
    isPlaceholder: false,
    featured: false,
    status: 'published',
    isDeleted: false,
  },
];

export const DEFAULT_ARTICLES: InsightArticle[] = [
  {
    id: 'art-ecosystem-advantage',
    slug: 'why-african-brands-need-integrated-marketing-execution',
    title: 'Why Growing Brands Across Africa Outgrow Fragmented Marketing Vendors',
    category: 'Industry Articles',
    excerpt:
      'When visual design, content creation, influencer partnerships, paid media buying, and on-ground activations operate in silos, campaign momentum breaks before reaching the buyer.',
    body: `Across Kenya, Uganda, Rwanda, DRC, and Zambia, ambitious consumer and enterprise brands often divide their visual design, content shoots, social management, media buying, and mall activations across separate suppliers.

The hidden cost of fragmentation is strategic drift. A message crafted in a creative brief rarely survives intact when handed to a disconnected production vendor or field team.

At Exponential Media Africa, our integrated capabilities unite Visual Design, Content Creation & Marketing, Social Media Management, Influencer Marketing, Media Buy, and Brand Activation under one coordinated roof.

From our Nairobi headquarters at Casamia along Ngong Road, one aligned team takes a brand seamlessly from identity design and photography through TikTok and Meta campaigns, paid ad optimization, and live customer activations.`,
    authorName: 'Exponential Strategy Team',
    authorRole: 'Exponential Media Africa, Nairobi',
    publishedDate: '2026-10-18',
    readTime: '4 min read',
    imageUrl: '/assets/profile/work/cinnamon-energies-identity.jpg',
    featured: true,
    status: 'published',
    isDeleted: false,
  },
  {
    id: 'art-influencer-activations',
    slug: 'bridging-influencer-storytelling-and-on-ground-activations',
    title: 'Connecting Creator Voices with On-Ground Brand Activations in Kenya',
    category: 'Marketing Insights',
    excerpt:
      'How QSR, retail, and consumer brands pair vetted creator storytelling with in-store sampling and launch roadshows to turn attention into product trial.',
    body: `Digital reach in East Africa is highly interactive, yet online impressions deliver strongest commercial impact when connected directly to physical consumer touchpoints.

Whether announcing a national market entry, opening a new retail branch in Nakuru or Narok, or driving awareness for seasonal in-store promotions, trusted creators spark curiosity while experiential roadshows, sauce sampling, and trained brand ambassadors convert interest into trial.

When creator partnerships, paid media buying, and on-ground activations share a single strategy and reporting cadence, brands build lasting community momentum both online and in store.`,
    authorName: 'Exponential Marketing Desk',
    authorRole: 'Influencer & Activation Practice',
    publishedDate: '2026-09-29',
    readTime: '4 min read',
    imageUrl: '/assets/profile/work/galitos-waiyaki-way.jpg',
    featured: false,
    status: 'published',
    isDeleted: false,
  },
  {
    id: 'art-visual-consistency',
    slug: 'building-consistent-visual-identity-and-social-systems',
    title: 'Visual Systems & Commercial Content That Earn Immediate Brand Trust',
    category: 'Creative Trends',
    excerpt:
      'Why cohesive typography, intentional photography and videography, and disciplined social media grids separate memorable brands from noisy feeds.',
    body: `Visual storytelling sits at the center of digital trust. Audiences assess credibility within seconds—comparing every promotional graphic, company brochure, TikTok reel, and exhibition banner side by side.

By pairing clear visual identity rules with custom concept-to-production photography, videography, and structured Meta and TikTok content calendars, Exponential Media Africa helps brands show up consistently across every customer touchpoint.`,
    authorName: 'Exponential Creative Desk',
    authorRole: 'Visual Design & Content Practice',
    publishedDate: '2026-09-12',
    readTime: '3 min read',
    imageUrl: '/assets/profile/work/visual-design-studio.jpg',
    featured: false,
    status: 'published',
    isDeleted: false,
  },
];

// No invented client testimonials — only real authorised testimonials added via CMS are displayed publicly
export const DEFAULT_TESTIMONIALS: TestimonialItem[] = [];

// All 27 verified client organisations extracted from Official Company Profile PDF (Page 10)
export const DEFAULT_CLIENT_LOGOS: ClientLogo[] = [
  {
    id: 'client-pepsi',
    name: 'Pepsi',
    sector: 'Beverages & FMCG',
    region: 'Kenya',
    logoUrl: '/assets/profile/clients/pepsi.png',
    isPlaceholder: false,
    status: 'published',
    isDeleted: false,
  },
  {
    id: 'client-pizza-inn',
    name: 'Pizza Inn',
    sector: 'Quick Service Restaurants',
    region: 'Kenya',
    logoUrl: '/assets/profile/clients/pizza-inn.png',
    isPlaceholder: false,
    status: 'published',
    isDeleted: false,
  },
  {
    id: 'client-chicken-inn',
    name: 'Chicken Inn',
    sector: 'Quick Service Restaurants',
    region: 'Kenya',
    logoUrl: '/assets/profile/clients/chicken-inn.png',
    isPlaceholder: false,
    status: 'published',
    isDeleted: false,
  },
  {
    id: 'client-creamy-inn',
    name: 'Creamy Inn',
    sector: 'Quick Service Restaurants',
    region: 'Kenya',
    logoUrl: '/assets/profile/clients/creamy-inn.png',
    isPlaceholder: false,
    status: 'published',
    isDeleted: false,
  },
  {
    id: 'client-galitos',
    name: "Galito's",
    sector: 'Flame-Grilled Dining',
    region: 'Kenya',
    logoUrl: '/assets/profile/clients/galitos.png',
    isPlaceholder: false,
    status: 'published',
    isDeleted: false,
  },
  {
    id: 'client-bakers-inn',
    name: "Baker's Inn",
    sector: 'Bakery & QSR',
    region: 'Kenya',
    logoUrl: '/assets/profile/clients/bakers-inn.png',
    isPlaceholder: false,
    status: 'published',
    isDeleted: false,
  },
  {
    id: 'client-ocean-basket',
    name: 'Ocean Basket',
    sector: 'Hospitality & Dining',
    region: 'Westgate, Nairobi',
    logoUrl: '/assets/profile/clients/ocean-basket.png',
    isPlaceholder: false,
    status: 'published',
    isDeleted: false,
  },
  {
    id: 'client-grill-shack',
    name: 'The Grill Shack',
    sector: 'Hospitality & Dining',
    region: 'Nairobi, Kenya',
    logoUrl: '/assets/profile/clients/grill-shack.png',
    isPlaceholder: false,
    status: 'published',
    isDeleted: false,
  },
  {
    id: 'client-kcb',
    name: 'KCB',
    sector: 'Banking & Financial Services',
    region: 'East Africa',
    logoUrl: '/assets/profile/clients/kcb.png',
    isPlaceholder: false,
    status: 'published',
    isDeleted: false,
  },
  {
    id: 'client-dtb',
    name: 'DTB (Diamond Trust Bank)',
    sector: 'Banking & Financial Services',
    region: 'Kenya & Tanzania',
    logoUrl: '/assets/profile/clients/dtb.png',
    isPlaceholder: false,
    status: 'published',
    isDeleted: false,
  },
  {
    id: 'client-transsion',
    name: 'TECNO / Transsion Holdings',
    sector: 'Smart Devices & Consumer Tech',
    region: 'Kenya',
    logoUrl: '/assets/profile/clients/transsion-holdings.png',
    isPlaceholder: false,
    status: 'published',
    isDeleted: false,
  },
  {
    id: 'client-big5',
    name: 'Big 5 Construct Kenya',
    sector: 'Construction Exhibitions',
    region: 'Kenya',
    logoUrl: '/assets/profile/clients/big5-construct-kenya.png',
    isPlaceholder: false,
    status: 'published',
    isDeleted: false,
  },
  {
    id: 'client-shell-select',
    name: 'Shell Select',
    sector: 'Convenience Retail',
    region: 'Kenya',
    logoUrl: '/assets/profile/clients/shell-select.png',
    isPlaceholder: false,
    status: 'published',
    isDeleted: false,
  },
  {
    id: 'client-stop-and-shop',
    name: 'Stop & Shop',
    sector: 'Convenience Retail',
    region: 'Kenya',
    logoUrl: '/assets/profile/clients/stop-and-shop.png',
    isPlaceholder: false,
    status: 'published',
    isDeleted: false,
  },
  {
    id: 'client-marhaba',
    name: 'Marhaba',
    sector: 'Retail & Consumer Goods',
    region: 'Kenya',
    logoUrl: '/assets/profile/clients/marhaba.png',
    isPlaceholder: false,
    status: 'published',
    isDeleted: false,
  },
  {
    id: 'client-hub-karen',
    name: 'The Hub Karen',
    sector: 'Premier Retail & Lifestyle',
    region: 'Nairobi, Kenya',
    logoUrl: '/assets/profile/clients/the-hub-karen.png',
    isPlaceholder: false,
    status: 'published',
    isDeleted: false,
  },
  {
    id: 'client-wowzi',
    name: 'Wowzi',
    sector: 'Creator Economy Platform',
    region: 'Africa',
    logoUrl: '/assets/profile/clients/wowzi.png',
    isPlaceholder: false,
    status: 'published',
    isDeleted: false,
  },
  {
    id: 'client-crown-paints',
    name: 'Crown Paints',
    sector: 'Manufacturing & Coatings',
    region: 'East Africa',
    logoUrl: '/assets/profile/clients/crown-paints.png',
    isPlaceholder: false,
    status: 'published',
    isDeleted: false,
  },
  {
    id: 'client-daystar',
    name: 'Daystar University',
    sector: 'Higher Education',
    region: 'Kenya',
    logoUrl: '/assets/profile/clients/daystar-university.png',
    isPlaceholder: false,
    status: 'published',
    isDeleted: false,
  },
  {
    id: 'client-strathmore',
    name: 'Strathmore University',
    sector: 'Higher Education',
    region: 'Nairobi, Kenya',
    logoUrl: '/assets/profile/clients/strathmore-university.png',
    isPlaceholder: false,
    status: 'published',
    isDeleted: false,
  },
  {
    id: 'client-afristec',
    name: 'AfriStec',
    sector: 'Technology & Engineering',
    region: 'East Africa',
    logoUrl: '/assets/profile/clients/afristec.png',
    isPlaceholder: false,
    status: 'published',
    isDeleted: false,
  },
  {
    id: 'client-boy-with-a-ball',
    name: 'Boy With a Ball',
    sector: 'Youth & Social Impact',
    region: 'Global & Kenya',
    logoUrl: '/assets/profile/clients/boy-with-a-ball.png',
    isPlaceholder: false,
    status: 'published',
    isDeleted: false,
  },
  {
    id: 'client-lunna',
    name: 'Lunna',
    sector: 'Consumer & Lifestyle',
    region: 'Kenya',
    logoUrl: '/assets/profile/clients/lunna.png',
    isPlaceholder: false,
    status: 'published',
    isDeleted: false,
  },
  {
    id: 'client-pettmall',
    name: 'Pettmall Shelters',
    sector: 'Real Estate & Shelters',
    region: 'Kenya',
    logoUrl: '/assets/profile/clients/pettmall-shelters.png',
    isPlaceholder: false,
    status: 'published',
    isDeleted: false,
  },
  {
    id: 'client-sauti',
    name: 'Sauti',
    sector: 'Digital Platforms',
    region: 'East Africa',
    logoUrl: '/assets/profile/clients/sauti.png',
    isPlaceholder: false,
    status: 'published',
    isDeleted: false,
  },
  {
    id: 'client-tigoni-plug',
    name: 'Tigoni Plug',
    sector: 'Hospitality & Lifestyle',
    region: 'Kenya',
    logoUrl: '/assets/profile/clients/tigoni-plug.png',
    isPlaceholder: false,
    status: 'published',
    isDeleted: false,
  },
  {
    id: 'client-emtc',
    name: 'EMTC College',
    sector: 'Media & Skills Education',
    region: 'Nairobi, Kenya',
    logoUrl: '/assets/profile/clients/emtc.png',
    isPlaceholder: false,
    status: 'published',
    isDeleted: false,
  },
];

// Company Profile PDF contains no individual staff bios or employee profiles — none fabricated.
export const DEFAULT_TEAM_MEMBERS: TeamMember[] = [];
