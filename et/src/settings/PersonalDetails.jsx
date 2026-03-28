
import React from 'react';
import { ArrowLeft, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PersonalDetails = () => {

    const navigate = useNavigate();

  return (
      <div className="p-8 bg-[#0a0c12] min-h-screen text-white">
    <button 
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-zinc-500 hover:text-white mb-10 transition-all group"
      >
        <div className="p-2 rounded-full group-hover:bg-zinc-900">
          <ArrowLeft size={20} />
        </div>
        <span className="text-xs font-black uppercase tracking-widest">Back to Dashboard</span>
      </button>
    <h2 className="text-2xl font-bold mb-8">Personal Details</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6 bg-zinc-900/40 p-6 rounded-3xl border border-zinc-800">
        <div>
          <label className="text-xs text-zinc-500 uppercase font-bold tracking-widest">Full Name</label>
          <p className="text-lg font-semibold mt-1">Aryan Verma</p>
        </div>
        <div>
          <label className="text-xs text-zinc-500 uppercase font-bold tracking-widest">Email Address</label>
          <p className="text-lg font-semibold mt-1">aryan.v@etpulse.ai</p>
        </div>
        <div>
          <label className="text-xs text-zinc-500 uppercase font-bold tracking-widest">Investor Type</label>
          <p className="text-lg font-semibold mt-1 text-indigo-400">Aggressive / Pro</p>
        </div>
      </div>
      
      <div className="bg-indigo-600/10 p-6 rounded-3xl border border-indigo-500/20">
        <h3 className="font-bold mb-4">Investment Summary</h3>
        <div className="space-y-4 text-sm">
          <div className="flex justify-between"><span>Member Since</span><span className="font-bold">Jan 2024</span></div>
          <div className="flex justify-between"><span>Total Trades</span><span className="font-bold">142</span></div>
          <div className="flex justify-between"><span>Success Rate</span><span className="font-bold text-emerald-500">68.4%</span></div>
        </div>
      </div>
    </div>
  </div>
);
}

export default PersonalDetails



