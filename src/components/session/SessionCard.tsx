import { Session } from "@/types/session";

interface SessionCardProps {
  session: Session;
}

export default function SessionCard({
  session,
}: SessionCardProps) {
  return (
    <div>
      <h3>{session.subject}</h3>
      <p>{session.teacherName}</p>
    </div>
  );
}