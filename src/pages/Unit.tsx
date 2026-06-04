import { LearningMap } from '../components/LearningMap';
import type { ProgressState } from '../types';

export function Unit({ progress, onOpenLesson }: { progress: ProgressState; onOpenLesson: (lessonId: string) => void }) {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-24 pt-5">
      <LearningMap progress={progress} onOpenLesson={onOpenLesson} />
    </main>
  );
}
