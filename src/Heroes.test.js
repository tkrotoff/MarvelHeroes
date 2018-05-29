import React from 'react';
import { shallow } from 'enzyme';

import Heroes from './Heroes';

test('render()', () => {
  const wrapper = shallow(<Heroes />);
  const app = wrapper.instance();

  expect(wrapper.html()).toBeTruthy();

  wrapper.unmount();
});
