import React from 'react';
import { shallow } from 'enzyme';

import HeroesPagination from './HeroesPagination';

test('render()', () => {
  const wrapper = shallow(<HeroesPagination />);
  const app = wrapper.instance();

  expect(wrapper.html()).toBeTruthy();

  wrapper.unmount();
});
