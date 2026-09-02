---
name: mise-release-automation
description: Use when the user wants to set up automated, commit-driven releases (semantic-release) orchestrated by mise tasks in a repo that doesn't have them yet — "set up releases here", "add semantic-release", "I want mise run release:full", or a monorepo that needs independently-versioned components. Scaffolds the whole pipeline in one pass; complements the process-level `release-management` skill.
---

# mise + semantic-release Automation

A concrete, copy-and-adapt recipe for wiring `mise` tasks around `semantic-release` in any repo —
local-first (you run it by hand, nothing fires on push), Conventional-Commits-driven, and able to
version a repo as one unit or as several independent streams without depending on the repo being
laid out as npm/yarn workspaces.

This skill scaffolds the pipeline. For the *process* discipline around actually cutting a release
(clean tree, dry-run first, verify the published artifact), see the `release-management` skill —
the two are meant to be used together.

## Step 1: Classify the repo

Don't scaffold a publish pipeline on a repo with nothing to publish.

```bash
ls pyproject.toml Cargo.toml package.json setup.py go.mod 2>/dev/null || echo "NO_PACKAGE_MANIFEST"
```

- **No manifest, no existing release infra** → this is a docs/config/sync repo. There's nothing to
  version. Stop here — "release" for a repo like that is just `git push`.
- **Has a manifest** → continue.

Then decide **single version or independent streams**:

- One deployable thing (one binary, one package, one app) → **single stream**. Simpler; do this
  unless you have a concrete reason not to.
- Two or more genuinely independently-deployed components in one repo (e.g. a backend and a
  frontend, each with their own deploy target and release cadence) → **independent streams**, one
  tag prefix and one CHANGELOG per component.

## Step 2: Pin tools and add the mise tasks

`.mise.toml` at repo root — pin whatever this repo's ecosystem needs, plus Node (semantic-release
requires it — `^22.14.0 || >=24.10.0` — regardless of the repo's primary language) and `jq`:

```toml
[tools]
node = "22"
jq = "latest"
# + this repo's own language pin(s), e.g. go = "1.26", python = "3.13", etc.
```

`mise-tasks/` is mise's default file-task directory — no extra config needed. Each file starts with
a shebang and a `#MISE description="..."` header comment (mise's real file-task convention); the
directory path becomes the task's colon-namespace (`mise-tasks/release/dry` → `mise run release:dry`).

Scaffold these six:

| Task                 | Purpose                                                                                     |
| --------------------- | --------------------------------------------------------------------------------------------- |
| `release:preflight`   | Clean tree, on the release branch, `GH_TOKEN` present (source it from `gh auth token` if unset — never store it in a file). |
| `release:drift`       | Read-only: current version(s), latest tag(s), commits since, per stream. No side effects.    |
| `release:dry`         | `#MISE depends=["release:preflight"]`. `semantic-release --dry-run` for each stream. No changes made. |
| `release:version`     | `#MISE depends=["release:preflight"]`. The real `semantic-release` run, one stream at a time, **sequentially, never in parallel** — two release runs writing to the same working tree at once corrupts git state. |
| `release:postflight`  | Confirm clean tree, nothing unpushed, reset incidental lockfile drift.                        |
| `release:full`        | `#MISE depends=["release:preflight"]`, then runs `mise run release:version` followed by `mise run release:postflight` as explicit sequential steps in its own body — **not** as a shared `depends` array (mise runs multiple `depends` entries in parallel, which is exactly the race `release:version` warns about). |

This gives the operator exactly three commands to remember: `mise run release:drift`, `mise run
release:dry`, `mise run release:full`.

## Step 3: Add the semantic-release config(s)

Root `package.json` (tooling-only — nothing here is shipped):

```json
{
  "name": "<repo>-release-tooling",
  "private": true,
  "devDependencies": {
    "@semantic-release/changelog": "^6.0.3",
    "@semantic-release/commit-analyzer": "^13.0.0",
    "@semantic-release/git": "^10.0.1",
    "@semantic-release/github": "^11.0.1",
    "@semantic-release/release-notes-generator": "^14.0.1",
    "semantic-release": "^25.0.0"
  }
}
```

Add `@semantic-release/exec` and `micromatch` only if you need them (see below).

### Single stream

`release.config.cjs`, standard Angular commit-type rules — no path filtering needed:

```js
module.exports = {
  branches: ["main"],
  plugins: [
    ["@semantic-release/commit-analyzer", {
      parserOpts: { noteKeywords: ["BREAKING CHANGE", "BREAKING-CHANGE", "BREAKING"] },
    }],
    ["@semantic-release/release-notes-generator", {
      parserOpts: { noteKeywords: ["BREAKING CHANGE", "BREAKING-CHANGE", "BREAKING"] },
    }],
    "@semantic-release/changelog",
    ["@semantic-release/git", {
      assets: ["CHANGELOG.md"],
      message: "chore(release): ${nextRelease.version} [skip ci]",
    }],
    ["@semantic-release/github", {
      successComment: false, failComment: false, releasedLabels: false, addReleases: false,
    }],
  ],
};
```

`successComment`/`failComment`/`releasedLabels`/`addReleases: false` skip a per-resolved-commit
GitHub Search API round trip semantic-release otherwise makes by default — a real, measured win,
worth keeping even on a small repo.

### Independent streams

The community monorepo tools (`semantic-release-monorepo`, `@rimac-technology/semantic-release-monorepo`)
filter commits by "touched a file in or below the package's *root directory*" — inclusion-only,
based on where you invoke `semantic-release` from. That fits a repo where every stream already lives
in its own top-level subdirectory (e.g. `web/`). It does **not** fit a stream whose files are spread
across several top-level directories (e.g. a Go backend living in `cmd/`, `internal/`, `config/` all
at the repo root, alongside a `web/` frontend) — there's no single directory that means "everything
except web". Restructuring the repo to force that fit is usually not worth the blast radius (import
paths, build tooling, deploy scripts all cascade).

