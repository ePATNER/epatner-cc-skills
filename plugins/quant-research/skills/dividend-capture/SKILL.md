---
name: dividend-capture
description: Use when designing a strategy that buys a stock before its ex-dividend date to collect the dividend and sells shortly after — dividend capture — a strategy whose apparent edge is, by design, close to zero before costs, taxes, and settlement timing are modeled correctly, making it a specific and instructive case of the "naive edge gets erased by frictions" pattern already seen in post-earnings-announcement-drift and options-income-strategies.
---

# Dividend Capture

On the ex-dividend date, a stock's price is typically marked down by
roughly the dividend amount, because the buyer no longer receives it — the
strategy is designed around a mechanical price adjustment, not a
mispricing. That's the core thing to understand before building it: the
raw mechanics are close to a wash by construction, and whatever edge
exists has to come from somewhere more specific than "buy before, sell
after."

## The mechanics

- **Buy before the ex-dividend date, hold long enough to be a shareholder
  of record, sell after** — the ex-date price drop has historically
  averaged roughly 0.5-2% of share price in recent US equity markets,
  scaling with payout size and volatility, and it exists precisely because
  the dividend right is no longer attached to the share.
- **Settlement timing matters operationally, not just as a detail** — a
  T+2 settlement cycle means dividend cash doesn't land for two business
  days after the trade that captured it, which affects how quickly capital
  can be redeployed into the next capture cycle if running this
  systematically across many names.
- **The 60-day holding-period rule for qualified dividend tax treatment**
  (holding more than 60 days within a 121-day window centered on the
  ex-date, under US rules) directly conflicts with a fast in-and-out
  capture strategy — a short holding period typically forfeits the
  favorable tax rate on the dividend, which can materially change the
  net-of-tax economics versus the naive pre-tax return.

## Where a real, non-mechanical edge could come from

- **Systematic filters beyond "any upcoming dividend"** — e.g. trading
  only when the underlying is above a short-term moving average and
  volatility (ATR or similar) is below a threshold — are used to avoid
  capturing a dividend into a stock that's simultaneously trending down or
  unusually volatile, where the ex-date drop plus adverse price movement
  compounds instead of offsetting.
- **The genuinely capturable edge, if any, is in the size and timing of
  the ex-date price adjustment relative to the dividend itself** (whether
  the market marks the price down by exactly the dividend, more, or less)
  — not in the dividend payment itself, which is a wash by construction.
  This needs to be measured and validated directly (see
  [[purged-cv-backtesting]]), not assumed.
- **Position sizing should follow the same discipline as any other
  strategy** — a commonly cited systematic approach caps per-trade risk
  at roughly 1% of account equity with a defined stop, which is the same
  fixed-fractional discipline covered in
  [[position-sizing-risk-management]], not a strategy-specific exception.

## Guardrails

- **Model the tax treatment explicitly, not just the pre-tax price
  mechanics** — a strategy that looks profitable pre-tax can be
  materially worse net-of-tax once the qualified-dividend holding-period
  rule is applied correctly; this is a domain where the tax rule is not an
  afterthought but a first-order input to whether the strategy is worth
  running at all.
- **Model realistic transaction costs on both the buy and sell leg** (see
  [[transaction-cost-slippage-modeling]]) against the small mechanical
  price adjustment being targeted — a strategy targeting a 0.5-2% gross
  move per cycle has very little room before costs consume the apparent
  edge, the same dynamic already seen in
  [[post-earnings-announcement-drift]]'s illiquid-name transaction-cost
  trap.
- This is strategy-design methodology, not tax or investment advice; tax
  treatment depends on jurisdiction and individual circumstances and
  should be verified independently, not assumed from this skill's general
  description of the US qualified-dividend rule.
