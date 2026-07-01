/**
 * EmptyFallback — Generic empty/fallback state component.
 * Used when a section has no data to display.
 * Provides a consistent look across the application.
 */
import { type LucideIcon, Inbox } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyFallbackProps {
    /** Lucide icon to display */
    icon?: LucideIcon;
    /** Title text */
    title?: string;
    /** Description text */
    description?: string;
    /** Optional action button */
    action?: {
        label: string;
        onClick: () => void;
    };
    /** Additional CSS classes */
    className?: string;
}

export function EmptyFallback({
    icon: Icon = Inbox,
    title = 'Nada por aqui',
    description = 'Não há dados para exibir no momento.',
    action,
    className,
}: EmptyFallbackProps) {
    return (
        <div
            className={cn(
                'flex flex-col items-center justify-center p-8 text-center min-h-[200px]',
                className
            )}
        >
            <div className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
                <Icon className="h-8 w-8 text-slate-400 dark:text-slate-500" />
            </div>
            <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {title}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
                {description}
            </p>
            {action && (
                <button
                    onClick={action.onClick}
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#122d54] hover:bg-[#0d1f3d] rounded-lg transition-colors"
                >
                    {action.label}
                </button>
            )}
        </div>
    );
}
