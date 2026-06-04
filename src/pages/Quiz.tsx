import { useMemo, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { QuizCard } from '../components/QuizCard';
import { questionsByLesson } from '../data/questions';
import type { Question } from '../types';

interface Props {
  lessonId: string;
  onAnswer: (question: Question, answer: unknown) => boolean;
  onComplete: () => void;
  onBack: () => void;
  focusQuestionId?: string;
  questionsOverride?: Question[];
  title?: string;
}

export function Quiz({ lessonId, onAnswer, onComplete, onBack, focusQuestionId, questionsOverride, title }: Props) {
  const questions = useMemo(() => {
    if (questionsOverride) return questionsOverride;
    const list = questionsByLesson(lessonId);
    if (!focusQuestionId) return list;
    const focused = list.find((question) => question.id === focusQuestionId);
    return focused ? [focused] : list;
  }, [lessonId, focusQuestionId]);
  const [index, setIndex] = useState(0);
  const finished = index >= questions.length;

  if (finished) {
    return (
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-8">
        <section className="rounded-[2rem] bg-white p-6 text-center shadow-soft ring-1 ring-slate-200/70">
          <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-500" />
          <h1 className="mt-4 text-3xl font-black text-ink">小关卡完成</h1>
          <p className="mt-2 text-slate-600">休息一下眼睛，再继续下一关。</p>
          <button type="button" onClick={onComplete} className="mt-6 w-full rounded-3xl bg-ink px-4 py-4 font-black text-white">
            回到学习地图
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 pb-24 pt-5">
      <button type="button" onClick={onBack} className="mb-4 rounded-full bg-white px-4 py-2 text-sm font-black text-sky-700 shadow-sm ring-1 ring-sky-100">
        返回学习卡
      </button>
      {title && <h1 className="mb-4 text-2xl font-black text-ink">{title}</h1>}
      <QuizCard
        question={questions[index]}
        index={index}
        total={questions.length}
        onAnswer={onAnswer}
        onNext={() => setIndex((value) => value + 1)}
      />
    </main>
  );
}
