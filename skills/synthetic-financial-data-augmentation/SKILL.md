---
name: synthetic-financial-data-augmentation
description: Use when a forecasting model's real historical data is too short or thin to train on safely (see the data-volume-vs-model-size guidance in deep-learning-forecasting-models) and generating synthetic time series (via GAN or diffusion models) to augment it is being considered — how to judge whether the synthetic data is trustworthy, and the specific way this can quietly go wrong.
---

# Synthetic Financial Data Augmentation

Generative models (GANs, diffusion models) can produce additional
synthetic time series to train on when real history is short — genuinely
useful given that financial markets offer only one realized history to
learn from. But synthetic data that looks realistic and synthetic data
that's actually safe to train on are different bars, and the gap between
them is where this technique quietly fails.

## What "realistic" synthetic data needs to reproduce

Financial returns have well-documented statistical regularities ("stylized
facts") that a generator needs to reproduce, not just approximate visually:

- **Fat tails** — extreme returns occur more often than a normal
  distribution would predict; a generator that under-produces tail events
  will make anything trained on it underestimate real risk.
- **Volatility clustering** — large moves cluster in time (positive
  autocorrelation in volatility over multiple periods), not scattered
  independently; a generator missing this will produce synthetic paths
  that look plausible bar-by-bar but have the wrong risk dynamics over a
  holding period.
- **No current model fully reproduces every stylized fact simultaneously**
  — different generator architectures (GAN variants, diffusion-based
  approaches) each capture some properties (e.g. fat tails and volatility
  clustering) better than others; know which properties matter most for
  the specific model being trained, and check the generator against those
  specifically rather than assuming a generic "realistic-looking" output
  is sufficient.

## The specific failure mode: quiet distribution narrowing

- **Generators tend to under-represent the tails of the real distribution**
  — synthetic samples cluster within a narrower range than the real data
  they're modeled on, with rare/extreme events underrepresented. Training
  a model on synthetic-heavy data can therefore make it systematically
  underestimate exactly the tail risk that matters most for position
  sizing and risk management.
- **This narrowing compounds if synthetic data is generated from data that
  already includes prior synthetic data** (a model-collapse-style
  degradation) — treat synthetic data as a supplement generated from real
  data each time, not as a base to generate further synthetic data from.
- **Curating or selecting "better-looking" synthetic samples doesn't fix
  this** — filtering synthetic samples doesn't reliably correct the
  underlying distribution-narrowing tendency; the fix is validating
  against real held-out data, not curating the synthetic set more
  carefully.

## Using synthetic data safely

- **Validate any model trained with synthetic augmentation on real,
  held-out data only** — the whole point is to check whether augmentation
  actually improved generalization to real conditions, not to how well it
  fits more synthetic data.
- **Treat synthetic data as a supplement to real data, not a replacement**
  — especially for tail-risk-sensitive uses (position sizing, risk
  management), where the specific failure mode above is most damaging;
  lean more heavily on real data for anything where getting the tail
  wrong is costly.
- **Be explicit about which stylized facts the chosen generator reproduces
  well**, and limit trust in the synthetic data to model properties that
  depend on those specific facts — don't treat a generator validated for
  volatility clustering as equally trustworthy for tail-event frequency
  if that wasn't separately checked.

## Guardrails

- Never use synthetic data as the sole training or validation source for a
  risk-sensitive model (position sizing, tail hedging) — real data,
  however limited, should anchor anything where underestimating tail risk
  is costly (see [[position-sizing-risk-management]] and
  [[tail-risk-hedging]]).
- Report whether and how synthetic augmentation was used as part of the
  research log (see [[quant-experiment-tracking]]) — a result achieved
  partly through synthetic data needs that disclosed for anyone (including
  a later version of the researcher) evaluating whether it will hold up
  live.
- This is a data-scarcity mitigation technique, not a source of edge on
  its own, and does not substitute for the walk-forward, leakage-safe
  validation covered in [[purged-cv-backtesting]] on real data before
  trusting any result.
