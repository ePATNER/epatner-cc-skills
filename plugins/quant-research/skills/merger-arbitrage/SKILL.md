---
name: merger-arbitrage
description: Use when designing a strategy that captures the spread between a target company's current price and its announced acquisition price — merger/risk arbitrage — an eighth strategy archetype whose return driver is binary deal-completion risk on a specific corporate event, distinct from every price-relationship, trend, carry, volatility, drift, flow, or seasonal driver already covered in this repo.
---

# Merger (Risk) Arbitrage

Once an acquisition is announced, a target's stock typically trades below
the offer price by a spread that compensates for the risk the deal doesn't
close, the time until it does, and financing/regulatory uncertainty. This
strategy captures that spread — a return driver with no analog elsewhere
in this repo: it's not about predicting price direction, reversion, a
trend, or a payment, it's about assessing the probability a specific,
named corporate event actually completes.

## Core mechanics

- **Buy the target after the deal is announced, at a discount to the offer
  price** — the spread reflects the market's assessment of completion
  risk, financing risk, and time-to-close, not general market direction.
- **For stock-for-stock deals, the position is typically long the target
  and short the acquirer** in the deal's exchange ratio, to isolate the
  deal-spread return from the acquirer's own price movements — this is a
  market-neutral construction, similar in spirit to
  [[statistical-arbitrage-pairs-trading]]'s hedge-ratio discipline, but
  the "relationship" being traded is a specific contractual exchange
  ratio, not a statistically estimated one.
- **Spread width is the direct signal of perceived risk** — wider spreads
  imply the market assigns more completion risk (regulatory scrutiny,
  financing contingency, shareholder approval uncertainty, competing
  bids); narrower spreads on reliably-closing deals mean less compensation
  per unit of capital deployed.

## Assessing the actual risk being priced

- **Regulatory/antitrust risk is the dominant driver of spread width for
  large or sensitive deals** — scrutiny (especially in tech/healthcare or
  cross-border deals) has been increasing, leading to longer review
  timelines and wider spreads specifically for megadeals; assess this
  deal-by-deal rather than assuming a uniform completion probability
  across the strategy's universe.
- **Financing and shareholder-approval risk matter separately from
  regulatory risk** — a deal can be regulatorily uncontroversial and still
  carry real risk from financing falling through or a shareholder vote
  failing; each named risk needs its own assessment, not a single blended
  "deal risk" number.
- **Spreads compress when arbitrage capital floods a favorable M&A
  environment** — in periods with strong, reliably-closing deal flow, more
  capital chasing the same completion-risk premium reduces the
  compensation per deal; this is a capacity/crowding dynamic distinct from,
  but analogous to, the crowding risk already flagged in
  [[cross-sectional-equity-factor-investing]] and
  [[index-reconstitution-effect]].

## Fit for a small-capital operation

- **Diversification across many simultaneous deals is how this strategy
  manages single-deal break risk** — a single failed deal can produce a
  large, sudden loss (the spread can widen sharply or the position can
  drop toward pre-announcement levels), and the standard risk-management
  approach is spreading capital across many uncorrelated deals rather than
  concentrating in a few. A small account has a real capacity constraint
  here: fewer simultaneous positions means less diversification against
  single-deal break risk than a larger, more diversified merger-arb book
  would have — size individual positions accordingly (see
  [[position-sizing-risk-management]]) and treat concentration risk as a
  first-order concern, not an afterthought.
- **This return profile shares the negative-skew shape** seen in
  [[options-income-strategies]] (frequent modest gains from deals
  completing, occasional large losses when one breaks) — the same
  guardrail against over-trusting a high historical "win rate" applies
  here.

## Guardrails

- Never treat the deal spread as risk-free "arbitrage" despite the name —
  it's compensation for a specific, real completion risk that can and does
  materialize.
- Validate deal-completion-probability assessment against actual
  historical outcomes for comparable deal types/sectors/regulatory
  environments (see [[purged-cv-backtesting]]), not just the current
  spread level in isolation.
- This is strategy-design methodology, not investment or legal advice; deal
  outcomes depend on regulatory, financing, and shareholder factors outside
  the strategy's control, and no amount of analysis eliminates single-deal
  break risk — only diversification and sizing manage it.
