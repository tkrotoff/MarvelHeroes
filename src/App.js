import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, BrowserRouter, Route, Switch } from 'react-router-dom';

import './index.html';
import './App.scss';

import HeroesPage from './HeroesPage';
import Hero from './Hero';

const NoMatch = ({ location }) => (
  <div>
    <h1>Whoops</h1>
    <p>
      Sorry but <em>{location.pathname}</em> didn't match any pages
    </p>
  </div>
);

const Layout = props => {
  return (
    <div>
      <div className="container-fluid">{props.children}</div>
    </div>
  );
};

const App = () => {
  return (
    <HashRouter>
      <Layout>
        <Switch>
          <Route exact path="/:page?" component={HeroesPage} />
          <Route path="/heroes/:id" component={Hero} />

          <Route component={NoMatch} />
        </Switch>
      </Layout>
    </HashRouter>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
