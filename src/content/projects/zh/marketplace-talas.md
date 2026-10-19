---
title: "Talas Sangkuriang 产品目录"
summary: "一家芋头点心店的产品目录网站：纯静态页面，无构建步骤，重点在产品照片。"
date: 2026-09-30
tags: ["HTML", "CSS", "JavaScript"]
repo: "https://github.com/RenzIP/marketplace-talas-sangkuriang"
featured: true
status: "selesai"
cover: "../../../assets/projects/marketplace-talas.png"
---

## 背景

店里需要一个地方展示芋头点心和价格，最重要的是照片要好看。
不需要登录，也不需要购物车 —— 这是目录，不是应用。

## 做了什么

- **首屏区块**和产品图库，覆盖各个口味：原味、牛奶、黑森林、全料等。
- **纯静态页面** —— 一个 `index.html`、一个 `style.css`、一个 `script.js`。
  没有打包工具，没有依赖，也没有构建步骤。
- **轻量的 JavaScript 交互**：目录导航和产品详情。

## 为什么不用框架

如果需求只是展示一个很少变动的目录，加 React 或 Next.js 只会多出构建步骤、
依赖和攻击面，收益不成比例。一个随处可打开的 HTML 文件更好维护 ——
对不写代码的人也一样。

## 补充

页面体积几乎全在图片上。最大的收获是：压缩并统一产品照片尺寸，
对性能的帮助远大于反复调 CSS。
