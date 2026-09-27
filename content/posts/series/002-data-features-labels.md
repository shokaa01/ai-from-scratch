---
number: 2
title: "Data, features, labels: the three nouns you'll hear forever"
date: 2026-09-27
summary: "Map ML jargon onto a Postgres table — rows are examples, columns are features, and the answer column is the label."
tags: ["fundamentals", "data"]
cover: "/covers/002-data-features-labels.jpg"
series: series
---

Yesterday we said ML is "rules out, examples in." Cool. But what *is* an example?

If you already think in tables, you're 80% there. ML people just renamed the columns.

## Data = the whole pile

**Data** is the dataset: every signup, every support ticket, every image you scraped. In Postgres terms it's the table (or the join you already denormalize for analytics). Size and variety both matter — a million near-identical rows teaches less than 50k messy real ones.

## Features = the columns you feed in

**Features** are the inputs the model is allowed to look at. Think of them as the props you pass into a function:

```js
// features → what the model sees
const features = {
  emailLength: 42,
  hasLink: true,
  hourSent: 3,
  domainAgeDays: 12,
};
```

They can be numbers, booleans, categories (`"free" | "pro"`), or stuff you derived (`daysSinceLastLogin`). Same skill as picking columns for a dashboard — except now you're choosing what a model may use to guess.

Raw DB columns are fine to start. Later you'll engineer new ones. That's a later post.

## Labels = the answer column

**Labels** are the thing you're trying to predict. Spam or not. Churned or stayed. Price of the house. In training, the label is the ground truth you already know (human tagged it, or the event already happened). At inference time you *don't* have the label — that's what you're asking for.

```js
// one labeled example = features + label
const example = {
  ...features,
  label: "spam", // the answer key during training
};
```

No label column? You're not doing supervised learning. You might still cluster or embed — different game, Day 3.

## One row = one example

| features… | features… | **label** |
| --- | --- | --- |
| email length 42 | has link? yes | spam |
| email length 18 | has link? no | not spam |

Spreadsheet row = example. Left columns = features. Right column = label. When papers say X and y, they mean "feature matrix" and "label vector" — fancy names for the same table.

## The builder trap

Don't put the answer inside the features. If you're predicting churn and you include `canceledAt`, the model looks like a genius and dies in production. That's leakage (Day 4). For now: features are what you'd know *before* you predict; the label is what you learn after.

Tomorrow: supervised vs unsupervised vs reinforcement learning — a map, not a lecture.

## Dig deeper

- [Google: supervised learning (features & labels)](https://developers.google.com/machine-learning/intro-to-ml/supervised)
- [Google ML glossary: feature](https://developers.google.com/machine-learning/glossary#feature)
- [scikit-learn: samples & features vocabulary](https://scikit-learn.org/1.4/tutorial/basic/tutorial.html)
- [YouTube: Features and Labels](https://www.youtube.com/watch?v=GQXn_1HONBY)
