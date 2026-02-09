
import React from 'react';
import Navbar from '../components/Navbar.tsx';
import Footer from '../components/Footer.tsx';
import { Check, Shield, Zap, Globe } from 'lucide-react';
import SubscriptionMatrix from '../components/SubscriptionMatrix.tsx';

/**
 * Pricing Page: High-performance license selection for Neural Mesh scaling.
 */
const Pricing: React.FC = () => {
  // Fix: Adding a valid return statement to satisfy React.FC type requirements and fix "Type '() => void' is not assignable to type 'FC<{}>'"
  return (
    <div className="min-h-screen bg-lightSurface dark:bg-void text-slate-900 dark:text-white transition-colors duration-300">
      <Navbar />
      <main className="pt-48 pb-32">
        <SubscriptionMatrix />
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
