'use client';
import { motion } from "framer-motion";


import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Card/Image interface
 */
export interface CarouselCard {
  src: string;
  srcSet?: string;
  alt?: string;
  positionX?: number;
  positionY?: number;
}

/**
 * Aspect ratio options
 */
export type AspectRatio = '9:16' | '2:3' | '3:4' | '1:1' | '4:3' | '3:2' | '16:9';

/**
 * DepthDeck Carousel Props
 */
export interface DepthDeckCarouselProps {
  /** Array of carousel cards/images */
  cards?: CarouselCard[];
  
  /** Card aspect ratio */
  aspectRatio?: AspectRatio;
  
  /** Enable auto-play */
  autoPlay?: boolean;
  
  /** Auto-play interval in seconds */
  autoPlayIntervalSeconds?: number;
  
  /** Show navigation arrows */
  showNavigation?: boolean;
  
  /** Show pagination dots */
  showPagination?: boolean;

  onCardClick?: (index: number) => void;

  
  /** Primary accent color */
  primaryColor?: string;
  
  /** Card border width */
  borderWidth?: number;
  
  /** Card border color */
  borderColor?: string;
  
  /** Card border radius */
  borderRadius?: number;
  
  /** Shadow strength multiplier */
  shadowStrength?: number;
  
  /** Navigation button background */
  navButtonBackground?: string;
  
  /** Navigation button background on hover */
  navButtonBackgroundHover?: string;
  
  /** Navigation button border color */
  navButtonBorderColor?: string;
  
  /** Navigation button icon color */
  navButtonIconColor?: string;
  
  /** Navigation button icon color on hover */
  navButtonIconColorHover?: string;
  
  /** Additional CSS class */
  className?: string;
  
  /** Additional inline styles */
  style?: React.CSSProperties;
}

/**
 * Responsive configuration
 */
interface ResponsiveConfig {
  cardWidth: number;
  cardSpacing: number;
  verticalOffset: number;
  scaleStep: number;
  rotationOffset: number;
  perspective: number;
  brightnessStep: number;
  minHeight: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

/**
 * Card position data
 */
interface PositionData {
  x: number;
  y: number;
  scale: number;
  rotateY: number;
  opacity: number;
  brightness: number;
  zIndex: number;
  isCenter: boolean;
  relativePosition: number;
}

/**
 * Spring animation configuration
 */
const SPRING_CONFIG = {
  stiffness: 260,
  damping: 20,
  mass: 0.8,
};

/**
 * Default images
 */
const DEFAULT_IMAGES: CarouselCard[] = [
  {
    src: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=500&auto=format',
    alt: 'Card 1',
    positionX: 50,
    positionY: 50,
  },
  {
    src: 'https://images.unsplash.com/photo-1682687221038-404cb8830901?w=500&auto=format',
    alt: 'Card 2',
    positionX: 50,
    positionY: 50,
  },
  {
    src: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=500&auto=format',
    alt: 'Card 3',
    positionX: 50,
    positionY: 50,
  },
  {
    src: 'https://images.unsplash.com/photo-1682687220199-d0124f48f95b?w=500&auto=format',
    alt: 'Card 4',
    positionX: 50,
    positionY: 50,
  },
  {
    src: 'https://images.unsplash.com/photo-1682687220199-d0124f48f95b?w=500&auto=format',
    alt: 'Card 5',
    positionX: 50,
    positionY: 50,
  },
  {
    src: 'https://images.unsplash.com/photo-1682687221038-404cb8830901?w=500&auto=format',
    alt: 'Card 6',
    positionX: 50,
    positionY: 50,
  },
  {
    src: 'https://images.unsplash.com/photo-1682687221038-404cb8830901?w=500&auto=format',
    alt: 'Card 7',
    positionX: 50,
    positionY: 50,
  },
];

/**
 * Aspect ratio values
 */
const ASPECT_RATIOS: Record<AspectRatio, number> = {
  '9:16': 0.5625,
  '2:3': 0.6667,
  '3:4': 0.75,
  '1:1': 1,
  '4:3': 1.3333,
  '3:2': 1.5,
  '16:9': 1.7778,
};

/**
 * Hook to track container size
 */
function useContainerSize(
  ref: React.RefObject<HTMLDivElement | null>
) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  return size;
}


