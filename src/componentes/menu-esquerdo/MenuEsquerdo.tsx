import { AnimatePresence, motion } from "motion/react";
import FlowingMenu from './MenuAnimado';
import { useEffect, useState } from 'react';

import { useHeader } from '../../contextos/Header';


export default function MenuEsquerdo() {
  const { darkMode, menuAbertoEsquerdo } = useHeader();

  const [usuarioLogo, setUsuarioLogo] = useState('');

  useEffect(() => {
    setUsuarioLogo((darkMode ? "/usuario.png" : "/usuario2.png"));
  }, [darkMode]);

  const demoItems = [
    { link: '/Painel', text: 'Chamadas', image: 'help.png' },
    { link: '/Cameras', text: 'Câmeras', image: 'cctv.png' },
    { link: '/Dados', text: 'Dados', image: 'dados.png' },
    { link: '/Softwares', text: 'Softwares', image: 'software.png' },
    { link: '/Usuarios', text: 'Usuários', image: usuarioLogo },
    { link: '/Contratos', text: 'Contratos', image: 'documentos.png' },

  ];

  return (
    <AnimatePresence initial={false}>
      {menuAbertoEsquerdo && (
        <motion.aside
          key="menu-esquerdo"
          initial={{
            x: -320,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 0.85,

            backgroundColor: darkMode
              ? "#18181b"
              : "#ffffff",

            color: darkMode
              ? "#f4f4f5"
              : "#18181b",

            borderRightColor: darkMode
              ? "#3f3f46"
              : "#d4d4d8",

            borderRightWidth: 1,
            borderRightStyle: "solid",

            boxShadow: darkMode
              ? "8px 0 30px rgba(0, 0, 0, 0.35)"
              : "8px 0 30px rgba(0, 0, 0, 0.10)",
          }}
          exit={{
            x: -320,
            opacity: 0,
          }}
          className="fixed left-0 top-0 z-500 flex h-screen w-72 flex-col overflow-hidden px-4 py-5"
        >
          <motion.div
            animate={{
              borderBottomColor: darkMode
                ? "#3f3f46"
                : "#e4e4e7",

              borderBottomWidth: 1,
              borderBottomStyle: "solid",
            }}
            className="flex justify-center mb-5 px-2 pb-4"
          >
            <motion.h2
              animate={{
                color: darkMode
                  ? "#a5b4fc"
                  : "#040404",
              }}
              className="text-4xl font-bold tracking-widest"
            >
              MENU
            </motion.h2>


          </motion.div>

          <div className="flex-1 overflow-y-auto pr-1">
            <AnimatePresence mode="wait" initial={false}>
              <div style={{ height: 'auto', position: 'relative' }}>
                <FlowingMenu items={demoItems}
                  speed={11} />
              </div>

            </AnimatePresence>
          </div>

          <motion.div
            animate={{
              borderTopColor: darkMode
                ? "#3f3f46"
                : "#e4e4e7",

              borderTopWidth: 1,
              borderTopStyle: "solid",

              color: darkMode
                ? "#71717a"
                : "#a1a1aa",
            }}
            className="mt-4 px-2 pt-4 text-center text-xs"
          >
            Menu administrativo
          </motion.div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}