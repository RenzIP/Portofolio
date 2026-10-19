---
title: "E-Commerce —— Laravel 在线商店"
summary: "用 Laravel 和 Livewire 做的网店：认证、商品目录、购物车和结算流程。"
date: 2026-07-01
tags: ["Laravel", "PHP", "Livewire", "MySQL"]
repo: "https://github.com/RenzIP/e-commerce"
featured: true
status: "selesai"
cover: "../../../assets/projects/e-commerce.png"
---

## 背景

我想学的不是网上最热闹的框架，而是本地行业里真正在用的后端。
答案是 Laravel。

## 做了什么

- **认证**：注册、登录、退出、重置密码。
- **商品目录**和详情页。
- **购物车与结算** —— 从选商品到订单被记录下来的完整流程。
- **用 Livewire 做交互组件**，筛选和购物车操作不用自己写 JavaScript。

## 技术选择

Livewire 把购物车和筛选的状态放在服务端。
对于数据必须保持一致的应用来说，这比在浏览器和后端各维护一份同样的状态简单得多。

## 补充

最耗时的不是功能，而是认证路由 —— 把退出登录从普通路由改成 Livewire action，
让会话真正被销毁。一个小 bug，影响却很大。
