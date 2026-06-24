import { useState, useEffect, useMemo } from 'react';
import { Product, CartItem, ProductVariant } from './types';
import { ProductCard } from './components/ProductCard';
import { products } from './data';

const STORAGE_KEY = 'wyze-bundle-builder';

const initialCart: CartItem[] = [
  {
    productId: 1,
    activeVariantId: 'white',
    variants: [{ variantId: 'white', quantity: 1 }],
  },
  {
    productId: 2,
    activeVariantId: 'white',
    variants: [{ variantId: 'white', quantity: 2 }],
  },
];

const staticItems = {
  sensors: [
    { id: 'sense-motion', name: 'Wyze Sense Motion Sensor', price: 59.98, quantity: 2, thumbnail: '' },
    { id: 'sense-hub', name: 'Wyze Sense Hub (Required)', price: 0, quantity: 1, thumbnail: '' },
  ],
  accessories: [
    { id: 'sd-card-256', name: 'Wyze MicroSD Card (256GB)', price: 41.96, quantity: 2, thumbnail: '' },
  ],
  plan: { name: 'Cam Unlimited', price: 9.99, compareAtPrice: 19.99, thumbnail: '/assets/images/icons/livestream.svg' },
  shipping: { name: 'Fast Shipping', price: 0, compareAtPrice: 5.99, thumbnail: '/assets/images/icons/fast-shipping.svg' },
};

function App() {
  // Load saved cart from localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading saved cart', e);
    }
    return initialCart;
  });

  const [expandedStepId, setExpandedStepId] = useState<number>(1);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart', e);
    }
  }, [cart]);

  // Handle product updates
  const handleProductUpdate = (productId: number, updates: Partial<CartItem>) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.productId === productId);
      if (existingIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingIndex] = { ...updatedCart[existingIndex], ...updates };
        return updatedCart;
      } else if (updates.productId && updates.variants) {
        return [...prevCart, { productId, activeVariantId: updates.activeVariantId, variants: updates.variants }];
      }
      return prevCart;
    });
  };



  // Get products by step
  const getProductsByStep = (stepId: number) => products.filter((p) => p.stepId === stepId);

  // Calculate number of selected items in a step
  const getSelectedCount = (stepId: number) => {
    const stepProducts = getProductsByStep(stepId);
    let count = 0;
    stepProducts.forEach((p) => {
      const cartItem = cart.find((c) => c.productId === p.id);
      if (cartItem) {
        const totalQty = cartItem.variants.reduce((sum, v) => sum + v.quantity, 0);
        if (totalQty > 0) count++;
      }
    });
    return count;
  };

  // Helper to get product by id
  const getProductById = (id: number): Product | undefined => products.find((p) => p.id === id);

  // Flatten selected items for review panel
  const selectedItems = useMemo(() => {
    const items: Array<{
      id: string;
      product: Product;
      variant?: ProductVariant;
      quantity: number;
      category: 'cameras';
    }> = [];
    
    cart.forEach((cartItem) => {
      const product = getProductById(cartItem.productId);
      if (!product) return;

      cartItem.variants.forEach((variantCart) => {
        if (variantCart.quantity > 0) {
          const variant = product.variants.find((v) => v.id === variantCart.variantId);
          items.push({
            id: `${product.id}-${variantCart.variantId}`,
            product,
            variant,
            quantity: variantCart.quantity,
            category: 'cameras',
          });
        }
      });
    });

    return items;
  }, [cart]);

  // Calculate totals
  const { subtotal, compareAtSubtotal, savings } = useMemo(() => {
    let subtotal = 0;
    let compareAtSubtotal = 0;

    selectedItems.forEach((item) => {
      subtotal += item.product.price * item.quantity;
      compareAtSubtotal += (item.product.compareAtPrice || item.product.price) * item.quantity;
    });

    staticItems.sensors.forEach((item) => {
      subtotal += item.price;
      compareAtSubtotal += item.price;
    });

    staticItems.accessories.forEach((item) => {
      subtotal += item.price;
      compareAtSubtotal += item.price;
    });

    subtotal += staticItems.plan.price;
    compareAtSubtotal += staticItems.plan.compareAtPrice;
    
    const savings = compareAtSubtotal - subtotal;

    return { subtotal, compareAtSubtotal, savings };
  }, [selectedItems]);

  // Step 1 products
  const step1Products = getProductsByStep(1);

  const stepTextStyle = {
    fontFamily: 'Gilroy-Medium',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '100%',
    letterSpacing: '1.6px',
    verticalAlign: 'middle',
    textTransform: 'uppercase' as const,
    color: '#6b7280',
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Steps */}
          <div className="flex-1">
            {/* Step 1 */}
            <div className="bg-[#EDF4FF] rounded-t-xl p-6">
              <div
                className="mb-4 pb-4"
                style={{
                  ...stepTextStyle,
                  borderBottom: '0.5px solid #1F1F1F',
                }}
              >
                STEP 1 OF 4
              </div>
              <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpandedStepId(1)}>
                <div className="flex items-center gap-3">
