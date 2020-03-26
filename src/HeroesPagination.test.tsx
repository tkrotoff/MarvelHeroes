import React from 'react';
import { render, waitForDomChange } from '@testing-library/react';
import { MemoryRouter, useParams } from 'react-router';

import * as Marvel from './api/Marvel';
import { HeroesPagination } from './HeroesPagination';

jest.mock('./api/Marvel');

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: jest.fn()
}));
const useParamsMock = useParams as jest.Mock;

test('render without page query param then change page', async () => {
  const spy = jest.spyOn(Marvel, 'fetchCharacters');

  const pleaseWait = 'Please wait...';

  useParamsMock.mockReturnValue({});
  const { getByText, queryByText, rerender } = render(
    <MemoryRouter>
      <HeroesPagination />
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

  useParamsMock.mockReturnValue({ page: '1' });
  rerender(
    <MemoryRouter>
      <HeroesPagination />
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

test('render given a page query param', async () => {
  const spy = jest.spyOn(Marvel, 'fetchCharacters');

  useParamsMock.mockReturnValue({ page: '1' });
  const { getByText, queryByText } = render(
    <MemoryRouter>
      <HeroesPagination />
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
