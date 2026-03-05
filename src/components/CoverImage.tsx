'use client';

import { useState } from 'react';

interface CoverImageProps {
  src: string;
  alt?: string;
  className?: string;
  /** Show the bottom gradient overlay (good for cards with text beneath the image) */
  overlay?: boolean;
}

/**
 * Reusable Spotify-dark cover image component.
 *
 * - Base filter: brightness(0.9) contrast(1.05) saturate(1.1)
 * - Hover: brightness bumps to 0.95, subtle scale(1.02)
 * - Optional bottom gradient overlay: rgba(0,0,0,0) 40% → rgba(0,0,0,0.55) 100%
 * - Smooth 450ms ease-out transitions on both transform and filter
 */
export default function CoverImage({ src, alt = '', className = '', overlay = false }: CoverImageProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{
          filter: `brightness(${hovered ? 0.95 : 0.9}) contrast(1.05) saturate(1.1)`,
          transform: `scale(${hovered ? 1.02 : 1})`,
          transition: 'transform 450ms ease-out, filter 450ms ease-out',
        }}
      />
      {overlay && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)',
          }}
        />
      )}
    </div>
  );
}
