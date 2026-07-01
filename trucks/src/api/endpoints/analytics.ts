/**
 * Analytics API endpoint module.
 * Fetch dashboard statistics and reports.
 */
import { getApiClient } from '../client';
import { createLogger } from '@/lib/logger';
import type { ApiResponse } from '@/types/api';
import type { AdminLead } from '@/types/vehicles';

const logger = createLogger('AnalyticsAPI');

export interface DashboardStats {
    totalVehicles: number;
    activeProposals: number;
    totalUsers: number;
    recentLeads: AdminLead[];
    chartData: { date: string; leads: number }[];
}

export type DashboardPeriod = '7d' | '30d' | '6m' | '12m';

/** GET /analytics/dashboard — Get key metrics for admin dashboard */
export async function getDashboardStats(period: DashboardPeriod = '6m'): Promise<ApiResponse<DashboardStats>> {
    const client = getApiClient();
    logger.info(`Fetching dashboard stats with period: ${period}`);

    return client.query<DashboardStats>('getDashboardStats', async () => {
        const supabase = client.getSupabaseClient();
        const now = new Date();
        let startDate = new Date();

        // Calculate start date based on period
        switch (period) {
            case '7d':
                startDate.setDate(now.getDate() - 7);
                break;
            case '30d':
                startDate.setDate(now.getDate() - 30);
                break;
            case '12m':
                startDate.setMonth(now.getMonth() - 11); // Current + 11 prev = 12
                break;
            case '6m':
            default:
                startDate.setMonth(now.getMonth() - 5); // Current + 5 prev = 6
                break;
        }

        // Run queries in parallel
        const results = await Promise.all([
            // Total Vehicles
            supabase.from('vehicles').select('*', { count: 'exact', head: true }),
            // Active Proposals (New + Contacted)
            supabase.from('leads').select('*', { count: 'exact', head: true }).in('status', ['new', 'contacted']),
            // Total Users
            supabase.from('user_profiles').select('*', { count: 'exact', head: true }),
            // Recent Leads (last 5)
            supabase
                .from('leads')
                .select(`
                    *,
                    vehicle:vehicles(title, slug)
                `)
                .order('created_at', { ascending: false })
                .limit(5),
            // Chart Data (Filtered by period)
            supabase
                .from('leads')
                .select('created_at')
                .gte('created_at', startDate.toISOString())
                .order('created_at', { ascending: true }),
        ]);

        const [vehiclesRes, proposalsRes, usersRes, leadsRes, chartRes] = results;

        // Process Chart Data
        const chartRawData = (chartRes.data as unknown as { created_at: string }[]) || [];

        // Grouping Logic
        const dataMap = new Map<string, number>();
        const isDaily = period === '7d' || period === '30d';

        if (isDaily) {
            // Daily Grouping
            const days = period === '7d' ? 7 : 30;
            for (let i = days - 1; i >= 0; i--) {
                const d = new Date();
                d.setDate(now.getDate() - i);
                const dayKey = d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }); // e.g. 10/02
                dataMap.set(dayKey, 0);
            }

            chartRawData.forEach(lead => {
                const d = new Date(lead.created_at);
                const dayKey = d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
                if (dataMap.has(dayKey)) {
                    dataMap.set(dayKey, (dataMap.get(dayKey) || 0) + 1);
                }
            });
        } else {
            // Monthly Grouping
            const months = period === '12m' ? 12 : 6;
            for (let i = months - 1; i >= 0; i--) {
                const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
                const monthKey = d.toLocaleString('pt-BR', { month: 'short' }).replace('.', '');
                const formattedMonth = monthKey.charAt(0).toUpperCase() + monthKey.slice(1);
                dataMap.set(formattedMonth, 0);
            }

            chartRawData.forEach(lead => {
                const d = new Date(lead.created_at);
                const monthKey = d.toLocaleString('pt-BR', { month: 'short' }).replace('.', '');
                const formattedMonth = monthKey.charAt(0).toUpperCase() + monthKey.slice(1);
                if (dataMap.has(formattedMonth)) {
                    dataMap.set(formattedMonth, (dataMap.get(formattedMonth) || 0) + 1);
                }
            });
        }

        const chartData = Array.from(dataMap.entries()).map(([date, leads]) => ({
            date,
            leads
        }));

        if (vehiclesRes.error) throw vehiclesRes.error;
        if (proposalsRes.error) throw proposalsRes.error;
        if (usersRes.error) throw usersRes.error;
        if (leadsRes.error) throw leadsRes.error;
        if (chartRes.error) throw chartRes.error;

        const stats: DashboardStats = {
            totalVehicles: vehiclesRes.count || 0,
            activeProposals: proposalsRes.count || 0,
            totalUsers: usersRes.count || 0,
            recentLeads: (leadsRes.data as unknown as AdminLead[]) || [],
            chartData: chartData,
        };

        return { data: stats, error: null };
    });
}
