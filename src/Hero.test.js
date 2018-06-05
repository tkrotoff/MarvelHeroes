import React from 'react';
import { shallow } from 'enzyme';

import Hero from './Hero';

test('render()', () => {
  const wrapper = shallow(<Hero match={{ params: {} }} />);
  const app = wrapper.instance();

  expect(wrapper.html()).toBeTruthy();

  wrapper.unmount();
});
