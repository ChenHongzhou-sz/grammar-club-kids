# Grammar Club Kids

英语语法闯关乐园。  
这是一个面向小学高年级和初中生的英语语法训练 Web App，第一阶段只完成“句子村”MVP。

## 目标

- 不做长篇电子书
- 用儿童能理解的话讲语法
- 每个知识点都有例句和练习
- 支持错题本、徽章、学习进度
- 手机和 iPad 优先

## MVP 内容

句子村包含 7 个小关卡：

1. 什么是句子
2. 什么是主语
3. 什么是动词
4. 什么是宾语
5. 主语 + 动词
6. 主语 + 动词 + 宾语
7. 五大基本句型儿童版

每个知识点包含：

- 一句话讲清楚
- 图像化例子
- 生活化中文解释
- 口诀
- 3 个例句
- 5 道基础题
- 2 道语法侦探题
- 1 道限时小测试

## 已实现功能

- 首页：今日任务、学习地图、当前进度、错题本入口、徽章入口、继续闯关
- 题型：选择题、填空题、判断题、拖拽式排序题、找错误题、配对题、限时挑战题
- 错题本：记录原题、错误答案、正确答案、知识点、错误次数、最近错误时间
- 错题复习：按知识点分类，可重新练习，可清除已掌握题目
- 徽章系统：主语达人、动词达人、句子小勇士、语法侦探等
- localStorage：保存学习进度、错题和徽章
- GitHub Pages 自动部署

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

项目已包含 `.github/workflows/deploy.yml`。

推送到 `main` 后，GitHub Actions 会自动构建并部署到 Pages。

如果仓库名是 `grammar-club-kids`，线上地址通常是：

```text
https://chenhongzhou-sz.github.io/grammar-club-kids/
```

## 后续扩展

下一阶段可以继续添加：

- 名词城
- 代词岛
- 动词镇
- 时态森林
- 形容词花园
- 副词小路
- 介词峡谷
- 句型迷宫
