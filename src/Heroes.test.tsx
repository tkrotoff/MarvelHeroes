import { act, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import * as Marvel from './api/Marvel';
import { flushPromises } from './utils/flushPromises';
import { Heroes } from './Heroes';
import { Router } from './Router';

jest.mock('./api/Marvel');

test('page title', async () => {
  const { rerender } = render(
    <MemoryRouter>
      <Heroes page={0} />
    </MemoryRouter>
  );
  expect(document.title).toEqual('Page 0 - Marvel Heroes');
  await screen.findByRole('heading', { level: 5, name: '3-D Man' }); // Wait for fetchCharacters request

  rerender(
    <MemoryRouter>
      <Heroes page={1} />
    </MemoryRouter>
  );
  expect(document.title).toEqual('Page 1 - Marvel Heroes');
  await screen.findByRole('heading', { level: 5, name: 'Anita Blake' }); // Wait for fetchCharacters request
});

const pleaseWait = 'Please wait...';

const fetchCharactersSpy = jest.spyOn(Marvel, 'fetchCharacters');
afterEach(fetchCharactersSpy.mockClear);

test('render', async () => {
  const { rerender } = render(
    <MemoryRouter>
      <Heroes page={0} />
    </MemoryRouter>
  );
  expect(fetchCharactersSpy).toHaveBeenCalledTimes(1);
  screen.getByText(pleaseWait);
  await waitForElementToBeRemoved(() => screen.queryByText(pleaseWait));
  screen.getByRole('heading', { level: 5, name: '3-D Man' });
  screen.getByRole('heading', { level: 5, name: 'A-Bomb (HAS)' });
  screen.getByRole('heading', { level: 5, name: 'A.I.M.' });
  screen.getByRole('heading', { level: 5, name: 'Angel (Ultimate)' });
  screen.getByRole('heading', { level: 5, name: 'Angel (Warren Worthington III)' });
  screen.getByRole('heading', { level: 5, name: 'Angela (Aldrif Odinsdottir)' });

  rerender(
    <MemoryRouter>
      <Heroes page={1} />
    </MemoryRouter>
  );
  expect(fetchCharactersSpy).toHaveBeenCalledTimes(2);
  screen.getByText(pleaseWait);
  await waitForElementToBeRemoved(() => screen.queryByText(pleaseWait));
  screen.getByRole('heading', { level: 5, name: 'Anita Blake' });
  screen.getByRole('heading', { level: 5, name: 'Anne Marie Hoag' });
  screen.getByRole('heading', { level: 5, name: 'Annihilus' });
  screen.getByRole('heading', { level: 5, name: 'Battering Ram' });
  screen.getByRole('heading', { level: 5, name: 'Battlestar' });
  screen.getByRole('heading', { level: 5, name: 'Beak' });
});

test('render "No results found :("', async () => {
  render(
    <MemoryRouter>
      <Heroes page={204} />
    </MemoryRouter>
  );
  expect(fetchCharactersSpy).toHaveBeenCalledTimes(1);
  screen.getByText(pleaseWait);
  await waitForElementToBeRemoved(() => screen.queryByText(pleaseWait));
  screen.getByText('No results found :(');
});

test('click on Details link', async () => {
  render(
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );

  expect(window.location.href).toEqual('http://localhost/');
  expect(document.title).toEqual('Page 0 - Marvel Heroes');
  await screen.findByRole('heading', { level: 5, name: '3-D Man' });

  const detailsLink = screen.getAllByRole<HTMLAnchorElement>('link', { name: 'Details' })[0];
  act(() => detailsLink.click());

  screen.getByText(pleaseWait);

  expect(window.location.href).toEqual('http://localhost/heroes/1011334');
  expect(document.title).toEqual('... - Marvel Heroes');
  await waitFor(() => expect(document.title).toEqual('3-D Man - Marvel Heroes'));

  expect(screen.queryByText(pleaseWait)).toBeNull();

  await screen.findByRole('heading', { level: 1, name: '3-D Man' });
  await screen.findByRole('heading', { level: 6, name: 'Comics' });
  await screen.findByRole('heading', { level: 6, name: 'Series' });
  await screen.findByRole('heading', { level: 6, name: 'Stories' });
});

test('fetchCharacters() error "500 Internal Server Error"', async () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

  await expect(async () => {
    render(
      <MemoryRouter>
        <Heroes page={500} />
      </MemoryRouter>
    );
    await act(flushPromises);
  }).rejects.toThrow('500');
  expect(fetchCharactersSpy).toHaveBeenCalledTimes(1);

  expect(consoleSpy).toHaveBeenCalledTimes(3);
  consoleSpy.mockRestore();
});

test('fetchCharacters() error "429 Too Many Requests"', async () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

  await expect(async () => {
    render(
      <MemoryRouter>
        <Heroes page={429} />
      </MemoryRouter>
    );
    await act(flushPromises);
  }).rejects.toThrow('429');
  expect(fetchCharactersSpy).toHaveBeenCalledTimes(1);

  expect(consoleSpy).toHaveBeenCalledTimes(3);
  consoleSpy.mockRestore();
});

test('abort previous requests', async () => {
  const abortSpy = jest.spyOn(AbortController.prototype, 'abort').mockImplementation();

  const { rerender } = render(
    <MemoryRouter>
      <Heroes page={0} />
    </MemoryRouter>
  );
  expect(fetchCharactersSpy).toHaveBeenCalledTimes(1);
  expect(abortSpy).toHaveBeenCalledTimes(0);

  rerender(
    <MemoryRouter>
      <Heroes page={1} />
    </MemoryRouter>
  );
  expect(fetchCharactersSpy).toHaveBeenCalledTimes(2);
  expect(abortSpy).toHaveBeenCalledTimes(2);

  rerender(
    <MemoryRouter>
      <Heroes page={2} />
    </MemoryRouter>
  );
  expect(fetchCharactersSpy).toHaveBeenCalledTimes(3);
  expect(abortSpy).toHaveBeenCalledTimes(4);

  rerender(
    <MemoryRouter>
      <Heroes page={3} />
    </MemoryRouter>
  );
  expect(fetchCharactersSpy).toHaveBeenCalledTimes(4);
  expect(abortSpy).toHaveBeenCalledTimes(6);

  await act(flushPromises);

  abortSpy.mockRestore();
});
