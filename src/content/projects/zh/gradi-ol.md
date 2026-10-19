---
title: "GraDiOl —— 实时协作图表编辑器"
summary: "浏览器里的图表编辑器，多人可以同时编辑同一张图。前端 Next.js，后端 Go + Redis。"
date: 2026-07-16
tags: ["Go", "Next.js", "Redis", "PostgreSQL", "WebSocket"]
repo: "https://github.com/RenzIP/Graphic-Diagram-Online-Frontend"
featured: true
status: "aktif"
cover: "../../../assets/projects/gradi-ol.png"
---

## 背景

GraDiOl（Graphic Diagram Online）是一个浏览器里的图表编辑器，
多个人可以同时在同一块画布上工作，而不会互相覆盖。
我特意把前后端拆成两个仓库，让职责边界保持清晰。

## 架构

| 部分 | 技术 |
| --- | --- |
| 前端 | Next.js（App Router）、React |
| 后端 | Go 1.25、Fiber v2（HTTP + WebSocket） |
| 数据库 | PostgreSQL（Supabase），通过 GORM 访问 |
| 实时 | Redis —— 在线状态、节点锁、pub/sub |
| 认证 | Supabase Auth（JWT） |

后端仓库：[Graphic-Diagram-Online-Backend](https://github.com/RenzIP/Graphic-Diagram-Online-Backend)。

## 做了什么

- **画布**：网格、缩略图导航，连线渲染与节点渲染分离，
  重画一条连线不会牵动整块画布。
- **实时协作**：在线状态栏（谁在这个文档里）、连接状态提示，
  以及基于 Redis 的节点级锁定 —— 两个人不能同时编辑同一个节点。
- **版本历史**，以及选中节点的属性面板。
- **导入图表**：支持文本 DSL 和 ASCII 图形两种方式。
- **工作区管理**：team、workspace、admin 页面；认证包含忘记密码流程。

## 最难的部分

状态一致性。前端持有画布状态，后端持有修改权限，Redis 持有临时锁。
在屏幕上画一个矩形不难；难的是让两边保持同样的顺序 ——
尤其是在连接断开又恢复的时候。

## 状态

进行中。后端带有部署蓝图（`render.yaml`）和 PostgreSQL 表结构，
包括迁移和演示数据命令。
