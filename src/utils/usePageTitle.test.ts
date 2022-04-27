import { renderHook } from '@testing-library/react';

import { usePageTitle } from './usePageTitle';

test('usePageTitle()', () => {
  expect(document.title).toEqual('');
  renderHook(() => usePageTitle('3-D Man'));
  expect(document.title).toEqual('3-D Man - Marvel Heroes');
});
