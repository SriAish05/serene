import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import Dashboard from "./pages/Dashboard";
import Forum from "./pages/Forum";
import AdminDashboard from "./pages/AdminDashboard";
import Assessment from "./pages/Assessment";
import NotFound from "./pages/NotFound";
import { MainLayout } from "./components/MainLayout";
import { AuthGuard } from "./components/AuthGuard";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<MainLayout />} />
            <Route path="/dashboard" element={<MainLayout />} />
            <Route path="/forum" element={<MainLayout />} />
            <Route path="/relaxation" element={<MainLayout />} />
            <Route path="/calendar" element={<MainLayout />} />
            <Route path="/admin" element={
              <AuthGuard>
                <MainLayout />
              </AuthGuard>
            } />
            <Route path="/admin/students" element={
              <AuthGuard>
                <MainLayout />
              </AuthGuard>
            } />
            <Route path="/admin/analytics" element={
              <AuthGuard>
                <MainLayout />
              </AuthGuard>
            } />
            <Route path="/admin/reports" element={
              <AuthGuard>
                <MainLayout />
              </AuthGuard>
            } />
            <Route path="/admin/activity" element={
              <AuthGuard>
                <MainLayout />
              </AuthGuard>
            } />
            <Route path="/assessment" element={<MainLayout />} />
            <Route path="/profile" element={<MainLayout />} />
            <Route path="/settings" element={<MainLayout />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
