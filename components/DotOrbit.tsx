'use client';

import { useEffect, useRef } from 'react';

/**
 * Particle/Dot representation
 */
interface Dot {
  i: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseR: number;
  baseA: number;
  phase: number;
}

/**
 * Mouse tracking state
 */
interface MouseState {
  targetX: number;
  targetY: number;
  x: number;
  y: number;
  inside: boolean;
  hasInit: boolean;
}

/**
 * DotOrbit Component Props
 */
export interface DotOrbitProps {
  /** Animation mode: 'orbit' for circular motion, 'drift' for linear floating */
  mode?: 'orbit' | 'drift';
  
  /** Cursor interaction type */
  interaction?: 'off' | 'repel' | 'attract';
  
  /** Mouse tracking mode: 'off', 'global' (whole window), or 'local' (component only) */
  tracking?: 'off' | 'global' | 'local';
  
  /** Density of dots (0.3 - 3) */
  density?: number;
  
  /** Animation speed multiplier (0 - 3) */
  speed?: number;
  
  /** Size of each dot in pixels (0.5 - 6) */
  dotSize?: number;
  
  /** Maximum distance for dots to connect with lines (0 - 260) */
  linkDistance?: number;
  
  /** Background color */
  background?: string;
  
  /** Dot color */
  dotColor?: string;
  
  /** Connection line color */
  lineColor?: string;
  
  /** Overall opacity (0 - 1) */
  opacity?: number;
  
  /** Alpha multiplier for visibility (0.2 - 3) */
  alpha?: number;
  
  /** Cursor easing smoothness (0 - 100) */
  cursorEase?: number;
  
  /** Radius of cursor interaction area (30 - 420) */
  interactionRadius?: number;
  
  /** Strength of cursor interaction (0 - 60) */
  interactionStrength?: number;
  
  /** Additional CSS class name */
  className?: string;
  
  /** Additional inline styles */
  style?: React.CSSProperties;
}

/**
 * DotOrbit - Interactive particle network background
 * 
 * Features:
 * - Orbit or drift animation modes
 * - Cursor repel/attract interactions
 * - Dynamic particle connections
 * - Fully customizable appearance
 */
