import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { MemoryRouter } from 'react-router';

import { flushPromises } from './utils/flushPromises';
import * as Marvel from './http/Marvel';
import { Heroes } from './Heroes';

jest.mock('./http/Marvel');

afterEach(cleanup);

test('render()', async () => {
  const spy = jest.spyOn(Marvel, 'fetchCharacters');
  expect(spy).toHaveBeenCalledTimes(0);

  const pleaseWait = '<p>Please wait...</p>';

  const wrapper = render(
    <MemoryRouter>
      <Heroes page={0} />
    </MemoryRouter>
  );
  expect(spy).toHaveBeenCalledTimes(1);
  expect(wrapper.container.innerHTML).toEqual(pleaseWait);
  await flushPromises();
  expect(wrapper.container.innerHTML).toMatch(
    /.*3-D Man.*A-Bomb \(HAS\).*A\.I\.M\..*Anita Blake.*Anne Marie Hoag.*Annihilus.*/
  );

  wrapper.rerender(
    <MemoryRouter>
      <Heroes page={1} />
    </MemoryRouter>
  );
  expect(spy).toHaveBeenCalledTimes(2);
  expect(wrapper.container.innerHTML).toEqual(pleaseWait);
  await flushPromises();
  expect(wrapper.container.innerHTML).toMatch(
    /.*Anole.*Ant-Man \(Eric O'Grady\).*Ant-Man \(Scott Lang\).*Beef.*Beetle \(Abner Jenkins\).*Ben Grimm.*/
  );

  spy.mockRestore();
});
