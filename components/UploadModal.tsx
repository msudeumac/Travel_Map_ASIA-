
import React, { useState } from 'react';
import { X, Upload, MapPin, Loader2 } from 'lucide-react';
import { Photo } from '../types';
import { currentUser } from '../services/mockDb';

interface UploadModalProps {
  onClose: () => void;
  onUpload: (photo: Photo) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ onClose, onUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<{lat: number, lng: number, date: string} | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
      simulateExifExtraction();
    }
  };

  const simulateExifExtraction = () => {
    setIsExtracting(true);
    // Mock EXIF extraction delay
    setTimeout(() => {
      // Return a random location in Asia for demo
      setMetadata({
        lat: 10 + Math.random() * 30,
        lng: 90 + Math.random() * 30,
        date: new Date().toISOString()
      });
      setIsExtracting(false);
    }, 1500);
  };

  const handleConfirm = () => {
    if (!metadata || !preview) return;
    
    const newPhoto: Photo = {
      id: Math.random().toString(36).substr(2, 9),
      user_id: currentUser.id,
      username: currentUser.username,
      image_url: preview,
      lat: metadata.lat,
      lng: metadata.lng,
      taken_at: metadata.date,
      visibility: 'public',
      caption: 'A beautiful memory in Asia.',
      location_name: 'Unknown Location'
    };
    
    onUpload(newPhoto);
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Upload size={20} className="text-cyan-400" />
            Upload New Memory
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-8">
          {!preview ? (
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 rounded-2xl h-64 cursor-pointer hover:border-cyan-500 hover:bg-cyan-500/5 transition-all">
              <Upload size={48} className="text-slate-500 mb-4" />
              <p className="text-slate-400 font-medium">Click or drag to upload photo</p>
              <p className="text-slate-600 text-sm mt-2">GPS coordinates will be extracted automatically</p>
              <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
            </label>
          ) : (
            <div className="flex gap-6 flex-col md:flex-row">
              <div className="flex-1">
                <img src={preview} className="w-full h-48 object-cover rounded-xl border border-slate-700" alt="Preview" />
              </div>
              <div className="flex-1 space-y-4">
                {isExtracting ? (
                  <div className="flex flex-col items-center justify-center h-full gap-2">
                    <Loader2 className="animate-spin text-cyan-400" />
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Extracting Geodata...</span>
                  </div>
                ) : (
                  <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                    <div className="flex items-center gap-2 text-cyan-400 mb-2">
                      <MapPin size={16} />
                      <span className="text-xs font-bold uppercase tracking-widest">Metadata Found</span>
                    </div>
                    <p className="text-sm font-mono text-slate-300">LAT: {metadata?.lat.toFixed(4)}</p>
                    <p className="text-sm font-mono text-slate-300">LNG: {metadata?.lng.toFixed(4)}</p>
                    <p className="text-sm font-mono text-slate-300 mt-2">DATE: {new Date(metadata?.date || '').toLocaleDateString()}</p>
                    
                    <button 
                      onClick={handleConfirm}
                      className="w-full mt-6 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-cyan-500/20 transition-all active:scale-95"
                    >
                      PIN TO MAP
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
