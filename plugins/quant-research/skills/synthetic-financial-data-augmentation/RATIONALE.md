# Rationale

**Status: draft, needs review before merging.**

## What it does

Guides using GAN/diffusion-model-generated synthetic financial time series
to augment limited real training data: what statistical properties
("stylized facts" — fat tails, volatility clustering) a generator needs to
reproduce to be trustworthy, the specific failure mode of quiet
distribution/tail narrowing in synthetic samples, and how to validate a
model trained with synthetic augmentation safely (on real held-out data
only, with synthetic data treated as a supplement, not a base to generate
further synthetic data from).

## Why included

Found via fresh search after 26 skills were already shipped, as the
deferred candidate queued in the previous firing. This directly addresses
a constraint `deep-learning-forecasting-models` (already added) already
names — matching model size to available data volume, and using a smaller
model or pretrained baseline when data is scarce. Synthetic augmentation is
a genuine alternative lever for that same constraint, but introduces its
own specific risk (tail-narrowing) that's easy to miss if the synthetic
data merely "looks realistic."

## Extent of expected help

Can genuinely help a model generalize when real historical data is thin,
per recent research showing improved forecasting accuracy from
GAN-augmented training in some settings — but the skill is deliberately
weighted toward the tail-narrowing risk, because that specific failure mode
is dangerous in exactly the areas (risk estimation, tail-sensitive sizing)
where getting it wrong is most costly, and it's not obviously visible from
inspecting synthetic data that "looks" realistic. The practical value for
a small operation with limited data history is real, but bounded to
non-tail-sensitive uses unless the generator's tail behavior is
specifically validated.

## Key risks / limitations

- No current generator architecture reproduces every relevant statistical
  property of real financial returns simultaneously; different approaches
  are better at different stylized facts, so blanket trust in "a generative
  model" without checking which properties it actually reproduces is
  itself a risk.
- The tail/distribution-narrowing failure mode is not fixed by curating or
  selecting better synthetic samples — this needs to be validated against
  real data, not worked around by more careful synthetic-data selection.
- Compounding synthetic-on-synthetic generation (a model-collapse-style
  degradation) is a specific, avoidable mistake this skill calls out
  directly.
- This is a data-scarcity mitigation technique, not investment advice, and
  a model trained with synthetic augmentation still requires the full
  validation pipeline (purged CV, realistic costs, staged rollout) covered
  elsewhere in this repo before any capital is committed.

## Sources consulted

Recent (2026) research on GAN- and diffusion-model-based synthetic
financial time series generation (stylized-fact reproduction including fat
tails and volatility clustering, and the observation that no single model
yet satisfies all relevant stylized facts) and on synthetic-data pitfalls
more broadly (distribution narrowing / tail-behavior loss, model-collapse
risk from training on previously-synthesized data). Described here in
original wording; no code or text copied from any source.
