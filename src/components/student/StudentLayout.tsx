import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { GraduationCap, BookOpen, Target, Library, Home, LogOut, User, ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const navItems = [
  { label: 'Кабинет', path: '/app', icon: Home },
  { label: 'Программа', path: '/app/program', icon: BookOpen },
  { label: 'Тренажёр', path: '/app/trainer', icon: Target },
  { label: 'Библиотека', path: '/app/library', icon: Library },
];

export default function StudentLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-primary border-b border-primary/20">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/app" className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
              <span className="text-heading text-sm font-semibold text-primary-foreground hidden sm:block">English Campus</span>
            </Link>
            <nav className="flex items-center gap-1">
              {navItems.map(item => {
                const active = location.pathname === item.path || (item.path !== '/app' && location.pathname.startsWith(item.path));
                return (
                  <Link key={item.path} to={item.path} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${active ? 'bg-primary-foreground/15 text-primary-foreground' : 'text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10'}`}>
                    <item.icon className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline text-xs">{user.name}</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <div className="px-2 py-1.5 text-xs text-muted-foreground">{user.email}</div>
              <DropdownMenuItem onClick={() => { logout(); navigate('/'); }} className="text-destructive cursor-pointer">
                <LogOut className="h-3.5 w-3.5 mr-2" />Выйти
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
