import { PostList } from "@/components/PostList";
import { getProgress, getSeriesPosts } from "@/lib/posts";

export default function HomePage() {
  const progress = getProgress();
  const series = getSeriesPosts().slice().reverse();

  return (
    <div className="mx-auto max-w-prose px-4 sm:px-6 py-12 md:py-16">
      <header className="text-center mb-12 md:mb-16">
        <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-ink mb-3">
          AI from scratch
        </h1>
        <p className="text-lg text-muted leading-relaxed">
          One tiny post a day.
        </p>
        <p className="mt-6 text-sm text-muted">
          Progress:{" "}
          <span className="text-ink font-medium">{progress.completed}</span>
          {" / "}
          <span className="text-ink font-medium">{progress.total}</span>
          {" "}concepts covered
        </p>
      </header>

      <section>
        <h2 className="text-xs uppercase tracking-widest text-muted mb-2">
          Posts
        </h2>
        <p className="text-sm text-muted mb-4">
          Fresh curriculum for JS/TS builders — foundations → classical ML →
          nets → LLMs → shipping.
        </p>
        <PostList posts={series} />
      </section>
    </div>
  );
}
