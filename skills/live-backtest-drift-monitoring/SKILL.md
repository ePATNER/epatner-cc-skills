---
name: live-backtest-drift-monitoring
description: Use once a strategy is live — tracking whether real performance is diverging from what the backtest predicted, detecting alpha decay early, and deciding when to cut size or retire a strategy rather than letting a decayed edge quietly turn into a loss.
---

# Live vs. Backtest Drift Monitoring & Kill Switches

A strategy that passed validation still needs to be watched after
deployment — the backtest is a hypothesis about the future based on the
past, and it can stop being true for reasons that have nothing to do with
whether the original research was sound (crowding, structural market
change, the discovered edge simply getting arbitraged away). Monitoring is
what turns an unmonitored, aging edge into a decision, before it turns into
a drawdown.

## What to track once a strategy is live

- **Compare live fills against the backtest's assumptions, not just live
  P&L against backtested P&L.** Track realized slippage vs. modeled
  slippage (see [[transaction-cost-slippage-modeling]]), realized fill
  rates, and latency — divergence here often explains a P&L gap before any
  "the edge is gone" explanation is needed.
- **Track performance broken out by regime, not just in aggregate.**
  Comparable to a Minimum Regime Performance style check: does the strategy
  still perform acceptably in the regime it's currently in (see
  [[regime-detection]]), or is aggregate live performance being propped up
  by one favorable stretch while quietly failing elsewhere?
- **Watch for alpha decay specifically**, not just volatility in returns —
  a gradual, sustained decline in a signal's effect size (not just noisy
  short-term underperformance) is the sign of an edge being arbitraged away
  or a structural change in the market that produced it, and it typically
  shows up as an early warning before cumulative P&L clearly turns negative.
- **Require a minimum sample of live trades before drawing conclusions.**
  Institutional practice treats under ~50 live trades as too noisy to
  distinguish bad luck from a broken strategy, and wants on the order of
  100-200 before treating a live track record as statistically meaningful —
  resist reacting to a short losing (or winning) streak either direction
  before there's enough sample to say anything.

## Responding: kill switches, not discretion in the moment

- **Decide the kill/de-risk rules before going live, not while watching a
  drawdown happen.** Pre-commit thresholds (e.g. drawdown level, sustained
  underperformance vs. backtest, live/backtest slippage divergence beyond a
  set bound) that trigger an automatic size cut or full stop — a kill
  switch used ahead of time preserves capital; the same decision made late,
  under stress, usually doesn't.
- **A kill switch firing is a normal outcome, not a failure of the
  research.** Treat "the strategy hit its retirement condition" as the
  system working as intended, the same way a stop-loss on an individual
  trade is meant to fire sometimes — it protects capital for the next
  strategy rather than defending a specific one past its useful life.
- **Reducing capital incrementally as confidence erodes** is often more
  appropriate than an all-or-nothing switch — cut size when performance
  degrades past a first threshold, retire fully past a second, rather than
  running full size until a single hard stop.

## Guardrails

- Don't treat a live-backtest performance gap as automatically "the market
  changed" — check execution-level causes (cost model accuracy, fill
  quality, timing) before concluding the underlying edge decayed.
- Don't wait for aggregate P&L to turn clearly negative before acting —
  by the time that's obvious, meaningful capital has typically already been
  lost; the point of tracking decay signals and regime-specific performance
  is to act earlier than that.
- This skill governs an already-live strategy; it doesn't replace the
  validation that should have happened before going live (see
  [[purged-cv-backtesting]]) — a strategy that was never properly validated
  will decay-monitor just as unreliably as it backtested.
