import { useQuery } from '@tanstack/react-query';
import { tmdbService } from '../services/tmdb';

export const useSearchMedia = (query: string, page = 1) => useQuery({
  queryKey: ['search', query, page],
  queryFn: () => tmdbService.searchMedia(query, page),
  enabled: query.length >= 3,
  staleTime: 1000 * 60 * 5,
});

export const useMediaDetails = (id: number, type: 'movie' | 'tv') => useQuery({
  queryKey: ['mediaDetail', id, type],
  queryFn: () => tmdbService.getMediaDetails(id, type),
  staleTime: 1000 * 60 * 60,
});