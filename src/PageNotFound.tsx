import React from 'react';
import { RouteComponentProps } from 'react-router';

export function PageNotFound({ location }: RouteComponentProps<{}>) {
  return (
    <>
      <h1>Whoops</h1>
      <p>
        Sorry but <em>{location.pathname}</em> didn't match any pages
      </p>
    </>
  );
}
