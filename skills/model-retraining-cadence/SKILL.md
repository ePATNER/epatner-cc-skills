---
name: model-retraining-cadence
description: Use when deciding how and when to update a live model's parameters with new data — scheduled vs. drift-triggered retraining, and safely rolling out an updated model version — as distinct from the decision in live-backtest-drift-monitoring to cut size or retire a strategy entirely. This is about routine model maintenance, not the kill-switch decision.
---

# Model Retraining Cadence

A live model needs regular care that isn't the same question as "is this
strategy still working" (see [[live-backtest-drift-monitoring]]) — even a
healthy, working strategy's underlying model needs periodic updates as new
data arrives, and *how* that update happens is its own source of risk if
done carelessly.

## Retraining triggers: scheduled vs. drift-triggered vs. both

- **Pure scheduled retraining** (retrain every N days/weeks on a fixed
  cadence) is simple and predictable but assumes decay is smooth and
  uniform — in practice, models are often "shocked" by a discrete
  regime change rather than decaying gradually, which a fixed schedule can
  miss until the next scheduled retrain, potentially well after damage is
  done.
- **Pure drift-triggered retraining** (retrain when a monitored metric
  crosses a threshold) reacts faster to genuine shocks, but by
  construction only fires after degradation has already been observed —
  it cannot retrain ahead of a problem, only in response to one already
  underway.
- **Combine both**: a baseline scheduled cadence as a floor, plus
  drift-triggered retrains layered on top for faster response to sudden
  shocks — this captures the predictability of a schedule and the
  responsiveness of drift detection, rather than relying on either alone.

## Safely rolling out a retrained model

- **Validate the retrained model with the same rigor as the original**
  (walk-forward, leakage-safe — see [[purged-cv-backtesting]]) before it
  replaces the live version; retraining doesn't get a pass on validation
  just because it's routine maintenance.
- **Roll out via shadow/canary deployment before full cutover** — run the
  updated model alongside the existing live one (shadow) or on a small
  fraction of decisions (canary) before fully replacing the prior version,
  the same staged-rollout discipline used for a new strategy (see
  [[strategy-testing-validation]]) applied to updates of an existing one.
- **Keep the prior model version recoverable.** If a retrained version
  performs worse live than shadow/canary testing suggested, being able to
  roll back quickly matters — don't discard the previous version the
  moment a new one goes live.

## How this differs from the kill-switch decision

- **Retraining is a maintenance action that assumes the strategy is still
  fundamentally sound** and just needs updated parameters/data — it's the
  routine case. [[live-backtest-drift-monitoring]]'s kill-switch/de-risk
  response is for the case where the strategy itself may no longer be
  sound at all.
- **A pattern of retraining not helping is itself a signal.** If
  retraining repeatedly fails to restore acceptable performance, that's
  evidence the issue isn't stale parameters but something more
  fundamental — at that point, escalate to the kill-switch/retirement
  process rather than continuing to retrain indefinitely.

## Guardrails

- Don't retrain on a window that's too short or too regime-specific — a
  retrain that overfits to very recent, possibly unusual conditions can
  make the model worse, not better; apply the same non-stationarity
  awareness used elsewhere (see [[financial-feature-engineering]] and
  [[regime-detection]]) to the training-window choice itself.
- Log every retrain event (trigger reason, data window, validation result)
  as part of the operational decision log (see
  [[explainability-audit-documentation]]) — an unlogged retrain makes it
  hard to later understand why a model's behavior changed on a given date.
- This is model-maintenance methodology, not investment advice, and a
  well-run retraining process does not guarantee a model stays profitable
  — it only ensures degradation is addressed as promptly and safely as
  reasonably possible.
