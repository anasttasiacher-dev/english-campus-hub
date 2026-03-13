import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Check, ArrowRight, Loader2 } from 'lucide-react';
import { DEMO_PRODUCT } from '@/data/demo-data';

interface Props {
  onClose: () => void;
}

export default function LandingCheckout({ onClose }: Props) {
  const [step, setStep] = useState<'info' | 'payment' | 'success'>('info');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name || !password) return;
    setStep('payment');
  };

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      login(email);
      setLoading(false);
      setStep('success');
    }, 1500);
  };

  const handleGoToApp = () => {
    onClose();
    navigate('/app');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4">
      <div className="paper-card w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X className="h-5 w-5" />
        </button>

        {step === 'info' && (
          <form onSubmit={handleInfoSubmit}>
            <h2 className="text-heading text-xl font-bold text-foreground mb-1">Оформление доступа</h2>
            <p className="text-muted-foreground text-sm mb-5">Tense Lab · {DEMO_PRODUCT.price} ₽</p>
            
            <div className="space-y-3 mb-4">
              <div className="space-y-1">
                <Label htmlFor="ch-email">Email</Label>
                <Input id="ch-email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="ch-name">Имя</Label>
                <Input id="ch-name" value={name} onChange={e => setName(e.target.value)} placeholder="Ваше имя" required />
              </div>
              <div className="space-y-1">
                <Label htmlFor="ch-pass">Пароль</Label>
                <Input id="ch-pass" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Придумайте пароль" required />
              </div>
            </div>
            
            <Button type="submit" className="w-full" size="lg">Продолжить <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </form>
        )}

        {step === 'payment' && (
          <div>
            <h2 className="text-heading text-xl font-bold text-foreground mb-1">Оплата</h2>
            <p className="text-muted-foreground text-sm mb-3">{name} · {email}</p>
            <div className="paper-card p-3 mb-5 bg-muted/50">
              <div className="flex justify-between text-sm">
                <span className="text-foreground">Tense Lab — полный доступ</span>
                <span className="font-semibold text-foreground">{DEMO_PRODUCT.price} ₽</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-3 text-center">Это демо-оплата. Нажмите кнопку для активации доступа.</p>
            <Button onClick={handlePay} className="w-full" size="lg" disabled={loading}>
              {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Обработка...</> : <>Оплатить {DEMO_PRODUCT.price} ₽</>}
            </Button>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-campus-success/15 flex items-center justify-center mx-auto mb-3">
              <Check className="h-7 w-7 text-campus-success" />
            </div>
            <h2 className="text-heading text-xl font-bold text-foreground mb-1">Доступ открыт!</h2>
            <p className="text-muted-foreground text-sm mb-5">Добро пожаловать в Tense Lab, {name}!</p>
            <Button onClick={handleGoToApp} className="w-full" size="lg">Войти в кабинет <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </div>
        )}
      </div>
    </div>
  );
}
