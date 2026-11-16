/**
 * Kamus UI per bahasa.
 *
 * Aturan: SETIAP kunci di `id` wajib ada di semua bahasa lain. Tipe
 * `Dict` diturunkan dari `id`, jadi kalau ada kunci yang lupa diterjemahkan,
 * `astro check` akan gagal — bukan diam-diam jatuh ke teks Indonesia.
 */

export const languages = {
  id: "Bahasa Indonesia",
  en: "English",
  ja: "日本語",
  zh: "中文",
} as const;

export type Lang = keyof typeof languages;

export const locales = Object.keys(languages) as Lang[];
export const defaultLang: Lang = "id";

/** Label pendek untuk tombol pemilih bahasa. */
export const shortLabels: Record<Lang, string> = {
  id: "ID",
  en: "EN",
  ja: "JA",
  zh: "ZH",
};

/** Nilai `lang` untuk <html> dan `og:locale` untuk metadata. */
export const htmlLang: Record<Lang, string> = {
  id: "id",
  en: "en",
  ja: "ja",
  zh: "zh-Hans",
};

export const ogLocale: Record<Lang, string> = {
  id: "id_ID",
  en: "en_US",
  ja: "ja_JP",
  zh: "zh_CN",
};

const id = {
  tagline:
    "Full-Stack Web Developer yang membangun antarmuka cepat, API rapi, dan kode yang enak dirawat.",
  about: [
    "Saya Bagas, full-stack web developer. Saya mengerjakan produk dari dua sisi sekaligus: antarmuka yang enak dipakai di depan, dan API yang rapi serta aman di belakang.",
    "Proyek terbesar saya sejauh ini GraDiOl — editor diagram kolaboratif real-time. Next.js di frontend, Go + Fiber + Redis di backend, dengan presence, penguncian node, dan riwayat versi.",
    "Di luar web saya juga mengerjakan aplikasi desktop (C# WinForms, Python) dan mobile (Flutter) untuk tugas kuliah. Polanya sama: modelkan data dengan benar dulu, baru tulis UI-nya.",
  ],
  status: "Terbuka untuk peluang",

  navHome: "Ruang kerja",
  navProjects: "Proyek",
  navLog: "Riwayat",
  navSkills: "Keahlian",
  navContact: "Kontak",
  filesAria: "Berkas",
  navAria: "Navigasi berkas",
  logFile: "log.md",
  branchesFile: "branches.md",
  contactFile: "CONTACT.md",

  search: "cari…",
  searchAria: "Buka palet perintah",
  readOnly: "read-only",
  langAria: "Ganti bahasa",

  ctaProjects: "Lihat proyek →",
  ctaContact: "Hubungi saya",
  secAbout: "Tentang",
  secFeatured: "Proyek unggulan",
  secActivity: "Aktivitas terbaru",
  seeAll: "semua →",

  logIntro:
    "Riwayat proyek yang saya kerjakan, ditampilkan seperti commit log — dari yang paling baru ke yang paling awal. Setiap hash adalah commit asli dari repository publik saya di GitHub, jadi bisa dicari langsung di `git log`.",
  branchesIntro:
    "Keahlian saya, dipetakan sebagai branch. Tiap branch mewakili satu area kerja yang saya tekuni.",
  techCount: "{n} tech",
  contactIntro:
    "Punya proyek, pertanyaan, atau ingin berkolaborasi? Saya senang mendengarnya. Cara tercepat adalah lewat email.",
  copyLabel: "salin",
  copiedLabel: "tersalin ✓",
  copyAria: "Salin alamat email",
  copyFailed: "gagal",
  contactPrefLabel: "// preferensi kerja",
  contactLocation: "lokasi",
  contactStatus: "status",
  contactFocus: "fokus",
  contactFocusValue: "Web full-stack · antarmuka & API",

  projectsCount: "{n} entri · diurutkan dari yang terbaru",
  projectsEmpty: "Direktori kosong. Belum ada proyek.",

  p404Body: "Halaman yang Anda tuju tidak ada di repository ini.",
  p404Back: "← kembali ke ruang",

  cmdkPlaceholder: "Ketik untuk mencari…",
  cmdkEmpty: "Tidak ada hasil.",
  cmdkPages: "Halaman",
  cmdkProjects: "Proyek",
  cmdkAria: "Palet perintah",
  cmdkResultsAria: "Hasil pencarian",
  cmdkSelect: "pilih",
  cmdkOpen: "buka",

  projActive: "aktif",
  projDone: "selesai",
  projArchived: "arsip",
  projBack: "← projects/",
  projSource: "source ↗",
  projLive: "live ↗",

  localTime: "Waktu lokal pengunjung",
  skipToContent: "Lompat ke konten",

  // Teks lintas komponen (commit graph, terminal, boot screen, alt gambar).
  hashCopyTitle: "Salin hash {hash}",
  projImageAlt: "Tangkapan layar proyek {title}",
  bootLoading: "Memuat situs",
  termAria: "Terminal git (easter egg)",
  termClose: "Tutup terminal",
  termWaiting: "Menunggu perintah…",
  termHint: "easter egg · ditemukan via Konami code ↑↑↓↓←→←→BA",

  ogJobTitle: "Full-Stack Web Developer",
  ogProjectsDesc: "Kumpulan proyek yang pernah saya kerjakan.",
  ogLogDesc: "Riwayat proyek, ditampilkan sebagai commit log.",
  ogBranchesDesc: "Keahlian saya, dipetakan sebagai branch.",
  ogContactDesc: "Cara menghubungi saya untuk kolaborasi atau peluang kerja.",
};

