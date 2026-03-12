import { DEMO_EXERCISES, DEMO_LESSONS } from '@/data/demo-data';
import { Badge } from '@/components/ui/badge';

export default function AdminTrainer() {
  return (
    <div className="space-y-6">
      <h1 className="text-heading text-2xl font-bold text-foreground">Тренажёр — Банк заданий</h1>
      <div className="paper-card overflow-hidden overflow-x-auto">
        <table className="w-full text-sm min-w-[900px]">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {['Prompt', 'Type', 'Lesson', 'Tags', 'Difficulty', 'Answer', 'Active'].map(h => (
                <th key={h} className="text-left p-3 font-medium text-muted-foreground text-xs">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DEMO_EXERCISES.map(ex => {
              const lesson = DEMO_LESSONS.find(l => l.id === ex.lesson_id);
              return (
                <tr key={ex.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                  <td className="p-3 text-foreground max-w-[200px] truncate">{ex.prompt}</td>
                  <td className="p-3"><Badge variant="outline" className="text-xs">{ex.exercise_type}</Badge></td>
                  <td className="p-3 text-muted-foreground text-xs">{lesson?.lesson_number}. {lesson?.title}</td>
                  <td className="p-3">{ex.tense_tags.map(t => <Badge key={t} variant="secondary" className="text-xs mr-1">{t}</Badge>)}</td>
                  <td className="p-3"><Badge variant="outline" className="text-xs">{ex.difficulty}</Badge></td>
                  <td className="p-3 text-xs text-campus-success max-w-[120px] truncate">{ex.correct_answer}</td>
                  <td className="p-3">{ex.is_active ? <span className="text-campus-success text-xs">✓</span> : <span className="text-destructive text-xs">✗</span>}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
