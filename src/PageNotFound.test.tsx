import { render, screen } from '@testing-library/react';
import { useLocation } from 'react-router';

import { PageNotFound } from './PageNotFound';

jest.mock('react-router', () => ({
  useLocation: jest.fn()
}));
const useLocationMock = useLocation as jest.Mock;

test('render', async () => {
  useLocationMock.mockReturnValue({ pathname: 'unknown' });
  render(<PageNotFound />);

  screen.getByText('Whoops');

  // Tests "Sorry but <em>unknown</em> didn't match any pages"
  screen.getByText("Sorry but didn't match any pages");
  screen.getByText('unknown');
});
