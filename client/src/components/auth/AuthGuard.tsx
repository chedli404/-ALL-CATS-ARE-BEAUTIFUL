import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import VerifyEmailPage from "@/pages/VerifyEmailPage";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const [location] = useLocation();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  // Allow access to these pages without login
  const publicRoutes = [
    '/login', 
    '/register', 
    '/verify-email',
    '/',           // Home page
    '/world',      // World page
    '/map',        // Map page
    '/tribes',     // Tribes page
    '/legends',    // Legends page
    '/artifacts',  // Artifacts page
    '/game',       // Game page
    '/ecologie',   // Ecologie page
    '/histoire',   // Histoire page
    '/humanite',   // Humanite page
    '/economie',   // Economie page
    '/politique',  // Politique page
    '/characters', // Characters page
    '/character',  // Character detail pages
    '/team',       // Team page
    '/contact'     // Contact page
  ];
  
  const isPublicRoute = publicRoutes.some(route => location.startsWith(route));

  // Only require login for admin and vote pages
  if (!user && !isPublicRoute) {
    return <LoginPage />;
  }

  // Show specific auth pages without navbar
  if (location === '/login') return <LoginPage />;
  if (location === '/register') return <RegisterPage />;
  if (location.startsWith('/verify-email') || location.startsWith('/verify/')) return <VerifyEmailPage />;

  return <>{children}</>;
};

export default AuthGuard;