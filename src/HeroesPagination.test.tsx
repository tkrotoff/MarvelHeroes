import React from 'react';
import { render, flushEffects, cleanup } from 'react-testing-library';
import { MemoryRouter } from 'react-router';

import { flushPromises } from './utils/flushPromises';
import { mockRouteComponentProps } from './utils/mockRouteComponentProps';
import { HeroesPagination, QueryParams } from './HeroesPagination';

jest.mock('./http/Marvel');

afterEach(cleanup);

test('render()', async () => {
  const wrapper = render(
    <MemoryRouter>
      <HeroesPagination {...mockRouteComponentProps<QueryParams>({ match: { params: {} } })} />
    </MemoryRouter>
  );

  flushEffects();
  expect(wrapper.container.innerHTML).toEqual(
    '<h3>Marvel Heroes</h3><a class="btn btn-primary disabled" href="/-1">« Previous</a> <a class="btn btn-primary" href="/1">Next »</a><p>Please wait...</p>'
  );

  await flushPromises();
  flushEffects();
  expect(wrapper.container.innerHTML).toMatch(
    /^<h3>Marvel Heroes<\/h3>.*3-D Man.*A-Bomb \(HAS\).*A\.I\.M\..*Anita Blake.*Anne Marie Hoag.*Annihilus.*$/
  );

  wrapper.rerender(
    <MemoryRouter>
      <HeroesPagination
        {...mockRouteComponentProps<QueryParams>({ match: { params: { page: '1' } } })}
      />
    </MemoryRouter>
  );
  flushEffects();
  expect(wrapper.container.innerHTML).toEqual(
    '<h3>Marvel Heroes</h3><a class="btn btn-primary" href="/0">« Previous</a> <a class="btn btn-primary" href="/2">Next »</a><p>Please wait...</p>'
  );
  await flushPromises();
  flushEffects();
  expect(wrapper.container.innerHTML).toMatch(
    /^<h3>Marvel Heroes<\/h3>.*Anole.*Ant-Man \(Eric O'Grady\).*Ant-Man \(Scott Lang\).*Beef.*Beetle \(Abner Jenkins\).*Ben Grimm.*$/
  );
});
