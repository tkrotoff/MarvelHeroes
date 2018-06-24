import React from 'react';
import { mount } from 'enzyme';

import Layout from './Layout';

test('render()', async () => {
  const wrapper = mount(<Layout>Hello, World!</Layout>);

  expect(wrapper.html()).toEqual('<div class="container-fluid">Hello, World!</div>');

  wrapper.unmount();
});
