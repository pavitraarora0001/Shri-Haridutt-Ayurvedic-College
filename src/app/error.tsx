'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-20 text-center bg-[#F6F2E9]">
      <span className="text-xs uppercase tracking-widest text-[#C5A46D] font-semibold mb-2">
        System Notice
      </span>
      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#173D32] max-w-md mb-4">
        An unexpected error occurred while loading this page.
      </h2>
      <p className="text-xs text-[#342B25]/75 max-w-md mb-6 font-light">
        Our technical team has been notified. You can attempt to reload the request or return to the main portal.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-2.5 rounded bg-[#173D32] text-white hover:bg-[#0F2821] text-xs uppercase tracking-wider font-semibold transition-colors"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="px-6 py-2.5 rounded border border-[#C5A46D]/40 text-[#173D32] hover:bg-white text-xs uppercase tracking-wider font-semibold transition-colors"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}
