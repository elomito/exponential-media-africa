export interface ExecutionPhase {
  phase: string;
  title: string;
  detail: string;
}

export interface ProjectSpecification {
  label: string;
  value: string;
}

export interface DeliverableDetail {
  name: string;
  detail: string;
}

export interface RichCaseStudyDetail {
  sector: string;
  market: string;
  timeline: string;
  servicesUsed: string[];
  executiveOverview: string[];
  strategicObjectives: string[];
  challengeDetailed: string[];
  strategyDetailed: string[];
  specifications: ProjectSpecification[];
  executionPhases: ExecutionPhase[];
  deliverableDetails: DeliverableDetail[];
  documentedOutcomes: string[];
}

export const PROJECT_DETAILS: Record<string, RichCaseStudyDetail> = {
  'cinnamon-energies-complete-brand-identity': {
    sector: 'Energy, Petroleum & Infrastructure',
    market: 'Kenya & East African Regional Corridor',
    timeline: '8 Weeks — Discovery to Production Rollout',
    servicesUsed: ['Visual Design', 'Content Creation & Marketing'],
    executiveOverview: [
      'Cinnamon Energies engaged Exponential Marketing Agency to architect a complete corporate identity system capable of standing out in East Africa’s energy and downstream distribution sector. Rather than producing an isolated logo file, our Visual Design practice engineered a cohesive visual language spanning mark geometry, calibrated color tokens, typographic rules, executive stationery, and rugged field merchandise.',
      'The mandate required an identity that felt equally authoritative in institutional boardrooms, regulatory proposals, filling stations, and operational fleet environments. Every mark proportion, clear-space ratio, and print production tolerance was documented so internal staff and external fabricators execute with zero visual drift.',
    ],
    strategicObjectives: [
      'Establish an unmistakable, ownable corporate symbol built around clean geometric precision.',
      'Create a dual-tone color palette balancing high-visibility warmth and technical reliability across light and dark applications.',
      'Standardize all day-to-day corporate stationery—letterheads, business cards, presentation folders, and email signatures.',
      'Translate the digital brand identity cleanly onto embroidered apparel, corporate polo shirts, branded caps, and field uniforms.',
    ],
    challengeDetailed: [
      'Emerging and regional energy enterprises frequently rely on fragmented graphic assets assembled ad hoc by separate print vendors. That fragmentation undermines institutional trust during B2B tender evaluations, supplier onboarding, and public-facing station rollouts.',
      'For Cinnamon Energies, the mark needed to scale effortlessly from a 16-pixel digital favicon and embossed business card corner all the way up to high-visibility outdoor signage and stitched chest emblems on technical polo shirts—without losing stroke clarity or color accuracy.',
    ],
    strategyDetailed: [
      'Exponential Marketing Agency initiated a structured visual audit of regional energy competitors, identifying an opportunity to move away from cluttered gradients toward disciplined Swiss-inspired geometry.',
      'We paired a crisp vector emblem with primary #EF4136 flame-coral accents and grounded emerald-slate secondary tokens. Each specification was stress-tested across coated offset paper stock, cotton twill embroidery, and digital screen viewports before locking the final Brand Guidelines manual.',
    ],
    specifications: [
      { label: 'Primary Brand Mark', value: 'Custom Geometric Emblem + Bold Wordmark Lockup' },
      { label: 'Primary Signature Color', value: '#EF4136 Flame Red (High-Visibility Institutional Accent)' },
      { label: 'Secondary System Tokens', value: 'Deep Emerald Green & Neutral Slate Ink Hierarchy' },
      { label: 'Minimum Clear Space', value: '1x Emblem Cap-Height Perimeter Across All Print & Digital' },
      { label: 'Print & Production Standards', value: 'CMYK Process, Pantone Spot Match & High-Density Embroidery' },
      { label: 'Core Deliverables', value: 'Brand Guidelines Book, Stationery Suite & Field Apparel System' },
    ],
    executionPhases: [
      {
        phase: 'PHASE 01',
        title: 'Sector Audit & Positioning Brief',
        detail:
          'Benchmarked regional energy and infrastructure identities across Kenya and East Africa to isolate visual differentiation territories.',
      },
      {
        phase: 'PHASE 02',
        title: 'Emblem Geometry & Color Engineering',
        detail:
          'Constructed scalable master logo lockups on mathematical grid proportions and calibrated HEX, RGB, CMYK, and embroidery thread codes.',
      },
      {
        phase: 'PHASE 03',
        title: 'Corporate Stationery & Proposal System',
        detail:
          'Designed print-ready double-sided business cards, official letterheads, compliment slips, and executive presentation covers.',
      },
      {
        phase: 'PHASE 04',
        title: 'Apparel, Caps & Brand Governance Handover',
        detail:
          'Delivered stitch-ready merchandise mockups for polo shirts and field caps alongside a comprehensive brand rules manual.',
      },
    ],
    deliverableDetails: [
      {
        name: 'Logo & Visual Identity System',
        detail:
          'Primary horizontal, stacked, and standalone emblem lockups delivered in SVG, EPS, PDF, and high-resolution PNG formats.',
      },
      {
        name: 'Color & Typography Specification',
        detail:
          'Exact HEX (#EF4136 primary + emerald secondary), CMYK print mixes, and headline/body font pairing hierarchy.',
      },
      {
        name: 'Corporate Stationery & Business Cards',
        detail:
          'Press-ready Adobe Illustrator and PDF templates for A4 letterheads, executive business cards, and branded envelopes.',
      },
      {
        name: 'Branded Polo Shirts & Caps',
        detail:
          'Fabric placement blueprints, collar/cuff color blocking, and embroidered chest and visor specifications for field staff.',
      },
    ],
    documentedOutcomes: [
      'Unified corporate presentation across B2B stakeholder correspondence, proposals, and physical staff uniforms.',
      'Eliminated print reproduction inconsistencies by supplying vendors with standardized CMYK/Pantone and embroidery files.',
      'Provided an expandable design system ready for station signage, fleet branding, and digital campaign rollouts.',
    ],
  },

  'pepsi-kenya-market-entry-influencer-campaign': {
    sector: 'Beverages, FMCG & Quick Service Restaurants',
    market: 'Kenya (National Digital & Creator Rollout)',
    timeline: '6 Weeks — Launch Planning to Post-Campaign Audit',
    servicesUsed: ['Influencer Marketing', 'Content Creation & Marketing', 'Social Media Management', 'Media Buying'],
    executiveOverview: [
      'Exponential Marketing Agency spearheaded influencer strategy and campaign execution announcing Pepsi’s Kenyan market entry alongside strategic QSR partnerships with Chicken Inn and Pizza Inn.',
      'Our objective was to generate immediate cultural momentum and drive awareness of bundled meal promotions nationwide through authentic, youth-relevant storytelling on TikTok and Instagram.',
    ],
    strategicObjectives: [
      'Announce Pepsi’s re-energized presence across Kenya with high-shareability digital storytelling.',
      'Spotlight co-branded combo mechanics with flagship QSR outlets Pizza Inn and Chicken Inn.',
      'Coordinate creator deliverables on tight launch windows with 100% brand safety compliance.',
    ],
    challengeDetailed: [
      'Entering or re-launching an iconic global beverage brand in Kenya’s crowded soft-drink category requires more than static billboards—it demands social proof embedded directly inside everyday dining culture.',
      'Coordinating messaging across three household brands (Pepsi, Pizza Inn, and Chicken Inn) required unified creator briefing, synchronized publishing calendars, and seamless approval workflows.',
    ],
    strategyDetailed: [
      'We engineered a tiered creator pyramid pairing high-reach lifestyle personalities with relatable food and campus-culture storytellers. Each creator filmed natural dine-in and takeaway combo moments rather than scripted ad reads.',
      'Paid media amplification backed top-performing organic creator videos to sustain reach across Nairobi, Mombasa, Kisumu, Nakuru, and Eldoret.',
    ],
    specifications: [
      { label: 'Primary Channels', value: 'TikTok, Instagram Reels & Cross-Platform Paid Social' },
      { label: 'Co-Brand Partners', value: 'Pepsi Kenya · Pizza Inn · Chicken Inn' },
      { label: 'Creator Tier Mix', value: 'Macro Lifestyle Talent + Hyper-Local Food Creators' },
      { label: 'Deliverable Format', value: 'Short-Form Vertical Video (9:16), Story Sequences & Stills' },
    ],
    executionPhases: [
      {
        phase: 'PHASE 01',
        title: 'Creator Auditing & Audience Vetting',
        detail: 'Screened creator engagement authenticity, demographic fit across Kenyan metros, and content quality.',
      },
      {
        phase: 'PHASE 02',
        title: 'Briefing, Contracts & Shoot Coordination',
        detail: 'Handled creator contracting, legal usage rights, product logistics, and on-location QSR shooting schedules.',
      },
      {
        phase: 'PHASE 03',
        title: 'Synchronized Wave Publishing',
        detail: 'Orchestrated coordinated drop windows across TikTok and Instagram alongside paid media buying boosts.',
      },
      {
        phase: 'PHASE 04',
        title: 'Analytics & Executive Reporting',
        detail: 'Compiled impressions, video completion metrics, sentiment, and partner combo visibility into a unified debrief.',
      },
    ],
    deliverableDetails: [
      { name: 'Influencer Sourcing & Vetting', detail: 'Data-backed creator roster verified for authentic Kenyan audience reach.' },
      { name: 'Campaign Strategy & Planning', detail: 'Full launch narrative linking Pepsi refreshment to Pizza Inn & Chicken Inn meal deals.' },
      { name: 'Creator Partnership Management', detail: 'End-to-end production oversight, script guidance, and brand review cycles.' },
      { name: 'Contract Negotiation & Reporting', detail: 'Rights clearance, fee negotiation, and post-campaign analytics summary.' },
    ],
    documentedOutcomes: [
      'Delivered cohesive national digital visibility connecting Pepsi’s entry directly to Kenya’s leading QSR dining destinations.',
      'Maintained synchronized publishing cadence across all partnered creators and retail outlets.',
    ],
  },

  'ocean-basket-westgate-influencer-engagement': {
    sector: 'Casual Dining & Hospitality',
    market: 'Westgate Mall, Westlands, Nairobi',
    timeline: 'Ongoing Multi-Month Creator Partnership',
    servicesUsed: ['Influencer Marketing', 'Content Creation & Marketing', 'Social Media Management'],
    executiveOverview: [
      'Exponential Marketing Agency managed a long-term influencer engagement program for Ocean Basket at Westgate Mall, spotlighting signature seafood platters, warm Mediterranean hospitality, and group dining rituals.',
      'Rather than one-off sponsored posts, we built an ongoing ambassador cadence featuring Royal Vee, Cera Imani, Nimrat Channa, and Nadia Albana to turn the restaurant into a recurring social destination.',
    ],
    strategicObjectives: [
      'Elevate visibility of Ocean Basket’s Westgate Mall location among Nairobi diners.',
      'Highlight menu depth—from sharing platters and sushi to signature sauces—through appetizing video storytelling.',
      'Build sustained monthly foot-traffic consideration through trusted lifestyle voices.',
    ],
    challengeDetailed: [
      'Seafood dining in Nairobi often faces a perception barrier of being strictly for rare occasions. Ocean Basket needed relatable content showing accessible everyday lunches, family outings, and weekend group dining.',
    ],
    strategyDetailed: [
      'We matched four complementary Nairobi creators—Royal Vee, Cera Imani, Nimrat Channa, and Nadia Albana—each bringing distinct aesthetic sensibilities and diner communities into curated dining experiences at Westgate Mall.',
    ],
    specifications: [
      { label: 'Featured Talent', value: 'Royal Vee · Cera Imani · Nimrat Channa · Nadia Albana' },
      { label: 'Venue Focus', value: 'Ocean Basket — Westgate Mall, Nairobi' },
      { label: 'Content Formats', value: 'Reels, TikTok Dining Vlogs & Platter Carousels' },
    ],
    executionPhases: [
      { phase: 'PHASE 01', title: 'Creator Roster Selection', detail: 'Selected Nairobi creators aligned with culinary hospitality and lifestyle audiences.' },
      { phase: 'PHASE 02', title: 'In-Venue Dining Hosting', detail: 'Coordinated table styling, chef platter pacing, and natural-light filming slots at Westgate.' },
      { phase: 'PHASE 03', title: 'Iterative Menu Spotlights', detail: 'Scheduled staggered monthly releases highlighting seasonal specials and signature combos.' },
      { phase: 'PHASE 04', title: 'Engagement & Reach Tracking', detail: 'Tracked saves, shares, comments, and location-tag discovery across social platforms.' },
    ],
    deliverableDetails: [
      { name: 'Long-Term Creator Roster', detail: 'Multi-visit creator agreements sustaining consistent dining visibility.' },
      { name: 'Dining Experience Coordination', detail: 'Seamless restaurant logistics ensuring photogenic plate presentation.' },
      { name: 'Signature Menu Content', detail: 'High-retention Reels and TikToks spotlighting hero dishes and ambiance.' },
      { name: 'Performance Reporting', detail: 'Periodic audience engagement and content performance summaries.' },
    ],
    documentedOutcomes: [
      'Generated high-volume social saves and dining inquiries tailored specifically to the Westgate Mall branch.',
      'Established a repeatable blueprint for ongoing hospitality creator partnerships.',
    ],
  },

  'galitos-launch-sauce-sampling-activations': {
    sector: 'Quick Service Restaurants',
    market: 'Narok, Waiyaki Way & BBS Mall (Eastleigh), Kenya',
    timeline: 'Multi-Branch Activation Series',
    servicesUsed: ['Brand Activation', 'Visual Design', 'Content Creation & Marketing'],
    executiveOverview: [
      "Exponential Marketing Agency executed high-energy store launches and interactive peri-peri sauce sampling campaigns for Galito's Kenya across Narok, Waiyaki Way, and BBS Mall.",
      'Each location combined unmistakable physical street presence—inflatable arches, feather banners, uniformed ambassadors—with face-to-face flavor trial and flyer coupon distribution.',
    ],
    strategicObjectives: [
      "Drive immediate footfall and awareness during Narok and Waiyaki Way branch launches.",
      "Convert curious mall shoppers at BBS Mall through live sauce tasting stations.",
      'Maintain strict hygiene, hospitality, and QSR brand presentation on the ground.',
    ],
    challengeDetailed: [
      'New branch openings outside or across busy transit corridors require rapid grassroots awareness to turn passers-by into first-day diners.',
    ],
    strategyDetailed: [
      'Our Brand Activation team deployed trained ambassadors, neighborhood flyer teams, live music energy, and guided peri-peri sauce tastings that removed purchase hesitation and brought customers directly to the counter.',
    ],
    specifications: [
      { label: 'Activation Sites', value: 'Narok Town · Waiyaki Way · BBS Mall, Nairobi' },
      { label: 'Experiential Mechanics', value: 'Store Launch Roadshows & Peri-Peri Sauce Sampling' },
      { label: 'On-Ground Assets', value: 'Branded Archways, Tasting Counters & Uniformed Ambassadors' },
    ],
    executionPhases: [
      { phase: 'PHASE 01', title: 'Site Reconnaissance & Permits', detail: 'Mapped footfall choke points around Narok CBD, Waiyaki Way, and BBS Mall corridors.' },
      { phase: 'PHASE 02', title: 'Ambassador Training & Briefing', detail: 'Trained field teams on menu talking points, sauce heat levels, and food-safe sampling.' },
      { phase: 'PHASE 03', title: 'Live Activation Rollout', detail: 'Executed full-day launches and weekend mall sampling shifts with visual capture.' },
      { phase: 'PHASE 04', title: 'Field Wrap & Feedback', detail: 'Logged customer flavor preferences and sample-to-purchase momentum.' },
    ],
    deliverableDetails: [
      { name: 'Store Opening Roadshows', detail: 'Full street-level visibility, branded arches, and high-energy launch hosting.' },
      { name: 'Sauce Product Sampling', detail: 'Clean, appetizing tasting counters introducing signature Galito’s flavor profiles.' },
      { name: 'Branded Ambassador Staffing', detail: 'Vetted, energetic brand ambassadors fluent in local community engagement.' },
      { name: 'In-Store Promotions', detail: 'Flier drops and queue engagement converting awareness into counter orders.' },
    ],
    documentedOutcomes: [
      'Positioned each newly opened branch as an immediate neighborhood landmark on launch weekend.',
      'Delivered hundreds of guided product tastes bridging awareness directly to counter sales.',
    ],
  },

  'kcb-corporate-event-management': {
    sector: 'Banking & Financial Services',
    market: 'Nairobi, Kenya',
    timeline: 'Event Execution & On-Site Operations',
    servicesUsed: ['Brand Activation', 'Visual Design'],
    executiveOverview: [
      'Exponential Marketing Agency delivered turnkey on-ground event management and corporate hospitality infrastructure for KCB.',
      'From crisp registration desks and branded directional signage to uniformed guest reception teams, every touchpoint reflected KCB’s stature as East Africa’s leading banking institution.',
    ],
    strategicObjectives: [
      'Guarantee seamless guest registration, wayfinding, and queue hospitality.',
      'Present immaculate corporate signage across outdoor and tented event spaces.',
      'Deliver proactive on-site troubleshooting from setup through guest departure.',
    ],
    challengeDetailed: [
      'Outdoor banking hospitality events demand weather-resilient branding structures, rapid guest throughput at accreditation desks, and polished corporate demeanor from every customer-facing ambassador.',
    ],
    strategyDetailed: [
      'We deployed custom-wrapped KCB counters, taut feather flags, clear zone signage, and pre-briefed hospitality hosts working from structured event run-of-show schedules.',
    ],
    specifications: [
      { label: 'Client Mandate', value: 'Corporate Hospitality & Registration Execution' },
      { label: 'Physical Assets', value: 'Branded Counters, Feather Flags, Backdrop Banners' },
      { label: 'Staffing Model', value: 'Uniformed Protocol & Registration Ambassadors' },
    ],
    executionPhases: [
      { phase: 'PHASE 01', title: 'Site Layout & Rigging Plan', detail: 'Planned delegate arrival flow, registration counters, and sightlines.' },
      { phase: 'PHASE 02', title: 'Branding Production & Setup', detail: 'Fabricated and installed weather-ready KCB signage and hospitality desks prior to guest arrival.' },
      { phase: 'PHASE 03', title: 'Guest Accreditation & Hosting', detail: 'Managed attendee check-in, VIP routing, and continuous area upkeep.' },
      { phase: 'PHASE 04', title: 'De-Rig & Client Handover', detail: 'Completed orderly breakdown and asset inventory verification.' },
    ],
    deliverableDetails: [
      { name: 'Event Setup & Signage', detail: 'Clean physical brand presence engineered for outdoor visibility.' },
      { name: 'Registration Desk Logistics', detail: 'Fast, organized attendee check-in eliminating arrival bottlenecks.' },
      { name: 'Uniformed Brand Ambassadors', detail: 'Hospitality-trained hosts aligned to corporate banking standards.' },
      { name: 'On-Site Guest Coordination', detail: 'End-to-end supervision of guest experience throughout the program.' },
    ],
    documentedOutcomes: [
      'Delivered organized, high-clarity corporate hospitality reflecting KCB’s brand standards.',
      'Zero arrival congestion across peak delegate check-in windows.',
    ],
  },
};

