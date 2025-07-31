
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Crown, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

const PricingSection = () => {
  const { toast } = useToast();

  const plans = [
    {
      name: "Starter",
      price: 99,
      duration: "month",
      description: "Perfect for beginners",
      icon: <Zap className="w-6 h-6" />,
      features: [
        "Basic RAT tools",
        "Email support",
        "Basic tutorials",
        "Community access",
        "Monthly updates"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: 299,
      duration: "month",
      description: "For serious operators",
      icon: <Crown className="w-6 h-6" />,
      features: [
        "Advanced RAT suite",
        "Web3 drainer tools",
        "Priority support",
        "Advanced tutorials",
        "Private community",
        "Weekly updates",
        "Custom builds"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: 999,
      duration: "month",
      description: "Maximum capabilities",
      icon: <Rocket className="w-6 h-6" />,
      features: [
        "Full tool arsenal",
        "Custom development",
        "24/7 dedicated support",
        "Private training",
        "Exclusive tools",
        "Daily updates",
        "Source code access",
        "Team collaboration"
      ],
      popular: false
    }
  ];

  const handleSelectPlan = (plan) => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
      description: `${plan.name} plan selection coming soon.`,
    });
  };

  return (
    <section id="pricing" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-glow">
            Choose Your Arsenal
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Select the perfect plan for your operational needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`relative ${plan.popular ? 'scale-105' : ''}`}
            >
              <Card className={`glass-effect border-purple-500/30 hover:glow-effect transition-all duration-300 h-full ${
                plan.popular ? 'border-red-500/50 glow-effect-red' : ''
              }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-red-500 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <div className={`mx-auto mb-4 p-3 rounded-full ${
                    plan.popular ? 'bg-red-500/20 text-red-400' : 'bg-purple-500/20 text-purple-400'
                  }`}>
                    {plan.icon}
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-400">
                    {plan.description}
                  </CardDescription>
                  <div className="mt-4">
                    <span className={`text-4xl font-bold ${
                      plan.popular ? 'text-red-400' : 'text-purple-400'
                    }`}>
                      ${plan.price}
                    </span>
                    <span className="text-gray-400 ml-2">/ {plan.duration}</span>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <Check className={`w-4 h-4 mr-3 flex-shrink-0 ${
                          plan.popular ? 'text-red-400' : 'text-purple-400'
                        }`} />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800' 
                        : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800'
                    }`}
                    onClick={() => handleSelectPlan(plan)}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
