import {
  RescheduleRequest,
  RescheduleResponse,
} from "@/types/api";

export async function requestReschedule(
  request: RescheduleRequest
): Promise<RescheduleResponse> {

  return {
    success: true,
  };
}