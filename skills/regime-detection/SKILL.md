---
name: regime-detection
description: Use when a strategy or model needs to adapt to changing market conditions — detecting whether the market is in a distinct state (calm/turbulent, trending/mean-reverting) and using that to switch strategy sleeves, resize positions, or suspend a model known to fail in a given regime, rather than running one fixed approach through every condition.
---

# Regime Detection

Most strategies work in some conditions and fail in others; the honest fix
is detecting which condition you're in and adapting, rather than hoping one
fixed model or parameter set survives every regime forever. Regime
detection is also where a short backtest most dangerously fools you: an
excellent-looking result over six to twelve months may just mean the test
window never left one favorable regime.

## Detecting regimes

- **Hidden Markov Models (HMMs) are a standard, well-understood approach.**
  Model the market as switching between a small number of hidden states
  (e.g. calm/turbulent, or trending/mean-reverting), inferred from observed
  features like returns, realized volatility, volume imbalance, or spread —
  rather than assuming the regime itself is directly observable.
- **Keep the state count small and the features interpretable.** Two or
  three regimes (e.g. low/high volatility, or trending/ranging) tend to be
  more stable and more actionable than a large state space fit to chase
  every wiggle — the goal is a regime signal you can explain and act on,
  not a maximally-fitting model.
- **Change-point detection is a complementary tool** for flagging that a
  structural break just happened, even before a full regime-classification
  model would confidently relabel the state — useful as an early-warning
  signal layered on top of, not instead of, a regime model.

## Using the regime signal

- **Resize or de-risk in turbulent regimes rather than only in calm ones.**
  A regime signal is most valuable as a risk control: cut position size or
  leverage, widen stops, or suspend a model in a state where it's known to
  perform poorly — this ties directly into
  [[position-sizing-risk-management]] rather than being a separate,
  disconnected system.
- **Switch strategy sleeves rather than forcing one strategy through every
  regime.** If a trend-following approach and a mean-reversion approach
  behave oppositely (see [[portfolio-construction-small-capital]]), a
  regime signal can shift weight between them instead of running both
  statically at fixed weight through conditions where one predictably
  underperforms.
- **Favor smooth/probabilistic transitions over hard regime switches.**
  Abruptly flipping strategy or sizing on a discrete regime label tends to
  produce whipsaws right at the transition; using regime probabilities to
  scale exposure gradually is more robust in practice.

## Guardrails

- **Validate over a period that actually spans multiple regimes.** A
  backtest confined to one regime (a single trending bull run, or a single
  calm period) cannot tell you how the regime-detection system — or the
  underlying strategy — behaves at a transition, which is exactly when it
  matters most. Treat an extraordinary Sharpe ratio from a short, single-
  regime test window with suspicion rather than as a real result.
- **Explain the regime model's failure conditions before relying on it.**
  A regime model deployed as a black box, with no understanding of when or
  why it might mislabel the current state, is a known way to trust a signal
  that quietly stops working — document what the model can't detect, not
  just what it can.
- **Regime models are themselves subject to overfitting** (see
  [[purged-cv-backtesting]]) — tuning the number of states or the feature
  set until historical regime labels look clean risks the same "perfectly
  predicts the past" failure mode as any other model.
