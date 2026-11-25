import React, { useEffect, useRef, useState } from 'react';
import { interpolateDisplayCountValue, parseCountDisplay } from '../lib/motion';

interface LiveCounterProps {
  value: string;
  durationMs?: number;
  repeatDelayMs?: number;
  replayTrigger?: number;
  className?: string;
}

export function LiveCounter({
  value,
  durationMs = 1500,
  repeatDelayMs = 0,
  replayTrigger = 0,
  className = '',
}: LiveCounterProps) {
  const parsed = parseCountDisplay(value);
  const target = parsed.target;
  const prefix = parsed.prefix;
  const suffix = parsed.suffix;
  const spanRef = useRef<HTMLSpanElement>(null);
  const [hasCounted, setHasCounted] = useState(() => target === null);
  const [displayText, setDisplayText] = useState<string>(() => {
    if (target === null) return value;
    if (
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      return `${prefix}${target}${suffix}`;
    }
    return `${prefix}0${suffix}`;
  });

  useEffect(() => {
    if (target === null) {
      setDisplayText(value);
      setHasCounted(true);
      return;
    }

    const node = spanRef.current;
    if (!node) return;

    if (
      typeof window === 'undefined' ||
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      setDisplayText(`${prefix}${target}${suffix}`);
      setHasCounted(true);
      return;
    }

    let rafId = 0;
    let repeatTimeoutId = 0;
    let started = false;
    let observer: IntersectionObserver | undefined;
    let scrollListening = false;

    const cleanupTriggers = () => {
      observer?.disconnect();
      if (scrollListening) {
        window.removeEventListener('scroll', onScrollCheck);
        window.removeEventListener('resize', onScrollCheck);
        scrollListening = false;
      }
    };

    const runCountAnimation = () => {
      setHasCounted(false);
      setDisplayText(`${prefix}0${suffix}`);

      const startTime = performance.now();
      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / durationMs);
        setDisplayText(interpolateDisplayCountValue(target, prefix, suffix, progress));
        if (progress < 1) {
          rafId = window.requestAnimationFrame(step);
        } else {
          setDisplayText(`${prefix}${target}${suffix}`);
          setHasCounted(true);
          if (repeatDelayMs > 0) {
            repeatTimeoutId = window.setTimeout(runCountAnimation, repeatDelayMs);
          }
        }
      };

      rafId = window.requestAnimationFrame(step);
    };

    const startCountAnimation = () => {
      if (started) return;
      started = true;
      cleanupTriggers();
      runCountAnimation();
    };

    const isInViewport = () => {
      const rect = node.getBoundingClientRect();
      return rect.top <= window.innerHeight * 0.94 && rect.bottom >= 0;
    };

    const onScrollCheck = () => {
      if (isInViewport()) {
        startCountAnimation();
      }
    };

    const cleanupAnimation = () => {
      cleanupTriggers();
      if (rafId) window.cancelAnimationFrame(rafId);
      if (repeatTimeoutId) window.clearTimeout(repeatTimeoutId);
    };

    if (replayTrigger > 0 || isInViewport()) {
      startCountAnimation();
      return cleanupAnimation;
    }

    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting || entry.boundingClientRect.top <= window.innerHeight * 0.95) {
              startCountAnimation();
              break;
            }
          }
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -10px 0px',
        }
      );
      observer.observe(node);
    }

    window.addEventListener('scroll', onScrollCheck, { passive: true });
    window.addEventListener('resize', onScrollCheck, { passive: true });
    scrollListening = true;

    return cleanupAnimation;
  }, [target, prefix, suffix, value, durationMs, repeatDelayMs, replayTrigger]);

  return (
    <span
      ref={spanRef}
      data-live-counter="true"
      data-target={value}
      data-counted={hasCounted ? 'true' : 'false'}
      className={className}
    >
      {displayText}
    </span>
  );
}
