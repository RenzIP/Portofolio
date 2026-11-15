/**
 * Teks beranda Ruang per bahasa.
 *
 * Semua yang tampil di ruang 3D dan mode daftar ada di sini — bukan di
 * scene.js — supaya bahasa halaman dan isi ruangan tidak pernah berbeda.
 * Nama proyek, tanggal, dan hash tetap datang dari content collection dan
 * src/data/site.ts.
 */
import type { Lang } from "./ui";

export interface RuangTitle {
  pre: string;
  em: string;
  post: string;
}

export interface RuangStation {
  label: string;
  cam: string;
}

export interface RuangCopyBlock {
  eyebrow: string;
  title: RuangTitle;
  body: string;
  meta?: string[];
  hint?: string;
  cta?: {
    label: string;
    kind: "project" | "github";
  };
  links?: {
    key: "email" | "github" | "linkedin";
    label: string;
  }[];
}

export interface RuangDict {
  meta: {
    title: string;
    description: string;
  };
  brand: string;
  navAria: string;
  langAria: string;
  openList: string;
  skipList: string;
  railAria: string;
  listAria: string;
  boot: string;
  now: string;
  stations: RuangStation[];
  copy: RuangCopyBlock[];
  list: {
    tag: string;
    title: RuangTitle;
    intro: string;
    where: string[];
    projectsHeading: string;
    commitsHeading: string;
    branchesHeading: string;
    pagesHeading: string;
    contactHeading: string;
    foot: string;
    pending: string;
  };
  sheet: {
    tag: string;
    close: string;
    stack: string;
    status: string;
    commit: string;
    openProject: string;
    openRepo: string;
    pending: string;
  };
  tipKinds: Record<"contact" | "board" | "desk" | "project" | "archive", string>;
  archive: {
    label: string;
    commits: string;
  };
  board: {
    title: string;
    version: string;
    versionSub: string;
    stickyTitle: string;
    sticky: string[];
    foot: string[];
  };
  screen: {
    subtitle: string;
    presence: string;
    lock: string;
    history: string;
  };
}

