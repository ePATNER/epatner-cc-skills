# skills

A marketplace-style skill library from ePATNER Labs for engineering workflows, quantitative research, and operator-grade release discipline.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Overview

This repository is organized as a catalog of plugin-style skill packs. Each plugin groups related skills under its own manifest, documentation, and skill tree so the collection stays navigable as it grows.

## Plugin Catalog

| Plugin | Focus | Path |
|---|---|---|
| `engineering-workflows` | Planning, debugging, review, release, and execution discipline | `plugins/engineering-workflows/` |
| `quant-research` | Quant research, strategy validation, portfolio construction, and trading operations | `plugins/quant-research/` |
| `claude-code-tools` | Claude Code CLI-specific runtime tooling (status line) | `plugins/claude-code-tools/` |

## Why this repository exists

The collection is designed for repeatable, high-leverage operating patterns:

- reusable engineering workflow skills instead of one-off instructions
- disciplined quantitative research workflows with explicit validation and risk guardrails
- marketplace-style packaging so plugins can be indexed, versioned, and released consistently

## Quick Start

1. Choose a plugin directory under `plugins/`.
2. Review its `README.md` and `plugin.json`.
3. Copy or link the skill directories you want from `plugins/<plugin>/skills/<skill>/`.
4. Keep `marketplace.json` and plugin manifests in sync when adding, removing, or renaming plugins.

## Repository Layout

```text
marketplace.json
plugin.json
package.json
release.config.cjs
CHANGELOG.md
plugins/
  engineering-workflows/
    README.md
    plugin.json
    skills/
  quant-research/
    README.md
    plugin.json
    skills/
  claude-code-tools/
    README.md
    plugin.json
    skills/
scripts/
LICENSE
README.md
```

## Release Convention

The repository follows a robust, commit-driven release path on `main`:

- Conventional Commits determine version bumps.
- A clean-worktree preflight blocks dirty releases.
- Manifest versions and `CHANGELOG.md` are synchronized during release preparation.
- Git tags and the hosted release page are treated as part of the release artifact, not as optional extras.

See `plugins/engineering-workflows/skills/release-management/SKILL.md` for the repository-specific operator flow.

## Website

https://epatner.com

## License

[MIT](LICENSE)
