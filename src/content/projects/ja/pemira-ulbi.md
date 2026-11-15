---
title: "PEMIRA ULBI — 学生選挙の電子投票サイト"
summary: "ULBI の学生選挙サイト。候補者情報、OTP による有権者確認、投票、公開結果を扱います。"
date: 2026-01-11
tags: ["Laravel", "PHP", "Blade"]
repo: "https://github.com/Pemira-Website/Website-PEMIRA-ULBI"
featured: false
status: "arsip"
---

## これは何か

PEMIRA ULBI のサイトは学生選挙のために使われます。候補者を掲載し、有権者を
確認し、投票を記録して結果を公開します。Web 側は Laravel で担当しました。

## 含まれているもの

- OTP と有効期限付きの有権者ログイン。
- 選挙種別ごとの投票画面（学生自治会長選など）。白票の選択肢も含む。
- 結果は設定で公開・非公開を切り替え可能。
- 管理者操作、投票状況、候補者辞退の監査ログ。
- 管理者向けのロールベースアクセス制御。

## 状態

デモは停止しています。リポジトリはアーカイブとして残しています。
