#!/usr/bin/env bash
set -euo pipefail
if [[ -n "$(git status --porcelain)" ]]; then
  echo "❌ Working directory not clean"
  git status --short
  exit 1
fi
