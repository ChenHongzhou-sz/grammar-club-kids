import type { Badge } from '../types';

export const badges: Badge[] = [
  {
    id: 'subject-master',
    title: '主语达人',
    description: '完成“什么是主语”。',
    icon: '⭐',
    condition: 'lesson',
    target: 'subject'
  },
  {
    id: 'verb-master',
    title: '动词达人',
    description: '完成“什么是动词”。',
    icon: '⚡',
    condition: 'lesson',
    target: 'verb'
  },
  {
    id: 'sentence-hero',
    title: '句子小勇士',
    description: '完成句子村 7 个小关卡。',
    icon: '🏰',
    condition: 'lesson',
    target: 7
  },
  {
    id: 'noun-city-star',
    title: '名词城小明星',
    description: '完成 12 个小关卡。',
    icon: '🏙️',
    condition: 'lesson',
    target: 12
  },
  {
    id: 'map-explorer',
    title: '地图探索家',
    description: '完成 24 个小关卡。',
    icon: '🗺️',
    condition: 'lesson',
    target: 24
  },
  {
    id: 'grammar-detective',
    title: '语法侦探',
    description: '答对 6 道语法侦探题。',
    icon: '🔎',
    condition: 'detective',
    target: 6
  },
  {
    id: 'practice-20',
    title: '练习小冠军',
    description: '累计答对 20 道题。',
    icon: '🏅',
    condition: 'questions',
    target: 20
  },
  {
    id: 'practice-100',
    title: '百题训练家',
    description: '累计答对 100 道题。',
    icon: '💯',
    condition: 'questions',
    target: 100
  },
  {
    id: 'three-day-streak',
    title: '连续学习 3 天',
    description: '连续 3 天打开学习。',
    icon: '🌱',
    condition: 'streak',
    target: 3
  },
  {
    id: 'seven-day-streak',
    title: '连续学习 7 天',
    description: '连续 7 天保持学习。',
    icon: '🌈',
    condition: 'streak',
    target: 7
  },
  {
    id: 'wrong-clear',
    title: '错题清零达人',
    description: '清空所有已掌握错题。',
    icon: '✨',
    condition: 'wrongClear',
    target: 0
  }
];
