import type { Example, LearningStage, Lesson, LessonLevel } from '../../types';

interface LessonInput {
  id: string;
  unitId: string;
  title: string;
  shortTitle?: string;
  level: LessonLevel;
  stage: LearningStage;
  simpleExplanation: string;
  kidExplanation: string;
  chineseExplanation: string;
  memoryTip: string;
  examples: Example[];
  contrastExamples?: string[];
  fillPrompt?: string;
  fillAnswer?: string;
  detectiveSentence?: string;
  detectiveTokens?: string[];
  detectiveAnswer?: string;
}

export function createLesson(input: LessonInput): Lesson {
  const visualExample = input.examples[0];
  return {
    ...input,
    shortTitle: input.shortTitle ?? input.title,
    oneLine: input.simpleExplanation,
    visualExample,
    lifeExplanation: input.kidExplanation,
    chant: input.memoryTip
  };
}
