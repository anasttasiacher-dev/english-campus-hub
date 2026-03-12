import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Check, ArrowRight, Loader2 } from 'lucide-react';
import { DEMO_PRODUCT } from '@/data/demo-data';

interface Props {
  onClose: () => void;
}

export default function LandingCheckout({ onClose }: Props) {
  const [step, setStep] = useState<'email' | 'payment' | 'success'>('email');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
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
      <div className="paper-card w-full max-w-md p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X className="h-5 w-5" />
        </button>

        {step === 'email' && (
          <form onSubmit={handleEmailSubmit}>
            <h2 className="text-heading text-2xl font-bold text-foreground mb-2">Оформление доступа</h2>
            <p className="text-muted-foreground text-sm mb-6">Tense Lab · {DEMO_PRODUCT.price} ₽</p>
            <label className="text-sm font-medium text-foreground mb-2 block">Ваш email</label>
            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" className="mb-4" required />
            <Button type="submit" className="w-full" size="lg">Продолжить <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </form>
        )}

        {step === 'payment' && (
          <div>
            <h2 className="text-heading text-2xl font-bold text-foreground mb-2">Оплата</h2>
            <p className="text-muted-foreground text-sm mb-4">{email}</p>
            <div className="paper-card p-4 mb-6 bg-muted/50">
              <div className="flex justify-between text-sm">
                <span className="text-foreground">Tense Lab — полный доступ</span>
                <span className="font-semibold text-foreground">{DEMO_PRODUCT.price} ₽</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-4 text-center">Это демо-оплата. Нажмите кнопку для активации доступа.</p>
            <Button onClick={handlePay} className="w-full" size="lg" disabled={loading}>
              {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Обработка...</> : <>Оплатить {DEMO_PRODUCT.price} ₽</>}
            </Button>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-campus-success/15 flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-campus-success" />
            </div>
            <h2 className="text-heading text-2xl font-bold text-foreground mb-2">Доступ открыт!</h2>
            <p className="text-muted-foreground text-sm mb-6">Добро пожаловать в Tense Lab. Ваш аккаунт готов.</p>
            <Button onClick={handleGoToApp} className="w-full" size="lg">Войти в кабинет <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </div>
        )}
      </div>
    </div>
  );
}
