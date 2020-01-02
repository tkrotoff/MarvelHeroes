import { fakeFetchResponseSuccess, fakeFetchResponseError } from './fakeFetchResponse';

test('fakeFetchResponseSuccess()', async () => {
  const response = fakeFetchResponseSuccess({ foo: 'bar' });
  expect(response.ok).toBe(true);
  await expect(response.json()).resolves.toEqual({ foo: 'bar' });

  const fetchSpy = jest.spyOn(window, 'fetch');
  fetchSpy.mockResolvedValueOnce(response);
  await expect((await fetch('whatever')).json()).resolves.toEqual({ foo: 'bar' });
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
