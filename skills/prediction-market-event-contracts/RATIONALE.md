# Rationale

**Status: draft, needs review before merging.**

## What it does

Guides trading binary yes/no event contracts on prediction markets
(Kalshi, Polymarket, and similar platforms): understanding a contract
price as a direct probability estimate, platform-specific structural/
regulatory differences, cross-platform arbitrage on observed price gaps
for the same event, and where a genuine edge (vs. gambling) can actually
come from — with position-sizing and execution-risk discipline applied
exactly as it would be for any other instrument in this repo.

## Why included

Found via fresh search after 35 skills were already shipped. This adds a
genuinely distinct payoff structure — binary, bounded 0-1 outcome — that
no other strategy archetype in the repo shares (all of them trade
continuously-priced instruments: equities, crypto, commodities, rates).
It's also a fast-growing, actively relevant 2026 market (reported
multi-billion-dollar monthly volumes across major platforms) and is
unusually accessible for small capital compared to some other strategy
families already covered (e.g. convertible arbitrage's bond-market access
requirement, or institutional-scale merger arbitrage diversification) —
minimum contract sizes can be very small and no leverage/margin complexity
is involved in the base instrument.

## Extent of expected help

The most concretely actionable edge identified is cross-platform
arbitrage on the same event priced differently across platforms — a
mechanically clean opportunity when execution can capture it before the
gap closes. Beyond that, the skill is explicit that a prediction market
doesn't manufacture edge on its own: profiting from directional positions
still requires an actual, validated information or forecasting advantage
in the specific domain being traded, the same requirement underlying every
other signal source already covered in this repo. The "not a gambling
mentality" framing is treated as a first-class guardrail, not a
throwaway line, given how this instrument class is often popularly
discussed.

## Key risks / limitations

- Cross-platform arbitrage requires both legs to actually fill near the
  observed prices; execution lag can turn an apparent arbitrage into an
  unintended directional position, the same risk flagged in
  `small-account-execution`.
- Platforms differ meaningfully in regulatory status, custody, and funding
  mechanics (regulated derivatives exchange vs. crypto-settled platform);
  treating "prediction markets" as a uniform category risks missing
  material differences in counterparty and regulatory risk between them.
- A systematic probability-estimation strategy is exactly as exposed to
  overfitting and multiple-testing risk as any other model-driven signal
  in this repo, and needs the same validation discipline, not an exemption
  because the instrument is novel.
- This is strategy-design methodology, not investment or gambling advice.
  Legality and regulatory treatment of specific prediction market
  platforms varies by jurisdiction and changes over time, and must be
  verified independently rather than assumed from this general
  description.

## Sources consulted

Recent (2026) reporting on prediction market platforms (trading volumes,
platform structural/regulatory differences, cross-platform arbitrage price
gaps, category composition of trading volume) and on weather derivatives
as a related instrument class now also accessible via low-cost prediction-
market-style contracts. Described here in original wording; no code or
text copied from any source.
