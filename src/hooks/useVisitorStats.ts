import { useQuery } from '@tanstack/react-query';

export interface CountryHit {
  code: string;
  count: number;
}

export interface VisitorStats {
  configured: boolean;
  total: number;
  countries: CountryHit[];
}

export function useVisitorStats() {
  return useQuery<VisitorStats>({
    queryKey: ['visitor-stats'],
    queryFn: async () => {
      // POST cuenta esta visita (una vez cada 12 h por cookie) y devuelve el acumulado.
      const r = await fetch('/api/hits', { method: 'POST' });
      const ct = r.headers.get('content-type') || '';
      if (!r.ok || !ct.includes('application/json')) throw new Error('hits-unavailable');
      return r.json();
    },
    staleTime: Infinity,
    retry: 0,
  });
}
