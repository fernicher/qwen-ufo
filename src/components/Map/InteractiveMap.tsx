import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap, useMapEvents } from 'react-leaflet';
import { useEffect, useState } from 'react';
import type { UFOCase } from '../../data/cases';
import { createCaseIcon } from './CaseMarker';
import CasePopup from './CasePopup';
import 'leaflet/dist/leaflet.css';

/** Umbral de zoom a partir del cual las etiquetas se muestran fijas (sin hover). */
const LABEL_ZOOM = 5;

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

function ZoomWatcher({ onZoom }: { onZoom: (z: number) => void }) {
  const map = useMapEvents({ zoomend: () => onZoom(map.getZoom()) });
  return null;
}

export default function InteractiveMap({ cases, selectedCaseId, onSelectCase }: { cases: UFOCase[]; selectedCaseId: string | null; onSelectCase: (id: string) => void }) {
  const [zoom, setZoom] = useState(2);
  const showLabels = zoom >= LABEL_ZOOM;

  return (
    <MapContainer center={[30, 0]} zoom={2} minZoom={2} maxZoom={12} className="w-full h-full z-0" zoomControl={false} attributionControl={false}>
      <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
      <ZoomWatcher onZoom={setZoom} />
      <MapController selectedCaseId={selectedCaseId} cases={cases} />
      {cases.map((c) => (
        <Marker key={c.id} position={c.coordinates} icon={createCaseIcon(c.type, c.credibility)} eventHandlers={{ click: () => onSelectCase(c.id) }}>
          <Tooltip
            key={showLabels ? 'perm' : 'hover'}
            className="aurora-tip"
            direction="top"
            offset={[0, -18]}
            opacity={1}
            permanent={showLabels}
          >
            {c.title}
          </Tooltip>
          <Popup closeButton={false}><CasePopup caseData={c} /></Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
