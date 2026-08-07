"use client";

import { useEffect, useState } from "react";
import { Session } from "@/types/session";
import { RESCHEDULE_REASONS } from "@/constants/reasons";

import {
  combineDateAndTime,
  getMinimumDate,
  getMinimumTime,
} from "@/utils/date";

interface RescheduleModalProps {
  session: Session | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export default function RescheduleModal({
  session,
  isOpen,
  onClose,
  onSubmit,
}: RescheduleModalProps) {

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    reason: "",
  });
  useEffect(() => {
  if (!isOpen) {
    return;
  }

  setFormData({
    date: getMinimumDate(),
    time: getMinimumTime(),
    reason: "",
  });
}, [isOpen]);


  const minimumDate = getMinimumDate();


  if (!isOpen || !session) {
    return null;
  }


  const handleChange = (
    field: "date" | "time" | "reason",
    value: string
  ) => {

    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

  };


  const handleSubmit = () => {

    if (
      !formData.date ||
      !formData.time ||
      !formData.reason
    ) {
      return;
    }


    const selectedDateTime =
      combineDateAndTime(
        formData.date,
        formData.time
      );


    console.log(
      selectedDateTime.toISOString()
    );


    onSubmit();

  };


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">


        <div className="flex items-center justify-between">

          <h2 className="text-xl font-semibold">
            Request Reschedule
          </h2>


          <button
            onClick={onClose}
            className="text-gray-500"
          >
            ✕
          </button>

        </div>



        <div className="mt-4">

          <p className="text-gray-600">
            Subject: {session.subject}
          </p>


          <p className="text-gray-600">
            Teacher: {session.teacherName}
          </p>

        </div>



        <div className="mt-6 space-y-4">


          <input
            type="date"
            min={minimumDate}
            value={formData.date}
            onChange={(e) =>
              handleChange(
                "date",
                e.target.value
              )
            }
            className="w-full rounded-lg border p-2"
          />



          <input
            type="time"
            value={formData.time}
            onChange={(e) =>
              handleChange(
                "time",
                e.target.value
              )
            }
            className="w-full rounded-lg border p-2"
          />



          <select
            value={formData.reason}
            onChange={(e) =>
              handleChange(
                "reason",
                e.target.value
              )
            }
            className="w-full rounded-lg border p-2"
          >

            <option value="">
              Select Reason
            </option>


            {Object.values(
              RESCHEDULE_REASONS
            ).map(
              (reason) => (

                <option
                  key={reason}
                  value={reason}
                >
                  {reason}
                </option>

              )
            )}

          </select>


        </div>



        <button
          onClick={handleSubmit}
          className="mt-6 w-full rounded-lg bg-black py-2 text-white"
        >
          Submit Request
        </button>


      </div>

    </div>
  );
}