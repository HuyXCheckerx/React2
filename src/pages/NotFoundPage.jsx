import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, Search, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import FuzzyText from '@/FuzzyText';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-2xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Card className="card-border-glow">
            <CardHeader className="pb-8">
              <div className="flex justify-center mb-6">
                <AlertTriangle className="w-16 h-16 text-cyan-400 mb-4" />
              </div>
              <div className="flex justify-center mb-6">
                <CardTitle className="font-orbitron text-8xl text-glow-cyan">
                  <FuzzyText 
                    baseIntensity={0.2} 
                    hoverIntensity={0.5} 
                    enableHover={true}
                    fontSize="clamp(6rem, 20vw, 12rem)"
                    color="#33ffcc"
                  >
                    404
                  </FuzzyText>
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-8 px-8 pb-8">
              <div className="space-y-4">
                <div className="flex justify-center">
                  <FuzzyText 
                    baseIntensity={0.15} 
                    hoverIntensity={0.4} 
                    enableHover={true}
                    fontSize="clamp(1.5rem, 5vw, 2.5rem)"
                    color="#ffffff"
                    fontWeight={700}
                  >
                    Page Not Found
                  </FuzzyText>
                </div>
                <p className="text-gray-400 text-lg max-w-md mx-auto leading-relaxed">
                  The page you're looking for doesn't exist or has been moved to a different location.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  onClick={() => navigate('/')} 
                  className="font-orbitron uppercase bg-cyan-400 text-black hover:bg-cyan-300 font-bold px-8 py-3"
                >
                  <Home className="w-5 h-5 mr-2" />
                  Go Home
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate(-1)}
                  className="font-orbitron uppercase px-8 py-3"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Go Back
                </Button>
              </div>

              <div className="text-xs text-gray-500 space-y-1">
                <p>If you believe this is an error, please contact support.</p>
                <p>Error Code: 404 - Page Not Found</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage; 