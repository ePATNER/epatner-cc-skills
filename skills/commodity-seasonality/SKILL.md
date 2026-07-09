---
name: commodity-seasonality
description: Use when designing a strategy around recurring commodity price patterns driven by physical supply/demand cycles (agricultural planting/harvest, energy heating/driving seasons, industrial inventory cycles) — a seventh strategy archetype, distinct from every other archetype in this repo because the driver is a physical/real-world cycle rather than a price relationship, fund flow, informational drift, or behavioral effect.
---

# Commodity Seasonality

Where equity calendar anomalies (day-of-week, January effect) are
behavioral patterns that current research shows have largely been
arbitraged away, commodity seasonality has a different and more durable
basis: physical production and consumption cycles that don't disappear
just because more capital notices them — a harvest happens once a year
regardless of how many traders are positioned for it. That physical
grounding is what makes this a genuinely distinct strategy archetype, not
a variant of the equity calendar effects already rejected as too thin.

## The physical drivers

- **Agricultural commodities follow planting-growing-harvest-storage
  cycles**: prices tend to be tightest ("old crop") in the months before a
  harvest as the prior year's supply is drawn down, and loosen ("new
  crop") once the harvest arrives — e.g. a documented pattern of corn
  prices softening into the North American autumn harvest window.
- **Energy commodities follow demand cycles tied to weather and
  travel**: winter heating demand and summer driving-season demand create
  recurring seasonal demand peaks distinct from any price-relationship or
  trend signal.
- **Industrial metals follow production/construction cycles**: inventory
  building ahead of a construction season, tied to manufacturer and miner
  behavior, is a different mechanism again from either agricultural or
  energy seasonality — don't treat "commodity seasonality" as one uniform
  pattern; each commodity class has its own physical calendar.

## Building and validating a seasonal strategy

- **Ground the hypothesis in the actual physical cycle for that specific
  commodity**, not just a historical price pattern found by scanning —
  a seasonal pattern with a genuine physical driver is a fundamentally
  different (more durable) claim than a pattern that's merely
  statistically present in historical data with no identified cause; this
  connects directly to the falsifiable-hypothesis-first discipline in
  [[automated-alpha-mining]] and [[quant-experiment-tracking]].
- **Validate out-of-sample and expect genuine variability year to year** —
  weather, geopolitics, and demand shocks mean any single year can deviate
  substantially from the seasonal norm; treat a seasonal pattern as a
  probabilistic tilt, not a reliable calendar-driven certainty (see
  [[purged-cv-backtesting]] for the walk-forward discipline this needs).
- **Combine seasonal strategies with other systematic strategies rather
  than running them in isolation** — seasonality-driven and
  trend/carry-driven signals in commodities are reported to be
  meaningfully uncorrelated, which is directly useful for
  [[portfolio-construction-small-capital]] rather than a strategy to run
  alone.

## Fit for a small-capital operation

- **Futures are the standard instrument for expressing commodity
  seasonality**, which brings leverage and margin considerations distinct
  from equity strategies elsewhere in this repo — size and risk-manage
  accordingly (see [[position-sizing-risk-management]]), since futures
  leverage changes the effective risk of a given nominal position size
  substantially versus a cash equity position.
- **2026 macro conditions matter for calibrating expectations** — current
  commodities outlooks describe a more bearish, oversupplied backdrop in
  some markets, which affects the baseline level prices are seasonally
  fluctuating around, not just the seasonal pattern itself; don't validate
  a seasonal strategy purely on historical data without checking whether
  the current supply/demand backdrop has shifted structurally.

## Guardrails

- Don't assume all commodities share one seasonal calendar — validate each
  instrument's specific physical cycle rather than applying a generic
  "commodities are seasonal" prior.
- A statistically-found seasonal pattern without an identifiable physical
  driver is closer in kind to the equity calendar anomalies already judged
  too thin for a standalone skill — the physical-driver requirement is
  what earns this category inclusion, and diligence should hold that bar
  for any specific pattern considered.
- This is strategy-design methodology, not investment advice; commodity
  markets carry real leverage, margin, and structural-shift risk beyond
  what the seasonal pattern itself describes.
