import { CheckCircle2, Lock, Map } from 'lucide-react';
import { comingSoonUnits, grammarUnits } from '../data/grammarUnits';
import type { ProgressState } from '../types';

interface Props {
  progress: ProgressState;
  onOpenLesson: (lessonId: string) => void;
}

export function LearningMap({ progress, onOpenLesson }: Props) {
  const sentenceVillage = grammarUnits[0];

  return (
    <section className="rounded-[2rem] bg-white/85 p-4 shadow-soft ring-1 ring-slate-200/70">
      <div className="mb-4 flex items-center gap-2">
        <Map className="h-5 w-5 text-sky-600" />
        <h2 className="text-lg font-black text-ink">学习地图</h2>
      </div>

      <div className="mb-4 rounded-3xl bg-gradient-to-br from-sky-100 to-cyan-100 p-4">
        <p className="text-sm font-bold text-sky-700">{sentenceVillage.place}</p>
        <h3 className="text-2xl font-black text-ink">{sentenceVillage.title}</h3>
        <p className="mt-1 text-sm text-slate-600">{sentenceVillage.description}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {sentenceVillage.lessons.map((lesson, index) => {
          const done = progress.completedLessons.includes(lesson.id);
          return (
            <button
              key={lesson.id}
              type="button"
              onClick={() => onOpenLesson(lesson.id)}
              className="flex min-h-20 items-center gap-3 rounded-3xl bg-slate-50 p-3 text-left ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-soft"
            >
              <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-sm font-black text-white ${done ? 'bg-emerald-500' : 'bg-sky-500'}`}>
                {done ? <CheckCircle2 className="h-5 w-5" /> : index + 1}
              </span>
              <span>
                <strong className="block text-ink">{lesson.title}</strong>
                <span className="text-sm text-slate-500">{lesson.oneLine}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {comingSoonUnits.map((unit) => (
          <div key={unit} className="flex items-center gap-2 rounded-2xl bg-slate-100 px-3 py-3 text-sm font-bold text-slate-500">
            <Lock className="h-4 w-4" />
            {unit}
          </div>
        ))}
      </div>
    </section>
  );
}
