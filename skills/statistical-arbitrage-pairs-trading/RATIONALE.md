# Rationale

**Status: draft, needs review before merging.**

## What it does

Guides designing a statistical arbitrage / pairs trading strategy:
testing for cointegration (not just correlation) between instruments,
deriving a hedge ratio, setting spread-based entry/exit and stop rules
distinct from directional profit targets, and considerations specific to
basket/cross-sectional variants and a small-capital, multi-strategy
context.

## Why included

Found via fresh search after 18 skills (the seeded checklist plus four
mid-loop additions) were already shipped. This fills a category genuinely
different in kind from everything else in the repo: every other skill is a
methodology or infrastructure layer (forecasting technique, feature
construction, validation, risk sizing, execution, monitoring) that applies
across strategies, while this one is an actual, concrete strategy family —
directly responsive to the stated goal of "creating new strategies and
micro-strategies," which the other skills support but don't themselves
constitute.

## Extent of expected help

Stat arb/pairs trading is a long-established, foundational quant strategy
family with genuine (if compressed, per current commentary) edge in
well-executed form — the primary value of this skill is in the specific,
well-known failure mode it guards against (using correlation where
cointegration is required) and in framing the strategy's real
probabilistic nature (a real edge that still loses on individual trades,
not a locked-in arbitrage). For a small operation, the multi-leg cost
structure and the compressed edges in heavily-traded pairs are flagged as
real constraints on expected value, not just theoretical caveats.

## Key risks / limitations

- Cointegration can and does break down (mergers, structural business
  changes, regime shifts); a pair validated once needs ongoing
  re-verification, not a one-time check.
- This strategy family is old and well-known, with edges reported to have
  compressed significantly since it became widely practiced — a small
  operation should have realistic expectations about margin size,
  especially in liquid, commonly-traded pairs.
- Searching over many candidate pairs for cointegration is itself a large
  multiple-testing exercise and needs the same trial-tracking and
  statistical correction discussed in `quant-experiment-tracking` and
  `purged-cv-backtesting` — it's easy to "discover" a spuriously
  cointegrated pair by testing enough candidates.
- Multi-leg transaction costs compound faster than single-instrument
  strategies with the same nominal edge; realistic cost modeling (see
  `transaction-cost-slippage-modeling`) is especially important here.
- This is strategy-design methodology, not investment advice, and does not
  guarantee that any specific pair or basket has a real, tradeable edge —
  that still requires the validation covered elsewhere in this repo.

## Sources consulted

Recent (2026) writeups on statistical arbitrage and pairs trading
methodology (cointegration vs. correlation, hedge ratio derivation,
spread-based entry/exit rules, basket and cross-sectional variants) and
commentary on the strategy family's history, prevalence at major
quantitative funds, and edge compression over time. Described here in
original wording; no code or text copied from any source.