const id: RuangDict = {
  meta: {
    title: "Bagas — Ruang kerja",
    description:
      "Ruang kerja 3D Bagas, full-stack web developer di Bandung. Jelajahi meja GraDiOl, rak sepuluh proyek, arsip commit, dan jendela kontak.",
  },
  brand: "ruang kerja",
  navAria: "Navigasi situs",
  langAria: "Pilih bahasa",
  openList: "Mode daftar",
  skipList: "Lompat ke mode daftar",
  railAria: "Stasiun ruang",
  listAria: "Daftar proyek, riwayat, dan kontak",
  boot: "Membangun ruang",
  now: "sekarang",
  stations: [
    { label: "Ruang", cam: "ruang" },
    { label: "Meja", cam: "meja / gradiOl" },
    { label: "Rak", cam: "rak / proyek" },
    { label: "Arsip", cam: "arsip / commit" },
    { label: "Jendela", cam: "jendela / kontak" },
  ],
  copy: [
    {
      eyebrow: "01 — Ruang",
      title: { pre: "Masuk ke ruang ", em: "kerja", post: " saya." },
      body: "Saya Bagas, full-stack web developer di Bandung. Ruang ini bukan hiasan: meja menyimpan GraDiOl, rak menyimpan sepuluh proyek, lemari menyimpan riwayat, dan jendela menyimpan cara menghubungi saya.",
      meta: [
        "Bandung, Indonesia",
        "10 proyek · 4 branch",
        "Terbuka untuk peluang",
      ],
      hint: "Gulir untuk masuk",
    },
    {
      eyebrow: "02 — Meja / GraDiOl",
      title: { pre: "Diagram yang ", em: "hidup", post: " bersama." },
      body: "GraDiOl adalah editor diagram kolaboratif real-time. Browser bicara lewat WebSocket, Go/Fiber menjaga state, Redis memegang presence, penguncian node, dan riwayat versi. Layar di meja ini memperlihatkan alurnya — bukan tangkapan layar palsu.",
      meta: [
        "Next.js · Go/Fiber · Redis · WebSocket",
        "Commit 985df20 · Jul 2026",
      ],
      cta: { label: "Buka detail proyek", kind: "project" },
    },
    {
      eyebrow: "03 — Rak / sepuluh proyek",
      title: { pre: "Sepuluh buku, ", em: "enam commit", post: "." },
      body: "Tiap buku mewakili satu repository. Klik punggung bukunya untuk membaca stack, tanggal, dan apa yang sebenarnya dikerjakan. Urutannya sama dengan daftar proyek di situs.",
      meta: ["Klik buku di rak", "Atau buka mode daftar"],
    },
    {
      eyebrow: "04 — Arsip / changelog",
      title: { pre: "Riwayat yang bisa ", em: "diperiksa", post: "." },
      body: "Lemari arsip menyimpan commit log. Tanggal dan hash di sini diambil dari repository publik github.com/RenzIP. Kalau ragu, buka GitHub-nya dan cocokkan sendiri.",
      meta: ["6 commit", "Tag v1.0", "Branch main"],
      cta: { label: "Buka GitHub", kind: "github" },
    },
    {
      eyebrow: "05 — Jendela / kontak",
      title: { pre: "Jendela terbuka. ", em: "Mari bicara", post: "." },
      body: "Bandung, malam. Kalau ada produk yang perlu dibangun dari antarmuka sampai API, kirim email. Saya baca semuanya.",
      links: [
        { key: "email", label: "Email" },
        { key: "github", label: "GitHub" },
        { key: "linkedin", label: "LinkedIn" },
      ],
      hint: "baagas7474@gmail.com",
    },
  ],
  list: {
    tag: "Bagas / mode daftar",
    title: { pre: "Bagas. Full-stack, ", em: "dari Bandung.", post: "" },
    intro:
      "Saya mengerjakan produk dari dua sisi sekaligus: antarmuka yang enak dipakai di depan, dan API yang rapi serta aman di belakang. Proyek terbesar saya GraDiOl — editor diagram kolaboratif real-time dengan Next.js, Go/Fiber, dan Redis.",
    where: [
      "Bandung, Indonesia",
      "Terbuka untuk peluang",
      "github.com/RenzIP",
    ],
    projectsHeading: "Proyek",
    commitsHeading: "Commit log",
    branchesHeading: "Branch",
    pagesHeading: "Halaman",
    contactHeading: "Kontak",
    foot: "Ruang kerja Bagas · isi diambil dari repository publik dan content collection, bukan dikarang untuk tampilan.",
    pending: "Detail menyusul",
  },
  sheet: {
    tag: "Proyek",
    close: "Tutup",
    stack: "Stack",
    status: "Status",
    commit: "Commit",
    openProject: "Buka halaman proyek",
    openRepo: "Repository",
    pending: "Detail menyusul",
  },
  tipKinds: {
    contact: "kontak",
    board: "papan",
    desk: "meja",
    project: "proyek",
    archive: "arsip",
  },
  archive: {
    label: "ARSIP",
    commits: "COMMITS",
  },
  board: {
    title: "GRADIOL / ARSITEKTUR",
    version: "VERSION HISTORY",
    versionSub: "snapshot per perubahan",
    stickyTitle: "YANG SULIT:",
    sticky: ["dua orang, satu node", "→ kunci, bukan timpa", "→ presence dulu"],
    foot: [
      "commit 985df20 · jul 2026 · bagas",
      "bukan mockup — ini alur yang dipakai",
    ],
  },
  screen: {
    subtitle: "arsitektur / diagram kolaboratif",
    presence: "presence",
    lock: "node lock",
    history: "version history",
  },
};

