import { render, screen } from '@testing-library/react';

import { Layout } from './Layout';

test('render', async () => {
  render(<Layout>Hello, World!</Layout>);
  screen.getByText('Hello, World!');
});
