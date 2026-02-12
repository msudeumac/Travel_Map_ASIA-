
import React, { useEffect, useState } from 'react';
import { X, Calendar, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { MapCluster } from '../types';
import { getGeminiLocationStory } from '../services/gemini';

interface ClusterPanelProps {
  cluster: MapCluster;
  onClose: () => void;
}

const ClusterPanel: React.FC<ClusterPanelProps> = ({ cluster, onClose }) => {
  const [aiStory, setAiStory] = useState<string>('');
  const [isLoadingAi, setIsLoadingAi] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoadingAi(true);
    
    getGeminiLocationStory(cluster.location_name, cluster.photos.length)
      .then(story => {
        if (isMounted) {
          setAiStory(story);
          setIsLoadingAi(false);
        }
      });

    return () => { isMounted = false; };
  }, [cluster.id]);

  return (
    <div className="absolute left-6 top-6 bottom-32 z-[1001] w-96 flex flex-col bg-slate-900/90 backdrop-blur-xl border border-slate-700 rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-left duration-300">
      <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-800/20">
        <div>
          <h2 className="font-bold text-lg text-white leading-tight">{cluster.location_name}</h2>
          <p className="text-xs text-slate-400 font-mono uppercase tracking-widest mt-1">
            {cluster.photos.length} Memories at this spot
          </p>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* AI Insight Section */}
        <div className="p-4 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl relative overflow-hidden">
          <div className="flex items-center gap-2 text-cyan-400 mb-2">
            <Sparkles size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Memory Insight</span>
          </div>
          {isLoadingAi ? (
            <div className="flex items-center gap-2 py-2">
              <Loader2 size={14} className="animate-spin text-slate-500" />
              <span className="text-xs text-slate-500 font-mono">Consulting the archive...</span>
            </div>
          ) : (
            <p className="text-xs text-slate-300 leading-relaxed italic">
              {aiStory}
            </p>
          )}
        </div>

        {cluster.photos.map((photo) => (
          <div key={photo.id} className="group bg-slate-800/40 rounded-2xl overflow-hidden border border-slate-700/50 hover:border-slate-500 transition-all shadow-lg">
            <img src={photo.image_url} className="w-full aspect-[4/3] object-cover" alt={photo.caption} />
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center text-[10px] font-bold">
                  {photo.username[0].toUpperCase()}
                </div>
                <span className="text-xs font-medium text-slate-200">{photo.username}</span>
                <span className="text-[10px] text-slate-500 ml-auto flex items-center gap-1 uppercase tracking-tighter">
                  <Calendar size={10} />
                  {new Date(photo.taken_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-slate-300">"{photo.caption}"</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-gradient-to-t from-slate-900 to-transparent">
        <button className="w-full bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-bold py-3 rounded-xl border border-slate-700 flex items-center justify-center gap-2 transition-all">
          EXPLORE GEODATA <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default ClusterPanel;
