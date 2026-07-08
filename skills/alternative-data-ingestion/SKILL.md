---
name: alternative-data-ingestion
description: Use when sourcing, vetting, or ingesting a non-price data feed (on-chain metrics, search trends, macro releases, insider/13F filings, consumer-grade sentiment/SaaS feeds) into a forecasting or trading pipeline — choosing sources realistic for a small operation and checking the data for point-in-time integrity before it's trusted in a backtest.
---

# Alternative Data Ingestion

Most alternative data available to a small operation is consumer-grade
(sentiment/SaaS feeds, search trends, on-chain analytics), not the
institutional-licensed data larger funds use — that's a real constraint,
but the bigger risk is treating any of it as backtest-ready without
checking whether it's actually point-in-time. A dataset that looks
predictive in a backtest because it was quietly revised, backfilled, or
restated after the fact is the most common way alternative data misleads.

## What's realistically available at small scale

- **Consumer-grade sentiment/SaaS APIs, search trend data, on-chain
  analytics (wallet activity, exchange flows) for crypto, and public
  filings (insider transactions, 13F-style disclosures)** are increasingly
  accessible without institutional licensing costs.
- **Most successful small-scale setups combine a handful of sources (on
  the order of 3-5), not dozens** — pairing one quantitative source (price/
  volume/on-chain) with one qualitative source (sentiment/news) tends to be
  more tractable than maximizing source count, and keeps the ingestion and
  point-in-time-integrity burden manageable.
- **Institutional survivorship-bias-free, corporate-action-adjusted
  datasets are expensive**; a small operation usually has to build point-
  in-time discipline itself on top of cheaper raw feeds rather than buying
  it pre-solved.

## Point-in-time integrity checklist before trusting a new data source

1. **Know exactly when each data point actually became available**, not
   when it's timestamped as "about." Aggregated data (e.g. a week of search
   volume) is often only actually published a day or more after the period
   it describes — using the period-end timestamp instead of the actual
   publication timestamp is a direct look-ahead leak.
2. **Check whether the vendor backfills or restates history.** If a data
   provider revises past values (common with some economic/estimate data),
   a backtest using today's version of "history" sees information that
   wasn't available at the time — confirm the source offers a genuinely
   point-in-time (as-first-published) version, or reconstruct one.
3. **Check universe coverage and survivorship.** Confirm the dataset
   includes delisted, acquired, and bankrupt entities for the full backtest
   period, not just currently-listed ones — survivorship bias in equity
   datasets has been shown to meaningfully overstate historical returns,
   and thinner/smaller-name coverage in alternative data specifically tends
   to be the least reliable, exactly where a signal might otherwise look
   most promising.
4. **Treat uneven coverage as a data-quality flag, not just a gap to fill.**
   If a signal's coverage is inconsistent across the universe (dense for
   large-caps, sparse for small-caps), be skeptical of any edge that
   appears concentrated in the sparsely-covered names — that's a common
   sign of a data-quality artifact rather than a real effect.

## Guardrails

- Never backtest against a data source without confirming its point-in-time
  properties first — this is a leakage risk on the same order as timestamp
  issues in [[news-sentiment-analysis]], and just as easy to miss.
- More sources is not automatically better; each additional source adds
  ingestion, integrity-checking, and cost burden that needs to be justified
  by real incremental signal, not just availability.
- Cheap/consumer-grade alternative data quality varies a lot by provider —
  budget time to vet a new source's point-in-time integrity before building
  a pipeline around it, not after a promising-looking backtest.
