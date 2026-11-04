import { StakeholderId, MetricHighlight } from './common';
import { ChallengeCategory, BusinessPartnershipType } from './forms';

export interface HeroData {
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  subheading: string;
  primaryCtaText: string;
  primaryCtaTarget: string;
  secondaryCtaText: string;
  secondaryCtaTarget: string;
  metricBadges: MetricHighlight[];
}

export interface TheIdeaStep {
  stepNumber: number;
  badge: string;
  title: string;
  description: string;
  iconName: string;
  accentColor: string;
}

export interface TheIdeaData {
  eyebrow: string;
  heading: string;
  subheading: string;
  philosophy: string;
  steps: TheIdeaStep[];
}

export interface StakeholderBenefit {
  title: string;
  description: string;
}

export interface StakeholderPillarData {
  id: StakeholderId;
  badge: string;
  title: string;
  tagline: string;
  valueProposition: string;
  benefits: StakeholderBenefit[];
  primaryCtaLabel: string;
  secondaryCtaLabel?: string;
  secondaryCtaTarget?: string;
  collaborationModes?: Array<{
    type: BusinessPartnershipType;
    title: string;
    description: string;
  }>;
  accentColor: 'cyan' | 'blue' | 'violet';
}

export interface StakeholdersData {
  eyebrow: string;
  heading: string;
  subheading: string;
  pillars: Record<StakeholderId, StakeholderPillarData>;
}

export interface TimelineSprintData {
  sprintNumber: number;
  weekLabel: string;
  phaseName: string;
  title: string;
  objective: string;
  activities: string[];
  deliverable: string;
  tag: string;
}

export interface TimelineData {
  eyebrow: string;
  heading: string;
  subheading: string;
  sprints: TimelineSprintData[];
}

export interface ChallengeCategoryData {
  id: ChallengeCategory;
  categoryNumber: string;
  title: string;
  tag: string;
  description: string;
  realWorldImpact: string;
  sampleUseCases: string[];
  iconName: string;
}

export interface ChallengesData {
  eyebrow: string;
  heading: string;
  subheading: string;
  notice: string;
  categories: ChallengeCategoryData[];
}

export interface TechToolItem {
  name: string;
  badge?: string;
  description: string;
  isFreeTierHighlighted: boolean;
}

export interface TechStackGroup {
  groupTitle: string;
  groupDescription: string;
  tools: TechToolItem[];
}

export interface BuildWithAiData {
  eyebrow: string;
  heading: string;
  subheading: string;
  guidingPrinciples: Array<{
    title: string;
    description: string;
  }>;
  techGroups: TechStackGroup[];
  importantNotice: string;
}

export interface MentorArchetype {
  id: string;
  roleTitle: string;
  focusArea: string;
  description: string;
  statusBadge: string;
  iconName: string;
}

export interface PartnerSlot {
  id: string;
  category: string;
  label: string;
  statusLabel: string;
  description: string;
}

export interface MentorsPartnersData {
  eyebrow: string;
  heading: string;
  subheading: string;
  recruitmentNotice: string;
  mentorSlots: MentorArchetype[];
  partnerSlots: PartnerSlot[];
  ctaLabel: string;
}

export interface EvaluationCriterionData {
  id: string;
  criterionNumber: string;
  name: string;
  weightPercent: number;
  weightLabel: string;
  description: string;
  keyQuestions: string[];
  accentColor: 'blue' | 'cyan' | 'violet' | 'emerald';
}

export interface EvaluationData {
  eyebrow: string;
  heading: string;
  subheading: string;
  criteria: EvaluationCriterionData[];
}

export interface AwardPerkData {
  id: string;
  title: string;
  highlight: string;
  description: string;
  iconName: string;
}

export interface AwardsData {
  eyebrow: string;
  heading: string;
  subheading: string;
  perks: AwardPerkData[];
  honestPrizeNotice: {
    title: string;
    description: string;
    statusLabel: string;
  };
}

export interface FaqItemData {
  id: string;
  question: string;
  answer: string;
  category: 'student' | 'business';
}

export interface FaqData {
  eyebrow: string;
  heading: string;
  subheading: string;
  studentFaqs: FaqItemData[];
  businessFaqs: FaqItemData[];
}

export interface FinalCtaData {
  eyebrow: string;
  heading: string;
  subheading: string;
  studentCta: {
    label: string;
    subtitle: string;
  };
  businessCta: {
    label: string;
    subtitle: string;
  };
  educationCta: {
    label: string;
    subtitle: string;
  };
}
