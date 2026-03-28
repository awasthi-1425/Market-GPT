import React from 'react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AIPrivacy = () => {
    
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
    <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
      <ShieldCheck className="text-indigo-400" /> AI Privacy Control
    </h2>
    
    <div className="space-y-6">
      <div className="p-6 bg-zinc-900/40 rounded-3xl border border-zinc-800 flex items-center justify-between">
        <div>
          <h4 className="font-bold">Portfolio Learning</h4>
          <p className="text-xs text-zinc-500">Allow AI to study your trade history for better suggestions.</p>
        </div>
        <div className="w-12 h-6 bg-indigo-600 rounded-full relative">
          <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
        </div>
      </div>

      <div className="p-6 bg-zinc-900/40 rounded-3xl border border-zinc-800 flex items-center justify-between opacity-60">
        <div>
          <h4 className="font-bold">Public Sentiment Signal</h4>
          <p className="text-xs text-zinc-500">Anonymously share sentiment with ET Markets community.</p>
        </div>
        <div className="w-12 h-6 bg-zinc-700 rounded-full relative">
          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
        </div>
      </div>
      
      <div className="p-6 bg-red-900/10 border border-red-500/20 rounded-3xl">
        <h4 className="text-red-400 font-bold mb-2">Delete AI History</h4>
        <p className="text-xs text-zinc-500 mb-4">This will clear all context from Market GPT and personalized Opportunity Radar.</p>
        <button className="text-xs font-black text-red-500 hover:underline">CLEAR ALL AI DATA</button>
      </div>
    </div>
  </div>
);
}

export default AIPrivacy;
  