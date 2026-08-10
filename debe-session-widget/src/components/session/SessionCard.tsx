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
  const [formattedDate, setFormattedDate] =
    useState("");

  useEffect(() => {
    setFormattedDate(
      new Date(session.dateTime).toLocaleString(
        undefined,
        {
          dateStyle: "medium",
          timeStyle: "short",
        }
      )
    );
  }, [session.dateTime]);


  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        {/* Session Information */}
        <div className="min-w-0">

          <div className="flex items-center gap-3">

            <h3 className="truncate text-base font-semibold text-gray-900">
              {session.subject}
            </h3>

            <StatusBadge
              status={session.status}
            />

          </div>


          <div className="mt-2 space-y-1">

            <p className="text-sm text-gray-600">
              <span className="font-medium text-gray-800">
                Teacher:
              </span>{" "}
              {session.teacherName}
            </p>


            <p className="text-sm text-gray-500">
              {formattedDate || "Loading date..."}
            </p>

          </div>

        </div>


        {/* Action */}
        <button
          onClick={() =>
            onReschedule(session)
          }
          className="w-full shrink-0 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 sm:w-auto"
        >
          Request Reschedule
        </button>


      </div>

    </div>
  );
}