import React from 'react';

// Photos of rooms and devices (CLAUDE.md: never presented as our projects): Unsplash ids,
// or our own illustrative photos in public/images/foto/ given as '/images/foto/<name>',
// each saved at 640 and 1280 px wide (<name>-640.jpg, <name>-1280.jpg).
// One helper so every photo gets sizes for phones and wide screens.
export const unsplash = (id: string, width: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=75`;

const LOCAL_WIDTHS = [640, 1280];
const isLocal = (id: string) => id.startsWith('/');
const photoUrl = (id: string, width: number) => (isLocal(id) ? `${id}-${width}.jpg` : unsplash(id, width));

const TRANSPARENT = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

interface PhotoProps {
  /** Unsplash id, e.g. 'photo-1600585154526-990dced4db0d', or a local '/images/foto/<name>' */
  id: string;
  alt: string;
  className?: string;
  /** Widths offered to the browser */
  widths?: number[];
  /** How wide the photo shows, e.g. '(min-width: 768px) 50vw, 100vw' */
  sizes?: string;
  /** Load right away (photo visible on the first screen) */
  eager?: boolean;
  /** Only on screens 1024px and wider; phones load nothing */
  desktopOnly?: boolean;
}

export const Photo: React.FC<PhotoProps> = ({
  id,
  alt,
  className,
  widths: requested = [480, 800, 1200],
  sizes = '(min-width: 1024px) 50vw, 100vw',
  eager = false,
  desktopOnly = false,
}) => {
  const widths = isLocal(id) ? LOCAL_WIDTHS : requested;
  const srcSet = widths.map((w) => `${photoUrl(id, w)} ${w}w`).join(', ');
  const img = (
    <img
      src={desktopOnly ? TRANSPARENT : photoUrl(id, widths[Math.min(1, widths.length - 1)])}
      srcSet={desktopOnly ? undefined : srcSet}
      sizes={desktopOnly ? undefined : sizes}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
    />
  );
  if (!desktopOnly) return img;
  return (
    <picture>
      <source media="(min-width: 1024px)" srcSet={srcSet} sizes={sizes} />
      {img}
    </picture>
  );
};
