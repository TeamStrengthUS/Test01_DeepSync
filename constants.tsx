
import React from 'react';
import { Activity, Zap, BarChart3, Users, Settings, Mail, Shield, Globe } from 'lucide-react';
import { Feature, Testimonial, Metric } from './types.ts';

export const FEATURES: Feature[] = [
  {
    title: 'DeepSync Vault',
    description: 'Track state and memory synchronization with sub-second latency across the mesh.',
    icon: <Activity className="w-6 h-6 text-teal" />,
  },
  {
    title: 'Neural Mesh Velocity',
    description: 'Measure intelligence propagation speed across distributed processing nodes.',
    icon: <Zap className="w-6 h-6 text-teal" />,
  },
  {
    title: 'Constitutional Auditing',
    description: 'AI-generated compliance reports based on your core prompt directives.',
    icon: <BarChart3 className="w-6 h-6 text-teal" />,
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'VP of Sales @ HyperGrowth',
    content: 'TeamStrength transformed how we view our pipeline. The Agentic Layer is a masterpiece of UX.',
    avatar: 'https://picsum.photos/seed/sarah/100/100',
    rating: 5,
  },
  {
    id: 2,
    name: 'Marcus Thorne',
    role: 'Founder @ NeoLogix',
    content: 'The Neural Mesh insights helped us increase our conversion rate by 40% in just three months.',
    avatar: 'https://picsum.photos/seed/marcus/100/100',
    rating: 5,
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    role: 'Director of Ops @ Velocity',
    content: 'Cleanest interface in the SaaS world. DeepSync makes state management feel invisible.',
    avatar: 'https://picsum.photos/seed/elena/100/100',
    rating: 5,
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Head of Growth @ Spark',
    content: 'Finally, a tool that focuses on actionable wisdom rather than just raw database telemetry.',
    avatar: 'https://picsum.photos/seed/david/100/100',
    rating: 5,
  },
];

export const DASHBOARD_METRICS: Metric[] = [
  { label: 'DeepSync Capital', value: '$1.2M', change: '+12.5%', trend: 'up' },
  { label: 'Active Agents', value: '482', change: '+3.2%', trend: 'up' },
  { label: 'Vault Latency', value: '0.04ms', change: '-2.1%', trend: 'down' },
  { label: 'Mesh Sync Rate', value: '18.4%', change: '+5.7%', trend: 'up' },
];
