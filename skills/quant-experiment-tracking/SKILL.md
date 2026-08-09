---
name: quant-experiment-tracking
description: Use when running or organizing a strategy research process that will involve many experiments over time — setting up a research log/experiment tracker so every hypothesis, dataset version, and result is recorded, making the eventual trial count honest and the results reproducible, instead of an ad hoc set of scripts and half-remembered attempts.
---

# Quant Experiment Tracking

The Deflated Sharpe Ratio / Probability of Backtest Overfitting correction
in [[purged-cv-backtesting]] is only as good as the trial count it's given
— and that count is only honest if every experiment, including the ones
that didn't work, was actually logged. This skill is the research-process
infrastructure that makes that possible, and makes results reproducible
months later instead of "I think this is the version that worked."

## What to log for every experiment

- **A falsifiable hypothesis, stated before running anything**: the
  specific economic claim, the dependent variable, the predictor(s), the
  sample/universe/period, and what result would count as disproving it.
  Writing this down before seeing results is what keeps the process
  hypothesis-driven rather than pattern-mining until something looks good.
- **Exact data version used** — which dataset snapshot, as-of what point-
  in-time cut (see [[alternative-data-ingestion]] and
  [[financial-feature-engineering]] for why point-in-time matters), and any
  preprocessing applied. Without this, "the same experiment" run later can
  silently use different data and produce different results.
- **Model/strategy configuration and code version** — parameters, feature
  set, and a code reference (commit hash) specific enough to actually
  reproduce the run, not just a general description of the approach.
- **Full results, not just the ones kept** — every metric from every run,
  including abandoned or failed attempts. An experiment that "didn't work"
  is still a trial that must count toward the eventual multiple-testing
  correction.

## Why this discipline specifically prevents a known failure mode

- **The number of things tried determines how much to distrust the best
  result.** A backtested Sharpe ratio well above what's plausible for the
  strategy type (as a rule of thumb, an uncorrected Sharpe reported above
  roughly 3 in a mature market should itself raise suspicion of a
  methodology error, including undisclosed multiple testing) is a signal to
  check the trial count and re-apply deflation, not a reason for
  excitement.
- **An incomplete research log understates the real trial count**, which
  makes the deflated-Sharpe/PBO correction from [[purged-cv-backtesting]]
  too generous — the correction can't account for experiments it was never
  told about.
- **A structured hypothesis schema also keeps research economically
  grounded**, rather than an unconstrained search over features/parameters
  until something correlates — stating the economic claim up front is a
  natural check against pure data mining.

## Guardrails

- Log failed/abandoned experiments with the same rigor as successful
  ones — the temptation to skip logging a "boring" negative result is
  exactly what breaks the trial count later.
- Treat an implausibly good result as a prompt to audit the log (data
  leakage, undercounted trials, a bug) before treating it as a discovery —
  see the specific Sharpe-ratio sanity check above.
- Experiment tracking is process discipline, not a specific tool
  requirement — a consistently used spreadsheet/log with the fields above
  is better than an unused sophisticated MLOps platform; adopt tooling
  (open-source experiment trackers, a simple structured log) that will
  actually be kept up in practice given the operation's scale.
