import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Users, DollarSign, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import UserMenu from './UserMenu';
import { useTheme } from './ThemeContext';
import { useAuth } from './AuthContext';

const revenueData = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 2000 },
  { name: 'Thu', revenue: 2780 },
  { name: 'Fri', revenue: 1890 },
  { name: 'Sat', revenue: 2390 },
  { name: 'Sun', revenue: 3490 },
];

const salesData = [
  { name: 'Mon', sales: 24 },
  { name: 'Tue', sales: 13 },
  { name: 'Wed', sales: 98 },
  { name: 'Thu', sales: 39 },
  { name: 'Fri', sales: 48 },
  { name: 'Sat', sales: 38 },
  { name: 'Sun', sales: 43 },
];

export default function DashboardPage() {
  const { theme } = useTheme();
  const { isAdmin } = useAuth();
  const isDark = theme === 'dark';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!isAdmin) {
    return (
      <div className={`min-h-screen flex items-center justify-center font-sans transition-colors duration-1000 ${isDark ? 'bg-black text-white' : 'bg-gray-50 text-black'}`}>
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">Access Denied</h1>
          <p className="text-gray-500 mb-8">You do not have permission to view the dashboard.</p>
          <Link to="/" className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold hover:scale-105 transition-transform">
            Go to Market
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen font-sans pb-24 transition-colors duration-1000 ${isDark ? 'bg-transparent text-white' : 'bg-gray-50 text-black'}`}>
      <nav className={`h-[80px] w-full px-8 md:px-16 flex items-center justify-between border-b sticky top-0 z-50 transition-colors duration-1000 ${isDark ? 'bg-black/20 border-white/10 text-white backdrop-blur-md' : 'bg-white/80 border-gray-200 text-black backdrop-blur-md'}`}>
        <Link to="/" className="text-2xl font-black tracking-[0.25em] uppercase">Bizleap</Link>
        <div className="flex items-center gap-6">
          <UserMenu />
        </div>
      </nav>

      <div className="max-w-[1200px] mx-auto px-8 md:px-16 mt-12 relative">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 font-bold hover:text-black dark:text-white mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Market
        </Link>

        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-8">Admin Overview</h1>

        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard title="Total Revenue" value="₹45,231.89" icon={<DollarSign />} trend="+20.1% from last month" isDark={isDark} />
          <StatCard title="Total Sales" value="+2350" icon={<TrendingUp />} trend="+180.1% from last month" isDark={isDark} />
          <StatCard title="Active Users" value="+12,234" icon={<Users />} trend="+19% from last month" isDark={isDark} />
          <StatCard title="Active Sessions" value="+573" icon={<Activity />} trend="+201 since last hour" isDark={isDark} />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-panel p-8 rounded-[2rem] bg-white dark:bg-black border border-gray-200 dark:border-white/10 shadow-xl">
            <h3 className="text-xl font-bold mb-6">Revenue Over Time</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={isDark ? "#8b5cf6" : "#3b82f6"} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={isDark ? "#8b5cf6" : "#3b82f6"} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke={isDark ? "#666" : "#999"} />
                  <YAxis stroke={isDark ? "#666" : "#999"} />
                  <Tooltip contentStyle={{ backgroundColor: isDark ? '#111' : '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
                  <Area type="monotone" dataKey="revenue" stroke={isDark ? "#8b5cf6" : "#3b82f6"} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-[2rem] bg-white dark:bg-black border border-gray-200 dark:border-white/10 shadow-xl">
            <h3 className="text-xl font-bold mb-6">Sales by Day</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <XAxis dataKey="name" stroke={isDark ? "#666" : "#999"} />
                  <YAxis stroke={isDark ? "#666" : "#999"} />
                  <Tooltip cursor={{fill: isDark ? '#222' : '#f5f5f5'}} contentStyle={{ backgroundColor: isDark ? '#111' : '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="sales" fill={isDark ? "#ec4899" : "#10b981"} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend, isDark }) {
  return (
    <div className="glass-panel p-6 rounded-[1.5rem] bg-white dark:bg-black border border-gray-200 dark:border-white/10 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">{title}</p>
          <h4 className="text-3xl font-black">{value}</h4>
        </div>
        <div className={`p-3 rounded-xl ${isDark ? 'bg-white/5 text-gray-300' : 'bg-black/5 text-gray-600'}`}>
          {icon}
        </div>
      </div>
      <p className="text-sm font-medium text-gray-400">
        {trend}
      </p>
    </div>
  );
}
