'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Settings, Folder, Table2, GitBranch, X, Plus, Trash2, ChevronRight, Pencil } from 'lucide-react';
import { useHeader } from '@/contextos/Header';

import {
    type Modo,
    type TipoGerenciamento,
    type Categoria,
    type Tabela,
    type Relacao,
    useCategorias,
    useTabelas,
    useTabelasCategoria,
    useRelacoes,
    useTodasRelacoes,
    useMutacoesDocumentacao,
    useSincronizacaoRealtime
} from '@/contextos/Documentacao';


function useTema() {
    const { darkMode } = useHeader();
    return {
        darkMode,
        bg: darkMode ? '#18181B' : '#f7f7f9',
        border: darkMode ? '#2f2f3e' : '#9090ffbb',
        text: darkMode ? '#e8e8ea' : '#0f172a',
        inputBg: darkMode ? '#1c1c21' : '#F9F9F7',
        placeholderColor: darkMode ? '#71717a' : '#9ca3af',
        primary: '#2306fc',
    };
}

function BarraPesquisa({ onPesquisa }: { onPesquisa: (termo: string) => void }) {
    const tema = useTema();
    const [termoLocal, setTermoLocal] = useState('');

    useEffect(() => {
        const handler = setTimeout(() => onPesquisa(termoLocal), 300);
        return () => clearTimeout(handler);
    }, [termoLocal, onPesquisa]);

    return (
        <motion.div className="relative w-full max-w-200 mt-5">
            <motion.input
                type="text"
                value={termoLocal}
                onChange={(e) => setTermoLocal(e.target.value)}
                placeholder="Pesquisar por tabela, vínculo, etc..."
                className="w-full py-3 pl-12 pr-4 text-sm border outline-none rounded-sm"
                animate={{ background: tema.inputBg, borderColor: tema.border, color: tema.text }}
                onFocus={(e) => (e.currentTarget.style.borderColor = tema.primary)}
                onBlur={(e) => (e.currentTarget.style.borderColor = tema.border)}
            />
            <motion.div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" animate={{ color: tema.placeholderColor }}>
                <Search size={25} />
            </motion.div>
        </motion.div>
    );
}

function CardNavegacao({ titulo, descricao, icone, ativo, onClick }: { titulo: string; descricao: string; icone: React.ReactNode; ativo: boolean; onClick: () => void; }) {
    const tema = useTema();
    return (
        <motion.button type="button" onClick={onClick} animate={{ backgroundColor: ativo ? (tema.darkMode ? '#20202a' : '#eeeeff') : tema.inputBg, borderColor: ativo ? tema.primary : tema.border }} className="text-left border rounded-xl p-5 cursor-pointer">
            <motion.div animate={{ color: ativo ? tema.primary : tema.placeholderColor }} className="mb-4">{icone}</motion.div>
            <motion.h3 animate={{ color: tema.text }} className="text-lg font-semibold">{titulo}</motion.h3>
            <motion.p animate={{ color: tema.placeholderColor }} className="text-sm mt-2 leading-5">{descricao}</motion.p>
        </motion.button>
    );
}

function CardTabela({ tabela, tabelaSelecionada, selecionarTabela }: { tabela: Tabela; tabelaSelecionada: string | null; selecionarTabela: (id: string) => void; }) {
    const tema = useTema();
    const selecionada = tabelaSelecionada === tabela.tabela_id;
    return (
        <motion.div animate={{ backgroundColor: tema.inputBg, borderColor: selecionada ? tema.primary : tema.border }} className="border rounded-xl p-5 w-full cursor-pointer">
            <div className="flex items-start justify-between gap-4">
                <button type="button" onClick={() => selecionarTabela(tabela.tabela_id)} className="text-left flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <motion.h3 animate={{ color: tema.text }} className="text-xl font-semibold break-all">{tabela.nome}</motion.h3>
                        <ChevronRight size={18} style={{ color: tema.placeholderColor }} />
                    </div>
                    <motion.p animate={{ color: tema.placeholderColor }} className="text-sm mt-3 leading-6">{tabela.descricao || 'Sem descrição.'}</motion.p>
                </button>
            </div>
        </motion.div>
    );
}

