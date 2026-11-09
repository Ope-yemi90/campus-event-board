import Link from "next/link";
import { Suspense } from "react";
import { events, type EventCategory } from "../../data/events";
import EventCountdown from "./EventCountdown";

type EventDetailsPageProps = {
  params: Promise<{ id: string }>;
};

const categoryStyles: Record<EventCategory, string> = {
  Tech: "bg-blue-50 text-blue-700 ring-blue-600/15",
  Sports: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
  Faith: "bg-violet-50 text-violet-700 ring-violet-600/15",
  Social: "bg-amber-50 text-amber-700 ring-amber-600/15",
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
    <main className="grid min-h-screen place-items-center bg-slate-50 px-5 text-slate-600">
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
      <main className="grid min-h-screen place-items-center bg-slate-50 px-5 text-slate-900">
        <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
            Campus Events
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight">Event not found</h1>
          <p className="mt-3 text-slate-600">
            We couldn't find an event with that ID. It may have been removed.
          </p>
          <Link
            href="/"
            className="mt-7 inline-flex rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Back to Events
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-8 text-slate-900 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg py-2 text-sm font-semibold text-indigo-700 transition hover:text-indigo-900"
        >
          <span aria-hidden="true">←</span>
          Back to Events
        </Link>

        <article className="mt-5 overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm">
          <div className="h-56 bg-slate-100 sm:h-80 lg:h-[26rem]">
            <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
          </div>

          <div className="p-6 sm:p-10">
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${categoryStyles[event.category]}`}
            >
              {event.category}
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              {event.title}
            </h1>

            <dl className="mt-7 grid gap-5 border-y border-slate-100 py-6 sm:grid-cols-3">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Date</dt>
                <dd className="mt-1.5 font-medium text-slate-800">{formatEventDate(event.date)}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Time</dt>
                <dd className="mt-1.5 font-medium text-slate-800">{event.time}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Venue</dt>
                <dd className="mt-1.5 font-medium text-slate-800">{event.venue}</dd>
              </div>
            </dl>

            <EventCountdown date={event.date} time={event.time} />

            <section className="mt-7">
              <h2 className="text-lg font-bold text-slate-900">About this event</h2>
              <p className="mt-3 max-w-3xl whitespace-pre-line leading-7 text-slate-600">
                {event.description}
              </p>
            </section>
          </div>
        </article>
      </div>
    </main>
  );
}
