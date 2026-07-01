import { EcoHero } from '@/components/home/EcoHero/EcoHero';
import { CategoryTiles } from '@/components/home/CategoryTiles';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';

import { FeaturedCarousel } from '@/components/home/FeaturedCarousel';

import { BrandLogos } from '@/components/home/BrandLogos';

export default function Index() {
  return (
    <div className="flex flex-col">
      {/* Premium Hero */}
      <EcoHero />

      {/* Transition gradient from dark hero to light content */}


      {/* Why Choose Us - Text Only */}
      <WhyChooseUs />



      {/* Category Tiles - Ofertas + Seminovos */}
      <CategoryTiles />

      {/* Featured Vehicles Carousel */}
      <FeaturedCarousel />





      {/* Brand Logos Strip */}
      <BrandLogos />
    </div>
  );
}
