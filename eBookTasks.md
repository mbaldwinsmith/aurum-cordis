# eBook Production Tasks — Aurum Cordis

**Book title:** Aurum Cordis: The Philosopher's Stone and the Word Made Flesh  
**Author:** Mark Oriel  
**Format:** ePub 3 (for Amazon Kindle via KDP)  
**Source:** The static website in this repository (`/home/user/aurum-cordis/`)

These tasks are written for a future AI agent. Follow each phase in order. Do not invent or add new content — reproduce only what exists in the website source files. Reproduce all text faithfully, including headings, body copy, pull quotes, epigraphs, footnotes, glossary entries, and captions exactly as they appear in the HTML.

---

## Source File Reference

| Asset type | Location | Count |
|---|---|---|
| HTML pages | `/index.html`, `/pages/*.html` | 15 files |
| PNG diagrams | `/assets/diagrams/*.png` | 21 files |
| SVG icons | `/assets/icons/*.svg` | 17 files |
| Structured data | `/data/cross-reference.json` | 1 file |
| CSS (for reference) | `/css/base.css`, `/css/components.css` | design tokens |

---

## Phase 0 — Environment Setup

### Task 0.1 — Verify tools are available

Check that the following command-line tools are installed before proceeding:

- `python3` (for scripting and ePub packaging)
- `convert` or `magick` (ImageMagick, for SVG→PNG rasterisation)
- `epubcheck` (Java-based ePub validator; install via `apt`, `brew`, or download the JAR from the official release)
- `zip` (for ePub packaging)

Run: `python3 --version && magick --version && java -jar epubcheck.jar --version && zip --version`

If any tool is missing, install it before continuing.

### Task 0.2 — Create the output directory structure

Create the following directory tree at the repo root:

```
epub-build/
├── META-INF/
│   └── container.xml
├── OEBPS/
│   ├── content.opf
│   ├── toc.ncx
│   ├── nav.xhtml
│   ├── css/
│   │   └── ebook.css
│   ├── fonts/
│   ├── images/
│   │   ├── cover.jpg
│   │   ├── diagrams/
│   │   └── icons/
│   └── xhtml/
│       ├── cover.xhtml
│       ├── titlepage.xhtml
│       ├── copyright.xhtml
│       ├── dedication.xhtml
│       ├── preface.xhtml
│       ├── toc.xhtml
│       ├── part-1-foundations.xhtml
│       ├── ch01-prima-materia.xhtml
│       ├── ch02-four-elements.xhtml
│       ├── ch03-sulphur-mercury-salt.xhtml
│       ├── ch04-seven-metals.xhtml
│       ├── part-2-great-work.xhtml
│       ├── ch05-nigredo.xhtml
│       ├── ch06-albedo.xhtml
│       ├── ch07-citrinitas.xhtml
│       ├── ch08-rubedo.xhtml
│       ├── part-3-synthesis.xhtml
│       ├── ch09-philosophers-stone.xhtml
│       ├── ch10-opus-magnum.xhtml
│       ├── part-4-reference.xhtml
│       ├── ch11-jung.xhtml
│       ├── ch12-cross-reference.xhtml
│       └── ch13-bibliography.xhtml
└── mimetype
```

Run: `mkdir -p epub-build/META-INF epub-build/OEBPS/css epub-build/OEBPS/fonts epub-build/OEBPS/images/diagrams epub-build/OEBPS/images/icons epub-build/OEBPS/xhtml`

---

## Phase 1 — Image Preparation

All images must be processed before building chapter XHTML, because chapter files reference final image paths.

### Task 1.1 — Copy PNG diagrams

Copy all 21 PNG files from `/assets/diagrams/` into `epub-build/OEBPS/images/diagrams/`. Preserve filenames exactly.

```
aurum-cordis.png         → cover source (used in Task 1.3)
prima-materia.png
four-elements.png
sulphur-mercury-salt.png
seven-metals.png
nigredo.png
albedo.png
citrinitas.png
rubedo-phoenix.png
rubedo-pelican.png
philosophers-stone.png
opus-magnum.png
circulatio.png
rebis.png
golden-heart.png
heart-sigil.png
moon-queen.png
sun-king.png
jung.png
bibliography.png
```

Run: `cp assets/diagrams/*.png epub-build/OEBPS/images/diagrams/`

### Task 1.2 — Rasterise SVG icons to PNG

Amazon Kindle has limited SVG support. Convert all 17 SVG icon files to PNG at 192×192 pixels (suitable for inline icon use in reflowable text). Output to `epub-build/OEBPS/images/icons/`.

For each file in `/assets/icons/`:

```
fire.svg          → fire.png
water.svg         → water.png
air.svg           → air.png
earth.svg         → earth.png
sulphur.svg       → sulphur.png
mercury-tria.svg  → mercury-tria.png
salt.svg          → salt.png
sun-gold.svg      → sun-gold.png
moon-silver.svg   → moon-silver.png
saturn-lead.svg   → saturn-lead.png
jupiter-tin.svg   → jupiter-tin.png
mars-iron.svg     → mars-iron.png
venus-copper.svg  → venus-copper.png
mercury-planet.svg → mercury-planet.png
ouroboros.svg     → ouroboros.png
alchemical-cross.svg → alchemical-cross.png
```

