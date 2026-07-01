import { Truck } from 'lucide-react';
import { Button } from '@/components/ui/button_trucks';

interface EmptyStateProps {
  onClearFilters: () => void;
}

export function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-6">
        <Truck className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold font-montserrat mb-2">
        Nenhum caminhão encontrado
      </h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        Não encontramos veículos com os filtros selecionados. Tente ajustar sua busca ou limpar os filtros.
      </p>
      <Button onClick={onClearFilters} variant="outline">
        Limpar Filtros
      </Button>
    </div>
  );
}
