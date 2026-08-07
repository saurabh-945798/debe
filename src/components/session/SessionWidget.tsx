"use client";

import { useState } from "react";
import { mockSessions } from "@/data/mockSessions";
import { Session } from "@/types/session";
import SessionCard from "./SessionCard";
import RescheduleModal from "./RescheduleModal";

export default function SessionWidget() {
  const [selectedSession, setSelectedSession] =
    useState<Session | null>(null);

  const handleReschedule = (session: Session) => {
    setSelectedSession(session);
  };

  const handleCloseModal = () => {
    setSelectedSession(null);
  };

  const handleSubmit = () => {
    console.log("Reschedule request submitted");
  };

  if (mockSessions.length === 0) {
    return (
      <section className="mx-auto max-w-4xl rounded-xl bg-white p-6 shadow">
        <h2 className="text-2xl font-bold">
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
      <section className="mx-auto max-w-4xl rounded-xl bg-white p-6 shadow">
        <h2 className="mb-6 text-2xl font-bold">
          Upcoming Tutoring Sessions
        </h2>

        <div className="space-y-4">
          {mockSessions.slice(0, 3).map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              onReschedule={handleReschedule}
            />
          ))}
        </div>
      </section>

      <RescheduleModal
        session={selectedSession}
        isOpen={Boolean(selectedSession)}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />
    </>
  );
}