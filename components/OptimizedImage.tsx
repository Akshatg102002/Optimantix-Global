import React, { ImgHTMLAttributes } from 'react';

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  alt: string; // Required prop
  src: string; // Required prop
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  quality?: 'low' | 'medium' | 'high';
  responsive?: boolean;
  schema?: boolean; // Include ImageObject schema
}

/**
 * Optimized Image Component
 * - Enforces required alt text
 * - Provides lazy loading by default
 * - Supports responsive images
 * - Optional ImageObject schema
 * - Improves SEO and accessibility
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  alt,
  src,
  width,
  height,
  loading = 'lazy',
  quality = 'high',
  responsive = true,
  schema = false,
  className = '',
  ...props
}) => {
  // Validate alt text
  if (!alt || alt.trim() === '') {
    console.warn(`Image missing alt text: ${src}`);
  }

  const imgElement = (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
      className={`transition-transform duration-300 ${responsive ? 'w-full h-auto' : ''} ${className}`}
      {...props}
    />
  );

  if (schema && width && height) {
    return (
      <figure
        itemScope
        itemType="https://schema.org/ImageObject"
        className={responsive ? 'w-full' : ''}
      >
        {imgElement}
        <meta itemProp="url" content={src} />
        <meta itemProp="width" content={String(width)} />
        <meta itemProp="height" content={String(height)} />
        <meta itemProp="name" content={alt} />
        <meta itemProp="description" content={alt} />
      </figure>
    );
  }

  return imgElement;
};
