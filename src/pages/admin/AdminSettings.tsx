import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function AdminSettings() {
  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-heading text-2xl font-bold text-foreground">Настройки</h1>

      <div className="paper-card p-6 space-y-4">
        <h2 className="text-heading text-lg font-semibold text-foreground">Общие</h2>
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1">Название платформы</label>
          <Input defaultValue="English Campus" />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1">Email отправителя</label>
          <Input defaultValue="hello@englishcampus.io" />
        </div>
      </div>

      <div className="paper-card p-6 space-y-4">
        <h2 className="text-heading text-lg font-semibold text-foreground">Брендинг</h2>
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1">Основной цвет</label>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary" />
            <Input defaultValue="#2D4A3E" className="w-32" />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1">Акцентный цвет</label>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent" />
            <Input defaultValue="#C4A265" className="w-32" />
          </div>
        </div>
      </div>

      <div className="paper-card p-6 space-y-4">
        <h2 className="text-heading text-lg font-semibold text-foreground">Тексты</h2>
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1">Приветствие после оплаты</label>
          <Input defaultValue="Добро пожаловать в Tense Lab! Ваш доступ активирован." />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1">Текст magic link письма</label>
          <Input defaultValue="Нажмите на ссылку, чтобы войти в English Campus" />
        </div>
      </div>

      <Button size="lg" className="rounded-xl">Сохранить изменения</Button>
    </div>
  );
}
