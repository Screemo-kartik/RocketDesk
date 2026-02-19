'use client';

/**
 * ElectricBorder Component Props
 */
export interface ElectricBorderProps {
  /** Card title */
  title?: string;
  
  /** Show/hide title */
  titleVisible?: boolean;
  
  /** Title text color */
  titleColor?: string;
  
  /** Title font size */
  titleFontSize?: number;
  
  /** Card description */
  description?: string;
  
  /** Show/hide description */
  descriptionVisible?: boolean;
  
  /** Description text color */
  descriptionColor?: string;
  
  /** Description font size */
  descriptionFontSize?: number;
  
  /** Label text */
  label?: string;
  
  /** Show/hide label */
  labelVisible?: boolean;
  
  /** Label text color */
  labelColor?: string;
  
  /** Label font size */
  labelFontSize?: number;
  
  /** Border color */
  borderColor?: string;
  
  /** Glow effect color */
  glowColor?: string;
  
  /** Background color */
  backgroundColor?: string;
  
  /** Gradient accent color */
  gradientColor?: string;
  
  /** Shadow color */
  shadowColor?: string;
  
  /** Border radius in pixels */
  borderRadius?: number;
  
  /** Additional CSS class */
  className?: string;
  
  /** Additional inline styles */
  style?: React.CSSProperties;
}

/**
 * ElectricBorder - Animated electric border card
 * 
 * Features:
 * - Animated turbulent displacement effect on border
 * - Multiple glow layers
 * - Gradient overlays
 * - Customizable colors and text
 * - Glassmorphic label badge
 */
