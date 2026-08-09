# Rationale

**Status: draft, needs review before merging.**

## What it does

Guides building short-horizon signals from order-book/trade-level data
(order-flow imbalance, trade-toxicity measures like VPIN, spread/price-
impact dynamics) — a distinct signal source from bar-level price features
or external text/alternative data — including its heavier data
requirements, the need for leakage-safe validation at tick-level
granularity, and its unusually high sensitivity to realistic transaction
costs.

## Why included

Found via fresh search after the original checklist and the
mid-loop-added `signal-ensembling` skill were both shipped. This is a
genuinely separate signal source from everything already covered:
`financial-feature-engineering` addresses price-series feature
construction, `news-sentiment-analysis`/`alternative-data-ingestion`
address external text/data sources, but none of the existing skills cover
order-book/trade-level microstructure data specifically, which is a
well-established and actively researched signal family in its own right.

## Extent of expected help

Potentially useful as a short-horizon signal input or an early-warning
overlay (e.g. toxicity spikes ahead of larger moves), with real published
evidence of economically meaningful (not just statistically significant)
predictability from order-flow imbalance specifically. The realistic caveat
for a small operation is that this signal family requires tick/order-book
data (a heavier and potentially costlier data requirement than other
sources already covered) and that its edges are typically small and
fast-decaying relative to realistic small-account transaction costs — the
skill is written to make that cost-sensitivity explicit rather than
presenting this as an easy source of edge.

## Key risks / limitations

- Tick/order-book data access and cost may not be realistic for every
  small operation; this signal family has a higher data-infrastructure bar
  than bar-level or text-based sources already covered in this repo.
- Short-horizon microstructure edges are especially prone to being erased
  by transaction costs at small order sizes — the skill explicitly requires
  pairing this with realistic cost modeling rather than treating a
  statistically significant signal as automatically tradeable.
- Crypto market microstructure specifically is described as still
  evolving (institutionalization, changing leverage/transparency norms in
  2026 commentary); a signal calibrated on historical microstructure data
  may not be stable as market structure continues to change.
- This is signal-research methodology, not investment advice, and
  identifying a microstructure signal does not by itself establish a viable
  strategy — it still needs the validation, cost modeling, and testing
  covered in the other skills in this repo.

## Sources consulted

Recent (2026) research on cryptocurrency and general market microstructure
signals (order-flow imbalance predictability and economic significance,
VPIN-style toxicity measures preceding price jumps, unified leakage-
controlled comparisons of microstructure signal families under realistic
fees) and commentary on evolving crypto market structure. Described here in
original wording; no code or text copied from any source.
