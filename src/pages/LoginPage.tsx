import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GraduationCap } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = React.useState('');
  const { login, loginAsStudent, loginAsAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email)) navigate('/app');
  };

  return (
    <div className="min-h-screen flex items-center justify-center campus-gradient p-4">
      <div className="paper-card w-full max-w-sm p-8">
        <div className="flex items-center justify-center gap-2 mb-6">
          <GraduationCap className="h-7 w-7 text-primary" />
          <span className="text-heading text-lg font-semibold text-primary">English Campus</span>
        </div>
        <h1 className="text-heading text-2xl font-bold text-center text-foreground mb-2">Вход</h1>
        <p className="text-muted-foreground text-sm text-center mb-6">Введите email для входа на платформу</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required />
          <Button type="submit" className="w-full" size="lg">Войти</Button>
        </form>
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground text-center mb-3">Демо-доступ</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1" onClick={() => { loginAsStudent(); navigate('/app'); }}>Как студент</Button>
            <Button variant="outline" size="sm" className="flex-1" onClick={() => { loginAsAdmin(); navigate('/admin'); }}>Как админ</Button>
          </div>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-4">
          <Link to="/" className="underline hover:text-foreground">← На главную</Link>
        </p>
      </div>
    </div>
  );
}
