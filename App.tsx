
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext.tsx';
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Contact from './pages/Contact.tsx';
import Branding from './pages/Branding.tsx';
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

const App: React.FC = () => {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
};

export default App;
