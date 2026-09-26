---
number: 6
title: "Gradient descent: learning by sliding"
date: 2026-07-05
summary: "How a model uses loss to move its weights in a better direction."
tags: ["fundamentals", "training", "intuition"]
cover: "/covers/006-gradient-descent-learning-by-sliding.jpg"
series: archive
---

You already know what it feels like to tune a config value.

You change `timeoutMs` from `1000` to `2000`, run the app, watch the errors drop, then adjust again. Gradient descent is that same loop, but for millions of weights at once.

## Loss gives the height

Yesterday, we said loss is the model's wrongness score. Imagine that score as height on a hill. High loss means you are standing high up. Low loss means you are closer to the valley.

The model's weights decide where you are on that landscape. Change the weights a little, and the loss may go up or down. Training is the search for a set of weights that lands in a low place.

Gradient descent is the rule: **look at which way is uphill, then take a small step the other way.**

## The gradient is the direction

A gradient is not a scary object here. It is just a direction signal.

For each weight, the gradient asks: "If I increase this weight a tiny bit, does loss go up or down? And by how much?"

If increasing a weight makes loss go up, we reduce that weight. If increasing it makes loss go down, we increase it. Do that for every weight, and the whole network takes one tiny step toward being less wrong.

In pretend code:

```js
weight = weight - learningRate * gradient;
```

`gradient` says which way loss rises. The minus sign moves the weight the opposite way. `learningRate` controls step size.

## Step size matters

If the learning rate is too small, training crawls. The model is walking toward the valley, but with baby steps.

If the learning rate is too large, training can jump over the valley and get worse. You have probably seen this in product work: change one setting too aggressively and the system becomes unstable.

Good training is boring in the best way: many small updates, each one trying to reduce loss a little.

## The mental model

Gradient descent is not intelligence. It is feedback plus adjustment. Predict, measure loss, find the direction that made loss worse, step the other way, repeat.

That repeat loop is why neural networks learn. Not because they understand the task, but because the weights keep sliding away from mistakes.

Tomorrow: how the model figures out the gradient for every earlier layer — backprop, without the tears.
