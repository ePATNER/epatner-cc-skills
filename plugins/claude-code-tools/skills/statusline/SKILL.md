---
name: statusline
description: Use when the user wants a custom Claude Code status line, asks to see git status/branch/context-window usage/session cost in their terminal prompt, or wants the same status line installed across multiple repos. Installs one project-agnostic script that works identically in any git repo.
---

# Statusline

A single, project-agnostic Claude Code status line script. Install it in one repo, or in twenty —
it needs zero per-repo configuration, because everything it shows is detected at render time from
the repo it's running in.

## What it shows

Three lines, rendered from Claude Code's status JSON (stdin) plus a live `git` read:

1. Repo path + branch + git indicators (`M`/`D`/`S`/`U` file counts, `↑`/`↓` ahead/behind, `≡` stash,
   `⚠` conflicts) + the latest release tag(s) and their age.
2. Model name + effort/thinking badge + a context-window usage bar (`ctx ████░░░░░░ 48% (97k/200k)`)
   + session cost.
3. The repo's GitHub URL + a public/private visibility badge.

## Why it's reusable across any repo, unmodified

- **Release tags are auto-detected, not configured.** Most repos tag plain semver (`v1.2.3`) — shown
  as a single tag. A repo with independently-versioned streams (e.g. `server-v1.2.0` /
  `web-v1.0.3` — see the `mise-release-automation` skill) gets each stream's latest tag shown side by
  side, purely from parsing whatever tags already exist. A repo with no tags yet just says so. No
  per-repo tag-prefix list to maintain.
- **Nothing else is project-specific.** No hardcoded paths, package names, or ecosystem assumptions
  (works the same in a Go repo, a Python repo, a Node repo — it only ever calls `git`, `jq`, and
  optionally `gh`).

## Install (one command, any repo)

From inside the target repo:

```bash
mkdir -p .claude
cp <this-skill-dir>/scripts/custom-statusline.sh .claude/statusline.sh
chmod +x .claude/statusline.sh
```

Then wire it into that repo's **project-scoped** settings (not the user's global
`~/.claude/settings.json` — this way it travels with the repo and doesn't affect other projects):

```json
// .claude/settings.json
{
  "statusLine": {
    "type": "command",
    "command": "$CLAUDE_PROJECT_DIR/.claude/statusline.sh",
    "padding": 0
  }
}
```

If `.claude/settings.json` already has other keys, merge the `statusLine` field in — don't overwrite
the file. `$CLAUDE_PROJECT_DIR` keeps the path portable if the repo ever moves.

**Restart the Claude Code session** (or open a new one) in that repo — `statusLine` is read at
session start, so edits to `settings.json` don't apply to a session already running.

## Requirements

`bash`, `jq`, `git`. `gh` is optional — used only for the GitHub URL's public/private badge (cached
for an hour); if it's missing or the repo has no GitHub remote, that badge is silently omitted rather
than erroring.

## Design notes worth keeping if you fork this

- `export GIT_OPTIONAL_LOCKS=0` — the statusline re-renders on every prompt and runs `git
  status`/`git diff` each time; without this it can contend for `.git/index.lock` against a real
  `git commit`/`git add` running at the same moment.
- `probe_direct()` strips `HTTPS_PROXY`/`HTTP_PROXY`/`ALL_PROXY` before any `gh`/`curl` call, so a
  proxy configured for some other purpose on the machine can't silently break (or intercept) the
  statusline's outbound calls.
- The `gh api` visibility check is disk-cached (1 hour TTL, keyed by `.git`'s directory) — visibility
  essentially never changes, so this avoids a network round trip on every single prompt render.
