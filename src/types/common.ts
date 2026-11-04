export type StakeholderId = 'education' | 'student' | 'business';

export interface NavItem {
  id: string;
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface MetricHighlight {
  label: string;
  value: string;
  description?: string;
  icon?: string;
}

export interface SocialLink {
  platform: 'facebook' | 'linkedin' | 'github' | 'youtube' | 'email';
  label: string;
  url: string;
  iconName: string;
}

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'cyan' | 'violet';
export type ButtonSize = 'sm' | 'md' | 'lg';