Instead, copy **`references/scoped-plugins.cjs`** from this skill into `scripts/release/` in the
target repo, unmodified — it's already fully generic. It wraps the official
`@semantic-release/commit-analyzer` and `@semantic-release/release-notes-generator`: for each commit
in `context.commits`, it resolves the commit's changed files (`git diff-tree --no-commit-id
--name-only -r <hash>`) and keeps only commits matching an explicit `include` glob list
(`micromatch`), before delegating to the real plugin functions. Add `micromatch` to
`devDependencies`.

One `release.config.<stream>.cjs` per stream:

```js
const scoped = require("./scripts/release/scoped-plugins.cjs");
const INCLUDE = ["cmd/**", "internal/**", "config/**", "go.mod", "go.sum"]; // this stream's paths

module.exports = {
  branches: ["main"],
  tagFormat: "server-v${version}", // one prefix per stream — this is what namespaces the tags
  plugins: [
    [scoped.commitAnalyzer, { include: INCLUDE }],
    [scoped.releaseNotesGenerator, { include: INCLUDE }],
    "@semantic-release/changelog",
    ["@semantic-release/git", {
      assets: ["CHANGELOG.md"],
      message: "chore(release): server ${nextRelease.version} [skip ci]",
    }],
    ["@semantic-release/github", {
      successComment: false, failComment: false, releasedLabels: false, addReleases: false,
    }],
  ],
};
```

A stream whose manifest carries its own version field (e.g. a `web/package.json` that isn't
published anywhere but is nice to keep in sync) can sync it before `changelog`/`git` run, via
`@semantic-release/exec`'s `prepareCmd`, so the edit lands in the same release commit:

```js
["@semantic-release/exec", {
  prepareCmd: "node scripts/release/sync-version.cjs \"${nextRelease.version}\"",
}],
```

Note the **double-quoted** command string — `${nextRelease.version}` must survive as literal text
until `@semantic-release/exec`'s own lodash-template step expands it. Writing this as a JS template
literal (backticks) would make plain JavaScript try to interpolate it first (into `undefined`,
silently) before `@semantic-release/exec` ever sees it.

`mise-tasks/release/dry` and `.../version` then loop the streams, e.g.:

```bash
for stream in server web; do
    npx semantic-release --no-ci --dry-run --extends "./release.config.${stream}.cjs"
done
```

## Step 4: Write `docs/RELEASE.md`

Document, for this specific repo: the stream table (name → tag format → changelog path → config
file, if multi-stream), the Conventional Commits type table, the three `mise run release:*`
commands, and what the first-ever release will do (semantic-release defaults a stream's first
release to `1.0.0` regardless of the exact commit types found — expected, not an error). Keep it
short — a page, not a manual.

## Verification before handing back to the operator

- `mise run release:drift` — must be read-only; confirms task wiring and reports current state.
- `mise run release:dry` — safe to actually execute. This is how you confirm a multi-stream commit
  filter is actually correct: check that a commit touching only one stream's paths doesn't appear in
  the other stream's dry-run preview.
- **Never run `release:full` as part of scaffolding it.** It creates real tags, a real CHANGELOG
  commit, and a real GitHub release — an outward-facing, hard-to-reverse action. That's the
  operator's call to make, on their own schedule.

## Files in this skill

```text
skills/mise-release-automation/
  SKILL.md
  references/
    scoped-plugins.cjs   # copy verbatim into scripts/release/ for a multi-stream setup
```
