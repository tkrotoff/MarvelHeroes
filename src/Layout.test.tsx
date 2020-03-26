import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { Layout } from './Layout';

afterEach(cleanup);

test('render', async () => {
  const { getByText } = render(<Layout>Hello, World!</Layout>);
  getByText('Hello, World!');
});
