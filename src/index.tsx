import Raven from 'raven-js';

/* eslint-disable import/first */
Raven.config('https://c8f1d1109acc4e7881162d245f8f681f@sentry.io/1230526').install();

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'whatwg-fetch';

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Layout } from './Layout';
import { Router } from './Router';

import './index.scss';

Raven.context(() =>
  // eslint-disable-next-line react/no-render-return-value
  render(
    <React.StrictMode>
      <BrowserRouter>
        <Layout>
          <Router />
        </Layout>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('app')
  )
);

if (module.hot) {
  module.hot.accept();
}
