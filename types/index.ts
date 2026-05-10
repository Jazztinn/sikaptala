export type OnboardingDraft = {
  outcome: string;
  intent: string;
  personalization: string;
  preview: string;
  contextualTips: string[];
};

export type ProfileRecord = {
  id: string;
  displayName: string;
  username: string | null;
  avatarUrl: string | null;
  outcome: string | null;
  intent: string | null;
  personalization: string | null;
  onboardingCompleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type SettingsRecord = {
  id: string;
  emailNotifications: boolean;
  inAppNotifications: boolean;
  productTips: boolean;
  createdAt: string;
  updatedAt: string;
};

export type NotificationItem = {
  id: string;
  userId: string;
  type: "info" | "success" | "warning";
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
};

export type SupportRequestInput = {
  email?: string;
  subject: string;
  category: "bug" | "account" | "feedback" | "other";
  message: string;
};

export type AppUser = {
  id: string;
  email: string;
  profile: ProfileRecord;
  settings: SettingsRecord;
};

export type ActionState = {
  error?: string;
  success?: string;
};
