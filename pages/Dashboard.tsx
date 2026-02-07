
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  BarChart2, 
  Users, 
  Settings, 
  Search, 
  Bell, 
  ChevronRight, 
  TrendingUp,
  MoreVertical,
  Plus,
  Command,
  Zap,
  MapPin,
  Workflow,
  Database,
  Sun,
  Moon,
  ShieldAlert,
  Layers,
  Menu,
  X,
  ShieldAlert as OverwatchIcon,
  LogOut,
  UserPlus,
  Activity
} from 'lucide-react';
// Fixed: Explicitly importing named exports from react-router-dom
import { Link, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import UserAvatar from '../components/UserAvatar';
import { DASHBOARD_METRICS } from '../constants';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../App';
import AgenticLayer from './AgenticLayer';
import NeuralAbilities from './NeuralAbilities';
import Overwatch from './Overwatch';
import NeuralDashboard from './NeuralDashboard';

const data = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
  { name: 'Jul', value: 7000 },
];

const SidebarItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean; to: string; onClick?: () => void; isRestricted?: boolean }> = ({ icon, label, active, to, onClick, isRestricted }) => (
  <Link 
    to={to} 
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl cursor-pointer transition-all group ${active ? 'bg-teal/10 text-teal border border-teal/20 shadow-[0_0_15px_rgba(45,212,191,0.1)]' : 'text-slate-500 dark:text-white/30 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'}`}
  >
    <div className={isRestricted ? 'text-red-500' : ''}>{icon}</div>
    <span className="text-sm font-bold tracking-tight">{label}</span>
    {isRestricted && <span className="ml-auto text-[8px] font-black uppercase bg-red-500/20 text-red-500 px-1.5 py-0.5 rounded border border-red-500/20">Staff</span>}
  </Link>
);

const DashboardOverview = () => {
  const { theme } = useTheme();
  return (
    <div className="space-y-10 relative z-10 text-left">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h2 className="text-4xl font-black font-geist tracking-tighter mb-2 text-slate-900 dark:text-white">Neural Mesh HUD</h2>
          <p className="text-slate-500 dark:text-white/40 text-lg font-medium flex items-center gap-2">
            <Database size={16} className="text-teal" /> DeepSync active across all abilities.
          </p>
        </div>
        <div className="flex gap-4">
          <Link to="/dashboard/abilities" className="px-6 py-3 bg-white dark:bg-surface border border-slate-200 dark:border-white/10 rounded-2xl text-sm font-bold hover:bg-teal/10 hover:text-teal transition-all shadow-sm dark:shadow-none flex items-center gap-2">
            <Zap size={14} /> Config Skills
          </Link>
          <button className="flex items-center gap-2 bg-teal text-black px-6 py-3 rounded-2xl text-sm font-black hover:shadow-[0_0_20px_rgba(45,212,191,0.3)] transition-all">
            <Plus size={20} /> Sync New Node
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {DASHBOARD_METRICS.map((metric, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 bg-white dark:bg-surface border border-slate-200 dark:border-white/5 rounded-[2.5rem] relative overflow-hidden group hover:border-teal/20 transition-all shadow-xl dark:shadow-none glass-card"
          >
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <TrendingUp size={16} className={metric.trend === 'up' ? 'text-teal' : 'text-pink-500'} />
            </div>
            <p className="text-[10px] text-slate-400 dark:text-white/30 uppercase tracking-[0.2em] font-black mb-4">{metric.label}</p>
            <div className="flex items-baseline justify-between mb-6">
              <h3 className="text-4xl font-black font-geist tabular-nums tracking-tighter text-slate-900 dark:text-white">{metric.value}</h3>
              <span className={`text-xs font-black tracking-tight ${metric.trend === 'up' ? 'text-teal' : 'text-pink-500'}`}>
                {metric.change}
              </span>
            </div>
            <div className="h-1 w-full bg-slate-100 dark:bg-void rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${Math.random() * 50 + 40}%` }}
                transition={{ duration: 1.5, delay: 0.5 + i * 0.1, ease: "circOut" }}
                className={`h-full ${metric.trend === 'up' ? 'bg-teal' : 'bg-pink-500'}`}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 p-10 bg-white dark:bg-surface border border-slate-200 dark:border-white/5 rounded-[3rem] min-h-[500px] relative overflow-hidden shadow-xl dark:shadow-none glass-card">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-teal/20 to-transparent" />
          <div className="flex justify-between items-start mb-12">
            <div>
              <h3 className="text-2xl font-black font-geist tracking-tight text-slate-900 dark:text-white">Sync Trajectory</h3>
              <p className="text-slate-400 dark:text-white/30 font-medium">DeepSync Performance across all nodes.</p>
            </div>
            <div className="flex gap-2 p-1 bg-slate-100 dark:bg-void rounded-xl border border-slate-200 dark:border-white/5">
                {['Hourly', 'Daily', 'Weekly'].map(t => (
                  <button key={t} className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${t === 'Daily' ? 'bg-teal text-black' : 'text-slate-400 dark:text-white/30 hover:text-slate-900 dark:hover:text-white'}`}>
                    {t}
                  </button>
                ))}
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2DD4BF" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#2DD4BF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)"} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: theme === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.4)', fontSize: 10, fontWeight: 700 }} 
                  dy={20}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: theme === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.4)', fontSize: 10, fontWeight: 700 }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    background: theme === 'dark' ? '#08080E' : '#FFFFFF', 
                    border: theme === 'dark' ? '1px solid rgba(45, 212, 191, 0.2)' : '1px solid rgba(0,0,0,0.05)', 
                    borderRadius: '20px', 
                    padding: '16px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)'
                  }}
                  itemStyle={{ color: '#2DD4BF', fontWeight: 'bold' }}
                  cursor={{ stroke: '#2DD4BF', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#2DD4BF" 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                  strokeWidth={4}
                  animationDuration={3000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-10 bg-white dark:bg-surface border border-slate-200 dark:border-white/5 rounded-[3rem] relative overflow-hidden flex flex-col shadow-xl dark:shadow-none glass-card">
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-teal/5 blur-3xl rounded-full" />
          <div className="flex justify-between items-center mb-10 text-left">
            <h3 className="text-2xl font-black font-geist tracking-tight text-slate-900 dark:text-white">Neural Mesh Pulse</h3>
            <span className="flex items-center gap-2 text-[10px] text-teal font-black uppercase tracking-widest">
                <div className="w-1.5 h-1.5 bg-teal rounded-full animate-pulse" /> Synchronized
            </span>
          </div>
          <div className="space-y-8 flex-1 text-left">
            {[
              { firstName: 'Jessica', lastName: 'Smith', action: 'DeepSync: CRM Vault update', time: '12m ago', color: 'bg-teal' },
              { firstName: 'Robert', lastName: 'Fox', action: 'Partition verified in S3', time: '1h ago', color: 'bg-teal' },
              { firstName: 'Jane', lastName: 'Doe', action: 'Constitution consolidated', time: '3h ago', color: 'bg-teal' },
              { firstName: 'Mark', lastName: 'Cubes', action: 'Schema evolution detected', time: '5h ago', color: 'bg-teal' },
              { firstName: 'Elena', lastName: 'Rivers', action: 'Mesh parity reached', time: '1d ago', color: 'bg-teal' }
            ].map((act, i) => (
              <div key={i} className="flex items-start gap-4 group cursor-pointer">
                <UserAvatar firstName={act.firstName} lastName={act.lastName} size="md" />
                <div className="flex-1 pb-1">
                  <p className="text-sm font-bold leading-tight group-hover:text-teal transition-colors text-slate-600 dark:text-white/40">
                    <span className="text-slate-900 dark:text-white font-black">{act.firstName} {act.lastName}</span> <br />
                    <span className="text-xs font-medium">{act.action}</span>
                  </p>
                  <p className="text-[10px] text-slate-400 dark:text-white/20 mt-1 uppercase font-bold tracking-widest">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SidebarContent: React.FC<{ onLinkClick?: () => void }> = ({ onLinkClick }) => {
  const location = useLocation();
  return (
    <>
      <nav className="flex-1 space-y-2 text-left">
        <div className="text-[10px] text-slate-400 dark:text-white/20 uppercase tracking-[0.2em] font-black mb-4 px-4">Workspace</div>
        <SidebarItem onClick={onLinkClick} icon={<Layers size={20} />} label="Agentic Layer" to="/dashboard" active={location.pathname === '/dashboard'} />
        <SidebarItem onClick={onLinkClick} icon={<Activity size={20} />} label="Neural Dashboard" to="/dashboard/neural" active={location.pathname === '/dashboard/neural'} />
        <SidebarItem onClick={onLinkClick} icon={<Zap size={20} />} label="Skills Configurator" to="/dashboard/abilities" active={location.pathname === '/dashboard/abilities'} />
        <SidebarItem onClick={onLinkClick} icon={<LayoutDashboard size={20} />} label="Analytics Overview" to="/dashboard/overview" active={location.pathname === '/dashboard/overview'} />
        <SidebarItem onClick={onLinkClick} icon={<Workflow size={20} />} label="Neural Mesh HUD" to="/deepsync" />
        <SidebarItem onClick={onLinkClick} icon={<Users size={20} />} label="Team IQ Node" to="/intelligence" />
        <SidebarItem onClick={onLinkClick} icon={<Database size={20} />} label="DeepSync Vault" to="#" />
        <div className="pt-8 text-[10px] text-slate-400 dark:text-white/20 uppercase tracking-[0.2em] font-black mb-4 px-4">Governance</div>
        <SidebarItem onClick={onLinkClick} icon={<OverwatchIcon size={20} />} label="Overwatch HUD" to="/dashboard/overwatch" active={location.pathname === '/dashboard/overwatch'} isRestricted />
        <SidebarItem onClick={onLinkClick} icon={<ShieldAlert size={20} />} label="The Constitution" to="/branding" />
        <SidebarItem onClick={onLinkClick} icon={<Settings size={20} />} label="System Protocols" to="#" />
      </nav>

      <div className="mt-auto p-6 bg-gradient-to-br from-teal/5 to-transparent dark:from-teal/10 dark:to-transparent border border-slate-200 dark:border-teal/20 rounded-[2rem] relative overflow-hidden group shadow-sm transition-colors duration-300 text-left">
        <div className="absolute top-0 right-0 w-24 h-24 bg-teal/5 blur-3xl rounded-full" />
        <p className="text-xs text-teal font-black uppercase tracking-widest mb-3 flex items-center gap-2">
          <MapPin size={12} className="animate-pulse" /> Vault: PHX-01
        </p>
        <p className="text-sm font-bold text-slate-600 dark:text-white/80 leading-snug mb-5">Neural Mesh is synchronizing with DeepSync nodes.</p>
        <button className="w-full py-3 bg-slate-900 dark:bg-teal/20 text-white dark:text-teal text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-teal hover:text-black transition-all">
          Mesh Latency: 0.04ms
        </button>
      </div>
    </>
  );
};

const Dashboard: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close profile menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setShowProfileMenu(false);
    navigate('/login');
  };

  const handleSwitchAccount = () => {
    setShowProfileMenu(false);
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-lightSurface dark:bg-void text-slate-900 dark:text-white overflow-hidden selection:bg-teal selection:text-black transition-colors duration-300">
      
      {/* Desktop Sidebar */}
      <aside className="w-72 bg-white dark:bg-surface/50 backdrop-blur-3xl border-r border-slate-200 dark:border-white/5 flex flex-col p-8 hidden xl:flex relative z-30 transition-colors duration-300">
        <div className="mb-12 px-2">
          <Logo size="md" />
        </div>
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] xl:hidden"
            />
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-white dark:bg-surface z-[70] p-8 flex flex-col xl:hidden overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-12">
                <Logo size="md" />
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-slate-400 hover:text-teal transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <SidebarContent onLinkClick={() => setMobileMenuOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto relative transition-colors duration-300">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(45,212,191,0.06),transparent_50%)] pointer-events-none" />
        
        {/* Top bar */}
        <header className="h-24 shrink-0 border-b border-slate-200 dark:border-white/5 flex items-center justify-between px-6 md:px-10 bg-white/70 dark:bg-void/50 backdrop-blur-md sticky top-0 z-20 transition-colors duration-300 gap-4">
          <div className="flex items-center gap-4 flex-1">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="xl:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-surface border border-slate-200 dark:border-white/5 text-slate-400"
            >
              <Menu size={20} />
            </button>
            <div className="hidden md:flex items-center gap-4 bg-slate-100 dark:bg-surface border border-slate-200 dark:border-white/5 rounded-2xl px-5 py-3 w-full max-w-lg group focus-within:border-teal/30 transition-all">
              <Command size={18} className="text-slate-400 dark:text-white/20 group-focus-within:text-teal transition-colors" />
              <input 
                type="text" 
                placeholder="Consult the DeepSync Vault... (⌘ + K)" 
                className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-400 dark:placeholder:text-white/10 font-medium text-slate-900 dark:text-white"
              />
            </div>
            {/* Small mobile logo search replacement */}
            <div className="md:hidden flex items-center gap-2">
               <Logo size="sm" hideText />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            <button 
              onClick={toggleTheme}
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl border border-slate-200 dark:border-white/5 bg-white dark:bg-surface text-slate-400 dark:text-white/30 hover:text-teal transition-all shadow-sm dark:shadow-none"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </motion.div>
              </AnimatePresence>
            </button>

            <button className="relative w-10 h-10 md:w-12 md:h-12 rounded-xl border border-slate-200 dark:border-white/5 bg-white dark:bg-surface flex items-center justify-center text-slate-400 dark:text-white/30 hover:text-teal transition-all shadow-sm dark:shadow-none">
              <Bell size={20} />
              <div className="absolute top-2.5 right-2.5 md:top-3 md:right-3 w-1.5 h-1.5 md:w-2 md:h-2 bg-pink-500 rounded-full border-2 border-white dark:border-surface" />
            </button>
            
            <div className="relative" ref={profileMenuRef}>
              <div 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-4 pl-4 md:pl-6 border-l border-slate-200 dark:border-white/10 group cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 p-2 rounded-2xl transition-all"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-black tracking-tight text-slate-900 dark:text-white">Alex Rivers</p>
                  <p className="text-[10px] text-teal font-bold uppercase tracking-widest">Overseer</p>
                </div>
                <UserAvatar firstName="Alex" lastName="Rivers" size="md" />
              </div>

              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-4 w-64 bg-white/90 dark:bg-surface/90 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-[2rem] shadow-2xl p-4 z-50 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-teal/5 to-transparent pointer-events-none" />
                    
                    <div className="relative z-10">
                      <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 mb-2">
                        <p className="text-xs font-black text-slate-400 dark:text-white/20 uppercase tracking-widest mb-1">Authenticated As</p>
                        <p className="text-sm font-black text-slate-900 dark:text-white">alex@teamstrength.us</p>
                      </div>

                      <div className="space-y-1">
                        <button 
                          onClick={handleSwitchAccount}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-teal/10 text-slate-600 dark:text-white/60 hover:text-teal transition-all text-left group"
                        >
                          <UserPlus size={18} className="group-hover:scale-110 transition-transform" />
                          <span className="text-xs font-black uppercase tracking-widest">Switch Account</span>
                        </button>
                        
                        <button 
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-slate-600 dark:text-white/60 hover:text-red-500 transition-all text-left group"
                        >
                          <LogOut size={18} className="group-hover:scale-110 transition-transform" />
                          <span className="text-xs font-black uppercase tracking-widest">Sign Out Protocol</span>
                        </button>
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-center gap-2 text-[8px] font-black text-slate-400 dark:text-white/10 uppercase tracking-[0.2em]">
                        <ShieldAlert size={10} /> Mesh Session Valid
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-4 md:p-10 min-h-full">
          <Routes>
            <Route index element={<AgenticLayer />} />
            <Route path="neural" element={<NeuralDashboard />} />
            <Route path="abilities" element={<NeuralAbilities />} />
            <Route path="overview" element={<DashboardOverview />} />
            <Route path="overwatch" element={<Overwatch />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;