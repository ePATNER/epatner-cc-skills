# Rationale

**Status: draft, needs review before merging.**

## What it does

Guides testing the correctness of the code implementing a strategy or data
pipeline — unit-testing feature/signal construction against known cases,
using independent replication for calculations where a silent bug wouldn't
be visible from code review alone, sanity-checking data automatically for
missing values/outliers/stale prices and schema drift, and staging a
strategy through paper trading and limited-capital shadow mode before
committing full capital.

## Why included

`purged-cv-backtesting` (already added) validates whether a backtest result
is statistically real given a correct implementation; it explicitly assumes
the code computing the signal is correct. This skill is the missing
assumption check — a strategy can pass every statistical validation and
still fail because of an implementation bug (a data-indexing off-by-one, a
silently corrupted pipeline stage, a schema change nobody noticed).
Requested explicitly as part of covering skills across the full software
lifecycle, this is the testing-phase counterpart to the research/validation
skills already added.

## Extent of expected help

Directly protective against a specific, well-documented and easy-to-miss
class of errors: silent feature-construction bugs and data-indexing
mistakes are cited as a common, structurally-invisible cause of accidental
look-ahead bias — exactly the kind of error that produces a great-looking
backtest for the wrong reason. The staged-rollout guidance (paper trading →
limited capital → full allocation) is separately protective against a
different failure mode: an implementation that's correct in backtest
simulation but behaves differently once real order routing, execution
timing, and reconciliation are involved.

## Key risks / limitations

- Independent replication of a calculation is more expensive than trusting
  a single implementation, and isn't warranted for every calculation — it's
  recommended specifically for cases where a bug could plausibly be
  structurally invisible on code review, not universally.
- Data sanity checks (missing values, outliers, stale prices, schema
  validation) catch a specific class of data-quality problems but do not
  substitute for the deeper point-in-time integrity checks covered in
  [[alternative-data-ingestion]] — both are needed.
- Staged rollout (paper → shadow/limited capital → full) takes real time
  and is easy to compress under pressure to deploy a promising strategy
  quickly; the skill explicitly flags this as a guardrail because that
  pressure is exactly when the stage tends to get skipped.
- This is software/pipeline correctness testing, not investment advice or
  statistical strategy validation, and passing it does not by itself
  establish that a strategy has a real edge — see [[purged-cv-backtesting]]
  for that separate question.

## Sources consulted

Recent (2026) writeups on trading system pre-production testing (unit
tests, regression suites, live-data simulation, paper trading, shadow-mode
and staged capital allocation) and on data-pipeline testing and silent
error detection (data-indexing off-by-one bugs as a source of look-ahead
bias, silent feature-construction errors requiring independent replication
to catch, automated data-quality and schema-drift checks, end-to-end
pipeline integration testing). Described here in original wording; no code
or text copied from any source.
