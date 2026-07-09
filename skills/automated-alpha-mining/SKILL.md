---
name: automated-alpha-mining
description: Use when generating a large number of candidate alpha signals/formulas via LLM-driven or evolutionary search rather than hand-designing one at a time — an agentic research process for proposing, mutating, and filtering formulaic alphas at scale, with guardrails specifically because this process multiplies the multiple-testing and overfitting risk covered elsewhere in this repo.
---

# Automated (LLM-Driven) Alpha Mining

LLM-driven and evolutionary alpha mining can propose, test, and refine far
more candidate signals than a human researcher working formula-by-formula
— that's exactly why it needs tighter guardrails, not fewer. This skill is
about running that discovery process itself responsibly, as a distinct
activity from designing any single model or signal (see
[[financial-feature-engineering]], [[deep-learning-forecasting-models]]).

## How the process works

- **Propose candidate formulas or signal expressions**, using an LLM (or
  an evolutionary/genetic search process) to generate variations —
  combinations of price/volume/feature transforms, conditioned on recent
  literature or prior search results, rather than hand-writing each one.
- **Evaluate each candidate against held-out data** and keep a record of
  what worked and what didn't (this is the same discipline as
  [[quant-experiment-tracking]], but the volume of trials is far higher
  here — every one still needs to be logged).
- **Mutate and recombine promising candidates** (an evolutionary step:
  take features of higher-scoring formulas and combine or perturb them)
  rather than only generating fresh candidates from scratch each round —
  this lets the search improve on what's already been found instead of
  restarting blindly each time.
- **Track search-process memory** — which formula families, transforms, or
  combinations have already been tried and how they scored — so the
  process doesn't waste search budget rediscovering the same
  already-tested ideas, and so a documented reason exists for why a given
  region of the search space was or wasn't explored.

## Why this needs tighter, not looser, discipline

- **This process is a multiple-testing machine.** Automated mining can
  generate and test vastly more candidate signals than manual research —
  every one of those is a trial, and the trial count must feed the
  deflated-Sharpe/PBO correction in [[purged-cv-backtesting]] and the
  logging discipline in [[quant-experiment-tracking]]. Skipping this
  because the search was "automated" rather than manual is exactly how a
  large batch of spurious signals gets mistaken for real ones.
- **Financial data's low signal-to-noise ratio means an automated search
  will find noise that looks like signal if allowed to search long
  enough** — validate every promising candidate on genuinely held-out,
  later-arriving data, not just the split the mining process itself used
  to select it, since the selection process itself is a source of
  overfitting.
- **Check transfer/generalization across related universes or periods**
  before trusting a mined factor — a formula that scores well on one
  index/period but fails to transfer to a related one is more likely
  fitted to that specific sample than a genuine effect.
- **Explicitly search for factors that resist decay, not just factors that
  score highest historically** — a formula discovered via search that
  happens to exploit something likely to be quickly arbitraged away
  (crowded, well-known effects) has different practical value than one
  built around a more durable relationship; factor persistence itself is
  worth scoring, not just historical fit.

## Guardrails

- Never treat a mined formula as validated because the mining process's
  internal scoring liked it — that internal score is exactly the number
  most exposed to the search's own overfitting; final validation must be
  independent (see [[purged-cv-backtesting]]).
- Budget search compute deliberately — an unconstrained search will keep
  finding higher and higher internal scores that are decreasingly likely
  to be real as the trial count grows; treat search budget as a lever on
  overfitting risk, not just a cost constraint.
- A mined alpha is a candidate signal, not a strategy — it still needs
  cost modeling (see [[transaction-cost-slippage-modeling]]), sizing (see
  [[position-sizing-risk-management]]), and live monitoring (see
  [[live-backtest-drift-monitoring]]) like any other signal before capital
  is put behind it.
