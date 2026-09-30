---
number: 5
title: "Accuracy is a liar — pick a metric that matches the product"
date: 2026-09-30
summary: "99% can mean 'always guess the majority class.' Precision, recall, F1, and AUC — choose by the cost of being wrong."
tags: ["fundamentals", "evaluation"]
cover: "/covers/005-accuracy-is-a-liar.jpg"
series: series
---

Yesterday you got an honest test set. Great. Today: the number you print from that set can still lie to your face.

## The 99% trap

Fraud is 1% of transactions. Your model predicts "not fraud" for *everything*.

```js
// 10_000 rows, 100 real fraud
correct = 9900; // all the legit ones
accuracy = 9900 / 10000; // 0.99 🎉
// fraud caught: 0
```

Green dashboard. Zero product value. Accuracy asks "how often was I right?" — it doesn't care *which* mistakes you made. When classes are skewed (spam, fraud, churn, rare disease), the majority class is a free win.

Same energy as a health check that only pings the load balancer: 100% uptime on the wrong thing.

## Two kinds of wrong

For a binary call ("is this the bad thing?"), every miss is one of two flavors:

| Mistake | Name | Feels like |
| --- | --- | --- |
| Said **yes**, truth was **no** | False positive (FP) | False alarm |
| Said **no**, truth was **yes** | False negative (FN) | Missed it |

**Precision** = of the times you yelled "yes," how often were you right?  
`TP / (TP + FP)` — allergy to false alarms.

**Recall** = of the real "yes" cases, how many did you catch?  
`TP / (TP + FN)` — allergy to misses.

You usually can't max both. Raise the bar to fire fewer alarms → precision up, recall down. Lower the bar to catch more → recall up, precision down. That's the tradeoff, not a bug.

## Product cost picks the metric

Don't ask "what's the best metric?" Ask **which mistake is more expensive in *this* product**.

| Product | Worse mistake | Lean toward |
| --- | --- | --- |
| Spam filter (inbox) | Burying a real client email (FP if "spam"=positive) | **Precision** — don't cry wolf |
| Fraud / chargebacks | Letting a bad txn through (FN) | **Recall** — catch the rare bad ones |
| Cancer screening | Missing a real case (FN) | **Recall** — false alarms get a second test |
| Ban / suspend accounts | Nuking a legit user (FP) | **Precision** — support tickets are expensive |
| "You might like" recs | Showing junk (FP) | Often **precision@k** — users scroll past misses |

Fraud and medical skew the same way as the 99% trap: the positive class is rare *and* missing it hurts. Spam-to-inbox and moderation often hurt more when you're wrong about the positive call.

Write the cost in a sentence before you open sklearn. "One missed fraud costs \$X; one false freeze costs Y support hours." That sentence *is* the metric choice.

## F1 and AUC (the short version)

**F1** = harmonic mean of precision and recall. One number when you care about both and classes are imbalanced. Useful for comparing models. Still doesn't know your dollar costs — if FN is 100× worse than FP, don't worship F1; weight recall harder (or use a custom cost).

**ROC-AUC** = "if I pick a random fraud and a random legit txn, how often does the model score the fraud higher?" Threshold-free ranking score. Handy for comparing models. On *heavily* imbalanced data, also peek at a precision-recall curve — ROC can look cheerful while precision is trash on the rare class.

```js
// sketch: same model, different product thresholds
const score = model.predictProba(row); // 0..1 "how fraud-y"
const isFraud = score >= threshold;    // product knob, not a math law

// high threshold → fewer FPs (precision↑, recall↓)
// low threshold  → fewer FNs (recall↑, precision↓)
```

The model ranks. **You** pick the cutoff from the cost table above.

## The sniff test

Before you screenshot "accuracy: 0.99" for the founder:

1. What's the base rate of the rare class? If a dumb majority baseline beats your model, start over.
2. Which hurts more — FP or FN — in *this* feature?
3. Are you reporting the metric that matches that cost, on the sealed test set from Day 4?

Accuracy isn't evil. It's a vibes check on balanced, low-stakes problems. Most product ML is neither.

Tomorrow: underfit vs overfit — the Goldilocks problem.

## Dig deeper

- [Google ML Crash Course: accuracy, precision, recall](https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall)
- [Google ML Crash Course: ROC and AUC](https://developers.google.com/machine-learning/crash-course/classification/roc-and-auc)
- [scikit-learn: metrics and scoring](https://scikit-learn.org/stable/modules/model_evaluation.html)
- [scikit-learn: Precision-Recall curves](https://scikit-learn.org/stable/auto_examples/model_selection/plot_precision_recall.html)
