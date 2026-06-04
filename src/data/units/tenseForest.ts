import type { GrammarUnit } from '../../types';
import { createLesson } from './createLesson';

const unitId = 'tense-forest';
export const tenseForest: GrammarUnit = {
  id: unitId,
  title: '时态森林',
  place: 'Tense Forest',
  emoji: '🌲',
  order: 5,
  color: 'from-lime-300 to-green-500',
  description: '用时间线看懂现在、正在、过去和将来。',
  lessons: [
    ['simple-present','一般现在时','经常做、习惯做，用一般现在时。','每天、经常、通常发生的事，用现在时说。','常见时间词：every day, usually, often。','经常习惯现在时，every day 是提示。','plays','Tom plays tennis every day.','经常做什么？','plays'],
    ['present-continuous','现在进行时','正在做，用 be + 动词 ing。','眼前正在发生的动作，要说 am/is/are + ing。','now, look, listen 常提示现在进行时。','正在正在别着急，be 加 ing 在一起。','is reading','She is reading now.','正在做什么？','is reading'],
    ['simple-past','一般过去时','过去发生的事，用过去式。','昨天发生的动作，动词要穿过去衣服。','yesterday, last night, ago 常提示过去时。','过去事情 yesterday，动词换装很关键。','visited','We visited Grandma yesterday.','哪个是过去式？','visited'],
    ['simple-future','一般将来时','以后要做的事，常用 will + 动词原形。','还没发生、以后要发生，用 will 帮忙。','tomorrow, next week 常提示将来时。','未来未来 will 帮忙，动词原形跟身旁。','will go','I will go tomorrow.','哪个表示将来？','will go'],
    ['tense-compare','四种基础时态对比','看时间词，就能选对时态。','先问事情发生在什么时候，再选动词样子。','every day/now/yesterday/tomorrow 是四个重要路标。','先看时间再选衣，动词时态不着急。','now','He is swimming now.','时间词是什么？','now']
  ].map(([id,title,simple,kid,cn,tip,fill,sen,question,answer], index) => createLesson({
    id, unitId, title, level: index < 1 ? 'primary' : index < 4 ? 'junior' : 'challenge', stage: index < 1 ? 'basic' : index < 4 ? 'advanced' : 'power',
    simpleExplanation: simple, kidExplanation: kid, chineseExplanation: cn, memoryTip: tip,
    fillPrompt: `Fill in: ${sen.replace(String(fill), '___')}`, fillAnswer: String(fill),
    detectiveSentence: String(sen), detectiveTokens: String(sen).replace('.', '').split(' '), detectiveAnswer: String(fill).split(' ').pop(),
    examples: [
      { sentence: String(sen), question: String(question), answer: String(answer), note: simple },
      { sentence: 'They play every day.', question: '时间？', answer: 'every day', note: '一般现在时。' },
      { sentence: 'We will study tomorrow.', question: '时间？', answer: 'tomorrow', note: '一般将来时。' }
    ],
    contrastExamples: ['every day', 'now', 'yesterday']
  }))
};
