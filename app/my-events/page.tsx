"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import { events, type EventCategory } from "../data/events";
import { useSavedEvents } from "../context/SavedEventsContext";

const categoryStyles: Record<EventCategory, string> = {
  Tech: "bg-amber-500 text-neutral-950 ring-amber-400",
  Sports: "bg-amber-500 text-neutral-950 ring-amber-400",
  Faith: "bg-amber-500 text-neutral-950 ring-amber-400",
  Social: "bg-amber-500 text-neutral-950 ring-amber-400",
};

function formatEventDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);

  return new Date(year, month - 1, day).toLocaleDateString("en-NG", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export default function MyEventsPage() {
  const { savedEventIds } = useSavedEvents();
  const savedEvents = events.filter((event) => savedEventIds.includes(event.id));

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-400">
      <Navbar />

      <section className="mx-auto max-w-7xl px-5 pb-16 pt-12 sm:px-8 sm:pt-16">
        <div className="mb-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-amber-500">
            Your campus, your plans
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            My Events
          </h1>
          <p className="mt-4 text-base leading-7 text-neutral-400">
            Events you've saved for later.
          </p>
        </div>

        {savedEvents.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-neutral-700 bg-neutral-900 px-6 py-14 text-center">
            <p className="text-lg font-semibold text-white">
              You haven&apos;t saved any events yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {savedEvents.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.id}`}
                className="group block overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm shadow-black/20 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50"
              >
                <div className="relative h-48 overflow-hidden bg-neutral-200">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span
                    className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${categoryStyles[event.category]}`}
                  >
                    {event.category}
                  </span>
                </div>

                <div className="p-5">
                  <h2 className="min-h-14 text-lg font-bold leading-6 text-neutral-900 transition-colors group-hover:text-teal-700">
                    {event.title}
                  </h2>
                  <div className="mt-4 space-y-2.5 text-sm text-neutral-600">
                    <p className="flex items-center gap-2.5">
                      <span className="w-5 shrink-0 font-medium text-neutral-600">Date</span>
                      <span>{formatEventDate(event.date)}</span>
                    </p>
                    <p className="flex items-center gap-2.5">
                      <span className="w-5 shrink-0 font-medium text-neutral-600">Time</span>
                      <span>{event.time}</span>
                    </p>
                    <p className="flex items-start gap-2.5">
                      <span className="shrink-0 font-medium text-neutral-600">Venue</span>
                      <span className="line-clamp-2">{event.venue}</span>
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
