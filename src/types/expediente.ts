import type { UFOCase } from '../data/cases';

export interface Witness {
  name: string;
  role: string;
  testimony?: string;
  credibility: 'alta' | 'media' | 'baja';
}

export interface Document {
  id: string;
  title: string;
  date: string;
  classification: string;
  agency?: string;
  pages: number;
  summary: string;
  imageUrl?: string;
  downloadUrl?: string;
}

export interface Photo {
  id: string;
  url: string;
  caption: string;
  date: string;
  photographer?: string;
  authenticated: boolean;
}

export interface Hypothesis {
  id: string;
  title: string;
  description: string;
  evidence: string[];
  counterEvidence: string[];
  probability: 'alta' | 'media' | 'baja' | 'descartada';
  source: string;
}

export interface Expediente extends Omit<UFOCase, 'description'> {
  fullDescription: string;
  witnesses: Witness[];
  documents: Document[];
  photos: Photo[];
  hypotheses: Hypothesis[];
  relatedMedia: { id: number; type: 'movie' | 'tv'; title: string }[];
  relatedInvestigators: string[];
  timeline: { date: string; event: string }[];
  investigationStatus: 'abierto' | 'cerrado' | 'sin resolver' | 'clasificado';
  officialResponse?: string;
  culturalImpact?: string;
}
