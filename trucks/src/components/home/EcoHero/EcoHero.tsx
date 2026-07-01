import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase_trucks/client';
import type { VehicleWithImages } from '@/types/database';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const formatPrice = (price: number) =>
    new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0,
    }).format(price);

export const EcoHero = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [vehicles, setVehicles] = useState<VehicleWithImages[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);

    const sectionRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const metaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchVehicles = async () => {
            const { data, error } = await supabase
                .from('vehicles')
                .select(`*, images:vehicle_images(*)`)
                .eq('status', 'available')
                .or('is_featured.eq.true,is_special_offer.eq.true')
                .order('is_special_offer', { ascending: false })
                .limit(5);
            if (!error && data) setVehicles(data as VehicleWithImages[]);
            setLoading(false);
        };
        fetchVehicles();
    }, []);

    useGSAP(() => {
        if (loading || vehicles.length === 0) return;

        gsap.set([imageRef.current, textRef.current, metaRef.current], { opacity: 0 });

        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

        tl.to(imageRef.current, { opacity: 1, duration: 1.5 })
            .to(textRef.current, { opacity: 1, duration: 1 }, '-=1')
            .to(metaRef.current, { opacity: 1, duration: 0.8 }, '-=0.6');
    }, { scope: sectionRef, dependencies: [loading, vehicles.length] });

    const transition = useCallback((newIndex: number) => {
        if (isAnimating) return;
        setIsAnimating(true);

        const tl = gsap.timeline({
            defaults: { ease: 'power3.inOut' },
            onComplete: () => setIsAnimating(false),
        });

        tl.to([textRef.current, metaRef.current], { opacity: 0, y: -20, duration: 0.3, stagger: 0.05 })
            .to(imageRef.current, { opacity: 0, scale: 1.02, duration: 0.4 }, '-=0.2')
            .call(() => setActiveIndex(newIndex))
            .to(imageRef.current, { opacity: 1, scale: 1, duration: 0.6 })
            .to([textRef.current, metaRef.current], { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }, '-=0.4');
    }, [isAnimating]);

    useEffect(() => {
        if (vehicles.length <= 1) return;
        const timer = setInterval(() => {
            const next = (activeIndex + 1) % vehicles.length;
            transition(next);
        }, 6000);
        return () => clearInterval(timer);
    }, [activeIndex, vehicles.length, transition]);

    const vehicle = vehicles[activeIndex];
    const image = vehicle?.images?.find((i) => i.is_primary) || vehicle?.images?.[0];

    if (loading) {
        return (
            <section className="h-screen bg-neutral-950 flex items-center justify-center">
                <div className="w-8 h-8 border border-neutral-700 border-t-neutral-400 rounded-full animate-spin" />
            </section>
        );
    }

    if (!vehicle) {
        return (
            <section className="h-screen bg-neutral-950 flex items-center justify-center">
                <p className="text-neutral-500">Nenhum veículo disponível</p>
            </section>
        );
    }

    return (
        <section ref={sectionRef} className="relative h-screen bg-neutral-950 overflow-hidden">
            {/* Full-bleed image */}
            <div ref={imageRef} className="absolute inset-0">
                {image && (
                    <img
                        src={image.url}
                        alt={vehicle.title}
                        className="w-full h-full object-cover"
                    />
                )}
                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/30" />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-end pb-20 lg:pb-28 px-8 lg:px-20">
                <div className="max-w-7xl">
                    {/* Main text */}
                    <div ref={textRef}>
                        <p className="text-neutral-500 text-sm tracking-[0.3em] uppercase mb-4 font-light">
                            {vehicle.brand}
                        </p>
                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white tracking-[-0.02em] leading-[0.95] mb-6">
                            {vehicle.model}
                        </h1>
                        <p className="text-3xl sm:text-4xl md:text-5xl text-white/90 font-light tracking-tight">
                            {formatPrice(vehicle.price)}
                        </p>
                    </div>

                    {/* Meta + CTA */}
                    <div ref={metaRef} className="mt-12 flex flex-col sm:flex-row sm:items-end gap-8 sm:gap-16">
                        <div className="flex gap-12 text-sm">
                            <div>
                                <p className="text-neutral-600 uppercase tracking-widest text-xs mb-1">Ano</p>
                                <p className="text-white font-light">{vehicle.year_manufacture}/{vehicle.year_model}</p>
                            </div>
                            <div>
                                <p className="text-neutral-600 uppercase tracking-widest text-xs mb-1">Quilometragem</p>
                                <p className="text-white font-light">{vehicle.mileage.toLocaleString('pt-BR')} km</p>
                            </div>
                            {vehicle.axle_config && (
                                <div>
                                    <p className="text-neutral-600 uppercase tracking-widest text-xs mb-1">Configuração</p>
                                    <p className="text-white font-light">{vehicle.axle_config}</p>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-4">
                            <Link
                                to={`/caminhoes/${vehicle.slug}`}
                                className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-neutral-900 text-sm font-medium tracking-wide hover:bg-neutral-100 transition-colors"
                            >
                                Detalhes
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </Link>
                            <Link
                                to="/caminhoes"
                                className="inline-flex items-center gap-2 px-6 py-3 text-white/70 text-sm font-medium tracking-wide hover:text-white border border-neutral-700 hover:border-neutral-500 transition-colors"
                            >
                                Ver Catálogo
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Slide indicators */}
                {vehicles.length > 1 && (
                    <div className="hidden lg:flex absolute bottom-20 lg:bottom-28 right-8 lg:right-20 flex-col gap-2">
                        {vehicles.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => i !== activeIndex && transition(i)}
                                disabled={isAnimating}
                                className={`w-px transition-all duration-700 ${i === activeIndex ? 'h-12 bg-white' : 'h-6 bg-neutral-700 hover:bg-neutral-500'
                                    }`}
                                aria-label={`Slide ${i + 1}`}
                            />
                        ))}
                    </div>
                )}

                {/* Current slide indicator */}
                <div className="hidden lg:block absolute bottom-20 lg:bottom-28 right-8 lg:right-20 -translate-x-8">
                    <p className="text-neutral-600 text-xs tracking-widest">
                        <span className="text-white">{String(activeIndex + 1).padStart(2, '0')}</span>
                        <span className="mx-2">/</span>
                        <span>{String(vehicles.length).padStart(2, '0')}</span>
                    </p>
                </div>
            </div>
        </section>
    );
};