<svg width={26} height={26} viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_68_9780)">
<path d="M8.6665 24.9166V20.5833" stroke="#6F7882" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
<path d="M17.3335 24.9166V20.5833" stroke="#6F7882" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
<path d="M22.75 24.9167L3.25 24.9167" stroke="#6F7882" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
<path d="M13 5.14581C15.2436 5.14581 17.0625 6.96473 17.0625 9.20831C17.0625 11.4519 15.2436 13.2708 13 13.2708C10.7564 13.2708 8.9375 11.4519 8.9375 9.20831C8.9375 6.96473 10.7564 5.14581 13 5.14581Z" stroke="#6F7882" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
<path d="M12.9731 16.25C12.7489 16.25 12.5669 16.432 12.5669 16.6562C12.5669 16.8805 12.7489 17.0625 12.9731 17.0625C13.1974 17.0625 13.3794 16.8805 13.3794 16.6562C13.3794 16.432 13.1974 16.25 12.9731 16.25Z" fill="#6F7882" stroke="#6F7882" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
<rect x={3.1875} y={0.75} width={19.625} height={19.625} rx={3.25} stroke="#6F7882" strokeWidth={1.5}/>
</g>
<defs>
<clipPath id="clip0_68_9780">
<rect width={26} height={26} fill="white"/>
</clipPath>
</defs>
</svg>
                  <h2 
                    className="text-gray-900"
                    style={{
                      fontFamily: 'Gilroy-SemiBold',
                      fontWeight: 400,
                      fontSize: '22px',
                      lineHeight: '100%',
                      letterSpacing: '0px'
                    }}
                  >
                    Choose your cameras
                  </h2>
                </div>
                <div className="flex items-center gap-2 text-indigo-600 font-medium">
                  <span>{getSelectedCount(1)} selected</span>
                  <svg className={`w-5 h-5 transition-transform ${expandedStepId === 1 ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {expandedStepId === 1 && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {step1Products.slice(0, 4).map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        cartItem={cart.find((c) => c.productId === product.id)}
                        onUpdate={(updates) => handleProductUpdate(product.id, updates)}
                      />
                    ))}
                  </div>
                  <div className="flex justify-center mt-4 w-full">
                    <div className="w-full md:w-1/2">
                      <ProductCard
                        product={step1Products[4]}
                        cartItem={cart.find((c) => c.productId === step1Products[4].id)}
                        onUpdate={(updates) => handleProductUpdate(step1Products[4].id, updates)}
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-center">
                    <button
                      className="px-8 py-2 bg-white text-indigo-600 font-medium border border-indigo-600 rounded-xl hover:bg-indigo-50 transition-colors"
                      onClick={() => setExpandedStepId(2)}
                    >
                      Next: Choose your plan
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Step 2 */}
            <div className="bg-white">
              <div className="px-6 py-5">
                <div
                  className="mb-4 py-4"
                  style={{
                    ...stepTextStyle,
                    borderTop: '0.5px solid #1F1F1F',
                    borderBottom: '0.5px solid #1F1F1F',
                  }}
                >
                  STEP 2 OF 4
                </div>
                <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpandedStepId(2)}>
                  <div className="flex items-center gap-3">
<svg width={26} height={27} viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.22186 5.25454C4.22186 5.25454 2.86035 5.49907 2.86035 6.64875V15.0139C2.86035 19.4874 9.42646 24.4657 11.6584 25.9445C12.1032 26.2419 12.6787 26.2419 13.1234 25.9445C15.3554 24.4657 21.9215 19.4874 21.9215 15.0139V6.64875C21.9215 5.49907 20.56 5.25454 20.56 5.25454L13.1811 2.92959C12.6665 2.76745 12.1154 2.76745 11.6008 2.92959L4.22186 5.25454Z" fill="#F0F0F0"/>
<path d="M5.87139 4.26114C5.89408 4.25692 5.9165 4.25134 5.93852 4.2444L13.3175 1.91943C13.7209 1.79232 14.153 1.79232 14.5565 1.91943L21.9354 4.2444C21.9574 4.25134 21.9798 4.25692 22.0025 4.26114C22.0034 4.26131 22.0044 4.26147 22.0053 4.26165L22.0049 4.26157L22.0042 4.26144L22.0031 4.26124L22.0059 4.26182C22.0105 4.26278 22.0195 4.26471 22.0321 4.26774C22.0575 4.27383 22.0969 4.28417 22.1455 4.29975C22.2449 4.33156 22.3716 4.38175 22.4933 4.45499C22.7361 4.60112 22.893 4.78996 22.893 5.08273V13.4479C22.893 14.4251 22.5326 15.4715 21.9116 16.5397C21.2926 17.6046 20.4356 18.655 19.4948 19.6291C17.6126 21.578 15.4492 23.1663 14.355 23.8913L14.3529 23.8927C14.1002 24.0617 13.7737 24.0617 13.521 23.8927L13.5189 23.8913C12.4247 23.1663 10.2613 21.578 8.37912 19.6291C7.43837 18.655 6.58128 17.6046 5.9623 16.5397C5.3413 15.4715 4.98096 14.4251 4.98096 13.4479V5.08273C4.98096 4.78996 5.13776 4.60112 5.38057 4.45499C5.50228 4.38175 5.62907 4.33156 5.72837 4.29975C5.77699 4.28417 5.8164 4.27383 5.84178 4.26774C5.85441 4.26471 5.86336 4.26278 5.86802 4.26182L5.87139 4.26114ZM5.86901 4.26157L5.86896 4.26158C5.86899 4.26157 5.86903 4.26157 5.86906 4.26157L5.86901 4.26157Z" stroke="#6F7882" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
                    <h2 
                      className="text-gray-900"
                      style={{
                        fontFamily: 'Gilroy-SemiBold',
                        fontWeight: 400,
                        fontSize: '22px',
                        lineHeight: '100%',
                        letterSpacing: '0px'
                      }}
                    >
                      Choose your plan
                    </h2>
                  </div>
                  <svg className={`w-5 h-5 text-indigo-600 transition-transform ${expandedStepId === 2 ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Step3 */}
            <div className="bg-white">
              <div className="px-6 py-5">
                <div
                  className="mb-4 py-4"
                  style={{
                    ...stepTextStyle,
                    borderTop: '0.5px solid #1F1F1F',
                    borderBottom: '0.5px solid #1F1F1F',
                  }}
                >
                  STEP 3 OF 4
                </div>
                <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpandedStepId(3)}>
                  <div className="flex items-center gap-3">
