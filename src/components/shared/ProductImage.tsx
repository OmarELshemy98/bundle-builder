import { REVIEW_IMAGE_FALLBACK } from '../../constants/images';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
}

export function ProductImage({ src, alt, className, imageClassName }: ProductImageProps) {
  return (
    <div className={className}>
      <img
        src={src}
        alt={alt}
        className={imageClassName}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = REVIEW_IMAGE_FALLBACK;
        }}
      />
    </div>
  );
}
