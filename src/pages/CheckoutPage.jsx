import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Plus, Minus, CreditCard, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { cryptoOptions, getCryptoRates, convertUSDToCrypto, validateConversion, fetchCryptoRates, useCryptoRates, calculateCryptoWithFee, validateCoupon, calculatePriceWithCoupon } from '@/lib/crypto.jsx';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cryonerat-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [contactInfo, setContactInfo] = useState({
    telegram: '',
    discord: '',
    email: ''
  });

  const [step, setStep] = useState(1);
  const [selectedCrypto, setSelectedCrypto] = useState(cryptoOptions[0].id);
  const [isProcessing, setIsProcessing] = useState(false);
  const { rates, isLoading: isRefreshingRates, refreshRates } = useCryptoRates();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  useEffect(() => {
    if (cart.length === 0 && !isProcessing) {
      navigate('/');
    }
  }, [cart, navigate, isProcessing]);

  useEffect(() => {
    localStorage.setItem('cryonerat-cart', JSON.stringify(cart));
  }, [cart]);

  const updateQuantity = (cartId, quantity) => {
    if (quantity < 1) {
      removeFromCart(cartId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.cartId === cartId ? { ...item, quantity } : item
    ));
  };

  const removeFromCart = (cartId) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const getTotalPrice = () => {
    const baseTotal = cart.reduce((total, item) => total + (item.selectedOption.price * item.quantity), 0);
    if (appliedCoupon) {
      return appliedCoupon.discountedPrice;
    }
    return baseTotal;
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }

    const coupon = validateCoupon(couponCode);
    if (!coupon) {
      setCouponError('Invalid coupon code');
      return;
    }

    const baseTotal = cart.reduce((total, item) => total + (item.selectedOption.price * item.quantity), 0);
    const priceWithCoupon = calculatePriceWithCoupon(baseTotal, couponCode);
    
    setAppliedCoupon(priceWithCoupon);
    setCouponError('');
    setCouponCode('');
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError('');
  };
  
  const handleProceed = () => {
    if (step === 1) {
      if (!contactInfo.telegram.trim()) {
        // Don't show toast, just return - validation will be shown inline
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setIsProcessing(true);
      const paymentData = {
        cart,
        contactInfo,
        crypto: cryptoOptions.find(c => c.id === selectedCrypto),
        totalUSD: getTotalPrice(),
        appliedCoupon,
        timestamp: new Date().toISOString()
      };
      
      localStorage.setItem('cryonerat-payment', JSON.stringify(paymentData));

      setTimeout(() => {
          navigate('/payment');
          setIsProcessing(false);
      }, 1500);
    }
  };
  
  const totalPrice = getTotalPrice();
  const selectedCryptoInfo = cryptoOptions.find(c => c.id === selectedCrypto);
  const cryptoWithFee = calculateCryptoWithFee(totalPrice, selectedCryptoInfo?.symbol);
  const cryptoPrice = cryptoWithFee.totalAmount.toFixed(8);
  
  // Debug conversion accuracy
  if (selectedCryptoInfo?.symbol) {
    const validation = validateConversion(totalPrice, selectedCryptoInfo.symbol);
    console.log('Conversion validation:', validation);
  }

  return (
    <div className="min-h-screen pt-32 pb-10">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div key="step1" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} transition={{ duration: 0.3 }}>
                        <Card className="card-border-glow">
                          <CardHeader>
                            <CardTitle className="font-orbitron text-2xl text-glow-cyan">1. Your Order</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {cart.map((item) => (
                              <div key={item.cartId} className="flex items-center justify-between p-3 bg-cyan-500/5 rounded-lg">
                                <div>
                                  <h3 className="font-semibold text-white">{item.name}</h3>
                                  <p className="text-gray-400 text-sm">{item.selectedOption.name}</p>
                                  <p className="text-cyan-400 font-semibold mt-1">${item.selectedOption.price.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button size="icon" variant="outline" className="w-7 h-7" onClick={() => updateQuantity(item.cartId, item.quantity - 1)}><Minus className="w-4 h-4" /></Button>
                                  <span className="w-8 text-center">{item.quantity}</span>
                                  <Button size="icon" variant="outline" className="w-7 h-7" onClick={() => updateQuantity(item.cartId, item.quantity + 1)}><Plus className="w-4 h-4" /></Button>
                                  <Button size="icon" variant="destructive" className="w-7 h-7" onClick={() => removeFromCart(item.cartId)}><Trash2 className="w-4 h-4" /></Button>
                                </div>
                              </div>
                            ))}
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}
                    {step === 2 && (
                       <motion.div key="step2" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} transition={{ duration: 0.3 }}>
                        <Card className="card-border-glow">
                          <CardHeader>
                            <CardTitle className="font-orbitron text-2xl text-glow-cyan">2. Payment Method</CardTitle>
                          </CardHeader>
                          <CardContent>
                             <p className="text-gray-300 mb-4">Choose your preferred cryptocurrency.</p>
                             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                               {cryptoOptions.map(crypto => (
                                 <motion.button 
                                   key={crypto.id}
                                   onClick={() => setSelectedCrypto(crypto.id)}
                                   className={`p-3 rounded-lg border-2 transition-all duration-200 ${selectedCrypto === crypto.id ? 'border-cyan-400 bg-cyan-500/20 shadow-lg shadow-cyan-500/20' : 'border-gray-700 bg-gray-800/50 hover:border-gray-500'}`}
                                   whileHover={{ scale: 1.05 }}
                                   whileTap={{ scale: 0.95 }}
                                 >
                                    <div className="text-4xl">{crypto.icon}</div>
                                    <div className="font-semibold mt-2 text-white">{crypto.symbol}</div>
                                    <div className="text-xs text-gray-400">{crypto.network}</div>
                                 </motion.button>
                               ))}
                             </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}
                </AnimatePresence>
              </div>

              <div className="lg:col-span-2">
                <Card className="card-border-glow sticky top-32">
                  <CardHeader>
                    <CardTitle className="font-orbitron text-2xl text-glow-cyan">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AnimatePresence mode="wait">
                      <motion.div key={step} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        {step === 1 && (
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="telegram" className="text-sm font-medium text-cyan-400">Telegram*</Label>
                              <Input 
                                id="telegram" 
                                placeholder="@username" 
                                value={contactInfo.telegram} 
                                onChange={(e) => setContactInfo(p => ({...p, telegram: e.target.value}))} 
                                className={`mt-1 bg-black/50 border-cyan-400/30 focus:border-cyan-400 ${!contactInfo.telegram.trim() && 'border-red-500'}`}
                              />
                              {!contactInfo.telegram.trim() && (
                                <p className="text-red-500 text-xs mt-1">Telegram username is required for order delivery</p>
                              )}
                            </div>
                            <div>
                              <Label htmlFor="discord" className="text-sm font-medium text-gray-400">Discord (Optional)</Label>
                              <Input id="discord" placeholder="username#1234" value={contactInfo.discord} onChange={(e) => setContactInfo(p => ({...p, discord: e.target.value}))} className="mt-1 bg-black/50 border-cyan-400/30 focus:border-cyan-400"/>
                            </div>
                             <div>
                              <Label htmlFor="email" className="text-sm font-medium text-gray-400">Email (Optional)</Label>
                              <Input id="email" type="email" placeholder="your@email.com" value={contactInfo.email} onChange={(e) => setContactInfo(p => ({...p, email: e.target.value}))} className="mt-1 bg-black/50 border-cyan-400/30 focus:border-cyan-400"/>
                            </div>
                            
                            {/* Coupon Code Section */}
                            <div>
                              <Label htmlFor="coupon" className="text-sm font-medium text-gray-400">Coupon Code</Label>
                              <div className="flex gap-2 mt-1">
                                <Input 
                                  id="coupon" 
                                  placeholder="Enter coupon code" 
                                  value={couponCode} 
                                  onChange={(e) => setCouponCode(e.target.value)} 
                                  className="flex-1 bg-black/50 border-cyan-400/30 focus:border-cyan-400"
                                  onKeyPress={(e) => e.key === 'Enter' && handleApplyCoupon()}
                                />
                                <Button 
                                  onClick={handleApplyCoupon} 
                                  className="bg-cyan-400 text-black hover:bg-cyan-300"
                                  disabled={!couponCode.trim()}
                                >
                                  Apply
                                </Button>
                              </div>
                              {couponError && <p className="text-red-500 text-xs mt-1">{couponError}</p>}
                              {appliedCoupon && (
                                <div className="mt-2 p-2 bg-green-500/10 border border-green-500/30 rounded">
                                  <div className="flex justify-between items-center">
                                    <span className="text-green-400 text-sm">
                                      Coupon applied: {appliedCoupon.coupon.description} (-{appliedCoupon.discount}%)
                                    </span>
                                    <Button 
                                      onClick={removeCoupon} 
                                      size="sm" 
                                      variant="ghost" 
                                      className="text-red-400 hover:text-red-300"
                                    >
                                      ✕
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                        {step === 2 && (
                          <div className="space-y-4 text-center">
                            <p className="text-gray-300">You are paying with:</p>
                             <div className="flex items-center justify-center gap-4 p-4 bg-cyan-500/10 rounded-lg">
                               <div className="text-5xl">{selectedCryptoInfo.icon}</div>
                               <div>
                                  <div className="text-xl font-bold text-white">{selectedCryptoInfo.name}</div>
                                  <div className="text-sm text-gray-400">{selectedCryptoInfo.network}</div>
                               </div>
                             </div>
                             <div className="text-cyan-400 text-lg">
                              <span className="font-semibold">{cryptoPrice} {selectedCryptoInfo.symbol}</span>
                              <div className="text-xs text-gray-400 mt-1">
                                Rate: 1 {selectedCryptoInfo.symbol} = ${rates[selectedCryptoInfo.symbol]?.toFixed(2)} USD
                                {isRefreshingRates && <span className="ml-2 text-cyan-400">🔄</span>}
                                <button 
                                  onClick={refreshRates}
                                  className="ml-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                                  disabled={isRefreshingRates}
                                >
                                  {isRefreshingRates ? '🔄' : '↻'}
                                </button>
                              </div>
                              {/* Fee Breakdown */}
                              <div className="text-xs text-gray-500 mt-2 space-y-1">
                                <div>Base amount: {cryptoWithFee.baseAmount.toFixed(8)} {selectedCryptoInfo.symbol}</div>
                                <div>Fee ({cryptoWithFee.feePercentage}%): +{cryptoWithFee.feeAmount.toFixed(8)} {selectedCryptoInfo.symbol}</div>
                                <div className="text-cyan-400 font-semibold">Total: {cryptoPrice} {selectedCryptoInfo.symbol}</div>
                              </div>
                             </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>

                    <div className="border-t border-cyan-400/30 my-6"></div>

                    <div className="flex justify-between items-center text-lg mb-6">
                      <span className="text-white font-semibold">Total:</span>
                      <div className="text-right">
                        {appliedCoupon && (
                          <div className="text-sm text-gray-400 line-through">
                            ${appliedCoupon.originalPrice.toFixed(2)}
                          </div>
                        )}
                        <span className="text-2xl font-bold text-glow-cyan">${totalPrice.toFixed(2)}</span>
                        {appliedCoupon && (
                          <div className="text-xs text-green-400">
                            Saved ${appliedCoupon.discountAmount.toFixed(2)} ({appliedCoupon.discount}% off)
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-4">
                      {step === 2 && (
                        <Button variant="outline" className="w-full" onClick={() => setStep(1)}>Back</Button>
                      )}
                      <Button className="w-full font-orbitron uppercase bg-cyan-400 text-black hover:bg-cyan-300 font-bold text-base" onClick={handleProceed} disabled={isProcessing}>
                        {isProcessing ? <Loader2 className="animate-spin mr-2" /> : step === 1 ? 'Continue' : <><CreditCard className="w-4 h-4 mr-2"/>Confirm & Pay</>}
                      </Button>
                    </div>
                    <Button variant="ghost" className="w-full mt-4 text-gray-400" onClick={() => navigate('/')}>Cancel Order</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CheckoutPage;