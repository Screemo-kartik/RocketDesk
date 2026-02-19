'use client';

import * as React from 'react';

/**
 * Preset configurations for smooth scrolling
 */
type ScrollPreset = 'Portfolio' | 'Custom';

/**
 * Configuration object for scroll physics
 */
interface ScrollConfig {
  smoothTime: number;
  maxSpeed: number;
  keyboardLines: number;
  pageJumpRatio: number;
  touch: boolean;
  clamp: boolean;
}

/**
 * SexyScroll Component Props
 */
export interface SexyScrollProps {
  /** Enable or disable smooth scrolling */
  enabled?: boolean;
  
  /** Preset configuration */
  preset?: ScrollPreset;
  
  /** Spring response time in seconds (Custom mode) */
  smoothTime?: number;
  
  /** Maximum scrolling speed in px/s (Custom mode) */
  maxSpeed?: number;
  
  /** Keyboard arrow step in lines (Custom mode) */
  keyboardStepLines?: number;
  
  /** Page jump ratio relative to viewport height (Custom mode) */
  pageJumpRatio?: number;
  
  /** Enable smooth scroll on touch devices */
  touchEnabled?: boolean;
  
  /** Clamp scroll to document bounds (Custom mode) */
  clampToDocument?: boolean;
  
  /** Respect user's reduced motion preference */
  respectReduceMotion?: boolean;
  
  /** Show debug badge */
  showBadge?: boolean;
}

/**
 * Preset configurations
 */
const PRESETS: Record<Exclude<ScrollPreset, 'Custom'>, Omit<ScrollConfig, 'touch'>> = {
  Portfolio: {
    smoothTime: 0.6,
    maxSpeed: 4500,
    keyboardLines: 1,
    pageJumpRatio: 0.9,
    clamp: true,
  },
};

/**
 * Critically damped spring animation (Unity-like SmoothDamp)
 * Provides smooth, natural scrolling motion
 */
function smoothDamp(
  current: number,
  target: number,
  currentVelocity: number,
  smoothTime: number,
  maxSpeed: number,
  deltaTime: number
): [number, number] {
  const EPS = 1e-4;
  smoothTime = Math.max(EPS, smoothTime);
  const maxChange = maxSpeed * smoothTime;
  
  let delta = target - current;
  const originalTarget = target;
  
  // Clamp target to max speed
  if (Math.abs(delta) > maxChange) {
    target = current + Math.sign(delta) * maxChange;
  }
  
  const omega = 2 / smoothTime;
  const x = omega * deltaTime;
  const exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
  const change = current - target;
  const temp = (currentVelocity + omega * change) * deltaTime;
  
  let newVelocity = (currentVelocity - omega * temp) * exp;
  let newValue = target + (change + temp) * exp;
  
  // Prevent overshooting
  const origToCurrent = originalTarget - current;
  const newToOrig = newValue - originalTarget;
  if (origToCurrent > 0 === newToOrig > 0) {
    newValue = originalTarget;
    newVelocity = 0;
  }
  
  return [newValue, newVelocity];
}

/**
 * SexyScroll - Physics-based smooth scrolling
 * 
 * Features:
 * - Critically damped spring animation
 * - Smooth wheel/trackpad scrolling
 * - Keyboard navigation support
 * - Touch device support (optional)
 * - Respects reduced motion preferences
 * - Customizable physics parameters
 */
