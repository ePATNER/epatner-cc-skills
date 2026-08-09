# Rationale

**Status: draft, needs review before merging.**

## What it does

Guides sizing individual positions (fractional Kelly, fixed-fractional
risk, volatility-adjusted sizing) and managing risk across a whole book of
concurrent positions (portfolio heat caps, correlation-aware exposure,
mechanical drawdown response, risk-of-ruin tracking), aimed specifically at
an account where survival matters more than maximizing any single period's
return.

## Why included

Every skill added so far (forecasting, feature engineering, backtesting
validation, cost modeling) produces or validates a signal — none of them
decide how much capital to actually put behind it. Sizing is the step that
turns "this edge is statistically real and survives realistic costs" into
an actual risk outcome, and it's a common point where an otherwise sound
strategy fails in practice: correctly identified edges still get wiped out
by oversized bets or uncontrolled correlated exposure. For an operation
explicitly working with limited capital and multiple micro-strategies, this
is a priority category — a small number of bad sizing decisions can end the
operation regardless of how good the underlying signals are.

## Extent of expected help

Primarily risk control, not return enhancement — correct sizing doesn't
create edge, it determines how much of an existing edge's value is
realized versus lost to variance or ruin. The specific, actionable guidance
(fractional Kelly over full Kelly, fixed-fractional risk as a robust
default with limited data, portfolio heat caps, mechanical drawdown rules)
is aimed at the most common and best-documented ways position sizing goes
wrong for small/retail-scale accounts. The risk-of-ruin framing is included
because it's the more relevant metric than expected return for an operation
that needs to survive long enough for a real edge to compound.

## Key risks / limitations

- Kelly-based sizing (even fractional) is sensitive to the accuracy of the
  underlying edge/payoff estimate; an overconfident edge estimate still
  produces oversized positions even at half or quarter Kelly, just less
  severely than at full Kelly.
- Portfolio heat and correlation guidance here are heuristics, not a
  substitute for actually estimating correlation between held positions
  when the number of concurrent strategies grows — the simple heuristic is
  a starting point, not a ceiling on sophistication needed as complexity
  grows.
- Mechanical drawdown rules reduce the risk of panic-driven decisions but
  are still parameter choices (thresholds, cut sizes) that themselves need
  validation, not values to set once and assume are correct forever.
- This is capital-allocation methodology, not investment advice, and does
  not guarantee against losses, including account-ending ones, even when
  followed carefully.

## Sources consulted

Recent (2026) practitioner and research writeups on fractional Kelly
position sizing (including guidance on using smaller fractions with limited
calibration data), volatility-adjusted/ATR-based position sizing, and
practical risk-of-ruin and portfolio-heat management for retail/small-
account systematic trading. Described here in original wording; no code or
text copied from any source.
