
import React from 'react';
import { X, Globe, Map as MapIcon, Image as ImageIcon, Award } from 'lucide-react';
import { User, Photo } from '../types';

interface ProfilePanelProps {
  user: User;
  photos: Photo[];
  onClose: () => void;
}

const ProfilePanel: React.FC<ProfilePanelProps> = ({ user, photos, onClose }) => {
  return (
    <div className="fixed inset-y-0 right-0 z-[2000] w-full max-w-md bg-slate-950 border-l border-slate-800 shadow-2xl animate-in slide-in-from-right duration-300 overflow-y-auto">
      <div className="relative h-48 bg-gradient-to-br from-cyan-600 to-blue-900 p-8">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white backdrop-blur-md transition-all">
          <X size={20} />
        </button>
        <div className="absolute -bottom-12 left-8">
          <div className="w-24 h-24 rounded-3xl bg-slate-900 p-1 border-4 border-slate-900 shadow-xl overflow-hidden">
            <img src={user.avatar_url} className="w-full h-full object-cover rounded-2xl" alt={user.username} />
          </div>
        </div>
      </div>

      <div className="mt-16 px-8 py-4">
        <h2 className="text-2xl font-black text-white">{user.username}</h2>
        <p className="text-slate-400 mt-1">{user.bio || 'Exploring the heartbeat of Asia through every lens.'}</p>
        
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-center flex flex-col items-center">
            <Globe size={16} className="text-cyan-400 mb-1" />
            <span className="text-lg font-black text-white">{user.stats.countries}</span>
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Countries</span>
          </div>
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-center flex flex-col items-center">
            <MapIcon size={16} className="text-emerald-400 mb-1" />
            <span className="text-lg font-black text-white">{user.stats.cities}</span>
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Cities</span>
          </div>
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-center flex flex-col items-center">
            <ImageIcon size={16} className="text-pink-400 mb-1" />
            <span className="text-lg font-black text-white">{photos.length}</span>
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Memories</span>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Award size={14} className="text-yellow-500" /> Recent Activity
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {photos.slice(0, 4).map(photo => (
              <div key={photo.id} className="aspect-square rounded-xl overflow-hidden border border-slate-800 group relative">
                <img src={photo.image_url} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                  <span className="text-[10px] text-white font-medium bg-black/40 px-2 py-1 rounded backdrop-blur-md truncate">{photo.location_name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 bg-gradient-to-r from-cyan-500/10 to-transparent p-6 rounded-3xl border border-cyan-500/20">
            <h4 className="text-sm font-bold text-cyan-400 mb-1 italic">The Nomad Spirit</h4>
            <p className="text-xs text-slate-400 leading-relaxed">You've traversed 4,500km across the continent this year. Your most captured region is Southeast Asia.</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePanel;
