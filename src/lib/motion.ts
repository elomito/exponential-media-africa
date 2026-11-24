import type { InsightArticle, PortfolioProject } from '../types/cms';

export type SectionSurface = 'white' | 'red';

export type RevealVariant = 'slide-left' | 'slide-right' | 'slide-up' | 'slide-down' | 'pop';

export interface ArticleSectionBlock {
  type: 'heading' | 'list' | 'paragraph';
  text?: string;
  items?: string[];
}

export interface PortfolioBands {
  whiteBand: PortfolioProject[];
  redBand: PortfolioProject[];
}

export function getAlternatingSectionSurface(index: number): SectionSurface {
  return index % 2 === 0 ? 'red' : 'white';
}

export function verifyAlternatingSequence(surfaces: SectionSurface[]): boolean {
  if (surfaces.length === 0) return false;
  if (surfaces[0] !== 'red') return false;
  for (let i = 1; i < surfaces.length; i += 1) {
    if (surfaces[i] === surfaces[i - 1]) return false;
  }
  return true;
}

export function partitionPortfolioBands(projects: PortfolioProject[]): PortfolioBands {
  if (projects.length <= 3) {
    return { redBand: projects, whiteBand: [] };
  }
  const splitAt = Math.min(6, Math.ceil(projects.length / 2 / 3) * 3 || 3);
  return {
    redBand: projects.slice(0, splitAt),
    whiteBand: projects.slice(splitAt),
  };
}

export function parseArticleSections(body: string): ArticleSectionBlock[] {
  const chunks = body
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);

  return chunks.map((chunk) => {
    if (chunk.startsWith('## ')) {
      return {
        type: 'heading',
        text: chunk.replace(/^##\s+/, '').trim(),
      };
    }

    const lines = chunk
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);

    if (lines.length > 0 && lines.every((l) => /^[-*•]\s+/.test(l))) {
      return {
        type: 'list',
        items: lines.map((l) => l.replace(/^[-*•]\s+/, '').trim()),
      };
    }

    return {
      type: 'paragraph',
      text: chunk,
    };
  });
}

export function countArticleWords(article: InsightArticle): number {
  const text = `${article.title} ${article.excerpt} ${article.body}`;
  return text
    .replace(/##/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

export interface ParsedCountDisplay {
  target: number | null;
  prefix: string;
  suffix: string;
}

export function parseCountDisplay(rawValue: string): ParsedCountDisplay {
  const trimmed = rawValue.trim();
  const match = trimmed.match(/^([^\d]*?)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) {
    return { target: null, prefix: '', suffix: '' };
  }
  const target = Number(match[2]);
  if (!Number.isFinite(target)) {
    return { target: null, prefix: '', suffix: '' };
  }
  return {
    target,
    prefix: match[1] || '',
    suffix: match[3] || '',
  };
}

export function interpolateDisplayCountValue(
  target: number,
  prefix: string,
  suffix: string,
  progress: number
): string {
  const clamped = Math.max(0, Math.min(1, progress));
  const eased = 1 - Math.pow(1 - clamped, 3);
  const current = clamped >= 1 ? target : Math.round(target * eased);
  return `${prefix}${current}${suffix}`;
}

export const CURSOR_HALO_HALF_PX = 12;
export const CURSOR_DOT_HALF_PX = 5;
export const TOUCH_CURSOR_FADE_DELAY_MS = 480;

export function isSupportedCursorPointer(pointerType: string | undefined): boolean {
  return (
    !pointerType ||
    pointerType === 'mouse' ||
    pointerType === 'pen' ||
    pointerType === 'touch'
  );
}

export function shouldAutoHideCursorAfterEnd(pointerType: string | undefined): boolean {
  return pointerType === 'touch';
}

export function computeCursorTransform(
  x: number,
  y: number,
  halfSizePx: number,
  scale: number
): string {
  return `translate3d(${x - halfSizePx}px, ${y - halfSizePx}px, 0) scale(${scale})`;
}

export function shouldDismissDrawerOnSwipeUp(
  deltaY: number,
  deltaX: number,
  isAtBottom: boolean
): boolean {
  return isAtBottom && deltaY <= -56 && Math.abs(deltaY) > Math.abs(deltaX) * 1.2;
}


