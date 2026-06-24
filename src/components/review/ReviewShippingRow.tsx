import { staticItems } from '../../data';
import { ProductImage } from '../shared/ProductImage';

export function ReviewShippingRow() {
  const { shipping } = staticItems;

  return (
    <div className="review-block">
      <div className="flex items-center justify-between py-1.5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 flex items-center justify-center">
            <img src={shipping.thumbnail} alt="" className="w-full h-full object-contain" />
          </div>
          <span className="review-item-name">{shipping.name}</span>
        </div>
        <div className="text-right">
          <div className="price-strikethrough">${shipping.compareAtPrice.toFixed(2)}</div>
          <div className="price-main" style={{ color: '#4E2FD2' }}>
            {shipping.price === 0 ? 'FREE' : `$${Number(shipping.price).toFixed(2)}`}
          </div>
        </div>
      </div>
    </div>
  );
}
