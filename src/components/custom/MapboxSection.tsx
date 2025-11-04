'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import mapboxgl, { Map } from 'mapbox-gl';
import units from '@/data/units.json';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoid2Vic3RhcnN0dWRpbyIsImEiOiJjbWJqaXUyZG8wZ3BtMmpxNm5pcGw0Y2ptIn0.UnohoPp9qrhIFOEoQ9FNfg';

interface LocationData {
  name: string;
  state: string;
  coordinates: [number, number];
  address: string;
  phone: string;
  type: string;
  region: string;
  mapUrl?: string;
}

const mapRegion = (region: string) => {
  if (region === 'Sul') return 'Sul';
  if (region === 'Nordeste') return 'Nordeste';
  if (region === 'Sudeste' || region === 'Centro-Oeste') return 'Centro Oeste/Sudeste';
  return region;
};

const locations: LocationData[] = units.map(unit => ({
  name: unit.nome,
  state: unit.estado,
  coordinates: [unit.lng, unit.lat],
  address: unit.endereco,
  phone: unit.telefone,
  type: unit.nome.includes('Matriz') ? 'matriz' : 'filial',
  region: mapRegion(unit.regiao),
  mapUrl: unit.mapUrl,
}));

// Função para mapear nomes das localizações para IDs das páginas
const getLocationId = (locationName: string): string => {
  const nameToIdMap: { [key: string]: string } = {
    'Porto Alegre': 'porto-alegre',
    'Anápolis': 'anapoli',
    'Piracicaba': 'piracicaba',
    'São Bernardo do Campo': 'sao-bernardo-do-campo',
    'Pátios Jaragua': 'patios-jaragua',
    'Iracemápolis': 'iracemapolis',
    'Duque de Caxias': 'duque-de-caxias',
    'Porto Real': 'porto-real',
    'Cariacica': 'cariacica',
    'Eusébio': 'eusebio',
    'São José dos Pinhais': 'sao-jose-dos-pinhais',
    'Palhoça': 'palhoca',
    'Três Margens': 'tres-margens',
  };
  
  return nameToIdMap[locationName] || locationName.toLowerCase().replace(/\s+/g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

const MapboxSection: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedLocation] = useState<LocationData | null>(null);
  const router = useRouter();

  const handleExploreLocation = () => {
    if (selectedLocation) {
      const locationId = getLocationId(selectedLocation.name);
      router.push(`/localizacao/${locationId}`);
    }
  };

  const handleSelectLocationFromList = (location: LocationData) => {
    const mapUrl = location.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`;
    window.open(mapUrl, '_blank');
  };

  useEffect(() => {
    if (!MAPBOX_ACCESS_TOKEN) {
      console.error('Mapbox Access Token is not configured');
      return;
    }
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

    if (mapRef.current) return;

    const container = mapContainerRef.current;
    if (!container) return;

    const map = new mapboxgl.Map({
      container,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-47.8825, -15.7942], // Center on Brazil
      zoom: 3.5,
      minZoom: 3,
      maxBounds: [
        [-125, -75],
        [-15, 32],
      ],
      attributionControl: false,
      scrollZoom: true,
      touchZoomRotate: true,
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
          const mapUrl = location.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`;
          window.open(mapUrl, '_blank');
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
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4"
            style={{color: '#132D51'}}
          >
            Nossas Unidades
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4 sm:px-0"
            style={{color: '#132D51'}}
          >
            De norte a sul, oferecemos cobertura completa em todo o território nacional.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Map Container */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-8"
          >
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl bg-neutral-900">
              <div
                ref={mapContainerRef}
                className="map-container h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] w-full"
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
            className="lg:col-span-4 mt-6 lg:mt-0"
          >
            <div className="lg:sticky lg:top-8">
              {selectedLocation ? (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-neutral-200">
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <h3 className="text-xl sm:text-2xl font-bold" style={{color: '#132D51'}}>
                      {selectedLocation.name}
                    </h3>
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-[0.65rem] sm:text-xs font-medium ${
                      selectedLocation.type === 'matriz' 
                        ? 'bg-[#D9F2FF] text-[#0B1B31]' 
                        : selectedLocation.type === 'sede'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {selectedLocation.type}
                    </span>
                  </div>
                  <p className="mb-2" style={{color: '#132D51'}}>{selectedLocation.address}</p>
                  <p className="mb-2 font-medium" style={{color: '#132D51'}}>{selectedLocation.phone}</p>
                  <p className="text-sm mb-6" style={{color: '#132D51'}}>{selectedLocation.region}</p>
                  <button
                    onClick={handleExploreLocation}
                    className="w-full text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl font-medium text-sm sm:text-base transition-colors bg-gabardo-blue hover:bg-gabardo-blue/90"
                  >
                    Explorar Localização
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-neutral-200">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold" style={{color: '#132D51'}}>
                      Nossas Unidades
                    </h3>
                    {/* Flag Icons */}
                    <div className="hidden sm:flex items-center space-x-2">
                      {/* Brazil - Green field with yellow diamond and blue circle */}
                      <div className="w-8 h-6 rounded-md overflow-hidden shadow-md bg-green-500 flex items-center justify-center relative">
                        <div className="w-4 h-4 bg-yellow-400 transform rotate-45 relative"></div>
                        <div className="absolute w-2.5 h-2.5 bg-blue-600 rounded-full"></div>
                      </div>
                      
                      {/* Argentina - Light blue, white, light blue with sun */}
                      <div className="w-8 h-6 rounded-md overflow-hidden shadow-md relative">
                        <div className="absolute inset-0 flex flex-col">
                          <div className="flex-1 bg-sky-300"></div>
                          <div className="flex-1 bg-white"></div>
                          <div className="flex-1 bg-sky-300"></div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center text-yellow-600 text-xs font-bold">☀</div>
                      </div>
                      
                      {/* Uruguay - 9 alternating stripes with canton and sun */}
                      <div className="w-8 h-6 rounded-md overflow-hidden shadow-md bg-white relative">
                        <div className="absolute inset-0 flex flex-col">
                          <div className="flex-1 bg-white"></div>
                          <div className="flex-1 bg-blue-500"></div>
                          <div className="flex-1 bg-white"></div>
                          <div className="flex-1 bg-blue-500"></div>
                          <div className="flex-1 bg-white"></div>
                          <div className="flex-1 bg-blue-500"></div>
                          <div className="flex-1 bg-white"></div>
                          <div className="flex-1 bg-blue-500"></div>
                          <div className="flex-1 bg-white"></div>
                        </div>
                        <div className="absolute top-0 left-0 w-3 h-3 bg-white flex items-center justify-center text-yellow-600 text-xs">☀</div>
                      </div>
                      
                      {/* Chile - Blue square with star, white and red stripes */}
                      <div className="w-8 h-6 rounded-md overflow-hidden shadow-md bg-red-500 relative">
                        <div className="absolute top-0 left-0 w-3 h-3 bg-blue-600 flex items-center justify-center text-white text-xs">★</div>
                        <div className="absolute top-0 left-3 right-0 h-3 bg-white"></div>
                        <div className="absolute bottom-0 left-0 right-0 h-3 bg-red-500"></div>
                      </div>
                      
                      {/* Bolivia - Red, yellow, green horizontal stripes */}
                      <div className="w-8 h-6 rounded-md overflow-hidden shadow-md flex flex-col">
                        <div className="flex-1 bg-red-600"></div>
                        <div className="flex-1 bg-yellow-400"></div>
                        <div className="flex-1 bg-green-600"></div>
                      </div>
                    </div>
                  </div>
                  <p className="mb-4 sm:mb-6 text-sm sm:text-base" style={{color: '#132D51'}}>
                    Selecione uma unidade para ver no mapa ou explore clicando nos pontos.
                  </p>
                  <div className="space-y-3 sm:space-y-4 max-h-[300px] sm:max-h-[350px] md:max-h-[400px] overflow-y-auto">
                    {['Sul', 'Centro Oeste/Sudeste', 'Nordeste'].map((region) => (
                      <div key={region}>
                        <h4 className="text-xs sm:text-sm font-bold mb-1.5 sm:mb-2 uppercase tracking-wider" style={{color: '#132D51'}}>
                          {region}
                        </h4>
                        <ul className="space-y-1 sm:space-y-1.5">
                          {locations.filter(loc => loc.region === region).map((location) => (
                            <li key={location.name}>
                              <button
                                onClick={() => handleSelectLocationFromList(location)}
                                className="w-full text-left p-2 rounded-lg hover:bg-neutral-100 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-300 flex items-center gap-2 sm:gap-3"
                              >
                                <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                                  location.type === 'matriz' 
                                    ? 'bg-[#38B6FF]' 
                                    : location.type === 'sede'
                                    ? 'bg-blue-500'
                                    : 'bg-green-500'
                                }`}></span>
                                <div className="flex-1">
                                  <span className="font-medium text-sm" style={{color: '#132D51'}}>
                                    {location.name}{location.state ? ` (${location.state})` : ''}
                                  </span>
                                  <div className="text-xs" style={{color: '#132D51'}}>{location.phone}</div>
                                </div>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
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

export default MapboxSection; 