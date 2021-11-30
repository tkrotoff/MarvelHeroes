import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, useParams } from 'react-router';

import * as Marvel from './api/Marvel';
import { HeroesPagination } from './HeroesPagination';

jest.mock('./api/Marvel');

jest.mock('react-router', () => ({
  // FIXME https://github.com/DefinitelyTyped/DefinitelyTyped/pull/44734
  // https://github.com/DefinitelyTyped/DefinitelyTyped/pull/44433#issuecomment-628789936
  ...jest.requireActual<any>('react-router'),
  useParams: jest.fn()
}));
const useParamsMock = useParams as jest.Mock;

const pleaseWait = 'Please wait...';

test('render without page query param then change page', async () => {
  const spy = jest.spyOn(Marvel, 'fetchCharacters');

  useParamsMock.mockReturnValue({});
  const { rerender } = render(
    <MemoryRouter>
      <HeroesPagination />
    </MemoryRouter>
  );

  expect(spy).toHaveBeenCalledTimes(1);
  screen.getByText('Marvel Heroes');
  const prevLink = screen.getByText('‹ Previous') as HTMLLinkElement;
  expect(prevLink.href).toEqual('http://localhost/-1');
  const nextLink = screen.getByText('Next ›') as HTMLLinkElement;
  expect(nextLink.href).toEqual('http://localhost/1');
  screen.getByText(pleaseWait);
  await waitFor(() => {
    expect(screen.queryByText(pleaseWait)).toEqual(null);
  });
  screen.getByText('3-D Man');
  screen.getByText('A-Bomb (HAS)');
  screen.getByText('A.I.M.');
  screen.getByText('Angel (Ultimate)');
  screen.getByText('Angel (Warren Worthington III)');
  screen.getByText('Angela (Aldrif Odinsdottir)');

  useParamsMock.mockReturnValue({ page: '1' });
  rerender(
    <MemoryRouter>
      <HeroesPagination />
    </MemoryRouter>
  );
  expect(spy).toHaveBeenCalledTimes(2);
  expect(prevLink.href).toEqual('http://localhost/0');
  expect(nextLink.href).toEqual('http://localhost/2');
  screen.getByText(pleaseWait);
  await waitFor(() => {
    expect(screen.queryByText(pleaseWait)).toEqual(null);
  });
  screen.getByText('Anita Blake');
  screen.getByText('Anne Marie Hoag');
  screen.getByText('Annihilus');
  screen.getByText('Battering Ram');
  screen.getByText('Battlestar');
  screen.getByText('Beak');

  spy.mockRestore();
});

test('render given a page query param', async () => {
  const spy = jest.spyOn(Marvel, 'fetchCharacters');

  useParamsMock.mockReturnValue({ page: '1' });
  render(
    <MemoryRouter>
      <HeroesPagination />
    </MemoryRouter>
  );
  expect(spy).toHaveBeenCalledTimes(1);
  screen.getByText('Marvel Heroes');
  const prevLink = screen.getByText('‹ Previous') as HTMLLinkElement;
  expect(prevLink.href).toEqual('http://localhost/0');
  const nextLink = screen.getByText('Next ›') as HTMLLinkElement;
  expect(nextLink.href).toEqual('http://localhost/2');
  screen.getByText(pleaseWait);

  await waitFor(() => {
    expect(screen.queryByText(pleaseWait)).toEqual(null);
  });
  screen.getByText('Anita Blake');
  screen.getByText('Anne Marie Hoag');
  screen.getByText('Annihilus');
  screen.getByText('Battering Ram');
  screen.getByText('Battlestar');
  screen.getByText('Beak');

  spy.mockRestore();
});
