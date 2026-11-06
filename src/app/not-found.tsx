import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-20 text-center bg-[#F6F2E9]">
      <span className="font-serif text-6xl sm:text-8xl font-bold text-[#173D32] mb-2">404</span>
      <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-semibold mb-2">
        Page Not Located
      </span>
      <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#173D32] max-w-md mb-4">
        The requested institutional archive or page does not exist.
      </h1>
      <p className="text-xs text-[#342B25]/75 max-w-md mb-8 font-light">
        The link may have been updated or moved. Please navigate using our primary institutional index.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded bg-[#173D32] text-white hover:bg-[#0F2821] text-xs uppercase tracking-wider font-semibold transition-colors border border-[#C5A46D]/40 shadow-luxury"
      >
        Return to Institutional Homepage
      </Link>
    </div>
  );
}
