import { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { OFFICES } from '../data/site';

/** Pin SVG cyan que combina con el tema oscuro (no requiere imagen externa). */
const cyanPin = L.divIcon({
  className: 'gotechy-pin',
  html: `
    <svg viewBox="0 0 32 40" width="32" height="40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <filter id="pinGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <path
        d="M16 0C7.2 0 0 7.2 0 16c0 11 16 24 16 24s16-13 16-24C32 7.2 24.8 0 16 0z"
        fill="#00E5FF"
        filter="url(#pinGlow)"
      />
      <circle cx="16" cy="16" r="6" fill="#0A1929"/>
    </svg>
  `,
  iconSize: [32, 40],
  iconAnchor: [16, 40],
  popupAnchor: [0, -36],
});

export function OfficesMap() {
  const bounds = useMemo(
    () =>
      L.latLngBounds(
        OFFICES.map((o) => [o.coords.lat, o.coords.lng] as [number, number]),
      ),
    [],
  );

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-card">
      <MapContainer
        bounds={bounds}
        boundsOptions={{ padding: [40, 40] }}
        scrollWheelZoom={false}
        className="h-[420px] w-full"
        aria-label="Mapa con las oficinas de GoTechy"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> · <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={19}
        />
        {OFFICES.map((office) => (
          <Marker key={office.id} position={[office.coords.lat, office.coords.lng]} icon={cyanPin}>
            <Popup>
              <strong>{office.city}</strong>
              <br />
              {office.address}
              <br />
              {office.postal} — {office.country}
              <br />
              <a href={office.mapsUrl} target="_blank" rel="noopener noreferrer">
                Cómo llegar →
              </a>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
