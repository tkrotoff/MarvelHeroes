import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import { Layout } from './Layout';
import { PageNotFound } from './PageNotFound';
import { HeroesPagination } from './HeroesPagination';
import { Hero } from './Hero';

export const Router = () => (
  <HashRouter>
    <Layout>
      <Switch>
        <Route exact path="/:page(\d+)?" component={HeroesPagination} />
        <Route path="/heroes/:id(\d+)" component={Hero} />

        <Route component={PageNotFound} />
      </Switch>
    </Layout>
  </HashRouter>
);
