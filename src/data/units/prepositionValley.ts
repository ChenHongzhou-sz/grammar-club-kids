import type { GrammarUnit } from '../../types';
import { createLesson } from './createLesson';

const unitId = 'preposition-valley';
export const prepositionValley: GrammarUnit = {
  id: unitId,
  title: '介词峡谷',
  place: 'Preposition Valley',
  emoji: '⛰️',
  order: 7,
  color: 'from-stone-300 to-slate-500',
  description: '用小介词说清时间和位置。',
  lessons: [
    ['prep-in','in','in 常表示在里面、在较长时间里。','在盒子里、在房间里、在一年里，都常用 in。','in the box, in 2026, in the morning。','里面长时间，多半用 in。','in','The ball is in the box.','球在哪里？','in the box'],
    ['prep-on','on','on 常表示在表面上、在具体某一天。','东西放在桌面上，日期落在某一天。','on the desk, on Monday。','表面某天用 on，桌上周一都能通。','on','The book is on the desk.','书在哪里？','on the desk'],
    ['prep-at','at','at 常表示小地点或具体时间点。','在门口、在学校、在 7 点，常用 at。','at the door, at school, at 7:00。','小点时刻用 at，门口七点别弄差。','at','We meet at 7:00.','几点见？','at 7:00'],
    ['prep-under','under','under 表示在下面。','猫在桌子下面，位置比桌子低。','under the table = 在桌子下面。','下面下面 under 站。','under','The cat is under the table.','猫在哪里？','under the table'],
    ['prep-behind','behind','behind 表示在后面。','躲在门后面，用 behind。','behind the door = 在门后。','后面后面 behind 藏。','behind','The boy is behind the door.','男孩在哪里？','behind the door'],
    ['prep-near','near','near 表示在附近。','near 不一定挨着，只是离得近。','near the school = 在学校附近。','附近附近 near 来帮。','near','My home is near the school.','家在哪里？','near the school'],
    ['time-preps','时间介词','in/on/at 可以帮我们说清时间。','大时间 in，某一天 on，几点 at。','in May, on Friday, at night。','大 in 日 on 点 at，时间介词这样抓。','on','I play on Sunday.','哪一天？','on Sunday'],
    ['place-preps','地点介词','地点介词告诉我们东西在哪里。','in/on/under/behind/near 都能描述位置。','先看是在里面、上面、下面、后面还是附近。','地点位置先观察，介词帮你说方向。','under','The shoes are under the bed.','鞋在哪里？','under the bed']
  ].map(([id,title,simple,kid,cn,tip,fill,sen,question,answer], index) => createLesson({
    id, unitId, title, level: index < 6 ? 'primary' : 'junior', stage: index < 6 ? 'basic' : 'advanced',
    simpleExplanation: simple, kidExplanation: kid, chineseExplanation: cn, memoryTip: tip,
    fillPrompt: `Fill in: ${sen.replace(String(fill), '___')}`, fillAnswer: String(fill),
    detectiveSentence: String(sen), detectiveTokens: String(sen).replace('.', '').split(' '), detectiveAnswer: String(fill),
    examples: [
      { sentence: String(sen), question: String(question), answer: String(answer), note: simple },
      { sentence: 'The cup is on the table.', question: '位置？', answer: 'on the table', note: 'on 表示在表面上。' },
      { sentence: 'We eat at noon.', question: '时间？', answer: 'at noon', note: 'at 表示时间点。' }
    ],
    contrastExamples: ['in', 'on', 'at']
  }))
};