const en: RuangDict = {
  meta: {
    title: "Bagas — Workspace",
    description:
      "Bagas's 3D workspace. A full-stack web developer in Bandung: the GraDiOl desk, a shelf of ten projects, a commit archive, and an open window.",
  },
  brand: "workspace",
  navAria: "Site navigation",
  langAria: "Choose language",
  openList: "List mode",
  skipList: "Skip to list mode",
  railAria: "Room stations",
  listAria: "Projects, history, and contact",
  boot: "Building the room",
  now: "now",
  stations: [
    { label: "Room", cam: "room" },
    { label: "Desk", cam: "desk / gradiOl" },
    { label: "Shelf", cam: "shelf / projects" },
    { label: "Archive", cam: "archive / commits" },
    { label: "Window", cam: "window / contact" },
  ],
  copy: [
    {
      eyebrow: "01 — Room",
      title: { pre: "Step into my ", em: "workspace", post: "." },
      body: "I'm Bagas, a full-stack web developer in Bandung. This room isn't decoration: the desk holds GraDiOl, the shelf holds ten projects, the cabinet holds the history, and the window holds the way to reach me.",
      meta: ["Bandung, Indonesia", "10 projects · 4 branches", "Open to work"],
      hint: "Scroll to step in",
    },
    {
      eyebrow: "02 — Desk / GraDiOl",
      title: { pre: "Diagrams that ", em: "live", post: " together." },
      body: "GraDiOl is a real-time collaborative diagram editor. The browser talks over WebSocket, Go/Fiber owns the state, and Redis holds presence, node locks, and version history. The screen on this desk shows that flow — not a fake screenshot.",
      meta: [
        "Next.js · Go/Fiber · Redis · WebSocket",
        "Commit 985df20 · Jul 2026",
      ],
      cta: { label: "Open project detail", kind: "project" },
    },
    {
      eyebrow: "03 — Shelf / ten projects",
      title: { pre: "Ten books, ", em: "six commits", post: "." },
      body: "Each book is one repository. Click a spine to read the stack, the date, and what was actually built. The order matches the project list on the site.",
      meta: ["Click a book on the shelf", "Or open list mode"],
    },
    {
      eyebrow: "04 — Archive / changelog",
      title: { pre: "A history you can ", em: "check", post: "." },
      body: "The cabinet holds the commit log. Every date and hash here comes from the public repositories at github.com/RenzIP. If in doubt, open GitHub and compare.",
      meta: ["6 commits", "Tag v1.0", "Branch main"],
      cta: { label: "Open GitHub", kind: "github" },
    },
    {
      eyebrow: "05 — Window / contact",
      title: { pre: "The window is open. ", em: "Let's talk", post: "." },
      body: "Bandung, at night. If you have a product that needs building from interface to API, send an email. I read all of them.",
      links: [
        { key: "email", label: "Email" },
        { key: "github", label: "GitHub" },
        { key: "linkedin", label: "LinkedIn" },
      ],
      hint: "baagas7474@gmail.com",
    },
  ],
  list: {
    tag: "Bagas / list mode",
    title: { pre: "Bagas. Full-stack, ", em: "from Bandung.", post: "" },
    intro:
      "I work on products from both sides: interfaces that are pleasant to use, and APIs that are clean and safe behind them. My biggest project so far is GraDiOl — a real-time collaborative diagram editor built with Next.js, Go/Fiber, and Redis.",
    where: ["Bandung, Indonesia", "Open to work", "github.com/RenzIP"],
    projectsHeading: "Projects",
    commitsHeading: "Commit log",
    branchesHeading: "Branches",
    pagesHeading: "Pages",
    contactHeading: "Contact",
    foot: "Bagas's workspace · content comes from public repositories and the content collection, not invented for a mockup.",
    pending: "Details to follow",
  },
  sheet: {
    tag: "Project",
    close: "Close",
    stack: "Stack",
    status: "Status",
    commit: "Commit",
    openProject: "Open project page",
    openRepo: "Repository",
    pending: "Details to follow",
  },
  tipKinds: {
    contact: "contact",
    board: "board",
    desk: "desk",
    project: "project",
    archive: "archive",
  },
  archive: {
    label: "ARCHIVE",
    commits: "COMMITS",
  },
  board: {
    title: "GRADIOL / ARCHITECTURE",
    version: "VERSION HISTORY",
    versionSub: "snapshot per change",
    stickyTitle: "THE HARD PART:",
    sticky: ["two people, one node", "→ lock, don't overwrite", "→ presence first"],
    foot: [
      "commit 985df20 · jul 2026 · bagas",
      "not a mockup — this is the flow in use",
    ],
  },
  screen: {
    subtitle: "architecture / collaborative diagram",
    presence: "presence",
    lock: "node lock",
    history: "version history",
  },
};

