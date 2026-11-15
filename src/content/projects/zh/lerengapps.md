---
title: "LerengApps — 登山轨迹记录应用"
summary: "记录团队登山轨迹、用本地数据计算高程等高线，并可把记录同步到 MongoDB 的 Android 应用。"
date: 2026-11-10
tags: ["Java", "Android", "SQLite", "BLE", "MongoDB"]
repo: "https://github.com/RenzIP/LerengApps"
featured: true
status: "arsip"
---

## 这是什么

Lereng Offline 是一款 Android 应用，用来记录一次团队登山轨迹并显示高程剖面。
轨迹、BLE 事件和高程数据集保存在设备内私有的 SQLite 中，不使用第三方高程 API。

## 包含什么

- 带高程的 GPS/GNSS 轨迹记录，以及 CSV 和 GPX 导入。
- 等高线和高程卡片：2D 等高线图、斜视 3D 地形，以及沿轨迹的等高线剖面。
- 等高线间隔可选 5 米、10 米、20 米、自动，或自定义 1–200 米。
- 网格计算和 IDW 插值异步执行，避免大型导入卡住界面。
- 记录可通过自建的 HTTPS 端点发送到 MongoDB。

## 状态

Android 应用，没有网页演示。仓库在 GitHub 上。
