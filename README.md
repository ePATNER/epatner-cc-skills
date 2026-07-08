# epatner-cc-skills

Personal collection of [Claude Code](https://code.claude.com) skills.

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
| [`brainstorming`](skills/brainstorming/SKILL.md) | Refine an ambiguous request into an agreed design through targeted questions before writing any code. |
| [`skill-creator`](skills/skill-creator/SKILL.md) | Guidance for drafting a new SKILL.md that actually triggers and gets followed. |

## Layout

```
skills/
  <name>/
    SKILL.md        # name + description frontmatter, then instructions
    assets/         # scripts / templates the skill installs or references
```
