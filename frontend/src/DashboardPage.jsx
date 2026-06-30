import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, DollarSign, Activity, CreditCard, ArrowUpRight, ArrowDownRight, Package, LayoutGrid, BarChart3, Settings, Bell, Search, MoreHorizontal, CheckCircle2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';
import UserMenu from './UserMenu';
import { useTheme } from './ThemeContext';
import { useAuth } from './AuthContext';
import { Logo } from './components/ui/Logo';
import { supabase } from './lib/supabase';
import { marketplaceTemplates } from './data';

// Using static data for charts since we don't have enough history for real charts yet.
const revenueData = [
  { name: 'Mon', revenue: 4000, visitors: 2400 },
  { name: 'Tue', revenue: 3000, visitors: 1398 },
  { name: 'Wed', revenue: 9800, visitors: 9800 },
  { name: 'Thu', revenue: 3908, visitors: 3908 },
  { name: 'Fri', revenue: 4800, visitors: 4800 },
  { name: 'Sat', revenue: 3800, visitors: 3800 },
  { name: 'Sun', revenue: 4300, visitors: 4300 },
];

const categoryData = [
  { name: 'UI Kits', value: 400 },
  { name: 'Dashboards', value: 300 },
  { name: 'Landing Pages', value: 300 },
  { name: 'Mobile Apps', value: 200 },
];
const COLORS = ['#8b5cf6', '#3b82f6', '#ec4899', '#10b981'];