Run for each file (adjust filename):
```bash
for svg in assets/icons/*.svg; do
  base=$(basename "$svg" .svg)
  magick -background none -size 192x192 "$svg" "epub-build/OEBPS/images/icons/${base}.png"
done
```

Verify all 17 output PNGs exist and are non-zero bytes.

### Task 1.3 — Create the cover image

The cover image must be a JPEG, minimum 1600×2400 pixels (2:3 ratio), maximum 5 MB. Amazon KDP recommends 2560×1600 pixels minimum on the longest side.

Use `aurum-cordis.png` as the base. Composite it onto a dark background matching the site's furnace-black colour (`#0e0b08`) at 2560×3840 pixels, with the emblem centred and the title and author name as text overlays rendered below the emblem.

Title text: **Aurum Cordis**  
Subtitle text: **The Philosopher's Stone and the Word Made Flesh**  
Author text: **Mark Oriel**  
Typeface for cover text: use a system serif or Cinzel if available; if not, use any available serif

```bash
magick -size 2560x3840 xc:'#0e0b08' \
  \( assets/diagrams/aurum-cordis.png -resize 1800x1800 \) \
  -gravity Center -geometry +0-400 -composite \
  -fill '#c9a227' -font Cinzel-Regular -pointsize 120 \
  -gravity Center -annotate +0+600 'Aurum Cordis' \
  -fill '#f0e6c8' -pointsize 72 \
  -annotate +0+750 "The Philosopher's Stone and the Word Made Flesh" \
  -fill '#b8bcc2' -pointsize 60 \
  -annotate +0+900 'Mark Oriel' \
  epub-build/OEBPS/images/cover.jpg
```

If ImageMagick cannot find the Cinzel font, substitute `-font Georgia` or any available serif. The result must be a valid JPEG under 5 MB. Check: `ls -lh epub-build/OEBPS/images/cover.jpg`

### Task 1.4 — Check all diagram image dimensions

Kindle supports PNG images up to 5 MB per file. The existing PNGs are approximately 3.5–3.9 MB each, which is within limits. Verify:

```bash
for f in epub-build/OEBPS/images/diagrams/*.png; do
  size=$(stat -c%s "$f")
  if [ "$size" -gt 5000000 ]; then
    echo "OVERSIZED: $f ($size bytes)"
  fi
done
```

If any file exceeds 5 MB, compress it:
```bash
magick input.png -quality 85 output.png
```

---

## Phase 2 — Font Embedding

### Task 2.1 — Download and embed the three typefaces

The site uses three Google Fonts. Download them as TTF files for embedding in the ePub (this avoids runtime network dependency and ensures consistent rendering on Kindle).

Download from Google Fonts (use the static download URLs or the Google Fonts download page):

1. **IM Fell English** — Regular and Italic  
   Files: `IMFellEnglish-Regular.ttf`, `IMFellEnglish-Italic.ttf`

2. **Cormorant Garamond** — Regular, Italic, SemiBold  
   Files: `CormorantGaramond-Regular.ttf`, `CormorantGaramond-Italic.ttf`, `CormorantGaramond-SemiBold.ttf`

3. **Cinzel** — Regular  
   Files: `Cinzel-Regular.ttf`

Place all font files in `epub-build/OEBPS/fonts/`.

If downloading fonts programmatically is not possible in the agent's environment, fall back to using web-safe serif equivalents in the CSS (`Georgia, 'Times New Roman', serif`) and skip this task. Note the fallback in a comment in `ebook.css`.

---

## Phase 3 — ePub Scaffolding Files

### Task 3.1 — Write `mimetype`

Create `epub-build/mimetype` with the exact content below. This file must have no newline at the end and must be the first file added to the ZIP archive.

```
application/epub+zip
```

### Task 3.2 — Write `META-INF/container.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf"
              media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>
```

### Task 3.3 — Write `OEBPS/content.opf`

The OPF package document declares the book's metadata, manifest (every file in the OEBPS), and spine (reading order).

**Metadata block:**
```xml
<metadata xmlns:dc="http://purl.org/dc/elements/1.1/"
          xmlns:opf="http://www.idpf.org/2007/opf">
  <dc:title>Aurum Cordis: The Philosopher's Stone and the Word Made Flesh</dc:title>
  <dc:creator opf:role="aut" opf:file-as="Oriel, Mark">Mark Oriel</dc:creator>
  <dc:language>en-GB</dc:language>
  <dc:identifier id="BookId">urn:uuid:GENERATE-A-UUID-HERE</dc:identifier>
  <dc:subject>Alchemy</dc:subject>
  <dc:subject>Christian Mysticism</dc:subject>
  <dc:subject>Jungian Psychology</dc:subject>
  <dc:subject>Spiritual Transformation</dc:subject>
  <dc:description>A Christ-centred exploration of the Opus Magnum — the alchemical Great Work — read simultaneously through the lenses of classical alchemy, orthodox Christian theology, and Jungian depth psychology.</dc:description>
  <dc:publisher>Mark Oriel</dc:publisher>
  <dc:rights>Copyright © 2026 Mark Oriel. All rights reserved.</dc:rights>
  <meta name="cover" content="cover-image"/>
  <meta property="dcterms:modified">2026-05-07T00:00:00Z</meta>
