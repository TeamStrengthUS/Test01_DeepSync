import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext.tsx';
import Landing from './pages/Landing.tsx';
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Contact from './pages/Contact.tsx';
import Product from './pages/Product.tsx';
import SignatureExport from './pages/SignatureExport.tsx';
import Privacy from './pages/Privacy.tsx';
import Terms from './pages/Terms.tsx';
import AgentEcosystem from './pages/AgentEcosystem.tsx';
import RealtimeAnalytics from './pages/RealtimeAnalytics.tsx';
import TeamIntelligence from './pages/TeamIntelligence.tsx';
import EnterpriseProtocols from './pages/EnterpriseProtocols.tsx';
import Pricing from './pages/Pricing.tsx';
import Documentation from './pages/Documentation.tsx';
import APIStatus from './pages/APIStatus.tsx';
import Community from './pages/Community.tsx';
import { supabase } from './lib/supabaseClient.ts';
import type { Session } from '@supabase/supabase-js';

const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Initial check
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (mounted) {
        setSession(data.session);
        setLoading(false);
      }
    };
    
    checkSession();

    // Listener for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (mounted) {
        setSession(newSession);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const isAdmin = session?.user?.email?.endsWith('@teamstrength.com') || session?.user?.email?.endsWith('@teamstrength.us') || false;
  return { session, isAdmin, loading };
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="min-h-screen bg-void flex items-center justify-center text-teal font-black uppercase tracking-[0.4em]">Authorizing Mesh...</div>;
  if (!session) return <Navigate to="/login" state={{ from: location }} replace />;
  
  return <>{children}</>;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { session, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="min-h-screen bg-void flex items-center justify-center text-red-500 font-black uppercase tracking-[0.4em]">Verifying Clearances...</div>;
  if (!session) return <Navigate to="/login" state={{ from: location }} replace />;
  if (!isAdmin) return <Navigate to="/dashboard/overview" replace />;
  
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen transition-colors duration-300 bg-lightSurface dark:bg-void text-slate-900 dark:text-white">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/overview" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/dashboard/*" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/mission-control" element={<Navigate to="/dashboard/overview" replace />} />
            <Route path="/contact" element={<Contact />} />
            
            <Route path="/signature" element={
              <AdminRoute>
                <SignatureExport />
              </AdminRoute>
            } />
            
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/ecosystem" element={<AgentEcosystem />} />
            <Route path="/deepsync" element={<RealtimeAnalytics />} />
            <Route path="/intelligence" element={<TeamIntelligence />} />
            <Route path="/protocols" element={<EnterpriseProtocols />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/docs" element={<Documentation />} />
            <Route path="/status" element={<APIStatus />} />
            <Route path="/community" element={<Community />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;