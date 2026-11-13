
import { supabase } from '@/integrations/supabase_trucks/client';
import type { ListingType } from '@/types/database';

export async function uploadVehicleImages(vehicleId: string, files: File[], listingType: ListingType) {
    const results = [];
    const table =
        listingType === 'truck'
            ? 'vehicle_images'
            : listingType === 'equipment'
                ? 'equipment_images'
                : 'generic_vehicle_images';

    const { data: existingImages } = await supabase
        .from(table)
        .select('display_order')
        .eq('vehicle_id', vehicleId)
        .order('display_order', { ascending: false })
        .limit(1);

    let startOrder = existingImages?.[0]?.display_order || 0;

    for (const file of files) {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${vehicleId}/${crypto.randomUUID()}.${fileExt}`;

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
            startOrder++;
            const { data: imageRecord, error: dbError } = await supabase
                .from(table)
                .insert({
                    vehicle_id: vehicleId,
                    url: publicUrl,
                    is_primary: startOrder === 1, // First image overall is primary if none existed? 
                    // Better logic: if it's the very first image for this vehicle, make it primary.
                    display_order: startOrder
                })
                .select()
                .single();

            if (dbError) throw dbError;
            results.push({ status: 'success', file: file.name, data: imageRecord });

        } catch (error) {
            console.error(`Failed to upload ${file.name}:`, error);
            results.push({ status: 'error', file: file.name, error });
        }
    }

    return results;
}
