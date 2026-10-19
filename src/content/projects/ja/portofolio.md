---
title: "個人ポートフォリオ"
summary: "いま見ているサイトです。git リポジトリに見立てて作りました。Astro + Tailwind v4、出力は静的 HTML。"
date: 2026-10-14
tags: ["Astro", "Tailwind", "TypeScript"]
repo: "https://github.com/RenzIP/portofolio"
featured: false
status: "aktif"
cover: "../../../assets/projects/portofolio.png"
---

## 目的

プロジェクトとスキル、連絡先を 1 か所にまとめること。
ただし履歴書のテンプレートのようには見せないこと。

## コンセプト

ポートフォリオをリポジトリとして見せています。サイドバーはファイルツリー、
各ページはファイル名（`README.md`、`log.md`、`branches.md`、`CONTACT.md`）、
プロジェクトの履歴は `git log --graph`、404 は失敗した `git checkout` の出力です。

## 技術的な判断

- **Astro** で静的出力。読み込みが速く、検索エンジンにも強い。
- **Content Collections**：プロジェクトの追加は Markdown 1 ファイルだけ。
- **クライアント側の JS フレームワークなし。** JavaScript はビュー遷移のルーターと
  小さな操作（コマンドパレット、ハッシュのコピー）のみ。
- **OG 画像はビルド時に生成**。WhatsApp や LinkedIn に貼ったリンクでも
  画像付きで表示されます。
- **プロジェクト画像**は `astro:assets` で WebP 化し、3 サイズの `srcset` を出力。
- **`prefers-reduced-motion` に対応**。すべてのアニメーションで尊重します。
- **4 言語**（インドネシア語・英語・日本語・中国語）を実際の URL で提供。
  `/en/...`、`/ja/...`、`/zh/...` と、検索エンジン向けの `hreflang` も設定しています。

## ビルドの数値

| 指標 | 値 |
| --- | --- |
| ページ数 | 49 |
| ビルド時間 | 約 1.5 秒 |
| トップ HTML（gzip） | 約 13 KB |
| CSS（gzip） | 約 13 KB |
| クライアント JS（gzip） | 約 6 KB |

## 補足

重い JavaScript を載せない方針で作っています。
回線が遅い環境でも軽く、すぐ開きます。
