---
number: 4
title: "What happens during a forward pass"
date: 2026-07-04
summary: "Tracing one input as it flows through the layers, end to end."
tags: ["fundamentals", "intuition"]
cover: "/covers/004-the-forward-pass.jpg"
series: archive
---

You already know what a pipeline is.

```js
const result = pipe(input, step1, step2, step3);
```

A forward pass is the same thing. You feed one input into the left side of the network, it flows through every layer in order, and one prediction comes out the right side. No looping, no backtracking — just data moving forward.

## Trace one input, layer by layer

Imagine a tiny network that guesses whether you'd click an ad. The input might be four numbers: `[age, hour_of_day, has_visited_today, is_mobile]`. Those four numbers are the **input layer** — not real neurons, just the raw data.

That list of four numbers goes into **layer 1**, which has, say, 8 neurons. Each of those 8 neurons does the multiply-sum-squish thing we covered yesterday and returns one number. So now we have a list of 8 numbers.

That list of 8 goes into **layer 2**, which has 4 neurons. Same thing happens, we get 4 numbers.

Finally those 4 numbers go into the **output layer**, which has just 1 neuron (because we want one yes/no answer). That one neuron squishes its sum and outputs a number between 0 and 1. If it's `0.73`, the model is saying: *"I think there's a 73% chance this person clicks."*

That's the entire forward pass. Nothing magical. Just a number list shrinking and reshaping until you have one number.

## Why it's called "forward"

Because the data only moves in one direction — left to right. There's no feedback, no loop. The weights stay frozen during the forward pass; they only change later, during training (which we'll get to). The forward pass is just **inference**: you give it an input, you get an output, you're done.

Every time you call `openai.chat.completions.create()` and send a prompt, here's what's happening on their servers: your text got tokenized, turned into a vector, and flowed forward through ~80 layers of an enormous neural network, and the final layer spit out a probability distribution over the next token. That's it.

## What "input shape" really means

When you read about a model expecting inputs of a certain shape — say `(batch_size, 4)` or `(batch_size, 512)` — that's just the size of the number list going into the very first layer. The output of each layer has to match the input size of the next layer, which is why the architecture has to be designed up front. You can't stick a 100-neuron layer after a 4-neuron layer unless something reshapes the data in between.

You don't need to remember the dimensions. You need to remember: **a forward pass is a pipeline. One input, one output, layers in between, data flowing left to right.**

Tomorrow: how the network knows it got the answer wrong — the **loss function**, the scoreboard that tells the model how badly it's doing.
