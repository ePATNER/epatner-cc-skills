---
name: skill-creator
description: Use when the user asks to create, draft, or scaffold a new reusable skill, wants to turn a successful ad-hoc approach into a reusable one, or asks how to write a SKILL.md. Guides writing a skill that will be discovered at the right moment and actually followed.
---

# Skill Creator

A skill is only as good as its `description` and as trustworthy as its instructions. Most skills fail by never triggering (vague description) or by triggering and then being ignored (vague, unenforceable instructions).

## The frontmatter is a routing rule, not a summary

```yaml
---
name: kebab-case-name
description: Use when <specific situation or trigger phrase>. <What it does, one sentence.>
---
```

Write the description the way you'd write a rule for when a human colleague should be paged — name concrete triggers (`use when investigating a test failure`, not `helps with debugging`). The runtime decides whether to load the skill based on this text alone before reading the rest of the file, so vague descriptions mean the skill silently never fires.

## One skill, one job

If a skill's instructions branch into `if doing A, do X; if doing B, do Y`, it's two skills. Split them. Separate contexts need separate triggers.

## Structure

- Keep `SKILL.md` lean: core process, rules, and guardrails.
- Push large references, templates, and scripts into companion files and point to them by path so they load only when needed.
- Prefer deterministic scripts over prose instructions for mechanical work.
- Use concrete worked examples where they teach faster than policy text.

## Process for writing a new skill

1. Identify a real gap: a task done badly, inconsistently, or with repeated correction.
2. Draft the description first. If you cannot state a crisp trigger condition, the skill is not scoped yet.
3. Write the instructions as the rules and steps you would have wanted enforced the last time the task went wrong.
4. Test it cold and check whether it is discovered and followed. If it does not trigger, fix the description before rewriting the body.
5. Iterate from real failures. Add the guardrail that would have prevented the miss, rather than rewriting everything speculatively.

## Guardrails

- Don't bundle unrelated conventions into one skill because they are both `best practices`.
- Don't write a skill for behavior that already works reliably without one.
