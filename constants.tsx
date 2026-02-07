
import React from 'react';
import { Activity, Zap, BarChart3, Users, Settings, Mail, Shield, Globe, Cpu, ShieldCheck } from 'lucide-react';
import { Feature, Testimonial, Metric } from './types.ts';

export const FEATURES: Feature[] = [
  {
    title: 'Omni-Node Runtime',
    description: 'Containerized agent execution environments optimized for long-term memory and tool-use precision.',
    icon: <Cpu className="w-6 h-6 text-teal" />,
  },
  {
    title: 'DeepSync Vault',
    description: 'A sub-second vector persistence layer that synchronizes state and identity across the entire mesh.',
    icon: <Activity className="w-6 h-6 text-teal" />,
  },
  {
    title: 'IHL Compliance HUD',
    description: 'Automated auditing and deactivation protocols aligned with International Humanitarian Law standards.',
    icon: <ShieldCheck className="w-6 h-6 text-teal" />,
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Security Engineer @ HyperGrowth',
    content: 'The ability to verify Meaningful Human Control via the Overwatch HUD is a game-changer for our legal vetting.',
    avatar: 'https://picsum.photos/seed/sarah/100/100',
    rating: 5,
  },
  {
    id: 2,
    name: 'Marcus Thorne',
    role: 'CTO @ NeoLogix',
    content: 'DeepSync is the first vector sync protocol that actually keeps up with our high-velocity agent deployment.',
    avatar: 'https://picsum.photos/seed/marcus/100/100',
    rating: 5,
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    role: 'Compliance Lead @ Velocity',
    content: 'We finally have an agentic runtime that respects sovereign data residency while maintaining global sync.',
    avatar: 'https://picsum.photos/seed/elena/100/100',
    rating: 5,
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Mesh Architect @ Spark',
    content: 'The Neural Mesh architecture eliminated our memory silos. Every node is now perfectly context-aware.',
    avatar: 'https://picsum.photos/seed/david/100/100',
    rating: 5,
  },
];

export const DASHBOARD_METRICS: Metric[] = [
  { label: 'Mesh Throughput', value: '4.2 GB/s', change: '+12.5%', trend: 'up' },
  { label: 'Active Omni-Nodes', value: '482', change: '+3.2%', trend: 'up' },
  { label: 'Sync Latency', value: '0.04ms', change: '-2.1%', trend: 'down' },
  { label: 'Compliance Index', value: '99.9%', change: '+5.7%', trend: 'up' },
];
