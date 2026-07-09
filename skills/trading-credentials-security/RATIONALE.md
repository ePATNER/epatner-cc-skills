# Rationale

**Status: draft, needs review before merging.**

## What it does

Guides securing the broker/exchange API credentials an automated trading
system depends on: scoping keys to the minimum permissions needed
(trading-only, no withdrawal, IP-whitelisted), per-component credential
issuance instead of shared keys, secrets-vault storage and regular
rotation, access-log monitoring, and — specifically — credential-level
authorization scoping for an AI-agent-operated system, where an
instruction not to do something is not a substitute for a credential that
structurally cannot do it.

## Why included

Found via fresh search after 27 skills were already shipped. This fills a
real, previously-unaddressed gap: the explicit original request asked for
skills across the full software lifecycle, and operational/credential
security is part of that lifecycle in a way none of the 27 skills shipped
so far actually cover — `explainability-audit-documentation` covers
decision logging and `strategy-testing-validation` covers code
correctness, but neither addresses the security of the credentials the
whole system depends on. Given this operation is explicitly built and run
by an AI agent with tool access, the agent-specific guidance (credential-
level scoping, not just instruction-level) is directly relevant to how
this repo's own skills get used in practice, not a generic add-on.

## Extent of expected help

Purely protective, and arguably higher-consequence than most other
protective skills in this repo: a leaked or overscoped credential is a
direct path to capital loss that bypasses every strategy-level risk
control already covered (position sizing, tail hedging, kill switches all
assume the execution layer is only doing what it's supposed to). The
practical value is straightforward and well-established security hygiene
adapted to the specific context of automated trading credentials, where
the stakes of getting it wrong are unusually direct compared to typical
application secrets.

## Key risks / limitations

- Security guidance here is general best practice (scoping, rotation,
  vaulting, monitoring) rather than a specific implementation for any
  particular broker/exchange's API — the specific mechanisms available
  (IP whitelisting, permission granularity) vary by provider and need to be
  checked against what's actually offered.
- No credential security practice eliminates risk entirely; this reduces
  blast radius and improves detection, it doesn't guarantee prevention of
  all compromise scenarios.
- The agent-specific guidance (credential-level scoping over
  instruction-level trust) is a security principle, not a complete
  implementation — actually structuring credentials this way requires
  broker/exchange support for granular permissions, which isn't universal.
- This is operational security guidance, not investment or legal advice,
  and does not substitute for a broker/exchange's own account security
  features or for professional security review if the operation scales.

## Sources consulted

Recent (2026) writeups on API key security and secrets management for
automated trading systems (trading-only/no-withdrawal key scoping, IP
whitelisting, vault-based storage, rotation cadence, access-log
monitoring) and reporting on 2026 incidents involving shared/overscoped API
keys in AI-agent-operated trading systems, used here to motivate the
agent-specific credential-scoping guidance. Described here in original
wording; no code or text copied from any source.
