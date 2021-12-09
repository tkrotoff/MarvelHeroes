import { useEffect } from 'react';

export function usePageTitle(title: string) {
  const fullTitle = `${title} - Marvel Heroes`;

  useEffect(() => {
    document.title = fullTitle;
  }, [fullTitle]);
}
