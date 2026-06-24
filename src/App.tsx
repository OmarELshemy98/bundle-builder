import { useState } from 'react';
import { Product } from './types';
import { ProductCard } from './components/ProductCard';

const sampleProducts: Product[] = [
  {
    id: 1,
    name: 'Wyze Cam v4',
    description: 'The clearest Wyze Cam ever made.',
    price: 35.98,
    compareAtPrice: 27.98,
    imageUrl: '/assets/images/products/Wyze Cam v4/wyze-cam.svg',
    variants: [
      { id: 'white', name: 'White', imageUrl: '/assets/images/products/Wyze Cam v4/wyze-cam-white.svg' },
      { id: 'grey', name: 'Grey', imageUrl: '/assets/images/products/Wyze Cam v4/wyze-cam-grey.svg' },
      { id: 'black', name: 'Black', imageUrl: '/assets/images/products/Wyze Cam v4/wyze-cam-black.png' },
    ],
    badge: 'Save 22%',
    selected: true,
    learnMoreUrl: '#',
  },
  {
    id: 2,
    name: 'Wyze Cam Pan v3',
    description: '360° pan and 180° tilt security camera.',
    price: 39.98,
    compareAtPrice: 34.98,
    imageUrl: '/assets/images/products/Wyze Cam Pan v3/wyze-cam-v3.png',
    variants: [
      { id: 'white', name: 'White', imageUrl: '/assets/images/products/Wyze Cam Pan v3/wyze-cam-v3-white.svg' },
      { id: 'black', name: 'Black', imageUrl: '/assets/images/products/Wyze Cam Pan v3/wyze-cam-v3-black.svg' },
    ],
    badge: 'Save 12%',
    selected: true,
    learnMoreUrl: '#',
  },
  {
    id: 3,
    name: 'Wyze Cam Floodlight v2',
    description: '2K floodlight camera with a 160° wide-angle view for your garage.',
    price: 89.98,
    compareAtPrice: 69.98,
    imageUrl: '/assets/images/products/Wyze Cam Floodlight v2/wyze-cam-v2.jpg',
    variants: [
      { id: 'white', name: 'White', imageUrl: '/assets/images/products/Wyze Cam Floodlight v2/wyze-cam-v2-white.svg' },
      { id: 'black', name: 'Black', imageUrl: '/assets/images/products/Wyze Cam Floodlight v2/wyze-cam-v2-black.svg' },
    ],
    badge: 'Save 22%',
    selected: false,
    learnMoreUrl: '#',
  },
  {
    id: 4,
    name: 'Wyze Duo Cam Doorbell',
    description: 'Two cameras. Two views. Double the porch protection.',
    price: 69.98,
    imageUrl: '/assets/images/products/Wyze Duo Cam Doorbell/door-bell.jpg',
    variants: [],
    selected: false,
    learnMoreUrl: '#',
  },
  {
    id: 5,
    name: 'Wyze Battery Cam Pro',
    description: 'Protect anywhere. See everything in 2.5K HDR. No power outlet or electrician needed.',
    price: 89.98,
    imageUrl: '/assets/images/products/Wyze Battery Cam Pro/cam-pro.jpg',
    variants: [
      { id: 'white', name: 'White', imageUrl: '/assets/images/products/Wyze Battery Cam Pro/cam-pro-white.svg' },
      { id: 'black', name: 'Black', imageUrl: '/assets/images/products/Wyze Battery Cam Pro/cam-pro-black.svg' },
    ],
    selected: false,
    learnMoreUrl: '#',
  },
];

