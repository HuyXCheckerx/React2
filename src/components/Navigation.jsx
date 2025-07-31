import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const Navigation = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const removeFromCart = (cartId) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (cartId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.cartId === cartId ? { ...item, quantity } : item
    ));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.selectedOption.price * item.quantity), 0).toFixed(2);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg border-b border-cyan-400/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="font-orbitron text-2xl font-black uppercase text-glow-cyan">
              Cryoner<span className="text-white">RAT</span>
            </div>
          </motion.div>

          <div className="hidden md:flex items-center space-x-8 font-orbitron uppercase text-sm">
            <a href="#products" className="text-gray-300 hover:text-cyan-400 transition-colors">
              Products
            </a>
            <button 
              onClick={() => navigate('/terms')}
              className="text-gray-300 hover:text-cyan-400 transition-colors"
            >
              Terms
            </button>
            <a href="https://t.me/pillowware" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-cyan-400 transition-colors">
              Contact
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon" className="relative border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-300">
                  <ShoppingCart className="w-5 h-5" />
                  {getTotalItems() > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-cyan-400 text-black text-xs px-1.5 py-0.5">
                      {getTotalItems()}
                    </Badge>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-black/80 backdrop-blur-xl border-cyan-400/50 text-white max-w-md">
                <DialogHeader>
                  <DialogTitle className="font-orbitron text-cyan-400 text-2xl">Shopping Cart</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                  {cart.length === 0 ? (
                    <p className="text-gray-400 text-center py-8">Your cart is empty.</p>
                  ) : (
                    <>
                      {cart.map((item) => (
                        <div key={item.cartId} className="flex items-center justify-between p-3 bg-gray-500/10 rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name} <span className="text-gray-400 text-sm">({item.selectedOption.name})</span></h4>
                            <p className="text-cyan-400 font-semibold">${item.selectedOption.price.toFixed(2)}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                              className="w-7 h-7 border-cyan-400/50 text-cyan-400"
                            >
                              -
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                              className="w-7 h-7 border-cyan-400/50 text-cyan-400"
                            >
                              +
                            </Button>
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => removeFromCart(item.cartId)}
                              className="w-7 h-7 border-red-500/50 text-red-500 hover:bg-red-500/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      <div className="border-t border-cyan-400/30 pt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-semibold text-lg">Total:</span>
                          <span className="text-xl font-bold text-cyan-400">${getTotalPrice()}</span>
                        </div>
                        <Button 
                          className="w-full font-orbitron uppercase bg-cyan-400 text-black hover:bg-cyan-300 font-bold"
                          onClick={() => {
                            if (cart.length > 0) {
                                setIsCartOpen(false);
                                navigate('/checkout');
                            }
                          }}
                        >
                          Proceed to Checkout
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </DialogContent>
            </Dialog>

            <Button
              variant="outline"
              size="icon"
              className="md:hidden border-cyan-400/50 text-cyan-400"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 space-y-4 border-t border-cyan-400/30 pt-4 font-orbitron uppercase text-center"
          >
            <a href="#products" className="block text-gray-300 hover:text-cyan-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
              Products
            </a>
            <button 
              onClick={() => { navigate('/terms'); setIsMenuOpen(false); }}
              className="block w-full text-gray-300 hover:text-cyan-400 transition-colors"
            >
              Terms
            </button>
             <a href="https://t.me/pillowware" target="_blank" rel="noopener noreferrer" className="block text-gray-300 hover:text-cyan-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
              Contact
            </a>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Navigation;