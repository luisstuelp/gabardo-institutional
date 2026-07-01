import { cn } from '@/lib/utils';
import { BRANDS } from '@/types/database';

interface BrandChipsProps {
  selectedBrand: string | null;
  onBrandSelect: (brand: string | null) => void;
}

export function BrandChips({ selectedBrand, onBrandSelect }: BrandChipsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
      <button
        onClick={() => onBrandSelect(null)}
        className={cn(
          'shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all',
          selectedBrand === null
            ? 'bg-primary text-primary-foreground'
            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
        )}
      >
        Todas
      </button>
      {BRANDS.map((brand) => (
        <button
          key={brand.name}
          onClick={() => onBrandSelect(brand.name)}
          className={cn(
            'shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all',
            selectedBrand === brand.name
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          )}
        >
          {brand.name}
        </button>
      ))}
    </div>
  );
}
