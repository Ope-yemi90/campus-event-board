import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-slate-200/80 bg-white sticky top-0 Z-[9999]">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-8"
      >
        <Link href="/" className="flex items-center gap-3" aria-label="Campus Events home">
          <span className="grid size-10 place-items-center rounded-xl bg-indigo-600 text-lg font-bold text-white shadow-sm">
            C
          </span>
          <span className="text-lg font-bold tracking-tight text-slate-900">Campus Events</span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-indigo-50 hover:text-indigo-700 sm:px-4"
          >
            Home
          </Link>
          <Link
            href="/my-events"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-indigo-50 hover:text-indigo-700 sm:px-4"
          >
            My Events
          </Link>
        </div>
      </nav>
    </header>
  );
}
