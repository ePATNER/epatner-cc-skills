---
name: skill-creator
description: Use when the user asks to create, draft, or scaffold a new Claude Code skill, wants to turn a successful ad-hoc approach into a reusable one, or asks how to write a SKILL.md. Guides writing a skill that Claude will reliably discover at the right moment and actually follow.
---

# Skill Creator

A skill is only as good as its `description` and as trustworthy as its
instructions. Most skills fail by never triggering (vague description) or
by triggering and being ignored (vague, unenforceable instructions).

## The frontmatter is a routing rule, not a summary

```yaml
---
name: kebab-case-name
description: Use when <specific situation/trigger phrases>. <What it does, one sentence.>
---
```

Write the description the way you'd write a rule for when a human colleague
should be paged — name concrete triggers ("use when investigating a test
failure," not "helps with debugging"). Claude decides whether to load the
skill based on this text alone before reading the rest of the file, so
vague descriptions mean the skill silently never fires.

## One skill, one job

If a skill's instructions branch into "if doing A, do X; if doing B, do Y,"
it's two skills. Split them — mutually exclusive contexts loaded together
waste tokens on the branch that doesn't apply, and make the description
impossible to write precisely.

## Structure

- Keep `SKILL.md` itself lean — the core process, rules, and guardrails.
- Push large reference material (full API docs, long templates, generated
  scripts) into companion files (`references/`, `assets/`) and point to them
  by path; Claude loads those on demand instead of paying for them on every
  session where the skill merely exists.
- Prefer a deterministic script over prose instructions for anything
  mechanical (parsing, formatting, installing a file) — "run this script"
  is more reliable than "carefully do these 8 steps by hand." See
  `statusline-builder`'s `assets/statusline.py` for the pattern.
- Use concrete worked examples over abstract rules where possible — a
  before/after or a sample command teaches faster than a paragraph of
  policy.

## Process for writing a new skill

1. Identify the actual gap: a task Claude did badly, inconsistently, or had
   to be corrected on repeatedly. Don't write a skill speculatively for a
   situation that hasn't come up.
2. Draft the description first — if you can't state a crisp trigger
   condition, the skill isn't scoped yet.
3. Write the instructions as the rules and steps you'd have wanted enforced
   the last time this went wrong, including the guardrail for the specific
   failure mode observed.
4. Test it: ask Claude to do the task cold and check whether the skill
   actually gets discovered and followed. If it doesn't trigger, the
   description is the first thing to fix, not the instructions.
5. Iterate from real failures — when Claude goes off-script while using the
   skill, add the guardrail that would have prevented it, rather than
   rewriting the whole skill preemptively.

## Guardrails

- Don't bundle unrelated conventions into one skill because they're both
  "best practices" — separate triggers need separate skills.
- Don't write a skill for something Claude already does reliably without
  one — it just adds noise to the routing decision every session.
