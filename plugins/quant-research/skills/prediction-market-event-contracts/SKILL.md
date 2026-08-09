---
name: prediction-market-event-contracts
description: Use when designing a strategy that trades binary yes/no event contracts on a prediction market (e.g. Kalshi, Polymarket) — pricing a contract against your own probability estimate, or arbitraging price gaps for the same event across platforms — a payoff structure (binary, bounded 0-1 outcome) fundamentally different from every price-series/spread/carry strategy already covered in this repo, and unusually accessible for small capital.
---

# Prediction Market / Event Contracts

Every other strategy archetype in this repo trades an instrument whose
price can move continuously and whose position can be sized fractionally
against volatility. A prediction-market contract pays out at a fixed 0 or
1 (or scales toward that) based on whether a discrete real-world event
occurs — a fundamentally different payoff shape, and one where minimum
position sizes and platform accessibility make this genuinely usable at
small capital in a way several other archetypes in this repo (convertible
arbitrage, institutional-scale merger arb diversification) are not.

## Core mechanics

- **A contract's price is a direct probability estimate** (roughly, price
  ≈ implied probability of the "yes" outcome) — the trade is comparing your
  own, independently-derived probability estimate for the event against
  the market's implied one, not forecasting a price series.
- **Platforms differ meaningfully in structure and regulation** — some
  (e.g. Kalshi) are regulated as Designated Contract Markets under a
  derivatives regulator with traditional banking on/off-ramps; others
  (e.g. Polymarket) settle in crypto — this affects custody, funding, fee
  structure, and regulatory protections, and should be understood per
  platform rather than assumed uniform across "prediction markets" as a
  category.
- **Categories span sports, politics, economics, and other scheduled or
  newsworthy events** — the information-edge approach differs by category
  (economic-release-driven markets connect to
  [[macro-nowcasting-economic-surprises]]; others depend on
  domain-specific expertise or faster information processing).

## Where an edge can come from

- **Cross-platform arbitrage on the same underlying event** — when two
  platforms price the same event's "yes" contract differently (gaps in the
  low single-digit percent range have been observed), taking opposing
  positions across both platforms can lock in a spread regardless of the
  outcome — this is a genuine, mechanically clean edge when it exists, but
  requires funded accounts on multiple platforms and fast enough execution
  that the gap hasn't closed by the time both legs are filled.
- **An independently-derived probability estimate that's more accurate
  than the market's**, applied to a specific domain — this requires actual
  edge in forecasting the underlying event (data analysis, domain
  expertise, faster information processing), the same discipline
  underlying every other signal source in this repo — a prediction market
  doesn't create edge, it's just a venue with a distinct payoff shape to
  express one.
- **A structural information/attention edge in a specific niche** — with
  a large fraction of trading volume concentrated in a few dominant
  categories (sports, politics), less-followed markets or categories may
  offer less-efficient pricing, analogous to the crowding logic already
  used in [[cross-sectional-equity-factor-investing]] and
  [[index-reconstitution-effect]].

## Guardrails

- **Treat this as a financial instrument requiring research, sizing, and
  risk management — not a gambling framing.** Position sizing discipline
  (see [[position-sizing-risk-management]]) applies exactly as it does to
  any other instrument; a binary payoff doesn't exempt it from that
  discipline, if anything it makes position-level risk more binary and
  sizing more important.
- **Cross-platform arbitrage isn't risk-free** — it requires both legs to
  actually fill at the observed prices, and execution lag or one platform
  moving before the second leg fills can turn an apparent arbitrage into a
  directional bet; this is the same execution-risk discipline covered in
  [[small-account-execution]].
- **Validate any systematic probability-estimation approach against actual
  historical outcomes**, not just plausibility — the same overfitting and
  multiple-testing discipline from [[purged-cv-backtesting]] and
  [[quant-experiment-tracking]] applies to a model that scores many events
  and picks the best-looking discrepancies.
- This is strategy-design methodology, not investment or gambling advice;
  regulatory status and legality of specific prediction market platforms
  varies by jurisdiction and should be independently verified, not assumed
  from this general description.
