import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

const PageNotFound: React.SFC<RouteComponentProps<{}>> = ({ location }) => (
  <>
    <h1>Whoops</h1>
    <p>
      Sorry but <em>{location.pathname}</em> didn't match any pages
    </p>
  </>
);

export default PageNotFound;
