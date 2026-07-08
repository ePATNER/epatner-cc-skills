---
name: purged-cv-backtesting
description: Use when validating a financial forecasting model or trading strategy — designing the train/test split scheme so it doesn't leak information across the boundary, and when deciding whether a backtested result (a Sharpe ratio, a return figure, a "best" strategy variant out of many tried) is actually evidence of skill or just selection bias from trying enough variants.
---

# Purged Cross-Validation & Honest Backtesting

Two separate problems live under "backtesting": whether the train/test split
itself leaks information (fixable with the right CV scheme), and whether
the number that came out the other end is real or just the best of many
random draws (fixable by correcting for how many things were tried). Get
either wrong and a backtest can look excellent and mean nothing.

## Building a leakage-safe validation scheme

- **Plain k-fold CV is unsafe for time series.** Random folds put future
  observations in the training set for a test point in the past, and
  overlapping/autocorrelated labels (e.g. triple-barrier windows, see
  [[financial-feature-engineering]]) leak across fold boundaries even
  when folds are chronological.
- **Purge overlapping observations.** Remove training samples whose label
  window overlaps the test period's label windows — otherwise the model
  trains on information that "leaks backward" from the test set through
  overlapping outcome windows.
- **Embargo after each test period.** After a test fold, drop a further
  block of subsequent observations from training — this accounts for
  delayed reactions and autocorrelation that purging alone doesn't catch.
- **Prefer combinatorial purged CV (CPCV) over a single walk-forward path
  when feasible.** A single walk-forward split gives one backtest path;
  CPCV constructs many purged/embargoed train-test combinations, giving a
  distribution of out-of-sample outcomes instead of one number — this
  materially reduces false-discovery risk relative to walk-forward alone,
  at the cost of more compute.

## Deciding whether a backtest result is real

- **Count how many variants you tried.** Every parameter tweak, feature
  added, or threshold adjusted while watching backtest performance is a
  trial. The more trials, the more likely the best-looking one is just the
  luckiest draw, not the most skillful.
- **Apply the Deflated Sharpe Ratio (DSR)** to correct the observed Sharpe
  ratio for the number of trials and for non-normal returns before trusting
  it. A raw Sharpe of 2 chosen as the best of fifty variants is not the same
  claim as a Sharpe of 2 from the only variant tried.
- **Estimate Probability of Backtest Overfitting (PBO)** for a strategy
  selection process, not just a single strategy — PBO above roughly 50%
  means the process that picked the "best" strategy is more likely than not
  selecting for something that won't repeat out-of-sample.
- **If the deflated Sharpe collapses toward zero (or below ~1) after
  correction, treat that as "no strategy found," not "weak strategy."**
  This is the single most common way an enthusiastic backtest turns into a
  losing live strategy.

## Process

1. Decide the CV scheme (purged k-fold at minimum; CPCV if compute allows)
   before running any experiments — not after seeing which split makes the
   numbers look best.
2. Log every variant tried, including ones abandoned, so the trial count
   used for DSR/PBO correction is honest.
3. Report the deflated Sharpe and, where feasible, a PBO estimate alongside
   any raw backtest number — never present a raw, uncorrected metric as the
   headline result of a search process.
4. Re-validate on a fresh, later-arriving slice of data the model/strategy
   never touched during development, as a final check beyond CV.

## Guardrails

- A backtest scheme that doesn't purge/embargo will systematically overstate
  performance — treat this as a correctness bug in the evaluation, not a
  minor detail.
- Small-capital strategy research often involves trying many variants
  quickly; that's exactly the situation DSR/PBO correction is for. Track
  trial counts from day one rather than trying to reconstruct them later.
- This skill validates whether a result is statistically trustworthy — it
  says nothing about transaction costs, slippage, or capacity, which need
  separate treatment (see [[transaction-cost-slippage-modeling]] once
  available) before any capital allocation.
