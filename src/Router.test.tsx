import React from 'react';
import TestRenderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import { flushPromises } from './utils/flushPromises';
import { HeroesPagination } from './HeroesPagination';
import { Hero } from './Hero';
import { PageNotFound } from './PageNotFound';
import { Router } from './Router';

jest.mock('./api/Marvel');

function renderRoute(path: string) {
  return TestRenderer.create(
    <MemoryRouter initialEntries={[path]}>
      <Router />
    </MemoryRouter>
  );
}

test('HeroesPagination route', async () => {
  const wrapper = renderRoute('/');
  await flushPromises();
  expect(wrapper.root.findAllByType(HeroesPagination)).toHaveLength(1);
  expect(wrapper.root.findAllByType(Hero)).toHaveLength(0);
  expect(wrapper.root.findAllByType(PageNotFound)).toHaveLength(0);
  wrapper.unmount();
});

test('Hero route', async () => {
  const wrapper = renderRoute('/heroes/1011334');
  await flushPromises();
  expect(wrapper.root.findAllByType(HeroesPagination)).toHaveLength(0);
  expect(wrapper.root.findAllByType(Hero)).toHaveLength(1);
  expect(wrapper.root.findAllByType(PageNotFound)).toHaveLength(0);
  wrapper.unmount();
});

test('PageNotFound route', () => {
  const wrapper = renderRoute('/random');
  expect(wrapper.root.findAllByType(HeroesPagination)).toHaveLength(0);
  expect(wrapper.root.findAllByType(Hero)).toHaveLength(0);
  expect(wrapper.root.findAllByType(PageNotFound)).toHaveLength(1);
  wrapper.unmount();
});
