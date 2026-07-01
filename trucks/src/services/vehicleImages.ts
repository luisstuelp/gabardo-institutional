
import { supabase } from '@/integrations/supabase_trucks/client';

/**
 * Uploads multiple images for a specific vehicle.
 * 1. Uploads file to Supabase Storage 'vehicles' bucket.
 * 2. Inserts record into 'vehicle_images' table.
 */
export async function uploadVehicleImages(vehicleId: string, files: File[]) {
    const results = [];

    // Get current max display_order
    const { data: existingImages } = await supabase
        .from('vehicle_images')
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
                .from('vehicle_images')
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
