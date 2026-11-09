import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-[9999] w-full border-b border-[#172554] bg-[#172554] shadow-sm">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-8"
      >
        <Link href="/" className="flex items-center gap-3" aria-label="Campus Events home">
          <span className="grid size-10 place-items-center rounded-xl bg-teal-700 text-lg font-bold text-white shadow-sm">
            C
          </span>
          <span className="text-lg font-bold tracking-tight text-white">Campus Events</span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-100 transition-colors hover:bg-white/10 hover:text-white sm:px-4"
          >
            Home
          </Link>
          <Link
            href="/my-events"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-100 transition-colors hover:bg-white/10 hover:text-white sm:px-4"
          >
            My Events
          </Link>
        </div>
      </nav>
    </header>
  );
}
