---
name: news-sentiment-analysis
description: Use when designing, building, or auditing a trading signal derived from news, filings, or social text (headlines, SEC filings, earnings-call transcripts, StockTwits/X posts) — the ingestion → scoring → decay → normalization pipeline that turns unstructured text into a usable signal, or reviewing an existing one for staleness, look-ahead leakage, or overfitting before it feeds a strategy.
---

# News Sentiment Analysis

Unstructured text carries information that isn't fully in the price yet, and
a small operation can compete here on speed of reaction rather than data
breadth. But sentiment pipelines are also one of the easiest places to build
something that looks great in a backtest and does nothing live — this skill
is about the architecture and the specific failure modes to guard against.

## Pipeline layers

1. **Ingestion.** Pull from wire services, filings, and social sources; dedupe
   stories reporting the same underlying event. Record the *vendor receipt
   timestamp*, not the article's stated publish time — republished, corrected,
   or backfilled articles are a common source of look-ahead leakage in
   backtests if you trust the printed timestamp.
2. **Scoring cascade, not one model for everything.** Run a fast, cheap
   pass (a FinBERT-class classifier) on all text; escalate only ambiguous or
   high-impact-looking items to a larger LLM for cases a small classifier
   gets wrong — negation, sarcasm, mixed-sentiment sentences, multi-entity
   articles. Scoring every headline with a large model is not viable at
   small scale; the cascade is a cost control, not just a latency one.
3. **Event tagging.** Sentiment's predictive power is highly event-conditional
   — earnings, guidance changes, litigation, and macro releases behave
   differently from routine coverage. Tag event type and condition the
   signal's expected predictive horizon on it; don't treat all news as
   fungible.
4. **Decay modeling, per source.** Half-life varies enormously by source —
   wire/earnings-related news retains value over days, social posts go stale
   within hours. Apply an exponential decay tuned per source type, not one
   global decay constant.
5. **Normalization.** Z-score the decayed signal within name/sector/rolling
   window before combining with other signals. Raw polarity scores are not
   stationary across regimes or comparable across sources.

## Process

1. Decide what decision the signal actually feeds — entry timing, a position
   sizing tilt, or a risk overlay that cuts exposure on bad news — before
   picking a model. Each has a different accuracy/latency tradeoff.
2. Build ingestion with strict timestamp provenance and cross-source dedup.
3. Score with the cascade described above; tag event type.
4. Apply per-source decay, then normalize before combining with other alpha
   inputs.
5. Backtest on strict point-in-time data only — no corrected/backfilled
   article text, nothing that wasn't actually available at decision time —
   using purged, leakage-aware walk-forward validation (see
   [[purged-cv-backtesting]] once available).
6. Before shipping, test whether the signal adds information beyond what
   price/volume already reflects: use sentiment *surprise* relative to
   recent trend, not the raw level — a sentiment score that just tracks the
   recent price move has no alpha, it's just a lagging indicator.

## Guardrails

- Treat headline backtest numbers from single papers (very high Sharpe,
  very high annualized return) as reporting/overfitting artifacts until
  reproduced independently on your own point-in-time data — this is the
  norm for published sentiment-strategy results, and they rarely survive
  live, small-capital execution.
- This skill builds the pipeline and the signal — it does not, and should
  never be used to, produce a specific buy/sell call on a specific security.
- Compute/latency cost of the scoring cascade is a first-class constraint
  at small capital, not an afterthought — budget for it before committing
  to an architecture.
