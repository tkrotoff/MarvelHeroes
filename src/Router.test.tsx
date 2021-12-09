// FIXME eslint-plugin-testing-library 5.0.0 confuses with findAllByType from react-test-renderer
/* eslint-disable testing-library/await-async-query */

import { MemoryRouter } from 'react-router';
import { act, create } from 'react-test-renderer';

import { flushPromises } from './utils/flushPromises';
import { Hero } from './Hero';
import { HeroesPagination } from './HeroesPagination';
import { PageNotFound } from './PageNotFound';
import { Router } from './Router';

jest.mock('./api/Marvel');

function renderRoute(path: string) {
  return create(
    <MemoryRouter initialEntries={[path]}>
      <Router />
    </MemoryRouter>
  );
}

const waitForFetchCharacters = flushPromises;

test('HeroesPagination route', async () => {
  const { root } = renderRoute('/');
  await act(waitForFetchCharacters);
  expect(root.findAllByType(HeroesPagination)).toHaveLength(1);
  expect(root.findAllByType(Hero)).toHaveLength(0);
  expect(root.findAllByType(PageNotFound)).toHaveLength(0);
});

test('Hero route', async () => {
  const { root } = renderRoute('/heroes/1011334');
  await act(waitForFetchCharacters);
  expect(root.findAllByType(HeroesPagination)).toHaveLength(0);
  expect(root.findAllByType(Hero)).toHaveLength(1);
  expect(root.findAllByType(PageNotFound)).toHaveLength(0);
});

// FIXME https://github.com/remix-run/react-router/issues/8254
// eslint-disable-next-line jest/no-disabled-tests
test.skip('PageNotFound route', () => {
  const { root } = renderRoute('/unknown');
  expect(root.findAllByType(HeroesPagination)).toHaveLength(0);
  expect(root.findAllByType(Hero)).toHaveLength(0);
  expect(root.findAllByType(PageNotFound)).toHaveLength(1);
});
