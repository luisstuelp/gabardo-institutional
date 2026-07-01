import { useState, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LayoutGrid, List, Truck } from 'lucide-react';
import { useInfiniteVehicles } from '@/hooks/useInfiniteVehicles';
import { useVehicleImagesBatch } from '@/hooks/useVehicleImages.batch';
import { useFavorites } from '@/hooks/useFavorites';
import { VehicleFilters } from '@/types/database';
import { VehicleCard } from '@/components/vehicles/VehicleCard';
import { BrandChips } from '@/components/catalog/BrandChips';
import { CatalogFilters } from '@/components/catalog/CatalogFilters';
import { SearchBar } from '@/components/catalog/SearchBar';
import { VehicleGridSkeleton } from '@/components/catalog/VehicleGridSkeleton';
import { EmptyState } from '@/components/catalog/EmptyState';
import { InfiniteScrollTrigger } from '@/components/catalog/InfiniteScrollTrigger';
import { Button } from '@/components/ui/button_trucks';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { ScrollToTopButton } from '@/components/ui/scroll-to-top-button';

const ITEMS_PER_PAGE = 12;

const SORT_OPTIONS = [
  { value: 'recent', label: 'Mais recentes' },
  { value: 'price_asc', label: 'Menor preço' },
  { value: 'price_desc', label: 'Maior preço' },
  { value: 'year_desc', label: 'Ano mais novo' },
  { value: 'mileage_asc', label: 'Menor km' },
];

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Get filters from URL or state
  const [filters, setFilters] = useState<VehicleFilters>(() => {
    const brand = searchParams.get('marca') || undefined;
    const search = searchParams.get('busca') || undefined;
    return { brand, search };
  });

  const [sortBy, setSortBy] = useState('recent');

  // Fetch vehicles with infinite scroll
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteVehicles(filters, sortBy);

  // Flatten all pages into single array
  const vehicles = useMemo(
    () => data?.pages.flatMap((page) => page.vehicles) || [],
    [data]
  );

  const totalCount = data?.pages[0]?.totalCount || 0;

  // Favorites
  const { toggleFavorite, isFavorite } = useFavorites();

  // Get vehicle IDs for batch image fetch
  const vehicleIds = useMemo(() => vehicles.map((v) => v.id), [vehicles]);
  const { data: imagesMap = {} } = useVehicleImagesBatch(vehicleIds);

  // Load more callback
  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.brand) count++;
    if (filters.priceMin) count++;
    if (filters.priceMax) count++;
    if (filters.yearMin) count++;
    if (filters.yearMax) count++;
    if (filters.fuel) count++;
    if (filters.transmission) count++;
    return count;
  }, [filters]);

  // Handlers
  const handleFiltersChange = (newFilters: VehicleFilters) => {
    setFilters(newFilters);

    // Update URL
    const params = new URLSearchParams();
    if (newFilters.brand) params.set('marca', newFilters.brand);
    if (newFilters.search) params.set('busca', newFilters.search);
    setSearchParams(params);
  };

  const handleBrandSelect = (brand: string | null) => {
    handleFiltersChange({ ...filters, brand: brand || undefined });
  };

  const handleSearchChange = (search: string) => {
    handleFiltersChange({ ...filters, search: search || undefined });
  };

  const handleClearFilters = () => {
    handleFiltersChange({});
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="container-gabardo py-4">
          <div className="flex flex-col gap-4">
            {/* Search and Mobile Filter */}
            <div className="flex gap-3">
              <SearchBar
                value={filters.search || ''}
                onChange={handleSearchChange}
              />
              {/* Mobile only filter button */}
              <div className="lg:hidden">
                <CatalogFilters
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  activeFiltersCount={activeFiltersCount}
                />
              </div>
            </div>

            {/* Brand Chips */}
            <BrandChips
              selectedBrand={filters.brand || null}
              onBrandSelect={handleBrandSelect}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-gabardo py-8">
        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          {/* Desktop Filters Sidebar */}
          <CatalogFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            activeFiltersCount={activeFiltersCount}
            hideTrigger
          />

          {/* Results Area */}
          <div className="flex-1 min-w-0">
            {/* Results Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold font-montserrat text-slate-900">
                  Caminhões Disponíveis
                </h1>
                {!isLoading && (
                  <p className="text-slate-500 mt-1">
                    <span className="font-semibold text-[#122d54]">{totalCount}</span> veículo{totalCount !== 1 ? 's' : ''} encontrado{totalCount !== 1 ? 's' : ''}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">
                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[160px] bg-white border-slate-200 hover:border-blue-300 transition-colors">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-xl border-slate-200">
                    {SORT_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* View Mode Toggle */}
                <div className="hidden sm:flex bg-white border border-slate-200 rounded-xl overflow-hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      'rounded-none h-10 w-10 transition-all',
                      viewMode === 'grid'
                        ? 'bg-[#122d54] text-white hover:bg-[#0d1f3d]'
                        : 'text-slate-500 hover:text-[#122d54] hover:bg-blue-50'
                    )}
                    onClick={() => setViewMode('grid')}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      'rounded-none h-10 w-10 transition-all',
                      viewMode === 'list'
                        ? 'bg-[#122d54] text-white hover:bg-[#0d1f3d]'
                        : 'text-slate-500 hover:text-[#122d54] hover:bg-blue-50'
                    )}
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && <VehicleGridSkeleton count={ITEMS_PER_PAGE} />}

            {/* Error State */}
            {error && (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-50 flex items-center justify-center">
                  <Truck className="h-8 w-8 text-red-400" />
                </div>
                <p className="text-red-600 font-medium">Erro ao carregar veículos.</p>
                <p className="text-slate-500 text-sm mt-1">Por favor, tente novamente.</p>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && !error && vehicles.length === 0 && (
              <EmptyState onClearFilters={handleClearFilters} />
            )}

            {/* Vehicle Grid */}
            {!isLoading && !error && vehicles.length > 0 && (
              <>
                <div
                  className={cn(
                    'gap-6',
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                      : 'flex flex-col'
                  )}
                >
                  {vehicles.map((vehicle) => (
                    <VehicleCard
                      key={vehicle.id}
                      vehicle={vehicle}
                      image={imagesMap[vehicle.id]}
                      isFavorite={isFavorite(vehicle.id)}
                      onFavorite={toggleFavorite}
                    />
                  ))}
                </div>

                {/* Infinite Scroll Trigger */}
                <InfiniteScrollTrigger
                  onLoadMore={handleLoadMore}
                  hasNextPage={!!hasNextPage}
                  isFetchingNextPage={isFetchingNextPage}
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <ScrollToTopButton />
    </div>
  );
}
