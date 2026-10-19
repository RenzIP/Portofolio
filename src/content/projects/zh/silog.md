---
title: "Silog —— 物流系统"
summary: "用 Flutter/Dart 编写面向对象数据模型的仓储与配送管理应用。"
date: 2026-09-16
tags: ["Flutter", "Dart", "OOP"]
repo: "https://github.com/RenzIP/silog-714240042"
featured: true
status: "aktif"
cover: "../../../assets/projects/silog.png"
---

## 背景

这是模拟物流流程的课程项目：货物入库、库存管理，到向目的城市发货。
它按模块逐步开发，所以有意思的地方在于：功能不断增加时，如何让模型保持清醒。

## 做了什么

- `Barang`（商品）、`Gudang`（仓库）、`Pengiriman`（配送）、
  `Pelanggan`（客户）这几个领域模型。
- **封装**：库存只能通过带校验的方法（`terimaBarang`、`keluarkanBarang`）改变，
  不能直接赋值。
- **不可变**：`kode`、`resi` 这类标识属性设为 `final`。
- 校验配送状态流转，不能回退。
- 用 Flutter 写的界面，用于查看库存和创建配送单。

## 结果

一套不会被非法数据修改的类结构，
以及违反业务规则时清晰的错误提示。

## 补充

这个项目改变了我的写码方式：如果一条业务规则能从类外部被破坏，
那不是界面的 bug，而是模型的 bug。
