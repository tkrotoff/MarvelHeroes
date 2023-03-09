import { act, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { useParams } from 'react-router';

import * as Marvel from './api/Marvel';
import { flushPromises } from './utils/flushPromises';
import { Hero } from './Hero';

jest.mock('./api/Marvel');

jest.mock('react-router', () => ({
  useParams: jest.fn()
}));
const useParamsMock = jest.mocked(useParams);

test('page title', async () => {
  useParamsMock.mockReturnValue({ id: '1011334' });
  const { rerender } = render(<Hero />);
  expect(document.title).toEqual('... - Marvel Heroes');
  await act(flushPromises);
  await screen.findByText('3-D Man');
  expect(document.title).toEqual('3-D Man - Marvel Heroes');

  useParamsMock.mockReturnValue({ id: '1017100' });
  rerender(<Hero />);
  //expect(document.title).toEqual('... - Marvel Heroes');
  await act(flushPromises);
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
  await waitForElementToBeRemoved(() => screen.queryByText(pleaseWait));
  screen.getByText('3-D Man');

  useParamsMock.mockReturnValue({ id: '1017100' });
  rerender(<Hero />);
  expect(fetchCharacterSpy).toHaveBeenCalledTimes(2);
  screen.getByText(pleaseWait);
  await waitForElementToBeRemoved(() => screen.queryByText(pleaseWait));
  screen.getByText('A-Bomb (HAS)');

  useParamsMock.mockReturnValue({ id: '1009144' });
  rerender(<Hero />);
  expect(fetchCharacterSpy).toHaveBeenCalledTimes(3);
  screen.getByText(pleaseWait);
  await waitForElementToBeRemoved(() => screen.queryByText(pleaseWait));
  screen.getByText('A.I.M.');
});

test('fetchCharacter() error', async () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

  useParamsMock.mockReturnValue({ id: 'unknown' });

  await expect(async () => {
    render(<Hero />);
    await act(flushPromises);
  }).rejects.toThrow('404');
  expect(fetchCharacterSpy).toHaveBeenCalledTimes(1);

  expect(consoleSpy).toHaveBeenCalledTimes(3);
  consoleSpy.mockRestore();
});

test('abort previous requests', async () => {
  const abortSpy = jest.spyOn(AbortController.prototype, 'abort').mockImplementation();

  useParamsMock.mockReturnValue({ id: '1011334' });
  const { rerender } = render(<Hero />);
  expect(fetchCharacterSpy).toHaveBeenCalledTimes(1);
  expect(abortSpy).toHaveBeenCalledTimes(0);

  useParamsMock.mockReturnValue({ id: '1017100' });
  rerender(<Hero />);
  expect(fetchCharacterSpy).toHaveBeenCalledTimes(2);
  expect(abortSpy).toHaveBeenCalledTimes(2);

  useParamsMock.mockReturnValue({ id: '1009144' });
  rerender(<Hero />);
  expect(fetchCharacterSpy).toHaveBeenCalledTimes(3);
  expect(abortSpy).toHaveBeenCalledTimes(4);

  await act(flushPromises);

  abortSpy.mockRestore();
});
