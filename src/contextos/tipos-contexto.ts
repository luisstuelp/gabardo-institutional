import { type Session, type User } from '@supabase/supabase-js';
import type { Tables } from '@/lib/tipos';
import type { UseQueryResult } from "@tanstack/react-query";

export type Chamada = Tables<"chamadas">;

interface ChamadaMetricas {
  numeroFinalizadasAtrasadas: number;
  numeroFinalizadas: number;
  numeroParadas: number;
  numeroEmAndamento: number;
  numeroPausadas: number;
  numeroAtrasadas: number;

  listaFinalizadasAtrasadas: Chamada[];
  listaFinalizadas: Chamada[];
  listaParadas: Chamada[];
  listaEmAndamento: Chamada[];
  listaPausadas: Chamada[];
  listaAtrasadas: Chamada[];

  chamadasBaixas: Chamada[]
  chamadasMedias: Chamada[]
  chamadasAltas: Chamada[]
  chamadasUrgentes: Chamada[]

  chamadasNovas: Chamada[]
  chamadasVelhas: Chamada[]
}

export interface DetalhesCompletos {
  geral: ChamadaMetricas;
  individual: Record<string, ChamadaMetricas>
}

export type DadosContextType = {
    chamadas: UseQueryResult<Tables<"chamadas">[], Error>;
    andamentos: UseQueryResult<Tables<"andamentos">[], Error>;
    tecnicos: UseQueryResult<Tables<"tecnicos">[], Error>;
    tecnicosChamadas: UseQueryResult<Tables<"tecnico_chamadas">[], Error>;
    assumirChamada: (idChamada: string, idTecnico: string) => void;
    maquinas: UseQueryResult<Tables<"maquinas">[], Error>;
    programas: UseQueryResult<Tables<"programas">[], Error>;
    alertasUsuarios: ReturnType<typeof import("@/lib/query").usePegarAlertas>;
    contratos: UseQueryResult<Tables<"contratos">[], Error>;
    notificacoesContratos: ReturnType<typeof import("@/lib/query").pegarNotificacoesContratos>;
  }

export type AutenticacaoContextType = {
    user: User | null;
    sessao: Session | null;
    carregando: boolean;
    erro: string;
    login: (email: string, senha: string) => Promise<boolean>;
    logout: () => void;
    tecnicoLogado: Tables<'tecnicos'> | null;
    limparErro: () => void;
    carregandoAuth : boolean;
}

export type InventarioContextType = {
  maquinas: ReturnType<typeof import("@/lib/query").pegarMaquinas>;
  programas: UseQueryResult<{
    flag: boolean;
    id: number;
    nome: string;
    publisher: string | null;
    versao: string | null;
}[], Error>

  cpus: ReturnType<typeof import("@/lib/query").pegarMaquinasCPUs>;
  gpus: ReturnType<typeof import("@/lib/query").pegarMaquinasGPUs>;
  hds: ReturnType<typeof import("@/lib/query").pegarMaquinasHDs>;
  rams: ReturnType<typeof import("@/lib/query").pegarMaquinasRAMs>;
  monitores: ReturnType<typeof import("@/lib/query").pegarMaquinasMonitores>;

  maquinasProgramas: ReturnType< typeof import("@/lib/query").pegarMaquinasProgramas >;
  dadosBrutos: ReturnType< typeof import("@/lib/query").pegarMaquinasDadosBrutos >;

  alertas: ReturnType< typeof import("@/lib/query").usePegarAlertas >;

}



export type FiltrosChamadasContextType = {
  megaInfoChamadas: DetalhesCompletos;
}