# TASKS.md — *Aurum Cordis*
## A GitHub Page: Christian Alchemy — Theological Foundations

> A scholarly, visually rich static site exploring the intersection of medieval alchemical theory, Christian theology, and Jungian depth psychology. Each module is a self-contained build unit for Claude Code.

---

## 🗂️ Project Architecture Overview

```
aurum-cordis/
├── index.html                  # Landing / home page
├── css/
│   ├── base.css                # Design system tokens, typography, layout
│   ├── components.css          # Reusable UI components
│   └── animations.css          # Motion and transition system
├── js/
│   ├── main.js                 # Navigation, scroll, utilities
│   ├── diagrams.js             # SVG/canvas interactive diagrams
│   └── search.js               # In-page search (optional)
├── pages/
│   ├── prima-materia.html
│   ├── four-elements.html
│   ├── opus-magnum.html
│   ├── nigredo.html
│   ├── albedo.html
│   ├── citrinitas.html
│   ├── rubedo.html
│   ├── philosophers-stone.html
│   ├── sulphur-mercury-salt.html
│   ├── seven-metals.html
│   ├── jung.html
│   └── bibliography.html
├── assets/
│   ├── icons/                  # SVG alchemical symbols
│   ├── diagrams/               # Emblem and process diagrams
│   └── fonts/                  # Self-hosted typefaces
└── README.md
```

---

After completing a module, tick off the done tasks, push to main branch and then post a link to the page on the localhost.

---

## ⚙️ MODULE 0 — Project Scaffolding & Design System

### Task 0.1 — Repository & File Structure
- [✓] Create the full directory tree as shown above
- [✓] Edit `README.md` with project title, description, theological premise, and attribution

### Task 0.2 — Design System (`css/base.css`)
- [✓] Define CSS custom properties for the full design token system:
  - **Colour palette**: Deep alchemical tones — furnace black (`#0e0b08`), vellum cream (`#f0e6c8`), cinnabar red (`#8b1a1a`), vitriol green (`#3a5a40`), sulphur gold (`#c9a227`), silver (`#b8bcc2`), azure (`#1a3a5c`)
  - **Typography**: Import `IM Fell English` (Google Fonts) for headings; `Cormorant Garamond` for body text; `Cinzel` for section labels and alchemical terms
  - **Spacing scale**: 8pt base grid (8, 16, 24, 32, 48, 64, 96, 128px)
  - **Border radius, shadow, and z-index tokens**
- [✓] Define a global `body` and `html` reset with scroll behaviour
- [✓] Create `.container`, `.section`, `.page-header`, and `.content-prose` layout utility classes
- [✓] Add a `.alchemical-term` inline style (small-caps, gold colour, light letter-spacing)
- [✓] Add a `.scripture` blockquote style (left border in cinnabar, italic Cormorant, indented)
- [✓] Add a `.latin` style for Latin phrases (italic, slightly reduced opacity)

### Task 0.3 — Animation System (`css/animations.css`)
- [✓] Define `@keyframes` for: `fadeInUp`, `fadeInLeft`, `glowPulse`, `slowRotate`, `flicker`
- [✓] Create utility animation classes: `.animate-on-scroll` (triggers via JS IntersectionObserver), `.glow`, `.rotate-slow`
- [✓] Add a CSS noise/grain texture overlay class `.grain-overlay` using SVG filter

### Task 0.4 — Component Library (`css/components.css`)
- [✓] **Navigation bar**: Fixed top nav with alchemical sigil logo, site title, and page links; collapses to hamburger on mobile
- [✓] **Hero section**: Full-viewport with title, subtitle, atmospheric background (dark vellum texture), and a large SVG alchemical emblem
- [✓] **Content card** (`.card`): Used for principles, stages, and terms — parchment background, gold border-top, subtle drop shadow
- [✓] **Dual-column layout** (`.two-col`): Left = theological content, Right = alchemical content, linked by a central divider glyph
- [✓] **Pull quote / epigraph** (`.epigraph`): Centred, large Cormorant italic, faint line above and below
- [✓] **Term glossary row** (`.glossary-item`): Alchemical symbol + Latin name + English gloss + theological correlate
- [✓] **Stage indicator strip**: Visual progress bar across the four stages of the Opus, used on each stage page
- [✓] **Footnote / endnote** system with superscript links and a `<footer>` reference block
- [✓] **Image/emblem figure** (`.emblem-figure`): Centred image with caption in small Cinzel

### Task 0.5 — JavaScript Core (`js/main.js`)
- [✓] Implement IntersectionObserver for `.animate-on-scroll` elements
- [✓] Implement smooth anchor scroll
- [✓] Implement active nav link highlighting based on current page
- [✓] Implement mobile hamburger menu toggle
- [✓] Add a "scroll to top" button that appears after 400px scroll

---

## 🌑 MODULE 1 — Prima Materia (`pages/prima-materia.html`)