export type Dict = typeof id;
export type DictKey = keyof Dict;

const en: Dict = {
  tagline:
    "Full-stack web developer building fast interfaces, clean APIs, and code that stays maintainable.",
  about: [
    "I'm Bagas, a full-stack web developer. I work on both sides of a product: interfaces that are pleasant to use, and APIs that are clean and safe behind them.",
    "My biggest project so far is GraDiOl — a collaborative, real-time diagram editor. Next.js on the front end, Go + Fiber + Redis on the back end, with presence, node locking, and version history.",
    "Outside the web I build desktop apps (C# WinForms, Python) and mobile apps (Flutter) for coursework. The order is always the same: model the data properly first, then write the UI.",
  ],
  status: "Open to opportunities",

  navHome: "Workspace",
  navProjects: "Projects",
  navLog: "History",
  navSkills: "Skills",
  navContact: "Contact",
  filesAria: "Files",
  navAria: "File navigation",
  logFile: "log.md",
  branchesFile: "branches.md",
  contactFile: "CONTACT.md",

  search: "search…",
  searchAria: "Open command palette",
  readOnly: "read-only",
  langAria: "Change language",

  ctaProjects: "View projects →",
  ctaContact: "Get in touch",
  secAbout: "About",
  secFeatured: "Selected projects",
  secActivity: "Recent activity",
  seeAll: "all →",

  logIntro:
    "A history of the projects I've built, shown as a commit log — newest first. Every hash is a real commit from my public GitHub repositories, so you can look it up in `git log`.",
  branchesIntro:
    "My skills, mapped as branches. Each branch is one area of work I keep coming back to.",
  techCount: "{n} tech",
  contactIntro:
    "Got a project, a question, or want to collaborate? I'd like to hear it. Email is the fastest way.",
  copyLabel: "copy",
  copiedLabel: "copied ✓",
  copyAria: "Copy email address",
  copyFailed: "failed",
  contactPrefLabel: "// work preferences",
  contactLocation: "location",
  contactStatus: "status",
  contactFocus: "focus",
  contactFocusValue: "Full-stack web · interfaces & APIs",

  projectsCount: "{n} entries · newest first",
  projectsEmpty: "Empty directory. No projects yet.",

  p404Body: "The page you're looking for does not exist in this repository.",
  p404Back: "← back to the room",

  cmdkPlaceholder: "Type to search…",
  cmdkEmpty: "No results.",
  cmdkPages: "Pages",
  cmdkProjects: "Projects",
  cmdkAria: "Command palette",
  cmdkResultsAria: "Search results",
  cmdkSelect: "select",
  cmdkOpen: "open",

  projActive: "active",
  projDone: "done",
  projArchived: "archived",
  projBack: "← projects/",
  projSource: "source ↗",
  projLive: "live ↗",

  localTime: "Visitor's local time",
  skipToContent: "Skip to content",

  // Cross-component strings (commit graph, terminal, boot screen, image alt).
  hashCopyTitle: "Copy hash {hash}",
  projImageAlt: "Screenshot of the {title} project",
  bootLoading: "Loading site",
  termAria: "Git terminal (easter egg)",
  termClose: "Close terminal",
  termWaiting: "Waiting for your command…",
  termHint: "easter egg · found via the Konami code ↑↑↓↓←→←→BA",

  ogJobTitle: "Full-Stack Web Developer",
  ogProjectsDesc: "The projects I have built.",
  ogLogDesc: "Project history, shown as a commit log.",
  ogBranchesDesc: "My skills, mapped as branches.",
  ogContactDesc: "How to reach me for collaboration or work.",
};

