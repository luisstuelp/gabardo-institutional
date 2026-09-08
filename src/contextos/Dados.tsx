'use client';

import { createContext, useContext } from 'react';
import {
  pegarTecnicosChamadas,
  pegarTecnicos,
  pegarChamadas,
  pegarAndamentos,
  pegarMaquinas,
  pegarProgramas,
  usePegarAlertas,
  pegarContratos,
  pegarNotificacoesContratos
} from "@/lib/query";
import { useAutenticacao } from "./Autenticacao";
import { supabase } from "@/lib/supabase";

import type { DadosContextType } from './tipos-contexto';

const DadosContext = createContext<DadosContextType | null>(null);

function DadosProvider({ children }: { children: React.ReactNode }) {

  const { sessao, carregandoAuth } = useAutenticacao();

  const assumirChamada = async (
    idChamada: string,
    idTecnico: string
  ) => {
    await supabase.rpc(
      "inserir_tecnico_chamada",
      {
        p_id_chamada: idChamada,
        p_id_tecnico: idTecnico,
      }
    );
  }
  const notificacoesContratos = pegarNotificacoesContratos();
  const contratos = pegarContratos();
  const chamadas = pegarChamadas(!carregandoAuth && !!sessao);
  const maquinas = pegarMaquinas();
  const programas = pegarProgramas();
  const alertasUsuarios = usePegarAlertas();

  const tecnicos = pegarTecnicos(!carregandoAuth && !!sessao);
  const andamentos = pegarAndamentos(!carregandoAuth && !!sessao);
  const tecnicosChamadas = pegarTecnicosChamadas(
    !carregandoAuth && !!sessao
  );

  return (
    <DadosContext.Provider
      value={{
        chamadas,
        andamentos,
        tecnicos,
        tecnicosChamadas,
        assumirChamada,
        maquinas,
        programas,
        alertasUsuarios,
        contratos,
        notificacoesContratos
      }}
    >
      {children}
    </DadosContext.Provider>
  );
}

export function useDados() {
  const context = useContext(DadosContext);
  if (!context) throw new Error('useDados deve ser usado dentro do Header');
  return context;
}

export { DadosProvider };