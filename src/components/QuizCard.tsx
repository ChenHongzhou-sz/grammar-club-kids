import { useEffect, useMemo, useState } from 'react';
import { Clock, Send, Shuffle } from 'lucide-react';
import { isAnswerCorrect } from '../hooks/useProgress';
import type { MatchQuestion, Question } from '../types';

interface Props {
  question: Question;
  index: number;
  total: number;
  onAnswer: (question: Question, answer: unknown) => boolean;
  onNext: () => void;
}

function stringifyAnswer(answer: unknown) {
  if (Array.isArray(answer)) return answer.join(' ');
  if (typeof answer === 'object' && answer !== null) return Object.values(answer).join(' / ');
  return String(answer);
}

export function QuizCard({ question, index, total, onAnswer, onNext }: Props) {
  const [answer, setAnswer] = useState<unknown>('');
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [seconds, setSeconds] = useState(question.timeLimitSeconds ?? 0);

  const shuffledPieces = useMemo(() => {
    if (question.type !== 'order') return [];
    return [...question.pieces].sort(() => 0.5 - Math.random());
  }, [question]);

  useEffect(() => {
    setAnswer('');
    setSubmitted(false);
    setCorrect(false);
    setSeconds(question.timeLimitSeconds ?? 0);
  }, [question]);

  useEffect(() => {
    if (question.type !== 'timed' || submitted) return;
    if (seconds <= 0) {
      const ok = onAnswer(question, '');
      setCorrect(ok);
      setSubmitted(true);
      return;
    }
    const timer = window.setTimeout(() => setSeconds((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [question, seconds, submitted, onAnswer]);

  const choose = (value: unknown) => {
    if (submitted) return;
    setAnswer(value);
    if (question.type === 'choice' || question.type === 'trueFalse' || question.type === 'detective' || question.type === 'timed') {
      const ok = onAnswer(question, value);
      setCorrect(ok);
      setSubmitted(true);
    }
  };

  const submit = () => {
    const ok = onAnswer(question, answer);
    setCorrect(ok);
    setSubmitted(true);
  };

  const renderQuestion = () => {
    if (question.type === 'choice' || question.type === 'timed') {
      return (
        <div className="grid gap-3">
          {question.options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => choose(option)}
              className={`rounded-3xl px-4 py-4 text-left font-black ring-1 transition ${
                answer === option ? 'bg-sky-100 text-sky-800 ring-sky-300' : 'bg-slate-50 text-ink ring-slate-200 hover:bg-white'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      );
    }

    if (question.type === 'trueFalse') {
      return (
        <div className="grid grid-cols-2 gap-3">
          <button type="button" onClick={() => choose('true')} className="rounded-3xl bg-emerald-100 px-4 py-4 font-black text-emerald-700">正确</button>
          <button type="button" onClick={() => choose('false')} className="rounded-3xl bg-rose-100 px-4 py-4 font-black text-rose-700">错误</button>
        </div>
      );
    }

    if (question.type === 'fill') {
      return (
        <div className="grid gap-3">
          <input
            value={String(answer)}
            onChange={(event) => setAnswer(event.target.value)}
            placeholder={question.placeholder ?? '输入答案'}
            className="min-h-14 rounded-3xl border border-slate-200 bg-slate-50 px-4 text-lg font-bold outline-none focus:border-sky-400 focus:bg-white"
          />
          <button type="button" onClick={submit} className="inline-flex items-center justify-center gap-2 rounded-3xl bg-ink px-4 py-4 font-black text-white">
            <Send className="h-4 w-4" />
            提交
          </button>
        </div>
      );
    }

    if (question.type === 'order') {
      const selected = Array.isArray(answer) ? answer : [];
      const selectedCounts = selected.reduce<Map<string, number>>((counts, piece) => {
        counts.set(String(piece), (counts.get(String(piece)) ?? 0) + 1);
        return counts;
      }, new Map());
      const remainingPieces = shuffledPieces.filter((piece) => {
        const used = selectedCounts.get(piece) ?? 0;
        if (used === 0) return true;
        selectedCounts.set(piece, used - 1);
        return false;
      });
      return (
        <div className="grid gap-4">
          <div className="min-h-16 rounded-3xl bg-skysoft p-3 text-sky-900">
            {selected.length ? (
              <div className="flex flex-wrap gap-2">
                {selected.map((piece, pieceIndex) => (
                  <button
                    key={`${piece}-${pieceIndex}`}
                    type="button"
                    onClick={() => !submitted && setAnswer(selected.filter((_, indexValue) => indexValue !== pieceIndex))}
                    className="rounded-2xl bg-white px-3 py-2 font-black ring-1 ring-sky-200"
                  >
                    {piece}
                  </button>
                ))}
              </div>
            ) : (
              <span className="font-black">点击下面词块来排序</span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {remainingPieces.map((piece, pieceIndex) => (
              <button
                key={`${piece}-${pieceIndex}`}
                type="button"
                onClick={() => !submitted && setAnswer([...selected, piece])}
                className="rounded-2xl bg-white px-4 py-3 font-black text-ink ring-1 ring-slate-200"
              >
                {piece}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => setAnswer(selected.slice(0, -1))} className="rounded-full bg-white px-4 py-2 font-black text-slate-600 ring-1 ring-slate-200">
              撤销一个
            </button>
            <button type="button" onClick={() => setAnswer([])} className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 font-black text-slate-600">
              <Shuffle className="h-4 w-4" />
              重排
            </button>
            <button type="button" onClick={submit} className="rounded-full bg-ink px-4 py-2 font-black text-white">提交</button>
          </div>
        </div>
      );
    }

    if (question.type === 'detective') {
      return (
        <div className="flex flex-wrap gap-2 rounded-3xl bg-slate-50 p-4">
          {question.tokens.map((token, tokenIndex) => (
            <button key={`${token}-${tokenIndex}`} type="button" onClick={() => choose(token)} className="rounded-2xl bg-white px-4 py-3 text-lg font-black text-ink ring-1 ring-slate-200">
              {token}
            </button>
          ))}
        </div>
      );
    }

    if (question.type === 'match') {
      const matchQuestion = question as MatchQuestion;
      const current = (answer || {}) as Record<string, string>;
      return (
        <div className="grid gap-3">
          {matchQuestion.pairs.map((pair) => (
            <label key={pair.left} className="grid gap-2 rounded-3xl bg-slate-50 p-3">
              <span className="font-black text-ink">{pair.left}</span>
              <select
                value={current[pair.left] ?? ''}
                onChange={(event) => setAnswer({ ...current, [pair.left]: event.target.value })}
                className="min-h-12 rounded-2xl border border-slate-200 bg-white px-3 font-bold"
              >
                <option value="">请选择对应项</option>
                {matchQuestion.choices.map((choice) => (
                  <option key={choice} value={choice}>{choice}</option>
                ))}
              </select>
            </label>
          ))}
          <button type="button" onClick={submit} className="rounded-3xl bg-ink px-4 py-4 font-black text-white">提交配对</button>
        </div>
      );
    }

    return null;
  };

  return (
    <section className="rounded-[2rem] bg-white p-5 shadow-soft ring-1 ring-slate-200/70">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-black text-sky-600">第 {index + 1} / {total} 题</p>
          <h2 className="mt-1 text-2xl font-black leading-snug text-ink">{question.prompt}</h2>
        </div>
        {question.type === 'timed' && (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-2 text-sm font-black text-amber-700">
            <Clock className="h-4 w-4" />
            {seconds}s
          </span>
        )}
      </div>

      {renderQuestion()}

      {submitted && (
        <div className={`mt-5 rounded-3xl p-4 ${correct ? 'bg-mintsoft' : 'bg-rose-50'}`}>
          <p className={`text-lg font-black ${correct ? 'text-emerald-700' : 'text-rose-700'}`}>
            {correct ? '太棒了！' : '再想想'}
          </p>
          <p className="mt-1 text-slate-700">{correct ? question.explanationCorrect : question.explanationWrong}</p>
          {!correct && <p className="mt-2 text-sm font-black text-ink">正确答案：{stringifyAnswer(question.answer)}</p>}
          <button type="button" onClick={onNext} className="mt-4 w-full rounded-3xl bg-ink px-4 py-3 font-black text-white">
            下一题
          </button>
        </div>
      )}
    </section>
  );
}
