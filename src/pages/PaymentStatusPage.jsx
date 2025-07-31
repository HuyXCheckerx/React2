import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Loader2, AlertTriangle, CheckCircle, MessageCircle, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PaymentStatusPage = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('checking'); // 'checking', 'not_found', 'confirmed'

  useEffect(() => {
    const lastStatus = localStorage.getItem('cryonerat-last-check-status');
    if (lastStatus === 'not_found') {
      setStatus('not_found');
    } else {
        // In a real app, you'd poll a backend. Here we simulate.
        const timer = setTimeout(() => setStatus('not_found'), 5000);
        return () => clearTimeout(timer);
    }
  }, []);
  
  const StatusContent = () => {
    switch (status) {
      case 'checking':
        return (
          <>
            <Loader2 className="w-16 h-16 text-cyan-400 animate-spin" />
            <p className="text-xl mt-4 text-white">Confirming your transaction on the blockchain...</p>
            <p className="text-gray-400 mt-2">This may take a few minutes.</p>
          </>
        );
      case 'not_found':
        return (
          <>
            <AlertTriangle className="w-16 h-16 text-yellow-400" />
            <p className="text-xl mt-4 text-white">Payment Not Detected</p>
            <p className="text-gray-400 mt-2 max-w-sm mx-auto">We couldn't find your transaction yet. It might still be processing. If the issue persists, please contact support with your transaction details.</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={() => navigate('/payment')}>Try Again</Button>
              <a href="https://t.me/pillowware" target="_blank" rel="noopener noreferrer">
                <Button variant="outline"><MessageCircle className="w-4 h-4 mr-2"/>Contact Support</Button>
              </a>
            </div>
          </>
        );
      case 'confirmed':
        return (
          <>
            <CheckCircle className="w-16 h-16 text-green-400" />
            <p className="text-xl mt-4 text-white">Payment Confirmed!</p>
            <p className="text-gray-400 mt-2">Your order has been processed. Check your Telegram for delivery details.</p>
             <div className="mt-6">
               <Button onClick={() => navigate('/')}><Home className="w-4 h-4 mr-2"/>Back to Home</Button>
             </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-10">
      <div className="container mx-auto px-6 max-w-lg">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <Card className="card-border-glow">
            <CardHeader className="text-center">
              <CardTitle className="font-orbitron text-3xl text-glow-cyan">Payment Status</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center text-center min-h-[300px]">
              <StatusContent />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentStatusPage;