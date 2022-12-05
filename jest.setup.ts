// Do we want to run the tests with the polyfills?
import 'core-js';
// Needed for async/await inside the tests otherwise
// it generates "ReferenceError: regeneratorRuntime is not defined"
import 'regenerator-runtime/runtime';

import { throwOnConsole, throwOnFetch, throwOnXMLHttpRequestOpen } from 'throw-on';

throwOnConsole('assert');
throwOnConsole('error');
throwOnConsole('warn');
throwOnFetch();
throwOnXMLHttpRequestOpen();
