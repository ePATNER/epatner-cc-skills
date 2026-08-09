# Rationale

**Status: draft, needs review before merging.**

## What it does

Guides designing a strategy around index reconstitution (addition/deletion)
events: the mechanical, price-insensitive forced buying/selling by
index-tracking funds, the documented overshoot-and-reversion pattern around
the effective date, structuring the trade in the announcement-to-effective
window (with a futures/basket overlay option for the volatile
reconstitution session itself), and crowding/execution guardrails specific
to this effect.

## Why included

Found via fresh search after 29 skills were already shipped. This is
genuinely distinct in mechanism from every other strategy archetype in the
repo (`statistical-arbitrage-pairs-trading`: reversion,
`trend-following-momentum`: continuation, `funding-rate-arbitrage`: carry,
`options-income-strategies`: short volatility,
`post-earnings-announcement-drift`: informational underreaction) — this one
is driven by forced, price-insensitive fund flows around a scheduled,
public event, not by a price relationship, a trend, a payment, volatility,
or news. It's also unusually well-timed as a category: 2026 index
methodology changes (e.g. a major US index family's shift to semi-annual
reconstitution) are actively increasing the frequency of this event.

## Extent of expected help

The most obvious version of this trade is well-known and heavily traded by
large market participants already, so the skill is explicit that a naive
"buy the add, sell the delete" implementation should be assumed crowded.
The more differentiated angle — trading the overshoot/reversion pattern
around the effective date rather than the initial anticipatory move — is
presented as the part more likely to retain edge, though this is itself
based on a documented pattern rather than a guarantee. For a small
operation, the realistic value is a scheduled, low-ambiguity event
(known dates, known mechanism) that's easier to plan around operationally
than most other signal sources in this repo, even if the raw edge is
modest and contested.

## Key risks / limitations

- This is one of the more crowded and well-known anomalies in equity
  markets given how directly it's tied to public, scheduled index
  methodology events that large index-tracking funds must act on — treat
  any backtested edge with extra skepticism given likely participation by
  much larger, faster capital.
- Execution during the reconstitution session itself is unusually
  difficult (extreme volume/volatility concentrated in a short window),
  which materially affects whether a backtested edge survives realistic
  costs — see `transaction-cost-slippage-modeling` for why this needs
  explicit, non-generic cost modeling for this specific event type.
- Index methodology and rebalancing frequency change over time (noted here
  via a concrete 2026 example), which changes both how often this
  opportunity occurs and how much capital is chasing it — this needs
  periodic re-verification, not a one-time assumption.
- This is strategy-design methodology, not investment advice, and does not
  guarantee that any specific reconstitution event or index family offers
  a tradeable, cost-surviving edge.

## Sources consulted

Recent (2026) reporting on major index reconstitution events (methodology
changes such as semi-annual vs. annual rebalancing, extreme volume
concentration in the reconstitution session, the anticipatory
overbought/oversold pattern in adds/deletes ahead of the effective date,
and use of futures/basket instruments to carry exposure through the
volatile window). Described here in original wording; no code or text
copied from any source.
