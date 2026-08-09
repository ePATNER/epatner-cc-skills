# Rationale

**Status: draft, needs review before merging.**

## What it does

Guides evaluating a dividend capture strategy honestly: the ex-dividend
price mechanics are close to a wash by design, so the skill focuses on
where a real (if narrow) edge could actually come from — deviations in
how the market marks down price relative to the dividend, filtered by
trend/volatility conditions — and on two frictions that are easy to model
incorrectly: T+2 settlement timing and the US qualified-dividend
60-day holding-period tax rule, both of which materially affect whether
the strategy is worth running net of costs and taxes.

## Why included

Found via fresh search, picked up as the previously-queued (deprioritized)
candidate after two fresh-search candidates this firing (short-interest/
squeeze trading, convertible bond arbitrage) were both rejected — the
former for being explicitly flagged in current research as an unreliable
standalone predictor, the latter for requiring bond-market access and
delta-hedging infrastructure poorly suited to a small/retail account.
Dividend capture was deprioritized earlier for teaching a similar lesson
to `post-earnings-announcement-drift` and `options-income-strategies`
(naive edge erased by frictions), but it remains mechanically distinct
(ex-dividend price mechanics, settlement timing, dividend-specific tax
rules) and retail-accessible, which makes it a legitimate, if modest,
addition once more novel candidates were exhausted for this firing.

## Extent of expected help

The skill is deliberately honest that the core mechanic is close to
economically neutral by construction — the dividend is compensation
removed from the price, not free money. Any real edge has to come from a
second-order effect (deviation in the size/timing of the price
adjustment) or from risk-filtering (avoiding capture into an
adverse-trending or high-volatility name), not from the capture mechanic
itself. The primary practical value is the tax and settlement-timing
guardrails: these are the specific, easy-to-miss factors that turn an
apparently profitable pre-tax, pre-cost strategy into a net loser, and
making them explicit is more useful than presenting the strategy as a
reliable income source.

## Key risks / limitations

- The core mechanic is close to a wash before considering any secondary
  edge source; a strategy built on the mechanic alone, without validating
  a genuine pricing deviation, is unlikely to be profitable net of costs.
- The qualified-dividend tax holding period directly conflicts with fast
  capture cycles; ignoring this (or assuming it doesn't apply) can make a
  strategy look good on a pre-tax backtest while being a net loser after
  tax for a taxable account.
- T+2 settlement affects capital velocity for a systematic, many-cycle
  implementation and needs to be modeled as an operational constraint, not
  ignored.
- This is strategy-design methodology, not tax or investment advice — tax
  treatment is jurisdiction- and circumstance-specific and must be
  verified independently.

## Sources consulted

Recent (2026) writeups on dividend capture strategy mechanics (ex-dividend
price markdown magnitude, T+2 settlement timing, the US qualified-dividend
60-day/121-day holding-period rule, and systematic trend/volatility
filters used in practice). Described here in original wording; no code or
text copied from any source.
