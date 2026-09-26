---
number: 8
title: "The training loop end to end"
date: 2026-07-07
summary: "How forward pass, loss, backprop, and updates repeat until the model improves."
tags: ["fundamentals", "training", "practical"]
cover: "/covers/008-the-training-loop-end-to-end.jpg"
series: archive
---

You already know what a deploy feedback loop feels like.

You ship a change, watch logs and metrics, find what broke, patch it, and ship again. Training a neural network is the same shape, just much faster and with numbers instead of users yelling in Slack.

## One batch at a time

A model does not usually learn from the whole dataset in one giant bite. It learns from a **batch**: a small chunk of examples.

For each batch, the loop is:

```js
prediction = model.forward(batch.inputs)
loss = compare(prediction, batch.answers)
gradients = backward(loss)
model.update(gradients)
```

That tiny loop is most of training. Run it thousands or millions of times and the weights slowly become useful.

## The four moving parts

The **forward pass** makes guesses. Inputs flow through the layers from left to right and predictions come out.

The **loss function** scores those guesses. It turns "the model was wrong" into one number that can be improved.

**Backprop** sends the blame backward through the layers. It figures out which weights contributed to the loss and by how much.

The **optimizer** updates the weights. Gradient descent is the simplest optimizer: move each weight a small step in the direction that should lower future loss.

Nothing mystical happens between these steps. Training is just this loop repeated until the model stops getting meaningfully better.

## Epochs are full passes over data

You will hear the word **epoch** a lot. One epoch means the model has seen every training example once.

If you have 100,000 examples and use batches of 100, then one epoch is 1,000 training steps. Train for 10 epochs and the model gets 10 chances to learn from the full dataset, with weights changing after every batch.

More epochs are not always better. After a point, the model may start memorizing instead of learning the pattern. That is overfitting, and it is our next problem.

## The mental model

A training loop is the machine-learning version of "try, measure, fix, repeat." The model guesses, gets scored, traces blame backward, updates its weights, and tries again on the next batch.

Tomorrow: why a model can look great on practice data but fail in the real world — overfitting.
