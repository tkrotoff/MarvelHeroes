// See [How to test api calls using fetch?](https://github.com/facebook/create-react-app/issues/967#issuecomment-396771497)
export function mockFetch(data: object) {
  return jest.fn().mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve(data)
  } as Response);
}
