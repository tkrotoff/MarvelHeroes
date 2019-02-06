import React from 'react';
import { render, cleanup } from 'react-testing-library';

import { Layout } from './Layout';

afterEach(cleanup);

test('render()', async () => {
  const wrapper = render(<Layout>Hello, World!</Layout>);

  expect(wrapper.container.innerHTML).toEqual('<div class="container-fluid">Hello, World!</div>');
});
