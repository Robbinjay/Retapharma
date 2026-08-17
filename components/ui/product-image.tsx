'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Beaker } from 'lucide-react';

interface ProductImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
  fallbackCategory?: string;
}

function ProductImageRenderer({
  src,
  alt,
  fill = true,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  className = 'object-contain p-2',
  fallbackCategory,
}: ProductImageProps) {
  // 0 = Next.js Image, 1 = Direct img tag (original src), 2 = Direct webp/png fallback, 3 = Placeholder
  const [errorLevel, setErrorLevel] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);

  if (!src || errorLevel >= 3) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100/80 p-4 text-center select-none">
        <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-emerald-600 mb-2">
          <Beaker className="w-7 h-7 stroke-[1.5]" />
        </div>
        <span className="text-xs font-bold text-slate-800 line-clamp-1 max-w-[180px]">
          {alt}
        </span>
        <span className="text-[10px] uppercase tracking-wider text-emerald-600 font-semibold mt-0.5">
          {fallbackCategory || 'Reference Grade'}
        </span>
      </div>
    );
  }

  // Level 0: Next.js Optimized Image
  if (errorLevel === 0) {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <Image
          src={src}
          alt={alt}
          fill={fill}
          priority={priority}
          sizes={sizes}
          className={`${className} transition-opacity duration-150 ${isLoaded ? 'opacity-100' : 'opacity-90'}`}
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            // If Next.js Image optimization fails, step down to direct image element
            setErrorLevel(1);
          }}
        />
      </div>
    );
  }

  // Level 1: Direct native <img> with original src
  if (errorLevel === 1) {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className={`w-full h-full ${className}`}
          loading={priority ? 'eager' : 'lazy'}
          onError={() => {
            // Try alternative format (e.g. .webp <-> .png)
            setErrorLevel(2);
          }}
        />
      </div>
    );
  }

  // Level 2: Fallback extension (.webp if .png, or .png if .webp)
  const alternateSrc = src.endsWith('.png')
    ? src.replace(/\.png$/, '.webp')
    : src.endsWith('.webp')
    ? src.replace(/\.webp$/, '.png')
    : src;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={alternateSrc}
        alt={alt}
        className={`w-full h-full ${className}`}
        loading="lazy"
        onError={() => setErrorLevel(3)}
      />
    </div>
  );
}

export default function ProductImage(props: ProductImageProps) {
  return <ProductImageRenderer key={props.src} {...props} />;
}
