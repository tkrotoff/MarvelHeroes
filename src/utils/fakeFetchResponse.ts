export function fakeFetchResponseSuccess(data: Record<string, unknown>) {
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
