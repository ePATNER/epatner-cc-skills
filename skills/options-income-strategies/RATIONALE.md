# Rationale

**Status: draft, needs review before merging.**

## What it does

Guides designing systematic options premium-selling strategies (covered
calls, cash-secured puts, credit spreads, and capital-efficient variants
like the "poor man's covered call"), covering trade screening/structuring
and — the load-bearing part — the shared negative-skew risk profile this
whole family has, and why a high headline win rate is not evidence of
safety.

## Why included

Found via fresh search after 25 skills were already shipped. This is a
fourth genuinely distinct strategy archetype alongside
`statistical-arbitrage-pairs-trading` (reversion),
`trend-following-momentum` (continuation), and `funding-rate-arbitrage`
(carry) — this one bets on realized volatility coming in below what
options prices imply, a different return driver from all three. It's also
directly relevant to limited capital: the capital-efficient variants
(replicating a covered call's mechanics with a fraction of the capital a
literal covered call needs) are specifically useful for a small account
that couldn't otherwise afford 100 shares of many candidate underlyings.

## Extent of expected help

Genuinely useful as a systematic income source when structured and sized
correctly, but this skill is deliberately weighted toward the risk-shape
warning over the mechanics, because marketed versions of this strategy
family commonly emphasize win rate and monthly income figures without
equal prominence for the tail-loss risk that's structurally part of the
same trade. The realistic value for a small operation is a genuinely
different-shaped return stream (short-volatility income) to diversify a
multi-strategy book — but only if position-sized for the loss scenario,
not the modal outcome, which is the main thing this skill tries to ensure
isn't skipped.

## Key risks / limitations

- The core risk this skill flags explicitly: reported high win rates
  (routinely 90%+ in marketing material) are an expected, mechanical
  consequence of this strategy's negative-skew shape, not evidence of low
  risk — the rare large loss is the actual risk to size for.
- Assignment/early-exercise mechanics add real operational complexity that
  a purely directional position doesn't have; getting this wrong is an
  execution-layer risk distinct from the strategy's market risk.
- Options-specific transaction costs (wider spreads as a fraction of
  premium than the underlying typically has) can materially erode the net
  economics of a premium-selling strategy if not modeled explicitly.
- This strategy family's tail risk is plausibly correlated with the same
  broad-market stress events that hurt directional strategies, which
  undermines a naive assumption that it diversifies a multi-strategy book
  — that needs to be checked empirically, not assumed.
- This is strategy-design methodology, not investment advice, and does not
  constitute a guarantee of the income levels or win rates cited in
  publicly available marketing material, which this skill treats
  skeptically rather than endorses.

## Sources consulted

Recent (2026) writeups on covered call, cash-secured put, and credit spread
mechanics, capital-efficient variants (poor man's covered call), and
underlying/liquidity screening criteria, alongside general recognition in
this literature (and broader options-trading risk literature) of the
negative-skew, high-win-rate/rare-large-loss shape shared by
premium-selling strategies. Marketed win-rate and income figures are
reported here only as illustrative of how this strategy family is
typically presented, not endorsed as representative or reproducible.
Described here in original wording; no code or text copied from any
source.
