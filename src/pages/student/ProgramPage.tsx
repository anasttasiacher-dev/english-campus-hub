import { Link } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Check, Lock, Play, RotateCcw } from 'lucide-react';
import { DEMO_SECTIONS, DEMO_LESSONS, getLessonsBySection, getCompletedCount, getCurrentLesson, DEMO_PROGRESS } from '@/data/demo-data';

export default function ProgramPage() {
  const completed = getCompletedCount('user_student');
  const total = DEMO_LESSONS.length;
  const currentLesson = getCurrentLesson('user_student');
  const progressPct = Math.round((completed / total) * 100);

  const getStatus = (lessonId: string) => {
    const p = DEMO_PROGRESS.find(pr => pr.user_id === 'user_student' && pr.lesson_id === lessonId);
    if (!p) return 'locked';
    return p.status;
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-heading text-3xl font-bold text-foreground mb-2">Программа Tense Lab</h1>
        <p className="text-muted-foreground text-sm mb-4">Tense Lab состоит из 4 разделов и 12 уроков. Каждый урок включает видео, конспект и упражнения.</p>
        <Progress value={progressPct} className="h-2.5 mb-2" />
        <p className="text-sm text-muted-foreground">
          Пройдено {completed} из {total}
          {currentLesson && <> · Текущий: <span className="font-medium text-foreground">{currentLesson.title}</span></>}
        </p>
      </div>

      <div className="space-y-6">
        {DEMO_SECTIONS.map(section => (
          <div key={section.id} className="paper-card overflow-hidden">
            <div className="p-5 border-b border-border bg-muted/30">
              <span className="text-xs font-medium text-campus-sage uppercase tracking-wider">Раздел {section.sort_order}</span>
              <h2 className="text-heading text-xl font-semibold text-foreground mt-1">{section.title}</h2>
              <p className="text-muted-foreground text-sm mt-0.5">{section.description}</p>
            </div>
            <div className="divide-y divide-border">
              {getLessonsBySection(section.id).map(lesson => {
                const status = getStatus(lesson.id);
                return (
                  <div key={lesson.id} className="p-4 px-5 flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${status === 'completed' ? 'bg-campus-success/15' : status === 'in_progress' ? 'bg-campus-gold/15' : status === 'not_started' ? 'bg-muted' : 'bg-muted/50'}`}>
                      {status === 'completed' ? <Check className="h-4 w-4 text-campus-success" /> :
                       status === 'in_progress' ? <Play className="h-4 w-4 text-campus-gold" /> :
                       status === 'not_started' ? <span className="text-xs font-semibold text-muted-foreground">{lesson.lesson_number}</span> :
                       <Lock className="h-3.5 w-3.5 text-muted-foreground/50" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium text-sm ${status === 'locked' ? 'text-muted-foreground/50' : 'text-foreground'}`}>
                        Урок {lesson.lesson_number}: {lesson.title}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">{lesson.short_description}</p>
                    </div>
                    {status !== 'locked' && (
                      <Link to={`/app/lesson/${lesson.id}`}>
                        <Button variant={status === 'in_progress' ? 'default' : 'outline'} size="sm" className="rounded-lg">
                          {status === 'completed' ? <><RotateCcw className="h-3 w-3 mr-1" />Повторить</> :
                           status === 'in_progress' ? 'Продолжить' : 'Открыть'}
                        </Button>
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
