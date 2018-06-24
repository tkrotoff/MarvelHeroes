import '@babel/polyfill';
import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';

import './index.html';
import './App.scss';
import Router from './Router';

ReactDOM.render(<Router />, document.getElementById('app'));
