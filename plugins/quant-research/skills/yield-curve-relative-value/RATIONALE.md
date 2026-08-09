# Rationale

**Status: draft, needs review before merging.**

## What it does

Guides designing interest-rate term-structure relative-value strategies:
steepener/flattener trades (betting the spread between short- and
long-maturity yields widens or narrows), duration-neutral vs.
duration-directional construction, and roll-down/carry trades (betting the
curve's shape stays stable) — including what determines whether the trade
is economically worth putting on and small-capital-specific considerations
around instrument choice and duration-aware sizing.

## Why included

Found via fresh search after 34 skills were already shipped. This adds a
genuinely new dimension: every strategy archetype covered so far
(reversion, continuation, carry, short-volatility, earnings-drift,
forced-fund-flow, macro-surprise, physical-seasonality, deal-completion-
risk) trades equities, crypto, or commodities; none is built around the
shape of the interest-rate term structure itself, which has its own
distinct risk factors (duration, curve-shape stability) not present
elsewhere in the repo. `macro-nowcasting-economic-surprises` touches
FX/rates but is about trading data surprises, not the curve's shape —
this skill is the missing rates-relative-value piece.

## Extent of expected help

Yield curve strategies are a long-established, institutionally practiced
category with real economic logic (term premium, monetary policy
expectations), and 2026 commentary suggests continued curve steepening is
a live, relevant theme as central bank cutting cycles evolve. The
practical value for a small operation is accessibility via standard
government bond futures (rather than needing to hold/finance cash bonds
directly) and a genuinely different risk factor (duration/curve shape) to
diversify a multi-strategy book against equity- and crypto-focused
strategies already covered — but the skill is explicit that rates
instruments carry duration and leverage characteristics that need their
own understanding, not a direct carryover of equity-strategy sizing
intuition.

## Key risks / limitations

- Steepener/flattener (directional curve-shape view) and roll-down/carry
  (curve-shape-stability view) are easy to conflate since they use
  similar-looking instrument combinations but represent different bets;
  the skill flags this explicitly as a common point of confusion.
- Curve dynamics are strongly regime-dependent (tied to monetary policy
  cycle phase); a strategy validated in one rate environment may not
  transfer to another, which needs regime-aware validation, not a single
  historical backtest period.
- Duration and embedded leverage in rates instruments mean position sizing
  needs to account for effective risk exposure, not face value — a sizing
  mistake here has outsized consequences relative to an equivalent
  nominal equity position.
- This is strategy-design methodology, not investment advice, and the
  2026 macro commentary cited here about curve direction is context, not a
  forecast to be relied upon for any specific trade.

## Sources consulted

Recent (2026) writeups and CFA Institute-level material on yield curve
strategies (steepener/flattener mechanics, duration-neutral vs.
duration-directional construction, roll-down/carry trade requirements
including curve-stability and cost thresholds) and 2026 rates-market
commentary on the yield curve environment and central bank cycle context.
Described here in original wording; no code or text copied from any
source.
