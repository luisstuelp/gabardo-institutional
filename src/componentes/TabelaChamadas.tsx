import { useDados } from "@/contextos/Dados";
import { useAutenticacao } from "@/contextos/Autenticacao";
import { useHeader } from "@/contextos/Header";
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useMemo } from 'react';
import useTimerFormatado from '@/hooks/useTimerFormatado';
import { BotaoAcoesChamada } from './BotaoAcoesChamada';
import { ModalAcoes } from './ModalAcoes';
import { ModalCooperacoes } from './ModalCooperacoes';
import MiniSearch from 'minisearch';

type Coluna = {
    id: string;
    header: string;
    width: number;
    align?: "left" | "center" | "right";
};

type LinhaChamadaProps = {
    linha: any;
    colunas: readonly Coluna[];
    colunasData: string[];
    darkMode: boolean;
    formatarData: (data: string | null) => string;
    onSelecionar: (id: string) => void;

    meuId: string;
    onAcaoClick: (id: string, acao: 'acoes' | 'cooperacao') => void;
};

type BadgeProps = {
    label: string;
    className: string;
};

type TabelaChamadasProps = {
    pesquisa: string;
};

const PRIORIDADES = {
    1: {
        label: "Baixa",
        className: "bg-green-500/10 text-green-600 border-green-500/30",
    },
    2: {
        label: "Média",
        className: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
    },
    3: {
        label: "Alta",
        className: "bg-orange-500/10 text-orange-600 border-orange-500/30",
    },
    4: {
        label: "Crítica",
        className: "bg-red-500/10 text-red-600 border-red-500/30",
    },
} as const;


const STATUS = {
    1: {
        label: "Encerrada com atraso",
        className: "bg-red-500/10 text-red-600 border-red-500/30",
    },
    2: {
        label: "Encerrada",
        className: "bg-zinc-500/10 text-zinc-500 border-zinc-500/30",
    },
    3: {
        label: "Parada",
        className: "bg-blue-500/10 text-blue-600 border-blue-500/30",
    },
    4: {
        label: "Pausada",
        className: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
    },
    5: {
        label: "Em andamento",
        className: "bg-green-500/10 text-green-600 border-green-500/30",
    },
    6: {
        label: "Atrasada",
        className: "bg-red-500/10 text-red-600 border-red-500/30",
    },
} as const;

function Badge({ label, className }: BadgeProps) {
    return (
        <motion.span
            initial={{
                opacity: 0,
                scale: 0.9,
            }}
            animate={{
                opacity: 1,
                scale: 1,
            }}
            className={`
                inline-flex
                items-center
                justify-center
                rounded-full
                border
                px-3
                py-1
                text-xs
                font-semibold
                whitespace-nowrap
                ${className}
            `}
        >
            {label}
        </motion.span>
    );
}

