import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

export type SeriesId = "archive" | "series";

export type PostMeta = {
  slug: string;
  number: number;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  cover?: string;
  series: SeriesId;
  readingMinutes?: number;
};

export type Post = PostMeta & {
  contentHtml: string;
  content: string;
};

export const NEW_SERIES_TOTAL = 40;

const ARCHIVE_DIR = path.join(process.cwd(), "content", "posts", "archive");
const SERIES_DIR = path.join(process.cwd(), "content", "posts", "series");

function estimateReadingMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function readMeta(filePath: string, series: SeriesId): PostMeta | null {
  if (!filePath.endsWith(".md") && !filePath.endsWith(".mdx")) return null;
  const raw = fs.readFileSync(/*turbopackIgnore: true*/ filePath, "utf8");
  const { data, content } = matter(raw);
  const slug = path.basename(filePath).replace(/\.mdx?$/, "");
  return {
    slug,
    number: Number(data.number) || 0,
    title: String(data.title || slug),
    date: String(data.date || ""),
    summary: String(data.summary || ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    cover: data.cover ? String(data.cover) : undefined,
    series: (data.series as SeriesId) || series,
    readingMinutes: estimateReadingMinutes(content),
  };
}

function listDir(dir: string, series: SeriesId): PostMeta[] {
  if (!fs.existsSync(/*turbopackIgnore: true*/ dir)) return [];
  const names = fs.readdirSync(/*turbopackIgnore: true*/ dir);
  const posts: PostMeta[] = [];
  for (const name of names) {
    const meta = readMeta(path.join(dir, name), series);
    if (meta) posts.push(meta);
  }
  return posts;
}

export function getAllPosts(): PostMeta[] {
  const posts = [
    ...listDir(ARCHIVE_DIR, "archive"),
    ...listDir(SERIES_DIR, "series"),
  ];
  return posts.sort((a, b) => {
    if (a.date === b.date) return b.number - a.number;
    return a.date < b.date ? 1 : -1;
  });
}

export function getArchivePosts(): PostMeta[] {
  return getAllPosts()
    .filter((p) => p.series === "archive")
    .sort((a, b) => a.number - b.number);
}

export function getSeriesPosts(): PostMeta[] {
  return getAllPosts()
    .filter((p) => p.series === "series")
    .sort((a, b) => a.number - b.number);
}

export function getProgress(): { completed: number; total: number } {
  return {
    completed: getSeriesPosts().length,
    total: NEW_SERIES_TOTAL,
  };
}

export function getPostBySlug(slug: string): Post | null {
  for (const [dir, series] of [
    [ARCHIVE_DIR, "archive"],
    [SERIES_DIR, "series"],
  ] as const) {
    for (const ext of [".md", ".mdx"] as const) {
      const filePath = path.join(dir, `${slug}${ext}`);
      if (!fs.existsSync(/*turbopackIgnore: true*/ filePath)) continue;
      const raw = fs.readFileSync(/*turbopackIgnore: true*/ filePath, "utf8");
      const { data, content } = matter(raw);
      const processed = remark()
        .use(remarkGfm)
        .use(remarkHtml)
        .processSync(content);
      return {
        slug,
        number: Number(data.number) || 0,
        title: String(data.title || slug),
        date: String(data.date || ""),
        summary: String(data.summary || ""),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        cover: data.cover ? String(data.cover) : undefined,
        series: (data.series as SeriesId) || series,
        readingMinutes: estimateReadingMinutes(content),
        content,
        contentHtml: String(processed),
      };
    }
  }
  return null;
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export function formatPostDate(iso: string, long = false): string {
  if (!iso) return "";
  const d = new Date(iso + (iso.length === 10 ? "T12:00:00" : ""));
  if (Number.isNaN(d.getTime())) return iso;
  if (long) {
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function padNumber(n: number): string {
  return String(n).padStart(3, "0");
}
