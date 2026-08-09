# Rationale

**Status: draft, needs review before merging.**

## What it does

Guides constructing a signal from SEC Form 4 insider transaction filings,
specifically detecting cluster buying (multiple insiders independently
purchasing the same company's stock within a short window) as a stronger,
more specific confidence signal than any single filing — filtering out
routine/pre-scheduled activity, weighting by role and purchase size, and
strict filing-date (not transaction-date) point-in-time discipline.

## Why included

Found via fresh search after 36 skills were already shipped.
`alternative-data-ingestion` (already added) mentions insider transactions
only in passing as one example of an accessible public-filing data type;
this skill gives that specific signal source the dedicated treatment its
documented characteristics warrant — a quantified small/mid-cap
concentration, a specific and important point-in-time pitfall (filing lag),
and a meaningful distinction (cluster vs. single transaction, opportunistic
vs. pre-scheduled) that a generic "use public filings" mention doesn't
capture.

## Extent of expected help

Academic evidence cited in current research reports insider cluster-buying
associated with meaningful excess returns concentrated in small/mid-cap
names over a roughly 12-month horizon — a direct fit for a small-capital
operation's natural universe, similar to how
`post-earnings-announcement-drift`'s effect also concentrates in
thinner-coverage names. The skill is framed as a screening tool to
prompt further investigation, not an automatic trigger, since the
underlying "why" behind any specific cluster still needs judgment the
raw filing data doesn't supply.

## Key risks / limitations

- The filing-date-vs-transaction-date distinction is a specific,
  easy-to-miss look-ahead bias risk particular to this data source; a
  backtest using the wrong date will appear to have information the
  market didn't actually have available at that time.
- Distinguishing discretionary open-market buying from routine/
  pre-scheduled (10b5-1) activity requires classifying transaction types
  correctly from the filing data, which is more involved than simply
  counting "insider buy" events — getting this wrong dilutes the signal
  with noise.
- Reported effect sizes are historical, sample-specific academic findings,
  not a guaranteed forward return; the effect's concentration in less-
  covered names also means thinner liquidity and higher transaction costs
  (see [[transaction-cost-slippage-modeling]]), which need to be modeled
  before assuming the gross effect is capturable net of costs — the same
  caution already applied to PEAD's illiquid-name trap.
- This is signal-construction methodology, not investment advice, and
  does not itself establish that any specific detected cluster reflects
  genuine private information rather than coincidence.

## Sources consulted

Recent (2026) writeups on SEC Form 4 insider trading disclosure
requirements, cluster-buying as a stronger signal than single
transactions, and academic evidence on insider-buying-associated excess
returns concentrated in small/mid-cap names. Described here in original
wording; no code or text copied from any source, and specific cited
effect-size figures are reported as illustrative of the research area, not
endorsed as a forward-looking guarantee.
