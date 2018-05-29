import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import './index.html';
import './App.scss';
import HeroesPage from './HeroesPage';

ReactDOM.render(<HeroesPage />, document.getElementById('app'));
