# Rationale

**Status: draft, needs review before merging.**

## What it does

Guides detecting distinct market regimes (via Hidden Markov Models over
interpretable features, complemented by change-point detection) and using
that signal to adapt a strategy — resizing/de-risking in turbulent states,
switching between strategy sleeves, and preferring smooth probabilistic
transitions over hard switches — plus specific guardrails against
regime-blind backtesting and black-box regime models.

## Why included

Several skills already added reference regime shifts as a source of risk
without a dedicated way to detect them: `classical-statistical-forecasting`
notes that fixed-parameter models misfit across regime changes,
`position-sizing-risk-management` and `portfolio-construction-small-capital`
both note that correlation and strategy behavior shift in stress regimes.
This skill is the missing detection layer those other skills assume exists.
It's also a direct, well-documented explanation for why short backtests
mislead — a strategy validated inside one regime says little about how it
survives a transition.

## Extent of expected help

Primarily a risk-control and robustness tool rather than a source of
forecasting alpha on its own: research suggests regime-aware sizing and
sleeve-switching produces smaller drawdowns and smoother performance than
static strategies, mainly by avoiding known-bad conditions rather than by
predicting returns more accurately. For an operation building multiple
micro-strategies, the more actionable value may be diagnostic — using
regime detection to understand *why* a strategy that looked good in
backtest is underperforming live, rather than only as a live switching
mechanism, which adds real complexity and its own failure modes.

## Key risks / limitations

- Regime models are subject to the same overfitting risk as any model;
  tuning state count or features until historical labels look clean
  produces a model that fits the past without predicting the future state
  reliably.
- A regime signal deployed as a black box, without documented failure
  conditions, can quietly stop reflecting reality and mislead exactly when
  it matters most — this is called out explicitly as a guardrail, not a
  minor caveat.
- Short backtests (six to twelve months) are a specific, common way
  regime-blindness produces misleadingly good metrics; this applies to
  evaluating the regime-aware system itself, not just the underlying
  strategy.
- This is a risk-adaptation and diagnostic tool, not investment advice, and
  does not itself validate whether the strategies being switched between
  are sound — that still requires [[purged-cv-backtesting]].

## Sources consulted

Recent (2026) writeups and practitioner guides on Hidden Markov Model-based
market regime detection (feature choice, state count, use in adaptive
sizing and strategy switching) and on regime-related quant pitfalls
(short-backtest regime blindness, black-box regime models without failure
analysis, factor/strategy cyclicality across regimes). Described here in
original wording; no code or text copied from any source.
