"use client";

import { useEffect, useState } from "react";

type EventCountdownProps = {
  date: string;
  time: string;
};

function getEventStartTime(date: string, time: string) {
  const [year, month, day] = date.split("-").map(Number);
  const timeParts = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);

  if (!timeParts) {
    return Number.NaN;
  }

  const [, hourText, minuteText, periodText] = timeParts;
  const hour = Number(hourText) % 12 + (periodText.toUpperCase() === "PM" ? 12 : 0);
  const minute = Number(minuteText);

  return new Date(year, month - 1, day, hour, minute).getTime();
}

function formatRemainingTime(milliseconds: number) {
  const totalSeconds = Math.ceil(milliseconds / 1000);
  const days = Math.floor(totalSeconds / 86_400);
  const hours = Math.floor((totalSeconds % 86_400) / 3_600);
  const minutes = Math.floor((totalSeconds % 3_600) / 60);
  const seconds = totalSeconds % 60;

  const parts = [
    `${days} ${days === 1 ? "day" : "days"}`,
    `${hours} ${hours === 1 ? "hour" : "hours"}`,
    `${minutes} ${minutes === 1 ? "minute" : "minutes"}`,
    `${seconds} ${seconds === 1 ? "second" : "seconds"}`,
  ];

  return parts.join(", ");
}

export default function EventCountdown({ date, time }: EventCountdownProps) {
  const [remainingTime, setRemainingTime] = useState<number | null>(null);

  useEffect(() => {
    const eventStartTime = getEventStartTime(date, time);

    function updateCountdown() {
      setRemainingTime(Math.max(0, eventStartTime - Date.now()));
    }

    updateCountdown();
    const intervalId = window.setInterval(updateCountdown, 1000);

    return () => window.clearInterval(intervalId);
  }, [date, time]);

  return (
    <div className="mt-7 rounded-2xl bg-teal-950 px-5 py-4 ring-1 ring-inset ring-teal-800">
      <p className="text-sm font-semibold text-white">Event countdown</p>
      <p role="status" className="mt-1 text-base font-medium text-teal-200">
        {remainingTime === null
          ? "Calculating time remaining..."
          : remainingTime === 0
            ? "Event has started"
            : `Starts in ${formatRemainingTime(remainingTime)}`}
      </p>
    </div>
  );
}
