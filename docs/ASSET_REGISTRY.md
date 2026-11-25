# The State of Everything — Brand & Marketing Asset Registry

> Generated from `src/registry/catalog.ts` by `npm run registry:doc`. Edit the catalog, not this file.

Master inventory of what a brand needs to establish its identity, express itself visually, tell stories, and operate across channels. 
It is deliberately broader than any one brand’s launch needs: each brand activates the categories it actually uses.

## How to read this

- **Code** — stable template ID. A brand’s record prefixes it (`LH-IDN-005` = Local Hero’s Wordmark).
- **App** — what markitABLE can produce today: ✅ generates · 🟡 partial · ⬜ planned.
- **★** — launch-critical (recommended minimum set).
- **Depends on** — explicit upstream assets. Every category also inherits the category dependencies listed under its heading.
- Checkboxes track **app capability**. Per-brand approval state (concept → in review → approved) lives on `AssetRecord`.

## App capability summary

**4** generated · **4** partial · **288** not yet built · **296** total · **34** launch-critical

| # | Category | Layer | Assets | ✅ | 🟡 | ⬜ |
|---|---|---|---:|---:|---:|---:|
| 01 | [Brand foundations](#1-fnd) | foundation | 15 | 2 | 1 | 12 |
| 02 | [Creative research & art direction](#2-res) | foundation | 17 | 0 | 0 | 17 |
| 03 | [Logo & identity suite](#3-idn) | creative | 17 | 0 | 0 | 17 |
| 04 | [Color system](#4-clr) | creative | 11 | 0 | 0 | 11 |
| 05 | [Typography system](#5-typ) | creative | 13 | 0 | 0 | 13 |
| 06 | [Graphic language & visual motifs](#6-gfx) | creative | 16 | 0 | 0 | 16 |
| 07 | [Photography & image library](#7-pho) | creative | 23 | 0 | 0 | 23 |
| 08 | [Composition & layout system](#8-lay) | creative | 15 | 0 | 0 | 15 |
| 09 | [Digital design system](#9-dsn) | creative | 19 | 0 | 0 | 19 |
| 10 | [Website asset suite](#10-web) | applied | 19 | 0 | 1 | 18 |
| 11 | [Social media asset suite](#11-soc) | applied | 37 | 1 | 0 | 36 |
| 12 | [Campaign & advertising assets](#12-cmp) | applied | 16 | 0 | 0 | 16 |
| 13 | [Sales & business development](#13-sal) | applied | 16 | 1 | 2 | 13 |
| 14 | [Editorial & publishing assets](#14-edt) | applied | 15 | 0 | 0 | 15 |
| 15 | [Physical brand & environmental assets](#15-phy) | applied | 22 | 0 | 0 | 22 |
| 16 | [Motion & sensory identity](#16-mot) | creative | 11 | 0 | 0 | 11 |
| 17 | [Brand presentation deliverables](#17-prs) | applied | 14 | 0 | 0 | 14 |

<a id="1-fnd"></a>
## 01. Brand foundations `FND`

*Layer 1 · Brand foundations* — The intellectual and creative inputs that inform everything produced downstream.

| | Code | Asset | Purpose | Variants | Formats | Depends on | App |
|---|---|---|---|---|---|---|---|
| [ ] | FND-001 | Brand brief ★ | Central source of brand direction |  | MD, PDF |  | ⬜ Planned |
| [ ] | FND-002 | Brand origin story | History and reason for existing |  | MD, PDF |  | ⬜ Planned |
| [ ] | FND-003 | Mission and vision ★ | Purpose and ambition |  | MD, PDF |  | ⬜ Planned |
| [ ] | FND-004 | Brand values | Operating principles |  | MD, PDF |  | ⬜ Planned |
| [x] | FND-005 | Positioning statement ★ | Place in the market |  | MD, PDF |  | ✅ Generates<br><sub>`kit.coreMessaging.positioningStatement`</sub> |
| [ ] | FND-006 | Brand personality | Character and temperament |  | MD, PDF |  | ⬜ Planned |
| [ ] | FND-007 | Brand archetypes | Narrative roles |  | MD, PDF |  | ⬜ Planned |
| [ ] | FND-008 | Audience profiles ★ | Who the brand serves |  | MD, PDF |  | ⬜ Planned |
| [ ] | FND-009 | Cultural context | Geography, history, community |  | MD, PDF |  | ⬜ Planned |
| [ ] | FND-010 | Brand narrative | Overarching story |  | MD, PDF |  | ⬜ Planned |
| [ ] | FND-011 | Messaging hierarchy ★ | Primary and supporting messages |  | MD, PDF |  | 🟡 Partial<br><sub>`kit.headline, subheadline, valueProposition, big3, coreMessaging.oneLiner / elevatorPitch`</sub> |
| [ ] | FND-012 | Voice and tone guide ★ | Communication rules |  | MD, PDF |  | ⬜ Planned |
| [x] | FND-013 | Tagline library ★ | Permanent and situational taglines |  | MD, PDF |  | ✅ Generates<br><sub>`kit.coreMessaging.taglineOptions`</sub> |
| [ ] | FND-014 | Creative manifesto | Creative philosophy |  | MD, PDF |  | ⬜ Planned |
| [ ] | FND-015 | Brand boundaries | What the brand will and won’t do |  | MD, PDF |  | ⬜ Planned |

<a id="2-res"></a>
## 02. Creative research & art direction `RES`

*Layer 1 · Brand foundations* — Extracting visual meaning from the physical and cultural environment and translating it into an identity.

Category depends on: Brand foundations

| | Code | Asset | Purpose | Variants | Formats | Depends on | App |
|---|---|---|---|---|---|---|---|
| [ ] | RES-001 | Master moodboard ★ | Overall visual direction |  | PDF, FIGMA |  | ⬜ Planned |
| [ ] | RES-002 | Cultural reference board | Cultural signals and influences |  | PDF, FIGMA |  | ⬜ Planned |
| [ ] | RES-003 | Geographic reference board | Place-based visual cues |  | PDF, FIGMA |  | ⬜ Planned |
| [ ] | RES-004 | Historical and period references | Eras and period aesthetics |  | PDF, FIGMA |  | ⬜ Planned |
| [ ] | RES-005 | Architectural references | Built-environment cues |  | PDF, FIGMA |  | ⬜ Planned |
| [ ] | RES-006 | Environmental photography | Captured context from the field |  | PDF, FIGMA |  | ⬜ Planned |
| [ ] | RES-007 | Typography inspiration board | Lettering and type found in the world |  | PDF, FIGMA |  | ⬜ Planned |
| [ ] | RES-008 | Color inspiration board | Color sourced from references |  | PDF, FIGMA |  | ⬜ Planned |
| [ ] | RES-009 | Material and texture board | Surfaces, materials, finishes |  | PDF, FIGMA |  | ⬜ Planned |
| [ ] | RES-010 | Illustration inspiration board | Illustration styles and precedents |  | PDF, FIGMA |  | ⬜ Planned |
| [ ] | RES-011 | Composition references | Framing and arrangement precedents |  | PDF, FIGMA |  | ⬜ Planned |
| [ ] | RES-012 | Editorial layout references | Publication layout precedents |  | PDF, FIGMA |  | ⬜ Planned |
| [ ] | RES-013 | Cinematography references | Moving-image precedents |  | PDF, FIGMA |  | ⬜ Planned |
| [ ] | RES-014 | Motion references | Movement and animation precedents |  | PDF, FIGMA |  | ⬜ Planned |
| [ ] | RES-015 | Competitor visual landscape | How the category currently looks |  | PDF, FIGMA |  | ⬜ Planned |
| [ ] | RES-016 | Creative direction statement ★ | Synthesized direction drawn from the research |  | PDF, FIGMA |  | ⬜ Planned |
| [ ] | RES-017 | Reference annotations | Why each reference matters — the provenance trail |  | MD, JSON |  | ⬜ Planned |

<a id="3-idn"></a>
## 03. Logo & identity suite `IDN`

*Layer 2 · Reusable creative assets* — Every applicable mark ships in light, dark, monochrome, reversed, vector and transparent raster versions.

Category depends on: Brand foundations, Creative research & art direction

| | Code | Asset | Purpose | Variants | Formats | Depends on | App |
|---|---|---|---|---|---|---|---|
| [ ] | IDN-001 | Primary logo ★ | Full brand identity | light, dark, monochrome, reversed | SVG, PDF, PNG |  | ⬜ Planned |
| [ ] | IDN-002 | Secondary logo | Alternative composition | light, dark, monochrome, reversed | SVG, PDF, PNG |  | ⬜ Planned |
| [ ] | IDN-003 | Horizontal lockup ★ | Wide placements | light, dark, monochrome, reversed | SVG, PDF, PNG |  | ⬜ Planned |
| [ ] | IDN-004 | Stacked lockup | Vertical placements | light, dark, monochrome, reversed | SVG, PDF, PNG |  | ⬜ Planned |
| [ ] | IDN-005 | Wordmark ★ | Typography-only | light, dark, monochrome, reversed | SVG, PDF, PNG | TYP-001 | ⬜ Planned |
| [ ] | IDN-006 | Lettermark | Initials | light, dark, monochrome, reversed | SVG, PDF, PNG |  | ⬜ Planned |
| [ ] | IDN-007 | Monogram | Combined letterforms | light, dark, monochrome, reversed | SVG, PDF, PNG |  | ⬜ Planned |
| [ ] | IDN-008 | Brand symbol | Standalone graphic | light, dark, monochrome, reversed | SVG, PDF, PNG |  | ⬜ Planned |
| [ ] | IDN-009 | Submarks | Supporting identities | light, dark, monochrome, reversed | SVG, PDF, PNG |  | ⬜ Planned |
| [ ] | IDN-010 | Brand seal | Official applications | light, dark, monochrome, reversed | SVG, PDF, PNG |  | ⬜ Planned |
| [ ] | IDN-011 | Badges | Campaigns and merchandise | light, dark, monochrome, reversed | SVG, PDF, PNG |  | ⬜ Planned |
| [ ] | IDN-012 | Maker’s mark | Product attribution | light, dark, monochrome, reversed | SVG, PDF, PNG |  | ⬜ Planned |
| [ ] | IDN-013 | Parent-company lockup | Blue Dot relationship | light, dark, monochrome, reversed | SVG, PDF, PNG |  | ⬜ Planned |
| [ ] | IDN-014 | Favicon ★ | Browser identity | light, dark, monochrome, reversed | SVG, ICO, PNG |  | ⬜ Planned |
| [ ] | IDN-015 | App icon | Digital products | light, dark, monochrome, reversed | SVG, PNG |  | ⬜ Planned |
| [ ] | IDN-016 | Social avatar ★ | Platform identity | light, dark, monochrome, reversed | PNG |  | ⬜ Planned |
| [ ] | IDN-017 | Animated logo | Motion applications | light, dark, monochrome, reversed | MP4, LOTTIE, GIF | IDN-001 | ⬜ Planned |

<a id="4-clr"></a>
## 04. Color system `CLR`

*Layer 2 · Reusable creative assets* — Palettes, pairing and proportion rules, accessibility, and implementation tokens.

Category depends on: Creative research & art direction

| | Code | Asset | Purpose | Variants | Formats | Depends on | App |
|---|---|---|---|---|---|---|---|
| [ ] | CLR-001 | Primary palette ★ | Permanent identity |  | PDF, JSON |  | ⬜ Planned |
| [ ] | CLR-002 | Secondary palette | Supporting colors |  | PDF, JSON |  | ⬜ Planned |
| [ ] | CLR-003 | Accent palette | Intentional color pops |  | PDF, JSON |  | ⬜ Planned |
| [ ] | CLR-004 | Neutral palette ★ | Backgrounds and typography |  | PDF, JSON |  | ⬜ Planned |
| [ ] | CLR-005 | Campaign palettes | Temporary creative direction |  | PDF, JSON |  | ⬜ Planned |
| [ ] | CLR-006 | Semantic colors | Success, warning, error, information |  | PDF, JSON |  | ⬜ Planned |
| [ ] | CLR-007 | Color pairing matrix | Approved combinations |  | PDF, JSON |  | ⬜ Planned |
| [ ] | CLR-008 | Color proportion rules | How much color to use |  | PDF, JSON |  | ⬜ Planned |
| [ ] | CLR-009 | Accessibility matrix | Contrast requirements |  | PDF, JSON | CLR-007 | ⬜ Planned |
| [ ] | CLR-010 | Color tokens ★ | Implementation in software |  | JSON, CSS |  | ⬜ Planned |
| [ ] | CLR-011 | Print specifications | CMYK and spot colors where needed |  | PDF |  | ⬜ Planned |

<a id="5-typ"></a>
## 05. Typography system `TYP`

*Layer 2 · Reusable creative assets* — Typefaces, hierarchy, typesetting rules, licensing and implementation tokens.

Category depends on: Creative research & art direction

| | Code | Asset | Purpose | Variants | Formats | Depends on | App |
|---|---|---|---|---|---|---|---|
| [ ] | TYP-001 | Primary display typeface ★ | Brand headlines |  | PDF |  | ⬜ Planned |
| [ ] | TYP-002 | Secondary display typeface | Alternative editorial expression |  | PDF |  | ⬜ Planned |
| [ ] | TYP-003 | Body typeface ★ | Long-form readability |  | PDF |  | ⬜ Planned |
| [ ] | TYP-004 | Utility typeface | Labels and navigation |  | PDF |  | ⬜ Planned |
| [ ] | TYP-005 | Monospace typeface | Technical and operational content |  | PDF |  | ⬜ Planned |
| [ ] | TYP-006 | Script typeface | Human and nostalgic accents |  | PDF |  | ⬜ Planned |
| [ ] | TYP-007 | Specialty typefaces | Campaign personality |  | PDF |  | ⬜ Planned |
| [ ] | TYP-008 | Type scale ★ | Consistent hierarchy |  | PDF |  | ⬜ Planned |
| [ ] | TYP-009 | Typesetting rules | Tracking, leading, alignment |  | PDF |  | ⬜ Planned |
| [ ] | TYP-010 | Typography pairings | Approved combinations |  | PDF |  | ⬜ Planned |
| [ ] | TYP-011 | Typographic compositions | Reusable headline treatments |  | FIGMA, SVG |  | ⬜ Planned |
| [ ] | TYP-012 | Font licensing registry ★ | Usage rights |  | MD, JSON |  | ⬜ Planned |
| [ ] | TYP-013 | Responsive typography tokens | Digital implementation |  | JSON, CSS |  | ⬜ Planned |

<a id="6-gfx"></a>
## 06. Graphic language & visual motifs `GFX`

*Layer 2 · Reusable creative assets* — Icons, illustration, motifs, patterns, textures and the brand’s graphic vocabulary.

Category depends on: Creative research & art direction, Color system

| | Code | Asset | Purpose | Variants | Formats | Depends on | App |
|---|---|---|---|---|---|---|---|
| [ ] | GFX-001 | Custom icon library | Services, objects, actions |  | SVG, PNG |  | ⬜ Planned |
| [ ] | GFX-002 | Brand illustrations | Signature illustration style |  | SVG, PNG |  | ⬜ Planned |
| [ ] | GFX-003 | Mascots | Recurring brand characters |  | SVG, PNG |  | ⬜ Planned |
| [ ] | GFX-004 | Decorative motifs | Stars, flowers, geometric forms |  | SVG, PNG |  | ⬜ Planned |
| [ ] | GFX-005 | Directional elements | Arrows, pointers, wayfinding |  | SVG, PNG |  | ⬜ Planned |
| [ ] | GFX-006 | Dividers | Editorial section treatments |  | SVG, PNG |  | ⬜ Planned |
| [ ] | GFX-007 | Frames and borders | Photography and content |  | SVG, PNG |  | ⬜ Planned |
| [ ] | GFX-008 | Repeating patterns | Stripes, grids, custom repeats |  | SVG, PNG |  | ⬜ Planned |
| [ ] | GFX-009 | Textures | Paper, grain, canvas, halftone |  | PNG, JPG |  | ⬜ Planned |
| [ ] | GFX-010 | Stamps | Approval and maker’s marks |  | SVG, PNG |  | ⬜ Planned |
| [ ] | GFX-011 | Stickers | Playful graphic elements |  | SVG, PNG |  | ⬜ Planned |
| [ ] | GFX-012 | Labels | Categories and collections |  | SVG, PNG |  | ⬜ Planned |
| [ ] | GFX-013 | Background graphics | Digital and print compositions |  | SVG, PNG |  | ⬜ Planned |
| [ ] | GFX-014 | Diagram language | Explaining technical concepts |  | SVG, PNG |  | ⬜ Planned |
| [ ] | GFX-015 | Data visualization style | Charts and quantitative stories |  | SVG, PNG | CLR-006 | ⬜ Planned |
| [ ] | GFX-016 | Handwritten elements | Notes and annotations |  | SVG, PNG |  | ⬜ Planned |

<a id="7-pho"></a>
## 07. Photography & image library `PHO`

*Layer 2 · Reusable creative assets* — Imagery categorized by subject and narrative purpose, plus the rules for producing it.

Category depends on: Creative research & art direction

**Collections**

| | Code | Asset | Purpose | Variants | Formats | Depends on | App |
|---|---|---|---|---|---|---|---|
| [ ] | PHO-001 | People | Founders, employees, customers |  | JPG, WEBP |  | ⬜ Planned |
| [ ] | PHO-002 | Portraits | Individual human stories |  | JPG, WEBP |  | ⬜ Planned |
| [ ] | PHO-003 | Place | Cities, neighborhoods, landscapes |  | JPG, WEBP |  | ⬜ Planned |
| [ ] | PHO-004 | Architecture | Buildings and physical environments |  | JPG, WEBP |  | ⬜ Planned |
| [ ] | PHO-005 | Work | People performing their craft |  | JPG, WEBP |  | ⬜ Planned |
| [ ] | PHO-006 | Objects | Tools, equipment, everyday items |  | JPG, WEBP |  | ⬜ Planned |
| [ ] | PHO-007 | Details | Materials, textures, small observations |  | JPG, WEBP |  | ⬜ Planned |
| [ ] | PHO-008 | Lifestyle | Life surrounding the business |  | JPG, WEBP |  | ⬜ Planned |
| [ ] | PHO-009 | Product | Software and physical products |  | JPG, WEBP |  | ⬜ Planned |
| [ ] | PHO-010 | Process | How something gets done |  | JPG, WEBP |  | ⬜ Planned |
| [ ] | PHO-011 | Historical | Archival imagery |  | JPG, WEBP |  | ⬜ Planned |
| [ ] | PHO-012 | Transformation | Before and after |  | JPG, WEBP |  | ⬜ Planned |
| [ ] | PHO-013 | Atmosphere | Light, weather, environmental mood |  | JPG, WEBP |  | ⬜ Planned |
| [ ] | PHO-014 | Abstract | Conceptual storytelling |  | JPG, WEBP |  | ⬜ Planned |
| [ ] | PHO-015 | Backgrounds | Images suitable for text overlays |  | JPG, WEBP |  | ⬜ Planned |

**Supporting assets**

| | Code | Asset | Purpose | Variants | Formats | Depends on | App |
|---|---|---|---|---|---|---|---|
| [ ] | PHO-016 | Photography shot lists | What to capture, by story need |  | MD, PDF |  | ⬜ Planned |
| [ ] | PHO-017 | Lighting guidelines | Light quality and setup |  | PDF |  | ⬜ Planned |
| [ ] | PHO-018 | Crop rules | Framing and aspect ratios |  | PDF |  | ⬜ Planned |
| [ ] | PHO-019 | Color grading presets | Consistent image color |  | JSON |  | ⬜ Planned |
| [ ] | PHO-020 | Retouching rules | What may and may not be altered |  | PDF |  | ⬜ Planned |
| [ ] | PHO-021 | Image rights registry | Licensing and releases |  | JSON, MD |  | ⬜ Planned |
| [ ] | PHO-022 | Attribution rules | Crediting photographers and sources |  | MD |  | ⬜ Planned |
| [ ] | PHO-023 | AI-generated image guidelines | When and how generated imagery is allowed |  | MD |  | ⬜ Planned |

<a id="8-lay"></a>
## 08. Composition & layout system `LAY`

*Layer 2 · Reusable creative assets* — Grids, compositions, spacing and reusable layout recipes.

Category depends on: Typography system, Color system

| | Code | Asset | Purpose | Variants | Formats | Depends on | App |
|---|---|---|---|---|---|---|---|
| [ ] | LAY-001 | Master layout grid ★ | Compositional foundation |  | FIGMA, PDF |  | ⬜ Planned |
| [ ] | LAY-002 | Editorial grid | Articles and publications |  | FIGMA, PDF |  | ⬜ Planned |
| [ ] | LAY-003 | Poster grid | Campaign graphics |  | FIGMA, PDF |  | ⬜ Planned |
| [ ] | LAY-004 | Social grid ★ | Platform-specific compositions |  | FIGMA, PDF |  | ⬜ Planned |
| [ ] | LAY-005 | Website grid | Responsive page structure |  | FIGMA, PDF |  | ⬜ Planned |
| [ ] | LAY-006 | Photography compositions | Image placement and cropping |  | FIGMA, PDF |  | ⬜ Planned |
| [ ] | LAY-007 | Image and text compositions | Narrative layouts |  | FIGMA, PDF |  | ⬜ Planned |
| [ ] | LAY-008 | Full-bleed compositions | Immersive imagery |  | FIGMA, PDF |  | ⬜ Planned |
| [ ] | LAY-009 | Typography-only compositions | Statement graphics |  | FIGMA, PDF |  | ⬜ Planned |
| [ ] | LAY-010 | Collage compositions | Visual storytelling |  | FIGMA, PDF |  | ⬜ Planned |
| [ ] | LAY-011 | Split-screen compositions | Comparisons |  | FIGMA, PDF |  | ⬜ Planned |
| [ ] | LAY-012 | Sequential compositions | Carousels and narratives |  | FIGMA, PDF |  | ⬜ Planned |
| [ ] | LAY-013 | Spacing system | Visual rhythm |  | FIGMA, PDF |  | ⬜ Planned |
| [ ] | LAY-014 | Alignment rules | Consistency |  | FIGMA, PDF |  | ⬜ Planned |
| [ ] | LAY-015 | Layout recipes | Approved reusable arrangements |  | FIGMA, PDF |  | ⬜ Planned |

<a id="9-dsn"></a>
## 09. Digital design system `DSN`

*Layer 2 · Reusable creative assets* — The functional expression of the brand across websites, applications and digital experiences.

Category depends on: Color system, Typography system, Composition & layout system

| | Code | Asset | Purpose | Variants | Formats | Depends on | App |
|---|---|---|---|---|---|---|---|
| [ ] | DSN-001 | Design tokens ★ | Color, typography, spacing, radius |  | FIGMA, JSON, CSS | CLR-010, TYP-013, LAY-013 | ⬜ Planned |
| [ ] | DSN-002 | Buttons | Primary, secondary, text |  | FIGMA, JSON, CSS |  | ⬜ Planned |
| [ ] | DSN-003 | Links | Navigation and editorial |  | FIGMA, JSON, CSS |  | ⬜ Planned |
| [ ] | DSN-004 | Navigation | Headers, menus, breadcrumbs |  | FIGMA, JSON, CSS |  | ⬜ Planned |
| [ ] | DSN-005 | Cards | Products, services, stories |  | FIGMA, JSON, CSS |  | ⬜ Planned |
| [ ] | DSN-006 | Forms | Inputs, selections, submissions |  | FIGMA, JSON, CSS |  | ⬜ Planned |
| [ ] | DSN-007 | Status indicators | Feedback and system states |  | FIGMA, JSON, CSS |  | ⬜ Planned |
| [ ] | DSN-008 | Accordions | Expandable information |  | FIGMA, JSON, CSS |  | ⬜ Planned |
| [ ] | DSN-009 | Tabs | Content organization |  | FIGMA, JSON, CSS |  | ⬜ Planned |
| [ ] | DSN-010 | Modals | Focused interactions |  | FIGMA, JSON, CSS |  | ⬜ Planned |
| [ ] | DSN-011 | Tables | Structured information |  | FIGMA, JSON, CSS |  | ⬜ Planned |
| [ ] | DSN-012 | Empty states | First-use experiences |  | FIGMA, JSON, CSS |  | ⬜ Planned |
| [ ] | DSN-013 | Loading states | Waiting experiences |  | FIGMA, JSON, CSS |  | ⬜ Planned |
| [ ] | DSN-014 | Error states | Recovery experiences |  | FIGMA, JSON, CSS |  | ⬜ Planned |
| [ ] | DSN-015 | Notifications | System communication |  | FIGMA, JSON, CSS |  | ⬜ Planned |
| [ ] | DSN-016 | Footers | Navigation and attribution |  | FIGMA, JSON, CSS |  | ⬜ Planned |
| [ ] | DSN-017 | Motion tokens | Duration, easing, transitions |  | JSON, CSS |  | ⬜ Planned |
| [ ] | DSN-018 | Responsive rules | Mobile, tablet, desktop |  | FIGMA, JSON, CSS |  | ⬜ Planned |
| [ ] | DSN-019 | Accessibility rules | Inclusive interaction |  | FIGMA, JSON, CSS | CLR-009 | ⬜ Planned |

<a id="10-web"></a>
## 10. Website asset suite `WEB`

*Layer 3 · Applied marketing deliverables* — Pages, templates and web-specific imagery.

Category depends on: Brand foundations, Digital design system, Photography & image library

| | Code | Asset | Purpose | Variants | Formats | Depends on | App |
|---|---|---|---|---|---|---|---|
| [ ] | WEB-001 | Homepage ★ | Desktop and mobile | desktop, mobile | FIGMA, HTML |  | 🟡 Partial<br><sub>`kit.headline / subheadline (copy only)`</sub> |
| [ ] | WEB-002 | About page | Brand story | desktop, mobile | FIGMA, HTML | FND-002 | ⬜ Planned |
| [ ] | WEB-003 | Services overview | Offering discovery | desktop, mobile | FIGMA, HTML |  | ⬜ Planned |
| [ ] | WEB-004 | Service detail pages | Individual offerings | desktop, mobile | FIGMA, HTML |  | ⬜ Planned |
| [ ] | WEB-005 | Product pages | Product information | desktop, mobile | FIGMA, HTML |  | ⬜ Planned |
| [ ] | WEB-006 | Industry pages | Audience-specific offerings | desktop, mobile | FIGMA, HTML | FND-008 | ⬜ Planned |
| [ ] | WEB-007 | Case study template | Evidence of completed work | desktop, mobile | FIGMA, HTML |  | ⬜ Planned |
| [ ] | WEB-008 | Portfolio template | Work showcase | desktop, mobile | FIGMA, HTML |  | ⬜ Planned |
| [ ] | WEB-009 | Editorial article template | Long-form content | desktop, mobile | FIGMA, HTML |  | ⬜ Planned |
| [ ] | WEB-010 | Resource library | Educational content | desktop, mobile | FIGMA, HTML |  | ⬜ Planned |
| [ ] | WEB-011 | Campaign landing page | Focused conversion | desktop, mobile | FIGMA, HTML |  | ⬜ Planned |
| [ ] | WEB-012 | Contact page ★ | Inquiry | desktop, mobile | FIGMA, HTML |  | ⬜ Planned |
| [ ] | WEB-013 | Booking experience | Consultation scheduling | desktop, mobile | FIGMA, HTML |  | ⬜ Planned |
| [ ] | WEB-014 | FAQ page | Common questions | desktop, mobile | FIGMA, HTML |  | ⬜ Planned |
| [ ] | WEB-015 | 404 page | Branded recovery | desktop, mobile | FIGMA, HTML |  | ⬜ Planned |
| [ ] | WEB-016 | Coming soon page | Prelaunch | desktop, mobile | FIGMA, HTML |  | ⬜ Planned |
| [ ] | WEB-017 | Open Graph images ★ | Link previews | 16:9 | PNG, JPG |  | ⬜ Planned |
| [ ] | WEB-018 | Website hero library | Reusable campaign headers | desktop, mobile | JPG, WEBP |  | ⬜ Planned |
| [ ] | WEB-019 | Website animation assets | Transitions and storytelling | desktop, mobile | LOTTIE, MP4 |  | ⬜ Planned |

<a id="11-soc"></a>
## 11. Social media asset suite `SOC`

*Layer 3 · Applied marketing deliverables* — Profile assets, recurring editorial formats, video assets and platform variations.

Category depends on: Brand foundations, Logo & identity suite, Composition & layout system

**Profile assets**

| | Code | Asset | Purpose | Variants | Formats | Depends on | App |
|---|---|---|---|---|---|---|---|
| [ ] | SOC-001 | Profile images ★ | Platform identity |  | PNG, MP4 | IDN-016 | ⬜ Planned |
| [ ] | SOC-002 | Platform banners ★ | Profile headers |  | PNG, MP4 |  | ⬜ Planned |
| [ ] | SOC-003 | Highlight covers | Story highlights |  | PNG, MP4 |  | ⬜ Planned |
| [ ] | SOC-004 | Pinned post graphics | First impression posts |  | PNG, MP4 |  | ⬜ Planned |
| [x] | SOC-037 | Profile bio | Platform bio copy |  | MD |  | ✅ Generates<br><sub>`kit.tacticalAssets.socialMediaBio`</sub> |

**Recurring editorial formats**

| | Code | Asset | Purpose | Variants | Formats | Depends on | App |
|---|---|---|---|---|---|---|---|
| [ ] | SOC-005 | Brand statement posts | What we stand for |  | PNG, MP4 |  | ⬜ Planned |
| [ ] | SOC-006 | Educational posts | Teaching content |  | PNG, MP4 |  | ⬜ Planned |
| [ ] | SOC-007 | Quote cards | Shareable quotes |  | PNG, MP4 |  | ⬜ Planned |
| [ ] | SOC-008 | Data and statistics posts | Quantitative stories |  | PNG, MP4 | GFX-015 | ⬜ Planned |
| [ ] | SOC-009 | Industry commentary | Point of view on the market |  | PNG, MP4 |  | ⬜ Planned |
| [ ] | SOC-010 | Founder observations | Founder voice |  | PNG, MP4 |  | ⬜ Planned |
| [ ] | SOC-011 | Customer stories | Customer voice |  | PNG, MP4 |  | ⬜ Planned |
| [ ] | SOC-012 | Product showcases | Product features |  | PNG, MP4 |  | ⬜ Planned |
| [ ] | SOC-013 | Before-and-after posts | Transformation |  | PNG, MP4 |  | ⬜ Planned |
| [ ] | SOC-014 | Behind-the-scenes posts | Process and people |  | PNG, MP4 |  | ⬜ Planned |
| [ ] | SOC-015 | Announcements | News |  | PNG, MP4 |  | ⬜ Planned |
| [ ] | SOC-016 | Event promotions | Workshops and gatherings |  | PNG, MP4 |  | ⬜ Planned |
| [ ] | SOC-017 | Testimonial graphics | Social proof |  | PNG, MP4 |  | ⬜ Planned |
| [ ] | SOC-018 | Case study carousels | Evidence in sequence |  | PNG, MP4 |  | ⬜ Planned |
| [ ] | SOC-019 | Editorial carousels | Narratives in sequence |  | PNG, MP4 |  | ⬜ Planned |
| [ ] | SOC-020 | Public service announcements | Community information |  | PNG, MP4 |  | ⬜ Planned |

**Video assets**

| | Code | Asset | Purpose | Variants | Formats | Depends on | App |
|---|---|---|---|---|---|---|---|
| [ ] | SOC-021 | Reel covers | Short-form video covers |  | PNG |  | ⬜ Planned |
| [ ] | SOC-022 | Video thumbnails | Long-form video covers |  | PNG, JPG |  | ⬜ Planned |
| [ ] | SOC-023 | Opening title cards | Video intros |  | MP4 |  | ⬜ Planned |
| [ ] | SOC-024 | Closing title cards | Video outros |  | MP4 |  | ⬜ Planned |
| [ ] | SOC-025 | Lower thirds | Name and title overlays |  | MP4, PNG |  | ⬜ Planned |
| [ ] | SOC-026 | Subtitle treatments | Caption styling |  | PNG, MP4 |  | ⬜ Planned |
| [ ] | SOC-027 | Chapter markers | Video navigation |  | PNG, MP4 |  | ⬜ Planned |
| [ ] | SOC-028 | Branded transitions | Scene changes |  | MP4 |  | ⬜ Planned |
| [ ] | SOC-029 | Watermarks | Attribution on video |  | PNG |  | ⬜ Planned |
| [ ] | SOC-030 | End screens | Calls to action |  | MP4, PNG |  | ⬜ Planned |

**Platform variations**

| | Code | Asset | Purpose | Variants | Formats | Depends on | App |
|---|---|---|---|---|---|---|---|
| [ ] | SOC-031 | Square posts · 1:1 | Feed format | 1:1 | PNG, MP4 |  | ⬜ Planned |
| [ ] | SOC-032 | Portrait posts · 4:5 | Feed format | 4:5 | PNG, MP4 |  | ⬜ Planned |
| [ ] | SOC-033 | Stories and vertical video · 9:16 | Vertical format | 9:16 | PNG, MP4 |  | ⬜ Planned |
| [ ] | SOC-034 | Landscape posts · 16:9 | Wide format | 16:9 | PNG, MP4 |  | ⬜ Planned |
| [ ] | SOC-035 | LinkedIn document carousels | Document posts |  | PDF |  | ⬜ Planned |
| [ ] | SOC-036 | Platform-specific safe zones | UI-overlay-safe areas |  | FIGMA, PNG |  | ⬜ Planned |

<a id="12-cmp"></a>
## 12. Campaign & advertising assets `CMP`

*Layer 3 · Applied marketing deliverables* — Campaign identity and paid, owned and outdoor placements.

Category depends on: Brand foundations, Logo & identity suite, Composition & layout system

| | Code | Asset | Purpose | Variants | Formats | Depends on | App |
|---|---|---|---|---|---|---|---|
| [ ] | CMP-001 | Campaign key visual | Central campaign artwork |  | PDF, PNG |  | ⬜ Planned |
| [ ] | CMP-002 | Campaign identity | Temporary visual language |  | PDF, PNG |  | ⬜ Planned |
| [ ] | CMP-003 | Campaign wordmark | Named initiative |  | SVG, PNG |  | ⬜ Planned |
| [ ] | CMP-004 | Campaign poster | Primary promotional piece |  | PDF, PNG |  | ⬜ Planned |
| [ ] | CMP-005 | Digital advertisements | Paid placements |  | PDF, PNG |  | ⬜ Planned |
| [ ] | CMP-006 | Display advertisements | Banner formats |  | PDF, PNG |  | ⬜ Planned |
| [ ] | CMP-007 | Promotional graphics | Offers and announcements |  | PDF, PNG |  | ⬜ Planned |
| [ ] | CMP-008 | Launch assets | New products and services |  | PDF, PNG |  | ⬜ Planned |
| [ ] | CMP-009 | Seasonal assets | Holidays and cultural moments |  | PDF, PNG |  | ⬜ Planned |
| [ ] | CMP-010 | Event campaign suite | Workshops and gatherings |  | PDF, PNG |  | ⬜ Planned |
| [ ] | CMP-011 | Billboard artwork | Outdoor advertising |  | PDF, PNG |  | ⬜ Planned |
| [ ] | CMP-012 | Print advertisements | Publications |  | PDF, PNG |  | ⬜ Planned |
| [ ] | CMP-013 | Direct mail artwork | Local outreach |  | PDF, PNG |  | ⬜ Planned |
| [ ] | CMP-014 | Campaign landing page | Conversion |  | FIGMA, HTML | WEB-011 | ⬜ Planned |
| [ ] | CMP-015 | Campaign email suite | Distribution |  | HTML |  | ⬜ Planned |
| [ ] | CMP-016 | Campaign motion graphics | Video and animation |  | MP4 |  | ⬜ Planned |

<a id="13-sal"></a>
## 13. Sales & business development `SAL`

*Layer 3 · Applied marketing deliverables* — Decks, one-pagers, proposals and enablement kits.

Category depends on: Brand foundations, Composition & layout system

| | Code | Asset | Purpose | Variants | Formats | Depends on | App |
|---|---|---|---|---|---|---|---|
| [ ] | SAL-001 | Company overview ★ | Introduction |  | PDF, PPTX |  | 🟡 Partial<br><sub>`kit.coreMessaging.elevatorPitch (copy only)`</sub> |
| [ ] | SAL-002 | Capabilities deck | What we can do |  | PDF, PPTX |  | ⬜ Planned |
| [ ] | SAL-003 | Pitch deck | Business opportunities |  | PDF, PPTX |  | ⬜ Planned |
| [ ] | SAL-004 | Service one-pagers ★ | Individual offerings |  | PDF, PPTX |  | ⬜ Planned |
| [ ] | SAL-005 | Product one-pagers | Individual products |  | PDF, PPTX |  | ⬜ Planned |
| [ ] | SAL-006 | Case study sheets | Results and evidence |  | PDF, PPTX |  | ⬜ Planned |
| [ ] | SAL-007 | Proposal template | Prospective clients |  | PDF, PPTX |  | ⬜ Planned |
| [ ] | SAL-008 | Pricing guide | Commercial information |  | PDF, PPTX |  | ⬜ Planned |
| [ ] | SAL-009 | Demo presentation | Product walkthrough |  | PDF, PPTX |  | ⬜ Planned |
| [ ] | SAL-010 | ROI visualization | Business impact |  | PDF, PPTX |  | ⬜ Planned |
| [ ] | SAL-011 | Client onboarding guide | Beginning an engagement |  | PDF, PPTX |  | ⬜ Planned |
| [ ] | SAL-012 | Workshop materials | Education and enablement |  | PDF, PPTX |  | ⬜ Planned |
| [ ] | SAL-013 | Partnership kit | Collaborators |  | PDF, PPTX |  | ⬜ Planned |
| [ ] | SAL-014 | Referral kit | Word-of-mouth marketing |  | PDF, PPTX |  | ⬜ Planned |
| [ ] | SAL-015 | Media kit | Press and publicity |  | PDF, PPTX |  | 🟡 Partial<br><sub>`kit.tacticalAssets.pressRelease (press release only)`</sub> |
| [x] | SAL-016 | Podcast guest pitch | Show matches and outreach emails |  | MD |  | ✅ Generates<br><sub>`kit.podcastMatches, kit.podcastOutreach`</sub> |

<a id="14-edt"></a>
## 14. Editorial & publishing assets `EDT`

*Layer 3 · Applied marketing deliverables* — Named publications, templates and treatments for public commentary and storytelling.

Category depends on: Brand foundations, Typography system, Composition & layout system

| | Code | Asset | Purpose | Variants | Formats | Depends on | App |
|---|---|---|---|---|---|---|---|
| [ ] | EDT-001 | Publication masthead | Named editorial series |  | SVG, PNG |  | ⬜ Planned |
| [ ] | EDT-002 | Issue cover | Recurring publication |  | FIGMA, PNG, HTML |  | ⬜ Planned |
| [ ] | EDT-003 | Article header | Written content |  | FIGMA, PNG, HTML |  | ⬜ Planned |
| [ ] | EDT-004 | Editorial illustrations | Conceptual storytelling |  | FIGMA, PNG, HTML |  | ⬜ Planned |
| [ ] | EDT-005 | Pull quote treatments | Emphasis |  | FIGMA, PNG, HTML |  | ⬜ Planned |
| [ ] | EDT-006 | Research report template | Findings |  | FIGMA, PDF |  | ⬜ Planned |
| [ ] | EDT-007 | Field notes template | Observations |  | FIGMA, PNG, HTML |  | ⬜ Planned |
| [ ] | EDT-008 | Interview format | Conversations |  | FIGMA, PNG, HTML |  | ⬜ Planned |
| [ ] | EDT-009 | Photo essay template | Visual narratives |  | FIGMA, PNG, HTML |  | ⬜ Planned |
| [ ] | EDT-010 | Newsletter template | Recurring distribution |  | HTML |  | ⬜ Planned |
| [ ] | EDT-011 | Podcast artwork | Audio content | 1:1 | PNG, JPG |  | ⬜ Planned |
| [ ] | EDT-012 | Episode artwork | Recurring series | 1:1 | PNG, JPG |  | ⬜ Planned |
| [ ] | EDT-013 | Credits and attribution | Contributors |  | FIGMA, PNG, HTML |  | ⬜ Planned |
| [ ] | EDT-014 | Source and citation treatments | Evidence |  | FIGMA, PNG, HTML |  | ⬜ Planned |
| [ ] | EDT-015 | Author profile | Individual voices |  | FIGMA, PNG, HTML |  | ⬜ Planned |

<a id="15-phy"></a>
## 15. Physical brand & environmental assets `PHY`

*Layer 3 · Applied marketing deliverables* — Stationery, merchandise, packaging, signage and environmental identity — the brand beyond the screen.

Category depends on: Logo & identity suite, Color system, Graphic language & visual motifs

| | Code | Asset | Purpose | Variants | Formats | Depends on | App |
|---|---|---|---|---|---|---|---|
| [ ] | PHY-001 | Business cards ★ | Personal introductions |  | PDF, SVG | CLR-011 | ⬜ Planned |
| [ ] | PHY-002 | Letterhead | Correspondence |  | PDF, SVG |  | ⬜ Planned |
| [ ] | PHY-003 | Envelopes | Mail |  | PDF, SVG |  | ⬜ Planned |
| [ ] | PHY-004 | Notecards | Personal communication |  | PDF, SVG |  | ⬜ Planned |
| [ ] | PHY-005 | Postcards | Campaigns and local outreach |  | PDF, SVG |  | ⬜ Planned |
| [ ] | PHY-006 | Stickers | Brand recognition |  | PDF, SVG |  | ⬜ Planned |
| [ ] | PHY-007 | Embroidered patches | Workwear |  | PDF, SVG |  | ⬜ Planned |
| [ ] | PHY-008 | Hats | Merchandise |  | PDF, SVG |  | ⬜ Planned |
| [ ] | PHY-009 | T-shirts | Merchandise |  | PDF, SVG |  | ⬜ Planned |
| [ ] | PHY-010 | Work shirts | Team identity |  | PDF, SVG |  | ⬜ Planned |
| [ ] | PHY-011 | Tote bags | Events |  | PDF, SVG |  | ⬜ Planned |
| [ ] | PHY-012 | Notebooks | Workshops |  | PDF, SVG |  | ⬜ Planned |
| [ ] | PHY-013 | Packaging | Product delivery |  | PDF, SVG |  | ⬜ Planned |
| [ ] | PHY-014 | Hang tags | Merchandise |  | PDF, SVG |  | ⬜ Planned |
| [ ] | PHY-015 | Window decals | Physical presence |  | PDF, SVG |  | ⬜ Planned |
| [ ] | PHY-016 | Exterior signage | Storefronts |  | PDF, SVG |  | ⬜ Planned |
| [ ] | PHY-017 | Interior signage | Environmental identity |  | PDF, SVG |  | ⬜ Planned |
| [ ] | PHY-018 | Wayfinding | Navigation |  | PDF, SVG | GFX-005 | ⬜ Planned |
| [ ] | PHY-019 | Event banners | Gatherings |  | PDF, SVG |  | ⬜ Planned |
| [ ] | PHY-020 | Table displays | Workshops and demonstrations |  | PDF, SVG |  | ⬜ Planned |
| [ ] | PHY-021 | Vehicle graphics | Mobile brand presence |  | PDF, SVG |  | ⬜ Planned |
| [ ] | PHY-022 | Promotional objects | Brand memorabilia |  | PDF, SVG |  | ⬜ Planned |

<a id="16-mot"></a>
## 16. Motion & sensory identity `MOT`

*Layer 2 · Reusable creative assets* — Movement personality, animation, sound and music.

Category depends on: Brand foundations, Logo & identity suite

| | Code | Asset | Purpose | Variants | Formats | Depends on | App |
|---|---|---|---|---|---|---|---|
| [ ] | MOT-001 | Motion direction board | Movement personality |  | PDF, MP4 | RES-014 | ⬜ Planned |
| [ ] | MOT-002 | Animated wordmark | Brand introduction |  | MP4, LOTTIE | IDN-005 | ⬜ Planned |
| [ ] | MOT-003 | Animated symbols | Graphic expression |  | MP4, LOTTIE | IDN-008 | ⬜ Planned |
| [ ] | MOT-004 | Kinetic typography | Campaign messaging |  | MP4, LOTTIE | TYP-001 | ⬜ Planned |
| [ ] | MOT-005 | Transition library | Consistent video language |  | MP4, LOTTIE |  | ⬜ Planned |
| [ ] | MOT-006 | Motion loops | Digital environments |  | MP4, LOTTIE |  | ⬜ Planned |
| [ ] | MOT-007 | Video color grading | Cinematic consistency |  | JSON |  | ⬜ Planned |
| [ ] | MOT-008 | Sound identity | Brand recognition |  | WAV, MP3 |  | ⬜ Planned |
| [ ] | MOT-009 | Audio stinger | Introductions and endings |  | WAV, MP3 |  | ⬜ Planned |
| [ ] | MOT-010 | Music direction | Emotional atmosphere |  | PDF |  | ⬜ Planned |
| [ ] | MOT-011 | Branded playlists | Cultural and lifestyle expression |  | MD |  | ⬜ Planned |

<a id="17-prs"></a>
## 17. Brand presentation deliverables `PRS`

*Layer 3 · Applied marketing deliverables* — Boards and documents generated from the underlying approved assets whenever needed.

Category depends on: Logo & identity suite, Color system, Typography system

| | Code | Asset | Purpose | Variants | Formats | Depends on | App |
|---|---|---|---|---|---|---|---|
| [ ] | PRS-001 | Brand at a glance ★ | Single-page identity overview |  | PDF, PPTX |  | ⬜ Planned |
| [ ] | PRS-002 | Master brand board | Logos, colors, typography, imagery |  | PDF, PPTX |  | ⬜ Planned |
| [ ] | PRS-003 | Logo suite presentation | All identity variations |  | PDF, PPTX |  | ⬜ Planned |
| [ ] | PRS-004 | Color system board | Palettes and combinations |  | PDF, PPTX |  | ⬜ Planned |
| [ ] | PRS-005 | Typography specimen | Typefaces in application |  | PDF, PPTX |  | ⬜ Planned |
| [ ] | PRS-006 | Iconography board | Symbols and illustrations |  | PDF, PPTX | GFX-001, GFX-002 | ⬜ Planned |
| [ ] | PRS-007 | Pattern and texture board | Graphic materials |  | PDF, PPTX | GFX-008, GFX-009 | ⬜ Planned |
| [ ] | PRS-008 | Photography direction board | Image language |  | PDF, PPTX |  | ⬜ Planned |
| [ ] | PRS-009 | Social identity board | Sample feed and content |  | PDF, PPTX | SOC-001 | ⬜ Planned |
| [ ] | PRS-010 | Website concept board | Desktop and mobile |  | PDF, PPTX | WEB-001 | ⬜ Planned |
| [ ] | PRS-011 | Merchandise presentation | Physical applications |  | PDF, PPTX |  | ⬜ Planned |
| [ ] | PRS-012 | Campaign presentation | Coordinated campaign assets |  | PDF, PPTX | CMP-001 | ⬜ Planned |
| [ ] | PRS-013 | Brand guidelines ★ | Complete usage documentation |  | PDF, PPTX |  | ⬜ Planned |
| [ ] | PRS-014 | Brand case study | Creative rationale and applications |  | PDF, PPTX |  | ⬜ Planned |

## Asset record schema

Each activated asset becomes a typed `AssetRecord` (`src/registry/types.ts`). Example — `src/registry/brands/localHero.ts`:

| Field | Primary Wordmark |
|---|---|
| Asset ID | LH-IDN-005 |
| Brand | Local Hero |
| Category | Visual identity (IDN) |
| Asset type | Wordmark |
| Narrative purpose | Approachable local authority |
| Source references | Approved creative direction (LH-RES-016) |
| Dependencies | Positioning (FND-005), Primary display typeface (TYP-001), Primary palette (CLR-001) |
| Required variants | Light, dark, monochrome |
| Required formats | SVG, PDF, PNG |
| Version | 0.1 |
| Approval state | Concept |
| Usage rights | Pending verification |

`findDependents(code)` in `src/registry/records.ts` answers “if this changes, what needs revisiting?” — e.g. changing the primary typeface (TYP-001) flags the wordmark and kinetic typography directly, plus every layout, design-system, editorial and presentation asset that inherits typography.

### Added beyond the reference list

- `SOC-037` Profile bio and `SAL-016` Podcast guest pitch — markitABLE already generates these, so they are tracked here.
