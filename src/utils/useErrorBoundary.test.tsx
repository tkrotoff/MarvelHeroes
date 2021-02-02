import { act, renderHook } from '@testing-library/react-hooks';

import { ErrorBoundary } from './ErrorBoundary';
import { useErrorBoundary } from './useErrorBoundary';

test('useErrorBoundary()', () => {
  const { result } = renderHook(() => useErrorBoundary(), {
    wrapper: ({ children }) => <ErrorBoundary>{children}</ErrorBoundary>
  });

  const e = new Error('Error');

  // FIXME Will print:
  //
  // The above error occurred in the <TestHook> component:
  //     in TestHook
  //     in Suspense
  //     in ErrorBoundary (created by wrapper)
  //     in wrapper
  //
  // React will try to recreate this component tree from scratch using the error boundary you provided, ErrorBoundary.
  //
  // https://github.com/testing-library/react-hooks-testing-library/issues/43
  // https://github.com/bvaughn/react-error-boundary/blob/1.2.4/src/__tests__/ErrorBoundary.test.js#L16-L19
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
  act(() => {
    result.current(e);
  });
  consoleSpy.mockRestore();

  expect(result.error).toEqual(e);
});
