---
number: 5
title: "Loss: how wrong is the model?"
date: 2026-07-05
summary: "The simple scoreboard that turns guesses into learning."
tags: ["fundamentals", "training", "intuition"]
cover: "/covers/005-loss-how-wrong-is-the-model.jpg"
series: archive
---

You already know what a failing test is.

A loss function is the model's failing test, but with a score. Instead of saying "pass" or "fail," it says "you were wrong by this much." Training is mostly the process of making that number smaller.

## Prediction first, score second

Yesterday, we traced a forward pass: input goes in, prediction comes out.

For training, we also need the correct answer. If the model predicts `0.73` for "will this user click?" and the real answer is `1`, the model was close. If it predicts `0.02`, it was very wrong.

The loss function turns that gap into one number:

```js
const prediction = 0.73;
const actual = 1;
const loss = howWrong(prediction, actual);
```

Lower loss means a better guess. Higher loss means the model needs to change more.

## Loss is not accuracy

Accuracy is the metric you show in a dashboard: "we got 92% right."

Loss is the training signal. It needs to be smoother than accuracy because the model learns by making tiny adjustments. If a prediction moves from `0.51` to `0.90` for the correct class, accuracy might still count both as "right," but loss can say: "nice, the second one is more confident."

That smooth feedback matters. The model does not just need to know whether it was wrong. It needs to know which direction is less wrong.

## Different tasks use different scoreboards

For house prices, loss might be based on distance from the real price: predicted `$510k`, actual `$500k`, small loss.

For yes/no classification, loss punishes confident wrong answers harder than uncertain wrong answers. Saying "99% yes" when the answer is no should hurt more than saying "55% yes."

For language models, the scoreboard is: "how surprised were you by the next real token?" If the sentence is "peanut butter and ___" and the real next token is "jelly," the model gets low loss if it assigned high probability to "jelly."

## The mental model

A loss function is the scoreboard for one guess. Training means running many examples through the model, measuring loss each time, and nudging the weights so future loss goes down.

You do not need to memorize the formulas yet. Remember this: **loss is how the model feels wrongness as a number.**

Tomorrow: how the model uses that wrongness to slide its weights in a better direction — gradient descent.
