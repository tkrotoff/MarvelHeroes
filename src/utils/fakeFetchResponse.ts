export function fakeFetchResponseSuccess(data: object) {
  return {
    ok: true,
    json: () => Promise.resolve(data)
  } as Response;
}

export function fakeFetchResponseError(statusText: string) {
  return {
    ok: false,
    statusText
  } as Response;
}
