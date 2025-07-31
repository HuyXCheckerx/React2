import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="relative py-10 border-t border-cyan-400/20 bg-black/30 mt-20">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="font-orbitron text-2xl font-black uppercase text-glow-cyan mb-4">
            Cryoner<span className="text-white">RAT</span>
          </div>
          <div className="flex justify-center space-x-6 mb-4 font-orbitron uppercase text-sm">
            <a href="#products" className="text-gray-400 hover:text-cyan-400 transition-colors">Products</a>
            <button onClick={() => navigate('/terms')} className="text-gray-400 hover:text-cyan-400 transition-colors">Terms of Service</button>
            <a href="https://t.me/pillowware" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">Contact</a>
          </div>
          <p className="text-gray-500 text-sm">
            © 2025 CryonerRAT. All Rights Reserved. Products are for educational and research purposes only.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;