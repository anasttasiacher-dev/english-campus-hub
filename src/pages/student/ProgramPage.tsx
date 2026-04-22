import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Check, Lock, Play, RotateCcw, Target, Trophy } from 'lucide-react';
import { DEMO_SECTIONS, DEMO_LESSONS, getLessonsBySection, getCompletedCount, getCurrentLesson, DEMO_PROGRESS } from '@/data/demo-data';
import CheckpointQuiz from '@/components/student/CheckpointQuiz';
import { toast } from '@/hooks/use-toast';

const STORAGE_KEY = 'tenselab_checkpoints';
const POINTS_KEY = 'tenselab_points_bonus';

function loadPassed(): Record<string, boolean> {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch { return {}; }
}

export default function ProgramPage() {
  const completed = getCompletedCount('user_student');
  const total = DEMO_LESSONS.length;
  const currentLesson = getCurrentLesson('user_student');
  const progressPct = Math.round((completed / total) * 100);

  const [passed, setPassed] = useState<Record<string, boolean>>(loadPassed());
  const [activeCheckpoint, setActiveCheckpoint] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(passed));
  }, [passed]);

  const getStatus = (lessonId: string) => {
    const p = DEMO_PROGRESS.find(pr => pr.user_id === 'user_student' && pr.lesson_id === lessonId);
    if (!p) return 'locked';
    return p.status;
  };

  const isCheckpointUnlocked = (sectionId: string) => {
    const lessons = getLessonsBySection(sectionId);
    return lessons.every(l => getStatus(l.id) === 'completed');
  };

  const handlePass = (sectionId: string, points: number) => {
    setPassed(prev => ({ ...prev, [sectionId]: true }));
    const cur = Number(localStorage.getItem(POINTS_KEY) || '0');
    localStorage.setItem(POINTS_KEY, String(cur + points));
    toast({ title: `+${points} Academic Points`, description: 'Контрольная точка пройдена!' });
  };

  const activeSection = activeCheckpoint ? DEMO_SECTIONS.find(s => s.id === activeCheckpoint) : null;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-heading text-2xl font-bold text-foreground mb-1">Программа Tense Lab</h1>
        <p className="text-muted-foreground text-sm mb-3">4 раздела · {total} уроков · Видео + Конспекты + Упражнения</p>
        <Progress value={progressPct} className="h-2 mb-1.5" />
        <p className="text-sm text-muted-foreground">
          Пройдено {completed} из {total}
          {currentLesson && <> · Текущий: <span className="font-medium text-foreground">{currentLesson.title}</span></>}
        </p>
      </div>

      <div className="space-y-4">
        {DEMO_SECTIONS.map(section => {
          const checkpointUnlocked = isCheckpointUnlocked(section.id);
          const checkpointPassed = passed[section.id];
          return (
            <div key={section.id} className="paper-card overflow-hidden">
              <div className="p-4 border-b border-border bg-muted/30">
                <span className="text-xs font-semibold text-campus-sage uppercase tracking-wider">Раздел {section.sort_order}</span>
                <h2 className="text-heading text-lg font-semibold text-foreground mt-0.5">{section.title}</h2>
                <p className="text-muted-foreground text-sm mt-0.5">{section.description}</p>
              </div>
              <div className="divide-y divide-border">
                {getLessonsBySection(section.id).map(lesson => {
                  const status = getStatus(lesson.id);
                  return (
                    <div key={lesson.id} className="p-3 px-4 flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${status === 'completed' ? 'bg-campus-success/15' : status === 'in_progress' ? 'bg-campus-gold/15' : status === 'not_started' ? 'bg-muted' : 'bg-muted/50'}`}>
                        {status === 'completed' ? <Check className="h-3.5 w-3.5 text-campus-success" /> :
                         status === 'in_progress' ? <Play className="h-3.5 w-3.5 text-campus-gold" /> :
                         status === 'not_started' ? <span className="text-xs font-semibold text-muted-foreground">{lesson.lesson_number}</span> :
                         <Lock className="h-3 w-3 text-muted-foreground/50" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium text-sm ${status === 'locked' ? 'text-muted-foreground/50' : 'text-foreground'}`}>
                          {lesson.lesson_number}. {lesson.title}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">{lesson.short_description}</p>
                      </div>
                      {status !== 'locked' && (
                        <Link to={`/app/lesson/${lesson.id}`}>
                          <Button variant={status === 'in_progress' ? 'default' : 'outline'} size="sm" className="rounded-lg text-xs">
                            {status === 'completed' ? <><RotateCcw className="h-3 w-3 mr-1" />Повторить</> :
                             status === 'in_progress' ? 'Продолжить' : 'Открыть'}
                          </Button>
                        </Link>
                      )}
                    </div>
                  );
                })}

                {/* Checkpoint row */}
                <div className={`p-3 px-4 flex items-center gap-3 ${checkpointPassed ? 'bg-campus-success/5' : 'bg-campus-gold/5'}`}>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${checkpointPassed ? 'bg-campus-success/15' : checkpointUnlocked ? 'bg-campus-gold/15' : 'bg-muted/50'}`}>
                    {checkpointPassed ? <Trophy className="h-3.5 w-3.5 text-campus-success" /> :
                     checkpointUnlocked ? <Target className="h-3.5 w-3.5 text-campus-brown" /> :
                     <Lock className="h-3 w-3 text-muted-foreground/50" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium text-sm ${!checkpointUnlocked ? 'text-muted-foreground/60' : 'text-foreground'}`}>
                      Контрольная точка раздела
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {checkpointPassed ? 'Пройдено · +50 Academic Points начислено' :
                       checkpointUnlocked ? 'Мини-квиз по разделу · награда +50 баллов' :
                       'Завершите все уроки раздела, чтобы открыть'}
                    </p>
                  </div>
                  {checkpointUnlocked && (
                    <Button
                      variant={checkpointPassed ? 'outline' : 'default'}
                      size="sm"
                      className="rounded-lg text-xs"
                      onClick={() => setActiveCheckpoint(section.id)}
                    >
                      {checkpointPassed ? <><RotateCcw className="h-3 w-3 mr-1" />Пройти заново</> : 'Начать'}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {activeSection && (
        <CheckpointQuiz
          open={!!activeCheckpoint}
          onOpenChange={(v) => { if (!v) setActiveCheckpoint(null); }}
          sectionId={activeSection.id}
          sectionTitle={activeSection.title}
          lessonIds={getLessonsBySection(activeSection.id).map(l => l.id)}
          onPass={(pts) => handlePass(activeSection.id, pts)}
        />
      )}
    </div>
  );
}
