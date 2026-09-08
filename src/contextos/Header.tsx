'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type * as Tipos from '../tipos';

const HeaderContext = createContext<Tipos.HeaderContextType | null>(null);

function HeaderProvider({ children }: { children: React.ReactNode }) {
  const [menuAbertoEsquerdo, abrirMenuEsquerdo] = useState(false);
  const [darkMode, ativarDarkMode] = useState(() => localStorage.getItem('tema') === 'dark');

  const [menuAbertoNotificacoes, abrirMenuNotificacoes] = useState(false);
  const [menuAbertoAlertas, abrirMenuAlertas] = useState(false);
  const [menuAbertoMinhasChamadas, abrirMenuMinhasChamadas] = useState(false);
  const [menuAbertoChamadas, abrirMenuChamadas] = useState(false);
  const [menuAbertoContratos, abrirMenuContratos] = useState(false);

  const fecharMenus = () => {
    abrirMenuEsquerdo(false);
    abrirMenuNotificacoes(false);
    abrirMenuAlertas(false);
    abrirMenuMinhasChamadas(false);
    abrirMenuChamadas(false);
    abrirMenuContratos(false);
  };

  useEffect(() => {
    if (darkMode) {
      localStorage.setItem('tema', 'dark');
    } else {
      localStorage.setItem('tema', 'claro');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') fecharMenus();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const alterarMenuEsquerdo = () => {
    abrirMenuEsquerdo((prev) => !prev);
  };

  const alterarMenuChamadas = () => {
    abrirMenuChamadas((prev) => !prev);
  };

  const alterarMenuNotificacoes = () => {
    abrirMenuNotificacoes((prev) => !prev);
  };

  const alterarMenuAlertas = () => {
    abrirMenuAlertas((prev) => !prev);
  };

  const alterarMenuMinhasChamadas = () => {
    abrirMenuMinhasChamadas((prev) => !prev);
  };

  const alterarMenuContratos = () => {
    abrirMenuContratos((prev) => !prev);
  };

  const alterarTema = () => ativarDarkMode((prev) => !prev);

  return (
    <HeaderContext.Provider
      value={{
        menuAbertoEsquerdo,
        darkMode,
        alterarMenuEsquerdo,
        alterarTema,
        fecharMenus,
        menuAbertoNotificacoes,
        menuAbertoContratos,
        menuAbertoAlertas,
        menuAbertoMinhasChamadas,
        menuAbertoChamadas,
        alterarMenuChamadas,
        alterarMenuNotificacoes,
        alterarMenuAlertas,
        alterarMenuMinhasChamadas,
        alterarMenuContratos
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeader() {
  const context = useContext(HeaderContext);
  if (!context) throw new Error('useHeader deve ser usado dentro do Header');
  return context;
}

export { HeaderProvider };