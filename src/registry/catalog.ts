/**
 * The State of Everything — Master Brand & Marketing Asset Inventory.
 *
 * Brand-agnostic. Individual brands activate the categories and assets they
 * actually need (see records.ts) rather than producing every deliverable.
 *
 * To update the progress tracker after editing this file:
 *   npm run registry:doc
 */
import type {
  AppSupport,
  AssetCategory,
  AssetDefinition,
  AssetFormat,
  AssetVariant,
  CategoryCode,
} from './types';

export const CATEGORIES: AssetCategory[] = [
  { number: 1, code: 'FND', name: 'Brand foundations', layer: 'foundation', dependsOn: [],
    description: 'The intellectual and creative inputs that inform everything produced downstream.' },
  { number: 2, code: 'RES', name: 'Creative research & art direction', layer: 'foundation', dependsOn: ['FND'],
    description: 'Extracting visual meaning from the physical and cultural environment and translating it into an identity.' },
  { number: 3, code: 'IDN', name: 'Logo & identity suite', layer: 'creative', dependsOn: ['FND', 'RES'],
    description: 'Every applicable mark ships in light, dark, monochrome, reversed, vector and transparent raster versions.' },
  { number: 4, code: 'CLR', name: 'Color system', layer: 'creative', dependsOn: ['RES'],
    description: 'Palettes, pairing and proportion rules, accessibility, and implementation tokens.' },
  { number: 5, code: 'TYP', name: 'Typography system', layer: 'creative', dependsOn: ['RES'],
    description: 'Typefaces, hierarchy, typesetting rules, licensing and implementation tokens.' },
  { number: 6, code: 'GFX', name: 'Graphic language & visual motifs', layer: 'creative', dependsOn: ['RES', 'CLR'],
    description: 'Icons, illustration, motifs, patterns, textures and the brand’s graphic vocabulary.' },
  { number: 7, code: 'PHO', name: 'Photography & image library', layer: 'creative', dependsOn: ['RES'],
    description: 'Imagery categorized by subject and narrative purpose, plus the rules for producing it.' },
  { number: 8, code: 'LAY', name: 'Composition & layout system', layer: 'creative', dependsOn: ['TYP', 'CLR'],
    description: 'Grids, compositions, spacing and reusable layout recipes.' },
  { number: 9, code: 'DSN', name: 'Digital design system', layer: 'creative', dependsOn: ['CLR', 'TYP', 'LAY'],
    description: 'The functional expression of the brand across websites, applications and digital experiences.' },
  { number: 10, code: 'WEB', name: 'Website asset suite', layer: 'applied', dependsOn: ['FND', 'DSN', 'PHO'],
    description: 'Pages, templates and web-specific imagery.' },
  { number: 11, code: 'SOC', name: 'Social media asset suite', layer: 'applied', dependsOn: ['FND', 'IDN', 'LAY'],
    description: 'Profile assets, recurring editorial formats, video assets and platform variations.' },
  { number: 12, code: 'CMP', name: 'Campaign & advertising assets', layer: 'applied', dependsOn: ['FND', 'IDN', 'LAY'],
    description: 'Campaign identity and paid, owned and outdoor placements.' },
  { number: 13, code: 'SAL', name: 'Sales & business development', layer: 'applied', dependsOn: ['FND', 'LAY'],
    description: 'Decks, one-pagers, proposals and enablement kits.' },
  { number: 14, code: 'EDT', name: 'Editorial & publishing assets', layer: 'applied', dependsOn: ['FND', 'TYP', 'LAY'],
    description: 'Named publications, templates and treatments for public commentary and storytelling.' },
  { number: 15, code: 'PHY', name: 'Physical brand & environmental assets', layer: 'applied', dependsOn: ['IDN', 'CLR', 'GFX'],
    description: 'Stationery, merchandise, packaging, signage and environmental identity — the brand beyond the screen.' },
  { number: 16, code: 'MOT', name: 'Motion & sensory identity', layer: 'creative', dependsOn: ['FND', 'IDN'],
    description: 'Movement personality, animation, sound and music.' },
  { number: 17, code: 'PRS', name: 'Brand presentation deliverables', layer: 'applied', dependsOn: ['IDN', 'CLR', 'TYP'],
    description: 'Boards and documents generated from the underlying approved assets whenever needed.' },
];

