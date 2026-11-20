interface SupplementalEntry {
  market?: string;
  creators?: string[];
  gallery: Array<{ imageUrl: string; caption: string }>;
}

export const PROJECT_SUPPLEMENTAL_MEDIA: Record<string, SupplementalEntry> = {
  'ocean-basket-westgate-influencer-engagement': {
    market: 'Nairobi, Kenya',
    creators: ['Royal Vee', 'Cera Imani', 'Nimrat Channa', 'Nadia Albana'],
    gallery: [
      {
        imageUrl: '/assets/profile/work/ocean-basket-westgate.jpg',
        caption: 'Signature seafood dining showcase for Ocean Basket Westgate Mall',
      },
      {
        imageUrl: '/assets/profile/work/ocean-basket-creators.jpg',
        caption: 'Creator partners: Royal Vee, Cera Imani, Nimrat Channa & Nadia Albana',
      }
    ]
  },
  'grill-shack-lifestyle-food-influencer-campaigns': {
    market: 'Nairobi, Kenya',
    creators: ['Sue Owino', 'Rita Kimwemwe', 'Leilah Watts', 'Naomi Kuria'],
    gallery: [
      {
        imageUrl: '/assets/profile/work/grill-shack-dining.jpg',
        caption: 'Steaks, ribs, and burgers positioning for The Grill Shack',
      },
      {
        imageUrl: '/assets/profile/work/grill-shack-creators.jpg',
        caption: 'Lifestyle & food creators: Sue Owino, Rita Kimwemwe, Leilah Watts & Naomi Kuria',
      }
    ]
  },
  'marhaba-stop-and-shop-shell-select-retail-campaigns': {
    market: 'Kenya',
    creators: ['Krisbabyy', 'Joy Mwendwa', 'Flossy Trukid', 'Malu'],
    gallery: [
      {
        imageUrl: '/assets/profile/work/retail-select-marhaba.jpg',
        caption: 'In-store promotional awareness across Shell Select, Stop & Shop, and Marhaba',
      },
      {
        imageUrl: '/assets/profile/work/retail-select-creators.jpg',
        caption: 'Campaign creators: Krisbabyy, Joy Mwendwa, Flossy Trukid & Malu',
      }
    ]
  },
  'galitos-launch-sauce-sampling-activations': {
    market: 'Narok, Waiyaki Way & BBS Mall, Kenya',
    gallery: [
      {
        imageUrl: '/assets/profile/work/galitos-waiyaki-way.jpg',
        caption: 'Galito\'s Waiyaki Way opening experiential activation',
      },
      {
        imageUrl: '/assets/profile/work/galitos-narok-launch-1.jpg',
        caption: 'Galito\'s Narok branch launch roadshow & flyer outreach',
      },
      {
        imageUrl: '/assets/profile/work/galitos-narok-launch-2.jpg',
        caption: 'Galito\'s Narok team engaging local customers',
      },
      {
        imageUrl: '/assets/profile/work/galitos-sauce-sampling-1.jpg',
        caption: 'Galito\'s BBS Mall interactive sauce tasting station',
      },
      {
        imageUrl: '/assets/profile/work/galitos-sauce-sampling-2.jpg',
        caption: 'On-ground product sampling tour with brand ambassadors',
      }
    ]
  },
  'chicken-inn-retail-events-mall-activations': {
    market: 'Nairobi (BBS Mall, Lucky Summer & Retail Locations)',
    gallery: [
      {
        imageUrl: '/assets/profile/work/chicken-inn-bbs-mall-1.jpg',
        caption: 'Chicken Inn BBS Mall in-store brand activation & flyer engagement',
      },
      {
        imageUrl: '/assets/profile/work/chicken-inn-bbs-mall-2.jpg',
        caption: 'Shopper interaction during BBS Mall promotional campaign',
      },
      {
        imageUrl: '/assets/profile/work/chicken-inn-valentines.jpg',
        caption: 'Chicken Inn Valentine\'s Day seasonal brand activation',
      },
      {
        imageUrl: '/assets/profile/work/chicken-inn-lucky-summer.jpg',
        caption: 'Lucky Summer branch opening activation',
      },
      {
        imageUrl: '/assets/profile/work/chicken-inn-champs.jpg',
        caption: 'Chicken Inn Champs semi-finals fan experience & activation',
      }
    ]
  },
  'pizza-inn-galitos-gtc-mall-nakuru-launches': {
    market: 'GTC Mall (Nairobi) & Basic 58 (Nakuru), Kenya',
    gallery: [
      {
        imageUrl: '/assets/profile/work/pizza-galitos-gtc-mall.jpg',
        caption: 'Pizza Inn & Galito\'s joint GTC Mall opening activation',
      },
      {
        imageUrl: '/assets/profile/work/nakuru-basic58-launch.jpg',
        caption: 'Basic 58 Nakuru grand launch activation & crowd engagement',
      }
    ]
  },
};

export const OFFICIAL_BRAND_ASSETS = {
  markUrl: '/assets/profile/brand/exp-mark.png',
  darkLockupUrl: '/assets/profile/brand/exp-logo-dark.png',
};
