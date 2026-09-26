import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  formatPostDate,
  getAllSlugs,
  getPostBySlug,
  padNumber,
} from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.title,
    description: post.summary,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const tagsLine = [
    post.readingMinutes ? `${post.readingMinutes} min read` : null,
    post.tags.join(" · ") || null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <article className="mx-auto max-w-prose px-4 sm:px-6 py-12">
      <Link
        href="/"
        className="text-sm text-muted hover:text-ink inline-flex items-center gap-1 mb-8"
      >
        ← Back to all posts
      </Link>

      <header className="mb-10 text-center">
        <p className="text-xs uppercase tracking-widest text-muted mb-3">
          #{padNumber(post.number)} · {formatPostDate(post.date, true)}
        </p>
        <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-3 text-ink">
          {post.title}
        </h1>
        {post.summary ? (
          <p className="text-lg text-muted leading-relaxed">{post.summary}</p>
        ) : null}
        {tagsLine ? (
          <p className="text-sm text-muted mt-4">{tagsLine}</p>
        ) : null}
      </header>

      {post.cover ? (
        <div className="relative w-full aspect-[16/9] mb-10 rounded-lg overflow-hidden bg-soft">
          <Image
            src={post.cover}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 680px"
            priority
          />
        </div>
      ) : null}

      <div
        className="prose-substack"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  );
}
