import { motion, AnimatePresence } from 'motion/react';
import { useHeader } from '@/contextos/Header';
import { useInventario } from '@/contextos/Inventario';
import { useMemo, useState } from 'react';

interface Info {
    maquina_id?: string;
    programa_id?: number;
}

export default function UsuarioCompleto({
    maquina_id,
    programa_id,
}: Info) {
    const { darkMode } = useHeader();

    const {
        maquinas,
        programas,

        cpus,
        gpus,
        hds,
        rams,
        monitores,

        maquinasProgramas,

        alertas,
    } = useInventario();

    /*
    |--------------------------------------------------------------------------
    | ESTADO DA MÁQUINA SELECIONADA
    |--------------------------------------------------------------------------
    |
    | Se maquina_id vier diretamente:
    |   → começa diretamente nessa máquina.
    |
    | Se apenas programa_id vier:
    |   → começa com null e mostra a lista de máquinas.
    |
    */

    const [maquinaSelecionada, setMaquinaSelecionada] = useState<
        string | null
    >(maquina_id ?? null);

    /*
    |--------------------------------------------------------------------------
    | MÁQUINA ATUAL
    |--------------------------------------------------------------------------
    */

    const usuario = useMemo(() => {
        if (!maquinaSelecionada) return null;

        return (
            maquinas.data?.find(
                maquina => maquina.id === maquinaSelecionada
            ) ?? null
        );
    }, [maquinas.data, maquinaSelecionada]);

    /*
    |--------------------------------------------------------------------------
    | PROGRAMA ATUAL
    |--------------------------------------------------------------------------
    */

    const programa = useMemo(() => {
        if (programa_id === undefined) return null;

        return (
            programas.data?.find(
                programaAtual => programaAtual.id === programa_id
            ) ?? null
        );
    }, [programas.data, programa_id]);

    /*
    |--------------------------------------------------------------------------
    | MÁQUINAS DO PROGRAMA
    |--------------------------------------------------------------------------
    */

    const maquinasFiltradas = useMemo(() => {
        if (programa_id === undefined) return [];

        const idsMaquinas =
            maquinasProgramas.data
                ?.filter(
                    mp => mp.programa_id === programa_id
                )
                .map(
                    mp => mp.maquina_id
                ) ?? [];

        return (
            maquinas.data?.filter(
                maquina => idsMaquinas.includes(maquina.id)
            ) ?? []
        );
    }, [
        maquinas.data,
        maquinasProgramas.data,
        programa_id,
    ]);

    /*
    |--------------------------------------------------------------------------
    | HARDWARE DA MÁQUINA
    |--------------------------------------------------------------------------
    */

    const informacoesUnicas = useMemo(() => {
        if (!maquinaSelecionada) {
            return {
                cpu: null,
                gpus: [],
                hds: [],
                rams: [],
                monitores: [],
                alertas: [],
            };
        }

        return {
            cpu:
                cpus.data?.find(
                    cpu =>
                        cpu.maquina_id === maquinaSelecionada
                ) ?? null,

            gpus:
                gpus.data?.filter(
                    gpu =>
                        gpu.maquina_id === maquinaSelecionada
                ) ?? [],

            hds:
                hds.data?.filter(
                    hd =>
                        hd.maquina_id === maquinaSelecionada
                ) ?? [],

            rams:
                rams.data?.filter(
                    ram =>
                        ram.maquina_id === maquinaSelecionada
                ) ?? [],

            monitores:
                monitores.data?.filter(
                    monitor =>
                        monitor.maquina_id === maquinaSelecionada
                ) ?? [],

            alertas:
                alertas.data?.filter(
                    alerta =>
                        alerta.maquina_id === maquinaSelecionada
                ) ?? [],
        };
    }, [
        maquinaSelecionada,
        cpus.data,
        gpus.data,
        hds.data,
        rams.data,
        monitores.data,
        alertas.data,
    ]);

    /*
    |--------------------------------------------------------------------------
    | FUNÇÃO: ABRIR MÁQUINA
    |--------------------------------------------------------------------------
    */

    const abrirMaquina = (id: string) => {
        setMaquinaSelecionada(id);
    };

    /*
    |--------------------------------------------------------------------------
    | FUNÇÃO: VOLTAR PARA LISTA
    |--------------------------------------------------------------------------
    */

    const voltarMaquinas = () => {
        setMaquinaSelecionada(null);
    };

    /*
    |--------------------------------------------------------------------------
    | CORES
    |--------------------------------------------------------------------------
    |
    | Não usamos style nem transition-colors.
    |
    */

    const fundo = darkMode
        ? 'bg-zinc-950'
        : 'bg-white';

    const fundoSecundario = darkMode
        ? 'bg-zinc-900'
        : 'bg-zinc-50';

    const borda = darkMode
        ? 'border-zinc-800'
        : 'border-zinc-200';

    const texto = darkMode
        ? 'text-zinc-100'
        : 'text-zinc-900';

    const textoSecundario = darkMode
        ? 'text-zinc-400'
        : 'text-zinc-500';

    const textoTerciario = darkMode
        ? 'text-zinc-500'
        : 'text-zinc-400';

    /*
    |--------------------------------------------------------------------------
    | LOADING / DADOS
    |--------------------------------------------------------------------------
    */

    const carregando =
        maquinas.isLoading ||
        programas.isLoading ||
        maquinasProgramas.isLoading ||
        cpus.isLoading ||
        gpus.isLoading ||
        hds.isLoading ||
        rams.isLoading ||
        monitores.isLoading ||
        alertas.isLoading;

    /*
    |--------------------------------------------------------------------------
    | ERRO
    |--------------------------------------------------------------------------
    */

    if (
        maquinas.isError ||
        programas.isError ||
        maquinasProgramas.isError ||
        cpus.isError ||
        gpus.isError ||
        hds.isError ||
        rams.isError ||
        monitores.isError ||
        alertas.isError
    ) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1, height: "auto", }}
                className={`rounded-2xl border ${borda} ${fundo} p-8`}
            >
                <div className="flex flex-col items-center justify-center gap-3 text-center">
                    <div className="text-4xl">
                        ⚠️
                    </div>

                    <h2
                        className={`text-lg font-semibold ${texto}`}
                    >
                        Erro ao carregar inventário
                    </h2>

                    <p
                        className={`text-sm ${textoSecundario}`}
                    >
                        Não foi possível carregar as informações
                        da máquina.
                    </p>
                </div>
            </motion.div>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | LOADING
    |--------------------------------------------------------------------------
    */

    if (carregando) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`rounded-2xl border ${borda} ${fundo} p-8`}
            >
                <div className="flex flex-col items-center justify-center gap-4">
                    <motion.div
                        animate={{
                            rotate: 360,
                            height: "auto",
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                        className={`h-8 w-8 rounded-full border-2 ${darkMode
                            ? 'border-zinc-700 border-t-white'
                            : 'border-zinc-200 border-t-zinc-900'
                            }`}
                    />

                    <p
                        className={`text-sm ${textoSecundario}`}
                    >
                        Carregando inventário...
                    </p>
                </div>
            </motion.div>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | COMPONENTE: CARD DE INFORMAÇÃO
    |--------------------------------------------------------------------------
    */

    const CardInfo = ({
        titulo,
        valor,
    }: {
        titulo: string;
        valor: React.ReactNode;
    }) => {
        return (
            <motion.div
                initial={{
                    opacity: 0,
                    y: 8,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                    height: "auto",
                }}
                className={`rounded-xl border ${borda} ${fundoSecundario} p-4`}
            >
                <p
                    className={`mb-1 text-xs font-medium uppercase tracking-wide ${textoTerciario}`}
                >
                    {titulo}
                </p>

                <p
                    className={`break-words text-sm font-medium ${texto}`}
                >
                    {valor ?? '-'}
                </p>
            </motion.div>
        );
    };

    /*
    |--------------------------------------------------------------------------
    | HARDWARE
    |--------------------------------------------------------------------------
    */

    const Hardware = () => {
        if (!usuario) {
            return (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, height: "auto", }}
                    className={`rounded-xl border ${borda} ${fundoSecundario} p-6 text-center`}
                >
                    <p className={textoSecundario}>
                        Máquina não encontrada.
                    </p>
                </motion.div>
            );
        }

        return (
            <motion.div
                initial={{
                    opacity: 0,
                    x: 20,
                }}
                animate={{
                    opacity: 1,
                    x: 0,
                    height: "auto",
                }}
            >
                {/* CABEÇALHO DA MÁQUINA */}

                <div className="mb-6 flex items-center justify-between gap-4">
                    <div>
                        <h2
                            className={`text-xl font-bold ${texto}`}
                        >
                            {usuario.nome_computador}
                        </h2>

                        <p
                            className={`mt-1 text-sm ${textoSecundario}`}
                        >
                            {usuario.usuario_atual ||
                                'Usuário não informado'}
                        </p>
                    </div>
                </div>

                {/* INFORMAÇÕES DA MÁQUINA */}

                <section className="mb-6">
                    <h3
                        className={`mb-3 text-sm font-semibold ${texto}`}
                    >
                        Informações da máquina
                    </h3>

                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                        <CardInfo
                            titulo="Computador"
                            valor={usuario.nome_computador}
                        />

                        <CardInfo
                            titulo="Usuário"
                            valor={usuario.usuario_atual}
                        />

                        <CardInfo
                            titulo="Fabricante"
                            valor={usuario.fabricante}
                        />

                        <CardInfo
                            titulo="Modelo"
                            valor={usuario.modelo}
                        />

                        <CardInfo
                            titulo="Domínio"
                            valor={usuario.dominio}
                        />

                        <CardInfo
                            titulo="Sistema operacional"
                            valor={usuario.sistema_operacional}
                        />

                        <CardInfo
                            titulo="Versão SO"
                            valor={usuario.versao_so}
                        />

                        <CardInfo
                            titulo="Arquitetura"
                            valor={usuario.arquitetura}
                        />

                        <CardInfo
                            titulo="IP interno"
                            valor={usuario.ip_interno}
                        />

                        <CardInfo
                            titulo="IP público"
                            valor={usuario.ip_publico}
                        />

                        <CardInfo
                            titulo="Placa-mãe"
                            valor={
                                usuario.placa_mae_fabricante
                            }
                        />

                        <CardInfo
                            titulo="Modelo placa-mãe"
                            valor={
                                usuario.placa_mae_produto
                            }
                        />
                    </div>
                </section>

                {/* CPU */}

                <section className="mb-6">
                    <h3
                        className={`mb-3 text-sm font-semibold ${texto}`}
                    >
                        Processador
                    </h3>

                    {informacoesUnicas.cpu ? (
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                            {Object.entries(
                                informacoesUnicas.cpu
                            )
                                .filter(
                                    ([chave]) =>
                                        chave !== 'maquina_id'
                                )
                                .map(([chave, valor]) => (
                                    <CardInfo
                                        key={chave}
                                        titulo={chave.replaceAll(
                                            '_',
                                            ' '
                                        )}
                                        valor={
                                            valor === null ||
                                                valor === undefined
                                                ? '-'
                                                : String(valor)
                                        }
                                    />
                                ))}
                        </div>
                    ) : (
                        <p
                            className={`text-sm ${textoSecundario}`}
                        >
                            Nenhum processador encontrado.
                        </p>
                    )}
                </section>

                {/* GPUs */}

                <section className="mb-6">
                    <h3
                        className={`mb-3 text-sm font-semibold ${texto}`}
                    >
                        Placas de vídeo
                    </h3>

                    {informacoesUnicas.gpus.length > 0 ? (
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                            {informacoesUnicas.gpus.map(
                                (gpu, index) => (
                                    <motion.div
                                        key={
                                            'id' in gpu &&
                                                gpu.id
                                                ? String(gpu.id)
                                                : index
                                        }
                                        initial={{
                                            opacity: 0,
                                            y: 8,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        className={`rounded-xl border ${borda} ${fundoSecundario} p-4`}
                                    >
                                        <p
                                            className={`mb-3 text-xs font-semibold uppercase ${textoTerciario}`}
                                        >
                                            GPU {index + 1}
                                        </p>

                                        <div className="grid grid-cols-1 gap-2">
                                            {Object.entries(
                                                gpu
                                            )
                                                .filter(
                                                    ([chave]) =>
                                                        chave !==
                                                        'maquina_id'
                                                )
                                                .map(
                                                    ([
                                                        chave,
                                                        valor,
                                                    ]) => (
                                                        <div
                                                            key={
                                                                chave
                                                            }
                                                            className="flex justify-between gap-4"
                                                        >
                                                            <span
                                                                className={`text-sm capitalize ${textoSecundario}`}
                                                            >
                                                                {chave.replaceAll(
                                                                    '_',
                                                                    ' '
                                                                )}
                                                            </span>

                                                            <span
                                                                className={`text-right text-sm font-medium ${texto}`}
                                                            >
                                                                {valor ===
                                                                    null ||
                                                                    valor ===
                                                                    undefined
                                                                    ? '-'
                                                                    : String(
                                                                        valor
                                                                    )}
                                                            </span>
                                                        </div>
                                                    )
                                                )}
                                        </div>
                                    </motion.div>
                                )
                            )}
                        </div>
                    ) : (
                        <p
                            className={`text-sm ${textoSecundario}`}
                        >
                            Nenhuma placa de vídeo encontrada.
                        </p>
                    )}
                </section>

                {/* HDs */}

                <section className="mb-6">
                    <h3
                        className={`mb-3 text-sm font-semibold ${texto}`}
                    >
                        Armazenamento
                    </h3>

                    {informacoesUnicas.hds.length > 0 ? (
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                            {informacoesUnicas.hds.map(
                                (hd, index) => (
                                    <motion.div
                                        key={
                                            'id' in hd && hd.id
                                                ? String(hd.id)
                                                : index
                                        }
                                        initial={{
                                            opacity: 0,
                                            y: 8,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        className={`rounded-xl border ${borda} ${fundoSecundario} p-4`}
                                    >
                                        <p
                                            className={`mb-3 text-xs font-semibold uppercase ${textoTerciario}`}
                                        >
                                            Disco {index + 1}
                                        </p>

                                        <div className="space-y-2">
                                            {Object.entries(
                                                hd
                                            )
                                                .filter(
                                                    ([chave]) =>
                                                        chave !==
                                                        'maquina_id'
                                                )
                                                .map(
                                                    ([
                                                        chave,
                                                        valor,
                                                    ]) => (
                                                        <div
                                                            key={
                                                                chave
                                                            }
                                                            className="flex justify-between gap-4"
                                                        >
                                                            <span
                                                                className={`text-sm capitalize ${textoSecundario}`}
                                                            >
                                                                {chave.replaceAll(
                                                                    '_',
                                                                    ' '
                                                                )}
                                                            </span>

                                                            <span
                                                                className={`text-right text-sm font-medium ${texto}`}
                                                            >
                                                                {valor ===
                                                                    null ||
                                                                    valor ===
                                                                    undefined
                                                                    ? '-'
                                                                    : String(
                                                                        valor
                                                                    )}
                                                            </span>
                                                        </div>
                                                    )
                                                )}
                                        </div>
                                    </motion.div>
                                )
                            )}
                        </div>
                    ) : (
                        <p
                            className={`text-sm ${textoSecundario}`}
                        >
                            Nenhum disco encontrado.
                        </p>
                    )}
                </section>

                {/* RAM */}

                <section className="mb-6">
                    <h3
                        className={`mb-3 text-sm font-semibold ${texto}`}
                    >
                        Memória RAM
                    </h3>

                    {informacoesUnicas.rams.length > 0 ? (
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                            {informacoesUnicas.rams.map(
                                (ram, index) => (
                                    <motion.div
                                        key={
                                            'id' in ram && ram.id
                                                ? String(ram.id)
                                                : index
                                        }
                                        initial={{
                                            opacity: 0,
                                            y: 8,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        className={`rounded-xl border ${borda} ${fundoSecundario} p-4`}
                                    >
                                        <p
                                            className={`mb-3 text-xs font-semibold uppercase ${textoTerciario}`}
                                        >
                                            Memória {index + 1}
                                        </p>

                                        <div className="space-y-2">
                                            {Object.entries(
                                                ram
                                            )
                                                .filter(
                                                    ([chave]) =>
                                                        chave !==
                                                        'maquina_id'
                                                )
                                                .map(
                                                    ([
                                                        chave,
                                                        valor,
                                                    ]) => (
                                                        <div
                                                            key={
                                                                chave
                                                            }
                                                            className="flex justify-between gap-4"
                                                        >
                                                            <span
                                                                className={`text-sm capitalize ${textoSecundario}`}
                                                            >
                                                                {chave.replaceAll(
                                                                    '_',
                                                                    ' '
                                                                )}
                                                            </span>

                                                            <span
                                                                className={`text-right text-sm font-medium ${texto}`}
                                                            >
                                                                {valor ===
                                                                    null ||
                                                                    valor ===
                                                                    undefined
                                                                    ? '-'
                                                                    : String(
                                                                        valor
                                                                    )}
                                                            </span>
                                                        </div>
                                                    )
                                                )}
                                        </div>
                                    </motion.div>
                                )
                            )}
                        </div>
                    ) : (
                        <p
                            className={`text-sm ${textoSecundario}`}
                        >
                            Nenhuma memória RAM encontrada.
                        </p>
                    )}
                </section>

                {/* MONITORES */}

                <section className="mb-6">
                    <h3
                        className={`mb-3 text-sm font-semibold ${texto}`}
                    >
                        Monitores
                    </h3>

                    {informacoesUnicas.monitores.length > 0 ? (
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                            {informacoesUnicas.monitores.map(
                                (monitor, index) => (
                                    <motion.div
                                        key={
                                            'id' in monitor &&
                                                monitor.id
                                                ? String(
                                                    monitor.id
                                                )
                                                : index
                                        }
                                        initial={{
                                            opacity: 0,
                                            y: 8,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        className={`rounded-xl border ${borda} ${fundoSecundario} p-4`}
                                    >
                                        <p
                                            className={`mb-3 text-xs font-semibold uppercase ${textoTerciario}`}
                                        >
                                            Monitor {index + 1}
                                        </p>

                                        <div className="space-y-2">
                                            {Object.entries(
                                                monitor
                                            )
                                                .filter(
                                                    ([chave]) =>
                                                        chave !==
                                                        'maquina_id'
                                                )
                                                .map(
                                                    ([
                                                        chave,
                                                        valor,
                                                    ]) => (
                                                        <div
                                                            key={
                                                                chave
                                                            }
                                                            className="flex justify-between gap-4"
                                                        >
                                                            <span
                                                                className={`text-sm capitalize ${textoSecundario}`}
                                                            >
                                                                {chave.replaceAll(
                                                                    '_',
                                                                    ' '
                                                                )}
                                                            </span>

                                                            <span
                                                                className={`text-right text-sm font-medium ${texto}`}
                                                            >
                                                                {valor ===
                                                                    null ||
                                                                    valor ===
                                                                    undefined
                                                                    ? '-'
                                                                    : String(
                                                                        valor
                                                                    )}
                                                            </span>
                                                        </div>
                                                    )
                                                )}
                                        </div>
                                    </motion.div>
                                )
                            )}
                        </div>
                    ) : (
                        <p
                            className={`text-sm ${textoSecundario}`}
                        >
                            Nenhum monitor encontrado.
                        </p>
                    )}
                </section>

                {/* ALERTAS */}

                <section>
                    <h3
                        className={`mb-3 text-sm font-semibold ${texto}`}
                    >
                        Alertas de software
                    </h3>

                    {informacoesUnicas.alertas.length > 0 ? (
                        <div className="space-y-2">
                            {informacoesUnicas.alertas.map(
                                (alerta, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{
                                            opacity: 0,
                                            y: 8,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        className={`rounded-xl border ${borda} ${fundoSecundario} p-4`}
                                    >
                                        <div className="flex items-center justify-between gap-4">
                                            <div>
                                                <p
                                                    className={`font-medium ${texto}`}
                                                >
                                                    {
                                                        alerta.nome_programa
                                                    }
                                                </p>

                                                <p
                                                    className={`mt-1 text-sm ${textoSecundario}`}
                                                >
                                                    Programa ID:{' '}
                                                    {
                                                        alerta.programa_id
                                                    }
                                                </p>
                                            </div>

                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${alerta.permitiu
                                                    ? darkMode
                                                        ? 'bg-green-950 text-green-400'
                                                        : 'bg-green-100 text-green-700'
                                                    : darkMode
                                                        ? 'bg-red-950 text-red-400'
                                                        : 'bg-red-100 text-red-700'
                                                    }`}
                                            >
                                                {alerta.permitiu
                                                    ? 'Permitido'
                                                    : 'Bloqueado'}
                                            </span>
                                        </div>
                                    </motion.div>
                                )
                            )}
                        </div>
                    ) : (
                        <p
                            className={`text-sm ${textoSecundario}`}
                        >
                            Nenhum alerta encontrado.
                        </p>
                    )}
                </section>
            </motion.div>
        );
    };

    /*
    |--------------------------------------------------------------------------
    | LISTA DE MÁQUINAS
    |--------------------------------------------------------------------------
    */

    const ListaMaquinas = () => {
        return (
            <motion.div
                initial={{
                    opacity: 0,
                    x: -20,
                }}
                animate={{
                    opacity: 1,
                    x: 0,
                    height: 'auto',
                }}
            >
                <div className="mb-6">
                    <h2
                        className={`text-xl font-bold ${texto}`}
                    >
                        Máquinas
                    </h2>

                    <p
                        className={`mt-1 text-sm ${textoSecundario}`}
                    >
                        {programa
                            ? `Máquinas que possuem ${programa.nome}`
                            : 'Máquinas encontradas'}
                    </p>
                </div>

                {maquinasFiltradas.length === 0 ? (
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.97,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            height: 'auto',
                        }}
                        className={`rounded-xl border ${borda} ${fundoSecundario} p-8 text-center`}
                    >
                        <p
                            className={`text-sm ${textoSecundario}`}
                        >
                            Nenhuma máquina encontrada para este
                            programa.
                        </p>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        {maquinasFiltradas.map(
                            (maquina, index) => (
                                <motion.button
                                    key={maquina.id}
                                    initial={{
                                        opacity: 0,
                                        y: 10,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    transition={{
                                        delay: index * 0.04,
                                    }}
                                    whileHover={{
                                        scale: 1.015,
                                    }}
                                    whileTap={{
                                        scale: 0.985,
                                    }}
                                    onClick={() =>
                                        abrirMaquina(
                                            maquina.id
                                        )
                                    }
                                    className={`w-full rounded-xl border ${borda} ${fundoSecundario} p-4 text-left`}
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="min-w-0">
                                            <p
                                                className={`truncate font-semibold ${texto}`}
                                            >
                                                {
                                                    maquina.nome_computador
                                                }
                                            </p>

                                            <p
                                                className={`mt-1 truncate text-sm ${textoSecundario}`}
                                            >
                                                {
                                                    maquina.usuario_atual
                                                }
                                            </p>

                                            <p
                                                className={`mt-1 text-xs ${textoTerciario}`}
                                            >
                                                {
                                                    maquina.fabricante
                                                }{' '}
                                                {
                                                    maquina.modelo
                                                }
                                            </p>
                                        </div>

                                        <motion.span
                                            animate={{
                                                x: [0, 3, 0],
                                            }}
                                            transition={{
                                                duration: 1.5,
                                                repeat: Infinity,
                                                repeatDelay: 3,
                                            }}
                                            className={`text-lg ${textoSecundario}`}
                                        >
                                            →
                                        </motion.span>
                                    </div>
                                </motion.button>
                            )
                        )}
                    </div>
                )}
            </motion.div>
        );
    };

    /*
    |--------------------------------------------------------------------------
    | MODAL
    |--------------------------------------------------------------------------
    */

    /*
     * Se nenhum ID foi enviado, não renderiza nada.
     */
    if (
        maquina_id === undefined &&
        programa_id === undefined
    ) {
        return null;
    }

    return (
        <motion.div
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
                height: 'auto',
            }}
            className=" flex items-center justify-center p-4"
        >



            {/* MODAL */}

            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0.94,
                    y: 20,
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    height: "auto",
                }}
                className={`relative flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border ${borda} ${fundo}`}
            >
                {/* HEADER */}

                <div
                    className={`flex shrink-0 items-center justify-between border-b ${borda} px-6 py-4`}
                >
                    <div>
                        <h1
                            className={`text-lg font-bold ${texto}`}
                        >
                            {maquinaSelecionada
                                ? 'Informações da máquina'
                                : programa
                                    ? `Software: ${programa.nome}`
                                    : 'Inventário'}
                        </h1>

                        {maquinaSelecionada &&
                            usuario && (
                                <p
                                    className={`mt-1 text-xs ${textoSecundario}`}
                                >
                                    {
                                        usuario.nome_computador
                                    }
                                </p>
                            )}
                    </div>

                    {/* Só aparece quando estamos vendo uma máquina
                        que veio de uma lista de programa */}

                    {programa_id !== undefined &&
                        maquinaSelecionada && (
                            <motion.button
                                whileHover={{
                                    scale: 1.05,
                                }}
                                whileTap={{
                                    scale: 0.95,
                                }}
                                onClick={voltarMaquinas}
                                className={`mr-2 rounded-lg border ${borda} px-3 py-2 text-sm ${texto} ${fundoSecundario}`}
                            >
                                ← Máquinas
                            </motion.button>
                        )}
                </div>

                {/* CONTEÚDO */}

                <motion.div
                    animate={{ height: 'auto' }}
                    className="min-h-0 flex-1 overflow-y-auto p-6">
                    <AnimatePresence mode="wait">
                        {maquinaSelecionada ? (
                            <motion.div
                                key="hardware"
                                initial={{
                                    opacity: 0,
                                    x: 20,
                                }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    x: -20,
                                }}
                                
                            >
                                <Hardware />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="maquinas"
                                initial={{
                                    opacity: 0,
                                    x: -20,
                                }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    x: 20,
                                }}
                            >
                                <ListaMaquinas />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </motion.div >
    );
}