import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

export const PageNotFound: React.FunctionComponent<RouteComponentProps<{}>> = ({ location }) => (
  <>
    <h1>Whoops</h1>
    <p>
      Sorry but <em>{location.pathname}</em> didn't match any pages
    </p>
  </>
);
