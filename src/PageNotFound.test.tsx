import React from 'react';
import { render, cleanup } from 'react-testing-library';

import { mockRouteComponentProps } from './utils/mockRouteComponentProps';
import { PageNotFound } from './PageNotFound';

afterEach(cleanup);

test('render()', async () => {
  const wrapper = render(
    <PageNotFound {...mockRouteComponentProps({ location: { pathname: 'random' } })} />
  );

  expect(wrapper.container.innerHTML).toEqual(
    "<h1>Whoops</h1><p>Sorry but <em>random</em> didn't match any pages</p>"
  );
});
