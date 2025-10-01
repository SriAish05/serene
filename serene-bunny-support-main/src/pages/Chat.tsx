import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/contexts/AuthContext';
import { 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Heart, 
  MessageCircle,
  Sparkles,
  Clock,
  Smile,
  Headphones
} from 'lucide-react';
import bunnyImage from "@/assets/bunny-avatar.png";

export const Chat = () => {
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const { user } = useAuth();
  const [chatHistory, setChatHistory] = useState([
    {
      id: '1',
      type: 'bunny',
      content: 'Hello! I\'m your SERENE companion. I\'m here to listen and support you. How are you feeling today?',
      timestamp: '2:30 PM',
      mood: 'supportive'
    },
    {
      id: '2',
      type: 'user',
      content: 'Hi, I\'ve been feeling a bit stressed about my upcoming exams.',
      timestamp: '2:31 PM'
    },
    {
      id: '3',
      type: 'bunny',
      content: 'I understand exam stress can feel overwhelming. It\'s completely normal to feel this way. Would you like to talk about what specifically is worrying you, or would you prefer some relaxation techniques to help you feel calmer right now?',
      timestamp: '2:31 PM',
      mood: 'empathetic'
    }
  ]);

  const quickResponses = [
    'I\'m feeling anxious',
    'Help me with study stress',
    'I can\'t sleep well',
    'I need motivation',
    'Breathing exercises',
    'I\'m feeling lonely'
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'ma', name: 'मराठीत', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'sa', name: 'संस्कृत', flag: '🇮🇳' }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        type: 'user',
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setChatHistory([...chatHistory, newMessage]);
      setMessage('');
      
      // Simulate bunny response
      setTimeout(() => {
        const responses = [
          'Thank you for sharing that with me. It takes courage to express your feelings.',
          'I hear you, and your feelings are valid. Let\'s work through this together.',
          'That sounds challenging. What would feel most helpful for you right now?',
          'I\'m here to support you. Would you like to explore some coping strategies?'
        ];
        
        const bunnyResponse = {
          id: (Date.now() + 1).toString(),
          type: 'bunny',
          content: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          mood: 'supportive'
        };
        
        setChatHistory(prev => [...prev, bunnyResponse]);
      }, 1500);
    }
  };

  const handleQuickResponse = (response: string) => {
    setMessage(response);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex h-[calc(100vh-2rem)] max-w-[100rem] mx-auto p-6 gap-6">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <Card className="shadow-card mb-4">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full gradient-bunny p-2 bunny-float">
                    <img 
                      src={bunnyImage} 
                      alt="SERENE Bunny" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <span>SERENE Companion</span>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </CardTitle>
                    <CardDescription>
                      AI-powered mental health support • Multilingual • Voice-enabled
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={togglePlayback}
                    className={isPlaying ? 'text-primary' : 'text-muted-foreground'}
                  >
                    {isPlaying ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  </Button>
                  <select className="px-3 py-2 border border-input rounded-md text-sm focus:border-primary transition-smooth">
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Chat Messages */}
          <Card className="flex-1 shadow-card mb-4">
            <CardContent className="p-0 h-full flex flex-col">
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {chatHistory.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] ${msg.type === 'user' ? 'order-2' : 'order-1'}`}>
                      {msg.type === 'bunny' && (
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-6 h-6 rounded-full gradient-bunny p-1">
                            <img 
                              src={bunnyImage} 
                              alt="Bunny" 
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">SERENE Companion</span>
                          {msg.mood && (
                            <Badge variant="outline" className="text-xs">
                              {msg.mood === 'supportive' && '💚'}
                              {msg.mood === 'empathetic' && '🤗'}
                              {msg.mood === 'encouraging' && '✨'}
                            </Badge>
                          )}
                        </div>
                      )}
                      <div
                        className={`p-4 rounded-lg ${
                          msg.type === 'user'
                            ? 'bg-primary text-primary-foreground ml-4'
                            : 'bg-accent mr-4'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{msg.content}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className={`text-xs ${
                            msg.type === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                          }`}>
                            {msg.timestamp}
                          </span>
                          {msg.type === 'bunny' && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-muted-foreground hover:text-primary"
                            >
                              <Headphones className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Responses */}
              <div className="p-4 border-t border-border">
                <div className="flex flex-wrap gap-2 mb-4">
                  {quickResponses.map((response, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickResponse(response)}
                      className="text-xs btn-calm"
                    >
                      {response}
                    </Button>
                  ))}
                </div>

                {/* Message Input */}
                <div className="flex items-center space-x-2">
                  <div className="flex-1 relative">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Share what's on your mind..."
                      className="pr-12 focus:border-primary transition-smooth"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleListening}
                      className={`absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 ${
                        isListening ? 'text-red-500 animate-pulse' : 'text-muted-foreground'
                      }`}
                    >
                      {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                  </div>
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    variant="calm"
                    size="icon"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="w-80 space-y-4">
          {/* Current Mood */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Smile className="h-5 w-5 text-primary" />
                <span>How are you feeling?</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-2">
                {['😊', '😐', '😔', '😰', '😴'].map((emoji, index) => (
                  <button
                    key={index}
                    className="p-3 text-2xl hover:bg-accent rounded-lg transition-smooth btn-calm"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Features */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <span>Chat Features</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Voice Input</span>
                <Badge variant={isListening ? 'default' : 'secondary'}>
                  {isListening ? 'Active' : 'Off'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Text-to-Speech</span>
                <Badge variant={isPlaying ? 'default' : 'secondary'}>
                  {isPlaying ? 'On' : 'Off'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Language</span>
                <Badge variant="outline">🇺🇸 English</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Privacy Mode</span>
                <Badge variant="default">🔒 Secure</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Wellness Suggestions */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-primary" />
                <span>Suggested Activities</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { activity: 'Deep breathing exercise', time: '3 min', icon: '🫁' },
                { activity: 'Mindful meditation', time: '10 min', icon: '🧘' },
                { activity: 'Gratitude journaling', time: '5 min', icon: '📝' },
                { activity: 'Progressive muscle relaxation', time: '15 min', icon: '💪' }
              ].map((item, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-left h-auto p-3 btn-calm"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{item.icon}</span>
                    <div>
                      <div className="font-medium text-sm">{item.activity}</div>
                      <div className="text-xs text-muted-foreground">{item.time}</div>
                    </div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Emergency Support */}
          <Card className="shadow-card border-red-200 bg-red-50/50">
            <CardHeader>
              <CardTitle className="text-red-700 text-sm">Need Immediate Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" className="w-full">
                <MessageCircle className="h-4 w-4 mr-2" />
                Crisis Support
              </Button>
              <p className="text-xs text-red-600 mt-2">
                Available 24/7 for urgent mental health support
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
  );
};

export default Chat;



