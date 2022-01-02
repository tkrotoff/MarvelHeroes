// Do we want to run the tests with the polyfills?
import 'core-js';
// Needed for async/await inside the tests otherwise
// it generates "ReferenceError: regeneratorRuntime is not defined"
import 'regenerator-runtime/runtime';

import assert from 'node:assert';

// [console.assert not throwing with v22.4.0](https://github.com/facebook/jest/issues/5634)
console.assert = assert;

// FIXME Remove when Node.js >= 15 is LTS, see https://news.ycombinator.com/item?id=24870960
//
// [Event: 'unhandledRejection'](https://nodejs.org/api/process.html#process_event_unhandledrejection)
// [Bluebird Error management configuration](http://bluebirdjs.com/docs/api/error-management-configuration.html)
//
// Node.js error:
// (node:38141) UnhandledPromiseRejectionWarning: Unhandled promise rejection.
// This error originated either by throwing inside of an async function without a catch block,
// or by rejecting a promise which was not handled with .catch(). (rejection id: 4)
// (node:38141) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated.
// In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
//
process.on('unhandledRejection', (reason: Error | any, _promise: Promise<any>) => {
  throw reason;
});

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
