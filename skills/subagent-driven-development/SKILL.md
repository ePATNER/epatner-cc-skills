---
name: subagent-driven-development
description: Use for well-specified implementation work — a plan already exists (see writing-plans) — where dispatching the actual coding to a fresh subagent, then a second fresh subagent to review it, produces a cleaner result than implementing inline in the main conversation. Best for steps that are self-contained enough to hand off with just the plan and file paths.
---

# Subagent-Driven Development

A subagent that only sees the plan and the relevant files implements
exactly what was specified, unclouded by the back-and-forth that produced
the plan. A second subagent that reviews the diff without having written it
catches things the implementer is blind to. This two-stage handoff is worth
the overhead for steps large enough to benefit from a clean-room
implementation.

## Process

1. **Confirm a plan exists** ([[writing-plans]]) — this skill is for
   executing a spec, not producing one. Don't dispatch a subagent to "figure
   out" an ambiguous task; that's what [[brainstorming]] is for, in the main
   conversation.
2. **Dispatch the implementer** with only what it needs: the plan (or the
   relevant step of it), the file paths involved, and enough background to
   understand why — not the entire conversation history that produced the
   plan. A narrower brief produces a more focused diff.
3. **Dispatch a fresh reviewer** with the diff and the plan, but not the
   implementer's reasoning or self-assessment — it should judge the result
   against the spec independently, not rubber-stamp the implementer's
   account of what it did. See [[receiving-code-review]] for triaging what
   comes back.
4. **Iterate**: if the review surfaces real issues, send them back to a
   subagent (fresh or the same one) with the specific findings, not the
   whole review transcript.
5. Use `isolation: "worktree"` on the Agent tool when the implementer's
   changes shouldn't touch the main session's working tree until reviewed
   — see [[using-git-worktrees]].

## When not to use this

- The step is small enough that the overhead of writing a self-contained
  brief exceeds the benefit of a clean-room implementation — just do it
  inline.
- The task requires context that's expensive to hand off (deep familiarity
  with an ongoing debugging session, for instance) — see
  [[systematic-debugging]], which is better done in-session.
- There's no plan yet. Dispatching an underspecified task to a subagent
  just moves the ambiguity somewhere you can't see it being resolved.
