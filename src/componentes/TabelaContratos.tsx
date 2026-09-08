"use client";

import { useDados } from "@/contextos/Dados";
import { useHeader } from "@/contextos/Header";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import MiniSearch from "minisearch";
import { supabase } from "@/lib/supabase";
import { Check, Loader2 } from "lucide-react";

type Coluna = {
    id: string;
    header: string;
    width: number;
    align?: "left" | "center" | "right";
};

type Contrato = {
    id: string;
    empresa: string;
    servico: string;
    arquivo: string | null;
    data_inicio: string;
    data_fim: string;
    periodo: number | null;
    valor_mensal: number | null;
    renovado: boolean;
};

type ContratoBusca = Contrato & {
    data_inicio_busca: string;
    data_fim_busca: string;
    datas_busca: string;
    periodo_busca: string;
    valor_mensal_busca: string;
    renovado_busca: string;
};

type LinhaContratosProps = {
    linha: Contrato;
    colunas: readonly Coluna[];
    colunasData: string[];
    darkMode: boolean;
    formatarData: (data: string | null) => string;
    formatarValor: (valor: number | null) => string;
    tratarContrato: (contratoId: string) => Promise<void>;
    tratandoId: string | null;
};

type TabelaContratosProps = {
    pesquisa: string;
};

function LinhaContratos({
    linha,
    colunas,
    colunasData,
    darkMode,
    formatarData,
    formatarValor,
    tratarContrato,
    tratandoId,
}: LinhaContratosProps) {
    const abrirContrato = async (arquivo: string | null) => {
        if (!arquivo) return;

        const { data, error } = await supabase.storage
            .from("documentos")
            .createSignedUrl(arquivo, 60 * 5);

        if (error || !data?.signedUrl) {
            console.error(
                "Erro ao gerar URL do contrato:",
                error
            );

            return;
        }

        window.open(
            data.signedUrl,
            "_blank",
            "noopener,noreferrer"
        );
    };

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
                    linha[coluna.id as keyof Contrato];

                const ehData =
                    colunasData.includes(coluna.id);

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
                        }}
                        className={`
                            px-10
                            py-5
                            border
                            whitespace-normal
                            break-words

                            ${
                                darkMode
                                    ? "hover:bg-[#18181a]"
                                    : "hover:bg-[#eaeaf0]"
                            }
                        `}
                    >
                        {ehData ? (
                            formatarData(
                                valor as string | null
                            )
                        ) : coluna.id === "arquivo" ? (
                            linha.arquivo ? (
                                <button
                                    type="button"
                                    onClick={() =>
                                        abrirContrato(
                                            linha.arquivo
                                        )
                                    }
                                    className="
                                        underline
                                        underline-offset-4
                                        hover:opacity-70
                                        transition-opacity
                                        cursor-pointer
                                    "
                                >
                                    Ver contrato
                                </button>
                            ) : (
                                "-"
                            )
                        ) : coluna.id === "periodo" ? (
                            linha.periodo !== null ? (
                                `${linha.periodo} dias`
                            ) : (
                                "-"
                            )
                        ) : coluna.id === "valor_mensal" ? (
                            formatarValor(
                                linha.valor_mensal
                            )
                        ) : coluna.id === "renovado" ? (
                            linha.renovado ? (
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        scale: 0.95,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                    }}
                                    className="
                                        inline-flex
                                        items-center
                                        gap-2
                                        rounded-md
                                        px-3
                                        py-1.5
                                        text-xs
                                        font-medium
                                    "
                                    style={{
                                        background: darkMode
                                            ? "#14532d55"
                                            : "#dcfce7",
                                        color: darkMode
                                            ? "#86efac"
                                            : "#166534",
                                    }}
                                >
                                    <Check size={14} />
                                    Renovado
                                </motion.div>
                            ) : (
                                <motion.button
                                    type="button"
                                    disabled={
                                        tratandoId ===
                                        linha.id
                                    }
                                    onClick={() =>
                                        tratarContrato(
                                            linha.id
                                        )
                                    }
                                    whileHover={{
                                        scale: 1.02,
                                    }}
                                    whileTap={{
                                        scale: 0.98,
                                    }}
                                    className="
                                        inline-flex
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-md
                                        px-4
                                        py-2
                                        text-xs
                                        font-semibold
                                        transition-opacity
                                        disabled:cursor-not-allowed
                                        disabled:opacity-50
                                    "
                                    style={{
                                        background: darkMode
                                            ? "#1e3a8a"
                                            : "#1904fd",
                                        color: "#ffffff",
                                    }}
                                >
                                    {tratandoId ===
                                    linha.id ? (
                                        <>
                                            <Loader2
                                                size={14}
                                                className="animate-spin"
                                            />

                                            Tratando...
                                        </>
                                    ) : (
                                        "Tratar"
                                    )}
                                </motion.button>
                            )
                        ) : coluna.id === "id" ? (
                            String(valor ?? "-")
                        ) : (
                            String(valor ?? "-")
                        )}
                    </motion.td>
                );
            })}
        </motion.tr>
    );
}

