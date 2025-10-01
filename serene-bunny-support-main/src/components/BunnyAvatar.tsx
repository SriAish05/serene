import { useState } from 'react';
import { MessageCircle, Heart, BookOpen, Moon, Users, BarChart3, X, Mic, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import bunnyImage from "@/assets/bunny-avatar.png";

interface BunnyAvatarProps {
  onFeatureSelect?: (feature: string) => void;
}

export const BunnyAvatar = ({ onFeatureSelect }: BunnyAvatarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const features = [
    { id: 'chat', icon: MessageCircle, label: 'AI Chat Support', description: 'Talk to me about anything on your mind' },
    { id: 'journal', icon: Heart, label: 'Mood Journal', description: 'Track your feelings and emotions' },
    { id: 'study', icon: BookOpen, label: 'Study Helper', description: 'Get help with your academic stress' },
    { id: 'sleep', icon: Moon, label: 'Sleep Tracker', description: 'Monitor and improve your sleep patterns' },
    { id: 'connect', icon: Users, label: 'Peer Connect', description: 'Connect with supportive peers' },
    { id: 'insights', icon: BarChart3, label: 'Wellness Insights', description: 'View your mental health progress' }
  ];

  const handleBunnyClick = () => {
    setIsExpanded(true);
  };

  const handleClose = () => {
    setIsExpanded(false);
    setSelectedFeature(null);
  };

  const handleFeatureClick = (featureId: string) => {
    setSelectedFeature(featureId);
    onFeatureSelect?.(featureId);
  };

  if (!isExpanded) {
    return (
      <div 
        className="fixed bottom-6 left-6 z-50 cursor-pointer group"
        onClick={handleBunnyClick}
      >
        <div className="relative">
          <div className="w-16 h-16 rounded-full gradient-bunny shadow-bunny p-2 transition-smooth hover:scale-105 bunny-float">
            <img 
              src={bunnyImage} 
              alt="SERENE Bunny Assistant" 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-smooth whitespace-nowrap">
            Let's Talk!
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm">
      <div className="flex h-full">
        {/* Bunny Interaction Panel */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 gradient-soft">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="absolute top-6 right-6 text-primary hover:bg-primary/10"
          >
            <X className="h-6 w-6" />
          </Button>

          <div className="text-center space-y-6 max-w-md">
            <div className="w-24 h-24 mx-auto rounded-full gradient-bunny p-4 shadow-bunny">
              <img 
                src={bunnyImage} 
                alt="SERENE Bunny Assistant" 
                className="w-full h-full object-contain"
              />
            </div>
            
            <div>
              <h2 className="text-3xl font-semibold text-primary mb-2">
                Hi there! I'm your SERENE companion
              </h2>
              <p className="text-muted-foreground text-lg">
                How can I support your well-being today?
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {features.map((feature) => (
                <Card
                  key={feature.id}
                  className="p-4 cursor-pointer transition-smooth hover:shadow-card border-primary/20 hover:border-primary/40"
                  onClick={() => handleFeatureClick(feature.id)}
                >
                  <div className="flex flex-col items-center text-center space-y-2">
                    <feature.icon className="h-8 w-8 text-primary" />
                    <h3 className="font-medium text-sm">{feature.label}</h3>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Feature Content Panel */}
        {selectedFeature && (
          <div className="hidden lg:block w-1/2 bg-card border-l border-border p-8 feature-slide-in">
            <div className="h-full flex flex-col">
              {selectedFeature === 'chat' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-primary">AI Chat Support</h3>
                  <div className="flex-1 bg-accent/30 rounded-lg p-4 space-y-4">
                    <div className="bg-primary/10 rounded-lg p-3">
                      <p className="text-sm">🌟 Hi! I'm here to listen and support you. What's on your mind today?</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">You can ask me about:</p>
                      <div className="flex flex-wrap gap-2">
                        {['Stress management', 'Study tips', 'Mood tracking', 'Sleep help'].map((topic) => (
                          <span key={topic} className="px-2 py-1 bg-primary/10 rounded-full text-xs">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <input
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Button size="icon" className="btn-calm">
                      <Mic className="h-4 w-4" />
                    </Button>
                    <Button size="icon" className="btn-calm">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {selectedFeature === 'journal' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-primary">Mood Journal</h3>
                  <div className="space-y-4">
                    <Card className="p-4">
                      <h4 className="font-medium mb-2">How are you feeling today?</h4>
                      <div className="flex gap-2">
                        {['😊', '😐', '😔', '😰', '😴'].map((emoji) => (
                          <button key={emoji} className="text-2xl p-2 hover:bg-accent rounded-lg transition-smooth">
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </Card>
                    <Card className="p-4">
                      <h4 className="font-medium mb-2">What's happening?</h4>
                      <textarea 
                        placeholder="Share your thoughts..."
                        className="w-full h-24 p-3 border border-input rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </Card>
                  </div>
                </div>
              )}

              {selectedFeature === 'study' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-primary">Study Helper</h3>
                  <div className="grid gap-4">
                    <Card className="p-4">
                      <h4 className="font-medium mb-2">🎯 Focus Timer</h4>
                      <p className="text-sm text-muted-foreground">Pomodoro technique for better focus</p>
                    </Card>
                    <Card className="p-4">
                      <h4 className="font-medium mb-2">📚 Study Planner</h4>
                      <p className="text-sm text-muted-foreground">Organize your study schedule</p>
                    </Card>
                    <Card className="p-4">
                      <h4 className="font-medium mb-2">🧘 Stress Relief</h4>
                      <p className="text-sm text-muted-foreground">Quick exercises to calm your mind</p>
                    </Card>
                  </div>
                </div>
              )}

              {selectedFeature === 'sleep' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-primary">Sleep Tracker</h3>
                  <div className="space-y-4">
                    <Card className="p-4">
                      <h4 className="font-medium mb-2">Last Night's Sleep</h4>
                      <div className="flex items-center gap-4">
                        <div className="text-2xl font-bold text-primary">7.5h</div>
                        <div className="text-sm text-muted-foreground">Quality: Good</div>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <h4 className="font-medium mb-2">Sleep Goals</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Target: 8 hours</span>
                          <span className="text-sm text-primary">94% achieved</span>
                        </div>
                        <div className="w-full bg-accent rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: '94%' }}></div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};