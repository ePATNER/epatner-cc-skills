# Rationale

**Status: draft, needs review before merging.**

## What it does

Guides the architecture of the backtesting simulator itself: choosing
between vectorized (fast, batch) and event-driven (sequential, realistic)
engines, using a hybrid workflow (vectorized for screening, event-driven
for final validation), enforcing point-in-time data access at the engine
level rather than by convention, and treating realistic order/fill
simulation as a first-class architectural concern rather than a bolt-on
adjustment.

## Why included

Found as a specific, non-overlapping candidate identified during the prior
firing's search and queued for this one. It fills a real gap distinct from
two existing skills: `purged-cv-backtesting` covers the *statistical*
validation methodology (splits, deflation, multiple-testing correction) and
assumes a correct simulator; `strategy-testing-validation` covers *code
correctness* of the strategy implementation. Neither addresses the
simulator's own architecture — whether it's even possible, given how it's
built, to leak information or assume unrealistic fills. A structurally
sound engine makes a whole class of errors impossible rather than relying
on careful practice to avoid them every time.

## Extent of expected help

Primarily preventive at the architecture level: an event-driven design
with engine-level point-in-time enforcement removes an entire category of
look-ahead bias and unrealistic-fill errors that a vectorized backtest, or
a point-in-time discipline enforced only by convention, remains vulnerable
to. The practical value for a small operation is the hybrid workflow
recommendation — use cheap vectorized screening broadly, but require an
event-driven pass before anything gets taken seriously as a validated
result — which balances research speed against the realism needed before
committing capital.

## Key risks / limitations

- Event-driven backtesting is significantly slower than vectorized
  approaches, which is a real cost for an operation trying to screen many
  strategy ideas quickly; the hybrid workflow is a deliberate mitigation,
  not a way to avoid the tradeoff entirely.
- Building a custom event-driven engine is nontrivial engineering effort;
  for a small operation, adopting an existing open-source framework
  designed for this (rather than building one from scratch) is likely the
  more realistic path, though this skill doesn't endorse a specific product.
- Engine architecture prevents a specific class of errors (structural
  look-ahead leakage, naively idealized fills) but does not by itself
  prevent overfitting, data snooping across many strategy variants, or
  survivorship bias in the underlying dataset — those require the
  practices covered in `purged-cv-backtesting`, `quant-experiment-tracking`,
  and careful data sourcing, used together with a sound engine, not instead
  of it.
- This is infrastructure/architecture guidance, not investment advice, and
  a well-built simulator does not itself establish that any given strategy
  is profitable.

## Sources consulted

Recent (2026) writeups and framework documentation on event-driven vs.
vectorized backtesting engine design (fill realism, look-ahead bias
elimination, speed/realism tradeoffs, code-reuse between backtest and live
execution) and on general backtesting pitfalls (survivorship bias,
data-snooping, and the case for point-in-time data pipelines and realistic
execution models as core engine features). Described here in original
wording; no code or text copied from any source.
