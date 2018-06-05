import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router';

import HeroesPagination from './HeroesPagination';

test('render()', () => {
  const wrapper = shallow(
    <MemoryRouter>
      <HeroesPagination match={{ params: {} }} />
    </MemoryRouter>
  );
  const app = wrapper.instance();

  expect(wrapper.html()).toBeTruthy();

  wrapper.unmount();
});
