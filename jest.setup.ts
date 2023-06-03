import { throwOnConsole, throwOnFetch, throwOnXMLHttpRequestOpen } from 'throw-on';

throwOnConsole('assert');
throwOnConsole('error');
throwOnConsole('warn');
throwOnFetch();
throwOnXMLHttpRequestOpen();
