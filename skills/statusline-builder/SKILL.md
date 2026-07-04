---
name: statusline-builder
description: Use when the user wants to create, customize, install, or fix a Claude Code custom status line (the bar at the bottom of the CLI showing model, directory, git branch, context-window usage, session cost, and 5h/7d rate limits). Builds a SOTA two-line, git-aware status line and wires it into ~/.claude/settings.json.
---

# Statusline Builder

Builds and installs a state-of-the-art Claude Code status line. Ships a ready
`assets/statusline.py` (pure stdlib, no `jq` needed) and the steps to wire it in.

## Design principles (do not violate)

A status line is **glanceable or it is useless** — the reader scans it without
thinking. Show the handful of things worth holding in your head, then stop.
An overloaded bar is the #1 mistake; a bar you actually read beats ten clever
fields nobody looks at.

SOTA layout (two lines, each independently scannable):

- **Line 1 — identity/location:** `model · directory · git`
- **Line 2 — budgets:** `context bar + ctx% · $session cost · 5h% · 7d%`

Git rule: inside a repo show `⎇ <branch>` plus a `*` dirty marker; when the
directory is **not** a repo, say so explicitly (`not a git repo`) rather than
printing nothing — the user always learns the repo state at a glance.

## The stdin JSON contract (what the script may read)

Claude Code pipes a JSON blob to the command on every tick. Load-bearing fields:

| Field | Meaning |
|-------|---------|
| `model.display_name` | Current model (Opus / Sonnet / Fable …) |
| `workspace.current_dir` | Working directory (basename it for display) |
| `context_window.used_percentage` | Pre-computed context fill %; may be `null` early / post-`/compact` |
| `cost.total_cost_usd` | Client-side session cost estimate |
| `rate_limits.five_hour.used_percentage`, `rate_limits.seven_day.used_percentage` | 5h / 7d quota %; **Pro/Max only**, absent until the first API response |

Absence rules to respect (from the docs):
- `rate_limits` and `context_window.current_usage` are `null` early in a session
  and again after `/compact`. Guard every field; degrade to a dim placeholder.
- `used_percentage` is **input-tokens only**; if you compute your own %, use the
  same formula so the bar matches Claude's internal number.

## Install procedure (this is "use the skill")

1. Copy the asset into the Claude config dir and make it executable:
   ```bash
   cp <skill-dir>/assets/statusline.py ~/.claude/statusline.py
   chmod +x ~/.claude/statusline.py
   ```
2. Merge (never overwrite) the `statusLine` key into `~/.claude/settings.json`,
   preserving every existing key. Use Python for a safe merge if `jq` is absent:
   ```json
   "statusLine": { "type": "command", "command": "~/.claude/statusline.py", "padding": 0 }
   ```
3. Verify by feeding the script representative JSON on stdin — test **both** a
   git directory (expect `⎇ branch`) and a non-git directory (expect
   `not a git repo`), and JSON with and without `rate_limits`.

## Customizing

- Swap the two-line layout for one line by joining `line1`/`line2` with `SEP`.
- Colors are plain ANSI at the top of the script; thresholds live in
  `pct_color` (green < 50 ≤ yellow < 80 ≤ red).
- Add a field: look it up with `g(data, "dotted.path")` and append to `parts`.
- Per-project override: put a `statusLine` block in a project's
  `.claude/settings.json` — project settings win over the user settings.

## Guardrails

- Only ever touch `~/.claude/statusline.py` and the `statusLine` key of
  settings. Never modify unrelated settings, and never wrap or alias the
  `claude` binary itself.
- Keep the script stdlib-only and fail-safe: a broken status line must never
  take down the CLI. Every field read is optional-safe.
