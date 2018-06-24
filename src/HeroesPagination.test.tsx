import React from 'react';
import { mount as _mount } from 'enzyme';
import { MemoryRouter } from 'react-router';

import flushPromises from './utils/flushPromises';
import mockRouteComponentProps from './utils/mockRouteComponentProps';
import HeroesPagination, { Props, QueryParams } from './HeroesPaginationEnzymeFix';

jest.mock('./http/Marvel');

const mount = (node: React.ReactElement<Props>) => _mount<Props>(node);

test('render()', async () => {
  const wrapper = mount(
    <MemoryRouter>
      <HeroesPagination {...mockRouteComponentProps<QueryParams>({ match: { params: {} } })} />
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
  //wrapper.find(HeroesPagination).setProps({ ...mockRouteComponentProps<QueryParams>({ match: { params: { page: '1' } } }) });
  // FIXME See Enzyme ReactWrapper.setProps() cannot be used with children https://github.com/DefinitelyTyped/DefinitelyTyped/issues/26795
  wrapper.setProps<any>({
    children: React.cloneElement((wrapper.props() as any).children, {
      ...mockRouteComponentProps<QueryParams>({ match: { params: { page: '1' } } })
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
