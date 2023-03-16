import { useLocation } from 'react-router';

import { setPageTitle } from './utils/setPageTitle';

export function PageNotFound() {
  setPageTitle('Page not found');

  const location = useLocation();

  return (
    <>
      <h1>Whoops</h1>
      <p>
        Sorry but <em>{location.pathname}</em> didn't match any pages
      </p>
    </>
  );
}
