# Rationale

**Status: draft, needs review before merging.**

## What it does

Guides building a news/text-to-trading-signal pipeline — ingestion, a
cost-aware scoring cascade (fast classifier + selective LLM escalation),
event tagging, per-source decay modeling, and cross-source normalization —
and names the specific failure modes (timestamp leakage, survivorship bias,
regime dependency, cost-blind architecture) that make sentiment signals look
good in a backtest and fail live.

## Why included

This was explicitly requested as a priority. Unstructured text (news,
filings, social posts) contains information that isn't fully reflected in
price yet is mostly automatable to process. For an operation with limited
capital and no execution-speed or data-breadth edge over larger funds, the
more realistic edge is being fast and cheap at turning public text into a
structured signal or risk trigger.

## Extent of expected help

Best framed as a *signal input or risk overlay*, not a standalone strategy.
Current research points to sentiment *surprise* around identifiable events
(earnings, guidance, litigation, macro releases) having measurable — modest,
decaying — predictive value. For a small operation, the more dependable use
is fast reaction: e.g. a risk-off trigger that trims exposure on
high-conviction negative news, rather than chasing the large annualized
returns reported in individual papers.

## Key risks / limitations

- Published performance numbers in this space are frequently inflated by
  backtest overfitting, survivorship bias in the news corpus used, and
  look-ahead leakage from republished/corrected article timestamps. Treat
  any specific Sharpe or return figure as a hypothesis to falsify on your
  own point-in-time data, not a target to expect.
- Sentiment-return relationships are regime- and event-dependent; a pipeline
  tuned on one period commonly does not generalize to another.
- Real-time LLM scoring at scale has real compute/latency cost, which matters
  disproportionately for a small-capital operation — hence the cascade
  design rather than a large model on every item.
- This is pipeline/methodology guidance, not a validated strategy and not
  investment advice. It needs rigorous, leakage-aware backtesting (see the
  `purged-cv-backtesting` skill once added) before any capital is put behind
  it, and should not be used to generate a specific trade call.

## Sources consulted

Recent (2025-2026) research and industry writeups on LLM/FinBERT-based
financial sentiment analysis (fine-tuned FinBERT variants, FinBERT+LLM
hybrid cascades, preference-optimized LLMs for sentiment scoring) and on
sentiment signal decay characteristics and real-time NLP pipeline design for
trading. Topic areas are cited for context; specific performance claims from
individual papers are treated skeptically per the risks section above, not
endorsed.
