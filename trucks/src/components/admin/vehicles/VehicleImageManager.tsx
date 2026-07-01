import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase_trucks/client';
import { Button } from '@/components/ui/button_trucks';
import { Input } from '@/components/ui/input';
import { Loader2, Trash2, Star, Upload } from 'lucide-react';
import { toast } from 'sonner';

interface VehicleImageManagerProps {
    vehicleId: string;
}

export function VehicleImageManager({ vehicleId }: VehicleImageManagerProps) {
    const queryClient = useQueryClient();
    const [uploading, setUploading] = useState(false);

    // Fetch images
    const { data: images, isLoading } = useQuery({
        queryKey: ['admin-vehicle-images', vehicleId],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('vehicle_images')
                .select('*')
                .eq('vehicle_id', vehicleId)
                .order('display_order', { ascending: true });
            if (error) throw error;
            return data;
        },
    });

    // Upload mutation
    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);
            const files = event.target.files;
            if (!files || files.length === 0) return;

            for (const file of Array.from(files)) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${vehicleId}/${Math.random()}.${fileExt}`;

                // 1. Upload to Storage
                const { error: uploadError } = await supabase.storage
                    .from('vehicles')
                    .upload(fileName, file);

                if (uploadError) throw uploadError;

                // 2. Get Public URL
                const { data: { publicUrl } } = supabase.storage
                    .from('vehicles')
                    .getPublicUrl(fileName);

                // 3. Insert into Table
                const { error: dbError } = await supabase
                    .from('vehicle_images')
                    .insert({
                        vehicle_id: vehicleId,
                        url: publicUrl,
                        is_primary: false, // Default to false
                        display_order: (images?.length || 0) + 1
                    });

                if (dbError) throw dbError;
            }

            toast.success('Imagens enviadas com sucesso!');
            queryClient.invalidateQueries({ queryKey: ['admin-vehicle-images', vehicleId] });
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('Erro ao enviar imagem. Verifique se o bucket "vehicles" existe e é público.');
        } finally {
            setUploading(false);
            // Reset input
            event.target.value = '';
        }
    };

    // Delete mutation
    const deleteImage = useMutation({
        mutationFn: async (imageId: string) => {
            const { error } = await supabase.from('vehicle_images').delete().eq('id', imageId);
            if (error) throw error;
        },
        onSuccess: () => {
            toast.success('Imagem removida');
            queryClient.invalidateQueries({ queryKey: ['admin-vehicle-images', vehicleId] });
        }
    });

    // Set Primary mutation
    const setPrimary = useMutation({
        mutationFn: async (imageId: string) => {
            // 1. Reset all to false
            await supabase.from('vehicle_images').update({ is_primary: false }).eq('vehicle_id', vehicleId);
            // 2. Set target to true
            const { error } = await supabase.from('vehicle_images').update({ is_primary: true }).eq('id', imageId);
            if (error) throw error;
        },
        onSuccess: () => {
            toast.success('Imagem principal definida');
            queryClient.invalidateQueries({ queryKey: ['admin-vehicle-images', vehicleId] });
        }
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" className="relative" disabled={uploading}>
                    {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                    Adicionar Fotos
                    <Input
                        type="file"
                        multiple
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={handleUpload}
                        disabled={uploading}
                    />
                </Button>
                <span className="text-sm text-muted-foreground">
                    Suporta JPG, PNG, WEBP
                </span>
            </div>

            {isLoading ? (
                <div>Carregando imagens...</div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images?.map((img) => (
                        <div key={img.id} className="relative group rounded-lg overflow-hidden border bg-gray-50 aspect-video">
                            <img src={img.url} alt="Vehicle" className="w-full h-full object-cover" />

                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <Button
                                    size="icon"
                                    variant={img.is_primary ? "default" : "secondary"}
                                    className={img.is_primary ? "bg-blue-600 hover:bg-blue-700" : ""}
                                    onClick={() => setPrimary.mutate(img.id)}
                                    title="Definir como Principal"
                                >
                                    <Star className={`h-4 w-4 ${img.is_primary ? "fill-white" : ""}`} />
                                </Button>
                                <Button
                                    size="icon"
                                    variant="destructive"
                                    onClick={() => deleteImage.mutate(img.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>

                            {img.is_primary && (
                                <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                                    Principal
                                </div>
                            )}
                        </div>
                    ))}
                    {images?.length === 0 && (
                        <div className="col-span-full h-32 flex items-center justify-center border-dashed border-2 rounded-lg text-muted-foreground">
                            Nenhuma imagem cadastrada
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
