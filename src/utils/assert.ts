// https://devblogs.microsoft.com/typescript/announcing-typescript-3-7/#assertion-functions
export function assert(_condition: boolean, _message?: string): asserts _condition {
  // eslint-disable-next-line prefer-rest-params, no-console
  console.assert(...arguments);
}
