// Do we want to run the tests with the polyfills?
import 'core-js';
// Needed for async/await inside the tests otherwise
// it generates "ReferenceError: regeneratorRuntime is not defined"
import 'regenerator-runtime/runtime';

import assert from 'node:assert';

// [console.assert not throwing with v22.4.0](https://github.com/facebook/jest/issues/5634)
console.assert = assert;

window.fetch = (input: RequestInfo) => {
  const error = `You must mock fetch: '${input.toString()}'`;
  console.error(error);
  throw new Error(error);
};

XMLHttpRequest.prototype.open = (_method: string, url: string) => {
  const error = `You must mock XMLHttpRequest: '${url}'`;
  console.error(error);
  throw new Error(error);
};
