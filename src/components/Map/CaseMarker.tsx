import { DivIcon } from 'leaflet';
import type { UFOCase } from '../../data/cases';
import { caseTypeMeta } from '../../data/caseTypes';

const icons: Record<UFOCase['type'], string> = { avistamiento: '◉', aterrizaje: '▼', contacto: '✦', radar: '◈', fotografico: '◐' };

export const createCaseIcon = (type: UFOCase['type']) => {
  const color = caseTypeMeta[type].color;
  return new DivIcon({
    className: 'aurora-marker',
    html: `<div class="relative flex items-center justify-center"><div class="relative w-8 h-8 rounded-full flex items-center justify-center border-2" style="background: ${color}20; border-color: ${color}; box-shadow: 0 0 15px ${color};"><span style="color: ${color}; font-size: 14px; font-weight: bold;">${icons[type]}</span></div></div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
};
