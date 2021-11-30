/* eslint-disable import/first */

import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

Sentry.init({
  dsn: 'https://c8f1d1109acc4e7881162d245f8f681f@sentry.io/1230526',
  integrations: [new Integrations.BrowserTracing()]
});

import 'core-js';
import 'regenerator-runtime/runtime';
import 'whatwg-fetch';

import { StrictMode } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Layout } from './Layout';
import { Router } from './Router';
import './index.scss';

render(
  <StrictMode>
    <BrowserRouter>
      <Layout>
        <Router />
      </Layout>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('app')
);
