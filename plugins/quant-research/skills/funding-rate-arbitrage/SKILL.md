---
name: funding-rate-arbitrage
description: Use when designing a delta-neutral carry strategy that collects funding/basis income (spot-vs-perpetual funding rate arbitrage, cash-and-carry basis trades, cross-exchange funding spreads) rather than betting on price direction or reversion — a third classic strategy archetype alongside statistical-arbitrage-pairs-trading (reversion) and trend-following-momentum (continuation).
---

# Funding Rate Arbitrage / Cash-and-Carry

Where [[statistical-arbitrage-pairs-trading]] bets on reversion and
[[trend-following-momentum]] bets on continuation, this strategy family
bets on neither — it holds offsetting spot and derivative positions to
collect a structural funding/basis payment while remaining
directionally neutral. It's the carry-trade archetype, the third classic
leg alongside the two already covered.

## Core mechanics

- **Spot-vs-perpetual funding arbitrage**: hold spot long and an equal-size
  perpetual futures short (or vice versa) so price moves net out, and
  collect the periodic funding payment paid between longs and shorts on
  the perpetual contract. When funding is positive, the long-spot/
  short-perpetual side collects; when it flips negative, the cash flow
  reverses.
- **Cash-and-carry basis trades** (the traditional-finance analog): hold
  spot and short a dated future, collecting the difference between the
  future's price and spot (the basis) as it converges toward expiry.
- **Cross-exchange funding-rate spreads**: when funding rates for the same
  instrument differ across venues, go long on the lower-funding venue and
  short on the higher-funding venue, capturing the spread rather than
  relying on funding direction at a single venue.

## Sizing and evaluating the trade

- **Compare the funding/basis income against realistic financing and
  transaction costs on both legs before assuming it's profitable** —
  funding income has been reported at levels that annualize very high
  during favorable periods, but every leg has its own trading and
  financing costs (see [[transaction-cost-slippage-modeling]]), and thin
  net spreads can be erased entirely by costs on either side.
- **Track funding-rate direction as a live risk, not a static assumption**
  — a positive funding rate that has favored one side can flip, reversing
  the cash flow; a strategy sized assuming funding stays favorable is not
  actually delta-neutral to that risk.
- **Monitor basis risk separately from funding-rate risk** — the spot and
  derivative legs can (temporarily) decouple beyond what the funding
  mechanism is meant to correct, especially during stress, which is a
  distinct risk from the funding payment itself reversing.

## The three risks specific to this family

- **Rate flip risk**: the funding/basis rate reverses direction, turning
  income into a cost on the same position.
- **Basis risk**: the hedge between legs isn't perfect in practice — price
  moves aren't always fully offsetting in the short run, especially around
  volatile events, which is a different exposure than pure funding-rate
  direction.
- **Execution/venue risk**: this strategy requires reliable simultaneous
  execution on two legs (and sometimes two venues) — see
  [[small-account-execution]] for the broader execution-reliability
  guidance, which applies with extra weight here since a failed or delayed
  fill on one leg turns a hedged position into an unhedged one.

## Guardrails

- This is not risk-free arbitrage despite the name — it's a real position
  with real, named risks (rate flip, basis, execution), and should be
  evaluated and sized with the same rigor as any other strategy (see
  [[position-sizing-risk-management]]), not treated as guaranteed income.
- Cross-exchange variants add counterparty/venue risk beyond a single-venue
  version — confirm both venues' reliability, withdrawal terms, and margin
  requirements before assuming the spread is safely capturable.
- Reported historical annualized returns for this strategy family vary
  enormously with market conditions (funding rates were reported very high
  in some periods and can be near zero or negative in others) — don't
  extrapolate a single favorable period's income rate forward as if it
  were stable.
