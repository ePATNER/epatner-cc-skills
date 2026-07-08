---
name: brainstorming
description: Use before starting any non-trivial feature, design, or architecture task, especially when the request is ambiguous, underspecified, or open-ended ("build X", "how should I approach Y", "what do you think about Z"). Refines a rough idea into a concrete, agreed-upon design through targeted questions before any code is written.
---

# Brainstorming

Writing code against an ambiguous request is the single biggest source of
wasted work: the implementation is technically correct and still wrong,
because nobody agreed on what "right" meant. This skill delays code until a
design exists that the user has actually signed off on.

## When this applies

Non-trivial means: more than one reasonable design exists, the request
touches multiple files/components, or requirements are stated as a goal
rather than a spec. It does not apply to small, unambiguous fixes — don't
interrogate the user over a one-line change.

## Process

1. **Ask before assuming.** Identify the two or three things that most change
   the shape of the solution (scope, constraints, who/what consumes it,
   failure modes that matter) and ask about those specifically — not a
   generic requirements questionnaire. Silence on a minor detail is fine to
   default past; silence on something that flips the architecture is not.
2. **Surface real alternatives, not a strawman.** If there are competing
   designs with different tradeoffs (e.g. sync vs. async, new abstraction vs.
   inline, library vs. hand-rolled), name them and state the tradeoff in one
   sentence each. Recommend one.
3. **Present the design in reviewable chunks.** For anything spanning
   multiple components, lay out the design section by section (data model,
   then API, then UI, etc.) rather than dumping a wall of text — let the user
   redirect early sections before you've built on top of them.
4. **Get explicit sign-off before implementing.** "Sounds right, go ahead" or
   an equivalent — not just the absence of objection while you keep talking.
5. **Write down the agreed design** if the task is large enough that it will
   span multiple sessions or get handed to [[writing-plans]] — a short
   design note beats relying on conversation memory.

## Guardrails

- Don't ask questions you can answer yourself by reading the code.
- Don't turn this into an interview for trivial tasks — proportion the
  number of questions to the size and ambiguity of the task.
- Once sign-off is given, stop brainstorming and move to execution
  ([[writing-plans]] or straight to implementation for small work).
