import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import './index.html';
import './App.scss';
import MarvelHeroes from './MarvelHeroes';

ReactDOM.render(<MarvelHeroes />, document.getElementById('app'));
