---
number: 1
title: "What even is a neural network?"
date: 2026-07-02
summary: "The 5-minute mental model, for someone who already ships Next.js apps."
tags: ["fundamentals", "mental-model"]
cover: "/covers/001-what-is-a-neural-network.jpg"
series: archive
---

You already know what a function is.

```js
function predict(input) {
  return output;
}
```

A neural network is the same shape — it takes an input and returns an output. The difference is that you didn't write the body. **The body was learned from data.**

That's it. That's the entire idea. Everything else is a refinement of that one sentence.

## A function whose body was learned

Imagine you want a function that takes a description of a house and returns its price. In the old days you'd write it:

```js
function predictPrice(house) {
  return house.sqft * 5000 + house.bedrooms * 200000;
}
```

You picked the formula. You picked the multipliers (`5000`, `200000`). The model is fixed and you have to know real estate to write it.

A neural network is the **same shape**, but instead of you picking the multipliers, the computer picked them by looking at a million past house sales. The function still looks like:

```js
function predictPrice(house) {
  return some_complex_math(house);
}
```

You just don't know what's inside `some_complex_math` anymore — and you don't need to. It was tuned, not designed.

## Why "neural"?

The name is a metaphor. In the 1940s, scientists noticed that a brain cell (a neuron) takes a few inputs, does some math, and fires or doesn't fire. So they drew a tiny box that did the same thing — inputs go in, a number comes out — and strung a million of these boxes together. The metaphor stuck even though it's not really how brains work.

You don't need to remember that. What you do need to remember:

> **A neural network is a function. The body of that function was learned from examples instead of written by a programmer.**

## Why this matters for you

Every AI thing you've heard of — ChatGPT, image generators, voice cloning, self-driving — is, under the hood, a function. Inputs go in, outputs come out, and somewhere in the middle there's a giant blob of learned math.

Once you have this mental model, "AI" stops being magic and starts being **"a function someone trained"**. That's the frame I'll build on for the next 40 posts.

Tomorrow: what that "blob of learned math" actually looks like when you zoom in on a single piece of it.
