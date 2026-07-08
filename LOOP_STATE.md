# Skill-mining loop state

Internal bookkeeping for the recurring research loop that opens draft skill
PRs against `epatner-cc-skills`. This branch is never merged and never
opened as a PR — it's just the loop's memory across firings.

- `cron_job_id`: PENDING
- `consecutive_dry_runs`: 0
- `interval`: 30 minutes
- `stop_conditions`: 15 consecutive dry runs, OR every category below is
  covered and a fresh search for additional categories also turns up nothing
  new.

## Category checklist (financial time-series forecasting / algo-trading lifecycle)

Mark each `[ ]` → `[x] skill-name (PR #N, YYYY-MM-DD)` once covered. Order is
not fixed — pick whichever is most promising to research next, and add new
rows here if a genuinely new category surfaces mid-loop.

- [ ] news-sentiment-analysis
- [ ] deep-learning-forecasting-models
- [ ] classical-statistical-forecasting
- [ ] financial-feature-engineering
- [ ] purged-cv-backtesting
- [ ] transaction-cost-slippage-modeling
- [ ] position-sizing-risk-management
- [ ] portfolio-construction-small-capital
- [ ] alternative-data-ingestion
- [ ] regime-detection
- [ ] live-backtest-drift-monitoring
- [ ] quant-experiment-tracking
- [ ] strategy-testing-validation
- [ ] small-account-execution
- [ ] explainability-audit-documentation

## Log

- (init) State branch created, checklist seeded, cron job about to be created.
