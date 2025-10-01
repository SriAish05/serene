import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  MessageCircle, 
  Users, 
  Calendar,
  Menu,
  Bell,
  User,
  Moon,
  Sun,
  Heart,
  Bot,
  Send,
  Settings,
  HelpCircle,
  LogOut,
  Monitor
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from '@/contexts/AuthContext';
import BunnyCheerleader from "@/components/BunnyCheerleader";

export const Sidebar = () => {
  const [isDark, setIsDark] = useState<boolean>(document.documentElement.classList.contains('dark'));
  const [moodInput, setMoodInput] = useState('');
  const location = useLocation();
  const { user } = useAuth();

  // Navigation based on the image
  const menuNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Student Dashboard', href: '/student-dashboard', icon: User },
    { name: 'AI Chat', href: '/', icon: Bot },
    { name: 'Resources', href: '/resources', icon: Heart },
    { name: 'Peer Forum', href: '/forum', icon: Users },
    { name: 'Calendar', href: '/calendar', icon: Calendar },
  ];

  const generalNavigation = [
    { name: 'Settings', href: '/settings', icon: Settings },
    { name: 'Help', href: '/help', icon: HelpCircle },
    { name: 'Logout', href: '/logout', icon: LogOut },
    { name: 'Wireframe Demo', href: '/wireframe', icon: Monitor },
  ];

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored) {
      const dark = stored === 'dark';
      document.documentElement.classList.toggle('dark', dark);
      setIsDark(dark);
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    document.documentElement.classList.toggle('dark', nextDark);
    localStorage.setItem('theme', nextDark ? 'dark' : 'light');
  };

  const handleMoodSubmit = () => {
    if (moodInput.trim()) {
      // Handle mood submission
      console.log('Mood submitted:', moodInput);
      setMoodInput('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-sidebar text-sidebar-foreground overflow-y-auto w-64">
      {/* SERENE Logo and Theme Toggle */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Heart className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-sidebar-primary">SERENE</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-8 w-8 text-sidebar-foreground hover:text-sidebar-primary"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* MENU Section */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-sidebar-foreground mb-3 uppercase tracking-wide">MENU</h3>
        <nav className="space-y-1">
          {menuNavigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) => `
                flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-smooth
                ${isActive 
                  ? 'bg-primary text-primary-foreground font-medium' 
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                }
              `}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* GENERAL Section */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-sidebar-foreground mb-3 uppercase tracking-wide">GENERAL</h3>
        <nav className="space-y-1">
          {generalNavigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 transition-smooth"
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Wellness Buddy Section */}
      <div className="mt-auto p-4">
        <Card className="bg-accent border-border">
          <CardContent className="p-4 text-center">
            <div className="mb-3">
              {/* Bunny Character */}
              <div className="w-16 h-16 mx-auto mb-2 relative">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                  {/* Bunny ears */}
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <div className="w-3 h-4 bg-white rounded-full"></div>
                    <div className="w-3 h-4 bg-white rounded-full ml-2"></div>
                  </div>
                  {/* Bunny face */}
                  <div className="w-8 h-8 bg-white rounded-full relative">
                    {/* Eyes */}
                    <div className="absolute top-1 left-1 w-1 h-1 bg-gray-800 rounded-full"></div>
                    <div className="absolute top-1 right-1 w-1 h-1 bg-gray-800 rounded-full"></div>
                    {/* Nose */}
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gray-800 rounded-full"></div>
                    {/* Mouth */}
                    <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-2 h-0.5 bg-gray-800 rounded-full"></div>
                  </div>
                  {/* Heart */}
                  <div className="absolute bottom-1 right-1 w-2 h-2 bg-red-500 rounded-full transform rotate-45"></div>
                </div>
              </div>
              <h4 className="font-medium text-sidebar-foreground text-sm mb-1">Wellness Buddy</h4>
              <p className="text-xs text-sidebar-foreground/70 mb-3">Here to support you!</p>
              <p className="text-xs text-sidebar-foreground/50 italic">Double click me</p>
            </div>
          </CardContent>
        </Card>

        {/* Mood Input */}
        <div className="mt-4">
          <div className="relative">
            <Input
              value={moodInput}
              onChange={(e) => setMoodInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleMoodSubmit()}
              placeholder="Share what's on your mind"
              className="pr-10 bg-background/50 border-border text-sm"
            />
            <Button
              onClick={handleMoodSubmit}
              size="icon"
              className="absolute right-1 top-1 h-6 w-6 bg-primary hover:bg-primary/90"
            >
              <Send className="h-3 w-3 text-primary-foreground" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};