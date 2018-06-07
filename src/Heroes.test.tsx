import React from 'react';
import { shallow } from 'enzyme';

import Heroes from './Heroes';

test('render()', () => {
  const wrapper = shallow(<Heroes page={0} />);

  expect(wrapper.html()).toBeTruthy();
  console.log(wrapper.html());

  wrapper.unmount();
});
