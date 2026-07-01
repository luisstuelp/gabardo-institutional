import { Link } from 'react-router-dom';
import { ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button_trucks';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import { useVehicles } from '@/hooks/useVehicles';
import { useVehicleImagesBatch } from '@/hooks/useVehicleImages.batch';
import { formatPrice, formatMileage } from '@/lib/format';

export function FeaturedCarousel() {
  const { data: vehicles, isLoading } = useVehicles({ isFeatured: true });
  const vehicleIds = vehicles?.map((v) => v.id) || [];
  const { data: imagesMap } = useVehicleImagesBatch(vehicleIds);

  if (isLoading) {
    return (
      <section className="py-12 bg-slate-50">
        <div className="container-gabardo">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold font-montserrat text-slate-900">
              Veículos em Destaque
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden border border-slate-200">
                <div className="aspect-[4/3] bg-slate-100 animate-pulse" />
                <div className="p-4 space-y-2">
                  <div className="h-5 bg-slate-100 animate-pulse rounded" />
                  <div className="h-4 bg-slate-100 animate-pulse rounded w-2/3" />
                  <div className="h-6 bg-slate-100 animate-pulse rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!vehicles?.length) return null;

  return (
    <section className="py-12 bg-slate-50">
      <div className="container-gabardo">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold font-montserrat text-slate-900">
              Veículos em Destaque
            </h2>
            <p className="text-slate-500 mt-1">Os melhores do nosso estoque</p>
          </div>
          <Link
            to="/caminhoes?destaque=true"
            className="hidden md:flex items-center gap-1 text-[#122d54] hover:text-blue-700 font-medium text-sm"
          >
            Ver todos <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {vehicles.slice(0, 8).map((vehicle) => {
              const primaryImage = imagesMap?.[vehicle.id];
              const imageUrl = primaryImage?.url || 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400';

              return (
                <CarouselItem key={vehicle.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/4">
                  <Link to={`/caminhoes/${vehicle.slug}`} className="block h-full">
                    <div className="group bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 h-full flex flex-col">
                      {/* Image */}
                      <div className="aspect-[4/3] overflow-hidden relative">
                        <img
                          src={imageUrl}
                          alt={vehicle.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {vehicle.is_featured && (
                          <div className="absolute top-3 left-3">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-[#122d54] text-white shadow-md uppercase tracking-wide">
                              <Star className="h-3 w-3 fill-current" />
                              Destaque
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-4 flex flex-col flex-1">
                        <h3 className="font-semibold font-montserrat text-slate-900 text-sm line-clamp-2 mb-2 group-hover:text-[#122d54] transition-colors">
                          {vehicle.title}
                        </h3>

                        <p className="text-sm text-slate-500 mb-3">
                          {vehicle.year_model} • {formatMileage(vehicle.mileage)}
                        </p>

                        <div className="mt-auto">
                          <p className="text-lg font-bold text-[#122d54] mb-3">
                            {formatPrice(vehicle.price)}
                          </p>

                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-slate-200 hover:bg-[#122d54] hover:text-white hover:border-[#122d54]"
                          >
                            Ver Detalhes
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4 bg-white border-slate-200 hover:bg-[#122d54] hover:text-white hover:border-[#122d54]" />
          <CarouselNext className="hidden md:flex -right-4 bg-white border-slate-200 hover:bg-[#122d54] hover:text-white hover:border-[#122d54]" />
        </Carousel>

        <Link
          to="/caminhoes?destaque=true"
          className="md:hidden flex items-center justify-center gap-1 text-[#122d54] hover:text-blue-700 font-medium text-sm mt-6"
        >
          Ver todos <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
