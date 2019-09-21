import React from 'react';
import { render, cleanup, waitForDomChange } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import * as Marvel from './api/Marvel';
import { Heroes } from './Heroes';

jest.mock('./api/Marvel');

afterEach(cleanup);

test('render()', async () => {
  const spy = jest.spyOn(Marvel, 'fetchCharacters');
  expect(spy).toHaveBeenCalledTimes(0);

  const pleaseWait = 'Please wait...';

  const { getByText, queryByText, rerender } = render(
    <MemoryRouter>
      <Heroes page={0} />
    </MemoryRouter>
  );
  expect(spy).toHaveBeenCalledTimes(1);
  getByText(pleaseWait);
  await waitForDomChange();
  expect(queryByText(pleaseWait)).toEqual(null);
  getByText('3-D Man');
  getByText('A-Bomb (HAS)');
  getByText('A.I.M.');
  getByText('Anita Blake');
  getByText('Anne Marie Hoag');
  getByText('Annihilus');

  rerender(
    <MemoryRouter>
      <Heroes page={1} />
    </MemoryRouter>
  );
  expect(spy).toHaveBeenCalledTimes(2);
  getByText(pleaseWait);
  await waitForDomChange();
  expect(queryByText(pleaseWait)).toEqual(null);
  getByText('Anole');
  getByText("Ant-Man (Eric O'Grady)");
  getByText('Ant-Man (Scott Lang)');
  getByText('Beef');
  getByText('Beetle (Abner Jenkins)');
  getByText('Ben Grimm');

  spy.mockRestore();
});
