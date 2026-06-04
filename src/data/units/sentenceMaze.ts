import type { GrammarUnit } from '../../types';
import { createLesson } from './createLesson';

const unitId = 'sentence-maze';
export const sentenceMaze: GrammarUnit = {
  id: unitId,
  title: '句型迷宫',
  place: 'Sentence Maze',
  emoji: '🧩',
  order: 8,
  color: 'from-violet-300 to-indigo-500',
  description: '学习提问、否定、there be 和宾语从句入门。',
  lessons: [
    ['yes-no-question','一般疑问句','能用 yes/no 回答的问题，叫一般疑问句。','把 be 或助动词放到前面，就像把问题灯打开。','Are you happy? Do you like apples?','一般疑问 yes/no 答，be/do 提前别害怕。','Do','Do you like apples?','用什么提问？','Do'],
    ['wh-question','特殊疑问句','用 what/where/when/who/how 问具体信息。','想知道什么，就用对应的疑问词。','What is it? Where are you?','问啥用 what，问地 where，问人 who 来配。','Where','Where do you live?','问哪里？','Where'],
    ['negative-sentence','否定句','否定句 = 说“不”的句子。','not 像一个小刹车，让句子变成不是、不做。','I am not tired. He does not swim.','否定 not 来刹车，不是不会不做啦。','not','I am not sad.','哪个表示不？','not'],
    ['there-be','there be 句型','there be 表示“某地有某物”。','先说有，再说东西在哪里。','There is a book on the desk.','某地有物 there be，单数 is 复数 are。','is','There is a cat under the chair.','有几只猫？','a cat'],
    ['compound-sentence','并列句','并列句把两个小句子平等连起来。','and、but、or 像桥，把两件事连接起来。','I like apples, but Tom likes bananas.','and 加一起，but 转方向，or 给选择。','and','I sing and you dance.','哪个连接？','and'],
    ['object-clause-intro','宾语从句入门','宾语从句 = 一个小句子放在动词后当宾语。','I know 后面可以接一个完整小句子。','I know that he is kind.','动词后面接小句，整句当宾语。','that','I think that English is fun.','哪个引出小句子？','that']
  ].map(([id,title,simple,kid,cn,tip,fill,sen,question,answer], index) => createLesson({
    id, unitId, title, level: index < 3 ? 'junior' : 'challenge', stage: index < 3 ? 'advanced' : 'power',
    simpleExplanation: simple, kidExplanation: kid, chineseExplanation: cn, memoryTip: tip,
    fillPrompt: `Fill in: ${sen.replace(String(fill), '___')}`, fillAnswer: String(fill),
    detectiveSentence: String(sen), detectiveTokens: String(sen).replace('?', '').replace('.', '').replace(',', '').split(' '), detectiveAnswer: String(fill),
    examples: [
      { sentence: String(sen), question: String(question), answer: String(answer), note: simple },
      { sentence: 'Are you ready?', question: '能 yes/no 回答吗？', answer: '能', note: '一般疑问句。' },
      { sentence: 'I do not like rain.', question: '哪个表示否定？', answer: 'not', note: 'not 是否定标记。' }
    ],
    contrastExamples: ['Do', 'not', 'that']
  }))
};
