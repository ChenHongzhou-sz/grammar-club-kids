import type { Question } from '../types';
import { allLessons, grammarUnits } from './grammarUnits';

function unitTitle(unitId: string) {
  return grammarUnits.find((unit) => unit.id === unitId)?.title ?? '语法模块';
}

function words(sentence: string) {
  return sentence.replace(/[.?]/g, '').split(' ').filter(Boolean);
}

function optionSet(correct: string, lessonId: string) {
  const pool = ['subject', 'verb', 'object', 'noun', 'pronoun', 'is', 'are', 'in', 'on', 'at', 'happy', 'books', 'S + V', 'S + V + O'];
  return Array.from(new Set([correct, ...pool.filter((item) => item.toLowerCase() !== correct.toLowerCase() && item !== lessonId).slice(0, 3)])).slice(0, 4);
}

export const questions: Question[] = allLessons.flatMap((lesson) => {
  const unit = unitTitle(lesson.unitId);
  const first = lesson.examples[0];
  const second = lesson.examples[1] ?? first;
  const third = lesson.examples[2] ?? first;
  const detectiveTokens = lesson.detectiveTokens ?? words(first.sentence);
  const detectiveAnswer = lesson.detectiveAnswer ?? first.answer;
  const fillAnswer = lesson.fillAnswer ?? first.answer;
  const fillPrompt = lesson.fillPrompt ?? `Fill in: ${first.sentence.replace(fillAnswer, '___')}`;
  const baseId = `${lesson.unitId}-${lesson.id}`;

  const basic: Question[] = [
    {
      id: `${baseId}-basic-choice-1`,
      unitId: lesson.unitId,
      lessonId: lesson.id,
      type: 'choice',
      level: 'basic',
      prompt: `${unit}：${lesson.title}。Which answer fits? ${first.question}`,
      options: optionSet(first.answer, lesson.id),
      answer: first.answer,
      knowledgePoint: lesson.title,
      explanationCorrect: `太棒了！${first.note}`,
      explanationWrong: `再想想：${lesson.simpleExplanation}`
    },
    {
      id: `${baseId}-basic-choice-2`,
      unitId: lesson.unitId,
      lessonId: lesson.id,
      type: 'choice',
      level: 'basic',
      prompt: `Choose the example for “${lesson.shortTitle}”.`,
      options: [first.sentence, ...(lesson.contrastExamples ?? [second.sentence, third.sentence]).slice(0, 3)],
      answer: first.sentence,
      knowledgePoint: lesson.title,
      explanationCorrect: `对！${first.sentence} 可以帮助理解 ${lesson.title}。`,
      explanationWrong: `先看例句里的关键部分：${first.answer}。`
    },
    {
      id: `${baseId}-basic-fill-1`,
      unitId: lesson.unitId,
      lessonId: lesson.id,
      type: 'fill',
      level: 'basic',
      prompt: fillPrompt,
      placeholder: '输入答案',
      answer: fillAnswer,
      knowledgePoint: lesson.title,
      explanationCorrect: `很好！${fillAnswer} 是这里的关键答案。`,
      explanationWrong: `提示：${lesson.memoryTip}`
    },
    {
      id: `${baseId}-basic-fill-2`,
      unitId: lesson.unitId,
      lessonId: lesson.id,
      type: 'fill',
      level: 'basic',
      prompt: `In “${second.sentence}”, answer: ${second.question}`,
      placeholder: '输入答案',
      answer: second.answer,
      knowledgePoint: lesson.title,
      explanationCorrect: `正确！${second.note}`,
      explanationWrong: `回到问题：${second.question}`
    },
    {
      id: `${baseId}-basic-true-1`,
      unitId: lesson.unitId,
      lessonId: lesson.id,
      type: 'trueFalse',
      level: 'basic',
      prompt: `True or false: ${lesson.simpleExplanation}`,
      answer: 'true',
      knowledgePoint: lesson.title,
      explanationCorrect: `对！${lesson.kidExplanation}`,
      explanationWrong: `这句话是本课的一句话解释。`
    },
    {
      id: `${baseId}-basic-order-1`,
      unitId: lesson.unitId,
      lessonId: lesson.id,
      type: 'order',
      level: 'basic',
      prompt: `Put the words in order: ${first.sentence}`,
      pieces: words(first.sentence).reverse(),
      answer: words(first.sentence),
      knowledgePoint: lesson.title,
      explanationCorrect: `顺序正确！${first.sentence}`,
      explanationWrong: '先找主语，再找动词，最后看后面接什么。'
    },
    {
      id: `${baseId}-basic-match-1`,
      unitId: lesson.unitId,
      lessonId: lesson.id,
      type: 'match',
      level: 'basic',
      prompt: `Match examples for ${lesson.title}.`,
      pairs: [
        { left: first.sentence, right: first.answer },
        { left: second.sentence, right: second.answer },
        { left: third.sentence, right: third.answer }
      ],
      choices: [first.answer, second.answer, third.answer],
      answer: {
        [first.sentence]: first.answer,
        [second.sentence]: second.answer,
        [third.sentence]: third.answer
      },
      knowledgePoint: lesson.title,
      explanationCorrect: '配对成功！你能从例句里找关键点了。',
      explanationWrong: '每个例句都问一遍小问题，再配答案。'
    },
    {
      id: `${baseId}-basic-choice-3`,
      unitId: lesson.unitId,
      lessonId: lesson.id,
      type: 'choice',
      level: 'basic',
      prompt: `Which memory tip belongs to ${lesson.title}?`,
      options: [lesson.memoryTip, '过去事情 yesterday，动词换装很关键。', '近处 this these，远处 that those。', '大 in 日 on 点 at。'],
      answer: lesson.memoryTip,
      knowledgePoint: lesson.title,
      explanationCorrect: '口诀选对了！记住它，做题会快很多。',
      explanationWrong: `本课口诀是：${lesson.memoryTip}`
    }
  ];

  const detective: Question[] = [
    {
      id: `${baseId}-detective-1`,
      unitId: lesson.unitId,
      lessonId: lesson.id,
      type: 'detective',
      level: 'detective',
      prompt: `语法侦探：tap the key word for ${lesson.title}.`,
      sentence: lesson.detectiveSentence ?? first.sentence,
      tokens: detectiveTokens,
      answer: detectiveAnswer,
      knowledgePoint: lesson.title,
      explanationCorrect: `好眼力！${detectiveAnswer} 是关键。`,
      explanationWrong: `再问自己：${first.question}`
    },
    {
      id: `${baseId}-detective-2`,
      unitId: lesson.unitId,
      lessonId: lesson.id,
      type: 'detective',
      level: 'detective',
      prompt: `语法侦探：tap the answer to “${third.question}”.`,
      sentence: third.sentence,
      tokens: words(third.sentence),
      answer: String(third.answer).split(' ').pop() ?? third.answer,
      knowledgePoint: lesson.title,
      explanationCorrect: `对！${third.note}`,
      explanationWrong: `提示：${third.question}`
    }
  ];

  const miniQuiz: Question[] = [
    {
      id: `${baseId}-mini-1`,
      unitId: lesson.unitId,
      lessonId: lesson.id,
      type: 'timed',
      level: 'challenge',
      prompt: `10 秒挑战：${first.question}`,
      options: optionSet(first.answer, lesson.id),
      answer: first.answer,
      timeLimitSeconds: 10,
      knowledgePoint: lesson.title,
      explanationCorrect: '闯关成功！你抓住关键点了。',
      explanationWrong: `快速题也要先想：${lesson.simpleExplanation}`
    },
    {
      id: `${baseId}-mini-2`,
      unitId: lesson.unitId,
      lessonId: lesson.id,
      type: 'choice',
      level: 'challenge',
      prompt: `Which sentence is the best example of ${lesson.title}?`,
      options: [first.sentence, 'Very quickly', 'A yellow pencil', 'Under the table'],
      answer: first.sentence,
      knowledgePoint: lesson.title,
      explanationCorrect: '对！这个例句最贴近本课知识点。',
      explanationWrong: '不要选短语，要选能表现本课知识点的句子。'
    },
    {
      id: `${baseId}-mini-3`,
      unitId: lesson.unitId,
      lessonId: lesson.id,
      type: 'trueFalse',
      level: 'challenge',
      prompt: `True or false: ${lesson.chineseExplanation}`,
      answer: 'true',
      knowledgePoint: lesson.title,
      explanationCorrect: '正确！中文说明理解到位。',
      explanationWrong: '这是本课中文说明，回学习卡看一眼。'
    },
    {
      id: `${baseId}-mini-4`,
      unitId: lesson.unitId,
      lessonId: lesson.id,
      type: 'order',
      level: 'challenge',
      prompt: `Build the example sentence: ${second.sentence}`,
      pieces: words(second.sentence).sort(() => 0.5 - Math.random()),
      answer: words(second.sentence),
      knowledgePoint: lesson.title,
      explanationCorrect: `正确！${second.sentence}`,
      explanationWrong: '排句子时先找谁，再找做什么。'
    },
    {
      id: `${baseId}-mini-5`,
      unitId: lesson.unitId,
      lessonId: lesson.id,
      type: 'fill',
      level: 'challenge',
      prompt: `Memory check: ${lesson.memoryTip.replace(String(lesson.memoryTip.split(' ')[0]), '___')}`,
      placeholder: '补出口诀第一个词',
      answer: lesson.memoryTip.split(' ')[0],
      knowledgePoint: lesson.title,
      explanationCorrect: '口诀记住了，真不错。',
      explanationWrong: `完整口诀：${lesson.memoryTip}`
    }
  ];

  return [...basic, ...detective, ...miniQuiz];
});

export function questionsByLesson(lessonId: string) {
  return questions.filter((question) => question.lessonId === lessonId);
}

export function questionsByUnit(unitId: string) {
  return questions.filter((question) => question.unitId === unitId);
}
