import React from 'react';
import { render, cleanup, waitForDomChange } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { mockRouteComponentProps } from './utils/mockRouteComponentProps';
import * as Marvel from './api/Marvel';
import { HeroesPagination, QueryParams } from './HeroesPagination';

jest.mock('./api/Marvel');

afterEach(cleanup);

test('render() without page query param then change page', async () => {
  const spy = jest.spyOn(Marvel, 'fetchCharacters');
  expect(spy).toHaveBeenCalledTimes(0);

  const pleaseWait = 'Please wait...';

  const { getByText, queryByText, rerender } = render(
    <MemoryRouter>
      <HeroesPagination {...mockRouteComponentProps<QueryParams>({ match: { params: {} } })} />
    </MemoryRouter>
  );

  expect(spy).toHaveBeenCalledTimes(1);
  getByText('Marvel Heroes');
  const prevLink = getByText('« Previous') as HTMLLinkElement;
  expect(prevLink.href).toEqual('http://localhost/-1');
  const nextLink = getByText('Next »') as HTMLLinkElement;
  expect(nextLink.href).toEqual('http://localhost/1');
  getByText(pleaseWait);
  await waitForDomChange();
  expect(queryByText(pleaseWait)).toEqual(null);
  getByText('3-D Man');
  getByText('A-Bomb (HAS)');
  getByText('A.I.M.');
  getByText('Anita Blake');
  getByText('Anne Marie Hoag');
  getByText('Annihilus');

  rerender(
    <MemoryRouter>
      <HeroesPagination
        {...mockRouteComponentProps<QueryParams>({ match: { params: { page: '1' } } })}
      />
    </MemoryRouter>
  );
  expect(spy).toHaveBeenCalledTimes(2);
  expect(prevLink.href).toEqual('http://localhost/0');
  expect(nextLink.href).toEqual('http://localhost/2');
  getByText(pleaseWait);
  await waitForDomChange();
  expect(queryByText(pleaseWait)).toEqual(null);
  getByText('Anole');
  getByText("Ant-Man (Eric O'Grady)");
  getByText('Ant-Man (Scott Lang)');
  getByText('Beef');
  getByText('Beetle (Abner Jenkins)');
  getByText('Ben Grimm');

  spy.mockRestore();
});

test('render() given a page query param', async () => {
  const spy = jest.spyOn(Marvel, 'fetchCharacters');
  expect(spy).toHaveBeenCalledTimes(0);

  const { getByText, queryByText } = render(
    <MemoryRouter>
      <HeroesPagination
        {...mockRouteComponentProps<QueryParams>({ match: { params: { page: '1' } } })}
      />
    </MemoryRouter>
  );
  expect(spy).toHaveBeenCalledTimes(1);
  getByText('Marvel Heroes');
  const prevLink = getByText('« Previous') as HTMLLinkElement;
  expect(prevLink.href).toEqual('http://localhost/0');
  const nextLink = getByText('Next »') as HTMLLinkElement;
  expect(nextLink.href).toEqual('http://localhost/2');
  getByText('Please wait...');

  await waitForDomChange();
  expect(queryByText('Please wait...')).toEqual(null);
  getByText('Anole');
  getByText("Ant-Man (Eric O'Grady)");
  getByText('Ant-Man (Scott Lang)');
  getByText('Beef');
  getByText('Beetle (Abner Jenkins)');
  getByText('Ben Grimm');

  spy.mockRestore();
});
