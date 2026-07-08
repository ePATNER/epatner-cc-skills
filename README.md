# epatner-cc-skills

Personal collection of [Claude Code](https://code.claude.com) skills.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Each skill lives under `skills/<name>/` with a `SKILL.md` (instructions +
frontmatter) and any supporting `assets/`. Skills are made discoverable to
Claude Code by symlinking them into `~/.claude/skills/`:

```bash
mkdir -p ~/.claude/skills
ln -s "$PWD/skills/<name>" ~/.claude/skills/<name>
```

## Skills

| Skill | Purpose |
|-------|---------|
| [`statusline-builder`](skills/statusline-builder/SKILL.md) | Build & install a SOTA, git-aware Claude Code status line (model · dir · git; context bar · cost · 5h/7d quota). |
| [`portfolio-construction-small-capital`](skills/portfolio-construction-small-capital/SKILL.md) | _(draft, pending review)_ Combine multiple micro-strategies by risk contribution, with honest overlap/correlation checks. |
| [`subagent-driven-development`](skills/subagent-driven-development/SKILL.md) | Hand a planned step to a fresh implementer subagent, then a fresh reviewer subagent, for a clean-room result. |
| [`using-git-worktrees`](skills/using-git-worktrees/SKILL.md) | Set up/tear down git worktrees to work on two branches at once without disturbing the current checkout. |
| [`receiving-code-review`](skills/receiving-code-review/SKILL.md) | Triage review feedback by validity/scope instead of blindly applying or ignoring it. |
| [`test-driven-development`](skills/test-driven-development/SKILL.md) | RED → GREEN → REFACTOR: write the failing test before the implementation. |
| [`systematic-debugging`](skills/systematic-debugging/SKILL.md) | Root-cause-first bug investigation: reproduce → localize → root-cause → minimal fix → verify. |
| [`writing-plans`](skills/writing-plans/SKILL.md) | Break a multi-file feature/migration into small, independently verifiable steps before coding. |
| [`brainstorming`](skills/brainstorming/SKILL.md) | Refine an ambiguous request into an agreed design through targeted questions before writing any code. |
| [`skill-creator`](skills/skill-creator/SKILL.md) | Guidance for drafting a new SKILL.md that actually triggers and gets followed. |

## Layout

```
skills/
  <name>/
    SKILL.md        # name + description frontmatter, then instructions
    assets/         # scripts / templates the skill installs or references
```

## Contributing

Each skill is added on its own branch (`epatner/add-<name>-skill`) and merged
via a squash-merged PR titled `epatner: add <name> skill`. See
[`skills/skill-creator/SKILL.md`](skills/skill-creator/SKILL.md) for the
process and conventions to follow when drafting a new one.

## License

[MIT](LICENSE) © epatner
