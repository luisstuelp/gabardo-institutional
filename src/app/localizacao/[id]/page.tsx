import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import LocationDetailHero from '@/components/custom/LocationDetailHero';
import LocationDetailAbout from '@/components/custom/LocationDetailAbout';
import LocationDetailFloorplan from '@/components/custom/LocationDetailFloorplan';
import LocationDetailGallery from '@/components/custom/LocationDetailGallery';
import LocationDetailServices from '@/components/custom/LocationDetailServices';
import LocationDetailAdvantages from '@/components/custom/LocationDetailAdvantages';
import LocationDetailTestimonial from '@/components/custom/LocationDetailTestimonial';
import LocationDetailTransform from '@/components/custom/LocationDetailTransform';
import LocationDetailContact from '@/components/custom/LocationDetailContact';
import LocationDetailMap from '@/components/custom/LocationDetailMap';

// Tipo para os detalhes de localização
interface LocationDetail {
  id: string;
  name: string;
  city: string;
  state: string;
  fullName: string;
  tagline: string;
  subtitle: string;
  type: string;
  hero: {
    image: string;
    description: string;
    highlights: string[];
  };
  about: {
    title: string;
    description: string;
    features: string[];
    image: string;
  };
  floorplan: {
    title: string;
    areas: Array<{ name: string; size: string }>;
    totalArea: string;
    capacity: string;
  };
  gallery: string[];
  services: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  advantages: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  testimonial: {
    text: string;
    author: string;
    role: string;
    avatar: string;
  };
  transform: {
    title: string;
    description: string;
    benefits: string[];
    image: string;
  };
  contact: {
    address: string;
    phone: string;
    email: string;
    hours: string;
    coordinates: [number, number];
  };
}

// Dados detalhados das localizações
const locationDetails: Record<string, LocationDetail> = {
};

interface LocationPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { id } = await params;
  const location = locationDetails[id as keyof typeof locationDetails];
  
  if (!location) {
    return {
      title: 'Localização não encontrada | Plural'
    };
  }

  return {
    title: `${location.fullName} | Plural`,
    description: `Conheça nossa unidade ${location.name} em ${location.city}. ${location.about.description}`,
    keywords: `plural, ${location.name}, ${location.city}, coworking, escritório`,
    openGraph: {
      title: `${location.fullName} | Plural`,
      description: `Conheça nossa unidade ${location.name} em ${location.city}. ${location.about.description}`,
      type: 'website',
      locale: 'pt_BR',
    },
  };
}

export default async function LocationDetailPage({ params }: LocationPageProps) {
  const { id } = await params;
  const location = locationDetails[id as keyof typeof locationDetails];

  if (!location) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <LocationDetailHero location={location} />
      
      {/* About Section */}
      <LocationDetailAbout location={location} />
      
      {/* Floorplan Section */}
      <LocationDetailFloorplan location={location} />
      
      {/* Gallery Section */}
      <LocationDetailGallery location={location} />
      
      {/* Services Section */}
      <LocationDetailServices location={location} />
      
      {/* Advantages Section */}
      <LocationDetailAdvantages location={location} />
      
      {/* Testimonial Section */}
      <LocationDetailTestimonial location={location} />
      
      {/* Transform Section */}
      <LocationDetailTransform location={location} />
      
      {/* Contact Form Section */}
      <LocationDetailContact />
      
      {/* Map Section */}
      <LocationDetailMap location={location} />
    </main>
  );
} 