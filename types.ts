
export interface User {
  id: string;
  username: string;
  avatar_url: string;
  bio?: string;
  is_private: boolean;
  stats: {
    countries: number;
    cities: number;
    photos: number;
  }
}

export interface Photo {
  id: string;
  user_id: string;
  username: string;
  image_url: string;
  lat: number;
  lng: number;
  taken_at: string;
  visibility: 'public' | 'private' | 'friends';
  caption: string;
  location_name: string;
}

export interface LiveStream {
  id: string;
  user_id: string;
  username: string;
  lat: number;
  lng: number;
  status: 'active' | 'ended';
  start_time: string;
}

export interface MapCluster {
  id: string;
  lat: number;
  lng: number;
  photos: Photo[];
  location_name: string;
}

export type ViewState = 'world' | 'personal' | 'cluster' | 'profile' | 'live';
