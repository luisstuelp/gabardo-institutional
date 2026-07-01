import { useState, useEffect } from 'react';
import { useNavigate } from '@/lib/next-router-compat';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button_trucks';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BRANDS, PRICE_RANGES, YEAR_RANGES } from '@/types/database';
import { supabase } from '@/integrations/supabase_trucks/client';

export function HeroSearch() {
  const navigate = useNavigate();
  const [brand, setBrand] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [models, setModels] = useState<string[]>([]);
  const [loadingModels, setLoadingModels] = useState(false);

  // Fetch models when brand changes
  useEffect(() => {
    if (!brand) {
      setModels([]);
      setModel('');
      return;
    }

    const fetchModels = async () => {
      setLoadingModels(true);
      const { data, error } = await supabase
        .from('vehicles')
        .select('model')
        .eq('brand', brand)
        .eq('status', 'available');

      if (!error && data) {
        const uniqueModels = [...new Set(data.map((v) => v.model))].sort();
        setModels(uniqueModels);
      }
      setLoadingModels(false);
    };

    fetchModels();
  }, [brand]);

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (brand) params.set('marca', brand);
    if (model) params.set('modelo', model);
    if (year) params.set('ano', year);
    if (price) {
      const priceRange = PRICE_RANGES.find((p) => p.label === price);
      if (priceRange) {
        params.set('precoMin', priceRange.min.toString());
        if (priceRange.max) params.set('precoMax', priceRange.max.toString());
      }
    }

    navigate(`/caminhoes${params.toString() ? `?${params.toString()}` : ''}`);
  };

  return (
    <section className="relative min-h-[450px] md:min-h-[500px] flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1920&q=80')"
        }}
      >
        {/* Simple dark overlay */}
        <div className="absolute inset-0 bg-slate-900/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 py-12">
        {/* Hero Text */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-montserrat text-white mb-3">
            Encontre seu caminhão ideal
          </h1>
          <p className="text-lg text-white/80">
            Qualidade, procedência e as melhores condições de pagamento
          </p>
        </div>

        {/* Search Panel - Clean white card */}
        <div className="bg-white rounded-xl p-6 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Marca */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-500">Marca</label>
              <Select value={brand} onValueChange={setBrand}>
                <SelectTrigger className="h-11 border-slate-200">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {BRANDS.map((b) => (
                    <SelectItem key={b.name} value={b.name}>
                      {b.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Modelo */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-500">Modelo</label>
              <Select
                value={model}
                onValueChange={setModel}
                disabled={!brand || loadingModels}
              >
                <SelectTrigger className="h-11 border-slate-200 disabled:opacity-50">
                  <SelectValue placeholder={loadingModels ? "Carregando..." : "Selecione"} />
                </SelectTrigger>
                <SelectContent>
                  {models.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Ano */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-500">Ano</label>
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger className="h-11 border-slate-200">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {YEAR_RANGES.map((y) => (
                    <SelectItem key={y.value} value={y.value.toString()}>
                      {y.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Preço */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-500">Preço</label>
              <Select value={price} onValueChange={setPrice}>
                <SelectTrigger className="h-11 border-slate-200">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {PRICE_RANGES.map((p) => (
                    <SelectItem key={p.label} value={p.label}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Buscar Button */}
            <div className="flex flex-col justify-end">
              <Button
                onClick={handleSearch}
                className="h-11 bg-[#122d54] hover:bg-[#0d1f3d] text-white font-semibold"
              >
                <Search className="h-4 w-4 mr-2" />
                Buscar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
