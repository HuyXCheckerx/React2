import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';

const ProductDetailModal = ({ product, onAddToCart }) => {
  const [selectedOption, setSelectedOption] = useState(
    product.options.find(o => o.popular) || product.options[0]
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length);
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto">
      {/* Image Gallery */}
      <div className="p-4 md:p-8 bg-black/50 relative">
        <AnimatePresence mode="wait">
            <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="w-full aspect-video flex items-center justify-center"
            >
                <img 
                    src={product.images[currentImageIndex]}
                    alt={`${product.name} image ${currentImageIndex + 1}`}
                    className="max-h-full max-w-full object-contain rounded-lg shadow-2xl shadow-cyan-500/20"
                 src="https://images.unsplash.com/photo-1626682561113-d1db402cc866" />
            </motion.div>
        </AnimatePresence>
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
            <Button size="icon" variant="outline" onClick={handlePrevImage}><ArrowLeft/></Button>
            <div className="flex gap-2">
                {product.images.map((_, index) => (
                    <button key={index} onClick={() => setCurrentImageIndex(index)} className={`w-3 h-3 rounded-full transition-colors ${currentImageIndex === index ? 'bg-cyan-400' : 'bg-gray-600 hover:bg-gray-400'}`}></button>
                ))}
            </div>
            <Button size="icon" variant="outline" onClick={handleNextImage}><ArrowRight/></Button>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-6 md:p-8 flex flex-col">
        <h2 className="font-orbitron text-3xl font-bold uppercase text-glow-cyan">{product.name}</h2>
        <p className="text-gray-300 mt-2 mb-6">{product.description}</p>
        
        <div className="mb-6">
            <h3 className="font-semibold text-lg mb-3 text-cyan-400">Features:</h3>
            <ul className="space-y-2">
            {product.features.map((feature, idx) => (
                <li key={idx} className="flex items-start text-gray-300">
                <CheckCircle className="w-5 h-5 text-cyan-400 mr-3 mt-0.5 flex-shrink-0" />
                <span>{feature}</span>
                </li>
            ))}
            </ul>
        </div>

        <div className="mt-auto pt-6">
            <h3 className="font-semibold text-lg mb-3 text-cyan-400">Choose Your Package:</h3>
            <div className="space-y-3 mb-6">
            {product.options.map(option => (
                <motion.div
                key={option.name}
                onClick={() => setSelectedOption(option)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${selectedOption.name === option.name ? 'border-cyan-400 bg-cyan-500/20' : 'border-gray-700 hover:border-gray-500'}`}
                whileHover={{ scale: 1.02 }}
                >
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-white">{option.name}</span>
                    <span className="font-bold text-cyan-400 text-xl">${option.price}</span>
                </div>
                {option.popular && <div className="text-xs text-cyan-400 mt-1">Most Popular</div>}
                </motion.div>
            ))}
            </div>
        
            <Button 
                className="w-full font-orbitron uppercase bg-cyan-400 text-black hover:bg-cyan-300 font-bold py-3 text-lg"
                onClick={() => onAddToCart(product, selectedOption)}
            >
                Add to Cart - ${selectedOption.price}
            </Button>
        </div>

      </div>
    </div>
  );
};

export default ProductDetailModal;