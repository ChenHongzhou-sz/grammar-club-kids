import { ArrowRight, BookOpenCheck, Medal, NotebookTabs, Sparkles, Target } from 'lucide-react';
import { allLessons } from '../data/grammarUnits';
import type { ProgressState } from '../types';
import { LearningMap } from './LearningMap';

interface Props {
  progress: ProgressState;
  stats: { answered: number; correct: number; accuracy: number; wrongCount: number };
  onOpenLesson: (lessonId: string) => void;
  onOpenWrongBook: () => void;
  onOpenBadges: () => void;
  onDailyReview: () => void;
}

export function HomePage({ progress, stats, onOpenLesson, onOpenWrongBook, onOpenBadges, onDailyReview }: Props) {
  const lessons = allLessons;
  const nextLesson = lessons.find((lesson) => !progress.completedLessons.includes(lesson.id)) ?? lessons[0];

  return (
    <main className="mx-auto max-w-6xl px-4 pb-24 pt-5">
      <section className="overflow-hidden rounded-[2.2rem] bg-gradient-to-br from-sky-500 via-cyan-500 to-emerald-400 p-5 text-white shadow-soft">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm font-black">
              <Sparkles className="h-4 w-4" />
              Grammar Kingdom
            </p>
            <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">英语语法王国</h1>
          <p className="mt-3 max-w-xl text-base font-semibold text-white/85">用卡片学习，用练习闯关，用每日复习把语法练成习惯。</p>
          </div>
          <button type="button" onClick={() => onOpenLesson(nextLesson.id)} className="inline-flex items-center justify-center gap-2 rounded-3xl bg-white px-5 py-4 text-lg font-black text-sky-700">
            继续闯关
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      <section className="mt-4 grid gap-3 md:grid-cols-4">
        <div className="rounded-3xl bg-white p-4 shadow-soft ring-1 ring-slate-200/70">
          <Target className="h-6 w-6 text-sky-600" />
          <h2 className="mt-2 font-black text-ink">今日任务</h2>
          <p className="mt-1 text-sm text-slate-600">完成 3 个小关卡，做 10 道每日复习。</p>
        </div>
        <div className="rounded-3xl bg-white p-4 shadow-soft ring-1 ring-slate-200/70">
          <BookOpenCheck className="h-6 w-6 text-emerald-600" />
          <h2 className="mt-2 font-black text-ink">当前进度</h2>
          <p className="mt-1 text-sm text-slate-600">{progress.completedLessons.length} / {lessons.length} 关 · 正确率 {stats.accuracy}%</p>
        </div>
        <button type="button" onClick={onOpenWrongBook} className="rounded-3xl bg-white p-4 text-left shadow-soft ring-1 ring-slate-200/70">
          <NotebookTabs className="h-6 w-6 text-rose-500" />
          <h2 className="mt-2 font-black text-ink">我的错题</h2>
          <p className="mt-1 text-sm text-slate-600">{stats.wrongCount} 道需要复习</p>
        </button>
        <button type="button" onClick={onOpenBadges} className="rounded-3xl bg-white p-4 text-left shadow-soft ring-1 ring-slate-200/70">
          <Medal className="h-6 w-6 text-amber-500" />
          <h2 className="mt-2 font-black text-ink">我的徽章</h2>
          <p className="mt-1 text-sm text-slate-600">{progress.earnedBadges.length} 枚已获得</p>
        </button>
      </section>

      <button type="button" onClick={onDailyReview} className="mt-4 w-full rounded-[2rem] bg-ink px-5 py-4 text-lg font-black text-white shadow-soft">
        开始每日复习 · 10 题
      </button>

      <div className="mt-4">
        <LearningMap progress={progress} onOpenLesson={onOpenLesson} />
      </div>
    </main>
  );
}
