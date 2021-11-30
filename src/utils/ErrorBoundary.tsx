import * as Sentry from '@sentry/react';

function Fallback({ error, eventId }: { error: Error; eventId: string }) {
  return (
    <>
      <h1>Something went wrong :(</h1>
      <p>{error.toString()}</p>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => Sentry.showReportDialog({ eventId })}
      >
        Report feedback
      </button>
    </>
  );
}

interface Props {
  children: React.ReactNode;
}

export function ErrorBoundary({ children }: Props) {
  return (
    <Sentry.ErrorBoundary
      // eslint-disable-next-line react/no-unstable-nested-components
      fallback={({ error, eventId }) => (
        <Fallback
          error={error}
          eventId={
            // FIXME https://github.com/getsentry/sentry-javascript/issues/4190
            eventId!
          }
        />
      )}
    >
      {children}
    </Sentry.ErrorBoundary>
  );
}
