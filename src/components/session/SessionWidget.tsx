import { mockSessions } from "@/data/mockSessions";
import SessionCard from "./SessionCard";

export default function SessionWidget() {
  if (mockSessions.length === 0) {
    return (
      <section className="mx-auto max-w-4xl rounded-xl bg-white p-6 shadow">
        <h2 className="text-2xl font-bold">Upcoming Sessions</h2>

        <p className="mt-4 text-gray-500">
          No upcoming sessions available.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl rounded-xl bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold">
        Upcoming Sessions
      </h2>

      <div className="space-y-4">
        {mockSessions.map((session) => (
          <SessionCard
            key={session.id}
            session={session}
          />
        ))}
      </div>
    </section>
  );
}