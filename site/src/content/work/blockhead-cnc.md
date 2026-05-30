---
# PHOTOS TO ADD:
# Copy selected images to: site/public/images/work/blockhead-cnc/
# Suggested filenames:
#   hero.jpg           — Muratet_260126_025.jpg (professional shot — use this as hero)
#   problem.jpg        — the statue blank or artist's hand-carved version (before)
#   fixture-design.jpg — SketchUp or drawing of the workholding fixture/track system
#   inset-setup.jpg    — table inset in place, leveled and set
#   cnc-running.jpg    — machine cutting the piece
#   finished.jpg       — finished statue or a detail of the carved surface

title: "Blockhead: CNC Fixture for Oversized Sculpture"
subtitle: "Custom workholding to cut a piece that exceeded the machine's standard capacity"
description: "A local artist needed to automate production of wooden statues he'd been carving by hand. The catch: the finished pieces were larger than our CNC table could handle. The solution required building a custom inset table and track-based workholding system to bring the machine to the work."
heroImage: "/images/work/blockhead-cnc/hero.jpg"
heroAspectRatio: "3/4"
category: "CNC"
tags: ["CNC", "fixture design", "workholding", "toolpath programming", "Fusion 360", "production automation"]
role: "CNC Programmer, Fixture Designer, Fabricator"
duration: "6 weeks"
constraint: "The client's sculpture — a stylized human figure — has a body approximately 6\" thick and a head roughly 12\" square. Both dimensions exceed what our CNC table can accommodate with standard workholding. Off-the-shelf solutions don't exist for this geometry."
outcome: "Custom inset table and track-based workholding system built, leveled, and commissioned. CNC now cuts the full piece geometry in multiple setups. Blockhead is actively continuing the collaboration and designing new work that wouldn't be feasible to produce by hand."
valueCreated:
  - "Solved a machine-capacity problem without buying new equipment"
  - "Custom fixture design is reusable for the full production run — built once, runs indefinitely"
  - "Track system allows repeatable re-registration between setups — no re-zeroing each piece"
  - "Leveling procedure documented so any operator can reset the table after maintenance"
  - "Artist can now focus on design and finishing rather than roughing out every figure by hand"
  - "Ongoing collaboration — Blockhead is designing new work that wouldn't be feasible without the CNC"
skillsDemonstrated:
  - "Fixture design and workholding engineering"
  - "CNC toolpath programming"
  - "Machine setup and tramming"
  - "3D modeling (Fusion 360)"
  - "Multi-setup machining strategy"
  - "Production process design"
processImages:
  - src: "/images/work/blockhead-cnc/scale-model.jpg"
    alt: "Scale model of the sculpture being measured with calipers — 180mm height"
    label: "Scale Reference"
    description: "Before touching the machine, I built a scale model of the figure and measured every section with calipers. This is where the head and body dimensions got confirmed — and where it became clear the standard table setup wouldn't work."
  - src: "/images/work/blockhead-cnc/inset-box.jpg"
    alt: "Custom adjustable inset box fixture for the CNC table"
    label: "The Fixture"
    description: "The adjustable inset box — a custom-built platform that drops into the CNC table and holds the sculpture blank. The oval cutouts reduce weight without sacrificing rigidity. The box can be raised or lowered to accommodate blanks of different thicknesses, making it reusable across the full production run."
  - src: "/images/work/blockhead-cnc/workholding.jpg"
    alt: "Track-based workholding system on the CNC table"
    label: "Track Registration"
    description: "The track system on the CNC table — two parallel rails the workpiece registers against. The piece can be flipped and repositioned between setups without losing zero. No re-zeroing, no registration error."
  - src: "/images/work/blockhead-cnc/cnc-cutting.jpg"
    alt: "CNC spindle cutting into the sculpture blank on the inset table"
    label: "Machine Running"
    description: "Spindle cutting the figure with the inset table in place. The workpiece sits below the surrounding spoilboard surface, giving the spindle the clearance to reach full geometry depth."
  - src: "/images/work/blockhead-cnc/in-progress.jpg"
    alt: "Blockhead sculpture in progress in the shop"
    label: "In Progress"
    description: "An earlier pull — the figure taking shape in the shop. The geometry is there; finishing details come after the CNC work is done."
order: 5
thumbnailPosition: "center 15%"
draft: false
publishDate: "2026-01-26"
---

Blockhead is an Atlanta-based artist who makes wooden sculptural figures — stylized human forms that he'd been carving largely by hand. The work was good. The process was slow. He wanted to know if CNC could take over the heavy roughing work so he could focus on the finishing details that actually require a human.

The answer was yes, with a problem: his pieces were bigger than our machine could handle.

## The Constraint

Our CNC table has a standard working envelope. The artist's figures have a body section approximately 6 inches thick and a head section roughly 12 inches square. In standard configuration — workpiece sitting on top of the spoilboard — the spindle can't reach the geometry at the depth needed. You can't cut what the tool can't reach.

The options were: buy a larger machine (not happening), cut the piece in so many small sections it becomes impractical, or find a way to bring the work surface down into the table so the spindle has the clearance it needs.

## The Solution

Inset workholding. I built a custom box that drops into the CNC table and holds the sculpture blank below the surrounding spoilboard surface — giving the spindle the clearance it needs to reach full geometry depth. The box has oval cutouts to keep it light without sacrificing rigidity, and it's height-adjustable: raise or lower it to accommodate blanks of different thicknesses. That adjustability is what makes it a production asset rather than a one-off fix.

The fixture also needed a track system — two parallel rails that the workpiece registers against — so the piece can be flipped and repositioned between setups without losing zero. If you have to re-establish your datum every time you flip the piece, you're losing time and introducing registration error on every single part. The tracks solve both problems.

## Build and Commission

The new sub-table was built, fitted to the routed pocket, shimmed, and leveled. "Level" here means coplanar with the surrounding spoilboard to within a few thousandths — I confirmed it with a dial indicator tramming pass before running any toolpath. If the inset surface isn't truly flat relative to the machine's XY plane, every cut will show the error.

First production run came out clean. The track system held registration across setups. The artist now has a repeatable process for roughing out figures that previously took days of hand work.

## What This Demonstrates

This project is about solving a capability gap with engineering rather than equipment budget. The fixture is the solution — and it's reusable for the entire production run. Build it once, document the leveling procedure, and any operator can reset it after maintenance.

That's the difference between a one-off workaround and a production asset.
