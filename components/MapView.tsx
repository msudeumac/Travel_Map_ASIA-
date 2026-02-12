
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Photo, MapCluster, ViewState } from '../types';

interface MapViewProps {
  photos: Photo[];
  onClusterClick: (cluster: MapCluster) => void;
  activeLayer: ViewState;
}

const MapView: React.FC<MapViewProps> = ({ photos, onClusterClick, activeLayer }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize map focused on Asia
    mapRef.current = L.map(mapContainerRef.current, {
      center: [25, 105], // Asia Center
      zoom: 4,
      zoomControl: false,
      attributionControl: false
    });

    // Dark Mode Tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
    }).addTo(mapRef.current);

    markersRef.current = L.layerGroup().addTo(mapRef.current);

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !markersRef.current) return;

    markersRef.current.clearLayers();

    // Simple grouping/clustering for the MVP
    // In a real app, use Leaflet.markercluster
    const clusters: Record<string, Photo[]> = {};
    photos.forEach(photo => {
      const key = `${photo.lat.toFixed(2)},${photo.lng.toFixed(2)}`;
      if (!clusters[key]) clusters[key] = [];
      clusters[key].push(photo);
    });

    Object.entries(clusters).forEach(([key, clusterPhotos]) => {
      const [lat, lng] = key.split(',').map(Number);
      const isPersonal = clusterPhotos.every(p => p.user_id === 'current-user');
      
      const count = clusterPhotos.length;
      const size = Math.min(60, 30 + (count * 2));
      const opacity = Math.min(1, 0.4 + (count * 0.1));

      const icon = L.divIcon({
        html: `
          <div class="group relative flex items-center justify-center transition-all duration-300 transform hover:scale-110">
            <div 
              style="width: ${size}px; height: ${size}px; opacity: ${opacity}"
              class="rounded-full bg-gradient-to-tr ${isPersonal ? 'from-cyan-400 to-blue-500' : 'from-pink-500 to-orange-500'} 
                     shadow-lg shadow-black/50 border-2 border-white/20 flex items-center justify-center backdrop-blur-sm animate-pulse"
            >
              <span class="text-[10px] font-bold text-white drop-shadow-md">${count}</span>
            </div>
            <!-- Heatmap pulse -->
            <div class="absolute -inset-2 rounded-full bg-cyan-400/20 animate-ping opacity-30"></div>
          </div>
        `,
        className: '',
        iconSize: [size, size]
      });

      const marker = L.marker([lat, lng], { icon });
      marker.on('click', () => {
        onClusterClick({
          id: key,
          lat,
          lng,
          photos: clusterPhotos,
          location_name: clusterPhotos[0].location_name
        });
      });
      markersRef.current?.addLayer(marker);
    });
  }, [photos, onClusterClick]);

  return <div ref={mapContainerRef} className="w-full h-full" />;
};

export default MapView;