export default function ElectricBorder({
  title = 'Electric Border',
  titleVisible = true,
  titleColor = '#ffffff',
  titleFontSize = 48,
  description = 'In case you\'d like to emphasize something very dramatically.',
  descriptionVisible = true,
  descriptionColor = '#ffffff80',
  descriptionFontSize = 16,
  label = 'Dramatic',
  labelVisible = false,
  labelColor = '#ffffff80',
  labelFontSize = 14,
  borderColor = '#dd8448',
  glowColor = '#dd8448',
  backgroundColor = '#252525',
  gradientColor = '#dd8448',
  shadowColor = 'rgba(0,0,0,0.5)',
  borderRadius = 24,
  className = '',
  style,
}: ElectricBorderProps) {
  return (
    <main
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '500px',
        width: '100%',
        minWidth: '350px',
        minHeight: '500px',
        backgroundColor,
        borderRadius: `${borderRadius}px`,
        ...style,
      }}
    >
      {/* SVG Filter Definitions */}
      <svg
        style={{
          position: 'absolute',
          width: 0,
          height: 0,
        }}
      >
        <defs>
          <filter
            id="turbulent-displace"
            colorInterpolationFilters="sRGB"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            {/* First turbulence - vertical animation */}
            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves={10}
              result="noise1"
              seed={1}
            />
            <feOffset in="noise1" dx={0} dy={0} result="offsetNoise1">
              <animate
                attributeName="dy"
                values="700;0"
                dur="6s"
                repeatCount="indefinite"
                calcMode="linear"
              />
            </feOffset>

            {/* Second turbulence - vertical animation (opposite) */}
            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves={10}
              result="noise2"
              seed={1}
            />
            <feOffset in="noise2" dx={0} dy={0} result="offsetNoise2">
              <animate
                attributeName="dy"
                values="0;-700"
                dur="6s"
                repeatCount="indefinite"
                calcMode="linear"
              />
            </feOffset>

            {/* Third turbulence - horizontal animation */}
            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves={10}
              result="noise3"
              seed={2}
            />
            <feOffset in="noise3" dx={0} dy={0} result="offsetNoise3">
              <animate
                attributeName="dx"
                values="490;0"
                dur="6s"
                repeatCount="indefinite"
                calcMode="linear"
              />
            </feOffset>

            {/* Fourth turbulence - horizontal animation (opposite) */}
            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves={10}
              result="noise4"
              seed={2}
            />
            <feOffset in="noise4" dx={0} dy={0} result="offsetNoise4">
              <animate
                attributeName="dx"
                values="0;-490"
                dur="6s"
                repeatCount="indefinite"
                calcMode="linear"
              />
            </feOffset>

            {/* Composite and blend operations */}
            <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
            <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
            <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />
            
            {/* Apply displacement */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="combinedNoise"
              scale={30}
              xChannelSelector="R"
              yChannelSelector="B"
            />
          </filter>
        </defs>
      </svg>

      {/* Card Container */}
      <div
        style={{
          padding: '2px',
          borderRadius: `${borderRadius}px`,
          position: 'relative',
          background: `linear-gradient(-30deg, ${gradientColor}, transparent, ${gradientColor}), linear-gradient(to bottom, ${backgroundColor}, ${backgroundColor})`,
          boxShadow: `0 20px 40px ${shadowColor}`,
          overflow: 'hidden',
          width: '100%',
          height: '100%',
        }}
      >
        {/* Inner Container with Borders */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
          }}
        >
          {/* Border Outer */}
          <div
            style={{
              border: `2px solid ${borderColor}80`,
              borderRadius: `${borderRadius}px`,
              paddingRight: '4px',
              paddingBottom: '4px',
              width: '100%',
              height: '100%',
            }}
          >
            {/* Main Card with Animated Filter */}
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: `${borderRadius}px`,
                border: `2px solid ${borderColor}`,
                marginTop: '-4px',
                marginLeft: '-4px',
                filter: 'url(#turbulent-displace)',
              }}
            />
          </div>

          {/* Glow Layer 1 */}
          <div
            style={{
              border: `2px solid ${borderColor}99`,
              borderRadius: `${borderRadius}px`,
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              filter: 'blur(5px)',
              pointerEvents: 'none',
            }}
          />

          {/* Glow Layer 2 */}
          <div
            style={{
              border: `2px solid ${glowColor}`,
              borderRadius: `${borderRadius}px`,
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              filter: 'blur(4px)',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* Overlay 1 */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            borderRadius: `${borderRadius}px`,
            opacity: 1,
            mixBlendMode: 'overlay',
            transform: 'scale(1.1)',
            filter: 'blur(16px)',
            background:
              'linear-gradient(-30deg, white, transparent 30%, transparent 70%, white)',
            pointerEvents: 'none',
          }}
        />

        {/* Overlay 2 */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            borderRadius: `${borderRadius}px`,
            opacity: 0.5,
            mixBlendMode: 'overlay',
            transform: 'scale(1.1)',
            filter: 'blur(16px)',
            background:
              'linear-gradient(-30deg, white, transparent 30%, transparent 70%, white)',
            pointerEvents: 'none',
          }}
        />

        {/* Background Glow */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            borderRadius: `${borderRadius}px`,
            filter: 'blur(32px)',
            transform: 'scale(1.1)',
            opacity: 0.3,
            zIndex: -1,
            background: `linear-gradient(-30deg, ${glowColor}, transparent, ${borderColor})`,
            pointerEvents: 'none',
          }}
        />

        {/* Content Container */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '0 24px',
          }}
        >
          {/* Label Badge */}
          {labelVisible && (
            <div
              style={{
                background:
                  'radial-gradient(47.2% 50% at 50.39% 88.37%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 100%), rgba(255,255,255,0.04)',
                borderRadius: '14px',
                padding: '8px 16px',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                fontSize: `${labelFontSize}px`,
                lineHeight: 1.2,
                letterSpacing: '0px',
                color: labelColor,
                fontFamily: 'Inter, system-ui, sans-serif',
              }}
            >
              {label}
            </div>
          )}

          {/* Title */}
          {titleVisible && (
            <p
              style={{
                fontSize: `${titleFontSize}px`,
                lineHeight: 1.2,
                letterSpacing: '0px',
                fontWeight: 500,
                color: titleColor,
                fontFamily: 'Inter, system-ui, sans-serif',
                marginTop: labelVisible ? '16px' : '0',
                marginBottom: 0,
              }}
            >
              {title}
            </p>
          )}

          {/* Description */}
          {descriptionVisible && (
            <p
              style={{
                marginTop: '16px',
                marginBottom: 0,
                fontSize: `${descriptionFontSize}px`,
                lineHeight: 1.4,
                letterSpacing: '0px',
                fontWeight: 400,
                color: descriptionColor,
                fontFamily: 'Inter, system-ui, sans-serif',
              }}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}