# Rationale

**Status: draft, needs review before merging.**

## What it does

Guides sourcing alternative data realistically for a small operation
(consumer-grade sentiment/SaaS feeds, search trends, on-chain analytics,
public filings — a handful of sources rather than broad institutional
licensing) and vetting any new source for point-in-time integrity
(actual publication timing, backfill/restatement behavior, survivorship
and coverage gaps) before it's trusted in a backtest.

## Why included

The `news-sentiment-analysis` skill already added covers one specific
alternative-data pipeline (news/text); this skill generalizes the same
point-in-time discipline to other alternative data types (on-chain, search
trends, filings) and adds the sourcing-strategy question that's specific to
limited capital: what's actually accessible without institutional licensing,
and how many sources are realistically manageable. Both the "what's
available" and "how do I not fool myself with it" questions are needed
before alternative data can safely feed a strategy.

## Extent of expected help

Alternative data is a way for a small operation to access information
beyond price/volume without needing institutional data budgets — the
realistic contribution is incremental signal from 1-2 well-vetted
non-price sources paired with a primary quantitative source, not a large
edge from data breadth (which isn't available at this scale anyway). The
larger and more certain benefit is defensive: the point-in-time checklist
directly prevents a specific, well-documented and easy-to-miss class of
backtest-inflating errors (timestamp mismatch, vendor backfill, survivorship
gaps) that would otherwise make a data source look far more predictive than
it actually was at the time.

## Key risks / limitations

- Point-in-time verification is genuinely time-consuming and easy to skip
  under time pressure; the checklist exists because skipping it is the
  norm, not the exception, and the resulting backtest inflation is often
  large enough to fully explain an apparent edge.
- Consumer-grade/cheap alternative data sources vary widely in reliability
  and coverage; the same source can be trustworthy for large-cap names and
  unreliable for smaller ones within the same dataset.
- Adding more data sources increases pipeline complexity and maintenance
  burden faster than it increases signal, particularly at small scale — the
  guidance to limit source count is a deliberate trade-off, not a claim
  that more data never helps.
- This is data-sourcing and data-quality methodology, not investment
  advice, and vetting a source correctly does not by itself establish that
  it contains a tradeable signal — that still requires the validation
  covered in [[purged-cv-backtesting]].

## Sources consulted

Recent (2026) writeups on alternative data accessibility for retail/small
operations (consumer-grade sentiment/on-chain/search-trend APIs, typical
source-count in successful setups) and on alternative-data quality pitfalls
(look-ahead bias from aggregation/publication timing, vendor backfill and
restatement, survivorship bias, uneven universe coverage). Described here
in original wording; no code or text copied from any source.
