import {
  useQuery, useMutation, useQueryClient
} from "@tanstack/react-query";
import { supabase } from './supabase'
import type { Tables } from './tipos';
import { useRealtimeTable } from "./realTime";

export function pegarContratos(enabled = true) {
    useRealtimeTable("contratos", "contratos");

    return useQuery({
        queryKey: ["contratos"],
        enabled,

        queryFn: async () => {
            const { data, error } = await supabase
                .from("contratos")
                .select(`
                    id,
                    empresa,
                    servico,
                    arquivo,
                    data_inicio,
                    data_fim,
                    periodo,
                    valor_mensal,
                    renovado
                `)
                .order("data_fim", {
                    ascending: true,
                });

            if (error) {
                throw new Error(
                    `Erro ao buscar contratos: ${error.message}`
                );
            }

            return data as Tables<"contratos">[];
        },
    });
}

export const pegarAlertas = async () => {
  const { data, error } = await supabase
    .from('maquinas_programas_flags')
    .select(`
      maquina_id,
      programa_id,
      permitiu,
      maquinas (
        nome_computador,
        usuario_atual
      ),
      programas (
        nome
      )
    `);

  if (error) {
    throw new Error(`Erro ao buscar alertas: ${error.message}`);
  }

  return data.map((item: any) => ({
    maquina_id: item.maquina_id,
    nome_computador: item.maquinas?.nome_computador || 'Desconhecido',
    usuario_atual: item.maquinas?.usuario_atual || 'Desconhecido',
    programa_id: item.programa_id,
    nome_programa: item.programas?.nome || 'Desconhecido',
    permitiu: item.permitiu
  }));
};

export const usePegarAlertas = () => {
    useRealtimeTable("maquinas_programas_flags", "alertas_inventario");

  return useQuery({
    queryKey: ['alertas_inventario'],
    queryFn: pegarAlertas
  });
};

export const permitirSoftware = async ({ maquinaId, programaId }: { maquinaId: string, programaId: number }) => {
  const { error } = await supabase
    .from('maquinas_programas_flags')
    .update({ permitiu: true }) 
    .eq('maquina_id', maquinaId)
    .eq('programa_id', programaId);

  if (error) {
    throw new Error(`Erro ao permitir software: ${error.message}`);
  }
  
  return true;
};

export const usePermitirSoftware = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: permitirSoftware,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alertas_inventario'] });
    },
  });
};

export function pegarTecnicos(enabled = true) {
  useRealtimeTable("tecnicos", "tecnicos");

  return useQuery({
    queryKey: ['tecnicos'],
    enabled,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tecnicos')
        .select('*')
      if (error) throw error
      return data as Tables<'tecnicos'>[]
    },
  })
}

export function pegarChamadas(enabled = true) {
  useRealtimeTable("chamadas", "chamadas");

  return useQuery({
    queryKey: ['chamadas'],
    enabled,
queryFn: async () => {
  const { data, error } = await supabase
    .from("chamadas")
    .select("*, tecnico_chamadas(id_tecnico)");

  if (error) throw error;

  return data as Tables<'chamadas'>[];
},
  })
}

export function pegarAndamentos(enabled = true) {
  useRealtimeTable("andamentos", "andamentos");

  return useQuery({
    queryKey: ['andamentos'],
    enabled,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('andamentos')
        .select('*')
        .order('quando', { ascending: true });

      if (error) throw error;
      return data as Tables<'andamentos'>[];
    },
  });
}

export function pegarTecnicosChamadas(enabled = true) {
  useRealtimeTable(
    "tecnico_chamadas",
    "tecnico_chamadas"
  );

    return useQuery<Tables<"tecnico_chamadas">[]>({
        queryKey: ["tecnico_chamadas"],
        enabled,
        queryFn: async () => {
            const { data, error } = await supabase
                .from("tecnico_chamadas")
                .select(`
                    *,
                    tecnicos (*)
                `);

            if (error) throw error;
            return data satisfies Tables<"tecnico_chamadas">[];        }
    });
}

export function pegarProgramas(enabled = true) {
    useRealtimeTable("programas", "programas");

    return useQuery({
        queryKey: ["programas"],
        enabled,

        queryFn: async () => {

            const { data, error } = await supabase
                .from("programas")
                .select(`
                    id,
                    nome,
                    versao,
                    publisher,
                    flag,
                    maquinas_programas(count)
                `)
                .order("nome", {
                    ascending: true
                });

            if (error) {
                console.error("Erro ao buscar programas:", error);
                throw error;
            }

            return data.map((programa) => ({
                id: programa.id,
                nome: programa.nome,
                versao: programa.versao,
                publisher: programa.publisher,
                flag: programa.flag,

                quantidade_maquinas:
                    programa.maquinas_programas?.[0]?.count ?? 0,
            }));
        },
    });
}

