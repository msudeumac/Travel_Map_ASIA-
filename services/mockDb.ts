
import { Photo, User } from '../types';

export const currentUser: User = {
  id: 'current-user',
  username: 'Alex Nomad',
  avatar_url: 'https://picsum.photos/seed/alex/200/200',
  is_private: false,
  stats: {
    countries: 5,
    cities: 12,
    photos: 8
  }
};

export const initialPhotos: Photo[] = [
  {
    id: 'p1',
    user_id: 'current-user',
    username: 'Alex Nomad',
    image_url: 'https://picsum.photos/seed/shibuya/800/600',
    lat: 35.6595,
    lng: 139.7004,
    taken_at: '2023-11-15T10:00:00Z',
    visibility: 'public',
    caption: 'Midnight at Shibuya Crossing. The neon heartbeat of Tokyo.',
    location_name: 'Shibuya, Tokyo'
  },
  {
    id: 'p2',
    user_id: 'current-user',
    username: 'Alex Nomad',
    image_url: 'https://picsum.photos/seed/bali/800/600',
    lat: -8.4095,
    lng: 115.1889,
    taken_at: '2024-02-10T08:00:00Z',
    visibility: 'public',
    caption: 'Ubud rice fields at sunrise. Peace found in green.',
    location_name: 'Ubud, Bali'
  },
  {
    id: 'p3',
    user_id: 'user2',
    username: 'Mei Wanderer',
    image_url: 'https://picsum.photos/seed/taipei/800/600',
    lat: 25.0330,
    lng: 121.5654,
    taken_at: '2023-09-05T19:30:00Z',
    visibility: 'public',
    caption: 'Taipei 101 peeking through the clouds.',
    location_name: 'Taipei, Taiwan'
  },
  {
    id: 'p4',
    user_id: 'user3',
    username: 'SeoulLens',
    image_url: 'https://picsum.photos/seed/seoul/800/600',
    lat: 37.5665,
    lng: 126.9780,
    taken_at: '2024-01-20T14:15:00Z',
    visibility: 'public',
    caption: 'Winter in Myeongdong.',
    location_name: 'Seoul, South Korea'
  },
  {
    id: 'p5',
    user_id: 'current-user',
    username: 'Alex Nomad',
    image_url: 'https://picsum.photos/seed/singapore/800/600',
    lat: 1.2847,
    lng: 103.8610,
    taken_at: '2023-12-25T20:00:00Z',
    visibility: 'public',
    caption: 'Gardens by the Bay magic.',
    location_name: 'Marina Bay, Singapore'
  },
  {
    id: 'p6',
    user_id: 'user4',
    username: 'BangkokBeat',
    image_url: 'https://picsum.photos/seed/bangkok/800/600',
    lat: 13.7563,
    lng: 100.5018,
    taken_at: '2024-03-01T12:00:00Z',
    visibility: 'public',
    caption: 'Street food paradise near Wat Arun.',
    location_name: 'Bangkok, Thailand'
  }
];
