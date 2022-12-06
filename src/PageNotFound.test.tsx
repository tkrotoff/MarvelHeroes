import { render, screen } from '@testing-library/react';
import { useLocation } from 'react-router';

import { PageNotFound } from './PageNotFound';

jest.mock('react-router', () => ({
  useLocation: jest.fn()
}));
const useLocationMock = jest.mocked(useLocation);

test('render', async () => {
  useLocationMock.mockReturnValue({ pathname: 'unknown' } as ReturnType<typeof useLocation>);
  render(<PageNotFound />);

  screen.getByText('Whoops');

  // Tests "Sorry but <em>unknown</em> didn't match any pages"
  screen.getByText("Sorry but didn't match any pages");
  screen.getByText('unknown');
});
