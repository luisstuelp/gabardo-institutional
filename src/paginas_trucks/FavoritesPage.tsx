import { useEffect } from 'react';
import { useNavigate, Link } from '@/lib/next-router-compat';
import { Heart, Truck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useFavorites } from '@/hooks/useFavorites';
import { useVehicles } from '@/hooks/useVehicles';
import { useVehicleImagesBatch } from '@/hooks/useVehicleImages.batch';
import { VehicleCard } from '@/components/vehicles/VehicleCard';
import { VehicleGridSkeleton } from '@/components/catalog/VehicleGridSkeleton';
import { Button } from '@/components/ui/button_trucks';

export default function FavoritesPage() {
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();
  const { favorites, isLoading: favoritesLoading, toggleFavorite, isFavorite } = useFavorites();
  const { data: allVehicles = [], isLoading: vehiclesLoading } = useVehicles();

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth', { state: { from: { pathname: '/favoritos' } } });
    }
  }, [user, authLoading, navigate]);

  // Filter vehicles that are in favorites
  const favoriteVehicles = allVehicles.filter((v) =>
    favorites.some((f) => f.vehicle_id === v.id)
  );

  // Get images for favorite vehicles
  const vehicleIds = favoriteVehicles.map((v) => v.id);
  const { data: imagesMap = {} } = useVehicleImagesBatch(vehicleIds);

  const isLoading = authLoading || favoritesLoading || vehiclesLoading;

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container-gabardo py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
          <Heart className="h-6 w-6 text-accent" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-montserrat text-primary">
            Meus Favoritos
          </h1>
          <p className="text-muted-foreground">
            {favoriteVehicles.length} veículo{favoriteVehicles.length !== 1 ? 's' : ''} salvo{favoriteVehicles.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {isLoading && <VehicleGridSkeleton count={4} />}

      {!isLoading && favoriteVehicles.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-6">
            <Truck className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold font-montserrat mb-2">
            Nenhum favorito ainda
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md">
            Explore nosso catálogo e salve os caminhões que mais te interessam para acessá-los facilmente depois.
          </p>
          <Link to="/caminhoes">
            <Button>Ver Catálogo</Button>
          </Link>
        </div>
      )}

      {!isLoading && favoriteVehicles.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {favoriteVehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              image={imagesMap[vehicle.id]}
              isFavorite={isFavorite(vehicle.id)}
              onFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}
