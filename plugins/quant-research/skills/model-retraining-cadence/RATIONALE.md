# Rationale

**Status: draft, needs review before merging.**

## What it does

Guides the ongoing maintenance decision of how and when to update a live
model with new data — combining scheduled and drift-triggered retraining,
validating and safely rolling out (shadow/canary) a retrained model version
before full cutover, keeping prior versions recoverable, and logging every
retrain event — explicitly distinguished from the kill-switch/retirement
decision covered in `live-backtest-drift-monitoring`.

## Why included

Found via fresh search after 22 skills were already shipped, as a
deliberate follow-up to a candidate flagged (but deferred) in the previous
firing's log. `live-backtest-drift-monitoring` already covers detecting
decay and deciding to cut size or retire a strategy — but it doesn't cover
the more common, routine case: a fundamentally sound live model simply
needs its parameters refreshed with new data periodically. That's a
distinct operational question with its own failure modes (naive periodic
retraining can miss discrete shocks; retraining on too narrow a window can
overfit to unusual recent conditions) that the kill-switch skill doesn't
address, which is why it's included as a separate skill rather than folded
into the existing one.

## Extent of expected help

Operational/maintenance-focused rather than performance-improving on its
own: a well-run retraining process keeps an already-sound model current
with recent data, and the combined scheduled-plus-drift-triggered approach
is meant to catch both gradual decay and sudden regime shocks better than
either alone. The shadow/canary rollout guidance protects against a
retrained model quietly performing worse than its predecessor before
that's discovered — the same protection `strategy-testing-validation`
provides for a brand-new strategy, applied here to updates of an existing
one.

## Key risks / limitations

- Retraining triggers and cadence are themselves parameters that need
  sensible defaults and periodic reconsideration; a fixed schedule that
  once made sense can become miscalibrated as market conditions change.
- Retraining on too short or too regime-specific a data window is a real
  risk of making a model worse, not better — this needs the same
  non-stationarity discipline as initial feature/model construction, not a
  separate, looser standard because it's "just an update."
- Repeated retraining that fails to restore performance is a signal the
  problem has moved beyond what retraining can fix; the skill explicitly
  flags escalating to the kill-switch process at that point rather than
  retraining indefinitely, but recognizing that threshold in practice is a
  judgment call, not a hard rule.
- This is model-maintenance methodology, not investment advice, and
  disciplined retraining does not guarantee continued profitability — it
  only makes degradation more likely to be caught and addressed promptly.

## Sources consulted

Recent (2026) writeups on MLOps retraining schedules and their common
failure modes (the assumption of smooth, uniform decay vs. models being
"shocked" by discrete changes), scheduled vs. drift-triggered retraining
approaches, and staged rollout practices (shadow/canary deployment) for
updated model versions, including quant-specific MLOps commentary on live
performance monitoring feeding retraining decisions. Described here in
original wording; no code or text copied from any source.
