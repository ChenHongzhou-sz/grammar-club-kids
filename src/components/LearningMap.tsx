import { CheckCircle2, Map } from 'lucide-react';
import { grammarUnits } from '../data/grammarUnits';
import type { ProgressState } from '../types';

interface Props {
  progress: ProgressState;
  onOpenLesson: (lessonId: string) => void;
}

export function LearningMap({ progress, onOpenLesson }: Props) {
  return (
    <section className="rounded-[2rem] bg-white/85 p-4 shadow-soft ring-1 ring-slate-200/70">
      <div className="mb-4 flex items-center gap-2">
        <Map className="h-5 w-5 text-sky-600" />
        <h2 className="text-lg font-black text-ink">学习地图</h2>
      </div>

      <div className="grid gap-4">
        {grammarUnits.map((unit) => (
          <div key={unit.id} className="rounded-3xl bg-slate-50 p-3 ring-1 ring-slate-200">
            <div className={`mb-3 rounded-3xl bg-gradient-to-br ${unit.color} p-4 text-white`}>
              <p className="text-sm font-black text-white/80">{unit.emoji} {unit.place}</p>
              <h3 className="text-2xl font-black">{unit.title}</h3>
              <p className="mt-1 text-sm font-semibold text-white/85">{unit.description}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {unit.lessons.map((lesson, index) => {
                const done = progress.completedLessons.includes(lesson.id);
                return (
                  <button
                    key={lesson.id}
                    type="button"
                    onClick={() => onOpenLesson(lesson.id)}
                    className="flex min-h-20 items-center gap-3 rounded-3xl bg-white p-3 text-left ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-soft"
                  >
                    <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-sm font-black text-white ${done ? 'bg-emerald-500' : 'bg-sky-500'}`}>
                      {done ? <CheckCircle2 className="h-5 w-5" /> : index + 1}
                    </span>
                    <span>
                      <span className="mb-1 inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-black uppercase text-slate-500">{lesson.level}</span>
                      <strong className="block text-ink">{lesson.title}</strong>
                      <span className="text-sm text-slate-500">{lesson.oneLine}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
