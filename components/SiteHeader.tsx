import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  return (
    <header className="border-b border-rule">
      <div className="mx-auto max-w-prose px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-serif font-bold text-ink tracking-tight">
          AI from scratch
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-xs uppercase tracking-widest text-muted hidden sm:inline">
            A daily series
          </span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
