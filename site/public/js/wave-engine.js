/**
 * wave-engine.js — Kabbalah Wave Panel generative core (v2)
 *
 * v2 geometry: "bend, don't add" — one coherent field whose phase is domain-warped
 * by the personal data (vortex attractors), instead of summed interference.
 *
 * Three pattern modes:
 *   flow   — coherent directional waves, bent around the person's sources
 *   orbit  — circular/spiral field centered on the dominant sefirah
 *   sliced — the flow field terraced into crisp contour steps (high contrast)
 *
 * Physical model (4/4 hardwood):
 *   stock 0.75" (surfaced 4/4) · relief depth 0.5" · floor 0.25" under deepest cut
 *   optional raised frame rim, min 0.25" wide
 *
 * Height convention: 0.0 = deepest cut (black), 1.0 = highest surface (white).
 * Single source of truth for browser (kabbalah-generator.html) and node (render-test.js).
 */
(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) module.exports = factory();
  else root.WaveEngine = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const TAU = Math.PI * 2;

  // ---------------------------------------------------------------
  // 1. GEMATRIA (mispar hechrachi; finals share base values)
  // ---------------------------------------------------------------
  const HEBREW_VALUES = {
    'א': 1, 'ב': 2, 'ג': 3, 'ד': 4, 'ה': 5, 'ו': 6, 'ז': 7, 'ח': 8, 'ט': 9,
    'י': 10, 'כ': 20, 'ך': 20, 'ל': 30, 'מ': 40, 'ם': 40, 'נ': 50, 'ן': 50,
    'ס': 60, 'ע': 70, 'פ': 80, 'ף': 80, 'צ': 90, 'ץ': 90,
    'ק': 100, 'ר': 200, 'ש': 300, 'ת': 400
  };
  const LATIN_VALUES = {
    a: 1, b: 2, c: 20, d: 4, e: 5, f: 80, g: 3, h: 8, i: 10, j: 10, k: 20,
    l: 30, m: 40, n: 50, o: 70, p: 80, q: 100, r: 200, s: 60, t: 400,
    u: 6, v: 6, w: 6, x: 90, y: 10, z: 7
  };
  const HEBREW_LETTERS = [
    { ch: 'א', name: 'Aleph' }, { ch: 'ב', name: 'Bet' }, { ch: 'ג', name: 'Gimel' },
    { ch: 'ד', name: 'Dalet' }, { ch: 'ה', name: 'He' }, { ch: 'ו', name: 'Vav' },
    { ch: 'ז', name: 'Zayin' }, { ch: 'ח', name: 'Chet' }, { ch: 'ט', name: 'Tet' },
    { ch: 'י', name: 'Yod' }, { ch: 'כ', name: 'Kaf' }, { ch: 'ל', name: 'Lamed' },
    { ch: 'מ', name: 'Mem' }, { ch: 'נ', name: 'Nun' }, { ch: 'ס', name: 'Samekh' },
    { ch: 'ע', name: 'Ayin' }, { ch: 'פ', name: 'Pe' }, { ch: 'צ', name: 'Tsadi' },
    { ch: 'ק', name: 'Qof' }, { ch: 'ר', name: 'Resh' }, { ch: 'ש', name: 'Shin' },
    { ch: 'ת', name: 'Tav' }
  ];

  function gematria(str) {
    let sum = 0;
    for (const ch of (str || '')) {
      if (HEBREW_VALUES[ch]) sum += HEBREW_VALUES[ch];
      else { const c = ch.toLowerCase(); if (LATIN_VALUES[c]) sum += LATIN_VALUES[c]; }
    }
    return sum;
  }
  function digitSum(n) { let s = 0; for (const d of String(Math.abs(n))) s += Number(d); return s; }
  function reduceNum(n, keepMaster) {
    while (n > 9) { if (keepMaster && (n === 11 || n === 22)) return n; n = digitSum(n); }
    return n;
  }

  // ---------------------------------------------------------------
  // 2. ASTROLOGY (traditional rulers)
  // ---------------------------------------------------------------
  const ZODIAC = [
    { sign: 'Capricorn', from: [12, 22], planet: 'Saturn' },
    { sign: 'Aquarius', from: [1, 20], planet: 'Saturn' },
    { sign: 'Pisces', from: [2, 19], planet: 'Jupiter' },
    { sign: 'Aries', from: [3, 21], planet: 'Mars' },
    { sign: 'Taurus', from: [4, 20], planet: 'Venus' },
    { sign: 'Gemini', from: [5, 21], planet: 'Mercury' },
    { sign: 'Cancer', from: [6, 21], planet: 'Moon' },
    { sign: 'Leo', from: [7, 23], planet: 'Sun' },
    { sign: 'Virgo', from: [8, 23], planet: 'Mercury' },
    { sign: 'Libra', from: [9, 23], planet: 'Venus' },
    { sign: 'Scorpio', from: [10, 23], planet: 'Mars' },
    { sign: 'Sagittarius', from: [11, 22], planet: 'Jupiter' }
  ];
  function zodiacFor(month, day) {
    let result = ZODIAC[0];
    for (const z of ZODIAC) {
      const [m, d] = z.from;
      if (month > m || (month === m && day >= d)) result = z;
    }
    if (month === 1 && day < 20) result = ZODIAC[0];
    return result;
  }

  // ---------------------------------------------------------------
  // 3. SEFIROT / PILLARS
  // ---------------------------------------------------------------
  const SEFIROT = {
    1: { name: 'Keter', meaning: 'Crown — pure will, beginnings', pillar: 'Middle', anchor: [0.5, 0.18] },
    2: { name: 'Chokhmah', meaning: 'Wisdom — flash of insight', pillar: 'Mercy', anchor: [0.7, 0.26] },
    3: { name: 'Binah', meaning: 'Understanding — structure, depth', pillar: 'Severity', anchor: [0.3, 0.26] },
    4: { name: 'Chesed', meaning: 'Lovingkindness — expansion', pillar: 'Mercy', anchor: [0.72, 0.45] },
    5: { name: 'Gevurah', meaning: 'Strength — discipline, boundary', pillar: 'Severity', anchor: [0.28, 0.45] },
    6: { name: 'Tiferet', meaning: 'Beauty — harmony, the heart', pillar: 'Middle', anchor: [0.5, 0.5] },
    7: { name: 'Netzach', meaning: 'Endurance — drive, victory', pillar: 'Mercy', anchor: [0.7, 0.64] },
    8: { name: 'Hod', meaning: 'Splendor — form, articulation', pillar: 'Severity', anchor: [0.3, 0.64] },
    9: { name: 'Yesod', meaning: 'Foundation — connection, transmission', pillar: 'Middle', anchor: [0.5, 0.72] },
    11: { name: "Da'at", meaning: 'Knowledge — the hidden gate', pillar: 'Middle', anchor: [0.5, 0.32] },
    22: { name: 'Malkhut', meaning: 'Kingdom — manifestation', pillar: 'Middle', anchor: [0.5, 0.82] }
  };
  const PILLAR_LEAN = { Mercy: 10, Severity: -10, Middle: 0 };

  // ---------------------------------------------------------------
  // 4. PLANET → FIELD CHARACTER
  // freq = ridge count across the board · sharp = ridge crispness 0..1
  // swirl = how strongly personal attractors bend the field (rad)
  // ---------------------------------------------------------------
  const PLANETS = {
    Saturn:  { freq: 13, angle: -18, sharp: 0.70, swirl: 1.0, character: 'tight compressed ridges, deep cut, left lean — dense and ancient' },
    Jupiter: { freq: 7,  angle: 10,  sharp: 0.35, swirl: 1.6, character: 'wide open waves, gently bent — expansive' },
    Mars:    { freq: 15, angle: -8,  sharp: 0.92, swirl: 2.2, character: 'aggressive frequency, hard ridges, strong vortex pull' },
    Venus:   { freq: 5,  angle: 8,   sharp: 0.20, swirl: 1.3, character: 'few soft swells, slow drift' },
    Sun:     { freq: 9,  angle: 0,   sharp: 0.45, swirl: 1.2, character: 'balanced field breathing around the center' },
    Mercury: { freq: 12, angle: -4,  sharp: 0.55, swirl: 1.9, character: 'quick fine lines, lively bends' },
    Moon:    { freq: 8,  angle: 4,   sharp: 0.25, swirl: 1.4, character: 'soft tidal swells, gentle repetition' }
  };

  // ---------------------------------------------------------------
  // 5. PROFILE DERIVATION
  // ---------------------------------------------------------------
  function deriveProfile(input) {
    const { name, hebrewName, motherName, month, day, year } = input;

    const nameSource = (hebrewName && hebrewName.trim()) ? hebrewName.trim() : (name || '').trim();
    const usedHebrew = !!(hebrewName && hebrewName.trim());
    const gemTotal = gematria(nameSource);
    const gemReduced = reduceNum(gemTotal, true);

    const dateDigits = digitSum(month) + digitSum(day) + digitSum(year);
    const lifePath = reduceNum(dateDigits, true);
    const lifePathSimple = reduceNum(lifePath, false);

    const zod = zodiacFor(month, day);
    const planet = PLANETS[zod.planet];
    const sefirah = SEFIROT[lifePath] || SEFIROT[lifePathSimple] || SEFIROT[6];
    const lean = PILLAR_LEAN[sefirah.pillar];

    const letterIdx = (reduceNum(day, false) - 1 + 22) % 22;
    const dayLetter = HEBREW_LETTERS[day <= 22 ? day - 1 : letterIdx];
    const motherGem = motherName ? gematria(motherName.trim()) : 0;

    // --- attractors: the personal data that BENDS the field (not added on top) ---
    // positions seeded by the numbers; strength scaled by planet.swirl
    const attractors = [];
    const a1 = (gemTotal % 360) * Math.PI / 180;
    attractors.push({
      x: 0.5 + 0.27 * Math.cos(a1), y: 0.5 + 0.27 * Math.sin(a1),
      k: planet.swirl * (0.8 + 0.06 * reduceNum(gemReduced, false)), r: 0.40, label: 'name'
    });
    const dateSeed = month * 100 + day + (year % 100);
    const a2 = (dateSeed % 360) * Math.PI / 180;
    attractors.push({
      x: 0.5 + 0.27 * Math.cos(a2), y: 0.5 + 0.27 * Math.sin(a2),
      k: -planet.swirl * (0.7 + 0.05 * lifePathSimple), r: 0.38, label: 'birth'
    });
    if (motherGem > 0) {
      const a3 = (motherGem % 360) * Math.PI / 180;
      attractors.push({
        x: 0.5 + 0.18 * Math.cos(a3), y: 0.5 + 0.18 * Math.sin(a3),
        k: planet.swirl * 0.5, r: 0.30, label: 'mother'
      });
    }

    return {
      input: { name, hebrewName: hebrewName || '', motherName: motherName || '', month, day, year },
      derivation: {
        nameSource, usedHebrew, gematriaTotal: gemTotal, gematriaReduced: gemReduced,
        lifePath, zodiacSign: zod.sign, rulingPlanet: zod.planet,
        sefirah: sefirah.name, sefirahMeaning: sefirah.meaning, pillar: sefirah.pillar,
        dayLetter: dayLetter.ch, dayLetterName: dayLetter.name,
        planetCharacter: planet.character, motherGematria: motherGem
      },
      params: {
        pattern: 'flow',                       // 'flow' | 'orbit' | 'sliced'
        freq: planet.freq,
        angle: planet.angle + lean,
        sharp: planet.sharp,
        attractors,
        // orbit
        orbitCx: sefirah.anchor[0], orbitCy: sefirah.anchor[1],
        spin: lean === 0 ? (gemTotal % 2 === 0 ? 0.6 : -0.6) : lean / 10 * 1.8, // spiral arms; middle pillar gets gentle spin by name parity
        // sliced
        sliceCount: 5 + lifePathSimple,        // 6..14 contour steps
        sliceBevel: 0.22,                      // machinable chamfer fraction of a step
        // finishing
        contrast: 0.55,
        eye: { x: 0.5, y: 0.5, r: 0.16 },      // calm zone where the letter lives
        // physical (4/4 hardwood defaults)
        stock: { thickness: 0.75, relief: 0.5, floor: 0.25 },
        frame: { mode: 'none', widthIn: 0.375, transIn: 0.35 }, // 'none' | 'raised' | 'flat'
        boardW: 24, boardH: 24
      }
    };
  }

  // ---------------------------------------------------------------
  // 6. GEOMETRY — domain warping core
  // ---------------------------------------------------------------

  // Vortex warp: rotate space around each attractor with gaussian falloff.
  function warp(x, y, attractors, aspect) {
    for (const s of attractors) {
      const cx = s.x * aspect, cy = s.y;
      const dx = x - cx, dy = y - cy;
      const r2 = (dx * dx + dy * dy) / (s.r * s.r);
      const a = s.k * Math.exp(-r2);
      if (Math.abs(a) < 1e-4) continue;
      const ca = Math.cos(a), sa = Math.sin(a);
      x = cx + dx * ca - dy * sa;
      y = cy + dx * sa + dy * ca;
    }
    return [x, y];
  }

  // Ridge profile: cos shaped toward crisp plateaus as sharp → 1
  function ridge(phase, sharp) {
    let w = Math.cos(TAU * phase);
    return Math.sign(w) * Math.pow(Math.abs(w), 1 - 0.72 * sharp);
  }

  function smoothstep(a, b, t) {
    t = Math.max(0, Math.min(1, (t - a) / (b - a)));
    return t * t * (3 - 2 * t);
  }

  /**
   * heightAt(u, v, P, aspect) → height in [0,1]
   * u,v in [0,1], v down. aspect = boardW/boardH so spacing is physically uniform.
   */
  function heightAt(u, v, P, aspect) {
    aspect = aspect || (P.boardW / P.boardH) || 1;
    const x0 = u * aspect, y0 = v;
    let [x, y] = warp(x0, y0, P.attractors, aspect);

    // --- ridge style: same field, same depth range, different finish ---
    // 'sharp'  = crisper ridge profile (planet sharp + 0.4)
    // 'smooth' = soft profile + extra low-frequency wobble so the lines wander
    const style = P.style || 'default';
    let sharpEff = P.sharp;
    if (style === 'sharp') sharpEff = Math.min(1, P.sharp + 0.4);
    else if (style === 'smooth') {
      sharpEff = P.sharp * 0.25;
      const wob = P.wobble || 0.09;
      x += wob * Math.sin(TAU * 0.8 * y0 + 1.7) + wob * 0.5 * Math.sin(TAU * 1.7 * y0);
      y += wob * Math.sin(TAU * 0.65 * x0) + wob * 0.5 * Math.sin(TAU * 1.4 * x0 + 0.6);
    }

    // --- pattern field, w in [-1, 1] ---
    let w;
    if (P.pattern === 'orbit') {
      const cx = P.orbitCx * aspect, cy = P.orbitCy;
      const dx = x - cx, dy = y - cy;
      const r = Math.sqrt(dx * dx + dy * dy + 0.012);  // softened center — keeps the core cuttable
      const ang = Math.atan2(dy, dx) / TAU;             // -0.5..0.5 turns
      // tuned frequency (optional, e.g. Chai=18): literal ring count; else planet default
      const fOrb = P.tunedFreq ? P.tunedFreq : P.freq * 0.8;
      // Quantize spin to a WHOLE number of arms so the angular term jumps by a
      // full cos-cycle at the atan2 branch cut — that makes the wrap seamless
      // (no hard seam radiating from the center). Sign keeps the spin direction;
      // arms=0 ⇒ pure concentric rings (also seamless).
      const arms = Math.round(P.spin);
      const phase = fOrb * r + arms * ang;              // spiral when arms ≠ 0
      w = ridge(phase, sharpEff);
    } else if (P.pattern === 'sliced') {
      // terraced sawtooth: wide flat treads stepping up, then a cliff —
      // stacked-layer / sedimentary look whose edges follow the bent flow
      const th = P.angle * Math.PI / 180;
      const N = Math.max(3, Math.min(9, P.sliceCount));
      // tuned frequency (optional): tuned = TOTAL tread count, so bands = tuned/N
      const fSl = P.tunedFreq ? P.tunedFreq / N : P.freq * 0.3;
      const phase = fSl * (x * Math.cos(th) + y * Math.sin(th));
      const t = phase - Math.floor(phase);            // 0..1 ramp per period
      const sN = t * N;
      const lev = Math.floor(sN);
      const f = sN - lev;
      const bev = Math.max(0.12, P.sliceBevel);
      const fb = f > 1 - bev ? smoothstep(1 - bev, 1, f) : 0;   // chamfered riser
      let s = (lev + fb) / N;                          // 0..1 staircase
      // soften the period cliff slightly so a ball-nose can follow it
      if (t > 0.965) s *= smoothstep(1.0, 0.965, t);
      w = s * 2 - 1;
    } else { // flow
      const th = P.angle * Math.PI / 180;
      // tuned frequency (optional, e.g. Chai=18): literal ridge count; else planet default
      const fFlow = P.tunedFreq ? P.tunedFreq : P.freq * 0.75;
      const phase = fFlow * (x * Math.cos(th) + y * Math.sin(th));
      w = ridge(phase, sharpEff);
    }

    // --- calm eye for the letter (waves quiet down, don't stop dead) ---
    if (P.eye && P.eye.r > 0) {
      const ex = P.eye.x * aspect, ey = P.eye.y;
      const dx = x0 - ex, dy = y0 - ey;
      const d2 = (dx * dx + dy * dy) / (P.eye.r * P.eye.r);
      const damp = P.pattern === 'sliced' ? 0.45 : 0.62;
      w *= 1 - damp * Math.exp(-d2);
    }

    let h = 0.5 + 0.5 * w;

    if (P.pattern === 'sliced') {
      // near-flat tone curve: the steps ARE the contrast
      const gs = 1.0 + 0.6 * P.contrast;
      h = 0.5 + 0.5 * Math.tanh(gs * (2 * h - 1)) / Math.tanh(gs);
    } else {
      // gentle S-curve — deepen valleys without crushing midtones
      const g = 1.0 + 1.6 * P.contrast;
      h = 0.5 + 0.5 * Math.tanh(g * (2 * h - 1)) / Math.tanh(g);
    }

    // --- frame / border (physical inches) ---
    const bw = P.boardW || 24, bh = P.boardH || 24;
    const dIn = Math.min(Math.min(u, 1 - u) * bw, Math.min(v, 1 - v) * bh);
    const F = P.frame || { mode: 'none' };
    if (F.mode === 'raised') {
      const fw = Math.max(0.25, F.widthIn);       // 1/4" minimum rim
      if (dIn <= fw) return 0.97;
      const t = smoothstep(fw, fw + F.transIn, dIn);
      h = 0.97 * (1 - t) + h * t;
    } else if (F.mode === 'flat') {
      const m = 0.6;                               // flat-ish margin, eased
      const t = smoothstep(0, m, dIn);
      h = 0.5 * (1 - t) + h * t;
    }
    return h;
  }

  function renderHeightField(P, w, h, aspect) {
    const out = new Float32Array(w * h);
    for (let j = 0; j < h; j++) {
      const v = j / (h - 1);
      for (let i = 0; i < w; i++) out[j * w + i] = heightAt(i / (w - 1), v, P, aspect);
    }
    return out;
  }

  return {
    gematria, reduceNum, digitSum, zodiacFor,
    deriveProfile, heightAt, renderHeightField, warp, ridge,
    PLANETS, SEFIROT, HEBREW_LETTERS
  };
});
