"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex items-center justify-center bg-white text-slate-900 p-6">
        <div className="max-w-md w-full text-center space-y-6">
          <h1 className="text-2xl font-bold">Une erreur est survenue</h1>
          <p className="text-slate-500">
            Une erreur inattendue s'est produite. Réessaie ou contacte-nous.
          </p>
          <button
            onClick={reset}
            className="inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-900 font-black text-sm uppercase tracking-wide"
          >
            Réessayer
          </button>
          {process.env.NODE_ENV === "development" && (
            <details className="mt-6 text-left">
              <summary className="cursor-pointer text-sm text-slate-500">
                Error details
              </summary>
              <pre className="mt-2 text-xs bg-slate-100 p-3 rounded overflow-auto">
                {error.message}
                {error.stack && `\n\n${error.stack}`}
                {error.digest && `\n\nDigest: ${error.digest}`}
              </pre>
            </details>
          )}
        </div>
      </body>
    </html>
  );
}
