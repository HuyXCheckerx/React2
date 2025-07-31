
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, AlertTriangle, Scale, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TermsPage = () => {
  const navigate = useNavigate();

  const sections = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Educational Purpose Only",
      content: [
        "All tools and services provided are strictly for educational and research purposes.",
        "Users must comply with all applicable local, state, and federal laws.",
        "CryonerRAT does not condone or support illegal activities of any kind.",
        "Use of our services for malicious purposes is strictly prohibited."
      ]
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "User Responsibilities",
      content: [
        "Users are solely responsible for their actions and use of our services.",
        "You must be 18 years or older to use our services.",
        "You agree not to use our services to harm others or violate any laws.",
        "You understand the risks associated with cybersecurity tools."
      ]
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "Legal Disclaimer",
      content: [
        "CryonerRAT is not liable for any damages or legal consequences.",
        "Services are provided 'as is' without any warranties.",
        "We reserve the right to terminate services at any time.",
        "These terms are subject to change without notice."
      ]
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Privacy & Security",
      content: [
        "We do not log or store user activities or communications.",
        "All transactions are processed securely through cryptocurrency.",
        "User data is encrypted and protected at all times.",
        "We do not share information with third parties."
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-10">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="mb-8 border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-glow">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Please read these terms carefully before using our services
            </p>
          </div>

          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="glass-effect border-purple-500/30 hover:glow-effect transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3 text-xl text-purple-400">
                      {section.icon}
                      <span>{section.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.content.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-gray-300 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12"
          >
            <Card className="glass-effect border-red-500/30 glow-effect-red">
              <CardContent className="p-8 text-center">
                <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4 text-red-400">
                  Important Notice
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  By using CryonerRAT services, you acknowledge that you have read, understood, 
                  and agree to be bound by these terms of service. You also confirm that you 
                  will use our services responsibly and in compliance with all applicable laws.
                </p>
                <div className="text-sm text-gray-400">
                  <p>Last updated: January 2024</p>
                  <p className="mt-2">
                    For questions or concerns, contact us at: 
                    <span className="text-purple-400 ml-1">@pillowware</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsPage;
