import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import * as functions from "firebase-functions";

initializeApp();

const db = getFirestore();

interface BookingRequest {
  studentId: string;
  teacherId: string;
  slot: string;
  subject: string;
}

interface BookingResponse {
  success: boolean;
  message?: string;
}

export const bookSession = functions.https.onCall(
  async (
    request: functions.https.CallableRequest<unknown>
  ): Promise<BookingResponse> => {
    // Without this check, anyone could call the function and create a booking.
    if (!request.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "You must be logged in to book a session."
      );
    }

    const data = request.data;

    // TypeScript does not validate data sent by the client at runtime.
    if (
      typeof data !== "object" ||
      data === null ||
      !("studentId" in data) ||
      !("teacherId" in data) ||
      !("slot" in data) ||
      !("subject" in data) ||
      typeof data.studentId !== "string" ||
      typeof data.teacherId !== "string" ||
      typeof data.slot !== "string" ||
      typeof data.subject !== "string" ||
      !data.studentId.trim() ||
      !data.teacherId.trim() ||
      !data.slot.trim() ||
      !data.subject.trim()
    ) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Invalid booking data."
      );
    }

    const bookingData: BookingRequest = {
      studentId: data.studentId,
      teacherId: data.teacherId,
      slot: data.slot,
      subject: data.subject,
    };

    // Reject invalid dates before saving them to Firestore.
    const slotDate = new Date(bookingData.slot);

    if (Number.isNaN(slotDate.getTime())) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Invalid slot date."
      );
    }

    const booking = {
      studentId: bookingData.studentId,
      teacherId: bookingData.teacherId,
      slot: bookingData.slot,
      subject: bookingData.subject,
      status: "confirmed",
      createdAt: new Date(),
    };

    const teacherRef = db
      .collection("teachers")
      .doc(bookingData.teacherId);

    // Wait for Firestore to finish the check before using the result.
    const existing = await teacherRef
      .collection("bookings")
      .where("slot", "==", bookingData.slot)
      .get();

    if (!existing.empty) {
      return {
        success: false,
        message: "Slot already booked",
      };
    }

    // Wait for the booking to be saved before returning success.
    await db.collection("bookings").add(booking);

    return {
      success: true,
    };
  }
);