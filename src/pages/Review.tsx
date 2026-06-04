import { BadgePanel } from '../components/BadgePanel';
import { WrongBook } from '../components/WrongBook';
import type { ProgressState } from '../types';

interface Props {
  mode: 'wrong' | 'badges';
  progress: ProgressState;
  onClearWrong: (questionId: string) => void;
  onReviewWrong: (questionId: string) => void;
}

export function Review({ mode, progress, onClearWrong, onReviewWrong }: Props) {
  return (
    <main className="mx-auto max-w-5xl px-4 pb-24 pt-5">
      {mode === 'wrong' ? (
        <WrongBook progress={progress} onClear={onClearWrong} onReview={onReviewWrong} />
      ) : (
        <BadgePanel progress={progress} />
      )}
    </main>
  );
}
