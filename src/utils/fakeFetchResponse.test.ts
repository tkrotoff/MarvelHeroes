import { fakeFetchResponseSuccess, fakeFetchResponseError } from './fakeFetchResponse';

test('fakeFetchResponseSuccess()', async () => {
  const response = fakeFetchResponseSuccess({ foo: 'bar' });
  expect(response.ok).toBe(true);
  expect(await response.json()).toEqual({ foo: 'bar' });

  const fetchSpy = jest.spyOn(window, 'fetch');
  fetchSpy.mockResolvedValueOnce(response);
  expect(await (await fetch('whatever')).json()).toEqual({ foo: 'bar' });
  expect(fetchSpy).toHaveBeenCalledTimes(1);
  fetchSpy.mockRestore();
});

test('fakeFetchResponseError()', () => {
  const response = fakeFetchResponseError('500 Internal Server Error');
  expect(response).toEqual({
    ok: false,
    statusText: '500 Internal Server Error'
  });
});
