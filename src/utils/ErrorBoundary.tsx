import React from 'react';
import * as Sentry from '@sentry/browser';

// Inspired by https://github.com/bvaughn/react-error-boundary/tree/1.2.4

interface Props {
  children: React.ReactNode;
}

interface State {
  error?: Error;
  eventId?: string;
}

// FIXME ["componentDidCatch and getDerivedStateFromError: There are no Hook equivalents for these methods"](https://reactjs.org/docs/hooks-faq.html#how-do-lifecycle-methods-correspond-to-hooks)
export class ErrorBoundary extends React.Component<Props> {
  state: State = {
    error: undefined,
    eventId: undefined
  };

  // https://reactjs.org/docs/react-component.html#componentdidcatch
  // "In the event of an error, you can render a fallback UI with componentDidCatch()
  // by calling setState, but this will be deprecated in a future release.
  // Use static getDerivedStateFromError() to handle fallback rendering instead."
  //
  // https://docs.sentry.io/platforms/javascript/react/#error-boundaries
  static getDerivedStateFromError(error: Error) {
    const eventId = Sentry.captureException(error);
    return { error, eventId };
  }

  render() {
    const { error, eventId } = this.state;

    if (error !== undefined) {
      return (
        <>
          <h1>Something went wrong</h1>
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

    return this.props.children;
  }
}

export function withErrorBoundary<P extends Record<string, unknown>>(
  Component: React.ComponentType<P>
) {
  function WithErrorBoundary(props: P) {
    return (
      <ErrorBoundary>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...props} />
      </ErrorBoundary>
    );
  }

  // Format for display in DevTools
  const name = Component.displayName ?? Component.name;
  WithErrorBoundary.displayName = name ? `WithErrorBoundary(${name})` : 'WithErrorBoundary';

  return WithErrorBoundary;
}
