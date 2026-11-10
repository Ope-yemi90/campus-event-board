import Link from "next/link";
import { Suspense } from "react";
import { events, type EventCategory } from "../../data/events";
import EventCountdown from "./EventCountdown";

type EventDetailsPageProps = {
  params: Promise<{ id: string }>;
};

const categoryStyles: Record<EventCategory, string> = {
  Tech: "bg-amber-500 text-neutral-950 ring-amber-400",
  Sports: "bg-amber-500 text-neutral-950 ring-amber-400",
  Faith: "bg-amber-500 text-neutral-950 ring-amber-400",
  Social: "bg-amber-500 text-neutral-950 ring-amber-400",
};

function formatEventDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);

  return new Date(year, month - 1, day).toLocaleDateString("en-NG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function generateStaticParams() {
  return events.map((event) => ({ id: event.id }));
}

function EventDetailsFallback() {
  return (
    <main className="grid min-h-screen place-items-center bg-neutral-950 px-5 text-neutral-400">
      <p>Loading event details...</p>
    </main>
  );
}

export default function EventDetailsPage({ params }: EventDetailsPageProps) {
  return (
    <Suspense fallback={<EventDetailsFallback />}>
      <EventDetailsContent params={params} />
    </Suspense>
  );
}

async function EventDetailsContent({ params }: EventDetailsPageProps) {
  const { id } = await params;
  const event = events.find((item) => item.id === id);

  if (!event) {
    return (
      <main className="grid min-h-screen place-items-center bg-neutral-950 px-5 text-neutral-400">
        <div className="w-full max-w-lg rounded-2xl border border-neutral-800 bg-neutral-900 p-8 text-center shadow-sm sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-500">
            Campus Events
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white">Event not found</h1>
          <p className="mt-3 text-neutral-400">
            We couldn't find an event with that ID. It may have been removed.
          </p>
          <Link
            href="/"
            className="mt-7 inline-flex rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-800"
          >
            Back to Events
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-950 px-5 py-8 text-neutral-400 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg py-2 text-sm font-semibold text-teal-300 transition hover:text-teal-200"
        >
          <span aria-hidden="true">←</span>
          Back to Events
        </Link>

        <article className="mt-5 overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm shadow-black/30">
          <div className="h-56 bg-neutral-200 sm:h-80 lg:h-[26rem]">
            <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
          </div>

          <div className="p-6 sm:p-10">
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${categoryStyles[event.category]}`}
            >
              {event.category}
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              {event.title}
            </h1>

            <dl className="mt-7 grid gap-5 border-y border-neutral-200 py-6 sm:grid-cols-3">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-neutral-600">Date</dt>
                <dd className="mt-1.5 font-medium text-neutral-800">{formatEventDate(event.date)}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-neutral-600">Time</dt>
                <dd className="mt-1.5 font-medium text-neutral-800">{event.time}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-neutral-600">Venue</dt>
                <dd className="mt-1.5 font-medium text-neutral-800">{event.venue}</dd>
              </div>
            </dl>

            <EventCountdown date={event.date} time={event.time} />

            <section className="mt-7">
              <h2 className="text-lg font-bold text-neutral-900">About this event</h2>
              <p className="mt-3 max-w-3xl whitespace-pre-line leading-7 text-neutral-600">
                {event.description}
              </p>
            </section>
          </div>
        </article>
      </div>
    </main>
  );
}
