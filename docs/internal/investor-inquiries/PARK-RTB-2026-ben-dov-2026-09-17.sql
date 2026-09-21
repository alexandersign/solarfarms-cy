-- Investor inquiry — Ben Dov / Masterlook
-- Received: 2026-09-17 00:37 UTC via a.sybaris@lighthief.com
-- Project: Agios Theodoros Solar Park + BESS (PARK-RTB-2026)
-- Source: Inbound email, self-identified via solarfarms.cy listing
-- Run against Supabase: project_interests table

INSERT INTO project_interests (
  project_ref,
  name,
  email,
  phone,
  message,
  scenario,
  source,
  status,
  assigned_to,
  nda_signed,
  site_visit_requested,
  notes
) VALUES (
  'PARK-RTB-2026',
  'Ben Dov',
  'masterlooknorth@gmail.com',
  NULL,
  'Interested in 25–100% equity participation in Agios Theodoros Solar Park + BESS (2.64 MWp / 10.56 MWh). '
  'Requests: (1) investor information pack, (2) signed grid connection terms / timeline, (3) permit matrix RTB→COD, '
  '(4) Excel financial model with IRR definitions, (5) debt terms (leverage / tenor / pricing / security / lender status), '
  '(6) BESS warranty + augmentation terms + dispatch study, (7) SPV & ownership structure / transaction process. '
  'Flagged discrepancy between portfolio page (~30% IRR, ~€1.05M revenue) and project page (16–20% IRR, ~€834k revenue). '
  'Willing to sign NDA.',
  'solar-bess',
  'email_inbound',
  'new',
  'office@lighthief.com',
  false,
  false,
  ARRAY[
    '2026-09-17: Inbound email to a.sybaris@lighthief.com. Inquiry well-structured — aware of EAC grid connection terms pending. Flagged investment guide page data inconsistency (now corrected in SSOT). Priority: high — 25–100% equity ticket.',
    '2026-09-17: TODO — send investor pack (teaser + xlsx), acknowledge grid terms status, clarify IRR basis, propose NDA + call.'
  ]
);