const ja: Dict = {
  tagline:
    "高速なインターフェース、整理された API、保守しやすいコードを書くフルスタック開発者です。",
  about: [
    "バガスと申します。フルスタックの Web 開発者です。フロントでは使いやすい UI を、バックエンドでは安全で整理された API を担当します。",
    "これまでで最も大きなプロジェクトは GraDiOl — リアルタイム共同編集の図エディタです。フロントは Next.js、バックエンドは Go + Fiber + Redis で、プレゼンス表示、ノードのロック、バージョン履歴を実装しました。",
    "Web 以外ではデスクトップアプリ（C# WinForms、Python）とモバイル（Flutter）も授業で作っています。順番はいつも同じです。まずデータを正しくモデル化し、それから UI を書く。",
  ],
  status: "お仕事のご相談を受け付けています",

  navHome: "作業部屋",
  navProjects: "プロジェクト",
  navLog: "履歴",
  navSkills: "スキル",
  navContact: "連絡先",
  filesAria: "ファイル",
  navAria: "ファイルのナビゲーション",
  logFile: "log.md",
  branchesFile: "branches.md",
  contactFile: "CONTACT.md",

  search: "検索…",
  searchAria: "コマンドパレットを開く",
  readOnly: "読み取り専用",
  langAria: "言語を切り替える",

  ctaProjects: "プロジェクトを見る →",
  ctaContact: "連絡する",
  secAbout: "自己紹介",
  secFeatured: "主なプロジェクト",
  secActivity: "最近のアクティビティ",
  seeAll: "すべて →",

  logIntro:
    "これまで作ってきたプロジェクトの履歴を、コミットログとして表示しています（新しい順）。ハッシュは GitHub の公開リポジトリの実際のコミットなので、`git log` で確認できます。",
  branchesIntro:
    "スキルをブランチとして整理しました。各ブランチが、継続して取り組んでいる領域です。",
  techCount: "{n} 技術",
  contactIntro:
    "プロジェクトの相談、質問、共同作業のご依頼など、お気軽にどうぞ。一番早いのはメールです。",
  copyLabel: "コピー",
  copiedLabel: "コピーしました ✓",
  copyAria: "メールアドレスをコピー",
  copyFailed: "失敗",
  contactPrefLabel: "// 仕事の条件",
  contactLocation: "拠点",
  contactStatus: "状況",
  contactFocus: "専門",
  contactFocusValue: "Web フルスタック · UI と API",

  projectsCount: "{n} 件 · 新しい順",
  projectsEmpty: "ディレクトリは空です。プロジェクトはまだありません。",

  p404Body: "お探しのページは、このリポジトリに存在しません。",
  p404Back: "← 作業部屋に戻る",

  cmdkPlaceholder: "入力して検索…",
  cmdkEmpty: "該当する項目がありません。",
  cmdkPages: "ページ",
  cmdkProjects: "プロジェクト",
  cmdkAria: "コマンドパレット",
  cmdkResultsAria: "検索結果",
  cmdkSelect: "選択",
  cmdkOpen: "開く",

  projActive: "進行中",
  projDone: "完了",
  projArchived: "アーカイブ",
  projBack: "← projects/",
  projSource: "ソース ↗",
  projLive: "デモ ↗",

  localTime: "閲覧者の現地時刻",
  skipToContent: "本文へスキップ",

  // コンポーネント共通のテキスト（コミットグラフ、ターミナル、起動画面、画像の代替テキスト）。
  hashCopyTitle: "ハッシュ {hash} をコピー",
  projImageAlt: "プロジェクト「{title}」のスクリーンショット",
  bootLoading: "サイトを読み込み中",
  termAria: "Git ターミナル（イースターエッグ）",
  termClose: "ターミナルを閉じる",
  termWaiting: "コマンドを待っています…",
  termHint: "イースターエッグ · コナミコマンド ↑↑↓↓←→←→BA で発見",

  ogJobTitle: "フルスタック Web 開発者",
  ogProjectsDesc: "これまでに作ったプロジェクトの一覧。",
  ogLogDesc: "プロジェクトの履歴をコミットログとして表示。",
  ogBranchesDesc: "スキルをブランチとして整理。",
  ogContactDesc: "協業や仕事のご相談はこちらから。",
};