</metadata>
```

Generate a real UUID with: `python3 -c "import uuid; print(uuid.uuid4())"`

**Manifest block:** List every file in OEBPS. Each item needs a unique `id`, `href` (relative to OEBPS), and correct `media-type`. Use these media types:

| File pattern | media-type |
|---|---|
| `.xhtml` | `application/xhtml+xml` |
| `.css` | `text/css` |
| `.ttf` | `application/x-font-ttf` |
| `.png` | `image/png` |
| `.jpg` / `.jpeg` | `image/jpeg` |
| `nav.xhtml` | `application/xhtml+xml` with `properties="nav"` |
| `toc.ncx` | `application/x-dtbncx+xml` |
| `cover.jpg` | `image/jpeg` with `id="cover-image"` and `properties="cover-image"` |

**Spine block:** List all XHTML chapter files in reading order:

```
cover → titlepage → copyright → dedication → preface → toc →
part-1-foundations → ch01 → ch02 → ch03 → ch04 →
part-2-great-work → ch05 → ch06 → ch07 → ch08 →
part-3-synthesis → ch09 → ch10 →
part-4-reference → ch11 → ch12 → ch13
```

Add `<spine toc="ncx">` with `toc="ncx"` attribute for Kindle ePub2 backward compatibility.

### Task 3.4 — Write `OEBPS/toc.ncx`

The NCX file provides Kindle backward-compatibility navigation. Structure it with navPoints matching the spine order. Use the same UUID from Task 3.3 as the `dtb:uid` meta value.

Top-level navPoints (each with nested navPoints for chapters):

```
navPoint: Cover
navPoint: Title Page
navPoint: Copyright
navPoint: Dedication
navPoint: Preface
navPoint: Contents
navPoint: Part I — Foundations
  navPoint: Chapter 1 — Prima Materia
  navPoint: Chapter 2 — The Four Elements
  navPoint: Chapter 3 — Sulphur, Mercury & Salt
  navPoint: Chapter 4 — The Seven Metals
navPoint: Part II — The Great Work
  navPoint: Chapter 5 — Nigredo: The Black Phase
  navPoint: Chapter 6 — Albedo: The White Phase
  navPoint: Chapter 7 — Citrinitas: The Yellow Phase
  navPoint: Chapter 8 — Rubedo: The Red Phase
navPoint: Part III — Synthesis
  navPoint: Chapter 9 — The Philosopher's Stone
  navPoint: Chapter 10 — The Opus Magnum
navPoint: Part IV — Depth & Reference
  navPoint: Chapter 11 — Jung & Alchemy
  navPoint: Chapter 12 — Cross-Reference Index
  navPoint: Chapter 13 — Bibliography
```

### Task 3.5 — Write `OEBPS/nav.xhtml`

The ePub 3 navigation document. Must have `epub:type="toc"` on the `<nav>` element. Replicate the same hierarchy as the NCX above, using `<ol>` lists with `<a href="...">` anchors pointing to the corresponding XHTML file.

---

## Phase 4 — Stylesheet

### Task 4.1 — Write `OEBPS/css/ebook.css`

Create a single consolidated stylesheet. It must be Kindle-compatible: no flexbox layout for primary structure, no grid, no fixed positioning, no JavaScript-dependent features, no `@import`. Use `@font-face` to load the embedded fonts.

Required style blocks (extract design tokens from `/css/base.css`):

**Colour variables** (use literal values, not CSS custom properties, for maximum Kindle compatibility):
- Body background: `#f0e6c8` (vellum cream)
- Body text: `#1a1209` (near-black)
- Headings: `#8b1a1a` (cinnabar red)
- Accent / drop caps: `#c9a227` (sulphur gold)
- Part title: `#1a3a5c` (azure)
- Pullquote border: `#c9a227`
- Separator rule: `#c9a227`

**@font-face declarations** (if fonts were downloaded in Task 2.1):
```css
@font-face {
  font-family: 'IM Fell English';
  src: url('../fonts/IMFellEnglish-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
/* repeat for italic, Cormorant Garamond variants, Cinzel */
```

**Element styles to include:**

