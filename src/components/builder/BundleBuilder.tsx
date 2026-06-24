import { NEXT_STEP_LABELS, steps } from '../../data';
import { useAccordion } from '../../hooks/useAccordion';
import { useCart } from '../../hooks/useCart';
import { CartItem } from '../../types';
import { getProductsByStep, getSelectedCount } from '../../utils/products';
import { ReviewPanel } from '../review/ReviewPanel';
import { AccordionStep } from './AccordionStep';
import { CamerasStepContent } from './CamerasStepContent';
import { ProductsStepContent } from './ProductsStepContent';

export function BundleBuilder() {
  const { cart, updateProduct } = useCart();
  const { expandedStepId, toggleStep, goToStep } = useAccordion(1);

  const handleUpdate = (productId: number, updates: Partial<CartItem>) => {
    updateProduct(productId, updates);
  };

  return (
    <div className="min-h-screen bg-[#f3f3f3] py-5 sm:py-8 px-3 sm:px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 xl:hidden">
          <h1 className="text-3xl sm:text-5xl leading-none font-semibold text-[#1f1f1f]">
            Let's get started!
          </h1>
        </div>

        <div className="flex flex-col xl:flex-row gap-4 sm:gap-6">
          <div className="flex-1">
            {steps.map((step, index) => {
              const isExpanded = expandedStepId === step.id;
              const isFirst = index === 0;
              const stepProducts = getProductsByStep(step.id);
              const selectedCount = getSelectedCount(step.id, cart);
              const nextStepId = step.id + 1;
              const nextLabel = NEXT_STEP_LABELS[step.id];

              return (
                <AccordionStep
                  key={step.id}
                  stepNumber={step.id}
                  title={step.title}
                  icon={step.icon}
                  isExpanded={isExpanded}
                  selectedCount={selectedCount}
                  onToggle={() => toggleStep(step.id)}
                  isFirst={isFirst}
                  chevronStrokeWidth={step.id === 2 ? 2 : 3}
                >
                  {step.id === 1 ? (
                    <CamerasStepContent
                      products={stepProducts}
                      cart={cart}
                      onUpdate={handleUpdate}
                      onNext={() => goToStep(nextStepId)}
                      nextLabel={nextLabel}
                    />
                  ) : step.id === 4 ? (
                    <ProductsStepContent
                      products={stepProducts}
                      cart={cart}
                      onUpdate={handleUpdate}
                      sectionLabel="Accessories"
                    />
                  ) : (
                    <ProductsStepContent
                      products={stepProducts}
                      cart={cart}
                      onUpdate={handleUpdate}
                      onNext={() => goToStep(nextStepId)}
                      nextLabel={nextLabel}
                    />
                  )}
                </AccordionStep>
              );
            })}
          </div>

          <ReviewPanel cart={cart} onUpdate={handleUpdate} />
        </div>
      </div>
    </div>
  );
}
