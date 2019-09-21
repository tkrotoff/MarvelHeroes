import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { flushPromises } from './utils/flushPromises';
import { mockRouteComponentProps } from './utils/mockRouteComponentProps';
import * as Marvel from './api/Marvel';
import { Hero, QueryParams } from './Hero';

jest.mock('./api/Marvel');

afterEach(cleanup);

test('render()', async () => {
  const spy = jest.spyOn(Marvel, 'fetchCharacter');
  expect(spy).toHaveBeenCalledTimes(0);

  const pleaseWait = 'Please wait...';

  const { getByText, queryByText, rerender } = render(
    <Hero {...mockRouteComponentProps<QueryParams>({ match: { params: { id: '1011334' } } })} />
  );
  expect(spy).toHaveBeenCalledTimes(1);
  getByText(pleaseWait);
  await flushPromises();
  expect(queryByText(pleaseWait)).toEqual(null);
  getByText('3-D Man');

  rerender(
    <Hero {...mockRouteComponentProps<QueryParams>({ match: { params: { id: '1017100' } } })} />
  );
  expect(spy).toHaveBeenCalledTimes(2);
  getByText(pleaseWait);
  await flushPromises();
  expect(queryByText(pleaseWait)).toEqual(null);
  getByText('A-Bomb (HAS)');

  rerender(
    <Hero {...mockRouteComponentProps<QueryParams>({ match: { params: { id: '1009144' } } })} />
  );
  expect(spy).toHaveBeenCalledTimes(3);
  getByText(pleaseWait);
  await flushPromises();
  expect(queryByText(pleaseWait)).toEqual(null);
  getByText('A.I.M.');

  spy.mockRestore();
});
