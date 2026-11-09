"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import { events, type EventCategory } from "../data/events";
import { useSavedEvents } from "../context/SavedEventsContext";

const categoryStyles: Record<EventCategory, string> = {
  Tech: "bg-blue-50 text-blue-700 ring-blue-600/15",
  Sports: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
  Faith: "bg-violet-50 text-violet-700 ring-violet-600/15",
  Social: "bg-amber-50 text-amber-700 ring-amber-600/15",
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
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <section className="mx-auto max-w-7xl px-5 pb-16 pt-12 sm:px-8 sm:pt-16">
        <div className="mb-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
            Your campus, your plans
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            My Events
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Events you've saved for later.
          </p>
        </div>

        {savedEvents.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
            <p className="text-lg font-semibold text-slate-800">
              You haven&apos;t saved any events yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {savedEvents.map((event) => (
              <Link
                key={event.id}
                href={`/events/${event.id}`}
                className="group block overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10"
              >
                <div className="relative h-48 overflow-hidden bg-slate-100">
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
                  <h2 className="min-h-14 text-lg font-bold leading-6 text-slate-900 transition-colors group-hover:text-indigo-700">
                    {event.title}
                  </h2>
                  <div className="mt-4 space-y-2.5 text-sm text-slate-600">
                    <p className="flex items-center gap-2.5">
                      <span className="w-5 shrink-0 font-medium text-indigo-600">Date</span>
                      <span>{formatEventDate(event.date)}</span>
                    </p>
                    <p className="flex items-center gap-2.5">
                      <span className="w-5 shrink-0 font-medium text-indigo-600">Time</span>
                      <span>{event.time}</span>
                    </p>
                    <p className="flex items-start gap-2.5">
                      <span className="shrink-0 font-medium text-indigo-600">Venue</span>
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
