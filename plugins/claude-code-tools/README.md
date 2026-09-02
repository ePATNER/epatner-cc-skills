# claude-code-tools

Claude Code CLI-specific tooling — status line and other runtime configuration. Kept as its own
plugin, separate from `engineering-workflows`, because these are provider-specific runtime
artifacts (a script + a settings.json wiring), not portable engineering knowledge.

## Skills

| Skill        | Purpose                                                                             |
| ------------ | ------------------------------------------------------------------------------------ |
| `statusline` | Install a project-agnostic Claude Code status line (git state, release tags, context-window usage, cost) in any repo, no per-repo configuration. |

## Layout

```text
plugins/claude-code-tools/
  README.md
  plugin.json
  skills/
    statusline/
      SKILL.md
      scripts/
        custom-statusline.sh
```
