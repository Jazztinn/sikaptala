import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z
    .string()
    .min(8, "Use at least 8 characters.")
    .optional()
    .or(z.literal(""))
});

export const passwordAuthSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(8, "Use at least 8 characters.")
});

export const profileSchema = z.object({
  displayName: z.string().min(2).max(80),
  username: z
    .string()
    .min(3)
    .max(30)
    .regex(/^[a-z0-9_]+$/i, "Only letters, numbers, and underscores are allowed.")
    .optional()
    .or(z.literal("")),
  avatarUrl: z.string().url().optional().or(z.literal("")),
  intent: z.string().max(200).optional().or(z.literal("")),
  personalization: z.string().max(200).optional().or(z.literal(""))
});

export const settingsSchema = z.object({
  emailNotifications: z.boolean(),
  inAppNotifications: z.boolean(),
  productTips: z.boolean()
});

export const supportSchema = z.object({
  email: z.string().email().optional().or(z.literal("")),
  subject: z.string().min(4).max(120),
  category: z.enum(["bug", "account", "feedback", "other"]),
  message: z.string().min(10).max(2000)
});

export const onboardingDraftSchema = z.object({
  outcome: z.string().min(2).max(120),
  intent: z.string().min(2).max(160),
  personalization: z.string().max(200),
  preview: z.string().min(2).max(280),
  contextualTips: z.array(z.string().min(2).max(160)).min(1).max(5)
});
