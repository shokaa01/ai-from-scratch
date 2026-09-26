# AI from scratch

One tiny post a day. Learning AI/ML as a full-stack JS/TS builder.

**Voice:** casual, medium-size posts that are actually interesting — not textbook walls of text.

Live (previous deploy): https://ai-from-scratch-phi.vercel.app  
Repo: https://github.com/shokaa01/ai-from-scratch

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS v4
- Markdown posts with frontmatter (`gray-matter` + `remark`)
- Dark mode toggle (localStorage + system preference)

## Content layout

```
content/
  roadmap.md                 # new 40-day curriculum
  posts/
    archive/                 # original 8 neural-net posts (do not count toward progress)
    series/                  # new curriculum posts (progress = count / 40)
public/covers/               # cover images
```

Frontmatter fields: `number`, `title`, `date`, `summary`, `tags`, `cover` (optional), `series` (`archive` | `series`).

Routes:

- `/` — progress for the **new** series + lists
- `/posts/[slug]` — post page

## Local setup

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
npm start
```

## Adding a new post

1. Pick the next topic from `content/roadmap.md`
2. Create `content/posts/series/001-your-slug.md` (pad numbers)
3. Optional cover at `public/covers/001-your-slug.jpg`
4. Keep it casual, medium-length, worth finishing
5. Commit & push — Vercel will rebuild if the project is linked

## Vercel notes

- Framework: Next.js
- Build command: `npm run build` (default)
- Output: default Next.js
- Root directory: repo root
- No env vars required for the static blog
- Link this GitHub repo (`shokaa01/ai-from-scratch`, branch `main`) in the Vercel dashboard — do not reconfigure from scripts here

## License / credit

© 2026 Sarthak
