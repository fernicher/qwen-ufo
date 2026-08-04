import { useQuery } from '@tanstack/react-query';

export type NewsSource = 'reddit' | 'news' | 'bluesky' | 'youtube';

export interface NewsItem {
  id: string;
  source: NewsSource;
  title: string;
  url: string;
  excerpt: string;
  date: string;
  author: string;
  meta: { score?: number; comments?: number; likes?: number; reposts?: number };
}

export interface NewsResponse {
  updatedAt: string;
  sources: Record<string, number | { error: string }>;
  items: NewsItem[];
}

export function useNews() {
  return useQuery<NewsResponse>({
    queryKey: ['news-feed'],
    queryFn: async () => {
      const r = await fetch('/api/news');
      const ct = r.headers.get('content-type') || '';
      if (!r.ok || !ct.includes('application/json')) {
        throw new Error('feed-unavailable');
      }
      return r.json();
    },
    staleTime: 1000 * 60 * 10,
    refetchInterval: 1000 * 60 * 15,
    retry: 0,
  });
}
