import { act, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import * as Marvel from './api/Marvel';
import { Router } from './Router';

jest.mock('./api/Marvel');

const pleaseWait = 'Please wait...';

test('render without page query param', async () => {
  const spy = jest.spyOn(Marvel, 'fetchCharacters');

  render(
    <MemoryRouter initialEntries={['/']}>
      <Router />
    </MemoryRouter>
  );

  expect(spy).toHaveBeenCalledTimes(1);
  screen.getByRole('heading', { level: 1, name: 'Marvel Heroes' });
  const prevLink = screen.getByRole<HTMLButtonElement>('button', { name: '‹ Previous' });
  expect((prevLink as unknown as HTMLAnchorElement).href).toBeUndefined();
  expect(prevLink.disabled).toEqual(true);
  const nextLink = screen.getByRole<HTMLAnchorElement>('link', { name: 'Next ›' });
  expect(nextLink.href).toEqual('http://localhost/1');
  screen.getByText(pleaseWait);

  await waitForElementToBeRemoved(() => screen.queryByText(pleaseWait));
  screen.getByRole('heading', { level: 5, name: '3-D Man' });
  screen.getByRole('heading', { level: 5, name: 'A-Bomb (HAS)' });
  screen.getByRole('heading', { level: 5, name: 'A.I.M.' });
  screen.getByRole('heading', { level: 5, name: 'Angel (Ultimate)' });
  screen.getByRole('heading', { level: 5, name: 'Angel (Warren Worthington III)' });
  screen.getByRole('heading', { level: 5, name: 'Angela (Aldrif Odinsdottir)' });

  // FIXME Cannot do a rerender with initialEntries={['/1']}: useParams() inside HeroesPagination is not updated
  // https://github.com/tkrotoff/MarvelHeroes/blob/dfb842607c421ba1762fc844afcc7916c17a47b4/src/HeroesPagination.test.tsx#L43-L61

  spy.mockRestore();
});

test('render given a page query param', async () => {
  const spy = jest.spyOn(Marvel, 'fetchCharacters');

  render(
    <MemoryRouter initialEntries={['/1']}>
      <Router />
    </MemoryRouter>
  );

  expect(spy).toHaveBeenCalledTimes(1);
  screen.getByRole('heading', { level: 1, name: 'Marvel Heroes' });
  const prevLink = screen.getByRole<HTMLAnchorElement>('link', { name: '‹ Previous' });
  expect(prevLink.href).toEqual('http://localhost/0');
  expect((prevLink as unknown as HTMLButtonElement).disabled).toBeUndefined();
  const nextLink = screen.getByRole<HTMLAnchorElement>('link', { name: 'Next ›' });
  expect(nextLink.href).toEqual('http://localhost/2');
  screen.getByText(pleaseWait);

  await waitForElementToBeRemoved(() => screen.queryByText(pleaseWait));
  screen.getByRole('heading', { level: 5, name: 'Anita Blake' });
  screen.getByRole('heading', { level: 5, name: 'Anne Marie Hoag' });
  screen.getByRole('heading', { level: 5, name: 'Annihilus' });
  screen.getByRole('heading', { level: 5, name: 'Battering Ram' });
  screen.getByRole('heading', { level: 5, name: 'Battlestar' });
  screen.getByRole('heading', { level: 5, name: 'Beak' });

  spy.mockRestore();
});

test('click on Previous & Next links', async () => {
  render(
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );

  const prevLink = () => screen.getByText<HTMLButtonElement>('‹ Previous');
  const nextLink = screen.getByRole<HTMLAnchorElement>('link', { name: 'Next ›' });

  expect(window.location.href).toEqual('http://localhost/');
  expect(document.title).toEqual('Page 0 - Marvel Heroes');
  await screen.findByRole('heading', { level: 5, name: '3-D Man' });
  expect(prevLink().disabled).toEqual(true);

  act(() => nextLink.click());
  expect(window.location.href).toEqual('http://localhost/1');
  expect(document.title).toEqual('Page 1 - Marvel Heroes');
  screen.getByText(pleaseWait);
  await screen.findByRole('heading', { level: 5, name: 'Anita Blake' });
  expect(screen.queryByText(pleaseWait)).toBeNull();
  expect(prevLink().disabled).toBeUndefined();

  act(() => nextLink.click());
  expect(window.location.href).toEqual('http://localhost/2');
  expect(document.title).toEqual('Page 2 - Marvel Heroes');
  screen.getByText(pleaseWait);
  await screen.findByRole('heading', { level: 5, name: 'Beast' });
  expect(screen.queryByText(pleaseWait)).toBeNull();
  expect(prevLink().disabled).toBeUndefined();

  act(() => prevLink().click());
  expect(window.location.href).toEqual('http://localhost/1');
  expect(document.title).toEqual('Page 1 - Marvel Heroes');
  screen.getByText(pleaseWait);
  await screen.findByRole('heading', { level: 5, name: 'Anita Blake' });
  expect(screen.queryByText(pleaseWait)).toBeNull();
  expect(prevLink().disabled).toBeUndefined();

  act(() => prevLink().click());
  expect(window.location.href).toEqual('http://localhost/0');
  expect(document.title).toEqual('Page 0 - Marvel Heroes');
  screen.getByText(pleaseWait);
  await screen.findByRole('heading', { level: 5, name: '3-D Man' });
  expect(screen.queryByText(pleaseWait)).toBeNull();
  expect(prevLink().disabled).toEqual(true);
});
