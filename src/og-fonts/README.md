# Font OG

Berkas di sini hanya dipakai saat build untuk menggambar gambar Open Graph
(`src/pages/open-graph/[...route].ts`). Tidak ada yang dikirim ke browser.

`jetbrains-mono-*.ttf` dan `space-grotesk.ttf` menangani teks Latin.
Judul dan ringkasan Jepang/Tionghoa memakai subset Noto Sans JP / SC karena
kedua aksara itu tidak punya glif di font Latin — tanpa fallback, hasilnya
kotak kosong.

Subset dibuat dari Google Fonts dengan parameter `text=` (bukan unduhan
font penuh), memakai karakter di `ja-chars.txt` / `zh-chars.txt`. Daftar
karakter itu diambil dari `src/i18n/ui.ts`, `src/i18n/ruang.ts`, dan
`src/content/projects/{ja,zh}/*.md`. Ukurannya ratusan KB, bukan belasan MB.

Kalau teks ja/zh berubah dan memunculkan karakter baru, buat ulang subset:
kumpulkan karakter dari sumber di atas, lalu minta
`https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&text=<karakter>`
dengan User-Agent lama (agar yang dikirim TTF, bukan WOFF2), dan unduh URL
`src:` dari CSS-nya.

Lisensi: Noto Sans JP dan Noto Sans SC adalah SIL Open Font License 1.1
(https://github.com/google/fonts). JetBrains Mono dan Space Grotesk juga
OFL.