<svg width={28} height={28} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.5526 7.13056C19.5526 7.82389 19.0904 8.28611 18.3971 8.28611H9.15263C8.45929 8.28611 7.99707 7.82389 7.99707 7.13056V1.93058C7.99707 1.23725 8.45929 0.775024 9.15263 0.775024H18.3971C19.0904 0.775024 19.5526 1.23725 19.5526 1.93058V7.13056Z" stroke="#6F7882" strokeWidth={1.55} strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round"/>
<path d="M11.8101 4.2417V4.81948" stroke="#6F7882" strokeWidth={1.55} strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round"/>
<path d="M15.855 4.2417V4.81948" stroke="#6F7882" strokeWidth={1.55} strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round"/>
<path d="M19.1625 13.5441C16.2346 16.4329 11.3156 16.4329 8.3877 13.5441" stroke="#6F7882" strokeWidth={1.55} strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round"/>
<path d="M22.9104 17.2419C17.8744 22.2108 9.67617 22.2108 4.64014 17.2419" stroke="#6F7882" strokeWidth={1.55} strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round"/>
<path d="M26.7749 21.6328C19.5136 28.5661 8.03616 28.4505 0.774902 21.5172" stroke="#6F7882" strokeWidth={1.55} strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round"/>
</svg>
                    <h2 
                      className="text-gray-900"
                      style={{
                        fontFamily: 'Gilroy-SemiBold',
                        fontWeight: 400,
                        fontSize: '22px',
                        lineHeight: '100%',
                        letterSpacing: '0px'
                      }}
                    >
                      Choose your sensors
                    </h2>
                  </div>
                  <svg className={`w-5 h-5 text-indigo-600 transition-transform ${expandedStepId === 3 ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Step4 */}
            <div className="bg-white">
              <div className="px-6 py-5">
                <div
                  className="mb-4 py-4"
                  style={{
                    ...stepTextStyle,
                    borderTop: '0.5px solid #1F1F1F',
                    borderBottom: '0.5px solid #1F1F1F',
                  }}
                >
                  STEP 4 OF 4
                </div>
                <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpandedStepId(4)}>
                  <div className="flex items-center gap-3">
<svg width={20} height={22} viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.2134 4.22826L9.7351 0.75L6.25684 4.22826" stroke="#6F7882" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
<path d="M4.80739 7.92396C4.80739 8.32755 4.64707 8.71461 4.36168 8.99999C4.0763 9.28537 3.68924 9.4457 3.28565 9.4457H2.27174C1.86815 9.4457 1.48109 9.28537 1.19571 8.99999C0.910326 8.71461 0.75 8.32755 0.75 7.92396C0.75 7.52037 0.910326 7.13331 1.19571 6.84793C1.48109 6.56255 1.86815 6.40222 2.27174 6.40222H3.28565C3.68924 6.40222 4.0763 6.56255 4.36168 6.84793C4.64707 7.13331 4.80739 7.52037 4.80739 7.92396Z" stroke="#6F7882" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
<path d="M11.7639 7.92396C11.7639 8.32755 11.6036 8.71461 11.3182 8.99999C11.0328 9.28537 10.6458 9.4457 10.2422 9.4457H9.22828C8.82469 9.4457 8.43763 9.28537 8.15225 8.99999C7.86687 8.71461 7.70654 8.32755 7.70654 7.92396C7.70654 7.52037 7.86687 7.13331 8.15225 6.84793C8.43763 6.56255 8.82469 6.40222 9.22828 6.40222H10.2422C10.6458 6.40222 11.0328 6.56255 11.3182 6.84793C11.6036 7.13331 11.7639 7.52037 11.7639 7.92396Z" stroke="#6F7882" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
<path d="M18.7205 7.92396C18.7205 8.32755 18.5602 8.71461 18.2748 8.99999C17.9894 9.28537 17.6023 9.4457 17.1987 9.4457H16.1848C15.7812 9.4457 15.3942 9.28537 15.1088 8.99999C14.8234 8.71461 14.6631 8.32755 14.6631 7.92396C14.6631 7.52037 14.8234 7.13331 15.1088 6.84793C15.3942 6.56255 15.7812 6.40222 16.1848 6.40222H17.1987C17.6023 6.40222 17.9894 6.56255 18.2748 6.84793C18.5602 7.13331 18.7205 7.52037 18.7205 7.92396Z" stroke="#6F7882" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
<path d="M4.80739 13.5761C4.80739 13.9797 4.64707 14.3667 4.36168 14.6521C4.0763 14.9375 3.68924 15.0978 3.28565 15.0978H2.27174C1.86815 15.0978 1.48109 14.9375 1.19571 14.6521C0.910326 14.3667 0.75 13.9797 0.75 13.5761C0.75 13.1725 0.910326 12.7854 1.19571 12.5C1.48109 12.2146 1.86815 12.0543 2.27174 12.0543H3.28565C3.68924 12.0543 4.0763 12.2146 4.36168 12.5C4.64707 12.7854 4.80739 13.1725 4.80739 13.5761Z" stroke="#6F7882" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
<path d="M11.7639 13.5761C11.7639 13.9797 11.6036 14.3667 11.3182 14.6521C11.0328 14.9375 10.6458 15.0978 10.2422 15.0978H9.22828C8.82469 15.0978 8.43763 14.9375 8.15225 14.6521C7.86687 14.3667 7.70654 13.9797 7.70654 13.5761C7.70654 13.1725 7.86687 12.7854 8.15225 12.5C8.43763 12.2146 8.82469 12.0543 9.22828 12.0543H10.2422C10.6458 12.0543 11.0328 12.2146 11.3182 12.5C11.6036 12.7854 11.7639 13.1725 11.7639 13.5761Z" stroke="#6F7882" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
<path d="M18.7205 13.5761C18.7205 13.9797 18.5602 14.3667 18.2748 14.6521C17.9894 14.9375 17.6023 15.0978 17.1987 15.0978H16.1848C15.7812 15.0978 15.3942 14.9375 15.1088 14.6521C14.8234 14.3667 14.6631 13.9797 14.6631 13.5761C14.6631 13.1725 14.8234 12.7854 15.1088 12.5C15.3942 12.2146 15.7812 12.0543 16.1848 12.0543H17.1987C17.6023 12.0543 17.9894 12.2146 18.2748 12.5C18.5602 12.7854 18.7205 13.1725 18.7205 13.5761Z" stroke="#6F7882" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
<path d="M4.80739 19.2283C4.80739 19.6319 4.64707 20.0189 4.36168 20.3043C4.0763 20.5897 3.68924 20.75 3.28565 20.75H2.27174C1.86815 20.75 1.48109 20.5897 1.19571 20.3043C0.910326 20.0189 0.75 19.6319 0.75 19.2283C0.75 18.8247 0.910326 18.4376 1.19571 18.1523C1.48109 17.8669 1.86815 17.7065 2.27174 17.7065H3.28565C3.68924 17.7065 4.0763 17.8669 4.36168 18.1523C4.64707 18.4376 4.80739 18.8247 4.80739 19.2283Z" stroke="#6F7882" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
<path d="M11.7639 19.2283C11.7639 19.6319 11.6036 20.0189 11.3182 20.3043C11.0328 20.5897 10.6458 20.75 10.2422 20.75H9.22828C8.82469 20.75 8.43763 20.5897 8.15225 20.3043C7.86687 20.0189 7.70654 19.6319 7.70654 19.2283C7.70654 18.8247 7.86687 18.4376 8.15225 18.1523C8.43763 17.8669 8.82469 17.7065 9.22828 17.7065H10.2422C10.6458 17.7065 11.0328 17.8669 11.3182 18.1523C11.6036 18.4376 11.7639 18.8247 11.7639 19.2283Z" stroke="#6F7882" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
<path d="M18.7205 19.2283C18.7205 19.6319 18.5602 20.0189 18.2748 20.3043C17.9894 20.5897 17.6023 20.75 17.1987 20.75H16.1848C15.7812 20.75 15.3942 20.5897 15.1088 20.3043C14.8234 20.0189 14.6631 19.6319 14.6631 19.2283C14.6631 18.8247 14.8234 18.4376 15.1088 18.1523C15.3942 17.8669 15.7812 17.7065 16.1848 17.7065H17.1987C17.6023 17.7065 17.9894 17.8669 18.2748 18.1523C18.5602 18.4376 18.7205 18.8247 18.7205 19.2283Z" stroke="#6F7882" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/>
</svg>
                    <h2 
                      className="text-gray-900"
                      style={{
                        fontFamily: 'Gilroy-SemiBold',
                        fontWeight: 400,
                        fontSize: '22px',
                        lineHeight: '100%',
                        letterSpacing: '0px'
                      }}
                    >
                      Add extra protection
                    </h2>
                  </div>
                  <svg className={`w-5 h-5 text-indigo-600 transition-transform ${expandedStepId === 4 ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Review Panel */}
          <div className="lg:w-80">
            <div className="bg-[#EDF4FF] rounded-xl overflow-hidden border border-gray-200 sticky top-8">
              <div className="bg-gradient-to-r from-slate-700 to-slate-900 px-5 py-3 flex items-center justify-between">
                <span className="text-white font-medium text-sm">Your security system</span>
                <span className="bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">{selectedItems.length + 4} items</span>
              </div>
              <div className="px-5 py-5">
                <div className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-3">Cameras</div>
                {selectedItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-1.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-white rounded overflow-hidden flex items-center justify-center p-0.5">
                        <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-contain" />
                      </div>
                      <span className="font-medium text-gray-800 text-sm">
                        {item.product.name}
                        {item.variant && ` (${item.variant.name})`}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                        <button
                          className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                          onClick={() => {
                            handleProductUpdate(item.product.id, {
                              variants: cart.find((c) => c.productId === item.product.id)?.variants.map((v) =>
                                v.variantId === item.variant?.id ? { ...v, quantity: Math.max(0, v.quantity - 1) } : v
                              ) || [],
                            });
                          }}
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
                          </svg>
                        </button>
                        <span className="w-8 h-6 flex items-center justify-center text-xs font-medium">{item.quantity}</span>
                        <button
                          className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                          onClick={() => {
                            const cartItem = cart.find((c) => c.productId === item.product.id);
                            if (!cartItem) return;
                            handleProductUpdate(item.product.id, {
                              variants: cartItem.variants.map((v) =>
                                v.variantId === item.variant?.id ? { ...v, quantity: v.quantity + 1 } : v
                              ),
                            });
                          }}
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                      <div className="text-right">
                        {item.product.compareAtPrice && (
                          <span className="font-medium text-gray-500 line-through text-xs">
                            ${(item.product.compareAtPrice * item.quantity).toFixed(2)}
                          </span>
                        )}
                        <span className="ml-1 font-semibold text-indigo-600 text-sm">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="h-px bg-gray-300 my-3"></div>

                <div className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-3">Sensors</div>
                {staticItems.sensors.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-1.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-white rounded overflow-hidden flex items-center justify-center p-0.5">
                        {item.thumbnail && <img src={item.thumbnail} alt={item.name} className="w-full h-full object-contain" />}
                      </div>
                      <span className="font-medium text-gray-800 text-sm">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                        <button className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-100">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
                          </svg>
                        </button>
                        <span className="w-8 h-6 flex items-center justify-center text-xs font-medium">{item.quantity}</span>
                        <button className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-100">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold text-indigo-600 text-sm">{item.price === 0 ? 'FREE' : `$${item.price.toFixed(2)}`}</span>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="h-px bg-gray-300 my-3"></div>

                <div className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-3">Accessories</div>
                {staticItems.accessories.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-1.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-white rounded overflow-hidden flex items-center justify-center p-0.5">
                        {item.thumbnail && <img src={item.thumbnail} alt={item.name} className="w-full h-full object-contain" />}
                      </div>
                      <span className="font-medium text-gray-800 text-sm">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                        <button className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-100">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
                          </svg>
                        </button>
                        <span className="w-8 h-6 flex items-center justify-center text-xs font-medium">{item.quantity}</span>
                        <button className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-100">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold text-indigo-600 text-sm">${item.price.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="h-px bg-gray-300 my-3"></div>

                <div className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-3">Plan</div>
                <div className="flex items-center justify-between py-1.5">
                  <div className="flex items-center gap-3">
                    <img src={staticItems.plan.thumbnail} alt="" className="w-9 h-9" />
                    <span className="font-bold text-indigo-600 text-base">{staticItems.plan.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-medium text-gray-500 line-through text-xs">${staticItems.plan.compareAtPrice.toFixed(2)}/mo</span>
                    <span className="ml-1 font-semibold text-indigo-600 text-sm">${staticItems.plan.price.toFixed(2)}/mo</span>
                  </div>
                </div>

                <div className="h-px bg-gray-300 my-3"></div>

                <div className="flex items-center justify-between py-1.5">
                  <div className="flex items-center gap-3">
                    <img src={staticItems.shipping.thumbnail} alt="" className="w-9 h-9" />
                    <span className="font-medium text-gray-800 text-sm">{staticItems.shipping.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-medium text-gray-500 line-through text-xs">${staticItems.shipping.compareAtPrice.toFixed(2)}</span>
                    <span className="ml-1 font-semibold text-indigo-600 text-sm">{staticItems.shipping.price === 0 ? 'FREE' : `$${staticItems.shipping.price.toFixed(2)}`}</span>
                  </div>
                </div>

                <div className="mt-6 flex items-end justify-between">
                  <img src="/assets/images/icons/satisfaction-badge.jpg" alt="100% Satisfaction Badge" className="w-24 h-24" />
                  <div className="flex-1 ml-4">
                    <div className="flex items-end justify-between mb-2">
                      <div className="px-2.5 py-1 bg-indigo-600 text-white text-xs font-medium rounded-lg">as low as $19.19/mo</div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg text-gray-500 line-through">${compareAtSubtotal.toFixed(2)}</span>
                        <span className="text-2xl font-bold text-indigo-600">${subtotal.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="text-center text-teal-500 font-medium text-xs mb-2">
                      Congrats! You're saving ${savings.toFixed(2)} on your security bundle!
                    </div>
                    <button className="w-full py-2.5 bg-indigo-600 text-white font-semibold text-base rounded hover:bg-indigo-700 transition-colors">
                      Checkout
                    </button>
                    <div className="text-center text-gray-600 underline text-xs mt-2 cursor-pointer" onClick={() => alert('System saved to localStorage!')}>
                      Save my system for later
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
