import type { TMDBSearchResponse, TMDBMediaDetail } from '../types/tmdb';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

export const tmdbService = {
  searchMedia: async (query: string, page = 1): Promise<TMDBSearchResponse> => {
    const res = await fetch(`${BASE_URL}/search/multi?query=${encodeURIComponent(query)}&page=${page}&include_adult=false&language=es-ES&api_key=${API_KEY}`);
    if (!res.ok) throw new Error('Error TMDB');
    return res.json();
  },
  getMediaDetails: async (id: number, type: 'movie' | 'tv'): Promise<TMDBMediaDetail> => {
    const res = await fetch(`${BASE_URL}/${type}/${id}?language=es-ES&append_to_response=credits,videos&api_key=${API_KEY}`);
    if (!res.ok) throw new Error('Error TMDB');
    return res.json();
  },
};