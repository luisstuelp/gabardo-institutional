import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useEffect } from 'react';

export type Modo = 'categoria' | 'tabela' | 'relacoes' | 'gerenciar';
export type TipoGerenciamento = 'categoria' | 'tabela' | 'relacao';

export type Categoria = {
    id: string;
    categoria: string;
};

export type Tabela = {
    tabela_id: string;
    nome: string;
    descricao: string | null;
    dados_categorias_tabelas?: { categoria_id: string }[];
};

export type TabelaCategoria = {
    tabela_id: string;
    dados_tabelas: Tabela | null;
};

export type Relacao = {
    relacoes_id: string;
    descricao: string;
    tabela_1: string;
    tabela_2: string;
    tabela_1_dados: Tabela | null;
    tabela_2_dados: Tabela | null;
};

const STALE_TIME = Infinity; 

export function useCategorias() {
    return useQuery<Categoria[]>({
        queryKey: ['dados-categorias'],
        queryFn: async () => {
            const { data, error } = await supabase.from('dados_categorias').select('*').order('categoria');
            if (error) throw error;
            return data;
        },
        staleTime: STALE_TIME,
    });
}

export function useTabelas() {
    return useQuery<Tabela[]>({
        queryKey: ['dados-tabelas'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('dados_tabelas')
                .select('*, dados_categorias_tabelas(categoria_id)')
                .order('nome');
            if (error) throw error;
            return data;
        },
        staleTime: STALE_TIME,
    });
}

export function useTabelasCategoria(categoriaSelecionada: string | null) {
    return useQuery<TabelaCategoria[]>({
        queryKey: ['dados-tabelas-categoria', categoriaSelecionada],
        enabled: !!categoriaSelecionada,
        queryFn: async () => {
            if (!categoriaSelecionada) return [];
            const { data, error } = await supabase
                .from('dados_categorias_tabelas')
                .select(`tabela_id, dados_tabelas (tabela_id, nome, descricao)`)
                .eq('categoria_id', categoriaSelecionada);
            if (error) throw error;
            return data as TabelaCategoria[];
        },
        staleTime: STALE_TIME,
    });
}

export function useRelacoes(tabelaSelecionada: string | null) {
    return useQuery<Relacao[]>({
        queryKey: ['dados-relacoes', tabelaSelecionada],
        enabled: !!tabelaSelecionada,
        queryFn: async () => {
            if (!tabelaSelecionada) return [];
            const { data, error } = await supabase
                .from('dados_tabelas_relacoes')
                .select(`
                    relacoes_id, descricao, tabela_1, tabela_2,
                    tabela_1_dados:dados_tabelas!dados_tabelas_relacoes_tabela_1_fkey (tabela_id, nome, descricao),
                    tabela_2_dados:dados_tabelas!dados_tabelas_relacoes_tabela_2_fkey (tabela_id, nome, descricao)
                `)
                .or(`tabela_1.eq.${tabelaSelecionada},tabela_2.eq.${tabelaSelecionada}`);
            if (error) throw error;
            return data as Relacao[];
        },
        staleTime: STALE_TIME,
    });
}

export function useTodasRelacoes(habilitar: boolean) {
    return useQuery<Relacao[]>({
        queryKey: ['dados-todas-relacoes'],
        enabled: habilitar, // Só carrega quando o modal estiver aberto
        queryFn: async () => {
            const { data, error } = await supabase
                .from('dados_tabelas_relacoes')
                .select(`
                    relacoes_id, descricao, tabela_1, tabela_2,
                    tabela_1_dados:dados_tabelas!dados_tabelas_relacoes_tabela_1_fkey (tabela_id, nome, descricao),
                    tabela_2_dados:dados_tabelas!dados_tabelas_relacoes_tabela_2_fkey (tabela_id, nome, descricao)
                `);
            if (error) throw error;
            return data as Relacao[];
        },
        staleTime: STALE_TIME,
    });
}