export default function SexyScroll({
  enabled = true,
  preset = 'Portfolio',
  smoothTime = 0.6,
  maxSpeed = 4500,
  keyboardStepLines = 1,
  pageJumpRatio = 0.9,
  touchEnabled = false,
  clampToDocument = true,
  respectReduceMotion = true,
  showBadge = true,
}: SexyScrollProps) {
  // Check for reduced motion preference
  const prefersReduced = React.useMemo(() => {
    if (typeof window === 'undefined' || typeof matchMedia === 'undefined') return false;
    try {
      return matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch {
      return false;
    }
  }, []);

  // Get configuration based on preset
  const cfg = React.useMemo<ScrollConfig>(() => {
    if (preset !== 'Custom') {
      const p = PRESETS[preset];
      return {
        smoothTime: p.smoothTime,
        maxSpeed: p.maxSpeed,
        keyboardLines: p.keyboardLines,
        pageJumpRatio: p.pageJumpRatio,
        touch: touchEnabled,
        clamp: p.clamp,
      };
    }
    return {
      smoothTime,
      maxSpeed,
      keyboardLines: keyboardStepLines,
      pageJumpRatio,
      touch: touchEnabled,
      clamp: clampToDocument,
    };
  }, [
    preset,
    smoothTime,
    maxSpeed,
    keyboardStepLines,
    pageJumpRatio,
    touchEnabled,
    clampToDocument,
  ]);

  const active = enabled && !(respectReduceMotion && prefersReduced);

  // Physics state
  const yRef = React.useRef(0);
  const vRef = React.useRef(0);
  const targetRef = React.useRef(0);
  const rafRef = React.useRef<number | null>(null);
  const lastTsRef = React.useRef<number | null>(null);

  // Clamp scroll position to document bounds
  const clampDoc = React.useCallback(
    (y: number) => {
      if (!cfg.clamp) return y;
      const max = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );
      return Math.min(Math.max(0, y), max);
    },
    [cfg.clamp]
  );

  // Cancel animation loop
  const cancel = React.useCallback(() => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    lastTsRef.current = null;
  }, []);

  // Main animation loop
  const loop = React.useCallback(
    (ts: number) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = Math.max(0.001, Math.min(0.033, (ts - lastTsRef.current) / 1000));
      lastTsRef.current = ts;

      const current = yRef.current;
      const target = clampDoc(targetRef.current);
      const [ny, nv] = smoothDamp(
        current,
        target,
        vRef.current,
        cfg.smoothTime,
        cfg.maxSpeed,
        dt
      );

      yRef.current = ny;
      vRef.current = nv;
      window.scrollTo(0, ny);

      // Continue loop for smooth motion
      if (Math.abs(ny - target) < 0.2 && Math.abs(nv) < 2) {
        yRef.current = target;
        vRef.current = 0;
        window.scrollTo(0, target);
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      rafRef.current = requestAnimationFrame(loop);
    },
    [cfg.maxSpeed, cfg.smoothTime, clampDoc]
  );

  // Ensure animation loop is running
  const ensureLoop = React.useCallback(() => {
    if (rafRef.current == null) {
      yRef.current = window.scrollY;
      targetRef.current = window.scrollY;
      rafRef.current = requestAnimationFrame(loop);
    }
  }, [loop]);

  // Add delta to target scroll position
  const nudge = React.useCallback(
    (deltaY: number) => {
      targetRef.current = clampDoc(targetRef.current + deltaY);
      ensureLoop();
    },
    [clampDoc, ensureLoop]
  );

  // Wheel / trackpad handler
  React.useEffect(() => {
    if (!active) return;

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();

      const factor =
        e.deltaMode === 1
          ? 16 // Line mode
          : e.deltaMode === 2
          ? window.innerHeight // Page mode
          : 1; // Pixel mode

      const dy = e.deltaY * factor;
      nudge(dy);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', onWheel);
      cancel();
    };
  }, [active, nudge, cancel]);

  // Keyboard navigation handler
  React.useEffect(() => {
    if (!active) return;

    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (
        el &&
        (el.tagName === 'INPUT' ||
          el.tagName === 'TEXTAREA' ||
          el.isContentEditable)
      ) {
        return;
      }

      const line = 48 * cfg.keyboardLines;
      const h = window.innerHeight * cfg.pageJumpRatio;

      switch (e.code) {
        case 'ArrowDown':
          e.preventDefault();
          nudge(line);
          break;
        case 'ArrowUp':
          e.preventDefault();
          nudge(-line);
          break;
        case 'PageDown':
          e.preventDefault();
          nudge(h);
          break;
        case 'PageUp':
          e.preventDefault();
          nudge(-h);
          break;
        case 'Space':
          e.preventDefault();
          nudge(h);
          break;
      }
    };

    window.addEventListener('keydown', onKey, { passive: false });
    return () => window.removeEventListener('keydown', onKey);
  }, [active, cfg.keyboardLines, cfg.pageJumpRatio, nudge]);

  // Touch handler
  React.useEffect(() => {
    if (!active || !cfg.touch) return;

    let lastY = 0;

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const y = e.touches[0].clientY;
      const dy = lastY ? lastY - y : 0;
      lastY = y;

      if (Math.abs(dy) > 0) {
        e.preventDefault();
        nudge(dy);
      }
    };

    const onTouchEnd = () => {
      lastY = 0;
    };

    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [active, cfg.touch, nudge]);

  // Sync with external scroll changes
  React.useEffect(() => {
    const onScroll = () => {
      if (!active) return;
      if (rafRef.current == null) {
        yRef.current = window.scrollY;
        targetRef.current = window.scrollY;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [active]);

  // Debug badge
  return (
    <>
      {showBadge && (
        <div
          style={{
            position: 'fixed',
            top: 12,
            left: 12,
            zIndex: 99999,
            pointerEvents: 'none',
            userSelect: 'none',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: 12,
            padding: '6px 8px',
            borderRadius: 8,
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            background: 'rgba(20,20,20,0.85)',
            color: '#fff',
          }}
        >
          Sexy Scroll: {preset}
          {cfg.touch ? ' · Touch' : ''}
        </div>
      )}
    </>
  );
}