- `body`: font-family Cormorant Garamond / Georgia serif; font-size 1em; line-height 1.6; margin 5% 8%; background `#f0e6c8`; color `#1a1209`
- `h1`: IM Fell English / Georgia; font-size 2em; color `#8b1a1a`; text-align center; margin-bottom 0.5em
- `h2`: IM Fell English / Georgia; font-size 1.5em; color `#8b1a1a`; margin-top 2em
- `h3`: Cinzel / 'Small Caps' via font-variant; font-size 1.1em; color `#1a3a5c`; text-transform uppercase; letter-spacing 0.08em
- `p`: margin 0 0 1em 0; text-align justify; hyphens auto
- `p.first-para` or `p + p`: (chapter opening paragraph) font-size 1.05em
- `.drop-cap::first-letter`: font-size 3.5em; font-family IM Fell English; color `#c9a227`; float left; line-height 0.8; margin 0.05em 0.1em 0 0
- `blockquote.pullquote`: border-left 3px solid `#c9a227`; padding-left 1.2em; margin 1.5em 2em; font-style italic; color `#3a3020`
- `blockquote.epigraph`: text-align center; font-style italic; margin 2em auto; max-width 80%; border none
- `.latin`: font-style italic; color `#3a5a40`
- `figure`: text-align center; margin 1.5em auto; page-break-inside avoid; max-width 100%
- `figure img`: max-width 100%; height auto; display block; margin 0 auto
- `figcaption`: font-family Cinzel; font-size 0.75em; text-transform uppercase; letter-spacing 0.1em; color `#5a4a30`; margin-top 0.5em
- `.icon-inline`: width 1.2em; height 1.2em; vertical-align middle; margin 0 0.15em
- `.symbol-row`: display block; text-align center; margin 1em 0
- `.symbol-row img`: width 2em; height 2em; margin 0 0.5em; vertical-align middle
- `.three-lens-box`: border 1px solid `#c9a227`; padding 1em 1.5em; margin 2em 0; background `#faf5e8`
- `.three-lens-box h4`: font-family Cinzel; font-size 0.9em; text-transform uppercase; letter-spacing 0.1em; color `#c9a227`; margin 0 0 0.5em 0
- `table`: width 100%; border-collapse collapse; font-size 0.9em; margin 1.5em 0
- `th`: background `#2a1f0e`; color `#f0e6c8`; font-family Cinzel; font-size 0.8em; text-transform uppercase; letter-spacing 0.08em; padding 0.5em 0.75em; text-align left
- `td`: padding 0.5em 0.75em; border-bottom 1px solid `#c9a2274d`; vertical-align top
- `tr:nth-child(even) td`: background `#f5edd8`
- `.part-title-page`: text-align center; padding 3em 1em
- `.part-number`: font-family Cinzel; font-size 0.9em; text-transform uppercase; letter-spacing 0.2em; color `#c9a227`
- `.chapter-header`: text-align center; margin-bottom 2em
- `.chapter-subtitle`: font-style italic; font-size 1.1em; color `#5a4a30`
- `hr.ornamental`: border none; text-align center; margin 2em auto
- `hr.ornamental::after`: content '✦ ✦ ✦'; color `#c9a227`; font-size 0.9em
- `.stage-label`: font-family Cinzel; font-size 0.75em; text-transform uppercase; letter-spacing 0.15em; display inline-block; padding 0.2em 0.8em; border 1px solid currentColor; margin-bottom 1em
- `.stage-label.nigredo`: color `#1a1209`; border-color `#1a1209`
- `.stage-label.albedo`: color `#5a6a7a`; border-color `#5a6a7a`
- `.stage-label.citrinitas`: color `#9a7a20`; border-color `#9a7a20`
- `.stage-label.rubedo`: color `#8b1a1a`; border-color `#8b1a1a`
- `.glossary-term`: font-family Cinzel; font-weight bold; font-size 0.9em; text-transform uppercase; letter-spacing 0.08em
- `.scripture-ref`: font-size 0.85em; color `#1a3a5c`; font-style italic
- `a`: color `#1a3a5c`; text-decoration none
- `a:visited`: color `#3a1a5c`
- `.cover-page img`: width 100%; height auto; display block
- `@media print, (prefers-color-scheme: light)`: keep existing values (Kindle uses light by default)

---

## Phase 5 — Front Matter Pages

### Task 5.1 — `xhtml/cover.xhtml`

A minimal XHTML page containing only the cover image. Kindle uses this as the book cover.

```xhtml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:epub="http://www.idpf.org/2007/ops"
      xml:lang="en-GB">
<head>
  <meta charset="UTF-8"/>
  <title>Cover</title>
  <link rel="stylesheet" type="text/css" href="../css/ebook.css"/>
  <style>
    body { margin: 0; padding: 0; }
    .cover-page { width: 100%; text-align: center; }
    .cover-page img { width: 100%; height: auto; }
  </style>
</head>
<body epub:type="cover">
  <div class="cover-page">
    <img src="../images/cover.jpg" alt="Aurum Cordis: The Philosopher's Stone and the Word Made Flesh, by Mark Oriel"/>
  </div>
</body>
</html>
```

### Task 5.2 — `xhtml/titlepage.xhtml`

A styled title page. Extract the site name and tagline from `index.html` (the `<h1>` and opening description). Layout:

- Top third: the `aurum-cordis.png` emblem (centred, max-width 50%)
- Middle: Title "Aurum Cordis" in h1 (IM Fell English, cinnabar red)
- Below title: "The Philosopher's Stone and the Word Made Flesh" as a subtitle (italic, Cormorant Garamond)
- Below subtitle: horizontal ornamental rule
- Bottom: "Mark Oriel" as author line (Cinzel, letter-spaced)

### Task 5.3 — `xhtml/copyright.xhtml`

Content (use this text exactly):

```
Copyright © 2026 Mark Oriel

All rights reserved. No part of this publication may be reproduced, distributed, or transmitted in any form or by any means, including photocopying, recording, or other electronic or mechanical methods, without the prior written permission of the author.

The author has asserted their moral right to be identified as the author of this work.

Published 2026.

The website on which this book is based is available at:
https://mbaldwinsmith.github.io/aurum-cordis/

Scripture quotations are from various translations as noted in the text. Quotations from C. G. Jung are used for scholarly commentary purposes.

"Aurum Cordis" is a Latin phrase meaning "The Gold of the Heart."
```