export function useMutacoesDocumentacao() {
    const queryClient = useQueryClient();

    const salvarCategoria = useMutation({
        mutationFn: async ({ id, nome }: { id: string | null; nome: string }) => {
            if (id) {
                const { error } = await supabase.from('dados_categorias').update({ categoria: nome }).eq('id', id);
                if (error) throw error;
            } else {
                const { error } = await supabase.from('dados_categorias').insert({ categoria: nome });
                if (error) throw error;
            }
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['dados-categorias'] }),
    });

    const excluirCategoria = useMutation({
        mutationFn: async (id: string) => {
            const { error: erroVinculos } = await supabase.from('dados_categorias_tabelas').delete().eq('categoria_id', id);
            if (erroVinculos) throw erroVinculos;
            const { error } = await supabase.from('dados_categorias').delete().eq('id', id);
            if (error) throw error;
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['dados-categorias'] }),
    });

    const salvarTabela = useMutation({
        mutationFn: async ({ id, nome, descricao, categorias }: { id: string | null; nome: string; descricao: string; categorias: string[] }) => {
            let tabelaId = id;

            if (id) {
                const { error: erroTabela } = await supabase.from('dados_tabelas').update({ nome, descricao }).eq('tabela_id', id);
                if (erroTabela) throw erroTabela;

                const { error: erroDelCat } = await supabase.from('dados_categorias_tabelas').delete().eq('tabela_id', id);
                if (erroDelCat) throw erroDelCat;
            } else {
                const { data: tabelaCriada, error: erroTabela } = await supabase.from('dados_tabelas').insert({ nome, descricao }).select().single();
                if (erroTabela) throw erroTabela;
                tabelaId = tabelaCriada.tabela_id;
            }

            if (categorias.length > 0 && tabelaId) {
                const registros = categorias.map((categoriaId) => ({ tabela_id: tabelaId, categoria_id: categoriaId }));
                const { error: erroCategorias } = await supabase.from('dados_categorias_tabelas').insert(registros);
                if (erroCategorias) throw erroCategorias;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dados-tabelas'] });
            queryClient.invalidateQueries({ queryKey: ['dados-tabelas-categoria'] });
        },
    });

    const excluirTabela = useMutation({
        mutationFn: async (id: string) => {
            const { error: erroRelacoes } = await supabase.from('dados_tabelas_relacoes').delete().or(`tabela_1.eq.${id},tabela_2.eq.${id}`);
            if (erroRelacoes) throw erroRelacoes;

            const { error: erroCategorias } = await supabase.from('dados_categorias_tabelas').delete().eq('tabela_id', id);
            if (erroCategorias) throw erroCategorias;

            const { error } = await supabase.from('dados_tabelas').delete().eq('tabela_id', id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dados-tabelas'] });
            queryClient.invalidateQueries({ queryKey: ['dados-tabelas-categoria'] });
            queryClient.invalidateQueries({ queryKey: ['dados-relacoes'] });
        },
    });

    const salvarRelacao = useMutation({
        mutationFn: async ({ id, tab1, tab2, desc }: { id: string | null; tab1: string; tab2: string; desc: string }) => {
            if (id) {
                const { error } = await supabase.from('dados_tabelas_relacoes').update({ tabela_1: tab1, tabela_2: tab2, descricao: desc }).eq('relacoes_id', id);
                if (error) throw error;
            } else {
                const { error } = await supabase.from('dados_tabelas_relacoes').insert({ tabela_1: tab1, tabela_2: tab2, descricao: desc });
                if (error) throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dados-relacoes'] });
            queryClient.invalidateQueries({ queryKey: ['dados-todas-relacoes'] });
        },
    });

    const excluirRelacao = useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase.from('dados_tabelas_relacoes').delete().eq('relacoes_id', id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dados-relacoes'] });
            queryClient.invalidateQueries({ queryKey: ['dados-todas-relacoes'] });
        },
    });

    return {
        salvarCategoria, excluirCategoria,
        salvarTabela, excluirTabela,
        salvarRelacao, excluirRelacao,
    };
}

export function useSincronizacaoRealtime() {
    const queryClient = useQueryClient();

    useEffect(() => {
        const canal = supabase
            .channel('sincronizacao-documentacao')
            
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'dados_categorias' },
                (payload) => {
                    queryClient.setQueryData(['dados-categorias'], (dadosAntigos: Categoria[] | undefined) => {
                        if (!dadosAntigos) return dadosAntigos;
                        
                        if (payload.eventType === 'INSERT') {
                            return [...dadosAntigos, payload.new as Categoria].sort((a, b) => a.categoria.localeCompare(b.categoria));
                        }
                        if (payload.eventType === 'UPDATE') {
                            return dadosAntigos.map(c => c.id === payload.new.id ? { ...c, ...payload.new } : c);
                        }
                        if (payload.eventType === 'DELETE') {
                            return dadosAntigos.filter(c => c.id !== payload.old.id);
                        }
                    });
                }
            )
            
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'dados_tabelas' },
                () => {
                    queryClient.invalidateQueries({ queryKey: ['dados-tabelas'] });
                    queryClient.invalidateQueries({ queryKey: ['dados-tabelas-categoria'] });
                }
            )
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'dados_categorias_tabelas' },
                () => {
                    queryClient.invalidateQueries({ queryKey: ['dados-tabelas'] });
                    queryClient.invalidateQueries({ queryKey: ['dados-tabelas-categoria'] });
                }
            )
            
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'dados_tabelas_relacoes' },
                () => {
                    queryClient.invalidateQueries({ queryKey: ['dados-relacoes'] });
                    queryClient.invalidateQueries({ queryKey: ['dados-todas-relacoes'] });
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(canal);
        };
    }, [queryClient]);
}