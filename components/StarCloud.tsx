'use client';

import {
  useRef,
  useEffect,
  useState,
  useMemo,
  startTransition,
} from 'react';

/* =======================
   Types
======================= */

type Variant = 'desktop' | 'phone';

interface Star {
  id: number;
  x: number;
  y: number;
  z: number;
}

interface StarCloudProps {
  starCount?: number;
  starSize?: number;
  starColor?: string;
  cloudSize?: number;
  baseSpeed?: number;
  variant?: Variant;
  className?: string;
}

/**
 * StarCloud Component
 *
 * A 3D star field that responds to cursor movement.
 */
export default function StarCloud({
  starCount = 200,
  starSize = 2,
  starColor = '#FFFFFF',
  cloudSize = 1000,
  baseSpeed = 1,
  variant = 'desktop',
  className = '',
}: StarCloudProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);

  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const centerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const [stars, setStars] = useState<Star[]>([]);

  /* =======================
     Initial stars
  ======================= */

  const initialStars = useMemo<Star[]>(() => {
    return Array.from({ length: starCount }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * cloudSize,
      y: (Math.random() - 0.5) * cloudSize,
      z: Math.random() * cloudSize,
    }));
  }, [starCount, cloudSize]);

  useEffect(() => {
    setStars(initialStars);
  }, [initialStars]);

  /* =======================
     Center calculation
  ======================= */

  useEffect(() => {
    const updateCenter = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      centerRef.current = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
    };

    updateCenter();
    window.addEventListener('resize', updateCenter);
    return () => window.removeEventListener('resize', updateCenter);
  }, []);

  /* =======================
     Mouse tracking
  ======================= */

  useEffect(() => {
    if (variant === 'phone') return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [variant]);

  /* =======================
     Animation loop
  ======================= */

  useEffect(() => {
    const animate = () => {
      let moveX = 0;
      let moveY = 0;
      let moveZ = 0;

      if (variant === 'phone') {
        moveZ = baseSpeed * 10;
      } else {
        const mouse = mouseRef.current;
        const center = centerRef.current;

        const dx = mouse.x - center.x;
        const dy = mouse.y - center.y;
        const distance = Math.sqrt(dx * dx + dy * dy) || 1;

        const centerZone = 50;
        const transitionZone = 150;

        if (distance < centerZone) {
          moveZ = baseSpeed * 10;
        } else if (distance < centerZone + transitionZone) {
          const blend = (distance - centerZone) / transitionZone;
          const eased = blend * blend * (3 - 2 * blend); // smoothstep

          moveZ = baseSpeed * 10 * (1 - eased);

          const dirX = -dx / distance;
          const dirY = -dy / distance;
          const directionalSpeed = baseSpeed * (1200 / distance) * eased;

          moveX = dirX * directionalSpeed;
          moveY = dirY * directionalSpeed;
        } else {
          const dirX = -dx / distance;
          const dirY = -dy / distance;
          const speed = baseSpeed * (1200 / distance);

          moveX = dirX * speed;
          moveY = dirY * speed;
        }
      }

      startTransition(() => {
        setStars((prev) =>
          prev.map((star) => {
            let x = star.x + moveX;
            let y = star.y + moveY;
            let z = star.z + moveZ;

            if (x > cloudSize / 2) x = -cloudSize / 2;
            if (x < -cloudSize / 2) x = cloudSize / 2;
            if (y > cloudSize / 2) y = -cloudSize / 2;
            if (y < -cloudSize / 2) y = cloudSize / 2;
            if (z > cloudSize) z = 0;
            if (z < 0) z = cloudSize;

            return { ...star, x, y, z };
          })
        );
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [baseSpeed, cloudSize, variant]);

  /* =======================
     Render
  ======================= */

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#000000',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {stars.map((star) => {
        const scale = 300 / (300 + star.z);
        const x = star.x * scale;
        const y = star.y * scale;
        const size = starSize * scale;
        const opacity = Math.max(0.1, 1 - star.z / cloudSize);

        return (
          <div
            key={star.id}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: size,
              height: size,
              backgroundColor: starColor,
              borderRadius: '50%',
              transform: `translate(${x - size / 2}px, ${y - size / 2}px)`,
              opacity,
              pointerEvents: 'none',
            }}
          />
        );
      })}
    </div>
  );
}