/** Category-level defaults applied when an entry doesn't specify its own. */
const CATEGORY_DEFAULTS: Partial<Record<CategoryCode, { variants?: AssetVariant[]; formats?: AssetFormat[] }>> = {
  FND: { formats: ['MD', 'PDF'] },
  RES: { formats: ['PDF', 'FIGMA'] },
  IDN: { variants: ['light', 'dark', 'monochrome', 'reversed'], formats: ['SVG', 'PDF', 'PNG'] },
  CLR: { formats: ['PDF', 'JSON'] },
  TYP: { formats: ['PDF'] },
  GFX: { formats: ['SVG', 'PNG'] },
  PHO: { formats: ['JPG', 'WEBP'] },
  LAY: { formats: ['FIGMA', 'PDF'] },
  DSN: { formats: ['FIGMA', 'JSON', 'CSS'] },
  WEB: { variants: ['desktop', 'mobile'], formats: ['FIGMA', 'HTML'] },
  SOC: { formats: ['PNG', 'MP4'] },
  CMP: { formats: ['PDF', 'PNG'] },
  SAL: { formats: ['PDF', 'PPTX'] },
  EDT: { formats: ['FIGMA', 'PNG', 'HTML'] },
  PHY: { formats: ['PDF', 'SVG'] },
  MOT: { formats: ['MP4', 'LOTTIE'] },
  PRS: { formats: ['PDF', 'PPTX'] },
};

interface EntryOptions {
  group?: string;
  dependsOn?: string[];
  variants?: AssetVariant[];
  formats?: AssetFormat[];
  app?: AppSupport;
  appSource?: string;
  launch?: boolean;
}

type Entry = [name: string, purpose: string, options?: EntryOptions];

function defineCategory(code: CategoryCode, entries: Entry[]): AssetDefinition[] {
  const defaults = CATEGORY_DEFAULTS[code] ?? {};
  return entries.map(([name, purpose, o = {}], index) => ({
    code: `${code}-${String(index + 1).padStart(3, '0')}`,
    category: code,
    group: o.group,
    name,
    purpose,
    dependsOn: o.dependsOn,
    requiredVariants: o.variants ?? defaults.variants,
    requiredFormats: o.formats ?? defaults.formats,
    appSupport: o.app ?? 'planned',
    appSource: o.appSource,
    launchCritical: o.launch,
  }));
}

/* ------------------------------------------------------------------ */
/* 01. Brand foundations                                               */
/* ------------------------------------------------------------------ */
const foundations = defineCategory('FND', [
  ['Brand brief', 'Central source of brand direction', { launch: true }],
  ['Brand origin story', 'History and reason for existing'],
  ['Mission and vision', 'Purpose and ambition', { launch: true }],
  ['Brand values', 'Operating principles'],
  ['Positioning statement', 'Place in the market',
    { app: 'generates', appSource: 'kit.coreMessaging.positioningStatement', launch: true }],
  ['Brand personality', 'Character and temperament'],
  ['Brand archetypes', 'Narrative roles'],
  ['Audience profiles', 'Who the brand serves', { launch: true }],
  ['Cultural context', 'Geography, history, community'],
  ['Brand narrative', 'Overarching story'],
  ['Messaging hierarchy', 'Primary and supporting messages',
    { app: 'partial',
      appSource: 'kit.headline, subheadline, valueProposition, big3, coreMessaging.oneLiner / elevatorPitch',
      launch: true }],
  ['Voice and tone guide', 'Communication rules', { launch: true }],
  ['Tagline library', 'Permanent and situational taglines',
    { app: 'generates', appSource: 'kit.coreMessaging.taglineOptions', launch: true }],
  ['Creative manifesto', 'Creative philosophy'],
  ['Brand boundaries', 'What the brand will and won’t do'],
]);

