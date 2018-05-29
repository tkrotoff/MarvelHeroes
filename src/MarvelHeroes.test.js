import React from 'react';
import { shallow } from 'enzyme';

import MarvelHeroes from './MarvelHeroes';

test('render()', () => {
  const wrapper = shallow(<MarvelHeroes />);
  const app = wrapper.instance();

  expect(wrapper.html()).toEqual('<div>Hello Marvel Heroes!</div>');

  wrapper.unmount();
});
