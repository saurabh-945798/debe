"use client";

import { useEffect, useState } from "react";
import { Session } from "@/types/session";
import { RescheduleRequest } from "@/types/api";
import { RESCHEDULE_REASONS } from "@/constants/reasons";
import {
  combineDateAndTime,
  getMinimumDate,
  getMinimumDateTime,
  getMinimumTime,
} from "@/utils/date";

interface RescheduleModalProps {
  session: Session | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    data: RescheduleRequest
  ) => Promise<void>;
  loading: boolean;
}

export default function RescheduleModal({
session,
isOpen,
onClose,
onSubmit,
loading,
}: RescheduleModalProps){
 const [formData, setFormData] = useState<{
  date: string;
  time: string;
  reason: RescheduleRequest["reason"] | "";
}>({
  date: "",
  time: "",
  reason: "",
});
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setFormData({
      date: getMinimumDate(),
      time: getMinimumTime(),
      reason: "",
    });

    setValidationError("");
  }, [isOpen]);

  const minimumDate = getMinimumDate();

  if (!isOpen || !session) {
    return null;
  }

  const handleChange = (
    field: "date" | "time" | "reason",
    value: string
  ) => {
    const nextFormData = {
      ...formData,
      [field]: value,
    };

    setFormData(nextFormData);

   if (field === "date" || field === "time") {
  if (!nextFormData.date || !nextFormData.time) {
    setValidationError("");
    return;
  }

  const selectedDateTime = combineDateAndTime(
    nextFormData.date,
    nextFormData.time
  );

  const minimumDateTime = getMinimumDateTime();

  if (selectedDateTime < minimumDateTime) {
    setValidationError(
      "Please select a time at least 2 hours from now."
    );
  } else {
    setValidationError("");
  }
}
  };

const handleSubmit = async () => {    if (
      !formData.date ||
      !formData.time ||
      !formData.reason
    ) {
      return;
    }

    const selectedDateTime = combineDateAndTime(
      formData.date,
      formData.time
    );

    const minimumDateTime = getMinimumDateTime();

    if (selectedDateTime < minimumDateTime) {
      setValidationError(
        "Please select a time at least 2 hours from now."
      );
      return;
    }
const requestData: RescheduleRequest = {
  sessionId: session.id,
  newDateTime: selectedDateTime.toISOString(),
  reason: formData.reason,
};

await onSubmit(requestData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Request Reschedule
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500"
          >
            ✕
          </button>
        </div>

        <div className="mt-4">
          <p className="text-gray-600">
            Subject: {session.subject}
          </p>

          <p className="text-gray-600">
            Teacher: {session.teacherName}
          </p>
        </div>

        <div className="mt-6 space-y-4">
          <input
            type="date"
            min={minimumDate}
            value={formData.date}
            onChange={(e) =>
              handleChange("date", e.target.value)
            }
            className="w-full rounded-lg border p-2"
          />

          <input
            type="time"
            value={formData.time}
            onChange={(e) =>
              handleChange("time", e.target.value)
            }
            className="w-full rounded-lg border p-2"
          />

          {validationError && (
            <p className="text-sm text-red-600">
              {validationError}
            </p>
          )}

          <select
            value={formData.reason}
            onChange={(e) =>
              handleChange("reason", e.target.value)
            }
            className="w-full rounded-lg border p-2"
          >
            <option value="">
              Select Reason
            </option>

            {Object.values(RESCHEDULE_REASONS).map(
              (reason) => (
                <option
                  key={reason}
                  value={reason}
                >
                  {reason}
                </option>
              )
            )}
          </select>
        </div>

<button
  onClick={handleSubmit}
  disabled={
    loading ||
    Boolean(validationError) ||
    !formData.date ||
    !formData.time ||
    !formData.reason
  }
  className="mt-6 w-full rounded-lg bg-black py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
>
  {loading ? "Submitting..." : "Submit Request"}
</button>
      </div>
    </div>
  );
}

