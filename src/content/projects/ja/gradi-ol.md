---
title: "GraDiOl — 共同編集できる図エディタ"
summary: "ブラウザで複数人が同時に同じ図を編集できるエディタ。フロントは Next.js、バックエンドは Go + Redis。"
date: 2026-07-16
tags: ["Go", "Next.js", "Redis", "PostgreSQL", "WebSocket"]
repo: "https://github.com/RenzIP/Graphic-Diagram-Online-Frontend"
demo: "https://graphic-diagram-online-frontend.vercel.app"
featured: true
status: "aktif"
cover: "../../../assets/projects/gradi-ol.png"
---

## 背景

GraDiOl（Graphic Diagram Online）は、複数人が同じキャンバスを同時に編集できる
ブラウザ上の図エディタです。お互いの作業を上書きしないことを最優先にしました。
フロントエンドとバックエンドはあえてリポジトリを分け、責務の境界を明確にしています。

## 構成

| 部分 | 技術 |
| --- | --- |
| フロントエンド | Next.js（App Router）、React |
| バックエンド | Go 1.25、Fiber v2（HTTP + WebSocket） |
| データベース | PostgreSQL（Supabase）を GORM 経由で |
| リアルタイム | Redis — プレゼンス、ノードのロック、pub/sub |
| 認証 | Supabase Auth（JWT） |

バックエンド: [Graphic-Diagram-Online-Backend](https://github.com/RenzIP/Graphic-Diagram-Online-Backend)

## 実装したもの

- **キャンバス**：グリッド、ミニマップ。エッジの描画をノードから分離し、
  1 本の接続を引き直してもキャンバス全体を再描画しないようにしました。
- **リアルタイム共同編集**：プレゼンスバー（誰が開いているか）、接続状態の表示、
  Redis によるノード単位のロック。同じノードを同時に編集することはできません。
- **バージョン履歴**と、選択中ノードのプロパティパネル。
- **図のインポート**：テキスト DSL と ASCII 図の両方から。
- **ワークスペース管理**：team、workspace、admin の各ページ。パスワード再設定を含む認証。

## 一番難しかったところ

状態の一貫性です。フロントがキャンバスの状態を持ち、バックエンドが変更の権限を持ち、
Redis が一時的なロックを持ちます。画面に四角を描くのは簡単ですが、
接続が切れて復帰したときを含めて両者の順序を一致させるのは簡単ではありません。

## 状態

開発中。バックエンドにはデプロイ用の `render.yaml` と PostgreSQL のスキーマがあり、
マイグレーションとデモデータ投入のコマンドも用意しています。
