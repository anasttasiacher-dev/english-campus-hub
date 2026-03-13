import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Shuffle, Zap, ArrowRight, Check, X, Lightbulb, AlertTriangle, Award, RotateCcw } from 'lucide-react';
import { DEMO_EXERCISES, ALL_TENSE_TAGS } from '@/data/demo-data';

type Mode = 'select' | 'session' | 'results';
type TrainerMode = 'custom' | 'mixed' | 'weak';

const modes = [
  { key: 'custom' as TrainerMode, icon: Check, title: 'Выбрать времена', desc: 'Выбери конкретные времена для практики' },
  { key: 'mixed' as TrainerMode, icon: Shuffle, title: 'Смешанная практика', desc: 'Все времена вперемешку' },
  { key: 'weak' as TrainerMode, icon: Zap, title: 'Слабые места', desc: 'Упражнения на твои проблемные темы' },
];

// Points: correct answer in trainer = +1, finish training session = +10
const POINTS_CORRECT = 1;
const POINTS_FINISH = 10;

export default function TrainerPage() {
  const [mode, setMode] = useState<Mode>('select');
  const [trainerMode, setTrainerMode] = useState<TrainerMode>('custom');
  const [selectedTenses, setSelectedTenses] = useState<string[]>([]);
  const [exercises, setExercises] = useState<typeof DEMO_EXERCISES>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const toggleTense = (key: string) => {
    setSelectedTenses(prev => prev.includes(key) ? prev.filter(t => t !== key) : [...prev, key]);
  };

  const startSession = (m: TrainerMode, tenses?: string[]) => {
    setTrainerMode(m);
    let pool = [...DEMO_EXERCISES].filter(e => e.is_active);
    
    if (m === 'weak') {
      pool = pool.filter(e => e.tense_tags.some(t => ['present_perfect', 'past_continuous', 'future_will'].includes(t)));
    } else if (m === 'custom' && tenses && tenses.length > 0) {
      pool = pool.filter(e => e.tense_tags.some(t => tenses.includes(t)));
    }
    // mixed = all exercises
    
    pool.sort(() => Math.random() - 0.5);
    setExercises(pool.slice(0, Math.min(7, pool.length)));
    setCurrent(0);
    setAnswers({});
    setChecked({});
    setScore(0);
    setCorrectCount(0);
    setMode('session');
  };

  const handleAnswer = (exId: string, answer: string) => {
    if (checked[exId]) return;
    setAnswers(prev => ({ ...prev, [exId]: answer }));
  };

  const checkAnswer = (exId: string) => {
    const ex = exercises.find(e => e.id === exId)!;
    const isCorrect = answers[exId] === ex.correct_answer;
    setChecked(prev => ({ ...prev, [exId]: true }));
    if (isCorrect) {
      setScore(s => s + POINTS_CORRECT);
      setCorrectCount(c => c + 1);
    }
  };

  const nextQuestion = () => {
    if (current < exercises.length - 1) setCurrent(c => c + 1);
    else {
      setScore(s => s + POINTS_FINISH); // bonus for finishing
      setMode('results');
    }
  };

  if (mode === 'select') {
    return (
      <div className="space-y-5">
        <div>
          <h1 className="text-heading text-2xl font-bold text-foreground mb-1">Тренажёр</h1>
          <p className="text-muted-foreground text-sm">Выбери режим тренировки</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-3">
          {modes.map(m => (
            <button
              key={m.key}
              onClick={() => {
                if (m.key === 'custom') {
                  setTrainerMode('custom');
                } else {
                  startSession(m.key);
                }
              }}
              className={`paper-card-hover p-4 text-left ${trainerMode === m.key && m.key === 'custom' ? 'border-primary ring-1 ring-primary/20' : ''}`}
            >
              <div className="w-9 h-9 rounded-lg bg-campus-gold/15 flex items-center justify-center mb-2">
                <m.icon className="h-4 w-4 text-campus-gold" />
              </div>
              <h3 className="text-heading text-base font-semibold text-foreground mb-0.5">{m.title}</h3>
              <p className="text-xs text-muted-foreground">{m.desc}</p>
            </button>
          ))}
        </div>

        {/* Tense selection for custom mode */}
        {trainerMode === 'custom' && (
          <div className="paper-card p-5">
            <h3 className="text-sm font-semibold text-foreground mb-3">Выбери времена для тренировки</h3>
            <div className="grid sm:grid-cols-2 gap-2">
              {ALL_TENSE_TAGS.map(t => (
                <label key={t.key} className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                  <Checkbox
                    checked={selectedTenses.includes(t.key)}
                    onCheckedChange={() => toggleTense(t.key)}
                  />
                  <span className="text-sm text-foreground">{t.label}</span>
                </label>
              ))}
            </div>
            <Button
              onClick={() => startSession('custom', selectedTenses)}
              className="mt-4 rounded-lg"
              disabled={selectedTenses.length === 0}
            >
              Начать тренировку ({selectedTenses.length} {selectedTenses.length === 1 ? 'время' : 'времён'})
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Points info */}
        <div className="paper-card p-4">
          <h3 className="text-sm font-semibold text-foreground mb-2">Начисление баллов</h3>
          <div className="grid grid-cols-2 gap-1.5 text-xs text-muted-foreground">
            <span>Правильный ответ</span><span className="text-foreground font-medium">+{POINTS_CORRECT}</span>
            <span>Завершить тренировку</span><span className="text-foreground font-medium">+{POINTS_FINISH}</span>
            <span>Завершить урок</span><span className="text-foreground font-medium">+20</span>
            <span>Завершить практику</span><span className="text-foreground font-medium">+30</span>
            <span>Контрольная точка</span><span className="text-foreground font-medium">+50</span>
            <span>Завершить модуль</span><span className="text-foreground font-medium">+100</span>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'results') {
    const accuracy = exercises.length > 0 ? Math.round((correctCount / exercises.length) * 100) : 0;
    return (
      <div className="max-w-lg mx-auto text-center space-y-5">
        <div className="paper-card p-6">
          <Award className="h-10 w-10 text-campus-gold mx-auto mb-3" />
          <h2 className="text-heading text-xl font-bold text-foreground mb-1">Тренировка завершена!</h2>
          <p className="text-muted-foreground text-xs mb-5">{modes.find(m => m.key === trainerMode)?.title}</p>
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div>
              <p className="text-xl font-bold text-foreground">{correctCount}/{exercises.length}</p>
              <p className="text-xs text-muted-foreground">Правильных</p>
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{accuracy}%</p>
              <p className="text-xs text-muted-foreground">Точность</p>
            </div>
            <div>
              <p className="text-xl font-bold text-campus-gold">+{score}</p>
              <p className="text-xs text-muted-foreground">Баллов</p>
            </div>
          </div>
          {accuracy >= 80 ? (
            <p className="text-sm text-campus-success font-medium">Отличный результат! Продолжай в том же духе.</p>
          ) : accuracy >= 50 ? (
            <p className="text-sm text-campus-gold font-medium">Неплохо! Попробуй потренировать слабые места.</p>
          ) : (
            <p className="text-sm text-destructive font-medium">Стоит повторить теорию и попробовать ещё раз.</p>
          )}
        </div>
        <div className="flex gap-3 justify-center">
          <Button onClick={() => { setMode('select'); setTrainerMode('custom'); }} variant="outline" className="rounded-xl"><RotateCcw className="h-4 w-4 mr-2" />Ещё тренировка</Button>
          <Button onClick={() => startSession(trainerMode, selectedTenses)} className="rounded-xl">Повторить</Button>
        </div>
      </div>
    );
  }

  // Session
  const ex = exercises[current];
  const selected = answers[ex.id];
  const isChecked = checked[ex.id];
  const isCorrect = selected === ex.correct_answer;

  return (
    <div className="max-w-2xl mx-auto space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground font-medium">{modes.find(m => m.key === trainerMode)?.title}</span>
        <span className="text-xs text-muted-foreground">{current + 1} / {exercises.length}</span>
      </div>
      <div className="w-full bg-muted rounded-full h-1.5">
        <div className="bg-primary rounded-full h-1.5 transition-all" style={{ width: `${((current + 1) / exercises.length) * 100}%` }} />
      </div>

      <div className="paper-card p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs px-2 py-0.5 rounded-full bg-campus-gold/15 text-campus-brown font-medium">{ex.difficulty}</span>
          <span className="text-xs text-muted-foreground">{ex.tense_tags.map(t => ALL_TENSE_TAGS.find(at => at.key === t)?.label || t).join(', ')}</span>
        </div>
        <p className="text-foreground font-semibold text-lg mb-4">{ex.prompt}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
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
              <button key={opt} onClick={() => handleAnswer(ex.id, opt)} className={cls} disabled={isChecked}>{opt}</button>
            );
          })}
        </div>
        {selected && !isChecked && (
          <Button onClick={() => checkAnswer(ex.id)} className="rounded-lg">Проверить</Button>
        )}
        {isChecked && (
          <>
            <div className={`mt-3 p-4 rounded-lg ${isCorrect ? 'bg-campus-success/10' : 'bg-destructive/10'}`}>
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? <Check className="h-4 w-4 text-campus-success" /> : <X className="h-4 w-4 text-destructive" />}
                <span className={`text-sm font-bold ${isCorrect ? 'text-campus-success' : 'text-destructive'}`}>
                  {isCorrect ? `Правильно! +${POINTS_CORRECT}` : 'Неправильно'}
                </span>
              </div>
              <p className="text-sm text-foreground mb-1"><Lightbulb className="h-3.5 w-3.5 inline mr-1" />{ex.explanation}</p>
              {ex.hint && <p className="text-xs text-muted-foreground mt-1">💡 {ex.hint}</p>}
              {!isCorrect && ex.confusion_note && <p className="text-xs text-muted-foreground mt-1"><AlertTriangle className="h-3 w-3 inline mr-1" />{ex.confusion_note}</p>}
            </div>
            <Button onClick={nextQuestion} className="mt-3 rounded-lg">
              {current < exercises.length - 1 ? <>Далее <ArrowRight className="ml-2 h-4 w-4" /></> : 'Завершить'}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
