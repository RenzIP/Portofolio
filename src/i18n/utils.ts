/**
 * Helper i18n: ambil bahasa dari URL, bangun URL per-locale, terjemahkan teks.
 *
 * Konvensi URL:
 *   id  -> tanpa prefix  ("/", "/projects", "/projects/gradi-ol")
 *   en  -> "/en/...", ja -> "/ja/...", zh -> "/zh/..."
 */
import {
  defaultLang,
  locales,
  type Dict,
  type DictKey,
  type Lang,
  ui,
} from "./ui";

export { defaultLang, locales, languages, shortLabels, htmlLang, ogLocale } from "./ui";
export type { Lang } from "./ui";

/** Path kanonik file di sidebar → kunci terjemahan keterangannya. */
export const navHintKey: Record<string, DictKey> = {
  "/": "navHome",
  "/projects": "navProjects",
  "/log": "navLog",
  "/branches": "navSkills",
  "/contact": "navContact",
};

/**
 * id entri konten bisa berbentuk "gradi-ol" (bahasa default) atau
 * "en/gradi-ol" (bahasa lain). Dua helper ini memisahkannya.
 */
export function projectSlug(id: string): string {
  return id.split("/").pop() ?? id;
}

export function projectLang(id: string): Lang {
  const parts = id.split("/");
  return parts.length > 1 ? getLang(parts[0]) : defaultLang;
}

/** Bahasa dari parameter route (`[...lang]`). Fallback ke default. */
export function getLang(lang: string | undefined): Lang {
  if (!lang) return defaultLang;
  return (locales as string[]).includes(lang) ? (lang as Lang) : defaultLang;
}

/** Prefix locale untuk sebuah bahasa (kosong untuk bahasa default). */
export function localePrefix(lang: Lang): string {
  return lang === defaultLang ? "" : `/${lang}`;
}

/**
 * Prefix nama file OG image per bahasa ("", "en-", "ja-", "zh-").
 * OG image terpisah tiap bahasa: yang menerima preview link di WhatsApp
 * atau LinkedIn belum tentu pembaca bahasa yang sama dengan pengirimnya,
 * tapi setidaknya bahasanya konsisten dengan halaman yang dibagikan.
 */
export function ogPrefix(lang: Lang): string {
  return lang === defaultLang ? "" : `${lang}-`;
}

/** Path kanonik tanpa prefix locale → URL untuk bahasa tertentu. */
export function localizePath(path: string, lang: Lang): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  const prefix = localePrefix(lang);
  if (!prefix) return clean;
  return clean === "/" ? `${prefix}/` : `${prefix}${clean}`;
}

/**
 * Path kanonik dari `Astro.url.pathname`: buang prefix locale dan slash akhir.
 * "/en/projects/" -> "/projects", "/ja/" -> "/", "/log" -> "/log"
 */
export function canonicalPath(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length && (locales as string[]).includes(segments[0])) {
    segments.shift();
  }
  return segments.length ? `/${segments.join("/")}` : "/";
}

/** URL padanan halaman yang sama di bahasa lain (untuk pemilih bahasa). */
export function switchLocaleUrl(pathname: string, next: Lang): string {
  return localizePath(canonicalPath(pathname), next);
}

/**
 * Terjemahan. `vars` menggantikan placeholder `{nama}` di kamus.
 * Kunci bertipe `DictKey`, jadi salah tulis kunci = error saat build.
 */
export function t(
  lang: Lang,
  key: DictKey,
  vars?: Record<string, string | number>,
): string {
  const dict: Dict = ui[lang] ?? ui[defaultLang];
  let value = dict[key] ?? ui[defaultLang][key];
  if (typeof value !== "string") value = String(value);
  if (!vars) return value;
  return Object.entries(vars).reduce(
    (acc, [k, v]) => acc.replaceAll(`{${k}}`, String(v)),
    value,
  );
}
