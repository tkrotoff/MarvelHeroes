import { setPageTitle } from './setPageTitle';

test('setPageTitle()', () => {
  setPageTitle('3-D Man');
  expect(document.title).toEqual('3-D Man - Marvel Heroes');
});
