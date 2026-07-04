#!/usr/bin/env python3
"""Claude Code custom status line — SOTA two-line, git-aware layout.

Line 1:  <model>  ·  <dir>  ·  <git>
Line 2:  <context bar> <ctx%>  ·  $<session cost>  ·  5h <pct>  ·  7d <pct>

Reads the session JSON that Claude Code streams on stdin and prints the bar.
Pure Python standard library — no `jq`, no third-party packages — so it works
on any box that has python3. Every field is optional-safe: missing data degrades
to a dim placeholder, it never crashes the status line.

Field reference: https://code.claude.com/docs/en/statusline
"""

import json
import os
import subprocess
import sys

# --- ANSI palette (terminal-safe, renders in light and dark themes) -----------
RESET = "\033[0m"
BOLD = "\033[1m"
DIM = "\033[2m"
CYAN = "\033[36m"
BLUE = "\033[34m"
GREEN = "\033[32m"
YELLOW = "\033[33m"
RED = "\033[31m"
MAGENTA = "\033[35m"
SEP = f" {DIM}·{RESET} "


def read_input() -> dict:
    try:
        return json.load(sys.stdin)
    except Exception:
        return {}


def g(data: dict, path: str, default=None):
    """Safe nested lookup: g(data, 'rate_limits.five_hour.used_percentage')."""
    cur = data
    for key in path.split("."):
        if isinstance(cur, dict) and cur.get(key) is not None:
            cur = cur[key]
        else:
            return default
    return cur


def _git(cwd: str, *args: str) -> str:
    try:
        out = subprocess.run(
            ["git", "-C", cwd, *args],
            capture_output=True, text=True, timeout=1.5,
        )
        return out.stdout.strip() if out.returncode == 0 else ""
    except Exception:
        return ""


def git_segment(cwd: str) -> str:
    """Branch (+dirty marker) inside a repo; an explicit note when there isn't one."""
    inside = _git(cwd, "rev-parse", "--is-inside-work-tree")
    if inside != "true":
        return f"{DIM}not a git repo{RESET}"
    branch = _git(cwd, "symbolic-ref", "--short", "HEAD") \
        or _git(cwd, "rev-parse", "--short", "HEAD") \
        or "detached"
    dirty = f"{YELLOW}*{RESET}" if _git(cwd, "status", "--porcelain") else ""
    return f"{MAGENTA}⎇ {branch}{RESET}{dirty}"


def pct_color(pct: float) -> str:
    if pct >= 80:
        return RED
    if pct >= 50:
        return YELLOW
    return GREEN


def bar(pct: float, width: int = 10) -> str:
    pct = max(0.0, min(100.0, pct))
    filled = int(round(pct / 100 * width))
    filled = max(0, min(width, filled))
    return "▓" * filled + "░" * (width - filled)


def as_int_pct(value) -> int | None:
    try:
        return int(float(value))
    except (TypeError, ValueError):
        return None


def main() -> None:
    data = read_input()

    # ---- Line 1: model · dir · git ------------------------------------------
    model = g(data, "model.display_name", "?")
    cwd = g(data, "workspace.current_dir") or os.getcwd()
    dirname = os.path.basename(cwd.rstrip("/")) or cwd
    line1 = SEP.join([
        f"{BOLD}{CYAN}{model}{RESET}",
        f"{BLUE}{dirname}{RESET}",
        git_segment(cwd),
    ])

    # ---- Line 2: context bar · cost · 5h/7d quota ---------------------------
    parts: list[str] = []

    ctx = as_int_pct(g(data, "context_window.used_percentage"))
    if ctx is not None:
        c = pct_color(ctx)
        parts.append(f"{c}{bar(ctx)}{RESET} {c}{ctx}%{RESET} ctx")
    else:
        parts.append(f"{DIM}ctx n/a{RESET}")

    cost = g(data, "cost.total_cost_usd")
    if cost is not None:
        try:
            parts.append(f"${float(cost):.2f}")
        except (TypeError, ValueError):
            pass

    # rate_limits appear only for Pro/Max subscribers, after the first API call.
    h5 = as_int_pct(g(data, "rate_limits.five_hour.used_percentage"))
    if h5 is not None:
        parts.append(f"5h {pct_color(h5)}{h5}%{RESET}")
    d7 = as_int_pct(g(data, "rate_limits.seven_day.used_percentage"))
    if d7 is not None:
        parts.append(f"7d {pct_color(d7)}{d7}%{RESET}")

    line2 = SEP.join(parts)
    sys.stdout.write(f"{line1}\n{line2}{RESET}")


if __name__ == "__main__":
    main()
