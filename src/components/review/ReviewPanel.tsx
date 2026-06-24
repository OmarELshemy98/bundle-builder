import { useBundleCalculations } from '../../hooks/useBundleCalculations';
import { CartItem } from '../../types';
import { ReviewFooter } from './ReviewFooter';
import { ReviewItem } from './ReviewItem';
import { ReviewPlanRow } from './ReviewPlanRow';
import { ReviewSection } from './ReviewSection';
import { ReviewShippingRow } from './ReviewShippingRow';

interface ReviewPanelProps {
  cart: CartItem[];
  onUpdate: (productId: number, updates: Partial<CartItem>) => void;
}

export function ReviewPanel({ cart, onUpdate }: ReviewPanelProps) {
  const {
    hasSelectedItems,
    cameras,
    sensors,
    accessories,
    plan,
    subtotal,
    compareAtSubtotal,
    savings,
  } = useBundleCalculations(cart);

  return (
    <div className="xl:w-[340px]">
      <div className="bg-[#EDF4FF] rounded-xl overflow-hidden xl:sticky xl:top-8 border border-[#d9e1ef] shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
        <div className="px-4 sm:px-5 pt-4 sm:pt-5">
          <div className="review-header">REVIEW</div>
          <h1 className="review-title mt-3">Your security system</h1>
          <p className="review-description mt-2">
            Review your personalized protection system designed to keep what matters most safe.
          </p>
        </div>

        <div className="px-4 sm:px-5 pb-5 sm:pb-6">
          {!hasSelectedItems && (
            <div className="py-10 text-center review-empty">
              Your review is empty. Start adding products to build your security bundle.
            </div>
          )}

          {cameras.length > 0 && (
            <ReviewSection title="Cameras">
              {cameras.map((item) => (
                <ReviewItem key={item.id} item={item} cart={cart} onUpdate={onUpdate} />
              ))}
            </ReviewSection>
          )}

          {sensors.length > 0 && (
            <ReviewSection title="Sensors">
              {sensors.map((item) => (
                <ReviewItem key={item.id} item={item} cart={cart} onUpdate={onUpdate} />
              ))}
            </ReviewSection>
          )}

          {accessories.length > 0 && (
            <ReviewSection title="Accessories">
              {accessories.map((item) => (
                <ReviewItem key={item.id} item={item} cart={cart} onUpdate={onUpdate} />
              ))}
            </ReviewSection>
          )}

          {plan.length > 0 && (
            <ReviewSection title="Plan">
              {plan.map((item) => (
                <ReviewPlanRow key={item.id} item={item} />
              ))}
            </ReviewSection>
          )}

          {hasSelectedItems && (
            <>
              <ReviewShippingRow />
              <ReviewFooter
                subtotal={subtotal}
                compareAtSubtotal={compareAtSubtotal}
                savings={savings}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
