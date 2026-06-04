# Grammar Club Kids

英语语法闯关乐园。  
这是一个面向小学高年级和初中生的英语语法训练 Web App。第二阶段已经从演示版扩展为可持续学习版。

## 目标

- 不做长篇电子书
- 用儿童能理解的话讲语法
- 每个知识点都有例句和练习
- 支持错题本、徽章、学习进度
- 手机和 iPad 优先

## 第二阶段内容

当前包含 8 个模块、48 个知识点、720 道结构化练习题：

1. 句子村
2. 名词城
3. 代词岛
4. 动词镇
5. 时态森林
6. 形容词花园
7. 介词峡谷
8. 句型迷宫

每个知识点包含：

- 一句话讲清楚
- 儿童化讲解
- 中文说明
- 记忆口诀
- 图像化例子
- 3 个例句
- 8 道基础题
- 2 道语法侦探题
- 5 道小测题
- 难度标签：primary / junior / challenge

## 已实现功能

- 首页：今日任务、学习地图、当前进度、错题本入口、徽章入口、继续闯关
- 题型：选择题、填空题、判断题、拖拽式排序题、找错误题、配对题、限时挑战题
- 错题本：记录原题、错误答案、正确答案、模块、知识点、错误次数、最近错误时间
- 错题复习：按模块和知识点分类，按错误次数排序，可重新练习，可清除已掌握题目
- 每日复习：每天推荐 10 道题，优先错题，其次最近学习内容，再补薄弱模块题
- 徽章系统：主语达人、动词达人、句子小勇士、语法侦探等
- localStorage：保存学习进度、错题和徽章
- GitHub Pages 静态发布

## 数据结构

```text
src/data/
├── units/
│   ├── sentenceVillage.ts
│   ├── nounCity.ts
│   ├── pronounIsland.ts
│   ├── verbTown.ts
│   ├── tenseForest.ts
│   ├── adjectiveGarden.ts
│   ├── prepositionValley.ts
│   └── sentenceMaze.ts
├── questionBank.ts
├── badges.ts
└── learningPath.ts
```

## 技术栈

- React
- TypeScript
- Vite
- Tailwind CSS
- localStorage

## 本地运行

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

## 部署到 GitHub Pages

当前仓库使用 `gh-pages` 分支发布静态页面。

源码保存在 `main` 分支；线上可用版本发布在 `gh-pages` 分支。

如果仓库名是 `grammar-club-kids`，线上地址通常是：

```text
https://chenhongzhou-sz.github.io/grammar-club-kids/
```

## 后续扩展

下一阶段可以继续补充更多模块，例如副词小路、连词桥、阅读句子训练、单元综合测试和家长查看报告。
