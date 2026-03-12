import { DEMO_MATERIALS } from '@/data/demo-data';
import { Badge } from '@/components/ui/badge';

export default function AdminLibrary() {
  return (
    <div className="space-y-6">
      <h1 className="text-heading text-2xl font-bold text-foreground">Библиотека</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {DEMO_MATERIALS.map(m => (
          <div key={m.id} className="paper-card p-5">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-xs">{m.material_type}</Badge>
              <Badge variant="secondary" className="text-xs">{m.category}</Badge>
              {m.is_featured && <Badge className="text-xs">Featured</Badge>}
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-1">{m.title}</h3>
            <p className="text-xs text-muted-foreground">{m.short_description}</p>
            <p className="text-xs text-muted-foreground mt-2">Published: {m.is_published ? 'Yes' : 'No'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
