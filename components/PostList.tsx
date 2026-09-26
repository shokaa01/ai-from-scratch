import Link from "next/link";
import { formatPostDate, padNumber, type PostMeta } from "@/lib/posts";

export function PostList({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) {
    return (
      <p className="text-muted text-sm py-4">
        Nothing here yet — first post drops soon.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-rule">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            href={`/posts/${post.slug}`}
            className="block py-5 group hover:opacity-90 transition-opacity"
          >
            <p className="text-xs uppercase tracking-widest text-muted mb-1.5">
              #{padNumber(post.number)}
              <span className="mx-1.5">·</span>
              {formatPostDate(post.date)}
            </p>
            <h3 className="font-serif text-xl md:text-2xl font-bold text-ink tracking-tight group-hover:underline decoration-1 underline-offset-4">
              {post.title}
            </h3>
            {post.summary ? (
              <p className="text-muted mt-1.5 leading-relaxed">{post.summary}</p>
            ) : null}
            {post.tags.length > 0 ? (
              <p className="text-sm text-muted mt-2">
                {post.tags.join(" · ")}
              </p>
            ) : null}
          </Link>
        </li>
      ))}
    </ul>
  );
}
