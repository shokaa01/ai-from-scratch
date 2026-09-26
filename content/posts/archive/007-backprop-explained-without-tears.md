---
number: 7
title: "Backprop, explained without tears"
date: 2026-07-06
summary: "How a model sends blame backward through its layers."
tags: ["fundamentals", "training", "intuition"]
cover: "/covers/007-backprop-explained-without-tears.jpg"
series: archive
---

You already know what a stack trace is.

When a request fails in a Next.js app, you do not just stare at the final error message. You trace backward: this component called that helper, that helper called the API client, and the API client returned something weird. Backprop is the training version of that trace.

## Start with the final mistake

During a forward pass, data moves left to right through the network and produces a prediction. The loss function compares that prediction to the correct answer and returns one number: how wrong the model was.

Gradient descent says, "move each weight in the direction that lowers loss." But there is a practical question hiding inside that sentence:

**Which weights deserve how much blame?**

The last layer is easiest. It directly produced the bad prediction, so we can measure how changing its weights would change the loss.

Earlier layers are trickier. They did not output the prediction directly. They produced intermediate numbers that later layers used.

## Backprop sends blame backward

Backpropagation, usually shortened to backprop, is the algorithm that sends the loss signal backward through the network.

Layer by layer, right to left, it asks:

- How much did this layer contribute to the final loss?

- How much did each weight inside this layer contribute?

- What gradient should gradient descent use for that weight?

That is it. Backprop does not update the weights by itself. It computes the gradients. Gradient descent uses those gradients to do the update.

```js
prediction = forward(input)
loss = compare(prediction, answer)
gradients = backward(loss)
weights = update(weights, gradients)
```

## Why it feels like a chain reaction

Each layer depends on the layer before it. So if the final output was wrong, the blame has to pass through the same chain in reverse.

Think of a checkout bug: the UI showed the wrong total because the tax helper returned the wrong value because the region parser misunderstood the address. You debug backward from symptom to cause. Backprop does the same thing, but with numbers instead of logs.

The important part is that earlier layers still get useful feedback. Even though layer 1 is far away from the final answer, backprop can still estimate which of its weights nudged the network toward the mistake.

## The mental model

Backprop is not a new kind of learning. It is the bookkeeping that makes learning possible in deep networks.

Forward pass: make a prediction. Loss: score the mistake. Backprop: figure out which weights caused the mistake. Gradient descent: nudge those weights.

Tomorrow: we put the pieces together into the full training loop, from data batch to updated weights.
