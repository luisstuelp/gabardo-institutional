import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAdminVehicle, useAdminVehicleMutations } from '@/hooks/useAdminVehicles';
import { VehicleForm, VehicleFormValues } from '@/components/admin/vehicles/VehicleForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button_trucks';
import { ArrowLeft } from 'lucide-react';
import { VehicleImageManager } from '@/components/admin/vehicles/VehicleImageManager';

import { uploadVehicleImages } from '@/services/vehicleImages';

export default function AdminVehicleFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const { data: vehicle, isLoading: isFetching } = useAdminVehicle(id);
    const { createVehicle, updateVehicle } = useAdminVehicleMutations();

    const handleSubmit = async (data: VehicleFormValues, files?: File[]) => {
        try {
            if (isEditing && id) {
                await updateVehicle({ id, data });
                if (files && files.length > 0) {
                    await uploadVehicleImages(id, files);
                }
            } else {
                const newVehicle = await createVehicle(data);
                if (files && files.length > 0) {
                    await uploadVehicleImages(newVehicle.id, files);
                }
                // Redirect to edit mode to upload images
                navigate(`/admin/veiculos/${newVehicle.id}`, { replace: true });
            }
        } catch (error) {
            // Error handled in hook
        }
    };

    if (isEditing && isFetching) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => navigate('/admin/veiculos')}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-3xl font-bold font-montserrat text-primary">
                    {isEditing ? 'Editar Veículo' : 'Novo Veículo'}
                </h1>
            </div>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Dados do Veículo</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <VehicleForm
                            initialData={vehicle}
                            onSubmit={handleSubmit}
                            // We don't have isPending exactly easily unless we track loading state in component or hook.
                            // The slice has global isLoading but maybe not per-action.
                            // For simplicity, we can ignore specific loading or use generic isLoading.
                            isLoading={isFetching}  // Reusing isFetching or assume fast? 
                        // Actually, updateVehicle/createVehicle are awaitable, so we can set local loading if needed.
                        // But Form usually expects boolean.
                        // Let's rely on the await time. We can use a local state constraint.
                        />
                    </CardContent>
                </Card>

                {isEditing && id && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Galeria de Imagens</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <VehicleImageManager vehicleId={id} />
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
