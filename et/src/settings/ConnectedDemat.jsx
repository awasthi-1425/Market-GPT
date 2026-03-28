
import React from 'react';
import { ArrowLeft, PlayCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ConnectedDemat = () => {

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
    <h2 className="text-2xl font-bold mb-8">Connected Brokerages</h2>
    
    <div className="space-y-4">
      {/* Active Broker */}
      <div className="flex items-center justify-between p-6 bg-zinc-900/60 rounded-3xl border border-emerald-500/20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center font-bold text-white">Z</div>
          <div>
            <h4 className="font-bold">Zerodha - Kite</h4>
            <p className="text-xs text-zinc-500">Connected: Client ID #AV0912</p>
          </div>
        </div>
        <span className="px-3 py-1 bg-emerald-500/20 text-emerald-500 text-[10px] font-black rounded-full">ACTIVE</span>
      </div>

      {/* Add New */}
      <button className="w-full p-6 border-2 border-dashed border-zinc-800 rounded-3xl text-zinc-500 hover:text-indigo-400 hover:border-indigo-400/50 transition-all flex items-center justify-center gap-2">
        <PlayCircle size={20} className="rotate-90"/> Link Another Demat Account
      </button>
    </div>
  </div>
);

}

export default ConnectedDemat;




  

