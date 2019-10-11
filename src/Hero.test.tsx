import React from 'react';
import { render, cleanup, waitForDomChange } from '@testing-library/react';
import { useParams } from 'react-router';

import * as Marvel from './api/Marvel';
import { Hero } from './Hero';

jest.mock('./api/Marvel');

jest.mock('react-router', () => ({
  useParams: jest.fn()
}));
const useParamsMock = useParams as jest.Mock;

afterEach(cleanup);

test('render()', async () => {
  const spy = jest.spyOn(Marvel, 'fetchCharacter');
  expect(spy).toHaveBeenCalledTimes(0);

  const pleaseWait = 'Please wait...';

  useParamsMock.mockReturnValue({ id: '1011334' });
  const { getByText, queryByText, rerender } = render(<Hero />);
  expect(spy).toHaveBeenCalledTimes(1);
  getByText(pleaseWait);
  await waitForDomChange();
  expect(queryByText(pleaseWait)).toEqual(null);
  getByText('3-D Man');

  useParamsMock.mockReturnValue({ id: '1017100' });
  rerender(<Hero />);
  expect(spy).toHaveBeenCalledTimes(2);
  getByText(pleaseWait);
  await waitForDomChange();
  expect(queryByText(pleaseWait)).toEqual(null);
  getByText('A-Bomb (HAS)');

  useParamsMock.mockReturnValue({ id: '1009144' });
  rerender(<Hero />);
  expect(spy).toHaveBeenCalledTimes(3);
  getByText(pleaseWait);
  await waitForDomChange();
  expect(queryByText(pleaseWait)).toEqual(null);
  getByText('A.I.M.');

  spy.mockRestore();
});
