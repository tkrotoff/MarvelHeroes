import React from 'react';
import { render, cleanup } from 'react-testing-library';

import { flushPromises } from './utils/flushPromises';
import { mockRouteComponentProps } from './utils/mockRouteComponentProps';
import { Hero, QueryParams } from './Hero';

jest.mock('./http/Marvel');

afterEach(cleanup);

test('render()', async () => {
  const wrapper = render(
    <Hero {...mockRouteComponentProps<QueryParams>({ match: { params: { id: '1011334' } } })} />
  );

  const pleaseWait = '<p>Please wait...</p>';

  expect(wrapper.container.innerHTML).toEqual(pleaseWait);

  await flushPromises();
  expect(wrapper.container.innerHTML).toMatch(/^<div class="hero">.*<h3>3-D Man<\/h3>.*<\/div>$/);

  wrapper.rerender(
    <Hero {...mockRouteComponentProps<QueryParams>({ match: { params: { id: '1017100' } } })} />
  );
  expect(wrapper.container.innerHTML).toEqual(pleaseWait);
  await flushPromises();
  expect(wrapper.container.innerHTML).toMatch(
    /^<div class="hero">.*<h3>A-Bomb \(HAS\)<\/h3>.*<\/div>$/
  );

  wrapper.rerender(
    <Hero {...mockRouteComponentProps<QueryParams>({ match: { params: { id: '1009144' } } })} />
  );
  expect(wrapper.container.innerHTML).toEqual(pleaseWait);
  await flushPromises();
  expect(wrapper.container.innerHTML).toMatch(/^<div class="hero">.*<h3>A\.I\.M\.<\/h3>.*<\/div>$/);
});
