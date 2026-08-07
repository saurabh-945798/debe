"use client";

import { useEffect, useState } from "react";
import { Session } from "@/types/session";
import StatusBadge from "./StatusBadge";

interface SessionCardProps {
  session: Session;
  onReschedule: (session: Session) => void;
}

export default function SessionCard({
  session,
  onReschedule,
}: SessionCardProps) {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    setFormattedDate(
      new Date(session.dateTime).toLocaleString()
    );
  }, [session.dateTime]);

  return (
    <div className="rounded-xl border p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">
            {session.subject}
          </h3>

          <p className="mt-1 text-gray-600">
            Teacher: {session.teacherName}
          </p>

          <p className="mt-2 text-gray-500">
            {formattedDate || "Loading date..."}
          </p>
        </div>

        <StatusBadge status={session.status} />
      </div>

      <button
        onClick={() => onReschedule(session)}
        className="mt-4 rounded-lg bg-black px-4 py-2 text-white"
      >
        Request Reschedule
      </button>
    </div>
  );
}