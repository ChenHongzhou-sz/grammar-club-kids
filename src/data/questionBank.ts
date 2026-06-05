import type { Example, Question } from '../types';
import { allLessons, grammarUnits } from './grammarUnits';

const GENERIC_ENGLISH_OPTIONS = [
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

const GENERIC_CHINESE_OPTIONS = [
  '能',
  '不能',
  '完整',
  '不完整',
  '近',
  '远',
  '单数',
  '复数',
  '人',
  '地点',
  '东西',
  '时间',
  '位置'
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

function lessonTitlesForUnit(unitId: string) {
  return grammarUnits.find((unit) => unit.id === unitId)?.lessons.map((lesson) => lesson.title) ?? [];
}

function buildConceptOptions(unitId: string, lessonTitle: string) {
  const titles = lessonTitlesForUnit(unitId);
  return uniqueValues([lessonTitle, ...titles.filter((title) => title !== lessonTitle)]).slice(0, 4);
}

function answerPool(correct: string, examples: Example[], contrastExamples: string[] = []) {
  if (isEnglishLike(correct)) {
    const exampleAnswers = examples.map((example) => String(example.answer).trim()).filter(isEnglishLike);
    const exampleKeywords = examples.map(exampleKeyword);
    const contrastWords = contrastExamples.filter(isEnglishLike);
    const sentenceWords = examples.flatMap((example) => sentenceTokens(example.sentence)).filter((token) => token.length > 1);
    return uniqueValues([correct, ...exampleAnswers, ...exampleKeywords, ...contrastWords, ...sentenceWords, ...GENERIC_ENGLISH_OPTIONS]);
  }

  const chineseAnswers = examples
    .map((example) => String(example.answer).trim())
    .filter((answer) => answer && !isEnglishLike(answer));
  const contrastWords = contrastExamples.filter((item) => !isEnglishLike(item));
  return uniqueValues([correct, ...chineseAnswers, ...contrastWords, ...GENERIC_CHINESE_OPTIONS]);
}

function buildAnswerOptions(correct: string, examples: Example[], contrastExamples: string[] = []) {
  const pool = answerPool(correct, examples, contrastExamples);
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

function buildMatchPairs(
  examples: Example[],
  fillPrompt: string,
  fillAnswer: string,
  detectiveSentence: string,
  detectiveAnswer: string
) {
  const candidates = [
    { left: examples[0].sentence, right: matchLabel(examples[0]) },
    { left: `填空：${fillPrompt}`, right: `填空答案：${fillAnswer}` },
    { left: `找关键词：${detectiveSentence}`, right: `关键词：${detectiveAnswer}` },
    ...examples.slice(1).map((example) => ({ left: example.sentence, right: matchLabel(example) }))
  ];
  const usedLeft = new Set<string>();
  const pairs: Array<{ left: string; right: string }> = [];
  for (const pair of candidates) {
    if (!pair.left.trim() || !pair.right.trim() || usedLeft.has(pair.left)) continue;
    usedLeft.add(pair.left);
    pairs.push(pair);
    if (pairs.length === 3) break;
  }
  return pairs;
}

export const questions: Question[] = allLessons.flatMap((lesson) => {
  const first = lesson.examples[0];
  const second = lesson.examples[1] ?? first;
  const third = lesson.examples[2] ?? second;
  const examples = [first, second, third];
  const analysisExample = first;
  const timedExample = first;
  const fillAnswer = String(lesson.fillAnswer ?? exampleKeyword(first)).trim();
  const fillPrompt = normalizeFillPrompt(lesson.fillPrompt ?? first.sentence.replace(fillAnswer, '___'));
  const rawTokens = lesson.detectiveTokens?.length ? lesson.detectiveTokens : sentenceTokens(lesson.detectiveSentence ?? first.sentence);
  const detectiveTokens = rawTokens.map((token) => token.trim()).filter(Boolean);
  const rawDetectiveAnswer = String(lesson.detectiveAnswer ?? fillAnswer).trim();
  const detectiveAnswer = resolveDetectiveAnswer(rawDetectiveAnswer, detectiveTokens);
  const exampleSentence = lesson.detectiveSentence ?? first.sentence;
  const orderSentence = first.sentence;
  const orderAnswer = sentenceTokens(orderSentence);
  const conceptOptions = buildConceptOptions(lesson.unitId, lesson.title);
  const analysisOptions = buildAnswerOptions(String(analysisExample.answer).trim(), examples, lesson.contrastExamples);
  const timedOptions = buildAnswerOptions(String(timedExample.answer).trim(), examples, lesson.contrastExamples);
  const matchPairs = buildMatchPairs(examples, fillPrompt, fillAnswer, exampleSentence, detectiveAnswer);
  const matchChoices = uniqueValues(matchPairs.map((pair) => pair.right));
  const baseId = `${lesson.unitId}-${lesson.id}`;

  return [
    {
      id: `${baseId}-concept-choice`,
      unitId: lesson.unitId,
      lessonId: lesson.id,
      type: 'choice',
      level: 'basic',
      prompt: `句子“${first.sentence}”最适合说明哪个语法点？`,
      options: conceptOptions,
      answer: lesson.title,
      knowledgePoint: lesson.title,
      explanationCorrect: `正确，这句例句主要在说明 ${lesson.title}。`,
      explanationWrong: `先抓住本课核心规则：${lesson.simpleExplanation}`
    },
    {
      id: `${baseId}-analysis-choice`,
      unitId: lesson.unitId,
      lessonId: lesson.id,
      type: 'choice',
      level: 'basic',
      prompt: `根据句子“${analysisExample.sentence}”，题目“${analysisExample.question}”的正确答案是哪一个？`,
      options: analysisOptions,
      answer: String(analysisExample.answer).trim(),
      knowledgePoint: lesson.title,
      explanationCorrect: `分析正确，答案就是 ${analysisExample.answer}。`,
      explanationWrong: `先看句子，再回到问题本身：${analysisExample.question}`
    },
    {
      id: `${baseId}-fill-main`,
      unitId: lesson.unitId,
      lessonId: lesson.id,
      type: 'fill',
      level: 'basic',
      prompt: `根据语法规则填空：${fillPrompt}`,
      placeholder: '请输入英文答案',
      answer: fillAnswer,
      knowledgePoint: lesson.title,
      explanationCorrect: `填得准确，答案是 ${fillAnswer}。`,
      explanationWrong: `回忆一下本课规则：${lesson.memoryTip}`
    },
    {
      id: `${baseId}-order-example`,
      unitId: lesson.unitId,
      lessonId: lesson.id,
      type: 'order',
      level: 'basic',
      prompt: `请把这句例句恢复成正确语序。提示：${lesson.simpleExplanation}`,
      pieces: orderAnswer,
      answer: orderAnswer,
      knowledgePoint: lesson.title,
      explanationCorrect: `语序正确：${orderSentence}`,
      explanationWrong: '先找句子的主干，再补上修饰或补充成分。'
    },
    {
      id: `${baseId}-detective-tap`,
      unitId: lesson.unitId,
      lessonId: lesson.id,
      type: 'detective',
      level: 'detective',
      prompt: `语法侦探：在“${exampleSentence}”里点出本课要找的关键词。`,
      sentence: exampleSentence,
      tokens: detectiveTokens,
      answer: detectiveAnswer,
      knowledgePoint: lesson.title,
      explanationCorrect: `找对了，${detectiveAnswer} 就是本题的关键点。`,
      explanationWrong: `想一想老师真正想让你找什么：${first.question}`
    },
    {
      id: `${baseId}-match-examples`,
      unitId: lesson.unitId,
      lessonId: lesson.id,
      type: 'match',
      level: 'basic',
      prompt: '请把练习材料和正确的语法分析配对。',
      pairs: matchPairs,
      choices: matchChoices,
      answer: Object.fromEntries(matchPairs.map((pair) => [pair.left, pair.right])),
      knowledgePoint: lesson.title,
      explanationCorrect: '配对正确，这三项材料的语法重点都判断对了。',
      explanationWrong: '先逐项读材料，再判断对应的语法分析。'
    },
    {
      id: `${baseId}-timed-analysis`,
      unitId: lesson.unitId,
      lessonId: lesson.id,
      type: 'timed',
      level: 'challenge',
      prompt: `10 秒快答：根据句子“${timedExample.sentence}”，题目“${timedExample.question}”的正确答案是哪个？`,
      options: timedOptions,
      answer: String(timedExample.answer).trim(),
      timeLimitSeconds: 10,
      knowledgePoint: lesson.title,
      explanationCorrect: `反应很快，答案是 ${timedExample.answer}。`,
      explanationWrong: `先读句子，再按本课规则判断：${lesson.simpleExplanation}`
    }
  ] satisfies Question[];
});

export function questionsByLesson(lessonId: string) {
  return questions.filter((question) => question.lessonId === lessonId);
}

export function questionsByUnit(unitId: string) {
  return questions.filter((question) => question.unitId === unitId);
}
