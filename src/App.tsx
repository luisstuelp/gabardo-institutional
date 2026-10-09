import { HeaderProvider } from './contextos/Header';
import { DadosProvider } from './contextos/Dados';
import { AutenticacaoProvider } from './contextos/Autenticacao';
import { FiltrosChamadasProvider } from './contextos/FiltrosChamadas';
import { InventarioProvider } from './contextos/Inventario';
import Header from './componentes/Header';

import Login from "@/pages/Login";
import Principal from "@/pages/Painel";
import Softwares from "@/pages/Softwares";
import Usuarios from "@/pages/Usuarios";
import Cameras from "@/pages/Cameras";
import Contratos from "@/pages/Contratos";
import Dados from "@/pages/Dados";
import LoggedRoute from "@/pages/LoggedRoutes";
import { Navigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <>
      <BrowserRouter>
        <AutenticacaoProvider>
          <DadosProvider>

            <FiltrosChamadasProvider>
              <HeaderProvider>
                <InventarioProvider>
                  <Header />

                  <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/PSI" element={<Navigate to="/PSI.pdf" replace />} />

                    <Route element={<LoggedRoute />}>
                      <Route path="/Painel" element={<Principal />} />
                      <Route path="/Softwares" element={<Softwares />} />
                      <Route path="/Usuarios" element={<Usuarios />} />
                      <Route path="/Cameras" element={<Cameras />} />
                      <Route path="/Contratos" element={<Contratos />} />
                      <Route path="/Dados" element={<Dados />} />

                    </Route>
                  </Routes>

                  {/*<DashboardHeader />*/}
                </InventarioProvider>

              </HeaderProvider>
            </FiltrosChamadasProvider>
          </DadosProvider>
        </AutenticacaoProvider>
      </BrowserRouter>
    </>
  )
}

export default App