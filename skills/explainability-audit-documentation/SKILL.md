---
name: explainability-audit-documentation
description: Use when a model or strategy's decisions need to be explainable after the fact — attributing a prediction or trade to the inputs that drove it, and keeping a timestamped decision log — so a bad outcome can be diagnosed rather than shrugged at, and so the operation has real documentation if it ever needs it for oversight, a partner, or its own postmortems.
---

# Explainability & Audit Documentation

A model that can't explain why it made a given call is hard to debug when
it's wrong and hard to trust when it's right. This skill is about building
that explainability and a basic audit trail in from the start, at a scope
appropriate for a small operation — not about full regulatory compliance
infrastructure, which is a different, heavier bar tied to specific
registration status (see guardrails).

## Explainability for diagnosis and trust

- **Use SHAP-style feature attribution for any model whose predictions
  drive real decisions.** Consistent, per-prediction feature attribution is
  the current standard approach for explaining what drove a specific
  model output — it turns "the model said sell" into "the model said sell
  because of X, Y, Z," which is what actually lets you tell a real signal
  from a spurious one after the fact.
- **Decide the explainability requirement before picking a model, not
  after.** If a model needs to be explainable to be trusted for sizing or
  go/no-go decisions, that rules out treating a fully opaque architecture
  as an acceptable default — pick the model family with this constraint in
  mind, or explicitly accept the tradeoff and compensate with more
  aggressive [[live-backtest-drift-monitoring]].
- **Attribution should connect to a timestamped evidence trail**, not just
  a static feature-importance ranking — for a specific trade, being able to
  reconstruct exactly which inputs (as of what time) produced that
  decision is what makes a postmortem possible.

## Keeping a decision log

- **Log every automated decision with its inputs, output, and reasoning
  basis, timestamped.** This is the operational analog of the research log
  in [[quant-experiment-tracking]], but for live decisions rather than
  research trials — the goal is being able to reconstruct, after the fact,
  exactly what the system saw and did at a specific moment.
- **Log parameter/configuration changes to any live strategy or risk
  control, with the reason.** A silent parameter change is exactly the kind
  of thing that makes later diagnosis ("why did this behave differently
  starting last week") much harder than it needs to be.
- **Review this log periodically, not only after something goes wrong.**
  The value compounds — a habit of glancing at recent decisions and
  attributions surfaces drift or a quietly wrong assumption earlier than
  waiting for a bad outcome to prompt a look.

## Guardrails

- **Distinguish this from formal regulatory audit-trail obligations.**
  Registered broker-dealers and FINRA/SEC member firms face specific,
  heavier requirements (e.g. multi-year API/order log retention, mapped
  regulatory reporting, documented risk-control review) that apply based on
  registration status, not trading style — this skill is about good
  internal practice for a small/individual operation, not a substitute for
  legal/compliance advice about what's actually required for a given
  account structure. If the operation's structure changes (e.g. forming a
  registered entity), get real compliance guidance rather than assuming
  this internal logging satisfies it.
- Explainability is a diagnostic tool, not a guarantee of correctness — a
  model can have a plausible-sounding attribution for a wrong decision;
  treat attribution as an input to debugging, not proof the decision was
  right.
- Keep the logging overhead proportional to the operation's actual scale —
  the point is a genuinely useful, actually-maintained decision trail, not
  an elaborate system that becomes a chore and gets abandoned (same
  principle as the [[quant-experiment-tracking]] guidance on tooling).
