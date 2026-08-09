# Rationale

**Status: draft, needs review before merging.**

## What it does

Guides designing a delta-neutral carry strategy that collects funding/basis
income — spot-vs-perpetual funding arbitrage, cash-and-carry basis trades,
cross-exchange funding-rate spreads — including the three named risks
specific to this family (rate flip, basis risk, execution/venue risk) and
the need to weigh income against realistic costs on both legs before
assuming profitability.

## Why included

Found via fresh search after 21 skills were already shipped. This completes
a natural trio with `statistical-arbitrage-pairs-trading` (reversion) and
`trend-following-momentum` (continuation): funding/carry arbitrage is
directionally neutral to both, betting on a structural payment rather than
a price relationship. It's a genuinely distinct strategy archetype, not a
variation on either already-covered family, and is specifically relevant to
crypto perpetual futures markets, which are readily accessible to a
small-capital operation in a way many institutional strategies aren't.

## Extent of expected help

This is a real, actively used strategy family with documented periods of
attractive income, but the skill is written to counter the common
misconception baked into its casual name ("arbitrage") — it is not
risk-free, and net profitability depends on funding income clearing real
costs on both legs plus surviving rate-flip and basis risk. For a small
operation, the practical value is a third genuinely different strategy
archetype to diversify a multi-strategy book against (see
`portfolio-construction-small-capital`), with a return driver (funding
income) that doesn't depend on price direction or mean-reversion/momentum
being correct.

## Key risks / limitations

- Funding rates are not stable; income from a favorable period is not
  representative of a baseline expected rate, and a rate flip can turn the
  position from income-generating to cost-generating without a change in
  the underlying price relationship.
- Execution reliability matters more here than for many single-leg
  strategies — a delayed or failed fill on one leg during the brief window
  before the other leg executes turns a hedged, market-neutral position
  into an unintentionally directional one.
- Cross-exchange variants add real counterparty and venue risk (withdrawal
  limits, margin requirements, platform reliability) that a single-venue
  version doesn't have, and this skill flags but does not eliminate that
  added risk.
- This is strategy-design methodology, not investment advice, and
  historical funding-income figures cited in research are illustrative of
  the strategy's mechanics, not a forecast of future returns for any
  reader's specific implementation.

## Sources consulted

Recent (2026) writeups and research on crypto perpetual futures funding-
rate arbitrage mechanics (spot-vs-perpetual delta-neutral construction,
cross-exchange funding spreads, reported funding-rate levels and
annualized income in early 2026, the named rate-flip/basis/execution
risks) and general cash-and-carry basis trading as the traditional-finance
analog. Described here in original wording; no code or text copied from
any source.