function LinhaChamada({
    linha,
    colunas,
    colunasData,
    darkMode,
    formatarData,
    meuId,
    onAcaoClick
}: LinhaChamadaProps) {

    const bg = darkMode ? '#18181B' : '#f7f7f9'
    const timer = useTimerFormatado(linha);

    return (
        <motion.tr
            initial={{
                opacity: 0,
                y: 8,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
        >
            {colunas.map((coluna) => {
                const valor =
                    linha[coluna.id as keyof typeof linha];

                const botao =
                    coluna.id === "acoes";

                const ehStatus =
                    coluna.id === 'status';

                const ehPrioridade =
                    coluna.id === "prioridade";

                const ehTempo =
                    coluna.id === "segundos_restantes";

                return (
                    <motion.td
                        key={coluna.id}
                        style={{
                            width: coluna.width,
                            maxWidth: coluna.width,
                            textAlign: coluna.align,
                        }}
                        animate={{
                            borderColor: darkMode
                                ? "#ffffff31"
                                : "#00000055",
                            backgroundColor: botao ? bg : '',
                        }}
                        className={`
    px-10 border py-5 whitespace-normal break-words

    ${botao
                                ? "sticky right-0 z-20 border-l"
                                : ""
                            }

    ${darkMode
                                ? "hover:bg-[#18181a]"
                                : "hover:bg-[#eaeaf0]"
                            }
`}
                    >
                        {botao ? (

                            <BotaoAcoesChamada
                                idChamada={linha.id}
                                idTecnicoResponsavel={
                                    linha.tecnico_chamadas?.some(
                                        (relacao: any) =>
                                            relacao.id_tecnico === meuId
                                    )
                                        ? meuId
                                        : null
                                }
                                numeroTecnicos={linha.numero_tecnicos || 0}
                                aoClicar={onAcaoClick}
                                status={linha.status}
                            />

                        ) : ehTempo ? (

                            timer

                        ) : ehStatus ? (

                            <Badge
                                label={
                                    STATUS[linha.status as keyof typeof STATUS]
                                        ?.label ?? "Desconhecido"
                                }
                                className={
                                    STATUS[linha.status as keyof typeof STATUS]
                                        ?.className ??
                                    "bg-zinc-500/10 text-zinc-500"
                                }
                            />

                        ) : ehPrioridade ? (

                            <Badge
                                label={
                                    PRIORIDADES[
                                        linha.prioridade as keyof typeof PRIORIDADES
                                    ]?.label ?? "-"
                                }
                                className={
                                    PRIORIDADES[
                                        linha.prioridade as keyof typeof PRIORIDADES
                                    ]?.className ??
                                    "bg-zinc-500/10 text-zinc-500"
                                }
                            />

                        ) : colunasData.includes(coluna.id) ? (

                            formatarData(valor as string | null)

                        ) : (

                            String(valor ?? "-")

                        )}
                    </motion.td>
                );
            })}
        </motion.tr>
    );
}

export default function TabelaChamadas({
    pesquisa,
}: TabelaChamadasProps) {
    const { chamadas } = useDados();
    const [selecionarChamada, setSelecionarChamada] = useState<string | null>(null);
    const [modalAberto, setModalAberto] = useState<'acoes' | 'cooperacao' | null>(null);
    const [pagina, setPagina] = useState(1);

    const { user } = useAutenticacao();

    const itensPorPagina = 25;


    const inicio = (pagina - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;

    const miniSearch = useMemo(() => {
        const search = new MiniSearch({
            fields: [
                'titulo',
                'descricao',
                'categoria',
                'email_requerente',
                'requerente',
            ],
            storeFields: [
                'id',
                'titulo',
                'descricao',
                'categoria',
                'email_requerente',
                'requerente',
                'prioridade',
                'status',
                'data_atendeu',
                'data_criacao',
                'data_finalizacao',
                'prazo_final',
                'segundos_restantes',
            ],
        });

        if (chamadas.data) {
            search.addAll(chamadas.data);
        }

        return search;
    }, [chamadas.data]);

    const chamadasFiltradas = useMemo(() => {
        const termo = pesquisa.trim();

        if (!termo) {
            return chamadas.data ?? [];
        }

        return miniSearch
            .search(termo, {
                prefix: true,
                fuzzy: 0.2,
            })
            .map((resultado) => resultado);
    }, [pesquisa, miniSearch, chamadas.data]);

    const totalItens = chamadasFiltradas.length;
    const chamadasPagina = chamadasFiltradas.slice(inicio, fim);


    const totalPaginas = Math.ceil(totalItens / itensPorPagina);

    const paginasVisiveis = () => {
        const paginas: (number | "...")[] = [];

        if (totalPaginas <= 7) {
            for (let i = 1; i <= totalPaginas; i++) {
                paginas.push(i);
            }

            return paginas;
        }

        paginas.push(1);

        if (pagina > 4) {
            paginas.push("...");
        }

        const inicio = Math.max(2, pagina - 1);
        const fim = Math.min(totalPaginas - 1, pagina + 1);

        for (let i = inicio; i <= fim; i++) {
            paginas.push(i);
        }

        if (pagina < totalPaginas - 3) {
            paginas.push("...");
        }

        paginas.push(totalPaginas);

        return paginas;
    };

    const { darkMode } = useHeader();

    const colunasData = [
        "data_atendeu",
        "data_criacao",
        "data_finalizacao",
        "prazo_final",
    ];

    const fecharModal = () => {
        setModalAberto(null);
        setSelecionarChamada(null);
    };

    const formatarData = (data: string | null) => {
        if (!data) return "-";

        return new Intl.DateTimeFormat("pt-BR", {
            dateStyle: "short",
            timeStyle: "short",
            timeZone: "America/Sao_Paulo",
        }).format(new Date(data));
    };

    useEffect(() => {
        setPagina(1);
    }, [pesquisa]);

    const colunas: Coluna[] = [
        {
            id: "titulo",
            header: "Título",
            width: 250,
            align: "center",
        },
        {
            id: "descricao",
            header: "Descrição",
            width: 350,
            align: "center",
        },
        {
            id: "prioridade",
            header: "Prioridade",
            width: 180,
            align: "center",
        },
        {
            id: "categoria",
            header: "Categoria",
            width: 150,
            align: "center",
        },
        {
            id: "data_atendeu",
            header: "Atendido em",
            width: 160,
            align: "center",
        },
        {
            id: "data_criacao",
            header: "Criado em",
            width: 160,
            align: "center",
        },
        {
            id: "data_finalizacao",
            header: "Fechado em",
            width: 160,
            align: "center",
        },
        {
            id: "email_requerente",
            header: "Email",
            width: 250,
            align: "center",
        },
        {
            id: "requerente",
            header: "Nome",
            width: 200,
            align: "center",
        },
        {
            id: "prazo_final",
            header: "Vence em",
            width: 160,
            align: "center",
        },
        {
            id: "segundos_restantes",
            header: "Tempo",
            width: 160,
            align: "center",
        },
        {
            id: "status",
            header: "Status",
            width: 220,
            align: "center",
        },
        {
            id: "acoes",
            header: "Ações",
            width: 130,
            align: "center",
        },
    ] as const;

    if (chamadas.isPending) {
        return <h1>Carregando...</h1>;
    }

    if (chamadas.isError) {
        return <h1>Erro ao carregar chamadas</h1>;
    }

    return (
        <>
            {chamadasPagina.length === 0 ? (
                <motion.div
                    animate={{
                        color: darkMode ? "#fafafa" : "#18181b",
                    }}
                    className="flex w-full items-center justify-center py-10"
                >
                    {pesquisa.trim()
                        ? "Nenhuma chamada encontrada."
                        : "Não há chamadas para mostrar."}
                </motion.div>
            ) : (
                <>
                    <motion.div
                        animate={{
                            color: darkMode
                                ? "#fafafa" : "#18181b",
                        }}
                        className="w-full overflow-x-auto shadow-sm" >

                        <motion.table
                            className="w-full min-w-max">
                            <thead>
                                <motion.tr
                                    initial={{
                                        opacity: 0,
                                        y: 8,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}

                                >
                                    {colunas.map((header) => (
                                        <motion.th key={header.id}
                                            style={{
                                                width: header.width,
                                                textAlign: header.align,
                                            }}
                                            initial={{
                                                opacity: 0,
                                                y: 8,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                                borderColor: darkMode ? "#ffffff31" : "#00000055",
                                            }}
                                            whileHover={{
                                                backgroundColor: darkMode
                                                    ? "#18181a"
                                                    : "#f4f4f5",
                                            }}
                                            className={`
    border
    sticky top-0
    z-10
    px-5 py-4
    text-xs
    font-semibold
    uppercase
    tracking-wider
    backdrop-blur-sm

    ${header.id === "acoes"
                                                    ? "right-0 border-r"
                                                    : ""
                                                }
`}
                                        >
                                            {header.header}
                                        </motion.th>
                                    ))}
                                </motion.tr>
                            </thead>
                            <tbody>
                                {chamadasPagina.map((linha) => (
                                    <LinhaChamada
                                        key={linha.id}
                                        linha={linha}
                                        colunas={colunas}
                                        colunasData={colunasData}
                                        darkMode={darkMode}
                                        formatarData={formatarData}
                                        onSelecionar={setSelecionarChamada}

                                        meuId={user?.id || ''}
                                        onAcaoClick={(id, acao) => {
                                            setSelecionarChamada(id);
                                            setModalAberto(acao);
                                        }}
                                    />
                                ))}
                            </tbody>
                        </motion.table>
                    </motion.div >
                    <motion.div
                        animate={{
                            color: darkMode ? "#fafafa" : "#18181b",
                        }}
                        className="flex items-center justify-center gap-2 py-5"
                    >
                        <button
                            onClick={() => setPagina((p) => p - 1)}
                            disabled={pagina === 1}
                            className="
            rounded-md border px-4 py-2
            disabled:cursor-not-allowed
            disabled:opacity-40
        "
                        >
                            Anterior
                        </button>

                        {paginasVisiveis().map((item, index) =>
                            item === "..." ? (
                                <span
                                    key={`ellipsis-${index}`}
                                    className="px-2"
                                >
                                    ...
                                </span>
                            ) : (
                                <button
                                    key={item}
                                    onClick={() => setPagina(item)}
                                    className={`
                rounded-md
                border
                px-3
                py-2

                ${pagina === item
                                            ? darkMode
                                                ? "bg-white text-black"
                                                : "bg-black text-white"
                                            : ""
                                        }
            `}
                                >
                                    {item}
                                </button>
                            )
                        )}

                        <button
                            onClick={() => setPagina((p) => p + 1)}
                            disabled={pagina === totalPaginas}
                            className="
            rounded-md border px-4 py-2
            disabled:cursor-not-allowed
            disabled:opacity-40
        "
                        >
                            Próxima
                        </button>
                    </motion.div>
                </>
            )}



            <AnimatePresence>
                {modalAberto === 'cooperacao' && selecionarChamada && (
                    <motion.div
                        key="modal-cooperacao"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={fecharModal}
                        className="
                            fixed inset-0 z-[999]
                            flex items-center justify-center
                            bg-black/40
                        "
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ModalCooperacoes
                                idChamada={selecionarChamada}
                                fecharModal={fecharModal}
                            />
                        </div>
                    </motion.div>
                )}

                {modalAberto === 'acoes' && selecionarChamada && (
                    <motion.div
                        key="modal-acoes"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={fecharModal}
                        className="
                            fixed inset-0 z-[999]
                            flex items-center justify-center
                            bg-black/40
                        "
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ModalAcoes
                                idChamada={selecionarChamada}
                                fecharModal={fecharModal}
                                statusChamada={chamadasPagina.find(c => c.id === selecionarChamada)?.status || 3}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}