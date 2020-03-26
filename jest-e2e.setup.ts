// Do we want to run the tests with the polyfills?
import 'core-js';
// Needed for async/await inside the tests otherwise
// it generates "ReferenceError: regeneratorRuntime is not defined"
import 'regenerator-runtime/runtime';

// [Event: 'unhandledRejection'](https://nodejs.org/api/process.html#process_event_unhandledrejection)
// [Bluebird Error management configuration](http://bluebirdjs.com/docs/api/error-management-configuration.html)
//
// Node.js error:
// (node:65532) UnhandledPromiseRejectionWarning: Error: Text not found "Annihilus"
// Protocol error (Runtime.callFunctionOn): Target closed.
// (node:65532) UnhandledPromiseRejectionWarning: Unhandled promise rejection.
// This error originated either by throwing inside of an async function without a catch block,
// or by rejecting a promise which was not handled with .catch(). (rejection id: 1)
// (node:65532) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated.
// In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
//
process.on('unhandledRejection', (reason: Error | any, _promise: Promise<any>) => {
  throw reason;
});
