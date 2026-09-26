---
number: 1
title: "AI vs ML vs I just wrote an if statement"
date: 2026-09-26
summary: "The 5-minute mental model that stops AI from feeling like magic — for people who already ship apps."
tags: ["fundamentals", "mental-model"]
cover: "/covers/001-ai-vs-ml-vs-if-statements.jpg"
series: series
---

You've already shipped features with `if` / `else`. So when someone says "we should add AI," it can feel like they're asking you to replace your brain with a black box.

They're not. Here's the clean split.

## The if-statement world (you live here)

```js
function shouldBlockSignup(email) {
  if (email.endsWith(".ru") && email.includes("promo")) return true;
  if (DISPOSABLE_DOMAINS.has(domainOf(email))) return true;
  return false;
}
```

**You** invent the rules. The computer is a very obedient intern. Same input → same output, forever. Bugs are your fault. Wins are also your fault. This is still the right tool for most product logic (billing, auth, permissions, "if plan === pro").

## Machine learning: you stop writing the rules

ML flips the job:

- You collect examples (this email was spam / not spam).
- You pick an algorithm that looks for patterns.
- The computer writes a messy function that *usually* gets it right on new emails.

You didn't write `if (subject.includes("FREE!!!"))`. You showed it 50,000 labeled emails and said "figure out what spam looks like." That's the whole joke of ML: **rules out, examples in.**

If traditional code is a recipe you hand the kitchen, ML is tasting a thousand dishes and reverse-engineering the recipe. Sometimes the recipe is weird. Sometimes it works better than anything you'd have typed.

## So where does "AI" fit?

AI is the big umbrella: "make a machine do something that looks smart."

ML is one way to build AI — the popular way in 2026. ChatGPT, recommenders, fraud models, face unlock: mostly ML under the hood.

When a product says "AI feature," they almost always mean ML. For builders, that shorthand is fine — just know the nesting:

> AI ⊃ ML ⊃ deep learning ⊃ LLMs

Like: frontend ⊃ React ⊃ Next.js ⊃ App Router. Same idea, different zoom levels.

## The product sniff test

Ask one question before you reach for ML:

Can a senior engineer write the rules in a week, and will those rules stay true next month?

- **Yes** → write the `if`s. Ship. Sleep.
- **No**, because the pattern is fuzzy / huge / shifting → that's ML territory.

You're not behind for still writing if-statements. You're behind if you try to train a model for "is this user on the Pro plan?"

Tomorrow: the three nouns that show up in every ML conversation — data, features, labels — mapped to things you already store in Postgres.
