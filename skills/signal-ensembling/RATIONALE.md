# Rationale

**Status: draft, needs review before merging.**

## What it does

Guides combining multiple models' or signals' predictions for the same
forecasting target into one — voting/averaging, blending, and stacking (a
meta-model trained on base-model outputs) — in order to reduce variance and
overfitting risk given financial data's low signal-to-noise ratio, and
validating any meta-model with the same rigor as a primary model.

## Why included

This is a genuinely distinct category found via fresh search after the
originally-seeded checklist was exhausted: it's neither "pick a better
single model" (already covered by `deep-learning-forecasting-models` and
`classical-statistical-forecasting`) nor "allocate capital across
strategies" (already covered by `portfolio-construction-small-capital`) —
it's the layer in between, combining multiple models' raw predictions or
signals into one before a final decision is made. Given the operation is
explicitly building multiple micro-strategies and signals, having a
principled way to combine correlated model outputs (as opposed to only
combining strategies at the capital level) fills a real gap.

## Extent of expected help

Primarily a variance-reduction and overfitting-mitigation technique rather
than a source of new predictive power: ensembling several genuinely
different models tends to produce a more robust aggregate signal than any
single model, particularly valuable given how easy it is for one model to
overfit noise in financial data. It does not create edge that isn't present
in the base models, and the added complexity of stacking specifically needs
to earn its keep against simpler voting/blending on the same validated
data, not be assumed better by default.

## Key risks / limitations

- Ensembling near-duplicate base models (same architecture, same features,
  different random seeds) captures little of the diversification benefit
  and can create false confidence from an ensemble that isn't actually
  diverse.
- A stacking meta-model is itself trainable and overfittable; validating it
  with the same walk-forward, leakage-safe discipline as any base model is
  necessary and easy to skip since it "feels" like post-processing rather
  than a model in its own right.
- Building and tuning an ensemble multiplies the number of things tried
  (which base models, which combination method, which weights) — this
  needs to be tracked and corrected for using the same experiment-tracking
  and multiple-testing discipline as any other research trial.
- This is a model-combination technique, not investment advice, and an
  ensemble of weak or unvalidated base models does not become a sound
  strategy just by being combined.

## Sources consulted

Recent (2026) research and practitioner writeups on ensemble methods for
financial time-series prediction (voting/averaging signal pools, blending,
stacking with a meta-learner), on ensembling as a mitigation for the
overfitting risk created by financial data's low signal-to-noise ratio, and
general 2026 commentary on quant research trends noting that combining
diverse model types is more established practice than any single dominant
architecture. Described here in original wording; no code or text copied
from any source.
