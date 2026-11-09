"use client";

import { useState } from "react";
import Link from "next/link";
import { events, type EventCategory } from "./data/events";
import Navbar from "./components/Navbar";
import { useSavedEvents } from "./context/SavedEventsContext";

const categoryStyles: Record<EventCategory, string> = {
  Tech: "bg-teal-950 text-teal-200 ring-teal-800",
  Sports: "bg-teal-950 text-teal-200 ring-teal-800",
  Faith: "bg-teal-950 text-teal-200 ring-teal-800",
  Social: "bg-amber-950 text-amber-300 ring-amber-800",
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
    <main className="min-h-screen bg-neutral-950 text-neutral-400">
      <Navbar />

      <section id="home" className="mx-auto max-w-7xl px-5 pb-16 pt-12 sm:px-8 sm:pt-16">
        <div className="mb-9 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-amber-500">
            CAMPUS LIFE, ALL IN ONE PLACE
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Don&apos;t miss what&apos;s happening
          </h1>
          <p className="mt-4 text-base leading-7 text-neutral-400 sm:text-lg">
            Find events that interest you, meet new people and make the most of your campus experience.
            There&apos;s something for everyone to look forward to.
          </p>
        </div>

        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white">Upcoming events</h2>
            <p className="mt-1 text-sm text-neutral-400">Find something exciting to be part of.</p>
          </div>
          <span className="rounded-full bg-neutral-900 px-3 py-1.5 text-sm font-medium text-neutral-300 ring-1 ring-neutral-800">
            {filteredEvents.length} {filteredEvents.length === 1 ? "event" : "events"}
          </span>
        </div>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end">
        <label className="block min-w-0 flex-1">
          <span className="sr-only">Search events by title</span>
          <span className="relative block">
            <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-neutral-500">
              ⌕
            </span>
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search events by title..."
            className="w-full rounded-xl border border-neutral-700 bg-neutral-900 py-3 pl-11 pr-4 text-sm text-white shadow-sm outline-none transition placeholder:text-neutral-500 focus:border-teal-600 focus:ring-4 focus:ring-teal-900/50"
            />
          </span>
        </label>

        <label className="block w-full shrink-0 sm:w-56">
          <span className="mb-1.5 block text-sm font-medium text-neutral-400">Sort by Date</span>
          <select
            value={dateSortOrder}
            onChange={(event) => setDateSortOrder(event.target.value as DateSortOrder)}
            className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-sm text-white shadow-sm outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-900/50"
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
          <span className="mr-1 text-sm font-medium text-neutral-400">Category:</span>
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
                    ? "bg-teal-700 text-white shadow-sm"
                    : "bg-neutral-900 text-neutral-300 ring-1 ring-inset ring-neutral-700 hover:bg-neutral-800 hover:text-white"
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
              className="group overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 shadow-sm shadow-black/20 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50"
            >
            <Link
              href={`/events/${event.id}`}
              className="block"
            >
              <div className="relative h-48 overflow-hidden bg-neutral-800">
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
                <h3 className="min-h-14 text-lg font-bold leading-6 text-white transition-colors group-hover:text-teal-300">
                  {event.title}
                </h3>
                <div className="mt-4 space-y-2.5 text-sm text-neutral-400">
                  <p className="flex items-center gap-2.5">
                    <span aria-hidden="true" className="w-5 text-center text-teal-700">◷</span>
                    <span>{formatEventDate(event.date)} <span className="text-neutral-600">·</span> {event.time}</span>
                  </p>
                  <p className="flex items-start gap-2.5">
                    <span aria-hidden="true" className="w-5 shrink-0 text-center text-teal-700">⌖</span>
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
                      ? "bg-teal-700 text-white hover:bg-teal-800"
                      : "bg-neutral-800 text-neutral-200 hover:bg-neutral-700 hover:text-white"
                  }`}
                >
                  {isEventSaved(event.id) ? "Unsave Event" : "Save Event"}
                </button>
              </div>
            </article>
          ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-neutral-700 bg-neutral-900 px-6 py-14 text-center">
            <p className="text-lg font-semibold text-white">No events found</p>
            <p className="mt-2 text-sm text-neutral-400">
              Try a different title or clear the search to see all events.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
