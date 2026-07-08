---
name: systematic-debugging
description: Use whenever investigating a bug, test failure, flaky behavior, or anything unexpected — before proposing or applying any fix. Forbids patching code you don't yet understand; enforces reproduce → localize → root-cause → minimal fix → verify.
---

# Systematic Debugging

The fastest way to spend twice as long on a bug is to guess a fix, apply it,
and find out it didn't work — or worse, that it papered over the symptom.
This skill is the discipline of understanding before touching.

## The four phases

1. **Reproduce reliably.** If you can't trigger it on demand, you can't tell
   a real fix from a fluke. Find the minimal, deterministic reproduction
   first — a flaky repro means you're not localized yet.
2. **Localize with root-cause-tracing.** Don't scan the code forward looking
   for suspicious lines — walk the causal chain *backward* from the observed
   symptom: what produced this value/state, what produced that, until you
   hit the actual point of divergence from correct behavior. Bisecting
   (commits, inputs, code paths) is a tool for this phase.
3. **Understand the root cause before writing a fix.** State it in one
   sentence you'd be willing to defend: "X happens because Y does Z when
   W." If you can't state it, you don't have it yet — keep tracing. Do not
   fix code you don't understand and "see if it works"; that's how bugs get
   replaced with different bugs.
4. **Apply the minimal fix at the right layer, then verify with the
   original repro** — not a superficially similar case, not just "looks
   right." A fix that isn't re-run against the exact reproduction from
   phase 1 isn't verified.

## Two techniques worth naming

- **Defense-in-depth:** fix the root cause at the layer that produced it,
  *and* add a guard at the boundary where the bad state was allowed to leak
  in (an assertion, a validation, a type). The root-cause fix prevents the
  bug; the boundary guard prevents the next one like it.
- **Condition-based waiting:** if the bug is a race or timing issue, never
  "fix" it with a `sleep()`/arbitrary delay. Wait on the actual condition
  (the event, the state, the lock) — a sleep just narrows the window without
  closing it, and it'll come back under load.

## Guardrails

- If you find yourself proposing a second fix for the same symptom, stop —
  that's a sign phase 2 or 3 was skipped.
- "It works now" without knowing why is not verification — it's luck. Don't
  hand that off as a fix (see [[receiving-code-review]] for what to do when
  someone else's fix has this shape).
- Time-box phase 2: if root-cause-tracing stalls, add more targeted logging
  or bisect further rather than switching to guessing.
