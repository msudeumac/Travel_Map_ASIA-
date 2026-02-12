
import React, { useState, useEffect } from 'react';
import MapView from './components/MapView';
import Sidebar from './components/Sidebar';
import UploadModal from './components/UploadModal';
import ProfilePanel from './components/ProfilePanel';
import ClusterPanel from './components/ClusterPanel';
import { User, Photo, MapCluster, ViewState } from './types';
import { initialPhotos, currentUser } from './services/mockDb';

const App: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos);
  const [activeViewState, setActiveViewState] = useState<ViewState>('world');
  const [selectedCluster, setSelectedCluster] = useState<MapCluster | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [timeRange, setTimeRange] = useState<[number, number]>([2010, 2024]);

  const handlePhotoUpload = (newPhoto: Photo) => {
    setPhotos(prev => [newPhoto, ...prev]);
    setIsUploadOpen(false);
  };

  const handleClusterSelect = (cluster: MapCluster) => {
    setSelectedCluster(cluster);
    setActiveViewState('cluster');
  };

  const filteredPhotos = photos.filter(p => {
    const year = new Date(p.taken_at).getFullYear();
    const matchesTime = year >= timeRange[0] && year <= timeRange[1];
    const matchesLayer = activeViewState === 'personal' ? p.user_id === currentUser.id : true;
    return matchesTime && matchesLayer;
  });

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-slate-900 text-white font-sans">
      {/* Primary Map Layer */}
      <MapView 
        photos={filteredPhotos} 
        onClusterClick={handleClusterSelect} 
        activeLayer={activeViewState}
      />

      {/* Navigation Overlay */}
      <Sidebar 
        activeViewState={activeViewState}
        setActiveViewState={setActiveViewState}
        onUploadClick={() => setIsUploadOpen(true)}
        onProfileClick={() => setIsProfileOpen(true)}
      />

      {/* Status Bar */}
      <div className="absolute top-16 left-6 z-[1000] flex items-center gap-3">
        <div className="flex items-center gap-2 bg-slate-950/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-800">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Live</span>
        </div>
        <div className="hidden md:flex items-center gap-2 bg-slate-950/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-800">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Region:</span>
          <span className="text-[10px] font-black text-white uppercase tracking-widest">Pan-Asia</span>
        </div>
      </div>

      {/* Panels (Contextual) */}
      {selectedCluster && activeViewState === 'cluster' && (
        <ClusterPanel 
          cluster={selectedCluster} 
          onClose={() => {
            setSelectedCluster(null);
            setActiveViewState('world');
          }}
        />
      )}

      {isProfileOpen && (
        <ProfilePanel 
          user={currentUser} 
          photos={photos.filter(p => p.user_id === currentUser.id)}
          onClose={() => setIsProfileOpen(false)} 
        />
      )}

      {/* Modals */}
      {isUploadOpen && (
        <UploadModal 
          onClose={() => setIsUploadOpen(false)} 
          onUpload={handlePhotoUpload} 
        />
      )}

      {/* Global Time Filter Slider */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[1000] w-full max-w-md px-4">
        <div className="bg-slate-800/90 backdrop-blur-md p-4 rounded-2xl border border-slate-700 shadow-2xl">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-slate-400">TIMELINE</span>
            <span className="text-xs font-mono text-cyan-400">{timeRange[0]} — {timeRange[1]}</span>
          </div>
          <input 
            type="range" 
            min="2010" 
            max="2024" 
            step="1"
            value={timeRange[1]}
            onChange={(e) => setTimeRange([2010, parseInt(e.target.value)])}
            className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />
        </div>
      </div>

      {/* Asia Logo */}
      <div className="absolute top-6 left-6 z-[1000] pointer-events-none">
        <h1 className="text-2xl font-black tracking-tighter text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-xs">LM</span>
          </div>
          LIVING MEMORY <span className="text-cyan-400 font-light italic">ASIA</span>
        </h1>
      </div>
    </div>
  );
};

export default App;
