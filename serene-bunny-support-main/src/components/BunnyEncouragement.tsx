import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import BunnyCheerleader from './BunnyCheerleader';

interface BunnyEncouragementProps {
  isVisible: boolean;
  message: string;
  onClose: () => void;
  type?: 'encouragement' | 'celebration' | 'support';
  showAnimation?: boolean;
}

export const BunnyEncouragement: React.FC<BunnyEncouragementProps> = ({
  isVisible,
  message,
  onClose,
  type = 'encouragement',
  showAnimation = true
}) => {
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (isVisible && showAnimation) {
      setAnimationClass('animate-bounce-in');
      const timer = setTimeout(() => {
        setAnimationClass('animate-gentle-float');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, showAnimation]);

  if (!isVisible) return null;

  const getCardStyle = () => {
    switch (type) {
      case 'celebration':
        return 'border-primary/30 bg-primary/5 shadow-bunny';
      case 'support':
        return 'border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/20';
      default:
        return 'border-primary/20 bg-accent shadow-card';
    }
  };

  const getBunnyStyle = () => {
    switch (type) {
      case 'celebration':
        return 'animate-spin-slow';
      case 'support':
        return 'animate-gentle-bounce';
      default:
        return animationClass;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <Card className={`max-w-md mx-4 shadow-card transition-all duration-500 ${getCardStyle()}`}>
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className={`flex-shrink-0 ${getBunnyStyle()}`}>
              <BunnyCheerleader userMessage="" />
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="font-medium text-foreground mb-2">
                  {type === 'celebration' ? '🎉 Amazing Job!' : 
                   type === 'support' ? '💙 You\'re Not Alone' : 
                   '🐰 Bunny Says:'}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {message}
                </p>
              </div>
              
              {type === 'celebration' && (
                <div className="flex space-x-2">
                  <Button
                    onClick={onClose}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Continue Journey
                  </Button>
                </div>
              )}
              
              {type === 'support' && (
                <div className="flex space-x-2">
                  <Button
                    onClick={onClose}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Get Support
                  </Button>
                  <Button
                    onClick={onClose}
                    variant="outline"
                  >
                    Continue
                  </Button>
                </div>
              )}
              
              {type === 'encouragement' && (
                <div className="flex justify-end">
                  <Button
                    onClick={onClose}
                    variant="outline"
                    size="sm"
                  >
                    Thanks, Bunny! 🐰
                  </Button>
                </div>
              )}
            </div>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="p-1 h-auto"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Celebration Modal Component
export const CelebrationModal: React.FC<{
  isVisible: boolean;
  onClose: () => void;
  completedCount: number;
  totalCount: number;
}> = ({ isVisible, onClose, completedCount, totalCount }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <Card className="max-w-lg mx-4 border-primary/30 bg-primary/5 shadow-bunny">
        <CardContent className="p-8 text-center">
          <div className="space-y-6">
            {/* Confetti Animation */}
            {showConfetti && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute animate-confetti"
                    style={{
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: `${2 + Math.random() * 2}s`
                    }}
                  >
                    {['🎉', '🎊', '✨', '🌟'][Math.floor(Math.random() * 4)]}
                  </div>
                ))}
              </div>
            )}
            
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-primary">Congratulations!</h2>
            <p className="text-muted-foreground">
              You've completed all {totalCount} questionnaires! You're investing in your best self – high five!
            </p>
            
            <div className="bg-accent p-4 rounded-lg border border-border">
              <h3 className="font-medium text-foreground mb-2">Wellness Badge Earned!</h3>
              <div className="text-3xl mb-2">🏆</div>
              <p className="text-sm text-muted-foreground">
                "The journey of a thousand miles begins with one step." - Lao Tzu
              </p>
            </div>
            
            <div className="flex justify-center space-x-3">
              <Button
                onClick={onClose}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Continue Journey
              </Button>
              <Button
                onClick={() => {
                  // Share functionality placeholder
                  console.log('Share wellness achievement');
                }}
                variant="outline"
              >
                Share Achievement
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Admin Alert Simulation
export const simulateAdminAlert = (studentName: string, questionnaireName: string, score: number, level: string) => {
  const alertData = {
    student: studentName,
    questionnaire: questionnaireName,
    score: score,
    level: level,
    timestamp: new Date().toISOString(),
    message: `${studentName} needs help – High risk on ${questionnaireName}: Score ${score} (${level}). Flag for counselor follow-up.`
  };
  
  // Log to console (in real app, this would be sent to admin dashboard)
  console.log('🚨 ADMIN ALERT:', alertData);
  
  // Simulate API call to admin endpoint
  fetch('/api/admin-alert', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(alertData)
  }).catch(() => {
    // Silently fail in demo - in real app, this would show error notification
    console.log('Admin alert endpoint not available (demo mode)');
  });
  
  return alertData;
};