const ja: RuangDict = {
  meta: {
    title: "バガス — 作業部屋",
    description:
      "バンドン在住のフルスタック Web 開発者、バガスの 3D 作業部屋。GraDiOl の机、10 冊のプロジェクト本棚、コミット書庫、連絡用の窓。",
  },
  brand: "作業部屋",
  navAria: "サイト内ナビゲーション",
  langAria: "言語を選ぶ",
  openList: "リスト表示",
  skipList: "リスト表示へスキップ",
  railAria: "部屋のステーション",
  listAria: "プロジェクト、履歴、連絡先",
  boot: "部屋を構築中",
  now: "現在",
  stations: [
    { label: "部屋", cam: "部屋" },
    { label: "机", cam: "机 / gradiOl" },
    { label: "本棚", cam: "本棚 / プロジェクト" },
    { label: "書庫", cam: "書庫 / コミット" },
    { label: "窓", cam: "窓 / 連絡先" },
  ],
  copy: [
    {
      eyebrow: "01 — 部屋",
      title: { pre: "ようこそ、私の", em: "作業部屋", post: "へ。" },
      body: "バンドン在住のフルスタック Web 開発者、バガスです。この部屋は飾りではありません。机には GraDiOl、本棚には 10 のプロジェクト、書庫には履歴、窓には連絡方法があります。",
      meta: [
        "バンドン、インドネシア",
        "10 プロジェクト · 4 ブランチ",
        "新しい仕事を受け付け中",
      ],
      hint: "スクロールして入る",
    },
    {
      eyebrow: "02 — 机 / GraDiOl",
      title: { pre: "共に", em: "動く", post: "ダイアグラム。" },
      body: "GraDiOl はリアルタイム共同編集のダイアグラムエディタです。ブラウザは WebSocket で通信し、Go/Fiber が状態を保ち、Redis がプレゼンス、ノードロック、バージョン履歴を担当します。この机の画面はその流れを示しています。偽のスクリーンショットではありません。",
      meta: [
        "Next.js · Go/Fiber · Redis · WebSocket",
        "コミット 985df20 · 2026年7月",
      ],
      cta: { label: "プロジェクト詳細を開く", kind: "project" },
    },
    {
      eyebrow: "03 — 本棚 / 10 プロジェクト",
      title: { pre: "10 冊の本、", em: "6 つのコミット", post: "。" },
      body: "一冊が一つのリポジトリです。背表紙をクリックすると、スタック、日付、実際に作ったものが読めます。並び順はサイトのプロジェクト一覧と同じです。",
      meta: ["本棚の本をクリック", "またはリスト表示を開く"],
    },
    {
      eyebrow: "04 — 書庫 / 変更履歴",
      title: { pre: "検証できる", em: "履歴", post: "。" },
      body: "書庫にはコミットログがあります。ここにある日付とハッシュは github.com/RenzIP の公開リポジトリから取っています。疑わしければ GitHub を開いて照合してください。",
      meta: ["6 コミット", "タグ v1.0", "ブランチ main"],
      cta: { label: "GitHub を開く", kind: "github" },
    },
    {
      eyebrow: "05 — 窓 / 連絡先",
      title: { pre: "窓は開いています。", em: "話しましょう", post: "。" },
      body: "バンドンの夜です。インターフェースから API まで、一緒に作る必要がある製品があればメールをください。全部読みます。",
      links: [
        { key: "email", label: "メール" },
        { key: "github", label: "GitHub" },
        { key: "linkedin", label: "LinkedIn" },
      ],
      hint: "baagas7474@gmail.com",
    },
  ],
  list: {
    tag: "Bagas / リスト表示",
    title: { pre: "バガス。バンドン発、", em: "フルスタック", post: "。" },
    intro:
      "製品を両側から作ります。使いやすいインターフェースと、その背後にある整理された安全な API です。これまでで最大のプロジェクトは GraDiOl — Next.js、Go/Fiber、Redis で作ったリアルタイム共同編集のダイアグラムエディタです。",
    where: [
      "バンドン、インドネシア",
      "新しい仕事を受け付け中",
      "github.com/RenzIP",
    ],
    projectsHeading: "プロジェクト",
    commitsHeading: "コミットログ",
    branchesHeading: "ブランチ",
    pagesHeading: "ページ",
    contactHeading: "連絡先",
    foot: "バガスの作業部屋 · 内容は公開リポジトリとコンテンツコレクションから取得しています。",
    pending: "詳細は後日",
  },
  sheet: {
    tag: "プロジェクト",
    close: "閉じる",
    stack: "スタック",
    status: "ステータス",
    commit: "コミット",
    openProject: "プロジェクトページを開く",
    openRepo: "リポジトリ",
    pending: "詳細は後日",
  },
  tipKinds: {
    contact: "連絡先",
    board: "ボード",
    desk: "机",
    project: "プロジェクト",
    archive: "書庫",
  },
  archive: {
    label: "書庫",
    commits: "COMMITS",
  },
  board: {
    title: "GRADIOL / アーキテクチャ",
    version: "VERSION HISTORY",
    versionSub: "変更ごとのスナップショット",
    stickyTitle: "難しいところ：",
    sticky: ["二人で一つのノード", "→ 上書きせずロック", "→ まずプレゼンス"],
    foot: [
      "commit 985df20 · 2026年7月 · bagas",
      "モックアップではない — 実際の流れ",
    ],
  },
  screen: {
    subtitle: "アーキテクチャ / 共同ダイアグラム",
    presence: "プレゼンス",
    lock: "ノードロック",
    history: "バージョン履歴",
  },
};

