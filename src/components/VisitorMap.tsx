import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import type { CountryHit } from '../hooks/useVisitorStats';
import { countryCentroids } from '../data/countryCentroids';
import 'leaflet/dist/leaflet.css';

function countryName(code: string): string {
  try {
    return new Intl.DisplayNames(['es'], { type: 'region' }).of(code) || code;
  } catch {
    return code;
  }
}

export default function VisitorMap({ countries }: { countries: CountryHit[] }) {
  const points = countries.filter((c) => countryCentroids[c.code]);
  const max = points.length ? Math.max(...points.map((p) => p.count)) : 1;

  return (
    <MapContainer
      center={[20, -30]}
      zoom={1}
      minZoom={1}
      maxZoom={6}
      className="w-full h-full z-0 rounded-2xl"
      zoomControl={false}
      attributionControl={false}
      scrollWheelZoom={false}
      worldCopyJump
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
      {points.map((c) => {
        const radius = 5 + 18 * Math.sqrt(c.count / max);
        return (
          <CircleMarker
            key={c.code}
            center={countryCentroids[c.code]}
            radius={radius}
            pathOptions={{ color: '#22d3ee', weight: 1.5, fillColor: '#06b6d4', fillOpacity: 0.4 }}
          >
            <Tooltip direction="top" offset={[0, -4]} opacity={1}>
              <span className="font-semibold">{countryName(c.code)}</span>: {c.count.toLocaleString('es-AR')}
            </Tooltip>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
