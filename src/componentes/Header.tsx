import { motion, AnimatePresence } from 'motion/react';
import { useHeader } from '../contextos/Header';
import { useAutenticacao } from '../contextos/Autenticacao';
import {
  AlignCenter,
  DoorOpen,
  DoorClosed,
  Bell,
  BellRing,
  AlertTriangle,
  BookUser,
  MonitorSmartphone,
  User,
  ShieldAlert,
  ShieldCheck,
  Newspaper
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useFiltrosChamadas } from '@/contextos/FiltrosChamadas';
import { useDados } from '@/contextos/Dados';
import { CardChamadaNova } from '@/componentes/MinhasChamadas';
import { Paginacao } from '@/componentes/Paginacao';
import { usePaginacao } from '@/hooks/usePaginacao';

import { usePermitirSoftware } from '@/lib/query';
import MenuEsquerdo from './menu-esquerdo/MenuEsquerdo';

import logo from '../assets/128x128.png';
import logoDark from '../assets/128x128Dark.png';

export default function Header() {
  const {
    menuAbertoEsquerdo,
    darkMode,
    alterarMenuEsquerdo,
    alterarTema,
    fecharMenus,
    menuAbertoContratos,
    menuAbertoNotificacoes,
    menuAbertoAlertas,
    menuAbertoMinhasChamadas,
    alterarMenuNotificacoes,
    alterarMenuAlertas,
    alterarMenuMinhasChamadas,
    alterarMenuContratos
  } = useHeader();

  const { megaInfoChamadas } = useFiltrosChamadas();
  const { assumirChamada, notificacoesContratos, alertasUsuarios } = useDados();
  const auten = useAutenticacao();
  const meuId = auten.user?.id!;


  // 1. Busca os alertas do banco usando React Query
  const { data: alertasRaw, isLoading: carregandoAlertas } = alertasUsuarios;
  const { mutate: permitir, isPending: permitindo } = usePermitirSoftware();

  // 2. Filtra apenas os alertas que NÃO foram permitidos (infrações ativas)
  const alertas = alertasRaw?.filter((alerta) => !alerta.permitiu) || [];

  // 3. Agrupa os alertas por usuário
  const usuariosComAlertas = Array.from(
    new Map(
      alertas.map((alerta) => [
        `${alerta.usuario_atual}-${alerta.maquina_id}`,
        {
          usuario: alerta.usuario_atual,
          maquina: alerta.nome_computador,
          maquina_id: alerta.maquina_id,
          alertas: alertas.filter(
            (a) =>
              a.usuario_atual === alerta.usuario_atual &&
              a.maquina_id === alerta.maquina_id
          ),
        },
      ])
    ).values()
  );

  // 4. O contador agora representa usuários com alertas
  const numAlertas = usuariosComAlertas.length;

  const [usuarioAlertaSelecionado, setUsuarioAlertaSelecionado] = useState<string | null>(null);

  const [numMinhasChamadas, setNumMinhasChamadas] = useState(0);
  const numNotificacoes = megaInfoChamadas?.geral?.numeroParadas ?? 0;

  const [numNotificacoesContratos, setNumNotificacoesChamadas] = useState(0);

  // Instâncias dos hooks de paginação
  const pagChamadas = usePaginacao(numMinhasChamadas, 10);
  const pagNotificacoes = usePaginacao(numNotificacoes, 10);
  const pagNotificacoesContratos = usePaginacao(numNotificacoesContratos ?? 0, 10);
  const pagAlertas = usePaginacao(numAlertas, 10);

  const notificacoesContratosData =
    notificacoesContratos.data ?? [];

  useEffect(() => {
    if (!megaInfoChamadas.individual[meuId]) return;
    setNumMinhasChamadas(megaInfoChamadas.individual[meuId].chamadasNovas.length);
  }, [megaInfoChamadas, meuId]);

  useEffect(() => {
    if (!notificacoesContratos.data) return;
    setNumNotificacoesChamadas(notificacoesContratos.data.length);
  }, [notificacoesContratos.data]);

  return (
    <>
      <MenuEsquerdo />

      {/* MENU BUTTON */}
      <motion.button
        type="button"
        onClick={alterarMenuEsquerdo}
        animate={{
          opacity: menuAbertoEsquerdo ? 0.85 : 1,
          x: menuAbertoEsquerdo ? 287 : 0,
          backgroundColor: darkMode ? "#18181b" : "#ffffff",
          color: darkMode ? "#f4f4f5" : "#18181b",
          borderColor: darkMode ? "#3f3f46" : "#d4d4d8",
          borderRightWidth: 1,
          borderRightStyle: "solid",
          borderBottomWidth: 1,
          borderBottomStyle: "solid",
          boxShadow: darkMode
            ? "8px 0 30px rgba(0, 0, 0, 0.35)"
            : "8px 0 30px rgba(0, 0, 0, 0.10)",
        }}
        className={`
          fixed left-0 z-[501]
          flex h-13 w-26 items-center justify-center p-0.5 rounded-r-lg
          ${!auten.sessao ? "invisible pointer-events-none" : ""}
        `}
      >
        <AlignCenter size={40} className="select-none shadow" />
      </motion.button>

      {/* NAVBAR */}
      <motion.header
        animate={{
          backgroundColor: darkMode ? "rgba(24, 24, 27, 0.95)" : "#fff2eb",
          color: darkMode ? "#ffffff" : "#000000",
          borderColor: darkMode ? "#27272a" : "#e4e4e7",
        }}
        className="fixed left-0 top-0 z-50 flex h-14 w-full items-center border-b px-4 shadow-sm backdrop-blur-md"
      >
        {auten.tecnicoLogado && (
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            animate={{
              opacity: 1,
              x: 0,
              backgroundColor: darkMode ? "#27272a" : "#ffffff",
              color: darkMode ? "#f4f4f5" : "#27272a",
              borderColor: darkMode ? "#3f3f46" : "#d4d4d8",
            }}
            transition={{
              opacity: { duration: 0.25 },
              x: { duration: 0.25 },
            }}
            className="absolute left-30 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-3 py-1 text-sm font-medium shadow-sm select-none"
          >
            {auten.tecnicoLogado.nome}
          </motion.span>
        )}

        {/* LOGO */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <img
            src={darkMode ? logoDark : logo}
            className="h-18 w-auto select-none"
            alt="Logo"
          />
        </div>

        <div className="absolute right-8 top-1/2 flex -translate-y-1/2 items-center gap-5">
          <AnimatePresence mode="popLayout">
            {auten.sessao && (
              <motion.button
                key="contratos"
                layout
                initial={{ opacity: 0, scale: 0.7, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.7, x: 20 }}
                transition={{
                  layout: { type: "spring", stiffness: 500, damping: 35 },
                  opacity: { duration: 0.15 },
                  scale: { type: "spring", stiffness: 500, damping: 30 },
                  x: { type: "spring", stiffness: 500, damping: 30 },
                }}
                onClick={alterarMenuContratos}
                className="group relative flex h-full w-12 items-center"
              >
                <motion.div
                  animate={numNotificacoesContratos > 0 ? { x: [0, -2, 2, -2, 2, 0] } : { x: 0 }}
                  transition={{ duration: 0.3, repeat: numNotificacoesContratos > 0 ? Infinity : 0, repeatDelay: 1 }}
                >
                  {numNotificacoesContratos > 0 && (
                    <span className="absolute -right-1 -top-2 flex h-5 w-7 items-center justify-center rounded-full bg-red-500 text-base text-white">
                      {numNotificacoesContratos < 10 ? numNotificacoesContratos : "+9"}
                    </span>
                  )}
                  <Newspaper size={40} className="select-none" />
                </motion.div>
              </motion.button>
            )}
            {auten.sessao && (
              <motion.button
                key="minhas"
                layout
                initial={{ opacity: 0, scale: 0.7, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.7, x: 20 }}
                transition={{
                  layout: { type: "spring", stiffness: 500, damping: 35 },
                  opacity: { duration: 0.15 },
                  scale: { type: "spring", stiffness: 500, damping: 30 },
                  x: { type: "spring", stiffness: 500, damping: 30 },
                }}
                onClick={alterarMenuMinhasChamadas}
                className="group relative flex h-full w-12 items-center"
              >
                <motion.div
                  animate={numMinhasChamadas > 0 ? { x: [0, -2, 2, -2, 2, 0] } : { x: 0 }}
                  transition={{ duration: 0.3, repeat: numMinhasChamadas > 0 ? Infinity : 0, repeatDelay: 1 }}
                >
                  {numMinhasChamadas > 0 && (
                    <span className="absolute -right-1 -top-2 flex h-5 w-7 items-center justify-center rounded-full bg-red-500 text-base text-white">
                      {numMinhasChamadas < 10 ? numMinhasChamadas : "+9"}
                    </span>
                  )}
                  <BookUser size={40} className="select-none" />
                </motion.div>
              </motion.button>
            )}

            {auten.sessao && (
              <motion.button
                key="alerta"
                layout
                initial={{ opacity: 0, scale: 0.7, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.7, x: 20 }}
                transition={{
                  layout: { type: "spring", stiffness: 500, damping: 35 },
                  opacity: { duration: 0.15 },
                  scale: { type: "spring", stiffness: 500, damping: 30 },
                  x: { type: "spring", stiffness: 500, damping: 30 },
                }}
                onClick={alterarMenuAlertas}
                className="group relative flex h-full w-12 items-center"
              >
                <motion.div
                  animate={numAlertas > 0 ? { x: [0, -2, 2, -2, 2, 0] } : { x: 0 }}
                  transition={{ duration: 0.3, repeat: numAlertas > 0 ? Infinity : 0, repeatDelay: 1 }}
                >
                  {numAlertas > 0 && (
                    <span className="absolute -right-1 -top-2 flex h-5 w-7 items-center justify-center rounded-full bg-red-500 text-base text-white">
                      {numAlertas < 10 ? numAlertas : "+9"}
                    </span>
                  )}
                  <AlertTriangle size={40} className="select-none" />
                </motion.div>
              </motion.button>
            )}

            {auten.sessao && (
              <motion.button
                key="notificacoes"
                layout
                initial={{ opacity: 0, scale: 0.7, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.7, x: 20 }}
                transition={{
                  layout: { type: "spring", stiffness: 500, damping: 35 },
                  opacity: { duration: 0.15 },
                  scale: { type: "spring", stiffness: 500, damping: 30 },
                  x: { type: "spring", stiffness: 500, damping: 30 },
                }}
                onClick={alterarMenuNotificacoes}
                className="group relative flex h-full w-12 items-center"
              >
                <motion.div
                  animate={numNotificacoes > 0 ? { x: [0, -2, 2, -2, 2, 0] } : { x: 0 }}
                  transition={{ duration: 0.3, repeat: numNotificacoes > 0 ? Infinity : 0, repeatDelay: 1 }}
                >
                  {numNotificacoes > 0 && (
                    <span className="absolute -right-1 -top-2 flex h-5 w-7 items-center justify-center rounded-full bg-red-500 text-base text-white">
                      {numNotificacoes < 10 ? numNotificacoes : "+9"}
                    </span>
                  )}
                  {numNotificacoes > 0 ? (
                    <BellRing size={40} className="select-none" />
                  ) : (
                    <Bell size={40} className="select-none" />
                  )}
                </motion.div>
              </motion.button>
            )}

            <motion.button
              type="button"
              onClick={alterarTema}
              animate={{ backgroundColor: darkMode ? "#333333" : "#bcb8b8" }}
              transition={{ backgroundColor: { duration: 0.2 } }}
              className="flex h-7 w-12 items-center rounded-lg p-0.5"
            >
              <motion.div
                animate={{
                  x: darkMode ? 20 : 0,
                  backgroundColor: darkMode ? "#bcb8b8" : "#333333",
                }}
                transition={{
                  x: { type: "spring", stiffness: 500, damping: 30 },
                  backgroundColor: { duration: 0.2 },
                }}
                className="h-6 w-6 rounded-md"
              />
            </motion.button>

            {auten.sessao && (
              <motion.button
                key="logout"
                layout
                initial={{ opacity: 0, scale: 0.7, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.7, x: 20 }}
                transition={{
                  layout: { type: "spring", stiffness: 500, damping: 35 },
                  opacity: { duration: 0.15 },
                  scale: { type: "spring", stiffness: 500, damping: 30 },
                  x: { type: "spring", stiffness: 500, damping: 30 },
                }}
                type="button"
                onClick={auten.logout}
                className="flex gap-2 h-7 ml-10 w-32 items-center p-0.5 group"
              >
                <span className="text-3xl">Sair </span>
                <DoorClosed size={40} className="select-none group-hover:hidden" />
                <DoorOpen size={40} className="hidden select-none group-hover:block" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      <AnimatePresence mode='wait'>
        {/* OVERLAY */}
        {(menuAbertoEsquerdo || menuAbertoContratos || menuAbertoNotificacoes || menuAbertoAlertas || menuAbertoMinhasChamadas) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={fecharMenus}
            className={`fixed inset-0 ${menuAbertoEsquerdo ? "z-[299]" : "z-[999]"} bg-black/40`}
          />
        )}

        {/* =========================================
    MENU NOTIFICAÇÕES DE CONTRATOS
========================================= */}
        {menuAbertoContratos && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30
            }}
            onClick={(e) => e.stopPropagation()}
            className={`fixed left-1/2 top-1/2 z-[1000] h-[min(80vh,700px)] w-[min(90vw,900px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border shadow-2xl ${darkMode
              ? "border-zinc-700 bg-zinc-900 text-zinc-100"
              : "border-zinc-200 bg-white text-zinc-900"
              }`}
          >
            {/* HEADER */}
            <div
              className={`flex items-center justify-between border-b px-5 py-4 ${darkMode
                ? "border-zinc-700"
                : "border-zinc-200"
                }`}
            >
              <div className="flex items-center gap-3">
                <Newspaper
                  size={28}
                  className="select-none"
                />

                <div>
                  <h2 className="text-lg font-semibold">
                    Notificações de Contratos
                  </h2>

                  <p
                    className={`text-sm ${darkMode
                      ? "text-zinc-400"
                      : "text-zinc-500"
                      }`}
                  >
                    Contratos próximos do vencimento
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={fecharMenus}
                className={`rounded-lg px-3 py-1 text-sm transition-colors ${darkMode
                  ? "hover:bg-zinc-800"
                  : "hover:bg-zinc-100"
                  }`}
              >
                Fechar
              </button>
            </div>

            {/* CONTEÚDO */}
            <div className="h-[calc(100%-81px)] overflow-y-auto p-5">

              <Paginacao
                pagina={pagNotificacoesContratos.pagina}
                totalPaginas={pagNotificacoesContratos.totalPaginas}
                setPagina={pagNotificacoesContratos.setPagina}
                darkMode={darkMode}
              />

              {numNotificacoesContratos > 0 ? (
                <div className="space-y-3">

                  {notificacoesContratosData
                    .slice(
                      pagNotificacoesContratos.inicio,
                      pagNotificacoesContratos.fim
                    )
                    .map((notificacao) => {

                      const urgente =
                        notificacao.dias_restantes <= 30;

                      return (
                        <div
                          key={notificacao.id}
                          className={`rounded-xl border p-4 transition-colors ${urgente
                            ? darkMode
                              ? "border-red-900/60 bg-red-950/20"
                              : "border-red-200 bg-red-50/50"
                            : darkMode
                              ? "border-zinc-700 bg-zinc-800/60"
                              : "border-zinc-200 bg-zinc-50"
                            }`}
                        >

                          {/* TÍTULO */}
                          <div className="mb-3 flex items-start justify-between gap-3">

                            <div className="flex items-center gap-2">

                              {urgente ? (
                                <AlertTriangle
                                  size={20}
                                  className="text-red-500"
                                />
                              ) : (
                                <Newspaper
                                  size={20}
                                  className={
                                    darkMode
                                      ? "text-zinc-300"
                                      : "text-zinc-600"
                                  }
                                />
                              )}

                              <h3 className="text-base font-semibold">
                                Contrato próximo do vencimento
                              </h3>

                            </div>

                            {/* DIAS */}
                            <span
                              className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${urgente
                                ? "bg-red-500 text-white"
                                : darkMode
                                  ? "bg-zinc-700 text-zinc-200"
                                  : "bg-zinc-200 text-zinc-700"
                                }`}
                            >
                              {notificacao.dias_restantes}{" "}
                              {notificacao.dias_restantes === 1
                                ? "dia"
                                : "dias"}
                            </span>

                          </div>

                          {/* MENSAGEM */}
                          <p
                            className={`mb-4 break-words text-sm leading-relaxed ${darkMode
                              ? "text-zinc-300"
                              : "text-zinc-600"
                              }`}
                          >
                            {notificacao.mensagem}
                          </p>

                          {/* INFORMAÇÕES */}
                          <div
                            className={`flex flex-wrap justify-between gap-3 border-t pt-3 text-sm ${darkMode
                              ? "border-zinc-700"
                              : "border-zinc-200"
                              }`}
                          >

                            <div>
                              <span
                                className={
                                  darkMode
                                    ? "text-zinc-500"
                                    : "text-zinc-400"
                                }
                              >
                                Dias restantes:
                              </span>

                              <span className="ml-2 font-medium">
                                {notificacao.dias_restantes}
                              </span>
                            </div>

                            <div>
                              <span
                                className={
                                  darkMode
                                    ? "text-zinc-500"
                                    : "text-zinc-400"
                                }
                              >
                                Notificado em:
                              </span>

                              <span className="ml-2 font-medium">
                                {new Date(
                                  notificacao.criada_em
                                ).toLocaleDateString(
                                  "pt-BR"
                                )}
                              </span>
                            </div>

                          </div>

                        </div>
                      );
                    })}

                </div>
              ) : (
                <div className="flex min-h-32 items-center justify-center">
                  <p
                    className={
                      darkMode
                        ? "text-zinc-400"
                        : "text-zinc-500"
                    }
                  >
                    Nenhuma notificação de contrato no momento.
                  </p>
                </div>
              )}

            </div>
          </motion.div>
        )}


        {/* =========================================
            MENU MINHAS CHAMADAS
        ========================================= */}
        {menuAbertoMinhasChamadas && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className={`fixed left-1/2 top-1/3 z-[1000] w-[min(90vw,900px)] -translate-x-1/2 -translate-y-1/2  rounded-2xl border shadow-2xl ${darkMode ? "border-zinc-700 bg-zinc-900 text-zinc-100" : "border-zinc-200 bg-white text-zinc-900"
              }`}
          >
            <div className={`flex items-center justify-between border-b px-5 py-4 ${darkMode ? "border-zinc-700" : "border-zinc-200"}`}>
              <div className="flex items-center gap-3">
                <BookUser size={28} className="select-none" />
                <h2 className="text-lg font-semibold">Minhas Chamadas</h2>
              </div>
              <button
                type="button"
                onClick={fecharMenus}
                className={`rounded-lg px-3 py-1 text-sm transition-colors ${darkMode ? "hover:bg-zinc-800" : "hover:bg-zinc-100"}`}
              >
                Fechar
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-5">
              <Paginacao pagina={pagChamadas.pagina} totalPaginas={pagChamadas.totalPaginas} setPagina={pagChamadas.setPagina} darkMode={darkMode} />
              {numMinhasChamadas > 0 ? (
                <div className="space-y-3">
                  {megaInfoChamadas?.individual[meuId].chamadasNovas
                    ?.slice(pagChamadas.inicio, pagChamadas.fim)
                    .map((nova) => (
                      <CardChamadaNova key={nova.id} nova={nova} />
                    ))}
                </div>
              ) : (
                <div className="flex min-h-32 items-center justify-center">
                  <p className={darkMode ? "text-zinc-400" : "text-zinc-500"}>Sem chamadas no momento.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* =========================================
            MENU ALERTAS DE INVENTÁRIO
        ========================================= */}
        {menuAbertoAlertas && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className={`fixed h-full left-1/2 top-1/2 z-[1000] overflow-y-auto  w-[min(90vw,900px)]  -translate-x-1/2 -translate-y-1/2  rounded-2xl border shadow-2xl ${darkMode ? "border-zinc-700 bg-zinc-900 text-zinc-100" : "border-zinc-200 bg-white text-zinc-900"
              }`}
          >
            <div className={`flex overflow-y-auto items-center justify-between border-b px-5 py-4 ${darkMode ? "border-zinc-700" : "border-zinc-200"}`}>
              <div className="flex items-center gap-3">
                <AlertTriangle size={28} className="select-none text-red-500" />
                <h2 className="text-lg font-semibold">Alertas de Software</h2>
              </div>
              <button
                type="button"
                onClick={fecharMenus}
                className={`rounded-lg px-3 py-1 text-sm transition-colors ${darkMode ? "hover:bg-zinc-800" : "hover:bg-zinc-100"}`}
              >
                Fechar
              </button>
            </div>

            <div className="max-h-[60vh] p-5">

              {usuarioAlertaSelecionado === null ? (
                <>
                  <Paginacao
                    pagina={pagAlertas.pagina}
                    totalPaginas={pagAlertas.totalPaginas}
                    setPagina={pagAlertas.setPagina}
                    darkMode={darkMode}
                  />

                  {carregandoAlertas ? (
                    <div className="flex min-h-32 items-center justify-center">
                      <p className={darkMode ? "text-zinc-400" : "text-zinc-500"}>Buscando alertas no servidor...</p>
                    </div>
                  ) : numAlertas > 0 ? (
                    <div className="space-y-3">

                      {usuariosComAlertas
                        .slice(pagAlertas.inicio, pagAlertas.fim)
                        .map((usuario) => (
                          <button
                            key={`${usuario.usuario}-${usuario.maquina_id}`}
                            type="button"
                            onClick={() =>
                              setUsuarioAlertaSelecionado(
                                `${usuario.usuario}-${usuario.maquina_id}`
                              )
                            }
                            className={`w-full rounded-xl border p-4 text-left transition-colors ${darkMode
                              ? "border-red-900/50 bg-red-950/20 hover:bg-red-950/40"
                              : "border-red-200 bg-red-50/50 hover:bg-red-100"
                              }`}
                          >
                            <div className="flex items-center justify-between gap-3">

                              <div className="flex items-center gap-3">
                                <div
                                  className={`flex h-11 w-11 items-center justify-center rounded-full ${darkMode
                                    ? "bg-zinc-800"
                                    : "bg-white"
                                    }`}
                                >
                                  <User
                                    size={24}
                                    className="text-red-500"
                                  />
                                </div>

                                <div>
                                  <h3 className="font-semibold">
                                    {usuario.usuario}
                                  </h3>

                                  <div className="flex items-center gap-2">
                                    <MonitorSmartphone
                                      size={14}
                                      className={darkMode
                                        ? "text-zinc-400"
                                        : "text-zinc-500"}
                                    />

                                    <p
                                      className={`text-sm ${darkMode
                                        ? "text-zinc-400"
                                        : "text-zinc-500"
                                        }`}
                                    >
                                      {usuario.maquina}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-3">

                                <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
                                  {usuario.alertas.length}
                                </span>

                                <span className="text-xl">
                                  →
                                </span>

                              </div>

                            </div>
                          </button>
                        ))}

                    </div>
                  ) : (
                    <div className="flex min-h-32 items-center justify-center">
                      <p className={darkMode ? "text-zinc-400" : "text-zinc-500"}>
                        Nenhuma infração de software detectada. Tudo limpo!
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setUsuarioAlertaSelecionado(null)}
                    className={`mb-4 rounded-lg px-3 py-2 text-sm transition-colors ${darkMode
                      ? "hover:bg-zinc-800"
                      : "hover:bg-zinc-100"
                      }`}
                  >
                    ← Voltar
                  </button>

                  {(() => {
                    const usuario = usuariosComAlertas.find(
                      (u) =>
                        `${u.usuario}-${u.maquina_id}` ===
                        usuarioAlertaSelecionado
                    );

                    if (!usuario) return null;

                    return (
                      <>
                        <div className="mb-5">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-12 w-12 items-center justify-center rounded-full ${darkMode
                                ? "bg-zinc-800"
                                : "bg-zinc-100"
                                }`}
                            >
                              <User
                                size={26}
                                className="text-red-500"
                              />
                            </div>

                            <div>
                              <h2 className="text-xl font-semibold">
                                {usuario.usuario}
                              </h2>

                              <div className="flex items-center gap-2">
                                <MonitorSmartphone
                                  size={16}
                                  className={darkMode
                                    ? "text-zinc-400"
                                    : "text-zinc-500"}
                                />

                                <p
                                  className={
                                    darkMode
                                      ? "text-zinc-400"
                                      : "text-zinc-500"
                                  }
                                >
                                  {usuario.maquina}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mb-3 flex items-center gap-2">
                          <ShieldAlert
                            size={20}
                            className={
                              darkMode
                                ? "text-red-400"
                                : "text-red-600"
                            }
                          />

                          <h3 className="font-semibold">
                            Softwares restritos detectados
                          </h3>
                        </div>

                        <div className="space-y-3">
                          {usuario.alertas.map((alerta) => (
                            <div
                              key={`${alerta.maquina_id}-${alerta.programa_id}`}
                              className={`flex flex-col gap-3 rounded-xl border p-4 transition-colors ${darkMode
                                ? "border-red-900/50 bg-red-950/20"
                                : "border-red-200 bg-red-50/50"
                                }`}
                            >
                              {/* Título do Alerta */}
                              <div className="flex items-center gap-2 border-b border-inherit pb-2">
                                <ShieldAlert
                                  size={18}
                                  className={darkMode ? "text-red-400" : "text-red-600"}
                                />

                                <span
                                  className={`font-semibold ${darkMode ? "text-red-400" : "text-red-700"
                                    }`}
                                >
                                  Software Restrito Detectado
                                </span>
                              </div>

                              {/* Grid de Informações */}
                              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                                <div className="flex items-center gap-2 text-sm">
                                  <MonitorSmartphone
                                    size={16}
                                    className={darkMode ? "text-zinc-400" : "text-zinc-500"}
                                  />

                                  <span
                                    className={darkMode ? "text-zinc-300" : "text-zinc-700"}
                                  >
                                    <strong className="mr-1">Máquina:</strong>
                                    {alerta.nome_computador}
                                  </span>
                                </div>

                                <div className="flex items-center gap-2 text-sm">
                                  <User
                                    size={16}
                                    className={darkMode ? "text-zinc-400" : "text-zinc-500"}
                                  />

                                  <span
                                    className={darkMode ? "text-zinc-300" : "text-zinc-700"}
                                  >
                                    <strong className="mr-1">Usuário:</strong>
                                    {alerta.usuario_atual}
                                  </span>
                                </div>
                              </div>

                              <div
                                className={`mt-1 rounded-md p-3 text-sm font-medium border ${darkMode
                                  ? "bg-zinc-900/50 border-zinc-800 text-zinc-300"
                                  : "bg-white border-zinc-200 text-zinc-700"
                                  }`}
                              >
                                <span className="text-red-500 mr-2">Programa:</span>
                                {alerta.nome_programa}
                              </div>

                              <div
                                className={`flex flex-row justify-end gap-3 border-t pt-3 mt-1 ${darkMode
                                  ? "border-red-900/30"
                                  : "border-red-200/50"
                                  }`}
                              >
                                <button
                                  type="button"
                                  disabled={permitindo}
                                  onClick={() =>
                                    permitir({
                                      maquinaId: alerta.maquina_id,
                                      programaId: alerta.programa_id
                                    })
                                  }
                                  className={`
                                    flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold shadow-sm transition-all
                                    ${darkMode
                                      ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white border border-zinc-700"
                                      : "bg-white text-zinc-700 hover:bg-zinc-50 border border-zinc-300"
                                    }
                                    ${permitindo ? "opacity-50 cursor-not-allowed" : ""}
                                  `}
                                >
                                  <ShieldCheck
                                    size={18}
                                    className="text-green-500"
                                  />

                                  {permitindo
                                    ? "Aprovando..."
                                    : "Permitir Exceção"}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    );
                  })()}
                </>
              )}

            </div>
          </motion.div>
        )}

        {/* =========================================
            MENU NOTIFICAÇÕES 
        ========================================= */}
        {menuAbertoNotificacoes && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className={`overflow-y-auto h-200 pb-10 fixed left-1/2 top-1/2 z-[1000] w-[min(1100vw,900px)] -translate-x-1/2 -translate-y-1/2  rounded-2xl border shadow-2xl ${darkMode ? "border-zinc-700 bg-zinc-900 text-zinc-100" : "border-zinc-200 bg-white text-zinc-900"
              }`}
          >
            <div className={`flex items-center justify-between border-b px-5 py-4 ${darkMode ? "border-zinc-700" : "border-zinc-200"}`}>
              <div className="flex items-center gap-3">
                <Bell size={28} className="select-none" />
                <h2 className="text-lg font-semibold">Notificações</h2>
              </div>
              <button
                type="button"
                onClick={fecharMenus}
                className={`rounded-lg px-3 py-1 text-sm transition-colors ${darkMode ? "hover:bg-zinc-800" : "hover:bg-zinc-100"}`}
              >
                Fechar
              </button>
            </div>

            <div className="max-h-[60vh]  p-5">
              <Paginacao pagina={pagNotificacoes.pagina} totalPaginas={pagNotificacoes.totalPaginas} setPagina={pagNotificacoes.setPagina} darkMode={darkMode} />
              {numNotificacoes > 0 ? (
                <div className="space-y-3">
                  {megaInfoChamadas?.geral?.listaParadas?.slice(pagNotificacoes.inicio, pagNotificacoes.fim).map((parada) => (
                    <div
                      key={parada.id}
                      className={`rounded-xl border p-4 ${darkMode ? "border-zinc-700 bg-zinc-800/60" : "border-zinc-200 bg-zinc-50"}`}
                    >
                      <div className="mb-2 flex items-start justify-between gap-3">
                        <h3 className="text-base font-semibold leading-snug">{parada.titulo}</h3>
                        {parada.categoria && (
                          <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${darkMode ? "bg-zinc-700 text-zinc-200" : "bg-zinc-200 text-zinc-700"}`}>
                            {parada.categoria}
                          </span>
                        )}
                      </div>
                      {parada.descricao && (
                        <p className={`mb-3 break-words text-sm leading-relaxed ${darkMode ? "text-zinc-300" : "text-zinc-600"}`}>
                          {parada.descricao}
                        </p>
                      )}
                      <div className={`flex flex-row justify-between gap-1 border-t pt-3 text-sm ${darkMode ? "border-zinc-700" : "border-zinc-200"}`}>
                        <div>
                          {parada.requerente && (
                            <div className="flex gap-2">
                              <span className={darkMode ? "text-zinc-500" : "text-zinc-400"}>Requerente:</span>
                              <span className="font-medium">{parada.requerente}</span>
                            </div>
                          )}
                          {parada.email_requerente && (
                            <div className="flex gap-2">
                              <span className={darkMode ? "text-zinc-500" : "text-zinc-400"}>E-mail:</span>
                              <span className="truncate">{parada.email_requerente}</span>
                            </div>
                          )}
                        </div>
                        <div className="h-auto w-auto pr-10">
                          <motion.button
                            onClick={() => assumirChamada(parada.id, auten.tecnicoLogado!.id)}
                            className="w-50 h-full rounded-lg text-2xl font-semibold"
                            whileHover={{ backgroundColor: "#1111bb", color: "#fff" }}
                          >
                            ATENDER
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex min-h-32 items-center justify-center">
                  <p className={darkMode ? "text-zinc-400" : "text-zinc-500"}>Nenhuma notificação no momento.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence >
    </>
  );
}