import { render, screen, waitFor } from '@testing-library/react';
import { useParams } from 'react-router';

import * as Marvel from './api/Marvel';
import { Hero } from './Hero';

jest.mock('./api/Marvel');

jest.mock('react-router', () => ({
  useParams: jest.fn()
}));
const useParamsMock = useParams as jest.Mock;

test('page title', async () => {
  expect(document.title).toEqual('');

  useParamsMock.mockReturnValue({ id: '1011334' });
  const { rerender } = render(<Hero />);
  expect(document.title).toEqual('... - Marvel Heroes');
  await screen.findByText('3-D Man');
  expect(document.title).toEqual('3-D Man - Marvel Heroes');

  useParamsMock.mockReturnValue({ id: '1017100' });
  rerender(<Hero />);
  //expect(document.title).toEqual('... - Marvel Heroes');
  await screen.findByText('A-Bomb (HAS)');
  expect(document.title).toEqual('A-Bomb (HAS) - Marvel Heroes');
});

const pleaseWait = 'Please wait...';

const fetchCharacterSpy = jest.spyOn(Marvel, 'fetchCharacter');
afterEach(fetchCharacterSpy.mockClear);

test('render', async () => {
  useParamsMock.mockReturnValue({ id: '1011334' });
  const { rerender } = render(<Hero />);
  expect(fetchCharacterSpy).toHaveBeenCalledTimes(1);
  screen.getByText(pleaseWait);
  await waitFor(() => {
    expect(screen.queryByText(pleaseWait)).toEqual(null);
  });
  screen.getByText('3-D Man');

  useParamsMock.mockReturnValue({ id: '1017100' });
  rerender(<Hero />);
  expect(fetchCharacterSpy).toHaveBeenCalledTimes(2);
  screen.getByText(pleaseWait);
  await waitFor(() => {
    expect(screen.queryByText(pleaseWait)).toEqual(null);
  });
  screen.getByText('A-Bomb (HAS)');

  useParamsMock.mockReturnValue({ id: '1009144' });
  rerender(<Hero />);
  expect(fetchCharacterSpy).toHaveBeenCalledTimes(3);
  screen.getByText(pleaseWait);
  await waitFor(() => {
    expect(screen.queryByText(pleaseWait)).toEqual(null);
  });
  screen.getByText('A.I.M.');
});

test('fetchCharacter() error', () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

  useParamsMock.mockReturnValue({ id: 'unknown' });
  expect(() => render(<Hero />)).toThrow('404 Not Found');
  expect(fetchCharacterSpy).toHaveBeenCalledTimes(1);

  consoleSpy.mockRestore();
});
