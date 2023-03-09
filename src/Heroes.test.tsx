import { act, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

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
  await screen.findByText('3-D Man'); // Wait for fetchCharacters request

  rerender(
    <MemoryRouter>
      <Heroes page={1} />
    </MemoryRouter>
  );
  expect(document.title).toEqual('Page 1 - Marvel Heroes');
  await screen.findByText('Anita Blake'); // Wait for fetchCharacters request
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
  screen.getByText('3-D Man');
  screen.getByText('A-Bomb (HAS)');
  screen.getByText('A.I.M.');
  screen.getByText('Angel (Ultimate)');
  screen.getByText('Angel (Warren Worthington III)');
  screen.getByText('Angela (Aldrif Odinsdottir)');

  rerender(
    <MemoryRouter>
      <Heroes page={1} />
    </MemoryRouter>
  );
  expect(fetchCharactersSpy).toHaveBeenCalledTimes(2);
  screen.getByText(pleaseWait);
  await waitForElementToBeRemoved(() => screen.queryByText(pleaseWait));
  screen.getByText('Anita Blake');
  screen.getByText('Anne Marie Hoag');
  screen.getByText('Annihilus');
  screen.getByText('Battering Ram');
  screen.getByText('Battlestar');
  screen.getByText('Beak');
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
    <MemoryRouter>
      <Router />
    </MemoryRouter>
  );

  await screen.findByText('3-D Man');

  const detailsLink = screen.getAllByText<HTMLLinkElement>('Details')[0];
  act(() => detailsLink.click());

  await screen.findByText('3-D Man');
  await screen.findByText('Comics');
  await screen.findByText('Series');
  await screen.findByText('Stories');
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
