export const OFFICIAL_LOGO_URL =
  '/assets/profile/brand/exp-logo-dark.png';

export const OFFICIAL_BRAND_ASSETS = {
  logoUrl: '/assets/profile/brand/exp-logo-dark.png',
  headerLogoUrl: '/assets/profile/brand/exp-logo-red.png',
  footerLogoUrl: '/assets/profile/brand/exp-logo-white.png',
  markUrl: '/assets/profile/brand/exp-mark.png',
  darkLockupUrl: '/assets/profile/brand/exp-logo-dark.png',
};

interface SupplementalEntry {
  market?: string;
  creators?: string[];
  gallery: Array<{ imageUrl: string; caption: string }>;
}

export const PROJECT_SUPPLEMENTAL_MEDIA: Record<string, SupplementalEntry> = {
  'cinnamon-energies-complete-brand-identity': {
    market: 'Nairobi & Regional East Africa',
    gallery: [
      {
        imageUrl: '/assets/profile/work/cinnamon-energies-identity.jpg',
        caption:
          'Complete Cinnamon Energies identity showcase featuring the geometric emblem, #EF4136 coral-red and emerald palette, stationery, and branded apparel.',
      },
      {
        imageUrl: '/assets/profile/work/visual-design-studio.jpg',
        caption:
          'Identity grid engineering, typography scaling, and brand guideline documentation prepared for corporate and field deployment.',
      },
      {
        imageUrl: '/assets/profile/work/print-design-showcase.jpg',
        caption:
          'Print collateral standards extending the identity system across company profiles, corporate brochures, and presentation materials.',
      },
    ],
  },
  'pepsi-kenya-market-entry-influencer-campaign': {
    market: 'Kenya (National Rollout)',
    creators: ['Kenyan Food & Lifestyle Creators', 'Digital Youth Culture Voices'],
    gallery: [
      {
        imageUrl: '/assets/profile/work/pepsi-kenya-entry.jpg',
        caption:
          'Pepsi Kenya market entry announcement spotlighting joint QSR meal combos with Pizza Inn and Chicken Inn.',
      },
      {
        imageUrl: '/assets/profile/work/pepsi-creators-row.jpg',
        caption:
          'Coordinated creator campaign wave driving mass awareness across TikTok, Instagram, and X during launch week.',
      },
    ],
  },
  'ocean-basket-westgate-influencer-engagement': {
    market: 'Westgate Mall, Nairobi, Kenya',
    creators: ['Royal Vee', 'Cera Imani', 'Nimrat Channa', 'Nadia Albana'],
    gallery: [
      {
        imageUrl: '/assets/profile/work/ocean-basket-westgate.jpg',
        caption:
          'Signature seafood dining showcase highlighting Ocean Basket Westgate Mall hospitality and platters.',
      },
      {
        imageUrl: '/assets/profile/work/ocean-basket-creators.jpg',
        caption:
          'Creator partners: Royal Vee, Cera Imani, Nimrat Channa & Nadia Albana producing in-venue dining reels.',
      },
    ],
  },
  'grill-shack-lifestyle-food-influencer-campaigns': {
    market: 'Nairobi, Kenya',
    creators: ['Sue Owino', 'Rita Kimwemwe', 'Leilah Watts', 'Naomi Kuria'],
    gallery: [
      {
        imageUrl: '/assets/profile/work/grill-shack-dining.jpg',
        caption:
          'Steaks, ribs, and artisanal burgers dining narrative captured for The Grill Shack Nairobi.',
      },
      {
        imageUrl: '/assets/profile/work/grill-shack-creators.jpg',
        caption:
          'Lifestyle & culinary creators: Sue Owino, Rita Kimwemwe, Leilah Watts & Naomi Kuria.',
      },
    ],
  },
  'marhaba-stop-and-shop-shell-select-retail-campaigns': {
    market: 'Kenya',
    creators: ['Krisbabyy', 'Joy Mwendwa', 'Flossy Trukid', 'Malu'],
    gallery: [
      {
        imageUrl: '/assets/profile/work/retail-select-marhaba.jpg',
        caption:
          'Promotional retail storytelling across Shell Select, Stop & Shop, and Marhaba consumer touchpoints.',
      },
      {
        imageUrl: '/assets/profile/work/retail-select-creators.jpg',
        caption:
          'Campaign creators Krisbabyy, Joy Mwendwa, Flossy Trukid & Malu demonstrating in-store savings.',
      },
    ],
  },
  'galitos-launch-sauce-sampling-activations': {
    market: 'Narok, Waiyaki Way & BBS Mall, Kenya',
    gallery: [
      {
        imageUrl: '/assets/profile/work/events/galitos-narok-58.jpg',
        caption: "Galito's Narok team gathered at the branded branch entrance.",
      },
      {
        imageUrl: '/assets/profile/work/events/galitos-narok-99.jpg',
        caption: "Galito's activation team and guests beneath the branded arch.",
      },
      {
        imageUrl: '/assets/profile/work/events/galitos-narok-20.jpg',
        caption: "A live performance brings energy to the Galito's Narok activation.",
      },
      {
        imageUrl: '/assets/profile/work/events/galitos-narok-226.jpg',
        caption: "The team celebrates together during the Galito's Narok event.",
      },
      {
        imageUrl: '/assets/profile/work/events/galitos-narok-101.jpg',
        caption: "Guests and the activation team interact at Galito's Narok.",
      },
    ],
  },
  'chicken-inn-retail-events-mall-activations': {
    market: 'Nairobi (BBS Mall, Lucky Summer & Retail Locations)',
    gallery: [
      {
        imageUrl: '/assets/profile/work/events/chicken-inn-lucky-summer-242.jpg',
        caption: 'A ribbon-cutting moment at the Chicken Inn Lucky Summer opening.',
      },
      {
        imageUrl: '/assets/profile/work/events/chicken-inn-lucky-summer-218.jpg',
        caption: 'Community turnout at the Chicken Inn Lucky Summer activation.',
      },
      {
        imageUrl: '/assets/profile/work/events/chicken-inn-lucky-summer-16.jpg',
        caption: 'A live activation moment outside the Chicken Inn outlet.',
      },
      {
        imageUrl: '/assets/profile/work/events/chicken-inn-lucky-summer-14.jpg',
        caption: 'The decorated Chicken Inn Lucky Summer storefront.',
      },
      {
        imageUrl: '/assets/profile/work/events/chicken-inn-dsc00365.jpg',
        caption: 'A Chicken Inn mascot welcomes visitors outside the branch.',
      },
      {
        imageUrl: '/assets/profile/work/events/chicken-inn-dsc00326.jpg',
        caption: 'Chicken Inn storefront dressed for a customer-facing event.',
      },
    ],
  },
  'pizza-inn-galitos-gtc-mall-nakuru-launches': {
    market: 'GTC Mall (Nairobi) & Basic 58 (Nakuru), Kenya',
    gallery: [
      {
        imageUrl: '/assets/profile/work/pizza-galitos-gtc-mall.jpg',
        caption: "Pizza Inn & Galito's joint GTC Mall opening activation in Westlands, Nairobi.",
      },
      {
        imageUrl: '/assets/profile/work/nakuru-basic58-launch.jpg',
        caption: 'Basic 58 Nakuru grand launch activation & high-energy crowd engagement.',
      },
    ],
  },
  'kcb-corporate-event-management': {
    market: 'Nairobi, Kenya',
    gallery: [
      {
        imageUrl: '/assets/profile/work/events/kcb-event-registration.jpg',
        caption: 'KCB-branded registration counters at an outdoor event.',
      },
      {
        imageUrl: '/assets/profile/work/events/kcb-event-outdoor.jpg',
        caption: 'KCB event setup and guest areas in an outdoor setting.',
      },
      {
        imageUrl: '/assets/profile/work/events/kcb-event-tent.jpg',
        caption: 'A branded KCB hospitality and registration tent.',
      },
      {
        imageUrl: '/assets/profile/work/events/kcb-event-guest-area.jpg',
        caption: 'Guest seating and event space prepared for KCB attendees.',
      },
    ],
  },
  'content-creation-tecno-big5-qsr-production': {
    market: 'Nairobi & Regional Kenya',
    gallery: [
      {
        imageUrl: '/assets/profile/work/content-studio-chair.jpg',
        caption: 'Commercial content production set configured for lifestyle and product storytelling.',
      },
      {
        imageUrl: '/assets/profile/work/promotional-posts-grid.jpg',
        caption: 'Multi-format digital campaign cuts adapted for Instagram, TikTok, and paid placements.',
      },
    ],
  },
  'digital-paperboy-and-schoolbooks-identity-systems': {
    market: 'Kenya & East Africa',
    gallery: [
      {
        imageUrl: '/assets/profile/work/digital-paperboy-identity.jpg',
        caption: 'Digital Paperboy brand book covering Mountella typography and modular logo rules.',
      },
      {
        imageUrl: '/assets/profile/work/schoolbooks-identity.jpg',
        caption: 'Schoolbooks identity grid, Prussian Blue & Wiki Green color specification.',
      },
    ],
  },
  'toyworld-kenya-styroplast-social-media-management': {
    market: 'Kenya',
    gallery: [
      {
        imageUrl: '/assets/profile/work/toyworld-social-showcase.jpg',
        caption: 'Structured social media grid and seasonal retail promotional campaigns for ToyWorld Kenya.',
      },
      {
        imageUrl: '/assets/profile/work/styroplast-social-showcase.jpg',
        caption: 'B2B and distributor social feed architecture created for Styroplast Group.',
      },
    ],
  },
};
