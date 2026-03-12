import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DEMO_MATERIALS } from '@/data/demo-data';
import { Search, FileText, BookOpen, Table2, Download, ExternalLink } from 'lucide-react';

const categories = ['Все', 'Основы', 'Шпаргалки', 'Таблицы', 'Методички'];

const typeIcons: Record<string, typeof FileText> = {
  pdf: FileText,
  cheatsheet: BookOpen,
  table: Table2,
  guide: BookOpen,
  reference: FileText,
};

export default function LibraryPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Все');

  const filtered = DEMO_MATERIALS.filter(m => {
    if (!m.is_published) return false;
    if (category !== 'Все' && m.category !== category) return false;
    if (search && !m.title.toLowerCase().includes(search.toLowerCase()) && !m.short_description.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-heading text-3xl font-bold text-foreground mb-2">Библиотека</h1>
        <p className="text-muted-foreground">Все материалы Tense Lab в одном месте</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск материалов..." className="pl-9" />
        </div>
        <div className="flex gap-1.5 overflow-x-auto">
          {categories.map(cat => (
            <Button key={cat} variant={category === cat ? 'default' : 'outline'} size="sm" className="rounded-full text-xs" onClick={() => setCategory(cat)}>{cat}</Button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="paper-card p-12 text-center text-muted-foreground">Ничего не найдено</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(m => {
            const Icon = typeIcons[m.material_type] || FileText;
            return (
              <div key={m.id} className="paper-card-hover p-5 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-campus-gold/15 text-campus-brown">{m.material_type}</span>
                  {m.is_featured && <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">Featured</span>}
                </div>
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <Icon className="h-4 w-4 text-campus-sage" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-foreground mb-0.5">{m.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{m.short_description}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1 rounded-lg text-xs"><ExternalLink className="h-3 w-3 mr-1" />Открыть</Button>
                  <Button variant="outline" size="sm" className="rounded-lg text-xs"><Download className="h-3 w-3" /></Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
