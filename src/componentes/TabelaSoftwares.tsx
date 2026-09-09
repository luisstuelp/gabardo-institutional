import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useMemo } from "react";
import MiniSearch from "minisearch";
import { useDados } from "@/contextos/Dados";
import { useHeader } from "@/contextos/Header";
import UsuarioCompleto from "@/componentes/UsuariosCompletos";

type TabelaSoftwaresProps = {
    pesquisa: string;
};

type Coluna = {
    id: string;
    header: string;
    width: number;
    align?: "left" | "center" | "right";
};

type LinhaSoftwareProps = {
    linha: any;
    colunas: readonly Coluna[];
    darkMode: boolean;
    aoClicar: () => void;
};

function LinhaSoftware({
    linha,
    colunas,
    darkMode,
    aoClicar,
}: LinhaSoftwareProps) {

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
            onClick={aoClicar}
            className="cursor-pointer"
        >
            {colunas.map((coluna) => {

                const valor =
                    linha[coluna.id as keyof typeof linha];

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
                        className="
                            border
                            px-5
                            py-4
                            text-sm
                        "
                    >
                        {String(valor ?? "-")}
                    </motion.td>
                );
            })}
        </motion.tr>
    );
}

export default function TabelaSoftwares({
    pesquisa,
}: TabelaSoftwaresProps) {

    const { darkMode } = useHeader();

    const { programas } = useDados();

    const [modalInfo, setModalInfo] =
        useState(false);

    const [programaSelecionado, setProgramaSelecionado] =
        useState<number | null>(null);

    const [pagina, setPagina] =
        useState(1);

    const miniSearch = useMemo(() => {

        const search = new MiniSearch({
            fields: [
                "nome",
                "versao",
                "publisher",
            ],

            storeFields: [
                "id",
                "nome",
                "versao",
                "publisher",
                "flag",
                "quantidade_maquinas",
            ],
        });

        if (programas.data) {
            search.addAll(programas.data);
        }

        return search;

    }, [programas.data]);

    const programasFiltrados = useMemo(() => {

        const termo = pesquisa.toLowerCase().trim();

        if (!termo) {
            return programas.data ?? [];
        }

        const resultadosMiniSearch = miniSearch.search(termo, {
            prefix: true,
            fuzzy: 0.3,
        });

        const resultadosSubstring = (programas.data ?? []).filter((software) =>
            software.nome?.toLowerCase().includes(termo) ||
            software.versao?.toLowerCase().includes(termo) ||
            software.publisher?.toLowerCase().includes(termo)
        );

        const idsMiniSearch = new Set(
            resultadosMiniSearch.map((resultado) => resultado.id)
        );

        const resultadosSubstringFiltrados =
            resultadosSubstring.filter(
                (software) => !idsMiniSearch.has(software.id)
            );

        const resultadosMiniSearchMapeados =
            resultadosMiniSearch
                .map((resultado) =>
                    programas.data?.find(
                        (software) => software.id === resultado.id
                    )
                )
                .filter(
                    (software): software is NonNullable<typeof software> =>
                        software !== undefined
                );

        return [
            ...resultadosMiniSearchMapeados,
            ...resultadosSubstringFiltrados,
        ];

    }, [
        pesquisa,
        miniSearch,
        programas.data,
    ]);

    const itensPorPagina = 25;

    const totalItens =
        programasFiltrados.length;

    const totalPaginas =
        Math.ceil(
            totalItens / itensPorPagina
        );

    const inicio =
        (pagina - 1) * itensPorPagina;

    const fim =
        inicio + itensPorPagina;

    const programasPagina =
        programasFiltrados.slice(
            inicio,
            fim
        );

    /*
     * IMPORTANTE:
     * O useEffect precisa ficar ANTES
     * dos returns de loading/error.
     */
    useEffect(() => {
        if (!modalInfo) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setModalInfo(false);
                setProgramaSelecionado(null);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [modalInfo]);

    useEffect(() => {

        setPagina(1);

    }, [
        pesquisa,
        programasFiltrados.length,
    ]);

    const paginasVisiveis = () => {

        const paginas: (number | "...")[] = [];

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

    const colunas: Coluna[] = [
        {
            id: "nome",
            header: "Software",
            width: 300,
            align: "left",
        },
        {
            id: "versao",
            header: "Versão",
            width: 180,
            align: "center",
        },
        {
            id: "publisher",
            header: "Publisher",
            width: 250,
            align: "left",
        },
        {
            id: "quantidade_maquinas",
            header: "Máquinas",
            width: 150,
            align: "center",
        },
        {
            id: "flag",
            header: "Monitorado",
            width: 150,
            align: "center",
        },
    ] as const;

    if (programas.isPending) {

        return (
            <h1>
                Carregando softwares...
            </h1>
        );
    }

    if (programas.isError) {

        return (
            <h1>
                Erro ao carregar softwares
            </h1>
        );
    }

    return (
        <>
            {/* TABELA */}

            <motion.div
                animate={{
                    color: darkMode
                        ? "#fafafa"
                        : "#18181b",
                }}
                className="
                    w-full
                    overflow-x-auto
                    shadow-sm
                "
            >

                <motion.table
                    className="
                        w-full
                        min-w-max
                    "
                >

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
                                (coluna) => (

                                    <motion.th
                                        key={coluna.id}
                                        style={{
                                            width: coluna.width,
                                            textAlign: coluna.align,
                                        }}
                                        animate={{
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
                                        {coluna.header}
                                    </motion.th>

                                )
                            )}

                        </motion.tr>

                    </thead>

                    <tbody>

                        {programasPagina.map(
                            (linha) => (

                                <LinhaSoftware
                                    key={linha.id}
                                    linha={linha}
                                    colunas={colunas}
                                    darkMode={darkMode}
                                    aoClicar={() => {

                                        setProgramaSelecionado(
                                            linha.id
                                        );

                                        setModalInfo(true);

                                    }}
                                />

                            )
                        )}

                    </tbody>

                </motion.table>

            </motion.div>


            {/* PAGINAÇÃO */}

            {totalPaginas > 1 && (

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
                            setPagina(
                                (p) => p - 1
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
                                        setPagina(item)
                                    }
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
                        onClick={() =>
                            setPagina(
                                (p) => p + 1
                            )
                        }
                        disabled={
                            pagina === totalPaginas
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

            )}


            {/* MODAL DO SOFTWARE */}

            <AnimatePresence>
                {modalInfo && programaSelecionado !== null && (
                    <motion.div
                        key="modal-software"
                        className="
                fixed
                inset-0
                z-[1000]
                flex
                items-center
                justify-center
            "
                        animate={{ height: 'auto' }}
                    >
                        {/* OVERLAY */}
                        <motion.div
                            className="
                    absolute
                    inset-0
                    z-0
                    bg-black/40
                "
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => {
                                setModalInfo(false);
                                setProgramaSelecionado(null);
                            }}
                        />

                        {/* CONTEÚDO */}
                        <motion.div
                            className="
                    relative
                    z-10
                    w-full
                    max-w-5xl
                    max-h-[90vh]
                    overflow-y-hidden
                "
                            initial={{
                                opacity: 0,
                                scale: 0.95,
                                y: 20,
                                height: 0,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                                height: "auto",
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.95,
                                y: 20,
                                height: 0,
                            }}
                            transition={{
                                duration: 0.2,
                                ease: "easeInOut",
                            }}
                            onClick={(event) => {
                                event.stopPropagation();
                            }}
                        >
                            <UsuarioCompleto
                                programa_id={programaSelecionado}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </>
    );
}