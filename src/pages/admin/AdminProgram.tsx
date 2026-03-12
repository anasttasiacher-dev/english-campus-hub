import { DEMO_SECTIONS, getLessonsBySection } from '@/data/demo-data';
import { ChevronUp, ChevronDown, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function AdminProgram() {
  return (
    <div className="space-y-6">
      <h1 className="text-heading text-2xl font-bold text-foreground">Программа</h1>
      <div className="space-y-4">
        {DEMO_SECTIONS.map(section => (
          <div key={section.id} className="paper-card overflow-hidden">
            <div className="p-4 border-b border-border bg-muted/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <GripVertical className="h-4 w-4 text-muted-foreground/40 cursor-grab" />
                <div>
                  <span className="text-xs text-campus-sage uppercase tracking-wider">Раздел {section.sort_order}</span>
                  <h2 className="text-heading text-base font-semibold text-foreground">{section.title}</h2>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Badge variant={section.is_published ? 'default' : 'secondary'}>{section.is_published ? 'Опубликован' : 'Черновик'}</Badge>
                <Button variant="ghost" size="sm"><ChevronUp className="h-3.5 w-3.5" /></Button>
                <Button variant="ghost" size="sm"><ChevronDown className="h-3.5 w-3.5" /></Button>
              </div>
            </div>
            <div className="divide-y divide-border">
              {getLessonsBySection(section.id).map(lesson => (
                <div key={lesson.id} className="p-3 px-4 flex items-center gap-3">
                  <GripVertical className="h-3.5 w-3.5 text-muted-foreground/30 cursor-grab" />
                  <span className="text-xs font-semibold text-campus-gold w-6">{lesson.lesson_number}</span>
                  <span className="text-sm text-foreground flex-1">{lesson.title}</span>
                  <Badge variant={lesson.is_published ? 'default' : 'secondary'} className="text-xs">{lesson.is_published ? 'Опубл.' : 'Черновик'}</Badge>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
