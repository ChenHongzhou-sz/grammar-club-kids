import { LessonCard } from '../components/LessonCard';
import type { Lesson as LessonType } from '../types';

export function Lesson({ lesson, onStartQuiz, onBack }: { lesson: LessonType; onStartQuiz: () => void; onBack: () => void }) {
  return <LessonCard lesson={lesson} onStartQuiz={onStartQuiz} onBack={onBack} />;
}
