import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import * as Marvel from './api/Marvel';
import { Heroes } from './Heroes';

jest.mock('./api/Marvel');

test('page title', async () => {
  expect(document.title).toEqual('');

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
  await waitFor(() => {
    expect(screen.queryByText(pleaseWait)).toEqual(null);
  });
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
  await waitFor(() => {
    expect(screen.queryByText(pleaseWait)).toEqual(null);
  });
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
  await waitFor(() => {
    expect(screen.queryByText(pleaseWait)).toEqual(null);
  });
  screen.getByText('No results found :(');
});

test('fetchCharacters() error "500 Internal Server Error"', () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

  expect(() =>
    render(
      <MemoryRouter>
        <Heroes page={500} />
      </MemoryRouter>
    )
  ).toThrow('500 Internal Server Error');
  expect(fetchCharactersSpy).toHaveBeenCalledTimes(1);

  consoleSpy.mockRestore();
});

test('fetchCharacters() error "429 Too Many Requests"', () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

  expect(() =>
    render(
      <MemoryRouter>
        <Heroes page={429} />
      </MemoryRouter>
    )
  ).toThrow('429 Too Many Requests');
  expect(fetchCharactersSpy).toHaveBeenCalledTimes(1);

  consoleSpy.mockRestore();
});
