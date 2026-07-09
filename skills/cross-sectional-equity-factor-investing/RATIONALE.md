# Rationale

**Status: draft, needs review before merging.**

## What it does

Guides building a cross-sectional factor strategy: ranking a universe of
instruments against each other on a characteristic (value, momentum,
quality, size), constructing decile-based long-short or long-only-tilt
portfolios, cross-sectional standardization, and constraints specific to
small-capital implementation (short-borrow access, gross exposure
management, universe breadth needed for stable deciles).

## Why included

Found via fresh search after 24 skills were already shipped, as the
deferred candidate queued in the previous firing. This is methodologically
distinct from every time-series-based skill already in the repo
(`trend-following-momentum`, `statistical-arbitrage-pairs-trading`,
`deep-learning-forecasting-models`, `classical-statistical-forecasting`):
those all ask what a given instrument (or pair) will do next based on its
own history; this asks how instruments compare to each other right now and
trades the spread. It's also explicitly flagged as distinct even where
terminology overlaps — cross-sectional momentum uses the same word as
time-series momentum but is a different construction, which the skill
calls out directly to prevent the two being conflated.

## Extent of expected help

Cross-sectional factor premiums (value, momentum, quality, size) are among
the most extensively documented effects in empirical asset pricing
research, with 2026 commentary suggesting they persist, if somewhat
smaller than historical averages. The practical value for a small operation
is nuanced: full long-short implementation has real constraints (short
availability/cost, gross exposure management) that don't apply to most of
the other strategy families already covered, so the skill explicitly
surfaces a long-only-tilt variant as a more accessible fallback rather than
presenting the textbook long-short construction as the only option.

## Key risks / limitations

- Short-selling access, cost, and availability is a genuine constraint for
  many small/retail accounts and is not a minor implementation detail —
  it changes both what's achievable and the effective leverage/risk
  profile of the strategy.
- This strategy family needs a reasonably broad universe to work as
  intended (averaging a small edge across many names); a small operation
  tracking too narrow a universe manually undermines the statistical
  premise, which is why the skill flags this as needing more automation
  than most other strategies already covered.
- Well-known factor implementations are subject to crowding risk (the
  literature suggests simple, easy-to-implement factors in liquid large
  caps are more exposed to this than complex, higher-turnover, or
  smaller-cap variants), which trades off against the higher transaction
  costs of the less-crowded alternatives.
- This is strategy-design methodology, not investment advice; historical
  factor premiums are not a guarantee of future performance, and the
  strategy still requires the validation, cost modeling, and risk
  management covered elsewhere in this repo before capital is committed.

## Sources consulted

Recent (2026) research and practitioner writeups on cross-sectional factor
investing construction (decile/rank-based long-short and long-only
approaches, cross-sectional standardization, standard cross-sectional
momentum construction distinct from time-series momentum) and on factor
crowding, gross-exposure management for long-short strategies, and
small-account/liquidity constraints specific to implementing this family.
Described here in original wording; no code or text copied from any
source.
