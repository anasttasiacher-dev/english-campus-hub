import { useState } from 'react';
import { DEMO_ORDERS, DEMO_ENROLLMENTS, DEMO_USERS, DEMO_PRODUCT } from '@/data/demo-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function AdminOrders() {
  const [orders, setOrders] = useState(DEMO_ORDERS);
  const [enrollments, setEnrollments] = useState(DEMO_ENROLLMENTS);

  const toggleAccess = (userId: string) => {
    setEnrollments(prev => prev.map(e =>
      e.user_id === userId ? { ...e, access_status: e.access_status === 'active' ? 'revoked' as const : 'active' as const } : e
    ));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-heading text-2xl font-bold text-foreground">Заказы и доступы</h1>

      <div className="paper-card overflow-hidden overflow-x-auto">
        <h2 className="text-heading text-base font-semibold text-foreground p-4 border-b border-border">Заказы</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {['ID', 'Пользователь', 'Продукт', 'Сумма', 'Статус', 'Дата'].map(h => (
                <th key={h} className="text-left p-3 font-medium text-muted-foreground text-xs">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map(o => {
              const user = DEMO_USERS.find(u => u.id === o.user_id);
              return (
                <tr key={o.id} className="border-b border-border">
                  <td className="p-3 text-xs text-muted-foreground font-mono">{o.id}</td>
                  <td className="p-3 text-foreground">{user?.name}</td>
                  <td className="p-3 text-muted-foreground">{DEMO_PRODUCT.title}</td>
                  <td className="p-3 text-foreground">{o.amount} ₽</td>
                  <td className="p-3"><Badge variant={o.payment_status === 'paid' ? 'default' : 'secondary'}>{o.payment_status}</Badge></td>
                  <td className="p-3 text-muted-foreground text-xs">{o.created_at}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="paper-card overflow-hidden overflow-x-auto">
        <h2 className="text-heading text-base font-semibold text-foreground p-4 border-b border-border">Доступы</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {['Пользователь', 'Продукт', 'Статус', 'Дата выдачи', 'Действие'].map(h => (
                <th key={h} className="text-left p-3 font-medium text-muted-foreground text-xs">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {enrollments.map(e => {
              const user = DEMO_USERS.find(u => u.id === e.user_id);
              return (
                <tr key={e.id} className="border-b border-border">
                  <td className="p-3 text-foreground">{user?.name}</td>
                  <td className="p-3 text-muted-foreground">{DEMO_PRODUCT.title}</td>
                  <td className="p-3"><Badge variant={e.access_status === 'active' ? 'default' : 'destructive'}>{e.access_status}</Badge></td>
                  <td className="p-3 text-muted-foreground text-xs">{e.granted_at}</td>
                  <td className="p-3">
                    <Button variant="outline" size="sm" className="text-xs" onClick={() => toggleAccess(e.user_id)}>
                      {e.access_status === 'active' ? 'Деактивировать' : 'Активировать'}
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