*The unformed substrate of all things; the chaos before creation.*

### Task 1.1 — Content: Alchemical Foundation
- [✓] Define **Prima Materia** in classical alchemical terms: the undifferentiated first substance from which all metals and all things are made; unknowable in itself, only knowable through its manifestations
- [✓] Describe its paradoxical character: everywhere yet nowhere, common yet priceless, formless yet the source of all form
- [✓] Cite key alchemical sources: Jabir ibn Hayyan (Geber), the *Rosarium Philosophorum*, Paracelsus, and the *Emerald Tablet*
- [✓] Note the range of names Prima Materia was given: chaos, hyle, Mercurius, water, fire, earth, lead, dung, poison — and explain why this multiplicity is theologically significant

### Task 1.2 — Content: Christian Theological Correlates
- [✓] **Tohu wa-bohu** (Genesis 1:2): the formless void and darkness over the deep as the closest scriptural analogue to Prima Materia; the Spirit (Ruach) hovering over it as the alchemical *Spiritus*
- [✓] **Creatio ex nihilo** vs **creatio ex materia**: explore the tension between Christian orthodoxy (creation from nothing) and alchemical hylomorphism; argue they address different ontological levels
- [✓] **The human soul before grace**: patristic use of Prima Materia as a metaphor for the unregenerate self — disordered, unformed, awaiting the divine fire (Origen, Gregory of Nyssa)
- [✓] **Kenosis** as Prima Materia: Christ's self-emptying (Philippians 2:7) as the voluntary assumption of unformed humanity — the Word entering the chaos
- [✓] **Mary as vessel of the Prima Materia**: her womb as the *vas hermeticum* (sealed vessel) in which the divine and human are first joined; cite the Annunciation iconographic tradition

### Task 1.3 — Content: Jungian Dimension
- [✓] Jung's identification of Prima Materia with the **unconscious**: the dark, unformed psychic substrate from which individuation begins
- [✓] The Shadow as the alchemist's first encounter with Prima Materia — what is rejected, denied, "lead-like"
- [✓] Connect to Mark's own Jungian framing: the exile state, the unintegrated self, the beginning of the Opus in self-knowledge

### Task 1.4 — UI Build
- [✓] Hero section with title "Prima Materia" and epigraph from the *Emerald Tablet*
- [✓] Render the alchemical symbol for Prima Materia (circle with a dot, or chaotic overlapping forms) as inline SVG
- [✓] Three-column grid of cards: Alchemical definition | Christian correlate | Jungian dimension
- [✓] Scripture blockquote: Genesis 1:1–2
- [✓] Latin phrase feature: *"Visita Interiora Terrae Rectificando Invenies Occultum Lapidem"* (V.I.T.R.I.O.L.) with annotation

---

## 🜃 MODULE 2 — The Four Elements (`pages/four-elements.html`)

*Earth, Water, Air, Fire — the classical quaternary and its theological resonances.*

### Task 2.1 — Content: Alchemical Elemental Theory
- [✓] Explain Aristotelian four-element theory as adopted by alchemists: each element defined by two of four qualities (hot, cold, wet, dry)
- [✓] Describe the elemental wheel and the principle of transmutation through adjacent quality change
- [✓] Introduce the **quinta essentia** (fifth element / aether) as the hidden principle that unifies the four and is the goal of distillation

### Task 2.2 — Content: Christian Theological Correlates
- [✓] **Fire**: Pentecost (Acts 2), the burning bush (Exodus 3), the pillar of fire (Exodus 13), the seraphim (Isaiah 6); God as consuming fire (Deuteronomy 4:24, Hebrews 12:29); the Holy Spirit as divine fire
- [✓] **Water**: Baptism and the waters of creation (Genesis 1:2); the Jordan; the living water of John 4 and John 7; the water from Christ's side (John 19:34); flood and new creation (1 Peter 3:20–21)
- [✓] **Earth**: The Incarnation — the Word made dust (cf. Genesis 2:7, John 1:14); the Body of Christ; Eucharistic bread from the earth; burial and resurrection; the promise of a new earth (Revelation 21:1)
- [✓] **Air**: The Breath of God (*pneuma*, *ruach*); the Spirit as wind (John 3:8); resurrection breath (John 20:22); the voice of God (1 Kings 19:12)
- [✓] **Quinta Essentia**: Christ as the fifth element — the unifying principle who holds all creation together (Colossians 1:17); the Logos as cosmic ordering principle; Sophianic wisdom as the hidden intelligibility of creation

### Task 2.3 — Content: Jungian Dimension
- [✓] Jung's fourfold typology (Thinking/Feeling/Sensation/Intuition) as a psychological echo of the four elements
- [✓] The quinta essentia as the Self — the unifying centre of the psyche that transcends the four functions

