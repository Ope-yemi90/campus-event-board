import { events, type EventCategory } from "./data/events";
import Navbar from "./components/Navbar";

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

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50 text-slate-900">
      <Navbar />

      <section id="home" className="mx-auto max-w-7xl px-5 pb-16 pt-12 sm:px-8 sm:pt-16">
        <div className="mb-9 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
            Your campus, happening
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Discover what&apos;s on.
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            Find talks, games, gatherings, and good times happening around campus.
            There&apos;s something for everyone to look forward to.
          </p>
        </div>

        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">Upcoming events</h2>
            <p className="mt-1 text-sm text-slate-500">A little something to add to your calendar.</p>
          </div>
          <span className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-slate-600 ring-1 ring-slate-200">
            {events.length} events
          </span>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {events.map((event) => (
            <article
              key={event.id}
              className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10"
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
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
