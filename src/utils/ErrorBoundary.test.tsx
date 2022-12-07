import * as Sentry from '@sentry/react';
import { render, screen } from '@testing-library/react';

import { ErrorBoundary } from './ErrorBoundary';

function MyComponent({ throwError }: { throwError: boolean }) {
  if (throwError) throw new Error('Oops!');
  return <>Hello, World!</>;
}

test('render children if no error', () => {
  render(
    <ErrorBoundary>
      <MyComponent throwError={false} />
    </ErrorBoundary>
  );
  screen.getByText('Hello, World!');
});

describe('if an error has occurred', () => {
  test('render message + report button', () => {
    const mockConsole = jest.spyOn(console, 'error').mockImplementation();

    render(
      <ErrorBoundary>
        <MyComponent throwError={true} />
      </ErrorBoundary>
    );
    screen.getByText('Something went wrong :(');
    screen.getByText('Error: Oops!');
    screen.getByText('Report feedback');

    const [[error1], [error2], [componentStack]] = mockConsole.mock.calls;
    expect(error1.message).toEqual('Uncaught [Error: Oops!]');
    expect(error2.message).toEqual('Uncaught [Error: Oops!]');
    expect(componentStack).toContain('The above error occurred in the <MyComponent> component:');
    expect(componentStack).toContain(
      'React will try to recreate this component tree from scratch using the error boundary you provided, ErrorBoundary.'
    );
    mockConsole.mockRestore();
  });

  test('user clicks on report button', () => {
    const spyShowReportDialog = jest.spyOn(Sentry, 'showReportDialog');

    const mockConsole = jest.spyOn(console, 'error').mockImplementation();

    render(
      <ErrorBoundary>
        <MyComponent throwError={true} />
      </ErrorBoundary>
    );

    const [[error1], [error2], [componentStack]] = mockConsole.mock.calls;
    expect(error1.message).toEqual('Uncaught [Error: Oops!]');
    expect(error2.message).toEqual('Uncaught [Error: Oops!]');
    expect(componentStack).toContain('The above error occurred in the <MyComponent> component:');
    expect(componentStack).toContain(
      'React will try to recreate this component tree from scratch using the error boundary you provided, ErrorBoundary.'
    );
    mockConsole.mockRestore();

    const button = screen.getByText('Report feedback');
    button.click();
    expect(spyShowReportDialog).toHaveBeenCalledTimes(1);
    expect(spyShowReportDialog).toHaveBeenCalledWith({ eventId: expect.any(String) });
    spyShowReportDialog.mockRestore();
  });
});