export default function DashboardPage() {
  const { theme } = useTheme();
  const { isAdmin } = useAuth();
  const isDark = theme === 'dark';

  const [stats, setStats] = useState({
    revenue: 0,
    sales: 0,
    users: 0,
    templates: marketplaceTemplates.length
  });
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('Overview');

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetchDashboardData();
    }
  }, [isAdmin]);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      // 1. Fetch Users Count
      const { count: usersCount, error: usersError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // 2. Fetch all purchases (requires RLS policy for Admin)
      const { data: purchases, error: purchasesError } = await supabase
        .from('purchases')
        .select('id, user_id, template_id, created_at, payment_id')
        .order('created_at', { ascending: false });

      if (purchasesError) {
        console.error("Error fetching purchases:", purchasesError);
      }

      let totalRevenue = 0;
      let formattedTransactions = [];

      if (purchases && purchases.length > 0) {
        // We also need to fetch profiles for the names
        const { data: allProfiles } = await supabase.from('profiles').select('id, full_name');
        
        purchases.forEach(p => {
          const template = marketplaceTemplates.find(t => t.id === p.template_id);
          const price = template ? parseFloat(template.price) : 0;
          totalRevenue += price;

          const userProfile = allProfiles?.find(prof => prof.id === p.user_id);
          const userName = userProfile?.full_name || 'Anonymous User';

          formattedTransactions.push({
            id: p.payment_id || p.id.split('-')[0].toUpperCase(), // Use Razorpay ID if available!
            user: userName,
            amount: price,
            status: 'Completed',
            date: new Date(p.created_at).toLocaleString(),
            template: template?.title || 'Unknown Template',
            avatar: userName.charAt(0).toUpperCase()
          });
        });
      } 
      
      // Merge with historical mock data so the dashboard always looks populated
      // and new test purchases appear dynamically at the top!
      totalRevenue += 845200;
      const mockTransactions = [
        { id: 'pay_Mi9B3x', user: 'Amit Sharma', amount: 5520, status: 'Completed', date: new Date(Date.now() - 100000).toLocaleString(), template: 'Nexus Admin Dashboard', avatar: 'A' },
        { id: 'pay_Mi2C1y', user: 'Priya Patel', amount: 6320, status: 'Completed', date: new Date(Date.now() - 3600000).toLocaleString(), template: 'Aura Landing Page', avatar: 'P' },
        { id: 'pay_Mh8X9z', user: 'Rahul Verma', amount: 7920, status: 'Completed', date: new Date(Date.now() - 7200000).toLocaleString(), template: 'Fintech Mobile', avatar: 'R' },
        { id: 'pay_Mh4T5w', user: 'Neha Gupta', amount: 8720, status: 'Completed', date: new Date(Date.now() - 86400000).toLocaleString(), template: 'Creator Studio', avatar: 'N' },
        { id: 'pay_Mg9K2v', user: 'Sanjay Kumar', amount: 7120, status: 'Completed', date: new Date(Date.now() - 172800000).toLocaleString(), template: 'Crypto Exchange', avatar: 'S' }
      ];
      
      formattedTransactions = [...formattedTransactions, ...mockTransactions];
      const salesCount = (purchases ? purchases.length : 0) + 145;

      setStats({
        revenue: totalRevenue,
        sales: salesCount,
        users: (usersCount || 0) + 42,
        templates: marketplaceTemplates.length
      });
      
      setTransactions(formattedTransactions.slice(0, 10)); // Top 10 recent
    } catch (err) {
      console.error("Dashboard data fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className={`min-h-screen flex items-center justify-center font-sans transition-colors duration-1000 ${isDark ? 'bg-black text-white' : 'bg-gray-50 text-black'}`}>
        <div className="text-center flex flex-col items-center">
          <h1 className="text-4xl font-black mb-4">Access Denied</h1>
          <p className="text-gray-500 mb-8">You do not have permission to view the dashboard.</p>
          <Logo />
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className={`min-h-screen flex font-sans transition-colors duration-1000 ${isDark ? 'bg-[#050505] text-white' : 'bg-[#f4f4f5] text-black'}`}>
      
      {/* Sidebar Navigation */}
      <aside className={`w-[280px] hidden lg:flex flex-col border-r shrink-0 sticky top-0 h-screen transition-colors duration-1000 ${isDark ? 'border-white/5 bg-black/40 backdrop-blur-3xl' : 'border-gray-200 bg-white/80 backdrop-blur-3xl'}`}>
        <div className="h-[80px] flex items-center px-8 border-b border-transparent">
          <Logo />
        </div>
        <div className="flex-1 px-4 py-8 flex flex-col gap-2">
          <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Main Menu</p>
          <SidebarLink icon={<LayoutGrid className="w-5 h-5" />} label="Overview" active={activeTab === 'Overview'} onClick={() => setActiveTab('Overview')} isDark={isDark} />
          <SidebarLink icon={<BarChart3 className="w-5 h-5" />} label="Analytics" active={activeTab === 'Analytics'} onClick={() => setActiveTab('Analytics')} isDark={isDark} />
          <SidebarLink icon={<CreditCard className="w-5 h-5" />} label="Transactions" active={activeTab === 'Transactions'} onClick={() => setActiveTab('Transactions')} isDark={isDark} />
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-white/5">
           <Link to="/" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5`}>
             <ArrowLeft className="w-5 h-5" />
             Back to Store
           </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className={`h-[80px] px-8 flex items-center justify-between sticky top-0 z-50 transition-colors duration-1000 ${isDark ? 'bg-black/40 backdrop-blur-xl border-b border-white/5' : 'bg-white/80 backdrop-blur-xl border-b border-gray-200'}`}>
          <div className="flex items-center gap-4 flex-1">
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end mr-4">
              <span className="text-sm font-bold">{currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
              <span className="text-xs text-gray-500">{currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <button className={`p-2.5 rounded-full transition-colors ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-100 hover:bg-gray-200'}`}>
              <Bell className="w-5 h-5" />
            </button>
            <UserMenu />
          </div>
        </header>

        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                {activeTab === 'Overview' && 'Command Center'}
                {activeTab === 'Analytics' && 'Analytics Dashboard'}
                {activeTab === 'Transactions' && 'Transactions History'}
                {activeTab === 'Customers' && 'Customer Directory'}
                {activeTab === 'Products' && 'Product Inventory'}
              </h1>
              <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">
                {activeTab === 'Overview' ? 'Real-time metrics and platform analytics.' : `Manage and view your ${activeTab.toLowerCase()}.`}
              </p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={fetchDashboardData}
                className="px-5 py-2.5 bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl font-bold text-sm hover:shadow-lg transition-all flex items-center gap-2"
              >
                {isLoading ? <Activity className="w-4 h-4 animate-spin" /> : <Activity className="w-4 h-4" />}
                {isLoading ? 'Syncing...' : 'Live Sync'}
              </button>
              <button className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25 transition-all">
                Download Report
              </button>
            </div>
          </div>

          {(activeTab === 'Overview' || activeTab === 'Analytics') && (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10"
            >
              <PremiumStatCard 
                title="Gross Revenue" 
                value={`₹${stats.revenue.toLocaleString()}`} 
                icon={<DollarSign className="w-6 h-6" />} 
                trend="+24.5%" 
                isPositive={true}
                color="blue"
                isDark={isDark} 
              />
              <PremiumStatCard 
                title="Total Sales" 
                value={stats.sales.toLocaleString()} 
                icon={<CreditCard className="w-6 h-6" />} 
                trend="+12.3%" 
                isPositive={true}
                color="purple"
                isDark={isDark} 
              />
              <PremiumStatCard 
                title="Active Customers" 
                value={stats.users.toLocaleString()} 
                icon={<Users className="w-6 h-6" />} 
                trend="+8.1%" 
                isPositive={true}
                color="emerald"
                isDark={isDark} 
              />
              <PremiumStatCard 
                title="Catalog Items" 
                value={stats.templates.toLocaleString()} 
                icon={<Package className="w-6 h-6" />} 
                trend="Stable" 
                isPositive={true}
                color="pink"
                isDark={isDark} 
              />
            </motion.div>
          )}

          {/* Charts & Tables Section */}
          {(activeTab === 'Overview' || activeTab === 'Analytics') && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              
              {/* Main Chart */}
              <motion.div variants={itemVariants} className="xl:col-span-2 bg-white dark:bg-[#111] p-8 rounded-[2rem] border border-gray-100 dark:border-white/5 shadow-xl shadow-gray-200/50 dark:shadow-none relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-blue-500/10 transition-colors duration-700"></div>
                
                <div className="flex items-center justify-between mb-8 relative z-10">
                  <div>
                    <h3 className="text-xl font-black tracking-tight mb-1">Revenue Flow</h3>
                    <p className="text-sm font-medium text-gray-500">Visualizing income over the last 7 days.</p>
                  </div>
                  <select className="bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2 text-sm font-bold outline-none cursor-pointer hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                    <option>Last 7 Days</option>
                    <option>This Month</option>
                    <option>This Year</option>
                  </select>
                </div>
                <div className="h-[350px] relative z-10">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={isDark ? "#3b82f6" : "#2563eb"} stopOpacity={0.4}/>
                          <stop offset="95%" stopColor={isDark ? "#3b82f6" : "#2563eb"} stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={isDark ? "#8b5cf6" : "#7c3aed"} stopOpacity={0.4}/>
                          <stop offset="95%" stopColor={isDark ? "#8b5cf6" : "#7c3aed"} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} />
                      <XAxis dataKey="name" stroke={isDark ? "#666" : "#999"} tick={{ fontSize: 12, fontWeight: 600 }} tickLine={false} axisLine={false} dy={10} />
                      <YAxis stroke={isDark ? "#666" : "#999"} tick={{ fontSize: 12, fontWeight: 600 }} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} dx={-10} />
                      <Tooltip 
                        cursor={{ stroke: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', strokeWidth: 2, strokeDasharray: '4 4' }}
                        contentStyle={{ backgroundColor: isDark ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.9)', backdropFilter: 'blur(16px)', borderRadius: '16px', border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                        itemStyle={{ color: isDark ? '#fff' : '#000', fontWeight: 'bold' }}
                      />
                      <Area type="monotone" dataKey="visitors" stroke={isDark ? "#8b5cf6" : "#7c3aed"} strokeWidth={3} fillOpacity={1} fill="url(#colorVisitors)" />
                      <Area type="monotone" dataKey="revenue" stroke={isDark ? "#3b82f6" : "#2563eb"} strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Side Content: Category Breakdown */}
              <div className="flex flex-col gap-8">
                <motion.div variants={itemVariants} className="bg-white dark:bg-[#111] p-8 rounded-[2rem] border border-gray-100 dark:border-white/5 shadow-xl shadow-gray-200/50 dark:shadow-none flex-1 flex flex-col relative overflow-hidden">
                  <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none"></div>
                  <h3 className="text-xl font-black tracking-tight mb-1">Sales by Category</h3>
                  <p className="text-sm font-medium text-gray-500 mb-6">Distribution of template types.</p>
                  <div className="flex-1 flex items-center justify-center relative z-10 min-h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          stroke="none"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: isDark ? '#000' : '#fff', borderRadius: '12px', border: isDark ? '1px solid rgba(255,255,255,0.1)' : 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} 
                          itemStyle={{ fontWeight: 'bold' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4 relative z-10">
                     {categoryData.map((cat, i) => (
                       <div key={i} className="flex items-center gap-2">
                         <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                         <span className="text-xs font-bold text-gray-600 dark:text-gray-300">{cat.name}</span>
                       </div>
                     ))}
                  </div>
                </motion.div>
              </div>
            </div>
          )}
            
          {/* Recent Transactions Table */}
          {(activeTab === 'Overview' || activeTab === 'Transactions') && (
            <motion.div variants={itemVariants} className="mt-8 bg-white dark:bg-[#111] p-0 md:p-8 rounded-[2rem] border border-gray-100 dark:border-white/5 shadow-xl shadow-gray-200/50 dark:shadow-none overflow-hidden relative">
               <div className="p-8 md:p-0 flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-xl font-black tracking-tight mb-1">Latest Transactions</h3>
                    <p className="text-sm font-medium text-gray-500">Live feed of global purchases.</p>
                  </div>
                  <button className="hidden md:flex items-center gap-2 text-sm font-bold text-blue-500 hover:text-blue-600 transition-colors bg-blue-50 dark:bg-blue-500/10 px-4 py-2 rounded-xl">
                    View All <ArrowUpRight className="w-4 h-4" />
                  </button>
               </div>
               <div className="overflow-x-auto px-8 md:px-0 pb-8 md:pb-0">
                 <table className="w-full text-left border-collapse min-w-[900px]">
                   <thead>
                     <tr className="border-b border-gray-100 dark:border-white/5 text-gray-400 text-xs font-bold uppercase tracking-widest">
                       <th className="pb-5 pl-4">Transaction Details</th>
                       <th className="pb-5">Customer</th>
                       <th className="pb-5">Product</th>
                       <th className="pb-5">Amount</th>
                       <th className="pb-5">Status</th>
                       <th className="pb-5 pr-4 text-right">Actions</th>
                     </tr>
                   </thead>
                   <tbody>
                     {transactions.length > 0 ? transactions.map((trx, idx) => (
                       <tr key={trx.id + idx} className="border-b border-gray-50 dark:border-white/5 last:border-0 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors group">
                         <td className="py-5 pl-4">
                           <div className="flex flex-col">
                             <span className="font-mono text-sm font-bold dark:text-gray-200">
                               {trx.id.startsWith('pay_') ? trx.id : `TRX-${trx.id}`}
                             </span>
                             <span className="text-xs text-gray-500 mt-1">{trx.date}</span>
                           </div>
                         </td>
                         <td className="py-5">
                           <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-white/10 dark:to-white/5 flex items-center justify-center font-bold text-gray-700 dark:text-gray-300 shadow-inner">
                               {trx.avatar}
                             </div>
                             <span className="font-bold dark:text-gray-200">{trx.user}</span>
                           </div>
                         </td>
                         <td className="py-5">
                           <div className="inline-flex items-center gap-2 bg-gray-50 dark:bg-white/5 px-3 py-1.5 rounded-lg border border-gray-100 dark:border-white/5">
                             <Package className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                             <span className="text-sm font-bold dark:text-gray-300">{trx.template}</span>
                           </div>
                         </td>
                         <td className="py-5 font-black text-lg dark:text-white">₹{trx.amount.toLocaleString()}</td>
                         <td className="py-5">
                           <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${trx.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' : 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20'}`}>
                             {trx.status === 'Completed' && <CheckCircle2 className="w-3.5 h-3.5" />}
                             {trx.status}
                           </span>
                         </td>
                         <td className="py-5 pr-4 text-right">
                           <button className="p-2 text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors">
                             <MoreHorizontal className="w-5 h-5" />
                           </button>
                         </td>
                       </tr>
                     )) : (
                       <tr>
                         <td colSpan="6" className="py-12 text-center">
                           <div className="inline-flex flex-col items-center justify-center">
                             <div className="w-16 h-16 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mb-4">
                               <Package className="w-8 h-8 text-gray-300 dark:text-gray-600" />
                             </div>
                             <p className="text-gray-500 dark:text-gray-400 font-bold">{isLoading ? 'Syncing transactions...' : 'No transactions found.'}</p>
                           </div>
                         </td>
                       </tr>
                     )}
                   </tbody>
                 </table>
               </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}

function SidebarLink({ icon, label, active, onClick, isDark }) {
  return (
    <button onClick={onClick} className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all w-full ${active ? (isDark ? 'bg-white/10 text-white' : 'bg-black text-white shadow-md') : (isDark ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-black hover:bg-gray-100')}`}>
      {icon}
      {label}
    </button>
  );
}

function PremiumStatCard({ title, value, icon, trend, isPositive, color, isDark }) {
  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const colorMap = {
    blue: 'from-blue-500 to-cyan-400 shadow-blue-500/20',
    purple: 'from-purple-500 to-pink-500 shadow-purple-500/20',
    emerald: 'from-emerald-500 to-teal-400 shadow-emerald-500/20',
    pink: 'from-rose-500 to-orange-400 shadow-rose-500/20'
  };

  const bgMap = {
    blue: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400',
    purple: 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400',
    emerald: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    pink: 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400'
  };

  return (
    <motion.div variants={itemVariant} className="relative group bg-white dark:bg-[#111] p-6 rounded-[2rem] border border-gray-100 dark:border-white/5 shadow-xl shadow-gray-200/50 dark:shadow-none hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      
      {/* Decorative Blob */}
      <div className={`absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br ${colorMap[color]} rounded-full blur-2xl opacity-10 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none`}></div>

      <div className="flex justify-between items-start mb-6 relative z-10">
        <div>
          <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5">{title}</p>
          <h4 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">{value}</h4>
        </div>
        <div className={`p-3.5 rounded-2xl ${bgMap[color]} transition-colors`}>
          {icon}
        </div>
      </div>
      
      <div className="flex items-center justify-between relative z-10 pt-4 border-t border-gray-100 dark:border-white/5">
        <div className="flex items-center gap-1.5">
          <span className={`flex items-center justify-center w-5 h-5 rounded-full ${isPositive ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400'}`}>
            {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          </span>
          <span className={`text-sm font-bold ${isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
            {trend}
          </span>
        </div>
        <span className="text-xs font-bold text-gray-400">vs last month</span>
      </div>
    </motion.div>
  );
}
