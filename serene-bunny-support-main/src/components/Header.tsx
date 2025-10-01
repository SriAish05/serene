import React, { useState, useEffect } from 'react';
import { Bell, User, ToggleLeft, ToggleRight, Sun, Moon, Search, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from './AuthModal';

export const Header: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isStudentMode, setIsStudentMode] = useState(true);
  const [isDark, setIsDark] = useState<boolean>(document.documentElement.classList.contains('dark'));
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const toggleMode = () => {
    setIsStudentMode(!isStudentMode);
  };

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

  return (
    <>
      <header className="bg-transparent border-b border-border px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Q Search resources..."
                className="pl-10 bg-background/50 border-border"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-foreground h-8 w-8 md:h-10 md:w-10"
            >
              {isDark ? <Sun className="h-4 w-4 md:h-5 md:w-5" /> : <Moon className="h-4 w-4 md:h-5 md:w-5" />}
            </Button>

            {/* Alert Icon */}
            <div className="relative">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground h-8 w-8 md:h-10 md:w-10">
                <Bell className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
              <div className="absolute -top-1 -right-1 w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full"></div>
            </div>

            {/* Settings Icon */}
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground h-8 w-8 md:h-10 md:w-10">
              <Settings className="h-4 w-4 md:h-5 md:w-5" />
            </Button>

            {/* Toggle for Student and admin */}
            <Button
              variant="outline"
              onClick={toggleMode}
              className="flex items-center space-x-1 md:space-x-2 text-xs md:text-sm px-2 md:px-3"
            >
              {isStudentMode ? (
                <>
                  <ToggleLeft className="h-3 w-3 md:h-4 md:w-4" />
                  <span className="hidden sm:inline">Student</span>
                </>
              ) : (
                <>
                  <ToggleRight className="h-3 w-3 md:h-4 md:w-4" />
                  <span className="hidden sm:inline">Admin</span>
                </>
              )}
            </Button>

            {/* Profile Icon */}
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-1 md:space-x-2">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-muted rounded-full flex items-center justify-center">
                  <User className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                </div>
                <div className="text-right hidden sm:block">
                  <div className="text-xs md:text-sm font-medium text-foreground">{user.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {user.role === 'admin' ? 'Administrator' : `${user.className}, ${user.section}`}
                  </div>
                </div>
              </div>
            ) : (
              <Button
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-3 md:px-4 py-1 md:py-2 rounded-lg text-xs md:text-sm"
              >
                <span className="hidden sm:inline">Login / Register</span>
                <span className="sm:hidden">Login</span>
              </Button>
            )}
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};
