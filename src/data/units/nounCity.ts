import type { GrammarUnit } from '../../types';
import { createLesson } from './createLesson';

const unitId = 'noun-city';
export const nounCity: GrammarUnit = {
  id: unitId,
  title: '名词城',
  place: 'Noun City',
  emoji: '🏙️',
  order: 2,
  color: 'from-amber-300 to-orange-400',
  description: '认识人、地点、东西和名字，学会单复数与冠词。',
  lessons: [
    ['noun-meaning','什么是名词','名词 = 人、地点、东西或名字。','名词像标签，帮我们叫出世界上的人和东西。','看到能被叫名字的人、地方、物品，就可能是名词。','人地物名叫名词，看到东西先认名。','book','This is a book.','句中的名词是哪个？','book'],
    ['people-place-thing','人、地点、东西','名词可以分成人、地点和东西。','把名词放进三个篮子：人、地方、东西。','分类能帮助孩子快速辨认名词。','人地物，三篮装，名词分类不慌张。','teacher','The teacher is kind.','teacher 属于哪一类名词？','人'],
    ['countable-nouns','可数名词','可数名词 = 可以一个一个数的名词。','能说 one, two, three 的，多半可以数。','可数名词有单数和复数。','一个两个数得清，可数名词有复形。','apple','I have two apples.','哪个词表示不止一个苹果？','apples'],
    ['uncountable-nouns','不可数名词','不可数名词 = 不方便一个一个数的东西。','water、rice、milk 像一大片或一堆，通常不直接加 s。','不可数名词常用 some/a cup of/a bag of。','水米牛奶一大片，不能随便加 s。','water','I drink water.','water 可以直接加 s 吗？','不能'],
    ['singular-plural','单数和复数','一个用单数，两个以上常用复数。','英语里数量会影响名词样子。','大多数名词复数加 s 或 es。','一个不加 s，多个 s 来帮忙。','dogs','Two dogs run.','哪个词是复数名词？','dogs'],
    ['articles','a / an / the','a/an 表示一个，the 表示大家都知道的那个。','a/an 像第一次介绍，the 像指给你看那个。','an 用在元音音开头前，如 an apple。','第一次 a/an，指定那个 the。','an apple','I eat an apple.','apple 前面该用什么冠词？','an']
  ].map(([id,title,simple,kid,cn,tip,fill,sen,question,answer], index) => createLesson({
    id, unitId, title, level: index < 3 ? 'primary' : 'junior', stage: index < 4 ? 'basic' : 'advanced',
    simpleExplanation: simple, kidExplanation: kid, chineseExplanation: cn, memoryTip: tip,
    fillPrompt: `Fill in: ${sen.replace(String(fill), '___')}`, fillAnswer: String(fill),
    detectiveSentence: String(sen),
    detectiveTokens: String(sen).replace('.', '').split(' '),
    detectiveAnswer: /^[A-Za-z ]+$/.test(String(answer)) ? String(answer) : String(fill).split(' ').pop(),
    examples: [
      { sentence: String(sen), question: String(question), answer: String(answer), note: simple },
      { sentence: 'A student reads.', question: '找名词', answer: 'student', note: 'student 是人。' },
      { sentence: 'We go to school.', question: '找地点', answer: 'school', note: 'school 是地点。' }
    ],
    contrastExamples: ['book', 'run', 'happy']
  }))
};
