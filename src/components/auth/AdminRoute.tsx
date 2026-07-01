import { useEffect, type ReactNode } from 'react';
import { useNavigate } from '@/lib/next-router-compat';
import { useAdmin } from '@/hooks/useAdmin';
import { Loader2 } from 'lucide-react';

export function AdminRoute({ children }: { children?: ReactNode }) {
    const { isAdmin, isLoading } = useAdmin();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !isAdmin) {
            navigate('/auth', { replace: true });
        }
    }, [isAdmin, isLoading, navigate]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return isAdmin ? <>{children}</> : null;
}
