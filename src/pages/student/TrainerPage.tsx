import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Target, Shuffle, Zap, BookOpen, ArrowRight, Check, X, Lightbulb, AlertTriangle, Award, TrendingUp, RotateCcw } from 'lucide-react';
import { DEMO_EXERCISES, DEMO_LESSONS } from '@/data/demo-data';

type Mode = 'select' | 'session' | 'results';
type TrainerMode = 'topic' | 'compare' | 'mixed' | 'weak';

const modes = [
  { key: 'topic' as TrainerMode, icon: BookOpen, title: 'По теме', desc: 'Выбери конкретную тему для практики' },
  { key: 'compare' as TrainerMode, icon: Target, title: 'Сравнение времён', desc: 'Тренируй различие между похожими временами' },
  { key: 'mixed' as TrainerMode, icon: Shuffle, title: 'Смешанная практика', desc: 'Все времена вперемешку' },
  { key: 'weak' as TrainerMode, icon: Zap, title: 'Слабые места', desc: 'Упражнения на твои проблемные темы' },
];

export default function TrainerPage() {
  const [mode, setMode] = useState<Mode>('select');
  const [trainerMode, setTrainerMode] = useState<TrainerMode>('mixed');
  const [exercises, setExercises] = useState<typeof DEMO_EXERCISES>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const startSession = (m: TrainerMode) => {
    setTrainerMode(m);
    // Pick exercises based on mode
    let pool = [...DEMO_EXERCISES].filter(e => e.is_active);
    if (m === 'weak') pool = pool.filter(e => e.tense_tags.some(t => ['present_perfect', 'past_continuous', 'future_will'].includes(t)));
    else if (m === 'topic') pool = pool.filter(e => e.tense_tags.includes('present_simple') || e.tense_tags.includes('to_be'));
    else if (m === 'compare') pool = pool.filter(e => e.tense_tags.length > 1);
    // Shuffle and take up to 5
    pool.sort(() => Math.random() - 0.5);
    setExercises(pool.slice(0, Math.min(5, pool.length)));
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
      setScore(s => s + 10);
      setCorrectCount(c => c + 1);
    }
  };

  const nextQuestion = () => {
    if (current < exercises.length - 1) setCurrent(c => c + 1);
    else setMode('results');
  };

  if (mode === 'select') {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-heading text-3xl font-bold text-foreground mb-2">Тренажёр</h1>
          <p className="text-muted-foreground">Выбери режим тренировки</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {modes.map(m => (
            <button key={m.key} onClick={() => startSession(m.key)} className="paper-card-hover p-6 text-left">
              <div className="w-10 h-10 rounded-lg bg-campus-gold/15 flex items-center justify-center mb-3">
                <m.icon className="h-5 w-5 text-campus-gold" />
              </div>
              <h3 className="text-heading text-lg font-semibold text-foreground mb-1">{m.title}</h3>
              <p className="text-sm text-muted-foreground">{m.desc}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (mode === 'results') {
    const accuracy = exercises.length > 0 ? Math.round((correctCount / exercises.length) * 100) : 0;
    return (
      <div className="max-w-lg mx-auto text-center space-y-6">
        <div className="paper-card p-8">
          <Award className="h-12 w-12 text-campus-gold mx-auto mb-4" />
          <h2 className="text-heading text-2xl font-bold text-foreground mb-2">Тренировка завершена!</h2>
          <p className="text-muted-foreground text-sm mb-6">{modes.find(m => m.key === trainerMode)?.title}</p>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <p className="text-2xl font-bold text-foreground">{correctCount}/{exercises.length}</p>
              <p className="text-xs text-muted-foreground">Правильных</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{accuracy}%</p>
              <p className="text-xs text-muted-foreground">Точность</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-campus-gold">+{score}</p>
              <p className="text-xs text-muted-foreground">Баллов</p>
            </div>
          </div>
          {accuracy >= 80 ? (
            <p className="text-sm text-campus-success">Отличный результат! Продолжай в том же духе.</p>
          ) : accuracy >= 50 ? (
            <p className="text-sm text-campus-gold">Неплохо! Попробуй потренировать слабые места.</p>
          ) : (
            <p className="text-sm text-destructive">Стоит повторить теорию и попробовать ещё раз.</p>
          )}
        </div>
        <div className="flex gap-3 justify-center">
          <Button onClick={() => setMode('select')} variant="outline" className="rounded-xl"><RotateCcw className="h-4 w-4 mr-2" />Ещё тренировка</Button>
          <Button onClick={() => startSession(trainerMode)} className="rounded-xl">Повторить</Button>
        </div>
      </div>
    );
  }

  // Session
  const ex = exercises[current];
  const selected = answers[ex.id];
  const isChecked = checked[ex.id];
  const isCorrect = selected === ex.correct_answer;
  const lesson = DEMO_LESSONS.find(l => l.id === ex.lesson_id);

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{modes.find(m => m.key === trainerMode)?.title}</span>
        <span className="text-xs text-muted-foreground">{current + 1} / {exercises.length}</span>
      </div>
      <div className="w-full bg-muted rounded-full h-1.5">
        <div className="bg-primary rounded-full h-1.5 transition-all" style={{ width: `${((current + 1) / exercises.length) * 100}%` }} />
      </div>

      <div className="paper-card p-6">
        <div className="flex items-center gap-2 mb-3">
          {lesson && <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">Урок {lesson.lesson_number}</span>}
          <span className="text-xs px-2 py-0.5 rounded-full bg-campus-gold/15 text-campus-brown">{ex.difficulty}</span>
        </div>
        <p className="text-foreground font-medium text-lg mb-4">{ex.prompt}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
          {ex.options_json.map(opt => {
            let cls = 'paper-card p-3.5 text-sm cursor-pointer transition-all text-left';
            if (isChecked && opt === ex.correct_answer) cls += ' border-campus-success bg-campus-success/5';
            else if (isChecked && opt === selected && !isCorrect) cls += ' border-destructive bg-destructive/5';
            else if (opt === selected) cls += ' border-primary bg-primary/5';
            else cls += ' hover:border-campus-sage/40';
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
                <span className={`text-sm font-semibold ${isCorrect ? 'text-campus-success' : 'text-destructive'}`}>{isCorrect ? 'Правильно!' : 'Неправильно'}</span>
              </div>
              <p className="text-sm text-foreground mb-1"><Lightbulb className="h-3.5 w-3.5 inline mr-1" />{ex.explanation}</p>
              {ex.hint && <p className="text-xs text-muted-foreground mt-1">💡 {ex.hint}</p>}
              {!isCorrect && ex.confusion_note && <p className="text-xs text-muted-foreground mt-1"><AlertTriangle className="h-3 w-3 inline mr-1" />{ex.confusion_note}</p>}
            </div>
            <Button onClick={nextQuestion} className="mt-4 rounded-lg">
              {current < exercises.length - 1 ? <>Далее <ArrowRight className="ml-2 h-4 w-4" /></> : 'Завершить'}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
