import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom'; 
import { 
  AreaChart, Area, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { 
  LayoutDashboard, MessageSquare, User, TrendingUp, Search, X, 
  Settings, CreditCard, ShieldCheck, LogOut, ChevronRight, 
  ArrowUpRight, Radar 
} from 'lucide-react';

// --- DUMMY DATA ---
const portfolioData = [{ name: 'Mon', value: 2100000 }, { name: 'Tue', value: 2150000 }, { name: 'Wed', value: 2120000 }, { name: 'Thu', value: 2280000 }, { name: 'Fri', value: 2350000 }, { name: 'Sat', value: 2420000 }, { name: 'Sun', value: 2480450 }];
const sectorData = [{ name: 'IT', value: 45, color: '#6366f1' }, { name: 'Banking', value: 25, color: '#a855f7' }, { name: 'Energy', value: 20, color: '#ec4899' }, { name: 'Auto', value: 10, color: '#f43f5e' }];

const Dashboard = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');
  const [scannerAlerts, setScannerAlerts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [isScanning, setIsScanning] = useState(true);

  // --- 1. FETCH AUTONOMOUS DATA FROM BACKEND ---
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8001/api/scanner');
        const data = await response.json();
        
        if (data && data.length > 0) {
          setScannerAlerts(data);
          setIsScanning(false);
        }
      } catch (error) {
        console.error("Backend Error: Check if main.py is running on port 8001", error);
      }
    };

    fetchAlerts();
    const interval = setInterval(fetchAlerts, 60000); // Rescan every 1 minute
    return () => clearInterval(interval);
  }, []);

  // --- 2. AUTO-ROTATE THROUGH THE DYNAMIC LIST ---
  useEffect(() => {
    if (scannerAlerts.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % scannerAlerts.length);
      }, 8000);
      return () => clearInterval(timer);
    }
  }, [scannerAlerts]);

  const currentTrend = scannerAlerts[currentIndex];

  return (
    <div className="min-h-screen bg-[#05070a] text-zinc-300 flex font-sans overflow-hidden text-left">
      
      {/* SIDE NAVIGATION */}
      <aside className="w-20 border-r border-zinc-800/50 bg-[#080a0f] flex flex-col items-center py-8 gap-8 z-40">
        <Link to="/"><div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20"><TrendingUp className="text-white" size={20} /></div></Link>
        <nav className="flex flex-col gap-6">
          <NavIcon icon={<LayoutDashboard size={22}/>} active={activeTab === 'Overview'} onClick={() => setActiveTab('Overview')} />
          <NavIcon icon={<MessageSquare size={22}/>} active={activeTab === 'GPT'} onClick={() => setActiveTab('GPT')} />
        </nav>
        <div className="mt-auto pb-4"><button onClick={() => setIsProfileOpen(true)}><NavIcon icon={<Settings size={22}/>} /></button></div>
      </aside>

      <div className="flex-1 flex flex-col relative overflow-y-auto">
        <header className="h-16 border-b border-zinc-800/50 flex items-center justify-between px-8 bg-[#080a0f]/80 backdrop-blur-md sticky top-0 z-50">
          <div className="flex items-center gap-4 bg-zinc-900/40 border border-zinc-800/50 px-4 py-1.5 rounded-lg w-96">
            <Search size={16} className="text-zinc-500" />
            <input type="text" placeholder="Search markets..." className="bg-transparent border-none outline-none text-sm w-full" />
          </div>
          <div onClick={() => setIsProfileOpen(true)} className="flex items-center gap-3 cursor-pointer hover:bg-zinc-800/50 p-1 pr-3 rounded-full transition">
            <div className="w-8 h-8 rounded-full bg-linear-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-[10px]">AV</div>
            <span className="text-sm font-semibold text-white">Aryan Verma</span>
          </div>
        </header>

        <main className="p-8 space-y-8 text-left">
          {/* TOP PORTFOLIO SECTION */}
          <div className="grid grid-cols-12 gap-6">
             <div className="col-span-12 lg:col-span-8 bg-[#0a0c12] border border-zinc-800 rounded-3xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <div><h3 className="text-lg font-bold text-white">Portfolio Growth</h3><p className="text-xs text-zinc-500">Wealth tracking</p></div>
                    <div className="text-right"><p className="text-2xl font-black text-white">₹24,80,450</p><p className="text-xs text-emerald-500 font-bold flex items-center justify-end gap-1"><ArrowUpRight size={12}/> +₹1,42,000</p></div>
                </div>
                <div className="h-64 w-full"><ResponsiveContainer width="100%" height="100%"><AreaChart data={portfolioData}><defs><linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/><stop offset="95%" stopColor="#6366f1" stopOpacity={0}/></linearGradient></defs><Tooltip contentStyle={{ backgroundColor: '#0a0c12', border: '1px solid #27272a', borderRadius: '12px' }} itemStyle={{ color: '#fff' }}/><Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" /></AreaChart></ResponsiveContainer></div>
             </div>
             <div className="col-span-12 lg:col-span-4 bg-[#0a0c12] border border-zinc-800 rounded-3xl p-6 text-left">
                <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-6">Sector Allocation</h3>
                <div className="h-48"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={sectorData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">{sectorData.map((entry, i) => (<Cell key={`cell-${i}`} fill={entry.color} stroke="none" />))}</Pie><Tooltip /></PieChart></ResponsiveContainer></div>
                <div className="mt-4 grid grid-cols-2 gap-2 text-[10px]">{sectorData.map(s => (<div key={s.name} className="flex items-center gap-2"><div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }}></div><span className="text-zinc-400">{s.name} ({s.value}%)</span></div>))}</div>
             </div>
          </div>

          {/* --- AI SCANNER CARD --- */}
          <div className="bg-[#0a0c12] border border-zinc-800 rounded-[2.5rem] p-6 shadow-2xl relative overflow-hidden text-left min-h-70 flex flex-col justify-center">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-600/5 blur-[80px] rounded-full"></div>
            
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                  <Radar className="text-indigo-400 animate-pulse" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">AI Autonomous Intel</h3>
                  <p className="text-[10px] text-zinc-500 font-medium">Scanning live market news...</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-zinc-900/50 px-3 py-1 rounded-full border border-zinc-800 shadow-inner">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></div>
                <span className="text-[9px] text-zinc-300 font-black uppercase tracking-widest">LIVE SCAN</span>
              </div>
            </div>

            <div className="relative z-10">
              {currentTrend ? (
                <div className="animate-in fade-in slide-in-from-right duration-700">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">{currentTrend.ticker}</h2>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase mt-3 inline-block tracking-widest ${
                        currentTrend.pattern === 'BULLISH' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : 'text-red-400 bg-red-500/10 border-red-500/20'
                      }`}>
                        {currentTrend.pattern}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-[8px] text-zinc-500 font-black tracking-widest uppercase mb-1">AI Confidence</p>
                      <div className="flex items-center gap-2 justify-end">
                        <p className="text-emerald-500 font-black text-2xl">{currentTrend.success_rate}</p>
                        <div className="flex gap-1 items-end h-4">
                          <div className="w-1 bg-emerald-500/40 h-1.5 animate-bounce"></div>
                          <div className="w-1 bg-emerald-500 h-3 animate-bounce [animation-delay:0.2s]"></div>
                          <div className="w-1 bg-emerald-500/40 h-2 animate-bounce [animation-delay:0.4s]"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* SIMPLE ENGLISH INSIGHT */}
                  <p className="text-zinc-400 text-sm italic border-l-2 border-indigo-600 pl-4 mt-2 leading-relaxed">
                    "{currentTrend.explanation}"
                  </p>

                  {/* DOTS INDICATOR */}
                  <div className="flex gap-1.5 mt-6 justify-start">
                    {scannerAlerts.map((_, i) => (
                      <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i === currentIndex ? 'w-8 bg-indigo-500' : 'w-1.5 bg-zinc-800'}`}></div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center">
                  <p className="text-zinc-600 text-xs font-bold uppercase tracking-[0.2em] animate-pulse">Scanning Trends...</p>
                </div>
              )}
            </div>
          </div>
          
          {/* LOWER SECTION */}
          <div className="bg-linear-to-r from-indigo-900/20 to-purple-900/20 border border-indigo-500/20 p-8 rounded-3xl flex items-center justify-between group shadow-xl">
             <div className="space-y-2 text-left">
                <h3 className="text-xl font-bold text-white flex items-center gap-2"><MessageSquare className="text-indigo-400" /> Market GPT</h3>
                <p className="text-sm text-zinc-400">Ask about any stock or market event. Powered by Gemini.</p>
             </div>
             
             {/* THE CHAT REDIRECT LINK IS ADDED HERE */}
             <a href="http://localhost:3000/#/chat">
               <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-indigo-600/20 transition-all active:scale-95">Start Chatting</button>
             </a>
             
          </div>

          <div className="bg-[#0a0c12] border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl text-left">
              <div className="p-6 border-b border-zinc-800 flex justify-between items-center"><h3 className="font-bold text-white text-sm uppercase tracking-wider">Active Holdings</h3><button className="text-xs text-indigo-400 font-bold hover:underline">View Portfolio</button></div>
              <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-zinc-900/30 text-zinc-500 text-[10px] uppercase font-black tracking-widest"><tr><th className="px-6 py-4">Asset</th><th className="px-6 py-4">Quantity</th><th className="px-6 py-4">Price</th><th className="px-6 py-4">P&L</th><th className="px-6 py-4 text-right">Activity</th></tr></thead><tbody className="divide-y divide-zinc-800/50"><StockRow name="Reliance Ind." ticker="RELIANCE" qty="50" price="₹2,941" pnl="+12.4%" color="text-emerald-500" up /><StockRow name="Tata Consultancy" ticker="TCS" qty="100" price="₹3,812" pnl="+7.8%" color="text-emerald-500" up /><StockRow name="Zomato Ltd" ticker="ZOMATO" qty="1500" price="₹158" pnl="-6.2%" color="text-red-500" up={false} /></tbody></table></div>
          </div>
        </main>
      </div>

      {/* SETTINGS DRAWER */}
      {isProfileOpen && (<><div className="absolute inset-0 bg-black/60 backdrop-blur-md z-50 transition-opacity" onClick={() => setIsProfileOpen(false)}></div><div className="absolute right-0 top-0 h-full w-80 bg-[#0a0c10] border-l border-zinc-800 z-60 p-8 shadow-2xl animate-in slide-in-from-right duration-300"><div className="flex justify-between items-center mb-10"><h3 className="text-xl font-black text-white tracking-tight leading-none">Settings</h3><button onClick={() => setIsProfileOpen(false)} className="p-2 hover:bg-zinc-800 rounded-full transition text-zinc-500"><X size={20}/></button></div><div className="text-center mb-8"><div className="w-20 h-20 rounded-3xl bg-linear-to-br from-indigo-500 to-purple-600 mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-white border-4 border-[#0a0c10] shadow-2xl">AV</div><h4 className="text-lg font-bold text-white">Aryan Verma</h4><p className="text-[10px] text-zinc-500 uppercase tracking-widest font-black mt-1">Pro Investor</p></div><div className="space-y-1"><Link to="/personal" onClick={() => setIsProfileOpen(false)}><ProfileLink icon={<User size={18}/>} label="Personal Info" /></Link><Link to="/demat" onClick={() => setIsProfileOpen(false)}><ProfileLink icon={<CreditCard size={18}/>} label="Demat Integration" /></Link><Link to="/privacy" onClick={() => setIsProfileOpen(false)}><ProfileLink icon={<ShieldCheck size={18}/>} label="AI Privacy Mode" /></Link><div className="h-px bg-zinc-800/50 my-6"></div><button className="w-full flex items-center gap-3 p-3 text-red-500 font-black text-[10px] uppercase tracking-widest hover:bg-red-500/10 rounded-xl transition"><LogOut size={18}/> Terminate Session</button></div></div></>)}
    </div>
  );
};

