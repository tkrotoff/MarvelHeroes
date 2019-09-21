import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { mockRouteComponentProps } from './utils/mockRouteComponentProps';
import { PageNotFound } from './PageNotFound';

afterEach(cleanup);

test('render()', async () => {
  const { getByText } = render(
    <PageNotFound {...mockRouteComponentProps({ location: { pathname: 'random' } })} />
  );

  getByText('Whoops');

  // Tests "Sorry but <em>random</em> didn't match any pages"
  getByText("Sorry but didn't match any pages");
  getByText('random');
});
