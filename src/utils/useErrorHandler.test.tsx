import { act, render, screen } from '@testing-library/react';
import { useEffect } from 'react';

import { ErrorBoundary } from './ErrorBoundary';
import { flushPromises } from './flushPromises';
import { useErrorHandler } from './useErrorHandler';

function MyComponent({ throwError }: { throwError: boolean }) {
  const handleError = useErrorHandler();

  useEffect(() => {
    if (throwError) {
      setTimeout(() => {
        handleError(new Error('Oops!'));
      });
    }
  }, [throwError, handleError]);

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

test('render message + report button if an error occured', async () => {
  render(
    <ErrorBoundary>
      <MyComponent throwError={true} />
    </ErrorBoundary>
  );

  screen.getByText('Hello, World!');

  const mockConsole = jest.spyOn(console, 'error').mockImplementation();
  await act(flushPromises);
  expect(mockConsole).toHaveBeenCalledTimes(3);
  const [[error1], [error2], [componentStack]] = mockConsole.mock.calls;
  expect(error1.message).toEqual('Uncaught [Error: Oops!]');
  expect(error2.message).toEqual('Uncaught [Error: Oops!]');
  expect(componentStack).toContain('The above error occurred in the <MyComponent> component:');
  expect(componentStack).toContain(
    'React will try to recreate this component tree from scratch using the error boundary you provided, ErrorBoundary.'
  );
  mockConsole.mockRestore();

  screen.getByText('Something went wrong :(');
  screen.getByText('Error: Oops!');
  screen.getByText('Report feedback');
});
