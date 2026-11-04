
import { createClient } from '@supabase/supabase-js';
import { config as loadEnvironment } from 'dotenv';

loadEnvironment({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing shared Supabase URL or publishable key in .env.local.');
}

const supabase = createClient(supabaseUrl, supabaseKey, {
    db: { schema: 'trucks' },
});

async function checkTrucksSchemaConnection() {
    console.log('Checking the shared Supabase project and trucks schema...');

    // Read-only connection check against the trucks schema.
    const { data: vehicles, error: vehicleError } = await supabase
        .from('vehicles')
        .select('id')
        .limit(1);

    if (vehicleError) {
        console.log('Error fetching vehicles:', vehicleError);
    } else {
        console.log(`Trucks schema connection succeeded; vehicles returned: ${vehicles.length}`);
    }
}

checkTrucksSchemaConnection();
