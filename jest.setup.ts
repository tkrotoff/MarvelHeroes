import { throwOnConsole, throwOnFetch, throwOnXMLHttpRequestOpen } from 'throw-on';
// @ts-ignore
import { Response as ResponsePolyfill } from 'whatwg-fetch';

// FIXME Fix error "Response is not defined" with Jest 29.3.1 and jsdom 20.0.3
// https://github.com/jsdom/jsdom/issues/1724#issuecomment-1233478314
globalThis.Response = ResponsePolyfill;

throwOnConsole('assert');
throwOnConsole('error');
throwOnConsole('warn');
throwOnFetch();
throwOnXMLHttpRequestOpen();
