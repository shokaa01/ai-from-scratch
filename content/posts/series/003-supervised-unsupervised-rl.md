---
number: 3
title: "Supervised / unsupervised / RL — a map, not a lecture"
date: 2026-09-28
summary: "Three learning setups in product words: labels, no labels, and rewards over time — and which one you'll actually ship."
tags: ["fundamentals", "mental-model"]
cover: "/covers/003-supervised-unsupervised-rl.jpg"
series: series
---

Yesterday: features + labels. Today: what you *do* with them. Three setups. Same ML family. Totally different jobs.

## Supervised = features + labels (your day job)

You have examples with the answer already filled in. Spam / not spam. Churned / stayed. Price of the house.

```js
// train: model sees both sides
const trainRow = { features: { emailLength: 42, hasLink: true }, label: "spam" };

// later: only features — model returns the guess
const prediction = model.predict({ emailLength: 30, hasLink: false });
```

That's supervised learning. Most product ML lives here: fraud scores, "will buy?", ticket routing — anything you can label from history or humans. If Day 2's table has a label column, you're in this lane.

## Unsupervised = no labels; find structure

No answer column. You still want clumps: "these users behave alike," "these embeddings sit near each other."

```js
// no label — just points in space
const users = [
  { sessions: 3, spend: 12 },
  { sessions: 40, spend: 900 },
];
// cluster() invents groups; YOU name them later ("power", "casual")
const groups = cluster(users, { k: 2 });
```

Clustering, embeddings, anomaly blobs — unsupervised. Great for discovery and nearest-neighbor search. Bad for "predict churn by Friday" unless you add labels afterwards.

## Reinforcement learning = agent + actions + reward

Different animal. An agent acts in an environment over time and gets a score: +1 win, −1 crash. Games, robots, some bidding — trial and error with a reward, not a labeled spreadsheet.

```js
while (!done) {
  const action = agent.act(state);      // left / right / click
  const { nextState, reward } = env.step(action);
  agent.learn(state, action, reward);
  state = nextState;
}
```

Cool demos. Rare in typical SaaS. If you're not training a bot to play or drive, you probably don't need RL this year.

## The builder map

| Setup | You bring | Model's job | Product vibe |
| --- | --- | --- | --- |
| Supervised | features + labels | predict the label | most shipping ML |
| Unsupervised | features only | find structure | segments, embeddings |
| RL | actions + rewards over time | maximize score | games / robots / niche |

Default for product work: **supervised**. Unsupervised for exploring or embedding. RL is a different sport — watch the highlights, don't force it into your CRUD app.

Tomorrow: train / val / test splits — and the silent killer called leakage.

## Dig deeper

- [Google: what is ML? (supervised / unsupervised / RL)](https://developers.google.com/machine-learning/intro-to-ml/what-is-ml)
- [Google: supervised learning (features & labels)](https://developers.google.com/machine-learning/intro-to-ml/supervised)
- [scikit-learn: clustering (unsupervised)](https://scikit-learn.org/stable/modules/clustering.html)
- [YouTube: Supervised vs Unsupervised vs Reinforcement Learning](https://www.youtube.com/watch?v=1FZ0A1QCMWc)