### Task 5.4 — `xhtml/dedication.xhtml`

Extract the dedication or opening invocation from `index.html` if one is present. If the home page contains an epigraph or motto (check the hero section of `index.html` for any Latin motto or verse), use that. If none is found, use the site's implied motto:

```
Omnia in Omnibus Christus

"That he might fill all things."
— Ephesians 4:10
```

Centre-align. Apply `.epigraph` class.

### Task 5.5 — `xhtml/preface.xhtml`

Extract the introductory text from `index.html`. This is the home page's main body text — the explanation of the three-lens interpretive framework (alchemical tradition, Christian theology, Jungian depth psychology) and the purpose of the site. Reproduce all of it faithfully. Include:

- The main site heading and tagline
- The three-lens framework section (with the three icons if they appear: use the rasterised PNGs `sun-gold.png`, `alchemical-cross.png`, `ouroboros.png` or whichever icons are used on the home page)
- Any introductory paragraphs describing the Opus Magnum and the book's approach
- The navigation module cards content (the short descriptions of each section) as a summary list rather than as visual cards

Title this section "Preface" in the ePub heading.

### Task 5.6 — `xhtml/toc.xhtml`

A human-readable Table of Contents page (distinct from the machine-readable `nav.xhtml`). List all parts and chapters with their titles. Apply `epub:type="toc"` to the `<nav>` element.

---

## Phase 6 — Part Title Pages

For each of the four parts, create a simple part-title page. These are brief single-page dividers.

### Task 6.1 — `xhtml/part-1-foundations.xhtml`

```
PART ONE

Foundations

The Prima Materia and the Fourfold World
```

Include the `four-elements.png` diagram (or `prima-materia.png`) centred on the page.

### Task 6.2 — `xhtml/part-2-great-work.xhtml`

```
PART TWO

The Great Work

Nigredo · Albedo · Citrinitas · Rubedo
```

Include the `opus-magnum.png` diagram centred on the page.

### Task 6.3 — `xhtml/part-3-synthesis.xhtml`

```
PART THREE

Synthesis

The Stone and the Completed Work
```

Include the `philosophers-stone.png` diagram centred on the page.

### Task 6.4 — `xhtml/part-4-reference.xhtml`

```
PART FOUR

Depth & Reference

Jung, the Index, and the Sources
```

Include the `jung.png` diagram centred on the page.

---

## Phase 7 — Chapter Files

Each chapter XHTML file must faithfully reproduce all content from its corresponding HTML source page. Work through each source file systematically.

**For every chapter, follow this extraction procedure:**

1. Open the source HTML file in `/pages/`.
2. Ignore: `<nav>`, `<header>`, `<footer>`, all navigation markup, JavaScript `<script>` tags, social share buttons, breadcrumbs.
3. Extract everything inside `<main>` (or the primary content container): all headings, paragraphs, blockquotes, figures, tables, lists, glossary rows, pull quotes, epigraphs, symbol rows.
4. Convert HTML to valid XHTML (self-closing tags, `xmlns` on `<html>`, quoted attributes, no deprecated elements).
5. Replace all `<img src="../../assets/diagrams/foo.png">` with `<img src="../images/diagrams/foo.png">`.
6. Replace all `<img src="../../assets/icons/bar.svg">` with `<img src="../images/icons/bar.png">` (using the rasterised PNG from Task 1.2).
7. Preserve all CSS classes that have ebook.css equivalents (`.pullquote`, `.epigraph`, `.latin`, `.drop-cap`, `.stage-label`, `.glossary-term`, `.scripture-ref`, `.three-lens-box`, `.symbol-row`, `.icon-inline`).
8. Remove classes with no ebook.css equivalent (animation classes like `.animate-on-scroll`, `.delay-1`, layout-only classes).
9. Add `epub:type` semantic attributes where appropriate:
   - `<section epub:type="chapter">` on the main chapter section
   - `<blockquote epub:type="epigraph">` on opening epigraphs
   - `<aside epub:type="footnote">` on any footnotes

Every chapter file must begin with:
```xhtml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:epub="http://www.idpf.org/2007/ops"
      xml:lang="en-GB">
<head>
  <meta charset="UTF-8"/>
  <title>[Chapter Title] — Aurum Cordis</title>
  <link rel="stylesheet" type="text/css" href="../css/ebook.css"/>
</head>
<body>
```

### Task 7.1 — `ch01-prima-materia.xhtml`

**Source:** `/pages/prima-materia.html`

Include:
- Chapter heading (e.g., "Prima Materia")
- All section headings and body text
- The `prima-materia.png` diagram as a chapter-opening figure, captioned
- All three-lens boxes (alchemical / theological / Jungian interpretations)
- All Latin terms with translations
- All Scripture references
- Any glossary rows present on the page
- All pull quotes / blockquotes

### Task 7.2 — `ch02-four-elements.xhtml`

**Source:** `/pages/four-elements.html`

Include:
- Chapter heading
- All body text and section headings
- The `four-elements.png` diagram as opening figure
- The elemental symbol icons (`fire.png`, `water.png`, `air.png`, `earth.png`) inline as they appear in the source
- Tables or structured lists of elements with their correspondences
- All theological and Jungian interpretations
- All Scripture references and pull quotes

