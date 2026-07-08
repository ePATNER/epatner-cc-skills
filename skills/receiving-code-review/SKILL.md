---
name: receiving-code-review
description: Use when acting on code review feedback — from a human reviewer, a GitHub PR comment, or the code-review skill's findings — before making any changes in response. Triages each comment by validity and scope instead of reflexively applying every suggestion or silently dismissing uncomfortable ones.
---

# Receiving Code Review

Two failure modes are equally bad: applying every comment verbatim without
judgment (scope creep, churn, sometimes making the code worse), and quietly
ignoring comments that are inconvenient. This skill is the triage step in
between.

## Process

For each comment or finding:

1. **Is it correct?** Verify the claim against the actual code before
   acting — a reviewer (human or automated) can be wrong about what the
   code does. Don't assume correctness just because it's phrased
   confidently.
2. **What's the severity and scope?** A real bug gets fixed. A style
   preference, a "nice to have," or a suggestion that expands scope well
   beyond the current change is a judgment call — it's fine to defer or
   decline, but say so explicitly with the reason, rather than silently
   skipping it.
3. **Does the fix match the size of the finding?** Don't gold-plate: a
   one-line bug fix doesn't need a surrounding refactor because a reviewer
   mentioned the function is long. Fix what was flagged.
4. **If you disagree, say so with reasoning**, and let the human make the
   final call — don't unilaterally decide a valid finding doesn't apply
   without surfacing that decision.
5. **After applying fixes, re-check** that they actually address the
   finding (see [[systematic-debugging]] if the finding was a bug) rather
   than assuming the change is correct because it compiles.

## Guardrails

- Batch related comments before responding — reacting to each one in
  isolation can produce contradictory edits.
- Never mark a finding as fixed without having actually verified the fix;
  see [[test-driven-development]] for how to prove behavior changed.
- A pile of "nitpick" comments is a signal, even if none is individually
  blocking — don't dismiss all of them just because none is severe.