/* ------------------------------------------------------------------ */
/* 02. Creative research & art direction                               */
/* ------------------------------------------------------------------ */
const research = defineCategory('RES', [
  ['Master moodboard', 'Overall visual direction', { launch: true }],
  ['Cultural reference board', 'Cultural signals and influences'],
  ['Geographic reference board', 'Place-based visual cues'],
  ['Historical and period references', 'Eras and period aesthetics'],
  ['Architectural references', 'Built-environment cues'],
  ['Environmental photography', 'Captured context from the field'],
  ['Typography inspiration board', 'Lettering and type found in the world'],
  ['Color inspiration board', 'Color sourced from references'],
  ['Material and texture board', 'Surfaces, materials, finishes'],
  ['Illustration inspiration board', 'Illustration styles and precedents'],
  ['Composition references', 'Framing and arrangement precedents'],
  ['Editorial layout references', 'Publication layout precedents'],
  ['Cinematography references', 'Moving-image precedents'],
  ['Motion references', 'Movement and animation precedents'],
  ['Competitor visual landscape', 'How the category currently looks'],
  ['Creative direction statement', 'Synthesized direction drawn from the research', { launch: true }],
  ['Reference annotations', 'Why each reference matters — the provenance trail', { formats: ['MD', 'JSON'] }],
]);

/* ------------------------------------------------------------------ */
/* 03. Logo & identity suite                                           */
/* ------------------------------------------------------------------ */
const identity = defineCategory('IDN', [
  ['Primary logo', 'Full brand identity', { launch: true }],
  ['Secondary logo', 'Alternative composition'],
  ['Horizontal lockup', 'Wide placements', { launch: true }],
  ['Stacked lockup', 'Vertical placements'],
  ['Wordmark', 'Typography-only', { dependsOn: ['TYP-001'], launch: true }],
  ['Lettermark', 'Initials'],
  ['Monogram', 'Combined letterforms'],
  ['Brand symbol', 'Standalone graphic'],
  ['Submarks', 'Supporting identities'],
  ['Brand seal', 'Official applications'],
  ['Badges', 'Campaigns and merchandise'],
  ['Maker’s mark', 'Product attribution'],
  ['Parent-company lockup', 'Blue Dot relationship'],
  ['Favicon', 'Browser identity', { formats: ['SVG', 'ICO', 'PNG'], launch: true }],
  ['App icon', 'Digital products', { formats: ['SVG', 'PNG'] }],
  ['Social avatar', 'Platform identity', { formats: ['PNG'], launch: true }],
  ['Animated logo', 'Motion applications', { formats: ['MP4', 'LOTTIE', 'GIF'], dependsOn: ['IDN-001'] }],
]);

/* ------------------------------------------------------------------ */
/* 04. Color system                                                    */
/* ------------------------------------------------------------------ */
const color = defineCategory('CLR', [
  ['Primary palette', 'Permanent identity', { launch: true }],
  ['Secondary palette', 'Supporting colors'],
  ['Accent palette', 'Intentional color pops'],
  ['Neutral palette', 'Backgrounds and typography', { launch: true }],
  ['Campaign palettes', 'Temporary creative direction'],
  ['Semantic colors', 'Success, warning, error, information'],
  ['Color pairing matrix', 'Approved combinations'],
  ['Color proportion rules', 'How much color to use'],
  ['Accessibility matrix', 'Contrast requirements', { dependsOn: ['CLR-007'] }],
  ['Color tokens', 'Implementation in software', { formats: ['JSON', 'CSS'], launch: true }],
  ['Print specifications', 'CMYK and spot colors where needed', { formats: ['PDF'] }],
]);

