import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import type { UFOCase } from '../../data/cases';
import { createCaseIcon } from './CaseMarker';
import CasePopup from './CasePopup';
import 'leaflet/dist/leaflet.css';

function MapController({ selectedCaseId, cases }: { selectedCaseId: string | null; cases: UFOCase[] }) {
  const map = useMap();
  useEffect(() => {
    if (selectedCaseId) {
      const c = cases.find((x) => x.id === selectedCaseId);
      if (c) map.flyTo(c.coordinates, 6, { duration: 1.5 });
    }
  }, [selectedCaseId, cases, map]);
  return null;
}

export default function InteractiveMap({ cases, selectedCaseId, onSelectCase }: { cases: UFOCase[]; selectedCaseId: string | null; onSelectCase: (id: string) => void }) {
  return (
    <MapContainer center={[30, 0]} zoom={2} minZoom={2} maxZoom={12} className="w-full h-full z-0" zoomControl={false} attributionControl={false}>
      <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
      <MapController selectedCaseId={selectedCaseId} cases={cases} />
      {cases.map((c) => (
        <Marker key={c.id} position={c.coordinates} icon={createCaseIcon(c.type, c.credibility)} eventHandlers={{ click: () => onSelectCase(c.id) }}>
          <Popup closeButton={false}><CasePopup caseData={c} /></Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}