export function pegarMaquinas(enabled = true) {
    useRealtimeTable("maquinas", "maquinas");

    return useQuery({
        queryKey: ["maquinas"],
        enabled,

        queryFn: async () => {
            const { data, error } = await supabase
                .from("maquinas")
                .select(`
                    id,
                    nome_computador,
                    dominio,
                    usuario_atual,
                    fabricante,
                    modelo,
                    familia_sistema,
                    placa_mae_fabricante,
                    placa_mae_produto,
                    placa_mae_serial,
                    sistema_operacional,
                    versao_so,
                    arquitetura,
                    ultimo_visto,
                    criado_em,
                    ip_publico,
                    ip_interno
                `)
                .order("nome_computador", {
                    ascending: true,
                });

            if (error) {
                throw new Error(
                    `Erro ao buscar máquinas: ${error.message}`
                );
            }

            return data as Tables<"maquinas">[];
        },
    });
}

export function pegarMaquinasCPUs(enabled = true) {
    useRealtimeTable("maquina_cpus", "maquina_cpus");

    return useQuery({
        queryKey: ["maquina_cpus"],
        enabled,

        queryFn: async () => {
            const { data, error } = await supabase
                .from("maquina_cpus")
                .select("*");

            if (error) {
                throw new Error(
                    `Erro ao buscar CPUs: ${error.message}`
                );
            }

            return data as Tables<"maquina_cpus">[];
        },
    });
}


export function pegarMaquinasGPUs(enabled = true) {
    useRealtimeTable("maquina_gpus", "maquina_gpus");

    return useQuery({
        queryKey: ["maquina_gpus"],
        enabled,

        queryFn: async () => {
            const { data, error } = await supabase
                .from("maquina_gpus")
                .select("*");

            if (error) {
                throw new Error(
                    `Erro ao buscar GPUs: ${error.message}`
                );
            }

            return data as Tables<"maquina_gpus">[];
        },
    });
}


export function pegarMaquinasHDs(enabled = true) {
    useRealtimeTable("maquina_hds", "maquina_hds");

    return useQuery({
        queryKey: ["maquina_hds"],
        enabled,

        queryFn: async () => {
            const { data, error } = await supabase
                .from("maquina_hds")
                .select("*");

            if (error) {
                throw new Error(
                    `Erro ao buscar HDs: ${error.message}`
                );
            }

            return data as Tables<"maquina_hds">[];
        },
    });
}


export function pegarMaquinasRAMs(enabled = true) {
    useRealtimeTable("maquina_rams", "maquina_rams");

    return useQuery({
        queryKey: ["maquina_rams"],
        enabled,

        queryFn: async () => {
            const { data, error } = await supabase
                .from("maquina_rams")
                .select("*");

            if (error) {
                throw new Error(
                    `Erro ao buscar memórias RAM: ${error.message}`
                );
            }

            return data as Tables<"maquina_rams">[];
        },
    });
}

export function pegarMaquinasProgramas(enabled = true) {
    useRealtimeTable("maquinas_programas", "maquinas_programas");

    return useQuery({
        queryKey: ["maquinas_programas"],
        enabled,

        queryFn: async () => {
            const { data, error } = await supabase
                .from("maquinas_programas")
                .select(`
                    *,
                    programas (
                        id,
                        nome,
                        versao,
                        publisher,
                        flag
                    )
                `);

            if (error) {
                throw new Error(
                    `Erro ao buscar programas das máquinas: ${error.message}`
                );
            }

            return data;
        },
    });
}

export function pegarMaquinasMonitores(enabled = true) {
    useRealtimeTable("maquina_monitores", "maquina_monitores");

    return useQuery({
        queryKey: ["maquina_monitores"],
        enabled,

        queryFn: async () => {
            const { data, error } = await supabase
                .from("maquina_monitores")
                .select("*");

            if (error) {
                throw new Error(
                    `Erro ao buscar monitores: ${error.message}`
                );
            }

            return data as Tables<"maquina_monitores">[];
        },
    });
}


export function pegarMaquinasDadosBrutos(enabled = true) {
    useRealtimeTable("maquina_dados_brutos", "maquina_dados_brutos");

    return useQuery({
        queryKey: ["maquina_dados_brutos"],
        enabled,

        queryFn: async () => {
            const { data, error } = await supabase
                .from("maquina_dados_brutos")
                .select("*");

            if (error) {
                throw new Error(
                    `Erro ao buscar dados brutos das máquinas: ${error.message}`
                );
            }

            return data as Tables<"maquina_dados_brutos">[];
        },
    });
}

export function pegarNotificacoesContratos(enabled = true) {
  useRealtimeTable(
    "notificacoes_contratos",
    "notificacoes_contratos"
  );

  return useQuery({
    queryKey: ["notificacoes_contratos"],
    enabled,

    queryFn: async () => {
      const { data, error } = await supabase
        .from("notificacoes_contratos")
        .select(`
          id,
          contrato_id,
          dias_restantes,
          mensagem,
          criada_em,
          contratos (
            empresa,
            servico,
            data_inicio,
            data_fim,
            valor_mensal
          )
        `)
        .order("dias_restantes", {
          ascending: true,
        });

      if (error) {
        throw new Error(
          `Erro ao buscar notificações de contratos: ${error.message}`
        );
      }

      return data;
    },
  });
}