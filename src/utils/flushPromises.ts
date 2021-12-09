// https://github.com/facebook/jest/issues/2157
export function flushPromises() {
  return new Promise<void>(resolve => {
    setTimeout(resolve);
  });
}