export default function DotOrbit({
  mode = 'drift',
  interaction = 'repel',
  tracking = 'global',
  density = 1,
  speed = 1,
  dotSize = 2,
  linkDistance = 140,
  background = '#000000',
  dotColor = '#ffffff',
  lineColor = '#8a8a8a',
  opacity = 1,
  alpha = 1.4,
  cursorEase = 40,
  interactionRadius = 140,
  interactionStrength = 18,
  className = '',
  style,
}: DotOrbitProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const mouseRef = useRef<MouseState>({
    targetX: 0,
    targetY: 0,
    x: 0,
    y: 0,
    inside: false,
    hasInit: false,
  });

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check for reduced motion preference
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const motionScale = prefersReducedMotion ? 0.45 : 1;

    let w = 1;
    let h = 1;

    // Utility functions
    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
    
    const easeToLerp = (ease: number) => clamp(clamp(ease, 0, 100) / 100 * 0.3, 0, 0.3);

    const toRgba = (input: string, alphaVal: number): string => {
      const s = (input || '').trim();
      
      // Handle rgba/rgb format
      if (s.startsWith('rgba(') || s.startsWith('rgb(')) {
        const nums = s
          .replace(/rgba?\(/, '')
          .replace(')', '')
          .split(',')
          .map(v => parseFloat(v.trim()));
        const r = nums[0] ?? 0;
        const g = nums[1] ?? 0;
        const b = nums[2] ?? 0;
        return `rgba(${r}, ${g}, ${b}, ${alphaVal})`;
      }

      // Handle hex format
      const hx = s.replace('#', '').trim();
      const full = hx.length === 3 
        ? hx.split('').map(c => c + c).join('') 
        : hx.slice(0, 6);
      const n = parseInt(full || '000000', 16);
      const r = (n >> 16) & 255;
      const g = (n >> 8) & 255;
      const b = n & 255;
      return `rgba(${r}, ${g}, ${b}, ${alphaVal})`;
    };

    // Handle canvas resize
    const resize = () => {
      const r = wrap.getBoundingClientRect();
      w = Math.max(1, Math.floor(r.width));
      h = Math.max(1, Math.floor(r.height));
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const m = mouseRef.current;
      if (!m.hasInit) {
        m.targetX = w * 0.5;
        m.targetY = h * 0.5;
        m.x = m.targetX;
        m.y = m.targetY;
        m.hasInit = true;
      }
    };

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();

    // Generate dots
    const rebuildDots = (): Dot[] => {
      const count = clamp(Math.floor((w * h) / 12000 * density), 20, 320);
      const cx = w * 0.5;
      const cy = h * 0.5;
      return Array.from({ length: count }).map((_, i) => {
        const r = Math.min(w, h) * (0.15 + Math.random() * 0.35);
        const a = Math.random() * Math.PI * 2;
        return {
          i,
          x: cx + Math.cos(a) * r,
          y: cy + Math.sin(a) * r,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          baseR: r,
          baseA: a,
          phase: Math.random() * Math.PI * 2,
        };
      });
    };

    let dots = rebuildDots();
    let lastArea = w * h;

    // Global mouse tracking
    const onWindowPointerMove = (e: PointerEvent) => {
      if (tracking !== 'global') return;
      const r = wrap.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const inside = x >= 0 && x <= r.width && y >= 0 && y <= r.height;
      const m = mouseRef.current;
      m.targetX = x;
      m.targetY = y;
      m.inside = inside;
    };

    if (tracking === 'global') {
      window.addEventListener('pointermove', onWindowPointerMove, { passive: true });
    }

    // Animation loop
    const step = (tMs: number) => {
      const t = (tMs / 1000) * motionScale;
      const area = w * h;

      // Rebuild dots if canvas size changed significantly
      if (Math.abs(area - lastArea) / Math.max(1, lastArea) > 0.3) {
        dots = rebuildDots();
        lastArea = area;
      }

      // Cursor easing
      const m = mouseRef.current;
      const lerp = easeToLerp(cursorEase);
      if (lerp > 0) {
        m.x += (m.targetX - m.x) * lerp;
        m.y += (m.targetY - m.y) * lerp;
      } else {
        m.x = m.targetX;
        m.y = m.targetY;
      }

      // Clear and draw background
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, w, h);

      const cx = w * 0.5;
      const cy = h * 0.5;
      const interactionEnabled = interaction !== 'off' && tracking !== 'off';
      const ir = Math.max(10, interactionRadius);
      const ir2 = ir * ir;
      const strength = interactionStrength * motionScale;
      const alphaBoost = clamp(alpha, 0.2, 3);

      // Update dot positions
      for (const d of dots) {
        if (mode === 'orbit') {
          // Orbit mode: circular motion around center
          const a = d.baseA + t * speed * 0.7 + Math.sin(t * 0.6 + d.phase) * 0.15;
          const rr = d.baseR * (0.92 + 0.08 * Math.sin(t * 1.2 + d.phase));
          d.x = cx + Math.cos(a) * rr;
          d.y = cy + Math.sin(a) * rr;
        } else {
          // Drift mode: linear motion with wrapping
          d.x += d.vx * speed * motionScale;
          d.y += d.vy * speed * motionScale;
          if (d.x < -20) d.x = w + 20;
          if (d.x > w + 20) d.x = -20;
          if (d.y < -20) d.y = h + 20;
          if (d.y > h + 20) d.y = -20;
        }

        // Cursor interaction
        if (interactionEnabled && m.inside) {
          const dx = d.x - m.x;
          const dy = d.y - m.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < ir2) {
            const dist = Math.sqrt(dist2) || 1;
            const falloff = 1 - dist / ir;
            const dirx = dx / dist;
            const diry = dy / dist;
            const sign = interaction === 'repel' ? 1 : -1;
            const push = sign * falloff * falloff * strength;
            d.x += dirx * push;
            d.y += diry * push;
          }
        }
      }

      // Draw links between nearby dots
      const maxD = Math.max(20, linkDistance);
      const maxD2 = maxD * maxD;
      ctx.lineWidth = 1;
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i];
          const b = dots[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < maxD2) {
            const d = Math.sqrt(d2);
            const alphaVal = (1 - d / maxD) * 0.55 * opacity * alphaBoost;
            ctx.strokeStyle = toRgba(lineColor, clamp(alphaVal, 0, 1));
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Draw dots
      for (const d of dots) {
        const pulse = 0.8 + 0.2 * Math.sin(t * 2 + d.phase);
        const r = Math.max(0.6, dotSize * pulse);
        const alphaVal = 0.95 * opacity * alphaBoost;
        ctx.fillStyle = toRgba(dotColor, clamp(alphaVal, 0, 1));
        ctx.beginPath();
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      if (tracking === 'global') {
        window.removeEventListener('pointermove', onWindowPointerMove);
      }
    };
  }, [
    mode,
    interaction,
    tracking,
    density,
    speed,
    dotSize,
    linkDistance,
    background,
    dotColor,
    lineColor,
    opacity,
    alpha,
    interactionRadius,
    interactionStrength,
    cursorEase,
  ]);

  // Local mouse tracking
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (tracking !== 'local') return;
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const m = mouseRef.current;
    m.targetX = e.clientX - r.left;
    m.targetY = e.clientY - r.top;
    m.inside = true;
  };

  const onPointerLeave = () => {
    if (tracking !== 'local') return;
    mouseRef.current.inside = false;
  };

  return (
    <div
      ref={wrapRef}
      onPointerMove={tracking === 'local' ? onPointerMove : undefined}
      onPointerLeave={tracking === 'local' ? onPointerLeave : undefined}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        pointerEvents: tracking === 'global' ? 'none' : 'auto',
        touchAction: tracking === 'local' ? 'none' : 'auto',
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
    </div>
  );
}