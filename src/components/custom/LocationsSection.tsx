'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import mapboxgl, { Map } from 'mapbox-gl';
import { locations, Location } from '@/data/infraestruturaData';
import { Truck, MapPin } from 'lucide-react';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoid2Vic3RhcnN0dWRpbyIsImEiOiJjbWJqaXUyZG8wZ3BtMmpxNm5pcGw0Y2ptIn0.UnohoPp9qrhIFOEoQ9FNfg';

const getLocationId = (locationName: string): string => {
  const nameToIdMap: { [key: string]: string } = {
    'Porto Alegre': 'porto-alegre',
    'Anápolis': 'anapoli',
    'Piracicaba': 'piracicaba',
    'São Bernardo do Campo': 'sao-bernardo-do-campo',
    'Pátio Jaraguá': 'patios-jaragua',
    'Duque de Caxias': 'duque-de-caxias',
    'Porto Real': 'porto-real',
    'Eusébio': 'eusebio',
    'São José dos Pinhais': 'sao-jose-dos-pinhais',
    'Palhoça': 'palhoca',
    'Itajaí': 'itajai',
  };
  
  return nameToIdMap[locationName] || locationName.toLowerCase().replace(/\s+/g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

const LocationsSection: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const router = useRouter();

  const handleExploreLocation = () => {
    if (selectedLocation) {
      const locationId = getLocationId(selectedLocation.name);
      router.push(`/localizacao/${locationId}`);
    }
  };

  const handleSelectLocationFromList = (location: Location) => {
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

    if (mapRef.current || !mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-47.8825, -15.7942], // Center on Brazil
      zoom: 4,
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
          <div class="marker-pulse ${location.type === 'matriz' ? 'marker-matriz' : 'marker-filial'}">
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
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight"
          >
            Pátios e Capacidades
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600"
          >
            Nossos pátios estão estrategicamente distribuídos pelo país para otimizar a logística de transporte.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-8 h-[500px]"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-900 h-full">
              <div ref={mapContainerRef} className="map-container h-full w-full" />
              {!mapLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                    <div className="text-center">
                      <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-white/60">Carregando mapa...</p>
                    </div>
                  </div>
                )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-4"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 h-full">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Nossas Unidades</h3>
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {locations.map((location) => (
                  <button
                    key={location.name}
                    onClick={() => handleSelectLocationFromList(location)}
                    className={`w-full text-left p-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${selectedLocation?.name === location.name ? 'bg-blue-50' : 'hover:bg-gray-100'}`}
                  >
                    <div className="flex items-center">
                        <MapPin className={`w-5 h-5 mr-3 ${selectedLocation?.name === location.name ? 'text-blue-600' : 'text-gray-500'}`} />
                        <div>
                            <p className={`font-semibold ${selectedLocation?.name === location.name ? 'text-blue-800' : 'text-gray-800'}`}>{location.name}</p>
                            <p className={`text-sm ${selectedLocation?.name === location.name ? 'text-blue-700' : 'text-gray-600'}`}>Capacidade: {location.capacity}</p>
                        </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationsSection;