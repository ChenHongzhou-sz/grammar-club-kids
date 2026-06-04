import { BookOpen, Lightbulb, MessageCircle, Music2 } from 'lucide-react';
import type { Lesson } from '../types';

interface Props {
  lesson: Lesson;
  onStartQuiz: () => void;
  onBack: () => void;
}

export function LessonCard({ lesson, onStartQuiz, onBack }: Props) {
  return (
    <main className="mx-auto max-w-4xl px-4 pb-24 pt-5">
      <button type="button" onClick={onBack} className="mb-4 rounded-full bg-white px-4 py-2 text-sm font-black text-sky-700 shadow-sm ring-1 ring-sky-100">
        返回地图
      </button>

      <section className="rounded-[2rem] bg-white p-5 shadow-soft ring-1 ring-slate-200/70">
        <p className="text-sm font-black text-sky-600">学习卡片</p>
        <h1 className="mt-1 text-3xl font-black text-ink">{lesson.title}</h1>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-black uppercase text-sky-700">{lesson.level}</span>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">{lesson.stage === 'basic' ? '基础阶段' : lesson.stage === 'advanced' ? '进阶阶段' : '提高阶段'}</span>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl bg-skysoft p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-black text-sky-700">
              <Lightbulb className="h-4 w-4" />
              一句话讲清楚
            </div>
            <p className="text-2xl font-black leading-snug text-ink">{lesson.simpleExplanation}</p>
          </div>

          <div className="rounded-3xl bg-peachsoft p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-black text-orange-700">
              <Music2 className="h-4 w-4" />
              口诀
            </div>
            <p className="text-xl font-black leading-snug text-ink">{lesson.memoryTip}</p>
          </div>
        </div>

        <div className="mt-4 rounded-3xl bg-mintsoft p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-black text-emerald-700">
            <MessageCircle className="h-4 w-4" />
            图像化例子
          </div>
          <p className="text-2xl font-black text-ink">{lesson.visualExample.sentence}</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/80 p-3">
              <span className="text-xs font-black text-slate-500">问题</span>
              <p className="font-bold text-ink">{lesson.visualExample.question}</p>
            </div>
            <div className="rounded-2xl bg-white/80 p-3">
              <span className="text-xs font-black text-slate-500">答案</span>
              <p className="font-bold text-ink">{lesson.visualExample.answer}</p>
            </div>
            <div className="rounded-2xl bg-white/80 p-3">
              <span className="text-xs font-black text-slate-500">所以</span>
              <p className="font-bold text-ink">{lesson.visualExample.note}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-3xl bg-slate-50 p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-black text-slate-600">
            <BookOpen className="h-4 w-4" />
            生活化理解
          </div>
          <p className="text-lg leading-relaxed text-slate-700">{lesson.kidExplanation}</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">{lesson.chineseExplanation}</p>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {lesson.examples.map((example) => (
            <article key={example.sentence} className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
              <h3 className="text-lg font-black text-ink">{example.sentence}</h3>
              <p className="mt-2 text-sm text-slate-500">{example.question}</p>
              <p className="mt-1 font-black text-sky-700">{example.answer}</p>
              <p className="mt-2 text-sm text-slate-600">{example.note}</p>
            </article>
          ))}
        </div>

        <button type="button" onClick={onStartQuiz} className="mt-6 w-full rounded-3xl bg-ink px-5 py-4 text-lg font-black text-white shadow-soft">
          开始练习
        </button>
      </section>
    </main>
  );
}
