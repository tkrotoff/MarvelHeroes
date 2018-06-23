import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';

import flushPromises from './utils/flushPromises';
import mockRouteComponentProps from './utils/mockRouteComponentProps';
import HeroesPagination from './HeroesPaginationEnzymeFix';

jest.mock('./http/Marvel');

test('render()', async () => {
  const wrapper = mount(
    <MemoryRouter>
      <HeroesPagination {...mockRouteComponentProps({})} />
    </MemoryRouter>
  );

  expect(wrapper.html()).toEqual(
    '<div><h3>Marvel Heroes</h3><a class="btn btn-primary disabled" href="/-1">« Previous</a> <a class="btn btn-primary" href="/1">Next »</a><p>Please wait...</p></div>'
  );

  await flushPromises();
  expect(wrapper.html()).toMatch(
    /^<div><h3>Marvel Heroes<\/h3>.*3-D Man.*A-Bomb \(HAS\).*A\.I\.M\..*Anita Blake.*Anne Marie Hoag.*Annihilus.*<\/div>$/
  );

  // See Can't set the props or state of a component inside MemoryRouter https://github.com/airbnb/enzyme/issues/1384
  //wrapper.find(HeroesPagination).setProps({...mockRouteComponentProps({ page: 1 })});
  wrapper.setProps({
    children: React.cloneElement(wrapper.props().children, {
      ...mockRouteComponentProps({ page: 1 })
    })
  });
  expect(wrapper.html()).toEqual(
    '<div><h3>Marvel Heroes</h3><a class="btn btn-primary" href="/0">« Previous</a> <a class="btn btn-primary" href="/2">Next »</a><p>Please wait...</p></div>'
  );
  await flushPromises();
  expect(wrapper.html()).toMatch(
    /^<div><h3>Marvel Heroes<\/h3>.*Anole.*Ant-Man \(Eric O'Grady\).*Ant-Man \(Scott Lang\).*Beef.*Beetle \(Abner Jenkins\).*Ben Grimm.*<\/div>$/
  );

  wrapper.unmount();
});
