# Rationale

**Status: draft, needs review before merging.**

## What it does

Guides setting up research-process discipline for strategy development:
logging a falsifiable hypothesis before each experiment, recording exact
data versions and code references for reproducibility, and — critically —
logging failed/abandoned experiments with the same rigor as successful
ones so the eventual trial count used for multiple-testing correction is
honest.

## Why included

`purged-cv-backtesting` (already added) explains how to correct a backtest
result for the number of variants tried, using the Deflated Sharpe Ratio
and Probability of Backtest Overfitting — but that correction is only as
good as the trial count fed into it. This skill is the missing
infrastructure layer: without a research log that captures every attempt,
including abandoned ones, the trial count is undercounted by construction,
and the "corrected" result is still too optimistic. For an operation
explicitly planning many strategies and micro-strategies, the number of
informal, unlogged experiments will be large, which makes this discipline
more valuable here than in a slower-moving research process.

## Extent of expected help

Indirect but foundational: this skill doesn't itself validate or improve
any strategy, but it's a precondition for the validation in
`purged-cv-backtesting` being trustworthy at all. It also provides a
practical, secondary benefit — reproducibility — that matters once a
strategy is a candidate for going live and its exact configuration needs to
be recovered with confidence (feeding into
[[live-backtest-drift-monitoring]], which needs to know precisely what was
originally validated in order to detect drift from it).

## Key risks / limitations

- The discipline only works if it's actually maintained; a tracking system
  that's set up but not consistently used provides false confidence rather
  than the intended safeguard.
- Logging every experiment, including failures, adds real overhead to a
  fast-moving research process — the guardrail explicitly favors a simple,
  consistently-used log over a sophisticated but abandoned tool for this
  reason.
- Even a complete research log doesn't eliminate multiple-testing risk on
  its own; it only makes the correction in `purged-cv-backtesting` accurate
  rather than falsely reassuring. The two skills need to be used together.
- This is research-process methodology, not investment advice, and does
  not itself determine whether any given strategy is sound.

## Sources consulted

Recent (2026) writeups on MLOps practices for quantitative trading teams
(experiment tracking as a "lab notebook," versioning data/models for
reproducibility) and on structured, hypothesis-driven quant research
workflows (falsifiable hypothesis schemas, research logs, and rule-of-thumb
sanity checks on implausibly high Sharpe ratios as a signal of
undisclosed multiple testing or methodology error). Described here in
original wording; no code or text copied from any source.