/**
 * Get responsive configuration based on container width
 */
const getResponsiveConfig = (containerWidth: number): ResponsiveConfig => {
  const isMobile = containerWidth < 480;
  const isTablet = containerWidth >= 480 && containerWidth < 900;
  const isDesktop = containerWidth >= 900;

  const cardWidth = isMobile
    ? Math.min(containerWidth * 0.85, 260)
  : isTablet
  ? Math.min(containerWidth * 0.5, 380)
  : Math.min(containerWidth * 0.32, 520);
  
  const cardSpacing = isMobile ? 40 : isTablet ? 120 : 200;
  const verticalOffset = isMobile ? 10 : isTablet ? 18 : 25;
  const scaleStep = isMobile ? 0.15 : isTablet ? 0.12 : 0.1;
  const rotationOffset = isMobile ? -8 : isTablet ? -12 : -15;
  const perspective = isMobile ? 800 : isTablet ? 1200 : 1500;
  const brightnessStep = isMobile ? 0.15 : 0.1;
  const minHeight = isMobile ? 400 : isTablet ? 500 : 650;

  return {
    cardWidth,
    cardSpacing,
    verticalOffset,
    scaleStep,
    rotationOffset,
    perspective,
    brightnessStep,
    minHeight,
    isMobile,
    isTablet,
    isDesktop,
  };
};

/**
 * Calculate position data for a card
 */
const getPositionData = (
  index: number,
  activeIndex: number,
  totalCards: number,
  config: ResponsiveConfig
): PositionData => {
  const relativePos =
    ((index - activeIndex + totalCards) % totalCards) - Math.floor(totalCards / 2);

  const adjustedPos =
    relativePos > totalCards / 2
      ? relativePos - totalCards
      : relativePos < -totalCards / 2
      ? relativePos + totalCards
      : relativePos;

  const absPos = Math.abs(adjustedPos);
  const baseZIndex = config.isMobile || config.isTablet ? 500 : 200;

  return {
    x: adjustedPos * config.cardSpacing,
    y: absPos * config.verticalOffset,
    scale: 1 - absPos * config.scaleStep,
    rotateY: adjustedPos * config.rotationOffset,
    opacity: 1,
    brightness: 1 - absPos * config.brightnessStep,
    zIndex: baseZIndex - absPos * 10,
    isCenter: adjustedPos === 0,
    relativePosition: adjustedPos,
  };
};

/**
 * DepthDeck Carousel - 3D stacked card carousel
 * 
 * Features:
 * - 3D depth perspective with stacked cards
 * - Smooth spring animations
 * - Auto-play support
 * - Keyboard navigation
 * - Responsive design
 * - Customizable styling
 */
