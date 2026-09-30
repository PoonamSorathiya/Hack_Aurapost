export interface EmotionalProfile {
  primaryEmotion: string;
  secondaryEmotions: string[];
  toneVibe: string;
  keyHighlights: string[];
  coreMessage: string;
}

export interface PlatformPosts {
  instagram: {
    caption: string;
    visualTip: string;
    suggestedPrompt?: string;
  };
  linkedin: {
    caption: string;
    visualTip: string;
  };
  twitter: {
    tweet: string;
    thread: string[];
  };
  facebook: {
    caption: string;
  };
}

export interface VisualIdea {
  cardHeadline: string;
  cardSubheadline: string;
  suggestedColors: string[];
  imagePrompt: string;
}

export interface AnalysisResult {
  emotionalProfile: EmotionalProfile;
  initialCraft: string;
  platforms: PlatformPosts;
  visualIdea: VisualIdea;
}

export type PlatformKey = 'instagram' | 'linkedin' | 'twitter' | 'facebook';

export type ToneKey = 'authentic' | 'inspiring' | 'professional' | 'playful';

export interface CardTheme {
  id: string;
  name: string;
  gradient: string;
  bgColors: [string, string];
  textColor: string;
  accentColor: string;
  badgeBg: string;
  badgeText: string;
}