### Task 7.3 — `ch03-sulphur-mercury-salt.xhtml`

**Source:** `/pages/sulphur-mercury-salt.html`

Include:
- Chapter heading: Sulphur, Mercury & Salt (Tria Prima)
- The `sulphur-mercury-salt.png` diagram
- Tria Prima icons (`sulphur.png`, `mercury-tria.png`, `salt.png`) as inline symbols
- Full body text including Paracelsian background and the body/soul/spirit triad
- Theological correspondences (Father/Son/Spirit, or as the page presents them)
- All Jungian parallels
- Any tables of correspondences

### Task 7.4 — `ch04-seven-metals.xhtml`

**Source:** `/pages/seven-metals.html`

Include:
- Chapter heading: The Seven Metals
- The `seven-metals.png` diagram
- Planetary icons for all seven (`saturn-lead.png`, `jupiter-tin.png`, `mars-iron.png`, `venus-copper.png`, `mercury-planet.png`, `moon-silver.png`, `sun-gold.png`) as inline symbols alongside their corresponding metal
- The planetary ladder (Saturn/lead → Sun/gold)
- Full theological and Jungian interpretation sections
- Any tables of planetary/metal/psychological correspondences

### Task 7.5 — `ch05-nigredo.xhtml`

**Source:** `/pages/nigredo.html`

Include:
- Stage label: Nigredo (Black Phase) — apply `.stage-label.nigredo` class
- The `nigredo.png` diagram as chapter opening figure
- All body text on putrefaction, the dark night of the soul, mortificatio
- Theological section (death in Christ, kenosis, dark night of St John of the Cross)
- Jungian section (shadow, confrontation with the unconscious)
- All Scripture references, pull quotes, Latin terms
- Any mention of the ouroboros — include `ouroboros.png` if it appears on this page

### Task 7.6 — `ch06-albedo.xhtml`

**Source:** `/pages/albedo.html`

Include:
- Stage label: Albedo (White Phase) — `.stage-label.albedo`
- The `albedo.png` diagram
- `moon-queen.png` if referenced on this page
- All body text on purification, the washing, the dawn
- Theological section (baptism, purgation, Mary as Luna)
- Jungian section (anima, integration of the shadow, washing the unconscious)
- All Scripture references and pull quotes

### Task 7.7 — `ch07-citrinitas.xhtml`

**Source:** `/pages/citrinitas.html`

Include:
- Stage label: Citrinitas (Yellow Phase) — `.stage-label.citrinitas`
- The `citrinitas.png` diagram
- All body text — this is the "lost stage" between white and red; include the full discussion of its recovery and significance
- Theological section
- Jungian section
- All Scripture references, Latin terms, pull quotes

### Task 7.8 — `ch08-rubedo.xhtml`

**Source:** `/pages/rubedo.html`

Include:
- Stage label: Rubedo (Red Phase) — `.stage-label.rubedo`
- Both rubedo diagrams: `rubedo-phoenix.png` and `rubedo-pelican.png` as separate figures with captions
- `sun-king.png` if referenced
- The `rebis.png` diagram if it appears on this page
- All body text on the red phase — perfection, coniunctio, the Wedding of Opposites
- The phoenix and pelican as alchemical symbols — include the full theological readings (resurrection, Eucharist)
- Theological section (the Wedding of the Lamb, theosis, consummation)
- Jungian section (individuation completed, the Self, the sacred marriage / hieros gamos)
- All Scripture references and pull quotes

### Task 7.9 — `ch09-philosophers-stone.xhtml`

**Source:** `/pages/philosophers-stone.html`

