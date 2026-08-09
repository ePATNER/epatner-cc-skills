# Rationale

**Status: draft, needs review before merging.**

## What it does

Guides explicit protection against severe, correlation-breakdown-style
market events: cross-asset diversifiers and/or convexity instruments held
specifically for crisis performance, sized as a small bounded allocation
rather than a return driver, plus cross-asset stress monitoring and
explicit correlation-goes-to-one stress testing, as a distinct layer from
normal-times position sizing and portfolio diversification.

## Why included

Found via fresh search after the checklist (including two prior mid-loop
additions) was fully covered again. This fills a specific, real gap: both
`position-sizing-risk-management` and `portfolio-construction-small-capital`
(already added) manage risk using correlation and volatility assumptions
drawn from normal market conditions — and both skills' own content already
notes that correlation is not stable and tends to rise in stress. This
skill is the explicit answer to that acknowledged gap: a deliberate,
separate layer for the scenario where normal diversification assumptions
fail simultaneously across the book.

## Extent of expected help

Purely protective, and specifically aimed at a different risk than
everything else covered so far: not the risk of a single strategy decaying
or being wrongly sized, but the risk of a broad, simultaneous, correlated
loss event that per-strategy risk controls don't address by construction.
For a capital-constrained operation, the practical value is bounding the
worst-case scenario (a genuine tail event wiping out a large fraction of
the book) at a small, known ongoing cost — this is insurance-like
economics, not a source of expected return, and should be evaluated as
such.

## Key risks / limitations

- Tail hedges have a real ongoing cost (premium decay for convexity
  instruments, opportunity cost for diversifying assets that underperform
  in normal times); oversizing the hedge trades away meaningful normal-
  times performance for protection against a low-probability event.
- Because genuine correlation-breakdown tail events are rare, the
  effectiveness of any specific hedge choice is hard to validate with the
  same statistical rigor (see [[purged-cv-backtesting]]) used for
  forecasting signals — this skill is explicit that it's informed risk
  management under real uncertainty, not a backtested edge.
- Specific instrument choices (which diversifiers, which convexity
  structures) are asset-class- and market-dependent and not prescribed
  here in detail; the skill gives the framework and sizing principle, not a
  specific recommended hedge.
- This is risk-management framing, not investment advice, and does not
  guarantee protection in any specific future event — tail hedges can also
  fail to pay off as expected if a crisis doesn't match the pattern the
  hedge was designed against.

## Sources consulted

Recent (2026) writeups on tail-risk hedging practice (cross-asset
diversifiers with historically negative crisis correlation, convexity/
options-based hedges, typical small-allocation sizing heuristics) and on
cross-asset stress monitoring indicators (volatility-of-volatility, skew,
credit stress) as early signals of spreading market fragility. Described
here in original wording; no code or text copied from any source.
