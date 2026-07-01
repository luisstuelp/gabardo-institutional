import { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button_trucks";
import { Badge } from "@/components/ui/badge";
import { useAdminLeads } from '@/hooks/useAdminLeads';
import { MessageCircle, ExternalLink, Calendar, User, ListFilter, Check } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Link } from '@/lib/next-router-compat';

export default function AdminLeadsPage() {
    const { leads, isLoading, updateStatus } = useAdminLeads();
    const [statusFilter, setStatusFilter] = useState<string>('all');

    const vehicleLeads = leads?.filter(lead => lead.source !== 'contact_page') || [];

    const filteredLeads = vehicleLeads.filter(lead =>
        statusFilter === 'all' ? true : lead.status === statusFilter
    );

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'new':
                return <Badge className="bg-blue-500">Novo</Badge>;
            case 'contacted':
                return <Badge className="bg-yellow-500">Em Contato</Badge>;
            case 'closed':
                return <Badge variant="secondary">Fechado</Badge>;
            case 'lost':
                return <Badge variant="destructive">Perdido</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    const handleWhatsApp = (phone: string, message: string | null) => {
        const cleanPhone = phone.replace(/\D/g, '');
        const text = message ? `Olá, sobre sua mensagem: "${message}"` : 'Olá, vi seu interesse no site.';
        window.open(`https://wa.me/55${cleanPhone}?text=${encodeURIComponent(text)}`, '_blank');
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-montserrat text-primary">Propostas & Leads</h1>
                    <p className="text-muted-foreground">
                        Gerencie os contatos recebidos através do site.
                    </p>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="gap-2 h-10 px-4">
                            <ListFilter className="h-4 w-4" />
                            <span className="hidden sm:inline">Filtrar</span>
                            {statusFilter !== 'all' && (
                                <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-[10px]">
                                    {statusFilter === 'new' ? 'Novos' :
                                        statusFilter === 'contacted' ? 'Em Contato' :
                                            statusFilter === 'closed' ? 'Fechados' : statusFilter}
                                </Badge>
                            )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel>Status da Proposta</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem
                            checked={statusFilter === 'all'}
                            onCheckedChange={() => setStatusFilter('all')}
                        >
                            Todos
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={statusFilter === 'new'}
                            onCheckedChange={() => setStatusFilter('new')}
                        >
                            Novos
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={statusFilter === 'contacted'}
                            onCheckedChange={() => setStatusFilter('contacted')}
                        >
                            Em Contato
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={statusFilter === 'closed'}
                            onCheckedChange={() => setStatusFilter('closed')}
                        >
                            Fechados
                        </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="border rounded-lg bg-white overflow-hidden overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="hidden md:table-cell">Data</TableHead>
                            <TableHead>Cliente</TableHead>
                            <TableHead className="hidden md:table-cell">Interesse</TableHead>
                            <TableHead>Mensagem</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">Carregando...</TableCell>
                            </TableRow>
                        ) : filteredLeads?.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">Nenhum lead encontrado.</TableCell>
                            </TableRow>
                        ) : (
                            filteredLeads?.map((lead) => (
                                <TableRow key={lead.id}>
                                    <TableCell className="w-[120px] hidden md:table-cell">
                                        <div className="flex flex-col text-sm">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3 text-muted-foreground" />
                                                {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                {formatDistanceToNow(new Date(lead.created_at), { addSuffix: true, locale: ptBR })}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-medium flex items-center gap-1">
                                                <User className="h-3 w-3 text-muted-foreground" />
                                                {lead.name}
                                            </span>
                                            <span className="text-xs text-muted-foreground">{lead.email}</span>
                                            <span className="text-xs text-muted-foreground">{lead.phone}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {lead.vehicle ? (
                                            <Link to={`/admin/caminhoes/veiculos/${lead.vehicle_id}`} className="hover:underline text-blue-600 flex items-center gap-1">
                                                {lead.vehicle.title}
                                                <ExternalLink className="h-3 w-3" />
                                            </Link>
                                        ) : (
                                            <span className="text-muted-foreground italic">Contato Geral</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="max-w-[200px]">
                                        <p className="truncate text-sm text-muted-foreground" title={lead.message || ''}>
                                            {lead.message || '-'}
                                        </p>
                                    </TableCell>
                                    <TableCell>
                                        <Select
                                            value={lead.status}
                                            onValueChange={(val) => updateStatus.mutate({ id: lead.id, status: val })}
                                        >
                                            <SelectTrigger className="h-8 w-[130px]">
                                                <SelectValue>{getStatusBadge(lead.status)}</SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="new">Novo</SelectItem>
                                                <SelectItem value="contacted">Em Contato</SelectItem>
                                                <SelectItem value="closed">Fechado</SelectItem>
                                                <SelectItem value="lost">Perdido</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="text-green-600 hover:text-green-700 border-green-200 hover:bg-green-50"
                                            onClick={() => handleWhatsApp(lead.phone, lead.message)}
                                        >
                                            <MessageCircle className="h-4 w-4 mr-2" />
                                            WhatsApp
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