export function getFallbackDetailForProject(project: {
  title: string;
  category: string;
  clientName: string;
  summary: string;
  challenge: string;
  solution: string;
  deliverables: string[];
}): RichCaseStudyDetail {
  return {
    sector: project.category,
    market: 'Kenya & Regional East Africa',
    timeline: 'End-to-End Agency Delivery',
    servicesUsed: [
      'Social Media Management',
      'Content Creation & Marketing',
      'Influencer Marketing',
      'Media Buying',
      'Brand Activation',
      'Visual Design',
    ].slice(0, 3),
    executiveOverview: [
      project.summary,
      `Delivered by Exponential Marketing Agency from our Kilimani, Nairobi headquarters, this engagement aligned strategic positioning, creative execution, and channel precision for ${project.clientName}.`,
    ],
    strategicObjectives: [
      `Strengthen audience visibility and category recall for ${project.clientName}.`,
      'Ensure consistent visual and verbal execution across every customer-facing touchpoint.',
      'Translate creative storytelling into measurable commercial engagement and brand equity.',
    ],
    challengeDetailed: [project.challenge],
    strategyDetailed: [project.solution],
    specifications: [
      { label: 'Client Organisation', value: project.clientName },
      { label: 'Primary Category', value: project.category },
      { label: 'Lead Agency', value: 'Exponential Marketing Agency (Nairobi, Kenya)' },
      { label: 'Core Deliverables', value: project.deliverables.join(' · ') },
    ],
    executionPhases: [
      {
        phase: 'PHASE 01',
        title: 'Discovery & Audience Alignment',
        detail: `Defined commercial objectives, audience behaviors, and messaging priorities for ${project.clientName}.`,
      },
      {
        phase: 'PHASE 02',
        title: 'Creative & Visual Architecture',
        detail: 'Crafted visual systems, campaign scripts, and production assets tailored to target channels.',
      },
      {
        phase: 'PHASE 03',
        title: 'Integrated Channel Rollout',
        detail: 'Executed cohesive campaign deployment uniting design, content, creator voices, media buying, or on-ground teams.',
      },
      {
        phase: 'PHASE 04',
        title: 'Reporting & Optimization',
        detail: 'Documented campaign performance, audience insights, and next-step commercial recommendations.',
      },
    ],
    deliverableDetails: project.deliverables.map((item) => ({
      name: item,
      detail: `Planned, produced, and quality-assured by Exponential Marketing Agency for ${project.clientName}.`,
    })),
    documentedOutcomes: [
      `Delivered unified brand presentation and reliable turnaround for ${project.clientName}.`,
      'Provided clear strategic documentation supporting ongoing campaign and commercial growth.',
    ],
  };
}
