import { Link } from '@/lib/next-router-compat';

// Import brand logos
import mercedesLogo from '@/assets/Mercedes.png';
import fordLogo from '@/assets/Ford.png';
import volvoLogo from '@/assets/Volvo.png';
import volksLogo from '@/assets/Volks.png';
import scaniaLogo from '@/assets/Scania.png';

const brands = [
  { name: 'Volvo', logo: volvoLogo },
  { name: 'Scania', logo: scaniaLogo },
  { name: 'Mercedes-Benz', logo: mercedesLogo },
  { name: 'Volkswagen', logo: volksLogo },
  { name: 'Ford', logo: fordLogo },
];

export function BrandLogos() {
  // Duplicate brands array to ensure continuous scrolling
  const displayBrands = [...brands, ...brands, ...brands, ...brands];

  return (
    <section className="py-16 bg-white border-y border-slate-100 overflow-hidden">
      <div className="container-gabardo mb-10 text-center">
        <p className="text-sm font-bold text-[#122d54] uppercase tracking-widest">
          Marcas que trabalhamos
        </p>
      </div>

      <div className="relative w-full overflow-hidden mask-linear-fade">
        {/* Gradient Masks for smooth edges */}
        <div className="absolute top-0 left-0 z-10 h-full w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="absolute top-0 right-0 z-10 h-full w-24 bg-gradient-to-l from-white to-transparent" />

        {/* Scrolling Track */}
        <div className="flex w-full group overflow-hidden">
          <div className="flex shrink-0 w-max animate-infinite-scroll gap-16 md:gap-24 pr-16 md:pr-24 group-hover:[animation-play-state:paused]">
            {displayBrands.map((brand, index) => (
              <Link
                key={`list-1-${brand.name}-${index}`}
                to={`/caminhoes?marca=${encodeURIComponent(brand.name)}`}
                className="group/item flex items-center justify-center shrink-0 transition-transform hover:scale-110 duration-300"
              >
                <img
                  src={brand.logo.src}
                  alt={brand.name}
                  className="h-20 md:h-24 w-auto object-contain grayscale transition-all duration-300 group-hover/item:grayscale-0 opacity-70 group-hover/item:opacity-100"
                />
              </Link>
            ))}
          </div>
          <div className="flex shrink-0 w-max animate-infinite-scroll gap-16 md:gap-24 pr-16 md:pr-24 group-hover:[animation-play-state:paused]" aria-hidden="true">
            {displayBrands.map((brand, index) => (
              <Link
                key={`list-2-${brand.name}-${index}`}
                to={`/caminhoes?marca=${encodeURIComponent(brand.name)}`}
                className="group/item flex items-center justify-center shrink-0 transition-transform hover:scale-110 duration-300"
              >
                <img
                  src={brand.logo.src}
                  alt={brand.name}
                  className="h-20 md:h-24 w-auto object-contain grayscale transition-all duration-300 group-hover/item:grayscale-0 opacity-70 group-hover/item:opacity-100"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
