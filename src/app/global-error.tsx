"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="min-h-screen bg-[#FBF7F0] text-[#1a1a1a] flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <h1 className="text-2xl font-bold">Something went wrong</h1>
          <p className="text-neutral-600">
            An unexpected error occurred. Please refresh the page or try again
            shortly. If the problem persists, get in touch on WhatsApp.
          </p>
          <button
            onClick={() => reset()}
            className="px-5 py-2.5 rounded-md bg-[#D2691E] text-white font-medium hover:bg-[#b85a18] transition"
          >
            Try again
          </button>
          {process.env.NODE_ENV === "development" && error?.message && (
            <pre className="mt-4 text-left text-xs bg-neutral-100 p-3 rounded overflow-auto">
              {error.message}
              {error.digest && `\nDigest: ${error.digest}`}
            </pre>
          )}
        </div>
      </body>
    </html>
  );
}
