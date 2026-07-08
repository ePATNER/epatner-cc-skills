# Rationale

**Status: draft, needs review before merging.**

## What it does

Guides building a transaction cost model (spread, commission, execution
slippage, and market impact where relevant) sized correctly for account
size and instrument liquidity, and stresses re-running backtests under
realistic costs rather than a zero/flat-cost assumption. Distinguishes what
actually dominates cost for a small account (spread/commission/slippage)
from what dominates for large institutional orders (market impact), so the
wrong model isn't imported by default.

## Why included

The `purged-cv-backtesting` skill (already added) validates whether a
backtest result is statistically real; this skill addresses a separate and
equally common way backtests mislead — being statistically valid but
economically unrealistic because costs were ignored or modeled wrong for
the account's actual size. Both are needed before trusting a number. This
is a frequently cited, specific reason retail/small-capital strategies work
in backtest and fail live, which makes it a priority for an operation
explicitly building many small strategies.

## Extent of expected help

Directly protective rather than performance-improving: correctly modeling
costs won't make a strategy better, but it will correctly show whether an
apparent edge survives real trading friction before capital is committed.
For a small account in liquid instruments, the main value is avoiding
overcomplicating the cost model with institutional market-impact math that
doesn't apply; for thinner/illiquid instruments, the value is the opposite
— recognizing that impact is not negligible and needs modeling. Getting
this sized correctly for the actual account/instrument combination is the
main contribution.

## Key risks / limitations

- Getting the wrong cost regime (assuming market impact dominates when it
  doesn't, or vice versa) either wastes effort on unnecessary modeling
  complexity or misses a real cost source — this needs to be checked per
  instrument, not assumed once.
- Realistic spread/slippage data is harder to obtain than it sounds
  (historical spread data is often not included in standard price
  datasets); a cost model is only as good as the cost data feeding it.
- This skill does not itself determine whether a strategy is profitable —
  it's a necessary correction applied on top of a statistically validated
  result, not a replacement for that validation.
- Not investment advice; a strategy that survives realistic cost modeling
  is still not a guarantee of live profitability, which also depends on
  execution quality, capacity, and market conditions changing.

## Sources consulted

Research and practitioner writeups (2025-2026) on incorporating realistic
transaction costs into algorithmic trading backtests, on why zero/low-cost
backtests fail to predict live retail trading performance, and on the
square-root law of market impact and its applicability boundary (large
institutional orders vs. small retail-sized orders in liquid instruments).
Described here in original wording; no code or text copied from any
source.
