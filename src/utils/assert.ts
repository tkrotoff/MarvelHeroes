// See https://devblogs.microsoft.com/typescript/announcing-typescript-3-7/#assertion-functions
export function assert(condition?: boolean, message?: string): asserts condition {
  console.assert(condition, message);
}
