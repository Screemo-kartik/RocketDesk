'use client';

import { useRef, useEffect } from 'react';

/**
 * Particle interface
 */
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
  fadeSpeed: number;
}

/**
 * CosmicParticles Component Props
 */
export interface CosmicParticlesProps {
  /** Number of particles */
  particleCount?: number;
  
  /** Movement speed multiplier */
  speed?: number;
  
  /** Array of particle colors (hex format) */
  colors?: string[];
  
  /** Blur/glow factor for particles */
  blurFactor?: number;
  
  /** Canvas height (default: 100vh) */
  height?: string;
  
  /** Additional CSS class */
  className?: string;
  
  /** Additional inline styles */
  style?: React.CSSProperties;
}

/**
 * Convert hex color to RGB values
 */
function hexToRgb(hex: string): string {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r},${g},${b}`;
}

/**
 * CosmicParticles - Animated particle background effect
 * 
 * Features:
 * - Canvas-based particle system
 * - Smooth movement with edge wrapping
 * - Twinkling opacity animation
 * - Radial gradient glow effect
 * - Customizable colors and density
 * - Fully responsive
 */
export default function CosmicParticles({
  particleCount = 600,
  speed = 0.1,
  colors = ['#ffffff', '#a78bfa', '#facc15'],
  blurFactor = 2,
  height = '100vh',
  className = '',
  style,
}: CosmicParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize handler
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    particles.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      size: Math.random() * 1.5 + 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.8 + 0.2,
      fadeSpeed: Math.random() * 0.02 + 0.005,
    }));

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach((p) => {
        // Move particle
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Twinkling opacity animation
        p.opacity += p.fadeSpeed;
        if (p.opacity >= 1 || p.opacity <= 0) {
          p.fadeSpeed *= -1;
        }

        // Draw particle with radial gradient glow
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.size * blurFactor
        );
        gradient.addColorStop(
          0,
          `rgba(${hexToRgb(p.color)},${p.opacity})`
        );
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.size * blurFactor, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [particleCount, speed, colors, blurFactor]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'relative',
        top: 0,
        left: 0,
        width: '100%',
        height,
        pointerEvents: 'none',
        ...style,
      }}
    />
  );
}