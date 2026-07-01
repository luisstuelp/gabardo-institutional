import { useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchUsers, updateUserRole } from '@/store/slices/usersSlice';
import { User, Mail, Shield, Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from 'sonner';

export default function AdminUsersPage() {
    const dispatch = useAppDispatch();
    const { items: users, isLoading } = useAppSelector((state) => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleRoleChange = async (userId: string, newRole: string) => {
        try {
            await dispatch(updateUserRole({ userId, role: newRole as any })).unwrap();
            toast.success('Permissão atualizada com sucesso');
        } catch (error) {
            console.error('Failed to update role', error);
            toast.error('Erro ao atualizar permissão');
        }
    };

    const getRoleBadge = (role: string) => {
        switch (role) {
            case 'admin':
                return <Badge className="bg-purple-600">Administrador</Badge>;
            case 'moderator':
                return <Badge className="bg-blue-600">Moderador</Badge>;
            default:
                return <Badge variant="secondary">Usuário</Badge>;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-montserrat text-primary">Gerenciamento de Usuários</h1>
                    <p className="text-muted-foreground">
                        Controle de acesso e permissões da plataforma.
                    </p>
                </div>
            </div>

            <div className="border rounded-lg bg-white overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Usuário</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Cadastro</TableHead>
                            <TableHead>Função Atual</TableHead>
                            <TableHead>Alterar Permissão</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">Carregando usuários...</TableCell>
                            </TableRow>
                        ) : users.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">Nenhum usuário encontrado.</TableCell>
                            </TableRow>
                        ) : (
                            users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                                {user.avatar_url ? (
                                                    <img src={user.avatar_url} alt={user.full_name || ''} className="h-full w-full rounded-full object-cover" />
                                                ) : (
                                                    <User className="h-5 w-5" />
                                                )}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-medium text-slate-900">{user.full_name || 'Sem nome'}</span>
                                                <span className="text-xs text-muted-foreground">ID: {user.user_id.substring(0, 8)}...</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                            <Mail className="h-4 w-4 text-slate-400" />
                                            {user.email}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col text-sm">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4 text-slate-400" />
                                                {new Date(user.created_at).toLocaleDateString('pt-BR')}
                                            </span>
                                            <span className="text-xs text-muted-foreground pl-5">
                                                {formatDistanceToNow(new Date(user.created_at), { addSuffix: true, locale: ptBR })}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {getRoleBadge(user.role)}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Shield className="h-4 w-4 text-slate-400" />
                                            <Select
                                                value={user.role}
                                                onValueChange={(val) => handleRoleChange(user.user_id, val)}
                                            >
                                                <SelectTrigger className="w-[140px] h-9">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="user">Usuário</SelectItem>
                                                    <SelectItem value="moderator">Moderador</SelectItem>
                                                    <SelectItem value="admin">Administrador</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
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
