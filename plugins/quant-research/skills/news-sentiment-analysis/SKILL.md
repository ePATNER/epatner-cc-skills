---
name: news-sentiment-analysis
description: Use when building a news or text-to-signal pipeline — ingestion, tiered scoring, event tagging, decay, and normalization — before converting text into a tradable signal.
---

# News Sentiment Analysis

A sentiment pipeline is not just a classifier. It is a workflow that ingests text, scores it, tags event type and relevance, applies time decay, and normalizes the result into a signal that can be combined with other research inputs.

## Core workflow

1. Ingest text with strict timestamp and source tracking.
2. Score text through a tiered pipeline so straightforward items are handled cheaply and ambiguous or high-impact items get deeper review.
3. Distinguish event type and entity relevance from raw sentiment polarity.
4. Apply decay and normalization before feeding the result into downstream strategy logic.
5. Validate the pipeline on realistic historical event windows rather than isolated sentence-level benchmarks.

## Guardrails

- Point-in-time integrity matters more than headline benchmark scores.
- Event tagging and relevance matter as much as polarity.
- Costs, latency, and false confidence all compound at scale, so score-routing and validation discipline are load-bearing parts of the design.
