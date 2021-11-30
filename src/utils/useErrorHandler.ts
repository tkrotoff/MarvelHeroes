import { useCallback, useState } from 'react';

// https://github.com/facebook/react/issues/14981#issuecomment-468460187
// https://github.com/facebook/react/issues/11409#issuecomment-783309449
// https://github.com/bvaughn/react-error-boundary/blob/v3.1.4/README.md#useerrorhandlererror-unknown
export function useErrorHandler() {
  const [, setError] = useState();

  const handleError = useCallback((e: unknown) => {
    setError(() => {
      throw e;
    });
  }, []);

  return handleError;
}
