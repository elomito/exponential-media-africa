import type { InsightArticle, PortfolioProject } from '../types/cms';

const PROJECT_CARD_IMAGES: Record<string, string> = {
  'galitos-launch-sauce-sampling-activations':
    '/assets/profile/work/events/galitos-narok-58.jpg',
  'chicken-inn-retail-events-mall-activations':
    '/assets/profile/work/events/chicken-inn-lucky-summer-242.jpg',
};

const ARTICLE_CARD_IMAGES: Record<string, string> = {
  'why-african-brands-need-integrated-marketing-execution':
    '/assets/profile/work/events/junction-mall-194.jpg',
  'bridging-influencer-storytelling-and-on-ground-activations':
    '/assets/profile/work/events/galitos-narok-99.jpg',
  'building-consistent-visual-identity-and-social-systems':
    '/assets/profile/work/events/pizza-chicken-inn-basic58.jpg',
  'data-informed-media-buying-and-social-growth-east-africa':
    '/assets/profile/work/events/junction-mall-212.jpg',
};

export function getProjectCardImageUrl(
  project: Pick<PortfolioProject, 'slug' | 'imageUrl'>
): string {
  return PROJECT_CARD_IMAGES[project.slug] || project.imageUrl;
}

export function getArticleCardImageUrl(
  article: Pick<InsightArticle, 'slug' | 'imageUrl'>
): string {
  return ARTICLE_CARD_IMAGES[article.slug] || article.imageUrl;
}
