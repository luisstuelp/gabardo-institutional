import { Link } from 'react-router-dom';
import { Heart, Gauge, Calendar, Fuel, Star } from 'lucide-react';
import { Button } from '@/components/ui/button_trucks';
import { cn } from '@/lib/utils';
import { Vehicle, VehicleImage } from '@/types/database';
import { formatPrice, formatMileage, formatYear, getFuelLabel } from '@/lib/format';

interface VehicleCardProps {
  vehicle: Vehicle;
  image?: VehicleImage;
  onFavorite?: (id: string) => void;
  isFavorite?: boolean;
}

export function VehicleCard({ vehicle, image, onFavorite, isFavorite }: VehicleCardProps) {
  const imageUrl = image?.url || 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800';

  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={imageUrl}
          alt={vehicle.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {vehicle.is_special_offer && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md uppercase tracking-wide">
              Oferta
            </span>
          )}
          {vehicle.is_featured && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-[#122d54] text-white shadow-md uppercase tracking-wide">
              <Star className="h-3 w-3 fill-current" />
              Destaque
            </span>
          )}
          {vehicle.is_semi_new && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-slate-600 text-white shadow-md uppercase tracking-wide">
              Seminovo
            </span>
          )}
          {vehicle.is_single_owner && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-600 text-white shadow-md uppercase tracking-wide">
              Único Dono
            </span>
          )}
        </div>

        {/* Favorite button */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'absolute top-3 right-3 h-9 w-9 rounded-full bg-white/90 hover:bg-white shadow-sm',
            isFavorite ? 'text-red-500' : 'text-slate-400 hover:text-red-500'
          )}
          onClick={(e) => {
            e.preventDefault();
            onFavorite?.(vehicle.id);
          }}
        >
          <Heart className={cn('h-5 w-5', isFavorite && 'fill-current')} />
        </Button>
      </div>

      {/* Content */}
      <div className="p-4">
        <Link to={`/caminhoes/${vehicle.slug}`}>
          <h3 className="font-semibold text-base font-montserrat text-slate-900 line-clamp-2 mb-2 group-hover:text-[#122d54] transition-colors">
            {vehicle.title}
          </h3>
        </Link>

        {/* Specs */}
        <div className="flex flex-wrap gap-3 text-sm text-slate-500 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formatYear(vehicle.year_manufacture, vehicle.year_model)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Gauge className="h-4 w-4" />
            <span>{formatMileage(vehicle.mileage)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Fuel className="h-4 w-4" />
            <span>{getFuelLabel(vehicle.fuel)}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <span className="text-xl font-bold text-[#122d54]">
            {formatPrice(vehicle.price)}
          </span>
          <Link to={`/caminhoes/${vehicle.slug}`}>
            <Button variant="outline" size="sm" className="border-slate-200 hover:bg-[#122d54] hover:text-white hover:border-[#122d54]">
              Ver detalhes
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
