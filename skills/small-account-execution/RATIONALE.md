# Rationale

**Status: draft, needs review before merging.**

## What it does

Guides the order-execution layer specific to a small/retail-sized account:
deliberate order-type choice (market vs. limit, framed as speed vs. price
control), designing the broker API integration for realistic reliability
(protocol choice, rate limits, connection-drop handling, sandbox-based
paper trading), and staying aware that account-level regulatory constraints
for small accounts are subject to change.

## Why included

`transaction-cost-slippage-modeling` and `strategy-testing-validation`
(already added) both assume an execution layer exists and reference its
behavior (fill assumptions, paper trading) without specifying how to build
it. This skill is that missing last-mile layer, and it's where a
statistically sound, well-tested, correctly-sized strategy can still
underperform for reasons specific to small/retail account mechanics —
order type defaults that produce needless slippage, an execution layer that
doesn't handle a dropped broker connection gracefully, or an assumption
about account rules that's gone stale.

## Extent of expected help

Primarily about not losing edge at the last mile rather than creating edge:
correct order-type choice and realistic fill modeling prevent a specific,
common source of avoidable slippage (defaulting to market orders
everywhere), and robust handling of broker API reliability (rate limits,
disconnection) prevents unmanaged exposure from an execution-layer failure
unrelated to the strategy's actual signal quality. The regulatory-awareness
point is informational rather than prescriptive — flagging that small-
account rules change (the 2026 Pattern Day Trader rule replacement is used
as a concrete, dated example) rather than asserting a specific rule as
permanently true.

## Key risks / limitations

- Order-type guidance here is general; the right choice is strategy- and
  market-microstructure-specific, and backtesting the "didn't fill" case
  for limit orders realistically is itself nontrivial — this skill flags
  the need, not a complete solution.
- Broker API characteristics (rate limits, protocol support, sandbox
  fidelity) vary significantly by provider and change over time; specific
  numbers cited in research are illustrative of the range, not a
  recommendation of a specific broker.
- The regulatory example (2026 PDT rule replacement) is included as a
  concrete illustration that these constraints move, not as current legal
  guidance to rely on without independently verifying with the broker/
  regulator at the time of use — rules in this area are explicitly called
  out as needing periodic re-verification, not one-time confirmation.
- This is execution-engineering guidance, not investment or legal/
  regulatory advice, and does not itself validate whether a strategy is
  profitable after realistic execution — that still depends on the cost
  modeling and validation covered elsewhere.

## Sources consulted

Recent (2026) writeups on retail order-type selection and its slippage
impact, broker API protocol/rate-limit/reliability considerations for
automated trading (WebSocket vs. REST, sandbox fidelity for paper trading),
and reporting on the 2026 U.S. regulatory change replacing the Pattern Day
Trader equity threshold with a risk-based intraday margin framework.
Described here in original wording; no code or text copied from any
source.
