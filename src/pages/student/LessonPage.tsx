import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DEMO_LESSONS, DEMO_SECTIONS, getExercisesForLesson, getSectionForLesson, DEMO_MATERIALS } from '@/data/demo-data';
import { ArrowRight, Check, X, ChevronRight, Play, BookOpen, FileText, Lightbulb, AlertTriangle } from 'lucide-react';
import ReactMarkdown from '@/components/shared/SimpleMarkdown';

export default function LessonPage() {
  const { lessonId } = useParams();
  const lesson = DEMO_LESSONS.find(l => l.id === lessonId);
  const section = lesson ? getSectionForLesson(lesson.id) : null;
  const exercises = lesson ? getExercisesForLesson(lesson.id) : [];
  const relatedMaterials = DEMO_MATERIALS.filter(m => m.related_lesson_id === lessonId || m.related_section_id === section?.id);
  const nextLesson = lesson ? DEMO_LESSONS.find(l => l.lesson_number === lesson.lesson_number + 1) : null;

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  if (!lesson || !section) return <div className="text-center py-12 text-muted-foreground">Урок не найден</div>;

  const handleAnswer = (exId: string, answer: string) => {
    if (checked[exId]) return;
    setAnswers(prev => ({ ...prev, [exId]: answer }));
  };

  const checkAnswer = (exId: string) => {
    setChecked(prev => ({ ...prev, [exId]: true }));
  };

  return (
    <div className="space-y-5">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link to="/app/program" className="hover:text-foreground transition-colors">Программа</Link>
        <ChevronRight className="h-3 w-3" />
        <span>{section.title}</span>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground font-medium">Урок {lesson.lesson_number}</span>
      </div>

      {/* Header */}
      <div>
        <span className="text-xs font-semibold text-campus-sage uppercase tracking-wider">Урок {lesson.lesson_number}</span>
        <h1 className="text-heading text-2xl font-bold text-foreground mt-0.5">{lesson.title}</h1>
        <p className="text-muted-foreground text-sm mt-0.5">{lesson.short_description}</p>
      </div>

      <Tabs defaultValue="video" className="w-full">
        <TabsList className="bg-muted/50 w-full justify-start">
          <TabsTrigger value="video" className="gap-1.5"><Play className="h-3.5 w-3.5" />Видео</TabsTrigger>
          <TabsTrigger value="notes" className="gap-1.5"><BookOpen className="h-3.5 w-3.5" />Конспект</TabsTrigger>
          <TabsTrigger value="practice" className="gap-1.5"><FileText className="h-3.5 w-3.5" />Практика</TabsTrigger>
        </TabsList>

        <TabsContent value="video" className="mt-3">
          <div className="paper-card aspect-video flex items-center justify-center bg-muted/30">
            <div className="text-center">
              <Play className="h-10 w-10 text-muted-foreground/30 mx-auto mb-2" />
              <p className="text-muted-foreground text-sm">Видео урока будет здесь</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notes" className="mt-3">
          <div className="paper-card p-5 md:p-6 prose-campus">
            <ReactMarkdown content={lesson.note_content} />
          </div>
        </TabsContent>

        <TabsContent value="practice" className="mt-3 space-y-3">
          {exercises.length === 0 ? (
            <div className="paper-card p-8 text-center text-muted-foreground">Упражнения для этого урока скоро появятся</div>
          ) : (
            exercises.map((ex, idx) => {
              const selected = answers[ex.id];
              const isChecked = checked[ex.id];
              const isCorrect = selected === ex.correct_answer;

              return (
                <div key={ex.id} className="paper-card p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-campus-sage">#{idx + 1}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-campus-gold/15 text-campus-brown font-medium">{ex.difficulty}</span>
                  </div>
                  <p className="text-foreground font-semibold mb-3">{ex.prompt}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                    {ex.options_json.map(opt => {
                      let cls = 'p-3 text-sm rounded-lg border-2 transition-all text-left font-medium ';
                      if (isChecked && opt === ex.correct_answer) {
                        cls += 'border-campus-success bg-campus-success/10 text-campus-success';
                      } else if (isChecked && opt === selected && !isCorrect) {
                        cls += 'border-destructive bg-destructive/10 text-destructive';
                      } else if (opt === selected) {
                        cls += 'border-primary bg-primary/10 text-primary';
                      } else {
                        cls += 'border-border bg-card hover:border-muted-foreground/30 text-foreground';
                      }
                      return (
                        <button key={opt} onClick={() => handleAnswer(ex.id, opt)} className={cls} disabled={isChecked}>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {selected && !isChecked && (
                    <Button size="sm" onClick={() => checkAnswer(ex.id)} className="rounded-lg">Проверить</Button>
                  )}
                  {isChecked && (
                    <div className={`mt-3 p-4 rounded-lg ${isCorrect ? 'bg-campus-success/10' : 'bg-destructive/10'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        {isCorrect ? <Check className="h-4 w-4 text-campus-success" /> : <X className="h-4 w-4 text-destructive" />}
                        <span className={`text-sm font-bold ${isCorrect ? 'text-campus-success' : 'text-destructive'}`}>
                          {isCorrect ? 'Правильно!' : 'Неправильно'}
                        </span>
                      </div>
                      <p className="text-sm text-foreground mb-1"><Lightbulb className="h-3.5 w-3.5 inline mr-1" />{ex.explanation}</p>
                      {!isCorrect && <p className="text-xs text-muted-foreground mt-1"><AlertTriangle className="h-3 w-3 inline mr-1" />{ex.confusion_note}</p>}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </TabsContent>
      </Tabs>

      {/* Related materials */}
      {relatedMaterials.length > 0 && (
        <div className="paper-card p-5">
          <h3 className="text-heading text-base font-semibold text-foreground mb-2">Связанные материалы</h3>
          <div className="grid sm:grid-cols-2 gap-2">
            {relatedMaterials.map(m => (
              <div key={m.id} className="p-3 rounded-lg border border-border flex items-center gap-3">
                <FileText className="h-4 w-4 text-campus-sage flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{m.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{m.short_description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTAs */}
      <div className="flex flex-wrap gap-2">
        <Button className="rounded-xl">Завершить урок <Check className="ml-2 h-4 w-4" /></Button>
        {nextLesson && (
          <Link to={`/app/lesson/${nextLesson.id}`}>
            <Button variant="outline" className="rounded-xl">Следующий урок <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </Link>
        )}
        <Link to="/app/trainer">
          <Button variant="outline" className="rounded-xl">Открыть тренажёр</Button>
        </Link>
      </div>
    </div>
  );
}
