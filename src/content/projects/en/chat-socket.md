---
title: "Anonymous Chat — Real-time Desktop Chat"
summary: "An anonymous desktop chat app over WebSocket: no registration, password-locked rooms, file sharing, and desktop notifications."
date: 2026-02-04
tags: ["Python", "WebSocket", "CustomTkinter", "Pillow"]
repo: "https://github.com/RenzIP/Anonymous-chat-socket"
featured: true
status: "selesai"
cover: "../../../assets/projects/chat-socket.png"
---

## Background

I wanted to know what building a chat app from scratch feels like without a
ready-made real-time framework — just WebSocket, one server, and one desktop
client. The one rule: no registration, users pick a nickname and go.

## What I built

- **Python server** on the `websockets` library, handling many rooms at once.
- **Desktop client** built with CustomTkinter, dark theme.
- **Password-protected rooms** — a room can be public or locked.
- **Private messages** between users in the same room.
- **File sharing** (images and documents) capped at 5 MB, images processed with Pillow.
- **Typing indicator**, message replies with a quoted reference, an emoji picker,
  and an online user list.
- **Desktop notifications** for new messages when the window is not focused.

## Technical decisions

All room state lives in server memory — there is no database. For a learning
project that is an advantage: there is no persistence layer hiding logic bugs.
The trade-off is real, and I state it plainly in the README: restart the server
and the rooms are gone.

## What I learned

File size limits, message queues on slow connections, and clients that vanish
mid-conversation without saying goodbye — three problems that never show up if
you only build the chat UI.
