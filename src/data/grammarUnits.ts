import type { GrammarUnit } from '../types';

export const grammarUnits: GrammarUnit[] = [
  {
    id: 'sentence-village',
    title: '句子村',
    place: 'Sentence Village',
    description: '先学会看懂一句话里面谁在做事、做了什么、做到了谁身上。',
    color: 'from-sky-400 to-cyan-400',
    lessons: [
      {
        id: 'what-is-sentence',
        unitId: 'sentence-village',
        title: '什么是句子',
        shortTitle: '句子',
        oneLine: '句子 = 能说完整意思的一句话。',
        visualExample: {
          sentence: 'The bird sings.',
          question: '这句话说完整了吗？',
          answer: '说完整了：鸟在唱歌。',
          note: '有“谁”和“做什么”，意思就站稳了。'
        },
        lifeExplanation: '如果一句话让别人听完还想问“然后呢？”，它可能还不是完整句子。',
        chant: '有头有尾意思清，完整一句才叫句。',
        examples: [
          { sentence: 'I run.', question: '谁在跑？', answer: 'I', note: '这是完整句子。' },
          { sentence: 'The dog sleeps.', question: '狗做什么？', answer: 'sleeps', note: '意思完整。' },
          { sentence: 'A big apple', question: '这是完整句子吗？', answer: '不是', note: '只有东西，没有动作。' }
        ]
      },
      {
        id: 'subject',
        unitId: 'sentence-village',
        title: '什么是主语',
        shortTitle: '主语',
        oneLine: '一句话里，谁在做事，谁就是主语。',
        visualExample: {
          sentence: 'The cat runs.',
          question: '谁在跑？',
          answer: 'cat',
          note: 'cat 是做事的小主角。'
        },
        lifeExplanation: '主语就像舞台上的主角。先找到主角，再看它做了什么。',
        chant: '谁做事，谁站前，主语主语先出现。',
        examples: [
          { sentence: 'Tom jumps.', question: '谁在跳？', answer: 'Tom', note: 'Tom 是主语。' },
          { sentence: 'My sister reads.', question: '谁在读？', answer: 'My sister', note: 'My sister 是主语。' },
          { sentence: 'The flowers grow.', question: '什么在长大？', answer: 'The flowers', note: 'flowers 是主语。' }
        ]
      },
      {
        id: 'verb',
        unitId: 'sentence-village',
        title: '什么是动词',
        shortTitle: '动词',
        oneLine: '动词 = 告诉我们“做什么”或“怎么样”的词。',
        visualExample: {
          sentence: 'Lily dances.',
          question: 'Lily 做什么？',
          answer: 'dances',
          note: 'dances 是动作。'
        },
        lifeExplanation: '跑、吃、看、喜欢、是、变得，这些都能让句子动起来。',
        chant: '动作状态找一找，动词马上跑出来。',
        examples: [
          { sentence: 'Ben eats.', question: 'Ben 做什么？', answer: 'eats', note: 'eat 是动词。' },
          { sentence: 'The sky is blue.', question: '天空怎么样？', answer: 'is', note: 'is 也是动词。' },
          { sentence: 'We play.', question: '我们做什么？', answer: 'play', note: 'play 是动词。' }
        ]
      },
      {
        id: 'object',
        unitId: 'sentence-village',
        title: '什么是宾语',
        shortTitle: '宾语',
        oneLine: '动作做到了谁或什么东西身上，谁就是宾语。',
        visualExample: {
          sentence: 'Tom eats apples.',
          question: '吃了什么？',
          answer: 'apples',
          note: 'apples 接住了 eats 这个动作。'
        },
        lifeExplanation: '找宾语时，可以问“做了谁？”“做了什么？”。',
        chant: '动作打到谁身上，谁就坐到宾语旁。',
        examples: [
          { sentence: 'I like music.', question: '喜欢什么？', answer: 'music', note: 'music 是宾语。' },
          { sentence: 'She draws a star.', question: '画了什么？', answer: 'a star', note: 'a star 是宾语。' },
          { sentence: 'Dad opens the door.', question: '打开什么？', answer: 'the door', note: 'the door 是宾语。' }
        ]
      },
      {
        id: 'sv',
        unitId: 'sentence-village',
        title: '主语 + 动词',
        shortTitle: 'S + V',
        oneLine: '有些句子只要“谁 + 做什么”，意思就完整。',
        visualExample: {
          sentence: 'Birds fly.',
          question: '谁 + 做什么？',
          answer: 'Birds + fly',
          note: '不需要再接东西，意思已经完整。'
        },
        lifeExplanation: 'run、sleep、swim、fly 这类动作常常自己就能讲清楚。',
        chant: '主语动词手牵手，短句也能说清楚。',
        examples: [
          { sentence: 'Babies cry.', question: '结构是什么？', answer: 'Babies + cry', note: '主语 + 动词。' },
          { sentence: 'Fish swim.', question: '谁在游？', answer: 'Fish', note: 'swim 后面不用必须接宾语。' },
          { sentence: 'The bell rings.', question: '做什么？', answer: 'rings', note: '句子完整。' }
        ]
      },
      {
        id: 'svo',
        unitId: 'sentence-village',
        title: '主语 + 动词 + 宾语',
        shortTitle: 'S + V + O',
        oneLine: '如果动作后面要接“做了什么”，就用主语 + 动词 + 宾语。',
        visualExample: {
          sentence: 'Amy reads books.',
          question: 'Amy 读什么？',
          answer: 'books',
          note: 'books 是宾语。'
        },
        lifeExplanation: '很多动作像 eat、like、read、make 后面常常要接一个东西。',
        chant: '谁做事，做什么，SVO 排整齐。',
        examples: [
          { sentence: 'We make cakes.', question: '做了什么？', answer: 'cakes', note: 'cakes 是宾语。' },
          { sentence: 'He kicks the ball.', question: '踢了什么？', answer: 'the ball', note: 'the ball 是宾语。' },
          { sentence: 'Mom buys milk.', question: '买了什么？', answer: 'milk', note: 'milk 是宾语。' }
        ]
      },
      {
        id: 'five-patterns',
        unitId: 'sentence-village',
        title: '五大基本句型儿童版',
        shortTitle: '五大句型',
        oneLine: '英语句子常见的骨架，可以先看成五种积木搭法。',
        visualExample: {
          sentence: 'I am happy. / I like dogs.',
          question: '这两句骨架一样吗？',
          answer: '不一样',
          note: '一句说明状态，一句说明动作做到 dogs 身上。'
        },
        lifeExplanation: '先不用背复杂名字，先会看骨架：谁、做什么、是什么、给谁、变成什么。',
        chant: '句子积木五种搭，先找主语别害怕。',
        examples: [
          { sentence: 'I smile.', question: '骨架？', answer: '主语 + 动词', note: 'S + V。' },
          { sentence: 'She is kind.', question: 'kind 说明什么？', answer: 'She 的样子', note: '主语 + be + 形容词。' },
          { sentence: 'Dad gives me a gift.', question: '给谁？给什么？', answer: 'me / a gift', note: '有两个接收对象。' }
        ]
      }
    ]
  }
];

export const comingSoonUnits = [
  '名词城',
  '代词岛',
  '动词镇',
  '时态森林',
  '形容词花园',
  '副词小路',
  '介词峡谷',
  '句型迷宫'
];
