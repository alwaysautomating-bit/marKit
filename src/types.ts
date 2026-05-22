export type MarketType = 'niche' | 'saturated';

export interface Big3 {
  feature1: { title: string; description: string; why: string };
  feature2: { title: string; description: string; why: string };
  feature3: { title: string; description: string; why: string };
}

export interface CoreMessaging {
  positioningStatement: string;
  taglineOptions: string[];
  elevatorPitch: {
    thirtySecond: string;
    oneMinute: string;
    twoMinute: string;
  };
  oneLiner: string;
}

export interface TacticalAssets {
  socialMediaBio: string;
  pressRelease: string;
}

export type TacticalAssetTarget = keyof TacticalAssets;

export interface PodcastMatch {
  podcastName: string;
  audienceFit: string;
  outreachEmail: {
    subject: string;
    body: string;
  };
}

export interface MarketingKit {
  headline?: string;
  subheadline?: string;
  valueProposition?: string;
  coreMessaging?: Partial<CoreMessaging>;
  tacticalAssets?: Partial<TacticalAssets>;
  big3?: Big3;
  marketingPlan?: string[];
  podcastMatches?: PodcastMatch[];
  podcastOutreach?: {
    subject: string;
    body: string;
  };
  suggestions?: {
    improvement: string;
    reason: string;
  }[];
}

export interface Note {
  id: string;
  content: string;
  imageUrl?: string;
  createdAt: number;
}

export interface Project {
  id: string;
  name: string;
  marketType: MarketType;
  notes: Note[];
  kit: MarketingKit | null;
  ownerId: string;
  createdAt: number;
  updatedAt: number;
  podcastProductDesc?: string;
  podcastAudience?: string;
  podcastValueAngle?: string;
}
