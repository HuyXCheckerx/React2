import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { productsData } from '@/lib/products.jsx';
import ScrollFloat from '@/ScrollFloat.jsx';

import GlitchText from '@/GlitchText';

const HomePage = () => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cryonerat-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cryonerat-cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation cart={cart} setCart={setCart} />
      
      <main className="flex-grow">
        <section className="relative pt-48 pb-32 text-center overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-orbitron text-5xl md:text-7xl font-black uppercase text-glow-cyan"
            >
              Cryoner<span className="text-white">RAT</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto"
            >
              Low on cash? We got you covered. Rat every mf on the internet with our premium RAT services.
              Made with &lt;3 by @pillowware
            </motion.p>
          </div>
        </section>

        <section id="products" className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="font-orbitron text-4xl font-bold uppercase text-glow-cyan">
                The Arsenal
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto mt-4">
                Select your weapon of choice. Each tool is crafted for peak performance and adaptability.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {productsData.map((product, index) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;