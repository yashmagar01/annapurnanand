'use client';

/**
 * RiverbeltPath - Organic Godavari River SVG for Timeline
 * 
 * A meandering river path that replaces the straight line in the
 * Soil to Soul journey, reinforcing the Godavari Riverbelt brand identity.
 */
export default function RiverbeltPath({ className = '' }: { className?: string }) {
  return (
    <svg 
      className={`absolute left-8 sm:left-1/2 top-0 bottom-0 w-12 -translate-x-1/2 pointer-events-none ${className}`}
      viewBox="0 0 48 800"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        {/* Gradient from Riverbelt Blue → Herbal Green → Gold */}
        <linearGradient id="riverGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--riverbelt-blue)" />
          <stop offset="50%" stopColor="var(--herbal-green)" />
          <stop offset="100%" stopColor="var(--premium-gold)" />
        </linearGradient>
        
        {/* Animated water shimmer gradient */}
        <linearGradient id="flowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0)">
            <animate 
              attributeName="offset" 
              values="-0.2;1.2" 
              dur="3s" 
              repeatCount="indefinite" 
            />
          </stop>
          <stop offset="15%" stopColor="rgba(255,255,255,0.4)">
            <animate 
              attributeName="offset" 
              values="-0.05;1.35" 
              dur="3s" 
              repeatCount="indefinite" 
            />
          </stop>
          <stop offset="30%" stopColor="rgba(255,255,255,0)">
            <animate 
              attributeName="offset" 
              values="0.1;1.5" 
              dur="3s" 
              repeatCount="indefinite" 
            />
          </stop>
        </linearGradient>
      </defs>
      
      {/* Main River Path - Organic Meandering Bezier Curves */}
      <path
        d="M24 0 
           Q32 50, 20 100 
           Q8 150, 28 200 
           Q40 250, 22 300 
           Q4 350, 26 400 
           Q42 450, 24 500 
           Q6 550, 28 600 
           Q44 650, 22 700 
           Q8 750, 24 800"
        stroke="url(#riverGradient)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        className="river-path"
      />
      
      {/* Flow Animation Overlay */}
      <path
        d="M24 0 
           Q32 50, 20 100 
           Q8 150, 28 200 
           Q40 250, 22 300 
           Q4 350, 26 400 
           Q42 450, 24 500 
           Q6 550, 28 600 
           Q44 650, 22 700 
           Q8 750, 24 800"
        stroke="url(#flowGradient)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        className="river-flow"
      />
    </svg>
  );
}
