import { DEMO_USERS, DEMO_PROGRESS, DEMO_TRAINER_STATS, DEMO_ENROLLMENTS, DEMO_LESSONS } from '@/data/demo-data';
import { Badge } from '@/components/ui/badge';

export default function AdminStudents() {
  const students = DEMO_USERS.filter(u => u.role === 'student');

  return (
    <div className="space-y-6">
      <h1 className="text-heading text-2xl font-bold text-foreground">Ученики</h1>
      <div className="paper-card overflow-hidden overflow-x-auto">
        <table className="w-full text-sm min-w-[800px]">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {['Имя', 'Email', 'Прогресс', 'Текущий урок', 'Баллы', 'Точность', 'Доступ'].map(h => (
                <th key={h} className="text-left p-3 font-medium text-muted-foreground text-xs">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map(s => {
              const progress = DEMO_PROGRESS.filter(p => p.user_id === s.id);
              const completed = progress.filter(p => p.status === 'completed').length;
              const currentP = progress.find(p => p.status === 'in_progress');
              const currentLesson = currentP ? DEMO_LESSONS.find(l => l.id === currentP.lesson_id) : null;
              const enrollment = DEMO_ENROLLMENTS.find(e => e.user_id === s.id);

              return (
                <tr key={s.id} className="border-b border-border">
                  <td className="p-3 font-medium text-foreground">{s.name}</td>
                  <td className="p-3 text-muted-foreground">{s.email}</td>
                  <td className="p-3 text-foreground">{completed}/{DEMO_LESSONS.length}</td>
                  <td className="p-3 text-muted-foreground text-xs">{currentLesson?.title || '—'}</td>
                  <td className="p-3 text-campus-gold font-semibold">{s.id === 'user_student' ? DEMO_TRAINER_STATS.academic_points : 0}</td>
                  <td className="p-3">{s.id === 'user_student' ? `${DEMO_TRAINER_STATS.accuracy_avg}%` : '—'}</td>
                  <td className="p-3"><Badge variant={enrollment?.access_status === 'active' ? 'default' : 'secondary'}>{enrollment?.access_status || 'none'}</Badge></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
