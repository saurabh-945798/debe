export const SESSION_STATUS = {
  CONFIRMED: "Confirmed",
  PENDING: "Pending",
  RESCHEDULED: "Rescheduled",
} as const;

export type SessionStatus =
  (typeof SESSION_STATUS)[keyof typeof SESSION_STATUS];

export interface Session {
  id: string;
  subject: string;
  teacherName: string;
  dateTime: string;
  status: SessionStatus;
}

export const RESCHEDULE_REASONS = {
  CONFLICT: "Conflict",
  ILLNESS: "Illness",
  TIME_ZONE: "Time Zone",
  OTHER: "Other",
} as const;

export type RescheduleReason =
  (typeof RESCHEDULE_REASONS)[keyof typeof RESCHEDULE_REASONS];