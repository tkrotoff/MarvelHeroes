import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router';

import mockRouteComponentProps from './mockRouteComponentProps';
import HeroesPagination from './HeroesPagination';

test('render()', () => {
  const wrapper = shallow(
    <MemoryRouter>
      <HeroesPagination {...mockRouteComponentProps({})} />
    </MemoryRouter>
  );

  expect(wrapper.html()).toBeTruthy();
  console.log(wrapper.html());

  wrapper.unmount();
});
