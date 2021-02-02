import { Route, Switch } from 'react-router';

import { withErrorBoundary } from './utils/ErrorBoundary';
import { Hero } from './Hero';
import { HeroesPagination } from './HeroesPagination';
import { PageNotFound } from './PageNotFound';

export function Router() {
  return (
    <Switch>
      <Route exact path="/:page(\d+)?" component={withErrorBoundary(HeroesPagination)} />
      <Route path="/heroes/:id(\d+)" component={withErrorBoundary(Hero)} />

      <Route component={PageNotFound} />
    </Switch>
  );
}
