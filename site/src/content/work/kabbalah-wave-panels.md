---
# PHOTOS TO ADD:
# Copy selected images to: site/public/images/work/kabbalah-wave-panels/
# Suggested filenames:
#   hero.jpg              — PRIORITY: a real photo of the physical test-cut panel,
#                            shot in raking light so the relief actually reads. This is
#                            the single most important image in the whole case study —
#                            a screenshot of the generator is the wrong lead image here.
#                            The concept is "you can feel this," so the hero has to be
#                            a physical object, not a browser window.
#   pattern-modes.jpg     — side-by-side render of the 3 selectable pattern modes
#   generator-ui.jpg      — screenshot of the generator itself (supporting image only)
#   verification-output.jpg — the watertight/winding verification script output

title: "Kabbalah Wave Panels: Generative CNC From a Name and a Birthdate"
subtitle: "A from-scratch generative engine that turns personal identity into a physically cuttable relief panel"
description: "A personalized CNC art piece derived from a specific person's identity, not a generic pattern. A generative engine takes a name and a birth date and produces a one-of-a-kind, physically cuttable wave-field relief — with a mandatory verification gate standing between the design and the machine."
heroAspectRatio: "4/3"
category: "CNC"
tags: ["generative design", "CNC", "computational design", "CAD export", "verification systems", "Fusion 360"]
role: "Generative Systems Designer, CNC Programmer, Fabricator"
duration: "Designed, built, and physically test-cut, June 2026"
constraint: "Nothing existing takes a name and a birth date and produces a one-of-a-kind, physically cuttable relief panel. Building it meant inventing both the generative math and the safety net that keeps a mathematically-generated surface from damaging a bit or warping a part the first time it meets a real machine."
outcome: "A working generative engine with three selectable pattern modes, each mathematically unique to the person, exporting directly to CNC-ready geometry — plus a mandatory verification gate that checks every file before it's allowed near the machine. Taken all the way to a physical test-cut at B10, reacted to in person by coworkers on the shop floor."
valueCreated:
  - "Invented a generative system with no existing equivalent to reference or copy"
  - "Caught a hard visual seam and a backwards-wound 3D export before either reached the machine"
  - "Built a mandatory watertight/winding/volume verification gate — a permanent safeguard, not a one-time fix"
  - "Flagged one pattern mode as not-yet-cuttable at the tested scale rather than force-cutting it anyway"
  - "Took the concept to a real physical artifact, not just a rendered mockup"
skillsDemonstrated:
  - "Generative / computational design"
  - "3D geometry and CAD export pipelines"
  - "Root-cause debugging of geometry defects invisible in preview"
  - "Building verification systems, not just features"
  - "CNC toolpath programming and fabrication"
  - "Judgment on what to ship vs. what to flag as unresolved"
order: 9
thumbnailPosition: "center"
draft: true
publishDate: "2026-07-28"
---

I wanted to make a personalized CNC art piece — something derived from a specific person's identity, not a generic pattern pulled off a shelf. Nothing existing does this. You can't buy or download a system that takes a name and a birth date and produces a one-of-a-kind, physically cuttable relief panel. It had to be invented from scratch.

## The Constraint

A generative pattern that looks good on screen isn't automatically safe to cut. CNC relief work has to satisfy real physical constraints — watertight geometry, consistently wound surface normals, a pattern frequency the tool and material can actually resolve — none of which show up in a rendered preview. Building the math was only half the problem; the other half was making sure what came out the other end wouldn't damage a bit or ruin a piece of material the first time it touched a real machine.

## What I Built

A generative engine, written from scratch, that derives a unique wave-field relief from personal inputs — name, birth date, optional Hebrew name — across three selectable pattern modes: flowing waves, a spiral/orbit field, and a terraced sliced form, each one mathematically unique to the person. The engine exports directly to CNC-ready geometry: a height-map image for direct machine import, or a full watertight 3D solid for CAD.

## The Judgment Call

This is the clearest invent-prototype-judge loop in the whole project. Early exports looked right on screen but weren't safe to cut: one pattern mode had a hard visual seam where the math wrapped around on itself, and the 3D export had its surface normals wound backwards — invisible in a preview, but the kind of defect that either damages a bit or produces a warped part on a real machine. I found both, diagnosed the actual cause rather than patching the symptom, and fixed them at the source.

That near-miss is why I built a mandatory verification gate: every exported file now gets checked by script — is it watertight, is the geometry wound consistently, is the volume positive — before it's allowed anywhere near the machine. I also flagged, rather than force-cut, a mode that mathematically doesn't hold up at small panel sizes: its pattern frequency is too fine for a standard board, and it needs either a much bigger panel or a different mathematical expression entirely.

## What It Answered

Took the concept all the way to a physical test-cut at B10, reacted to in person by coworkers on the shop floor — the actual proof, not just a rendered mockup. What it left open: which pattern variants are gallery-worthy across a full range of inputs is still an ongoing taste pass, and one mode is explicitly flagged as not-yet-cuttable at the tested scale rather than shipped anyway.