/* ------------------------------------------------------------------ */
/* 05. Typography system                                               */
/* ------------------------------------------------------------------ */
const typography = defineCategory('TYP', [
  ['Primary display typeface', 'Brand headlines', { launch: true }],
  ['Secondary display typeface', 'Alternative editorial expression'],
  ['Body typeface', 'Long-form readability', { launch: true }],
  ['Utility typeface', 'Labels and navigation'],
  ['Monospace typeface', 'Technical and operational content'],
  ['Script typeface', 'Human and nostalgic accents'],
  ['Specialty typefaces', 'Campaign personality'],
  ['Type scale', 'Consistent hierarchy', { launch: true }],
  ['Typesetting rules', 'Tracking, leading, alignment'],
  ['Typography pairings', 'Approved combinations'],
  ['Typographic compositions', 'Reusable headline treatments', { formats: ['FIGMA', 'SVG'] }],
  ['Font licensing registry', 'Usage rights', { formats: ['MD', 'JSON'], launch: true }],
  ['Responsive typography tokens', 'Digital implementation', { formats: ['JSON', 'CSS'] }],
]);

/* ------------------------------------------------------------------ */
/* 06. Graphic language & visual motifs                                */
/* ------------------------------------------------------------------ */
const graphics = defineCategory('GFX', [
  ['Custom icon library', 'Services, objects, actions'],
  ['Brand illustrations', 'Signature illustration style'],
  ['Mascots', 'Recurring brand characters'],
  ['Decorative motifs', 'Stars, flowers, geometric forms'],
  ['Directional elements', 'Arrows, pointers, wayfinding'],
  ['Dividers', 'Editorial section treatments'],
  ['Frames and borders', 'Photography and content'],
  ['Repeating patterns', 'Stripes, grids, custom repeats'],
  ['Textures', 'Paper, grain, canvas, halftone', { formats: ['PNG', 'JPG'] }],
  ['Stamps', 'Approval and maker’s marks'],
  ['Stickers', 'Playful graphic elements'],
  ['Labels', 'Categories and collections'],
  ['Background graphics', 'Digital and print compositions'],
  ['Diagram language', 'Explaining technical concepts'],
  ['Data visualization style', 'Charts and quantitative stories', { dependsOn: ['CLR-006'] }],
  ['Handwritten elements', 'Notes and annotations'],
]);

/* ------------------------------------------------------------------ */
/* 07. Photography & image library                                     */
/* ------------------------------------------------------------------ */
const P = 'Collections';
const S = 'Supporting assets';
const photography = defineCategory('PHO', [
  ['People', 'Founders, employees, customers', { group: P }],
  ['Portraits', 'Individual human stories', { group: P }],
  ['Place', 'Cities, neighborhoods, landscapes', { group: P }],
  ['Architecture', 'Buildings and physical environments', { group: P }],
  ['Work', 'People performing their craft', { group: P }],
  ['Objects', 'Tools, equipment, everyday items', { group: P }],
  ['Details', 'Materials, textures, small observations', { group: P }],
  ['Lifestyle', 'Life surrounding the business', { group: P }],
  ['Product', 'Software and physical products', { group: P }],
  ['Process', 'How something gets done', { group: P }],
  ['Historical', 'Archival imagery', { group: P }],
  ['Transformation', 'Before and after', { group: P }],
  ['Atmosphere', 'Light, weather, environmental mood', { group: P }],
  ['Abstract', 'Conceptual storytelling', { group: P }],
  ['Backgrounds', 'Images suitable for text overlays', { group: P }],
  ['Photography shot lists', 'What to capture, by story need', { group: S, formats: ['MD', 'PDF'] }],
  ['Lighting guidelines', 'Light quality and setup', { group: S, formats: ['PDF'] }],
  ['Crop rules', 'Framing and aspect ratios', { group: S, formats: ['PDF'] }],
  ['Color grading presets', 'Consistent image color', { group: S, formats: ['JSON'] }],
  ['Retouching rules', 'What may and may not be altered', { group: S, formats: ['PDF'] }],
  ['Image rights registry', 'Licensing and releases', { group: S, formats: ['JSON', 'MD'] }],
  ['Attribution rules', 'Crediting photographers and sources', { group: S, formats: ['MD'] }],
  ['AI-generated image guidelines', 'When and how generated imagery is allowed', { group: S, formats: ['MD'] }],
]);

