# Rationale

**Status: draft, needs review before merging.**

## What it does

Guides the two decisions that most determine whether financial ML features
and labels are usable: making a series stationary via fractional
differencing (instead of integer differencing, which is stationary but
memory-destroying) without leaking future information into the chosen
differencing order, and labeling outcomes with the triple-barrier method
plus meta-labeling instead of naive fixed-horizon returns.

## Why included

Both the deep-learning and classical-forecasting skills already added
assume a well-constructed input series and, implicitly, a sensible target —
this skill is the missing layer underneath both: what the model is actually
trained to predict, and whether the input series still carries the memory a
model needs. Feature/label construction is also one of the highest-leverage
and most commonly mishandled steps in practice — it's easy to get a
model's architecture and validation right while still training it on a
label that doesn't reflect how a strategy would actually enter and exit a
position.

## Extent of expected help

Correctly constructed features/labels don't add "alpha" by themselves, but
they determine whether any downstream model (deep or classical) has a
realistic chance of learning something tradeable: fractional differencing
preserves predictive memory that naive differencing destroys, and
triple-barrier/meta-labeling produces a label that matches how a position
would really be exited (stop, target, or timeout) rather than an arbitrary
fixed-horizon return. The expected benefit is mainly in avoiding a specific,
well-documented class of quietly-wrong setups, more than in a measurable
accuracy uplift on its own.

## Key risks / limitations

- Fitting a "global" fractional-differencing order (or any per-instrument
  parameter) on the full historical series and applying it retroactively
  across the whole backtest is a documented, specific look-ahead-bias
  failure mode — the skill calls this out explicitly as a guardrail, not
  just a general leakage warning.
- Triple-barrier/meta-labeling adds real complexity (barrier width choices,
  a second model for meta-labeling) and its own overfitting surface; it is
  not a free upgrade over simpler labeling and should be validated
  out-of-sample like any other modeling choice.
- Event-based sampling changes what "the model saw" versus a real-time
  system — make sure the events used for sampling would actually have been
  detectable in real time, not just visible in hindsight.
- This skill is about feature/label construction only; it does not by
  itself constitute a validated strategy, is not investment advice, and
  says nothing about transaction costs or realistic capacity at small
  capital.

## Sources consulted

Recent (2026) writeups on fractional differencing for financial time series
(the stationarity/memory tradeoff, and a documented look-ahead-bias case
study in choosing the differencing order), and established quantitative
finance labeling methodology (triple-barrier method, meta-labeling,
event-based sampling) as popularized in the "Advances in Financial Machine
Learning" literature and related open-source documentation. Described here
in original wording; no code or text copied from any source.
