import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import PageNotFound from './PageNotFound';

// FIXME See React 16 Fragments unsupported https://github.com/airbnb/enzyme/issues/1213
const PageNotFoundEnzymeFix: React.SFC<RouteComponentProps<{}>> = props => (
  <div>
    <PageNotFound {...props} />
  </div>
);

export default PageNotFoundEnzymeFix;