/* ------------------------------------------------------------------ */
/* 08. Composition & layout system                                     */
/* ------------------------------------------------------------------ */
const layout = defineCategory('LAY', [
  ['Master layout grid', 'Compositional foundation', { launch: true }],
  ['Editorial grid', 'Articles and publications'],
  ['Poster grid', 'Campaign graphics'],
  ['Social grid', 'Platform-specific compositions', { launch: true }],
  ['Website grid', 'Responsive page structure'],
  ['Photography compositions', 'Image placement and cropping'],
  ['Image and text compositions', 'Narrative layouts'],
  ['Full-bleed compositions', 'Immersive imagery'],
  ['Typography-only compositions', 'Statement graphics'],
  ['Collage compositions', 'Visual storytelling'],
  ['Split-screen compositions', 'Comparisons'],
  ['Sequential compositions', 'Carousels and narratives'],
  ['Spacing system', 'Visual rhythm'],
  ['Alignment rules', 'Consistency'],
  ['Layout recipes', 'Approved reusable arrangements'],
]);

/* ------------------------------------------------------------------ */
/* 09. Digital design system                                           */
/* ------------------------------------------------------------------ */
const digital = defineCategory('DSN', [
  ['Design tokens', 'Color, typography, spacing, radius', { dependsOn: ['CLR-010', 'TYP-013', 'LAY-013'], launch: true }],
  ['Buttons', 'Primary, secondary, text'],
  ['Links', 'Navigation and editorial'],
  ['Navigation', 'Headers, menus, breadcrumbs'],
  ['Cards', 'Products, services, stories'],
  ['Forms', 'Inputs, selections, submissions'],
  ['Status indicators', 'Feedback and system states'],
  ['Accordions', 'Expandable information'],
  ['Tabs', 'Content organization'],
  ['Modals', 'Focused interactions'],
  ['Tables', 'Structured information'],
  ['Empty states', 'First-use experiences'],
  ['Loading states', 'Waiting experiences'],
  ['Error states', 'Recovery experiences'],
  ['Notifications', 'System communication'],
  ['Footers', 'Navigation and attribution'],
  ['Motion tokens', 'Duration, easing, transitions', { formats: ['JSON', 'CSS'] }],
  ['Responsive rules', 'Mobile, tablet, desktop'],
  ['Accessibility rules', 'Inclusive interaction', { dependsOn: ['CLR-009'] }],
]);

/* ------------------------------------------------------------------ */
/* 10. Website asset suite                                             */
/* ------------------------------------------------------------------ */
const website = defineCategory('WEB', [
  ['Homepage', 'Desktop and mobile', { launch: true, app: 'partial', appSource: 'kit.headline / subheadline (copy only)' }],
  ['About page', 'Brand story', { dependsOn: ['FND-002'] }],
  ['Services overview', 'Offering discovery'],
  ['Service detail pages', 'Individual offerings'],
  ['Product pages', 'Product information'],
  ['Industry pages', 'Audience-specific offerings', { dependsOn: ['FND-008'] }],
  ['Case study template', 'Evidence of completed work'],
  ['Portfolio template', 'Work showcase'],
  ['Editorial article template', 'Long-form content'],
  ['Resource library', 'Educational content'],
  ['Campaign landing page', 'Focused conversion'],
  ['Contact page', 'Inquiry', { launch: true }],
  ['Booking experience', 'Consultation scheduling'],
  ['FAQ page', 'Common questions'],
  ['404 page', 'Branded recovery'],
  ['Coming soon page', 'Prelaunch'],
  ['Open Graph images', 'Link previews', { variants: ['16:9'], formats: ['PNG', 'JPG'], launch: true }],
  ['Website hero library', 'Reusable campaign headers', { formats: ['JPG', 'WEBP'] }],
  ['Website animation assets', 'Transitions and storytelling', { formats: ['LOTTIE', 'MP4'] }],
]);

