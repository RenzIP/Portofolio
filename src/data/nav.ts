/**
 * Kelas state untuk item navigasi.
 *
 * Dipakai dua sisi sekaligus:
 * - render SSR oleh `FileTree` (desktop) dan `MobileNav` (mobile);
 * - `NavSync`, yang memperbarui highlight setelah navigasi client-side.
 *
 * Sebelumnya kedua sisi menuliskan kelasnya masing-masing, sehingga item
 * aktif berubah rupa (warna & ketebalan) setelah klik pertama. Sekarang
 * hanya ada satu sumber, jadi tidak mungkin lagi berbeda.
 */
export const NAV_ACTIVE_FILE =
  "border-accent-500 bg-accent-100/70 font-semibold text-accent-900 shadow-xs";

export const NAV_IDLE_FILE =
  "border-transparent text-ink-soft hover:bg-paper-soft hover:text-ink";

export const NAV_ACTIVE_MOBILE =
  "border-accent-400 bg-accent-50 font-medium text-accent-800";

export const NAV_IDLE_MOBILE =
  "border-rule text-ink-soft hover:border-rule-strong hover:text-ink";
