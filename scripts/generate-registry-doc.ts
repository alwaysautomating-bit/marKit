/**
 * Generates docs/ASSET_REGISTRY.md from src/registry/catalog.ts.
 * Run: npm run registry:doc
 */
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { ASSET_DEFINITIONS, CATEGORIES } from '../src/registry/catalog';
import { appCapabilityProgress } from '../src/registry/records';
import type { AppSupport, RegistryLayer } from '../src/registry/types';

const SUPPORT_LABEL: Record<AppSupport, string> = {
  generates: '✅ Generates',
  partial: '🟡 Partial',
  planned: '⬜ Planned',
  none: '— Not scoped',
};

const LAYER_LABEL: Record<RegistryLayer, string> = {
  foundation: 'Layer 1 · Brand foundations',
  creative: 'Layer 2 · Reusable creative assets',
  applied: 'Layer 3 · Applied marketing deliverables',
};

const esc = (s: string) => s.replace(/\|/g, '\\|');
const lines: string[] = [];
const out = (s = '') => lines.push(s);

const progress = appCapabilityProgress();
const total = ASSET_DEFINITIONS.length;
const count = (s: AppSupport) => ASSET_DEFINITIONS.filter((d) => d.appSupport === s).length;
const launch = ASSET_DEFINITIONS.filter((d) => d.launchCritical);

out('# The State of Everything — Brand & Marketing Asset Registry');
out();
out('> Generated from `src/registry/catalog.ts` by `npm run registry:doc`. Edit the catalog, not this file.');
out();
out('Master inventory of what a brand needs to establish its identity, express itself visually, tell stories, and operate across channels. ');
out('It is deliberately broader than any one brand’s launch needs: each brand activates the categories it actually uses.');
out();
out('## How to read this');
out();
out('- **Code** — stable template ID. A brand’s record prefixes it (`LH-IDN-005` = Local Hero’s Wordmark).');
out('- **App** — what markitABLE can produce today: ✅ generates · 🟡 partial · ⬜ planned.');
out('- **★** — launch-critical (recommended minimum set).');
out('- **Depends on** — explicit upstream assets. Every category also inherits the category dependencies listed under its heading.');
out('- Checkboxes track **app capability**. Per-brand approval state (concept → in review → approved) lives on `AssetRecord`.');
out();
out('## App capability summary');
out();
out(`**${count('generates')}** generated · **${count('partial')}** partial · **${count('planned') + count('none')}** not yet built · **${total}** total · **${launch.length}** launch-critical`);
out();
out('| # | Category | Layer | Assets | ✅ | 🟡 | ⬜ |');
out('|---|---|---|---:|---:|---:|---:|');
for (const c of CATEGORIES) {
  const p = progress.find((x) => x.code === c.code)!;
  out(`| ${String(c.number).padStart(2, '0')} | [${c.name}](#${c.number}-${c.code.toLowerCase()}) | ${c.layer} | ${p.total} | ${p.appSupport.generates} | ${p.appSupport.partial} | ${p.appSupport.planned + p.appSupport.none} |`);
}
out();

for (const c of CATEGORIES) {
  const defs = ASSET_DEFINITIONS.filter((d) => d.category === c.code);
  out(`<a id="${c.number}-${c.code.toLowerCase()}"></a>`);
  out(`## ${String(c.number).padStart(2, '0')}. ${c.name} \`${c.code}\``);
  out();
  out(`*${LAYER_LABEL[c.layer]}* — ${c.description}`);
  if (c.dependsOn.length) {
    const names = c.dependsOn.map((d) => CATEGORIES.find((x) => x.code === d)!.name);
    out();
    out(`Category depends on: ${names.join(', ')}`);
  }
  out();

  const groups = [...new Set(defs.map((d) => d.group ?? ''))];
  for (const g of groups) {
    if (g) {
      out(`**${g}**`);
      out();
    }
    out('| | Code | Asset | Purpose | Variants | Formats | Depends on | App |');
    out('|---|---|---|---|---|---|---|---|');
    for (const d of defs.filter((x) => (x.group ?? '') === g)) {
      const box = d.appSupport === 'generates' ? '[x]' : '[ ]';
      const star = d.launchCritical ? ' ★' : '';
      const app = SUPPORT_LABEL[d.appSupport] + (d.appSource ? `<br><sub>\`${esc(d.appSource)}\`</sub>` : '');
      out(
        `| ${box} | ${d.code} | ${esc(d.name)}${star} | ${esc(d.purpose)} | ${(d.requiredVariants ?? []).join(', ')} | ${(d.requiredFormats ?? []).join(', ')} | ${(d.dependsOn ?? []).join(', ')} | ${app} |`,
      );
    }
    out();
  }
}

out('## Asset record schema');
out();
out('Each activated asset becomes a typed `AssetRecord` (`src/registry/types.ts`). Example — `src/registry/brands/localHero.ts`:');
out();
out('| Field | Primary Wordmark |');
out('|---|---|');
out('| Asset ID | LH-IDN-005 |');
out('| Brand | Local Hero |');
out('| Category | Visual identity (IDN) |');
out('| Asset type | Wordmark |');
out('| Narrative purpose | Approachable local authority |');
out('| Source references | Approved creative direction (LH-RES-016) |');
out('| Dependencies | Positioning (FND-005), Primary display typeface (TYP-001), Primary palette (CLR-001) |');
out('| Required variants | Light, dark, monochrome |');
out('| Required formats | SVG, PDF, PNG |');
out('| Version | 0.1 |');
out('| Approval state | Concept |');
out('| Usage rights | Pending verification |');
out();
out('`findDependents(code)` in `src/registry/records.ts` answers “if this changes, what needs revisiting?” — e.g. changing the primary typeface (TYP-001) flags the wordmark and kinetic typography directly, plus every layout, design-system, editorial and presentation asset that inherits typography.');
out();
out('### Added beyond the reference list');
out();
out('- `SOC-037` Profile bio and `SAL-016` Podcast guest pitch — markitABLE already generates these, so they are tracked here.');
out();

writeFileSync(resolve(import.meta.dirname, '../docs/ASSET_REGISTRY.md'), lines.join('\n'));
console.log(`Wrote docs/ASSET_REGISTRY.md (${total} assets)`);
