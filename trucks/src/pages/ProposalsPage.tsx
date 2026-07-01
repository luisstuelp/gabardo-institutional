import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FileText, Calendar, Truck, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useProposals } from '@/hooks/useProposals';
import { Button } from '@/components/ui/button_trucks';
import { formatPrice, formatYear } from '@/lib/format';
import { Badge } from '@/components/ui/badge';

export default function ProposalsPage() {
    const navigate = useNavigate();
    const { user, isLoading: authLoading } = useAuth();
    const { proposals, isLoading: proposalsLoading } = useProposals();

    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/auth', { state: { from: { pathname: '/propostas' } } });
        }
    }, [user, authLoading, navigate]);

    const isLoading = authLoading || proposalsLoading;

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="container-gabardo py-8">
            <div className="flex items-center gap-3 mb-8">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold font-montserrat text-primary">
                        Minhas Propostas
                    </h1>
                    <p className="text-muted-foreground">
                        Acompanhe o status das suas propostas enviadas
                    </p>
                </div>
            </div>

            {isLoading && (
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-40 bg-gray-100 animate-pulse rounded-xl" />
                    ))}
                </div>
            )}

            {!isLoading && proposals.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-6">
                        <FileText className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold font-montserrat mb-2">
                        Nenhuma proposta enviada
                    </h3>
                    <p className="text-muted-foreground mb-6 max-w-md">
                        Você ainda não enviou propostas. Encontre o caminhão ideal e solicite um contato.
                    </p>
                    <Link to="/caminhoes">
                        <Button>Ver Catálogo</Button>
                    </Link>
                </div>
            )}

            {!isLoading && proposals.length > 0 && (
                <div className="grid gap-4">
                    {proposals.map((proposal) => {
                        const vehicle = proposal.vehicle;
                        const image = vehicle?.images?.find(i => i.is_primary) || vehicle?.images?.[0];

                        return (
                            <div
                                key={proposal.id}
                                className="bg-white border rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300"
                            >
                                <div className="p-6 flex flex-col md:flex-row gap-6">
                                    {/* Vehicle Image */}
                                    <div className="w-full md:w-48 h-32 md:h-auto shrink-0 rounded-lg overflow-hidden bg-gray-100 relative">
                                        {image ? (
                                            <img
                                                src={image.url}
                                                alt={vehicle.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                <Truck className="h-8 w-8" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 flex flex-col justify-between gap-4">
                                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                            <div>
                                                <div className="flex items-center gap-2 text-sm text-neutral-500 mb-1">
                                                    <Calendar className="h-4 w-4" />
                                                    {new Date(proposal.created_at).toLocaleDateString('pt-BR')}
                                                </div>
                                                <h3 className="text-xl font-bold font-montserrat text-primary mb-1">
                                                    {vehicle ? vehicle.title : 'Veículo não disponível'}
                                                </h3>
                                                {vehicle && (
                                                    <div className="text-muted-foreground text-sm">
                                                        {formatYear(vehicle.year_manufacture, vehicle.year_model)} • {formatPrice(vehicle.price)}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex flex-col items-start md:items-end gap-2">
                                                <Badge variant={
                                                    proposal.status === 'new' ? 'secondary' :
                                                        proposal.status === 'contacted' ? 'default' :
                                                            proposal.status === 'closed' ? 'outline' : 'secondary'
                                                } className="capitalize">
                                                    {proposal.status === 'new' ? 'Em análise' :
                                                        proposal.status === 'contacted' ? 'Em contato' :
                                                            proposal.status === 'closed' ? 'Finalizado' : proposal.status}
                                                </Badge>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t mt-2">
                                            <div className="text-sm text-muted-foreground truncate max-w-[200px] md:max-w-md">
                                                "{proposal.message || 'Sem mensagem'}"
                                            </div>

                                            {vehicle && (
                                                <Link to={`/caminhoes/${vehicle.slug}`}>
                                                    <Button variant="ghost" size="sm" className="gap-2">
                                                        Ver veículo <ArrowRight className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
