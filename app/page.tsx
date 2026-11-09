"use client";

import { useState } from "react";
import Link from "next/link";
import { events, type EventCategory } from "./data/events";
import Navbar from "./components/Navbar";
import { useSavedEvents } from "./context/SavedEventsContext";

const categoryStyles: Record<EventCategory, string> = {
  Tech: "bg-blue-50 text-blue-700 ring-blue-600/15",
  Sports: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
  Faith: "bg-violet-50 text-violet-700 ring-violet-600/15",
  Social: "bg-amber-50 text-amber-700 ring-amber-600/15",
};

const categoryFilters = ["All", "Tech", "Sports", "Faith", "Social"] as const;
type CategoryFilter = (typeof categoryFilters)[number];
type DateSortOrder = "earliest" | "latest";

function formatEventDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);

  return new Date(year, month - 1, day).toLocaleDateString("en-NG", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export default function Home() {
  const { isEventSaved, toggleSavedEvent } = useSavedEvents();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("All");
  const [dateSortOrder, setDateSortOrder] = useState<DateSortOrder>("earliest");
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const filteredEvents = events
    .filter(
      (event) =>
        (selectedCategory === "All" || event.category === selectedCategory) &&
        event.title.toLowerCase().includes(normalizedSearchTerm),
    )
    .sort((firstEvent, secondEvent) => {
      const dateOrder = firstEvent.date.localeCompare(secondEvent.date);
      return dateSortOrder === "earliest" ? dateOrder : -dateOrder;
    });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <section id="home" className="mx-auto max-w-7xl px-5 pb-16 pt-12 sm:px-8 sm:pt-16">
        <div className="mb-9 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
            Your campus, happening
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-blue-950 sm:text-5xl">
            Discover what's on.
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            Find talks, games, gatherings, and good times happening around campus.
            There's something for everyone to look forward to.
          </p>
        </div>

        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">Upcoming events</h2>
            <p className="mt-1 text-sm text-slate-500">A little something to add to your calendar.</p>
          </div>
          <span className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-slate-600 ring-1 ring-slate-200">
            {filteredEvents.length} {filteredEvents.length === 1 ? "event" : "events"}
          </span>
        </div>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end">
        <label className="block min-w-0 flex-1">
          <span className="sr-only">Search events by title</span>
          <span className="relative block">
            <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
              ⌕
            </span>
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search events by title..."
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
            />
          </span>
        </label>

        <label className="block w-full shrink-0 sm:w-56">
          <span className="mb-1.5 block text-sm font-medium text-slate-600">Sort by Date</span>
          <select
            value={dateSortOrder}
            onChange={(event) => setDateSortOrder(event.target.value as DateSortOrder)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
          >
            <option value="earliest">Earliest to latest</option>
            <option value="latest">Latest to earliest</option>
          </select>
        </label>
        </div>

        <div
          className="mb-6 flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Filter events by category"
        >
          <span className="mr-1 text-sm font-medium text-slate-600">Category:</span>
          {categoryFilters.map((category) => {
            const isSelected = selectedCategory === category;

            return (
              <button
                key={category}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelectedCategory(category)}
                className={`min-h-11 touch-manipulation rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isSelected
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-white text-slate-600 ring-1 ring-inset ring-slate-200 hover:bg-indigo-50 hover:text-indigo-700"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredEvents.map((event) => (
            <article
              key={event.id}
              className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10"
            >
            <Link
              href={`/events/${event.id}`}
              className="block"
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
                <h3 className="min-h-14 text-lg font-bold leading-6 text-slate-900 transition-colors group-hover:text-indigo-700">
                  {event.title}
                </h3>
                <div className="mt-4 space-y-2.5 text-sm text-slate-600">
                  <p className="flex items-center gap-2.5">
                    <span aria-hidden="true" className="w-5 text-center text-indigo-600">◷</span>
                    <span>{formatEventDate(event.date)} <span className="text-slate-300">·</span> {event.time}</span>
                  </p>
                  <p className="flex items-start gap-2.5">
                    <span aria-hidden="true" className="w-5 shrink-0 text-center text-indigo-600">⌖</span>
                    <span className="line-clamp-2">{event.venue}</span>
                  </p>
                </div>
              </div>
            </Link>
              <div className="px-5 pb-5">
                <button
                  type="button"
                  aria-pressed={isEventSaved(event.id)}
                  onClick={() => toggleSavedEvent(event.id)}
                  className={`w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                    isEventSaved(event.id)
                      ? "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                      : "bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700"
                  }`}
                >
                  {isEventSaved(event.id) ? "Unsave Event" : "Save Event"}
                </button>
              </div>
            </article>
          ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
            <p className="text-lg font-semibold text-slate-800">No events found</p>
            <p className="mt-2 text-sm text-slate-500">
              Try a different title or clear the search to see all events.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
