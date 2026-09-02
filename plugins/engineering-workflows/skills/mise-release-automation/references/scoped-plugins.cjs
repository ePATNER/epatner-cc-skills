/**
 * A small local wrapper around the official `@semantic-release/commit-analyzer`
 * and `@semantic-release/release-notes-generator`, scoping both to only the
 * commits that touch a given set of paths.
 *
 * Why this exists (see the mise-release-automation SKILL.md for the full
 * picture): a repo running independent semantic-release streams isn't
 * always laid out as npm/yarn workspaces. The community monorepo tools
 * (`semantic-release-monorepo`, `@rimac-technology/semantic-release-monorepo`)
 * filter commits by "touched a file in or below the package's root
 * directory" — inclusion-only, based on the invocation cwd. That fits a
 * stream that already lives in one isolated subtree (e.g. `web/`), but not
 * a stream whose files are spread across several top-level directories
 * (e.g. a Go backend in `cmd/`, `internal/`, `config/` at the repo root,
 * alongside a `web/` frontend) — there's no single directory that means
 * "everything except web". This file gives exact, explicit include-glob
 * control per stream instead, without restructuring the repo or depending
 * on a third-party tool whose model doesn't match every repo's shape.
 *
 * Usage from release.config.<stream>.cjs:
 *
 *   const scoped = require("./scripts/release/scoped-plugins.cjs");
 *   module.exports = {
 *     plugins: [
 *       [scoped.commitAnalyzer, { include: [...], releaseRules: [...] }],
 *       [scoped.releaseNotesGenerator, { include: [...] }],
 *       ...
 *     ],
 *   };
 *
 * `include` is a micromatch glob array, matched against each commit's
 * changed files (via `git diff-tree`). A commit is kept for this stream if
 * ANY of its changed files match ANY of the include globs. Both plugins
 * below delegate to the real, official plugin functions after filtering
 * `context.commits` — no reimplementation of commit-analysis or
 * notes-generation logic, just the path filter in front of it.
 */

const { execFileSync } = require("node:child_process");
const micromatch = require("micromatch");
const commitAnalyzer = require("@semantic-release/commit-analyzer");
const releaseNotesGenerator = require("@semantic-release/release-notes-generator");

/**
 * Files changed by one commit. Returns an empty array (rather than
 * throwing) on any git failure — a commit we can't classify is excluded
 * from this stream, not a fatal error for the whole release run.
 */
function changedFiles(hash) {
  try {
    const out = execFileSync(
      "git",
      ["diff-tree", "--no-commit-id", "--name-only", "-r", hash],
      { encoding: "utf8" },
    );
    return out.split("\n").filter(Boolean);
  } catch {
    return [];
  }
}

function commitTouchesInclude(commit, include) {
  return changedFiles(commit.hash).some((file) => micromatch.isMatch(file, include));
}

/**
 * Returns a shallow-cloned context whose `commits` array is filtered down
 * to only those matching `pluginConfig.include`.
 */
function scopedContext(pluginConfig, context) {
  const { include } = pluginConfig;
  if (!Array.isArray(include) || include.length === 0) {
    throw new Error(
      "scoped-plugins: `include` must be a non-empty glob array in the plugin config",
    );
  }
  return {
    ...context,
    commits: context.commits.filter((commit) => commitTouchesInclude(commit, include)),
  };
}

module.exports = {
  commitAnalyzer: {
    analyzeCommits: (pluginConfig, context) =>
      commitAnalyzer.analyzeCommits(pluginConfig, scopedContext(pluginConfig, context)),
  },
  releaseNotesGenerator: {
    generateNotes: (pluginConfig, context) =>
      releaseNotesGenerator.generateNotes(pluginConfig, scopedContext(pluginConfig, context)),
  },
};
