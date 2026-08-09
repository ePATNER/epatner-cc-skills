---
name: insider-cluster-buying-signal
description: Use when building a signal from corporate insider transactions (SEC Form 4 filings) — specifically detecting cluster buying (multiple insiders purchasing the same company's stock within a short window) as a confidence signal — a public-filing-based signal source distinct from news/text sentiment, with a documented small/mid-cap concentration that makes it worth a dedicated treatment beyond a passing mention as one alternative-data type among many.
---

# Insider Cluster-Buying Signal

Corporate insiders (officers, directors, large shareholders) must publicly
disclose stock purchases and sales within two business days via SEC Form
4. A single insider sale is weak signal (routine diversification,
tax planning, pre-scheduled 10b5-1 plans); several insiders independently
buying the same stock in a short window is a much stronger, harder-to-
explain-away signal of internal confidence — that specific pattern, not
insider activity in general, is what this skill is about.

## What makes cluster buying a meaningfully different signal than a single filing

- **Multiple insiders buying independently within a short window (commonly
  cited as roughly 15 days) is a stronger signal than any single
  transaction** — it's harder to attribute to one person's idiosyncratic
  liquidity need or personal view, and more plausibly reflects shared
  internal information or confidence.
- **Distinguish opportunistic open-market buying from routine or
  pre-scheduled activity.** A Rule 10b5-1 pre-scheduled sale plan set up
  months in advance carries essentially no informational content about
  current conditions; an unscheduled, discretionary open-market purchase
  does. Filter for the latter — conflating the two dilutes the signal with
  noise that has no relationship to the effect being targeted.
- **Weight by role and purchase size relative to the insider's existing
  holdings/compensation**, not just transaction count — a large purchase
  by a CFO is a different signal than a token purchase by a minor officer,
  even if both technically count as "an insider buy."

## Documented effect and where it concentrates

- **The effect is reported to concentrate in small- and mid-cap names**,
  not large caps — consistent with the general pattern (also seen in
  [[post-earnings-announcement-drift]]) that informational effects persist
  longest where analyst coverage and market attention are thinnest. This
  is a direct fit for a small-capital operation's natural universe, not
  just a coincidental overlap.
- **This is a screening signal, not a standalone trigger** — treat
  detected cluster buying as a prompt to investigate the company further
  (why now, what's changed, any pending catalyst), the same way a
  quantitative screen is typically used as a starting point rather than an
  automatic buy signal on its own.

## Data handling

- **Respect the actual disclosure timeline, not the transaction date** —
  Form 4 filings are required within two business days of the
  transaction, meaning the market (and a backtest) only actually has
  access to the information as of the filing date, not the trade date;
  using the trade date in a backtest introduces a direct, specific form of
  look-ahead bias (see [[alternative-data-ingestion]] for the general
  point-in-time principle this instantiates).
- **This can be combined with cross-sectional ranking infrastructure**
  (see [[cross-sectional-equity-factor-investing]]) — insider buying
  intensity is usable as one more cross-sectional factor, ranked and
  screened the same way as any other, rather than requiring bespoke
  infrastructure.

## Guardrails

- Never use the transaction date instead of the filing date in a backtest
  or live screen — this is the single most important, specific discipline
  for this signal and the easiest mistake to make with filing-based data.
- Don't treat any single insider transaction, or non-clustered buying, as
  equally meaningful to a genuine cluster — the skill's documented value is
  specifically in the clustering pattern, not insider activity broadly.
- This is signal-construction methodology, not investment advice; academic
  effect-size estimates for this signal are historical and sample-specific,
  not a guaranteed forward return, and should be validated on your own
  point-in-time data (see [[purged-cv-backtesting]]) before being trusted.
