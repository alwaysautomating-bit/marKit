/**
 * Brand & Marketing Asset Registry — type definitions.
 *
 * The registry has two levels:
 *  1. AssetDefinition — a brand-agnostic entry in the master inventory
 *     ("every brand might need a Primary logo"). Lives in catalog.ts.
 *  2. AssetRecord — a brand-specific instance of a definition
 *     ("Local Hero's Primary logo, v0.1, in concept"). Created per brand.
 */

/** The three layers of the brand ecosystem. */
export type RegistryLayer =
  | 'foundation' // intellectual & creative inputs (strategy, research, direction)
  | 'creative' // reusable creative assets (identity, color, type, imagery, systems)
  | 'applied'; // applied marketing deliverables (web, social, campaigns, print)

/** How far markitABLE is from being able to produce this asset itself. */
export type AppSupport =
  | 'generates' // the app produces this today
  | 'partial' // the app produces a piece of it (e.g. text only, one variant)
  | 'planned' // on the roadmap, not built
  | 'none'; // not yet scoped

/** Approval workflow for a brand-specific asset record. */
export type ApprovalState =
  | 'not_started'
  | 'concept'
  | 'in_review'
  | 'approved'
  | 'deprecated';

export type UsageRights = 'not_applicable' | 'pending_verification' | 'cleared' | 'restricted';

export type AssetVariant =
  | 'light'
  | 'dark'
  | 'monochrome'
  | 'reversed'
  | 'desktop'
  | 'mobile'
  | '1:1'
  | '4:5'
  | '9:16'
  | '16:9';

export type AssetFormat =
  | 'DOC'
  | 'MD'
  | 'PDF'
  | 'SVG'
  | 'PNG'
  | 'JPG'
  | 'WEBP'
  | 'GIF'
  | 'MP4'
  | 'LOTTIE'
  | 'WAV'
  | 'MP3'
  | 'JSON'
  | 'CSS'
  | 'HTML'
  | 'FIGMA'
  | 'PPTX'
  | 'ICO'
  | 'OTF';

export type CategoryCode =
  | 'FND'
  | 'RES'
  | 'IDN'
  | 'CLR'
  | 'TYP'
  | 'GFX'
  | 'PHO'
  | 'LAY'
  | 'DSN'
  | 'WEB'
  | 'SOC'
  | 'CMP'
  | 'SAL'
  | 'EDT'
  | 'PHY'
  | 'MOT'
  | 'PRS';

export interface AssetCategory {
  /** 01–17, matches the order of the master inventory. */
  number: number;
  code: CategoryCode;
  name: string;
  layer: RegistryLayer;
  description: string;
  /** Category codes everything in this category depends on by default. */
  dependsOn: CategoryCode[];
}

export interface AssetDefinition {
  /** Stable template code, e.g. "IDN-001". Brand records prefix it: "LH-IDN-001". */
  code: string;
  category: CategoryCode;
  /** Optional sub-group inside a category (e.g. "Video assets" in Social). */
  group?: string;
  name: string;
  /** What the asset is for / what it contains. */
  purpose: string;
  /** Specific asset codes this depends on, beyond the category defaults. */
  dependsOn?: string[];
  requiredVariants?: AssetVariant[];
  requiredFormats?: AssetFormat[];
  appSupport: AppSupport;
  /** Where the app produces it today (e.g. a MarketingKit field). */
  appSource?: string;
  /** Recommended for a minimum launch set. */
  launchCritical?: boolean;
}

/** A brand-specific, versioned, approvable instance of an AssetDefinition. */
export interface AssetRecord {
  /** e.g. "LH-IDN-003" */
  id: string;
  brandId: string;
  brandName: string;
  definitionCode: string;
  category: CategoryCode;
  name: string;
  narrativePurpose?: string;
  /** PROV-style links back to inspiration, observations, and decisions. */
  sourceReferences: string[];
  /** Record IDs this record depends on (resolved from definition + category). */
  dependencies: string[];
  requiredVariants: AssetVariant[];
  requiredFormats: AssetFormat[];
  version: string;
  approvalState: ApprovalState;
  usageRights: UsageRights;
  /** Whether the brand has activated this asset (brands opt in to what they need). */
  active: boolean;
  notes?: string;
  updatedAt: number;
}
