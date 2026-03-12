import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, BookOpen, Target, Zap, TrendingUp, Award, BarChart3 } from 'lucide-react';
import { DEMO_TRAINER_STATS, DEMO_LESSONS, DEMO_SECTIONS, getCompletedCount, getCurrentLesson, getSectionForLesson } from '@/data/demo-data';

export default function StudentDashboard() {
  const { user } = useAuth();
  const completed = getCompletedCount('user_student');
  const total = DEMO_LESSONS.length;
  const currentLesson = getCurrentLesson('user_student');
  const currentSection = currentLesson ? getSectionForLesson(currentLesson.id) : null;
  const stats = DEMO_TRAINER_STATS;
  const progressPct = Math.round((completed / total) * 100);

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="paper-card p-8 campus-gradient">
        <p className="text-campus-sage text-xs font-medium uppercase tracking-wider mb-1">Tense Lab</p>
        <h1 className="text-heading text-2xl md:text-3xl font-bold text-foreground mb-2">
          Привет, {user?.name?.split(' ')[0] || 'студент'}! 👋
        </h1>
        <p className="text-muted-foreground text-sm mb-4 max-w-lg">
          {currentLesson && currentSection
            ? `Сейчас ты проходишь модуль ${currentSection.title}. До следующего этапа осталось ${total - completed} шагов.`
            : 'Начни своё обучение!'}
        </p>
        <Link to={currentLesson ? `/app/lesson/${currentLesson.id}` : '/app/program'}>
          <Button size="lg" className="rounded-xl">Продолжить обучение <ArrowRight className="ml-2 h-4 w-4" /></Button>
        </Link>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="paper-card p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-campus-gold/15 flex items-center justify-center">
            <Award className="h-5 w-5 text-campus-gold" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Academic Points</p>
            <p className="text-xl font-bold text-foreground">{stats.academic_points}</p>
          </div>
        </div>
        <div className="paper-card p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-campus-sage/15 flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-campus-sage" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Средняя точность</p>
            <p className="text-xl font-bold text-foreground">{stats.accuracy_avg}%</p>
          </div>
        </div>
        <div className="paper-card p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <BarChart3 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Завершено практик</p>
            <p className="text-xl font-bold text-foreground">{stats.practices_completed}</p>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="paper-card p-6">
        <h2 className="text-heading text-lg font-semibold text-foreground mb-3">Прогресс Tense Lab</h2>
        <Progress value={progressPct} className="h-2.5 mb-2" />
        <p className="text-sm text-muted-foreground">
          Пройдено {completed} из {total} уроков
          {currentLesson && <> · Сейчас: <span className="font-medium text-foreground">{currentLesson.title}</span></>}
        </p>
      </div>

      {/* Main work area */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Current lesson */}
        <div className="md:col-span-2 paper-card p-6">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="h-4 w-4 text-campus-gold" />
            <span className="text-xs font-medium text-campus-sage uppercase tracking-wider">Текущий урок</span>
          </div>
          {currentLesson && (
            <>
              <h3 className="text-heading text-xl font-semibold text-foreground mb-1">
                Урок {currentLesson.lesson_number}: {currentLesson.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">{currentLesson.short_description}</p>
              <Link to={`/app/lesson/${currentLesson.id}`}>
                <Button className="rounded-lg">Продолжить <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </Link>
              <div className="flex gap-3 mt-3">
                <Link to="/app/library" className="text-xs text-campus-sage hover:text-primary transition-colors">Конспект</Link>
                <Link to="/app/library" className="text-xs text-campus-sage hover:text-primary transition-colors">Шпаргалка</Link>
                <Link to="/app/library" className="text-xs text-campus-sage hover:text-primary transition-colors">Сравнение времён</Link>
              </div>
            </>
          )}
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Trainer recommendation */}
          <div className="paper-card p-5">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-4 w-4 text-campus-gold" />
              <span className="text-xs font-medium text-campus-sage uppercase tracking-wider">Тренажёр</span>
            </div>
            <p className="text-sm text-foreground font-medium mb-1">Потренируй Present Perfect</p>
            <p className="text-xs text-muted-foreground mb-3">Точность ниже среднего — стоит повторить</p>
            <Link to="/app/trainer">
              <Button variant="outline" size="sm" className="w-full rounded-lg">Начать тренировку</Button>
            </Link>
          </div>

          {/* Weak spots */}
          <div className="paper-card p-5">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="h-4 w-4 text-campus-gold" />
              <span className="text-xs font-medium text-campus-sage uppercase tracking-wider">Слабые места</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {stats.weak_topics_json.map(topic => (
                <Link key={topic} to="/app/trainer" className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors">
                  {topic.replace(/_/g, ' ')}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
