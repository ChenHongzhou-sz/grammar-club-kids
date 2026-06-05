import type { GrammarUnit } from '../../types';
import { createLesson } from './createLesson';

const unitId = 'adjective-garden';
export const adjectiveGarden: GrammarUnit = {
  id: unitId,
  title: '形容词花园',
  place: 'Adjective Garden',
  emoji: '🌷',
  order: 6,
  color: 'from-rose-300 to-pink-400',
  description: '用形容词描述样子、颜色、大小和比较。',
  lessons: [
    ['adjective-meaning','什么是形容词','形容词 = 说明人或东西怎么样。','形容词像彩笔，给名词加颜色和样子。','big, small, happy, red 都是形容词。','描述样子用形容，大小颜色都能行。','happy','The girl is happy.','女孩怎么样？','happy'],
    ['adj-before-noun','形容词修饰名词','形容词常放在名词前面。','先说样子，再说东西：a red apple。','英文里形容词通常放在名词前。','形容词在名前，红苹果 red apple。','red','I see a red apple.','什么样的 apple？','red'],
    ['be-adjective','be + 形容词','be 后面接形容词，说明主语怎么样。','is happy 就是在说“很开心”。','am/is/are + adjective 是常见结构。','be 后形容词，说明怎么样。','tall','He is tall.','他怎么样？','tall'],
    ['comparative','比较级','两个人或东西比较，形容词常变比较级。','比较谁更高、更快、更大，就用 -er 或 more。','small -> smaller, beautiful -> more beautiful。','两个比较用 -er，长词 more 来帮忙。','taller','Tom is taller than Ben.','哪个词是比较级？','taller'],
    ['superlative','最高级','三个或更多里最怎样，用最高级。','在一群里找“最”，常用 the + -est。','small -> the smallest, interesting -> the most interesting。','三个以上找第一，the 和 est 常一起。','the tallest','Amy is the tallest in class.','哪个词是最高级？','the tallest']
  ].map(([id,title,simple,kid,cn,tip,fill,sen,question,answer], index) => createLesson({
    id, unitId, title, level: index < 2 ? 'primary' : index < 4 ? 'junior' : 'challenge', stage: index < 2 ? 'basic' : index < 4 ? 'advanced' : 'power',
    simpleExplanation: simple, kidExplanation: kid, chineseExplanation: cn, memoryTip: tip,
    fillPrompt: `Fill in: ${sen.replace(String(fill), '___')}`, fillAnswer: String(fill),
    detectiveSentence: String(sen), detectiveTokens: String(sen).replace('.', '').split(' '), detectiveAnswer: String(fill).split(' ').pop(),
    examples: [
      { sentence: String(sen), question: String(question), answer: String(answer), note: simple },
      { sentence: 'It is cold.', question: '怎么样？', answer: 'cold', note: 'cold 是形容词。' },
      { sentence: 'A big dog runs.', question: '什么样的 dog？', answer: 'big', note: 'big 修饰 dog。' }
    ],
    contrastExamples: ['happy', 'run', 'table']
  }))
};
