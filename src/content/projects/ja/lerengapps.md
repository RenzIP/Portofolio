---
title: "LerengApps — 登山ルート記録アプリ"
summary: "グループ登山のルートを記録し、端末内のデータから標高コンターを計算し、記録を MongoDB に送信できる Android アプリ。"
date: 2026-11-10
tags: ["Java", "Android", "SQLite", "BLE", "MongoDB"]
repo: "https://github.com/RenzIP/LerengApps"
featured: true
status: "arsip"
---

## これは何か

Lereng Offline は、グループで歩いた一つの登山ルートを記録し、その標高プロ
ファイルを表示する Android アプリです。トラック、BLE イベント、標高データ
セットは端末内のプライベートな SQLite に保存され、外部の標高 API は使いません。

## 含まれているもの

- 標高付き GPS/GNSS ルート記録と、CSV・GPX のインポート。
- コンターと標高のカード：2D コンター図、斜め 3D レリーフ、ルート沿いの
  コンタープロファイル。
- コンター間隔は 5 m、10 m、20 m、自動、または 1〜200 m で指定可能。
- グリッド計算と IDW 補間は非同期で実行し、大きなインポートでも UI が
  固まらないようにしています。
- 記録は自分で用意した HTTPS エンドポイント経由で MongoDB に送信できます。

## 状態

Web デモのない Android アプリです。リポジトリは GitHub にあります。
