import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Heart, Share2, MapPin, Calendar, Gauge, Fuel, Settings2, Zap, Palette, Tag, Star } from 'lucide-react';
import { Button } from '@/components/ui/button_trucks';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { useVehicle, useVehicles } from '@/hooks/useVehicles';
import { useVehicleImages } from '@/hooks/useVehicleImages';
import { useBranch } from '@/hooks/useBranches';
import { formatPrice, formatMileage, formatYear, getFuelLabel, getTransmissionLabel } from '@/lib/format';
import { VehicleCard } from '@/components/vehicles/VehicleCard';
import { ImageGallery } from '@/components/vehicles/ImageGallery';
import { FinancingSimulator } from '@/components/vehicles/FinancingSimulator';
import { LeadModal } from '@/components/leads/LeadModal';
import { WhatsAppButton } from '@/components/leads/WhatsAppButton';
import { cn } from '@/lib/utils';
import { useFipe } from '@/hooks/useFipe';
import { TrendingDown, TrendingUp, Minus } from 'lucide-react';
import { Vehicle } from '@/types/database';

export default function VehicleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: vehicle, isLoading } = useVehicle(slug || '');
  const { data: images } = useVehicleImages(vehicle?.id || '');
  const { data: branch } = useBranch(vehicle?.branch_id || '');
  const { data: relatedVehicles } = useVehicles({ brand: vehicle?.brand });

  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  if (isLoading) {
    return <VehicleDetailSkeleton />;
  }

  if (!vehicle) {
    return (
      <div className="container-gabardo py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-slate-100 flex items-center justify-center">
            <Tag className="h-8 w-8 text-slate-400" />
          </div>
          <h1 className="text-2xl font-bold mb-4 text-slate-900">Veículo não encontrado</h1>
          <p className="text-slate-500 mb-6">O veículo que você está procurando não existe ou foi vendido.</p>
          <Link to="/caminhoes">
            <Button className="bg-[#122d54] hover:bg-[#0d1f3d]">Ver outros caminhões</Button>
          </Link>
        </div>
      </div>
    );
  }

  const filteredRelated = relatedVehicles?.filter(v => v.id !== vehicle.id).slice(0, 3) || [];

  const specs = [
    { icon: Calendar, label: 'Ano', value: formatYear(vehicle.year_manufacture, vehicle.year_model) },
    { icon: Gauge, label: 'Quilometragem', value: formatMileage(vehicle.mileage) },
    { icon: Fuel, label: 'Combustível', value: getFuelLabel(vehicle.fuel) },
    { icon: Settings2, label: 'Transmissão', value: getTransmissionLabel(vehicle.transmission) },
    { icon: Zap, label: 'Potência', value: vehicle.power || '-' },
    { icon: Tag, label: 'Eixos', value: vehicle.axle_config || '-' },
    { icon: Palette, label: 'Cor', value: vehicle.color || '-' },
  ];

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: vehicle.title,
        text: `Confira este caminhão: ${vehicle.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="container-gabardo py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-slate-500 hover:text-[#122d54] transition-colors">Início</Link>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <Link to="/caminhoes" className="text-slate-500 hover:text-[#122d54] transition-colors">Caminhões</Link>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <span className="text-slate-900 font-medium truncate">{vehicle.title}</span>
          </nav>
        </div>
      </div>

      <div className="container-gabardo py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl overflow-hidden border border-slate-200">
              <ImageGallery images={images || []} title={vehicle.title} />
            </div>

            {/* Title and Badges (Mobile) */}
            <div className="lg:hidden bg-white rounded-xl p-5 border border-slate-200">
              <div className="flex flex-wrap gap-2 mb-3">
                {vehicle.is_special_offer && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md uppercase tracking-wide">
                    Oferta Especial
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
              <h1 className="text-xl font-bold font-montserrat mb-2 text-slate-900">{vehicle.title}</h1>
              <p className="text-2xl font-bold text-[#122d54]">{formatPrice(vehicle.price)}</p>
            </div>

            {/* Quick Specs */}
            <div className="bg-white rounded-xl p-5 border border-slate-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {specs.slice(0, 4).map((spec) => (
                  <div key={spec.label} className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100">
                      <spec.icon className="h-5 w-5 text-[#122d54]" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">{spec.label}</p>
                      <p className="font-semibold text-slate-900 text-sm">{spec.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="w-full justify-start border-b border-slate-200 rounded-none bg-transparent h-auto p-0 gap-0">
                  <TabsTrigger
                    value="description"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-[#122d54] px-5 py-3 font-medium"
                  >
                    Descrição
                  </TabsTrigger>
                  <TabsTrigger
                    value="specs"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-[#122d54] px-5 py-3 font-medium"
                  >
                    Especificações
                  </TabsTrigger>
                  <TabsTrigger
                    value="fipe"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:text-[#122d54] px-5 py-3 font-medium"
                  >
                    Tabela FIPE
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="p-5">
                  <p className="text-slate-700 leading-relaxed">
                    {vehicle.description || 'Descrição não disponível.'}
                  </p>
                </TabsContent>

                <TabsContent value="specs" className="p-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {specs.map((spec) => (
                      <div key={spec.label} className="flex items-center justify-between py-3 px-4 rounded-lg bg-slate-50">
                        <div className="flex items-center gap-3">
                          <spec.icon className="h-4 w-4 text-slate-400" />
                          <span className="text-slate-600 text-sm">{spec.label}</span>
                        </div>
                        <span className="font-medium text-slate-900 text-sm">{spec.value}</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between py-3 px-4 rounded-lg bg-slate-50">
                      <div className="flex items-center gap-3">
                        <Tag className="h-4 w-4 text-slate-400" />
                        <span className="text-slate-600 text-sm">Marca</span>
                      </div>
                      <span className="font-medium text-slate-900 text-sm">{vehicle.brand}</span>
                    </div>
                    <div className="flex items-center justify-between py-3 px-4 rounded-lg bg-slate-50">
                      <div className="flex items-center gap-3">
                        <Tag className="h-4 w-4 text-slate-400" />
                        <span className="text-slate-600 text-sm">Modelo</span>
                      </div>
                      <span className="font-medium text-slate-900 text-sm">{vehicle.model}</span>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="fipe" className="p-5">
                  <FipeTabContent vehicle={vehicle} />
                </TabsContent>
              </Tabs>
            </div>

            {/* Financing Simulator */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <FinancingSimulator vehiclePrice={vehicle.price} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Price Card (Desktop) */}
            <div className="hidden lg:block sticky top-24 bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="p-5 space-y-5">
                {/* Badges */}
                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  {vehicle.is_special_offer && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md uppercase tracking-wide">
                      Oferta Especial
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

                {/* Title */}
                <h1 className="text-lg font-bold font-montserrat text-slate-900">{vehicle.title}</h1>

                {/* Price */}
                <div className="bg-slate-50 rounded-lg p-4 text-center">
                  <p className="text-xs text-slate-500 mb-1">Preço</p>
                  <p className="text-2xl font-bold text-[#122d54]">{formatPrice(vehicle.price)}</p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col gap-5">
                  <Button
                    className="w-full py-5 text-base bg-[#122d54] hover:bg-[#0d1f3d] text-white font-semibold"
                    onClick={() => setIsLeadModalOpen(true)}
                  >
                    Tenho Interesse
                  </Button>

                  <WhatsAppButton
                    phone={branch?.whatsapp || '5551999999999'}
                    message={`Olá! Tenho interesse no caminhão ${vehicle.title} (${formatYear(vehicle.year_manufacture, vehicle.year_model)}) - ${formatPrice(vehicle.price)}. Vi no site da Gabardo.`}
                    className="w-full"
                  />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-4 border-t border-slate-200">
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn("flex-1", isFavorite && "text-red-500 border-red-200 bg-red-50")}
                    onClick={() => setIsFavorite(!isFavorite)}
                  >
                    <Heart className={cn("h-4 w-4 mr-1", isFavorite && "fill-current")} />
                    {isFavorite ? 'Favoritado' : 'Favoritar'}
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1" onClick={handleShare}>
                    <Share2 className="h-4 w-4 mr-1" />
                    Compartilhar
                  </Button>
                </div>

                {/* Branch */}
                {branch && (
                  <div className="pt-4 border-t border-slate-200">
                    <p className="text-xs text-slate-500 mb-2">Disponível em</p>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-[#122d54] mt-0.5" />
                      <div>
                        <p className="font-medium text-slate-900 text-sm">{branch.name}</p>
                        <p className="text-xs text-slate-500">{branch.city}/{branch.state}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile CTA */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 z-40">
              <div className="flex gap-2">
                <Button
                  className="flex-1 bg-[#122d54] hover:bg-[#0d1f3d] text-white"
                  onClick={() => setIsLeadModalOpen(true)}
                >
                  Tenho Interesse
                </Button>
                <WhatsAppButton
                  phone={branch?.whatsapp || '5551999999999'}
                  message={`Olá! Tenho interesse no caminhão ${vehicle.title}`}
                  className="flex-1"
                  variant="outline"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Related Vehicles */}
        {filteredRelated.length > 0 && (
          <section className="mt-12 pb-32 lg:pb-8">
            <h2 className="text-xl font-bold font-montserrat text-slate-900 mb-6">Veículos Relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredRelated.map((v) => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Lead Modal */}
      <LeadModal
        open={isLeadModalOpen}
        onOpenChange={setIsLeadModalOpen}
        vehicle={vehicle}
        branch={branch}
      />
    </div>
  );
}

function VehicleDetailSkeleton() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-white border-b border-slate-200">
        <div className="container-gabardo py-3">
          <Skeleton className="h-5 w-48" />
        </div>
      </div>
      <div className="container-gabardo py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="aspect-[16/9] rounded-xl" />
            <Skeleton className="h-24 rounded-xl" />
            <Skeleton className="h-48 rounded-xl" />
          </div>
          <div>
            <Skeleton className="h-80 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

function FipeTabContent({ vehicle }: { vehicle: Vehicle }) {
  const { data: fipeData, isLoading } = useFipe(vehicle.fipe_code);

  if (!vehicle.fipe_code) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-500 mb-2">Código FIPE não cadastrado para este veículo.</p>
        <p className="text-sm text-slate-400">Entre em contato para mais informações.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full rounded-lg" />
        <Skeleton className="h-24 w-full rounded-lg" />
      </div>
    );
  }

  // Find the matching year model
  // BrasilAPI returns year as number (e.g. 2022, 2023) or 32000 for "Zero KM"
  const fipeEntry = fipeData?.find(f => f.anoModelo === vehicle.year_model) || fipeData?.[0];

  if (!fipeEntry) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-500">Dados da tabela FIPE indisponíveis no momento.</p>
      </div>
    );
  }

  // Calculate difference
  const fipePrice = parseFloat(fipeEntry.valor.replace('R$ ', '').replace('.', '').replace(',', '.'));
  const difference = vehicle.price - fipePrice;
  const differencePercent = (difference / fipePrice) * 100;

  const isBelowFipe = difference < 0;
  const isAboveFipe = difference > 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        {/* FIPE Price */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
          <p className="text-slate-500 text-xs uppercase tracking-wider font-semibold mb-1">Preço Tabela FIPE</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{fipeEntry.valor}</span>
            <span className="text-xs text-slate-400">Ref: {fipeEntry.mesReferencia}</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {fipeEntry.marca} {fipeEntry.modelo} {fipeEntry.anoModelo}
          </p>
        </div>

        {/* Comparison */}
        <div className={cn(
          "p-4 rounded-xl border",
          isBelowFipe ? "bg-emerald-50 border-emerald-100" :
            isAboveFipe ? "bg-amber-50 border-amber-100" : "bg-slate-50 border-slate-100"
        )}>
          <div className="flex items-center gap-3 mb-2">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center",
              isBelowFipe ? "bg-emerald-100 text-emerald-600" :
                isAboveFipe ? "bg-amber-100 text-amber-600" : "bg-slate-100 text-slate-600"
            )}>
              {isBelowFipe ? <TrendingDown className="w-4 h-4" /> :
                isAboveFipe ? <TrendingUp className="w-4 h-4" /> :
                  <Minus className="w-4 h-4" />}
            </div>
            <p className={cn(
              "font-semibold text-sm",
              isBelowFipe ? "text-emerald-700" :
                isAboveFipe ? "text-amber-700" : "text-slate-700"
            )}>
              {isBelowFipe ? "Abaixo da Tabela FIPE" :
                isAboveFipe ? "Acima da Tabela FIPE" : "No Preço da FIPE"}
            </p>
          </div>

          <div className="flex items-baseline gap-2 pl-11">
            <span className={cn(
              "text-lg font-bold",
              isBelowFipe ? "text-emerald-700" :
                isAboveFipe ? "text-amber-700" : "text-slate-700"
            )}>
              {Math.abs(differencePercent).toFixed(1)}% {isBelowFipe ? 'mais barato' : isAboveFipe ? 'acima' : ''}
            </span>
            <span className={cn(
              "text-sm font-medium",
              isBelowFipe ? "text-emerald-600/80" :
                isAboveFipe ? "text-amber-600/80" : "text-slate-500"
            )}>
              ({formatPrice(Math.abs(difference))})
            </span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-3 rounded-lg flex gap-3 items-start">
        <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="text-xs font-bold">i</span>
        </div>
        <p className="text-xs text-blue-700 leading-relaxed">
          A Tabela FIPE serve apenas como referência de mercado. O valor final pode variar conforme o estado de conservação, acessórios e quilometragem do veículo.
        </p>
      </div>
    </div>
  );
}
