import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, index }) => {
  const navigate = useNavigate();

  const handleCustomizeClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="card-border-glow rounded-lg p-1 h-full flex flex-col group overflow-hidden">
        <div className="p-6 flex-grow flex flex-col">
          <div className="text-center mb-6">
            <div className="w-32 h-32 mx-auto mb-4 flex items-center justify-center text-cyan-400 floating-animation">
              <div className="w-full h-full relative">
                <div className="absolute inset-0 bg-cyan-500/10 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {product.icon}
                </div>
              </div>
            </div>
            <h3 className="font-orbitron text-2xl font-bold uppercase text-white">{product.name}</h3>
            <p className="text-gray-400 mt-2 text-sm">{product.tagline}</p>
          </div>
          
          <div className="text-center mb-6">
            <span className="font-orbitron text-4xl font-bold text-cyan-400 text-glow-cyan">
                ${product.options.find(o => o.popular)?.price || product.options[0].price}
            </span>
            <span className="text-gray-400"> / {product.options.find(o => o.popular)?.name || product.options[0].name}</span>
          </div>

          <ul className="space-y-2 mb-8 text-sm text-gray-300 list-disc list-inside">
            {product.features.slice(0, 3).map((feature, idx) => (
              <li key={idx}>
                <span>{feature}</span>
              </li>
            ))}
             <li>And more...</li>
          </ul>
        </div>
        
        <div className="p-6 pt-0 mt-auto">
          <Button 
            className="w-full font-orbitron uppercase bg-cyan-400 text-black hover:bg-cyan-300 font-bold py-3 text-base"
            onClick={handleCustomizeClick}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Customize & Buy
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;