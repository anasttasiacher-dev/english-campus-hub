import { DEMO_PRODUCT } from '@/data/demo-data';
import { Badge } from '@/components/ui/badge';

export default function AdminProducts() {
  const p = DEMO_PRODUCT;
  return (
    <div className="space-y-6">
      <h1 className="text-heading text-2xl font-bold text-foreground">Продукты</h1>
      <div className="paper-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left p-3 font-medium text-muted-foreground">Название</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Slug</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Цена</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Статус</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="p-3 font-medium text-foreground">{p.title}</td>
              <td className="p-3 text-muted-foreground">{p.slug}</td>
              <td className="p-3 text-foreground">{p.price} ₽</td>
              <td className="p-3"><Badge variant={p.status === 'active' ? 'default' : 'secondary'}>{p.status}</Badge></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="paper-card p-6">
        <h2 className="text-heading text-lg font-semibold text-foreground mb-3">Описание</h2>
        <p className="text-sm text-muted-foreground">{p.description}</p>
      </div>
    </div>
  );
}
