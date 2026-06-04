import type { GrammarUnit } from '../../types';
import { createLesson } from './createLesson';

const unitId = 'verb-town';
export const verbTown: GrammarUnit = {
  id: unitId,
  title: '动词镇',
  place: 'Verb Town',
  emoji: '🚂',
  order: 4,
  color: 'from-emerald-300 to-teal-400',
  description: '认识 be 动词、实义动词、助动词和动词变化。',
  lessons: [
    ['be-verbs','be 动词','am、is、are 是 be 动词。','be 像小桥，连接主语和身份/状态。','I 用 am，he/she/it 用 is，you/we/they 用 are。','I am, you are, he is，be 动词要配齐。','is','She is happy.','哪个是 be？','is'],
    ['action-verbs','实义动词','实义动词说明真正的动作。','run、eat、read、play 都能让句子动起来。','实义动词表示具体动作或想法。','能做能想是实义，动作意思很清晰。','read','We read books.','做什么？','read'],
    ['helping-verbs','助动词','助动词帮动词提问、否定或表示时间。','do、does、did、will 像小助手。','助动词常帮助构成疑问句、否定句和将来时。','do does did will，动词小助手来帮忙。','do','Do you like apples?','哪个帮忙提问？','Do'],
    ['third-person-s','第三人称单数','he/she/it 做主语，一般现在时动词常加 s。','一个他她它做事，动词常常戴 s 小帽子。','go 变 goes，watch 变 watches。','他她它一个人，动词后面 s 跟。','goes','She goes to school.','go 变成？','goes'],
    ['past-verbs','动词过去式','过去发生的动作，动词常变过去式。','昨天、上周、刚才发生的事，要换过去衣服。','play 变 played，go 变 went。','过去事情 yesterday，动词换装别忘记。','played','I played football yesterday.','哪个是过去式？','played'],
    ['ing-verbs','动词 ing 形式','正在做的动作，常用 be + 动词 ing。','现在正在发生，就给动词加 ing。','run 变 running，make 变 making。','正在正在 be 加 ing，动作正在进行中。','running','He is running now.','哪个是 ing？','running']
  ].map(([id,title,simple,kid,cn,tip,fill,sen,question,answer], index) => createLesson({
    id, unitId, title, level: index < 2 ? 'primary' : index < 5 ? 'junior' : 'challenge', stage: index < 2 ? 'basic' : index < 5 ? 'advanced' : 'power',
    simpleExplanation: simple, kidExplanation: kid, chineseExplanation: cn, memoryTip: tip,
    fillPrompt: `Fill in: ${sen.replace(String(fill), '___')}`, fillAnswer: String(fill),
    detectiveSentence: String(sen), detectiveTokens: String(sen).replace('?', '').replace('.', '').split(' '), detectiveAnswer: String(fill),
    examples: [
      { sentence: String(sen), question: String(question), answer: String(answer), note: simple },
      { sentence: 'They are students.', question: '找动词', answer: 'are', note: 'are 是 be 动词。' },
      { sentence: 'Tom plays chess.', question: '找动词', answer: 'plays', note: 'plays 是实义动词。' }
    ],
    contrastExamples: ['plays', 'happy', 'desk']
  }))
};
