import { useAuth } from '@/contexts/AuthContext';
import { useAdmin } from '@/hooks/useAdmin';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase_trucks/client';

export default function DebugAdmin() {
    const { user, session } = useAuth();
    const { isAdmin, isLoading } = useAdmin();

    const { data: rawRole, error: rawError } = useQuery({
        queryKey: ['debug-role', user?.id],
        queryFn: async () => {
            if (!user) return 'No User';
            const { data, error } = await supabase
                .from('user_roles')
                .select('*')
                .eq('user_id', user.id);

            if (error) return { error };
            return { data };
        },
        enabled: !!user,
    });

    return (
        <div className="p-10 font-mono space-y-4">
            <h1 className="text-2xl font-bold">Admin Debug</h1>

            <div className="border p-4 rounded bg-gray-100">
                <h2 className="font-bold">Auth Status</h2>
                <p>User ID: {user?.id || 'Not logged in'}</p>
                <p>Email: {user?.email}</p>
                <p>Is Loading: {isLoading.toString()}</p>
            </div>

            <div className="border p-4 rounded bg-gray-100">
                <h2 className="font-bold">Admin Check Hook</h2>
                <p>Is Admin: {isAdmin ? 'YES' : 'NO'}</p>
            </div>

            <div className="border p-4 rounded bg-gray-100">
                <h2 className="font-bold">Raw Database Check</h2>
                <pre>{JSON.stringify(rawRole, null, 2)}</pre>
                {rawError && <pre className="text-red-500">{JSON.stringify(rawError, null, 2)}</pre>}
            </div>

            <div className="border p-4 rounded bg-gray-100">
                <h2 className="font-bold">Environment</h2>
                <p>Project URL: {process.env.NEXT_PUBLIC_TRUCKS_SUPABASE_URL}</p>
            </div>
        </div>
    );
}