Include:
- The `philosophers-stone.png` diagram
- All body text on the Lapis Philosophorum — the Stone that transmutes all
- The `heart-sigil.png` and `golden-heart.png` diagrams if referenced on this page
- The `alchemical-cross.png` icon if used
- Theological section (Christ as the true Lapis, the Stone rejected by the builders)
- Jungian section (the Self as the Philosopher's Stone, the individuation endpoint)
- All Scripture references (especially Psalm 118:22, Matthew 21:42)
- All pull quotes and Latin terms

### Task 7.10 — `ch10-opus-magnum.xhtml`

**Source:** `/pages/opus-magnum.html`

Include:
- The `opus-magnum.png` diagram as chapter opening figure
- The `circulatio.png` diagram (the circular/spiral nature of the Work)
- All body text — the full process overview, the integration of all four stages
- Theological section on the completed spiritual journey
- Jungian section on individuation as a complete process
- Any stage-progression diagrams reproduced as a text table if the original uses HTML structure
- All pull quotes and Scripture references

### Task 7.11 — `ch11-jung.xhtml`

**Source:** `/pages/jung.html`

Include:
- The `jung.png` diagram/portrait as chapter opening figure
- The full discussion of Jung's engagement with alchemical texts
- Sections on: individuation, shadow, anima/animus, the Self, the collective unconscious, the transcendent function
- The convergences between Jungian psychology and orthodox Christian theology
- The divergences and critical perspective from a Christ-centred standpoint
- All quotations from Jung (reproduce faithfully with source citations)
- All Scripture references
- All pull quotes and Latin terms

### Task 7.12 — `ch12-cross-reference.xhtml`

**Source:** `/pages/cross-reference.html` + `/data/cross-reference.json`

This page is an interactive filtering table in the web version. In the ePub, render it as a static HTML table. The JavaScript functionality (filtering, search) must be omitted — just produce the full data as a readable table.

Read all entries from `/data/cross-reference.json`. For each entry, create a table row. The table structure:

| Alchemical Term | Latin | Category | Theological Correlates | Scripture | Jungian Correlates |
|---|---|---|---|---|---|

- Sort entries by category (Foundations first, then Stages, then Synthesis)
- Within each category, sort alphabetically by `alchemical_term`
- Render `scripture` and `jungian` arrays as comma-separated inline lists
- Preserve the Latin terms using `.latin` CSS class

Write a brief introduction paragraph before the table explaining what the cross-reference index is and how to use it.

### Task 7.13 — `ch13-bibliography.xhtml`

**Source:** `/pages/bibliography.html`

Include:
- The `bibliography.png` diagram
- All sections of the bibliography (primary alchemical texts, Christian mystical texts, Jungian texts, secondary scholarship)
- Every bibliographic entry, reproduced faithfully and completely
- Any introductory notes about the sources or how to use the bibliography
- Section headings for each category of sources
- Annotations or descriptions if any are present in the source HTML

---

## Phase 8 — Final Assembly & Packaging

### Task 8.1 — Validate all XHTML files

All XHTML files must be well-formed XML. Run a quick validation pass:

```bash
for f in epub-build/OEBPS/xhtml/*.xhtml; do
  python3 -c "
import xml.etree.ElementTree as ET
try:
    ET.parse('$f')
    print('OK: $f')
except ET.ParseError as e:
    print('ERROR: $f -', e)
"
done
```

Fix any XML errors before proceeding.

### Task 8.2 — Verify the manifest is complete

Check that every file in `epub-build/OEBPS/` is listed in `content.opf`'s `<manifest>`. A missing file causes Kindle to fail silently. Run:

```bash
# List all files in OEBPS
find epub-build/OEBPS -type f | sed 's|epub-build/OEBPS/||' | sort > /tmp/actual-files.txt

# Extract hrefs from content.opf
grep -oP 'href="\K[^"]+' epub-build/OEBPS/content.opf | sort > /tmp/manifest-hrefs.txt

# Show files in OEBPS but not in manifest
comm -23 /tmp/actual-files.txt /tmp/manifest-hrefs.txt
```

Any file listed in the diff (that isn't `content.opf` itself or `toc.ncx` or `nav.xhtml` which are declared separately) must be added to the manifest.

### Task 8.3 — Package the ePub archive

The ePub file is a ZIP archive. The `mimetype` file **must** be the first entry and **must not** be compressed (stored only). All other files are compressed normally.

```bash
cd epub-build

# Remove any existing output
rm -f ../aurum-cordis.epub

# Add mimetype first, uncompressed
zip -X0 ../aurum-cordis.epub mimetype

# Add everything else
zip -rX9 ../aurum-cordis.epub META-INF OEBPS

cd ..
```

Verify the file was created: `ls -lh aurum-cordis.epub`

### Task 8.4 — Validate with epubcheck

Run epubcheck on the assembled file:

```bash
java -jar /path/to/epubcheck.jar aurum-cordis.epub 2>&1 | tee epubcheck-report.txt
```

Read `epubcheck-report.txt`. Address all **ERROR** and **WARNING** items before continuing. Common issues to fix:

- `OPF-030`: Missing required metadata (add `dc:date`, `dc:language`, etc.)
- `RSC-007`: A file referenced in the manifest is missing — check file paths
- `NCX-002`: NCX navPoint src doesn't match a manifest item — check toc.ncx hrefs
- `PKG-012`: Incorrect media-type — check the manifest entries
- `HTM-004`: A non-XHTML character or encoding issue — fix the XHTML file

Re-run epubcheck after each fix cycle until it reports **0 errors, 0 warnings** (or only acceptable INFO messages).

### Task 8.5 — Test on Kindle Previewer

If Amazon's Kindle Previewer 3 desktop application is available, open `aurum-cordis.epub` in it:

1. Verify the cover image appears correctly
2. Navigate through the table of contents — all entries must be tappable and navigate to the correct page
3. Check that all 21 PNG diagrams render (they should appear as inline images or full-page figures)
4. Check that the 17 icon PNGs display correctly inline in the text
5. Check that fonts render (IM Fell English for headings, Cormorant Garamond for body)
6. Check that pull quotes, epigraphs, and stage labels are visually distinct
7. Check the cross-reference table (Chapter 12) — it should be readable on a Kindle-width screen
8. Spot-check 3–4 chapters for text completeness (no truncated content)

If Kindle Previewer is not available, proceed with the validated ePub and note that physical device testing is recommended before publishing.

---

## Phase 9 — Kindle Direct Publishing (KDP) Preparation

### Task 9.1 — Prepare the KDP metadata sheet

Create a file `kdp-metadata.txt` in the repo root with the following information filled in for use when creating the KDP listing:

```
Title:            Aurum Cordis: The Philosopher's Stone and the Word Made Flesh
Subtitle:         (leave blank or use: The Opus Magnum through Theology, Alchemy, and Depth Psychology)
Author:           Mark Oriel
Language:         English
Description:      [Extract the 2–3 paragraph site description from index.html]
Keywords:         alchemy, Christian mysticism, Jungian psychology, Opus Magnum, spiritual transformation,
                  Philosopher's Stone, prima materia, Christ, depth psychology, medieval alchemy
Categories:       Religion & Spirituality > Mysticism
                  Psychology > Jungian
                  History > Alchemy & Hermeticism
Adult content:    No
DRM:              Enabled (recommended)
Price:            Author to decide
ISBN:             Not required for Kindle (KDP assigns ASIN)
```

### Task 9.2 — Final file checklist

Before submitting to KDP, confirm all of the following:

- [ ] `aurum-cordis.epub` passes epubcheck with 0 errors
- [ ] Cover image is JPEG, 2560×3840px (or similar 2:3 ratio), under 5 MB
- [ ] All 21 PNG diagram images are present in the ePub (check `epub-build/OEBPS/images/diagrams/`)
- [ ] All 17 icon PNGs are present (check `epub-build/OEBPS/images/icons/`)
- [ ] TOC has correct chapter count (13 chapters + 4 part pages + 6 front matter pages)
- [ ] Author name reads "Mark Oriel" on title page and in OPF metadata
- [ ] Book title reads "Aurum Cordis: The Philosopher's Stone and the Word Made Flesh"
- [ ] Copyright year is 2026
- [ ] All cross-reference JSON data is rendered in Chapter 12
- [ ] Bibliography entries are all present in Chapter 13
- [ ] No web-only content present (no nav bars, no JavaScript, no "scroll to top" buttons)

---

## Appendix A — Chapter-to-Source Mapping

| Output file | Source HTML | Key images |
|---|---|---|
| `ch01-prima-materia.xhtml` | `pages/prima-materia.html` | `prima-materia.png` |
| `ch02-four-elements.xhtml` | `pages/four-elements.html` | `four-elements.png`, fire/water/air/earth icons |
| `ch03-sulphur-mercury-salt.xhtml` | `pages/sulphur-mercury-salt.html` | `sulphur-mercury-salt.png`, sulphur/mercury-tria/salt icons |
| `ch04-seven-metals.xhtml` | `pages/seven-metals.html` | `seven-metals.png`, all 7 planetary icons |
| `ch05-nigredo.xhtml` | `pages/nigredo.html` | `nigredo.png`, `ouroboros.png` |
| `ch06-albedo.xhtml` | `pages/albedo.html` | `albedo.png`, `moon-queen.png` |
| `ch07-citrinitas.xhtml` | `pages/citrinitas.html` | `citrinitas.png` |
| `ch08-rubedo.xhtml` | `pages/rubedo.html` | `rubedo-phoenix.png`, `rubedo-pelican.png`, `sun-king.png`, `rebis.png` |
| `ch09-philosophers-stone.xhtml` | `pages/philosophers-stone.html` | `philosophers-stone.png`, `heart-sigil.png`, `golden-heart.png` |
| `ch10-opus-magnum.xhtml` | `pages/opus-magnum.html` | `opus-magnum.png`, `circulatio.png` |
| `ch11-jung.xhtml` | `pages/jung.html` | `jung.png` |
| `ch12-cross-reference.xhtml` | `pages/cross-reference.html` + `data/cross-reference.json` | — |
| `ch13-bibliography.xhtml` | `pages/bibliography.html` | `bibliography.png` |

## Appendix B — Image Inventory

**PNG Diagrams (21 files — `/assets/diagrams/`):**
`aurum-cordis.png`, `prima-materia.png`, `four-elements.png`, `sulphur-mercury-salt.png`, `seven-metals.png`, `nigredo.png`, `albedo.png`, `citrinitas.png`, `rubedo-phoenix.png`, `rubedo-pelican.png`, `philosophers-stone.png`, `opus-magnum.png`, `circulatio.png`, `rebis.png`, `golden-heart.png`, `heart-sigil.png`, `moon-queen.png`, `sun-king.png`, `jung.png`, `bibliography.png`

**SVG Icons to rasterise (17 files — `/assets/icons/`):**
`fire.svg`, `water.svg`, `air.svg`, `earth.svg`, `sulphur.svg`, `mercury-tria.svg`, `salt.svg`, `sun-gold.svg`, `moon-silver.svg`, `saturn-lead.svg`, `jupiter-tin.svg`, `mars-iron.svg`, `venus-copper.svg`, `mercury-planet.svg`, `ouroboros.svg`, `alchemical-cross.svg`

## Appendix C — ePub 3 Semantic Vocabulary Reference

Use these `epub:type` values where appropriate in chapter XHTML:

| Element context | epub:type value |
|---|---|
| `<body>` on cover page | `cover` |
| `<body>` on title page | `titlepage` |
| `<body>` on copyright page | `copyright-page` |
| `<body>` on dedication | `dedication` |
| `<body>` on preface | `preface` |
| `<nav>` in nav.xhtml | `toc` |
| `<section>` wrapping a chapter | `chapter` |
| `<section>` wrapping a part | `part` |
| `<blockquote>` opening epigraph | `epigraph` |
| `<aside>` footnote | `footnote` |
| `<section>` back matter | `backmatter` |
| `<section>` bibliography | `bibliography` |
| `<section>` index | `index` |