/* ------------------------------------------------------------------ */
/* 11. Social media asset suite                                        */
/* ------------------------------------------------------------------ */
const PR = 'Profile assets';
const ED = 'Recurring editorial formats';
const VI = 'Video assets';
const PV = 'Platform variations';
const social = defineCategory('SOC', [
  ['Profile images', 'Platform identity', { group: PR, dependsOn: ['IDN-016'], launch: true }],
  ['Platform banners', 'Profile headers', { group: PR, launch: true }],
  ['Highlight covers', 'Story highlights', { group: PR }],
  ['Pinned post graphics', 'First impression posts', { group: PR }],
  ['Brand statement posts', 'What we stand for', { group: ED }],
  ['Educational posts', 'Teaching content', { group: ED }],
  ['Quote cards', 'Shareable quotes', { group: ED }],
  ['Data and statistics posts', 'Quantitative stories', { group: ED, dependsOn: ['GFX-015'] }],
  ['Industry commentary', 'Point of view on the market', { group: ED }],
  ['Founder observations', 'Founder voice', { group: ED }],
  ['Customer stories', 'Customer voice', { group: ED }],
  ['Product showcases', 'Product features', { group: ED }],
  ['Before-and-after posts', 'Transformation', { group: ED }],
  ['Behind-the-scenes posts', 'Process and people', { group: ED }],
  ['Announcements', 'News', { group: ED }],
  ['Event promotions', 'Workshops and gatherings', { group: ED }],
  ['Testimonial graphics', 'Social proof', { group: ED }],
  ['Case study carousels', 'Evidence in sequence', { group: ED }],
  ['Editorial carousels', 'Narratives in sequence', { group: ED }],
  ['Public service announcements', 'Community information', { group: ED }],
  ['Reel covers', 'Short-form video covers', { group: VI, formats: ['PNG'] }],
  ['Video thumbnails', 'Long-form video covers', { group: VI, formats: ['PNG', 'JPG'] }],
  ['Opening title cards', 'Video intros', { group: VI, formats: ['MP4'] }],
  ['Closing title cards', 'Video outros', { group: VI, formats: ['MP4'] }],
  ['Lower thirds', 'Name and title overlays', { group: VI, formats: ['MP4', 'PNG'] }],
  ['Subtitle treatments', 'Caption styling', { group: VI }],
  ['Chapter markers', 'Video navigation', { group: VI }],
  ['Branded transitions', 'Scene changes', { group: VI, formats: ['MP4'] }],
  ['Watermarks', 'Attribution on video', { group: VI, formats: ['PNG'] }],
  ['End screens', 'Calls to action', { group: VI, formats: ['MP4', 'PNG'] }],
  ['Square posts · 1:1', 'Feed format', { group: PV, variants: ['1:1'] }],
  ['Portrait posts · 4:5', 'Feed format', { group: PV, variants: ['4:5'] }],
  ['Stories and vertical video · 9:16', 'Vertical format', { group: PV, variants: ['9:16'] }],
  ['Landscape posts · 16:9', 'Wide format', { group: PV, variants: ['16:9'] }],
  ['LinkedIn document carousels', 'Document posts', { group: PV, formats: ['PDF'] }],
  ['Platform-specific safe zones', 'UI-overlay-safe areas', { group: PV, formats: ['FIGMA', 'PNG'] }],
  // Not in the reference list; added because markitABLE already generates it.
  ['Profile bio', 'Platform bio copy', { group: PR, formats: ['MD'], app: 'generates', appSource: 'kit.tacticalAssets.socialMediaBio' }],
]);

