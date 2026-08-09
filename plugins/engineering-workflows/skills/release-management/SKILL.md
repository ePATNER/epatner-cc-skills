---
name: release-management
description: Use when preparing, validating, or cutting a repository release — especially when the repo uses commit-driven versioning, generated changelogs, tagged releases, and preflight checks. Guides a clean release flow from working-tree validation through tag and release verification.
---

# Release Management

A release is not just a tag. It is the moment the repository declares a versioned public state, so the process has to be repeatable, auditable, and harder to do incorrectly than correctly.

## Release flow

1. **Start with a clean tree.** Never cut a release from a dirty working directory. If generated files, docs, or manifests are part of the release, land them first.
2. **Check the release inputs.** Confirm the target branch, release notes source, versioned manifests, and any files that must be synchronized as part of the release commit.
3. **Dry-run before publishing.** If the repository has release automation, run the dry path first and inspect the inferred next version, notes, and files it plans to touch.
4. **Publish through the canonical release path.** Use the repository's scripted or automated release entrypoint rather than re-creating the steps by hand.
5. **Verify the public result.** Confirm the pushed branch tip, the tag, the generated changelog, and the hosted release page all match the intended release.

## What to verify

- The release branch is the expected branch and up to date.
- The working tree is clean before release starts.
- Versioned manifests and the changelog are synchronized to the released version.
- The tag exists remotely and points at the intended commit.
- The hosted release exists and carries the intended notes.

## Guardrails

- Never cut a release from an unreviewed local-only state.
- Never bypass preflight checks just to get a tag out quickly.
- If the release process fails midway, inspect the remote state before retrying; do not assume nothing changed.
- Keep release notes outcome-focused: what was added, changed, fixed, or removed, and any migration-relevant callouts.

## Repository-specific release convention

This repository uses a commit-driven release flow on `main` with release automation files at:

- `package.json`
- `release.config.cjs`
- `scripts/release-preflight.sh`
- `scripts/sync-versions.mjs`
- `CHANGELOG.md`

The expected operator path is:

1. `npm run release:dry`
2. Review the inferred version and notes
3. `npm run release`
4. Verify the pushed tag and hosted release
