import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import flushPromises from './utils/flushPromises';
import HeroesPagination from './HeroesPagination';
import Hero from './Hero';
import PageNotFound from './PageNotFound';
import Router from './Router';

jest.mock('./http/Marvel');

const renderRoute = (path: string) =>
  mount(
    <MemoryRouter initialEntries={[path]}>
      <Router />
    </MemoryRouter>
  );

test('HeroesPagination route', async () => {
  const wrapper = renderRoute('/');
  await flushPromises();
  expect(wrapper.find(HeroesPagination)).toHaveLength(1);
  expect(wrapper.find(Hero)).toHaveLength(0);
  expect(wrapper.find(PageNotFound)).toHaveLength(0);
  wrapper.unmount();
});

test('Hero route', async () => {
  const wrapper = renderRoute('/heroes/1011334');
  await flushPromises();
  expect(wrapper.find(HeroesPagination)).toHaveLength(0);
  expect(wrapper.find(Hero)).toHaveLength(1);
  expect(wrapper.find(PageNotFound)).toHaveLength(0);
  wrapper.unmount();
});

test('PageNotFound route', () => {
  const wrapper = renderRoute('/random');
  expect(wrapper.find(HeroesPagination)).toHaveLength(0);
  expect(wrapper.find(Hero)).toHaveLength(0);
  expect(wrapper.find(PageNotFound)).toHaveLength(1);
  wrapper.unmount();
});
