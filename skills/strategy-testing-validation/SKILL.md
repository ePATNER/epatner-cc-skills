---
name: strategy-testing-validation
description: Use when building or changing the code that implements a strategy or data pipeline — writing unit/integration tests for feature and signal construction, sanity-checking data before it feeds a backtest, and staging a strategy through paper trading and limited-capital shadow mode before trusting it with real capital. This is about whether the implementation is correct, distinct from whether the backtest result is statistically valid.
---

# Strategy & Pipeline Testing

A strategy can be statistically validated (see [[purged-cv-backtesting]])
and still lose money because the code that implements it has a bug — an
off-by-one in a data index that leaks future information, a silent
feature-construction error that no amount of staring at the code catches,
a schema change upstream that quietly corrupts a column. This skill is
about correctness of the implementation itself, as its own testing
discipline separate from the statistical validation of results.

## Testing the code that builds features and signals

- **Unit test feature/signal construction against known, hand-computed
  cases**, not just "does it run without error." A function that computes
  a rolling volatility or a labeled outcome should be checked against a
  small worked example with a known correct answer.
- **Watch specifically for off-by-one indexing errors** — the single most
  common concrete cause of accidental look-ahead bias is a data-indexing
  bug (using today's close where only yesterday's was actually available),
  not a conceptual misunderstanding of the leakage risk.
- **Use independent replication for anything you can't verify by reading
  the code.** Some feature-construction bugs are silent — the implementation
  looks reasonable on structural review but is subtly wrong. Reimplementing
  a critical calculation a second, independent way and checking the two
  agree catches errors that code review alone does not.
- **Integration-test the full pipeline end-to-end**, checking that record
  counts and key aggregates tie out from raw data through to the final
  feature/signal set — rows silently dropped or duplicated partway through
  a pipeline are a common, easy-to-miss source of subtly wrong backtests.

## Sanity-checking data before it feeds a backtest

- **Automate checks for missing values, extreme outliers, and stale
  (unchanged/repeated) prices** before a dataset is used, not just as a
  one-time manual glance — deploy these as a standing check that runs
  every time data is refreshed, so a silent upstream data-quality change is
  caught immediately.
- **Validate schema on every ingestion**, especially for third-party or
  alternative data sources (see [[alternative-data-ingestion]]) — a
  quietly changed column name, type, or unit will not raise an error in a
  loosely-typed pipeline, it will just silently produce wrong numbers.

## Staged rollout before real capital

- **Paper trade the full pipeline end-to-end** (signal generation, order
  routing logic, execution monitoring, reconciliation) under live-like
  conditions before any capital is at risk — this validates the
  implementation, not the edge, and is a different check than the
  statistical backtest.
- **Move to a limited-capital / shadow mode next**, connected to real
  markets with real but small size, before scaling to full intended
  allocation — capital allocation should progress in stages (validation →
  paper → limited capital → full allocation), not jump straight from
  backtest to full size.
- **Treat each stage as a gate, not a formality** — a strategy that behaves
  differently in paper trading than in backtest (execution logic bugs,
  timing mismatches) should be fixed and re-validated at that stage, not
  carried forward on the assumption it'll sort itself out live.

## Guardrails

- This skill checks whether the implementation does what it's supposed to;
  it does not check whether the strategy is statistically sound (see
  [[purged-cv-backtesting]]) or whether costs are modeled realistically
  (see [[transaction-cost-slippage-modeling]]) — all are needed together.
- A passing test suite is necessary, not sufficient — tests only cover
  cases someone thought to check; combine unit tests with independent
  replication specifically for calculations where a silent, structurally-
  invisible error is plausible.
- Don't skip the paper-trading/shadow stage under time pressure to get a
  promising backtest into production faster — this stage exists
  specifically to catch the class of bugs that only appear once real
  execution mechanics are involved.
