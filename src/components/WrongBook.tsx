import { RotateCcw, Trash2 } from 'lucide-react';
import type { ProgressState } from '../types';

interface Props {
  progress: ProgressState;
  onClear: (questionId: string) => void;
  onReview: (questionId: string) => void;
}

export function WrongBook({ progress, onClear, onReview }: Props) {
  const records = Object.values(progress.wrongBook).sort((a, b) => b.lastMistakeAt.localeCompare(a.lastMistakeAt));
  const grouped = records.reduce<Record<string, typeof records>>((acc, record) => {
    acc[record.knowledgePoint] = acc[record.knowledgePoint] || [];
    acc[record.knowledgePoint].push(record);
    return acc;
  }, {});

  return (
    <section className="rounded-[2rem] bg-white/85 p-4 shadow-soft ring-1 ring-slate-200/70">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-ink">我的错题</h2>
          <p className="text-sm text-slate-500">今日错题复习会自动放在最前面。</p>
        </div>
        <span className="rounded-full bg-rose-100 px-3 py-1 text-sm font-black text-rose-600">{records.length} 题</span>
      </div>

      {!records.length && (
        <div className="rounded-3xl bg-mintsoft p-5 text-center">
          <p className="text-2xl font-black text-ink">今天没有错题</p>
          <p className="mt-1 text-slate-600">继续闯关，保持这个状态。</p>
        </div>
      )}

      <div className="grid gap-4">
        {Object.entries(grouped).map(([point, items]) => (
          <div key={point} className="rounded-3xl bg-slate-50 p-4">
            <h3 className="mb-3 font-black text-ink">{point}</h3>
            <div className="grid gap-3">
              {items.map((record) => (
                <article key={record.questionId} className="rounded-2xl bg-white p-3 ring-1 ring-slate-200">
                  <p className="font-bold text-ink">{record.prompt}</p>
                  <p className="mt-2 text-sm text-slate-600">你的答案：{record.wrongAnswer}</p>
                  <p className="text-sm text-emerald-700">正确答案：{record.correctAnswer}</p>
                  <p className="mt-1 text-xs font-bold text-slate-400">错误 {record.mistakeCount} 次 · {new Date(record.lastMistakeAt).toLocaleDateString()}</p>
                  <div className="mt-3 flex gap-2">
                    <button type="button" onClick={() => onReview(record.questionId)} className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-3 py-2 text-sm font-black text-sky-700">
                      <RotateCcw className="h-4 w-4" />
                      重新练习
                    </button>
                    <button type="button" onClick={() => onClear(record.questionId)} className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-2 text-sm font-black text-slate-600">
                      <Trash2 className="h-4 w-4" />
                      已掌握
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
