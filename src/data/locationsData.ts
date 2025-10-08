// Location data types for the application

export interface LocationData {
  id: string;
  name: string;
  city?: string;
  state?: string;
  fullName?: string;
  tagline?: string;
  subtitle?: string;
  type?: string;
  hero?: {
    image: string;
    description: string;
    highlights: string[];
  };
  about?: {
    title: string;
    description: string;
    features: string[];
    image: string;
  };
  floorplan?: {
    title: string;
    areas: Array<{ name: string; size: string }>;
    totalArea: string;
    capacity: string;
  };
  gallery?: string[];
  services?: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  advantages?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  testimonial?: {
    text: string;
    author: string;
    role: string;
    avatar: string;
  };
  transform?: {
    title: string;
    description: string;
    benefits: string[];
    image: string;
  };
  contact?: {
    address: string;
    phone: string;
    email: string;
    hours: string;
    coordinates: [number, number];
  };
}