export default function DepthDeckCarousel({
  cards,
  aspectRatio = '2:3',
  autoPlay = true,
  autoPlayIntervalSeconds = 4,
  showNavigation = true,
  showPagination = true,
  onCardClick, 
  
  primaryColor = '#000000',
  borderWidth = 0,
  borderColor = '#FFFFFF',
  borderRadius = 41.4,
  shadowStrength = 1,
  navButtonBackground = 'rgba(255, 255, 255, 0.12)',
  navButtonBackgroundHover = '#000000',
  navButtonBorderColor = 'rgba(0, 0, 0, 0.12)',
  navButtonIconColor = 'rgba(17, 17, 17, 0.92)',
  navButtonIconColorHover = '#FFFFFF',
  className = '',
  style,
}: DepthDeckCarouselProps) {
  const displayCards = !cards || cards.length === 0 ? DEFAULT_IMAGES : cards;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const containerSize = useContainerSize(containerRef);

  const config = useMemo(
    () => getResponsiveConfig(containerSize.width || 1200),
    [containerSize.width]
  );

  const cardHeight = config.cardWidth / ASPECT_RATIOS[aspectRatio];
  const innerBorderRadius = Math.max(0, borderRadius - borderWidth);

  const shadows = useMemo(() => {
    const s = Math.max(0, shadowStrength);
    return {
      center: `0 ${config.isMobile ? 12 : 18}px ${
        config.isMobile ? 30 : 50
      }px rgba(0,0,0,${0.18 * s}), 0 ${config.isMobile ? 4 : 6}px ${
        config.isMobile ? 12 : 18
      }px rgba(0,0,0,${0.12 * s})`,
      side: `0 ${config.isMobile ? 6 : 10}px ${
        config.isMobile ? 18 : 28
      }px rgba(0,0,0,${0.12 * s}), 0 ${config.isMobile ? 2 : 3}px ${
        config.isMobile ? 6 : 10
      }px rgba(0,0,0,${0.08 * s})`,
    };
  }, [shadowStrength, config.isMobile]);

  const positions = useMemo(
    () =>
      displayCards.map((_, index) =>
        getPositionData(index, activeIndex, displayCards.length, config)
      ),
    [activeIndex, displayCards.length, config]
  );

  // Reset active index if it exceeds card count
  useEffect(() => {
    if (activeIndex >= displayCards.length && displayCards.length > 0) {
      setActiveIndex(displayCards.length - 1);
    }
  }, [displayCards.length, activeIndex]);

  // Auto-play logic
  useEffect(() => {
    if (!isAutoPlaying || displayCards.length === 0) return;

    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % displayCards.length);
    }, autoPlayIntervalSeconds * 1000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
    };
  }, [isAutoPlaying, displayCards.length, autoPlayIntervalSeconds]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrev();
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
      }
      if (e.key >= '1' && e.key <= String(Math.min(9, displayCards.length))) {
        e.preventDefault();
        goToSlide(parseInt(e.key) - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [displayCards.length]);

  const stopAutoPlay = useCallback(() => {
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  const goToNext = useCallback(() => {
    stopAutoPlay();
    setActiveIndex((prev) => (prev + 1) % displayCards.length);
  }, [displayCards.length, stopAutoPlay]);

  const goToPrev = useCallback(() => {
    stopAutoPlay();
    setActiveIndex((prev) => (prev - 1 + displayCards.length) % displayCards.length);
  }, [displayCards.length, stopAutoPlay]);

  const goToSlide = useCallback(
    (index: number) => {
      stopAutoPlay();
      setActiveIndex(index);
    },
    [stopAutoPlay]
  );

  const handleCardClick = useCallback(
  (clickedIndex: number, relativePosition: number) => {

    // 🔥 If center card → redirect
    if (relativePosition === 0) {
      onCardClick?.(clickedIndex);
      return;
    }

    // Otherwise keep carousel behavior
    stopAutoPlay();
    const target =
      (activeIndex + relativePosition + displayCards.length) %
      displayCards.length;

    setActiveIndex(target);
  },
  [activeIndex, displayCards.length, stopAutoPlay, onCardClick]
);

  const handleHoverStart = useCallback(
    (index: number) => {
      if (!config.isMobile) setHoveredIndex(index);
    },
    [config.isMobile]
  );

  const handleHoverEnd = useCallback(() => {
    setHoveredIndex(null);
  }, []);

  const buttonSize = config.isMobile ? 36 : 48;
  const buttonPadding = config.isMobile ? 8 : 12;
  const iconSize = config.isMobile ? 20 : 24;

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        ...style,
        position: 'relative',
        width: '100%',
        minHeight: `${config.minHeight}px`,
        overflow: 'hidden',
        backgroundColor: 'transparent',
        userSelect: 'none',
      }}
    >
      {/* Horizon line */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          height: '1px',
          background: `linear-gradient(to right, transparent, ${primaryColor}33, transparent)`,
          opacity: 0.2,
        }}
      />

      {/* Cards container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          minHeight: `${config.minHeight}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          perspective: `${config.perspective}px`,
          transformStyle: 'preserve-3d',
          overflow: 'visible',
          isolation: 'isolate',
        }}
      >
        {displayCards.map((image, index) => {
          const position = positions[index];
          const objectPosition = `${image?.positionX ?? 50}% ${image?.positionY ?? 50}%`;
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={index}
              role="button"
              tabIndex={0}
              aria-label={`Card ${index + 1} of ${displayCards.length}. ${
                position.isCenter ? 'Active' : 'Click to view'
              }`}
              onClick={() => handleCardClick(index, position.relativePosition)}
              onMouseEnter={() => handleHoverStart(index)}
              onMouseLeave={handleHoverEnd}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(index, position.relativePosition);
                }
              }}
              style={{
                position: 'absolute',
                width: `${config.cardWidth}px`,
                height: `${cardHeight}px`,
                borderRadius: `${borderRadius}px`,
                backgroundColor: '#000',
                cursor: 'pointer',
                backfaceVisibility: 'hidden',
                transformOrigin: 'center center',
                boxShadow: position.isCenter ? shadows.center : shadows.side,
                overflow: 'hidden',
                border:
                  borderWidth > 0 ? `${borderWidth}px solid ${borderColor}` : 'none',
                willChange: 'transform',
                transform: `translate3d(${position.x}px, ${
                  isHovered ? position.y - 30 : position.y
                }px, 0) scale(${isHovered ? position.scale * 1.05 : position.scale}) rotateY(${
                  position.rotateY
                }deg)`,
                opacity: position.opacity,
                filter: `brightness(${position.brightness})`,
                zIndex: position.zIndex,
                transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              {/* Image */}
              <img
                src={image?.src}
                srcSet={image?.srcSet}
                alt={image?.alt ?? `Carousel image ${index + 1}`}
                draggable={false}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition,
                  transition: 'transform 700ms',
                  borderRadius: `${innerBorderRadius}px`,
                  transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                }}
              />

              {/* Gradient overlay for active card */}
              {position.isCenter && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.55), transparent, transparent)',
                    pointerEvents: 'none',
                    opacity: 1,
                    transition: 'opacity 0.3s',
                  }}
                />
              )}

              {/* Border highlight for active card */}
              {position.isCenter && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    border: `2px solid ${primaryColor}33`,
                    borderRadius: `${innerBorderRadius}px`,
                    pointerEvents: 'none',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation controls */}
      {(showNavigation || showPagination) && (
        <div
          style={{
            position: 'relative',
  marginTop: config.isMobile ? '40px' : '60px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',   // ✅ THIS centers it
  gap: config.isMobile ? '16px' : '24px',
  zIndex: 1000,
          }}
        >
          {/* Previous button */}
          {showNavigation && (
            <button
              onClick={goToPrev}
              aria-label="Previous slide"
              style={{
                padding: `${buttonPadding}px`,
                borderRadius: '9999px',
                background: navButtonBackground,
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: `1px solid ${navButtonBorderColor}`,
                color: navButtonIconColor,
                cursor: 'pointer',
                transition: 'all 200ms',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = navButtonBackgroundHover;
                e.currentTarget.style.color = navButtonIconColorHover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = navButtonBackground;
                e.currentTarget.style.color = navButtonIconColor;
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.92)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <ChevronLeft size={iconSize} />
            </button>
          )}

          {/* Pagination dots */}
          {showPagination && (
            <div
              style={{
                display: 'flex',
                gap: config.isMobile ? '6px' : '8px',
              }}
            >
              {displayCards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === activeIndex ? 'true' : 'false'}
                  style={{
                    width:
                      index === activeIndex
                        ? config.isMobile
                          ? '18px'
                          : '24px'
                        : config.isMobile
                        ? '6px'
                        : '8px',
                    height: config.isMobile ? '6px' : '8px',
                    borderRadius: '9999px',
                    border: 'none',
                    background:
                      index === activeIndex ? primaryColor : 'rgba(138, 138, 138, 0.3)',
                    cursor: 'pointer',
                    transition: 'all 300ms',
                    padding: 0,
                  }}
                  onMouseEnter={(e) => {
                    if (index !== activeIndex) {
                      e.currentTarget.style.background = 'rgba(138, 138, 138, 0.6)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (index !== activeIndex) {
                      e.currentTarget.style.background = 'rgba(138, 138, 138, 0.3)';
                    }
                  }}
                />
              ))}
            </div>
          )}

          {/* Next button */}
          {showNavigation && (
            <button
              onClick={goToNext}
              aria-label="Next slide"
              style={{
                padding: `${buttonPadding}px`,
                borderRadius: '9999px',
                background: navButtonBackground,
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: `1px solid ${navButtonBorderColor}`,
                color: navButtonIconColor,
                cursor: 'pointer',
                transition: 'all 200ms',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = navButtonBackgroundHover;
                e.currentTarget.style.color = navButtonIconColorHover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = navButtonBackground;
                e.currentTarget.style.color = navButtonIconColor;
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.92)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <ChevronRight size={iconSize} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}