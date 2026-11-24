import type { ExclusiveServiceName } from '../lib/portfolio';
import type { DivisionId } from '../types/cms';

export interface ServiceProcessStage {
  stage: string;
  title: string;
  summary: string;
  outputs: string[];
}

export interface ServiceDetailRecord {
  slug: string;
  title: ExclusiveServiceName;
  division: DivisionId;
  tagline: string;
  heroImageUrl: string;
  heroSummary: string;
  extendedOverview: string[];
  strategicValue: Array<{
    title: string;
    detail: string;
  }>;
  deliverablesScope: string[];
  processStages: ServiceProcessStage[];
  idealFor: string[];
  metricsTracked: string[];
}

export const SERVICE_DETAILS: Record<string, ServiceDetailRecord> = {
  'social-media-management': {
    slug: 'social-media-management',
    title: 'Social Media Management',
    division: 'marketing',
    tagline: 'Always Present. Consistent Brand Voice.',
    heroImageUrl: '/assets/profile/service-heroes/social-media-growth-in-action.png',
    heroSummary:
      'End-to-end social strategy, daily content calendars, community moderation, and platform growth across Meta (Instagram & Facebook), TikTok, and LinkedIn.',
    extendedOverview: [
      'Your social channels are often the very first interaction a customer has with your brand. When posting is sporadic, visually off-brand, or unanswered in the comments and direct messages, commercial credibility erodes quickly.',
      'Exponential Marketing Agency manages every stage of your daily social presence from our Kilimani, Nairobi hub—aligning monthly content calendars with retail promotions, product launches, seasonal moments, and cultural conversations across Kenya and regional East African markets.',
      'By working side by side with our Visual Design, Content Creation, Influencer Marketing, and Media Buying teams under one roof, every post looks cohesive, reaches qualified buyers, and drives measurable business outcomes.',
    ],
    strategicValue: [
      {
        title: 'Structured Content Calendars',
        detail:
          'Every week follows a balanced publishing rhythm uniting education, product showcases, social proof, and promotional offers.',
      },
      {
        title: 'Platform-Native Storytelling',
        detail:
          'Custom formatting for Instagram feeds & Reels, Facebook communities, TikTok short-form video, and corporate LinkedIn profiles.',
      },
      {
        title: 'Active Community & Reputation Care',
        detail:
          'Timely response workflows for inquiries, order leads, customer feedback, and sentiment monitoring across every active channel.',
      },
      {
        title: 'Monthly Analytics & Iteration',
        detail:
          'Clear monthly reporting tracking follower quality, engagement rates, reach velocity, click-throughs, and top-performing content formats.',
      },
    ],
    deliverablesScope: [
      'Channel Audit & Social Strategy Playbook',
      'Monthly Editorial & Promotional Content Calendars',
      'Static Carousel, Reel & Short-Form Video Publishing',
      'Meta (Instagram & Facebook) & TikTok Account Management',
      'Community Moderation & Direct Message Triage',
      'Social Listening & Brand Reputation Tracking',
      'Creator & UGC Reposting Coordination',
      'Monthly Performance & Growth Reporting',
    ],
    processStages: [
      {
        stage: 'STAGE 01',
        title: 'Channel Audit & Audience Mapping',
        summary:
          'We benchmark existing profiles, competitor positioning, audience demographics, and historical post performance across active platforms.',
        outputs: ['Social audit deck', 'Tone-of-voice matrix', 'Platform priority plan'],
      },
      {
        stage: 'STAGE 02',
        title: 'Editorial Pillar & Calendar Design',
        summary:
          'We establish content pillars, visual grid cadence, promotional windows, and monthly publishing calendars submitted ahead for client sign-off.',
        outputs: ['Monthly content calendar', 'Campaign theme map', 'Approval workflow'],
      },
      {
        stage: 'STAGE 03',
        title: 'Creative Asset & Copy Production',
        summary:
          'Designers, copywriters, and video editors produce cohesive graphics, captions, Reels, and TikTok edits aligned strictly with brand guidelines.',
        outputs: ['Ready-to-publish artwork', 'Short-form video cuts', 'Brand-aligned copy'],
      },
      {
        stage: 'STAGE 04',
        title: 'Scheduled Publishing & Community Management',
        summary:
          'Posts publish at peak audience windows while our community team actively answers questions, escalates sales leads, and nurtures engagement.',
        outputs: ['Daily publishing', 'Comment & DM moderation', 'Lead escalation logs'],
      },
      {
        stage: 'STAGE 05',
        title: 'Performance Review & Optimization',
        summary:
          'At month close, we review reach, saves, shares, clicks, and conversion signals—refining next month’s formats based on verified audience data.',
        outputs: ['Monthly KPI scorecard', 'Format insights', 'Next-cycle optimization brief'],
      },
    ],
    idealFor: [
      'Retail & e-commerce stores running weekly promotions and product drops',
      'Hospitality, QSR, and lifestyle venues building loyal local footfall',
      'Corporate, banking, and education institutions requiring credible daily visibility',
    ],
    metricsTracked: [
      'Organic & Total Reach',
      'Engagement Rate & Saves/Shares',
      'Follower Growth Velocity',
      'Inbound DM & Link Inquiries',
    ],
  },

  'content-creation-and-marketing': {
    slug: 'content-creation-and-marketing',
    title: 'Content Creation & Marketing',
    division: 'estudios',
    tagline: 'Stories That Build Brands & Drive Action.',
    heroImageUrl: '/assets/profile/service-heroes/content-creation-marketing-studio.png',
    heroSummary:
      'End-to-end concept development, copywriting, commercial photography, videography, motion graphics, and distribution planning built for digital campaigns.',
    extendedOverview: [
      'High-performing advertising and social ecosystems depend on original visual storytelling tailored to the audience you want to persuade. Generic stock imagery rarely holds attention or communicates authentic product quality.',
      'Exponential Marketing Agency handles the entire creative pipeline from concept treatment and location scouting to lighting, commercial photography, multi-camera videography, motion graphics, copywriting, and final color-graded delivery.',
      'Whether capturing flame-grilled dining experiences, high-traffic construction exhibitions, smartphone launches, or corporate brand films, we craft libraries of ready-to-deploy stills and video assets engineered for Meta, TikTok, YouTube, web, and print.',
    ],
    strategicValue: [
      {
        title: 'Concept-to-Cut Accountability',
        detail:
          'One team guides creative direction, scripting, casting, shooting, sound design, and final export formatting across all aspect ratios.',
      },
      {
        title: 'Commercial Photography & Video',
        detail:
          'Product, food, hospitality, event, executive portrait, and lifestyle production calibrated for crisp clarity on mobile and billboard displays.',
      },
      {
        title: 'Multi-Format Asset Libraries',
        detail:
          'Every production day yields modular 16:9, 4:5, and 9:16 deliverables plus hero stills so campaigns sustain weeks of fresh publishing.',
      },
      {
        title: 'Storytelling Aligned to Distribution',
        detail:
          'Scripts, hooks, and visual pacing are structured specifically for organic retention, paid ad thumb-stop rates, and landing page conversion.',
      },
    ],
    deliverablesScope: [
      'Creative Concept Treatments & Storyboarding',
      'Commercial & Product Photography Shoots',
      'Brand Films, Event Recaps & Product Videos',
      'Short-Form Vertical Video (Reels, TikTok & Shorts)',
      'Motion Graphics, Kinetic Type & Logo Animation',
      'Campaign Copywriting & Script Development',
      'Retouching, Color Grading & Multi-Ratio Exports',
      'Content Distribution & Rollout Roadmaps',
    ],
    processStages: [
      {
        stage: 'STAGE 01',
        title: 'Creative Brief & Concept Development',
        summary:
          'We clarify campaign objectives, key messages, deliverables count, target platforms, and visual references into an approved creative treatment.',
        outputs: ['Creative concept deck', 'Shot list & script', 'Moodboard'],
      },
      {
        stage: 'STAGE 02',
        title: 'Pre-Production & Logistics',
        summary:
          'Our producers lock schedules, locations across Nairobi or regional markets, props, talent casting, wardrobe styling, and technical gear checklists.',
        outputs: ['Call sheet', 'Production schedule', 'Location & talent sign-off'],
      },
      {
        stage: 'STAGE 03',
        title: 'On-Set Principal Production',
        summary:
          'Directors, cinematographers, photographers, and art directors execute disciplined shoot days capturing both hero commercials and agile social cuts.',
        outputs: ['RAW stills & footage', 'Behind-the-scenes captures', 'On-set art direction'],
      },
      {
        stage: 'STAGE 04',
        title: 'Editing, Motion & Post-Production',
        summary:
          'Editors assemble narrative cuts paired with custom motion graphics, clean sound mixing, color grading, and platform-specific aspect ratios.',
        outputs: ['Master hero edits', '9:16 vertical variants', 'Color-graded photo gallery'],
      },
      {
        stage: 'STAGE 05',
        title: 'Distribution & Performance Packaging',
        summary:
          'Final assets are organized into shared libraries and handed off directly to Social, Influencer, and Media Buying teams with usage recommendations.',
        outputs: ['Multi-channel asset pack', 'Thumbnail options', 'Rollout cadence notes'],
      },
    ],
    idealFor: [
      'Product launches requiring crisp campaign hero video and photography',
      'QSR, hospitality, and FMCG brands updating seasonal menus or packaging',
      'Exhibitions, conferences, and corporate milestones needing same-week media recaps',
    ],
    metricsTracked: [
      'Thumb-Stop Rate & 3-Second Hold',
      'Video Completion & Watch Time',
      'Creative Engagement & Shares',
      'Asset Reuse Across Channels',
    ],
  },

  'influencer-marketing': {
    slug: 'influencer-marketing',
    title: 'Influencer Marketing',
    division: 'marketing',
    tagline: 'Trusted Creator Voices That Move Markets.',
    heroImageUrl: '/assets/profile/service-heroes/influencer-marketing-growth-studio.png',
    heroSummary:
      'Strategic creator sourcing, audience vetting, campaign scripting, contract negotiation, on-site content coordination, and ROI tracking across East Africa.',
    extendedOverview: [
      'East African audiences place immense trust in creators who speak authentically to food, lifestyle, family, tech, retail deals, and campus culture. However, unvetted vanity metrics and disconnected briefs often waste budget without shifting brand preference.',
      'Exponential Marketing Agency manages the full creator lifecycle—from market-entry moments for global beverage icons like Pepsi and restaurant institutions like Ocean Basket and The Grill Shack to retail deal bursts for Shell Select, Stop & Shop, and Marhaba.',
      'We inspect genuine audience demographics, comment authenticity, regional relevance, and category fit before negotiating contracts, aligning creative talking points, coordinating shoot visits, and consolidating every link and reach report in one dashboard.',
    ],
    strategicValue: [
      {
        title: 'Rigorous Creator Vetting',
        detail:
          'We evaluate real engagement quality, audience geography, tone alignment, and past brand safety rather than surface follower counts.',
      },
      {
        title: 'Structured Briefs & Creative Freedom',
        detail:
          'Creators receive clear brand messaging, visual do’s and don’ts, and call-to-actions while preserving the authentic voice their followers trust.',
      },
      {
        title: 'End-to-End Contract & Logistics Management',
        detail:
          'We handle rate negotiation, deliverables timelines, restaurant or store visits, product seeding, and compliance sign-offs.',
      },
      {
        title: 'Consolidated Performance Reporting',
        detail:
          'Post-campaign audits measure combined views, saves, comments, promo-code or store-visit cues, and top-performing creator archetypes.',
      },
    ],
    deliverablesScope: [
      'Creator Tiering & Campaign Architecture',
      'Influencer Sourcing, Audience Audit & Vetting',
      'Rate Negotiation & Formal Creator Contracting',
      'Creative Briefing & Talking-Point Alignment',
      'On-Location Shoot & Store Visit Coordination',
      'Content Pre-Approval & Compliance QA',
      'Amplification & Whitelisting Coordination',
      'Comprehensive Post-Campaign ROI Reporting',
    ],
    processStages: [
      {
        stage: 'STAGE 01',
        title: 'Campaign Objective & Tier Strategy',
        summary:
          'We match campaign KPIs—awareness, dining footfall, product trial, or promo redemption—to the optimal mix of macro, mid-tier, and micro creators.',
        outputs: ['Influencer tier mix', 'Target audience criteria', 'Budget allocation'],
      },
      {
        stage: 'STAGE 02',
        title: 'Creator Shortlisting & Vetting',
        summary:
          'Our talent desk audits candidate profiles for real Kenyan/regional engagement, content craft, and category affinity, presenting a curated roster.',
        outputs: ['Vetted creator roster', 'Audience & rate cards', 'Selection rationale'],
      },
      {
        stage: 'STAGE 03',
        title: 'Contracting & Creative Briefing',
        summary:
          'Once approved, we finalize contracts, exclusivity terms, deliverables deadlines, and clear creative briefs or in-person experience schedules.',
        outputs: ['Signed agreements', 'Individual creative briefs', 'Shoot calendar'],
      },
      {
        stage: 'STAGE 04',
        title: 'Production, QA & Coordinated Go-Live',
        summary:
          'We coordinate restaurant tastings, product drops, or launch appearances, review every draft video before posting, and synchronize go-live waves.',
        outputs: ['Approved draft reviews', 'Coordinated publishing wave', 'Live tracking links'],
      },
      {
        stage: 'STAGE 05',
        title: 'Analytics & Next-Wave Optimization',
        summary:
          'We capture verified reach, impressions, view-throughs, sentiment, and cost-per-engagement to identify top creators for ongoing ambassadorships.',
        outputs: ['Campaign performance report', 'Top creator rankings', 'Retention insights'],
      },
    ],
    idealFor: [
      'New market entries and high-impact QSR / FMCG partnerships',
      'Restaurants and hospitality destinations driving weekend & evening covers',
      'Retail & convenience chains spotlighting discounts and seasonal bundles',
    ],
    metricsTracked: [
      'Verified Views & Impressions',
      'Cost Per Engagement (CPE)',
      'Sentiment & Purchase-Intent Comments',
      'Promo Redemption & Store Visits',
    ],
  },

  'media-buying': {
    slug: 'media-buying',
    title: 'Media Buying',
    division: 'marketing',
    tagline: 'Targeted Reach. Disciplined Ad Spend.',
    heroImageUrl: '/assets/profile/service-heroes/media-buying-success-dashboard.png',
    heroSummary:
      'Data-informed paid media planning, audience segmentation, cross-channel ad placement, budget pacing, and continuous optimization built to maximize return on ad spend.',
    extendedOverview: [
      'Great creative and social content only reach full commercial scale when backed by smart paid distribution. Boosting posts blindly burns budget on irrelevant impressions without converting active buyers.',
      'Exponential Marketing Agency plans and buys digital media with precision—structuring full-funnel Meta (Instagram & Facebook), TikTok, Google Search & Display, and YouTube campaigns tailored to Kenyan and regional purchasing behavior.',
      'We monitor frequency caps, cost per click, lead quality, and return on ad spend daily—shifting budget dynamically toward winning creatives, high-intent neighborhoods, and peak conversion hours.',
    ],
    strategicValue: [
      {
        title: 'Full-Funnel Audience Segmentation',
        detail:
          'Separate prospecting, retargeting, lookalike, and geo-fenced local store awareness campaigns tailored to buyer readiness.',
      },
      {
        title: 'Continuous A/B Creative Testing',
        detail:
          'We test multiple hooks, static promos, and creator-led video cuts head-to-head so budget flows only to top performers.',
      },
      {
        title: 'Hyper-Local Geo-Targeting',
        detail:
          'Drive nearby shoppers directly into specific Nairobi, Nakuru, or Narok store branches or event activations.',
      },
      {
        title: 'Transparent Spend & ROI Accountability',
        detail:
          'Every shilling of ad spend is tracked against impressions, clicks, WhatsApp/web leads, and conversion outcomes with zero hidden fees.',
      },
    ],
    deliverablesScope: [
      'Paid Media Strategy & Budget Allocation Plan',
      'Meta, TikTok, Google Search & YouTube Campaign Setup',
      'Conversion Tracking & Pixel / Event Verification',
      'Audience Segmentation & Geo-Fence Targeting',
      'A/B Creative & Copy Experimentation',
      'Daily Bid, Budget Pacing & Frequency Management',
      'Retargeting & Lead-Capture Funnel Optimization',
      'Weekly Pacing & Monthly ROAS Reporting',
    ],
    processStages: [
      {
        stage: 'STAGE 01',
        title: 'Media Audit & Objective Forecasting',
        summary:
          'We review past ad accounts, unit economics, target regions, and realistic CPM/CPC/CPA benchmarks across relevant paid platforms.',
        outputs: ['Media mix recommendation', 'Forecast scenarios', 'Tracking checklist'],
      },
      {
        stage: 'STAGE 02',
        title: 'Tracking Setup & Campaign Architecture',
        summary:
          'We verify Pixels, UTM parameters, conversion APIs, and structured campaign hierarchies separating awareness, traffic, and lead conversion.',
        outputs: ['Verified analytics setup', 'Audience cohorts', 'UTM naming convention'],
      },
      {
        stage: 'STAGE 03',
        title: 'Creative Pairing & Ad Launch',
        summary:
          'Paid ads launch with multiple headline, caption, visual, and creator-whitelisted variations calibrated to each placement format.',
        outputs: ['Multi-variant ad sets', 'Pre-flight QA sign-off', 'Live ad launch'],
      },
      {
        stage: 'STAGE 04',
        title: 'Daily Pacing & Active Optimization',
        summary:
          'Our buyers monitor fatigue, CPM spikes, and lead quality daily—pausing underperformers and scaling winning audience-creative pairs.',
        outputs: ['Weekly optimization adjustments', 'Fatigue refreshes', 'Budget reallocation'],
      },
      {
        stage: 'STAGE 05',
        title: 'Attribution & Executive Reporting',
        summary:
          'Clear reports connect spend directly to reach, cost per lead, engagement lift, and strategic recommendations for the next flight.',
        outputs: ['Executive ROI report', 'Channel efficiency breakdown', 'Scaling roadmap'],
      },
    ],
    idealFor: [
      'Retail & QSR brands driving local branch visits and delivery orders',
      'Product launches amplifying hero video and influencer collaborations',
      'B2B, real estate, and education institutions generating qualified inquiries',
    ],
    metricsTracked: [
      'Cost Per Click (CPC) & CTR',
      'Cost Per Lead / Inquiry (CPL)',
      'Return on Ad Spend (ROAS)',
      'Frequency & Geo-Reach Coverage',
    ],
  },

  'brand-activation': {
    slug: 'brand-activation',
    title: 'Brand Activation',
    division: 'emtc',
    tagline: 'Bringing Brands to Life in Real Consumer Spaces.',
    heroImageUrl: '/assets/profile/service-heroes/exponential-brand-activation-giveaway.png',
    heroSummary:
      'High-energy store opening roadshows, in-mall consumer experiences, product sampling tours, trained brand ambassadors, and corporate event execution across Kenya.',
    extendedOverview: [
      'Digital awareness creates curiosity, but live consumer participation seals brand preference. Whether opening a flagship QSR store in Narok, Nakuru, or Nairobi’s malls, running high-footfall product sampling, or hosting corporate banking hospitality at KCB events, execution quality defines brand trust.',
      'Exponential Marketing Agency designs, staffs, brands, and manages every physical detail of on-ground activations—combining vibrant physical touchpoints, trained energetic ambassadors, structured queue & crowd management, MC entertainment, and integrated social/creator capture.',
      'Every activation is connected directly back to our digital teams so live moments on Waiyaki Way, BBS Mall, GTC Mall, Lucky Summer, or The Hub Karen generate viral short-form video and real-time online engagement alongside immediate product trial.',
    ],
    strategicValue: [
      {
        title: 'Turnkey Field & Mall Logistics',
        detail:
          'From mall permits, branded arches, sampling counters, and PA sound systems to stock handling and neighborhood outreach.',
      },
      {
        title: 'Trained & Briefed Brand Ambassadors',
        detail:
          'Uniformed, well-briefed field hosts and promoters who represent your brand standards warmly and persuasively.',
      },
      {
        title: 'Product Trial & Sampling Conversion',
        detail:
          'Interactive product tastings, raffle mechanics, spin-to-win games, and discount vouchers engineered to turn passersby into paying buyers.',
      },
      {
        title: 'Phygital Social & Creator Amplification',
        detail:
          'On-site photography, vertical video capture, and live creator visits turn every single day of field presence into days of digital reach.',
      },
    ],
    deliverablesScope: [
      'Experiential Concept & Activation Mechanic Design',
      'Store Opening Roadshows & Regional Launch Tours',
      'Product & Food/Sauce Sampling Station Operations',
      'Mall Activations & In-Store Promotional Zones',
      'Uniformed Brand Ambassador Recruitment & Training',
      'Branded Arches, Counters, Banners & Promotional Merchandise',
      'Corporate Event Setup, Registration & Hospitality Hosting',
      'On-Site Photo/Video Recap & Post-Activation Field Report',
    ],
    processStages: [
      {
        stage: 'STAGE 01',
        title: 'Activation Concept & Venue Reconnaissance',
        summary:
          'We define the consumer engagement mechanic, audit mall or street foot-traffic patterns, and lock venue permissions and spatial footprints.',
        outputs: ['Experiential concept plan', 'Site recce report', 'Permit & compliance schedule'],
      },
      {
        stage: 'STAGE 02',
        title: 'Fabrication, Branding & Mechanic Setup',
        summary:
          'Our production team designs and produces branded arches, counters, uniforms, flyers, sampling kits, and interactive game structures.',
        outputs: ['Production artwork', 'Custom branded booth/rig', 'Merchandise & sampling kits'],
      },
      {
        stage: 'STAGE 03',
        title: 'Ambassador Casting & Field Briefing',
        summary:
          'We select and train hosts, MCs, and promoters on product talking points, hygiene/sampling standards, hospitality etiquette, and sales targets.',
        outputs: ['Trained ambassador roster', 'Run-of-show script', 'Safety & escalation protocol'],
      },
      {
        stage: 'STAGE 04',
        title: 'Live Execution & Real-Time Supervision',
        summary:
          'Field supervisors manage setup before opening, energize crowd engagement throughout peak hours, track sample volumes, and capture live content.',
        outputs: ['Full-day field management', 'Live photo/video reels', 'Daily footfall logs'],
      },
      {
        stage: 'STAGE 05',
        title: 'De-Rigging & Impact Reconciliation',
        summary:
          'We handle orderly strike-down and deliver a full post-activation wrap report detailing samples distributed, interactions logged, and social reach.',
        outputs: ['Activation wrap report', 'Sample & voucher count', 'Recap media gallery'],
      },
    ],
    idealFor: [
      'New branch & store grand openings across Nairobi, Nakuru, Narok & county hubs',
      'FMCG & food brands driving taste trials, sauce sampling, and shelf velocity',
      'Malls, festivals, and corporate institutions hosting live hospitality engagements',
    ],
    metricsTracked: [
      'Direct Consumer Interactions',
      'Product Samples & Vouchers Distributed',
      'Store Traffic & Sales Lift During Activation',
      'On-Site Content & Earned Social Reach',
    ],
  },

  'visual-design': {
    slug: 'visual-design',
    title: 'Visual Design',
    division: 'creative',
    tagline: 'Bold Design. Memorable Brand Systems.',
    heroImageUrl: '/assets/profile/service-heroes/creative-studio-branding-workspace.png',
    heroSummary:
      'Distinctive logo creation, complete brand identity guidelines, corporate profiles, packaging, exhibition signage, and digital promotional graphics built to command attention.',
    extendedOverview: [
      'A fragmented visual identity signals inconsistency before a single word is read. Ambitious companies need disciplined design systems that hold together effortlessly—from a favicon and Instagram carousel all the way to executive stationery, polo shirts, vehicle wraps, and exhibition roll-up banners.',
      'Exponential Marketing Agency builds complete visual worlds for emerging and established organisations including Cinnamon Energies, Digital Paperboy, Schoolbooks, Computer Pride, Panari Resort Nyahururu, and dozens of active Kenyan enterprises.',
      'Every mark, color palette, typographic pairing, and layout grid is engineered for practical reproduction across screen, offset print, large-format signage, and corporate merchandise.',
    ],
    strategicValue: [
      {
        title: 'Original Mark & Identity Architecture',
        detail:
          'Custom geometric emblems, wordmarks, clear-space construction grids, and scalable lockups engineered for decades of brand equity.',
      },
      {
        title: 'Strict Cross-Media Brand Guidelines',
        detail:
          'Documented HEX, RGB, CMYK, and Pantone color specifications plus typography rules so internal teams and vendors never drift off-brand.',
      },
      {
        title: 'Print, Packaging & Exhibition Readiness',
        detail:
          'Print-verified brochures, company profiles, pull-up exhibition banners, retail POS, and branded corporate apparel mockups.',
      },
      {
        title: 'High-Velocity Digital Design Systems',
        detail:
          'Modular social templates, campaign key visuals, and promotional graphics tailored for quick turnaround across active marketing calendars.',
      },
    ],
    deliverablesScope: [
      'Logo Design & Primary / Secondary Lockup Systems',
      'Comprehensive Brand Identity Guidelines (Brand Books)',
      'HEX / RGB / CMYK Color & Typography Specifications',
      'Corporate Stationery (Letterheads, Business Cards, Folders)',
      'Company Profiles, Pitch Decks & Multi-Page Brochures',
      'Exhibition Pull-Up Banners, Posters & Retail Signage',
      'Packaging Labels & Corporate Apparel / Merchandise Mockups',
      'Social Media & Campaign Key Visual Templates',
    ],
    processStages: [
      {
        stage: 'STAGE 01',
        title: 'Brand Discovery & Visual Audit',
        summary:
          'We study your positioning, competitive category codes, customer expectations, and touchpoint environments across digital and physical spaces.',
        outputs: ['Design brief', 'Category visual audit', 'Aesthetic direction board'],
      },
      {
        stage: 'STAGE 02',
        title: 'Concept Exploration & Logo Construction',
        summary:
          'Designers explore multiple strategic creative territories, refining chosen geometric marks, proportions, and wordmark typography.',
        outputs: ['Concept presentations', 'Vector logo geometry', 'Lockup variations'],
      },
      {
        stage: 'STAGE 03',
        title: 'Color, Type & System Expansion',
        summary:
          'We lock primary and secondary color palettes, type hierarchies, graphic patterns, and layout rules tested across light and dark surfaces.',
        outputs: ['Color & type tokens', 'Grid & icon language', 'Social layout templates'],
      },
      {
        stage: 'STAGE 04',
        title: 'Real-World Collateral & Merchandise Application',
        summary:
          'We apply the identity across business cards, brochures, exhibition banners, packaging, and corporate uniforms to prove real-world durability.',
        outputs: ['Stationery suite', 'Print/packaging proofs', 'Apparel mockups'],
      },
      {
        stage: 'STAGE 05',
        title: 'Master Brand Book & Source File Handoff',
        summary:
          'You receive a comprehensive Brand Guidelines manual alongside neatly organized vector AI/EPS/SVG, print-ready PDF, and web PNG packs.',
        outputs: ['Official Brand Guidelines PDF', 'Full vector & print files', 'Web/social asset kit'],
      },
    ],
    idealFor: [
      'Enterprises and startups establishing an authoritative visual identity',
      'Growing brands refreshing outdated logos, brochures, and company profiles',
      'Exhibitors and marketing teams needing cohesive print, POS, and social visuals',
    ],
    metricsTracked: [
      'Cross-Channel Visual Consistency',
      'Print & Production Turnaround Speed',
      'Campaign Key-Visual Recall',
      'Template Adoption Across Teams',
    ],
  },
};

export const ORDERED_SERVICE_DETAILS: ServiceDetailRecord[] = [
  SERVICE_DETAILS['social-media-management'],
  SERVICE_DETAILS['content-creation-and-marketing'],
  SERVICE_DETAILS['influencer-marketing'],
  SERVICE_DETAILS['media-buying'],
  SERVICE_DETAILS['brand-activation'],
  SERVICE_DETAILS['visual-design'],
];
