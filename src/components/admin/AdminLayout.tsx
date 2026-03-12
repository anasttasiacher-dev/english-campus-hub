import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { GraduationCap, LayoutDashboard, Package, BookOpen, FileText, Target, Library, Users, ShoppingCart, Settings, LogOut, ChevronDown, User } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const navItems = [
  { label: 'Обзор', path: '/admin', icon: LayoutDashboard },
  { label: 'Продукты', path: '/admin/products', icon: Package },
  { label: 'Программа', path: '/admin/program', icon: BookOpen },
  { label: 'Уроки', path: '/admin/lessons', icon: FileText },
  { label: 'Тренажёр', path: '/admin/trainer', icon: Target },
  { label: 'Библиотека', path: '/admin/library', icon: Library },
  { label: 'Ученики', path: '/admin/students', icon: Users },
  { label: 'Заказы', path: '/admin/orders', icon: ShoppingCart },
  { label: 'Настройки', path: '/admin/settings', icon: Settings },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-card border-r border-border flex-shrink-0 flex flex-col sticky top-0 h-screen">
        <div className="p-4 border-b border-border">
          <Link to="/admin" className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            <span className="text-heading text-sm font-semibold text-primary">Admin Panel</span>
          </Link>
        </div>
        <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
          {navItems.map(item => {
            const active = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${active ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}>
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-border">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-muted-foreground">
                <User className="h-4 w-4" /><span className="text-xs truncate">{user.name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-44">
              <div className="px-2 py-1.5 text-xs text-muted-foreground">{user.email}</div>
              <DropdownMenuItem onClick={() => { logout(); navigate('/'); }} className="text-destructive cursor-pointer">
                <LogOut className="h-3.5 w-3.5 mr-2" />Выйти
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