/* ------------------------------------------------------------------ */
/* 12. Campaign & advertising assets                                   */
/* ------------------------------------------------------------------ */
const campaign = defineCategory('CMP', [
  ['Campaign key visual', 'Central campaign artwork'],
  ['Campaign identity', 'Temporary visual language'],
  ['Campaign wordmark', 'Named initiative', { formats: ['SVG', 'PNG'] }],
  ['Campaign poster', 'Primary promotional piece'],
  ['Digital advertisements', 'Paid placements'],
  ['Display advertisements', 'Banner formats'],
  ['Promotional graphics', 'Offers and announcements'],
  ['Launch assets', 'New products and services'],
  ['Seasonal assets', 'Holidays and cultural moments'],
  ['Event campaign suite', 'Workshops and gatherings'],
  ['Billboard artwork', 'Outdoor advertising'],
  ['Print advertisements', 'Publications'],
  ['Direct mail artwork', 'Local outreach'],
  ['Campaign landing page', 'Conversion', { dependsOn: ['WEB-011'], formats: ['FIGMA', 'HTML'] }],
  ['Campaign email suite', 'Distribution', { formats: ['HTML'] }],
  ['Campaign motion graphics', 'Video and animation', { formats: ['MP4'] }],
]);

/* ------------------------------------------------------------------ */
/* 13. Sales & business development                                    */
/* ------------------------------------------------------------------ */
const sales = defineCategory('SAL', [
  ['Company overview', 'Introduction', { app: 'partial', appSource: 'kit.coreMessaging.elevatorPitch (copy only)', launch: true }],
  ['Capabilities deck', 'What we can do'],
  ['Pitch deck', 'Business opportunities'],
  ['Service one-pagers', 'Individual offerings', { launch: true }],
  ['Product one-pagers', 'Individual products'],
  ['Case study sheets', 'Results and evidence'],
  ['Proposal template', 'Prospective clients'],
  ['Pricing guide', 'Commercial information'],
  ['Demo presentation', 'Product walkthrough'],
  ['ROI visualization', 'Business impact'],
  ['Client onboarding guide', 'Beginning an engagement'],
  ['Workshop materials', 'Education and enablement'],
  ['Partnership kit', 'Collaborators'],
  ['Referral kit', 'Word-of-mouth marketing'],
  ['Media kit', 'Press and publicity', { app: 'partial', appSource: 'kit.tacticalAssets.pressRelease (press release only)' }],
  // Not in the reference list; added because markitABLE already generates it.
  ['Podcast guest pitch', 'Show matches and outreach emails',
    { formats: ['MD'], app: 'generates', appSource: 'kit.podcastMatches, kit.podcastOutreach' }],
]);

/* ------------------------------------------------------------------ */
/* 14. Editorial & publishing assets                                   */
/* ------------------------------------------------------------------ */
const editorial = defineCategory('EDT', [
  ['Publication masthead', 'Named editorial series', { formats: ['SVG', 'PNG'] }],
  ['Issue cover', 'Recurring publication'],
  ['Article header', 'Written content'],
  ['Editorial illustrations', 'Conceptual storytelling'],
  ['Pull quote treatments', 'Emphasis'],
  ['Research report template', 'Findings', { formats: ['FIGMA', 'PDF'] }],
  ['Field notes template', 'Observations'],
  ['Interview format', 'Conversations'],
  ['Photo essay template', 'Visual narratives'],
  ['Newsletter template', 'Recurring distribution', { formats: ['HTML'] }],
  ['Podcast artwork', 'Audio content', { variants: ['1:1'], formats: ['PNG', 'JPG'] }],
  ['Episode artwork', 'Recurring series', { variants: ['1:1'], formats: ['PNG', 'JPG'] }],
  ['Credits and attribution', 'Contributors'],
  ['Source and citation treatments', 'Evidence'],
  ['Author profile', 'Individual voices'],
]);

