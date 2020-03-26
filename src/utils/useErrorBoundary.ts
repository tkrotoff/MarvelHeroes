import { useCallback, useState } from 'react';

// https://github.com/facebook/react/issues/14981#issuecomment-468460187
export function useErrorBoundary() {
  const [, setError] = useState();

  return useCallback((e: any) => {
    setError(() => {
      throw e;
    });
  }, []);
}
