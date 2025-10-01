import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import Dashboard from '../pages/Dashboard';
import DashboardQuestionnaires from '../pages/DashboardQuestionnaires';
import Calendar from '../pages/Calendar';
import Forum from '../pages/Forum';
import RelaxationHub from '../pages/RelaxationHub';
import AdminDashboard from '../pages/AdminDashboard';
import AdminMainPage from '../pages/AdminMainPage';
import StudentManagement from '../pages/admin/StudentManagement';
import RiskDetection from '../pages/admin/RiskDetection';
import AcademicReports from '../pages/admin/AcademicReports';
import ActivityLog from '../pages/admin/ActivityLog';
import Assessment from '../pages/Assessment';
import { useAuth } from '@/contexts/AuthContext';

interface MainLayoutProps {
  children?: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [sidebarWidth, setSidebarWidth] = useState(320);
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { user } = useAuth();

  // Handle sidebar resizing
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing) {
        const newWidth = e.clientX;
        if (newWidth >= 250 && newWidth <= 500) {
          setSidebarWidth(newWidth);
        }
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  // Function to render content based on current route and user role
  const renderContent = () => {
    // If user is admin and on main page, show admin main page
    if (user?.role === 'admin' && (location.pathname === '/' || location.pathname === '/dashboard')) {
      return <AdminMainPage />;
    }

    // Admin-specific routes
    if (user?.role === 'admin') {
      switch (location.pathname) {
        case '/admin/students':
          return <StudentManagement />;
        case '/admin/analytics':
          return <RiskDetection />;
        case '/admin/reports':
          return <AcademicReports />;
        case '/admin/activity':
          return <ActivityLog />;
        case '/admin':
          return <AdminDashboard />;
      }
    }

    // Student routes
    switch (location.pathname) {
      case '/':
        return <Dashboard />; // Chatbot interface
      case '/dashboard':
        return <DashboardQuestionnaires />; // Questionnaires dashboard
      case '/forum':
        return <Forum />;
      case '/relaxation':
        return <RelaxationHub />;
      case '/calendar':
        return <Calendar />;
      case '/admin':
        return <AdminDashboard />;
      case '/assessment':
        return <Assessment />;
      case '/profile':
      case '/settings':
        return <Dashboard />; // Default to chatbot for profile/settings
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Left Section - Resizable Sidebar */}
      <div className="relative flex-shrink-0">

        {/* Resizable Sidebar */}
        <div
          ref={sidebarRef}
          className="relative z-10 bg-sidebar border-r border-sidebar-border h-screen overflow-hidden"
          style={{ width: `${sidebarWidth}px` }}
        >
          <Sidebar />
        </div>

        {/* Resize Handle */}
        <div
          className="absolute right-0 top-0 w-1 h-screen bg-border hover:bg-primary cursor-col-resize z-20"
          onMouseDown={handleMouseDown}
        />
      </div>

      {/* Right Section - Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-background text-foreground">
        {/* Header */}
        <Header />
        
        {/* Main Content Section - Allow scrolling for dashboard */}
        <div className="flex-1 overflow-hidden">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};