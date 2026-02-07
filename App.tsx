
import React, { createContext, useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import Branding from './pages/Branding';
import Product from './pages/Product';
import SignatureExport from './pages/SignatureExport';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import AgentEcosystem from './pages/AgentEcosystem';
import RealtimeAnalytics from './pages/RealtimeAnalytics';
import TeamIntelligence from './pages/TeamIntelligence';
import EnterpriseProtocols from './pages/EnterpriseProtocols';
import Pricing from './pages/Pricing';
import Documentation from './pages/Documentation';
import APIStatus from './pages/APIStatus';
import Community from './pages/Community';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('teamstrength-theme');
    return (saved as 'light' | 'dark') || 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    const body = window.document.body;
    localStorage.setItem('teamstrength-theme', theme);
    if (theme === 'dark') {
      root.classList.add('dark');
      body.classList.add('dark');
    } else {
      root.classList.remove('dark');
      body.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {/* Fixed: Standard Router initialization */}
      <Router>
        <div className="min-h-screen transition-colors duration-300 bg-lightSurface dark:bg-void text-slate-900 dark:text-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/branding" element={<Branding />} />
            <Route path="/signature" element={<SignatureExport />} />
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
          </Routes>
        </div>
      </Router>
    </ThemeContext.Provider>
  );
};

export default App;