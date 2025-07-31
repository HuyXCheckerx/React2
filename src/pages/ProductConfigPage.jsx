import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Check, Star, ShoppingCart, ArrowLeft } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { productsData } from '@/lib/products.jsx';

const ProductConfigPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cryonerat-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [selectedStyle, setSelectedStyle] = useState(null);
  const [selectedSetup, setSelectedSetup] = useState(null);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const product = productsData.find(p => p.id === productId);

  // Product-specific review data
  const getProductReviews = () => {
    switch (productId) {
      case 'web3-drainer':
        return { rating: 4.2, reviews: 156, text: "4.2/5 from 156 reviews" };
      case 'venom-rat':
        return { rating: 4.7, reviews: 89, text: "4.7/5 from 89 reviews" };
      case 'custom-malware':
        return { rating: 4.5, reviews: 203, text: "4.5/5 from 203 reviews" };
      case 'bulletproof-vps':
        return { rating: 4.8, reviews: 342, text: "4.8/5 from 342 reviews" };
      case 'banking-trojan':
        return { rating: 4.3, reviews: 127, text: "4.3/5 from 127 reviews" };
      case 'data-destroyer':
        return { rating: 4.6, reviews: 78, text: "4.6/5 from 78 reviews" };
      default:
        return { rating: 4.0, reviews: 50, text: "4.0/5 from 50 reviews" };
    }
  };

  useEffect(() => {
    localStorage.setItem('cryonerat-cart', JSON.stringify(cart));
  }, [cart]);

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Product Not Found</h1>
        <Button onClick={() => navigate('/')}>Go Home</Button>
      </div>
    </div>;
  }

  // Product-specific configuration options
  const getStyleOptions = () => {
    switch (productId) {
      case 'web3-drainer':
        return [
          { id: 'exe', name: 'EXE Drainer', description: 'Executable-based drainer for direct deployment', image: 'https://via.placeholder.com/200x150/0a0a0a/33ffcc.png?text=EXE+Drainer', price: 0 },
          { id: 'site', name: 'Site Drainer', description: 'Web-based drainer with custom domain', image: 'https://via.placeholder.com/200x150/0a0a0a/33ffcc.png?text=Site+Drainer', price: 0 },
          { id: 'both', name: 'Both (Bestseller)', description: 'Complete package with EXE and site versions', image: 'https://via.placeholder.com/200x150/0a0a0a/33ffcc.png?text=Both+Package', price: 0, popular: true }
        ];
      case 'venom-rat':
        return [
          { id: 'basic', name: 'Basic RAT', description: 'Core remote administration features', image: 'https://via.placeholder.com/200x150/0a0a0a/33ffcc.png?text=Basic+RAT', price: 0 },
          { id: 'advanced', name: 'Advanced RAT', description: 'Full feature set with HVNC', image: 'https://via.placeholder.com/200x150/0a0a0a/33ffcc.png?text=Advanced+RAT', price: 0 },
          { id: 'premium', name: 'Premium RAT (Bestseller)', description: 'Complete suite with all modules', image: 'https://via.placeholder.com/200x150/0a0a0a/33ffcc.png?text=Premium+RAT', price: 0, popular: true }
        ];
      case 'custom-malware':
        return [
          { id: 'banking', name: 'Banking Trojan', description: 'Specialized banking malware with web injects', image: 'https://via.placeholder.com/200x150/0a0a0a/33ffcc.png?text=Banking+Trojan', price: 0 },
          { id: 'crypto', name: 'Crypto Miner', description: 'Silent cryptocurrency mining payload', image: 'https://via.placeholder.com/200x150/0a0a0a/33ffcc.png?text=Crypto+Miner', price: 0 },
          { id: 'full', name: 'Full Suite (Bestseller)', description: 'Complete malware toolkit with all modules', image: 'https://via.placeholder.com/200x150/0a0a0a/33ffcc.png?text=Full+Suite', price: 0, popular: true }
        ];
      case 'bulletproof-vps':
        return [
          { id: 'basic', name: 'Basic VPS', description: 'Standard offshore hosting with basic protection', image: 'https://via.placeholder.com/200x150/0a0a0a/33ffcc.png?text=Basic+VPS', price: 0 },
          { id: 'pro', name: 'Pro VPS', description: 'Enhanced hosting with DDoS protection', image: 'https://via.placeholder.com/200x150/0a0a0a/33ffcc.png?text=Pro+VPS', price: 0 },
          { id: 'elite', name: 'Elite VPS (Bestseller)', description: 'Premium hosting with full anonymity', image: 'https://via.placeholder.com/200x150/0a0a0a/33ffcc.png?text=Elite+VPS', price: 0, popular: true }
        ];
      case 'banking-trojan':
        return [
          { id: 'basic', name: 'Basic Trojan', description: 'Core banking trojan with essential features', image: 'https://via.placeholder.com/200x150/0a0a0a/33ffcc.png?text=Basic+Trojan', price: 0 },
          { id: 'advanced', name: 'Advanced Trojan', description: 'Enhanced trojan with web injects', image: 'https://via.placeholder.com/200x150/0a0a0a/33ffcc.png?text=Advanced+Trojan', price: 0 },
          { id: 'premium', name: 'Premium Trojan (Bestseller)', description: 'Complete banking suite with all features', image: 'https://via.placeholder.com/200x150/0a0a0a/33ffcc.png?text=Premium+Trojan', price: 0, popular: true }
        ];
      case 'data-destroyer':
        return [
          { id: 'single', name: 'Single Use', description: 'One-time data destruction tool', image: 'https://via.placeholder.com/200x150/0a0a0a/33ffcc.png?text=Single+Use', price: 0 },
          { id: 'pack', name: '10-Pack License', description: 'Multiple use license for repeated operations', image: 'https://via.placeholder.com/200x150/0a0a0a/33ffcc.png?text=10-Pack+License', price: 0 },
          { id: 'unlimited', name: 'Unlimited (Bestseller)', description: 'Unlimited data destruction operations', image: 'https://via.placeholder.com/200x150/0a0a0a/33ffcc.png?text=Unlimited', price: 0, popular: true }
        ];
      default:
        return [
          { id: 'standard', name: 'Standard', description: 'Basic package with core features', image: 'https://via.placeholder.com/200x150/0a0a0a/33ffcc.png?text=Standard', price: 0 },
          { id: 'pro', name: 'Professional', description: 'Enhanced features and support', image: 'https://via.placeholder.com/200x150/0a0a0a/33ffcc.png?text=Professional', price: 0 },
          { id: 'enterprise', name: 'Enterprise (Bestseller)', description: 'Complete solution with all features', image: 'https://via.placeholder.com/200x150/0a0a0a/33ffcc.png?text=Enterprise', price: 0, popular: true }
        ];
    }
  };

  const getSetupOptions = () => [
    { id: 'vc', name: 'Setup + Detailed Help via VC', description: 'Full setup assistance with video call support', price: 150 },
    { id: 'none', name: 'None', description: 'Self-installation with documentation', price: 0 }
  ];

  const getSubscriptionOptions = () => [
    { id: 'monthly', name: '1 Month', description: 'Monthly subscription with updates', price: 0 },
    { id: 'lifetime', name: 'Lifetime', description: 'One-time purchase with lifetime access', price: 200, popular: true }
  ];

  const calculateTotalPrice = () => {
    let basePrice = product.options.find(o => o.popular)?.price || product.options[0].price;
    let setupPrice = selectedSetup?.price || 0;
    let subscriptionPrice = selectedSubscription?.price || 0;
    
    let total = basePrice + setupPrice + subscriptionPrice;
    
    if (isSubscribed) {
      total = total * 0.85; // 15% discount for subscription
    }
    
    return total;
  };

  const calculateSavings = () => {
    let basePrice = product.options.find(o => o.popular)?.price || product.options[0].price;
    let setupPrice = selectedSetup?.price || 0;
    let subscriptionPrice = selectedSubscription?.price || 0;
    
    let originalTotal = basePrice + setupPrice + subscriptionPrice;
    let discountedTotal = calculateTotalPrice();
    
    return originalTotal - discountedTotal;
  };

  const handleAddToCart = () => {
    if (!selectedStyle || !selectedSetup || !selectedSubscription) {
      toast({
        title: "Configuration Incomplete",
        description: "Please select all required options before adding to cart.",
        className: 'bg-red-500 border-red-400 text-white'
      });
      return;
    }

    const cartItem = {
      ...product,
      selectedStyle,
      selectedSetup,
      selectedSubscription,
      isSubscribed,
      totalPrice: calculateTotalPrice(),
      cartId: `${product.id}-${selectedStyle.id}-${selectedSetup.id}-${selectedSubscription.id}`
    };

    setCart(prev => {
      const existing = prev.find(item => item.cartId === cartItem.cartId);
      if (existing) {
        return prev.map(item => 
          item.cartId === cartItem.cartId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...cartItem, quantity: 1 }];
    });
    
    toast({
      title: "Added to Cart! 🛒",
      description: `${product.name} configuration has been added.`,
      className: 'bg-black border-cyan-400 text-white'
    });
    
    navigate('/checkout');
  };

  const styleOptions = getStyleOptions();
  const setupOptions = getSetupOptions();
  const subscriptionOptions = getSubscriptionOptions();
  const totalPrice = calculateTotalPrice();
  const savings = calculateSavings();
  const productReviews = getProductReviews();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation cart={cart} setCart={setCart} />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-6 py-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-6 text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Side - Product Display */}
            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <h1 className="font-orbitron text-4xl font-bold uppercase text-glow-cyan mb-4">
                  {product.name}
                </h1>
                <div className="flex items-center justify-center lg:justify-start mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < productReviews.rating ? 'fill-current' : ''}`} />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-400">{productReviews.text}</span>
                </div>
                <p className="text-gray-300 text-lg">
                  {product.description}
                </p>
              </div>
              
              <div className="w-full h-64 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                <div className="text-6xl text-cyan-400">
                  {product.icon}
                </div>
              </div>
            </div>

            {/* Right Side - Bundle Builder */}
            <div className="space-y-8">
              <div>
                <h2 className="font-orbitron text-2xl font-bold uppercase text-white mb-6">
                  Bundle Builder
                </h2>
              </div>

              {/* STEP 1: CHOOSE YOUR STYLE */}
              <div>
                <h3 className="font-orbitron text-lg font-bold uppercase text-cyan-400 mb-4">
                  STEP 1: CHOOSE YOUR STYLE
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {styleOptions.map((style) => (
                    <motion.div
                      key={style.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all ${
                        selectedStyle?.id === style.id
                          ? 'border-cyan-400 bg-cyan-400/10'
                          : 'border-gray-600 hover:border-cyan-400/50'
                      }`}
                      onClick={() => setSelectedStyle(style)}
                    >
                      {style.popular && (
                        <div className="absolute -top-2 -right-2 bg-cyan-400 text-black text-xs font-bold px-2 py-1 rounded">
                          Bestseller
                        </div>
                      )}
                      <img src={style.image} alt={style.name} className="w-full h-24 object-cover rounded mb-3" />
                      <h4 className="font-bold text-white mb-1">{style.name}</h4>
                      <p className="text-sm text-gray-400">{style.description}</p>
                      {selectedStyle?.id === style.id && (
                        <Check className="absolute top-2 right-2 w-5 h-5 text-cyan-400" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* STEP 2: SETUP OPTIONS */}
              <div>
                <h3 className="font-orbitron text-lg font-bold uppercase text-cyan-400 mb-4">
                  STEP 2: SETUP OPTIONS
                </h3>
                <div className="space-y-3">
                  {setupOptions.map((setup) => (
                    <motion.div
                      key={setup.id}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all ${
                        selectedSetup?.id === setup.id
                          ? 'border-cyan-400 bg-cyan-400/10'
                          : 'border-gray-600 hover:border-cyan-400/50'
                      }`}
                      onClick={() => setSelectedSetup(setup)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-bold text-white">{setup.name}</h4>
                          <p className="text-sm text-gray-400">{setup.description}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-cyan-400 font-bold">
                            {setup.price > 0 ? `+$${setup.price}` : 'Free'}
                          </span>
                        </div>
                      </div>
                      {selectedSetup?.id === setup.id && (
                        <Check className="absolute top-2 right-2 w-5 h-5 text-cyan-400" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* SUBSCRIPTION OPTIONS */}
              <div>
                <h3 className="font-orbitron text-lg font-bold uppercase text-cyan-400 mb-4">
                  SUBSCRIPTION OPTIONS
                </h3>
                <div className="space-y-3">
                  {subscriptionOptions.map((subscription) => (
                    <motion.div
                      key={subscription.id}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all ${
                        selectedSubscription?.id === subscription.id
                          ? 'border-cyan-400 bg-cyan-400/10'
                          : 'border-gray-600 hover:border-cyan-400/50'
                      }`}
                      onClick={() => setSelectedSubscription(subscription)}
                    >
                      {subscription.popular && (
                        <div className="absolute -top-2 -right-2 bg-cyan-400 text-black text-xs font-bold px-2 py-1 rounded">
                          Popular
                        </div>
                      )}
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-bold text-white">{subscription.name}</h4>
                          <p className="text-sm text-gray-400">{subscription.description}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-cyan-400 font-bold">
                            {subscription.price > 0 ? `+$${subscription.price}` : 'Included'}
                          </span>
                        </div>
                      </div>
                      {selectedSubscription?.id === subscription.id && (
                        <Check className="absolute top-2 right-2 w-5 h-5 text-cyan-400" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* SUBSCRIBE & SAVE */}
              <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg p-4 border border-cyan-400/30">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-white">SUBSCRIBE & SAVE</h4>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={isSubscribed}
                      onChange={(e) => setIsSubscribed(e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-400/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-400"></div>
                  </label>
                </div>
                <div className="text-sm text-gray-300 space-y-1">
                  <p>• Save 15% on future orders</p>
                  <p>• Skip or cancel anytime</p>
                  <p>• Free shipping always</p>
                </div>
              </div>

              {/* PRICE DISPLAY */}
              {savings > 0 && (
                <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-3 text-center">
                  <span className="text-yellow-400 font-bold">You're saving ${savings.toFixed(2)}</span>
                </div>
              )}

              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-6">
                  ${totalPrice.toFixed(2)}
                </div>
                <Button
                  className="w-full font-orbitron uppercase bg-cyan-400 text-black hover:bg-cyan-300 font-bold py-4 text-lg"
                  onClick={handleAddToCart}
                  disabled={!selectedStyle || !selectedSetup || !selectedSubscription}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  ADD TO CART
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductConfigPage; 