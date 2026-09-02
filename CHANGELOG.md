# [1.1.0](https://github.com/epatnerlab/skills/compare/v1.0.0...v1.1.0) (2026-09-02)


### Bug Fixes

* correct repository.url to match the actual GitHub org slug ([e1cd621](https://github.com/epatnerlab/skills/commit/e1cd621c88da0eb8e224f6b31375e92cd3ab6996))


### Features

* add claude-code-tools statusline skill and mise-release-automation skill ([#47](https://github.com/epatnerlab/skills/issues/47)) ([e1cf193](https://github.com/epatnerlab/skills/commit/e1cf1936c2e7d6dec9a20a98e48c9e498c443c3b))

# Changelog

All notable changes to this repository are documented here.

## 1.0.0 - 2026-08-09

### Added
- a marketplace-style repository structure with root metadata, plugin manifests, and catalog indexing
- a dedicated engineering-workflows plugin for planning, debugging, review, testing, and release discipline
- a dedicated quant-research plugin for quantitative strategy research, validation, execution, and portfolio operations
- semantic-release scaffolding for preflight validation, manifest synchronization, changelog updates, tagging, and hosted release publication

### Changed
- reorganized standalone skill directories into plugin-scoped packages
- rewrote repository metadata and documentation for an organization-owned, public release presentation

### Removed
- provider-specific packaging and statusline assets that did not belong in the public marketplace release surface
- explicit automated-authorship attribution from the published repository surface and released history
