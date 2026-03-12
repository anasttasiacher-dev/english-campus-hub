import { useState } from 'react';
import { DEMO_LESSONS, DEMO_SECTIONS, getExercisesForLesson, DEMO_MATERIALS } from '@/data/demo-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

export default function AdminLessons() {
  const [selectedId, setSelectedId] = useState(DEMO_LESSONS[0].id);
  const lesson = DEMO_LESSONS.find(l => l.id === selectedId)!;
  const section = DEMO_SECTIONS.find(s => s.id === lesson.section_id)!;
  const exercises = getExercisesForLesson(lesson.id);
  const relatedMats = DEMO_MATERIALS.filter(m => m.related_lesson_id === lesson.id || m.related_section_id === section.id);

  return (
    <div className="space-y-6">
      <h1 className="text-heading text-2xl font-bold text-foreground">Уроки</h1>
      <div className="flex gap-4">
        {/* List */}
        <div className="w-64 flex-shrink-0 paper-card overflow-hidden">
          <div className="divide-y divide-border max-h-[70vh] overflow-y-auto">
            {DEMO_LESSONS.map(l => (
              <button key={l.id} onClick={() => setSelectedId(l.id)} className={`w-full text-left p-3 text-sm transition-colors ${l.id === selectedId ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted/50'}`}>
                <span className="text-xs text-campus-gold mr-1">{l.lesson_number}.</span> {l.title}
              </button>
            ))}
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1">
          <Tabs defaultValue="basic">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="basic">Основное</TabsTrigger>
              <TabsTrigger value="video">Видео</TabsTrigger>
              <TabsTrigger value="notes">Конспект</TabsTrigger>
              <TabsTrigger value="practice">Практика</TabsTrigger>
              <TabsTrigger value="materials">Материалы</TabsTrigger>
              <TabsTrigger value="settings">Настройки</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="paper-card p-5 mt-3">
              <div className="space-y-3">
                <div><label className="text-xs font-medium text-muted-foreground">Название</label><p className="text-foreground font-medium">{lesson.title}</p></div>
                <div><label className="text-xs font-medium text-muted-foreground">Описание</label><p className="text-sm text-muted-foreground">{lesson.short_description}</p></div>
                <div><label className="text-xs font-medium text-muted-foreground">Раздел</label><p className="text-sm text-foreground">{section.title}</p></div>
                <div><label className="text-xs font-medium text-muted-foreground">Номер</label><p className="text-sm text-foreground">{lesson.lesson_number}</p></div>
                <div><label className="text-xs font-medium text-muted-foreground">Статус</label><Badge variant={lesson.is_published ? 'default' : 'secondary'}>{lesson.is_published ? 'Опубликован' : 'Черновик'}</Badge></div>
              </div>
            </TabsContent>

            <TabsContent value="video" className="paper-card p-5 mt-3">
              <p className="text-sm text-muted-foreground">{lesson.video_url || 'Видео не загружено'}</p>
            </TabsContent>

            <TabsContent value="notes" className="paper-card p-5 mt-3">
              <pre className="text-xs text-muted-foreground whitespace-pre-wrap max-h-96 overflow-y-auto">{lesson.note_content}</pre>
            </TabsContent>

            <TabsContent value="practice" className="mt-3 space-y-3">
              {exercises.length === 0 ? <p className="text-sm text-muted-foreground paper-card p-5">Нет упражнений</p> : exercises.map(ex => (
                <div key={ex.id} className="paper-card p-4">
                  <p className="text-sm font-medium text-foreground mb-1">{ex.prompt}</p>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="outline">{ex.exercise_type}</Badge>
                    <Badge variant="outline">{ex.difficulty}</Badge>
                    {ex.tense_tags.map(t => <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}
                  </div>
                  <p className="text-xs text-campus-success mt-1">Ответ: {ex.correct_answer}</p>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="materials" className="mt-3 space-y-2">
              {relatedMats.length === 0 ? <p className="text-sm text-muted-foreground paper-card p-5">Нет связанных материалов</p> : relatedMats.map(m => (
                <div key={m.id} className="paper-card p-3 flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-campus-gold/15 text-campus-brown">{m.material_type}</span>
                  <span className="text-sm text-foreground">{m.title}</span>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="settings" className="paper-card p-5 mt-3">
              <p className="text-sm text-muted-foreground">Sort order: {lesson.sort_order}</p>
              <p className="text-sm text-muted-foreground">Published: {lesson.is_published ? 'Yes' : 'No'}</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
