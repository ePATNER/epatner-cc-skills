# Rationale

**Status: draft, needs review before merging.**

## What it does

Guides monitoring a strategy after it goes live: comparing real execution
against backtest assumptions (slippage, fill rates, latency), tracking
performance by regime rather than only in aggregate, detecting alpha decay
as a gradual effect-size decline rather than just noisy short-term
underperformance, and setting pre-committed kill-switch/de-risk rules
instead of deciding in the moment.

## Why included

Every other skill added so far is about research and validation *before*
a strategy goes live; none of them cover what happens after. This is a
distinct and necessary final stage of the lifecycle — a strategy that was
correctly validated (via [[purged-cv-backtesting]]) can still decay in
production for reasons unrelated to whether the original research was
sound (crowding, structural change, execution drift), and without
monitoring, that decay is only visible in hindsight, after capital is lost.
For an operation deliberately building and running multiple micro-
strategies, having a standard way to detect a decaying one and act on it
mechanically is what keeps the overall operation resilient to any single
strategy failing.

## Extent of expected help

Purely protective, not return-generating: this skill doesn't make a
strategy better, it limits the damage when a previously-good strategy stops
working, which is a normal and expected event over a strategy's life. The
specific value for a small-capital operation is in the pre-commitment
discipline (deciding kill/de-risk thresholds before going live) and in
distinguishing genuine alpha decay from a live/backtest execution mismatch
that might be fixable with a better cost model rather than a strategy
retirement.

## Key risks / limitations

- Requiring a meaningful sample of live trades before drawing conclusions
  (roughly 50 as a floor, 100-200 for real confidence per cited industry
  practice) means early live performance, in either direction, is
  genuinely hard to interpret — the skill's guidance to wait for sample
  size cuts both ways: don't panic early, but also don't get falsely
  confident from an early good run.
- Distinguishing "alpha decay" from "temporarily out-of-favor regime" from
  "execution/cost model was wrong" requires the regime-detection and
  cost-modeling skills already added to actually be in place — this skill
  assumes that infrastructure exists rather than replacing it.
- Kill-switch thresholds are themselves parameters that need sensible
  choices; set too tight, they retire strategies on normal variance, set
  too loose, they fail to protect capital in time — there's no universal
  correct threshold, only the principle of deciding them in advance.
- This is operational risk management for live strategies, not investment
  advice, and following it does not guarantee avoiding losses, only
  bounding them earlier than an unmonitored strategy would.

## Sources consulted

Recent (2026) practitioner writeups on live-vs-backtest divergence
monitoring, alpha decay detection as an early-warning signal (including
Minimum Regime Performance-style regime-broken-out evaluation), kill-switch
practices at systematic trading desks, and industry guidance on minimum
live-trade sample sizes before drawing statistical conclusions. Described
here in original wording; no code or text copied from any source.
