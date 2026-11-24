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
  logoUrl: '/assets/profile/brand/exp-logo-dark.png',
  headerLogoUrl: '/assets/profile/brand/exp-logo-red.png',
  footerLogoUrl: '/assets/profile/brand/exp-logo-white.png',
  markUrl: '/assets/profile/brand/exp-mark.png',
  darkLockupUrl: '/assets/profile/brand/exp-logo-dark.png',
  aboutWhoWeAreUrl: '/assets/profile/work/visual-design-studio.jpg',
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

export const DIVISIONS: DivisionMeta[] = [
  {
    id: 'creative',
    name: 'Visual Design & Brand Identity',
    shortName: 'Visual Design',
    tagline: 'Bold Design. Lasting Impact.',
    description:
      'Compelling visual identities and communication collateral—from logo development and complete brand guidelines to posters, roll-up banners, brochures, promotional posts, and packaging.',
    accentHex: '#ED1B24',
    imageUrl: '/assets/profile/work/cinnamon-energies-identity.jpg',
    imageAlt: 'Cinnamon Energies brand identity suite designed by Exponential Marketing Agency',
    ecosystemRole:
      'Establishes memorable brand recognition and visual consistency across digital and print.',
    services: [
      'Visual Design',
      'Logo & brand identity systems',
      'Digital & print graphic design',
      'Promotional posters & banners',
      'Brochures & company profiles',
      'Packaging & merchandise design',
    ],
  },
  {
    id: 'estudios',
    name: 'Content Creation & Marketing',
    shortName: 'Content & Marketing',
    tagline: 'Stories That Build Brands & Drive Action.',
    description:
      'End-to-end concept development, copywriting, commercial photography, videography, motion graphics, and editorial storytelling crafted for high-performing advertising campaigns.',
    accentHex: '#ED1B24',
    imageUrl: '/assets/profile/work/content-studio-chair.jpg',
    imageAlt: 'Exponential Marketing Agency commercial content creation and set',
    ecosystemRole:
      'Turns brand messaging into crisp commercial photography, video, and copy tailored to each platform.',
    services: [
      'Content Creation & Marketing',
      'Commercial photography',
      'Commercial videography',
      'Copywriting & script development',
      'Motion graphics & editing',
      'Multi-format content strategy',
    ],
  },
  {
    id: 'marketing',
    name: 'Social Media, Influencer & Media Buying',
    shortName: 'Social, Creators & Media',
    tagline: 'Always Present. Targeted Reach.',
    description:
      'Strategic social media management across Meta and TikTok, vetted influencer marketing partnerships, and data-informed media buying designed to maximize return on ad spend.',
    accentHex: '#ED1B24',
    imageUrl: '/assets/profile/work/pepsi-kenya-entry.jpg',
    imageAlt: 'Pepsi Kenya market-entry influencer marketing collaboration campaign',
    ecosystemRole:
      'Connects audiences with consistent daily publishing, trusted creator voices, and targeted paid placements.',
    services: [
      'Social Media Management',
      'Influencer Marketing',
      'Media Buying',
      'Community & reputation management',
      'Audience targeting & optimization',
      'Campaign performance reporting',
    ],
  },
  {
    id: 'emtc',
    name: 'Brand Activation',
    shortName: 'Brand Activation',
    tagline: 'Bringing Brands to Life.',
    description:
      'High-impact consumer engagement including store launch roadshows, in-store promotions, product sampling tours, mall activations, creator workshops, and live brand experiences.',
    accentHex: '#ED1B24',
    imageUrl: '/assets/profile/work/galitos-waiyaki-way.jpg',
    imageAlt: "Galito's Waiyaki Way experiential brand activation executed by Exponential Marketing Agency",
    ecosystemRole:
      'Translates digital visibility into live consumer participation and memorable product trial.',
    services: [
      'Brand Activation',
      'Store launch roadshows',
      'Product sampling tours',
      'In-store mall promotions',
      'Experiential marketing campaigns',
      'Brand ambassador hosting',
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
    instagram: VERIFIED_CONTACT.instagramUrl,
    linkedin: VERIFIED_CONTACT.linkedinUrl,
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
      unitOrContext: 'Social, Content, Influencer, Media Buying, Activation & Visual Design',
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
    title: 'Media Buying',
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
    title: 'Brand Activation',
    problemSolved: 'Turns passive awareness into live consumer participation and product trial.',
    description:
      'Experiential marketing campaigns, pop-up experiences, product sampling tours, in-store promotions, branch opening roadshows, live demonstrations, and interactive brand activations.',
    order: 5,
    status: 'published',
    isDeleted: false,
  },
  {
    id: 'srv-creative-1',
    division: 'creative',
    title: 'Visual Design',
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
      'Client brand identity architecture crafted by Exponential Marketing Agency, featuring geometric emblem design, typography specification, color system, stationery, and branded apparel.',
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
      'Client brand identity guides crafted by Exponential Marketing Agency—including logo geometry, typography rules, and color systems for Digital Paperboy and Schoolbooks.',
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
    body: `## The Cost of Disconnected Brand Execution

Across Kenya, Uganda, Rwanda, the Democratic Republic of Congo, and Zambia, ambitious consumer and enterprise brands regularly divide their creative and distribution stack across four or five disconnected vendors. One freelancer handles logos and posters, a separate studio shoots video, a digital agency buys Meta ads, a talent broker recruits creators, and an independent field team runs retail activations.

On paper, splitting scopes looks economical. In commercial practice, every handoff strips away context, speed, and accountability. By the time a visual campaign reaches an audience in Nairobi, Kampala, or Kigali, the social feed no longer resembles the packaging on shelf, paid media creatives do not match the creator narrative, and retail staff cannot articulate the digital offer.

## Where Momentum Breaks in Fragmented Campaigns

- Visual identity drifts between print banners, social media grids, and retail displays because no single art director owns brand consistency.
- Content shoots run without paid media buying insights, producing beautiful assets that fail hook-rate and click-through thresholds in the first three seconds.
- Influencer storytelling launches weeks before or after stock availability or on-ground mall activations, wasting peak search and purchase intent.
- Reporting stays trapped in vanity impressions because no unified team connects digital engagement to footfall, sampling volume, and sales inquiries.

## Connecting Six Core Capabilities Under One Roof

At Exponential Marketing Agency, we structure every mandate around six tightly linked disciplines: Social Media Management, Content Creation & Marketing, Influencer Marketing, Media Buying, Brand Activation, and Visual Design.

When strategy starts at A3-10 Casamia along Ngong Road in Kilimani, the same strategic brief guides every downstream specialist. Visual Design establishes crisp typography, packaging, and digital artwork systems. Content Creation & Marketing translates those visual rules into scripted short-form reels, commercial photography, and editorial copy tailored for East African audiences.

Social Media Management and Influencer Marketing then build sustained community participation around the core narrative, while Media Buying amplifies top-performing creator and studio assets directly to high-intent buyers. Finally, Brand Activation brings the exact same campaign promise into physical shopping centres, universities, convenience stores, and launch roadshows.

## Commercial Advantages for Regional Rollouts

- Unified creative turnaround: Assets move from brief to visual approval, production, and media launch without multi-vendor translation delays.
- Shared audience intelligence: Live insights from community comments, paid click-through data, and shopper sampling feed back into weekly creative optimization.
- Consistent cross-border identity: Whether launching a QSR branch in Nakuru or expanding consumer products across Uganda, Rwanda, DRC, or Zambia, brand recall compounds with every impression.

## How Marketing Leaders Audit Readiness

Before commissioning your next quarterly push, verify whether every team touching the customer shares one campaign calendar, one visual toolkit, and one commercial dashboard. Integrating all six capabilities under one agency roof turns scattered marketing spend into sustained market share.`,
    authorName: 'Exponential Strategy Team',
    authorRole: 'Exponential Marketing Agency, Nairobi',
    publishedDate: '2026-10-18',
    readTime: '7 min read',
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
    body: `## Why Digital Attention Alone Rarely Closes First-Time Trial

Digital reach in Kenya and across East Africa is vibrant and social-first, yet impressions on TikTok and Instagram achieve their highest commercial return when linked seamlessly to physical product interaction. Consumers discover new menu items, beverages, electronics, or retail promotions on their feeds, then validate them in person at malls, neighbourhood stores, and university campuses.

When a national beverage launch, QSR branch opening, or seasonal retail discount relies solely on social posts without ground energy, awareness stalls in the feed. Equally, when roadshows run without coordinated creator storytelling and local geo-targeted media buying, passers-by miss the cultural context behind the activation.

## The Three-Phase Creator-to-Retail Playbook

- Phase 1 — Teaser & Vetted Creator Briefing: Select authentic lifestyle, dining, and retail creators whose audience demographics and geography match the target outlet catchment—from Westlands and Kilimani to Narok and Nakuru.
- Phase 2 — Synchronized Live Activation: Deploy uniformed brand ambassadors, sampling booths, red-carpet hospitality, and live creator walkthroughs simultaneously during peak shopping windows.
- Phase 3 — Post-Event Amplification & Retargeting: Edit high-energy consumer reaction footage on location into fast-turnaround reels reinforced through targeted Meta and TikTok media buying.

## Lessons from Kenyan QSR, Dining, and Convenience Campaigns

Across major collaborations involving Pepsi, Chicken Inn, Galito's, Pizza Inn, Ocean Basket Westgate, Shell Select, and Stop & Shop, combining creator trust with disciplined ground logistics transforms ordinary promotions into shared community events.

Creators attend tastings and store launches not as detached spokespeople reading rigid scripts, but as participants guiding their followers into real physical venues. On-ground brand ambassadors mirror the exact visual messaging and promo codes highlighted online, removing friction between scrolling a phone screen and redeeming an offer at the counter.

## Structuring Creator Contracts & Ground Standards

Effective hybrid campaigns require clear deliverables on both sides: vetted creator briefs with transparent usage rights for paid amplification, paired with trained ambassador rosters, crisp pull-up displays, stock coordination, and daily quantitative tallies covering samples distributed, redemptions, and creator reach.`,
    authorName: 'Exponential Marketing Desk',
    authorRole: 'Influencer & Activation Practice',
    publishedDate: '2026-09-29',
    readTime: '6 min read',
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
    body: `## First-Second Trust in Competitive Feeds

In crowded categories—from Quick Service Restaurants and fintech to real estate, manufacturing, and consumer packaged goods—audiences form quality judgements within a single scroll. Potential buyers compare exhibition pull-up banners, LinkedIn company profiles, Instagram carousels, and retail packaging side by side before ever booking a consultation or stepping into a store.

When typography shifts randomly from post to post or dark smartphone snapshots sit next to polished corporate proposals, institutional credibility erodes quietly. Strong visual design and commercial content production are not cosmetic expenses; they are trust multipliers that shorten sales cycles and justify stronger pricing across regional markets.

## Why Disjointed Brand Collateral Loses Buyers

Across East Africa, many growing organisations invest heavily in a brand logo once during launch, then hand day-to-day social graphics and sales collateral to hurried internal drafts or rotating freelancers without art direction. Within six months, the brand looks like five unrelated companies depending on whether a prospect meets them on TikTok, in an investor deck, or at a trade booth in Nairobi.

- Inconsistent color spaces between digital screens (RGB/HEX) and printed banners or retail signage (CMYK) dilute shelf recognition.
- Missing typographic rules force every promotional flyer to invent new display hierarchies, hiding key offers and calls to action.
- Static product templates recycled without fresh studio photography reduce feed engagement and push paid Media Buying costs upward.

## Pillars of a Scalable African Brand System

- Disciplined Identity Guidelines: Establish exact logo clear space, typographic hierarchy, color values across RGB, HEX, and CMYK, and modular grid rules so every designer produces unmistakable work.
- Purpose-Built Commercial Photography & Video: Replace generic stock visuals with custom location shoots reflecting real Kenyan and regional environments, products, menus, and customer teams.
- Platform-Native Social Templates: Translate core visual rules into fast-to-produce Instagram feeds, promotional carousels, TikTok video covers, and Meta ad variations.
- Print-to-Screen Alignment: Keep brochures, packaging boxes, branded apparel, vehicle wraps, and digital banners visually synchronized across every B2B and retail encounter.

## How Content Strategy Converts Visual Identity into Growth

A visual system gains commercial value when paired with intentional storytelling. Commercial copywriting, motion graphics, product breakdowns, and educational carousels ensure every frame answers a buyer question—why the product exists, how it solves a daily need, and where to purchase it.

At Exponential Marketing Agency, our Visual Design and Content Creation & Marketing teams collaborate side by side from concept script to colour-graded final export. Whether producing packaging and brand bibles for technology and energy clients or structuring crisp daily social grids for retail chains, disciplined visual craft ensures brand equity compounds with every asset shipped.`,
    authorName: 'Exponential Creative Desk',
    authorRole: 'Visual Design & Content Practice',
    publishedDate: '2026-09-12',
    readTime: '7 min read',
    imageUrl: '/assets/profile/work/visual-design-studio.jpg',
    featured: false,
    status: 'published',
    isDeleted: false,
  },
  {
    id: 'art-media-buying-roi',
    slug: 'data-informed-media-buying-and-social-growth-east-africa',
    title: 'Turning Social Presence into Measurable ROI with Data-Informed Media Buying',
    category: 'Educational Content',
    excerpt:
      'How structured audience segmentation, creative testing, and full-funnel social media management maximize advertising efficiency across Kenya and regional markets.',
    body: `## Moving Beyond Boosted Posts

One of the most common leaks in regional marketing budgets is treating "boosting" individual social posts as a media strategy. Without structured funnel stages, clear conversion events, and deliberate creative variation, ad platforms spend budget on low-intent clicks that rarely translate into store visits or qualified B2B briefs.

Effective Media Buying starts well before campaign managers open Meta Ads Manager or TikTok Ads. It starts by matching audience intent to creative angle—building distinct messaging tracks for brand awareness, product consideration, location-based store traffic, and direct lead capture.

## Why Social Management and Paid Media Must Share One Desk

When community managers and media buyers sit on separate teams, paid ads drive traffic into unmonitored comment threads while high-performing organic Reels never receive distribution budget. Integrating Social Media Management with Media Buying removes that gap immediately.

- Real-Time Comment Intelligence: Questions raised under sponsored posts reveal pricing friction, delivery concerns, or outlet confusion within hours so ad copy can adapt quickly.
- Budget Pacing Around Retail Peaks: Weekend dining rushes, pay-day cycles, university term openings, and seasonal promos receive heavier delivery weight while quiet windows avoid wasted impressions.
- Format-Specific Vertical Framing: Studio photography, portrait Reels, and carousel explainers are cut specifically for Stories, Feed, and Search rather than cropped from landscape leftovers.

## Building a High-Return Media & Social Architecture

- Clear Campaign Objectives: Separate upper-funnel reach and video views from lower-funnel lead forms, WhatsApp inquiries, and regional store promotions.
- Weekly Creative Iteration: Test multiple opening hooks, headline overlays, and calls to action sourced directly from our Content Creation & Marketing and Influencer teams.
- Active Community Management: Fast, knowledgeable replies on comments and direct messages convert ad curiosity into real customer conversations and trust.
- Geographic & Audience Precision: Configure city, mall-radius, and cross-border targeting across Kenya, Uganda, Rwanda, DRC, and Zambia based on distribution footprint.

## Integrating Creator Whitelisting & Paid Amplification

Top-performing creator videos from Influencer Marketing campaigns consistently outperform traditional studio ads on cost-per-engagement and watch time. By securing clear usage permissions upfront and amplifying creator assets through targeted Media Buying audiences, brands capture both organic creator credibility and deterministic paid scale.

## Transparent Performance Reporting

Every monthly review connects spend directly to reach quality, cost per engagement, lead volume, and on-ground store traffic, giving marketing directors clear evidence to scale winning creatives and cut underperforming placements quickly across East, Central, and Southern Africa.`,
    authorName: 'Exponential Media Desk',
    authorRole: 'Social Media & Media Buying Practice',
    publishedDate: '2026-08-24',
    readTime: '7 min read',
    imageUrl: '/assets/profile/work/content-studio-chair.jpg',
    featured: false,
    status: 'published',
    isDeleted: false,
  },
];

export const DEFAULT_TESTIMONIALS: TestimonialItem[] = [];

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

export const DEFAULT_TEAM_MEMBERS: TeamMember[] = [];
