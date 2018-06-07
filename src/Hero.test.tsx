import React from 'react';
import { shallow } from 'enzyme';

import mockRouteComponentProps from './mockRouteComponentProps';
import Hero from './Hero';

test('render()', () => {
  const wrapper = shallow(<Hero {...mockRouteComponentProps({ id: 'fakeId' })} />);

  expect(wrapper.html()).toBeTruthy();
  console.log(wrapper.html());

  wrapper.unmount();
});
