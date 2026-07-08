---
name: signal-ensembling
description: Use when multiple models or signals exist for the same forecasting target and need to be combined into one — choosing between voting/averaging, blending, and stacking (a meta-model trained on base-model outputs), specifically to reduce variance and overfitting in a low signal-to-noise setting rather than to chase a marginal accuracy gain from complexity.
---

# Signal Ensembling

Financial data has a low signal-to-noise ratio, which makes any single
model prone to overfitting noise as if it were pattern. Combining several
different models' outputs is a well-established way to reduce that
variance — but it's a distinct technique from picking a better single
model (see [[deep-learning-forecasting-models]] and
[[classical-statistical-forecasting]]) or from allocating capital across
strategies (see [[portfolio-construction-small-capital]]): this is about
combining predictions/signals themselves before a single final call is
made.

## Combination methods, in order of complexity

- **Simple voting/averaging** across multiple signals (e.g. what fraction
  of a pool of independent signals currently agree) is the simplest and
  most robust starting point — turning several individually weak or noisy
  predictors into a stronger aggregate signal, with minimal risk of adding
  new overfitting on top.
- **Blending** combines base-model outputs with a fixed, simple rule (e.g.
  a weighted average tuned on a held-out set) — a small step up in
  complexity that can capture that some base models are more reliable than
  others, without a full meta-learning step.
- **Stacking** trains a meta-model on the base models' outputs, allowing it
  to learn combination weights and even nonlinear relationships between
  the base models' predictions, rather than assuming a fixed combination
  rule — the most powerful option, and the one most exposed to the
  overfitting it's nominally trying to reduce if not validated carefully.

## Building an ensemble that actually reduces risk

- **Use genuinely diverse base models, not near-duplicates.** Ensembling
  benefits come from base models making different kinds of errors (e.g. a
  classical statistical model plus a tree-based model plus a deep model, or
  models trained on different feature subsets) — averaging several near-
  identical models mostly just averages the same bias and error, gaining
  little.
- **Validate the meta-model (for stacking) with the same rigor as any other
  model** — a stacking meta-model is trained on data and is exactly as
  capable of overfitting as the base models it combines; it needs its own
  walk-forward, leakage-safe validation (see [[purged-cv-backtesting]]), not
  a free pass because it "sits on top."
- **Start with the simplest combination method that captures the benefit.**
  Given financial data's low signal-to-noise ratio, the added complexity of
  stacking is only worth it if it demonstrably beats simple voting/blending
  out-of-sample on the same data — the goal is variance reduction, not
  novelty for its own sake.

## Guardrails

- Ensembling reduces variance from combining weak/noisy predictors; it does
  not manufacture predictive power that isn't present in any of the base
  models — an ensemble of models with no real edge is still an ensemble
  with no real edge, just a more complicated one.
- Every trial in building and tuning an ensemble (which base models, which
  combination method, which meta-model hyperparameters) is a trial that
  needs to be counted for multiple-testing correction (see
  [[purged-cv-backtesting]] and [[quant-experiment-tracking]]) — ensembling
  has a habit of quietly multiplying the effective number of things tried.
- Don't treat ensembling as a substitute for fixing a weak base model or
  for realistic cost/execution modeling — it sits alongside those
  concerns, not above them.
