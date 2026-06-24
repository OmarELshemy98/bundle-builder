import { SelectedReviewItem } from '../../types';
import { ProductImage } from '../shared/ProductImage';

interface ReviewPlanRowProps {
  item: SelectedReviewItem;
}

export function ReviewPlanRow({ item }: ReviewPlanRowProps) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <div className="flex items-center gap-3">
        <ProductImage src={item.product.imageUrl} alt="" className="w-6 h-6 bg-white rounded-md p-0.5" />
        <span className="review-item-name font-semibold" style={{ color: '#4E2FD2' }}>
          {item.product.name}
        </span>
      </div>
      <div className="text-right">
        {item.product.compareAtPrice && item.product.compareAtPrice > item.product.price && (
          <div className="price-strikethrough">${item.product.compareAtPrice.toFixed(2)}/mo</div>
        )}
        <div className="price-main" style={{ color: '#4E2FD2' }}>
          ${item.product.price.toFixed(2)}/mo
        </div>
      </div>
    </div>
  );
}
