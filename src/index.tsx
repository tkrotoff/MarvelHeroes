/* eslint-disable import/first */

import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

Sentry.init({
  dsn: 'https://c8f1d1109acc4e7881162d245f8f681f@o162677.ingest.sentry.io/1230526',
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1
});

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { Layout } from './Layout';
import { Router } from './Router';
import './index.scss';

if (process.env.NODE_ENV !== 'production') {
  // @ts-ignore
  const { throwOnConsole } = await import('throw-on');
  throwOnConsole('assert');
  throwOnConsole('error');
  throwOnConsole('warn');
}

const root = createRoot(document.getElementById('app')!);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Layout>
        <Router />
      </Layout>
    </BrowserRouter>
  </StrictMode>
);
