# Rationale

**Status: draft, needs review before merging.**

## What it does

Guides designing a trend-following/momentum strategy — time-series
momentum, moving-average crossovers, breakout systems, multi-horizon
blending — with a specific emphasis on the well-documented core failure
mode (whipsaw in non-trending/choppy markets) and the regime/volume/trend
filters used to guard against it.

## Why included

Found via fresh search after 20 skills were already shipped. This is the
direct directional counterpart to `statistical-arbitrage-pairs-trading`
(already added): that skill bets on reversion to a historical relationship,
this one bets on continuation of an existing move. Together they cover the
two classic, foundational systematic strategy archetypes, and
`portfolio-construction-small-capital` (already added) specifically
mentions combining trend-following and mean-reversion as complementary —
this skill is what fills in the trend-following side of that pairing,
which hadn't been written yet.

## Extent of expected help

Trend-following/time-series momentum is one of the most extensively
academically documented systematic effects (the basis of the
managed-futures/CTA fund industry) and has genuine long-run evidence behind
it, distinct from many more speculative or recently-discovered signal
types covered elsewhere in this repo. The practical value for a small
operation is 1) a well-understood, implementable strategy family with a
long track record, and 2) making the whipsaw failure mode and its
mitigations explicit up front, since it's the most common way a naively
implemented version of this strategy underperforms — not an exotic risk,
the default risk.

## Key risks / limitations

- Trend-following has a structurally lower win rate with a few large wins
  offsetting many small losses; evaluating it by win rate rather than
  expectancy will make a working strategy look broken.
- Whipsaw in range-bound/choppy markets is unavoidable to some degree even
  with good filters — the filters reduce but don't eliminate this failure
  mode, and the skill is explicit that some losses from this are normal,
  not evidence of a bug.
- The strategy has many tunable parameters (lookback lengths, filter
  thresholds, which horizons to blend), making it especially easy to
  overfit to a specific historical period if not validated with proper
  walk-forward, multiple-testing-aware discipline.
- Performance and diversification value versus other strategies (like
  pairs trading) is regime-dependent and not permanently stable — this
  needs the same periodic re-verification flagged in
  `portfolio-construction-small-capital` for any assumed low correlation.
- This is strategy-design methodology, not investment advice, and a
  strategy following this guidance is not guaranteed to be profitable —
  that still requires the validation, cost modeling, and risk management
  covered elsewhere in this repo.

## Sources consulted

Recent (2026) writeups and established academic literature on time-series
momentum and managed-futures/trend-following strategies (including the
Moskowitz-Ooi-Pedersen time-series momentum literature), and practitioner
guidance on momentum/breakout strategy pitfalls (whipsaw in range-bound
markets, the role of trend/volume/regime filters in reducing false
signals). Described here in original wording; no code or text copied from
any source.
