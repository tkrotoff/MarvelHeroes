import { act, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

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
  screen.getByText('Marvel Heroes');
  const prevLink = screen.getByText<HTMLLinkElement>('‹ Previous');
  expect(prevLink.href).toBeUndefined();
  expect(prevLink.disabled).toEqual(true);
  const nextLink = screen.getByText<HTMLLinkElement>('Next ›');
  expect(nextLink.href).toEqual('http://localhost/1');
  screen.getByText(pleaseWait);

  await waitForElementToBeRemoved(() => screen.queryByText(pleaseWait));
  screen.getByText('3-D Man');
  screen.getByText('A-Bomb (HAS)');
  screen.getByText('A.I.M.');
  screen.getByText('Angel (Ultimate)');
  screen.getByText('Angel (Warren Worthington III)');
  screen.getByText('Angela (Aldrif Odinsdottir)');

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
  screen.getByText('Marvel Heroes');
  const prevLink = screen.getByText<HTMLLinkElement>('‹ Previous');
  expect(prevLink.href).toEqual('http://localhost/0');
  expect(prevLink.disabled).toBeUndefined();
  const nextLink = screen.getByText<HTMLLinkElement>('Next ›');
  expect(nextLink.href).toEqual('http://localhost/2');
  screen.getByText(pleaseWait);

  await waitForElementToBeRemoved(() => screen.queryByText(pleaseWait));
  screen.getByText('Anita Blake');
  screen.getByText('Anne Marie Hoag');
  screen.getByText('Annihilus');
  screen.getByText('Battering Ram');
  screen.getByText('Battlestar');
  screen.getByText('Beak');

  spy.mockRestore();
});

test('click on Previous & Next links', async () => {
  render(
    <MemoryRouter>
      <Router />
    </MemoryRouter>
  );

  const prevLink = () => screen.getByText<HTMLLinkElement>('‹ Previous');
  const nextLink = screen.getByText<HTMLLinkElement>('Next ›');

  expect(document.title).toEqual('Page 0 - Marvel Heroes');
  await screen.findByText('3-D Man');
  expect(prevLink().disabled).toEqual(true);

  act(() => nextLink.click());
  expect(document.title).toEqual('Page 1 - Marvel Heroes');
  screen.getByText(pleaseWait);
  await screen.findByText('Anita Blake');
  expect(screen.queryByText(pleaseWait)).toBeNull();
  expect(prevLink().disabled).toBeUndefined();

  act(() => nextLink.click());
  expect(document.title).toEqual('Page 2 - Marvel Heroes');
  screen.getByText(pleaseWait);
  await screen.findByText('Beast');
  expect(screen.queryByText(pleaseWait)).toBeNull();
  expect(prevLink().disabled).toBeUndefined();

  act(() => prevLink().click());
  expect(document.title).toEqual('Page 1 - Marvel Heroes');
  screen.getByText(pleaseWait);
  await screen.findByText('Anita Blake');
  expect(screen.queryByText(pleaseWait)).toBeNull();
  expect(prevLink().disabled).toBeUndefined();

  act(() => prevLink().click());
  expect(document.title).toEqual('Page 0 - Marvel Heroes');
  screen.getByText(pleaseWait);
  await screen.findByText('3-D Man');
  expect(screen.queryByText(pleaseWait)).toBeNull();
  expect(prevLink().disabled).toEqual(true);
});
