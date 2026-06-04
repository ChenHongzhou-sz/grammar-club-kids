import { useCallback, useEffect, useMemo, useState } from 'react';
import { badges } from '../data/badges';
import { questions } from '../data/questions';
import type { ProgressState, Question, WrongRecord } from '../types';

const STORAGE_KEY = 'grammar-club-kids-progress';

const initialProgress: ProgressState = {
  completedLessons: [],
  answeredQuestions: {},
  wrongBook: {},
  earnedBadges: [],
  streakDays: 0
};

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function readProgress(): ProgressState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? { ...initialProgress, ...JSON.parse(raw) } : initialProgress;
  } catch {
    return initialProgress;
  }
}

function normalizeAnswer(value: unknown) {
  if (Array.isArray(value)) return value.join(' ').trim().toLowerCase();
  if (typeof value === 'object' && value !== null) return JSON.stringify(value);
  return String(value ?? '').trim().toLowerCase();
}

export function isAnswerCorrect(question: Question, answer: unknown) {
  if (question.type === 'match') {
    return normalizeAnswer(answer) === normalizeAnswer(question.answer);
  }
  return normalizeAnswer(answer) === normalizeAnswer(question.answer);
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(() => {
    if (typeof window === 'undefined') return initialProgress;
    return readProgress();
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const touchStudyDay = useCallback(() => {
    setProgress((current) => {
      const today = todayKey();
      if (current.lastStudyDate === today) return current;
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayKey = yesterday.toISOString().slice(0, 10);
      return {
        ...current,
        lastStudyDate: today,
        streakDays: current.lastStudyDate === yesterdayKey ? current.streakDays + 1 : 1
      };
    });
  }, []);

  useEffect(() => {
    touchStudyDay();
  }, [touchStudyDay]);

  const awardBadges = useCallback((next: ProgressState) => {
    const correctCount = Object.values(next.answeredQuestions).filter(Boolean).length;
    const detectiveCorrect = questions.filter((question) => question.type === 'detective' && next.answeredQuestions[question.id]).length;
    const earned = new Set(next.earnedBadges);

    badges.forEach((badge) => {
      if (badge.condition === 'lesson') {
        if (typeof badge.target === 'string' && next.completedLessons.includes(badge.target)) earned.add(badge.id);
        if (typeof badge.target === 'number' && next.completedLessons.length >= badge.target) earned.add(badge.id);
      }
      if (badge.condition === 'questions' && correctCount >= Number(badge.target)) earned.add(badge.id);
      if (badge.condition === 'detective' && detectiveCorrect >= Number(badge.target)) earned.add(badge.id);
      if (badge.condition === 'streak' && next.streakDays >= Number(badge.target)) earned.add(badge.id);
      if (badge.condition === 'wrongClear' && Object.keys(next.wrongBook).length === 0 && correctCount > 0) earned.add(badge.id);
    });

    return { ...next, earnedBadges: Array.from(earned) };
  }, []);

  const completeLesson = useCallback((lessonId: string) => {
    setProgress((current) => {
      const completed = current.completedLessons.includes(lessonId)
        ? current.completedLessons
        : [...current.completedLessons, lessonId];
      return awardBadges({ ...current, completedLessons: completed });
    });
  }, [awardBadges]);

  const recordAnswer = useCallback((question: Question, answer: unknown) => {
    const correct = isAnswerCorrect(question, answer);
    setProgress((current) => {
      const answeredQuestions = { ...current.answeredQuestions, [question.id]: correct };
      const wrongBook = { ...current.wrongBook };

      if (correct) {
        delete wrongBook[question.id];
      } else {
        const previous = wrongBook[question.id];
        const record: WrongRecord = {
          questionId: question.id,
          prompt: question.prompt,
          wrongAnswer: Array.isArray(answer) ? answer.join(' ') : typeof answer === 'object' ? JSON.stringify(answer) : String(answer),
          correctAnswer: Array.isArray(question.answer)
            ? question.answer.join(' ')
            : typeof question.answer === 'object'
              ? JSON.stringify(question.answer)
              : String(question.answer),
          knowledgePoint: question.knowledgePoint,
          mistakeCount: previous ? previous.mistakeCount + 1 : 1,
          lastMistakeAt: new Date().toISOString()
        };
        wrongBook[question.id] = record;
      }

      return awardBadges({ ...current, answeredQuestions, wrongBook });
    });
    return correct;
  }, [awardBadges]);

  const clearWrong = useCallback((questionId: string) => {
    setProgress((current) => {
      const wrongBook = { ...current.wrongBook };
      delete wrongBook[questionId];
      return awardBadges({ ...current, wrongBook });
    });
  }, [awardBadges]);

  const resetProgress = useCallback(() => {
    setProgress(initialProgress);
  }, []);

  const stats = useMemo(() => {
    const answered = Object.keys(progress.answeredQuestions).length;
    const correct = Object.values(progress.answeredQuestions).filter(Boolean).length;
    return {
      answered,
      correct,
      accuracy: answered ? Math.round((correct / answered) * 100) : 0,
      wrongCount: Object.keys(progress.wrongBook).length
    };
  }, [progress]);

  return {
    progress,
    stats,
    completeLesson,
    recordAnswer,
    clearWrong,
    resetProgress
  };
}
