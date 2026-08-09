# Rationale

**Status: draft, needs review before merging.**

## What it does

Guides running an automated or evolutionary alpha-mining process itself — proposing candidate signal formulas at scale, mutating and recombining promising ones, and tracking search-process memory to avoid re-exploring dead ends — with guardrails aimed at the multiple-testing and overfitting risk that high-volume automated search creates.

## Why included

This fills a distinct gap in the collection: it addresses the process of high-volume signal discovery itself rather than any single technique, model, or execution method.

## Extent of expected help

The process can meaningfully expand the search surface beyond what manual research allows, but the guardrails are the load-bearing value: without explicit correction, logging, and out-of-sample validation, automated search becomes a faster version of the same overfitting failure mode it is meant to improve.

## Key risks and limitations

- High internal scores are not independent evidence of a real edge.
- Trial counts can grow too large to reason about casually; without disciplined logging, correction becomes impossible.
- Even a signal that transfers across related universes or periods is not automatically economically tradeable.
- This is a research-process methodology, not investment advice.
