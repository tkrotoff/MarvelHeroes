import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';

import flushPromises from './utils/flushPromises';
import Heroes from './Heroes';

jest.mock('./http/Marvel');

test('render()', async () => {
  const wrapper = mount(
    <MemoryRouter>
      <Heroes page={0} />
    </MemoryRouter>
  );

  const pleaseWait = '<p>Please wait...</p>';

  expect(wrapper.html()).toEqual(pleaseWait);

  await flushPromises();
  expect(wrapper.html()).toMatch(
    /.*3-D Man.*A-Bomb \(HAS\).*A\.I\.M\..*Anita Blake.*Anne Marie Hoag.*Annihilus.*/
  );

  // See Can't set the props or state of a component inside MemoryRouter https://github.com/airbnb/enzyme/issues/1384
  //wrapper.find(Heroes).setProps({ page: 1 });
  wrapper.setProps({
    children: React.cloneElement(wrapper.props().children, { page: 1 })
  });
  expect(wrapper.html()).toEqual(pleaseWait);
  await flushPromises();
  expect(wrapper.html()).toMatch(
    /.*Anole.*Ant-Man \(Eric O'Grady\).*Ant-Man \(Scott Lang\).*Beef.*Beetle \(Abner Jenkins\).*Ben Grimm.*/
  );

  wrapper.unmount();
});
