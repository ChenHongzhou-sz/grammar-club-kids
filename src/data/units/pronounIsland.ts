import type { GrammarUnit } from '../../types';
import { createLesson } from './createLesson';

const unitId = 'pronoun-island';
export const pronounIsland: GrammarUnit = {
  id: unitId,
  title: '代词岛',
  place: 'Pronoun Island',
  emoji: '🏝️',
  order: 3,
  color: 'from-fuchsia-300 to-pink-400',
  description: '用小词代替名字，让句子不重复。',
  lessons: [
    ['subject-pronouns','I / you / he / she / it','I、you、he、she、it 可以做主语。','这些小词可以代替人或东西站在句子前面。','he 指男孩或男人，she 指女孩或女人，it 指动物或东西。','我你他她它，主语位置站好啦。','He','He runs.','谁在跑？','He'],
    ['plural-pronouns','we / they','we 是我们，they 是他们/她们/它们。','人数变多时，用 we 或 they 更轻松。','we 包含自己，they 不包含自己。','我们 we，他们 they，多人代词别弄混。','They','They play football.','谁在玩？','They'],
    ['object-pronouns','me / him / her / us / them','me、him、her、us、them 常跟在动词后面。','动作做到谁身上，就用宾格代词。','I 变 me，he 变 him，they 变 them。','动作打到我，用 me；打到他，用 him。','him','I see him.','看见谁？','him'],
    ['possessive-pronouns','my / your / his / her / their','my、your、his、her、their 表示“谁的”。','这些词像姓名贴，贴在名词前面。','my book = 我的书，their bags = 他们的包。','谁的东西先说明，my your his her their 行。','my','This is my bag.','谁的包？','my'],
    ['this-that','this / that / these / those','this/these 近，that/those 远。','离我近用 this/these，离我远用 that/those。','this/that 接单数，these/those 接复数。','近处 this these，远处 that those。','This','This is my pencil.','近还是远？','近']
  ].map(([id,title,simple,kid,cn,tip,fill,sen,question,answer], index) => createLesson({
    id, unitId, title, level: index < 2 ? 'primary' : 'junior', stage: index < 4 ? 'basic' : 'advanced',
    simpleExplanation: simple, kidExplanation: kid, chineseExplanation: cn, memoryTip: tip,
    fillPrompt: `Fill in: ${sen.replace(String(fill), '___')}`, fillAnswer: String(fill),
    detectiveSentence: String(sen), detectiveTokens: String(sen).replace('.', '').split(' '), detectiveAnswer: String(fill),
    examples: [
      { sentence: String(sen), question: String(question), answer: String(answer), note: simple },
      { sentence: 'She likes music.', question: '找代词', answer: 'She', note: 'She 代替一个女孩或女人。' },
      { sentence: 'They are happy.', question: '找代词', answer: 'They', note: 'They 代表多人或多个东西。' }
    ],
    contrastExamples: ['he', 'book', 'runs']
  }))
};
