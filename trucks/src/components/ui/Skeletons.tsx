/**
 * Reusable skeleton loading components.
 * Provides consistent loading states across the application.
 */
import { cn } from '@/lib/utils';

/* ---------- Base Skeleton Pulse ---------- */
interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
    return (
        <div
            className={cn(
                'animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700',
                className
            )}
        />
    );
}

/* ---------- Card Skeleton ---------- */
export function CardSkeleton({ className }: SkeletonProps) {
    return (
        <div className={cn('bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700', className)}>
            <Skeleton className="h-40 w-full rounded-xl mb-4" />
            <Skeleton className="h-5 w-3/4 mb-3" />
            <Skeleton className="h-4 w-1/2 mb-2" />
            <Skeleton className="h-4 w-2/3" />
        </div>
    );
}

/* ---------- Vehicle Card Skeleton ---------- */
export function VehicleCardSkeleton() {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700">
            <Skeleton className="h-48 w-full rounded-none" />
            <div className="p-4 space-y-3">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="flex gap-2">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-14 rounded-full" />
                </div>
                <Skeleton className="h-6 w-1/3 mt-2" />
            </div>
        </div>
    );
}

/* ---------- Vehicle Grid Skeleton ---------- */
interface VehicleGridSkeletonProps {
    count?: number;
}

export function VehicleGridSkeletonNew({ count = 6 }: VehicleGridSkeletonProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: count }).map((_, i) => (
                <VehicleCardSkeleton key={i} />
            ))}
        </div>
    );
}

/* ---------- Profile Skeleton ---------- */
export function ProfileSkeleton() {
    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Avatar */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                <div className="flex items-center gap-4">
                    <Skeleton className="w-16 h-16 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-4 w-48" />
                    </div>
                </div>
            </div>
            {/* Form fields */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 space-y-5">
                <Skeleton className="h-5 w-40 mb-4" />
                <Skeleton className="h-12 w-full rounded-xl" />
                <Skeleton className="h-12 w-full rounded-xl" />
                <Skeleton className="h-12 w-full rounded-xl" />
                <Skeleton className="h-12 w-full rounded-xl" />
            </div>
        </div>
    );
}

/* ---------- Chat Skeleton ---------- */
export function ChatSkeleton() {
    return (
        <div className="flex h-full">
            {/* Sidebar skeleton */}
            <div className="hidden lg:block w-72 border-r border-slate-200 dark:border-slate-700 p-4 space-y-3">
                <Skeleton className="h-8 w-full rounded-lg" />
                <Skeleton className="h-10 w-full rounded-lg" />
                <Skeleton className="h-10 w-full rounded-lg" />
                <Skeleton className="h-10 w-full rounded-lg" />
            </div>
            {/* Chat area skeleton */}
            <div className="flex-1 flex flex-col p-6 space-y-4">
                <div className="flex gap-3 mr-auto">
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <Skeleton className="h-16 w-64 rounded-2xl" />
                </div>
                <div className="flex gap-3 ml-auto flex-row-reverse">
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <Skeleton className="h-12 w-48 rounded-2xl" />
                </div>
                <div className="flex gap-3 mr-auto">
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <Skeleton className="h-20 w-72 rounded-2xl" />
                </div>
                <div className="mt-auto">
                    <Skeleton className="h-12 w-full rounded-xl" />
                </div>
            </div>
        </div>
    );
}

/* ---------- Table Skeleton ---------- */
interface TableSkeletonProps {
    rows?: number;
    columns?: number;
}

export function TableSkeleton({ rows = 5, columns = 4 }: TableSkeletonProps) {
    return (
        <div className="space-y-3">
            {/* Header */}
            <div className="flex gap-4 px-4 py-3">
                {Array.from({ length: columns }).map((_, i) => (
                    <Skeleton key={`h-${i}`} className="h-4 flex-1" />
                ))}
            </div>
            {/* Rows */}
            {Array.from({ length: rows }).map((_, ri) => (
                <div key={ri} className="flex gap-4 px-4 py-3 bg-white dark:bg-slate-800 rounded-lg">
                    {Array.from({ length: columns }).map((_, ci) => (
                        <Skeleton key={`r-${ri}-${ci}`} className="h-4 flex-1" />
                    ))}
                </div>
            ))}
        </div>
    );
}

/* ---------- Page Skeleton ---------- */
export function PageSkeleton() {
    return (
        <div className="container-gabardo py-8 space-y-6">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-72" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
            </div>
        </div>
    );
}
