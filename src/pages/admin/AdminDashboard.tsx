import { DEMO_USERS, DEMO_ORDERS, DEMO_ENROLLMENTS, DEMO_TRAINER_STATS, DEMO_LESSONS } from '@/data/demo-data';
import { Users, CreditCard, BookOpen, TrendingUp, Target, BarChart3 } from 'lucide-react';

export default function AdminDashboard() {
  const students = DEMO_USERS.filter(u => u.role === 'student');
  const activeEnrollments = DEMO_ENROLLMENTS.filter(e => e.access_status === 'active');
  const paidOrders = DEMO_ORDERS.filter(o => o.payment_status === 'paid');
  const totalRevenue = paidOrders.reduce((s, o) => s + o.amount, 0);

  return (
    <div className="space-y-6">
      <h1 className="text-heading text-2xl font-bold text-foreground">Обзор</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Users, label: 'Ученики', value: students.length, color: 'text-primary' },
          { icon: BookOpen, label: 'Активные доступы', value: activeEnrollments.length, color: 'text-campus-success' },
          { icon: CreditCard, label: 'Оплаты', value: paidOrders.length, color: 'text-campus-gold' },
          { icon: TrendingUp, label: 'Выручка', value: `${totalRevenue} ₽`, color: 'text-campus-sage' },
        ].map((item, i) => (
          <div key={i} className="paper-card p-5">
            <div className="flex items-center gap-3 mb-2">
              <item.icon className={`h-5 w-5 ${item.color}`} />
              <span className="text-xs text-muted-foreground">{item.label}</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="paper-card p-5">
          <h2 className="text-heading text-lg font-semibold text-foreground mb-3">Средний прогресс</h2>
          <div className="flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-campus-sage" />
            <div>
              <p className="text-2xl font-bold text-foreground">{DEMO_TRAINER_STATS.accuracy_avg}%</p>
              <p className="text-xs text-muted-foreground">средняя точность студентов</p>
            </div>
          </div>
        </div>
        <div className="paper-card p-5">
          <h2 className="text-heading text-lg font-semibold text-foreground mb-3">Сложные темы</h2>
          <div className="flex flex-wrap gap-2">
            {DEMO_TRAINER_STATS.weak_topics_json.map(t => (
              <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-destructive/10 text-destructive">{t.replace(/_/g, ' ')}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