### Task 2.4 — UI Build
- [✓] Interactive SVG elemental wheel: hover over each element to reveal its qualities, symbol, theological correlate, and Jungian function
- [✓] Four cards in a 2×2 grid, each styled with the element's associated colour
- [✓] Central quinta essentia feature card (gold, elevated, with Christ-as-Logos text)
- [✓] Elemental symbols rendered as SVG glyphs (🜂🜄🜁🜃)

---

## 🜍 MODULE 3 — The Tria Prima (`pages/sulphur-mercury-salt.html`)

*Paracelsus's three principles: the alchemical trinity of body, soul, and spirit.*

### Task 3.1 — Content: Alchemical Theory
- [✓] Introduce Paracelsus's revolutionary replacement of the four elements with the **Tria Prima**: Sulphur (combustibility/soul), Mercury (volatility/spirit), Salt (solidity/body)
- [✓] Explain each principle's role in the composition of metals and the human being
- [✓] Note the internal tensions and debates within alchemy about Tria Prima vs. four elements (they were often synthesised)

### Task 3.2 — Content: Christian Theological Correlates
- [✓] **Sulphur → Soul (*anima*)**: The animating principle, passion, and will; connected to the image of God (*imago Dei*) in the soul; Augustinian restlessness (*our heart is restless until it rests in Thee*)
- [✓] **Mercury → Spirit (*spiritus*)**: The volatile mediating principle; the Holy Spirit as divine Mercury, descending and ascending; the *spiritus* of Christ that descended into Hades and rose; Hermes/Mercury as a *figura Christi* in Christian allegorical reading (Lactantius, Augustine)
- [✓] **Salt → Body (*corpus*)**: Incorruptibility and preservation; "Ye are the salt of the earth" (Matthew 5:13); the eucharistic body; resurrection of the body; the salt of baptismal rites; covenant salt (Leviticus 2:13)
- [✓] **Tria Prima as Trinitarian analogy**: Sulphur = Father (source, fire), Mercury = Son (mediator, Logos), Salt = Spirit (preserving, sanctifying) — note this is analogical and not strictly orthodox, but explore its theological utility and limits
- [✓] Cite Boehme and the later Christian theosophists who developed this Trinitarian reading explicitly

### Task 3.3 — Content: Jungian Dimension
- [✓] Jung's mapping: Mercury = the unconscious in its mediating, trickster form; Sulphur = the libido/instinctual drive; Salt = the crystallised, bitter wisdom that comes through suffering (*sapientia*)
- [✓] The integration of all three as a prerequisite for the coniunctio

### Task 3.4 — UI Build
- [✓] Three tall cards in a row: Sulphur (amber/orange), Mercury (silver/blue), Salt (white/cream), each with symbol, alchemical definition, theological correlate, Jungian dimension
- [✓] A Trinitarian triangle diagram linking the three with the Divine Names at each vertex
- [✓] Scripture features for each (Matthew 5:13 for Salt, etc.)

---

## ⬛ MODULE 4 — Nigredo (`pages/nigredo.html`)

*The Black Phase: putrefaction, death, dissolution, and the dark night of the soul.*

### Task 4.1 — Content: Alchemical Theory
- [✓] Define Nigredo as the first and most feared stage of the Opus Magnum: the blackening, the putrefaction (*putrefactio*), the calcination (*calcinatio*) of the base matter
- [✓] Describe the processes associated with Nigredo: **Calcinatio** (burning to ash), **Putrefactio** (rotting), **Solutio** (dissolution in acid/water), **Mortificatio** (death of the old form)
- [✓] The raven (*corvus*) and the black sun (*sol niger*) as iconographic markers of Nigredo; cite the *Rosarium Philosophorum* emblems
- [✓] The necessity of Nigredo: nothing can be refined without first being destroyed

### Task 4.2 — Content: Christian Theological Correlates
- [✓] **The Passion and Death of Christ**: Nigredo as the deepest image of Good Friday; the *sol niger* as the darkened sun (Luke 23:44–45); the cry of dereliction (Psalm 22 / Matthew 27:46) as the soul's encounter with divine abandonment
- [✓] **Ash Wednesday and Lenten ascesis**: the imposition of ashes as liturgical Nigredo; penitential darkness as voluntary dissolution
- [✓] **The Dark Night of the Soul** (John of the Cross, *Noche Oscura*): spiritual Nigredo as the stripping of consolations, the death of the false self, the purgation that precedes union
- [✓] **Baptismal death**: Romans 6:3–4 — buried with Christ in baptism; the font as grave and womb simultaneously
- [✓] **Descent into Hades** (*descensus ad inferos*): Christ's harrowing of hell as the supreme Nigredo — the divine entering the darkest darkness to transform it from within
- [✓] **The exile motif**: connect to Mark's chapbook arc — the exile as Nigredo, the wilderness as furnace, the stripping of identity as putrefactio

