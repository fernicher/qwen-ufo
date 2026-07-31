export interface TMDBMedia {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  release_date?: string;
  first_air_date?: string;
  genre_ids: number[];
  media_type: 'movie' | 'tv';
}

export interface TMDBMediaDetail extends TMDBMedia {
  runtime?: number;
  episode_run_time?: number[];
  genres: { id: number; name: string }[];
  credits: {
    cast: { id: number; name: string; character: string; profile_path: string | null }[];
    crew: { id: number; name: string; job: string }[];
  };
  videos: { results: { key: string; site: string; type: string }[] };
  watch_providers?: {
    results: {
      ES?: {
        flatrate?: { name: string; logo_path: string }[];
      };
    };
  };
}

export interface TMDBSearchResponse {
  page: number;
  results: TMDBMedia[];
  total_pages: number;
  total_results: number;
}
