import { useEffect, useState } from 'react';
import {
  CURSOR_DOT_HALF_PX,
  CURSOR_HALO_HALF_PX,
  TOUCH_CURSOR_FADE_DELAY_MS,
  computeCursorTransform,
  isSupportedCursorPointer,
  shouldAutoHideCursorAfterEnd,
} from '../lib/motion';

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, select, textarea, summary, label[for]';

export function CursorDot() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const ringEl = document.getElementById('ema-cursor-halo');
    const dotEl = document.getElementById('ema-cursor-dot');
    if (!ringEl || !dotEl) return;

    let targetX = -100;
    let targetY = -100;
    let haloX = -100;
    let haloY = -100;
    let dotX = -100;
    let dotY = -100;
    let visible = false;
    let hoveringInteractive = false;
    let pressed = false;
    let rafId: number | null = null;
    let touchHideTimer: number | null = null;

    const clearTouchHideTimer = () => {
      if (touchHideTimer !== null) {
        window.clearTimeout(touchHideTimer);
        touchHideTimer = null;
      }
    };

    const syncVisibility = () => {
      const opacity = visible ? '1' : '0';
      ringEl.style.opacity = opacity;
      dotEl.style.opacity = opacity;
    };

    const tick = () => {
      haloX += (targetX - haloX) * 0.2;
      haloY += (targetY - haloY) * 0.2;
      dotX += (targetX - dotX) * 0.5;
      dotY += (targetY - dotY) * 0.5;

      const haloScale = pressed ? 0.85 : hoveringInteractive ? 1.28 : 1;
      const dotScale = pressed ? 0.82 : hoveringInteractive ? 1.25 : 1;

      ringEl.style.transform = computeCursorTransform(haloX, haloY, CURSOR_HALO_HALF_PX, haloScale);
      dotEl.style.transform = computeCursorTransform(dotX, dotY, CURSOR_DOT_HALF_PX, dotScale);

      if (
        Math.abs(targetX - haloX) > 0.15 ||
        Math.abs(targetY - haloY) > 0.15 ||
        Math.abs(targetX - dotX) > 0.15 ||
        Math.abs(targetY - dotY) > 0.15
      ) {
        rafId = window.requestAnimationFrame(tick);
      } else {
        rafId = null;
      }
    };

    const scheduleTick = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    const syncPosition = (
      clientX: number,
      clientY: number,
      target: EventTarget | null,
      pointerType: string,
      snapIfHidden: boolean
    ) => {
      if (!isSupportedCursorPointer(pointerType)) {
        return false;
      }
      clearTouchHideTimer();
      if (!visible || (snapIfHidden && pointerType === 'touch')) {
        haloX = clientX;
        haloY = clientY;
        dotX = clientX;
        dotY = clientY;
        visible = true;
        syncVisibility();
      }
      targetX = clientX;
      targetY = clientY;

      const el = target as Element | null;
      hoveringInteractive = Boolean(el?.closest?.(INTERACTIVE_SELECTOR));
      return true;
    };

    const scheduleTouchAutoHide = () => {
      clearTouchHideTimer();
      touchHideTimer = window.setTimeout(() => {
        visible = false;
        syncVisibility();
      }, TOUCH_CURSOR_FADE_DELAY_MS);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!syncPosition(e.clientX, e.clientY, e.target, e.pointerType, false)) return;
      scheduleTick();
    };

    const onPointerDown = (e: PointerEvent) => {
      if (!syncPosition(e.clientX, e.clientY, e.target, e.pointerType, true)) return;
      pressed = true;
      scheduleTick();
    };

    const onPointerEnd = (e: PointerEvent) => {
      pressed = false;
      scheduleTick();
      if (shouldAutoHideCursorAfterEnd(e.pointerType)) {
        scheduleTouchAutoHide();
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      if (!syncPosition(touch.clientX, touch.clientY, e.target, 'touch', true)) return;
      pressed = true;
      scheduleTick();
    };

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      if (!syncPosition(touch.clientX, touch.clientY, e.target, 'touch', false)) return;
      scheduleTick();
    };

    const onTouchEnd = () => {
      pressed = false;
      scheduleTick();
      scheduleTouchAutoHide();
    };

    const onHide = () => {
      clearTouchHideTimer();
      visible = false;
      syncVisibility();
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerEnd, { passive: true });
    window.addEventListener('pointercancel', onPointerEnd, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('touchcancel', onTouchEnd, { passive: true });
    document.addEventListener('mouseleave', onHide);
    window.addEventListener('blur', onHide);

    return () => {
      clearTouchHideTimer();
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerEnd);
      window.removeEventListener('pointercancel', onPointerEnd);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchEnd);
      document.removeEventListener('mouseleave', onHide);
      window.removeEventListener('blur', onHide);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      <div
        id="ema-cursor-halo"
        className="fixed top-0 left-0 w-6 h-6 rounded-full border-[1.25px] border-[#ED1B24]/90 bg-[#ED1B24]/8 shadow-[0_0_0_1px_rgba(255,255,255,0.55),0_0_7px_rgba(237,27,36,0.2)] transition-opacity duration-200 will-change-transform"
        style={{ opacity: 0, transform: 'translate3d(-100px, -100px, 0)' }}
      />
      <div
        id="ema-cursor-dot"
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-[#ED1B24] ring-[1.5px] ring-white/95 shadow-[0_0_4px_rgba(237,27,36,0.45)] transition-opacity duration-150 will-change-transform"
        style={{ opacity: 0, transform: 'translate3d(-100px, -100px, 0)' }}
      />
    </div>
  );
}
