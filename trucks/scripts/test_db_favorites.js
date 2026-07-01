
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://krdfzphthfapdphonivb.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtyZGZ6cGh0aGZhcGRwaG9uaXZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0OTQwNzMsImV4cCI6MjA4NDA3MDA3M30.ZE1830ECA5zbY31pB7nNn13qusJ85e7UvgvP2UGgOnA";

const supabase = createClient(supabaseUrl, supabaseKey);

async function testFavorites() {
    console.log('Testing favorites table access...');

    // 1. Check a vehicle ID
    const { data: vehicles, error: vehicleError } = await supabase
        .from('vehicles')
        .select('id')
        .limit(1);

    if (vehicleError) {
        console.log('Error fetching vehicles:', vehicleError);
    } else {
        console.log('Vehicle ID example:', vehicles[0]?.id);
        if (vehicles.length > 0) {
            // Try inserting THIS valid ID with a fake user ID
            const validId = vehicles[0].id;
            console.log('Attempting insert with valid vehicle ID:', validId);
            const { error: insertError } = await supabase
                .from('favorites')
                .insert({ user_id: '00000000-0000-0000-0000-000000000000', vehicle_id: validId });

            if (insertError) {
                console.log('Insert with valid ID result:', insertError.code, insertError.message);
            } else {
                console.log('Insert unexpectedly succeeded (RLS might be open for this user?)');
            }
        }
    }
}

testFavorites();
