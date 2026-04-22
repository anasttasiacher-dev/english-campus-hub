import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Check, X, Target, Trophy, RotateCcw } from 'lucide-react';
import { DEMO_EXERCISES, Exercise } from '@/data/demo-data';

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  sectionId: string;
  sectionTitle: string;
  lessonIds: string[];
  onPass: (points: number) => void;
}

const PASS_THRESHOLD = 0.7; // 70%
const REWARD = 50;

function pickQuestions(lessonIds: string[]): Exercise[] {
  const pool = DEMO_EXERCISES.filter(e => lessonIds.includes(e.lesson_id) && e.is_active);
  // up to 5 questions, deterministic by id
  return pool.slice(0, 5);
}

export default function CheckpointQuiz({ open, onOpenChange, sectionId, sectionTitle, lessonIds, onPass }: Props) {
  const questions = pickQuestions(lessonIds);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [finished, setFinished] = useState(false);
  const [awarded, setAwarded] = useState(false);

  const reset = () => {
    setIdx(0); setAnswers({}); setChecked({}); setFinished(false); setAwarded(false);
  };

  const close = () => { onOpenChange(false); setTimeout(reset, 200); };

  if (questions.length === 0) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader><DialogTitle>Контрольная точка</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground">Для этого раздела пока нет вопросов.</p>
        </DialogContent>
      </Dialog>
    );
  }

  const q = questions[idx];
  const selected = answers[q.id];
  const isChecked = checked[q.id];
  const isCorrect = selected === q.correct_answer;

  const correctCount = questions.filter(qq => answers[qq.id] === qq.correct_answer).length;
  const accuracy = questions.length ? correctCount / questions.length : 0;
  const passed = accuracy >= PASS_THRESHOLD;

  const handleSelect = (opt: string) => {
    if (isChecked) return;
    setAnswers(prev => ({ ...prev, [q.id]: opt }));
  };

  const handleCheck = () => setChecked(prev => ({ ...prev, [q.id]: true }));

  const handleNext = () => {
    if (idx < questions.length - 1) {
      setIdx(idx + 1);
    } else {
      setFinished(true);
      if (accuracy >= PASS_THRESHOLD && !awarded) {
        onPass(REWARD);
        setAwarded(true);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) close(); else onOpenChange(true); }}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="h-4 w-4 text-campus-sage" />
            Контрольная точка · {sectionTitle}
          </DialogTitle>
        </DialogHeader>

        {!finished ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Вопрос {idx + 1} из {questions.length}</span>
              <span className="px-2 py-0.5 rounded-full bg-campus-gold/15 text-campus-brown font-medium">{q.difficulty}</span>
            </div>

            <p className="text-foreground font-semibold whitespace-pre-line">{q.prompt}</p>

            <div className="grid grid-cols-1 gap-2">
              {q.options_json.map(opt => {
                let cls = 'p-3 text-sm rounded-lg border-2 transition-all text-left font-medium ';
                if (isChecked && opt === q.correct_answer) cls += 'border-campus-success bg-campus-success/10 text-campus-success';
                else if (isChecked && opt === selected && !isCorrect) cls += 'border-destructive bg-destructive/10 text-destructive';
                else if (opt === selected) cls += 'border-primary bg-primary/10 text-primary';
                else cls += 'border-border bg-card hover:border-muted-foreground/30 text-foreground';
                return (
                  <button key={opt} onClick={() => handleSelect(opt)} disabled={isChecked} className={cls}>
                    {opt}
                  </button>
                );
              })}
            </div>

            {isChecked && (
              <div className={`p-3 rounded-lg text-sm ${isCorrect ? 'bg-campus-success/10 text-campus-success' : 'bg-destructive/10 text-destructive'}`}>
                <div className="flex items-center gap-2 font-bold mb-1">
                  {isCorrect ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                  {isCorrect ? 'Правильно!' : 'Неправильно'}
                </div>
                <p className="text-foreground text-xs">{q.explanation}</p>
              </div>
            )}

            <div className="flex justify-end gap-2">
              {selected && !isChecked && <Button size="sm" onClick={handleCheck}>Проверить</Button>}
              {isChecked && <Button size="sm" onClick={handleNext}>{idx < questions.length - 1 ? 'Далее' : 'Завершить'}</Button>}
            </div>
          </div>
        ) : (
          <div className="text-center py-4 space-y-3">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto ${passed ? 'bg-campus-success/15' : 'bg-muted'}`}>
              {passed ? <Trophy className="h-7 w-7 text-campus-success" /> : <RotateCcw className="h-7 w-7 text-muted-foreground" />}
            </div>
            <h3 className="text-heading text-xl font-bold text-foreground">
              {passed ? 'Контрольная точка пройдена!' : 'Почти получилось'}
            </h3>
            <p className="text-sm text-muted-foreground">
              Правильно: <span className="font-semibold text-foreground">{correctCount} из {questions.length}</span> · Точность {Math.round(accuracy * 100)}%
            </p>
            {passed ? (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-campus-gold/15 text-campus-brown font-semibold">
                <Trophy className="h-4 w-4" /> +{REWARD} Academic Points
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">Нужно набрать минимум 70% — попробуй ещё раз.</p>
            )}
            <div className="flex justify-center gap-2 pt-1">
              {!passed && <Button variant="outline" onClick={reset}>Пройти заново</Button>}
              <Button onClick={close}>Закрыть</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