function SessaoRelacoes({ tabelaSelecionada, carregandoRelacoes, relacoes, handleExcluirRelacao }: { tabelaSelecionada: string | null; carregandoRelacoes: boolean; relacoes: Relacao[]; handleExcluirRelacao: (id: string) => void; }) {
    const tema = useTema();
    if (!tabelaSelecionada) return null;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-10">
            <div className="flex items-center gap-3">
                <GitBranch size={23} style={{ color: tema.primary }} />
                <motion.h3 animate={{ color: tema.text }} className="text-2xl font-semibold">Relacionamentos</motion.h3>
            </div>

            {carregandoRelacoes ? (
                <motion.p animate={{ color: tema.placeholderColor }} className="mt-5 text-sm">Carregando relacionamentos...</motion.p>
            ) : relacoes.length === 0 ? (
                <motion.div animate={{ backgroundColor: tema.inputBg, borderColor: tema.border }} className="border rounded-xl p-5 mt-5">
                    <p style={{ color: tema.placeholderColor }}>Esta tabela não possui relacionamentos documentados.</p>
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 gap-3 mt-5">
                    {relacoes.map((relacao) => {
                        const tabelaAtual = relacao.tabela_1 === tabelaSelecionada ? relacao.tabela_1_dados : relacao.tabela_2_dados;
                        const outraTabela = relacao.tabela_1 === tabelaSelecionada ? relacao.tabela_2_dados : relacao.tabela_1_dados;

                        return (
                            <motion.div key={relacao.relacoes_id} animate={{ backgroundColor: tema.inputBg, borderColor: tema.border }} className="border rounded-xl p-5">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-4 flex-wrap">
                                        <motion.div animate={{ color: tema.text }} className="font-semibold">{tabelaAtual?.nome ?? 'Tabela'}</motion.div>
                                        <ChevronRight size={18} style={{ color: tema.placeholderColor }} />
                                        <motion.div animate={{ color: tema.text }} className="font-semibold">{outraTabela?.nome ?? 'Tabela'}</motion.div>
                                    </div>
                                    <motion.button type="button" onClick={() => handleExcluirRelacao(relacao.relacoes_id)} style={{ color: '#ef4444' }} className="cursor-pointer">
                                        <Trash2 size={17} />
                                    </motion.button>
                                </div>
                                <motion.p animate={{ color: tema.placeholderColor }} className="text-sm mt-3 leading-6">{relacao.descricao || 'Sem descrição.'}</motion.p>
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </motion.div>
    );
}


function ModalGerenciar({ aberto, fechar, tipoGerenciamento, setTipoGerenciamento, categorias, tabelas, todasRelacoes, handleExcluirCategoria, handleExcluirTabela, handleExcluirRelacao }: any) {
    const tema = useTema();
    const { salvarCategoria, salvarTabela, salvarRelacao } = useMutacoesDocumentacao();

    const [editandoId, setEditandoId] = useState<string | null>(null);
    const [nomeCategoria, setNomeCategoria] = useState('');
    const [nomeTabela, setNomeTabela] = useState('');
    const [descricaoTabela, setDescricaoTabela] = useState('');
    const [categoriasTabela, setCategoriasTabela] = useState<string[]>([]);
    const [tabelaRelacao1, setTabelaRelacao1] = useState('');
    const [tabelaRelacao2, setTabelaRelacao2] = useState('');
    const [descricaoRelacao, setDescricaoRelacao] = useState('');
    const [mensagemErro, setMensagemErro] = useState('');

    const salvando = salvarCategoria.isPending || salvarTabela.isPending || salvarRelacao.isPending;

    function cancelarEdicao() {
        setEditandoId(null);
        setNomeCategoria('');
        setNomeTabela('');
        setDescricaoTabela('');
        setCategoriasTabela([]);
        setTabelaRelacao1('');
        setTabelaRelacao2('');
        setDescricaoRelacao('');
        setMensagemErro('');
    }

    useEffect(() => {
        if (!aberto) cancelarEdicao();
    }, [aberto]);

    function fecharModalLocal() { if (!salvando) fechar(); }
    function alternarTab(tipo: TipoGerenciamento) { setTipoGerenciamento(tipo); cancelarEdicao(); }

    function alternarCategoriaTabela(id: string) {
        setCategoriasTabela((atual) => atual.includes(id) ? atual.filter((item) => item !== id) : [...atual, id]);
    }

    async function submitCategoria() {
        if (!nomeCategoria.trim()) return setMensagemErro('Informe o nome da categoria.');
        try {
            setMensagemErro('');
            await salvarCategoria.mutateAsync({ id: editandoId, nome: nomeCategoria.trim() });
            cancelarEdicao();
        } catch (error) { setMensagemErro('Não foi possível salvar a categoria.'); }
    }

    async function submitTabela() {
        if (!nomeTabela.trim()) return setMensagemErro('Informe o nome da tabela.');
        try {
            setMensagemErro('');
            await salvarTabela.mutateAsync({ id: editandoId, nome: nomeTabela.trim(), descricao: descricaoTabela.trim(), categorias: categoriasTabela });
            cancelarEdicao();
        } catch (error) { setMensagemErro('Não foi possível salvar a tabela.'); }
    }

    async function submitRelacao() {
        if (!tabelaRelacao1 || !tabelaRelacao2) return setMensagemErro('Selecione ambas as tabelas.');
        if (tabelaRelacao1 === tabelaRelacao2) return setMensagemErro('As tabelas precisam ser diferentes.');
        if (!descricaoRelacao.trim()) return setMensagemErro('Informe a descrição.');
        try {
            setMensagemErro('');
            await salvarRelacao.mutateAsync({ id: editandoId, tab1: tabelaRelacao1, tab2: tabelaRelacao2, desc: descricaoRelacao.trim() });
            cancelarEdicao();
        } catch (error) { setMensagemErro('Não foi possível salvar a relação.'); }
    }

    return (
        <AnimatePresence>
            {aberto && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center px-5 py-8" style={{ background: 'rgba(0, 0, 0, 0.60)' }} onClick={fecharModalLocal}>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-3xl max-h-[90vh] overflow-y-auto border rounded-2xl p-6 shadow-2xl" style={{ backgroundColor: tema.inputBg, borderColor: tema.border }}>

                        <div className="flex items-start justify-between">
                            <div>
                                <motion.h2 animate={{ color: tema.text }} className="text-2xl font-semibold">Gerenciar documentação</motion.h2>
                                <motion.p animate={{ color: tema.placeholderColor }} className="text-sm mt-2">Crie, edite e remova categorias, tabelas e relacionamentos.</motion.p>
                            </div>
                            <motion.button type="button" onClick={fecharModalLocal} style={{ color: tema.placeholderColor }} className="cursor-pointer"><X size={22} /></motion.button>
                        </div>

                        {/* NAVEGAÇÃO INTERNA DO MODAL */}
                        <div className="grid grid-cols-3 gap-3 mt-7">
                            <motion.button type="button" onClick={() => alternarTab('categoria')} animate={{ backgroundColor: tipoGerenciamento === 'categoria' ? (tema.darkMode ? '#252530' : '#eeeeff') : 'transparent', borderColor: tipoGerenciamento === 'categoria' ? tema.primary : tema.border }} className="border rounded-xl p-4 text-left cursor-pointer">
                                <Folder size={20} style={{ color: tema.primary }} />
                                <h3 style={{ color: tema.text }} className="font-semibold mt-3">Categorias</h3>
                            </motion.button>
                            <motion.button type="button" onClick={() => alternarTab('tabela')} animate={{ backgroundColor: tipoGerenciamento === 'tabela' ? (tema.darkMode ? '#252530' : '#eeeeff') : 'transparent', borderColor: tipoGerenciamento === 'tabela' ? tema.primary : tema.border }} className="border rounded-xl p-4 text-left cursor-pointer">
                                <Table2 size={20} style={{ color: tema.primary }} />
                                <h3 style={{ color: tema.text }} className="font-semibold mt-3">Tabelas</h3>
                            </motion.button>
                            <motion.button type="button" onClick={() => alternarTab('relacao')} animate={{ backgroundColor: tipoGerenciamento === 'relacao' ? (tema.darkMode ? '#252530' : '#eeeeff') : 'transparent', borderColor: tipoGerenciamento === 'relacao' ? tema.primary : tema.border }} className="border rounded-xl p-4 text-left cursor-pointer">
                                <GitBranch size={20} style={{ color: tema.primary }} />
                                <h3 style={{ color: tema.text }} className="font-semibold mt-3">Relações</h3>
                            </motion.button>
                        </div>

                        {/* CONTEÚDOS */}
                        <div className="mt-7">

                            {/* CATEGORIA */}
                            {tipoGerenciamento === 'categoria' && (
                                <div>
                                    <motion.h3 animate={{ color: tema.text }} className="text-lg font-semibold">{editandoId ? 'Editando categoria' : 'Nova categoria'}</motion.h3>
                                    <motion.input value={nomeCategoria} onChange={(e) => setNomeCategoria(e.target.value)} placeholder="Nome da categoria" className="w-full mt-5 px-4 py-3 border rounded-lg outline-none text-sm" animate={{ backgroundColor: tema.bg, borderColor: tema.border, color: tema.text }} onFocus={(e) => (e.currentTarget.style.borderColor = tema.primary)} onBlur={(e) => (e.currentTarget.style.borderColor = tema.border)} />
                                    <div className="flex gap-3 mt-4">
                                        <motion.button type="button" disabled={salvando} onClick={submitCategoria} animate={{ backgroundColor: tema.primary, color: '#fff' }} className="px-5 py-3 rounded-lg text-sm font-medium flex items-center gap-2 disabled:opacity-50 cursor-pointer">
                                            <Plus size={18} /> {salvando ? 'Salvando...' : editandoId ? 'Salvar alterações' : 'Criar categoria'}
                                        </motion.button>
                                        {editandoId && <motion.button type="button" onClick={cancelarEdicao} animate={{ backgroundColor: tema.bg, color: tema.text, borderColor: tema.border }} className="px-5 py-3 border rounded-lg text-sm font-medium cursor-pointer">Cancelar</motion.button>}
                                    </div>
                                    <div className="h-px my-7" style={{ backgroundColor: tema.border }} />
                                    <div className="space-y-2 mt-3">
                                        {categorias.map((cat: Categoria) => (
                                            <motion.div key={cat.id} animate={{ backgroundColor: tema.bg, borderColor: tema.border }} className="border rounded-lg px-4 py-3 flex items-center justify-between">
                                                <span style={{ color: tema.text }} className="text-sm">{cat.categoria}</span>
                                                <div className="flex gap-3">
                                                    <button type="button" onClick={() => { cancelarEdicao(); setEditandoId(cat.id); setNomeCategoria(cat.categoria); }} style={{ color: tema.primary }}><Pencil size={17} /></button>
                                                    <button type="button" onClick={() => handleExcluirCategoria(cat)} style={{ color: '#ef4444' }}><Trash2 size={17} /></button>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* TABELA */}
                            {tipoGerenciamento === 'tabela' && (
                                <div>
                                    <motion.h3 animate={{ color: tema.text }} className="text-lg font-semibold">{editandoId ? 'Editando tabela' : 'Nova tabela'}</motion.h3>
                                    <motion.input value={nomeTabela} onChange={(e) => setNomeTabela(e.target.value)} placeholder="Nome da tabela" className="w-full mt-5 px-4 py-3 border rounded-lg outline-none text-sm" animate={{ backgroundColor: tema.bg, borderColor: tema.border, color: tema.text }} />
                                    <motion.textarea value={descricaoTabela} onChange={(e) => setDescricaoTabela(e.target.value)} placeholder="Descrição da tabela" rows={4} className="w-full mt-3 px-4 py-3 border rounded-lg outline-none text-sm resize-none" animate={{ backgroundColor: tema.bg, borderColor: tema.border, color: tema.text }} />

                                    <div className="mt-5">
                                        <motion.h4 animate={{ color: tema.text }} className="text-sm font-semibold">Categorias associadas</motion.h4>
                                        <div className="grid grid-cols-2 gap-2 mt-3">
                                            {categorias.map((cat: Categoria) => {
                                                const selecionada = categoriasTabela.includes(cat.id);
                                                return (
                                                    <motion.button type="button" key={cat.id} onClick={() => alternarCategoriaTabela(cat.id)} animate={{ backgroundColor: selecionada ? tema.primary : tema.bg, borderColor: selecionada ? tema.primary : tema.border, color: selecionada ? '#fff' : tema.text }} className="border rounded-lg px-3 py-2 text-left text-sm cursor-pointer">{cat.categoria}</motion.button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div className="flex gap-3 mt-5">
                                        <motion.button type="button" disabled={salvando} onClick={submitTabela} animate={{ backgroundColor: tema.primary, color: '#fff' }} className="px-5 py-3 rounded-lg text-sm font-medium flex items-center gap-2 disabled:opacity-50 cursor-pointer">
                                            <Plus size={18} /> {salvando ? 'Salvando...' : editandoId ? 'Salvar alterações' : 'Criar tabela'}
                                        </motion.button>
                                        {editandoId && <motion.button type="button" onClick={cancelarEdicao} animate={{ backgroundColor: tema.bg, color: tema.text, borderColor: tema.border }} className="px-5 py-3 border rounded-lg text-sm font-medium cursor-pointer">Cancelar</motion.button>}
                                    </div>
                                    <div className="h-px my-7" style={{ backgroundColor: tema.border }} />
                                    <div className="space-y-2 mt-3">
                                        {tabelas.map((tab: Tabela) => (
                                            <motion.div key={tab.tabela_id} animate={{ backgroundColor: tema.bg, borderColor: tema.border }} className="border rounded-lg px-4 py-3 flex items-center justify-between gap-4">
                                                <div className="min-w-0">
                                                    <p style={{ color: tema.text }} className="text-sm font-medium break-all">{tab.nome}</p>
                                                </div>
                                                <div className="flex gap-3">
                                                    <button type="button" onClick={() => { cancelarEdicao(); setEditandoId(tab.tabela_id); setNomeTabela(tab.nome); setDescricaoTabela(tab.descricao || ''); setCategoriasTabela(tab.dados_categorias_tabelas?.map(c => c.categoria_id) || []); }} style={{ color: tema.primary }}><Pencil size={17} /></button>
                                                    <button type="button" onClick={() => handleExcluirTabela(tab)} style={{ color: '#ef4444' }}><Trash2 size={17} /></button>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* RELACIONAMENTOS */}
                            {tipoGerenciamento === 'relacao' && (
                                <div>
                                    <motion.h3 animate={{ color: tema.text }} className="text-lg font-semibold">{editandoId ? 'Editando relacionamento' : 'Novo relacionamento'}</motion.h3>
                                    <div className="grid grid-cols-2 gap-3 mt-5">
                                        <div>
                                            <label className="text-xs" style={{ color: tema.placeholderColor }}>Tabela 1</label>
                                            <motion.select value={tabelaRelacao1} onChange={(e) => setTabelaRelacao1(e.target.value)} className="w-full mt-2 px-4 py-3 border rounded-lg outline-none text-sm" animate={{ backgroundColor: tema.bg, borderColor: tema.border, color: tema.text }}>
                                                <option value="">Selecione</option>
                                                {tabelas.map((t: Tabela) => <option key={t.tabela_id} value={t.tabela_id}>{t.nome}</option>)}
                                            </motion.select>
                                        </div>
                                        <div>
                                            <label className="text-xs" style={{ color: tema.placeholderColor }}>Tabela 2</label>
                                            <motion.select value={tabelaRelacao2} onChange={(e) => setTabelaRelacao2(e.target.value)} className="w-full mt-2 px-4 py-3 border rounded-lg outline-none text-sm" animate={{ backgroundColor: tema.bg, borderColor: tema.border, color: tema.text }}>
                                                <option value="">Selecione</option>
                                                {tabelas.map((t: Tabela) => <option key={t.tabela_id} value={t.tabela_id}>{t.nome}</option>)}
                                            </motion.select>
                                        </div>
                                    </div>
                                    <motion.textarea value={descricaoRelacao} onChange={(e) => setDescricaoRelacao(e.target.value)} placeholder="Descrição do relacionamento" rows={4} className="w-full mt-4 px-4 py-3 border rounded-lg outline-none text-sm resize-none" animate={{ backgroundColor: tema.bg, borderColor: tema.border, color: tema.text }} />

                                    <div className="flex gap-3 mt-4">
                                        <motion.button type="button" disabled={salvando} onClick={submitRelacao} animate={{ backgroundColor: tema.primary, color: '#fff' }} className="px-5 py-3 rounded-lg text-sm font-medium flex items-center gap-2 disabled:opacity-50 cursor-pointer">
                                            <Plus size={18} /> {salvando ? 'Salvando...' : editandoId ? 'Salvar alterações' : 'Criar relacionamento'}
                                        </motion.button>
                                        {editandoId && <motion.button type="button" onClick={cancelarEdicao} animate={{ backgroundColor: tema.bg, color: tema.text, borderColor: tema.border }} className="px-5 py-3 border rounded-lg text-sm font-medium cursor-pointer">Cancelar</motion.button>}
                                    </div>
                                    <div className="h-px my-7" style={{ backgroundColor: tema.border }} />
                                    <div className="space-y-2 mt-3">
                                        {todasRelacoes.map((rel: Relacao) => (
                                            <motion.div key={rel.relacoes_id} animate={{ backgroundColor: tema.bg, borderColor: tema.border }} className="border rounded-lg px-4 py-3 flex items-center justify-between gap-4">
                                                <div className="min-w-0">
                                                    <p style={{ color: tema.text }} className="text-sm font-medium break-all">{rel.tabela_1_dados?.nome} ↔ {rel.tabela_2_dados?.nome}</p>
                                                </div>
                                                <div className="flex gap-3">
                                                    <button type="button" onClick={() => { cancelarEdicao(); setEditandoId(rel.relacoes_id); setTabelaRelacao1(rel.tabela_1); setTabelaRelacao2(rel.tabela_2); setDescricaoRelacao(rel.descricao); }} style={{ color: tema.primary }}><Pencil size={17} /></button>
                                                    <button type="button" onClick={() => handleExcluirRelacao(rel.relacoes_id)} style={{ color: '#ef4444' }}><Trash2 size={17} /></button>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        {mensagemErro && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-5 border border-red-500/30 bg-red-500/10 rounded-lg px-4 py-3">
                                <p className="text-sm" style={{ color: '#ef4444' }}>{mensagemErro}</p>
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default function Dados() {
    const tema = useTema();

    const [modo, setModo] = useState<Modo>('categoria');
    const [pesquisa, setPesquisa] = useState('');
    const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | null>(null);
    const [tabelaSelecionada, setTabelaSelecionada] = useState<string | null>(null);
    const [modalAberto, setModalAberto] = useState(false);
    const [tipoGerenciamento, setTipoGerenciamento] = useState<TipoGerenciamento>('categoria');

    const { data: categorias = [], isLoading: carregandoCategorias } = useCategorias();
    const { data: tabelas = [] } = useTabelas();
    const { data: tabelasCategoria = [], isLoading: carregandoTabelasCategoria } = useTabelasCategoria(categoriaSelecionada);
    const { data: relacoes = [], isLoading: carregandoRelacoes } = useRelacoes(tabelaSelecionada);
    const { data: todasRelacoes = [] } = useTodasRelacoes(modalAberto && tipoGerenciamento === 'relacao');

    const { excluirCategoria, excluirTabela, excluirRelacao } = useMutacoesDocumentacao();

    useSincronizacaoRealtime();

    const categoriaAtual = categorias.find((item) => item.id === categoriaSelecionada);
    const tabelasFiltradas = tabelas.filter((tabela) => {
        const termo = pesquisa.toLowerCase().trim();
        if (!termo) return true;
        return tabela.nome.toLowerCase().includes(termo) || (tabela.descricao ?? '').toLowerCase().includes(termo);
    });

    async function handleExcluirCategoria(categoria: Categoria) {
        if (!window.confirm(`Deseja excluir a categoria "${categoria.categoria}"?`)) return;
        try {
            await excluirCategoria.mutateAsync(categoria.id);
            if (categoriaSelecionada === categoria.id) { setCategoriaSelecionada(null); setTabelaSelecionada(null); }
        } catch (error) { window.alert('Erro ao excluir a categoria.'); }
    }

    async function handleExcluirTabela(tabela: Tabela) {
        if (!window.confirm(`Deseja excluir a tabela "${tabela.nome}"? Todas as relações serão removidas.`)) return;
        try {
            await excluirTabela.mutateAsync(tabela.tabela_id);
            if (tabelaSelecionada === tabela.tabela_id) setTabelaSelecionada(null);
        } catch (error) { window.alert('Erro ao excluir a tabela.'); }
    }

    async function handleExcluirRelacao(id: string) {
        if (!window.confirm('Deseja excluir este relacionamento?')) return;
        try { await excluirRelacao.mutateAsync(id); } catch (error) { window.alert('Erro ao excluir.'); }
    }

    return (
        <motion.div className="flex-col relative min-h-screen overflow-x-hidden flex px-25 pt-14 pb-20" animate={{ background: tema.bg, color: tema.text }}>

            <motion.div className="pt-12 pb-8">
                <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1, color: tema.text }} className="text-5xl font-semibold tracking-tight">Documentação dos dados Oracle</motion.h2>
                <BarraPesquisa onPesquisa={setPesquisa} />
                <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1, color: tema.text }} className="text-2xl font-semibold tracking-tight pt-10">Selecione um modo de navegação:</motion.h3>
            </motion.div>

            <motion.div className="grid grid-cols-4 gap-4">
                <CardNavegacao titulo="Gerenciar" descricao="Adicionar, editar ou remover categorias, tabelas e relacionamentos." icone={<Settings size={23} />} ativo={modo === 'gerenciar'} onClick={() => { setModo('gerenciar'); setTabelaSelecionada(null); }} />
                <CardNavegacao titulo="Categorias" descricao="Navegue pelas tabelas organizadas em suas respectivas categorias." icone={<Folder size={23} />} ativo={modo === 'categoria'} onClick={() => { setModo('categoria'); setTabelaSelecionada(null); }} />
                <CardNavegacao titulo="Tabelas" descricao="Visualize todas as tabelas documentadas independentemente de categoria." icone={<Table2 size={23} />} ativo={modo === 'tabela'} onClick={() => { setModo('tabela'); setTabelaSelecionada(null); }} />
                <CardNavegacao titulo="Relacionamentos" descricao="Visualize os relacionamentos documentados entre as tabelas." icone={<GitBranch size={23} />} ativo={modo === 'relacoes'} onClick={() => { setModo('relacoes'); }} />
            </motion.div>

            <AnimatePresence mode="wait">
                {modo === 'gerenciar' && (
                    <motion.div key="gerenciar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-10">
                        <motion.div animate={{ backgroundColor: tema.inputBg, borderColor: tema.border }} className="border rounded-xl p-7">
                            <div className="flex items-center gap-3">
                                <Settings size={24} style={{ color: tema.primary }} />
                                <motion.h3 animate={{ color: tema.text }} className="text-2xl font-semibold">Gerenciar documentação</motion.h3>
                            </div>
                            <motion.p animate={{ color: tema.placeholderColor }} className="mt-3 text-sm">Crie, organize, edite e remova os registros utilizados pela documentação.</motion.p>
                            <motion.button type="button" onClick={() => { setTipoGerenciamento('categoria'); setModalAberto(true); }} animate={{ backgroundColor: tema.primary, color: '#fff' }} className="mt-6 px-5 py-3 rounded-lg text-sm font-medium flex items-center gap-2 cursor-pointer">
                                <Settings size={18} /> Abrir gerenciamento
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}

                {modo === 'categoria' && (
                    <motion.div key="categoria" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-[220px_1fr] gap-5 mt-10">
                        <motion.div animate={{ backgroundColor: tema.inputBg, borderColor: tema.border }} className="border rounded-xl p-3 h-fit">
                            <motion.h3 animate={{ color: tema.text }} className="font-semibold px-3 py-2">Categorias</motion.h3>
                            {carregandoCategorias ? (<p className="px-3 py-3 text-sm" style={{ color: tema.placeholderColor }}>Carregando...</p>) : (
                                <div className="space-y-1 mt-2">
                                    {categorias.map((item) => (
                                        <div key={item.id} className="flex items-center gap-1">
                                            <motion.button type="button" onClick={() => { setCategoriaSelecionada(item.id); setTabelaSelecionada(null); }} animate={{ backgroundColor: categoriaSelecionada === item.id ? tema.primary : 'transparent', color: categoriaSelecionada === item.id ? '#fff' : tema.text }} className="flex-1 text-left px-3 py-2.5 rounded-lg text-sm cursor-pointer">
                                                {item.categoria}
                                            </motion.button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>

                        <div>
                            <div className="flex items-center justify-between mb-5">
                                <div>
                                    <motion.h3 animate={{ color: tema.text }} className="text-2xl font-semibold">{categoriaAtual?.categoria ?? 'Selecione uma categoria'}</motion.h3>
                                </div>
                            </div>
                            {!categoriaSelecionada ? (
                                <motion.div animate={{ backgroundColor: tema.inputBg, borderColor: tema.border }} className="border rounded-xl p-8"><p style={{ color: tema.placeholderColor }}>Selecione uma categoria.</p></motion.div>
                            ) : carregandoTabelasCategoria ? (
                                <p style={{ color: tema.placeholderColor }}>Carregando tabelas...</p>
                            ) : (
                                <div className="grid grid-cols-2 gap-4">
                                    {tabelasCategoria.map((item) => item.dados_tabelas && <CardTabela key={item.tabela_id} tabela={item.dados_tabelas} tabelaSelecionada={tabelaSelecionada} selecionarTabela={(id) => { setTabelaSelecionada(id); setModo('relacoes'); }} />)}
                                </div>
                            )}
                            <SessaoRelacoes tabelaSelecionada={tabelaSelecionada} carregandoRelacoes={carregandoRelacoes} relacoes={relacoes} handleExcluirRelacao={handleExcluirRelacao} />
                        </div>
                    </motion.div>
                )}

                {modo === 'tabela' && (
                    <motion.div key="tabela" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-10">
                        <motion.h3 animate={{ color: tema.text }} className="text-2xl font-semibold">Todas as tabelas</motion.h3>
                        <div className="grid grid-cols-3 gap-4 mt-6">
                            {tabelasFiltradas.map((tab) => <CardTabela key={tab.tabela_id} tabela={tab} tabelaSelecionada={tabelaSelecionada} selecionarTabela={(id) => { setTabelaSelecionada(id); setModo('relacoes'); }} />)}
                        </div>
                        <SessaoRelacoes tabelaSelecionada={tabelaSelecionada} carregandoRelacoes={carregandoRelacoes} relacoes={relacoes} handleExcluirRelacao={handleExcluirRelacao} />
                    </motion.div>
                )}

                {modo === 'relacoes' && (
                    <motion.div key="relacoes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-10">
                        <motion.h3 animate={{ color: tema.text }} className="text-2xl font-semibold">Relacionamentos</motion.h3>
                        <div className="grid grid-cols-3 gap-4 mt-6">
                            {tabelasFiltradas.map((tab) => <CardTabela key={tab.tabela_id} tabela={tab} tabelaSelecionada={tabelaSelecionada} selecionarTabela={(id) => setTabelaSelecionada(id)} />)}
                        </div>
                        <SessaoRelacoes tabelaSelecionada={tabelaSelecionada} carregandoRelacoes={carregandoRelacoes} relacoes={relacoes} handleExcluirRelacao={handleExcluirRelacao} />
                    </motion.div>
                )}
            </AnimatePresence>

            <ModalGerenciar
                aberto={modalAberto}
                fechar={() => setModalAberto(false)}
                tipoGerenciamento={tipoGerenciamento}
                setTipoGerenciamento={setTipoGerenciamento}
                categorias={categorias}
                tabelas={tabelas}
                todasRelacoes={todasRelacoes}
                handleExcluirCategoria={handleExcluirCategoria}
                handleExcluirTabela={handleExcluirTabela}
                handleExcluirRelacao={handleExcluirRelacao}
            />
        </motion.div>
    );
}