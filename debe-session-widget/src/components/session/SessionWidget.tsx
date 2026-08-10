"use client";

import { useState } from "react";
import { mockSessions } from "@/data/mockSessions";
import { Session } from "@/types/session";
import { RescheduleRequest } from "@/types/api";
import { requestReschedule } from "@/lib/requestReschedule";
import SessionCard from "./SessionCard";
import RescheduleModal from "./RescheduleModal";

export default function SessionWidget() {
  const [selectedSession, setSelectedSession] =
    useState<Session | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleReschedule = (session: Session) => {
    setSelectedSession(session);
    setError("");
  };

  const handleCloseModal = () => {
    setSelectedSession(null);
    setError("");
  };

  const handleSubmit = async (
    data: RescheduleRequest
  ) => {
    try {
      setLoading(true);
      setError("");

      const response = await requestReschedule(data);

      if (!response.success) {
        setError(
          response.error ?? "Something went wrong"
        );
        return;
      }

      console.log(
        "Reschedule request submitted successfully"
      );

      setSelectedSession(null);

    } catch (error) {
      setError(
        "Unable to submit reschedule request"
      );
    } finally {
      setLoading(false);
    }
  };


  if (mockSessions.length === 0) {
    return (
      <section>
        <h2 className="text-xl font-semibold">
          Upcoming Tutoring Sessions
        </h2>

        <p className="mt-4 text-gray-500">
          No upcoming sessions available.
        </p>
      </section>
    );
  }


  return (
    <>
      <section>
        <h2 className="text-xl font-semibold">
          Upcoming Tutoring Sessions
        </h2>

        <div className="mt-4 space-y-4">
          {mockSessions.slice(0, 3).map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              onReschedule={handleReschedule}
            />
          ))}
        </div>
      </section>


      {error && (
        <p className="mt-4 text-sm text-red-600">
          {error}
        </p>
      )}


     <RescheduleModal
  session={selectedSession}
  isOpen={Boolean(selectedSession)}
  onClose={handleCloseModal}
  onSubmit={handleSubmit}
  loading={loading}
/>
    </>
  );
}