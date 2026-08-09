# skills

Marketplace-style collection of reusable skills for engineering workflows, research operations, and quantitative strategy work.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Overview

This repository is organized as a catalog of plugin-style skill packs. Each plugin groups related skills under a dedicated directory with its own manifest and documentation. The root manifests provide a single index for discovery and packaging.

## Plugin Catalog

| Plugin | Focus | Path |
|---|---|---|
| `engineering-workflows` | Planning, debugging, review, and execution discipline | `plugins/engineering-workflows/` |
| `quant-research` | Quant research, strategy validation, and trading operations | `plugins/quant-research/` |

## Quick Start

1. Choose a plugin directory under `plugins/`.
2. Review its `README.md` and `plugin.json`.
3. Copy or link the skill directories you want from `plugins/<plugin>/skills/<skill>/`.
4. Keep `marketplace.json` and the plugin manifests in sync when adding, removing, or renaming plugins.

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
scripts/
LICENSE
README.md
```

## Release Convention

The repository is set up for commit-driven releases on `main` using semantic-release conventions:

- conventional commits drive version bumps
- a clean-worktree preflight blocks dirty releases
- versioned manifests and `CHANGELOG.md` are synchronized during release preparation
- tagged GitHub releases are the distribution boundary

## License

[MIT](LICENSE)
