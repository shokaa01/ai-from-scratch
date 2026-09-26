---
number: 3
title: "Layers and activations"
date: 2026-07-03
summary: "Why 'deep' learning is just a stack of neurons, and what the squish step is really for."
tags: ["fundamentals", "intuition"]
cover: "/covers/003-layers-and-activations.jpg"
series: archive
---

You already know what a function composition is.

```js
function predict(input) {
  return layer2(layer1(input));
}
```

That's a neural network with two layers. Stack another call on top of the result and you've got three. The whole "deep" in "deep learning" is just this — functions inside functions, chained together, where each layer is a bag of neurons.

## A layer is just a list of neurons

Yesterday we said a neuron takes a list of numbers and returns one number. A **layer** is a bunch of those running side by side. You hand the same input list to each neuron, and you get a list of outputs back.

```js
function layer(inputs, neurons) {
  return neurons.map(n => neuron(inputs, n.weights, n.bias));
}
```

If your input is 3 numbers and the layer has 100 neurons, the layer returns 100 numbers. That 100-number list becomes the input to the next layer.

That's the entire mechanism. Everything else — Transformers, GPT, image models, all of it — is layers all the way down.

## Why the squish matters

Remember the `Math.max(0, sum)` at the end of yesterday's neuron? That's an **activation function** (we used ReLU). Without it, a layer is just `inputs × weights + bias`, and stacking those gives you one giant line — no matter how many layers you stack, the whole network can only learn straight-line patterns.

Activation functions are what let the network learn **curves**. Each squish adds a little bend. Stack enough bends and the network can fit almost any shape.

## Why you don't draw the weights

When you see "neural network" diagrams online with nodes and arrows: ignore the arrows for the math, just count the vertical columns. Each column is a layer. The number on each layer tells you how wide it is. That's all the diagram is saying.

A "deep" network is one with lots of layers in a row. Modern LLMs have around 80 of them.

Tomorrow: what actually happens to your inputs as they pass through these layers — the **forward pass**, step by step.