function App() {
  const [cart, setCart] = useState<Record<string, { quantity: number; variantId?: string; selected?: boolean }>>({
    '1': { quantity: 1, variantId: 'white', selected: true },
    '2': { quantity: 2, variantId: 'white', selected: true },
  });

  const handleProductUpdate = (productId: string | number, updates: { quantity?: number; variantId?: string; selected?: boolean }) => {
    setCart((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        ...updates,
        quantity: updates.quantity ?? prev[productId]?.quantity ?? 0,
      },
    }));
  };

  const selectedProducts = sampleProducts.filter((p) => cart[p.id]?.selected && cart[p.id]?.quantity > 0);

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side: Steps */}
          <div className="flex-1">
            {/* Step 1: Choose your cameras */}
            <div className="bg-[#EDF4FF] rounded-t-xl p-6">
              <div 
                className="mb-2 border-b-2 border-[#1F1F1F]" 
              
              >STEP 1 OF 4</div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <svg className="w-7 h-7 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <h2 className="text-2xl font-semibold text-gray-900">Choose your cameras</h2>
                </div>
                <div className="flex items-center gap-2 text-indigo-600 font-medium">
                  <span>2 selected</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-4">
                {sampleProducts.slice(0, 4).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={{ ...product, selected: cart[product.id]?.selected ?? false }}
                    quantity={cart[product.id]?.quantity ?? 0}
                    selectedVariantId={cart[product.id]?.variantId}
                    onUpdate={(updates) => handleProductUpdate(product.id, updates)}
                  />
                ))}
              </div>
              <div className="flex justify-center mt-4 w-full">
                <div className="w-full md:w-1/2">
                  <ProductCard
                    product={{ ...sampleProducts[4], selected: cart[sampleProducts[4].id]?.selected ?? false }}
                    quantity={cart[sampleProducts[4].id]?.quantity ?? 0}
                    selectedVariantId={cart[sampleProducts[4].id]?.variantId}
                    onUpdate={(updates) => handleProductUpdate(sampleProducts[4].id, updates)}
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <button className="px-8 py-2 bg-white text-indigo-600 font-medium border border-indigo-600 rounded-xl hover:bg-indigo-50 transition-colors">
                  Next: Choose your sensors
                </button>
              </div>
            </div>

            {/* Step 2: Choose your plan */}
            <div className="bg-white border-b border-t border-gray-300">
              <div className="px-6 py-5">
                <div className="text-xs text-gray-600 font-medium mb-2">STEP 2 OF 4</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <svg className="w-7 h-7 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <h2 className="text-2xl font-semibold text-gray-900">Choose your plan</h2>
                  </div>
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Step 3: Choose your sensors */}
            <div className="bg-white border-b border-gray-300">
              <div className="px-6 py-5">
                <div className="text-xs text-gray-600 font-medium mb-2">STEP 3 OF 4</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <svg className="w-7 h-7 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                    </svg>
                    <h2 className="text-2xl font-semibold text-gray-900">Choose your sensors</h2>
                  </div>
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Step 4: Add extra protection */}
            <div className="bg-white border-b border-gray-300">
              <div className="px-6 py-5">
                <div className="text-xs text-gray-600 font-medium mb-2">STEP 4 OF 4</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <svg className="w-7 h-7 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <h2 className="text-2xl font-semibold text-gray-900">Add extra protection</h2>
                  </div>
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Summary */}
          <div className="lg:w-80">
            <div className="bg-[#EDF4FF] rounded-xl overflow-hidden border border-gray-200 sticky top-8">
              <div className="bg-gradient-to-r from-slate-700 to-slate-900 px-5 py-3 flex items-center justify-between">
                <span className="text-white font-medium text-sm">Your security system</span>
                <span className="bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">16 items</span>
              </div>
              <div className="px-5 py-5">
                <div className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-3">Cameras</div>
                {selectedProducts.map((product) => {
                  const item = cart[product.id];
                  return (
                    <div key={product.id} className="flex items-center justify-between py-1.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-white rounded overflow-hidden flex items-center justify-center p-0.5">
                          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain" />
                        </div>
                        <span className="font-medium text-gray-800 text-sm">{product.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                          <button className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-100">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="w-8 h-6 flex items-center justify-center text-xs font-medium">{item?.quantity}</span>
                          <button className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-100">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                        <div className="text-right">
                          {product.compareAtPrice && (
                            <span className="font-medium text-gray-500 line-through text-xs">${product.compareAtPrice.toFixed(2)}</span>
                          )}
                          <span className="ml-1 font-semibold text-indigo-600 text-sm">${product.price.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div className="h-px bg-gray-300 my-3"></div>
                
                <div className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-3">Sensors</div>
                <div className="flex items-center justify-between py-1.5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-white rounded overflow-hidden flex items-center justify-center p-0.5"></div>
                    <span className="font-medium text-gray-800 text-sm">Wyze Sense Motion Sensor</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                      <button className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-100">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="w-8 h-6 flex items-center justify-center text-xs font-medium">2</span>
                      <button className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-100">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-indigo-600 text-sm">$59.98</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-white rounded overflow-hidden flex items-center justify-center p-0.5"></div>
                    <span className="font-medium text-gray-800 text-sm">Wyze Sense Hub (Required)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                      <button className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-100 opacity-50">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="w-8 h-6 flex items-center justify-center text-xs font-medium">1</span>
                      <button className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-100 opacity-50">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-indigo-600 text-sm">FREE</span>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-gray-300 my-3"></div>
                
                <div className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-3">Accessories</div>
                <div className="flex items-center justify-between py-1.5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-white rounded overflow-hidden flex items-center justify-center p-0.5"></div>
                    <span className="font-medium text-gray-800 text-sm">Wyze MicroSD Card (256GB)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                      <button className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-100">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="w-8 h-6 flex items-center justify-center text-xs font-medium">2</span>
                      <button className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-gray-100">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-indigo-600 text-sm">$41.96</span>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-gray-300 my-3"></div>
                
                <div className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-3">Plan</div>
                <div className="flex items-center justify-between py-1.5">
                  <div className="flex items-center gap-3">
                    <img src="/assets/images/icons/livestream.svg" alt="" className="w-9 h-9" />
                    <span className="font-bold text-indigo-600 text-base">Cam Unlimited</span>
                  </div>
                  <div className="text-right">
                    <span className="font-medium text-gray-500 line-through text-xs">$19.99/mo</span>
                    <span className="ml-1 font-semibold text-indigo-600 text-sm">$9.99/mo</span>
                  </div>
                </div>

                <div className="h-px bg-gray-300 my-3"></div>
                
                <div className="flex items-center justify-between py-1.5">
                  <div className="flex items-center gap-3">
                    <img src="/assets/images/icons/fast-shipping.svg" alt="" className="w-9 h-9" />
                    <span className="font-medium text-gray-800 text-sm">Fast Shipping</span>
                  </div>
                  <div className="text-right">
                    <span className="font-medium text-gray-500 line-through text-xs">$5.99</span>
                    <span className="ml-1 font-semibold text-indigo-600 text-sm">FREE</span>
                  </div>
                </div>

                <div className="mt-6 flex items-end justify-between">
                  <img src="/assets/images/icons/satisfaction-badge.jpg" alt="100% Satisfaction Badge" className="w-24 h-24" />
                  <div className="flex-1 ml-4">
                    <div className="flex items-end justify-between mb-2">
                      <div className="px-2.5 py-1 bg-indigo-600 text-white text-xs font-medium rounded-lg">as low as $19.19/mo</div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg text-gray-500 line-through">$238.81</span>
                        <span className="text-2xl font-bold text-indigo-600">$187.89</span>
                      </div>
                    </div>
                    <div className="text-center text-teal-500 font-medium text-xs mb-2">
                      Congrats! You're saving $50.92 on your security bundle!
                    </div>
                    <button className="w-full py-2.5 bg-indigo-600 text-white font-semibold text-base rounded hover:bg-indigo-700 transition-colors">
                      Checkout
                    </button>
                    <div className="text-center text-gray-600 underline text-xs mt-2">
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
