# Rationale

**Status: draft, needs review before merging.**

## What it does

Guides adding feature-attribution explainability (SHAP-style) to models
whose output drives real decisions, and keeping a timestamped decision log
of automated actions and configuration changes — scoped as good internal
practice for a small operation, explicitly distinguished from the heavier,
registration-status-dependent regulatory audit-trail obligations that apply
to registered broker-dealers/member firms.

## Why included

This completes the lifecycle checklist as the last category: every other
skill added covers building, validating, sizing, executing, or monitoring
a strategy, but none of them address whether a decision can be explained
after the fact or reconstructed from a log. That capability is what turns
"the model was wrong and we don't know why" into an actual diagnosis, and
is also the natural documentation layer if the operation ever needs to show
its own work — to itself during a postmortem, to a future collaborator, or
to real compliance processes if the operation's structure changes.

## Extent of expected help

Diagnostic and preventive rather than performance-improving: explainability
doesn't make a model more accurate, but it makes a wrong decision
debuggable instead of mysterious, which shortens the time to catch a
quietly broken model or a bad assumption. The decision log's value compounds
over time and is cheap to start early but expensive to reconstruct
retroactively — recommending it now, before there's an incident that makes
its absence obvious, is the main practical contribution.

## Key risks / limitations

- Explainability output (e.g. SHAP attributions) can be plausible-looking
  even for a wrong decision; it's a debugging aid, not proof of
  correctness, and shouldn't be over-trusted as validation.
- Choosing a model family partly for explainability is a real tradeoff
  against raw predictive performance in some cases; the skill flags this
  as a decision to make deliberately, not a free upgrade.
- The guardrail distinguishing this from formal regulatory audit-trail
  requirements is important and deliberate: this skill is not legal or
  compliance advice, and a small/individual operation's actual obligations
  depend on its registration status and jurisdiction, which this skill
  does not determine. Real compliance guidance is needed if that status
  changes.
- Logging overhead that isn't scoped to the operation's actual scale risks
  becoming unused busywork, which defeats the purpose — same failure mode
  flagged for experiment tracking.

## Sources consulted

Recent (2026) writeups on SHAP-based explainability as the standard
approach for auditable financial ML models, general guidance on
explainability-first model selection driven by risk/oversight
requirements, and reporting on algorithmic trading record-keeping and audit
trail expectations at the broker-dealer/regulated-firm level (FINRA
supervision and reporting requirements, documented risk-control review) —
used here to inform the guardrail distinguishing personal/small-operation
practice from firm-level regulatory obligation, not presented as advice on
what's legally required for any specific reader. Described here in original
wording; no code or text copied from any source.