/* ------------------------------------------------------------------ */
/* 15. Physical brand & environmental assets                           */
/* ------------------------------------------------------------------ */
const physical = defineCategory('PHY', [
  ['Business cards', 'Personal introductions', { dependsOn: ['CLR-011'], launch: true }],
  ['Letterhead', 'Correspondence'],
  ['Envelopes', 'Mail'],
  ['Notecards', 'Personal communication'],
  ['Postcards', 'Campaigns and local outreach'],
  ['Stickers', 'Brand recognition'],
  ['Embroidered patches', 'Workwear'],
  ['Hats', 'Merchandise'],
  ['T-shirts', 'Merchandise'],
  ['Work shirts', 'Team identity'],
  ['Tote bags', 'Events'],
  ['Notebooks', 'Workshops'],
  ['Packaging', 'Product delivery'],
  ['Hang tags', 'Merchandise'],
  ['Window decals', 'Physical presence'],
  ['Exterior signage', 'Storefronts'],
  ['Interior signage', 'Environmental identity'],
  ['Wayfinding', 'Navigation', { dependsOn: ['GFX-005'] }],
  ['Event banners', 'Gatherings'],
  ['Table displays', 'Workshops and demonstrations'],
  ['Vehicle graphics', 'Mobile brand presence'],
  ['Promotional objects', 'Brand memorabilia'],
]);

/* ------------------------------------------------------------------ */
/* 16. Motion & sensory identity                                       */
/* ------------------------------------------------------------------ */
const motion = defineCategory('MOT', [
  ['Motion direction board', 'Movement personality', { dependsOn: ['RES-014'], formats: ['PDF', 'MP4'] }],
  ['Animated wordmark', 'Brand introduction', { dependsOn: ['IDN-005'] }],
  ['Animated symbols', 'Graphic expression', { dependsOn: ['IDN-008'] }],
  ['Kinetic typography', 'Campaign messaging', { dependsOn: ['TYP-001'] }],
  ['Transition library', 'Consistent video language'],
  ['Motion loops', 'Digital environments'],
  ['Video color grading', 'Cinematic consistency', { formats: ['JSON'] }],
  ['Sound identity', 'Brand recognition', { formats: ['WAV', 'MP3'] }],
  ['Audio stinger', 'Introductions and endings', { formats: ['WAV', 'MP3'] }],
  ['Music direction', 'Emotional atmosphere', { formats: ['PDF'] }],
  ['Branded playlists', 'Cultural and lifestyle expression', { formats: ['MD'] }],
]);

/* ------------------------------------------------------------------ */
/* 17. Brand presentation deliverables                                 */
/* ------------------------------------------------------------------ */
const presentation = defineCategory('PRS', [
  ['Brand at a glance', 'Single-page identity overview', { launch: true }],
  ['Master brand board', 'Logos, colors, typography, imagery'],
  ['Logo suite presentation', 'All identity variations'],
  ['Color system board', 'Palettes and combinations'],
  ['Typography specimen', 'Typefaces in application'],
  ['Iconography board', 'Symbols and illustrations', { dependsOn: ['GFX-001', 'GFX-002'] }],
  ['Pattern and texture board', 'Graphic materials', { dependsOn: ['GFX-008', 'GFX-009'] }],
  ['Photography direction board', 'Image language'],
  ['Social identity board', 'Sample feed and content', { dependsOn: ['SOC-001'] }],
  ['Website concept board', 'Desktop and mobile', { dependsOn: ['WEB-001'] }],
  ['Merchandise presentation', 'Physical applications'],
  ['Campaign presentation', 'Coordinated campaign assets', { dependsOn: ['CMP-001'] }],
  ['Brand guidelines', 'Complete usage documentation', { launch: true }],
  ['Brand case study', 'Creative rationale and applications'],
]);

export const ASSET_DEFINITIONS: AssetDefinition[] = [
  ...foundations,
  ...research,
  ...identity,
  ...color,
  ...typography,
  ...graphics,
  ...photography,
  ...layout,
  ...digital,
  ...website,
  ...social,
  ...campaign,
  ...sales,
  ...editorial,
  ...physical,
  ...motion,
  ...presentation,
];

export const DEFINITIONS_BY_CODE = new Map(ASSET_DEFINITIONS.map((d) => [d.code, d]));
export const CATEGORIES_BY_CODE = new Map(CATEGORIES.map((c) => [c.code, c]));
