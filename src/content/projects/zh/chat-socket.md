---
title: "Anonymous Chat —— 实时桌面聊天"
summary: "只用 WebSocket 做的匿名聊天应用：无需注册、带密码的房间、文件传输和桌面通知。"
date: 2026-02-04
tags: ["Python", "WebSocket", "CustomTkinter", "Pillow"]
repo: "https://github.com/RenzIP/Anonymous-chat-socket"
featured: true
status: "selesai"
cover: "../../../assets/projects/chat-socket.png"
---

## 背景

我想知道不用现成的实时通信框架、只靠 WebSocket、一个服务端和一个桌面客户端
从零搭一个聊天应用是什么感觉。规则只有一条：不注册，取个昵称就能用。

## 做了什么

- 基于 `websockets` 库的 **Python 服务端**，同时管理多个房间。
- 用 CustomTkinter 写的 **桌面客户端**，深色主题。
- **带密码的房间** —— 可以公开，也可以上锁。
- 同一房间内的 **私聊消息**。
- **文件传输**（图片和文档，上限 5 MB），图片用 Pillow 处理。
- **正在输入提示**、带引用的回复、表情选择器、在线用户列表。
- 窗口未聚焦时的 **桌面通知**。

## 技术选择

所有房间状态都在服务端内存里，没有数据库。
对学习项目来说这是优点：没有持久化层掩盖逻辑错误。
代价也很实在，我在 README 里写清楚了：重启服务端，房间就没了。

## 学到的东西

文件大小上限、网络慢时的消息排队、
以及不打招呼就消失的客户端 —— 只做聊天界面的话，永远不会遇到这三个问题。
