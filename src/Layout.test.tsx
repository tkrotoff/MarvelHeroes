import { render } from '@testing-library/react';

import { Layout } from './Layout';

test('render', async () => {
  const { getByText } = render(<Layout>Hello, World!</Layout>);
  getByText('Hello, World!');
});
