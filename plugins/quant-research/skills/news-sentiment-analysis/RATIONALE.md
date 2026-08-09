# Rationale

**Status: draft, needs review before merging.**

## What it does

Guides a text-to-signal research pipeline: ingestion, tiered scoring, event tagging, decay, and normalization, with emphasis on point-in-time integrity and operational cost discipline.

## Why included

Text-derived signals are common in small-scale systematic research, but the useful workflow is broader than a single sentiment classifier. This skill frames the full pipeline rather than a narrow model choice.

## Key risks and limitations

- Historical text datasets can be point-in-time dirty.
- Entity relevance and event type are easy to under-model.
- Real-time scoring costs and latency matter at scale, even when the underlying classification works.
