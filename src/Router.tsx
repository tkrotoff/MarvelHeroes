import { Route, Routes } from 'react-router';

import { ErrorBoundary } from './utils/ErrorBoundary';
import { Hero } from './Hero';
import { HeroesPagination } from './HeroesPagination';
import { PageNotFound } from './PageNotFound';

export function Router() {
  return (
    <ErrorBoundary>
      <Routes>
        {/*
          FIXME https://github.com/remix-run/react-router/issues/8254
          https://github.com/tkrotoff/MarvelHeroes/blob/58546755072b1afc6324ff07c71d1492faf857b6/src/Router.tsx#L11-L12
        */}
        <Route path="/" element={<HeroesPagination />} />
        <Route path="/:page" element={<HeroesPagination />} />
        <Route path="/heroes/:id" element={<Hero />} />

        <Route element={<PageNotFound />} />
      </Routes>
    </ErrorBoundary>
  );
}
