import { useState, type ReactNode } from 'react';
import { Link, Outlet, useLocation, useNavigate } from '@/lib/next-router-compat';
import {
    LayoutDashboard,
    Truck,
    FileText,
    LogOut,
    Menu,
    X,
    ChevronLeft,
    Users,
    MessageSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/button_trucks';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AdminLayoutProps {
    children?: ReactNode;
}

const ADMIN_TRUCKS_BASE_PATH = '/admin/caminhoes';

export default function AdminLayout({ children }: AdminLayoutProps) {
    const { signOut } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleSignOut = async () => {
        await signOut();
        navigate('/auth');
    };

    const menuItems = [
        {
            title: 'Dashboard',
            icon: LayoutDashboard,
            path: ADMIN_TRUCKS_BASE_PATH,
        },
        {
            title: 'Veículos',
            icon: Truck,
            path: `${ADMIN_TRUCKS_BASE_PATH}/veiculos`,
        },
        {
            title: 'Propostas',
            icon: FileText,
            path: `${ADMIN_TRUCKS_BASE_PATH}/propostas`,
        },
        {
            title: 'Contatos',
            icon: MessageSquare,
            path: `${ADMIN_TRUCKS_BASE_PATH}/contatos`,
        },
        {
            title: 'Usuários',
            icon: Users,
            path: `${ADMIN_TRUCKS_BASE_PATH}/usuarios`,
        },
    ];

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="min-h-screen bg-[#F8F9FC] flex font-sans">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed top-0 left-0 z-50 h-screen w-72 bg-white/80 backdrop-blur-xl border-r border-slate-100 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static",
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="h-full flex flex-col">
                    <div className="p-8 flex items-center justify-between">
                        <Link to={ADMIN_TRUCKS_BASE_PATH} className="flex items-center gap-2">
                            {/* Placeholder for Logo if needed, using text for now */}
                            {/* Logo removed as per request */}
                        </Link>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden"
                            onClick={toggleSidebar}
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    <ScrollArea className="flex-1 px-6">
                        <nav className="space-y-2">
                            {menuItems.map((item) => {
                                const isActive = location.pathname === item.path || (item.path !== ADMIN_TRUCKS_BASE_PATH && location.pathname.startsWith(item.path));
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={cn(
                                            "flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-medium transition-all duration-200 group",
                                            isActive
                                                ? "bg-blue-600 text-white shadow-[0_10px_20px_-10px_rgba(37,99,235,0.5)]"
                                                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                        )}
                                        onClick={() => setIsSidebarOpen(false)}
                                    >
                                        <item.icon className={cn("h-5 w-5 transition-transform group-hover:scale-110", isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600")} />
                                        {item.title}
                                    </Link>
                                );
                            })}
                        </nav>
                    </ScrollArea>

                    <div className="p-6 mt-auto space-y-4">
                        <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                    <span className="font-bold text-xs">AD</span>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-900">Admin</p>
                                    <p className="text-xs text-slate-500">Gerente</p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl h-9"
                                onClick={handleSignOut}
                            >
                                <LogOut className="h-4 w-4" />
                                <span className="text-xs font-medium">Sair da conta</span>
                            </Button>
                        </div>

                        <Link to="/">
                            <Button variant="outline" className="w-full justify-start gap-2 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900">
                                <ChevronLeft className="h-4 w-4" />
                                Voltar ao Site
                            </Button>
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                <header className="h-20 bg-[#F8F9FC]/80 backdrop-blur-md px-8 flex items-center justify-between lg:hidden sticky top-0 z-30">
                    <Button
                        variant="ghost"
                        size="icon"
                        className=""
                        onClick={toggleSidebar}
                    >
                        <Menu className="h-6 w-6 text-slate-600" />
                    </Button>
                    <span className="font-bold text-slate-800">Admin</span>
                </header>

                <main className="flex-1 p-6 lg:p-10 overflow-auto">
                    <div className="max-w-7xl mx-auto space-y-8">
                        {/* Header Section for Desktop */}
                        <div className="hidden lg:flex items-center justify-between mb-8">
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900">
                                    {menuItems.find(i => i.path === location.pathname)?.title || 'Visão Geral'}
                                </h1>
                                <p className="text-slate-500 text-sm mt-1">Bem-vindo ao painel de controle.</p>
                            </div>

                        </div>

                        {children ?? <Outlet />}
                    </div>
                </main>
            </div>
        </div>
    );
}
