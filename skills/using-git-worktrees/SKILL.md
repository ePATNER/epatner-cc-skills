---
name: using-git-worktrees
description: Use when work on two branches needs to happen at once without disturbing the current working tree — e.g. running a long build/test on one branch while continuing to edit another, comparing behavior across branches, or isolating a subagent's implementation from the main session's checkout. Sets up and tears down git worktrees safely.
---

# Using Git Worktrees

Stashing and switching branches works for one thing at a time. Worktrees let
two branches be checked out simultaneously in separate directories against
the same repo — no stash juggling, no risk of committing to the wrong branch.

## Setup

```bash
git worktree add ../repo-<branch> <branch>       # existing branch
git worktree add -b <new-branch> ../repo-<new-branch>   # new branch
```

Put worktrees as sibling directories (`../repo-<branch>`), not nested inside
the main checkout — nesting confuses tools that walk up looking for a repo
root.

## Rules

- **Know which directory you're in before running git commands.** Every
  worktree has its own `HEAD` and index; a command run from the wrong
  directory commits to the wrong branch. Check `git status` or `pwd` if
  there's any doubt.
- **Don't check out the same branch in two worktrees** — git refuses this
  for a reason (it can't reconcile two working copies of one branch).
- **Uncommitted changes don't follow you.** Each worktree's working
  directory is independent; nothing in one is visible from another until
  it's committed (or explicitly copied).

## Teardown

```bash
git worktree remove ../repo-<branch>   # after committing/merging what you need
git worktree prune                     # clean up stale entries after manual rm -rf
```

Remove a worktree once its branch is merged or abandoned — stale worktrees
accumulate and make `git worktree list` noisy.

## When to reach for this vs. a plain branch switch

Use a worktree when you need **both** checkouts to exist at once (parallel
long-running command, side-by-side diff, a subagent implementing in
isolation via the `Agent` tool's `isolation: "worktree"` option). Use a
normal `git checkout`/`git switch` when only one branch's state matters at a
time — worktrees add directory-management overhead that isn't worth it for
sequential work.
