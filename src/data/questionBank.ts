import type { Example, Question } from '../types';
import { allLessons } from './grammarUnits';

const GENERIC_OPTION_POOL = [
  'subject',
  'verb',
  'object',
  'book',
  'happy',
  'school',
  'is',
  'are',
  'play',
  'on',
  'under',
  'yesterday',
  'tomorrow',
  'S + V',
  'S + V + O'
];

function uniqueValues(values: string[]) {
  const seen = new Set<string>();
  return values.filter((value) => {
    const key = value.trim().toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function sentenceTokens(sentence: string) {
  return sentence
    .replace(/[.,?!]/g, '')
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean);
}

function isEnglishLike(value: string) {
  return /^[A-Za-z0-9][A-Za-z0-9 +'/:-]*$/.test(value.trim());
}

function normalizeFillPrompt(prompt: string) {
  const cleaned = prompt.replace(/^Fill in:\s*/i, '').trim();
  const subjectMatch = cleaned.match(/^In [“"](.+)[”"], the subject is ___\.?$/);
  if (subjectMatch) return `在 “${subjectMatch[1]}” 这句里，主语是 ___。`;
  const objectMatch = cleaned.match(/^In [“"](.+)[”"], the object is ___\.?$/);
  if (objectMatch) return `在 “${objectMatch[1]}” 这句里，宾语是 ___。`;
  return cleaned;
}

function fallbackKeyword(sentence: string) {
  const contentTokens = sentenceTokens(sentence).filter((token) => !['a', 'an', 'the'].includes(token.toLowerCase()));
  return contentTokens[contentTokens.length - 1] ?? 'word';
}

function exampleKeyword(example: Example) {
  const answer = String(example.answer).trim();
  if (isEnglishLike(answer)) return answer;
  return fallbackKeyword(example.sentence);
}

function lessonOptionPool(correct: string, examples: Example[], fillAnswer: string, detectiveAnswer: string, contrastExamples: string[] = []) {
  const exampleAnswers = examples.map((example) => String(example.answer).trim()).filter(isEnglishLike);
  const exampleKeywords = examples.map(exampleKeyword);
  const contrastWords = contrastExamples.filter(isEnglishLike);
  const sentenceWords = examples.flatMap((example) => sentenceTokens(example.sentence)).filter((token) => token.length > 1);
  return uniqueValues([correct, fillAnswer, detectiveAnswer, ...exampleAnswers, ...exampleKeywords, ...contrastWords, ...sentenceWords, ...GENERIC_OPTION_POOL]);
}

function buildOptions(correct: string, examples: Example[], fillAnswer: string, detectiveAnswer: string, contrastExamples: string[] = []) {
  const pool = lessonOptionPool(correct, examples, fillAnswer, detectiveAnswer, contrastExamples);
  const distractors = pool.filter((item) => item.trim().toLowerCase() !== correct.trim().toLowerCase()).slice(0, 3);
  return uniqueValues([correct, ...distractors]).slice(0, 4);
}

function resolveDetectiveAnswer(detectiveAnswer: string, tokens: string[]) {
  if (tokens.includes(detectiveAnswer)) return detectiveAnswer;
  const answerWords = sentenceTokens(detectiveAnswer);
  const matched = answerWords.find((word) => tokens.includes(word));
  if (matched) return matched;
  const normalizedAnswer = detectiveAnswer.toLowerCase();
  const similarToken = tokens.find((token) => token.toLowerCase().startsWith(normalizedAnswer) || normalizedAnswer.startsWith(token.toLowerCase()));
  return similarToken ?? tokens.find((token) => !['a', 'an', 'the'].includes(token.toLowerCase())) ?? tokens[0] ?? detectiveAnswer;
}

function matchLabel(example: Example) {
  return `${example.question}：${example.answer}`;
}

export const questions: Question[] = allLessons.flatMap((lesson) => {
  const first = lesson.examples[0];
  const second = lesson.examples[1] ?? first;
  const third = lesson.examples[2] ?? second;
  const fillAnswer = String(lesson.fillAnswer ?? exampleKeyword(first)).trim();
  const fillPrompt = normalizeFillPrompt(lesson.fillPrompt ?? first.sentence.replace(fillAnswer, '___'));
  const rawTokens = lesson.detectiveTokens?.length ? lesson.detectiveTokens : sentenceTokens(lesson.detectiveSentence ?? first.sentence);
  const detectiveTokens = rawTokens.map((token) => token.trim()).filter(Boolean);
  const rawDetectiveAnswer = String(lesson.detectiveAnswer ?? fillAnswer).trim();
  const detectiveAnswer = resolveDetectiveAnswer(rawDetectiveAnswer, detectiveTokens);
  const exampleSentence = lesson.detectiveSentence ?? first.sentence;
  const orderSentence = first.sentence;
  const orderAnswer = sentenceTokens(orderSentence);
  const examples = [first, second, third];
  const matchChoices = uniqueValues(examples.map(matchLabel));
  const quickOptions = buildOptions(fillAnswer, examples, fillAnswer, detectiveAnswer, lesson.contrastExamples);
  const keywordOptions = buildOptions(detectiveAnswer, examples, fillAnswer, detectiveAnswer, lesson.contrastExamples);
  const baseId = `${lesson.unitId}-${lesson.id}`;

  return [
    {
      id: `${baseId}-choice-keyword`,
      unitId: lesson.unitId,
      lessonId: lesson.id,
      type: 'choice',
      level: 'basic',
      prompt: `读句子：${exampleSentence} 下面哪个英文词或短语是这题要找的关键词？`,
      options: keywordOptions,
      answer: detectiveAnswer,
      knowledgePoint: lesson.title,
      explanationCorrect: `答对了，${detectiveAnswer} 就是这句里最关键的部分。`,
      explanationWrong: `先回忆本课要点：${lesson.chineseExplanation}`
    },
    {
      id: `${baseId}-fill-main`,
      unitId: lesson.unitId,
      lessonId: lesson.id,
      type: 'fill',
      level: 'basic',
      prompt: `按提示填空：${fillPrompt}`,
      placeholder: '请输入英文答案',
      answer: fillAnswer,
      knowledgePoint: lesson.title,
      explanationCorrect: `填得很准，答案就是 ${fillAnswer}。`,
      explanationWrong: `想想口诀：${lesson.memoryTip}`
    },
    {
      id: `${baseId}-true-example`,
      unitId: lesson.unitId,
      lessonId: lesson.id,
      type: 'trueFalse',
      level: 'basic',
      prompt: `判断：句子“${first.sentence}”可以作为“${lesson.title}”的例句。`,
      answer: 'true',
      knowledgePoint: lesson.title,
      explanationCorrect: '判断正确，这句就是本课的核心例句之一。',
      explanationWrong: `回到学习卡再看看：${lesson.simpleExplanation}`
    },
    {
      id: `${baseId}-order-example`,
      unitId: lesson.unitId,
      lessonId: lesson.id,
      type: 'order',
      level: 'basic',
      prompt: `把词块排成正确句子。提示：${lesson.simpleExplanation}`,
      pieces: orderAnswer,
      answer: orderAnswer,
      knowledgePoint: lesson.title,
      explanationCorrect: `排好了：${orderSentence}`,
      explanationWrong: '先找主语，再找动词，最后看后面还接了什么内容。'
    },
    {
      id: `${baseId}-detective-tap`,
      unitId: lesson.unitId,
      lessonId: lesson.id,
      type: 'detective',
      level: 'detective',
      prompt: `语法侦探：在“${exampleSentence}”里点出要找的关键词。`,
      sentence: exampleSentence,
      tokens: detectiveTokens,
      answer: detectiveAnswer,
      knowledgePoint: lesson.title,
      explanationCorrect: `找到了，${detectiveAnswer} 就是本题关键词。`,
      explanationWrong: `先想想老师在问什么：${first.question}`
    },
    {
      id: `${baseId}-match-examples`,
      unitId: lesson.unitId,
      lessonId: lesson.id,
      type: 'match',
      level: 'basic',
      prompt: '请为每个句子选出对应的提问和答案。',
      pairs: examples.map((example) => ({ left: example.sentence, right: matchLabel(example) })),
      choices: matchChoices,
      answer: Object.fromEntries(examples.map((example) => [example.sentence, matchLabel(example)])),
      knowledgePoint: lesson.title,
      explanationCorrect: '配对成功，这几句的重点都找对了。',
      explanationWrong: '先读句子，再看下拉框里的“问题 + 答案”哪一项最对应。'
    },
    {
      id: `${baseId}-timed-quick`,
      unitId: lesson.unitId,
      lessonId: lesson.id,
      type: 'timed',
      level: 'challenge',
      prompt: `10 秒快答：下面哪一项能正确填空？ ${fillPrompt}`,
      options: quickOptions,
      answer: fillAnswer,
      timeLimitSeconds: 10,
      knowledgePoint: lesson.title,
      explanationCorrect: `反应很快，${fillAnswer} 放进去最合适。`,
      explanationWrong: `先看清句子，再想本课重点：${lesson.simpleExplanation}`
    }
  ] satisfies Question[];
});

export function questionsByLesson(lessonId: string) {
  return questions.filter((question) => question.lessonId === lessonId);
}

export function questionsByUnit(unitId: string) {
  return questions.filter((question) => question.unitId === unitId);
}
