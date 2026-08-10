import { Session, SESSION_STATUS } from "@/types/session";

const createFutureDate = (
  daysFromNow: number,
  hours: number,
  minutes: number
): string => {
  const date = new Date();

  date.setDate(date.getDate() + daysFromNow);
  date.setHours(hours, minutes, 0, 0);

  return date.toISOString();
};

export const mockSessions: Session[] = [
  {
    id: "S001",
    subject: "Mathematics",
    teacherName: "John Smith",
    dateTime: createFutureDate(1, 10, 0),
    status: SESSION_STATUS.CONFIRMED,
  },
  {
    id: "S002",
    subject: "Physics",
    teacherName: "Emily Johnson",
    dateTime: createFutureDate(2, 16, 0),
    status: SESSION_STATUS.PENDING,
  },
  {
    id: "S003",
    subject: "Chemistry",
    teacherName: "Michael Brown",
    dateTime: createFutureDate(4, 18, 30),
    status: SESSION_STATUS.CONFIRMED,
  },
];