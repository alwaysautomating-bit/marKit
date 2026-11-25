/**
 * Brand-level registry: activating assets for a brand, impact analysis,
 * and progress summaries.
 */
import { ASSET_DEFINITIONS, CATEGORIES, CATEGORIES_BY_CODE, DEFINITIONS_BY_CODE } from './catalog';
import type { AppSupport, AssetDefinition, AssetRecord, CategoryCode } from './types';

export interface BrandRef {
  id: string;
  name: string;
  /** Short prefix for record IDs, e.g. "LH" → "LH-IDN-001". */
  prefix: string;
}

export function recordId(brand: BrandRef, code: string): string {
  return `${brand.prefix}-${code}`;
}

/** Create a not-started record for one definition. */
export function createRecord(brand: BrandRef, def: AssetDefinition, active = true): AssetRecord {
  return {
    id: recordId(brand, def.code),
    brandId: brand.id,
    brandName: brand.name,
    definitionCode: def.code,
    category: def.category,
    name: def.name,
    sourceReferences: [],
    dependencies: (def.dependsOn ?? []).map((code) => recordId(brand, code)),
    requiredVariants: def.requiredVariants ?? [],
    requiredFormats: def.requiredFormats ?? [],
    version: '0.0',
    approvalState: 'not_started',
    usageRights: 'not_applicable',
    active,
    updatedAt: Date.now(),
  };
}

export interface ActivationOptions {
  /** Categories to activate. Defaults to all. */
  categories?: CategoryCode[];
  /** Only activate launch-critical assets. */
  launchOnly?: boolean;
}

/**
 * Build the full set of records for a brand. Everything in the master
 * inventory gets a record; only the selected subset is marked active.
 */
export function createBrandRegistry(brand: BrandRef, options: ActivationOptions = {}): AssetRecord[] {
  const categories = new Set(options.categories ?? CATEGORIES.map((c) => c.code));
  return ASSET_DEFINITIONS.map((def) =>
    createRecord(brand, def, categories.has(def.category) && (!options.launchOnly || !!def.launchCritical)),
  );
}

/**
 * Impact analysis: which definitions depend on `code`, directly (explicit
 * dependsOn) or because their category builds on the changed asset's category.
 *
 * e.g. findDependents('TYP-001') → Wordmark, Kinetic typography (direct),
 * plus every layout, design-system, editorial and presentation asset (category).
 */
export function findDependents(code: string): { direct: AssetDefinition[]; byCategory: AssetDefinition[] } {
  const changed = DEFINITIONS_BY_CODE.get(code);
  if (!changed) return { direct: [], byCategory: [] };

  const direct = ASSET_DEFINITIONS.filter((d) => d.dependsOn?.includes(code));
  const directCodes = new Set(direct.map((d) => d.code));
  const byCategory = ASSET_DEFINITIONS.filter(
    (d) =>
      !directCodes.has(d.code) &&
      d.code !== code &&
      CATEGORIES_BY_CODE.get(d.category)?.dependsOn.includes(changed.category),
  );
  return { direct, byCategory };
}

export interface CategoryProgress {
  code: CategoryCode;
  name: string;
  total: number;
  appSupport: Record<AppSupport, number>;
}

/** How much of each category markitABLE can produce today. */
export function appCapabilityProgress(): CategoryProgress[] {
  return CATEGORIES.map((c) => {
    const defs = ASSET_DEFINITIONS.filter((d) => d.category === c.code);
    const appSupport: Record<AppSupport, number> = { generates: 0, partial: 0, planned: 0, none: 0 };
    defs.forEach((d) => appSupport[d.appSupport]++);
    return { code: c.code, name: c.name, total: defs.length, appSupport };
  });
}

/** Approval progress for one brand's active records. */
export function brandApprovalProgress(records: AssetRecord[]) {
  const active = records.filter((r) => r.active);
  const approved = active.filter((r) => r.approvalState === 'approved').length;
  return { active: active.length, approved, percent: active.length ? Math.round((approved / active.length) * 100) : 0 };
}
