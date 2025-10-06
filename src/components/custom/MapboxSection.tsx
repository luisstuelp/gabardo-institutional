'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import mapboxgl, { Map } from 'mapbox-gl';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoid2Vic3RhcnN0dWRpbyIsImEiOiJjbWJqaXUyZG8wZ3BtMmpxNm5pcGw0Y2ptIn0.UnohoPp9qrhIFOEoQ9FNfg';

interface LocationData {
  name: string;
  coordinates: [number, number];
  address: string;
  phone: string;
  type: string;
  region: string;
}

const locations: LocationData[] = [
  // CENTRO OESTE/SUDESTE
  { name: 'Anápolis', coordinates: [-48.9530, -16.3266], address: 'Anápolis - GO', phone: '+55 (62) 4014-3000', type: 'filial', region: 'Centro Oeste/Sudeste' },
  { name: 'Piracicaba', coordinates: [-47.6498, -22.7253], address: 'Piracicaba - SP', phone: '+55 (19) 3370-3000', type: 'filial', region: 'Centro Oeste/Sudeste' },
  { name: 'São Bernardo do Campo', coordinates: [-46.5447, -23.6914], address: 'SBC - SP', phone: '+55 (11) 4341-3000', type: 'filial', region: 'Centro Oeste/Sudeste' },
  { name: 'Pátios Jaragua', coordinates: [-46.7644, -23.4567], address: 'Pátios Jaragua - SP', phone: '+55 (11) 3906-3000', type: 'filial', region: 'Centro Oeste/Sudeste' },
  { name: 'Iracemápolis', coordinates: [-47.5205, -22.5815], address: 'Iracemápolis - SP', phone: '+55 (19) 3541-0179', type: 'filial', region: 'Centro Oeste/Sudeste' },
  { name: 'Duque de Caxias', coordinates: [-43.3117, -22.7856], address: 'Duque de Caxias - RJ', phone: '+55 (21) 2674-3000', type: 'filial', region: 'Centro Oeste/Sudeste' },
  { name: 'Porto Real', coordinates: [-44.2917, -22.4240], address: 'Porto Real - RJ', phone: '+55 (24) 3354-3000', type: 'filial', region: 'Centro Oeste/Sudeste' },
  { name: 'Cariacica', coordinates: [-40.4173, -20.2617], address: 'Cariacica - ES', phone: '+55 (27) 4009-3000', type: 'filial', region: 'Centro Oeste/Sudeste' },
  
  // NORDESTE
  { name: 'Eusébio', coordinates: [-38.4507, -3.8900], address: 'Eusébio - CE', phone: '+55 (85) 3257-6363', type: 'filial', region: 'Nordeste' },
  
  // SUL
  { name: 'Porto Alegre', coordinates: [-51.2177, -30.0346], address: 'Porto Alegre - RS', phone: '+55 (51) 3373-3000', type: 'matriz', region: 'Sul' },
  { name: 'São José dos Pinhais', coordinates: [-49.2063, -25.5335], address: 'S. J. Pinhais - PR', phone: '+55 (41) 3384-3000', type: 'filial', region: 'Sul' },
  { name: 'Palhoça', coordinates: [-48.6700, -27.6384], address: 'Palhoça - SC', phone: '+55 (48) 3255-3000', type: 'filial', region: 'Sul' },
  { name: 'Três Margens', coordinates: [-51.1151, -23.8505], address: 'Três MR - PR', phone: '+55 (43) 3629-3000', type: 'filial', region: 'Sul' },
];

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
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const router = useRouter();

  const handleExploreLocation = () => {
    if (selectedLocation) {
      const locationId = getLocationId(selectedLocation.name);
      router.push(`/localizacao/${locationId}`);
    }
  };

  const handleSelectLocationFromList = (location: LocationData) => {
    setSelectedLocation(location);
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: location.coordinates,
        zoom: 12,
        duration: 1000,
      });
    }
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
      zoom: 4,
      minZoom: 2.5,
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

        const marker = new mapboxgl.Marker(markerElement)
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
          background-color: #ef4444;
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
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{color: '#132D51'}}
          >
            Nossas Unidades
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto"
            style={{color: '#132D51'}}
          >
            A Gabardo está presente nas principais cidades do Brasil para oferecer o melhor serviço de transporte de veículos
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
                    <h3 className="text-2xl font-bold" style={{color: '#132D51'}}>
                      {selectedLocation.name}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedLocation.type === 'matriz' 
                        ? 'bg-red-100 text-red-800' 
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
                    className="w-full text-white py-3 px-6 rounded-xl font-medium transition-colors"
                    style={{backgroundColor: '#132D51'}}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0f1f3a'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#132D51'}
                  >
                    Explorar Localização
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-neutral-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold" style={{color: '#132D51'}}>
                      Nossas Unidades
                    </h3>
                    {/* Flag Icons */}
                    <div className="flex items-center space-x-2">
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
                  <p className="mb-6" style={{color: '#132D51'}}>
                    Selecione uma unidade para ver no mapa ou explore clicando nos pontos.
                  </p>
                  <div className="space-y-4 max-h-[400px] overflow-y-auto">
                    {['Sul', 'Centro Oeste/Sudeste', 'Nordeste'].map((region) => (
                      <div key={region}>
                        <h4 className="text-sm font-bold mb-2 uppercase tracking-wider" style={{color: '#132D51'}}>
                          {region}
                        </h4>
                        <ul className="space-y-1">
                          {locations.filter(loc => loc.region === region).map((location) => (
                            <li key={location.name}>
                              <button
                                onClick={() => handleSelectLocationFromList(location)}
                                className="w-full text-left p-2 rounded-lg hover:bg-neutral-100 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-300 flex items-center gap-3"
                              >
                                <span className={`w-2 h-2 rounded-full ${
                                  location.type === 'matriz' 
                                    ? 'bg-red-500' 
                                    : location.type === 'sede'
                                    ? 'bg-blue-500'
                                    : 'bg-green-500'
                                }`}></span>
                                <div className="flex-1">
                                  <span className="font-medium text-sm" style={{color: '#132D51'}}>{location.name}</span>
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