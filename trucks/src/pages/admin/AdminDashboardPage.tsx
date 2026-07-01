import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchDashboardStats } from '@/store/slices/analyticsSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button_trucks';
import { Users, Truck, FileText, ArrowUpRight, Loader2, Calendar, ListFilter } from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Link } from 'react-router-dom';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import type { DashboardPeriod } from '@/api/endpoints/analytics';

export default function AdminDashboardPage() {
    const dispatch = useAppDispatch();
    const { stats, isLoading, error } = useAppSelector((state) => state.analytics);
    const [period, setPeriod] = useState<DashboardPeriod>('6m');

    useEffect(() => {
        dispatch(fetchDashboardStats(period));
    }, [dispatch, period]);

    if (isLoading && !stats) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    if (error && !stats) {
        return (
            <div className="text-center py-12">
                <p className="text-red-500">Erro ao carregar dados do dashboard.</p>
                <Button variant="outline" onClick={() => dispatch(fetchDashboardStats(period))} className="mt-4">
                    Tentar Novamente
                </Button>
            </div>
        );
    }

    // Fallback if stats is null but no error/loading (shouldn't happen with correct logic)
    if (!stats) return null;

    const cards = [
        {
            title: 'Total Veículos',
            value: stats.totalVehicles.toString(),
            change: '+0%', // Dynamic change would require historical data
            icon: Truck,
            color: 'text-blue-600',
        },
        {
            title: 'Propostas Ativas',
            value: stats.activeProposals.toString(),
            change: 'Ativas', // Showing "Ativas" instead of % for now
            icon: FileText,
            color: 'text-green-600',
        },
        {
            title: 'Usuários Cadastrados',
            value: stats.totalUsers.toString(),
            change: 'Total',
            icon: Users,
            color: 'text-orange-600',
        },
    ];

    const getPeriodLabel = (p: DashboardPeriod) => {
        switch (p) {
            case '7d': return '7 Dias';
            case '30d': return '30 Dias';
            case '6m': return '6 Meses';
            case '12m': return '12 Meses';
            default: return 'Período';
        }
    };

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {cards.map((stat) => (
                    <Card key={stat.title} className="group overflow-hidden rounded-2xl border-none bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-[0_8px_30px_-4px_rgba(6,81,237,0.15)] transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-6">
                            <CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                                {stat.title}
                            </CardTitle>
                            <div className={`p-3 rounded-xl bg-slate-50 group-hover:bg-slate-100 transition-colors ${stat.color}`}>
                                <stat.icon className="h-5 w-5" />
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 pt-0">
                            <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
                            <p className="text-sm text-slate-500 flex items-center mt-2 font-medium">
                                <span className="text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-lg flex items-center mr-2">
                                    {stat.change} <ArrowUpRight className="h-3 w-3 ml-1" />
                                </span>
                                <span>atualizado agora</span>
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                {/* Chart Section */}
                <Card className="col-span-4 rounded-3xl border-none shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)]">
                    <CardHeader className="p-8">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xl font-bold text-slate-900">Leads no Período</CardTitle>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="gap-2 h-9 px-3 text-sm font-medium rounded-xl border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50">
                                        <Calendar className="h-4 w-4" />
                                        <span className="hidden sm:inline">Período</span>
                                        <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-[10px] font-semibold bg-slate-100 text-slate-600 group-hover:bg-slate-200">
                                            {getPeriodLabel(period)}
                                        </Badge>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-40 rounded-xl">
                                    <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => setPeriod('7d')}>
                                        Últimos 7 dias
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setPeriod('30d')}>
                                        Últimos 30 dias
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setPeriod('6m')}>
                                        Últimos 6 meses
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setPeriod('12m')}>
                                        Últimos 12 meses
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8 pt-0">
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={stats.chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                                    <XAxis
                                        dataKey="date"
                                        stroke="#94a3b8"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        stroke="#94a3b8"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `${value}`}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px -2px rgba(0,0,0,0.1)' }}
                                        cursor={{ stroke: '#cbd5e1', strokeWidth: 2 }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="leads"
                                        stroke="#2563eb"
                                        strokeWidth={3}
                                        dot={{ fill: '#2563eb', strokeWidth: 2, r: 4, stroke: '#fff' }}
                                        activeDot={{ r: 6, strokeWidth: 0 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Leads */}
                <Card className="col-span-3 rounded-3xl border-none shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)]">
                    <CardHeader className="p-8">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xl font-bold text-slate-900">Últimas Propostas</CardTitle>
                            <Link to="/admin/propostas">
                                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-600 rounded-full h-8 w-8 p-0">
                                    •••
                                </Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8 pt-0">
                        <div className="space-y-6">
                            {stats.recentLeads.length === 0 ? (
                                <p className="text-slate-500 text-center py-4">Nenhuma proposta recente.</p>
                            ) : (
                                stats.recentLeads.map((lead) => (
                                    <Link to="/admin/propostas" key={lead.id} className="block">
                                        <div className="flex items-center group cursor-pointer p-3 -mx-3 rounded-2xl hover:bg-slate-50 transition-colors">
                                            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-blue-600 font-bold border border-blue-100 shrink-0">
                                                {lead.name.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div className="ml-4 space-y-1 overflow-hidden">
                                                <p className="text-sm font-bold text-slate-900 truncate">{lead.name}</p>
                                                <p className="text-xs text-slate-500 font-medium truncate">
                                                    {lead.vehicle?.title || 'Veículo indisponível'}
                                                </p>
                                            </div>
                                            <div className="ml-auto text-xs font-medium text-slate-400 bg-white px-2 py-1 rounded-lg border border-slate-100 shadow-sm whitespace-nowrap">
                                                {formatDistanceToNow(new Date(lead.created_at), { addSuffix: true, locale: ptBR })}
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
