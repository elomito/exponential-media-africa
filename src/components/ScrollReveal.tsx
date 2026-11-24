import React, { useEffect, useRef, useState } from 'react';
import type { RevealVariant } from '../lib/motion';

interface RevealProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delayMs?: number;
  className?: string;
}

const VARIANT_CLASSES: Record<RevealVariant, string> = {
  'slide-left': 'reveal-slide-left',
  'slide-right': 'reveal-slide-right',
  'slide-up': 'reveal-slide-up',
  'slide-down': 'reveal-slide-down',
  pop: 'reveal-pop',
};

export function Reveal({
  children,
  variant = 'slide-up',
  delayMs = 0,
  className = '',
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      typeof window === 'undefined' ||
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ||
      typeof IntersectionObserver === 'undefined'
    ) {
      setRevealed(true);
      return;
    }

    let done = false;
    let rafId: number | null = null;

    const shouldReveal = () => {
      const rect = node.getBoundingClientRect();
      // Trigger once the element enters the lower 92% of the viewport, or if already scrolled above
      return rect.top <= window.innerHeight * 0.92;
    };

    const revealNow = () => {
      if (done) return;
      done = true;
      setRevealed(true);
      observer.disconnect();
      window.removeEventListener('scroll', onScrollCheck);
      window.removeEventListener('resize', onScrollCheck);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.boundingClientRect.top <= window.innerHeight * 0.92) {
            revealNow();
            break;
          }
        }
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -6% 0px',
      }
    );

    observer.observe(node);

    const onScrollCheck = () => {
      if (shouldReveal()) {
        revealNow();
      }
    };

    window.addEventListener('scroll', onScrollCheck, { passive: true });
    window.addEventListener('resize', onScrollCheck, { passive: true });

    // Defer initial in-viewport check by 1 frame so elements visible on mount still animate cleanly in
    if (shouldReveal()) {
      rafId = window.requestAnimationFrame(() => {
        revealNow();
      });
    }

    return () => {
      done = true;
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      observer.disconnect();
      window.removeEventListener('scroll', onScrollCheck);
      window.removeEventListener('resize', onScrollCheck);
    };
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={variant}
      data-revealed={revealed ? 'true' : 'false'}
      style={delayMs > 0 ? { transitionDelay: `${delayMs}ms` } : undefined}
      className={`reveal-base ${VARIANT_CLASSES[variant]} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
