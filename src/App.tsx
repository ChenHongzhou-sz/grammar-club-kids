import { useMemo, useState } from 'react';
import { BookOpen, HomeIcon, Medal, NotebookTabs } from 'lucide-react';
import { allLessons } from './data/grammarUnits';
import { questions } from './data/questions';
import { useProgress } from './hooks/useProgress';
import { Home } from './pages/Home';
import { Lesson } from './pages/Lesson';
import { Quiz } from './pages/Quiz';
import { Review } from './pages/Review';
import { Unit } from './pages/Unit';
import type { Question } from './types';

type View = 'home' | 'unit' | 'lesson' | 'quiz' | 'daily' | 'wrong' | 'badges';

export default function App() {
  const { progress, stats, dailyReviewQuestions, completeLesson, recordAnswer, clearWrong } = useProgress();
  const [view, setView] = useState<View>('home');
  const [lessonId, setLessonId] = useState('what-is-sentence');
  const [focusQuestionId, setFocusQuestionId] = useState<string | undefined>();

  const lesson = useMemo(() => {
    return allLessons.find((item) => item.id === lessonId) ?? allLessons[0];
  }, [lessonId]);

  const openLesson = (id: string) => {
    setLessonId(id);
    setFocusQuestionId(undefined);
    setView('lesson');
  };

  const reviewWrong = (questionId: string) => {
    const question = questions.find((item) => item.id === questionId);
    if (!question) return;
    setLessonId(question.lessonId);
    setFocusQuestionId(questionId);
    setView('quiz');
  };

  const handleAnswer = (question: Question, answer: unknown) => recordAnswer(question, answer);

  return (
    <div className="min-h-screen bg-cloud text-ink">
      <header className="sticky top-0 z-30 border-b border-white/70 bg-cloud/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <button type="button" onClick={() => setView('home')} className="text-left">
            <span className="block text-xs font-black uppercase text-sky-600">Grammar Club Kids</span>
            <strong className="text-lg font-black text-ink">英语语法闯关乐园</strong>
          </button>
          <nav className="hidden gap-2 sm:flex">
            <button type="button" onClick={() => setView('home')} className="rounded-full bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm">
              首页
            </button>
            <button type="button" onClick={() => setView('wrong')} className="rounded-full bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm">
              错题
            </button>
            <button type="button" onClick={() => setView('badges')} className="rounded-full bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm">
              徽章
            </button>
          </nav>
        </div>
      </header>

      {view === 'home' && (
        <Home
          progress={progress}
          stats={stats}
          onOpenLesson={openLesson}
          onOpenWrongBook={() => setView('wrong')}
          onOpenBadges={() => setView('badges')}
          onDailyReview={() => setView('daily')}
        />
      )}
      {view === 'unit' && <Unit progress={progress} onOpenLesson={openLesson} />}
      {view === 'lesson' && <Lesson lesson={lesson} onBack={() => setView('unit')} onStartQuiz={() => setView('quiz')} />}
      {view === 'quiz' && (
        <Quiz
          lessonId={lesson.id}
          focusQuestionId={focusQuestionId}
          onBack={() => setView('lesson')}
          onAnswer={handleAnswer}
          onComplete={() => {
            completeLesson(lesson.id);
            setFocusQuestionId(undefined);
            setView('unit');
          }}
        />
      )}
      {view === 'daily' && (
        <Quiz
          lessonId={lesson.id}
          title="每日复习 · 10 题"
          questionsOverride={dailyReviewQuestions}
          onBack={() => setView('home')}
          onAnswer={handleAnswer}
          onComplete={() => setView('home')}
        />
      )}
      {(view === 'wrong' || view === 'badges') && (
        <Review mode={view === 'wrong' ? 'wrong' : 'badges'} progress={progress} onClearWrong={clearWrong} onReviewWrong={reviewWrong} />
      )}

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/90 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl sm:hidden">
        <div className="mx-auto grid max-w-md grid-cols-4 gap-2">
          <button type="button" onClick={() => setView('home')} className="grid justify-items-center gap-1 rounded-2xl px-2 py-2 text-xs font-black text-slate-600">
            <HomeIcon className="h-5 w-5" />
            首页
          </button>
          <button type="button" onClick={() => setView('unit')} className="grid justify-items-center gap-1 rounded-2xl px-2 py-2 text-xs font-black text-slate-600">
            <BookOpen className="h-5 w-5" />
            地图
          </button>
          <button type="button" onClick={() => setView('wrong')} className="grid justify-items-center gap-1 rounded-2xl px-2 py-2 text-xs font-black text-slate-600">
            <NotebookTabs className="h-5 w-5" />
            错题
          </button>
          <button type="button" onClick={() => setView('badges')} className="grid justify-items-center gap-1 rounded-2xl px-2 py-2 text-xs font-black text-slate-600">
            <Medal className="h-5 w-5" />
            徽章
          </button>
        </div>
      </nav>
    </div>
  );
}
