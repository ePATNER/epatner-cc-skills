# Rationale

**Status: draft, needs review before merging.**

## What it does

Guides building a macro-nowcasting/economic-surprise signal: estimating an
economic indicator ahead of its official, lagged release using
higher-frequency proxy data, trading the surprise (actual/nowcast vs. what
was priced in) primarily via FX/rates instruments, and the point-in-time
data discipline this domain requires given how often official macro
figures are later revised.

## Why included

Found via fresh search after 30 skills were already shipped. This is a
genuinely distinct signal domain from everything else in the repo — every
strategy archetype covered so far (`statistical-arbitrage-pairs-trading`,
`trend-following-momentum`, `funding-rate-arbitrage`,
`options-income-strategies`, `post-earnings-announcement-drift`,
`index-reconstitution-effect`) trades individual company/instrument price
series or cross-sections; this one trades economic conditions themselves,
mainly through FX and rates instruments, which is a different asset-class
and data domain than anything covered before it.

## Extent of expected help

Macro nowcasting is an active, credible research area (mixed-frequency
models, and newer work incorporating alternative proxies like satellite
data), and the surprise-trading framing is a real, used approach in FX/
rates markets. The skill is explicit about a realistic capability gap for
a small operation versus institutional macro desks with expensive
broad data feeds — public alternative proxies offer a real but more
limited entry point. The point-in-time-data guardrail is the most
load-bearing part of this skill: macro data revision is common and
sometimes large, making it an unusually easy domain in which to
accidentally build a backtest on information that wasn't actually
available at the time.

## Key risks / limitations

- Data revision in official macro statistics is common and sometimes
  substantial; using revised-after-the-fact values in a backtest instead
  of as-first-published values is a severe, domain-specific form of
  look-ahead bias that's easy to introduce without a data source that
  explicitly separates the two.
- The tradeable edge window in this domain can be very short (between
  data releases), which raises the bar on execution speed/cost relative
  to slower strategies elsewhere in the repo — a real edge here may not
  survive realistic small-account execution constraints.
- A small operation faces a genuine data-access gap versus institutional
  macro desks; the skill flags this rather than presenting nowcasting as
  equally accessible to all capital sizes.
- This is macro-signal-construction methodology, not investment advice,
  and does not guarantee that any specific nowcast or surprise signal
  constitutes a tradeable, cost-surviving edge.

## Sources consulted

Recent (2026) research and central-bank/IMF publications on macroeconomic
nowcasting (mixed-frequency high-frequency-indicator models, GDP nowcasting
using alternative data including satellite/nightlight proxies) and on
quantamental economic-surprise measures used in systematic FX trading.
Described here in original wording; no code or text copied from any
source.