// COMPONENT HELPERS
const NavIcon = ({ icon, active, onClick }) => (<button onClick={onClick} className={`p-3 rounded-2xl transition-all ${active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-zinc-600 hover:text-zinc-300 hover:bg-zinc-900/50'}`}>{icon}</button>);
const StockRow = ({ name, ticker, qty, price, pnl, color, up }) => (<tr className="hover:bg-zinc-900/20 transition-colors group cursor-pointer text-left text-sm"><td className="px-6 py-5"><p className="font-bold text-white group-hover:text-indigo-400 transition-colors text-sm leading-none mb-1">{ticker}</p><p className="text-[10px] text-zinc-500">{name}</p></td><td className="px-6 py-5 font-bold">{qty}</td><td className="px-6 py-5 font-bold">{price}</td><td className={`px-6 py-5 font-bold ${color}`}>{pnl}</td><td className="px-6 py-5 text-right"><div className={`w-12 h-6 rounded ml-auto ${up ? 'bg-emerald-500/10' : 'bg-red-500/10'} border ${up ? 'border-emerald-500/20' : 'border-red-500/20'} flex items-center justify-center`}><div className={`w-1 h-1 rounded-full animate-pulse ${up ? 'bg-emerald-500' : 'bg-red-500'}`}></div></div></td></tr>);
const ProfileLink = ({ icon, label }) => (<div className="flex items-center justify-between p-3.5 hover:bg-zinc-900 rounded-2xl transition cursor-pointer group w-full"><div className="flex items-center gap-4 text-zinc-500 group-hover:text-white transition">{icon}<span className="text-[10px] font-bold uppercase tracking-wider">{label}</span></div><ChevronRight size={14} className="text-zinc-800 group-hover:text-zinc-500" /></div>);

export default Dashboard;