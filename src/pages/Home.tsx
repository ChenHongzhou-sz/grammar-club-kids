import { HomePage } from '../components/HomePage';
import type { ProgressState } from '../types';

interface Props {
  progress: ProgressState;
  stats: { answered: number; correct: number; accuracy: number; wrongCount: number };
  onOpenLesson: (lessonId: string) => void;
  onOpenWrongBook: () => void;
  onOpenBadges: () => void;
  onDailyReview: () => void;
}

export function Home(props: Props) {
  return <HomePage {...props} />;
}
