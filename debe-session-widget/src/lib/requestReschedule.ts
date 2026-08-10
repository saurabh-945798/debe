import {
  RescheduleRequest,
  RescheduleResponse,
} from "@/types/api";

import { mockSessions } from "@/data/mockSessions";


export async function requestReschedule(
  request: RescheduleRequest
): Promise<RescheduleResponse> {

  const currentSession = mockSessions.find(
    (session) => session.id === request.sessionId
  );


  if (!currentSession) {
    return {
      success: false,
      error: "Session not found",
    };
  }


  const newDateTime = new Date(
    request.newDateTime
  );


  const currentDateTime = new Date(
    currentSession.dateTime
  );


  const now = new Date();


  if (newDateTime <= now) {
    return {
      success: false,
      error: "New slot cannot be in the past",
    };
  }


  if (
    newDateTime.getTime() ===
    currentDateTime.getTime()
  ) {
    return {
      success: false,
      error: "New slot cannot be same as current session",
    };
  }


  return {
    success: true,
  };
}