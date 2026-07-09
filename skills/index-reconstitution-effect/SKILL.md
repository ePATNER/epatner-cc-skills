---
name: index-reconstitution-effect
description: Use when designing a strategy around predictable, mechanical price pressure from index addition/deletion events (funds tracking an index must buy adds and sell deletes around the effective date) — a sixth strategy archetype, distinct from the others in this repo because the driver is forced fund-flow mechanics rather than a price relationship, trend, informational drift, or behavioral effect.
---

# Index Reconstitution / Addition-Deletion Effect

Every other strategy archetype in this repo bets on a price relationship,
a trend continuing, a structural payment, realized volatility, or investor
underreaction to news. This one is different in kind: it bets on
predictable, price-insensitive buying and selling forced by index-tracking
funds that must rebalance their holdings to match an index change,
regardless of their own view on the stock — a mechanical flow effect, not
an informational or behavioral one.

## The mechanism

- **When an index adds or removes a constituent, every fund tracking that
  index (passively or via a benchmark mandate) must buy the add and sell
  the delete around the effective date** to keep tracking error low — this
  demand/supply is largely price-insensitive, since the funds' mandate is
  to track the index, not to have a view on the stock.
- **Reconstitution events are scheduled and public** (announcement date,
  then a later effective date) — the trade opportunity is in the gap
  between when the market anticipates/prices in the change and when the
  actual mechanical flow occurs, not a surprise event like an earnings
  release.
- **Overshoot-and-reversion is a documented pattern**: anticipatory
  trading ahead of the effective date can push adds up and deletes down
  further than the eventual mechanical flow alone would justify, with at
  least part of that move reversing once the reconstitution-driven flow
  is complete and the index-related price pressure fades.

## Structuring the trade

- **Trade the anticipation window, not just the effective date itself** —
  by the time the actual reconstitution session arrives, much of the
  index effect is commonly already priced in; entering earlier in the
  announcement-to-effective-date window captures more of the move, at the
  cost of more directional risk if the anticipated flow doesn't fully
  materialize as expected.
- **Consider a basket/futures overlay for the volatile reconstitution
  window** rather than holding the raw equity position through the highest
  -volume, highest-volatility session — an equivalent index futures or
  basket position can carry exposure through the event with less exposure
  to that specific session's execution risk, then be swapped back once
  activity normalizes.
- **Watch for overshoot as the actual trade signal**, not just the
  announcement itself — if adds/deletes are pushed further than the
  mechanical flow alone would justify, the reversion after the effective
  date is arguably the cleaner, more specifically-timed trade than riding
  the initial anticipatory move.

## Guardrails

- **This is a crowded, well-known effect around major, closely-watched
  reconstitutions** (e.g. large index families' scheduled rebalances) —
  expect the most obvious version of this trade (buy the add, sell the
  delete, hold to the effective date) to be heavily arbitraged already;
  the overshoot/reversion timing nuance is where a differentiated edge, if
  any, is more likely to remain.
- **Volume and volatility during the reconstitution session itself are
  extreme** (a documented pattern shows a large fraction of daily volume
  concentrated in the closing minutes of the effective date) — this
  materially affects realistic execution/slippage assumptions (see
  [[transaction-cost-slippage-modeling]]) and should not be modeled as a
  normal trading session.
- Validate with the same rigor as any other strategy (see
  [[purged-cv-backtesting]]) using the actual historical schedule and
  composition-change data for the specific index family traded — index
  methodologies and rebalancing frequency change over time (a 2026 example:
  a major US index family moved from annual to semi-annual reconstitution),
  which affects both opportunity frequency and crowding dynamics and needs
  to be re-verified rather than assumed static.
