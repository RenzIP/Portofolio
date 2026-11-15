---
title: "Kavana — オンライン指導管理システム"
summary: "ULBI 情報工学科 D4 の指導管理システム。提案、指導ログ、報告書、発表日程、修正を一つの流れにまとめています。"
date: 2025-11-14
tags: ["Next.js", "Express.js", "MySQL", "Redis", "Google Cloud"]
repo: "https://github.com/KavanaHub/kavanahub"
demo: "https://kavana.my.id"
featured: true
status: "aktif"
---

## これは何か

Kavana は ULBI の D4 情報工学科向けのオンライン指導管理システムです。以前は
チャット、表計算、個人のドライブに散らばっていた手続きを、状態と履歴が明確な
一つの流れにまとめました。

## 扱う流れ

- プロジェクト 1〜3 とインターンシップ 1〜2 のトラック選択。レギュラー課程、
  RPL、再履修の学生にも対応。
- 提案の提出、トラックごとのコーディネーター検証、指導教員の割り当て。
- 指導ログ（承認済み最大 8 回）、教員の承認、指導票の PDF 出力。
- 報告書の提出、重複を検証する発表日程、評価、修正。
- 学生、教員、コーディネーター、学科長、管理者の 5 つの役割。

## 技術面

フロントエンドは Next.js、バックエンドは Express.js で Google Cloud
Functions/Cloud Run 上に稼働。データベースは MySQL、Redis はキャッシュ、
レート制限、OTP、トークン失効に使用。ログインは Cloudflare Turnstile で保護。

## 状態

[kavana.my.id](https://kavana.my.id) で公開中です。
