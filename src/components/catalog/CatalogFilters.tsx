import { useState, useEffect } from 'react';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button_trucks';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { VehicleFilters, BRANDS, PRICE_RANGES, YEAR_RANGES } from '@/types/database';
import { cn } from '@/lib/utils';

interface CatalogFiltersProps {
  filters: VehicleFilters;
  onFiltersChange: (filters: VehicleFilters) => void;
  activeFiltersCount: number;
  hideTrigger?: boolean;
}

const FUEL_OPTIONS = [
  { value: 'diesel', label: 'Diesel' },
  { value: 'gas', label: 'Gasolina' },
  { value: 'electric', label: 'Elétrico' },
  { value: 'hybrid', label: 'Híbrido' },
];

const TRANSMISSION_OPTIONS = [
  { value: 'manual', label: 'Manual' },
  { value: 'automatic', label: 'Automático' },
  { value: 'automated', label: 'Automatizado' },
];

export function CatalogFilters({ filters, onFiltersChange, activeFiltersCount, hideTrigger = false }: CatalogFiltersProps) {
  const [localFilters, setLocalFilters] = useState<VehicleFilters>(filters);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    brand: true,
    price: true,
    year: false,
    specs: false,
  });

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleFilterChange = (key: keyof VehicleFilters, value: any) => {
    const newFilters = { ...localFilters, [key]: value || undefined };
    setLocalFilters(newFilters);
  };

  const applyFilters = () => {
    onFiltersChange(localFilters);
  };

  const clearFilters = () => {
    const clearedFilters: VehicleFilters = {};
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const FilterSection = ({
    title,
    sectionKey,
    children,
  }: {
    title: string;
    sectionKey: string;
    children: React.ReactNode;
  }) => (
    <Collapsible open={openSections[sectionKey]} onOpenChange={() => toggleSection(sectionKey)}>
      <CollapsibleTrigger className="flex items-center justify-between w-full py-3 text-sm font-semibold text-foreground hover:text-primary transition-colors">
        {title}
        <ChevronDown
          className={cn(
            'h-4 w-4 transition-transform duration-200',
            openSections[sectionKey] && 'rotate-180'
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="pb-4 space-y-3">{children}</CollapsibleContent>
    </Collapsible>
  );

  const FilterContent = () => (
    <div className="space-y-1 divide-y divide-border">
      {/* Marca */}
      <FilterSection title="Marca" sectionKey="brand">
        <Select
          value={localFilters.brand || ''}
          onValueChange={(value) => handleFilterChange('brand', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione a marca" />
          </SelectTrigger>
          <SelectContent>
            {BRANDS.map((brand) => (
              <SelectItem key={brand.name} value={brand.name}>
                {brand.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterSection>

      {/* Preço */}
      <FilterSection title="Faixa de Preço" sectionKey="price">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-xs text-muted-foreground">Mínimo</Label>
            <Select
              value={localFilters.priceMin?.toString() || ''}
              onValueChange={(value) => handleFilterChange('priceMin', value ? Number(value) : undefined)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Min" />
              </SelectTrigger>
              <SelectContent>
                {PRICE_RANGES.map((price) => (
                  <SelectItem key={price.min} value={price.min.toString()}>
                    {price.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Máximo</Label>
            <Select
              value={localFilters.priceMax?.toString() || ''}
              onValueChange={(value) => handleFilterChange('priceMax', value ? Number(value) : undefined)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Max" />
              </SelectTrigger>
              <SelectContent>
                {PRICE_RANGES.filter((p) => p.max !== null).map((price) => (
                  <SelectItem key={price.max} value={price.max!.toString()}>
                    {price.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </FilterSection>

      {/* Ano */}
      <FilterSection title="Ano do Modelo" sectionKey="year">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-xs text-muted-foreground">De</Label>
            <Select
              value={localFilters.yearMin?.toString() || ''}
              onValueChange={(value) => handleFilterChange('yearMin', value ? Number(value) : undefined)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Ano" />
              </SelectTrigger>
              <SelectContent>
                {YEAR_RANGES.map((year) => (
                  <SelectItem key={year.value} value={year.value.toString()}>
                    {year.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Até</Label>
            <Select
              value={localFilters.yearMax?.toString() || ''}
              onValueChange={(value) => handleFilterChange('yearMax', value ? Number(value) : undefined)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Ano" />
              </SelectTrigger>
              <SelectContent>
                {YEAR_RANGES.map((year) => (
                  <SelectItem key={year.value} value={year.value.toString()}>
                    {year.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </FilterSection>

      {/* Especificações */}
      <FilterSection title="Especificações" sectionKey="specs">
        <div className="space-y-3">
          <div>
            <Label className="text-xs text-muted-foreground">Combustível</Label>
            <Select
              value={localFilters.fuel || ''}
              onValueChange={(value) => handleFilterChange('fuel', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {FUEL_OPTIONS.map((fuel) => (
                  <SelectItem key={fuel.value} value={fuel.value}>
                    {fuel.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Transmissão</Label>
            <Select
              value={localFilters.transmission || ''}
              onValueChange={(value) => handleFilterChange('transmission', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {TRANSMISSION_OPTIONS.map((trans) => (
                  <SelectItem key={trans.value} value={trans.value}>
                    {trans.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </FilterSection>
    </div>
  );

  return (
    <>
      {/* Desktop Filters - Sidebar */}
      <div className="hidden lg:block w-72 shrink-0">
        <div className="sticky top-24 bg-card rounded-lg border p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold font-montserrat flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5" />
              Filtros
            </h3>
            {activeFiltersCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs">
                Limpar ({activeFiltersCount})
              </Button>
            )}
          </div>
          <FilterContent />
          <Button onClick={applyFilters} className="w-full hover:text-white hover:bg-blue-800 bg-white text-blue-800 border border-blue-950 mt-4">
            Aplicar Filtros
          </Button>
        </div>
      </div>

      {/* Mobile Filters - Sheet */}
      {!hideTrigger && (
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="gap-2 h-11">
                <SlidersHorizontal className="h-4 w-4" />
                Filtros
                {activeFiltersCount > 0 && (
                  <span className="ml-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:max-w-md overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <SlidersHorizontal className="h-5 w-5" />
                  Filtros
                </SheetTitle>
                <SheetDescription>Refine sua busca por caminhões</SheetDescription>
              </SheetHeader>
              <div className="mt-6">
                <FilterContent />
              </div>
              <SheetFooter className="mt-6 flex-col sm:flex-col gap-2">
                <SheetClose asChild>
                  <Button onClick={applyFilters} className="w-full hover:text-white hover:bg-blue-800 bg-white text-blue-800 border border-blue-950 mt-4">
                    Aplicar Filtros
                  </Button>
                </SheetClose>
                {activeFiltersCount > 0 && (
                  <Button variant="outline" onClick={clearFilters} className="w-full">
                    Limpar Filtros
                  </Button>
                )}
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      )}
    </>
  );
}
