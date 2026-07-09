# Rationale

**Status: draft, needs review before merging.**

## What it does

Guides designing a post-earnings-announcement drift (PEAD) strategy:
measuring earnings surprise magnitude (not just beat/miss), holding
through the documented drift window, and constructing it cross-sectionally
(long large positive surprises, short large negative ones) — with heavy
emphasis on the specific, well-documented trap where the strategy's
apparent edge is largest exactly in the illiquid names where transaction
costs are most likely to consume it entirely.

## Why included

Found via fresh search after 28 skills were already shipped, as the
deferred candidate queued in the previous firing (after
`trading-credentials-security` was prioritized ahead of it that round).
This is a fifth genuinely distinct event-driven strategy archetype,
alongside `statistical-arbitrage-pairs-trading` (reversion),
`trend-following-momentum` (continuation), `funding-rate-arbitrage`
(carry), and `options-income-strategies` (short volatility) — PEAD bets on
a specific behavioral underreaction effect tied to a discrete event
(an earnings release), a different return driver from all four already
covered.

## Extent of expected help

PEAD is one of the most extensively documented anomalies in empirical
finance, with a long academic track record — but the skill is deliberately
weighted toward the transaction-cost trap because the research is
unusually clear and quantified on this point: illiquid-name paper returns
are large, but realistic trading frictions have been shown to consume the
large majority of that apparent profit in the median study. The practical
value for a small operation is exactly that clarity — it's a strategy
family where the "obvious" implementation (chase the biggest paper drift
in small/illiquid names) is close to a known trap, and the skill exists to
head that off before the operation learns it the expensive way.

## Key risks / limitations

- The effect's magnitude is reported to have declined over time in
  developed markets as more capital has targeted it; historical drift
  figures should be treated as an upper bound to validate against recent
  data, not a stable expected return.
- Evidence on net (after-cost) profitability is genuinely mixed in the
  literature — some studies find close to zero abnormal profit after
  costs, others find significant remaining profit — which is presented
  here as a reason for careful net-of-cost validation on your own data,
  not as a settled conclusion either way.
- Earnings-surprise data has its own point-in-time integrity requirements
  (consensus estimates get revised, earnings dates/times need accurate
  provenance); a signal that looks simple can still leak look-ahead bias
  if the underlying data isn't handled carefully.
- This is strategy-design methodology, not investment advice, and
  published academic PEAD returns are historical, sample-specific figures,
  not a guarantee of future or personally reproducible performance.

## Sources consulted

Recent (2026) writeups and established academic literature on
post-earnings-announcement drift (earnings surprise magnitude and drift
relationship, cross-sectional long-short construction, the documented
decline in effect magnitude over time) and specifically on the
liquidity/transaction-cost dynamic (illiquid names showing larger gross
drift returns but transaction costs consuming a large majority — commonly
cited in the 70-100% range — of that apparent profit). Described here in
original wording; no code or text copied from any source.
