import type { GrammarUnit } from '../../types';
import { createLesson } from './createLesson';

const unitId = 'sentence-village';

export const sentenceVillage: GrammarUnit = {
  id: unitId,
  title: '句子村',
  place: 'Sentence Village',
  emoji: '🏘️',
  order: 1,
  color: 'from-sky-400 to-cyan-400',
  description: '看懂一句话的骨架：谁、做什么、做到谁身上、说明什么。',
  lessons: [
    createLesson({
      id: 'what-is-sentence',
      unitId,
      title: '什么是句子',
      level: 'primary',
      stage: 'basic',
      simpleExplanation: '句子 = 能说完整意思的一句话。',
      kidExplanation: '一句话要像一个小故事，听完知道发生了什么。',
      chineseExplanation: '完整句子通常有主语和动词，能表达一个清楚意思。',
      memoryTip: '有头有尾意思清，完整一句才叫句。',
      fillPrompt: 'The sun ___.',
      fillAnswer: 'shines',
      detectiveSentence: 'The little bird',
      detectiveTokens: ['The', 'little', 'bird'],
      detectiveAnswer: 'bird',
      examples: [
        { sentence: 'The bird sings.', question: '这句话完整吗？', answer: '完整', note: '鸟在唱歌，说清楚了。' },
        { sentence: 'I run.', question: '谁在跑？', answer: 'I', note: '有谁，也有动作。' },
        { sentence: 'A red bag', question: '完整吗？', answer: '不完整', note: '只有东西，没有发生什么。' }
      ],
      contrastExamples: ['Very happy', 'The rabbit jumps.', 'A blue kite']
    }),
    createLesson({
      id: 'subject',
      unitId,
      title: '主语',
      level: 'primary',
      stage: 'basic',
      simpleExplanation: '一句话里，谁在做事，谁就是主语。',
      kidExplanation: '主语像舞台上的主角，句子先告诉我们主角是谁。',
      chineseExplanation: '找主语时，先问“谁/什么在做这件事？”',
      memoryTip: '谁做事，谁站前，主语主语先出现。',
      fillPrompt: 'In “The cat sleeps.”, the subject is ___.',
      fillAnswer: 'The cat',
      detectiveSentence: 'The happy boy sings.',
      detectiveTokens: ['The', 'happy', 'boy', 'sings'],
      detectiveAnswer: 'boy',
      examples: [
        { sentence: 'Tom jumps.', question: '谁在跳？', answer: 'Tom', note: 'Tom 是主语。' },
        { sentence: 'My sister reads.', question: '谁在读？', answer: 'My sister', note: 'My sister 是主语。' },
        { sentence: 'The flowers grow.', question: '什么在长大？', answer: 'The flowers', note: 'The flowers 是主语。' }
      ],
      contrastExamples: ['Tom', 'jumps', 'Tom jumps']
    }),
    createLesson({
      id: 'verb',
      unitId,
      title: '动词',
      level: 'primary',
      stage: 'basic',
      simpleExplanation: '动词 = 告诉我们“做什么”或“怎么样”的词。',
      kidExplanation: '动词让句子动起来，也可以说明人或东西是什么样。',
      chineseExplanation: 'run、eat、play 是动作；am、is、are 也可以做动词。',
      memoryTip: '动作状态找一找，动词马上跑出来。',
      fillPrompt: 'We ___ games.',
      fillAnswer: 'play',
      detectiveSentence: 'The sky is blue.',
      detectiveTokens: ['The', 'sky', 'is', 'blue'],
      detectiveAnswer: 'is',
      examples: [
        { sentence: 'Lily dances.', question: 'Lily 做什么？', answer: 'dances', note: 'dances 是动词。' },
        { sentence: 'Ben eats.', question: 'Ben 做什么？', answer: 'eats', note: 'eats 是动词。' },
        { sentence: 'The sky is blue.', question: '哪个词连接状态？', answer: 'is', note: 'is 是 be 动词。' }
      ],
      contrastExamples: ['sleep', 'green', 'school']
    }),
    createLesson({
      id: 'object',
      unitId,
      title: '宾语',
      level: 'primary',
      stage: 'basic',
      simpleExplanation: '动作做到了谁或什么东西身上，谁就是宾语。',
      kidExplanation: '找宾语时，问“做了什么？”“喜欢谁？”“看见什么？”',
      chineseExplanation: '宾语常常跟在动词后面，接住动作。',
      memoryTip: '动作打到谁身上，谁就坐到宾语旁。',
      fillPrompt: 'In “I like music.”, the object is ___.',
      fillAnswer: 'music',
      detectiveSentence: 'Dad buys milk.',
      detectiveTokens: ['Dad', 'buys', 'milk'],
      detectiveAnswer: 'milk',
      examples: [
        { sentence: 'Tom eats apples.', question: '吃了什么？', answer: 'apples', note: 'apples 是宾语。' },
        { sentence: 'I like music.', question: '喜欢什么？', answer: 'music', note: 'music 是宾语。' },
        { sentence: 'She draws a star.', question: '画了什么？', answer: 'a star', note: 'a star 是宾语。' }
      ],
      contrastExamples: ['Tom', 'eats', 'apples']
    }),
    createLesson({
      id: 'predicative',
      unitId,
      title: '表语',
      level: 'junior',
      stage: 'advanced',
      simpleExplanation: '表语 = 跟在 be 后面，说明主语是什么或怎么样。',
      kidExplanation: 'be 动词像一座小桥，桥后面的词告诉我们主语的样子。',
      chineseExplanation: 'am/is/are 后面的名词或形容词，常常是表语。',
      memoryTip: 'be 后说明啥，表语来回答。',
      fillPrompt: 'She is ___.',
      fillAnswer: 'happy',
      detectiveSentence: 'The soup is hot.',
      detectiveTokens: ['The', 'soup', 'is', 'hot'],
      detectiveAnswer: 'hot',
      examples: [
        { sentence: 'She is kind.', question: 'She 怎么样？', answer: 'kind', note: 'kind 是表语。' },
        { sentence: 'I am a student.', question: '我是什么？', answer: 'a student', note: 'a student 是表语。' },
        { sentence: 'The soup is hot.', question: '汤怎么样？', answer: 'hot', note: 'hot 是表语。' }
      ],
      contrastExamples: ['happy', 'runs', 'apple']
    }),
    createLesson({
      id: 'complement',
      unitId,
      title: '补语',
      level: 'challenge',
      stage: 'power',
      simpleExplanation: '补语 = 补充说明主语或宾语，让意思更完整。',
      kidExplanation: '有些句子说到一半还不够，补语像补上的最后一块拼图。',
      chineseExplanation: '补语可以说明“变成什么”“叫他什么”“让谁怎么样”。',
      memoryTip: '意思不够补一补，补语帮忙说清楚。',
      fillPrompt: 'We call him ___.',
      fillAnswer: 'Tom',
      detectiveSentence: 'The news made me happy.',
      detectiveTokens: ['The', 'news', 'made', 'me', 'happy'],
      detectiveAnswer: 'happy',
      examples: [
        { sentence: 'The news made me happy.', question: 'me 怎么样？', answer: 'happy', note: 'happy 补充说明 me。' },
        { sentence: 'We call him Tom.', question: '叫他什么？', answer: 'Tom', note: 'Tom 是补语。' },
        { sentence: 'The leaves turn yellow.', question: '叶子变成什么样？', answer: 'yellow', note: 'yellow 是补语。' }
      ],
      contrastExamples: ['happy', 'me', 'made']
    }),
    createLesson({
      id: 'five-patterns',
      unitId,
      title: '五大基本句型',
      level: 'challenge',
      stage: 'power',
      simpleExplanation: '英语句子常见的骨架，可以先看成五种积木搭法。',
      kidExplanation: '先不用背复杂名字，先看谁、做什么、接了什么。',
      chineseExplanation: '五大句型帮助我们快速看懂句子结构。',
      memoryTip: '句子积木五种搭，先找主语别害怕。',
      fillPrompt: 'Tom is ___.',
      fillAnswer: 'happy',
      detectiveSentence: 'Dad gives me a gift.',
      detectiveTokens: ['Dad', 'gives', 'me', 'a', 'gift'],
      detectiveAnswer: 'me',
      examples: [
        { sentence: 'I smile.', question: '骨架？', answer: 'S + V', note: '主语 + 动词。' },
        { sentence: 'I like dogs.', question: '骨架？', answer: 'S + V + O', note: '动词后有宾语。' },
        { sentence: 'I am happy.', question: 'happy 说明什么？', answer: 'I 的状态', note: 'be 后是表语。' }
      ],
      contrastExamples: ['S + V', 'S + V + O', 'S + be + adjective']
    })
  ]
};
