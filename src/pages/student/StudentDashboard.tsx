import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, BookOpen, Target, Zap, TrendingUp, Award, BarChart3 } from 'lucide-react';
import { DEMO_TRAINER_STATS, DEMO_LESSONS, getCompletedCount, getCurrentLesson, getSectionForLesson } from '@/data/demo-data';

export default function StudentDashboard() {
  const { user } = useAuth();
  const completed = getCompletedCount('user_student');
  const total = DEMO_LESSONS.length;
  const currentLesson = getCurrentLesson('user_student');
  const currentSection = currentLesson ? getSectionForLesson(currentLesson.id) : null;
  const stats = DEMO_TRAINER_STATS;
  const progressPct = Math.round((completed / total) * 100);

  return (
    <div className="space-y-5">
      {/* Hero */}
      <div className="paper-card p-6 campus-gradient">
        <p className="text-campus-sage text-xs font-semibold uppercase tracking-wider mb-1">Tense Lab</p>
        <h1 className="text-heading text-2xl font-bold text-foreground mb-1">
          Привет, {user?.name?.split(' ')[0] || 'студент'}! 👋
        </h1>
        <p className="text-muted-foreground text-sm mb-3">
          {currentLesson && currentSection
            ? `Сейчас ты проходишь модуль ${currentSection.title}. До завершения осталось ${total - completed} уроков.`
            : 'Начни своё обучение!'}
        </p>
        <Link to={currentLesson ? `/app/lesson/${currentLesson.id}` : '/app/program'}>
          <Button className="rounded-xl">Продолжить обучение <ArrowRight className="ml-2 h-4 w-4" /></Button>
        </Link>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="paper-card p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-campus-gold/15 flex items-center justify-center">
            <Award className="h-4 w-4 text-campus-gold" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Academic Points</p>
            <p className="text-lg font-bold text-foreground">{stats.academic_points}</p>
          </div>
        </div>
        <div className="paper-card p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-campus-sage/15 flex items-center justify-center">
            <TrendingUp className="h-4 w-4 text-campus-sage" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Средняя точность</p>
            <p className="text-lg font-bold text-foreground">{stats.accuracy_avg}%</p>
          </div>
        </div>
        <div className="paper-card p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <BarChart3 className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Завершено практик</p>
            <p className="text-lg font-bold text-foreground">{stats.practices_completed}</p>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="paper-card p-5">
        <h2 className="text-heading text-base font-semibold text-foreground mb-2">Прогресс Tense Lab</h2>
        <Progress value={progressPct} className="h-2 mb-2" />
        <p className="text-sm text-muted-foreground">
          Пройдено {completed} из {total} уроков
          {currentLesson && <> · Сейчас: <span className="font-medium text-foreground">{currentLesson.title}</span></>}
        </p>
      </div>

      {/* Main work area */}
      <div className="grid md:grid-cols-3 gap-3">
        {/* Current lesson */}
        <div className="md:col-span-2 paper-card p-5">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-4 w-4 text-campus-gold" />
            <span className="text-xs font-semibold text-campus-sage uppercase tracking-wider">Текущий урок</span>
          </div>
          {currentLesson && (
            <>
              <h3 className="text-heading text-lg font-semibold text-foreground mb-0.5">
                Урок {currentLesson.lesson_number}: {currentLesson.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-3">{currentLesson.short_description}</p>
              <Link to={`/app/lesson/${currentLesson.id}`}>
                <Button className="rounded-lg">Продолжить <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </Link>
              <div className="flex gap-3 mt-2.5">
                <Link to="/app/library" className="text-xs text-campus-sage hover:text-primary transition-colors font-medium">Конспект</Link>
                <Link to="/app/library" className="text-xs text-campus-sage hover:text-primary transition-colors font-medium">Шпаргалка</Link>
              </div>
            </>
          )}
        </div>

        {/* Right column */}
        <div className="space-y-3">
          <div className="paper-card p-4">
            <div className="flex items-center gap-2 mb-1.5">
              <Target className="h-4 w-4 text-campus-gold" />
              <span className="text-xs font-semibold text-campus-sage uppercase tracking-wider">Тренажёр</span>
            </div>
            <p className="text-sm text-foreground font-medium mb-0.5">Потренируй Present Perfect</p>
            <p className="text-xs text-muted-foreground mb-2">Точность ниже среднего — стоит повторить</p>
            <Link to="/app/trainer">
              <Button variant="outline" size="sm" className="w-full rounded-lg">Начать тренировку</Button>
            </Link>
          </div>

          <div className="paper-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-campus-gold" />
              <span className="text-xs font-semibold text-campus-sage uppercase tracking-wider">Слабые места</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {stats.weak_topics_json.map(topic => (
                <Link key={topic} to="/app/trainer" className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors font-medium">
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
