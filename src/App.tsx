import Raven from 'raven-js';

Raven.config('https://c8f1d1109acc4e7881162d245f8f681f@sentry.io/1230526').install();

import '@babel/polyfill';
import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';

import './index.html';
import './App.scss';
import { Router } from './Router';

// eslint-disable-next-line react/no-render-return-value
Raven.context(() => ReactDOM.render(<Router />, document.getElementById('app')));
