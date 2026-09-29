---
number: 4
title: "Train, val, test (and the silent killer called leakage)"
date: 2026-09-29
summary: "Three data buckets like local / staging / prod — plus why scaling before the split quietly ruins your score."
tags: ["fundamentals", "evaluation"]
cover: "/covers/004-train-val-test-leakage.jpg"
series: series
---

You've got labeled rows (Day 2). You've picked supervised (Day 3). Next trap: judging the model on the *same* examples it just memorized. That's like unit-testing against the production database and calling it green.

So we split.

## The three buckets (JS brain edition)

Think environments, not stats jargon:

| Bucket | Job | Feels like |
| --- | --- | --- |
| **Train** | Fit the model — learn the weights / rules | `localhost` + unit tests |
| **Val** (validation) | Tune knobs: depth, learning rate, which features | staging |
| **Test** | One honest score before you ship | production smoke |

```js
// sketch — not a real library
const { train, val, test } = split(dataset, { train: 0.7, val: 0.15, test: 0.15 });

model.fit(train);                 // only here
const stagingScore = model.score(val); // tweak until this looks good
// …weeks of tweaking later…
const prodScore = model.score(test);   // look once. report that. ship.
```

Rough sizes people use: ~70 / 15 / 15 on small data, or ~90 / 5 / 5 when you've got millions of rows. Exact % matters less than **keeping the jobs separate**.

## Why you never tune on the test set

If you peek at test scores while choosing hyperparameters, the test set stops being a stranger. You're teaching to the exam. Google's crash course calls this "wearing out" the set — use it enough for decisions and the number stops meaning "how we'd do on new users."

Val is the scratchpad. Test is the sealed envelope. Open it late. Ideally once.

Same instinct as: don't point your load test at prod while you're still guessing at cache TTLs. Staging exists for a reason.

## Leakage: the silent killer

**Leakage** = the model saw information it would *not* have at prediction time. Score looks amazing in the notebook. Prod looks like a clown show.

Classic ways builders get burned:

1. **Scale / impute / select features on the whole table, then split.** Mean and std from the test rows leaked into training. Split *first*. Fit the scaler on train only; transform val/test with those numbers.
2. **Future columns in the features.** Predicting churn with `canceledAt`. Predicting loan default with "days past due on *this* loan." Day 2's trap — answer (or its shadow) sitting in X.
3. **Same entity on both sides of the split.** User A has 40 sessions; random row-split puts some in train and some in test. The model memorizes User A, not "new users." Split by user / device / time when that's the real product question.

```js
// ❌ leakage: stats see the "future" (test) rows
const scaled = standardize(allRows); // mean/std from everyone
const { train, test } = split(scaled);

// ✅ honest: fit on train, apply elsewhere
const { train, val, test } = split(allRows);
const { mean, std } = stats(train);
const trainN = apply(train, mean, std);
const testN = apply(test, mean, std); // same transform, no refit
```

sklearn people wrap this in a `Pipeline` so `fit` never touches test. Same idea as keeping secrets out of the client bundle — structure the pipeline so the bad thing is hard to do by accident.

## The sniff test

Before you celebrate 99%:

- Would every feature exist **at the moment** you'd call `predict` in the app?
- Did any preprocessing look at rows that aren't in train?
- Does the split match how the world works (time forward, new users, new stores)?

If test score is cartoon-good and prod tanks, don't buy a fancier model first. Audit leakage. It's usually the pipeline, not the algorithm.

Tomorrow: accuracy is a liar — pick a metric that matches the product.

## Dig deeper

- [Google ML Crash Course: training / validation / test splits](https://developers.google.com/machine-learning/crash-course/training-and-test-sets/splitting-data)
- [scikit-learn: common pitfalls & data leakage](https://scikit-learn.org/stable/common_pitfalls.html)
- [IBM: what is data leakage in ML?](https://www.ibm.com/think/topics/data-leakage-machine-learning)
- [fast.ai: how (and why) to create a good validation set](https://www.fast.ai/posts/2017-11-13-validation-sets.html)
