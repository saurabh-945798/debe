import { RescheduleReason, Session } from "./session";

export interface RescheduleRequest {
  sessionId: Session["id"];
  newDateTime: string;
  reason: RescheduleReason;
}

export interface RescheduleResponse {
  success: boolean;
  error?: string;
}