const zh: RuangDict = {
  meta: {
    title: "Bagas — 工作间",
    description:
      "Bagas 的 3D 工作间。常驻万隆的全栈 Web 开发者：GraDiOl 书桌、十个项目的书架、提交档案柜，以及一扇联系窗口。",
  },
  brand: "工作间",
  navAria: "站点导航",
  langAria: "选择语言",
  openList: "列表模式",
  skipList: "跳到列表模式",
  railAria: "房间站点",
  listAria: "项目、历史与联系方式",
  boot: "正在构建房间",
  now: "至今",
  stations: [
    { label: "房间", cam: "房间" },
    { label: "书桌", cam: "书桌 / gradiOl" },
    { label: "书架", cam: "书架 / 项目" },
    { label: "档案柜", cam: "档案柜 / 提交" },
    { label: "窗户", cam: "窗户 / 联系" },
  ],
  copy: [
    {
      eyebrow: "01 — 房间",
      title: { pre: "走进我的", em: "工作间", post: "。" },
      body: "我是 Bagas，常驻万隆的全栈 Web 开发者。这个房间不是装饰：书桌放着 GraDiOl，书架放着十个项目，档案柜放着历史，窗户放着联系我的方式。",
      meta: [
        "万隆，印度尼西亚",
        "10 个项目 · 4 个分支",
        "正在寻找机会",
      ],
      hint: "滚动进入",
    },
    {
      eyebrow: "02 — 书桌 / GraDiOl",
      title: { pre: "一起", em: "生长", post: "的图表。" },
      body: "GraDiOl 是一个实时协作图表编辑器。浏览器通过 WebSocket 通信，Go/Fiber 维护状态，Redis 负责在线状态、节点锁定和版本历史。桌上的屏幕展示的是这条流程——不是假截图。",
      meta: [
        "Next.js · Go/Fiber · Redis · WebSocket",
        "提交 985df20 · 2026年7月",
      ],
      cta: { label: "打开项目详情", kind: "project" },
    },
    {
      eyebrow: "03 — 书架 / 十个项目",
      title: { pre: "十本书，", em: "六次提交", post: "。" },
      body: "每本书代表一个仓库。点击书脊可以读到技术栈、日期，以及实际做了什么。顺序与网站上的项目列表一致。",
      meta: ["点击书架上的书", "或打开列表模式"],
    },
    {
      eyebrow: "04 — 档案柜 / 变更记录",
      title: { pre: "可以", em: "核对", post: "的历史。" },
      body: "档案柜里是提交日志。这里的日期和哈希都来自 github.com/RenzIP 的公开仓库。如果不确定，打开 GitHub 自己对照。",
      meta: ["6 次提交", "标签 v1.0", "分支 main"],
      cta: { label: "打开 GitHub", kind: "github" },
    },
    {
      eyebrow: "05 — 窗户 / 联系",
      title: { pre: "窗户开着。", em: "聊聊吧", post: "。" },
      body: "万隆的夜晚。如果有产品需要从界面做到 API，给我发邮件。每一封我都会读。",
      links: [
        { key: "email", label: "邮件" },
        { key: "github", label: "GitHub" },
        { key: "linkedin", label: "LinkedIn" },
      ],
      hint: "baagas7474@gmail.com",
    },
  ],
  list: {
    tag: "Bagas / 列表模式",
    title: { pre: "Bagas。来自万隆的", em: "全栈开发者", post: "。" },
    intro:
      "我从两端做产品：前面是好用的界面，后面是整洁、安全的 API。目前最大的项目是 GraDiOl——用 Next.js、Go/Fiber 和 Redis 构建的实时协作图表编辑器。",
    where: [
      "万隆，印度尼西亚",
      "正在寻找机会",
      "github.com/RenzIP",
    ],
    projectsHeading: "项目",
    commitsHeading: "提交日志",
    branchesHeading: "分支",
    pagesHeading: "页面",
    contactHeading: "联系",
    foot: "Bagas 的工作间 · 内容来自公开仓库和内容集合，不是为展示编造的。",
    pending: "详情稍后补充",
  },
  sheet: {
    tag: "项目",
    close: "关闭",
    stack: "技术栈",
    status: "状态",
    commit: "提交",
    openProject: "打开项目页面",
    openRepo: "仓库",
    pending: "详情稍后补充",
  },
  tipKinds: {
    contact: "联系",
    board: "白板",
    desk: "书桌",
    project: "项目",
    archive: "档案",
  },
  archive: {
    label: "档案",
    commits: "COMMITS",
  },
  board: {
    title: "GRADIOL / 架构",
    version: "VERSION HISTORY",
    versionSub: "每次变更的快照",
    stickyTitle: "难点：",
    sticky: ["两个人，一个节点", "→ 锁定，而不是覆盖", "→ 先做在线状态"],
    foot: [
      "commit 985df20 · 2026年7月 · bagas",
      "不是 mockup —— 这是实际流程",
    ],
  },
  screen: {
    subtitle: "架构 / 协作图表",
    presence: "在线状态",
    lock: "节点锁定",
    history: "版本历史",
  },
};

export const ruang: Record<Lang, RuangDict> = { id, en, ja, zh };
