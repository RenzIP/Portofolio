---
title: "个人作品集"
summary: "你正在看的这个网站 —— 以 git 仓库的形式呈现。Astro + Tailwind v4，输出静态 HTML。"
date: 2026-10-14
tags: ["Astro", "Tailwind", "TypeScript"]
repo: "https://github.com/RenzIP/portofolio"
featured: false
status: "aktif"
cover: "../../../assets/projects/portofolio.png"
---

## 目的

把项目、技能和联系方式放在一个地方，同时不要看起来像一份简历模板。

## 概念

整个作品集被呈现成一个仓库：侧边栏是文件树，每个页面是一个文件名
（`README.md`、`log.md`、`branches.md`、`CONTACT.md`），
项目历程用 `git log --graph` 展示，404 页面则是一次失败的 `git checkout` 输出。

## 技术选择

- **Astro** 输出静态页面：加载快，对搜索引擎友好。
- **Content Collections** —— 新增项目只需加一个 Markdown 文件。
- **客户端没有 JS 框架。** 唯一的 JavaScript 是视图过渡路由
  和少量交互（命令面板、复制 hash）。
- **构建时生成 OG 图片**，每个页面和每个项目都有，
  这样分享到 WhatsApp／LinkedIn 的链接也能正常显示配图。
- **项目图片**经 `astro:assets` 处理成 WebP，并输出三档 `srcset`。
- **尊重 `prefers-reduced-motion`**，所有动画都遵循。
- **四种语言**（印尼语、英语、日语、中文），各有真实 URL ——
  `/en/...`、`/ja/...`、`/zh/...` —— 并为搜索引擎提供 `hreflang`。

## 构建数据

| 指标 | 数值 |
| --- | --- |
| 页面数 | 49 |
| 构建时间 | 约 1.5 秒 |
| 首页 HTML（gzip） | 约 13 KB |
| CSS（gzip） | 约 13 KB |
| 客户端 JS（gzip） | 约 6 KB |

## 补充

这个站点刻意不使用重量级 JavaScript。页面很轻，在慢网络下也能快速打开。
