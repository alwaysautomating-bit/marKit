/**
 * Local Hero — first brand in the registry (a Blue Dot brand).
 * Values here are illustrative and pending approval.
 */
import { createBrandRegistry, type BrandRef } from '../records';
import type { AssetRecord } from '../types';

export const LOCAL_HERO: BrandRef = { id: 'local-hero', name: 'Local Hero', prefix: 'LH' };

/** Illustrative Local Hero palette, pending approval (CLR-001 / CLR-004). */
export const LOCAL_HERO_PALETTE_DRAFT = [
  { hex: '#242422', role: 'neutral' },
  { hex: '#F3F0E8', role: 'neutral' },
  { hex: '#FFFFFF', role: 'neutral' },
  { hex: '#F47736', role: 'primary' },
  { hex: '#EBAA18', role: 'accent' },
  { hex: '#263D32', role: 'secondary' },
  { hex: '#803D32', role: 'secondary' },
  { hex: '#294F78', role: 'secondary' },
] as const;

/** Launch set: every launch-critical asset across all categories. */
export function createLocalHeroRegistry(): AssetRecord[] {
  const records = createBrandRegistry(LOCAL_HERO, { launchOnly: true });

  // Example record from the proposal: Primary Wordmark.
  const wordmark = records.find((r) => r.id === 'LH-IDN-005');
  if (wordmark) {
    Object.assign(wordmark, {
      narrativePurpose: 'Approachable local authority',
      sourceReferences: ['Approved creative direction (LH-RES-016)'],
      dependencies: ['LH-FND-005', 'LH-TYP-001', 'LH-CLR-001'],
      requiredVariants: ['light', 'dark', 'monochrome'],
      requiredFormats: ['SVG', 'PDF', 'PNG'],
      version: '0.1',
      approvalState: 'concept',
      usageRights: 'pending_verification',
    } satisfies Partial<AssetRecord>);
  }

  const palette = records.find((r) => r.id === 'LH-CLR-001');
  if (palette) {
    palette.version = '0.1';
    palette.approvalState = 'concept';
    palette.notes = 'Illustrative palette, pending approval — see LOCAL_HERO_PALETTE_DRAFT.';
  }

  return records;
}
