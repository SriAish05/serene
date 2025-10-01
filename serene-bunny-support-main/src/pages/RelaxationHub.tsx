import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Pause, 
  Square, 
  Clock, 
  Volume2, 
  Heart, 
  BookOpen, 
  Timer,
  CheckCircle,
  Circle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import BunnyCheerleader from '@/components/BunnyCheerleader';

export const RelaxationHub = () => {
  const [activeTab, setActiveTab] = useState('meditation');
  const [breathingPhase, setBreathingPhase] = useState('inhale');
  const [breathingTime, setBreathingTime] = useState(4);
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathingProgress, setBreathingProgress] = useState(0);
  const [focusTime, setFocusTime] = useState(25 * 60); // 25 minutes in seconds
  const [isFocusActive, setIsFocusActive] = useState(false);
  const [focusSessions, setFocusSessions] = useState(0);
  const [journalEntries, setJournalEntries] = useState([]);
  const [currentJournal, setCurrentJournal] = useState({
    stress: '',
    gratitude: '',
    tomorrow: ''
  });
  const [bunnyTips, setBunnyTips] = useState([]);
  const [showBunnyTip, setShowBunnyTip] = useState(false);
  const { user } = useAuth();

  // Load data from localStorage
  useEffect(() => {
    const savedJournal = localStorage.getItem('relaxation-journal');
    const savedSessions = localStorage.getItem('focus-sessions');
    const savedTips = localStorage.getItem('bunny-tips');
    
    if (savedJournal) setJournalEntries(JSON.parse(savedJournal));
    if (savedSessions) setFocusSessions(parseInt(savedSessions));
    if (savedTips) setBunnyTips(JSON.parse(savedTips));
  }, []);

  // Auto-start breathing animation when component loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBreathingActive(true);
    }, 1000); // Start after 1 second delay
    
    return () => clearTimeout(timer);
  }, []);

  // Breathing exercise
  const breathingPhases = ['inhale', 'hold', 'exhale', 'hold'];
  const breathingLabels = ['Inhale', 'Hold', 'Exhale', 'Hold'];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isBreathingActive) {
      interval = setInterval(() => {
        setBreathingTime(prev => {
          if (prev <= 1) {
            const currentIndex = breathingPhases.indexOf(breathingPhase);
            const nextIndex = (currentIndex + 1) % breathingPhases.length;
            setBreathingPhase(breathingPhases[nextIndex]);
            return 4; // Reset to 4 seconds for next phase
          }
          return prev - 0.1; // Decrease by 0.1 seconds every 100ms
        });
        
        setBreathingProgress(prev => {
          if (prev >= 100) {
            return 0; // Reset progress for next phase
          }
          return prev + (100 / 40); // 100% over 4 seconds (40 * 100ms intervals)
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isBreathingActive, breathingPhase]);

  // Focus timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isFocusActive && focusTime > 0) {
      interval = setInterval(() => {
        setFocusTime(prev => {
          if (prev <= 1) {
            setIsFocusActive(false);
            setFocusSessions(prev => prev + 1);
            localStorage.setItem('focus-sessions', (focusSessions + 1).toString());
            return 25 * 60; // Reset to 25 minutes
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isFocusActive, focusTime, focusSessions]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const saveJournalEntry = () => {
    if (currentJournal.stress || currentJournal.gratitude || currentJournal.tomorrow) {
      const entry = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        ...currentJournal
      };
      const updatedEntries = [entry, ...journalEntries];
      setJournalEntries(updatedEntries);
      localStorage.setItem('relaxation-journal', JSON.stringify(updatedEntries));
      setCurrentJournal({ stress: '', gratitude: '', tomorrow: '' });
    }
  };

  const getBunnyTip = () => {
    const tips = [
      "Take 3 deep breaths - inhale for 4 counts, hold for 4, exhale for 4",
      "Stretch for 30 seconds - reach your arms up and take a gentle stretch",
      "Name 3 things you can see around you right now",
      "Take a moment to notice 3 sounds you can hear",
      "Think of one thing you're grateful for today"
    ];
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setBunnyTips([randomTip, ...bunnyTips.slice(0, 4)]);
    localStorage.setItem('bunny-tips', JSON.stringify([randomTip, ...bunnyTips.slice(0, 4)]));
    setShowBunnyTip(true);
    setTimeout(() => setShowBunnyTip(false), 5000);
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-6xl mx-auto max-h-[80vh] overflow-y-auto dashboard-scroll">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-primary">
          Relaxation Hub 🌿
        </h1>
        <p className="text-muted-foreground">
          Your personal space for mindfulness, meditation, and mental wellness
        </p>
      </div>

      {/* Bunny Guide */}
      <Card className="shadow-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Guide Bunny</h3>
                <p className="text-sm text-muted-foreground">Double-click for quick wellness tips</p>
              </div>
            </div>
            <Button
              onClick={getBunnyTip}
              variant="outline"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Get Tip
            </Button>
          </div>
          
          {showBunnyTip && bunnyTips.length > 0 && (
            <div className="mt-4 p-3 bg-accent rounded-lg border border-border">
              <div className="flex items-start space-x-3">
                <BunnyCheerleader userMessage="" />
                <div className="flex-1">
                  <p className="text-sm text-foreground font-medium">Quick Tip:</p>
                  <p className="text-sm text-muted-foreground">{bunnyTips[0]}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-accent">
          <TabsTrigger value="meditation" className="text-xs md:text-sm">Meditation</TabsTrigger>
          <TabsTrigger value="breathing" className="text-xs md:text-sm">Breathing</TabsTrigger>
          <TabsTrigger value="journal" className="text-xs md:text-sm">Journal</TabsTrigger>
          <TabsTrigger value="focus" className="text-xs md:text-sm">Focus Timer</TabsTrigger>
          <TabsTrigger value="resources" className="text-xs md:text-sm">Resources</TabsTrigger>
        </TabsList>

        {/* Meditation Tab */}
        <TabsContent value="meditation" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Volume2 className="h-5 w-5 text-primary" />
                  <span>Guided Meditation</span>
                </CardTitle>
                <CardDescription>Short meditation sessions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Play className="h-4 w-4 mr-2" />
                    5-min Calm Breathing (English)
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Play className="h-4 w-4 mr-2" />
                    Body Scan Meditation (Hindi)
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Play className="h-4 w-4 mr-2" />
                    Stress Relief (Spanish)
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-primary" />
                  <span>Quick Relaxation</span>
                </CardTitle>
                <CardDescription>Instant stress relief</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Clock className="h-4 w-4 mr-2" />
                    2-min Quick Reset
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Clock className="h-4 w-4 mr-2" />
                    Progressive Muscle Relaxation
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Clock className="h-4 w-4 mr-2" />
                    Mindful Walking Guide
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Breathing Tab */}
        <TabsContent value="breathing" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-primary" />
                <span>Box Breathing</span>
              </CardTitle>
              <CardDescription>4-4-4-4 breathing pattern</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                {/* Box Breathing Animation */}
                <div className="w-80 h-80 mx-auto relative flex items-center justify-center">
                  {/* Main breathing square */}
                  <div className="relative">
                    {/* Animated square with box-style breathing */}
                    <div 
                      className={`border-4 border-white rounded-lg relative overflow-hidden w-64 h-64 ${
                        isBreathingActive ? 'breathing-square' : 'transition-all duration-1000 ease-in-out'
                      }`}
                      style={{
                        transform: !isBreathingActive ? (
                          breathingPhase === 'inhale' ? 'scale(1.0)' :
                          breathingPhase === 'hold' ? 'scale(1.1)' :
                          breathingPhase === 'exhale' ? 'scale(0.9)' :
                          'scale(0.8)'
                        ) : undefined
                      }}
                    >
                      {/* Progress fill effect - bottom to top */}
                      <div 
                        className={`absolute bottom-0 left-0 w-full bg-primary/20 ${
                          isBreathingActive ? 'breathing-fill' : 'transition-all duration-100 ease-linear'
                        }`}
                        style={{
                          height: !isBreathingActive ? `${breathingProgress}%` : undefined,
                          opacity: !isBreathingActive ? (
                            breathingPhase === 'inhale' ? 0.8 :
                            breathingPhase === 'hold' ? 1.0 :
                            breathingPhase === 'exhale' ? 0.6 : 0.4
                          ) : undefined
                        }}
                      />
                      
                      {/* Inner content */}
                      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                        <div className="text-4xl font-bold text-white mb-3">
                          {breathingLabels[breathingPhases.indexOf(breathingPhase)]}
                        </div>
                        <div className="text-6xl font-bold text-white">
                          {Math.ceil(breathingTime)}
                        </div>
                      </div>
                      
                      {/* Border progress indicator - clockwise around edges */}
                      <div className="absolute inset-0">
                        {/* Top border */}
                        <div 
                          className="absolute top-0 left-0 h-1 bg-primary transition-all duration-100 ease-linear"
                          style={{
                            width: breathingPhase === 'inhale' ? `${breathingProgress}%` : '100%',
                            opacity: breathingPhase === 'inhale' ? 1 : 0.3
                          }}
                        />
                        {/* Right border */}
                        <div 
                          className="absolute top-0 right-0 w-1 bg-primary transition-all duration-100 ease-linear"
                          style={{
                            height: breathingPhase === 'hold' ? `${breathingProgress}%` : '100%',
                            opacity: breathingPhase === 'hold' ? 1 : 0.3
                          }}
                        />
                        {/* Bottom border */}
                        <div 
                          className="absolute bottom-0 right-0 h-1 bg-primary transition-all duration-100 ease-linear"
                          style={{
                            width: breathingPhase === 'exhale' ? `${breathingProgress}%` : '100%',
                            opacity: breathingPhase === 'exhale' ? 1 : 0.3
                          }}
                        />
                        {/* Left border */}
                        <div 
                          className="absolute bottom-0 left-0 w-1 bg-primary transition-all duration-100 ease-linear"
                          style={{
                            height: breathingPhase === 'hold' && breathingPhases.indexOf(breathingPhase) === 3 ? `${breathingProgress}%` : '100%',
                            opacity: breathingPhase === 'hold' && breathingPhases.indexOf(breathingPhase) === 3 ? 1 : 0.3
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Phase indicator dots */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
                    {breathingPhases.map((phase, index) => (
                      <div
                        key={phase}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          breathingPhase === phase 
                            ? 'bg-primary scale-125 shadow-lg shadow-primary/50' 
                            : 'bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center space-x-6">
                <Button
                  onClick={() => setIsBreathingActive(!isBreathingActive)}
                  className={`px-8 py-3 rounded-full font-medium transition-all duration-300 ${
                    isBreathingActive 
                      ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25' 
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                  }`}
                >
                  {isBreathingActive ? <Pause className="h-5 w-5 mr-2" /> : <Play className="h-5 w-5 mr-2" />}
                  {isBreathingActive ? 'Pause' : 'Start'}
                </Button>
                <Button
                  onClick={() => {
                    setIsBreathingActive(false);
                    setBreathingProgress(0);
                    setBreathingPhase('inhale');
                    setBreathingTime(4);
                    // Restart after reset
                    setTimeout(() => setIsBreathingActive(true), 500);
                  }}
                  className="px-8 py-3 rounded-full font-medium bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all duration-300"
                >
                  <Square className="h-5 w-5 mr-2" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Journal Tab */}
        <TabsContent value="journal" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span>Daily Reflection</span>
                </CardTitle>
                <CardDescription>Quick daily check-in</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">
                      What stressed you today?
                    </label>
                    <Textarea
                      value={currentJournal.stress}
                      onChange={(e) => setCurrentJournal({...currentJournal, stress: e.target.value})}
                      placeholder="Share what was challenging..."
                      className="min-h-[60px]"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">
                      One gratitude?
                    </label>
                    <Textarea
                      value={currentJournal.gratitude}
                      onChange={(e) => setCurrentJournal({...currentJournal, gratitude: e.target.value})}
                      placeholder="What are you thankful for?"
                      className="min-h-[60px]"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">
                      Tomorrow's win?
                    </label>
                    <Textarea
                      value={currentJournal.tomorrow}
                      onChange={(e) => setCurrentJournal({...currentJournal, tomorrow: e.target.value})}
                      placeholder="What's one thing you want to accomplish?"
                      className="min-h-[60px]"
                    />
                  </div>
                </div>
                <Button
                  onClick={saveJournalEntry}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Save Entry
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span>Recent Entries</span>
                </CardTitle>
                <CardDescription>Your wellness journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {journalEntries.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No entries yet. Start your wellness journal!
                    </p>
                  ) : (
                    journalEntries.map((entry: any) => (
                      <div key={entry.id} className="p-3 bg-accent rounded-lg border border-border">
                        <div className="text-xs text-muted-foreground mb-2">{entry.date}</div>
                        {entry.stress && (
                          <div className="text-sm mb-1">
                            <span className="font-medium">Stress: </span>
                            <span className="text-muted-foreground">{entry.stress}</span>
                          </div>
                        )}
                        {entry.gratitude && (
                          <div className="text-sm mb-1">
                            <span className="font-medium">Gratitude: </span>
                            <span className="text-muted-foreground">{entry.gratitude}</span>
                          </div>
                        )}
                        {entry.tomorrow && (
                          <div className="text-sm">
                            <span className="font-medium">Tomorrow: </span>
                            <span className="text-muted-foreground">{entry.tomorrow}</span>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Focus Timer Tab */}
        <TabsContent value="focus" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Timer className="h-5 w-5 text-primary" />
                <span>Pomodoro Timer</span>
              </CardTitle>
              <CardDescription>25 minutes work, 5 minutes break</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-6xl font-bold text-primary mb-4">
                  {formatTime(focusTime)}
                </div>
                <div className="flex justify-center space-x-4">
                  <Button
                    onClick={() => setIsFocusActive(!isFocusActive)}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    {isFocusActive ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                    {isFocusActive ? 'Pause' : 'Start'}
                  </Button>
                  <Button
                    onClick={() => {
                      setIsFocusActive(false);
                      setFocusTime(25 * 60);
                    }}
                    variant="outline"
                  >
                    <Square className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>
              
              <div className="text-center">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  Sessions Today: {focusSessions}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Volume2 className="h-5 w-5 text-primary" />
                  <span>Audio Resources</span>
                </CardTitle>
                <CardDescription>Free meditation content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Play className="h-4 w-4 mr-2" />
                    Insight Timer - Free Collection
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Play className="h-4 w-4 mr-2" />
                    Calm - Sleep Stories
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Play className="h-4 w-4 mr-2" />
                    Headspace - Basics
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-primary" />
                  <span>Wellness Tips</span>
                </CardTitle>
                <CardDescription>Quick mental health resources</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="p-3 bg-accent rounded-lg border border-border">
                    <h4 className="font-medium text-sm text-foreground mb-1">Breathing Technique</h4>
                    <p className="text-xs text-muted-foreground">4-7-8 breathing for anxiety relief</p>
                  </div>
                  <div className="p-3 bg-accent rounded-lg border border-border">
                    <h4 className="font-medium text-sm text-foreground mb-1">Grounding Exercise</h4>
                    <p className="text-xs text-muted-foreground">5-4-3-2-1 technique for panic attacks</p>
                  </div>
                  <div className="p-3 bg-accent rounded-lg border border-border">
                    <h4 className="font-medium text-sm text-foreground mb-1">Sleep Hygiene</h4>
                    <p className="text-xs text-muted-foreground">Tips for better sleep quality</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RelaxationHub;
