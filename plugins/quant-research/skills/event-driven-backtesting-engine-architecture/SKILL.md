---
name: event-driven-backtesting-engine-architecture
description: Use when choosing or building the backtesting simulator itself — deciding between a vectorized (batch array/pandas) engine and an event-driven (sequential, stateful) one, and structuring the simulation so it can't structurally leak future information. This is about the simulator's architecture, distinct from the statistical validation methodology in purged-cv-backtesting and the code-correctness testing in strategy-testing-validation.
---

# Event-Driven Backtesting Engine Architecture

A statistically rigorous validation scheme (purged CV, deflated Sharpe) and
a well-tested codebase can both still sit on top of a simulator whose
architecture makes leakage or unrealistic fills structurally possible. This
skill is about the simulator itself: how it's built determines what kinds
of errors are even possible, independent of how carefully the strategy on
top of it is validated or tested.

## Vectorized vs. event-driven, and when each is the right tool

- **Vectorized (batch array/pandas) backtesters process a whole dataset at
  once** — fast, good for broad hypothesis screening and robustness checks
  across many parameter/asset combinations, but they systematically
  overstate fills on illiquid names (assuming an order filled at the bar's
  mid/close price when a real order would have moved the price) and make
  it easier to accidentally reference a value that wouldn't have been known
  yet, because nothing in the architecture stops you.
- **Event-driven (sequential, stateful) backtesters process one event at a
  time**, mirroring how information actually arrives live — this
  structurally eliminates a class of look-ahead bias, since the simulation
  simply has no access to anything beyond the current point in time, and it
  forces realistic order/fill mechanics rather than assuming idealized
  execution. The cost is speed: an event-driven backtest commonly takes
  much longer to run than the equivalent vectorized one.
- **A common, practical workflow uses both**: vectorized backtests for
  fast, broad screening of many candidate ideas, then migrating promising
  candidates to an event-driven backtest for final validation before
  paper trading (see [[strategy-testing-validation]]) — treat the
  vectorized pass as a filter, not the final word on whether something
  works.
- **Reusing the same strategy code between backtest and live execution**
  (rather than a separate "backtest version" of the logic) removes an
  entire category of bugs where the backtested and live implementations
  quietly diverge — favor an engine/framework designed for this if
  building or choosing infrastructure from scratch.

## Structural leakage prevention

- **Enforce point-in-time data access at the engine level, not by
  convention.** The simulator should make it structurally impossible (or
  at least loud) for strategy code to read a value from beyond the current
  simulated time, rather than relying on every feature/signal author to
  remember not to — this is a stronger guarantee than the point-in-time
  discipline covered in [[alternative-data-ingestion]] and
  [[financial-feature-engineering]], which is data-level, not
  engine-level.
- **Use a survivorship-bias-free universe** (including delisted/acquired
  instruments for the backtest period) at the data layer feeding the
  engine — survivor-only backtests have been shown to overstate returns
  substantially, and this is a data-sourcing decision that the engine
  architecture should make easy to get right, not require special-casing.
- **Model realistic order/fill mechanics as a first-class part of the
  engine**, not a bolt-on cost adjustment applied after the fact — this
  connects directly to [[transaction-cost-slippage-modeling]], but the
  event-driven architecture is what makes genuinely realistic fill
  simulation (partial fills, order-book interaction, latency) possible at
  all, versus approximated after the fact.

## Guardrails

- Don't treat a fast vectorized backtest's result as final — it's suited
  to broad screening, not the last validation step before real capital;
  reserve that role for an event-driven pass plus the statistical
  validation in [[purged-cv-backtesting]].
- Engine choice doesn't replace multiple-testing discipline — running many
  quick vectorized screens across candidate strategies is still generating
  trials that need to be tracked (see [[quant-experiment-tracking]]), data
  snooping remains a risk regardless of engine speed.
- Building a fully custom event-driven engine is a real engineering
  undertaking; weigh that cost against adopting an existing open-source
  event-driven framework designed for this, especially at small-operation
  scale where engineering time is itself a scarce resource.
