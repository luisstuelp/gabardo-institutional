import { useState } from 'react';
import { Link } from '@/lib/next-router-compat';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button_trucks";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAdminVehicles } from '@/hooks/useAdminVehicles';
import { Plus, MoreHorizontal, Pencil, Trash2, Search, Eye, ListFilter } from 'lucide-react';
import { formatPrice } from '@/lib/format';

export default function AdminVehiclesPage() {
    const { vehicles, isLoading, deleteVehicle } = useAdminVehicles();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const filteredVehicles = vehicles?.filter(vehicle => {
        const matchesSearch =
            vehicle.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' ? true : vehicle.status === statusFilter;

        return matchesSearch && matchesStatus;
    }) || [];

    const handleDelete = async () => {
        if (deleteId) {
            await deleteVehicle(deleteId);
            setDeleteId(null);
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'available':
                return <Badge className="bg-green-500 hover:bg-green-600">Disponível</Badge>;
            case 'reserved':
                return <Badge className="bg-yellow-500 hover:bg-yellow-600">Reservado</Badge>;
            case 'sold':
                return <Badge variant="secondary">Vendido</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-montserrat text-slate-900">Veículos</h1>
                    <p className="text-slate-500">
                        Gerencie o estoque de caminhões.
                    </p>
                </div>
                <Link to="/admin/caminhoes/veiculos/novo">
                    <Button className="gap-2 rounded-xl h-11 px-6 shadow-blue-900/10 hover:shadow-blue-900/20">
                        <Plus className="h-4 w-4" /> Novo Veículo
                    </Button>
                </Link>
            </div>

            <div className="flex items-center gap-3">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Buscar por título, marca ou modelo..."
                        className="pl-10 h-11 rounded-xl bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="gap-2 h-11 px-4 bg-white border-slate-200">
                            <ListFilter className="h-4 w-4 text-slate-500" />
                            <span className="hidden sm:inline text-slate-700">Filtrar</span>
                            {statusFilter !== 'all' && (
                                <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-[10px]">
                                    {statusFilter === 'available' ? 'Disp.' :
                                        statusFilter === 'reserved' ? 'Res.' :
                                            statusFilter === 'sold' ? 'Vend.' : statusFilter}
                                </Badge>
                            )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel>Status do Veículo</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem
                            checked={statusFilter === 'all'}
                            onCheckedChange={() => setStatusFilter('all')}
                        >
                            Todos
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={statusFilter === 'available'}
                            onCheckedChange={() => setStatusFilter('available')}
                        >
                            Disponível
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={statusFilter === 'reserved'}
                            onCheckedChange={() => setStatusFilter('reserved')}
                        >
                            Reservado
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={statusFilter === 'sold'}
                            onCheckedChange={() => setStatusFilter('sold')}
                        >
                            Vendido
                        </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="border-none rounded-2xl bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] overflow-hidden">
                <Table>
                    <TableHeader className="bg-slate-50/50">
                        <TableRow className="hover:bg-transparent border-b border-slate-100">
                            <TableHead className="w-[100px] py-4 pl-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Imagem</TableHead>
                            <TableHead className="py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Título</TableHead>
                            <TableHead className="py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Preço</TableHead>
                            <TableHead className="py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Ano</TableHead>
                            <TableHead className="py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</TableHead>
                            <TableHead className="text-right py-4 pr-6 text-xs font-semibold uppercase tracking-wider text-slate-500">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-32 text-center text-slate-500">
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                        Carregando...
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : filteredVehicles.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-32 text-center text-slate-500">
                                    Nenhum veículo encontrado.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredVehicles.map((vehicle) => {
                                const image = vehicle.images?.find(i => i.is_primary) || vehicle.images?.[0];
                                return (
                                    <TableRow key={vehicle.id} className="hover:bg-slate-50/50 border-b border-slate-50 transition-colors">
                                        <TableCell className="pl-6 py-3">
                                            <div className="h-12 w-20 bg-slate-100 rounded-lg overflow-hidden border border-slate-100">
                                                {image ? (
                                                    <img
                                                        src={image.url}
                                                        alt={vehicle.title}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="h-full w-full flex items-center justify-center text-slate-400 text-[10px]">
                                                        Sem foto
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium py-3">
                                            <div className="flex flex-col">
                                                <span className="text-slate-900 font-semibold">{vehicle.title}</span>
                                                <span className="text-xs text-slate-500">
                                                    {vehicle.brand} • {vehicle.model}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-slate-600 font-medium py-3">{formatPrice(vehicle.price)}</TableCell>
                                        <TableCell className="text-slate-600 py-3">{vehicle.year_manufacture}/{vehicle.year_model}</TableCell>
                                        <TableCell className="py-3">{getStatusBadge(vehicle.status)}</TableCell>
                                        <TableCell className="text-right pr-6 py-3">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600">
                                                        <span className="sr-only">Abrir menu</span>
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="rounded-xl shadow-lg border-slate-100 p-2">
                                                    <DropdownMenuLabel className="px-2 py-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Ações</DropdownMenuLabel>
                                                    <Link to={`/admin/caminhoes/veiculos/${vehicle.id}`}>
                                                        <DropdownMenuItem className="rounded-lg cursor-pointer">
                                                            <Pencil className="mr-2 h-4 w-4 text-blue-500" />
                                                            Editar
                                                        </DropdownMenuItem>
                                                    </Link>
                                                    <Link to={`/caminhoes/${vehicle.slug}`} target="_blank">
                                                        <DropdownMenuItem className="rounded-lg cursor-pointer">
                                                            <Eye className="mr-2 h-4 w-4 text-emerald-500" />
                                                            Ver no Site
                                                        </DropdownMenuItem>
                                                    </Link>
                                                    <DropdownMenuSeparator className="bg-slate-100 my-2" />
                                                    <DropdownMenuItem
                                                        className="text-red-600 focus:text-red-700 bg-red-50/50 focus:bg-red-50 rounded-lg cursor-pointer"
                                                        onClick={() => setDeleteId(vehicle.id)}
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Excluir
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </div>

            <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta ação não pode ser desfeita. Isso excluirá permanentemente o veículo do banco de dados.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                            Excluir
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
