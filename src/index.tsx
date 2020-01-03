import * as Sentry from '@sentry/browser';
/* eslint-disable import/first */
Sentry.init({ dsn: 'https://c8f1d1109acc4e7881162d245f8f681f@sentry.io/1230526' });

import 'core-js';
import 'regenerator-runtime/runtime';
import 'whatwg-fetch';

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Layout } from './Layout';
import { Router } from './Router';

import './index.scss';

render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Router />
      </Layout>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('app')
);
