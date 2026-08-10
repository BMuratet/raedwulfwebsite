---
# PHOTOS TO ADD:
# Copy selected images to: site/public/images/work/opencraft-estimating-engine/
# Suggested filenames:
#   hero.jpg              — the estimate wizard / quote screen (clean UI shot)
#   quote-pdf.jpg         — a generated client-facing quote PDF
#   estimate-comparison.jpg — CUSTOM GRAPHIC, not a screenshot: the flawed $35k estimate
#                             next to the corrected ~$22-25k one, with the two fixed
#                             inputs (labor hours, hardware cost) labeled. This is the
#                             single most important image in this case study — a UI
#                             screenshot alone reads as "a form," not as the calibration
#                             catch that actually happened.

title: "OpenCraft: An Estimating Engine Running Two Businesses"
subtitle: "A gross-margin quoting system built to replace spreadsheets and gut-feel pricing"
description: "Two shops — B10 Union and Raedwulf Productions — were both pricing jobs the same broken way: spreadsheets, gut feel, and whatever the most senior person remembered from the last similar job. OpenCraft is a multi-tenant estimating engine built from scratch to replace that with structured, defensible numbers, now running production quotes for both."
heroAspectRatio: "3/4"
category: "Production Management"
tags: ["SaaS", "estimating software", "AI-assisted development", "pricing strategy", "multi-tenant", "production management"]
role: "Product Designer, Full-Stack Developer"
duration: "Built from scratch; in production since February 2026"
constraint: "Two different fabrication shops were pricing jobs without a shared, defensible number — no way to know if a quote actually made money until the job was already done. Off-the-shelf estimating tools assume a generic contractor's cost model, not the labor-heavy, low-material-cost economics of custom fabrication."
outcome: "A real multi-tenant estimating engine now serves both businesses independently — structured quote, materials/labor cost breakdown, and client-ready invoice, grounded in historical job data rather than industry averages."
valueCreated:
  - "Replaced spreadsheet-and-gut-feel pricing with a structured, auditable pipeline for two businesses at once"
  - "Caught a labor-estimator miscalibration (3.6x too high) before it could quietly erode margin on real jobs"
  - "Identified a $4,400 hardware/sub-contracted-parts blind spot in the cost model"
  - "Runs as a live multi-tenant product, not a one-off spreadsheet template"
  - "Named the exact two inputs that still need real-world calibration, with a scoped plan to close each"
skillsDemonstrated:
  - "Full-stack product design and development"
  - "AI-assisted software development"
  - "Pricing and gross-margin modeling"
  - "Diagnosing a flawed system against real-world ground truth"
  - "Scoping fixes precisely instead of over-correcting"
  - "Multi-tenant / multi-business product architecture"
order: 8
thumbnailPosition: "center"
draft: true
publishDate: "2026-07-28"
---

Two shops I work with — B10 Union, a design-build fabrication studio, and Raedwulf Productions, my own cabinetry and closet business — were both pricing jobs the same way: spreadsheets, gut feel, and whatever the most senior person remembered from the last similar job. There was no shared, defensible number, and no way to know if a quote actually made money until the job was already finished and it was too late to change anything.

## The Constraint

Generic estimating software assumes a generic contractor's cost structure — heavy materials, thin labor. Custom fabrication is the opposite: labor is the dominant cost, and every job is different enough that a flat per-square-foot number doesn't hold up across a nightstand pair and a 24-unit kitchen install. Nothing off the shelf modeled that correctly, and building one estimator per shop would have meant maintaining two separate tools for the same underlying problem.

## What I Built

A gross-margin estimating engine from scratch: a client's project becomes a structured quote, a materials-and-labor cost breakdown, and a client-ready invoice — grounded in real historical job data rather than industry averages. It runs multi-tenant, so both businesses use the same engine independently, with their own job history calibrating their own numbers.

## The Judgment Call

This is the part of the project that actually proves the tool works, not just that it exists. I ran a real client job through the engine end to end — a closet build — then checked the output against an actual market comparable: a competitor's real quote on the same job.

The pricing *logic* held up. The *inputs* didn't. The AI labor estimator was predicting 348 hours for a job that would realistically take about 96 — 3.6x too high — and roughly $4,400 of hardware and subbed-out parts weren't in the cost model at all. Left uncorrected, the tool would have reported a healthy margin on a job that, priced for real, would have made almost nothing.

The fix wasn't to throw out the engine or patch it with a generic correction. I named the two specific, bounded problems — a labor-calibration gap and a missing hardware catalog — and scoped exactly what needed to change to close each one, in priority order. That's the difference between shipping something that looks done and knowing precisely what it hasn't yet proven.

## What It Answered

The core engine — gross-margin math, structured quoting, invoice generation — works, and it's trusted enough to run two real businesses on today. What it left open, named explicitly rather than hidden: exactly which two inputs needed real-world calibration before the numbers could be trusted at the edges, and a concrete plan to close both.
