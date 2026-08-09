---
name: trading-credentials-security
description: Use when setting up, storing, or granting access to broker/exchange API credentials for an automated trading system — secrets management, permission scoping, and access control for the keys that can move real capital. This is an operational-security gap none of the strategy/research/execution skills in this repo cover, and it matters more here than in most software because a leaked key is a direct path to capital loss, not just a data breach.
---

# Trading Credentials Security

Every other skill in this repo assumes the execution layer can be trusted
to act only as intended. This skill is about making that assumption true:
the broker/exchange API keys an automated system holds are as sensitive as
cash, and treating them like an ordinary application secret undersells the
risk — a leaked or overscoped key doesn't just expose data, it can move
or drain real capital directly.

## Scoping keys to the minimum required

- **Create trading-only API keys and explicitly disable withdrawal
  permissions** on every key used by an automated system — a key that can
  place orders but cannot move funds out limits the worst case of a leak to
  unwanted trades, not a drained account.
- **Use IP whitelisting** where the broker/exchange supports it, so a
  leaked key is unusable from anywhere but the system's actual
  infrastructure.
- **Issue distinct credentials per system/agent/task rather than one
  shared key** — a documented 2026 incident pattern involved a large share
  of teams relying on shared API keys across agents, which made it
  impossible to trace or stop a single misbehaving process without cutting
  off everything; unique credentials per component make revocation and
  auditing possible.

## Storage and rotation

- **Never store keys in plaintext — not in code, not in config files
  committed to a repo, not in shell history.** Use a secrets vault or
  managed secret service designed for this, not an environment variable
  set once and forgotten in a file that might get committed.
- **Rotate credentials on a regular schedule** (a commonly cited baseline
  is roughly every 90 days) and immediately on any suspected exposure —
  treat rotation as routine maintenance, not just an incident response
  action.
- **Monitor exchange/broker access logs** for activity that doesn't match
  the system's expected pattern (unexpected IPs, unexpected times, order
  types the strategy shouldn't be placing) as an early warning that a key
  may be compromised.

## Specific to an AI-agent-operated system

- **Scope what an agent is authorized to do at the credential level, not
  just in its instructions.** An instruction telling an agent not to do
  something is not a security control; a credential that structurally
  cannot do that thing is. If an agent only needs to read positions and
  place orders within defined limits, its credentials shouldn't also be
  capable of withdrawals or account-level configuration changes.
- **No manual overrides that bypass risk checks**, and no path for an
  agent (or a human, under time pressure) to route around position-sizing
  or exposure limits by acting outside the credentialed, logged system —
  this connects directly to [[explainability-audit-documentation]]'s
  decision-logging practice: every credentialed action should be
  attributable and within scope.

## Guardrails

- Treat this as equally important to any strategy-level risk control in
  this repo — a sound, well-validated strategy provides no protection
  against capital loss from a compromised or overscoped credential; this is
  a different risk category entirely, not a subset of market risk.
- Don't treat security setup as a one-time task — rotation, log
  monitoring, and permission review are ongoing operational practices, the
  same way [[live-backtest-drift-monitoring]] and
  [[model-retraining-cadence]] are ongoing rather than one-time checks.
- This is operational security guidance, not a guarantee against
  compromise, and doesn't substitute for the broker/exchange's own account
  security features (2FA, withdrawal allowlists) — use both together.
