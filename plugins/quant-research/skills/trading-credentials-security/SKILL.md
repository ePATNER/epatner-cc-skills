---
name: trading-credentials-security
description: Use when setting up, storing, or granting access to broker or exchange API credentials for an automated trading system — secrets management, permission scoping, and access control for keys that can move real capital.
---

# Trading Credentials Security

Every other skill in this collection assumes the execution layer can be trusted to act only as intended. This skill is about making that assumption true: the broker and exchange API keys an automated system holds are as sensitive as cash, and treating them like ordinary application secrets undersells the risk.

## Scoping keys to the minimum required

- Create trading-only API keys and explicitly disable withdrawal permissions on every key used by an automated system.
- Use IP allowlists where the broker or exchange supports them.
- Issue distinct credentials per system, component, or task rather than one shared key.

## Storage and rotation

- Never store keys in plaintext in code, committed config, or shell history. Use a secrets vault or managed secret service.
- Rotate credentials on a regular schedule and immediately on suspected exposure.
- Monitor access logs for activity that does not match expected system behavior.

## Specific to automation-operated systems

- Scope what an automated process is authorized to do at the credential level, not just in its instructions. A statement of intent is not a security control; a credential that structurally cannot perform the disallowed action is.
- Avoid override paths that bypass risk checks or execute outside the credentialed, logged system.

## Guardrails

- Treat credential security as a distinct risk category from strategy or market risk.
- Do not treat security setup as a one-time task — rotation, log monitoring, and permission review are ongoing operational practices.
- This guidance reduces blast radius and improves detection; it does not replace provider-side account security features.
