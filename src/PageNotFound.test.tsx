import React from 'react';
import { mount } from 'enzyme';

import mockRouteComponentProps from './utils/mockRouteComponentProps';
import PageNotFound from './PageNotFoundEnzymeFix';

test('render()', async () => {
  const wrapper = mount(
    <PageNotFound {...mockRouteComponentProps({ location: { pathname: 'random' } })} />
  );

  expect(wrapper.html()).toEqual(
    "<div><h1>Whoops</h1><p>Sorry but <em>random</em> didn't match any pages</p></div>"
  );

  wrapper.unmount();
});
