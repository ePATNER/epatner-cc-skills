# Rationale

**Status: draft, needs review before merging.**

## What it does

Guides securing the broker and exchange API credentials an automated trading system depends on: scoping keys to the minimum permissions needed, issuing distinct credentials per component, using vault-based storage, rotating regularly, monitoring access logs, and structurally constraining what automation is allowed to do.

## Why included

This fills a real operational gap in the collection. Strategy, validation, and audit skills all assume the execution layer is trustworthy; this skill covers the security boundary that makes that assumption defensible.

## Extent of expected help

Purely protective, but high consequence: a leaked or overscoped credential can bypass every strategy-level control already in place.

## Key risks and limitations

- Provider support for granular permissions varies.
- No credential practice eliminates risk entirely.
- This is operational security guidance, not legal or investment advice.
