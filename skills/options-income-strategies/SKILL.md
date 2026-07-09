---
name: options-income-strategies
description: Use when designing a strategy that systematically sells option premium for income (covered calls, cash-secured puts, credit spreads) rather than forecasting direction or reversion — a fourth strategy archetype (short-volatility/theta harvesting) alongside statistical-arbitrage-pairs-trading, trend-following-momentum, and funding-rate-arbitrage, including the capital-efficient variants and the negative-skew risk profile this family shares.
---

# Options Income Strategies

Where the strategy archetypes already covered bet on reversion, continuation,
or a structural payment, this family bets on *volatility being lower than
what the option price implies* — selling option premium and collecting
time decay (theta) as income. It has a distinctive risk shape (frequent
small wins, occasional large losses) that needs to be understood and sized
for explicitly, not glossed over by a headline win rate.

## Core constructions

- **Covered calls**: own the underlying, sell a call against it, collect
  premium; caps upside above the strike in exchange for income. Requires
  owning (or being willing to own) 100 shares per contract — a real capital
  requirement for the plain version.
- **Cash-secured puts**: hold cash sufficient to buy the underlying at the
  strike, sell a put, collect premium; obligates buying the underlying at
  the strike if assigned — effectively getting paid to place a limit buy
  order, with the premium as compensation.
- **Credit spreads** (selling one option and buying a further
  out-of-the-money option of the same type as protection): defines and
  caps the maximum loss in exchange for a smaller net premium than an
  uncovered short option — the defined-risk structure is specifically
  useful for a capital-constrained account where an uncapped loss isn't
  tolerable.
- **Capital-efficient variants** (e.g. a "poor man's covered call": a
  deep-in-the-money, longer-dated long call in place of owning the
  underlying, with a short-dated call sold against it) replicate the
  covered call's income mechanics using a fraction of the capital a true
  covered call requires — directly relevant for a small account that can't
  afford 100 shares of every candidate underlying.

## Screening and structuring the trade

- **Underlying/contract liquidity matters as much as the underlying's
  fundamentals** — thin options volume and wide bid-ask spreads erode the
  premium captured and make entering/exiting difficult; screen for
  adequate options volume and reasonably tight spreads, not just a
  favorable-looking stock.
- **Implied volatility level affects the trade's attractiveness in both
  directions** — higher IV means richer premium collected, but also
  signals the market expects (and is pricing in) larger moves; a high
  premium is compensation for real risk, not free money.
- **Systematize strike/expiration selection** (e.g. target
  delta/probability-of-assignment bands, target days-to-expiration) rather
  than picking case by case, so the strategy's risk profile is consistent
  and its historical results are actually comparable across trades — this
  also makes it something that can be validated with the same rigor as any
  other strategy (see [[purged-cv-backtesting]]).

## The risk profile this family shares, and why headline win rates mislead

- **This is structurally a negative-skew (short-volatility) profile**:
  many small wins from collected premium, with the potential for
  occasional large losses when the underlying moves sharply against the
  position — a high reported win rate (often 90%+) is expected and
  consistent with this shape, not evidence the strategy is safe; it's the
  same statistical shape as "picking up pennies in front of a
  steamroller," and the rare loss can be large enough to erase many
  periods of prior gains.
- **Position sizing must account for the tail, not the modal outcome** —
  size for the loss scenario the strategy is structurally exposed to (see
  [[position-sizing-risk-management]]), not for the frequent small-win
  case, and consider whether a portion of collected premium should fund
  explicit tail protection (see [[tail-risk-hedging]]) given the shared
  short-volatility exposure.
- **Assignment and early-exercise risk add operational complexity**
  beyond a simple directional position — a covered call or cash-secured
  put can be assigned before expiration under some conditions, which the
  execution/operational layer needs to handle (see
  [[small-account-execution]]), not just the strategy logic.

## Guardrails

- Treat marketed win rates and annualized income figures from any single
  source skeptically until validated on your own point-in-time options
  data — options income strategies are commonly marketed on their frequent
  small wins without equally prominent disclosure of tail-loss risk.
- Model realistic bid-ask spread costs on options specifically — spreads
  on options are typically wider (as a fraction of premium) than on the
  underlying, and this materially affects a premium-selling strategy's net
  economics (see [[transaction-cost-slippage-modeling]]).
- This strategy family shares meaningful tail risk with a broad market
  selloff; don't treat it as uncorrelated to directional strategies in a
  multi-strategy book (see [[portfolio-construction-small-capital]]) without
  verifying that assumption empirically.
