---
title: "Kavana — 在线指导管理系统"
summary: "ULBI D4 信息工程专业的指导管理系统：提案、指导日志、报告、答辩安排和修改，集中在一条流程里。"
date: 2025-11-14
tags: ["Next.js", "Express.js", "MySQL", "Redis", "Google Cloud"]
repo: "https://github.com/KavanaHub/kavanahub"
demo: "https://kavana.my.id"
featured: true
status: "aktif"
---

## 这是什么

Kavana 是 ULBI D4 信息工程专业的在线指导管理系统。过去这些流程散落在聊天、
表格和个人网盘里；Kavana 把它们收进一条状态和历史都清晰的流程。

## 处理的流程

- 项目 1–3 和实习 1–2 的方向选择，包括常规、RPL 和重修学生。
- 提案提交、按方向进行的协调员审核，以及指导教师分配。
- 指导日志（最多 8 次已批准会话）、教师审批，以及指导表的 PDF 导出。
- 报告上传、带冲突校验的答辩安排、评分和修改。
- 五种角色：学生、教师、协调员、专业负责人、管理员。

## 技术侧

前端 Next.js；后端 Express.js，运行在 Google Cloud Functions/Cloud Run；
数据库 MySQL；Redis 用于缓存、限流、OTP 和令牌吊销。登录由 Cloudflare
Turnstile 保护。

## 状态

在 [kavana.my.id](https://kavana.my.id) 在线运行。
