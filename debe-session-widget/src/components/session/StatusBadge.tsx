import { SessionStatus } from "@/types/session";

interface StatusBadgeProps {
  status: SessionStatus;
}

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  const statusStyles = {
    Confirmed:
      "bg-green-100 text-green-700",
    Pending:
      "bg-yellow-100 text-yellow-700",
    Rescheduled:
      "bg-blue-100 text-blue-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        statusStyles[status]
      }`}
    >
      {status}
    </span>
  );
}