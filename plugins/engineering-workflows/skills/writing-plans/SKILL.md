---
name: writing-plans
description: Use once a design is agreed on (see brainstorming) and a task is complex enough to span multiple files, sessions, or a subagent handoff — a multi-file feature, migration, or refactor. Breaks the work into small, independently verifiable steps with explicit file paths and pass/fail criteria before any code is written.
---

# Writing Plans

A plan exists to make progress checkable in small increments, not to produce
a document. If a step can't be verified on its own, it's too big.

## What a good step looks like

Each step names:
- **The file(s) it touches** — no "update the relevant files."
- **What done looks like** — a test that passes, a command that succeeds, a
  behavior you can observe. Not "implement X" with no way to tell if X is
  right.
- **Its dependency on prior steps**, so steps can be executed (or reviewed)
  in the right order without re-reading the whole plan each time.

Size each step so it's checkable in a few minutes of work — small enough
that if it's wrong, you find out immediately rather than after building
three more steps on top of it.

## Process

1. Start from the agreed design (from [[brainstorming]], or the user's
   explicit spec). Don't plan against an assumption you haven't confirmed.
2. Decompose into ordered steps, each with file paths and a concrete
   verification. Put the tests/verification for a step *before* the
   implementation detail, so it reads as "this is what proves it works,"
   not an afterthought.
3. Flag steps that are genuinely risky or reversible-with-difficulty and
   call those out for a checkpoint with the user before executing them.
4. Track the plan with TaskCreate (one task per step) so progress is visible
   and steps can be marked complete as they land — don't let the plan live
   only in prose that drifts out of sync with reality.
5. If a step turns out to be wrong or too big once you start executing it,
   stop and re-plan that step rather than pushing through — a plan is a
   working hypothesis, not a contract.

## Guardrails

- YAGNI: don't add steps for functionality nobody asked for. A plan should
  be the smallest set of steps that satisfies the agreed design, not the
  most thorough one imaginable.
- Don't write a plan for work that's actually simple enough to just do —
  this skill is for multi-step, multi-file work, not a proxy for every task.
- A plan is not a substitute for [[systematic-debugging]] — if a step fails
  because of a bug, debug it, don't just add a "fix the bug" step and move on.
