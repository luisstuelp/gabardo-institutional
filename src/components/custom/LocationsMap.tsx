'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import mapboxgl, { Map } from 'mapbox-gl';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoid2Vic3RhcnN0dWRpbyIsImEiOiJjbWJqaXUyZG8wZ3BtMmpxNm5pcGw0Y2ptIn0.UnohoPp9qrhIFOEoQ9FNfg';

interface LocationData {
  name: string;
  state: string;
  coordinates: [number, number];
  address: string;
  type: string;
}

const locations: LocationData[] = [
  { name: 'Aflitos', state: 'PE', coordinates: [-34.8825, -8.0476], address: 'Rua dos Aflitos, 123 - Recife, PE', type: 'sede' },
  { name: 'Boa Viagem', state: 'PE', coordinates: [-34.8942, -8.1194], address: 'Av. Boa Viagem, 456 - Recife, PE', type: 'filial' },
  { name: 'Caruaru', state: 'PE', coordinates: [-35.9762, -8.2837], address: 'Rua Central, 789 - Caruaru, PE', type: 'filial' },
  { name: 'Fortaleza', state: 'CE', coordinates: [-38.5267, -3.7319], address: 'Av. Beira Mar, 321 - Fortaleza, CE', type: 'filial' },
  { name: 'Ilha do Leite', state: 'PE', coordinates: [-34.8731, -8.0389], address: 'Rua da Ilha, 654 - Recife, PE', type: 'filial' },
  { name: 'Petrolina', state: 'PE', coordinates: [-40.5019, -9.3891], address: 'Av. São Francisco, 987 - Petrolina, PE', type: 'filial' },
  { name: 'Recife Antigo', state: 'PE', coordinates: [-34.8711, -8.0631], address: 'Rua do Bom Jesus, 159 - Recife, PE', type: 'matriz' },
  { name: 'Várzea', state: 'PE', coordinates: [-34.9511, -8.0389], address: 'Av. Caxangá, 753 - Recife, PE', type: 'filial' },
];

// Função para mapear nomes das localizações para IDs das páginas
const getLocationId = (locationName: string): string => {
  const nameToIdMap: { [key: string]: string } = {
    'Aflitos': 'aflitos',
    'Boa Viagem': 'boa-viagem',
    'Caruaru': 'caruaru',
    'Fortaleza': 'fortaleza',
    'Ilha do Leite': 'ilha-do-leite',
    'Petrolina': 'petrolina',
    'Recife Antigo': 'recife-antigo',
    'Várzea': 'varzea',
  };
  
  return nameToIdMap[locationName] || locationName.toLowerCase().replace(/\s+/g, '-');
};

const LocationsMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const router = useRouter();

  const handleViewDetails = () => {
    if (selectedLocation) {
      const locationId = getLocationId(selectedLocation.name);
      router.push(`/localizacao/${locationId}`);
    }
  };

  useEffect(() => {
    if (!MAPBOX_ACCESS_TOKEN) {
      console.error('Mapbox Access Token is not configured');
      return;
    }

    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

    if (mapRef.current || !mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-35.5, -8.5], // Center on Pernambuco region
      zoom: 6.5,
      minZoom: 2.5,
      maxZoom: 12,
      maxBounds: [
        [-110, -70],
        [-20, 25],
      ],
      attributionControl: false,
    });

    mapRef.current = map;

    map.on('load', () => {
      setMapLoaded(true);

      map.addControl(new mapboxgl.NavigationControl({
        showCompass: false,
        showZoom: true,
      }), 'top-right');

      locations.forEach((location) => {
        const markerElement = document.createElement('div');
        markerElement.className = 'custom-marker';
        markerElement.innerHTML = `
          <div class="marker-pulse ${location.type === 'matriz' ? 'marker-matriz' : location.type === 'sede' ? 'marker-sede' : 'marker-filial'}">
            <div class="marker-dot"></div>
          </div>
        `;

        new mapboxgl.Marker(markerElement)
          .setLngLat(location.coordinates)
          .addTo(map);

        markerElement.addEventListener('click', () => {
          setSelectedLocation(location);
          map.flyTo({
            center: location.coordinates,
            zoom: 12,
            duration: 1000,
          });
        });
      });

      const style = document.createElement('style');
      style.textContent = `
        .custom-marker {
          cursor: pointer;
        }
        .marker-pulse {
          position: relative;
          width: 20px;
          height: 20px;
        }
        .marker-pulse::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: pulse 2s infinite;
          opacity: 0.3;
        }
        .marker-dot {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          border: 2px solid white;
          box-shadow: 0 0 10px rgba(0,0,0,0.3);
        }
        .marker-matriz .marker-dot,
        .marker-matriz::before {
          background-color: #38B6FF;
        }
        .marker-sede .marker-dot,
        .marker-sede::before {
          background-color: #3b82f6;
        }
        .marker-filial .marker-dot,
        .marker-filial::before {
          background-color: #10b981;
        }
        @keyframes pulse {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-neutral-800 mb-4"
          >
            mapa interativo
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-neutral-600 max-w-2xl mx-auto"
          >
            Clique nos pontos para explorar nossas unidades
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Map Container */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-8"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-neutral-900">
              <div
                ref={mapContainerRef}
                className="map-container h-[500px] w-full"
              >
                {!mapLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-neutral-900">
                    <div className="text-center">
                      <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-white/60">Carregando mapa...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Location Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-4"
          >
            <div className="sticky top-8">
              {selectedLocation ? (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-neutral-200">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold text-neutral-800">
                      {selectedLocation.name} - {selectedLocation.state}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedLocation.type === 'matriz' 
                        ? 'bg-[#D9F2FF] text-[#0B1B31]' 
                        : selectedLocation.type === 'sede'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {selectedLocation.type}
                    </span>
                  </div>
                  <p className="text-neutral-600 mb-6">{selectedLocation.address}</p>
                  <p className="text-neutral-500 text-sm mb-4">UF: {selectedLocation.state}</p>

                  <button
                    onClick={handleViewDetails}
                    className="w-full bg-neutral-900 text-white py-3 px-6 rounded-xl font-medium hover:bg-neutral-800 transition-colors"
                  >
                    Ver Detalhes
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-neutral-200">
                  <h3 className="text-xl font-bold text-neutral-800 mb-4">
                    Selecione uma localização
                  </h3>
                  <p className="text-neutral-600 mb-6">
                    Clique em qualquer ponto no mapa para ver mais informações sobre nossa unidade.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#38B6FF' }}></div>
                      <span className="text-neutral-600">Matriz</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-neutral-600">Sede</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-neutral-600">Filial</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationsMap; 