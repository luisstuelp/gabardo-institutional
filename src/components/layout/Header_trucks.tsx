import { useState } from 'react';
import { Link, useLocation } from '@/lib/next-router-compat';
import { Menu, X, Heart, User, Search, LogOut, FileText, MessageSquare, LayoutDashboard } from 'lucide-react';
import gabardoLogo from '@/assets/gabardo-logo-blue.png';
import { Button } from '@/components/ui/button_trucks';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useFavorites } from '@/hooks/useFavorites';
// import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher'; // Removed
import { useAppDispatch } from '@/store';
import { toggleChat } from '@/store/slices/uiSlice';
import { useAdmin } from '@/hooks/useAdmin';

const navigation = [
  { name: 'Início', href: '/', external: false },
  { name: 'Caminhões', href: '/caminhoes', external: false },
  { name: 'Contato', href: '/contato', external: false },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { favorites } = useFavorites();
  const dispatch = useAppDispatch();
  const { isAdmin } = useAdmin();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-sm">
      <div className="container-gabardo">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo - Responsive sizes */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img
              src={gabardoLogo.src}
              alt="Gabardo"
              className="h-6 md:h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation - Center */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item) =>
              item.external ? (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium transition-colors hover:text-[#122d54] text-slate-600"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-[#122d54]",
                    location.pathname === item.href
                      ? "text-[#122d54]"
                      : "text-slate-600"
                  )}
                >
                  {item.name}
                </Link>
              )
            )}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {/* Theme Switcher */}
            {/* Favorites */}
            <Link
              to="/favoritos"
              className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full text-slate-500 hover:bg-slate-100 hover:text-[#122d54] transition-colors relative"
            >
              <Heart className="h-5 w-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-[#122d54] text-white text-[10px] flex items-center justify-center font-semibold">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* User */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full text-slate-500 hover:bg-slate-100 hover:text-[#122d54] transition-colors">
                    <User className="h-5 w-5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {isAdmin && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/admin/caminhoes" className="flex items-center gap-2 font-medium text-blue-600">
                          <LayoutDashboard className="h-4 w-4" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem asChild>
                    <Link to="/perfil" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Meu Perfil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/favoritos" className="flex items-center gap-2">
                      <Heart className="h-4 w-4" />
                      Meus Favoritos
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/propostas" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Minhas Propostas
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => dispatch(toggleChat())} className="cursor-pointer">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Chat IA
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-600 flex items-center gap-2">
                    <LogOut className="h-4 w-4" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                to="/auth"
                className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full text-slate-500 hover:bg-slate-100 hover:text-[#122d54] transition-colors"
              >
                <User className="h-5 w-5" />
              </Link>
            )}



            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-9 w-9"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden border-t border-slate-100 py-3">
            <div className="flex flex-col gap-1">
              {navigation.map((item) =>
                item.external ? (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-medium px-3 py-2 rounded-md transition-colors text-slate-600 hover:bg-slate-50"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "text-sm font-medium px-3 py-2 rounded-md transition-colors",
                      location.pathname === item.href
                        ? "text-[#122d54] bg-slate-50"
                        : "text-slate-600 hover:bg-slate-50"
                    )}
                  >
                    {item.name}
                  </Link>
                )
              )}

              {/* Mobile user actions */}
              <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-slate-100">
                {isAdmin && (
                  <Link to="/admin/caminhoes" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard Admin
                    </Button>
                  </Link>
                )}
                <div className="flex flex-wrap gap-2">
                  <Link to="/favoritos" onClick={() => setMobileMenuOpen(false)} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full h-9 text-sm">
                      <Heart className="h-4 w-4 mr-1.5" />
                      Favoritos
                    </Button>
                  </Link>

                  <Link to="/propostas" onClick={() => setMobileMenuOpen(false)} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full h-9 text-sm">
                      <FileText className="h-4 w-4 mr-1.5" />
                      Propostas
                    </Button>
                  </Link>
                  {!user && (
                    <Link to="/auth" onClick={() => setMobileMenuOpen(false)} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full h-9 text-sm">
                        <User className="h-4 w-4 mr-1.5" />
                        Entrar
                      </Button>
                    </Link>
                  )}
                </div>
              </div>

              <Link to="/caminhoes" onClick={() => setMobileMenuOpen(false)} className="mt-2">
                <Button className="w-full h-9 bg-[#122d54] hover:bg-[#0d1f3d] text-white text-sm">
                  <Search className="h-4 w-4 mr-1.5" />
                  Buscar Caminhões
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
