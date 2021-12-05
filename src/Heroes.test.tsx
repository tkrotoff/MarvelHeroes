import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import * as Marvel from './api/Marvel';
import { Heroes } from './Heroes';

jest.mock('./api/Marvel');

const pleaseWait = 'Please wait...';

const fetchCharactersSpy = jest.spyOn(Marvel, 'fetchCharacters');
afterEach(fetchCharactersSpy.mockClear);

test('render', async () => {
  const { getByText, queryByText, rerender } = render(
    <MemoryRouter>
      <Heroes page={0} />
    </MemoryRouter>
  );
  expect(fetchCharactersSpy).toHaveBeenCalledTimes(1);
  getByText(pleaseWait);
  await waitFor(() => {
    expect(queryByText(pleaseWait)).toEqual(null);
  });
  getByText('3-D Man');
  getByText('A-Bomb (HAS)');
  getByText('A.I.M.');
  getByText('Angel (Ultimate)');
  getByText('Angel (Warren Worthington III)');
  getByText('Angela (Aldrif Odinsdottir)');

  rerender(
    <MemoryRouter>
      <Heroes page={1} />
    </MemoryRouter>
  );
  expect(fetchCharactersSpy).toHaveBeenCalledTimes(2);
  getByText(pleaseWait);
  await waitFor(() => {
    expect(queryByText(pleaseWait)).toEqual(null);
  });
  getByText('Anita Blake');
  getByText('Anne Marie Hoag');
  getByText('Annihilus');
  getByText('Battering Ram');
  getByText('Battlestar');
  getByText('Beak');
});

test('render "No results found :("', async () => {
  const { getByText, queryByText } = render(
    <MemoryRouter>
      <Heroes page={204} />
    </MemoryRouter>
  );
  expect(fetchCharactersSpy).toHaveBeenCalledTimes(1);
  getByText(pleaseWait);
  await waitFor(() => {
    expect(queryByText(pleaseWait)).toEqual(null);
  });
  getByText('No results found :(');
});

test('fetchCharacters() error', () => {
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
