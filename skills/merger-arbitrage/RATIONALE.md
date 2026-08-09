# Rationale

**Status: draft, needs review before merging.**

## What it does

Guides designing a merger/risk arbitrage strategy: capturing the spread
between a target's current price and its announced acquisition price
(long target / short acquirer for stock deals), assessing the specific,
named risks driving spread width (regulatory/antitrust, financing,
shareholder approval) separately rather than as one blended number, and
the diversification-across-many-deals discipline this strategy needs to
manage single-deal break risk — with an explicit small-capital capacity
constraint on how much of that diversification is achievable.

## Why included

Found via fresh search after 32 skills were already shipped. This is a
genuinely new return driver: binary completion risk on a specific,
publicly announced corporate event. None of the eight prior strategy
archetypes (reversion, continuation, carry, short-volatility,
earnings-drift, forced-fund-flow, macro-surprise, physical-seasonality)
are built around assessing whether a named, discrete corporate transaction
will complete — this is a different kind of risk entirely, closer to
event/credit-risk assessment than to price forecasting.

## Extent of expected help

Merger arbitrage is a long-established, institutionally practiced strategy
with a real economic rationale (compensation for bearing deal-completion
risk), and 2026 commentary describes continued strong deal flow alongside
increased regulatory scrutiny widening spreads for larger/more sensitive
deals — both a headwind (harder to assess) and a potential opportunity
(more compensation per unit of risk in scrutinized deals) depending on
skill in risk assessment. The skill is explicit about the strategy's real
capacity constraint for a small operation: the standard risk management
approach (diversify across many simultaneous deals) is harder to achieve
with limited capital, which changes the risk profile materially versus how
institutional merger-arb books are typically run.

## Key risks / limitations

- Single-deal break risk can produce a large, sudden loss that isn't
  visible in the spread's steady, small day-to-day carry — the same
  negative-skew shape already flagged for `options-income-strategies`
  applies here, and for the same reason a high historical completion rate
  isn't evidence of safety on its own.
- A small account's reduced ability to diversify across many simultaneous
  deals is a genuine structural disadvantage versus how this strategy is
  typically run at scale — this needs to inform position sizing
  explicitly, not be treated as a minor caveat.
- Spread compression during strong M&A environments (more arbitrage
  capital chasing reliably-closing deals) reduces compensation per deal,
  which needs to be weighed against the deal-specific risk being assessed,
  not treated as a constant expected return.
- This is strategy-design methodology, not investment or legal advice, and
  assessing deal-completion probability is inherently uncertain — no
  amount of analysis removes the risk that a specific deal breaks.

## Sources consulted

Recent (2026) commentary on merger arbitrage market conditions (deal flow
outlook, regulatory/antitrust scrutiny trends and their effect on spread
width, spread compression dynamics during strong M&A environments) and
established merger arbitrage strategy mechanics (spread capture, long
target/short acquirer construction for stock deals, diversification across
many deals as the standard risk-management approach). Described here in
original wording; no code or text copied from any source.
