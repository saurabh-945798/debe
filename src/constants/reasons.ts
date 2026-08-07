export const RESCHEDULE_REASONS = {
  CONFLICT: "Conflict",
  ILLNESS: "Illness",
  TIME_ZONE: "Time Zone",
  OTHER: "Other",
} as const;

export type RescheduleReason =
  (typeof RESCHEDULE_REASONS)[keyof typeof RESCHEDULE_REASONS];