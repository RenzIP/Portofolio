---
title: "Hospital Management — デスクトップアプリ"
summary: "C# WinForms で作った病院業務アプリ。権限別ログイン、患者・職員・診療科・検査の管理、Excel 出力。"
date: 2026-02-09
tags: ["C#", "WinForms", ".NET", "SQL"]
repo: "https://github.com/RenzIP/Hospital-Management-Desktop"
featured: true
status: "selesai"
cover: "../../../assets/projects/hospital-desktop.png"
---

## 背景

オブジェクト指向プログラミングの授業課題です。複数の種類の利用者がいて、
それぞれ権限が違うデスクトップアプリを作る。レイヤーを分けざるを得なかった、
初めてのプロジェクトでした。

## 実装したもの

- **権限別ログイン**（管理者・職員など。`RoleHelper` で管理）。
  サインインした権限に応じてメニューを制限します。
- エンティティごとの **ドメインモデル**：`Patient`、`Staff`、`Unit`、
  `Laboratory`、`User`。
- 患者・職員・診療科・検査の **データ管理**（追加／編集フォーム）。
- 診療科の **資本と在庫**の記録。
- アプリ内からの **Excel 帳票出力**（`ExcelHelper`）。

## 構成

```
Controllers/   LoginController
Models/        Patient, Staff, Unit, Laboratory, User
Views/         エンティティごとのフォーム（WinForms Designer + code-behind）
Helpers/       DatabaseHelper, ExcelHelper, RoleHelper
```

`Controllers` / `Models` / `Views` / `Helpers` の分割は好みではありませんでした。
当時、新しいエンティティを追加するときにクエリを各フォームへコピーせずに済む
唯一の方法だったからです。

## 正直なところ

.NET Framework と WinForms で書いたので、見た目は Windows 標準のコントロールに従います。
力を入れたのは権限のロジックとデータ管理で、UI ではありません。
