import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { GraduationCap, BookOpen, Target, Library, Home, LogOut, User, ChevronDown, Menu, Settings } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

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
  const [sidebarOpen, setSidebarOpen] = useState(true);

  React.useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-56' : 'w-16'} flex-shrink-0 bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 sticky top-0 h-screen`}>
        {/* Logo */}
        <div className="h-14 flex items-center px-4 gap-2 border-b border-sidebar-border">
          <GraduationCap className="h-6 w-6 text-sidebar-primary flex-shrink-0" />
          {sidebarOpen && <span className="text-heading text-sm font-semibold text-sidebar-foreground">English Campus</span>}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 px-2 space-y-0.5">
          {navItems.map(item => {
            const active = location.pathname === item.path || (item.path !== '/app' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-sidebar-accent text-sidebar-foreground' : 'text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50'}`}
              >
                <item.icon className="h-4.5 w-4.5 flex-shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User area at bottom */}
        <div className="border-t border-sidebar-border p-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors">
                <div className="w-7 h-7 rounded-full bg-sidebar-accent flex items-center justify-center flex-shrink-0">
                  <User className="h-3.5 w-3.5 text-sidebar-foreground" />
                </div>
                {sidebarOpen && (
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-xs font-medium text-sidebar-foreground truncate">{user.name}</p>
                    <p className="text-[10px] text-sidebar-foreground/50 truncate">{user.email}</p>
                  </div>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="top" className="w-48">
              <DropdownMenuItem onClick={() => navigate('/app/profile')} className="cursor-pointer">
                <Settings className="h-3.5 w-3.5 mr-2" />Профиль
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => { logout(); navigate('/'); }} className="text-destructive cursor-pointer">
                <LogOut className="h-3.5 w-3.5 mr-2" />Выйти
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Collapse button */}
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="h-10 flex items-center justify-center text-sidebar-foreground/40 hover:text-sidebar-foreground/70 border-t border-sidebar-border">
          <Menu className="h-4 w-4" />
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 p-5">
        <div className="max-w-5xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
