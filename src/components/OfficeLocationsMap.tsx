import React, { useEffect, useState } from 'react';
import {
  APIProvider,
  AdvancedMarker,
  InfoWindow,
  Map as GoogleMap,
  Pin,
  useMap,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';
import { ExternalLink, Loader2, MapPin } from 'lucide-react';

export interface OfficeLocationInput {
  id: string;
  label: string;
  query: string;
}

interface ResolvedOffice {
  id: string;
  label: string;
  displayName: string;
  formattedAddress: string;
  location: { lat: number; lng: number };
}

interface OfficeLocationsMapProps {
  offices: OfficeLocationInput[];
}

function isQuotaError(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err);
  return (
    msg.includes('RESOURCE_EXHAUSTED') ||
    msg.includes('OVER_QUERY_LIMIT') ||
    msg.includes('QuotaExceededError') ||
    msg.includes('429')
  );
}

function MapViewportController({
  selectedOffice,
}: {
  selectedOffice: ResolvedOffice | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (!map || !selectedOffice) return;
    map.panTo(selectedOffice.location);
    map.setZoom(14);
  }, [map, selectedOffice]);

  return null;
}

function OfficeLocationsMapCanvas({ offices }: { offices: OfficeLocationInput[] }) {
  const placesLib = useMapsLibrary('places');
  const [resolved, setResolved] = useState<ResolvedOffice[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!placesLib) return;
    let cancelled = false;

    async function resolveOffices() {
      setLoading(true);
      setErrorMsg(null);
      try {
        const results = await Promise.all(
          offices.map(async (office) => {
            const { places } = await placesLib.Place.searchByText({
              textQuery: office.query,
              fields: ['id', 'displayName', 'formattedAddress', 'location'],
              maxResultCount: 1,
            });
            const top = places?.[0];
            if (!top?.location) return null;
            return {
              id: office.id,
              label: office.label,
              displayName: top.displayName || office.label,
              formattedAddress: top.formattedAddress || office.query,
              location: {
                lat: top.location.lat(),
                lng: top.location.lng(),
              },
            } satisfies ResolvedOffice;
          })
        );

        if (cancelled) return;
        const valid = results.filter((item): item is ResolvedOffice => item !== null);
        setResolved(valid);
        if (valid.length > 0) {
          setActiveId(valid[0].id);
        }
      } catch (err) {
        if (cancelled) return;
        if (isQuotaError(err)) {
          window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
        }
        setErrorMsg('Unable to load Nairobi office locations on Google Maps right now.');
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    resolveOffices();
    return () => {
      cancelled = true;
    };
  }, [placesLib, offices]);

  const activeOffice = resolved.find((r) => r.id === activeId) || resolved[0] || null;

  if (loading) {
    return (
      <div className="h-[380px] sm:h-[420px] w-full rounded-2xl bg-[#9E0E15] flex items-center justify-center gap-2.5 text-sm text-white/90">
        <Loader2 className="w-4 h-4 animate-spin text-white" aria-hidden="true" />
        <span>Locating Nairobi offices on Google Maps...</span>
      </div>
    );
  }

  if (errorMsg || !activeOffice) {
    return (
      <div className="py-4 space-y-3 text-sm text-white/90">
        <p>{errorMsg || 'Office coordinates could not be resolved from Places API.'}</p>
        <div className="flex flex-wrap gap-4">
          {offices.map((office) => (
            <a
              key={office.id}
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.query)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:opacity-80 transition-opacity"
            >
              <MapPin className="w-3.5 h-3.5 text-white" aria-hidden="true" />
              <span>View {office.label} in Google Maps</span>
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        {resolved.map((office) => {
          const isSelected = office.id === activeOffice.id;
          return (
            <button
              key={office.id}
              type="button"
              onClick={() => setActiveId(office.id)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs transition-colors ${
                isSelected
                  ? 'text-white font-bold'
                  : 'text-white/75 hover:text-white font-medium'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{office.label}</span>
            </button>
          );
        })}
      </div>

      <div className="h-[380px] sm:h-[420px] w-full rounded-2xl overflow-hidden border border-white/10">
        <GoogleMap
          mapId="DEMO_MAP_ID"
          defaultCenter={activeOffice.location}
          defaultZoom={13}
          gestureHandling="cooperative"
          internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
          className="w-full h-full"
        >
          <MapViewportController selectedOffice={activeOffice} />

          {resolved.map((office) => (
            <AdvancedMarker
              key={office.id}
              position={office.location}
              title={office.displayName}
              onClick={() => setActiveId(office.id)}
            >
              <Pin
                background={office.id === activeOffice.id ? '#ED1B24' : '#9E0E15'}
                borderColor="#FFFFFF"
                glyphColor="#FFFFFF"
              />
            </AdvancedMarker>
          ))}

          {activeOffice && (
            <InfoWindow
              position={activeOffice.location}
              onCloseClick={() => setActiveId(null)}
            >
              <div className="font-display text-[#1A0809] max-w-[240px] p-1 space-y-1">
                <div className="text-sm font-bold">{activeOffice.label}</div>
                <div className="text-xs text-[#5C3A3C] leading-snug">
                  {activeOffice.formattedAddress}
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    activeOffice.formattedAddress
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#B81118] pt-0.5"
                >
                  <span>Directions</span>
                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                </a>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </div>
  );
}

export function OfficeLocationsMap({ offices }: OfficeLocationsMapProps) {
  const [apiKey, setApiKey] = useState<string>(
    () => import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
  );
  const [keyChecked, setKeyChecked] = useState<boolean>(
    () => Boolean(import.meta.env.VITE_GOOGLE_MAPS_API_KEY)
  );

  useEffect(() => {
    if (apiKey) return;
    let active = true;
    fetch('/api/maps/config', { signal: AbortSignal.timeout(8000) })
      .then((res) => (res.ok ? res.json() : { apiKey: '' }))
      .then((data: { apiKey?: string }) => {
        if (!active) return;
        if (data.apiKey) {
          setApiKey(data.apiKey);
        }
        setKeyChecked(true);
      })
      .catch(() => {
        if (active) setKeyChecked(true);
      });
    return () => {
      active = false;
    };
  }, [apiKey]);

  if (!keyChecked) {
    return (
      <div className="h-[380px] sm:h-[420px] w-full rounded-2xl bg-[#9E0E15] flex items-center justify-center gap-2 text-sm text-white/90">
        <Loader2 className="w-4 h-4 animate-spin text-white" aria-hidden="true" />
        <span>Initializing Google Maps...</span>
      </div>
    );
  }

  if (!apiKey) {
    return (
      <div className="py-4 space-y-3 text-sm text-white/90">
        <p className="text-white/85">
          Interactive map preview requires a configured Google Maps Platform key.
        </p>
        <div className="flex flex-wrap gap-4">
          {offices.map((office) => (
            <a
              key={office.id}
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.query)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:opacity-80 transition-opacity"
            >
              <MapPin className="w-3.5 h-3.5 text-white" aria-hidden="true" />
              <span>View {office.label} on Google Maps</span>
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey} language="en" region="KE">
      <OfficeLocationsMapCanvas offices={offices} />
    </APIProvider>
  );
}
