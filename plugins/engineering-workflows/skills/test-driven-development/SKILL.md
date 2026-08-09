---
name: test-driven-development
description: Use when implementing new behavior or fixing a bug in a codebase that has (or should have) a test suite. Enforces RED (write a failing test that proves the bug or missing feature) → GREEN (minimal code to pass) → REFACTOR, instead of writing implementation first and back-filling tests afterward.
---

# Test-Driven Development

Tests written after the implementation tend to test what the code happens to
do, not what it's supposed to do — and they never fail, so they never prove
anything. Writing the test first forces both a decision about correct
behavior and evidence that the test can actually catch a bug.

## The cycle

1. **RED.** Write a test for the behavior that doesn't exist yet (new
   feature) or that currently fails (bug). Run it and confirm it fails *for
   the reason you expect* — a test that fails for the wrong reason (typo,
   wrong setup) isn't validated yet.
2. **GREEN.** Write the minimum code to make that test pass. Resist adding
   anything the test doesn't require yet — extra scope here is exactly what
   YAGNI warns against.
3. **REFACTOR.** With the test passing as a safety net, clean up duplication
   or awkward structure introduced getting to green. Re-run the test after
   refactoring — this step is not optional, it's where most of the design
   quality actually comes from.
4. Repeat for the next increment of behavior.

## Anti-patterns to avoid

- **Skipping RED.** If you never see the test fail, you don't know it's
  testing the right thing — it may be a no-op assertion.
- **Testing implementation, not behavior.** A test that breaks every time
  you refactor without changing behavior is coupled to internals; assert on
  observable outputs/effects instead.
- **Skipping REFACTOR** because green is good enough. Debt here compounds
  the same way it does anywhere else.
- **One giant test for a whole feature.** Small, focused tests localize
  failures; a single sprawling test tells you *that* something broke, not
  *what*.

## When TDD doesn't apply

Pure exploratory prototypes (where the point is to discover the shape of a
solution, not to ship it), one-off scripts, and config/content-only changes
don't need this cycle. Use judgment — the goal is confidence in behavior,
not ritual.

## Relationship to other skills

If a test in the RED phase reveals a bug you don't understand yet, switch to
[[systematic-debugging]] before writing the fix — don't guess your way to
green.
