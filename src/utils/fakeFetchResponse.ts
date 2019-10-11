export function fakeFetchResponse(data: object) {
  return {
    ok: true,
    json: () => Promise.resolve(data)
  } as Response;
}
