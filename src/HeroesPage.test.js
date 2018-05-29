import React from 'react';
import { shallow } from 'enzyme';

import HeroesPage from './HeroesPage';

test('render()', () => {
  const wrapper = shallow(<HeroesPage />);
  const app = wrapper.instance();

  expect(wrapper.html()).toBeTruthy();

  wrapper.unmount();
});
