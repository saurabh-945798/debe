import { SessionStatus } from "@/types/session";

interface StatusBadgeProps {
  status: SessionStatus;
}

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  return (
    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
      {status}
    </span>
  );
}