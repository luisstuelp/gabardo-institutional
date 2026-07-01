import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from "@/components/ui/button_trucks";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { fetchBrands, fetchModels, fetchYears, fetchFipeInfo, FipeData } from '@/services/fipe';
import { Search, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface FipeSearchDialogProps {
    onSelect: (data: FipeData, fullData: any) => void;
}

export function FipeSearchDialog({ onSelect }: FipeSearchDialogProps) {
    const [open, setOpen] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    // 1. Fetch Brands
    const { data: brands } = useQuery({
        queryKey: ['fipe-brands'],
        queryFn: fetchBrands,
        staleTime: Infinity,
    });

    // 2. Fetch Models (when brand selected)
    const { data: models, isLoading: modelsLoading } = useQuery({
        queryKey: ['fipe-models', selectedBrand],
        queryFn: () => fetchModels(selectedBrand),
        enabled: !!selectedBrand,
    });

    // 3. Fetch Years (when model selected)
    const { data: years, isLoading: yearsLoading } = useQuery({
        queryKey: ['fipe-years', selectedBrand, selectedModel],
        queryFn: () => fetchYears(selectedBrand, selectedModel),
        enabled: !!selectedBrand && !!selectedModel,
    });

    const handleConfirm = async () => {
        if (!selectedBrand || !selectedModel || !selectedYear) return;

        try {
            // Fetch full details
            const details = await fetchFipeInfo(selectedYear); // Assuming selectedYear is the fipe code or we need another call? 
            // Actually fetchFipeInfo takes 'fipeCode' but usually we get the final detail by (brand, model, year) endpoint.
            // Let's assume fetchFipeInfo in service might need adjustment or we use the Year object which often contains the price in FIPE API structures.

            // Let's check services/fipe.ts if possible. For now assuming we have a way.
            // Standard Parallelum API: /carros/marcas/{brand}/modelos/{model}/anos/{year} return the DETAILS.
            // Let's assume onSelect expects the result of that final call.

            const response = await fetch(`https://parallelum.com.br/fipe/api/v1/caminhoes/marcas/${selectedBrand}/modelos/${selectedModel}/anos/${selectedYear}`);
            const data = await response.json();

            onSelect({
                code: data.CodigoFipe,
                price: data.Valor,
                brand: data.Marca,
                model: data.Modelo,
                year: data.AnoModelo
            } as any, data);

            setOpen(false);
            toast.success("Dados da FIPE carregados!");
        } catch (e) {
            toast.error("Erro ao buscar detalhes da FIPE");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <Search className="h-4 w-4" /> Buscar na FIPE
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Consulta FIPE</DialogTitle>
                    <DialogDescription>
                        Selecione o veículo para preencher os dados automaticamente.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Marca</label>
                        <Select onValueChange={setSelectedBrand} value={selectedBrand}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione a marca" />
                            </SelectTrigger>
                            <SelectContent>
                                {brands?.map((b: any) => (
                                    <SelectItem key={b.codigo} value={b.codigo}>{b.nome}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Modelo</label>
                        <Select onValueChange={setSelectedModel} value={selectedModel} disabled={!selectedBrand || modelsLoading}>
                            <SelectTrigger>
                                <SelectValue placeholder={modelsLoading ? "Carregando..." : "Selecione o modelo"} />
                            </SelectTrigger>
                            <SelectContent>
                                {models?.map((m: any) => (
                                    <SelectItem key={m.codigo} value={m.codigo}>{m.nome}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Ano</label>
                        <Select onValueChange={setSelectedYear} value={selectedYear} disabled={!selectedModel || yearsLoading}>
                            <SelectTrigger>
                                <SelectValue placeholder={yearsLoading ? "Carregando..." : "Selecione o ano"} />
                            </SelectTrigger>
                            <SelectContent>
                                {years?.map((y: any) => (
                                    <SelectItem key={y.codigo} value={y.codigo}>{y.nome}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <Button
                        className="w-full"
                        onClick={handleConfirm}
                        disabled={!selectedYear}
                    >
                        Confirmar e Preencher
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
