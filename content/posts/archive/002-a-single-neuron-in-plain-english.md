---
number: 2
title: "A single neuron, in plain English"
date: 2026-07-03
summary: "The smallest unit of a neural network, demystified."
tags: ["fundamentals", "math"]
cover: "/covers/002-a-single-neuron-in-plain-english.jpg"
series: archive
---

You already know what a function is.

A neuron is a function. That's the whole sentence. Everything below is just unpacking what that function does.

## Three inputs, one output

A neuron takes **a small list of numbers** as input and produces **a single number** as output. That's it. The list can be 3 numbers long, or 300 — but every neuron in a network has exactly one output.

If you're a full-stack dev, here's the type signature:

```js
function neuron(inputs: number[]): number {
  // some math, then return a number
}
```

The interesting question is: **what math?**

## What the neuron actually does

Three steps, in order:

- **Multiply each input by a "weight."** A weight is just a number the neuron has learned. If input `x1 = 2` and the neuron has learned `w1 = 0.5`, that input contributes `2 × 0.5 = 1` to the total.

- **Sum them all up.** Add the weighted inputs together, plus one extra number called a **bias**.

- **Squish the result through an "activation function."** This is a small rule that keeps the output in a reasonable range (e.g. between 0 and 1) and lets the network learn non-linear things.

In code, the simplest possible version looks like this:

```js
function neuron(inputs, weights, bias) {
  let sum = bias;
  for (let i = 0; i < inputs.length; i++) {
    sum += inputs[i] * weights[i];
  }
  return Math.max(0, sum); // "ReLU" — squish step
}
```

That's a real neuron. Everything you've ever heard about "deep learning" is this function, repeated millions of times and connected in clever ways.

## Why it matters

A neuron is dumb on its own — it can't even tell a cat from a dog. But **a million of them, connected, can.** The "learning" in machine learning is just the computer figuring out good values for the `weights` array and the `bias` number of every neuron. That's the only thing being learned.

You don't need to memorize the formula. You need to remember: **a neuron is a function that takes a list of numbers and returns one number, after multiplying each input by a learned weight, summing them, and squishing the result.**

Tomorrow: what happens when you string a bunch of these together into a **layer** — and why "deep" learning is just "many layers stacked."
