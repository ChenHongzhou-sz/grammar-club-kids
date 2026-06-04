import type { LearningStage } from '../types';

export const learningPath: Array<{
  id: LearningStage;
  title: string;
  description: string;
  lessonIds: string[];
}> = [
  {
    id: 'basic',
    title: '基础阶段',
    description: '先看懂一句话里谁在做事、做了什么。',
    lessonIds: ['subject', 'verb', 'object', 'noun-meaning', 'subject-pronouns', 'be-verbs']
  },
  {
    id: 'advanced',
    title: '进阶阶段',
    description: '开始处理动词变化和基础时态。',
    lessonIds: ['third-person-s', 'simple-present', 'present-continuous', 'simple-past', 'simple-future']
  },
  {
    id: 'power',
    title: '提高阶段',
    description: '挑战比较、介词、疑问句、否定句和从句入门。',
    lessonIds: ['comparative', 'superlative', 'time-preps', 'yes-no-question', 'negative-sentence', 'there-be', 'object-clause-intro']
  }
];
