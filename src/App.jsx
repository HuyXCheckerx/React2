import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import HomePage from '@/pages/HomePage';
import CheckoutPage from '@/pages/CheckoutPage';
import PaymentPage from '@/pages/PaymentPage';
import PaymentStatusPage from '@/pages/PaymentStatusPage';
import TermsPage from '@/pages/TermsPage';
import NotFoundPage from '@/pages/NotFoundPage';
import ProductConfigPage from '@/pages/ProductConfigPage';
import DarkVeil from "./DarkVeil";

function App() {
  return (
    <Router>
      <Helmet>
        <title>CryonerRAT - Premium RAT Services & Tools</title>
        <meta name="description" content="Professional RAT services, tools, and kits. Web3 drainers, malware, trojans, and spyware solutions for advanced users." />
      </Helmet>
      
      <div className="fixed inset-0 z-0">
        <DarkVeil 
          speed={2}
          hueShift={256}
          
        />
      </div>

      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:productId" element={<ProductConfigPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/payment-status" element={<PaymentStatusPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;