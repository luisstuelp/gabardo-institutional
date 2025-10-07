'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import mapboxgl, { Map } from 'mapbox-gl';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoid2Vic3RhcnN0dWRpbyIsImEiOiJjbWJqaXUyZG8wZ3BtMmpxNm5pcGw0Y2ptIn0.UnohoPp9qrhIFOEoQ9FNfg';

interface LocationDetailMapProps {
  location: {
    name: string;
    contact: {
      coordinates?: [number, number];
      address: string;
      phone: string;
      email: string;
      hours: string;
    };
  };
}

const LocationDetailMap: React.FC<LocationDetailMapProps> = ({ location }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

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
      style: 'mapbox://styles/mapbox/streets-v12',
      center: location.contact.coordinates || [-34.8711, -8.0631],
      zoom: 15,
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

      const markerElement = document.createElement('div');
      markerElement.innerHTML = `
        <div style="
          background: #1f2937;
          color: white;
          padding: 8px 16px;
          border-radius: 12px;
          font-weight: bold;
          font-size: 14px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          position: relative;
        ">
          ${location.name}
          <div style="
            position: absolute;
            bottom: -6px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-top: 6px solid #1f2937;
          "></div>
        </div>
      `;

      new mapboxgl.Marker(markerElement)
        .setLngLat(location.contact.coordinates || [-34.8711, -8.0631])
        .addTo(map);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [location]);

  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-neutral-800 mb-4"
          >
            nossa localização
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-neutral-600 max-w-2xl mx-auto"
          >
            Encontre-nos facilmente e venha conhecer nosso espaço
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-neutral-200 h-[400px]">
              <div
                ref={mapContainerRef}
                className="map-container w-full h-full"
              >
                {!mapLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-neutral-200">
                    <div className="text-center text-neutral-500">
                      <div className="w-8 h-8 border-2 border-neutral-400 border-t-neutral-600 rounded-full animate-spin mx-auto mb-4"></div>
                      <p>Carregando mapa...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Location Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-neutral-800 mb-4">
                Informações de Contato
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-yellow-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="18" height="18" strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5}/>
                      <path d="M9 9h6v6H9z" strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5}/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-neutral-800">Endereço</p>
                    <p className="text-neutral-600 text-sm">{location.contact.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="18" height="4" strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5}/>
                      <path d="M3 12h18M3 17h18" strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5}/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-neutral-800">Telefone</p>
                    <p className="text-neutral-600 text-sm">{location.contact.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-yellow-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="3" y="5" width="18" height="14" strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5}/>
                      <path d="M3 8l9 6 9-6" strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5}/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-neutral-800">Email</p>
                    <p className="text-neutral-600 text-sm">{location.contact.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="18" height="18" strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5}/>
                      <path d="M12 7v5l3 3M12 12h6" strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5}/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-neutral-800">Horário</p>
                    <p className="text-neutral-600 text-sm">{location.contact.hours}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="font-bold text-neutral-800 mb-4">Como Chegar</h4>
              <div className="space-y-3 text-sm text-neutral-600">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">🚇</span>
                  <span>Metrô: Estação Central (500m)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">🚌</span>
                  <span>Ônibus: Linhas 010, 020, 030</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-gray-500 text-white rounded-full flex items-center justify-center text-xs font-bold">🅿️</span>
                  <span>Estacionamento disponível</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationDetailMap; 