### Task 4.3 — Content: Jungian Dimension
- [✓] Jung's identification of Nigredo with the confrontation with the Shadow: the dark, denied, "dead" parts of the self that must be faced and integrated
- [✓] Nigredo as the beginning of individuation: the breakdown of the *persona* (false self), the eruption of the unconscious
- [✓] Depression, grief, and crisis as potential Nigredo — not pathology to be avoided but transformation in process
- [✓] The Trickster/Carnival archetype that emerges in Nigredo (connect to Mark's recent dream work — the shadow figures, the irreverent energy, the suppressed capacities)

### Task 4.4 — UI Build
- [✓] Dark-themed page (near-black background, dark vellum text, deep red accents)
- [✓] Hero with *sol niger* SVG (black sun with corona rays)
- [✓] Process cards for each Nigredo operation (Calcinatio, Putrefactio, Solutio, Mortificatio) with theological parallel
- [✓] Stage progress indicator showing Nigredo as Stage 1 of 4
- [✓] Scripture blockquote: Matthew 27:45–46
- [✓] Pull quote from John of the Cross's *Dark Night of the Soul*
- [✓] Transition panel at page bottom: "From death to washing — the movement toward Albedo →"

---

## ⬜ MODULE 5 — Albedo (`pages/albedo.html`)

*The White Phase: purification, washing, the dawn of new light.*

### Task 5.1 — Content: Alchemical Theory
- [✓] Define Albedo as the second stage: the whitening (*dealbatio*), achieved through repeated **Ablutio** (washing), **Sublimatio** (sublimation), and **Distillatio** (distillation)
- [✓] The white swan, the white rose, and the moon as symbols of Albedo; the *albedo* as the purified soul-substance
- [✓] The *Luna* (Moon) as the presiding symbol: reflective, receptive, purified but not yet fully illuminated
- [✓] Some traditions held Albedo as the penultimate goal (the white stone, the lesser work); others as an intermediate stage

### Task 5.2 — Content: Christian Theological Correlates
- [✓] **The Resurrection of Christ**: Albedo as Easter — the body glorified, radiant, but not yet ascended; the Transfiguration (Matthew 17:2, "his face shone like the sun, his clothes became white as light") as Albedo in Christ's earthly life
- [✓] **Baptismal white**: the white garment (*chrysom*) given at baptism; the robing in white as the sign of purification; Revelation 7:14 (robes washed white in the blood of the Lamb)
- [✓] **Purgatory / Purgation**: in Catholic and Anglo-Catholic theology, Albedo as the process of post-mortem or present-life purification; C.S. Lewis's *The Great Divorce* as an imaginative Albedo narrative
- [✓] **The Anima/Soul purified**: the soul's receptive, feminine capacity restored — Marian overtones; the purified soul as Bride of the Song of Songs (*nigra sum sed formosa* → *tota pulchra es*)
- [✓] **Ablutio and Confession/Absolution**: the sacramental washing corresponding to the alchemical washing operations

### Task 5.3 — Content: Jungian Dimension
- [✓] Albedo as the emergence of the **Anima/Animus** in purified form — no longer the devouring or entrapping figure but the guide and soul-companion
- [✓] The integration of the unconscious feminine (in men) as the whitening of the psyche; the moon as the reflective consciousness of the deep self
- [✓] Connect to Mark's Anima dreams: the red-haired figure in forest glades and living water — a handmaid of Sophia, an Albedo figure

### Task 5.4 — UI Build
- [✓] Silver-and-white colour palette with moon motifs
- [✓] Stage progress indicator: Stage 2 of 4 highlighted
- [✓] Moon phase SVG diagram showing the reflective quality of Albedo
- [✓] Process cards: Ablutio, Sublimatio, Distillatio with theological parallels
- [✓] Scripture: Matthew 17:1–2 (Transfiguration)
- [✓] Dual-column panel: "Song of Songs" left / "Alchemical White Rose" right
- [✓] Transition panel: "From washing to dawning — the movement toward Citrinitas →"

---

## 🌅 MODULE 6 — Citrinitas (`pages/citrinitas.html`)

*The Yellow/Citrine Phase: the dawn, the solar awakening, wisdom emerging.*

### Task 6.1 — Content: Alchemical Theory
- [✓] Note that Citrinitas (the yellowing) was recognised as a distinct stage in medieval alchemy but was later often absorbed into Rubedo by early modern alchemists (Paracelsus and after)
- [✓] Describe it as the dawning light, the solar quality beginning to penetrate the purified matter; the transition from lunar receptivity to solar activity
- [✓] The golden dawn, the eagle, and ripening grain as symbols
- [✓] Its function as the threshold of wisdom: the matter "knows itself" for the first time

### Task 6.2 — Content: Christian Theological Correlates
- [✓] **The Ascension of Christ** (Acts 1): if Nigredo = death, Albedo = resurrection, Citrinitas occupies the space of the 40 days and the Ascension — the glorified body still moving toward its final glorification
- [✓] **Pentecostal anticipation**: the waiting in the Upper Room; the dawning of wisdom before the fire descends; Citrinitas as the silence before Pentecost
- [✓] **Sapientia / Sophia**: Divine Wisdom in Proverbs 8 and Wisdom 7 — "more radiant than the sun, purer than light"; Citrinitas as the stage at which Wisdom begins to manifest; connect to Bulgakov's Sophiology
- [✓] **The Doctors of the Church / Theological illumination**: the tradition of spiritual wisdom (*sapientia*) as distinct from mere knowledge (*scientia*) in Aquinas, Bonaventure; the dawn-light of contemplative understanding
- [✓] **The Beatitudes**: "Blessed are the pure in heart, for they shall see God" (Matthew 5:8) — the seeing begins here, in Citrinitas, before the full solar blaze of Rubedo

### Task 6.3 — Content: Jungian Dimension
- [✓] Jung's relative neglect of Citrinitas and what this means: the transition from Anima integration to the first emergence of the Self is often the least charted stage
- [✓] Citrinitas as dawning **individuation**: the ego beginning to be oriented by the Self rather than by the persona or the shadow; wisdom displacing merely reactive behaviour
- [✓] The old king beginning to dissolve into the new: the senex giving way to the puer — but not yet the full coniunctio

### Task 6.4 — UI Build
- [✓] Warm golden-amber palette; dawn gradient hero
- [✓] Stage progress indicator: Stage 3 of 4
- [✓] Feature: "The Lost Stage" — panel explaining why Citrinitas was dropped and why its recovery matters theologically
- [✓] Scripture: Proverbs 8:22–31 (Wisdom's speech) and Matthew 5:8
- [✓] Pull quote from Bulgakov on Sophia
- [✓] Transition panel: "From dawn to noon — the movement toward Rubedo →"

---

## 🔴 MODULE 7 — Rubedo (`pages/rubedo.html`)

*The Red Phase: the solar perfection, the coniunctio, the completion of the Opus.*

### Task 7.1 — Content: Alchemical Theory
- [ ] Define Rubedo as the culminating fourth stage: the reddening, the full solar perfection, the completion of the *Opus Magnum*
- [ ] Operations associated: **Coagulatio** (fixation, the volatile becomes fixed), **Fermentatio** (the new quality spreads through the whole matter), **Multiplicatio** (the stone's power multiplies), **Projectio** (the stone transmutes base metal on contact)
- [ ] The red king, the phoenix, the red rose, and the pelican (feeding young from its own blood) as iconographic symbols
- [ ] The **Coniunctio Oppositorum** (union of opposites) as the central event of Rubedo: king and queen, sun and moon, fixed and volatile, masculine and feminine — united in the sacred marriage (*hieros gamos*)

### Task 7.2 — Content: Christian Theological Correlates
- [ ] **Pentecost**: the descent of fire (Acts 2) as the supreme Rubedo event in salvation history; the reddening of the Church by the Spirit
- [ ] **The Blood of Christ**: Rubedo's red as the blood of the Passion now glorified; the Eucharist as repeated Rubedo — *projectio* of the stone's power into the communicant; "This is my blood" (Matthew 26:28)
- [ ] **The Pelican as *figura Christi***: a major medieval Christian symbol — Christ feeding the Church from his own wound-side; the Eucharist and the pelican together as Rubedo sacrament; cite Aquinas, *Adoro Te Devote* ("Pie Pelicane, Jesu Domine")
- [ ] **The Wedding of the Lamb** (Revelation 19:6–9): the *coniunctio* as eschatological event — the Bride (Church/purified humanity) and the Bridegroom (Christ) united at the consummation of history
- [ ] **Deification (*theosis*)**: the Eastern Christian doctrine of human participation in the divine nature (2 Peter 1:4); Rubedo as the alchemical image of theosis — the base metal become gold, the mortal become participant in the divine life
- [ ] **The New Creation** (Revelation 21–22): the river of life, the tree of life, the city of gold — the Rubedo landscape as the garden-city of the Eschaton; connect to Mark's chapbook arc (exile → garden)
- [ ] **The Phoenix**: the resurrection body; Christ as the phoenix in early Christian patristic writing (Clement of Rome, *1 Clement* 25)

### Task 7.3 — Content: Jungian Dimension
- [ ] Rubedo as the achievement of the **Self** — not the inflation of the ego into omnipotence, but the ego's humble, stable orientation around the transcendent centre
- [ ] The **Coniunctio** as the union of conscious and unconscious, masculine and feminine, persona and shadow — the *totus homo* (whole person)
- [ ] The *multiplicatio* and *projectio* as the individuation's social dimension: the individuated person "transmutes" others simply by their presence — the saint, the elder, the wise companion
- [ ] Jung's own late writings (*Mysterium Coniunctionis*) as the culmination of his alchemical studies — cite and summarise key themes

### Task 7.4 — UI Build
- [ ] Deep crimson and gold palette; sun imagery; phoenix SVG
- [ ] Stage progress indicator: Stage 4 of 4 (completed)
- [ ] Large feature section on the Coniunctio with a marriage/union diagram (Sol + Luna → unified circle)
- [ ] Pelican symbol with *Adoro Te Devote* verse
- [ ] Scripture: Revelation 19:6–9 and 2 Peter 1:4
- [ ] Process cards: Coagulatio, Fermentatio, Multiplicatio, Projectio
- [ ] Closing epigraph panel: transition to the Philosopher's Stone page

---

## 💎 MODULE 8 — The Philosopher's Stone (`pages/philosophers-stone.html`)

*The end and the beginning; the tincture that transmutes all it touches.*

### Task 8.1 — Content: Alchemical Theory
- [ ] Describe the Stone (*lapis philosophorum*): not a physical stone but a perfected substance, a principle of transmutation; its paradoxes (it is found everywhere, costs nothing, yet almost no one finds it)
- [ ] Its three grades: the white stone (Albedo completion), the red stone (Rubedo completion), and the universal medicine
- [ ] The *Lapis* as both the end product and, paradoxically, also the Prima Materia — the beginning is the end (*ouroboros*)
- [ ] The Elixir of Life, the Universal Solvent (*Alkahest*), and the Panacea as related concepts

### Task 8.2 — Content: Christian Theological Correlates
- [ ] **The Stone the builders rejected** (Psalm 118:22, Matthew 21:42, 1 Peter 2:7): the most explicit biblical parallel — Christ as the rejected stone that becomes the cornerstone; the Stone that is everywhere yet unrecognised
- [ ] **Christ as Lapis**: the patristic and medieval tradition of identifying the Philosopher's Stone with Christ explicitly — Zosimos of Panopolis (3rd c.), the *Aurora Consurgens* (attr. Aquinas), John of Rupescissa; cite and discuss
- [ ] **The Eucharist as Lapis in action**: the *projectio* of Christ's presence into bread and wine, transforming them and then transforming the communicant; the limitless multiplication of the Loaves (John 6) as *multiplicatio*
- [ ] **The Kingdom of Heaven as leaven** (Matthew 13:33): the Stone's *fermentatio* quality — a small thing hidden in the mass that transforms the whole
- [ ] **The hidden treasure and the pearl** (Matthew 13:44–46): the Stone that is found, lost, found again at great cost
- [ ] **Grace as universal tincture**: theological grace as the alchemical tincture — it does not destroy the nature it enters but elevates and perfects it (*gratia perficit naturam*, Aquinas)

### Task 8.3 — Content: Jungian Dimension
- [ ] The Lapis as Jung's **Self archetype**: the transcendent centre and totality of the psyche, both the goal of individuation and its ever-present ground
- [ ] The paradox that the Self was present from the beginning (like the Stone in Prima Materia) but is only recognised at the end
- [ ] Jung's late autobiographical remarks (*Memories, Dreams, Reflections*) on the Lapis as the living symbol of wholeness

### Task 8.4 — UI Build
- [ ] Golden-white radiant design; ouroboros SVG
- [ ] Feature: Comparative table — "The Stone in Christian Sources" (Psalm 118 | Zosimos | *Aurora Consurgens* | Aquinas | modern)
- [ ] Scripture: 1 Peter 2:4–7 and Matthew 13:44–46
- [ ] Pull quote: *"Lapis noster non est lapis"* ("Our stone is not a stone") with commentary
- [ ] Closing reflection panel on grace as tincture

---

## 🪐 MODULE 9 — The Seven Metals & Planetary Rulers (`pages/seven-metals.html`)

*Lead to Gold: the planetary ladder of transformation.*

### Task 9.1 — Content: Alchemical Theory
- [ ] Introduce the seven metals and their planetary correspondences: Lead/Saturn, Tin/Jupiter, Iron/Mars, Gold/Sun, Copper/Venus, Mercury/Mercury, Silver/Moon
- [ ] Explain the macrocosm-microcosm principle (*As above, so below*): the seven planets govern both the cosmos and the metals and the human body/soul
- [ ] The ascent from Lead (Saturn, base, mortality, time) to Gold (Sun, perfection, eternity) as the alchemical ladder

### Task 9.2 — Content: Christian Theological Correlates
- [ ] **The seven-rung ladder of ascent**: connect to patristic and medieval ladder mysticism (John Climacus, *The Ladder of Divine Ascent*; Bonaventure, *Itinerarium Mentis in Deum*; Dante's *Paradiso*)
- [ ] **Saturn/Lead → Christ's descent**: the heavy, limiting, mortal principle; the Incarnation as the divine taking on lead/Saturn (time, suffering, death); *kenosis*
- [ ] **Sun/Gold → Christ's glory**: the gold of divinity; the Transfiguration; the risen and ascended Christ as the solar principle
- [ ] **Moon/Silver → Mary and the Church**: receptive, reflective, lunar — the Marian theological resonance; the Church as the moon reflecting the Sun of Christ
- [ ] **Mercury → The Holy Spirit as mediator**: volatile, descending, ascending, linking heaven and earth; Hermes/Mercury as *figura Christi* and *figura Spiritus*
- [ ] The seven metals as the seven gifts of the Holy Spirit (Isaiah 11:2–3): a medieval interpretive tradition worth exploring
- [ ] Dante's seven planetary heavens in *Paradiso* as a Christian alchemical cosmology

### Task 9.3 — UI Build
- [ ] Vertical ladder/ascent diagram: seven rungs, each with metal symbol, planet symbol, theological correlate
- [ ] Planet SVG icons with hover details
- [ ] Feature panel on the macrocosm-microcosm principle
- [ ] Dante's planetary heaven references for each

---

## 🌀 MODULE 10 — The Opus Magnum: Full Process Overview (`pages/opus-magnum.html`)

*The Great Work in its entirety: a unified map of the Christian alchemical journey.*

### Task 10.1 — Content: Synthesis
- [ ] Present the Opus Magnum as a unified narrative arc: Prima Materia → Nigredo → Albedo → Citrinitas → Rubedo → Lapis
- [ ] Draw out the Christian salvation narrative as its theological parallel: Creation → Fall/Exile → Incarnation/Passion → Resurrection → Ascension/Pentecost → Eschaton
- [ ] Draw out the Jungian individuation parallel: Unconscious wholeness → Ego formation → Shadow confrontation → Anima integration → Self-emergence → Individuation
- [ ] Note the recursive, spiral nature of the Opus: it is not a linear once-for-all event but a repeating deepening cycle (the alchemical *circulatio*)
- [ ] Introduce the concept of the **Soror Mystica** (mystical sister) in alchemy — the contemplative, feminine counterpart to the alchemist — and connect to the Church, Mary, and the Anima

### Task 10.2 — UI Build
- [ ] Full-page interactive SVG diagram: the four-stage wheel with theological and Jungian labels, clickable to navigate to each stage page
- [ ] Three-column comparison table: Alchemical Stage | Salvation History | Jungian Individuation
- [ ] Circular *circulatio* diagram showing the recursive nature of the work
- [ ] Navigation hub: large card links to all stage pages

---

## 🧠 MODULE 11 — Jung & Christian Alchemy (`pages/jung.html`)

*The depth psychologist as theologian manqué: reading Jung charitably and critically.*

### Task 11.1 — Content
- [ ] Survey Jung's alchemical writings: *Psychology and Alchemy* (1944), *Alchemical Studies* (1967), *Mysterium Coniunctionis* (1956)
- [ ] His central thesis: alchemy is a proto-psychology — the alchemists were projecting psychic processes onto matter
- [ ] A Christian critical response: projection vs. participation — the alchemists were not merely projecting but also participating in a sacramental vision of matter as spiritually significant; cite the Christian theology of creation (*creatio bona*)
- [ ] Where Jung and Christian theology converge: the necessity of shadow integration; the wholeness of the *imago Dei*; the unconscious as a genuine depth in the human person
- [ ] Where they diverge: Jung's agnosticism about the metaphysical reality of God; his treatment of Christ as a symbol of the Self (valuable but reductive); his inadequate theology of grace
- [ ] The **Victor White OP correspondence**: Jung's friendship with the Dominican theologian; their productive and ultimately tragic intellectual exchange; White's *God and the Unconscious* as an attempt at integration; cite and assess
- [ ] The possibility of a baptised Jungianism: depth psychology as an instrument of pastoral theology, not a replacement for it

### Task 11.2 — UI Build
- [ ] Timeline of Jung's alchemical writings
- [ ] Convergence/Divergence comparison table: Jung vs. Christian Theology
- [ ] Feature box: the Victor White correspondence
- [ ] Pull quote from *Mysterium Coniunctionis*

---

## 📚 MODULE 12 — Bibliography & Further Reading (`pages/bibliography.html`)

### Task 12.1 — Content
- [ ] **Primary alchemical sources**: Jabir/Geber, Zosimos of Panopolis, the *Emerald Tablet*, *Rosarium Philosophorum*, *Splendor Solis*, Paracelsus, *Aurora Consurgens*, Michael Maier (*Atalanta Fugiens*)
- [ ] **Christian theological sources**: Origen, Gregory of Nyssa, John of the Cross, Jacob Boehme, Bulgakov, Aquinas (*Adoro Te Devote*, *Summa Theologiae*), Bonaventure, John Climacus, the patristic *Physiologus* (on the pelican and phoenix)
- [ ] **Jungian sources**: Jung (*Psychology and Alchemy*, *Mysterium Coniunctionis*, *Memories Dreams Reflections*), Victor White, Marie-Louise von Franz (*Alchemical Active Imagination*, *Alchemy*)
- [ ] **Secondary and integrative**: Lyndy Abraham (*A Dictionary of Alchemical Imagery*), Stanton Linden (*Darke Hierogliphicks*), Barbara Obrist, Lawrence Principe (*The Secrets of Alchemy*)
- [ ] **Creative and literary**: Dante (*Paradiso*), Hopkins (selected poems), Tolkien (*On Fairy-Stories*), C.S. Lewis (*The Great Divorce*, *Till We Have Faces*)

### Task 12.2 — UI Build
- [ ] Categorised bibliography with styled entries
- [ ] Annotation for key texts (2–3 sentences each)
- [ ] "Start here" panel: recommended reading order for newcomers

---

## 🏠 MODULE 13 — Home Page (`index.html`)

### Task 13.1 — Content
- [ ] Site title: ***Aurum Cordis*** — "The Gold of the Heart"
- [ ] Tagline: *"The Opus Magnum as Christian Way: Alchemy, Theology, and the Soul's Transformation"*
- [ ] Brief introductory essay (400–600 words): the site's theological premises, its approach to alchemy as a symbolic rather than literally metallurgical tradition, its debt to Jung while not being reducible to Jungian psychology, and its commitment to orthodox Trinitarian Christianity as the interpretive frame
- [ ] Note on method: neither apologetic nor reductive — alchemy is taken seriously on its own terms and then read through a Christian lens
- [ ] Navigation hub with large illustrated cards linking to each module

### Task 13.2 — UI Build
- [ ] Full-viewport hero: dark vellum texture, large alchemical emblem (ouroboros encircling a cross), site title in IM Fell English, tagline in Cormorant
- [ ] Animated subtitle fade-in
- [ ] Intro essay section with pull quote
- [ ] Module card grid (illustrated, with stage colour coding)
- [ ] Footer with GitHub link, copyright, and a closing Latin phrase: *"Ora et Labora et Lege"*

---

## 🔧 MODULE 14 — Polish, Accessibility & Deployment

### Task 14.1 — Accessibility
- [ ] Add `alt` text to all SVG emblems and diagrams
- [ ] Ensure colour contrast ratios meet WCAG AA for all text/background combinations
- [ ] Add `aria-label` to all navigation elements
- [ ] Ensure keyboard navigability throughout

### Task 14.2 — SEO & Metadata
- [ ] Add `<meta>` description, Open Graph tags, and Twitter card tags to every page
- [ ] Add structured data (`schema.org/Article`) to key pages
- [ ] Generate a `sitemap.xml`

### Task 14.3 — GitHub Pages Deployment
- [ ] Add a `_config.yml` if using Jekyll, or configure for pure static deployment
- [ ] Add a `404.html` page (styled to match, with a "return to the Great Work" message)
- [ ] Confirm all internal links use relative paths
- [ ] Final review: cross-browser check (Chrome, Firefox, Safari), mobile responsiveness check
- [ ] Push to `main` branch and enable GitHub Pages in repository settings

---

## 📐 Appendix A — Alchemical Symbols Reference (SVG Assets Needed)

All symbols to be created as clean SVG files in `assets/icons/`:

| Symbol | Name | Unicode (if available) |
|---|---|---|
| 🜔 | Sulphur | U+1F714 |
| 🜍 | Mercury | U+1F70D |
| 🜹 | Salt | U+1F739 |
| 🜂 | Fire | U+1F702 |
| 🜄 | Water | U+1F704 |
| 🜁 | Air | U+1F701 |
| 🜃 | Earth | U+1F703 |
| ☉ | Sun / Gold | U+2609 |
| ☽ | Moon / Silver | U+263D |
| ♄ | Saturn / Lead | U+2644 |
| ♃ | Jupiter / Tin | U+2643 |
| ♂ | Mars / Iron | U+2642 |
| ♀ | Venus / Copper | U+2640 |
| ☿ | Mercury planet | U+263F |
| 🝡 | Ouroboros (custom SVG) | — |
| ✠ | Alchemical cross | U+2720 |

---

## 📐 Appendix B — Theological Cross-Reference Index

To be built as a `data/cross-reference.json` and rendered as a searchable table on a dedicated index page:

```json
{
  "entries": [
    {
      "alchemical_term": "Prima Materia",
      "theological_correlates": ["Tohu wa-bohu", "Kenosis", "Baptismal death", "Dark Night of Soul"],
      "scripture": ["Genesis 1:2", "Philippians 2:7"],
      "jungian": ["Shadow", "Unconscious substrate"],
      "page": "prima-materia.html"
    }
    // ... etc for all major terms
  ]
}
```

- [ ] Build `data/cross-reference.json` with all major alchemical terms
- [ ] Build a `pages/index.html` cross-reference page with filterable table (filter by alchemical term, scripture book, Jungian concept)

---

*"The stone that is not a stone, cheap yet priceless, known to all yet found by few — this is the beginning and the end of the work."*
*— Rosarium Philosophorum*
