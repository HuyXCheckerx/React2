
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Shield, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const VouchesSection = () => {
  const vouches = [
    {
      id: 1,
      name: "CyberGhost_47",
      rating: 5,
      comment: "Incredible tools, undetectable and powerful. Made my operations 10x more efficient.",
      service: "CryoRAT Premium",
      verified: true,
      date: "2024-01-15"
    },
    {
      id: 2,
      name: "DarkNet_King",
      rating: 5,
      comment: "Best web3 drainer on the market. Clean interface, reliable results.",
      service: "Web3 Drainer Kit",
      verified: true,
      date: "2024-01-12"
    },
    {
      id: 3,
      name: "ShadowOp_99",
      rating: 5,
      comment: "Professional grade malware, excellent support team. Highly recommended.",
      service: "Custom Malware",
      verified: true,
      date: "2024-01-10"
    },
    {
      id: 4,
      name: "PhantomHacker",
      rating: 5,
      comment: "Stealth capabilities are insane. Zero detection rate so far.",
      service: "Stealth Spyware",
      verified: true,
      date: "2024-01-08"
    },
    {
      id: 5,
      name: "CryptoReaper",
      rating: 5,
      comment: "Mining trojan works flawlessly. Great profit margins.",
      service: "Crypto Miner Trojan",
      verified: true,
      date: "2024-01-05"
    },
    {
      id: 6,
      name: "BankBuster_X",
      rating: 5,
      comment: "Banking trojan exceeded expectations. Clean data extraction.",
      service: "Banking Trojan",
      verified: true,
      date: "2024-01-03"
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
        }`}
      />
    ));
  };

  return (
    <section id="vouches" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-glow">
            Client Testimonials
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            See what our satisfied customers have to say
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vouches.map((vouch, index) => (
            <motion.div
              key={vouch.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="glass-effect border-purple-500/30 hover:glow-effect transition-all duration-300 h-full">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-red-500 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-sm">{vouch.name}</span>
                          {vouch.verified && (
                            <Shield className="w-4 h-4 text-green-400" />
                          )}
                        </div>
                        <div className="flex items-center space-x-1">
                          {renderStars(vouch.rating)}
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
                      {vouch.service}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    "{vouch.comment}"
                  </p>
                  
                  <div className="text-xs text-gray-500">
                    {new Date(vouch.date).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <div className="glass-effect rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-purple-400">
              Join Our Satisfied Customers
            </h3>
            <p className="text-gray-300 mb-6">
              Over 10,000+ successful operations completed with our tools
            </p>
            <div className="flex justify-center space-x-8 text-center">
              <div>
                <div className="text-3xl font-bold text-purple-400">10K+</div>
                <div className="text-sm text-gray-400">Happy Clients</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400">99.9%</div>
                <div className="text-sm text-gray-400">Success Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400">24/7</div>
                <div className="text-sm text-gray-400">Support</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VouchesSection;
