import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { useLocation } from 'react-router';

import { PageNotFound } from './PageNotFound';

jest.mock('react-router', () => ({
  useLocation: jest.fn()
}));
const useLocationMock = useLocation as jest.Mock;

afterEach(cleanup);

test('render', async () => {
  useLocationMock.mockReturnValueOnce({ pathname: 'unknown' });
  const { getByText } = render(<PageNotFound />);

  getByText('Whoops');

  // Tests "Sorry but <em>unknown</em> didn't match any pages"
  getByText("Sorry but didn't match any pages");
  getByText('unknown');
});
