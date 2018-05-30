import React from 'react';
import { shallow } from 'enzyme';

import HeroesGrid from './HeroesGrid';

test('render()', () => {
  const wrapper = shallow(<HeroesGrid />);
  const app = wrapper.instance();

  expect(wrapper.html()).toBeTruthy();

  wrapper.unmount();
});
