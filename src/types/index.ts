export type QuestionType = 'choice' | 'fill' | 'trueFalse' | 'order' | 'detective' | 'match' | 'timed';
export type LessonLevel = 'primary' | 'junior' | 'challenge';
export type LearningStage = 'basic' | 'advanced' | 'power';

export interface Example {
  sentence: string;
  question: string;
  answer: string;
  note: string;
}

export interface Lesson {
  id: string;
  unitId: string;
  title: string;
  shortTitle: string;
  level: LessonLevel;
  stage: LearningStage;
  simpleExplanation: string;
  kidExplanation: string;
  chineseExplanation: string;
  memoryTip: string;
  oneLine: string;
  visualExample: Example;
  lifeExplanation: string;
  chant: string;
  examples: Example[];
  contrastExamples?: string[];
  fillPrompt?: string;
  fillAnswer?: string;
  detectiveSentence?: string;
  detectiveTokens?: string[];
  detectiveAnswer?: string;
}

export interface GrammarUnit {
  id: string;
  title: string;
  place: string;
  description: string;
  color: string;
  emoji: string;
  order: number;
  lessons: Lesson[];
}

export interface BaseQuestion {
  id: string;
  lessonId: string;
  unitId: string;
  type: QuestionType;
  prompt: string;
  answer: string | string[] | Record<string, string>;
  explanationCorrect: string;
  explanationWrong: string;
  knowledgePoint: string;
  level: 'basic' | 'detective' | 'challenge';
  timeLimitSeconds?: number;
}

export interface ChoiceQuestion extends BaseQuestion {
  type: 'choice';
  options: string[];
}

export interface FillQuestion extends BaseQuestion {
  type: 'fill';
  placeholder?: string;
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: 'trueFalse';
}

export interface OrderQuestion extends BaseQuestion {
  type: 'order';
  pieces: string[];
}

export interface DetectiveQuestion extends BaseQuestion {
  type: 'detective';
  sentence: string;
  tokens: string[];
}

export interface MatchQuestion extends BaseQuestion {
  type: 'match';
  pairs: Array<{ left: string; right: string }>;
  choices: string[];
}

export interface TimedQuestion extends BaseQuestion {
  type: 'timed';
  options: string[];
  timeLimitSeconds: number;
}

export type Question =
  | ChoiceQuestion
  | FillQuestion
  | TrueFalseQuestion
  | OrderQuestion
  | DetectiveQuestion
  | MatchQuestion
  | TimedQuestion;

export interface WrongRecord {
  questionId: string;
  unitId?: string;
  lessonId?: string;
  moduleTitle?: string;
  prompt: string;
  wrongAnswer: string;
  correctAnswer: string;
  knowledgePoint: string;
  mistakeCount: number;
  lastMistakeAt: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: 'lesson' | 'questions' | 'streak' | 'wrongClear' | 'detective';
  target: number | string;
}

export interface ProgressState {
  completedLessons: string[];
  answeredQuestions: Record<string, boolean>;
  wrongBook: Record<string, WrongRecord>;
  earnedBadges: string[];
  lastStudyDate?: string;
  streakDays: number;
}
