# engineering-workflows

Reusable workflow skills for planning, debugging, reviews, release discipline, and safe execution.

## Skills

| Skill | Purpose |
|---|---|
| `brainstorming` | Turn ambiguous requests into agreed designs before implementation. |
| `mise-release-automation` | Scaffold a mise-orchestrated semantic-release pipeline (single-version or independently-versioned streams) in a repo that doesn't have one yet. |
| `receiving-code-review` | Triage review feedback by validity and scope. |
| `release-management` | Run a clean release flow with preflight checks, dry runs, changelog verification, and tag validation. |
| `skill-creator` | Draft new reusable skill files with clear triggers and guardrails. |
| `subagent-driven-development` | Hand planned work to separate implementation and review flows. |
| `systematic-debugging` | Run a reproduce → localize → root-cause → verify debugging loop. |
| `test-driven-development` | Drive changes with failing tests before implementation. |
| `using-git-worktrees` | Manage parallel work with isolated git worktrees. |
| `writing-plans` | Break large work into verifiable, ordered steps. |

## Layout

```text
plugins/engineering-workflows/
  README.md
  plugin.json
  skills/
    <skill>/
      SKILL.md
```
