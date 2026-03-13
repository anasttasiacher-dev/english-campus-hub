import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check } from 'lucide-react';
import { DEMO_TRAINER_STATS } from '@/data/demo-data';

export default function ProfilePage() {
  const { user } = useAuth();
  const stats = DEMO_TRAINER_STATS;

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-5 max-w-2xl">
      <div>
        <h1 className="text-heading text-2xl font-bold text-foreground mb-1">Профиль</h1>
        <p className="text-muted-foreground text-sm">Управление аккаунтом</p>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="paper-card p-4 text-center">
          <p className="text-xl font-bold text-foreground">{stats.academic_points}</p>
          <p className="text-xs text-muted-foreground">Academic Points</p>
        </div>
        <div className="paper-card p-4 text-center">
          <p className="text-xl font-bold text-foreground">{stats.accuracy_avg}%</p>
          <p className="text-xs text-muted-foreground">Точность</p>
        </div>
        <div className="paper-card p-4 text-center">
          <p className="text-xl font-bold text-foreground">{stats.practices_completed}</p>
          <p className="text-xs text-muted-foreground">Практик</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="paper-card p-5 space-y-4">
        <h2 className="text-heading text-lg font-semibold text-foreground">Личные данные</h2>

        <div className="space-y-1.5">
          <Label htmlFor="name">Имя</Label>
          <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="Ваше имя" />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password">Новый пароль</Label>
          <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Введите новый пароль" />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="confirm">Подтвердите пароль</Label>
          <Input id="confirm" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Повторите пароль" />
        </div>

        <Button type="submit" className="rounded-lg">
          {saved ? <><Check className="h-4 w-4 mr-2" />Сохранено</> : 'Сохранить изменения'}
        </Button>
      </form>

      {/* Weak topics */}
      {stats.weak_topics_json.length > 0 && (
        <div className="paper-card p-5">
          <h2 className="text-heading text-lg font-semibold text-foreground mb-2">Слабые места</h2>
          <div className="flex flex-wrap gap-2">
            {stats.weak_topics_json.map(t => (
              <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground font-medium">
                {t.replace(/_/g, ' ')}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