export default function TabelaContratos({
    pesquisa,
}: TabelaContratosProps) {
    const { contratos } = useDados();
    const { darkMode } = useHeader();

    const [pagina, setPagina] = useState(1);
    const [tratandoId, setTratandoId] =
        useState<string | null>(null);

    const itensPorPagina = 25;

    const formatarDataBusca = (
        data: string | null
    ) => {
        if (!data) return "";

        const dataObj = new Date(data);

        if (Number.isNaN(dataObj.getTime())) {
            return "";
        }

        const formatador =
            new Intl.DateTimeFormat("pt-BR", {
                timeZone: "America/Sao_Paulo",
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });

        const formatadorData =
            new Intl.DateTimeFormat("pt-BR", {
                timeZone: "America/Sao_Paulo",
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            });

        const formatadorMesAno =
            new Intl.DateTimeFormat("pt-BR", {
                timeZone: "America/Sao_Paulo",
                month: "2-digit",
                year: "numeric",
            });

        const formatadorAno =
            new Intl.DateTimeFormat("pt-BR", {
                timeZone: "America/Sao_Paulo",
                year: "numeric",
            });

        return [
            formatador.format(dataObj),
            formatadorData.format(dataObj),
            formatadorMesAno.format(dataObj),
            formatadorAno.format(dataObj),
            data,
        ].join(" ");
    };

    const formatarValorBusca = (
        valor: number | null
    ) => {
        if (valor === null) return "";

        return [
            String(valor),
            formatarValor(valor),
        ].join(" ");
    };

    const formatarValor = (
        valor: number | null
    ) => {
        if (valor === null) {
            return "-";
        }

        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(valor);
    };

    const contratosParaBusca =
        useMemo<ContratoBusca[]>(() => {
            if (!contratos.data) {
                return [];
            }

            return contratos.data.map((contrato) => {
                const dataInicioBusca =
                    formatarDataBusca(
                        contrato.data_inicio
                    );

                const dataFimBusca =
                    formatarDataBusca(
                        contrato.data_fim
                    );

                const periodo =
                    contrato.periodo != null
                        ? Number(contrato.periodo)
                        : null;

                const valorMensal =
                    contrato.valor_mensal != null
                        ? Number(
                              contrato.valor_mensal
                          )
                        : null;

                const renovado =
                    Boolean(contrato.renovado);

                return {
                    id: String(contrato.id),
                    empresa: String(
                        contrato.empresa ?? ""
                    ),
                    servico: String(
                        contrato.servico ?? ""
                    ),
                    arquivo:
                        contrato.arquivo != null
                            ? String(
                                  contrato.arquivo
                              )
                            : null,
                    data_inicio: String(
                        contrato.data_inicio ?? ""
                    ),
                    data_fim: String(
                        contrato.data_fim ?? ""
                    ),
                    periodo,
                    valor_mensal: valorMensal,
                    renovado,
                    data_inicio_busca:
                        dataInicioBusca,
                    data_fim_busca:
                        dataFimBusca,
                    datas_busca: [
                        dataInicioBusca,
                        dataFimBusca,
                    ].join(" "),
                    periodo_busca:
                        periodo !== null
                            ? `${periodo} dias`
                            : "",
                    valor_mensal_busca:
                        formatarValorBusca(
                            valorMensal
                        ),
                    renovado_busca: renovado
                        ? "renovado tratado true sim"
                        : "não renovado false não tratar",
                };
            });
        }, [contratos.data]);

    const miniSearch = useMemo(() => {
        const search =
            new MiniSearch<ContratoBusca>({
                fields: [
                    "empresa",
                    "servico",
                    "arquivo",
                    "data_inicio_busca",
                    "data_fim_busca",
                    "datas_busca",
                    "periodo_busca",
                    "valor_mensal_busca",
                    "renovado_busca",
                ],

                storeFields: [
                    "id",
                    "empresa",
                    "servico",
                    "arquivo",
                    "data_inicio",
                    "data_fim",
                    "periodo",
                    "valor_mensal",
                    "renovado",
                    "data_inicio_busca",
                    "data_fim_busca",
                    "datas_busca",
                    "periodo_busca",
                    "valor_mensal_busca",
                    "renovado_busca",
                ],
            });

        if (contratosParaBusca.length > 0) {
            search.addAll(contratosParaBusca);
        }

        return search;
    }, [contratosParaBusca]);

    const contratosFiltrados =
        useMemo<Contrato[]>(() => {
            const termo = pesquisa.trim();

            if (!termo) {
                return (
                    contratos.data?.map(
                        (contrato) => ({
                            id: String(
                                contrato.id
                            ),
                            empresa: String(
                                contrato.empresa ??
                                    ""
                            ),
                            servico: String(
                                contrato.servico ??
                                    ""
                            ),
                            arquivo:
                                contrato.arquivo !=
                                null
                                    ? String(
                                          contrato.arquivo
                                      )
                                    : null,
                            data_inicio: String(
                                contrato.data_inicio ??
                                    ""
                            ),
                            data_fim: String(
                                contrato.data_fim ??
                                    ""
                            ),
                            periodo:
                                contrato.periodo !=
                                null
                                    ? Number(
                                          contrato.periodo
                                      )
                                    : null,
                            valor_mensal:
                                contrato.valor_mensal !=
                                null
                                    ? Number(
                                          contrato.valor_mensal
                                      )
                                    : null,
                            renovado: Boolean(
                                contrato.renovado
                            ),
                        })
                    ) ?? []
                );
            }

            return miniSearch
                .search(termo, {
                    prefix: true,
                    fuzzy: 0.2,
                })
                .map((resultado) => ({
                    id: String(resultado.id),
                    empresa: String(
                        resultado.empresa ?? ""
                    ),
                    servico: String(
                        resultado.servico ?? ""
                    ),
                    arquivo:
                        resultado.arquivo != null
                            ? String(
                                  resultado.arquivo
                              )
                            : null,
                    data_inicio: String(
                        resultado.data_inicio ?? ""
                    ),
                    data_fim: String(
                        resultado.data_fim ?? ""
                    ),
                    periodo:
                        resultado.periodo != null
                            ? Number(
                                  resultado.periodo
                              )
                            : null,
                    valor_mensal:
                        resultado.valor_mensal !=
                        null
                            ? Number(
                                  resultado.valor_mensal
                              )
                            : null,
                    renovado: Boolean(
                        resultado.renovado
                    ),
                }));
        }, [
            pesquisa,
            miniSearch,
            contratos.data,
        ]);

    const tratarContrato = async (
        contratoId: string
    ) => {
        if (tratandoId) return;

        setTratandoId(contratoId);

        try {
            const { error } =
                await supabase.rpc(
                    "tratar_contrato",
                    {
                        p_contrato_id:
                            contratoId,
                    }
                );

            if (error) {
                throw error;
            }

            /*
             * Atualiza os dados do React Query.
             *
             * O objeto retornado por useQuery
             * normalmente possui refetch().
             */
            if (
                "refetch" in contratos &&
                typeof contratos.refetch ===
                    "function"
            ) {
                await contratos.refetch();
            }
        } catch (error) {
            console.error(
                "Erro ao tratar contrato:",
                error
            );
        } finally {
            setTratandoId(null);
        }
    };

    const totalItens =
        contratosFiltrados.length;

    const totalPaginas = Math.max(
        1,
        Math.ceil(
            totalItens / itensPorPagina
        )
    );

    const inicio =
        (pagina - 1) * itensPorPagina;

    const fim =
        inicio + itensPorPagina;

    const contratosPagina =
        contratosFiltrados.slice(
            inicio,
            fim
        );

    useEffect(() => {
        setPagina(1);
    }, [pesquisa]);

    useEffect(() => {
        if (pagina > totalPaginas) {
            setPagina(totalPaginas);
        }
    }, [pagina, totalPaginas]);

    const formatarData = (
        data: string | null
    ) => {
        if (!data) {
            return "-";
        }

        const dataObj = new Date(data);

        if (Number.isNaN(dataObj.getTime())) {
            return "-";
        }

        return new Intl.DateTimeFormat(
            "pt-BR",
            {
                dateStyle: "short",
                timeStyle: "short",
                timeZone:
                    "America/Sao_Paulo",
            }
        ).format(dataObj);
    };

    const colunasData = [
        "data_inicio",
        "data_fim",
    ];

    const colunas: Coluna[] = [
        {
            id: "empresa",
            header: "Empresa",
            width: 250,
            align: "center",
        },
        {
            id: "servico",
            header: "Serviço",
            width: 350,
            align: "center",
        },
        {
            id: "arquivo",
            header: "Arquivo",
            width: 300,
            align: "center",
        },
        {
            id: "data_inicio",
            header: "Início",
            width: 180,
            align: "center",
        },
        {
            id: "data_fim",
            header: "Fim",
            width: 180,
            align: "center",
        },
        {
            id: "periodo",
            header: "Período",
            width: 150,
            align: "center",
        },
        {
            id: "valor_mensal",
            header: "Valor mensal",
            width: 180,
            align: "center",
        },
        {
            id: "renovado",
            header: "Renovação",
            width: 180,
            align: "center",
        },
    ] as const;

    const paginasVisiveis = () => {
        const paginas: (
            | number
            | "..."
        )[] = [];

        if (totalPaginas <= 7) {
            for (
                let i = 1;
                i <= totalPaginas;
                i++
            ) {
                paginas.push(i);
            }

            return paginas;
        }

        paginas.push(1);

        if (pagina > 4) {
            paginas.push("...");
        }

        const inicioPaginas =
            Math.max(
                2,
                pagina - 1
            );

        const fimPaginas =
            Math.min(
                totalPaginas - 1,
                pagina + 1
            );

        for (
            let i = inicioPaginas;
            i <= fimPaginas;
            i++
        ) {
            paginas.push(i);
        }

        if (
            pagina <
            totalPaginas - 3
        ) {
            paginas.push("...");
        }

        paginas.push(totalPaginas);

        return paginas;
    };

    if (contratos.isPending) {
        return (
            <motion.div
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                className="flex items-center justify-center py-10"
            >
                <h1>
                    Carregando...
                </h1>
            </motion.div>
        );
    }

    if (contratos.isError) {
        return (
            <motion.div
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                className="flex items-center justify-center py-10"
            >
                <h1>
                    Erro ao carregar contratos
                </h1>
            </motion.div>
        );
    }

    return (
        <>
            <motion.div
                animate={{
                    color: darkMode
                        ? "#fafafa"
                        : "#18181b",
                }}
                className="w-full overflow-x-auto shadow-sm"
            >
                <motion.table className="w-full min-w-max">
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
                            {colunas.map(
                                (header) => (
                                    <motion.th
                                        key={
                                            header.id
                                        }
                                        style={{
                                            width:
                                                header.width,
                                            textAlign:
                                                header.align,
                                        }}
                                        initial={{
                                            opacity: 0,
                                            y: 8,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            borderColor:
                                                darkMode
                                                    ? "#ffffff31"
                                                    : "#00000055",
                                        }}
                                        whileHover={{
                                            backgroundColor:
                                                darkMode
                                                    ? "#18181a"
                                                    : "#f4f4f5",
                                        }}
                                        className="
                                            border
                                            sticky
                                            top-0
                                            z-10
                                            px-5
                                            py-4
                                            text-xs
                                            font-semibold
                                            uppercase
                                            tracking-wider
                                            backdrop-blur-sm
                                        "
                                    >
                                        {
                                            header.header
                                        }
                                    </motion.th>
                                )
                            )}
                        </motion.tr>
                    </thead>

                    <tbody>
                        <AnimatePresence mode="popLayout">
                            {contratosPagina.map(
                                (linha) => (
                                    <LinhaContratos
                                        key={
                                            linha.id
                                        }
                                        linha={
                                            linha
                                        }
                                        colunas={
                                            colunas
                                        }
                                        colunasData={
                                            colunasData
                                        }
                                        darkMode={
                                            darkMode
                                        }
                                        formatarData={
                                            formatarData
                                        }
                                        formatarValor={
                                            formatarValor
                                        }
                                        tratarContrato={
                                            tratarContrato
                                        }
                                        tratandoId={
                                            tratandoId
                                        }
                                    />
                                )
                            )}
                        </AnimatePresence>
                    </tbody>
                </motion.table>

                {contratosPagina.length ===
                    0 && (
                    <motion.div
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        className="flex items-center justify-center py-10"
                    >
                        <span className="text-sm opacity-60">
                            Nenhum contrato encontrado.
                        </span>
                    </motion.div>
                )}
            </motion.div>

            <motion.div
                animate={{
                    color: darkMode
                        ? "#fafafa"
                        : "#18181b",
                }}
                className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    py-5
                "
            >
                <button
                    onClick={() =>
                        setPagina((p) =>
                            Math.max(
                                1,
                                p - 1
                            )
                        )
                    }
                    disabled={pagina === 1}
                    className="
                        rounded-md
                        border
                        px-4
                        py-2
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                    "
                >
                    Anterior
                </button>

                {paginasVisiveis().map(
                    (item, index) =>
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
                                onClick={() =>
                                    setPagina(
                                        item
                                    )
                                }
                                className={`
                                    rounded-md
                                    border
                                    px-3
                                    py-2

                                    ${
                                        pagina ===
                                        item
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
                    onClick={() =>
                        setPagina((p) =>
                            Math.min(
                                totalPaginas,
                                p + 1
                            )
                        )
                    }
                    disabled={
                        pagina ===
                            totalPaginas ||
                        totalItens === 0
                    }
                    className="
                        rounded-md
                        border
                        px-4
                        py-2
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                    "
                >
                    Próxima
                </button>
            </motion.div>
        </>
    );
}