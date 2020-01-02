import React from 'react';
import { Switch, Route } from 'react-router';

import { PageNotFound } from './PageNotFound';
import { HeroesPagination } from './HeroesPagination';
import { Hero } from './Hero';
import { withErrorBoundary } from './utils/ErrorBoundary';

export function Router() {
  return (
    <Switch>
      <Route exact path="/:page(\d+)?" component={withErrorBoundary(HeroesPagination)} />
      <Route path="/heroes/:id(\d+)" component={withErrorBoundary(Hero)} />

      <Route component={PageNotFound} />
    </Switch>
  );
}
