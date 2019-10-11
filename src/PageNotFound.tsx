import React from 'react';
import { useLocation } from 'react-router';

export function PageNotFound() {
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
