
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button_trucks";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Vehicle } from '@/types/database';
import { Loader2, Save, Upload, X } from 'lucide-react';
import { BRANDS } from '@/types/database';
import { FipeSearchDialog } from './FipeSearchDialog';
import { useBranches } from '@/hooks/useBranches';

const vehicleSchema = z.object({
    title: z.string().min(3, "Título deve ter pelo menos 3 caracteres"),
    brand: z.string().min(1, "Selecione uma marca"),
    model: z.string().min(1, "Modelo obrigatório"),
    price: z.coerce.number().min(1, "Preço deve ser maior que 0"),
    year_manufacture: z.coerce.number().min(1900).max(new Date().getFullYear() + 1),
    year_model: z.coerce.number().min(1900).max(new Date().getFullYear() + 1),
    mileage: z.coerce.number().min(0),
    fuel: z.enum(['diesel', 'gas', 'electric', 'hybrid']),
    transmission: z.enum(['manual', 'automatic', 'automated']),
    axle_config: z.string().optional(),
    color: z.string().optional(),
    description: z.string().optional(),
    slug: z.string().optional(), // Generated automatically if empty
    status: z.enum(['available', 'reserved', 'sold']),
    branch_id: z.string().optional(),
    is_featured: z.boolean().default(false),
    is_special_offer: z.boolean().default(false),
    is_semi_new: z.boolean().default(false),
    is_single_owner: z.boolean().default(false),
});

export type VehicleFormValues = z.infer<typeof vehicleSchema>;

interface VehicleFormProps {
    initialData?: Vehicle | null;
    onSubmit: (data: VehicleFormValues, files?: File[]) => Promise<void>;
    isLoading?: boolean;
}

export function VehicleForm({ initialData, onSubmit, isLoading }: VehicleFormProps) {
    const { data: branches } = useBranches();
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const form = useForm<VehicleFormValues>({
        resolver: zodResolver(vehicleSchema),
        defaultValues: {
            title: initialData?.title || '',
            brand: initialData?.brand || '',
            model: initialData?.model || '',
            price: initialData?.price || 0,
            year_manufacture: initialData?.year_manufacture || new Date().getFullYear(),
            year_model: initialData?.year_model || new Date().getFullYear(),
            mileage: initialData?.mileage || 0,
            fuel: initialData?.fuel || 'diesel',
            transmission: initialData?.transmission || 'manual',
            axle_config: initialData?.axle_config || '',
            color: initialData?.color || '',
            description: initialData?.description || '',
            slug: initialData?.slug || '',
            status: initialData?.status || 'available',
            branch_id: initialData?.branch_id || '',
            is_featured: initialData?.is_featured || false,
            is_special_offer: initialData?.is_special_offer || false,
            is_semi_new: initialData?.is_semi_new || false,
            is_single_owner: initialData?.is_single_owner || false,
        },
    });

    const handleFipeSelect = (fipe: any, fullData: any) => {
        form.setValue('brand', fipe.brand || '');
        form.setValue('model', fipe.model || '');
        form.setValue('year_model', fipe.year || new Date().getFullYear());
        // Parse price string "R$ 150.000,00" -> number
        const priceStr = fipe.price?.replace('R$ ', '').replace(/\./g, '').replace(',', '.') || '0';
        form.setValue('price', parseFloat(priceStr));

        // Auto title
        if (!form.getValues('title')) {
            form.setValue('title', `${fipe.brand} ${fipe.model}`);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setSelectedFiles(prev => [...prev, ...newFiles]);
        }
    };

    const removeFile = (index: number) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => onSubmit(data, selectedFiles))} className="space-y-8">
                <div className="flex justify-end bg-gray-50 p-4 rounded-lg border">
                    <div className="flex items-center gap-4 w-full justify-between">
                        <span className="text-sm text-muted-foreground">Preencher com dados oficiais:</span>
                        <FipeSearchDialog onSelect={handleFipeSelect} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Info */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-medium">Informações Básicas</h3>

                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Título do Anúncio</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex: Volvo FH 540 6x4" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="brand"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Marca</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {BRANDS.map((brand) => (
                                                    <SelectItem key={brand.name} value={brand.name}>
                                                        {brand.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="model"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Modelo</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ex: FH 540" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Preço (R$)</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Specs */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-medium">Especificações</h3>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="year_manufacture"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Ano Fab.</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="year_model"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Ano Mod.</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="fuel"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Combustível</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="diesel">Diesel</SelectItem>
                                                <SelectItem value="gas">Gás</SelectItem>
                                                <SelectItem value="electric">Elétrico</SelectItem>
                                                <SelectItem value="hybrid">Híbrido</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="transmission"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Câmbio</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="manual">Manual</SelectItem>
                                                <SelectItem value="automatic">Automático</SelectItem>
                                                <SelectItem value="automated">Automatizado</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="axle_config"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tração</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ex: 6x2" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="color"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cor</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ex: Branca" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="mileage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Quilometragem (km)</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                        <h3 className="text-lg font-medium">Status e Localização</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="available">Disponível</SelectItem>
                                                <SelectItem value="reserved">Reservado</SelectItem>
                                                <SelectItem value="sold">Vendido</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="branch_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Filial</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value || ''}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione a filial" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {branches?.map((branch) => (
                                                    <SelectItem key={branch.id} value={branch.id}>
                                                        {branch.name} - {branch.city}/{branch.state}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-lg font-medium">Destaques e Opções</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="is_featured"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>Destaque</FormLabel>
                                            <FormDescription>
                                                Exibir na home
                                            </FormDescription>
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="is_special_offer"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>Oferta Especial</FormLabel>
                                            <FormDescription>
                                                Preço promocional
                                            </FormDescription>
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="is_semi_new"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>Seminovo</FormLabel>
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="is_single_owner"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>Único Dono</FormLabel>
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </div>

                {/* Description */}
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descrição Completa</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Detalhes adicionais sobre o veículo..."
                                    className="min-h-[100px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Images Upload Section (New) */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Fotos do Veículo</h3>
                    <div className="flex items-center gap-4">
                        <Button type="button" variant="outline" className="relative cursor-pointer">
                            <Upload className="mr-2 h-4 w-4" />
                            Adicionar Fotos
                            <Input
                                type="file"
                                multiple
                                accept="image/*"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={handleFileChange}
                            />
                        </Button>
                        <span className="text-sm text-muted-foreground">
                            {selectedFiles.length > 0
                                ? `${selectedFiles.length} foto(s) selecionada(s)`
                                : 'Nenhuma foto selecionada'}
                        </span>
                    </div>

                    {selectedFiles.length > 0 && (
                        <div className="flex flex-wrap gap-4 mt-4">
                            {selectedFiles.map((file, index) => (
                                <div key={index} className="relative w-32 h-24 rounded-lg overflow-hidden border bg-gray-50">
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={`Preview ${index}`}
                                        className="w-full h-full object-cover"
                                    />
                                    <Button
                                        size="icon"
                                        variant="destructive"
                                        className="absolute top-1 right-1 h-6 w-6 rounded-full"
                                        type="button"
                                        onClick={() => removeFile(index)}
                                    >
                                        <X className="h-3 w-3" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex justify-end gap-4">
                    <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Salvando...
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                Salvar Veículo e Fotos
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
