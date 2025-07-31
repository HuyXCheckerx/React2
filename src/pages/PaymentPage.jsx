import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check, Clock, MessageCircle, RefreshCw, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import QRCode from 'qrcode.react';
import { getCryptoRates, convertUSDToCrypto, useCryptoRates, calculateCryptoWithFee } from '@/lib/crypto.jsx';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { rates } = useCryptoRates();
  const [paymentData, setPaymentData] = useState(null);
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    const savedPayment = localStorage.getItem('cryonerat-payment');
    if (savedPayment) {
      setPaymentData(JSON.parse(savedPayment));
    } else {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    if (!paymentData) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [paymentData]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: "Copied!", description: "Address copied to clipboard." });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCheckPayment = () => {
    setIsChecking(true);
    setTimeout(() => {
      setIsChecking(false);
      localStorage.setItem('cryonerat-last-check-status', 'not_found');
      navigate('/payment-status');
    }, 3000);
  };

  if (!paymentData) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-12 h-12 animate-spin text-cyan-400"/></div>;

  const { crypto, totalUSD, cart, appliedCoupon } = paymentData;
  const cryptoWithFee = calculateCryptoWithFee(totalUSD, crypto.symbol);
  const cryptoAmount = cryptoWithFee.totalAmount.toFixed(8);
  const progressPercentage = ((600 - timeLeft) / 600) * 100;
  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
  
  return (
    <div className="min-h-screen pt-20 pb-10">
      <div className="container mx-auto px-6 max-w-lg">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Button variant="outline" onClick={() => navigate('/checkout')} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>

          <Card className="card-border-glow text-center">
            <CardHeader>
               <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" stroke="rgba(51, 255, 204, 0.2)" strokeWidth="6" fill="transparent" />
                  <motion.circle
                    cx="50" cy="50" r="45" stroke="#33ffcc" strokeWidth="6" fill="transparent"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * progressPercentage) / 100}
                    transition={{ duration: 1, ease: "linear" }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-cyan-400 font-orbitron text-2xl font-bold">{formatTime(timeLeft)}</div>
              </div>
              <CardTitle className="font-orbitron text-3xl text-glow-cyan">Complete Payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-gray-300">Send exactly:</p>
                <div className="text-2xl md:text-3xl font-bold text-white my-2 flex items-center justify-center gap-2">
                  <span>{cryptoAmount} {crypto.symbol}</span>
                  <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => copyToClipboard(cryptoAmount)}>
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                <p className="text-gray-400 text-sm">(~${totalUSD.toFixed(2)})</p>
                <p className="text-gray-500 text-xs mt-1">
                  Rate: 1 {crypto.symbol} = ${rates[crypto.symbol]?.toFixed(2)} USD
                </p>
                
                {/* Fee Breakdown */}
                <div className="text-xs text-gray-500 mt-2 space-y-1 bg-black/20 p-2 rounded">
                  <div>Base amount: {cryptoWithFee.baseAmount.toFixed(8)} {crypto.symbol}</div>
                  <div>Fee (2%): +{cryptoWithFee.feeAmount.toFixed(8)} {crypto.symbol}</div>
                  <div className="text-cyan-400 font-semibold">Total: {cryptoAmount} {crypto.symbol}</div>
                </div>
                
                {/* Coupon Information */}
                {appliedCoupon && (
                  <div className="text-xs text-green-400 mt-2 bg-green-500/10 p-2 rounded">
                    <div>Coupon applied: {appliedCoupon.coupon.description}</div>
                    <div>Saved: ${appliedCoupon.discountAmount.toFixed(2)} ({appliedCoupon.discount}% off)</div>
                  </div>
                )}
              </div>

              <div className="p-4 bg-cyan-500/10 rounded-lg">
                <div className="flex justify-center items-center mb-4 p-4 bg-white rounded-lg">
                  <QRCode value={crypto.address} size={160} bgColor="#ffffff" fgColor="#000000" />
                </div>
                <p className="text-sm text-gray-400 mb-2">To this {crypto.network} address:</p>
                <div className="flex items-center justify-center bg-black/50 p-2 rounded-md">
                   <p className="text-sm font-mono break-all text-cyan-400">{crypto.address}</p>
                   <Button size="icon" variant="ghost" className="h-8 w-8 ml-2 flex-shrink-0" onClick={() => copyToClipboard(crypto.address)}>
                      <Copy className="w-4 h-4" />
                   </Button>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button className="w-full font-orbitron uppercase bg-cyan-400 text-black hover:bg-cyan-300 font-bold" onClick={handleCheckPayment} disabled={isChecking}>
                  {isChecking ? <><Loader2 className="animate-spin mr-2"/>Checking...</> : <><RefreshCw className="w-4 h-4 mr-2"/>I've Sent Payment</>}
                </Button>
                <a href="https://t.me/pillowware" target="_blank" rel="noopener noreferrer" className="w-full inline-block">
                  <Button variant="outline" className="w-full">
                    <MessageCircle className="w-4 h-4 mr-2"/> Contact Support
                  </Button>
                </a>
              </div>
              <p className="text-xs text-gray-500">Do not close this window. Your order will be processed after payment confirmation.</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentPage;