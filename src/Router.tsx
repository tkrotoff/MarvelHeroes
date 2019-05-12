import React from 'react';
import { Switch, Route } from 'react-router';

import { PageNotFound } from './PageNotFound';
import { HeroesPagination } from './HeroesPagination';
import { Hero } from './Hero';

export function Router() {
  return (
    <Switch>
      <Route exact path="/:page(\d+)?" component={HeroesPagination} />
      <Route path="/heroes/:id(\d+)" component={Hero} />

      <Route component={PageNotFound} />
    </Switch>
  );
}
