/**
 * Root application component.
 * Provider hierarchy: Redux (in main.tsx) → Auth → Theme → Analytics → QueryClient → Router
 *
 * Architecture: Frontend components talk to the API layer only.
 * The API layer talks to Supabase. The state store (Redux) is managed via the API layer.
 */
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { AnalyticsProvider } from "@/components/providers/AnalyticsProvider";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { Layout } from "@/components/layout/Layout_trucks";

// Pages
import Index from "./pages/Index";
import CatalogPage from "./pages/CatalogPage";
import VehicleDetailPage from "./pages/VehicleDetailPage";
import AuthPage from "./pages/AuthPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ProfilePage from "./pages/ProfilePage";
// import ChatPage from "./pages/ChatPage"; // Removed (Replaced by Widget)
import FavoritesPage from "./pages/FavoritesPage";
import FinancingPage from "./pages/FinancingPage";
import ProposalsPage from "./pages/ProposalsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

// Admin
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminVehiclesPage from "./pages/admin/AdminVehiclesPage";
import AdminVehicleFormPage from "./pages/admin/AdminVehicleFormPage";
import AdminLeadsPage from "./pages/admin/AdminLeadsPage";
import AdminContactsPage from "./pages/admin/AdminContactsPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminLayout from "./components/admin/layout/AdminLayout";
import { AdminRoute } from "./components/auth/AdminRoute";
import DebugAdmin from "./pages/DebugAdmin";

import ScrollToTop from "@/components/ScrollToTop";

/** Singleton QueryClient instance */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => (
  <ThemeProvider>
    <AnalyticsProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <Layout>
                <ErrorBoundary name="AppRoutes">
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Index />} />
                    <Route path="/caminhoes" element={<CatalogPage />} />
                    <Route path="/caminhoes/:slug" element={<VehicleDetailPage />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/perfil" element={<ProfilePage />} />
                    <Route path="/perfil" element={<ProfilePage />} />
                    {/* <Route path="/chat" element={<ChatPage />} /> */}
                    <Route path="/favoritos" element={<FavoritesPage />} />
                    <Route path="/financiamento" element={<FinancingPage />} />
                    <Route path="/propostas" element={<ProposalsPage />} />
                    <Route path="/sobre" element={<AboutPage />} />
                    <Route path="/contato" element={<ContactPage />} />

                    {/* Admin Routes */}
                    <Route element={<AdminRoute />}>
                      <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<AdminDashboardPage />} />
                        <Route path="veiculos" element={<AdminVehiclesPage />} />
                        <Route path="veiculos/novo" element={<AdminVehicleFormPage />} />
                        <Route path="veiculos/:id" element={<AdminVehicleFormPage />} />
                        <Route path="propostas" element={<AdminLeadsPage />} />
                        <Route path="contatos" element={<AdminContactsPage />} />
                        <Route path="usuarios" element={<AdminUsersPage />} />
                      </Route>
                    </Route>

                    <Route path="/debug-admin" element={<DebugAdmin />} />

                    {/* Catch-all */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </ErrorBoundary>
              </Layout>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </AuthProvider>
    </AnalyticsProvider>
  </ThemeProvider>
);

export default App;
