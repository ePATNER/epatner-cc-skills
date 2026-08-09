# epatner-cc-skills

Personal collection of [Claude Code](https://code.claude.com) skills.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Each skill lives under `skills/<name>/` with a `SKILL.md` (instructions +
frontmatter) and any supporting `assets/`. Skills are made discoverable to
Claude Code by symlinking them into `~/.claude/skills/`:

```bash
mkdir -p ~/.claude/skills
ln -s "$PWD/skills/<name>" ~/.claude/skills/<name>
```

## Skills

| Skill | Purpose |
|-------|---------|
| [`statusline-builder`](skills/statusline-builder/SKILL.md) | Build & install a SOTA, git-aware Claude Code status line (model · dir · git; context bar · cost · 5h/7d quota). |
| [`market-microstructure-signals`](skills/market-microstructure-signals/SKILL.md) | _(draft, pending review)_ Order-flow imbalance/toxicity signals from order-book data, with heavy emphasis on cost-sensitivity and data feasibility. |
| [`signal-ensembling`](skills/signal-ensembling/SKILL.md) | _(draft, pending review)_ Combine multiple models/signals via voting, blending, or validated stacking to cut variance, not chase complexity. |
| [`explainability-audit-documentation`](skills/explainability-audit-documentation/SKILL.md) | _(draft, pending review)_ SHAP-style attribution and a timestamped decision log, scoped for a small operation (not a compliance substitute). |
| [`small-account-execution`](skills/small-account-execution/SKILL.md) | _(draft, pending review)_ Order-type choice, broker API reliability, and small-account regulatory awareness for the execution layer. |
| [`strategy-testing-validation`](skills/strategy-testing-validation/SKILL.md) | _(draft, pending review)_ Unit/integration-test pipeline code, sanity-check data, and stage rollout through paper/shadow before real capital. |
| [`quant-experiment-tracking`](skills/quant-experiment-tracking/SKILL.md) | _(draft, pending review)_ Log every hypothesis/trial (including failures) so multiple-testing correction and reproducibility are honest. |
| [`live-backtest-drift-monitoring`](skills/live-backtest-drift-monitoring/SKILL.md) | _(draft, pending review)_ Detect alpha decay/live-backtest divergence and use pre-committed kill switches instead of in-the-moment calls. |
| [`regime-detection`](skills/regime-detection/SKILL.md) | _(draft, pending review)_ HMM-based regime detection to resize/switch strategies, with guardrails against regime-blind backtests. |
| [`alternative-data-ingestion`](skills/alternative-data-ingestion/SKILL.md) | _(draft, pending review)_ Source realistic alt-data at small scale and vet it for point-in-time integrity before trusting a backtest. |
| [`portfolio-construction-small-capital`](skills/portfolio-construction-small-capital/SKILL.md) | _(draft, pending review)_ Combine multiple micro-strategies by risk contribution, with honest overlap/correlation checks. |
| [`position-sizing-risk-management`](skills/position-sizing-risk-management/SKILL.md) | _(draft, pending review)_ Fractional Kelly/fixed-fractional sizing, portfolio heat caps, and mechanical drawdown rules. |
| [`transaction-cost-slippage-modeling`](skills/transaction-cost-slippage-modeling/SKILL.md) | _(draft, pending review)_ Model spread/commission/slippage/impact sized correctly for account size, not a zero-cost backtest. |
| [`purged-cv-backtesting`](skills/purged-cv-backtesting/SKILL.md) | _(draft, pending review)_ Purged/embargoed CV plus Deflated Sharpe/PBO correction to tell a real edge from selection bias. |
| [`financial-feature-engineering`](skills/financial-feature-engineering/SKILL.md) | _(draft, pending review)_ Fractional differencing for stationarity without losing memory; triple-barrier + meta-labeling for realistic targets. |
| [`classical-statistical-forecasting`](skills/classical-statistical-forecasting/SKILL.md) | _(draft, pending review)_ Know when ARIMA/GARCH/regime-switching models beat or complement a deep model. |
| [`deep-learning-forecasting-models`](skills/deep-learning-forecasting-models/SKILL.md) | _(draft, pending review)_ Pick and correctly train a DL forecasting architecture sized to your data, without silent overfitting. |
| [`news-sentiment-analysis`](skills/news-sentiment-analysis/SKILL.md) | _(draft, pending review)_ Build a news/text-to-signal pipeline: ingestion, scoring cascade, event tagging, decay, normalization. |
| [`subagent-driven-development`](skills/subagent-driven-development/SKILL.md) | Hand a planned step to a fresh implementer subagent, then a fresh reviewer subagent, for a clean-room result. |
| [`using-git-worktrees`](skills/using-git-worktrees/SKILL.md) | Set up/tear down git worktrees to work on two branches at once without disturbing the current checkout. |
| [`receiving-code-review`](skills/receiving-code-review/SKILL.md) | Triage review feedback by validity/scope instead of blindly applying or ignoring it. |
| [`test-driven-development`](skills/test-driven-development/SKILL.md) | RED → GREEN → REFACTOR: write the failing test before the implementation. |
| [`systematic-debugging`](skills/systematic-debugging/SKILL.md) | Root-cause-first bug investigation: reproduce → localize → root-cause → minimal fix → verify. |
| [`writing-plans`](skills/writing-plans/SKILL.md) | Break a multi-file feature/migration into small, independently verifiable steps before coding. |
| [`brainstorming`](skills/brainstorming/SKILL.md) | Refine an ambiguous request into an agreed design through targeted questions before writing any code. |
| [`skill-creator`](skills/skill-creator/SKILL.md) | Guidance for drafting a new SKILL.md that actually triggers and gets followed. |

## Layout

```
skills/
  <name>/
    SKILL.md        # name + description frontmatter, then instructions
    assets/         # scripts / templates the skill installs or references
```

## Contributing

Each skill is added on its own branch (`epatner/add-<name>-skill`) and merged
via a squash-merged PR titled `epatner: add <name> skill`. See
[`skills/skill-creator/SKILL.md`](skills/skill-creator/SKILL.md) for the
process and conventions to follow when drafting a new one.

## License

[MIT](LICENSE) © epatner
