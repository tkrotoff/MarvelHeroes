import { render, waitFor } from '@testing-library/react';
import { useParams } from 'react-router';

import * as Marvel from './api/Marvel';
import { Hero } from './Hero';

jest.mock('./api/Marvel');

jest.mock('react-router', () => ({
  useParams: jest.fn()
}));
const useParamsMock = useParams as jest.Mock;

const pleaseWait = 'Please wait...';

const fetchCharacterSpy = jest.spyOn(Marvel, 'fetchCharacter');
afterEach(fetchCharacterSpy.mockClear);

test('render', async () => {
  useParamsMock.mockReturnValue({ id: '1011334' });
  const { getByText, queryByText, rerender } = render(<Hero />);
  expect(fetchCharacterSpy).toHaveBeenCalledTimes(1);
  getByText(pleaseWait);
  await waitFor(() => {
    expect(queryByText(pleaseWait)).toEqual(null);
  });
  getByText('3-D Man');

  useParamsMock.mockReturnValue({ id: '1017100' });
  rerender(<Hero />);
  expect(fetchCharacterSpy).toHaveBeenCalledTimes(2);
  getByText(pleaseWait);
  await waitFor(() => {
    expect(queryByText(pleaseWait)).toEqual(null);
  });
  getByText('A-Bomb (HAS)');

  useParamsMock.mockReturnValue({ id: '1009144' });
  rerender(<Hero />);
  expect(fetchCharacterSpy).toHaveBeenCalledTimes(3);
  getByText(pleaseWait);
  await waitFor(() => {
    expect(queryByText(pleaseWait)).toEqual(null);
  });
  getByText('A.I.M.');
});

test('fetchCharacter() error', () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

  useParamsMock.mockReturnValue({ id: 'unknown' });
  expect(() => render(<Hero />)).toThrow('404 Not Found');
  expect(fetchCharacterSpy).toHaveBeenCalledTimes(1);

  consoleSpy.mockRestore();
});