const zh: Dict = {
  tagline: "全栈 Web 开发者，专注快速界面、整洁 API 与易维护的代码。",
  about: [
    "我是 Bagas，全栈 Web 开发者。产品的两端我都做：前端是顺手好用的界面，后端是整洁、安全的 API。",
    "目前我最大的项目是 GraDiOl —— 实时协作的图表编辑器。前端用 Next.js，后端用 Go + Fiber + Redis，实现了在线状态、节点锁定和版本历史。",
    "Web 之外，我也为课程做过桌面应用（C# WinForms、Python）和移动应用（Flutter）。顺序始终一样：先把数据模型定对，再写界面。",
  ],
  status: "欢迎工作机会",

  navHome: "工作间",
  navProjects: "项目",
  navLog: "历程",
  navSkills: "技能",
  navContact: "联系",
  filesAria: "文件",
  navAria: "文件导航",
  logFile: "log.md",
  branchesFile: "branches.md",
  contactFile: "CONTACT.md",

  search: "搜索…",
  searchAria: "打开命令面板",
  readOnly: "只读",
  langAria: "切换语言",

  ctaProjects: "查看项目 →",
  ctaContact: "联系我",
  secAbout: "关于",
  secFeatured: "精选项目",
  secActivity: "最近动态",
  seeAll: "全部 →",

  logIntro:
    "我做过的项目历程，以提交日志的形式呈现，最新的在最上面。每条哈希都是 GitHub 公开仓库里真实的提交，可以直接在 `git log` 中查到。",
  branchesIntro: "把我的技能整理成分支，每个分支代表一个持续投入的方向。",
  techCount: "{n} 项技术",
  contactIntro: "有项目、有疑问，或者想合作？欢迎联系我。最快的方式是发邮件。",
  copyLabel: "复制",
  copiedLabel: "已复制 ✓",
  copyAria: "复制邮箱地址",
  copyFailed: "失败",
  contactPrefLabel: "// 工作偏好",
  contactLocation: "地点",
  contactStatus: "状态",
  contactFocus: "方向",
  contactFocusValue: "Web 全栈 · 界面与 API",

  projectsCount: "{n} 个条目 · 按最新排序",
  projectsEmpty: "目录为空，还没有项目。",

  p404Body: "你要找的页面不在这个仓库里。",
  p404Back: "← 返回工作间",

  cmdkPlaceholder: "输入以搜索…",
  cmdkEmpty: "没有结果。",
  cmdkPages: "页面",
  cmdkProjects: "项目",
  cmdkAria: "命令面板",
  cmdkResultsAria: "搜索结果",
  cmdkSelect: "选择",
  cmdkOpen: "打开",

  projActive: "进行中",
  projDone: "已完成",
  projArchived: "归档",
  projBack: "← projects/",
  projSource: "源码 ↗",
  projLive: "演示 ↗",

  localTime: "访问者的本地时间",
  skipToContent: "跳到正文",

  // 组件通用文案（提交图、终端、启动画面、图片替代文本）。
  hashCopyTitle: "复制哈希 {hash}",
  projImageAlt: "{title} 项目的截图",
  bootLoading: "正在加载网站",
  termAria: "Git 终端（彩蛋）",
  termClose: "关闭终端",
  termWaiting: "等待命令…",
  termHint: "彩蛋 · 通过科乐美秘技 ↑↑↓↓←→←→BA 发现",

  ogJobTitle: "全栈 Web 开发者",
  ogProjectsDesc: "我做过的项目合集。",
  ogLogDesc: "以提交日志形式呈现的项目历程。",
  ogBranchesDesc: "用分支整理我的技能。",
  ogContactDesc: "合作或工作机会的联系方式。",
};

export const ui: Record<Lang, Dict> = { id, en, ja, zh };
