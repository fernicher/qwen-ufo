export interface Author {
  id: string;
  name: string;
  bio?: string;
  nationality?: string;
  photo?: string;
}

export interface Book {
  id: string;
  title: string;
  subtitle?: string;
  authors: string[];
  year: number;
  publisher?: string;
  isbn?: string;
  pages?: number;
  language: 'es' | 'en' | 'fr' | 'de' | 'pt';
  coverImage?: string;
  description: string;
  category: 'investigacion' | 'testimonio' | 'historia' | 'ciencia' | 'clásico';
  relatedCases: string[];
  relatedInvestigators: string[];
  relatedMedia: number[];
  rating?: number;
  essential: boolean;
  availableFormats: ('fisico' | 'digital' | 'audio')[];
  purchaseLinks?: { store: string; url: string }[];
}

export interface Podcast {
  id: string;
  title: string;
  host: string;
  description: string;
  language: 'es' | 'en';
  coverImage?: string;
  website?: string;
  platforms: { name: string; url: string; icon: string }[];
  frequency: 'semanal' | 'quincenal' | 'mensual' | 'irregular';
  firstEpisode: string;
  totalEpisodes?: number;
  category: 'investigacion' | 'entrevistas' | 'actualidad' | 'historia';
  relatedCases: string[];
  essential: boolean;
  rating?: number;
}

export interface PodcastEpisode {
  id: string;
  podcastId: string;
  title: string;
  description: string;
  date: string;
  duration?: string;
  guests?: string[];
  relatedCases?: string[];
  audioUrl?: string;
}