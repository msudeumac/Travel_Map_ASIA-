
import React from 'react';
import { Map, User as UserIcon, Upload, Play, Globe, History } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  activeViewState: ViewState;
  setActiveViewState: (state: ViewState) => void;
  onUploadClick: () => void;
  onProfileClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeViewState, 
  setActiveViewState, 
  onUploadClick,
  onProfileClick
}) => {
  const navItems = [
    { id: 'world', icon: Globe, label: 'Explore Asia' },
    { id: 'personal', icon: History, label: 'My Footprints' },
    { id: 'live', icon: Play, label: 'Live Now' },
  ];

  return (
    <div className="absolute right-6 top-1/2 -translate-y-1/2 z-[1000] flex flex-col gap-4">
      <div className="bg-slate-800/80 backdrop-blur-xl p-2 rounded-2xl border border-slate-700 shadow-2xl flex flex-col gap-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveViewState(item.id as ViewState)}
            className={`p-4 rounded-xl transition-all flex flex-col items-center gap-1 group ${
              activeViewState === item.id 
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' 
                : 'text-slate-400 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <item.icon size={20} />
            <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="bg-slate-800/80 backdrop-blur-xl p-2 rounded-2xl border border-slate-700 shadow-2xl flex flex-col gap-2">
        <button 
          onClick={onUploadClick}
          className="p-4 rounded-xl text-emerald-400 hover:bg-emerald-400/10 transition-all flex flex-col items-center gap-1"
        >
          <Upload size={20} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Pin Photo</span>
        </button>
        <button 
          onClick={onProfileClick}
          className="p-4 rounded-xl text-slate-400 hover:bg-slate-700 hover:text-white transition-all flex flex-col items-center gap-1"
        >
          <UserIcon size={20} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Profile</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
